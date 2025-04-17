const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const IMAGE_DIR = '_build/site/public';
const MIN_SIZE_MB = 0.5; // Images larger than this size (in MB) will be optimized

async function findLargeImages(directory) {
    const files = await fs.readdir(directory);
    const largeImages = [];

    for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = await fs.stat(filePath);

        if (stats.isFile()) {
            const ext = path.extname(file).toLowerCase();
            // Check if it's an image file and larger than MIN_SIZE_MB
            if (['.jpg', '.jpeg', '.png'].includes(ext) && stats.size > MIN_SIZE_MB * 1024 * 1024) {
                largeImages.push(filePath);
            }
        }
    }

    return largeImages;
}

async function optimizeImage(imagePath) {
    try {
        const image = sharp(imagePath);
        const metadata = await image.metadata();
        
        // Calculate new dimensions while maintaining aspect ratio
        let width = metadata.width;
        let height = metadata.height;
        
        // If image is larger than 1920px in either dimension, scale it down
        const MAX_DIMENSION = 1920;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
            if (width > height) {
                height = Math.round((height * MAX_DIMENSION) / width);
                width = MAX_DIMENSION;
            } else {
                width = Math.round((width * MAX_DIMENSION) / height);
                height = MAX_DIMENSION;
            }
        }

        // Create optimized version
        await image
            .resize(width, height, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({ quality: 80, mozjpeg: true })
            .toFile(imagePath + '.optimized');

        // Get file sizes
        const originalSize = (await fs.stat(imagePath)).size;
        const optimizedSize = (await fs.stat(imagePath + '.optimized')).size;
        
        console.log(`Optimized ${path.basename(imagePath)}:`);
        console.log(`  Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`  Optimized size: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`  Reduction: ${((1 - optimizedSize / originalSize) * 100).toFixed(1)}%`);

        // Replace original with optimized version
        await fs.unlink(imagePath);
        await fs.rename(imagePath + '.optimized', imagePath);
        
    } catch (error) {
        console.error(`Error processing ${imagePath}:`, error);
    }
}

async function main() {
    console.log('Starting image optimization...');
    try {
        const largeImages = await findLargeImages(IMAGE_DIR);
        console.log(`Found ${largeImages.length} large images to optimize.`);
        
        for (const imagePath of largeImages) {
            await optimizeImage(imagePath);
        }
        console.log('Image optimization complete!');
    } catch (error) {
        console.error('Error during optimization:', error);
    }
}

main().catch(console.error); 