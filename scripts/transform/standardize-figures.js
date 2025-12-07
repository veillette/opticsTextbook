#!/usr/bin/env node
/**
 * Script to standardize all figure filenames across all chapters.
 *
 * This script:
 * 1. Scans all image directories for figures that don't follow naming convention
 * 2. Finds where each figure is referenced in markdown documents
 * 3. Determines the correct position-based filename based on order of appearance
 * 4. Renames figures to follow the convention: ChapterNum_ImageNum_descriptive_name.ext
 * 5. Updates all markdown references accordingly
 * 6. Handles both image files and their corresponding .ai source files
 *
 * Naming Convention:
 * - Format: ChapterNum_ImageNum_descriptive_name.ext
 * - ChapterNum: Two-digit chapter number (01-11)
 * - ImageNum: Two-digit position in chapter (01-99)
 * - descriptive_name: snake_case description
 * - Example: 03_07_lens_diagram.png
 *
 * Usage:
 *     node scripts/standardize_all_figures.js [--dry-run] [--chapter NUM]
 *
 * Options:
 *     --dry-run           Show what would be done without making changes
 *     --chapter NUM       Only process specific chapter (1-11)
 *     --verbose           Show detailed processing information
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {
  getChapters,
  getImageExtensions,
  toSnakeCase,
  isProperlyNamed,
  extractFigureReferences,
  extractDescriptiveName,
  findMarkdownFilesInChapter
} = require('../shared-utils');

// Load chapters and image extensions from config
const CHAPTERS = getChapters();
const IMAGE_EXTENSIONS = getImageExtensions();

/**
 * Get all images in a chapter's Images directory.
 * @param {string} chapterDir - Chapter directory path
 * @param {number} chapterNum - Chapter number
 * @returns {Array} Array of image information objects
 */
function getAllChapterImages(chapterDir, chapterNum) {
  const images = [];
  const imagesDir = path.join(chapterDir, 'Images');

  if (!fs.existsSync(imagesDir)) {
    return images;
  }

  for (const ext of IMAGE_EXTENSIONS) {
    const pattern = new RegExp(`\\.${ext}$`, 'i');
    const files = fs.readdirSync(imagesDir);

    for (const filename of files) {
      if (pattern.test(filename)) {
        const imgPath = path.join(imagesDir, filename);
        images.push({
          filename: filename,
          path: imgPath,
          extension: ext,
          properlyNamed: isProperlyNamed(filename, chapterNum)
        });
      }
    }
  }

  return images;
}

/**
 * Build a mapping of images to their correct position based on order of appearance in markdown.
 * @param {string} chapterDir - Chapter directory path
 * @param {number} chapterNum - Chapter number
 * @param {string} imagesDir - Images directory path
 * @param {boolean} verbose - Whether to show verbose output
 * @returns {Object} Mapping of old filenames to new filenames
 */
function buildChapterReferenceOrder(chapterDir, chapterNum, imagesDir, verbose = false) {
  if (verbose) {
    console.log(`\n  Building reference order for Chapter ${chapterNum}...`);
  }

  // Find all markdown files
  const mdFiles = findMarkdownFilesInChapter(chapterDir);

  // Track all image references in order
  const allReferences = [];
  const seenImages = new Set();

  for (const mdFile of mdFiles) {
    const refs = extractFigureReferences(mdFile, imagesDir);
    for (const ref of refs) {
      // Only add each image once (first occurrence determines position)
      if (!seenImages.has(ref.filename)) {
        allReferences.push(ref);
        seenImages.add(ref.filename);
        if (verbose) {
          const position = allReferences.length.toString().padStart(2, '0');
          console.log(`    [${position}] ${ref.filename} (in ${path.basename(mdFile)}:${ref.line})`);
        }
      }
    }
  }

  // Build mapping: old_filename -> {position, descriptive_name, new_filename}
  const mapping = {};

  for (let i = 0; i < allReferences.length; i++) {
    const position = i + 1;
    const ref = allReferences[i];
    const oldFilename = ref.filename;
    const descriptiveName = extractDescriptiveName(oldFilename);
    const extension = path.extname(oldFilename).substring(1); // Remove dot
    const newFilename = `${chapterNum.toString().padStart(2, '0')}_${position.toString().padStart(2, '0')}_${descriptiveName}.${extension}`;

    mapping[oldFilename] = {
      position: position,
      descriptiveName: descriptiveName,
      newFilename: newFilename,
      oldPath: ref.fullPath,
      newPath: path.join(imagesDir, newFilename),
      needsRename: oldFilename !== newFilename
    };
  }

  return mapping;
}

/**
 * Find images that are not referenced in any markdown file.
 * @param {Array} allImages - All images in the chapter
 * @param {Object} referenceMapping - Mapping of referenced images
 * @returns {Array} Array of unreferenced images
 */
function findUnreferencedImages(allImages, referenceMapping) {
  const unreferenced = [];

  for (const img of allImages) {
    if (!referenceMapping[img.filename]) {
      unreferenced.push(img);
    }
  }

  return unreferenced;
}

/**
 * Rename images according to the mapping.
 * @param {number} chapterNum - Chapter number
 * @param {Object} referenceMapping - Mapping of images to new names
 * @param {boolean} dryRun - Whether to perform a dry run
 * @returns {Array} Array of renamed images
 */
function performRenames(chapterNum, referenceMapping, dryRun = false) {
  const renamed = [];

  // Filter to only those that need renaming
  const toRename = {};
  for (const [key, value] of Object.entries(referenceMapping)) {
    if (value.needsRename) {
      toRename[key] = value;
    }
  }

  if (Object.keys(toRename).length === 0) {
    return renamed;
  }

  console.log(`\n  ${dryRun ? '[DRY RUN] ' : ''}Renaming ${Object.keys(toRename).length} images...`);

  // Group by position to handle conflicts
  // Rename in reverse order to avoid conflicts
  const sortedItems = Object.entries(toRename).sort((a, b) => b[1].position - a[1].position);

  for (const [oldFilename, info] of sortedItems) {
    let oldPath = info.oldPath;
    const newPath = info.newPath;

    // Check for conflicts
    if (fs.existsSync(newPath) && newPath !== oldPath) {
      // There's a conflict - need to rename to temporary name first
      const tempPath = path.join(path.dirname(newPath), `_temp_${path.basename(newPath)}`);
      if (dryRun) {
        console.log(`    [Conflict] Would use temporary name: ${path.basename(tempPath)}`);
      } else {
        if (fs.existsSync(oldPath)) {
          fs.renameSync(oldPath, tempPath);
          oldPath = tempPath;
        }
      }
    }

    if (dryRun) {
      console.log(`    ${oldFilename} -> ${info.newFilename}`);
    } else {
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`    ✓ ${oldFilename} -> ${info.newFilename}`);
        renamed.push(info);

        // Handle .ai file
        const aiOld = oldPath.replace(path.extname(oldPath), '.ai');
        const aiNew = newPath.replace(path.extname(newPath), '.ai');
        if (fs.existsSync(aiOld)) {
          fs.renameSync(aiOld, aiNew);
          console.log(`      + AI file renamed`);
        }
      }
    }
  }

  return renamed;
}

/**
 * Update all markdown files with new image filenames.
 * @param {string} chapterDir - Chapter directory path
 * @param {Object} referenceMapping - Mapping of images to new names
 * @param {boolean} dryRun - Whether to perform a dry run
 */
function updateMarkdownFiles(chapterDir, referenceMapping, dryRun = false) {
  // Filter to only those that need updating
  const toUpdate = {};
  for (const [key, value] of Object.entries(referenceMapping)) {
    if (value.needsRename) {
      toUpdate[key] = value;
    }
  }

  if (Object.keys(toUpdate).length === 0) {
    return;
  }

  console.log(`\n  ${dryRun ? '[DRY RUN] ' : ''}Updating markdown references...`);

  const mdFiles = findMarkdownFilesInChapter(chapterDir);

  for (const mdFile of mdFiles) {
    let content = fs.readFileSync(mdFile, 'utf8');
    const originalContent = content;

    // Update each reference
    for (const [oldFilename, info] of Object.entries(toUpdate)) {
      const newFilename = info.newFilename;

      // Replace various reference patterns
      // Pattern 1: Images/filename
      content = content.replace(new RegExp(`Images/${oldFilename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'), `Images/${newFilename}`);
      // Pattern 2: ../Images/filename
      content = content.replace(new RegExp(`\\.\\./Images/${oldFilename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'), `../Images/${newFilename}`);
      // Pattern 3: Just filename (less common)
      // Use word boundaries to avoid partial matches
      content = content.replace(new RegExp(`\\b${oldFilename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'), newFilename);
    }

    if (content !== originalContent) {
      if (dryRun) {
        console.log(`    Would update: ${path.relative(chapterDir, mdFile)}`);
      } else {
        fs.writeFileSync(mdFile, content, 'utf8');
        console.log(`    ✓ Updated: ${path.relative(chapterDir, mdFile)}`);
      }
    }
  }
}

/**
 * Ask user for confirmation.
 * @param {string} question - Question to ask
 * @returns {Promise<boolean>} True if user confirmed
 */
function askConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase().trim() === 'yes' || answer.toLowerCase().trim() === 'y');
    });
  });
}

/**
 * Process a single chapter to standardize all figure names.
 * @param {number} chapterNum - Chapter number
 * @param {boolean} dryRun - Whether to perform a dry run
 * @param {boolean} verbose - Whether to show verbose output
 */
async function processChapter(chapterNum, dryRun = false, verbose = false) {
  const chapterInfo = CHAPTERS[chapterNum];
  const chapterDir = chapterInfo.dir;
  const imagesDir = path.join(chapterDir, 'Images');

  console.log('\n' + '='.repeat(80));
  console.log(`Processing Chapter ${chapterNum}: ${chapterDir}`);
  console.log('='.repeat(80));

  if (!fs.existsSync(chapterDir)) {
    console.log(`  ⚠️  Chapter directory not found: ${chapterDir}`);
    return;
  }

  if (!fs.existsSync(imagesDir)) {
    console.log(`  ⚠️  Images directory not found: ${imagesDir}`);
    return;
  }

  // Get all images
  const allImages = getAllChapterImages(chapterDir, chapterNum);
  const properlyNamed = allImages.filter(img => img.properlyNamed).length;

  console.log(`  Total images: ${allImages.length}`);
  console.log(`  Properly named: ${properlyNamed}`);
  console.log(`  Need standardization: ${allImages.length - properlyNamed}`);

  // Build reference order from markdown files
  const referenceMapping = buildChapterReferenceOrder(chapterDir, chapterNum, imagesDir, verbose);

  console.log(`  Referenced images: ${Object.keys(referenceMapping).length}`);

  // Find unreferenced images
  const unreferenced = findUnreferencedImages(allImages, referenceMapping);
  if (unreferenced.length > 0) {
    console.log(`  ⚠️  Unreferenced images: ${unreferenced.length}`);
    if (verbose) {
      for (let i = 0; i < Math.min(5, unreferenced.length); i++) {
        console.log(`      - ${unreferenced[i].filename}`);
      }
      if (unreferenced.length > 5) {
        console.log(`      ... and ${unreferenced.length - 5} more`);
      }
    }
  }

  // Count how many actually need renaming
  const needRename = Object.values(referenceMapping).filter(v => v.needsRename).length;

  if (needRename === 0) {
    console.log(`  ✅ All referenced images already follow naming convention!`);
    return;
  }

  console.log(`  Images to rename: ${needRename}`);

  if (!dryRun) {
    const confirmed = await askConfirmation(`\n  Proceed with renaming in Chapter ${chapterNum}? (yes/no): `);
    if (!confirmed) {
      console.log(`  Skipped Chapter ${chapterNum}`);
      return;
    }
  }

  // Perform renames
  const renamed = performRenames(chapterNum, referenceMapping, dryRun);

  // Update markdown files
  updateMarkdownFiles(chapterDir, referenceMapping, dryRun);

  // Summary
  console.log(`\n  Summary for Chapter ${chapterNum}:`);
  if (dryRun) {
    console.log(`    [DRY RUN] Would rename ${needRename} images`);
  } else {
    console.log(`    ✓ Renamed ${renamed.length} images`);
    console.log(`    ✓ Updated markdown references`);
  }
}

/**
 * Main function.
 * @returns {number} Exit code
 */
async function main() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: false,
    chapter: null,
    verbose: false
  };

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') {
      options.dryRun = true;
    } else if (args[i] === '--chapter' && i + 1 < args.length) {
      options.chapter = parseInt(args[++i]);
    } else if (args[i] === '--verbose') {
      options.verbose = true;
    }
  }

  console.log('='.repeat(80));
  console.log('Figure Filename Standardization Tool');
  console.log('='.repeat(80));
  console.log('\nThis script will:');
  console.log('  1. Find all figures that don\'t follow naming convention');
  console.log('  2. Determine correct position based on order in markdown');
  console.log('  3. Rename figures to: ChapterNum_ImageNum_descriptive_name.ext');
  console.log('  4. Update all markdown references');

  if (options.dryRun) {
    console.log('\n⚠️  DRY RUN MODE - No changes will be made');
  }

  // Determine which chapters to process
  let chaptersToProcess;
  if (options.chapter) {
    if (!CHAPTERS[options.chapter]) {
      console.log(`\n❌ Error: Invalid chapter number ${options.chapter}. Must be 1-11.`);
      return 1;
    }
    chaptersToProcess = [options.chapter];
  } else {
    chaptersToProcess = Object.keys(CHAPTERS).map(Number).sort((a, b) => a - b);
  }

  // Process each chapter
  for (const chapterNum of chaptersToProcess) {
    try {
      await processChapter(chapterNum, options.dryRun, options.verbose);
    } catch (error) {
      console.log(`\n❌ Error processing Chapter ${chapterNum}: ${error.message}`);
      if (options.verbose) {
        console.error(error);
      }
    }
  }

  // Final summary
  console.log('\n' + '='.repeat(80));
  if (options.dryRun) {
    console.log('DRY RUN COMPLETE - No changes were made');
    console.log('Run without --dry-run to apply changes');
  } else {
    console.log('STANDARDIZATION COMPLETE');
    console.log('\n⚠️  Recommendations:');
    console.log('  1. Run validation: node scripts/validate_references_enhanced.js');
    console.log('  2. Test the build: npm run build');
    console.log('  3. Check for broken references: node scripts/find_broken_references.js');
  }
  console.log('='.repeat(80));

  return 0;
}

// Run if called directly
if (require.main === module) {
  main().then(process.exit).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = {
  getAllChapterImages,
  buildChapterReferenceOrder,
  findUnreferencedImages,
  performRenames,
  updateMarkdownFiles,
  processChapter
};
