/**
 * MyST Markdown Project Utility Scripts
 *
 * This package provides utility scripts for maintaining and validating
 * MyST Markdown projects. The scripts are content-agnostic and work
 * with any MyST project structure.
 *
 * Modules:
 *   shared_utils: Common functions and constants
 *   report_utils: Standardized report generation
 *
 * @module scripts
 * @version 1.0.0
 */

const sharedUtils = require('./shared_utils');
const reportUtils = require('./report_utils');

// Version
const __version__ = '1.0.0';

// Export commonly used items for convenience
module.exports = {
  // Version
  __version__,
  version: __version__,

  // Exceptions (custom error classes)
  ValidationError: sharedUtils.ValidationError,
  ConfigurationError: sharedUtils.ConfigurationError,
  ChapterError: sharedUtils.ChapterError,

  // Configuration
  getChapters: sharedUtils.getChapters,
  getImageExtensions: sharedUtils.getImageExtensions,
  loadConfig: sharedUtils.loadConfig,
  getChapterCodes: sharedUtils.getChapterCodes,
  getChapterCodeFromPath: sharedUtils.getChapterCodeFromPath,

  // Validation
  validateChapterNumber: sharedUtils.validateChapterNumber,
  validateImageExtension: sharedUtils.validateImageExtension,
  validateFileExists: sharedUtils.validateFileExists,

  // String manipulation
  toSnakeCase: sharedUtils.toSnakeCase,
  toCamelCase: sharedUtils.toCamelCase,
  extractDescriptiveName: sharedUtils.extractDescriptiveName,

  // Path handling
  ensurePath: sharedUtils.ensurePath,
  ensureDirectory: sharedUtils.ensureDirectory,

  // Chapter info
  getChapterInfo: sharedUtils.getChapterInfo,
  findMarkdownFilesInChapter: sharedUtils.findMarkdownFilesInChapter,

  // Report generation
  ReportGenerator: reportUtils.ReportGenerator,
  MarkdownReportBuilder: reportUtils.MarkdownReportBuilder,

  // Re-export entire modules for advanced usage
  sharedUtils,
  reportUtils,
};

/**
 * Example usage:
 *
 * ```javascript
 * // Import the entire package
 * const scripts = require('./scripts');
 *
 * // Use convenience exports
 * const chapters = scripts.getChapters();
 * const config = scripts.loadConfig();
 *
 * // Use error classes
 * try {
 *   scripts.validateChapterNumber(15);
 * } catch (err) {
 *   if (err instanceof scripts.ChapterError) {
 *     console.error('Invalid chapter:', err.message);
 *   }
 * }
 *
 * // Create a report
 * const gen = new scripts.ReportGenerator('my-report');
 * const builder = new scripts.MarkdownReportBuilder('My Report');
 * builder.addSection('Overview', 2);
 * builder.addText('This is a test report.');
 * const markdown = builder.build();
 * gen.writeMarkdown(markdown);
 *
 * // Or import specific items
 * const { getChapters, toSnakeCase } = require('./scripts');
 * const chapters = getChapters();
 * const snake = toSnakeCase('MyVariableName');
 * ```
 */
