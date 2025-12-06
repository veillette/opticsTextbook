#!/usr/bin/env node
/**
 * Standardize Equation Labels
 *
 * This script converts legacy equation labels to the new standardized format:
 *   Format: eq:chapter-code:descriptive-name
 *
 * Chapter codes:
 *   - basics = Chapter 1 (Nature of Light)
 *   - geo = Chapter 2 (Geometrical Optics)
 *   - inst = Chapter 3 (Optical Instruments)
 *   - pol = Chapter 4 (Polarization)
 *   - wave = Chapter 5 (Wave Equations)
 *   - coh = Chapter 6 (Interference and Coherence)
 *   - diff = Chapter 7 (Diffraction)
 *   - laser = Chapter 8 (Lasers)
 *   - fiber = Chapter 10 (Fiber Optics)
 *   - ray = Chapter 11 (Ray Matrix)
 *
 * Usage:
 *   node standardize_equation_labels.js [--check] [file_path]
 *
 *   --check: Only check for non-standard labels without modifying files
 */

const fs = require('fs');
const path = require('path');
const { getChapterCodes, getChapterCodeFromPath } = require('./shared_utils');

// Load chapter code mappings from configuration
const CHAPTER_CODES = getChapterCodes();

// Load chapter-specific equation label mappings (optional)
// This file contains legacy label conversions for specific chapters
let LABEL_MAPPINGS = {};
const MAPPINGS_FILE = path.join(__dirname, 'equation_label_mappings.json');

try {
  if (fs.existsSync(MAPPINGS_FILE)) {
    const mappingsData = fs.readFileSync(MAPPINGS_FILE, 'utf8');
    LABEL_MAPPINGS = JSON.parse(mappingsData);
  }
} catch (error) {
  // Mappings file is optional - script will work without it
  console.warn(`Note: Could not load equation label mappings from ${MAPPINGS_FILE}`);
}

/**
 * Extract chapter code from file path.
 * @param {string} filePath - File path to analyze
 * @returns {string|null} Chapter code or null if not found
 */
function getChapterCode(filePath) {
  // Use shared utility function
  return getChapterCodeFromPath(filePath);
}

/**
 * Convert an old label to the new standardized format.
 * @param {string} oldLabel - Old label to convert
 * @param {string} chapterCode - Chapter code
 * @param {Object} mappings - Specific mappings for this chapter
 * @returns {string} New standardized label
 */
function convertLabel(oldLabel, chapterCode, mappings) {
  // Check if already in new format
  if (oldLabel.startsWith(`eq:${chapterCode}:`)) {
    return oldLabel;
  }

  // Check mappings
  if (mappings[oldLabel]) {
    return mappings[oldLabel];
  }

  // Convert dot notation to colon notation
  if (oldLabel.startsWith('eq.')) {
    let name = oldLabel.substring(3); // Remove 'eq.'
    // Convert underscores and camelCase to hyphens
    name = name.replace(/_/g, '-');
    name = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `eq:${chapterCode}:${name}`;
  }

  // Labels without 'eq.' prefix
  let name = oldLabel.replace(/_/g, '-');
  name = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  return `eq:${chapterCode}:${name}`;
}

/**
 * Find all non-standard equation labels in content.
 * @param {string} content - File content to analyze
 * @param {string} chapterCode - Chapter code
 * @returns {Array} Array of issues found
 */
function findNonStandardLabels(content, chapterCode) {
  const issues = [];

  // Pattern for MyST math block labels
  const labelPattern = /:label:\s*(\S+)/g;
  let match;

  while ((match = labelPattern.exec(content)) !== null) {
    const label = match[1];
    // Check if label follows the standard format
    const standardPattern = new RegExp(`^eq:${chapterCode}:[a-z0-9-]+$`);
    if (!standardPattern.test(label)) {
      issues.push({
        old: label,
        position: match.index,
        type: 'myst'
      });
    }
  }

  // Pattern for inline labels in $$ ... \label{} ... $$
  const inlinePattern = /\$\$[^$]*\\label\{([^}]+)\}[^$]*\$\$/gs;
  while ((match = inlinePattern.exec(content)) !== null) {
    const label = match[1];
    issues.push({
      old: label,
      position: match.index,
      type: 'latex_inline'
    });
  }

  return issues;
}

/**
 * Standardize equation labels in a single file.
 * @param {string} filePath - Path to file to process
 * @param {boolean} checkOnly - Only check without modifying
 * @returns {number} Number of issues found/fixed
 */
function standardizeFile(filePath, checkOnly = false) {
  const content = fs.readFileSync(filePath, 'utf8');

  const chapterCode = getChapterCode(filePath);
  if (!chapterCode) {
    console.log(`Warning: Could not determine chapter code for ${filePath}`);
    return 0;
  }

  // Get appropriate mappings for this chapter (if available)
  const mappings = LABEL_MAPPINGS[chapterCode] || {};

  const issues = findNonStandardLabels(content, chapterCode);

  if (checkOnly) {
    if (issues.length > 0) {
      console.log(`\n${filePath}:`);
      for (const issue of issues) {
        const newLabel = convertLabel(issue.old, chapterCode, mappings);
        const lineNum = content.substring(0, issue.position).split('\n').length;
        console.log(`  Line ~${lineNum}: ${issue.old} -> ${newLabel}`);
      }
    }
    return issues.length;
  }

  // Apply fixes
  if (issues.length === 0) {
    return 0;
  }

  let newContent = content;

  // Replace labels in reverse order to preserve positions
  const sortedIssues = issues.sort((a, b) => b.position - a.position);
  for (const issue of sortedIssues) {
    const oldLabel = issue.old;
    const newLabel = convertLabel(oldLabel, chapterCode, mappings);

    // Replace the label definition
    newContent = newContent.replace(`:label: ${oldLabel}`, `:label: ${newLabel}`);

    // Replace all references to this label
    // MyST equation reference format: {eq}`label`
    const eqRefPattern = new RegExp(`\\{eq\\}\`${oldLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\``, 'g');
    newContent = newContent.replace(eqRefPattern, `{eq}\`${newLabel}\``);

    // Also handle inline equation references: [](#label)
    newContent = newContent.replace(`[](#${oldLabel})`, `{eq}\`${newLabel}\``);
  }

  fs.writeFileSync(filePath, newContent, 'utf8');

  console.log(`Updated ${issues.length} labels in ${filePath}`);
  return issues.length;
}

/**
 * Validate all equation labels in the content directory.
 * @param {string} contentDir - Content directory path
 * @returns {number} Total number of issues found
 */
function validateLabels(contentDir) {
  let issuesFound = 0;

  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file.endsWith('.md')) {
        const chapterCode = getChapterCode(fullPath);
        if (!chapterCode) {
          continue;
        }

        const content = fs.readFileSync(fullPath, 'utf8');
        const issues = findNonStandardLabels(content, chapterCode);

        if (issues.length > 0) {
          console.log(`\n${fullPath}:`);
          for (const issue of issues) {
            console.log(`  Non-standard label: ${issue.old}`);
          }
          issuesFound += issues.length;
        }
      }
    }
  }

  walkDir(contentDir);
  return issuesFound;
}

/**
 * Main function.
 */
function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');

  // Find content directory
  const scriptDir = __dirname;
  const contentDir = path.join(scriptDir, '..', 'content');

  // Get file path if specified
  const fileArg = args.find(arg => !arg.startsWith('--'));

  if (fileArg) {
    // Process specific file
    const filePath = path.resolve(fileArg);
    if (fs.existsSync(filePath)) {
      const count = standardizeFile(filePath, checkOnly);
      console.log(`\nTotal issues: ${count}`);
    } else {
      console.log(`File not found: ${filePath}`);
      process.exit(1);
    }
  } else {
    // Process all files
    let total = 0;

    function processDir(dir) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          processDir(fullPath);
        } else if (file.endsWith('.md')) {
          const count = standardizeFile(fullPath, checkOnly);
          total += count;
        }
      }
    }

    processDir(contentDir);
    console.log(`\n${checkOnly ? 'Issues found' : 'Labels updated'}: ${total}`);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  getChapterCode,
  convertLabel,
  findNonStandardLabels,
  standardizeFile,
  validateLabels
};
