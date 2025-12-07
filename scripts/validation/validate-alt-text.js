#!/usr/bin/env node
/**
 * Alt text validation for images in markdown content.
 *
 * Status: ACTIVE - Accessibility validation tool
 *     Ensures all images have meaningful alt text for accessibility.
 *     Run via: npm run validate:alt-text / npm run validate:alt-text:fix
 *
 * This script:
 * 1. Scans markdown files for image references
 * 2. Checks for missing or inadequate alt text
 * 3. Reports accessibility issues
 * 4. Can generate placeholder alt text suggestions
 *
 * Usage:
 *     node validate-alt-text.js [--fix] [--quiet] [--strict]
 */

const fs = require('fs');
const path = require('path');
const { getAllMarkdownFiles, ensurePath } = require('../shared-utils');

/**
 * Extract image references from markdown content.
 *
 * @param {string} content - Markdown file content
 * @param {string} filePath - Path to the file (for context)
 * @returns {Array<Object>} Array of image references with metadata
 */
function extractImageReferences(content, filePath) {
  const images = [];
  const lines = content.split('\n');

  // Track if we're inside a figure directive
  let inFigure = false;
  let figureStart = -1;
  let figureImagePath = null;
  let figureAltText = null;
  let figureCaption = [];

  lines.forEach((line, lineNum) => {
    // MyST figure directive start
    const figureMatch = line.match(/^```\{figure\}\s*(.+)?$/);
    if (figureMatch) {
      inFigure = true;
      figureStart = lineNum + 1;
      figureImagePath = figureMatch[1]?.trim() || null;
      figureAltText = null;
      figureCaption = [];
      return;
    }

    // End of figure directive
    if (inFigure && line.match(/^```\s*$/)) {
      images.push({
        type: 'figure',
        line: figureStart,
        imagePath: figureImagePath,
        altText: figureAltText,
        caption: figureCaption.join(' ').trim(),
        hasAlt: !!figureAltText,
        hasCaption: figureCaption.length > 0
      });
      inFigure = false;
      figureImagePath = null;
      figureAltText = null;
      figureCaption = [];
      return;
    }

    // Inside figure - capture alt and caption
    if (inFigure) {
      const altMatch = line.match(/^:alt:\s*(.+)$/);
      if (altMatch) {
        figureAltText = altMatch[1].trim();
        return;
      }

      // Lines that aren't options are caption text
      if (!line.match(/^:[a-z-]+:/) && line.trim()) {
        figureCaption.push(line.trim());
      }
      return;
    }

    // MyST image directive
    const imageMatch = line.match(/^```\{image\}\s*(.+)$/);
    if (imageMatch) {
      // Simple image - look for :alt: on following lines
      const imagePath = imageMatch[1].trim();
      let altText = null;

      // Look ahead for :alt: option
      for (let i = lineNum + 1; i < Math.min(lineNum + 10, lines.length); i++) {
        if (lines[i].match(/^```\s*$/)) break;
        const altMatch = lines[i].match(/^:alt:\s*(.+)$/);
        if (altMatch) {
          altText = altMatch[1].trim();
          break;
        }
      }

      images.push({
        type: 'image',
        line: lineNum + 1,
        imagePath,
        altText,
        hasAlt: !!altText
      });
      return;
    }

    // Standard markdown image syntax: ![alt](path)
    const mdImageMatches = line.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g);
    for (const match of mdImageMatches) {
      const altText = match[1].trim();
      const imagePath = match[2].trim();

      images.push({
        type: 'markdown',
        line: lineNum + 1,
        imagePath,
        altText,
        hasAlt: altText.length > 0
      });
    }

    // HTML img tags
    const htmlImageMatches = line.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/g);
    for (const match of htmlImageMatches) {
      const imgTag = match[0];
      const imagePath = match[1];
      const altMatch = imgTag.match(/alt=["']([^"']*)["']/);
      const altText = altMatch ? altMatch[1].trim() : null;

      images.push({
        type: 'html',
        line: lineNum + 1,
        imagePath,
        altText,
        hasAlt: !!altText && altText.length > 0
      });
    }
  });

  return images;
}

/**
 * Check if alt text is meaningful (not just filename or generic).
 *
 * @param {string} altText - Alt text to check
 * @param {string} imagePath - Image path for comparison
 * @returns {Object} {isValid, reason}
 */
function validateAltTextQuality(altText, imagePath) {
  if (!altText) {
    return { isValid: false, reason: 'Missing alt text' };
  }

  const alt = altText.toLowerCase().trim();

  // Check for empty or whitespace-only
  if (alt.length === 0) {
    return { isValid: false, reason: 'Alt text is empty' };
  }

  // Check for very short alt text
  if (alt.length < 5) {
    return { isValid: false, reason: 'Alt text too short (less than 5 characters)' };
  }

  // Check for generic/unhelpful alt text
  const genericPatterns = [
    /^image$/i,
    /^figure$/i,
    /^photo$/i,
    /^picture$/i,
    /^diagram$/i,
    /^graph$/i,
    /^chart$/i,
    /^icon$/i,
    /^img$/i,
    /^placeholder$/i,
    /^todo$/i,
    /^tbd$/i,
    /^xxx$/i
  ];

  for (const pattern of genericPatterns) {
    if (pattern.test(alt)) {
      return { isValid: false, reason: `Generic alt text: "${altText}"` };
    }
  }

  // Check if alt text is just the filename
  if (imagePath) {
    const filename = path.basename(imagePath, path.extname(imagePath))
      .toLowerCase()
      .replace(/[-_]/g, ' ');

    if (alt === filename || alt.replace(/\s+/g, '') === filename.replace(/\s+/g, '')) {
      return { isValid: false, reason: 'Alt text appears to be the filename' };
    }
  }

  return { isValid: true, reason: null };
}

/**
 * Generate a suggested alt text from filename.
 *
 * @param {string} imagePath - Path to the image
 * @returns {string} Suggested alt text
 */
function suggestAltText(imagePath) {
  if (!imagePath) return 'TODO: Add descriptive alt text';

  const filename = path.basename(imagePath, path.extname(imagePath));

  // Remove common prefixes like "01_02_"
  let cleaned = filename.replace(/^\d{1,2}_\d{1,2}_/, '');

  // Convert underscores and hyphens to spaces
  cleaned = cleaned.replace(/[-_]/g, ' ');

  // Capitalize first letter
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  return `TODO: ${cleaned} - add descriptive alt text`;
}

/**
 * Check a single file for alt text issues.
 *
 * @param {string} filePath - Path to markdown file
 * @param {Object} options - Validation options
 * @returns {Object} Validation results
 */
function checkFile(filePath, options = {}) {
  const content = fs.readFileSync(filePath, 'utf8');
  const images = extractImageReferences(content, filePath);

  const issues = [];
  const validImages = [];

  for (const image of images) {
    // For figures, caption can serve as alt text
    const effectiveAlt = image.altText || (image.type === 'figure' ? image.caption : null);

    if (!image.hasAlt && !(image.type === 'figure' && image.hasCaption)) {
      issues.push({
        ...image,
        issue: 'missing',
        message: 'Missing alt text',
        suggestion: suggestAltText(image.imagePath)
      });
    } else if (options.strict) {
      const quality = validateAltTextQuality(effectiveAlt, image.imagePath);
      if (!quality.isValid) {
        issues.push({
          ...image,
          issue: 'quality',
          message: quality.reason,
          suggestion: suggestAltText(image.imagePath)
        });
      } else {
        validImages.push(image);
      }
    } else {
      validImages.push(image);
    }
  }

  return {
    file: filePath,
    totalImages: images.length,
    validImages: validImages.length,
    issues
  };
}

/**
 * Apply fixes to a file (add placeholder alt text).
 *
 * @param {string} filePath - Path to markdown file
 * @param {Array} issues - Issues to fix
 * @returns {number} Number of fixes applied
 */
function applyFixes(filePath, issues) {
  if (issues.length === 0) return 0;

  let content = fs.readFileSync(filePath, 'utf8');
  let fixCount = 0;

  // Sort issues by line number in reverse order to avoid offset issues
  const sortedIssues = [...issues].sort((a, b) => b.line - a.line);

  for (const issue of sortedIssues) {
    if (issue.type === 'figure' && issue.issue === 'missing') {
      // Add :alt: option to figure directive
      const lines = content.split('\n');
      const lineIndex = issue.line - 1;

      // Find the line after the figure directive opening
      if (lineIndex < lines.length) {
        // Insert :alt: after the figure line
        let insertIndex = lineIndex + 1;

        // Skip existing options
        while (insertIndex < lines.length &&
               lines[insertIndex].match(/^:[a-z-]+:/)) {
          insertIndex++;
        }

        lines.splice(insertIndex, 0, `:alt: ${issue.suggestion}`);
        content = lines.join('\n');
        fixCount++;
      }
    } else if (issue.type === 'markdown' && issue.issue === 'missing') {
      // For markdown images, we'd need to modify the alt text in brackets
      // This is trickier, so we'll just report these
      console.log(`  Note: Cannot auto-fix markdown image at line ${issue.line}`);
    }
  }

  if (fixCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
  }

  return fixCount;
}

/**
 * Main function.
 */
function main() {
  const args = process.argv.slice(2);
  const options = {
    fix: args.includes('--fix'),
    quiet: args.includes('--quiet'),
    strict: args.includes('--strict'),
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

  console.log(`\n🖼️  Alt Text Validation - Checking ${files.length} files...\n`);

  if (options.strict) {
    console.log('   (Running in strict mode - checking alt text quality)\n');
  }

  let totalImages = 0;
  let totalIssues = 0;
  let totalFixes = 0;
  const filesWithIssues = [];

  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.warn(`Warning: File not found: ${file}`);
      continue;
    }

    const result = checkFile(file, options);
    totalImages += result.totalImages;

    if (result.issues.length > 0) {
      totalIssues += result.issues.length;
      filesWithIssues.push(result);

      if (!options.quiet) {
        const relativePath = path.relative(process.cwd(), file);
        console.log(`📄 ${relativePath}`);

        for (const issue of result.issues) {
          console.log(`   Line ${issue.line}: ${issue.message}`);
          if (issue.imagePath) {
            console.log(`      Image: ${issue.imagePath}`);
          }
          if (!options.fix) {
            console.log(`      Suggestion: ${issue.suggestion}`);
          }
        }
        console.log('');
      }

      if (options.fix) {
        const fixes = applyFixes(file, result.issues);
        totalFixes += fixes;
        if (fixes > 0 && !options.quiet) {
          console.log(`   ✓ Applied ${fixes} fix(es)\n`);
        }
      }
    }
  }

  // Print summary
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n📊 Alt Text Validation Summary:`);
  console.log(`   Files checked: ${files.length}`);
  console.log(`   Total images: ${totalImages}`);
  console.log(`   Images with issues: ${totalIssues}`);

  if (options.fix) {
    console.log(`   Fixes applied: ${totalFixes}`);
  }

  if (totalIssues > 0 && !options.fix) {
    console.log(`\n💡 Tips:`);
    console.log(`   • Run with --fix to add placeholder alt text`);
    console.log(`   • Run with --strict to check alt text quality`);
    console.log(`   • Good alt text describes the image content and purpose`);
    console.log(`\n❌ Validation failed - ${totalIssues} image(s) need alt text`);
    return 1;
  } else if (totalIssues > 0 && options.fix) {
    console.log(`\n⚠️  Some issues could not be auto-fixed. Please review manually.`);
    return 0;
  } else {
    console.log(`\n✅ All images have alt text!`);
    return 0;
  }
}

if (require.main === module) {
  process.exit(main());
}

module.exports = {
  extractImageReferences,
  validateAltTextQuality,
  suggestAltText,
  checkFile
};
