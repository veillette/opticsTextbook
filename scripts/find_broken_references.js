#!/usr/bin/env node
/**
 * Find Broken References
 *
 * This script identifies broken figure references and cross-references in MyST markdown files.
 *
 * Features:
 * 1. Finds all MyST figure/image references in markdown files
 * 2. Checks if the referenced image files actually exist
 * 3. Reports broken references with file locations and line numbers
 * 4. Finds cross-references to non-existent labels/chapters
 * 5. Generates both console output and optional file reports
 *
 * Usage:
 *   node find_broken_references.js [--content-dir DIR] [--output-file FILE]
 *
 *   --content-dir DIR: Content directory to scan (default: content)
 *   --output-file FILE: Save results to file (optional)
 *
 * Exit codes:
 *   0: No broken references found
 *   1: Broken references detected
 */

const fs = require('fs');
const path = require('path');
const { ReportGenerator, MarkdownReportBuilder } = require('./report_utils');

/**
 * Find all markdown files in a directory recursively.
 * @param {string} contentDir - Directory to search
 * @returns {string[]} Array of markdown file paths
 */
function findMarkdownFiles(contentDir) {
  const mdFiles = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.md')) {
        mdFiles.push(fullPath);
      }
    }
  }

  walk(contentDir);
  return mdFiles;
}

/**
 * Extract all figure/image references from a markdown file.
 * @param {string} mdFile - Path to markdown file
 * @returns {Array} Array of reference objects
 */
function extractFigureReferences(mdFile) {
  const references = [];

  try {
    const content = fs.readFileSync(mdFile, 'utf8');
    const lines = content.split('\n');

    // MyST figure/image patterns
    const patterns = [
      { regex: /```\{figure\}\s+([^\s\n]+)/g, type: 'figure' },  // ```{figure} path
      { regex: /```\{image\}\s+([^\s\n]+)/g, type: 'image' },    // ```{image} path
      { regex: /!\[.*?\]\(([^)]+)\)/g, type: 'markdown' },        // ![alt](path)
      { regex: /<img[^>]+src=["']([^"']+)["']/gi, type: 'html' }, // <img src="path">
    ];

    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
      const line = lines[lineNum];

      for (const { regex, type } of patterns) {
        let match;
        const re = new RegExp(regex.source, regex.flags);
        while ((match = re.exec(line)) !== null) {
          // Clean up the path
          const refPath = match[1].split('#')[0].split('?')[0].trim();
          if (refPath) {  // Skip empty paths
            references.push({
              path: refPath,
              type: type,
              line: lineNum + 1,
              lineContent: line.trim()
            });
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error reading ${mdFile}: ${error.message}`);
  }

  return references;
}

/**
 * Extract cross-references like {ref}`label` from a markdown file.
 * @param {string} mdFile - Path to markdown file
 * @returns {Array} Array of reference objects
 */
function extractCrossReferences(mdFile) {
  const references = [];

  try {
    const content = fs.readFileSync(mdFile, 'utf8');
    const lines = content.split('\n');

    // Cross-reference patterns
    const patterns = [
      { regex: /\{ref\}`([^`]+)`/g, type: 'ref' },        // {ref}`label`
      { regex: /\{numref\}`([^`]+)`/g, type: 'numref' },  // {numref}`label`
      { regex: /\{eq\}`([^`]+)`/g, type: 'eq' },          // {eq}`equation`
      { regex: /\{doc\}`([^`]+)`/g, type: 'doc' },        // {doc}`document`
    ];

    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
      const line = lines[lineNum];

      for (const { regex, type } of patterns) {
        let match;
        const re = new RegExp(regex.source, regex.flags);
        while ((match = re.exec(line)) !== null) {
          references.push({
            label: match[1].trim(),
            type: type,
            line: lineNum + 1,
            lineContent: line.trim()
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error reading ${mdFile}: ${error.message}`);
  }

  return references;
}

/**
 * Extract all labels defined in a markdown file.
 * @param {string} mdFile - Path to markdown file
 * @returns {string[]} Array of label names
 */
function extractLabels(mdFile) {
  const labels = [];

  try {
    const content = fs.readFileSync(mdFile, 'utf8');

    // Label patterns
    const patterns = [
      /\(([^)]+)\)=/g,           // (label)=
      /:name:\s*([^\s\n]+)/g,    // :name: label
      /:label:\s*([^\s\n]+)/g,   // :label: label (for equations)
      /\{#([^}]+)\}/g,           // {#label}
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        labels.push(match[1]);
      }
    }
  } catch (error) {
    console.error(`Error reading ${mdFile}: ${error.message}`);
  }

  return labels;
}

/**
 * Normalize an image path to find the actual file location.
 * @param {string} imagePath - Image path from markdown
 * @param {string} mdFileDir - Directory containing the markdown file
 * @param {string} contentDir - Content directory root
 * @returns {Object} Object with normalized path and status
 */
function normalizeImagePath(imagePath, mdFileDir, contentDir) {
  // Remove any URL fragments or query parameters
  const cleanPath = imagePath.split('#')[0].split('?')[0];

  // Skip URLs
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://') || cleanPath.startsWith('ftp://')) {
    return { path: null, status: 'external_url' };
  }

  // Handle different path formats
  const possiblePaths = [];

  if (path.isAbsolute(cleanPath)) {
    // Absolute path
    possiblePaths.push(cleanPath);
  } else {
    // Relative path - try different interpretations
    let relativePath = cleanPath;

    // Handle paths starting with ./
    if (relativePath.startsWith('./')) {
      relativePath = relativePath.substring(2);
    }

    possiblePaths.push(
      path.join(mdFileDir, cleanPath),                      // Relative to markdown file
      path.join(contentDir, cleanPath),                     // Relative to content dir
      path.join(path.dirname(mdFileDir), cleanPath),        // Up one level
      path.join(mdFileDir, relativePath),                   // Without ./
      path.join(contentDir, relativePath)                   // Without ./
    );
  }

  // Check which path exists
  for (const testPath of possiblePaths) {
    const normalized = path.normalize(testPath);
    if (fs.existsSync(normalized)) {
      return { path: normalized, status: 'found' };
    }
  }

  return {
    path: possiblePaths[0] || cleanPath,
    status: 'missing'
  };
}

/**
 * Find all broken references in the content directory.
 * @param {string} contentDir - Content directory to scan
 * @returns {Object} Object containing broken references and all labels
 */
function findBrokenReferences(contentDir = 'content') {
  if (!fs.existsSync(contentDir)) {
    console.error(`Content directory '${contentDir}' not found!`);
    return { brokenFigureRefs: [], brokenCrossRefs: [], allLabels: [] };
  }

  console.log(`Scanning for broken references in '${contentDir}'...`);
  const mdFiles = findMarkdownFiles(contentDir);
  console.log(`Found ${mdFiles.length} markdown files to check`);

  const brokenFigureRefs = [];
  const brokenCrossRefs = [];
  const allLabels = new Set();

  // First pass: collect all labels
  console.log('Collecting all labels...');
  for (const mdFile of mdFiles) {
    const labels = extractLabels(mdFile);
    for (const label of labels) {
      allLabels.add(label);
    }
  }

  console.log(`Found ${allLabels.size} labels defined in the content`);

  // Second pass: check figure references and cross-references
  console.log('Checking figure and cross-references...');
  for (const mdFile of mdFiles) {
    const mdFileDir = path.dirname(mdFile);
    const relativeMdPath = path.relative(contentDir, mdFile);

    // Check figure references
    const figureRefs = extractFigureReferences(mdFile);
    for (const ref of figureRefs) {
      const { path: normalizedPath, status } = normalizeImagePath(
        ref.path, mdFileDir, contentDir
      );

      if (status === 'missing') {
        brokenFigureRefs.push({
          mdFile: relativeMdPath,
          line: ref.line,
          type: ref.type,
          referencedPath: ref.path,
          resolvedPath: normalizedPath,
          lineContent: ref.lineContent
        });
      }
    }

    // Check cross-references
    const crossRefs = extractCrossReferences(mdFile);
    for (const ref of crossRefs) {
      if (!allLabels.has(ref.label)) {
        brokenCrossRefs.push({
          mdFile: relativeMdPath,
          line: ref.line,
          type: ref.type,
          label: ref.label,
          lineContent: ref.lineContent
        });
      }
    }
  }

  return { brokenFigureRefs, brokenCrossRefs, allLabels: Array.from(allLabels) };
}

/**
 * Print the results of the broken reference check to console.
 * @param {Array} brokenFigureRefs - Array of broken figure references
 * @param {Array} brokenCrossRefs - Array of broken cross-references
 * @param {Array} allLabels - Array of all defined labels
 */
function printResults(brokenFigureRefs, brokenCrossRefs, allLabels) {
  console.log('\n=== BROKEN REFERENCE ANALYSIS ===');

  // Summary
  console.log('\nSUMMARY:');
  console.log(`  Broken figure/image references: ${brokenFigureRefs.length}`);
  console.log(`  Broken cross-references: ${brokenCrossRefs.length}`);
  console.log(`  Total defined labels: ${allLabels.length}`);

  // Broken figure references
  if (brokenFigureRefs.length > 0) {
    console.log(`\n=== BROKEN FIGURE/IMAGE REFERENCES (${brokenFigureRefs.length}) ===`);

    // Group by file for better readability
    const byFile = {};
    for (const ref of brokenFigureRefs) {
      if (!byFile[ref.mdFile]) {
        byFile[ref.mdFile] = [];
      }
      byFile[ref.mdFile].push(ref);
    }

    for (const mdFile of Object.keys(byFile).sort()) {
      const refs = byFile[mdFile];
      console.log(`\n📄 ${mdFile} (${refs.length} broken references):`);

      for (const ref of refs) {
        console.log(`  ❌ Line ${ref.line.toString().padStart(3)}: ${ref.type} reference`);
        console.log(`     Referenced: ${ref.referencedPath}`);
        console.log(`     Resolved:   ${ref.resolvedPath}`);
        const truncated = ref.lineContent.length > 80
          ? ref.lineContent.substring(0, 80) + '...'
          : ref.lineContent;
        console.log(`     Content:    ${truncated}`);
        console.log();
      }
    }
  } else {
    console.log('\n✅ No broken figure/image references found!');
  }

  // Broken cross-references
  if (brokenCrossRefs.length > 0) {
    console.log(`\n=== BROKEN CROSS-REFERENCES (${brokenCrossRefs.length}) ===`);

    const byFile = {};
    for (const ref of brokenCrossRefs) {
      if (!byFile[ref.mdFile]) {
        byFile[ref.mdFile] = [];
      }
      byFile[ref.mdFile].push(ref);
    }

    for (const mdFile of Object.keys(byFile).sort()) {
      const refs = byFile[mdFile];
      console.log(`\n📄 ${mdFile} (${refs.length} broken cross-references):`);

      for (const ref of refs) {
        console.log(`  ❌ Line ${ref.line.toString().padStart(3)}: ${ref.type} reference to '${ref.label}'`);
        const truncated = ref.lineContent.length > 80
          ? ref.lineContent.substring(0, 80) + '...'
          : ref.lineContent;
        console.log(`     Content:    ${truncated}`);
        console.log();
      }
    }
  } else {
    console.log('\n✅ No broken cross-references found!');
  }
}

/**
 * Save results to a file using shared report utilities.
 * @param {Array} brokenFigureRefs - Array of broken figure references
 * @param {Array} brokenCrossRefs - Array of broken cross-references
 * @param {string} outputFile - Output file path
 * @returns {string} Path to the generated report
 */
function saveResults(brokenFigureRefs, brokenCrossRefs, outputFile) {
  // Extract report name from output_file
  const reportName = path.basename(outputFile, path.extname(outputFile));

  // Create report generator
  const gen = new ReportGenerator(reportName);

  // Build markdown report
  const builder = new MarkdownReportBuilder('Broken References Report');

  // Add summary
  builder.addSection('Summary', 2);
  builder.addList([
    `Broken figure/image references: ${brokenFigureRefs.length}`,
    `Broken cross-references: ${brokenCrossRefs.length}`
  ]);

  // Add broken figure references
  if (brokenFigureRefs.length > 0) {
    builder.addSection(`Broken Figure/Image References (${brokenFigureRefs.length})`, 2);

    const byFile = {};
    for (const ref of brokenFigureRefs) {
      if (!byFile[ref.mdFile]) {
        byFile[ref.mdFile] = [];
      }
      byFile[ref.mdFile].push(ref);
    }

    for (const mdFile of Object.keys(byFile).sort()) {
      const refs = byFile[mdFile];
      builder.addSection(mdFile, 3);

      for (const ref of refs) {
        builder.addText(`**Line ${ref.line}**: ${ref.type} reference\n`);
        builder.addList([
          `Referenced: \`${ref.referencedPath}\``,
          `Resolved: \`${ref.resolvedPath}\``,
          `Content: \`${ref.lineContent}\``
        ]);
      }
    }
  }

  // Add broken cross-references
  if (brokenCrossRefs.length > 0) {
    builder.addSection(`Broken Cross-References (${brokenCrossRefs.length})`, 2);

    const byFile = {};
    for (const ref of brokenCrossRefs) {
      if (!byFile[ref.mdFile]) {
        byFile[ref.mdFile] = [];
      }
      byFile[ref.mdFile].push(ref);
    }

    for (const mdFile of Object.keys(byFile).sort()) {
      const refs = byFile[mdFile];
      builder.addSection(mdFile, 3);

      for (const ref of refs) {
        builder.addText(`**Line ${ref.line}**: ${ref.type} reference to \`${ref.label}\`\n`);
        builder.addList([`Content: \`${ref.lineContent}\``]);
      }
    }
  }

  // Write markdown report
  const markdownContent = builder.build();
  const filepath = gen.writeMarkdown(markdownContent);

  // Also write JSON report for machine processing
  const jsonData = {
    brokenFigureRefs: brokenFigureRefs.length,
    brokenCrossRefs: brokenCrossRefs.length,
    figureReferences: brokenFigureRefs.map(ref => ({
      mdFile: ref.mdFile,
      line: ref.line,
      type: ref.type,
      referencedPath: ref.referencedPath,
      resolvedPath: ref.resolvedPath,
      lineContent: ref.lineContent
    })),
    crossReferences: brokenCrossRefs.map(ref => ({
      mdFile: ref.mdFile,
      line: ref.line,
      type: ref.type,
      label: ref.label,
      lineContent: ref.lineContent
    }))
  };
  gen.writeJSON(jsonData);

  return filepath;
}

/**
 * Main function.
 */
function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  let contentDir = 'content';
  let outputFile = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--content-dir' && i + 1 < args.length) {
      contentDir = args[i + 1];
      i++;
    } else if (args[i] === '--output-file' && i + 1 < args.length) {
      outputFile = args[i + 1];
      i++;
    }
  }

  // Resolve content directory path
  const scriptDir = __dirname;
  const resolvedContentDir = path.isAbsolute(contentDir)
    ? contentDir
    : path.join(scriptDir, '..', contentDir);

  // Find broken references
  const { brokenFigureRefs, brokenCrossRefs, allLabels } = findBrokenReferences(resolvedContentDir);

  // Print results
  printResults(brokenFigureRefs, brokenCrossRefs, allLabels);

  // Save to file if requested
  if (outputFile) {
    const reportPath = saveResults(brokenFigureRefs, brokenCrossRefs, outputFile);
    console.log(`\n📄 Results saved to '${reportPath}'`);
  }

  // Return appropriate exit code
  const totalBroken = brokenFigureRefs.length + brokenCrossRefs.length;
  return totalBroken > 0 ? 1 : 0;
}

// Run if called directly
if (require.main === module) {
  process.exit(main());
}

module.exports = {
  findMarkdownFiles,
  extractFigureReferences,
  extractCrossReferences,
  extractLabels,
  normalizeImagePath,
  findBrokenReferences,
  printResults,
  saveResults
};
