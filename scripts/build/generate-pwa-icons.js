/**
 * Generate PWA icons from the project logo
 * This script uses Sharp to resize the logo to various sizes needed for PWA
 * Logo path is auto-discovered from myst.yml configuration
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const ROOT_DIR = path.join(__dirname, '../..');
const ICONS_DIR = path.join(ROOT_DIR, 'icons');

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
 * Find the source logo from myst.yml site options
 */
function findSourceLogo(config) {
  // Try to get logo from site.options.logo
  const logo = config?.site?.options?.logo;

  if (!logo) {
    console.error('❌ No logo found in myst.yml under site.options.logo');
    console.error('Please add a logo path to your myst.yml configuration:');
    console.error('site:');
    console.error('  options:');
    console.error('    logo: img/your-logo.png');
    process.exit(1);
  }

  const logoPath = path.join(ROOT_DIR, logo);

  if (!fs.existsSync(logoPath)) {
    console.error(`❌ Logo file not found: ${logo}`);
    console.error(`Looked for: ${logoPath}`);
    process.exit(1);
  }

  return logoPath;
}

/**
 * Get theme color from myst.yml or use default
 */
function getThemeColor(config) {
  // Default blue theme color
  const defaultColor = { r: 30, g: 64, b: 175, alpha: 1 };

  // Try to parse theme color from manifest if available
  // For now, use default - could be enhanced to read from manifest.json
  return defaultColor;
}

const MYST_CONFIG = loadMystConfig();
const SOURCE_LOGO = findSourceLogo(MYST_CONFIG);
const THEME_COLOR = getThemeColor(MYST_CONFIG);

// Ensure icons directory exists
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
  console.log(`✅ Created icons directory: ${ICONS_DIR}`);
}

async function generateIcons() {
  console.log('=== PWA Icon Generation Tool ===\n');

  if (!fs.existsSync(SOURCE_LOGO)) {
    console.error(`❌ Source logo not found: ${SOURCE_LOGO}`);
    process.exit(1);
  }

  console.log(`📷 Source logo: ${SOURCE_LOGO}`);
  console.log(`📁 Output directory: ${ICONS_DIR}\n`);

  try {
    // Get original image metadata
    const metadata = await sharp(SOURCE_LOGO).metadata();
    console.log(`Original image size: ${metadata.width}x${metadata.height}\n`);

    // Generate standard icons
    console.log('Generating standard icons:');
    for (const size of ICON_SIZES) {
      const outputPath = path.join(ICONS_DIR, `icon-${size}x${size}.png`);

      await sharp(SOURCE_LOGO)
        .resize(size, size, {
          fit: 'contain',
          background: THEME_COLOR
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${size}x${size} icon`);
    }

    // Generate maskable icons (with safe zone padding)
    console.log('\nGenerating maskable icons:');
    for (const size of [192, 512]) {
      const outputPath = path.join(ICONS_DIR, `icon-${size}x${size}-maskable.png`);

      // Maskable icons should have 40% padding (safe zone)
      const iconSize = Math.floor(size * 0.6);
      const padding = Math.floor((size - iconSize) / 2);

      await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: THEME_COLOR
        }
      })
        .composite([{
          input: await sharp(SOURCE_LOGO)
            .resize(iconSize, iconSize, {
              fit: 'contain',
              background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .toBuffer(),
          top: padding,
          left: padding
        }])
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${size}x${size} maskable icon`);
    }

    // Generate favicon sizes
    console.log('\nGenerating favicon:');
    const faviconPath = path.join(ICONS_DIR, 'favicon.ico');
    await sharp(SOURCE_LOGO)
      .resize(32, 32, {
        fit: 'contain',
        background: THEME_COLOR
      })
      .png()
      .toFile(path.join(ICONS_DIR, 'favicon-32x32.png'));
    console.log('✅ Generated 32x32 favicon');

    await sharp(SOURCE_LOGO)
      .resize(16, 16, {
        fit: 'contain',
        background: THEME_COLOR
      })
      .png()
      .toFile(path.join(ICONS_DIR, 'favicon-16x16.png'));
    console.log('✅ Generated 16x16 favicon');

    // Generate Apple Touch Icon
    console.log('\nGenerating Apple Touch Icon:');
    await sharp(SOURCE_LOGO)
      .resize(180, 180, {
        fit: 'contain',
        background: THEME_COLOR
      })
      .png()
      .toFile(path.join(ICONS_DIR, 'apple-touch-icon.png'));
    console.log('✅ Generated 180x180 Apple Touch Icon');

    console.log('\n✅ All icons generated successfully!');
    console.log(`\nIcons location: ${ICONS_DIR}`);
    console.log(`Total icons generated: ${ICON_SIZES.length + 7}`);

  } catch (error) {
    console.error('\n❌ Error generating icons:', error);
    process.exit(1);
  }
}

// Run the icon generation
generateIcons();
