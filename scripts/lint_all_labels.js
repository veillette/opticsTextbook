#!/usr/bin/env node
/**
 * Lint All Labels (Figures, Tables, Sections, Chapters)
 *
 * This script checks for non-standard labels in MyST markdown files for:
 * - Figure labels
 * - Table labels
 * - Section labels
 * - Chapter labels
 * - Appendix labels
 *
 * Standard formats (using camelCase):
 *   - Figure: fig:chapter-code:descriptiveName
 *   - Table: table:chapter-code:descriptiveName
 *   - Section: (sec:chapter-code:descriptiveName)=
 *   - Chapter: (chapter:chapter-code)=
 *   - Appendix: (appendix:descriptiveName)=
 *
 * Chapter codes: basics, geo, inst, pol, wave, coh, diff, laser, adv, fiber, ray
 *
 * Usage:
 *   node lint_all_labels.js [--fix] [--verbose] [file_path ...]
 *
 *   --fix: Automatically fix non-standard labels
 *   --verbose: Show detailed information about each issue
 *
 * Exit codes:
 *   0: All labels are valid
 *   1: Non-standard labels found (use --fix to convert)
 */

const fs = require('fs');
const path = require('path');
const { getChapterCodes, getChapterCodeFromPath } = require('./shared_utils');

// Load chapter code mappings from configuration
const CHAPTER_CODES = getChapterCodes();
const VALID_CHAPTER_CODES = new Set(Object.values(CHAPTER_CODES));

/**
 * Class representing a non-standard label issue.
 */
class LabelIssue {
  constructor(label, lineNum, issueType, suggestedFix, context, labelCategory) {
    this.label = label;
    this.lineNum = lineNum;
    this.issueType = issueType;
    this.suggestedFix = suggestedFix;
    this.context = context;
    this.labelCategory = labelCategory; // 'figure', 'table', 'section', 'chapter', 'appendix'
  }

  toString() {
    return `Line ${this.lineNum}: [${this.labelCategory}] ${this.issueType} - '${this.label}' -> '${this.suggestedFix}'`;
  }
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
 * Convert a label name to the standard format (camelCase).
 * @param {string} name - Label name to normalize
 * @returns {string} Normalized camelCase label name
 */
function normalizeLabelName(name) {
  // First, split on hyphens and underscores
  const parts = name.split(/[-_]+/);

  // If already in camelCase, split on case transitions
  const expandedParts = [];
  for (const part of parts) {
    // Split camelCase: "someWord" -> ["some", "Word"]
    const splitParts = part.replace(/([a-z])([A-Z])/g, '$1 $2').split(/\s+/);
    expandedParts.push(...splitParts);
  }

  // Remove empty parts and convert to lowercase
  const cleanParts = expandedParts.filter(p => p).map(p => p.toLowerCase());

  if (cleanParts.length === 0) {
    return '';
  }

  // First part stays lowercase, rest are capitalized
  let result = cleanParts[0];
  for (let i = 1; i < cleanParts.length; i++) {
    result += cleanParts[i].charAt(0).toUpperCase() + cleanParts[i].slice(1);
  }

  // Remove any remaining invalid characters
  result = result.replace(/[^a-zA-Z0-9]/g, '');

  return result;
}

/**
 * Check if a figure label follows the standard format (camelCase).
 * @param {string} label - Label to check
 * @param {string} chapterCode - Chapter code
 * @returns {boolean} True if valid
 */
function isValidFigureLabel(label, chapterCode) {
  if (chapterCode === 'appendix' || chapterCode === 'preface') {
    // Appendix/preface figures can use simplified format
    return /^fig:[a-z][a-zA-Z0-9]*$/.test(label);
  }
  return new RegExp(`^fig:${chapterCode}:[a-z][a-zA-Z0-9]*$`).test(label);
}

/**
 * Check if a table label follows the standard format (camelCase).
 * @param {string} label - Label to check
 * @param {string} chapterCode - Chapter code
 * @returns {boolean} True if valid
 */
function isValidTableLabel(label, chapterCode) {
  if (chapterCode === 'appendix' || chapterCode === 'preface') {
    return /^table:[a-z][a-zA-Z0-9]*$/.test(label);
  }
  return new RegExp(`^table:${chapterCode}:[a-z][a-zA-Z0-9]*$`).test(label);
}

/**
 * Check if a section label follows the standard format (camelCase).
 * @param {string} label - Label to check
 * @param {string} chapterCode - Chapter code
 * @returns {boolean} True if valid
 */
function isValidSectionLabel(label, chapterCode) {
  if (chapterCode === 'appendix' || chapterCode === 'preface') {
    return /^sec:[a-z][a-zA-Z0-9]*$/.test(label);
  }
  return new RegExp(`^sec:${chapterCode}:[a-z][a-zA-Z0-9]*$`).test(label);
}

/**
 * Check if a chapter label follows the standard format.
 * @param {string} label - Label to check
 * @returns {boolean} True if valid
 */
function isValidChapterLabel(label) {
  return /^chapter:[a-z][a-zA-Z0-9]*$/.test(label);
}

/**
 * Check if an appendix label follows the standard format (camelCase).
 * @param {string} label - Label to check
 * @returns {boolean} True if valid
 */
function isValidAppendixLabel(label) {
  return /^appendix:[a-z][a-zA-Z0-9]*$/.test(label);
}

/**
 * Extract the descriptive part from various label formats.
 * @param {string} label - Label to extract from
 * @returns {string} Extracted descriptive part
 */
function extractDescriptivePart(label) {
  // Remove common prefixes
  const prefixes = ['Fig_', 'fig:', 'fig.', 'fig', 'table_', 'table:', 'table.',
                    'section.', 'subsection.', 'sec:', 'sec.', 'sec',
                    'chapter.', 'chapter:', 'appendix:', 'appendix.'];

  for (const prefix of prefixes) {
    if (label.startsWith(prefix)) {
      label = label.substring(prefix.length);
      break;
    }
  }

  // Remove chapter numbers like "2_01_", "10_", etc.
  label = label.replace(/^\d+[-_]\d*[-_]/, '');
  label = label.replace(/^\d+[-_]/, '');

  // Remove common chapter code prefixes if present
  for (const code of VALID_CHAPTER_CODES) {
    if (label.startsWith(`${code}:`) || label.startsWith(`${code}-`) || label.startsWith(`${code}_`)) {
      label = label.substring(code.length + 1);
      break;
    }
  }

  // Remove 'Fiber' prefix (common in Chapter 10)
  if (label.startsWith('Fiber')) {
    label = label.substring(5);
  }

  return label;
}

/**
 * Generate a suggested fix for a non-standard figure label.
 * @param {string} oldLabel - Old label to fix
 * @param {string} chapterCode - Chapter code
 * @returns {string} Suggested fix
 */
function suggestFigureFix(oldLabel, chapterCode) {
  let name = extractDescriptivePart(oldLabel);
  name = normalizeLabelName(name);

  if (chapterCode === 'appendix' || chapterCode === 'preface') {
    return `fig:${name}`;
  }
  return `fig:${chapterCode}:${name}`;
}

/**
 * Generate a suggested fix for a non-standard table label.
 * @param {string} oldLabel - Old label to fix
 * @param {string} chapterCode - Chapter code
 * @returns {string} Suggested fix
 */
function suggestTableFix(oldLabel, chapterCode) {
  let name = extractDescriptivePart(oldLabel);
  name = normalizeLabelName(name);

  if (chapterCode === 'appendix' || chapterCode === 'preface') {
    return `table:${name}`;
  }
  return `table:${chapterCode}:${name}`;
}

/**
 * Generate a suggested fix for a non-standard section label.
 * @param {string} oldLabel - Old label to fix
 * @param {string} chapterCode - Chapter code
 * @returns {string} Suggested fix
 */
function suggestSectionFix(oldLabel, chapterCode) {
  let name = extractDescriptivePart(oldLabel);
  name = normalizeLabelName(name);

  if (chapterCode === 'appendix' || chapterCode === 'preface') {
    return `sec:${name}`;
  }
  return `sec:${chapterCode}:${name}`;
}

/**
 * Generate a suggested fix for a non-standard chapter label.
 * @param {string} oldLabel - Old label to fix
 * @param {string} chapterCode - Chapter code
 * @returns {string} Suggested fix
 */
function suggestChapterFix(oldLabel, chapterCode) {
  // Extract the chapter name
  let name = oldLabel.replace('chapter.', '').replace('chapter:', '');
  name = normalizeLabelName(name);

  // Use the chapter code if available
  if (chapterCode && VALID_CHAPTER_CODES.has(chapterCode)) {
    return `chapter:${chapterCode}`;
  }
  return `chapter:${name}`;
}

/**
 * Generate a suggested fix for a non-standard appendix label.
 * @param {string} oldLabel - Old label to fix
 * @returns {string} Suggested fix
 */
function suggestAppendixFix(oldLabel) {
  let name = oldLabel.replace('appendix:', '').replace('appendix.', '');
  name = normalizeLabelName(name);
  return `appendix:${name}`;
}

/**
 * Find all non-standard labels in content.
 * @param {string} content - File content to analyze
 * @param {string} chapterCode - Chapter code
 * @returns {Array<LabelIssue>} Array of label issues
 */
function findIssues(content, chapterCode) {
  const issues = [];
  const lines = content.split('\n');

  // Pattern 1: Figure labels in directives (:name: label)
  const figurePattern = /:name:\s*(\S+)/;
  let inFigureBlock = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('```{figure}') || line.includes('```{image}')) {
      inFigureBlock = true;
    } else if (inFigureBlock && line.trim().startsWith(':name:')) {
      const match = line.match(figurePattern);
      if (match) {
        const label = match[1];
        if (!isValidFigureLabel(label, chapterCode)) {
          issues.push(new LabelIssue(
            label,
            i + 1,
            'non-standard figure label',
            suggestFigureFix(label, chapterCode),
            line.trim(),
            'figure'
          ));
        }
      }
    } else if (inFigureBlock && line.trim() === '```') {
      inFigureBlock = false;
    }
  }

  // Pattern 2: Table labels in directives (:name: label)
  const tablePattern = /:name:\s*(\S+)/;
  let inTableBlock = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('```{table}') || line.includes('```{list-table}')) {
      inTableBlock = true;
    } else if (inTableBlock && line.trim().startsWith(':name:')) {
      const match = line.match(tablePattern);
      if (match) {
        const label = match[1];
        if (!isValidTableLabel(label, chapterCode)) {
          issues.push(new LabelIssue(
            label,
            i + 1,
            'non-standard table label',
            suggestTableFix(label, chapterCode),
            line.trim(),
            'table'
          ));
        }
      }
    } else if (inTableBlock && line.trim() === '```') {
      inTableBlock = false;
    }
  }

  // Pattern 3: Section labels (label)=
  const sectionPattern = /^\(([^)]+)\)\s*=$/;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(sectionPattern);
    if (match) {
      const label = match[1];

      // Determine label type
      if (label.startsWith('chapter')) {
        if (!isValidChapterLabel(label)) {
          issues.push(new LabelIssue(
            label,
            i + 1,
            'non-standard chapter label',
            suggestChapterFix(label, chapterCode),
            line.trim(),
            'chapter'
          ));
        }
      } else if (label.startsWith('appendix')) {
        if (!isValidAppendixLabel(label)) {
          issues.push(new LabelIssue(
            label,
            i + 1,
            'non-standard appendix label',
            suggestAppendixFix(label),
            line.trim(),
            'appendix'
          ));
        }
      } else if (label.startsWith('sec') || label.startsWith('section') || label.startsWith('subsection')) {
        if (!isValidSectionLabel(label, chapterCode)) {
          issues.push(new LabelIssue(
            label,
            i + 1,
            'non-standard section label',
            suggestSectionFix(label, chapterCode),
            line.trim(),
            'section'
          ));
        }
      }
    }
  }

  return issues;
}

/**
 * Apply fixes to content and return mapping of old -> new labels.
 * @param {string} content - File content
 * @param {Array<LabelIssue>} issues - Issues to fix
 * @returns {Object} Object with newContent and labelMapping
 */
function fixContent(content, issues) {
  let newContent = content;
  const labelMapping = {};

  // Group issues by label to handle duplicates
  const labelFixes = {};
  for (const issue of issues) {
    labelFixes[issue.label] = issue.suggestedFix;
  }

  // Apply replacements
  for (const [oldLabel, newLabel] of Object.entries(labelFixes)) {
    labelMapping[oldLabel] = newLabel;

    // Replace in :name: directives
    newContent = newContent.replace(`:name: ${oldLabel}`, `:name: ${newLabel}`);

    // Replace in (label)= format
    newContent = newContent.replace(`(${oldLabel})=`, `(${newLabel})=`);

    // Replace references - try various reference formats
    // {numref}`label`
    newContent = newContent.replace(
      new RegExp(`\\{numref\\}\`${oldLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\``, 'g'),
      `{numref}\`${newLabel}\``
    );
    // {ref}`label`
    newContent = newContent.replace(
      new RegExp(`\\{ref\\}\`${oldLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\``, 'g'),
      `{ref}\`${newLabel}\``
    );
    // [text](#label)
    newContent = newContent.replace(
      new RegExp(`\\]\\(#${oldLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'),
      `](#${newLabel})`
    );
    // [](#label)
    newContent = newContent.replace(
      new RegExp(`\\[\\]\\(#${oldLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'),
      `{numref}\`${newLabel}\``
    );
  }

  return { newContent, labelMapping };
}

/**
 * Lint a single file for non-standard labels.
 * @param {string} filePath - File path to lint
 * @param {boolean} fix - Whether to fix issues
 * @param {boolean} verbose - Whether to show verbose output
 * @returns {Object} Object with count, issues, and labelMapping
 */
function lintFile(filePath, fix = false, verbose = false) {
  const chapterCode = getChapterCode(filePath);
  if (!chapterCode) {
    if (verbose) {
      console.log(`  Skipping ${filePath} (not in a chapter/appendix directory)`);
    }
    return { count: 0, issues: [], labelMapping: {} };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const issues = findIssues(content, chapterCode);
  let labelMapping = {};

  if (issues.length > 0 && fix) {
    const result = fixContent(content, issues);
    fs.writeFileSync(filePath, result.newContent, 'utf8');
    labelMapping = result.labelMapping;
    if (verbose) {
      console.log(`  Fixed ${issues.length} issues in ${filePath}`);
    }
  }

  return { count: issues.length, issues, labelMapping };
}

/**
 * Main function.
 * @returns {number} Exit code
 */
function main() {
  const args = process.argv.slice(2);
  const options = {
    fix: false,
    verbose: false,
    quiet: false,
    category: 'all',
    files: []
  };

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--fix') {
      options.fix = true;
    } else if (args[i] === '--verbose' || args[i] === '-v') {
      options.verbose = true;
    } else if (args[i] === '--quiet' || args[i] === '-q') {
      options.quiet = true;
    } else if (args[i] === '--category' && i + 1 < args.length) {
      options.category = args[++i];
    } else if (!args[i].startsWith('--')) {
      options.files.push(args[i]);
    }
  }

  // Find files to lint
  let files;
  if (options.files.length > 0) {
    files = options.files;
  } else {
    const scriptDir = __dirname;
    const contentDir = path.join(scriptDir, '..', 'content');

    function findMdFiles(dir) {
      const results = [];
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          results.push(...findMdFiles(fullPath));
        } else if (item.endsWith('.md')) {
          results.push(fullPath);
        }
      }
      return results;
    }

    files = findMdFiles(contentDir);
  }

  let totalIssues = 0;
  const categoryCounts = {};
  const allMappings = {};

  for (const filePath of files) {
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found: ${filePath}`);
      continue;
    }

    const result = lintFile(filePath, options.fix, options.verbose);
    let { count, issues, labelMapping } = result;

    // Filter by category if specified
    if (options.category !== 'all') {
      issues = issues.filter(i => i.labelCategory === options.category);
      count = issues.length;
    }

    totalIssues += count;
    Object.assign(allMappings, labelMapping);

    for (const issue of issues) {
      categoryCounts[issue.labelCategory] = (categoryCounts[issue.labelCategory] || 0) + 1;
    }

    if (issues.length > 0 && !options.quiet) {
      console.log(`\n${filePath}:`);
      for (const issue of issues) {
        console.log(`  ${issue.toString()}`);
      }
    }
  }

  // Summary
  if (totalIssues > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('Summary by category:');
    for (const category of ['figure', 'table', 'section', 'chapter', 'appendix']) {
      if (categoryCounts[category]) {
        console.log(`  ${category.charAt(0).toUpperCase() + category.slice(1)}: ${categoryCounts[category]} issues`);
      }
    }
    console.log('='.repeat(60));

    if (options.fix) {
      console.log(`\n✓ Fixed ${totalIssues} label issues`);
      if (Object.keys(allMappings).length > 0 && options.verbose) {
        console.log('\nLabel mappings:');
        const sorted = Object.entries(allMappings).sort((a, b) => a[0].localeCompare(b[0]));
        for (const [oldLabel, newLabel] of sorted) {
          console.log(`  ${oldLabel} -> ${newLabel}`);
        }
      }
      return 0;
    } else {
      console.log(`\n✗ Found ${totalIssues} non-standard labels`);
      console.log('  Run with --fix to automatically convert them');
      return 1;
    }
  } else {
    if (!options.quiet) {
      console.log('\n✓ All labels follow the standard format');
    }
    return 0;
  }
}

// Run if called directly
if (require.main === module) {
  process.exit(main());
}

module.exports = {
  LabelIssue,
  getChapterCode,
  normalizeLabelName,
  isValidFigureLabel,
  isValidTableLabel,
  isValidSectionLabel,
  isValidChapterLabel,
  isValidAppendixLabel,
  extractDescriptivePart,
  suggestFigureFix,
  suggestTableFix,
  suggestSectionFix,
  suggestChapterFix,
  suggestAppendixFix,
  findIssues,
  fixContent,
  lintFile
};
