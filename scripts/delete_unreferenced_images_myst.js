#!/usr/bin/env node
/**
 * Enhanced script to delete unreferenced images, including .ai files.
 *
 * This improved script:
 * 1. Handles both image files and their corresponding .ai source files
 * 2. Provides better safety checks and preview functionality
 * 3. Uses the output from find_unreferenced_images_myst.js
 * 4. Allows selective deletion of just images or just .ai files
 * 5. Creates comprehensive logs and backup information
 *
 * Usage:
 *     node delete_unreferenced_images_myst.js [options]
 *
 * Options:
 *     --dry-run           Show what would be deleted without actually deleting
 *     --force             Delete without asking for confirmation
 *     --images-only       Delete only image files (skip .ai files)
 *     --ai-only          Delete only .ai files (skip image files)
 *     --input-images     Custom path to unreferenced images list
 *     --input-ai         Custom path to unreferenced .ai files list
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { ReportGenerator, getTimestamp } = require('./report_utils');
const { formatFileSize } = require('./shared_utils');

/**
 * Read a list of files from a text file, ignoring comments.
 *
 * @param {string} filename - File to read
 * @returns {Array<string>} List of file paths
 */
function readFileList(filename) {
  if (!fs.existsSync(filename)) {
    return [];
  }

  const files = [];
  try {
    const content = fs.readFileSync(filename, 'utf8');
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      // Skip comments and empty lines
      if (trimmed && !trimmed.startsWith('#')) {
        // Remove inline comments
        const filePath = trimmed.split('#')[0].trim();
        if (filePath) {
          files.push(filePath);
        }
      }
    }
  } catch (err) {
    console.log(`❌ Error reading ${filename}: ${err.message}`);
  }

  return files;
}

/**
 * Get human-readable file size.
 *
 * @param {string} filePath - File path
 * @returns {string} Formatted size
 */
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return formatFileSize(stats.size);
  } catch (err) {
    return 'Unknown';
  }
}

/**
 * Calculate total size of files that exist.
 *
 * @param {Array<string>} filePaths - List of file paths
 * @returns {number} Total size in bytes
 */
function getTotalSize(filePaths) {
  let total = 0;
  for (const filePath of filePaths) {
    if (fs.existsSync(filePath)) {
      try {
        const stats = fs.statSync(filePath);
        total += stats.size;
      } catch (err) {
        // Skip files that can't be read
      }
    }
  }
  return total;
}

/**
 * Analyze the files to be deleted.
 *
 * @param {Array<string>} imageFiles - Image file paths
 * @param {Array<string>} aiFiles - AI file paths
 * @returns {Object} Analysis results
 */
function analyzeFiles(imageFiles, aiFiles) {
  const existingImages = imageFiles.filter(f => fs.existsSync(f));
  const existingAi = aiFiles.filter(f => fs.existsSync(f));
  const missingImages = imageFiles.filter(f => !fs.existsSync(f));
  const missingAi = aiFiles.filter(f => !fs.existsSync(f));

  // Group by directory
  const imageByDir = {};
  const aiByDir = {};

  for (const img of existingImages) {
    const dirName = path.dirname(img);
    if (!imageByDir[dirName]) imageByDir[dirName] = [];
    imageByDir[dirName].push(path.basename(img));
  }

  for (const ai of existingAi) {
    const dirName = path.dirname(ai);
    if (!aiByDir[dirName]) aiByDir[dirName] = [];
    aiByDir[dirName].push(path.basename(ai));
  }

  return {
    existingImages,
    existingAi,
    missingImages,
    missingAi,
    imageByDir,
    aiByDir
  };
}

/**
 * Show a preview of what will be deleted.
 *
 * @param {Object} analysis - Analysis results
 * @param {boolean} deleteImages - Whether to delete images
 * @param {boolean} deleteAi - Whether to delete AI files
 * @returns {boolean} True if there are files to delete
 */
function previewDeletion(analysis, deleteImages = true, deleteAi = true) {
  console.log('\n=== DELETION PREVIEW ===');

  let totalFiles = 0;
  let totalSize = 0;

  if (deleteImages) {
    totalFiles += analysis.existingImages.length;
    totalSize += getTotalSize(analysis.existingImages);

    console.log(`\nImage files to be deleted: ${analysis.existingImages.length}`);
    if (analysis.missingImages.length > 0) {
      console.log(`Image files already missing: ${analysis.missingImages.length}`);
    }

    if (analysis.existingImages.length > 0) {
      const imageSize = getTotalSize(analysis.existingImages);
      console.log(`Image files size: ${formatFileSize(imageSize)}`);

      // Show by directory
      const dirs = Object.keys(analysis.imageByDir).sort().slice(0, 5);
      for (const dirName of dirs) {
        const files = analysis.imageByDir[dirName];
        console.log(`  📁 ${dirName}/ (${files.length} images)`);
        const displayFiles = files.sort().slice(0, 3);
        for (const file of displayFiles) {
          const fullPath = path.join(dirName, file);
          const size = getFileSize(fullPath);
          console.log(`    📄 ${file} (${size})`);
        }
        if (files.length > 3) {
          console.log(`    ... and ${files.length - 3} more`);
        }
      }
    }
  }

  if (deleteAi) {
    totalFiles += analysis.existingAi.length;
    totalSize += getTotalSize(analysis.existingAi);

    console.log(`\n.ai files to be deleted: ${analysis.existingAi.length}`);
    if (analysis.missingAi.length > 0) {
      console.log(`.ai files already missing: ${analysis.missingAi.length}`);
    }

    if (analysis.existingAi.length > 0) {
      const aiSize = getTotalSize(analysis.existingAi);
      console.log(`.ai files size: ${formatFileSize(aiSize)}`);

      // Show by directory
      const dirs = Object.keys(analysis.aiByDir).sort().slice(0, 5);
      for (const dirName of dirs) {
        const files = analysis.aiByDir[dirName];
        console.log(`  📁 ${dirName}/ (${files.length} .ai files)`);
        const displayFiles = files.sort().slice(0, 3);
        for (const file of displayFiles) {
          const fullPath = path.join(dirName, file);
          const size = getFileSize(fullPath);
          console.log(`    🎨 ${file} (${size})`);
        }
        if (files.length > 3) {
          console.log(`    ... and ${files.length - 3} more`);
        }
      }
    }
  }

  console.log(`\nTOTAL: ${totalFiles} files, ${formatFileSize(totalSize)}`);

  return totalFiles > 0;
}

/**
 * Create a backup log of what will be deleted.
 *
 * @param {Object} analysis - Analysis results
 * @param {boolean} deleteImages - Whether to delete images
 * @param {boolean} deleteAi - Whether to delete AI files
 * @returns {string} Log file path
 */
function createBackupLog(analysis, deleteImages = true, deleteAi = true) {
  const timestamp = getTimestamp();
  const reportGen = new ReportGenerator(`deletion_log_${timestamp}`);

  const backupData = {
    timestamp,
    deleteImages,
    deleteAi,
    filesToDelete: {
      images: deleteImages ? analysis.existingImages : [],
      aiFiles: deleteAi ? analysis.existingAi : []
    },
    missingFiles: {
      images: analysis.missingImages,
      aiFiles: analysis.missingAi
    },
    summary: {
      totalImagesDeleted: deleteImages ? analysis.existingImages.length : 0,
      totalAiDeleted: deleteAi ? analysis.existingAi.length : 0,
      totalSizeDeleted: (deleteImages ? getTotalSize(analysis.existingImages) : 0) +
                       (deleteAi ? getTotalSize(analysis.existingAi) : 0)
    }
  };

  const logFile = reportGen.writeJson(backupData);
  return logFile;
}

/**
 * Delete a list of files with progress tracking.
 *
 * @param {Array<string>} filePaths - Files to delete
 * @param {string} fileType - File type description
 * @param {boolean} dryRun - Whether this is a dry run
 * @returns {Array<string>} List of deleted files
 */
function deleteFiles(filePaths, fileType, dryRun = false) {
  if (filePaths.length === 0) {
    return [];
  }

  const deletedFiles = [];
  console.log(`\n${dryRun ? 'DRY RUN: ' : ''}Deleting ${fileType} files...`);

  filePaths.forEach((filePath, index) => {
    const i = index + 1;
    if (!fs.existsSync(filePath)) {
      console.log(`  [${String(i).padStart(3)}/${filePaths.length}] SKIP (missing): ${filePath}`);
      return;
    }

    try {
      const size = getFileSize(filePath);
      if (dryRun) {
        console.log(`  [${String(i).padStart(3)}/${filePaths.length}] WOULD DELETE: ${path.basename(filePath)} (${size})`);
      } else {
        fs.unlinkSync(filePath);
        deletedFiles.push(filePath);
        console.log(`  [${String(i).padStart(3)}/${filePaths.length}] DELETED: ${path.basename(filePath)} (${size})`);
      }
    } catch (err) {
      console.log(`  [${String(i).padStart(3)}/${filePaths.length}] ERROR: ${filePath} - ${err.message}`);
    }
  });

  return deletedFiles;
}

/**
 * Remove empty directories after file deletion.
 *
 * @param {string} baseDir - Base directory to clean
 * @param {boolean} dryRun - Whether this is a dry run
 * @returns {Array<string>} List of removed directories
 */
function removeEmptyDirectories(baseDir = 'content', dryRun = false) {
  const removedDirs = [];

  function walkDirBottomUp(dir, level = 0) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const subdirs = entries.filter(e => e.isDirectory()).map(e => path.join(dir, e.name));

    // First, recurse into subdirectories
    for (const subdir of subdirs) {
      walkDirBottomUp(subdir, level + 1);
    }

    // Then check if this directory is now empty
    if (dir !== baseDir) {
      const currentEntries = fs.readdirSync(dir);
      if (currentEntries.length === 0) {
        try {
          if (dryRun) {
            console.log(`  WOULD REMOVE empty directory: ${dir}`);
          } else {
            fs.rmdirSync(dir);
            removedDirs.push(dir);
            console.log(`  REMOVED empty directory: ${dir}`);
          }
        } catch (err) {
          console.log(`  ERROR removing directory ${dir}: ${err.message}`);
        }
      }
    }
  }

  walkDirBottomUp(baseDir);
  return removedDirs;
}

/**
 * Ask user for confirmation via readline.
 *
 * @param {string} question - Question to ask
 * @returns {Promise<boolean>} True if confirmed
 */
function askConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    const ask = () => {
      rl.question(question, (answer) => {
        const response = answer.toLowerCase().trim();
        if (response === 'yes' || response === 'y') {
          rl.close();
          resolve(true);
        } else if (response === 'no' || response === 'n') {
          rl.close();
          resolve(false);
        } else {
          console.log("Please answer 'yes' or 'no'");
          ask();
        }
      });
    };
    ask();
  });
}

async function main() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes('--dry-run'),
    force: args.includes('--force'),
    imagesOnly: args.includes('--images-only'),
    aiOnly: args.includes('--ai-only'),
    inputImages: 'reports/unreferenced_images.txt',
    inputAi: 'reports/unreferenced_ai_files.txt'
  };

  // Parse input-images
  const inputImagesIdx = args.indexOf('--input-images');
  if (inputImagesIdx !== -1 && args[inputImagesIdx + 1]) {
    options.inputImages = args[inputImagesIdx + 1];
  }

  // Parse input-ai
  const inputAiIdx = args.indexOf('--input-ai');
  if (inputAiIdx !== -1 && args[inputAiIdx + 1]) {
    options.inputAi = args[inputAiIdx + 1];
  }

  console.log('=== Enhanced Unreferenced Images Deletion Tool ===\n');

  // Determine what to delete
  const deleteImages = !options.aiOnly;
  const deleteAi = !options.imagesOnly;

  if (options.imagesOnly && options.aiOnly) {
    console.log('❌ Error: Cannot specify both --images-only and --ai-only');
    return 1;
  }

  // Read file lists
  const imageFiles = deleteImages ? readFileList(options.inputImages) : [];
  const aiFiles = deleteAi ? readFileList(options.inputAi) : [];

  if (imageFiles.length === 0 && aiFiles.length === 0) {
    if (deleteImages && !fs.existsSync(options.inputImages)) {
      console.log(`❌ Error: Image file list '${options.inputImages}' not found!`);
      console.log("Please run 'node scripts/find_unreferenced_images_myst.js' first.");
    }
    if (deleteAi && !fs.existsSync(options.inputAi)) {
      console.log(`❌ Error: AI file list '${options.inputAi}' not found!`);
      console.log("Please run 'node scripts/find_unreferenced_images_myst.js --include-ai' first.");
    }
    return 1;
  }

  // Analyze files
  const analysis = analyzeFiles(imageFiles, aiFiles);

  // Show preview
  const hasFilesToDelete = previewDeletion(analysis, deleteImages, deleteAi);

  if (!hasFilesToDelete) {
    console.log('\n✅ No files to delete.');
    return 0;
  }

  // Ask for confirmation unless --force or --dry-run
  if (!options.force && !options.dryRun) {
    let totalFiles = 0;
    if (deleteImages) {
      totalFiles += analysis.existingImages.length;
    }
    if (deleteAi) {
      totalFiles += analysis.existingAi.length;
    }

    console.log(`\n⚠️  This will PERMANENTLY DELETE ${totalFiles} files!`);
    console.log('A backup log will be created before deletion.');

    const confirmed = await askConfirmation('\nProceed with deletion? (yes/no): ');
    if (!confirmed) {
      console.log('Deletion cancelled.');
      return 0;
    }
  }

  // Create backup log
  let logFile;
  if (!options.dryRun) {
    logFile = createBackupLog(analysis, deleteImages, deleteAi);
    console.log(`\n📄 Backup log created: ${logFile}`);
  }

  // Delete files
  const allDeleted = [];

  if (deleteImages && analysis.existingImages.length > 0) {
    const deletedImages = deleteFiles(analysis.existingImages, 'image', options.dryRun);
    allDeleted.push(...deletedImages);
  }

  if (deleteAi && analysis.existingAi.length > 0) {
    const deletedAi = deleteFiles(analysis.existingAi, '.ai', options.dryRun);
    allDeleted.push(...deletedAi);
  }

  // Remove empty directories
  let removedDirs = [];
  if (!options.dryRun && allDeleted.length > 0) {
    console.log('\nCleaning up empty directories...');
    removedDirs = removeEmptyDirectories('content', options.dryRun);
  }

  // Summary
  console.log('\n=== SUMMARY ===');
  if (options.dryRun) {
    console.log('DRY RUN completed.');
    if (deleteImages) {
      console.log(`Would delete ${analysis.existingImages.length} image files`);
    }
    if (deleteAi) {
      console.log(`Would delete ${analysis.existingAi.length} .ai files`);
    }
  } else {
    console.log('Deletion completed.');
    if (deleteImages) {
      const deletedImages = allDeleted.filter(f => !f.endsWith('.ai')).length;
      console.log(`Image files deleted: ${deletedImages}`);
    }
    if (deleteAi) {
      const deletedAi = allDeleted.filter(f => f.endsWith('.ai')).length;
      console.log(`.ai files deleted: ${deletedAi}`);
    }

    if (allDeleted.length > 0) {
      const totalSize = getTotalSize(allDeleted);
      console.log(`Total space freed: ${formatFileSize(totalSize)}`);
      console.log(`Backup log: ${logFile}`);
    }

    if (removedDirs.length > 0) {
      console.log(`Empty directories removed: ${removedDirs.length}`);
    }
  }

  return 0;
}

if (require.main === module) {
  main().then(code => process.exit(code));
}

module.exports = {
  readFileList,
  analyzeFiles,
  previewDeletion,
  deleteFiles,
  removeEmptyDirectories
};
