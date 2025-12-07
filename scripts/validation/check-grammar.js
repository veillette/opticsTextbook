#!/usr/bin/env node
/**
 * Grammar checker for markdown content using write-good.
 *
 * Status: ACTIVE - Content quality tool
 *     Provides grammar and style suggestions for markdown files.
 *     Run via: npm run lint:grammar / npm run lint:grammar:suggestions
 *
 * This script:
 * 1. Scans markdown files in the content directory
 * 2. Strips MyST-specific syntax before analysis
 * 3. Reports potential grammar and style issues
 * 4. Can show detailed suggestions for improvements
 *
 * Usage:
 *     node check-grammar.js [--suggestions] [--quiet] [file...]
 */

const fs = require('fs');
const path = require('path');

// Dynamically require write-good (installed as dev dependency)
let writeGood;
try {
  writeGood = require('write-good');
} catch (err) {
  console.error('Error: write-good is not installed.');
  console.error('Run: npm install');
  process.exit(1);
}

const { getAllMarkdownFiles } = require('../shared-utils');

/**
 * Strip MyST-specific syntax from content for cleaner analysis.
 *
 * @param {string} content - Raw markdown content
 * @returns {string} Cleaned content
 */
function stripMystSyntax(content) {
  let cleaned = content;

  // Remove code blocks (including MyST directives)
  cleaned = cleaned.replace(/```[\s\S]*?```/g, '');

  // Remove MyST directives with ::: syntax
  cleaned = cleaned.replace(/:::[\s\S]*?:::/g, '');

  // Remove inline math
  cleaned = cleaned.replace(/\$[^$]+\$/g, 'MATH');

  // Remove display math
  cleaned = cleaned.replace(/\$\$[\s\S]*?\$\$/g, 'MATH');

  // Remove MyST roles like {ref}`label`
  cleaned = cleaned.replace(/\{[a-z-]+\}`[^`]*`/g, 'reference');

  // Remove directive options like :name: value
  cleaned = cleaned.replace(/^:\s*[a-z-]+:\s*.*$/gm, '');

  // Remove LaTeX commands
  cleaned = cleaned.replace(/\\[a-zA-Z]+(\{[^}]*\})*/g, '');

  // Remove frontmatter
  cleaned = cleaned.replace(/^---[\s\S]*?---/m, '');

  // Remove HTML tags
  cleaned = cleaned.replace(/<[^>]+>/g, '');

  // Remove markdown links but keep text
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove image syntax
  cleaned = cleaned.replace(/!\[[^\]]*\]\([^)]+\)/g, '');

  // Remove citation syntax
  cleaned = cleaned.replace(/\[@[^\]]+\]/g, '');

  // Collapse multiple newlines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned;
}

/**
 * Check a single file for grammar issues.
 *
 * @param {string} filePath - Path to markdown file
 * @param {Object} options - Check options
 * @returns {Object} {file, issues, lineMap}
 */
function checkFile(filePath, options = {}) {
  const content = fs.readFileSync(filePath, 'utf8');
  const cleanedContent = stripMystSyntax(content);

  // Split into paragraphs for better context
  const paragraphs = cleanedContent.split(/\n\n+/);
  const issues = [];

  paragraphs.forEach((paragraph, paragraphIndex) => {
    // Skip very short paragraphs (likely headers or single words)
    if (paragraph.trim().length < 20) {
      return;
    }

    // Skip paragraphs that are mostly numbers/formulas
    const alphaRatio = (paragraph.match(/[a-zA-Z]/g) || []).length / paragraph.length;
    if (alphaRatio < 0.5) {
      return;
    }

    const suggestions = writeGood(paragraph);

    suggestions.forEach(suggestion => {
      issues.push({
        paragraph: paragraphIndex + 1,
        index: suggestion.index,
        offset: suggestion.offset,
        reason: suggestion.reason,
        text: paragraph.substring(
          Math.max(0, suggestion.index - 20),
          Math.min(paragraph.length, suggestion.index + suggestion.offset + 20)
        )
      });
    });
  });

  return {
    file: filePath,
    issues,
    totalParagraphs: paragraphs.length
  };
}

/**
 * Format a single issue for display.
 *
 * @param {Object} issue - Issue object
 * @param {boolean} showSuggestions - Whether to show detailed suggestions
 * @returns {string} Formatted issue string
 */
function formatIssue(issue, showSuggestions = false) {
  let output = `  Paragraph ${issue.paragraph}: ${issue.reason}`;

  if (showSuggestions) {
    output += `\n    Context: "...${issue.text}..."`;
  }

  return output;
}

/**
 * Main function to run grammar checks.
 */
function main() {
  const args = process.argv.slice(2);
  const options = {
    suggestions: args.includes('--suggestions'),
    quiet: args.includes('--quiet'),
    files: args.filter(arg => !arg.startsWith('--'))
  };

  // Get files to check
  let files;
  if (options.files.length > 0) {
    files = options.files.map(f => path.resolve(f));
  } else {
    files = getAllMarkdownFiles('content');
  }

  if (files.length === 0) {
    console.log('No markdown files found to check.');
    return 0;
  }

  console.log(`\n📝 Grammar Check - Analyzing ${files.length} files...\n`);

  let totalIssues = 0;
  let filesWithIssues = 0;
  const results = [];

  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.warn(`Warning: File not found: ${file}`);
      continue;
    }

    const result = checkFile(file, options);
    results.push(result);

    if (result.issues.length > 0) {
      filesWithIssues++;
      totalIssues += result.issues.length;

      if (!options.quiet) {
        const relativePath = path.relative(process.cwd(), file);
        console.log(`📄 ${relativePath} (${result.issues.length} suggestions)`);

        // Show issues (limit to first 5 per file unless --suggestions)
        const displayIssues = options.suggestions ? result.issues : result.issues.slice(0, 5);
        for (const issue of displayIssues) {
          console.log(formatIssue(issue, options.suggestions));
        }

        if (!options.suggestions && result.issues.length > 5) {
          console.log(`  ... and ${result.issues.length - 5} more (use --suggestions to see all)`);
        }

        console.log('');
      }
    }
  }

  // Print summary
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n📊 Grammar Check Summary:`);
  console.log(`   Files checked: ${files.length}`);
  console.log(`   Files with suggestions: ${filesWithIssues}`);
  console.log(`   Total suggestions: ${totalIssues}`);

  if (totalIssues > 0) {
    console.log(`\n💡 Tips:`);
    console.log(`   • Run with --suggestions for detailed context`);
    console.log(`   • Not all suggestions require changes - use your judgment`);
    console.log(`   • Common flags: passive voice, weasel words, adverbs`);
  } else {
    console.log(`\n✅ No grammar suggestions found!`);
  }

  console.log('');

  // Don't fail the build on grammar suggestions (they're advisory)
  return 0;
}

if (require.main === module) {
  process.exit(main());
}

module.exports = {
  checkFile,
  stripMystSyntax,
  formatIssue
};
