#!/usr/bin/env node
/**
 * Fix MyST Directive Syntax Issues
 *
 * This script fixes common MyST directive syntax issues:
 * 1. Converts colon fences (:::) to backtick fences (```) for better IDE support
 * 2. Fixes unsupported admonition types (converts to supported alternatives)
 *
 * Status: UTILITY - Run when needed
 *     Run after importing content or when directive syntax issues are detected
 *
 * Usage:
 *     node transform/fix-directive-syntax.js [options]
 *
 * Options:
 *     --dry-run         Show changes without applying them
 *     --content-dir DIR Convert all files in directory (default: content)
 *     --file FILE       Convert a single file
 *     --verbose         Show detailed conversion info
 *     --fences-only     Only fix fence types
 *     --admonitions-only Only fix admonitions
 */

const fs = require('fs');
const path = require('path');

// Directives that should use backtick fences
const BACKTICK_FENCE_DIRECTIVES = [
  'note', 'warning', 'important', 'tip', 'caution', 'attention',
  'danger', 'error', 'hint', 'seealso', 'admonition',
  'dropdown', 'card', 'tab-set', 'tab-item',
  'figure', 'subfigure', 'video', 'image',
  'proof', 'theorem', 'lemma', 'definition', 'example', 'exercise',
  'grid', 'column', 'margin', 'sidebar',
  'epigraph', 'bibliography', 'glossary', 'list-table'
];

class DirectiveFixer {
  /**
   * Fixes MyST directive syntax issues.
   *
   * @param {boolean} dryRun - Whether to perform a dry run
   * @param {boolean} verbose - Whether to show verbose output
   * @param {boolean} fencesOnly - Only fix fence types
   * @param {boolean} admonitionsOnly - Only fix admonitions
   */
  constructor(dryRun = false, verbose = false, fencesOnly = false, admonitionsOnly = false) {
    this.dryRun = dryRun;
    this.verbose = verbose;
    this.fencesOnly = fencesOnly;
    this.admonitionsOnly = admonitionsOnly;
    this.stats = {
      files_modified: 0,
      fences_converted: 0,
      admonitions_fixed: 0
    };
  }

  /**
   * Convert a single file.
   *
   * @param {string} filePath - Path to file to convert
   * @returns {boolean} True if file was modified
   */
  convertFile(filePath) {
    try {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      let content = originalContent;
      const changes = [];

      // Fix fences (unless admonitions-only)
      if (!this.admonitionsOnly) {
        const fenceResult = this._convertFences(content);
        content = fenceResult.content;
        if (fenceResult.changes > 0) {
          changes.push(`${fenceResult.changes} fences converted`);
          this.stats.fences_converted += fenceResult.changes;
        }
      }

      // Fix admonitions (unless fences-only)
      if (!this.fencesOnly) {
        const admonitionResult = this._fixAdmonitions(content);
        content = admonitionResult.content;
        if (admonitionResult.changes.length > 0) {
          changes.push(...admonitionResult.changes);
          this.stats.admonitions_fixed += admonitionResult.changes.length;
        }
      }

      if (content === originalContent) {
        if (this.verbose) {
          console.log(`✓ ${filePath}: No changes needed`);
        }
        return false;
      }

      if (this.dryRun) {
        console.log(`🔍 ${filePath}: Would make changes: ${changes.join(', ')}`);
      } else {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${filePath}: ${changes.join(', ')}`);
      }

      this.stats.files_modified++;
      return true;
    } catch (err) {
      console.log(`❌ Error processing ${filePath}: ${err.message}`);
      return false;
    }
  }

  /**
   * Convert colon fences to backtick fences.
   *
   * @param {string} content - File content
   * @returns {Object} {content, changes}
   */
  _convertFences(content) {
    const lines = content.split('\n').map(line => line + '\n');
    const converted = [];
    let i = 0;
    let changeCount = 0;

    const directivePattern = new RegExp(`^(\\s*):::\\{(${BACKTICK_FENCE_DIRECTIVES.join('|')})\\}(.*)$`);

    while (i < lines.length) {
      const line = lines[i];
      const match = line.match(directivePattern);

      if (match) {
        const indent = match[1];
        const directiveName = match[2];
        const rest = match[3].trim();

        // Convert opening fence
        if (rest) {
          converted.push(`${indent}\`\`\`{${directiveName}} ${rest}\n`);
        } else {
          converted.push(`${indent}\`\`\`{${directiveName}}\n`);
        }
        changeCount++;
        i++;

        // Process content until closing fence
        while (i < lines.length) {
          const contentLine = lines[i];
          const closingMatch = contentLine.match(/^(\s*):::\s*$/);

          if (closingMatch) {
            converted.push(`${indent}\`\`\`\n`);
            i++;
            break;
          } else {
            converted.push(contentLine);
            i++;
          }
        }
      } else {
        converted.push(line);
        i++;
      }
    }

    return {
      content: converted.join(''),
      changes: changeCount
    };
  }

  /**
   * Fix unsupported admonition types.
   *
   * @param {string} content - File content
   * @returns {Object} {content, changes}
   */
  _fixAdmonitions(content) {
    let modifiedContent = content;
    const changesMade = [];

    // Fix generic admonitions with custom titles
    const patternAdmonition = /```\{admonition\}([^\n]*)\n/g;
    if (patternAdmonition.test(content)) {
      modifiedContent = modifiedContent.replace(patternAdmonition, '```{note}$1\n');
      changesMade.push('admonition → note');
    }

    // Fix tip admonitions
    const patternTip = /```\{tip\}\n/g;
    if (patternTip.test(content)) {
      modifiedContent = modifiedContent.replace(patternTip, '```{note}\n:class: tip\n\n**Tip:** ');
      changesMade.push('tip → note with Tip prefix');
    }

    // Fix important admonitions
    const patternImportant = /```\{important\}\n/g;
    if (patternImportant.test(content)) {
      modifiedContent = modifiedContent.replace(patternImportant, '```{warning}\n:class: important\n\n**Important:** ');
      changesMade.push('important → warning with Important prefix');
    }

    return {
      content: modifiedContent,
      changes: changesMade
    };
  }
}

/**
 * Process all markdown files in directory.
 */
function processDirectory(contentDir, fixer) {
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

  if (mdFiles.length === 0) {
    console.log(`No markdown files found in ${contentDir}`);
    return;
  }

  console.log(`Found ${mdFiles.length} markdown files to process\n`);

  for (const mdFile of mdFiles.sort()) {
    fixer.convertFile(mdFile);
  }

  console.log(`\n=== SUMMARY ===`);
  if (fixer.dryRun) {
    console.log(`Dry run - no files were modified`);
  }
  console.log(`Files modified: ${fixer.stats.files_modified}`);
  console.log(`Fences converted: ${fixer.stats.fences_converted}`);
  console.log(`Admonitions fixed: ${fixer.stats.admonitions_fixed}`);
}

function main() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes('--dry-run'),
    contentDir: 'content',
    file: null,
    verbose: args.includes('--verbose'),
    fencesOnly: args.includes('--fences-only'),
    admonitionsOnly: args.includes('--admonitions-only')
  };

  // Parse content-dir
  const contentDirIdx = args.indexOf('--content-dir');
  if (contentDirIdx !== -1 && args[contentDirIdx + 1]) {
    options.contentDir = args[contentDirIdx + 1];
  }

  // Parse file
  const fileIdx = args.indexOf('--file');
  if (fileIdx !== -1 && args[fileIdx + 1]) {
    options.file = args[fileIdx + 1];
  }

  const fixer = new DirectiveFixer(
    options.dryRun,
    options.verbose,
    options.fencesOnly,
    options.admonitionsOnly
  );

  if (options.file) {
    if (!fs.existsSync(options.file)) {
      console.log(`❌ Error: File '${options.file}' not found!`);
      return 1;
    }
    fixer.convertFile(options.file);
    console.log(`\nFences converted: ${fixer.stats.fences_converted}`);
    console.log(`Admonitions fixed: ${fixer.stats.admonitions_fixed}`);
  } else {
    if (!fs.existsSync(options.contentDir)) {
      console.log(`❌ Error: Directory '${options.contentDir}' not found!`);
      return 1;
    }
    processDirectory(options.contentDir, fixer);
  }

  console.log('\n✅ Processing complete!');
  if (options.dryRun) {
    console.log('Run without --dry-run to apply changes');
  }

  return 0;
}

if (require.main === module) {
  process.exit(main());
}

module.exports = { DirectiveFixer, processDirectory };
