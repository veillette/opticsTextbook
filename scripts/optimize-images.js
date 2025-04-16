const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const LARGE_IMAGES = [
    '_build/site/public/1_08_Felder_um_Dipol-6d1adc5e1ae174aed8ee0eb4e5699401.png',
    '_build/site/public/3_04_Lego_Depth-faf200adb407f276ac98f1418bdd286a.jpg',
    '_build/site/public/3_07_Eye_correction-3d82f8b453720957f9129dced8c221d0.png',
    '_build/site/public/6_21_STED_Large-a72e0229b18d05c27b0a8973039ea1b0.png',
    '_build/site/public/7_19_VCSEL_a-8b345ccc6447ca60ef39acbb9ec6991e.png'
];

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
    for (const imagePath of LARGE_IMAGES) {
        await optimizeImage(imagePath);
    }
    console.log('Image optimization complete!');
}

main().catch(console.error); 