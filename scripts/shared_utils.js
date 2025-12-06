#!/usr/bin/env node
/**
 * Shared utility functions and constants for MyST markdown projects.
 *
 * Status: ACTIVE - Core library module
 *     Imported by most other scripts. Do not modify without testing all dependents.
 *
 * This module provides common functionality used across multiple scripts
 * to avoid code duplication and ensure consistency. It works with any
 * MyST markdown project by auto-discovering content structure.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration file path
const CONFIG_FILE = path.join(__dirname, 'config.json');

// ============================================================================
// Custom Error Classes
// ============================================================================

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class ConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

class ChapterError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ChapterError';
  }
}

// ============================================================================
// Configuration Management
// ============================================================================

let _configCache = null;

function loadConfig() {
  /**
   * Load and validate configuration from config.json.
   *
   * @returns {Object} Dictionary containing configuration
   * @throws {ConfigurationError} If config file is missing or invalid
   */
  if (_configCache) {
    return _configCache;
  }

  try {
    const configData = fs.readFileSync(CONFIG_FILE, 'utf8');
    const config = JSON.parse(configData);
    validateConfig(config);
    _configCache = config;
    return config;
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new ConfigurationError(`Configuration file not found: ${CONFIG_FILE}`);
    } else if (err instanceof SyntaxError) {
      throw new ConfigurationError(`Invalid JSON in configuration file: ${err.message}`);
    }
    throw err;
  }
}

function validateConfig(config) {
  /**
   * Validate that configuration has required fields and structure.
   *
   * @param {Object} config - Configuration dictionary to validate
   * @throws {ConfigurationError} If configuration is invalid
   */
  const requiredFields = ['chapters', 'image_extensions', 'image_optimization', 'reports'];

  for (const field of requiredFields) {
    if (!(field in config)) {
      throw new ConfigurationError(`Missing required config field: '${field}'`);
    }
  }

  // Validate chapter structure
  // Skip metadata fields (keys starting with underscore)
  for (const [chapterNum, info] of Object.entries(config.chapters)) {
    // Skip metadata comment fields
    if (chapterNum.startsWith('_')) {
      continue;
    }
    if (typeof info !== 'object' || info === null) {
      throw new ConfigurationError(`Chapter ${chapterNum} info must be a dictionary`);
    }
    if (!('dir' in info)) {
      throw new ConfigurationError(`Chapter ${chapterNum} missing 'dir' field`);
    }
    if (!('file' in info)) {
      throw new ConfigurationError(`Chapter ${chapterNum} missing 'file' field`);
    }
  }

  // Validate image extensions
  if (!Array.isArray(config.image_extensions)) {
    throw new ConfigurationError("'image_extensions' must be a list");
  }

  // Validate image optimization settings
  const opt = config.image_optimization;
  const requiredOptFields = ['max_dimension', 'quality', 'min_size_mb'];
  for (const field of requiredOptFields) {
    if (!(field in opt)) {
      throw new ConfigurationError(`Missing image_optimization field: '${field}'`);
    }
  }
}

function autoDiscoverChapters(contentDir = 'content', pattern = 'Chap*') {
  /**
   * Auto-discover chapters from the content directory.
   *
   * @param {string} contentDir - Content directory path
   * @param {string} pattern - Glob pattern to match chapter directories
   * @returns {Object} Dictionary mapping chapter number to {dir, file}
   */
  const chapters = {};
  const contentPath = path.resolve(contentDir);

  if (!fs.existsSync(contentPath)) {
    console.warn(`Content directory not found: ${contentDir}`);
    return {};
  }

  // Find all chapter directories
  const entries = fs.readdirSync(contentPath, { withFileTypes: true });
  const chapterDirs = entries
    .filter(entry => entry.isDirectory() && entry.name.match(/^Chap/i))
    .map(entry => path.join(contentPath, entry.name))
    .sort();

  for (const chapterDir of chapterDirs) {
    // Extract chapter number from directory name
    const match = path.basename(chapterDir).match(/Chap(\d+)/i);
    if (!match) {
      continue;
    }

    const chapterNum = parseInt(match[1], 10);

    // Find the main markdown file (largest .md file, excluding Problems directory)
    const mdFiles = fs.readdirSync(chapterDir)
      .filter(f => f.endsWith('.md') && !f.startsWith('.'))
      .map(f => path.join(chapterDir, f));

    if (mdFiles.length === 0) {
      console.warn(`No markdown files found in ${chapterDir}`);
      continue;
    }

    // Use the largest file as the main file (typically the chapter content)
    const mainFile = mdFiles.reduce((largest, current) => {
      const currentSize = fs.statSync(current).size;
      const largestSize = fs.statSync(largest).size;
      return currentSize > largestSize ? current : largest;
    });

    // Store relative paths
    chapters[chapterNum] = {
      dir: chapterDir,
      file: path.basename(mainFile)
    };
  }

  return chapters;
}

let _chaptersCache = null;

function getChapters() {
  /**
   * Get chapter mapping dictionary.
   *
   * Attempts to auto-discover chapters if configured, otherwise loads from config.json.
   *
   * @returns {Object} Dictionary mapping chapter number to {dir, file}
   */
  if (_chaptersCache) {
    return _chaptersCache;
  }

  const config = loadConfig();
  const chaptersConfig = config.chapters || {};

  // Check if auto-discovery is enabled
  if (chaptersConfig._auto_discover) {
    const contentDir = chaptersConfig._content_directory || 'content';
    const pattern = chaptersConfig._chapter_pattern || 'Chap*';
    const discovered = autoDiscoverChapters(contentDir, pattern);

    // Merge with any explicitly defined chapters (explicit definitions take precedence)
    const explicitChapters = {};
    for (const [k, v] of Object.entries(chaptersConfig)) {
      if (!k.startsWith('_') && typeof v === 'object' && v !== null) {
        explicitChapters[parseInt(k, 10)] = { dir: v.dir, file: v.file };
      }
    }

    // Explicit chapters override discovered ones
    Object.assign(discovered, explicitChapters);
    _chaptersCache = discovered;
    return discovered;
  }

  // Fall back to explicit configuration
  const chapters = {};
  for (const [k, v] of Object.entries(chaptersConfig)) {
    if (!k.startsWith('_')) {
      chapters[parseInt(k, 10)] = { dir: v.dir, file: v.file };
    }
  }
  _chaptersCache = chapters;
  return chapters;
}

let _extensionsCache = null;

function getImageExtensions() {
  /**
   * Get list of supported image extensions.
   *
   * @returns {Array<string>} List of image file extensions (without dots)
   */
  if (_extensionsCache) {
    return _extensionsCache;
  }
  _extensionsCache = loadConfig().image_extensions;
  return _extensionsCache;
}

let _chapterCodesCache = null;

function getChapterCodes() {
  /**
   * Get chapter code mappings for label prefixes.
   *
   * Returns a mapping of chapter directory names to short codes used in labels.
   * For example: 'Chap02GeometricalOptics' -> 'geo'
   *
   * @returns {Object} Dictionary mapping chapter directory names to codes
   */
  if (_chapterCodesCache) {
    return _chapterCodesCache;
  }

  const config = loadConfig();
  const chapterCodesConfig = config.chapter_codes || {};

  // If auto-generation is enabled, generate codes from chapter directories
  if (chapterCodesConfig._auto_generate) {
    const chapters = getChapters();
    const codes = {};

    // First, add any explicit mappings from config
    for (const [dirName, code] of Object.entries(chapterCodesConfig)) {
      if (!dirName.startsWith('_') && typeof code === 'string') {
        codes[dirName] = code;
      }
    }

    // For chapters without explicit codes, auto-generate from directory name
    for (const chapterInfo of Object.values(chapters)) {
      const dirName = path.basename(chapterInfo.dir);
      if (!codes[dirName]) {
        // Auto-generate code from directory name
        // Extract the part after "Chap##" and create abbreviation
        const match = dirName.match(/^Chap\d+(.+)$/);
        if (match) {
          const name = match[1];
          // Simple abbreviation: take first 3-5 letters, lowercase
          codes[dirName] = name.substring(0, Math.min(5, name.length)).toLowerCase();
        }
      }
    }

    _chapterCodesCache = codes;
    return codes;
  }

  // Use only explicit mappings
  const codes = {};
  for (const [dirName, code] of Object.entries(chapterCodesConfig)) {
    if (!dirName.startsWith('_') && typeof code === 'string') {
      codes[dirName] = code;
    }
  }

  _chapterCodesCache = codes;
  return codes;
}

function getChapterCodeFromPath(filePath) {
  /**
   * Extract chapter code from a file path.
   *
   * @param {string} filePath - Path to a file in a chapter directory
   * @returns {string|null} Chapter code or null if not found
   */
  const chapterCodes = getChapterCodes();

  for (const [dirName, code] of Object.entries(chapterCodes)) {
    if (filePath.includes(dirName)) {
      return code;
    }
  }

  // Check for appendices
  if (filePath.includes('Appendix') || filePath.includes('Appendices')) {
    return 'appendix';
  }

  // Check for Preface/Author
  if (filePath.includes('Preface') || filePath.includes('Author')) {
    return 'preface';
  }

  return null;
}

// ============================================================================
// Path Handling Utilities
// ============================================================================

function ensurePath(pathLike) {
  /**
   * Convert string or Path-like to absolute path string.
   *
   * @param {string|Object} pathLike - String path or Path object
   * @returns {string} Absolute path string
   */
  return path.resolve(pathLike);
}

function ensureDirectory(directory) {
  /**
   * Ensure directory exists, create if necessary.
   *
   * @param {string} directory - Directory path
   * @returns {string} Absolute path for the directory
   */
  const dirPath = ensurePath(directory);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
}

// ============================================================================
// Validation Utilities
// ============================================================================

function validateChapterNumber(chapterNum) {
  /**
   * Validate chapter number is in valid range.
   *
   * @param {number} chapterNum - Chapter number to validate
   * @returns {boolean} True if valid
   * @throws {ChapterError} If chapter number is invalid
   */
  const chapters = getChapters();
  if (!(chapterNum in chapters)) {
    const validRange = `1-${Math.max(...Object.keys(chapters).map(Number))}`;
    throw new ChapterError(
      `Invalid chapter number: ${chapterNum}. Valid range: ${validRange}`
    );
  }
  return true;
}

function validateImageExtension(filename) {
  /**
   * Check if file has valid image extension.
   *
   * @param {string} filename - Filename to check
   * @returns {boolean} True if extension is valid, False otherwise
   */
  const ext = path.extname(filename).toLowerCase().substring(1);
  return getImageExtensions().includes(ext);
}

function validateFileExists(filepath) {
  /**
   * Validate that a file exists.
   *
   * @param {string} filepath - Path to file
   * @returns {boolean} True if file exists
   * @throws {ValidationError} If file doesn't exist
   */
  const resolvedPath = ensurePath(filepath);
  if (!fs.existsSync(resolvedPath)) {
    throw new ValidationError(`File not found: ${filepath}`);
  }
  const stats = fs.statSync(resolvedPath);
  if (!stats.isFile()) {
    throw new ValidationError(`Path is not a file: ${filepath}`);
  }
  return true;
}

// ============================================================================
// MyST Command Execution
// ============================================================================

function runMystCommand(command, timeout = 180000) {
  /**
   * Run a MyST command and capture detailed output.
   *
   * @param {Array<string>} command - Command and arguments as array
   * @param {number} timeout - Timeout in milliseconds (default: 180000)
   * @returns {Object} {stdout, stderr, returnCode}
   */
  try {
    console.log(`Running command: ${command.join(' ')}`);
    const stdout = execSync(command.join(' '), {
      timeout,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return { stdout, stderr: '', returnCode: 0 };
  } catch (err) {
    if (err.killed) {
      console.error(`Command timed out after ${timeout} ms`);
      return { stdout: '', stderr: `Command timed out after ${timeout} ms`, returnCode: 1 };
    }
    console.error(`Command failed: ${err.message}`);
    return { stdout: err.stdout || '', stderr: err.stderr || err.message, returnCode: err.status || 1 };
  }
}

// ============================================================================
// String Manipulation
// ============================================================================

function toSnakeCase(name) {
  /**
   * Convert name to snake_case.
   *
   * @param {string} name - Name to convert (may include extension)
   * @returns {string} snake_case version of the name
   */
  // Remove known file extensions if present
  const knownExtensions = [...getImageExtensions(), 'md', 'txt', 'ai', 'psd'];
  for (const ext of knownExtensions) {
    if (name.toLowerCase().endsWith('.' + ext)) {
      name = name.substring(0, name.length - ext.length - 1);
      break;
    }
  }

  // Remove any existing chapter/number prefix
  name = name.replace(/^\d{2}_\d{2}_/, '');

  // Insert underscore before uppercase letters
  let s1 = name.replace(/([a-z0-9])([A-Z])/g, '$1_$2');
  let s2 = s1.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2');

  // Convert to lowercase
  let result = s2.toLowerCase();

  // Replace hyphens, spaces, and dots with underscores
  result = result.replace(/[-\s.]/g, '_');

  // Remove multiple consecutive underscores
  result = result.replace(/_+/g, '_');

  // Remove leading/trailing underscores
  result = result.replace(/^_+|_+$/g, '');

  // Fix common acronyms
  result = result.replace(/si_o2|si_o_2/g, 'sio2');

  return result;
}

function extractDescriptiveName(filename) {
  /**
   * Extract a descriptive name from a filename, handling various formats.
   *
   * @param {string} filename - Filename to extract from
   * @returns {string} Descriptive name in snake_case
   */
  // Remove extension
  let name = path.parse(filename).name;

  // Remove chapter/number prefix if present
  name = name.replace(/^\d{1,2}_\d{1,2}_/, '');

  // Remove vestigial prefixes like "Fiber_03_" or "2_05a_"
  name = name.replace(/^[A-Za-z]+_\d+[a-z]?_/, '');
  name = name.replace(/^\d+_\d+[a-z]?_/, '');

  // Remove date suffixes like _210308
  name = name.replace(/_\d{6}$/, '');

  // Convert to snake_case
  name = toSnakeCase(name);

  // If name is empty or too short, use a generic name
  if (name.length < 2) {
    name = "figure";
  }

  return name;
}

// ============================================================================
// Filename Validation
// ============================================================================

function isProperlyNamed(filename, chapterNum) {
  /**
   * Check if a filename follows the naming convention.
   *
   * Convention: ChapterNum_ImageNum_descriptive_name.ext
   * Example: 03_07_lens_diagram.png
   *
   * @param {string} filename - Filename to check
   * @param {number} chapterNum - Chapter number (1-11)
   * @returns {boolean} True if filename follows convention, False otherwise
   */
  const chapterStr = String(chapterNum).padStart(2, '0');
  const pattern = new RegExp(`^${chapterStr}_\\d{2}_[a-z0-9_]+\\.\\w+$`);
  return pattern.test(filename);
}

// ============================================================================
// Figure Reference Extraction
// ============================================================================

function extractFigureReferences(mdFile, imagesDir = null) {
  /**
   * Extract all figure references from a markdown file in order of appearance.
   *
   * @param {string} mdFile - Path to markdown file
   * @param {string|null} imagesDir - Optional path to images directory (for validation)
   * @returns {Array<Object>} List of dictionaries containing reference information
   */
  const references = [];
  const mdPath = ensurePath(mdFile);

  try {
    const content = fs.readFileSync(mdPath, 'utf8');
    const lines = content.split('\n');

    // MyST figure/image patterns
    const patterns = [
      /```\{figure\}\s+([^\s\n]+)/,          // ```{figure} path
      /```\{image\}\s+([^\s\n]+)/,           // ```{image} path
      /!\[.*?\]\(([^)]+)\)/,                  // ![alt](path)
      /<img[^>]+src=["']([^"']+)["']/,       // <img src="path">
    ];

    lines.forEach((line, lineNum) => {
      for (const pattern of patterns) {
        const matches = line.match(pattern);
        if (matches) {
          for (let i = 1; i < matches.length; i++) {
            const match = matches[i];
            if (!match) continue;

            // Clean up the path
            const cleanPath = match.split('#')[0].split('?')[0].trim();

            // Skip URLs
            if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://') || cleanPath.startsWith('ftp://')) {
              continue;
            }

            // Extract filename
            let filename;
            if (cleanPath.includes('Images/')) {
              filename = cleanPath.split('Images/').pop();
            } else if (cleanPath.includes('../Images/')) {
              filename = cleanPath.split('../Images/').pop();
            } else {
              filename = path.basename(cleanPath);
            }

            // Build reference info
            const refInfo = {
              filename,
              line: lineNum + 1,
              lineContent: line.trim(),
              originalReference: cleanPath
            };

            // Add file path if imagesDir provided and file exists
            if (imagesDir) {
              const imagePath = path.join(ensurePath(imagesDir), filename);
              if (fs.existsSync(imagePath)) {
                refInfo.fullPath = imagePath;
              }
            }

            references.push(refInfo);
          }
        }
      }
    });
  } catch (err) {
    console.warn(`Error reading ${path.basename(mdFile)}: ${err.message}`);
  }

  return references;
}

// ============================================================================
// File and Directory Discovery
// ============================================================================

function findMarkdownFilesInChapter(chapterDir) {
  /**
   * Find all markdown files in a chapter directory.
   *
   * Searches in:
   * - Chapter root directory (*.md)
   * - Problems subdirectory (*.md)
   *
   * @param {string} chapterDir - Path to chapter directory
   * @returns {Array<string>} Sorted list of markdown file paths
   */
  const mdFiles = [];
  const chapterPath = ensurePath(chapterDir);

  // Main chapter files
  const entries = fs.readdirSync(chapterPath);
  for (const entry of entries) {
    if (entry.endsWith('.md')) {
      mdFiles.push(path.join(chapterPath, entry));
    }
  }

  // Problems directory
  const problemsDir = path.join(chapterPath, 'Problems');
  if (fs.existsSync(problemsDir)) {
    const problemEntries = fs.readdirSync(problemsDir);
    for (const entry of problemEntries) {
      if (entry.endsWith('.md')) {
        mdFiles.push(path.join(problemsDir, entry));
      }
    }
  }

  return mdFiles.sort();
}

function getAllMarkdownFiles(contentDir = 'content') {
  /**
   * Get all markdown files in the content directory.
   *
   * @param {string} contentDir - Content directory path
   * @returns {Array<string>} List of paths for all .md files
   */
  const mdFiles = [];
  const contentPath = ensurePath(contentDir);

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

  walkDir(contentPath);
  return mdFiles;
}

// ============================================================================
// Chapter Information
// ============================================================================

function getChapterInfo(chapterNum) {
  /**
   * Get chapter directory and main file for a chapter number.
   *
   * @param {number} chapterNum - Chapter number (1-11)
   * @returns {Object|null} {chapterDir, mainFile} or null if invalid
   * @throws {ChapterError} If chapter number is invalid
   */
  validateChapterNumber(chapterNum);
  const chapters = getChapters();
  const { dir: chapterDir, file: mainFile } = chapters[chapterNum];
  return { chapterDir: ensurePath(chapterDir), mainFile };
}

// ============================================================================
// Formatting Utilities
// ============================================================================

function formatFileSize(sizeBytes) {
  /**
   * Format file size in human-readable format.
   *
   * @param {number} sizeBytes - Size in bytes
   * @returns {string} Formatted string (e.g., "1.50 MB")
   */
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = sizeBytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

// ============================================================================
// Progress Callback Support
// ============================================================================

function createProgressCallback(total, description = "Processing") {
  /**
   * Create a simple progress callback function.
   *
   * @param {number} total - Total number of items
   * @param {string} description - Description to display
   * @returns {Function} Callback function that takes (current, item) arguments
   */
  return function(current, item = "") {
    const percent = total > 0 ? (current / total) * 100 : 0;
    const itemDesc = item ? `: ${item}` : "";
    console.log(`${description} [${current}/${total}] (${percent.toFixed(1)}%)${itemDesc}`);
  };
}

function processWithProgress(items, processFunc, description = "Processing", callback = null) {
  /**
   * Process items with optional progress reporting.
   *
   * @param {Array} items - List of items to process
   * @param {Function} processFunc - Function to apply to each item
   * @param {string} description - Description for progress reporting
   * @param {Function|null} callback - Optional custom callback function
   * @returns {Array} List of results
   */
  const results = [];
  const total = items.length;

  // Use provided callback or create default
  const progressCallback = callback || createProgressCallback(total, description);

  items.forEach((item, index) => {
    const result = processFunc(item);
    results.push(result);
    if (progressCallback) {
      progressCallback(index + 1, String(item));
    }
  });

  return results;
}

// ============================================================================
// Module Exports
// ============================================================================

module.exports = {
  // Exceptions
  ValidationError,
  ConfigurationError,
  ChapterError,
  // Configuration
  loadConfig,
  validateConfig,
  autoDiscoverChapters,
  getChapters,
  getImageExtensions,
  getChapterCodes,
  getChapterCodeFromPath,
  // Path handling
  ensurePath,
  ensureDirectory,
  // Validation
  validateChapterNumber,
  validateImageExtension,
  validateFileExists,
  // MyST commands
  runMystCommand,
  // String manipulation
  toSnakeCase,
  extractDescriptiveName,
  isProperlyNamed,
  // Figure references
  extractFigureReferences,
  // File discovery
  findMarkdownFilesInChapter,
  getAllMarkdownFiles,
  // Chapter info
  getChapterInfo,
  // Formatting
  formatFileSize,
  // Progress
  createProgressCallback,
  processWithProgress
};
