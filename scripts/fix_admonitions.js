#!/usr/bin/env node
/**
 * Fix unsupported admonition types for Typst export.
 * Converts tip, important, and generic admonition blocks to supported types.
 *
 * Status: HISTORICAL - One-time migration script
 *     Used during initial Typst export setup (December 2025).
 *     Retained for reference and potential future use if new admonition
 *     types are introduced that need conversion.
 */

const fs = require('fs');
const path = require('path');

/**
 * Fix admonitions in a single markdown file.
 *
 * @param {string} filepath - Path to markdown file
 * @returns {Array} [changed, changesMade]
 */
function fixAdmonitionsInFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const originalContent = content;
  let modifiedContent = content;
  const changesMade = [];

  // Fix generic admonitions with custom titles
  // Convert ```{admonition} Custom Title to ```{note} Custom Title
  const patternAdmonition = /```\{admonition\}([^\n]*)\n/g;
  if (patternAdmonition.test(content)) {
    modifiedContent = modifiedContent.replace(patternAdmonition, '```{note}$1\n');
    changesMade.push('admonition → note');
  }

  // Fix tip admonitions - convert to note with "Tip:" prefix
  const patternTip = /```\{tip\}\n/g;
  if (patternTip.test(content)) {
    modifiedContent = modifiedContent.replace(patternTip, '```{note}\n:class: tip\n\n**Tip:** ');
    changesMade.push('tip → note with Tip prefix');
  }

  // Fix important admonitions - convert to warning with "Important:" prefix
  const patternImportant = /```\{important\}\n/g;
  if (patternImportant.test(content)) {
    modifiedContent = modifiedContent.replace(patternImportant, '```{warning}\n:class: important\n\n**Important:** ');
    changesMade.push('important → warning with Important prefix');
  }

  if (modifiedContent !== originalContent) {
    fs.writeFileSync(filepath, modifiedContent, 'utf8');
    return [true, changesMade];
  }
  return [false, []];
}

function main() {
  const contentDir = path.join(process.cwd(), 'content');

  if (!fs.existsSync(contentDir)) {
    console.log(`Error: Content directory not found: ${contentDir}`);
    process.exit(1);
  }

  // Find all markdown files recursively
  const markdownFiles = [];

  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('.md')) {
        markdownFiles.push(fullPath);
      }
    }
  }

  walkDir(contentDir);

  console.log(`Found ${markdownFiles.length} markdown files`);
  console.log('='.repeat(60));

  let totalChanged = 0;
  for (const filepath of markdownFiles) {
    const [changed, changes] = fixAdmonitionsInFile(filepath);
    if (changed) {
      totalChanged++;
      const relPath = path.relative(contentDir, filepath);
      console.log(`✓ ${relPath}`);
      for (const change of changes) {
        console.log(`  - ${change}`);
      }
    }
  }

  console.log('='.repeat(60));
  console.log(`Modified ${totalChanged} files`);

  if (totalChanged === 0) {
    console.log('No changes needed!');
  } else {
    console.log('\nAdmonitions have been converted to supported types.');
    console.log('Run \'npx myst build --typst\' to verify the fixes.');
  }
}

if (require.main === module) {
  main();
}

module.exports = { fixAdmonitionsInFile };
