#!/usr/bin/env node
/**
 * Insert Figure Tool
 *
 * This script inserts a new figure into a chapter and renumbers subsequent figures.
 *
 * Features:
 * 1. Accepts a new image file and desired position in a chapter
 * 2. Renames the new image to follow the chapter's naming convention (ChapterNum_ImageNum_descriptive_name.ext)
 * 3. Renumbers all subsequent figures in that chapter
 * 4. Updates all markdown references to the renumbered figures
 * 5. Handles both image files and their corresponding .ai source files
 *
 * Usage:
 *   node insert_figure.js --image path/to/new_image.png --chapter 3 --position 5 --name "lens_diagram"
 *
 *   This would:
 *   - Rename new_image.png to 03_05_lens_diagram.png
 *   - Renumber existing 03_05_*.* to 03_06_*.*
 *   - Renumber existing 03_06_*.* to 03_07_*.*
 *   - And so on...
 *   - Update all markdown references
 *
 * Options:
 *   --image PATH         Path to the new image file (required)
 *   --chapter NUM        Chapter number (1-11) (required)
 *   --position NUM       Position to insert (1-based) (required)
 *   --name NAME          Descriptive name for the image (optional, uses original filename if not provided)
 *   --dry-run           Show what would be done without making changes
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { getChapters, toSnakeCase } = require('./shared_utils');

/**
 * Get all existing figures in a chapter sorted by position number.
 * @param {string} chapterDir - Chapter directory path
 * @param {number} chapterNum - Chapter number
 * @returns {Array} Array of figure objects
 */
function getExistingFigures(chapterDir, chapterNum) {
  const imagesDir = path.join(chapterDir, 'Images');
  if (!fs.existsSync(imagesDir)) {
    return [];
  }

  const figures = [];
  const pattern = new RegExp(`^${chapterNum.toString().padStart(2, '0')}_(\\d+)_(.+)\\.(\\w+)$`);
  const extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'];

  for (const ext of extensions) {
    const files = fs.readdirSync(imagesDir);
    for (const filename of files) {
      if (filename.endsWith(`.${ext}`)) {
        const match = filename.match(pattern);
        if (match) {
          const position = parseInt(match[1], 10);
          const name = match[2];
          const extension = match[3];

          figures.push({
            path: path.join(imagesDir, filename),
            position: position,
            name: name,
            extension: extension,
            filename: filename
          });
        }
      }
    }
  }

  // Sort by position
  figures.sort((a, b) => a.position - b.position);
  return figures;
}

/**
 * Generate a new filename following the naming convention.
 * @param {number} chapterNum - Chapter number
 * @param {number} position - Position in chapter
 * @param {string} descriptiveName - Descriptive name
 * @param {string} extension - File extension
 * @returns {string} New filename
 */
function generateNewFilename(chapterNum, position, descriptiveName, extension) {
  // Ensure descriptive name is in snake_case
  const cleanName = toSnakeCase(descriptiveName);

  return `${chapterNum.toString().padStart(2, '0')}_${position.toString().padStart(2, '0')}_${cleanName}.${extension}`;
}

/**
 * Create a mapping of old to new filenames for renumbering.
 * @param {Array} existingFigures - Array of existing figures
 * @param {number} insertPosition - Position to insert new figure
 * @param {number} chapterNum - Chapter number
 * @returns {Array} Array of rename operations
 */
function createRenameMap(existingFigures, insertPosition, chapterNum) {
  const renameMap = [];

  for (const fig of existingFigures) {
    if (fig.position >= insertPosition) {
      // This figure needs to be renumbered
      const newPosition = fig.position + 1;
      const newFilename = `${chapterNum.toString().padStart(2, '0')}_${newPosition.toString().padStart(2, '0')}_${fig.name}.${fig.extension}`;
      const newPath = path.join(path.dirname(fig.path), newFilename);

      renameMap.push({
        oldPath: fig.path,
        newPath: newPath,
        oldFilename: fig.filename,
        newFilename: newFilename,
        oldPosition: fig.position,
        newPosition: newPosition
      });
    }
  }

  // Process in reverse order to avoid conflicts
  renameMap.reverse();

  return renameMap;
}

/**
 * Copy the new image to the chapter's Images directory with proper naming.
 * @param {string} sourcePath - Source image path
 * @param {string} chapterDir - Chapter directory
 * @param {number} chapterNum - Chapter number
 * @param {number} position - Position to insert
 * @param {string} descriptiveName - Descriptive name
 * @param {boolean} dryRun - Dry run mode
 * @returns {Object|null} New image info or null on error
 */
function copyAndRenameNewImage(sourcePath, chapterDir, chapterNum, position, descriptiveName, dryRun = false) {
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Error: Source image '${sourcePath}' not found!`);
    return null;
  }

  // Get extension
  const extension = path.extname(sourcePath).substring(1);  // Remove the leading dot

  // Generate new filename
  const newFilename = generateNewFilename(chapterNum, position, descriptiveName, extension);

  // Destination path
  const imagesDir = path.join(chapterDir, 'Images');
  if (!fs.existsSync(imagesDir)) {
    if (!dryRun) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
  }
  const destPath = path.join(imagesDir, newFilename);

  if (dryRun) {
    console.log(`[DRY RUN] Would copy: ${sourcePath} -> ${destPath}`);
  } else {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✓ Copied new image: ${path.basename(sourcePath)} -> ${newFilename}`);
  }

  // Check for corresponding .ai file
  const aiSource = sourcePath.replace(path.extname(sourcePath), '.ai');
  if (fs.existsSync(aiSource)) {
    const aiDest = destPath.replace(path.extname(destPath), '.ai');
    if (dryRun) {
      console.log(`[DRY RUN] Would copy AI file: ${aiSource} -> ${aiDest}`);
    } else {
      fs.copyFileSync(aiSource, aiDest);
      console.log(`✓ Copied AI file: ${path.basename(aiSource)} -> ${path.basename(aiDest)}`);
    }
  }

  return {
    filename: newFilename,
    path: destPath
  };
}

/**
 * Rename existing figures to make room for the new insertion.
 * @param {Array} renameMap - Array of rename operations
 * @param {boolean} dryRun - Dry run mode
 * @returns {Array} Array of renamed files
 */
function performRenumbering(renameMap, dryRun = false) {
  if (renameMap.length === 0) {
    console.log('No files need renumbering.');
    return [];
  }

  console.log(`\n${dryRun ? '[DRY RUN] ' : ''}Renumbering ${renameMap.length} existing figures...`);

  const renamed = [];
  for (const item of renameMap) {
    if (dryRun) {
      console.log(`  Would rename: ${item.oldFilename} -> ${item.newFilename}`);
    } else {
      // Rename image file
      if (fs.existsSync(item.oldPath)) {
        fs.renameSync(item.oldPath, item.newPath);
        console.log(`  ✓ Renamed: ${item.oldFilename} -> ${item.newFilename}`);
        renamed.push(item);

        // Rename corresponding .ai file if it exists
        const aiOld = item.oldPath.replace(path.extname(item.oldPath), '.ai');
        const aiNew = item.newPath.replace(path.extname(item.newPath), '.ai');
        if (fs.existsSync(aiOld)) {
          fs.renameSync(aiOld, aiNew);
          console.log('    + AI file renamed');
        }
      }
    }
  }

  return renamed;
}

/**
 * Update all markdown references to reflect the renumbering.
 * @param {string} chapterDir - Chapter directory
 * @param {Array} renameMap - Array of rename operations
 * @param {Object} newImageInfo - New image information
 * @param {boolean} dryRun - Dry run mode
 */
function updateMarkdownReferences(chapterDir, renameMap, newImageInfo, dryRun = false) {
  if (renameMap.length === 0 && !newImageInfo) {
    console.log('No markdown updates needed.');
    return;
  }

  console.log(`\n${dryRun ? '[DRY RUN] ' : ''}Updating markdown references...`);

  // Find all markdown files in the chapter
  const chapterPath = path.resolve(chapterDir);
  const mdFiles = [];

  // Main chapter markdown files
  const mainMdFiles = fs.readdirSync(chapterPath).filter(f => f.endsWith('.md'));
  for (const file of mainMdFiles) {
    mdFiles.push(path.join(chapterPath, file));
  }

  // Problems directory markdown files
  const problemsDir = path.join(chapterPath, 'Problems');
  if (fs.existsSync(problemsDir)) {
    const problemMdFiles = fs.readdirSync(problemsDir).filter(f => f.endsWith('.md'));
    for (const file of problemMdFiles) {
      mdFiles.push(path.join(problemsDir, file));
    }
  }

  for (const mdFile of mdFiles) {
    let content = fs.readFileSync(mdFile, 'utf8');
    const originalContent = content;

    // Update references for renumbered files (process in order of renameMap which is reversed)
    for (const item of renameMap) {
      const oldName = item.oldFilename;
      const newName = item.newFilename;

      // Pattern 1: Images/filename
      content = content.replace(new RegExp(`Images/${oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'), `Images/${newName}`);
      // Pattern 2: ../Images/filename (from Problems directory)
      content = content.replace(new RegExp(`\\.\\./Images/${oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'), `../Images/${newName}`);
    }

    if (content !== originalContent) {
      if (dryRun) {
        console.log(`  Would update: ${path.relative(chapterPath, mdFile)}`);
      } else {
        fs.writeFileSync(mdFile, content, 'utf8');
        console.log(`  ✓ Updated: ${path.relative(chapterPath, mdFile)}`);
      }
    }
  }
}

/**
 * Validate command line arguments.
 * @param {Object} args - Parsed arguments
 * @returns {string[]} Array of error messages
 */
function validateInputs(args) {
  const errors = [];
  const chapters = getChapters();

  // Validate chapter number
  if (!chapters[args.chapter]) {
    const validChapters = Object.keys(chapters).map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
    errors.push(`Invalid chapter number: ${args.chapter}. Must be one of: ${validChapters.join(', ')}.`);
  }

  // Validate image file exists
  if (!fs.existsSync(args.image)) {
    errors.push(`Image file not found: ${args.image}`);
  }

  // Validate position is positive
  if (args.position < 1) {
    errors.push(`Position must be >= 1, got: ${args.position}`);
  }

  // Get existing figures to validate position
  if (chapters[args.chapter]) {
    const chapterInfo = chapters[args.chapter];
    const chapterDir = chapterInfo.dir;
    if (fs.existsSync(chapterDir)) {
      const existing = getExistingFigures(chapterDir, args.chapter);
      const maxPosition = existing.length + 1;
      if (args.position > maxPosition) {
        errors.push(`Position ${args.position} is too large. Chapter ${args.chapter} has ${existing.length} figures. Maximum position is ${maxPosition}.`);
      }
    }
  }

  return errors;
}

/**
 * Prompt user for confirmation.
 * @param {string} question - Question to ask
 * @returns {Promise<boolean>} True if user confirmed
 */
async function confirm(question) {
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
 * Main function.
 */
async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const parsedArgs = {
    image: null,
    chapter: null,
    position: null,
    name: null,
    dryRun: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--image' && i + 1 < args.length) {
      parsedArgs.image = args[i + 1];
      i++;
    } else if (args[i] === '--chapter' && i + 1 < args.length) {
      parsedArgs.chapter = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--position' && i + 1 < args.length) {
      parsedArgs.position = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--name' && i + 1 < args.length) {
      parsedArgs.name = args[i + 1];
      i++;
    } else if (args[i] === '--dry-run') {
      parsedArgs.dryRun = true;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Insert Figure Tool

Usage:
  node insert_figure.js --image <path> --chapter <num> --position <num> [--name <name>] [--dry-run]

Options:
  --image PATH         Path to the new image file (required)
  --chapter NUM        Chapter number (required)
  --position NUM       Position to insert (1-based) (required)
  --name NAME          Descriptive name for the image (optional)
  --dry-run           Show what would be done without making changes
  --help, -h          Show this help message

Examples:
  # Insert a new figure as the 5th image in chapter 3
  node insert_figure.js --image ~/Downloads/lens.png --chapter 3 --position 5 --name "lens_diagram"

  # Preview what would happen (dry run)
  node insert_figure.js --image lens.png --chapter 7 --position 10 --name "diffraction_pattern" --dry-run

  # Insert at the end of chapter 2
  node insert_figure.js --image mirror.jpg --chapter 2 --position 999 --name "curved_mirror"
      `);
      return 0;
    }
  }

  // Check required arguments
  if (!parsedArgs.image || parsedArgs.chapter === null || parsedArgs.position === null) {
    console.error('❌ Error: Missing required arguments.');
    console.error('Usage: node insert_figure.js --image <path> --chapter <num> --position <num> [--name <name>] [--dry-run]');
    console.error('Run with --help for more information.');
    return 1;
  }

  // Validate inputs
  const errors = validateInputs(parsedArgs);
  if (errors.length > 0) {
    console.error('❌ Validation errors:');
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    return 1;
  }

  console.log('='.repeat(80));
  console.log('Figure Insertion and Renumbering Tool');
  console.log('='.repeat(80));

  // Get chapter info
  const chapters = getChapters();
  const chapterInfo = chapters[parsedArgs.chapter];
  const chapterDir = chapterInfo.dir;

  // Get descriptive name
  let descriptiveName = parsedArgs.name;
  if (!descriptiveName) {
    // Use original filename without extension
    descriptiveName = path.basename(parsedArgs.image, path.extname(parsedArgs.image));
  }

  console.log(`\nChapter: ${parsedArgs.chapter} (${chapterDir})`);
  console.log(`New image: ${parsedArgs.image}`);
  console.log(`Insert position: ${parsedArgs.position}`);
  console.log(`Descriptive name: ${descriptiveName}`);

  // Get existing figures
  const existingFigures = getExistingFigures(chapterDir, parsedArgs.chapter);
  console.log(`\nExisting figures in chapter: ${existingFigures.length}`);

  // Adjust position if it's beyond the end
  if (parsedArgs.position > existingFigures.length + 1) {
    const adjustedPosition = existingFigures.length + 1;
    console.log(`⚠️  Position ${parsedArgs.position} is beyond the end. Adjusting to ${adjustedPosition}.`);
    parsedArgs.position = adjustedPosition;
  }

  // Show existing figures around the insertion point
  if (existingFigures.length > 0) {
    console.log('\nFigures around insertion point:');
    for (const fig of existingFigures) {
      let marker = '  ';
      if (fig.position === parsedArgs.position - 1) {
        marker = '↑ ';
      } else if (fig.position === parsedArgs.position) {
        marker = '→ INSERT HERE';
      }

      if (Math.abs(fig.position - parsedArgs.position) <= 2 || marker === '→ INSERT HERE') {
        console.log(`  ${marker} [${fig.position.toString().padStart(2, '0')}] ${fig.filename}`);
      }
    }

    if (parsedArgs.position > existingFigures.length) {
      console.log('  → INSERT HERE (at end)');
    }
  }

  // Create rename map for existing figures
  const renameMap = createRenameMap(existingFigures, parsedArgs.position, parsedArgs.chapter);

  if (!parsedArgs.dryRun) {
    const confirmed = await confirm('\nProceed with insertion and renumbering? (yes/no): ');
    if (!confirmed) {
      console.log('Operation cancelled.');
      return 0;
    }
  }

  // Step 1: Renumber existing figures (in reverse order to avoid conflicts)
  const renamedFiles = performRenumbering(renameMap, parsedArgs.dryRun);

  // Step 2: Copy and rename the new image
  console.log(`\n${parsedArgs.dryRun ? '[DRY RUN] ' : ''}Inserting new figure...`);
  const newImageInfo = copyAndRenameNewImage(
    parsedArgs.image, chapterDir, parsedArgs.chapter, parsedArgs.position, descriptiveName, parsedArgs.dryRun
  );

  // Step 3: Update markdown references
  updateMarkdownReferences(chapterDir, renameMap, newImageInfo, parsedArgs.dryRun);

  // Summary
  console.log('\n' + '='.repeat(80));
  if (parsedArgs.dryRun) {
    console.log('DRY RUN COMPLETE - No changes were made');
    console.log(`Would insert: ${newImageInfo ? newImageInfo.filename : 'N/A'}`);
    console.log(`Would renumber: ${renameMap.length} existing figures`);
  } else {
    console.log('INSERTION COMPLETE');
    console.log(`✓ Inserted: ${newImageInfo ? newImageInfo.filename : 'N/A'}`);
    console.log(`✓ Renumbered: ${renamedFiles.length} existing figures`);
    console.log('✓ Updated markdown references');
    console.log(`\n⚠️  Don't forget to add the figure reference in your markdown file!`);
    console.log(`    Example: \`\`\`{figure} Images/${newImageInfo ? newImageInfo.filename : ''}`);
  }
  console.log('='.repeat(80));

  return 0;
}

// Run if called directly
if (require.main === module) {
  main().then(code => process.exit(code));
}

module.exports = {
  getExistingFigures,
  generateNewFilename,
  createRenameMap,
  copyAndRenameNewImage,
  performRenumbering,
  updateMarkdownReferences,
  validateInputs
};
