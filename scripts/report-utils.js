#!/usr/bin/env node
/**
 * Standardized report generation utilities for MyST markdown project scripts.
 *
 * This module provides consistent report generation across all scripts,
 * with support for multiple output formats and standardized file locations.
 *
 * Key Features:
 *     - Multi-format report generation (Markdown, JSON, plain text)
 *     - Centralized output directory (reports/)
 *     - Timestamp support for versioned reports
 *     - Fluent API for building markdown reports
 *     - Standardized validation and file list report templates
 *     - Automatic directory creation
 *
 * Classes:
 *     ReportGenerator: Main class for generating reports in multiple formats
 *     MarkdownReportBuilder: Fluent API for building structured markdown reports
 *
 * Utility Functions:
 *     createValidationReport: Generate standardized validation reports
 *     createFileListReport: Generate simple file listing reports
 *     printReportPaths: Pretty-print generated report paths
 *
 * Author: MyST Project Scripts Package
 * Version: 1.0.0
 */

const fs = require('fs');
const path = require('path');

/**
 * Get current timestamp in YYYYMMDD_HHMMSS format
 */
function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

/**
 * Get current ISO timestamp
 */
function getISOTimestamp() {
  return new Date().toISOString();
}

/**
 * Get formatted timestamp for display
 */
function getFormattedTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Generate standardized reports in various formats
 */
class ReportGenerator {
  /**
   * Initialize report generator.
   *
   * @param {string} reportName - Base name for report files (without extension)
   * @param {string} outputDir - Directory to store reports (default: 'reports')
   */
  constructor(reportName, outputDir = 'reports') {
    this.reportName = reportName;
    this.outputDir = path.resolve(outputDir);
    this.timestamp = getTimestamp();

    // Create output directory if it doesn't exist
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Get full path for report file.
   *
   * @param {string} extension - File extension (without dot)
   * @param {boolean} includeTimestamp - Whether to include timestamp in filename
   * @returns {string} Full path for the report file
   */
  getPath(extension, includeTimestamp = false) {
    let filename;
    if (includeTimestamp) {
      filename = `${this.reportName}_${this.timestamp}.${extension}`;
    } else {
      filename = `${this.reportName}.${extension}`;
    }
    return path.join(this.outputDir, filename);
  }

  /**
   * Write markdown report.
   *
   * @param {string} content - Markdown content to write
   * @param {boolean} includeTimestamp - Whether to include timestamp in filename
   * @returns {string} Path to written file
   */
  writeMarkdown(content, includeTimestamp = false) {
    const filepath = this.getPath('md', includeTimestamp);
    fs.writeFileSync(filepath, content, 'utf8');
    return filepath;
  }

  /**
   * Write JSON report.
   *
   * @param {Object|Array} data - Data to serialize as JSON
   * @param {boolean} includeTimestamp - Whether to include timestamp in filename
   * @returns {string} Path to written file
   */
  writeJson(data, includeTimestamp = false) {
    const filepath = this.getPath('json', includeTimestamp);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
    return filepath;
  }

  /**
   * Write plain text report.
   *
   * @param {Array<string>|string} lines - List of lines or single string to write
   * @param {boolean} includeTimestamp - Whether to include timestamp in filename
   * @returns {string} Path to written file
   */
  writeText(lines, includeTimestamp = false) {
    const filepath = this.getPath('txt', includeTimestamp);
    const content = Array.isArray(lines) ? lines.join('\n') : lines;
    fs.writeFileSync(filepath, content, 'utf8');
    return filepath;
  }

  /**
   * Write report in all formats at once.
   *
   * @param {string} markdownContent - Markdown formatted content
   * @param {Object} jsonData - JSON serializable data
   * @param {Array<string>|null} textLines - Optional plain text lines
   * @param {boolean} includeTimestamp - Whether to include timestamp in filenames
   * @returns {Object} Dictionary mapping format to written file path
   */
  writeAll(markdownContent, jsonData, textLines = null, includeTimestamp = false) {
    const paths = {
      markdown: this.writeMarkdown(markdownContent, includeTimestamp),
      json: this.writeJson(jsonData, includeTimestamp)
    };
    if (textLines) {
      paths.text = this.writeText(textLines, includeTimestamp);
    }
    return paths;
  }
}

/**
 * Helper class for building markdown reports with fluent API
 */
class MarkdownReportBuilder {
  /**
   * Initialize markdown report builder.
   *
   * @param {string} title - Report title
   */
  constructor(title) {
    this.lines = [];
    this.addTitle(title);
    this.addMetadata();
  }

  /**
   * Add a title/heading
   *
   * @param {string} title - Title text
   * @param {number} level - Heading level (1-6)
   * @returns {MarkdownReportBuilder} this for chaining
   */
  addTitle(title, level = 1) {
    this.lines.push('#'.repeat(level) + ' ' + title + '\n');
    return this;
  }

  /**
   * Add report generation metadata
   *
   * @returns {MarkdownReportBuilder} this for chaining
   */
  addMetadata() {
    const timestamp = getFormattedTimestamp();
    this.lines.push(`*Generated: ${timestamp}*\n`);
    return this;
  }

  /**
   * Add a section heading
   *
   * @param {string} title - Section title
   * @param {number} level - Heading level (default: 2)
   * @returns {MarkdownReportBuilder} this for chaining
   */
  addSection(title, level = 2) {
    this.lines.push('\n' + '#'.repeat(level) + ' ' + title + '\n');
    return this;
  }

  /**
   * Add plain text paragraph
   *
   * @param {string} text - Text content
   * @returns {MarkdownReportBuilder} this for chaining
   */
  addText(text) {
    this.lines.push(text + '\n');
    return this;
  }

  /**
   * Add a list (ordered or unordered)
   *
   * @param {Array<string>} items - List items
   * @param {boolean} ordered - Whether to create an ordered list
   * @returns {MarkdownReportBuilder} this for chaining
   */
  addList(items, ordered = false) {
    items.forEach((item, index) => {
      const prefix = ordered ? `${index + 1}.` : '-';
      this.lines.push(`${prefix} ${item}\n`);
    });
    return this;
  }

  /**
   * Add a markdown table
   *
   * @param {Array<string>} headers - Table headers
   * @param {Array<Array<string>>} rows - Table rows
   * @returns {MarkdownReportBuilder} this for chaining
   */
  addTable(headers, rows) {
    // Headers
    this.lines.push('| ' + headers.join(' | ') + ' |\n');
    // Separator
    this.lines.push('| ' + headers.map(() => '---').join(' | ') + ' |\n');
    // Rows
    rows.forEach(row => {
      this.lines.push('| ' + row.map(cell => String(cell)).join(' | ') + ' |\n');
    });
    this.lines.push('\n');
    return this;
  }

  /**
   * Add a code block
   *
   * @param {string} code - Code content
   * @param {string} language - Language for syntax highlighting
   * @returns {MarkdownReportBuilder} this for chaining
   */
  addCodeBlock(code, language = '') {
    this.lines.push('```' + language + '\n' + code + '\n```\n');
    return this;
  }

  /**
   * Add a summary section with key-value pairs
   *
   * @param {Object} summaryDict - Dictionary of summary items
   * @returns {MarkdownReportBuilder} this for chaining
   */
  addSummary(summaryDict) {
    this.addSection('Summary', 2);
    Object.entries(summaryDict).forEach(([key, value]) => {
      this.lines.push(`- **${key}**: ${value}\n`);
    });
    return this;
  }

  /**
   * Build and return the complete markdown document
   *
   * @returns {string} Complete markdown content
   */
  build() {
    return this.lines.join('');
  }
}

/**
 * Create a standardized validation report.
 *
 * @param {string} title - Report title
 * @param {Object} issues - Dictionary of issue categories to issue lists
 * @param {Object} summary - Summary statistics
 * @returns {Array} [markdownContent, jsonData]
 */
function createValidationReport(title, issues, summary) {
  const builder = new MarkdownReportBuilder(title);

  // Add summary
  builder.addSummary(summary);

  // Add issues by category
  Object.entries(issues).forEach(([category, issueList]) => {
    if (issueList && issueList.length > 0) {
      const categoryTitle = category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      builder.addSection(categoryTitle, 2);
      builder.addText(`Found ${issueList.length} issue(s):\n`);
      builder.addList(issueList.map(issue => String(issue)));
    }
  });

  // Build JSON data
  const jsonData = {
    title,
    timestamp: getISOTimestamp(),
    summary,
    issues
  };

  return [builder.build(), jsonData];
}

/**
 * Create a simple file list report.
 *
 * @param {string} title - Report title
 * @param {Array<string>} files - List of file paths
 * @param {string} description - Optional description
 * @returns {Array} [markdownContent, textContent]
 */
function createFileListReport(title, files, description = '') {
  const builder = new MarkdownReportBuilder(title);

  if (description) {
    builder.addText(description);
  }

  builder.addSection('Files', 2);
  builder.addText(`Total: ${files.length} files\n`);
  builder.addList(files);

  const markdown = builder.build();
  const text = files.join('\n');

  return [markdown, text];
}

/**
 * Print report file paths in a consistent format.
 *
 * @param {Object} paths - Dictionary mapping format to file path
 */
function printReportPaths(paths) {
  console.log('\nReports generated:');
  Object.entries(paths).forEach(([formatName, filepath]) => {
    const capitalizedFormat = formatName.charAt(0).toUpperCase() + formatName.slice(1);
    console.log(`  - ${capitalizedFormat}: ${filepath}`);
  });
}

// ============================================================================
// Module Exports
// ============================================================================

module.exports = {
  ReportGenerator,
  MarkdownReportBuilder,
  createValidationReport,
  createFileListReport,
  printReportPaths,
  getTimestamp,
  getISOTimestamp,
  getFormattedTimestamp
};
