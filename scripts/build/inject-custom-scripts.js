/**
 * Post-build script injection for MyST sites
 *
 * This script injects custom JavaScript into HTML files after myst build.
 * This is a workaround for MyST MD's lack of native custom script support.
 * See: https://github.com/jupyter-book/myst-theme/issues/437
 *
 * Usage: Run after `myst build --html`
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '../..');
const BUILD_DIR = path.join(ROOT_DIR, '_build', 'html');
const CUSTOM_SCRIPTS_SRC = path.join(ROOT_DIR, 'js', 'custom-scripts.js');
const CUSTOM_SCRIPTS_DEST = 'custom-scripts.js';

// Base path for deployed site (e.g., /opticsTextbook for GitHub Pages)
const RAW_BASE_PATH = process.env.BASE_URL || '';
const NORMALIZED_BASE_PATH = (() => {
  if (!RAW_BASE_PATH || RAW_BASE_PATH === '/') {
    return '';
  }
  return RAW_BASE_PATH.endsWith('/') ? RAW_BASE_PATH.slice(0, -1) : RAW_BASE_PATH;
})();

const pathWithBase = (resource = '') => {
  const trimmed = resource.replace(/^\//, '');
  if (!trimmed) {
    return NORMALIZED_BASE_PATH ? `${NORMALIZED_BASE_PATH}/` : '/';
  }
  if (!NORMALIZED_BASE_PATH) {
    return `/${trimmed}`;
  }
  return `${NORMALIZED_BASE_PATH}/${trimmed}`;
};

/**
 * Find all HTML files in a directory recursively
 */
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip certain directories
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'myst_assets_folder') {
        findHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Copy custom scripts file to build directory
 */
function copyCustomScripts() {
  if (!fs.existsSync(CUSTOM_SCRIPTS_SRC)) {
    console.warn(`\u26A0\uFE0F  Custom scripts file not found: ${CUSTOM_SCRIPTS_SRC}`);
    return false;
  }

  const destPath = path.join(BUILD_DIR, CUSTOM_SCRIPTS_DEST);
  fs.copyFileSync(CUSTOM_SCRIPTS_SRC, destPath);
  console.log(`\u2705 Copied custom-scripts.js to build directory`);
  return true;
}

/**
 * Inject script tag into HTML files
 */
function injectScriptTags() {
  const scriptUrl = pathWithBase(CUSTOM_SCRIPTS_DEST);
  const scriptTag = `\n<!-- Custom Scripts (injected by post-build script) -->\n<script src="${scriptUrl}"></script>\n`;

  const htmlFiles = findHtmlFiles(BUILD_DIR);
  console.log(`\nFound ${htmlFiles.length} HTML files to update`);

  let updatedCount = 0;
  let skippedCount = 0;

  htmlFiles.forEach(filePath => {
    try {
      let content = fs.readFileSync(filePath, 'utf8');

      // Check if already injected
      if (content.includes('custom-scripts.js')) {
        skippedCount++;
        return;
      }

      // Inject script before </body>
      if (content.includes('</body>')) {
        const bodyCloseIndex = content.lastIndexOf('</body>');
        content = content.slice(0, bodyCloseIndex) + scriptTag + content.slice(bodyCloseIndex);

        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
      }
    } catch (error) {
      console.error(`\u274C Error updating ${filePath}:`, error.message);
    }
  });

  console.log(`\u2705 Updated ${updatedCount} HTML files with custom script tag`);
  if (skippedCount > 0) {
    console.log(`\u23ED\uFE0F  Skipped ${skippedCount} files (already have custom scripts)`);
  }
}

/**
 * Main function
 */
function main() {
  console.log('=== Custom Script Injection ===\n');

  // Check if build directory exists
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('\u274C Build directory not found. Please run "myst build --html" first.');
    process.exit(1);
  }

  // Check if custom scripts file exists
  if (!fs.existsSync(CUSTOM_SCRIPTS_SRC)) {
    console.log('\u2139\uFE0F  No custom-scripts.js file found. Skipping script injection.');
    console.log('    Create js/custom-scripts.js to add custom JavaScript.');
    return;
  }

  console.log(`Build directory: ${BUILD_DIR}`);
  console.log(`Custom scripts source: ${CUSTOM_SCRIPTS_SRC}\n`);

  // Copy custom scripts to build directory
  copyCustomScripts();

  // Inject script tags into HTML files
  injectScriptTags();

  console.log('\n\u2705 Script injection complete!');
}

// Run the script
main();
