/**
 * Generate PWA manifest.json from template using myst.yml configuration
 * This makes the PWA setup content-agnostic and reusable across projects
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT_DIR = path.join(__dirname, '../..');
const TEMPLATE_PATH = path.join(ROOT_DIR, 'pwa', 'manifest.json.template');
const OUTPUT_PATH = path.join(ROOT_DIR, 'pwa', 'manifest.json');

/**
 * Load MyST configuration from myst.yml
 */
function loadMystConfig() {
  const mystConfigPath = path.join(ROOT_DIR, 'myst.yml');

  if (!fs.existsSync(mystConfigPath)) {
    console.error('❌ myst.yml not found. Please ensure you have a valid MyST project.');
    process.exit(1);
  }

  try {
    const fileContents = fs.readFileSync(mystConfigPath, 'utf8');
    return yaml.load(fileContents);
  } catch (e) {
    console.error('❌ Error parsing myst.yml:', e.message);
    process.exit(1);
  }
}

/**
 * Extract base path from environment or use empty string
 */
function getBasePath() {
  const rawBasePath = process.env.BASE_URL || '';
  if (!rawBasePath || rawBasePath === '/') {
    return '';
  }
  return rawBasePath.endsWith('/') ? rawBasePath.slice(0, -1) : rawBasePath;
}

/**
 * Generate manifest.json from template
 */
function generateManifest() {
  console.log('=== PWA Manifest Generation ===\n');

  // Load template
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`❌ Template not found: ${TEMPLATE_PATH}`);
    console.error('Please ensure pwa/manifest.json.template exists.');
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const config = loadMystConfig();
  const basePath = getBasePath();

  // Extract project information from myst.yml
  const projectTitle = config?.project?.title || config?.site?.title || 'MyST Project';
  const shortName = config?.site?.options?.logo_text || projectTitle.split(':')[0].trim();
  const description = config?.project?.description ||
                     config?.project?.parts?.abstract ||
                     `${projectTitle} - Built with MyST Markdown`;

  // Replace placeholders
  let manifest = template
    .replace(/\{\{PROJECT_TITLE\}\}/g, projectTitle)
    .replace(/\{\{SHORT_NAME\}\}/g, shortName)
    .replace(/\{\{DESCRIPTION\}\}/g, description)
    .replace(/\{\{BASE_PATH\}\}/g, basePath);

  // Parse and pretty-print JSON
  try {
    const manifestObj = JSON.parse(manifest);
    manifest = JSON.stringify(manifestObj, null, 2);
  } catch (e) {
    console.error('❌ Error parsing generated manifest:', e.message);
    process.exit(1);
  }

  // Write manifest.json
  fs.writeFileSync(OUTPUT_PATH, manifest, 'utf8');

  console.log(`✅ Generated manifest.json`);
  console.log(`   Project: ${projectTitle}`);
  console.log(`   Short name: ${shortName}`);
  console.log(`   Base path: ${basePath || '/'}`);
  console.log(`\n✅ Manifest saved to: ${OUTPUT_PATH}`);
}

// Run the generator
generateManifest();
