#!/usr/bin/env node
/**
 * Bulk Fence Converter for MyST Markdown
 *
 * Converts MyST directives from colon fences (:::) to backtick fences (```)
 * to comply with doc/MYST_CONVENTIONS.md (updated to prefer backticks for IDE support)
 *
 * Status: UTILITY - Occasional use
 *     Run when bulk fence conversion is needed (e.g., after importing content
 *     from other sources that use colon fences).
 *
 * Usage:
 *     node convert_fences.js [--dry-run] [--content-dir DIR] [--file FILE]
 *
 * Options:
 *     --dry-run       Show changes without applying them
 *     --content-dir   Convert all files in directory (default: content)
 *     --file          Convert a single file
 *     --verbose       Show detailed conversion info
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

class FenceConverter {
  /**
   * Converts colon directive fences to backtick fences.
   *
   * @param {boolean} dryRun - Whether to perform a dry run
   * @param {boolean} verbose - Whether to show verbose output
   */
  constructor(dryRun = false, verbose = false) {
    this.dryRun = dryRun;
    this.verbose = verbose;
    this.stats = {
      files_modified: 0,
      directives_converted: 0
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
      const originalLines = originalContent.split('\n').map(line => line + '\n');

      const convertedLines = this._convertLines(originalLines, filePath);
      const convertedContent = convertedLines.join('');

      if (convertedContent === originalContent) {
        if (this.verbose) {
          console.log(`✓ ${filePath}: No changes needed`);
        }
        return false;
      }

      const changes = this._countChanges(originalContent, convertedContent);

      if (this.dryRun) {
        console.log(`🔍 ${filePath}: Would convert ${changes} directives`);
        if (this.verbose) {
          this._showDiff(originalLines, convertedLines);
        }
      } else {
        fs.writeFileSync(filePath, convertedContent, 'utf8');
        console.log(`✅ ${filePath}: Converted ${changes} directives`);
      }

      this.stats.files_modified++;
      this.stats.directives_converted += changes;
      return true;
    } catch (err) {
      console.log(`❌ Error processing ${filePath}: ${err.message}`);
      return false;
    }
  }

  /**
   * Convert directives in lines.
   *
   * @param {Array<string>} lines - Lines to convert
   * @param {string} filePath - File path for error reporting
   * @returns {Array<string>} Converted lines
   */
  _convertLines(lines, filePath) {
    const converted = [];
    let i = 0;

    const directivePattern = new RegExp(`^(\\s*):::\\{(${BACKTICK_FENCE_DIRECTIVES.join('|')})\\}(.*)$`);

    while (i < lines.length) {
      const line = lines[i];
      const match = line.match(directivePattern);

      if (match) {
        const indent = match[1];
        const directiveName = match[2];
        const rest = match[3].trim();

        // Convert opening fence - keep rest on same line if present
        if (rest) {
          converted.push(`${indent}\`\`\`{${directiveName}} ${rest}\n`);
        } else {
          converted.push(`${indent}\`\`\`{${directiveName}}\n`);
        }

        i++;

        // Process content until closing fence
        while (i < lines.length) {
          const contentLine = lines[i];

          // Check for closing colon fence
          const closingMatch = contentLine.match(/^(\s*):::\s*$/);
          if (closingMatch) {
            // Convert closing fence to backticks (use same or parent indentation)
            converted.push(`${indent}\`\`\`\n`);
            i++;
            break;
          } else {
            // Keep content as-is
            converted.push(contentLine);
            i++;
          }
        }
      } else {
        // Not a directive, keep as-is
        converted.push(line);
        i++;
      }
    }

    return converted;
  }

  /**
   * Count number of directives converted.
   *
   * @param {string} original - Original content
   * @param {string} converted - Converted content
   * @returns {number} Number of directives converted
   */
  _countChanges(original, converted) {
    let count = 0;
    for (const directive of BACKTICK_FENCE_DIRECTIVES) {
      const pattern = `:::{${directive}}`;
      const matches = original.match(new RegExp(pattern, 'g'));
      if (matches) {
        count += matches.length;
      }
    }
    return count;
  }

  /**
   * Show line-by-line diff.
   *
   * @param {Array<string>} originalLines - Original lines
   * @param {Array<string>} convertedLines - Converted lines
   */
  _showDiff(originalLines, convertedLines) {
    const maxLen = Math.max(originalLines.length, convertedLines.length);
    for (let i = 0; i < maxLen; i++) {
      const orig = originalLines[i] || '';
      const conv = convertedLines[i] || '';
      if (orig !== conv) {
        console.log(`  Line ${i + 1}:`);
        console.log(`    - ${orig.trimEnd()}`);
        console.log(`    + ${conv.trimEnd()}`);
      }
    }
  }
}

/**
 * Process all markdown files in directory.
 *
 * @param {string} contentDir - Content directory path
 * @param {FenceConverter} converter - Converter instance
 */
function processDirectory(contentDir, converter) {
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
    converter.convertFile(mdFile);
  }

  console.log(`\n=== SUMMARY ===`);
  if (converter.dryRun) {
    console.log(`Dry run - no files were modified`);
  }
  console.log(`Files that need/needed conversion: ${converter.stats.files_modified}`);
  console.log(`Total directives converted: ${converter.stats.directives_converted}`);
}

function main() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes('--dry-run'),
    contentDir: 'content',
    file: null,
    verbose: args.includes('--verbose')
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

  const converter = new FenceConverter(options.dryRun, options.verbose);

  if (options.file) {
    if (!fs.existsSync(options.file)) {
      console.log(`❌ Error: File '${options.file}' not found!`);
      return 1;
    }
    converter.convertFile(options.file);
  } else {
    if (!fs.existsSync(options.contentDir)) {
      console.log(`❌ Error: Directory '${options.contentDir}' not found!`);
      return 1;
    }
    processDirectory(options.contentDir, converter);
  }

  console.log('\n✅ Conversion complete!');
  if (options.dryRun) {
    console.log('Run without --dry-run to apply changes');
  } else {
    console.log('Run \'myst build\' to verify changes');
    console.log('Run \'node scripts/lint_myst_markdown.js\' to check remaining issues');
  }

  return 0;
}

if (require.main === module) {
  process.exit(main());
}

module.exports = { FenceConverter, processDirectory };
