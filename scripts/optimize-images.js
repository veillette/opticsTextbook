#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Load configuration
const CONFIG_PATH = path.join(__dirname, 'config.json');
let config;

async function loadConfig() {
    try {
        const configData = await fs.readFile(CONFIG_PATH, 'utf-8');
        config = JSON.parse(configData);
        return config.image_optimization;
    } catch (error) {
        // Fallback to default values if config not found
        return {
            max_dimension: 1920,
            quality: 80,
            min_size_mb: 0.5
        };
    }
}

const IMAGE_DIR = '_build/site/public';

async function findLargeImages(directory, minSizeMB) {
    const largeImages = [];

    async function scanDirectory(dir) {
        try {
            const entries = await fs.readdir(dir, {withFileTypes: true});

            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);

                if (entry.isDirectory()) {
                    // Recursively scan subdirectories
                    await scanDirectory(fullPath);
                } else if (entry.isFile()) {
                    const ext = path.extname(entry.name).toLowerCase();
                    // Check if it's an image file
                    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                        const stats = await fs.stat(fullPath);
                        // Check if larger than minimum size
                        if (stats.size > minSizeMB * 1024 * 1024) {
                            largeImages.push({
                                path: fullPath,
                                size: stats.size,
                                name: entry.name
                            });
                        }
                    }
                }
            }
        } catch (error) {
            // Skip directories we can't access
            if (error.code !== 'ENOENT' && error.code !== 'EACCES') {
                throw error;
            }
        }
    }

    await scanDirectory(directory);
    return largeImages;
}

async function optimizeImage(imagePath, maxDimension, quality, dryRun = false) {
    try {
        const image = sharp(imagePath);
        const metadata = await image.metadata();

        // Calculate new dimensions while maintaining aspect ratio
        let width = metadata.width;
        let height = metadata.height;
        let resized = false;

        // If image is larger than maxDimension in either dimension, scale it down
        if (width > maxDimension || height > maxDimension) {
            if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
            } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
            }
            resized = true;
        }

        if (dryRun) {
            // In dry-run mode, just report what would be done
            console.log(`[DRY RUN] Would optimize ${path.basename(imagePath)}:`);
            console.log(`  Current size: ${(metadata.size / 1024 / 1024).toFixed(2)} MB`);
            console.log(`  Dimensions: ${metadata.width}x${metadata.height}`);
            if (resized) {
                console.log(`  New dimensions: ${width}x${height}`);
            }
            console.log(`  Quality: ${quality}`);
            return null;
        }

        // Create optimized version
        const tempPath = imagePath + '.optimized';
        await image
            .resize(width, height, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({quality: quality, mozjpeg: true})
            .toFile(tempPath);

        // Get file sizes
        const originalSize = (await fs.stat(imagePath)).size;
        const optimizedSize = (await fs.stat(tempPath)).size;

        console.log(`Optimized ${path.basename(imagePath)}:`);
        console.log(`  Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`  Optimized size: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`  Reduction: ${((1 - optimizedSize / originalSize) * 100).toFixed(1)}%`);
        if (resized) {
            console.log(`  Resized: ${metadata.width}x${metadata.height} → ${width}x${height}`);
        }

        // Replace original with optimized version
        await fs.unlink(imagePath);
        await fs.rename(tempPath, imagePath);

        return {
            path: imagePath,
            originalSize,
            optimizedSize,
            reduction: ((1 - optimizedSize / originalSize) * 100).toFixed(1),
            resized
        };

    } catch (error) {
        console.error(`Error processing ${imagePath}:`, error.message);
        return null;
    }
}

async function main() {
    // Parse command line arguments
    const args = process.argv.slice(2);
    const dryRun = args.includes('--dry-run');
    const verbose = args.includes('--verbose');

    console.log('=== Image Optimization Tool ===');
    if (dryRun) {
        console.log('MODE: Dry run (no changes will be made)\n');
    }

    // Load configuration
    const imgConfig = await loadConfig();
    const {max_dimension, quality, min_size_mb} = imgConfig;

    if (verbose) {
        console.log('Configuration:');
        console.log(`  Max dimension: ${max_dimension}px`);
        console.log(`  Quality: ${quality}`);
        console.log(`  Min size threshold: ${min_size_mb} MB`);
        console.log(`  Image directory: ${IMAGE_DIR}\n`);
    }

    try {
        // Check if image directory exists
        try {
            await fs.access(IMAGE_DIR);
        } catch (error) {
            console.error(`Error: Image directory not found: ${IMAGE_DIR}`);
            console.error('Please run "npm run build" first to generate the build output.');
            process.exit(1);
        }

        console.log('Scanning for large images...');
        const largeImages = await findLargeImages(IMAGE_DIR, min_size_mb);

        console.log(`Found ${largeImages.length} image(s) larger than ${min_size_mb} MB.\n`);

        if (largeImages.length === 0) {
            console.log('No images need optimization!');
            return;
        }

        // Show list of images to be optimized
        if (verbose) {
            console.log('Images to optimize:');
            largeImages.forEach((img, i) => {
                console.log(`  ${i + 1}. ${img.name} (${(img.size / 1024 / 1024).toFixed(2)} MB)`);
            });
            console.log('');
        }

        // Optimize all images
        const results = [];
        for (const imageInfo of largeImages) {
            const result = await optimizeImage(imageInfo.path, max_dimension, quality, dryRun);
            if (result) {
                results.push(result);
            }
        }

        if (!dryRun && results.length > 0) {
            console.log('\n=== Optimization Summary ===');
            console.log(`Total images optimized: ${results.length}`);

            const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
            const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
            const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);

            console.log(`Total size reduction: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB → ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
            console.log(`Overall reduction: ${totalReduction}%`);
        } else if (dryRun) {
            console.log('\n[DRY RUN] No changes were made. Run without --dry-run to apply optimizations.');
        }

        console.log('\nImage optimization complete!');

    } catch (error) {
        console.error('Error during optimization:', error);
        process.exit(1);
    }
}

// Show help
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
Image Optimization Tool

Usage: node scripts/optimize-images.js [options]

Options:
  --dry-run    Show what would be optimized without making changes
  --verbose    Show detailed output
  --help, -h   Show this help message

Configuration:
  Settings are loaded from scripts/config.json
  - max_dimension: Maximum width/height (default: 1920)
  - quality: JPEG quality (default: 80)
  - min_size_mb: Minimum file size to optimize (default: 0.5)

Examples:
  npm run optimize-images            # Optimize all large images
  node scripts/optimize-images.js --dry-run   # Preview without changes
  node scripts/optimize-images.js --verbose   # Show detailed output
`);
    process.exit(0);
}

main().catch(console.error);
