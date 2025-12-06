#!/usr/bin/env node
/**
 * Script to fix split equation references in MyST markdown files.
 *
 * Status: UTILITY - Fix script
 *     Run when split references are detected by the linter.
 *     The linter (lint_myst_markdown.js --fix) can also fix these automatically.
 *
 * This script finds instances where {eq} or similar roles are at the end of a line
 * with the backtick-wrapped label on the next line, and joins them properly.
 *
 * Usage:
 *     node fix_split_equation_refs.js [--dry-run] [--content-dir DIR]
 */

const fs = require('fs');
const path = require('path');

/**
 * Fix split equation and reference patterns in content.
 *
 * Patterns to fix:
 * - {eq}\n`label` -> {eq}`label`
 * - {numref}\n`label` -> {numref}`label`
 * - {ref}\n`label` -> {ref}`label`
 *
 * @param {string} content - File content
 * @returns {Array} [newContent, changes]
 */
function fixSplitReferences(content) {
  const changes = [];

  // Pattern to match split references
  // Matches: {role}\n`label` where role is eq, numref, ref, etc.
  const pattern = /\{(eq|numref|ref|doc|cite)\}\s*\n\s*`([^`]+)`/gm;

  const newContent = content.replace(pattern, (match, role, label) => {
    changes.push(`Fixed {${role}}\`${label}\``);
    return `{${role}}\`${label}\``;
  });

  return [newContent, changes];
}

/**
 * Process a single markdown file.
 *
 * @param {string} filePath - Path to file
 * @param {boolean} dryRun - Whether to perform a dry run
 * @returns {number} Number of fixes made
 */
function processFile(filePath, dryRun = false) {
  try {
    const originalContent = fs.readFileSync(filePath, 'utf8');
    const [newContent, changes] = fixSplitReferences(originalContent);

    if (changes.length > 0) {
      const relativePath = path.relative('content', filePath);
      console.log(`\n📄 ${relativePath}`);
      for (const change of changes) {
        console.log(`  ✓ ${change}`);
      }

      if (!dryRun) {
        fs.writeFileSync(filePath, newContent, 'utf8');
      }

      return changes.length;
    }

    return 0;
  } catch (err) {
    console.log(`❌ Error processing ${filePath}: ${err.message}`);
    return 0;
  }
}

/**
 * Find all markdown files in the content directory.
 *
 * @param {string} contentDir - Content directory path
 * @returns {Array<string>} List of markdown file paths
 */
function findMarkdownFiles(contentDir = 'content') {
  const mdFiles = [];

  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('.md')) {
        mdFiles.push(fullPath);
      }
    }
  }

  walkDir(contentDir);
  return mdFiles.sort();
}

function main() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes('--dry-run'),
    contentDir: 'content'
  };

  // Parse content-dir
  const contentDirIdx = args.indexOf('--content-dir');
  if (contentDirIdx !== -1 && args[contentDirIdx + 1]) {
    options.contentDir = args[contentDirIdx + 1];
  }

  if (!fs.existsSync(options.contentDir)) {
    console.log(`❌ Error: Content directory '${options.contentDir}' not found!`);
    return 1;
  }

  console.log('=== Fix Split Equation References ===');
  if (options.dryRun) {
    console.log('DRY RUN MODE - No files will be modified\n');
  }

  const mdFiles = findMarkdownFiles(options.contentDir);
  console.log(`Found ${mdFiles.length} markdown files to check\n`);

  let totalFixes = 0;
  let filesModified = 0;

  for (const mdFile of mdFiles) {
    const fixes = processFile(mdFile, options.dryRun);
    if (fixes > 0) {
      totalFixes += fixes;
      filesModified++;
    }
  }

  // Summary
  console.log('\n=== SUMMARY ===');
  if (options.dryRun) {
    console.log(`Would fix ${totalFixes} split references in ${filesModified} files`);
  } else {
    console.log(`Fixed ${totalFixes} split references in ${filesModified} files`);
  }

  if (totalFixes === 0) {
    console.log('✅ No split references found!');
  }

  return 0;
}

if (require.main === module) {
  process.exit(main());
}

module.exports = { fixSplitReferences, processFile, findMarkdownFiles };
