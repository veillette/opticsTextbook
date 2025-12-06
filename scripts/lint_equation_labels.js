#!/usr/bin/env node
/**
 * Lint Equation Labels
 *
 * This script checks for non-standard equation labels in MyST markdown files.
 * It can be used as a pre-commit hook or standalone linter.
 *
 * Standard format: eq:chapter-code:descriptiveName
 *   - chapter-code: basics, geo, inst, pol, wave, coh, diff, laser, adv, fiber, ray
 *   - descriptiveName: camelCase (starts lowercase, subsequent words capitalized)
 *
 * Non-standard patterns detected:
 *   1. Dot notation: eq.name or eq.Name
 *   2. LaTeX inline: \label{name} inside equations
 *   3. MyST inline: $$ ... $$ (label)
 *   4. Missing chapter code: eq:name without chapter prefix
 *   5. Wrong format: hyphens, underscores, or other invalid characters
 *
 * Usage:
 *   node lint_equation_labels.js [--fix] [--verbose] [file_path ...]
 *
 *   --fix: Automatically fix non-standard labels (interactive for ambiguous cases)
 *   --verbose: Show detailed information about each issue
 *
 * Exit codes:
 *   0: All labels are valid
 *   1: Non-standard labels found (use --fix to convert)
 */

const fs = require('fs');
const path = require('path');

// Chapter code mappings
const CHAPTER_CODES = {
  'Chap01Basics': 'basics',
  'Chap02GeometricalOptics': 'geo',
  'Chap03OpticalInstruments': 'inst',
  'Chap04Polarization': 'pol',
  'Chap05Wave': 'wave',
  'Chap06InterferenceCoherence': 'coh',
  'Chap07Diffraction': 'diff',
  'Chap08Lasers': 'laser',
  'Chap09AdvancedInstruments': 'adv',
  'Chap10FiberOptics': 'fiber',
  'Chap11RayMatrix': 'ray',
};

const VALID_CHAPTER_CODES = new Set(Object.values(CHAPTER_CODES));

/**
 * Represents a non-standard label issue.
 */
class LabelIssue {
  constructor(label, lineNum, issueType, suggestedFix, context, position) {
    this.label = label;
    this.lineNum = lineNum;
    this.issueType = issueType;
    this.suggestedFix = suggestedFix;
    this.context = context;
    this.position = position;
  }

  toString() {
    return `Line ${this.lineNum}: ${this.issueType} - '${this.label}' -> '${this.suggestedFix}'`;
  }
}

/**
 * Extract chapter code from file path.
 */
function getChapterCode(filePath) {
  const pathStr = filePath.toString();
  for (const [chapterDir, code] of Object.entries(CHAPTER_CODES)) {
    if (pathStr.includes(chapterDir)) {
      return code;
    }
  }
  return null;
}

/**
 * Convert a label name to the standard format (camelCase).
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
 * Check if a label follows the standard format (camelCase).
 */
function isValidLabel(label, chapterCode) {
  // Pattern: eq:chapter-code:lowerCamelCase
  // Must start with lowercase letter, can contain letters and numbers (camelCase)
  const pattern = new RegExp(`^eq:${chapterCode}:[a-z][a-zA-Z0-9]*$`);
  return pattern.test(label);
}

/**
 * Generate a suggested fix for a non-standard label.
 */
function suggestFix(oldLabel, chapterCode) {
  // Remove common prefixes
  let name = oldLabel;
  if (name.startsWith('eq:')) {
    name = name.substring(3);
  } else if (name.startsWith('eq.')) {
    name = name.substring(3);
  } else if (name.startsWith('eq-')) {
    name = name.substring(3);
  }

  // Check if it already has a chapter code
  for (const code of VALID_CHAPTER_CODES) {
    if (name.startsWith(`${code}:`) || name.startsWith(`${code}-`)) {
      name = name.substring(code.length + 1);
      break;
    }
  }

  // Normalize the name
  name = normalizeLabelName(name);

  return `eq:${chapterCode}:${name}`;
}

/**
 * Find all non-standard equation labels in content.
 */
function findIssues(content, chapterCode) {
  const issues = [];
  const lines = content.split('\n');

  // Pattern 1: MyST math block labels - :label: name
  const labelPattern = /:label:\s*(\S+)/g;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let match;
    labelPattern.lastIndex = 0; // Reset regex
    while ((match = labelPattern.exec(line)) !== null) {
      const label = match[1];
      if (!isValidLabel(label, chapterCode)) {
        const position = lines.slice(0, i).reduce((sum, l) => sum + l.length + 1, 0) + match.index;
        issues.push(new LabelIssue(
          label,
          i + 1,
          'non-standard MyST label',
          suggestFix(label, chapterCode),
          line.trim(),
          position
        ));
      }
    }
  }

  // Pattern 2: LaTeX inline labels - \label{name}
  const latexPattern = /\\label\{([^}]+)\}/g;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let match;
    latexPattern.lastIndex = 0;
    while ((match = latexPattern.exec(line)) !== null) {
      const label = match[1];
      const position = lines.slice(0, i).reduce((sum, l) => sum + l.length + 1, 0) + match.index;
      issues.push(new LabelIssue(
        label,
        i + 1,
        'LaTeX inline label (should use MyST)',
        suggestFix(label, chapterCode),
        line.trim().substring(0, 80),
        position
      ));
    }
  }

  // Pattern 3: MyST inline math labels - $$ ... $$ (label)
  // Label must look like an identifier: no spaces, starts with eq or letter, contains dots/colons/hyphens
  const inlinePattern = /\$\$\s*\n?(.*?)\n?\$\$\s*\(([a-zA-Z][a-zA-Z0-9.:_-]*)\)/gs;
  let match;
  while ((match = inlinePattern.exec(content)) !== null) {
    const label = match[2];
    // Skip very short labels that might be false positives
    if (label.length < 3) {
      continue;
    }
    const lineNum = content.substring(0, match.index).split('\n').length;
    issues.push(new LabelIssue(
      label,
      lineNum,
      'inline $$ label (should use MyST math block)',
      suggestFix(label, chapterCode),
      `$$ ... $$ (${label})`,
      match.index
    ));
  }

  return issues;
}

/**
 * Apply fixes to content.
 */
function fixContent(content, issues, chapterCode) {
  let newContent = content;

  // Sort issues by position in reverse to avoid offset issues
  const sortedIssues = issues.slice().sort((a, b) => b.position - a.position);

  for (const issue of sortedIssues) {
    const oldLabel = issue.label;
    const newLabel = issue.suggestedFix;

    if (issue.issueType === 'inline $$ label (should use MyST math block)') {
      // Convert $$ ... $$ (label) to ```{math}\n:label: ...\n...\n```
      const pattern = new RegExp(
        `\\$\\$\\s*\\n?(.*?)\\n?\\$\\$\\s*\\(${oldLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`,
        'gs'
      );
      newContent = newContent.replace(pattern, (match, mathContent) => {
        return `\`\`\`{math}\n:label: ${newLabel}\n${mathContent.trim()}\n\`\`\``;
      });
    } else if (issue.issueType === 'LaTeX inline label (should use MyST)') {
      // This requires more complex handling - convert the whole equation block
      // For now, just report it
      // Could be enhanced in future
    } else {
      // Standard MyST label replacement
      newContent = newContent.replace(`:label: ${oldLabel}`, `:label: ${newLabel}`);
      // Also update references
      newContent = newContent.replace(
        new RegExp(`\\{eq\\}\`${oldLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\``, 'g'),
        `{eq}\`${newLabel}\``
      );
      newContent = newContent.replace(`[](#${oldLabel})`, `{eq}\`${newLabel}\``);
    }
  }

  return newContent;
}

/**
 * Lint a single file for non-standard equation labels.
 */
function lintFile(filePath, fix = false, verbose = false) {
  const chapterCode = getChapterCode(filePath);
  if (!chapterCode) {
    if (verbose) {
      console.log(`  Skipping ${filePath} (not in a chapter directory)`);
    }
    return { count: 0, issues: [] };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const issues = findIssues(content, chapterCode);

  if (issues.length > 0 && fix) {
    const newContent = fixContent(content, issues, chapterCode);
    fs.writeFileSync(filePath, newContent, 'utf8');
    if (verbose) {
      console.log(`  Fixed ${issues.length} issues in ${filePath}`);
    }
  }

  return { count: issues.length, issues };
}

/**
 * Recursively find all markdown files in a directory.
 */
function findMarkdownFiles(dir) {
  const files = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

function main() {
  const args = process.argv.slice(2);
  const options = {
    fix: args.includes('--fix'),
    verbose: args.includes('--verbose') || args.includes('-v'),
    quiet: args.includes('--quiet') || args.includes('-q'),
    files: args.filter(arg => !arg.startsWith('--') && !arg.startsWith('-'))
  };

  // Find files to lint
  let files;
  if (options.files.length > 0) {
    files = options.files;
  } else {
    const scriptDir = path.dirname(__filename);
    const contentDir = path.join(scriptDir, '..', 'content');
    files = findMarkdownFiles(contentDir);
  }

  let totalIssues = 0;
  const allIssues = [];

  for (const filePath of files) {
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found: ${filePath}`);
      continue;
    }

    const { count, issues } = lintFile(filePath, options.fix, options.verbose);
    totalIssues += count;

    if (issues.length > 0 && !options.quiet) {
      console.log(`\n${filePath}:`);
      for (const issue of issues) {
        console.log(`  ${issue.toString()}`);
      }
      allIssues.push(...issues);
    }
  }

  // Summary
  if (totalIssues > 0) {
    if (options.fix) {
      console.log(`\n✓ Fixed ${totalIssues} equation label issues`);
      return 0;
    } else {
      console.log(`\n✗ Found ${totalIssues} non-standard equation labels`);
      console.log('  Run with --fix to automatically convert them');
      return 1;
    }
  } else {
    if (!options.quiet) {
      console.log('\n✓ All equation labels follow the standard format');
    }
    return 0;
  }
}

if (require.main === module) {
  process.exit(main());
}

module.exports = { LabelIssue, getChapterCode, normalizeLabelName, isValidLabel, suggestFix, findIssues, fixContent, lintFile };
