/**
 * Setup PWA files after MyST build
 * This script copies PWA-related files to the build directory
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const BUILD_DIR = path.join(ROOT_DIR, '_build', 'html');
const ICONS_DIR = path.join(ROOT_DIR, 'icons');
const BUILD_ICONS_DIR = path.join(BUILD_DIR, 'icons');
const SCREENSHOTS_DIR = path.join(ROOT_DIR, 'screenshots');

// Files to copy
const PWA_FILES = [
  { src: 'manifest.json', dest: 'manifest.json' },
  { src: 'service-worker.js', dest: 'service-worker.js' },
  { src: 'img/favicon.ico', dest: 'favicon.ico' }
];

function copyFile(src, dest) {
  const srcPath = path.join(ROOT_DIR, src);
  const destPath = path.join(BUILD_DIR, dest);

  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠️  Source file not found: ${srcPath}`);
    return false;
  }

  // Ensure destination directory exists
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.copyFileSync(srcPath, destPath);
  console.log(`✅ Copied ${src} -> ${dest}`);
  return true;
}

function copyDirectory(src, dest) {
  const srcPath = path.join(ROOT_DIR, src);
  const destPath = path.join(BUILD_DIR, dest);

  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠️  Source directory not found: ${srcPath}`);
    return false;
  }

  // Ensure destination directory exists
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true });
  }

  // Copy all files from source to destination
  const files = fs.readdirSync(srcPath);
  let copiedCount = 0;

  files.forEach(file => {
    const srcFile = path.join(srcPath, file);
    const destFile = path.join(destPath, file);

    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile);
      copiedCount++;
    }
  });

  console.log(`✅ Copied ${copiedCount} files from ${src} to ${dest}`);
  return true;
}

function injectServiceWorkerRegistration() {
  const swRegisterScript = `
<!-- PWA Service Worker Registration -->
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/opticsTextbook/service-worker.js', {
        scope: '/opticsTextbook/'
      })
      .then((registration) => {
        console.log('✅ Service Worker registered:', registration.scope);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('🔄 Service Worker update found');

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('✨ New content available, please refresh.');
              // Optionally show a notification to the user
              if (confirm('New version available! Refresh to update?')) {
                window.location.reload();
              }
            }
          });
        });
      })
      .catch((error) => {
        console.error('❌ Service Worker registration failed:', error);
      });
    });

    // Listen for service worker messages
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('📨 Message from Service Worker:', event.data);
    });

    // Reload page when service worker is activated
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        console.log('🔄 Service Worker controller changed, reloading page');
      }
    });
  } else {
    console.warn('⚠️  Service Workers are not supported in this browser');
  }
</script>
`;

  const manifestLink = '<link rel="manifest" href="/opticsTextbook/manifest.json">';
  const themeColorMeta = '<meta name="theme-color" content="#1e40af">';
  const appleTouchIcon = '<link rel="apple-touch-icon" href="/opticsTextbook/icons/apple-touch-icon.png">';
  const appleMobileCapable = '<meta name="apple-mobile-web-app-capable" content="yes">';
  const appleMobileStatusBar = '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">';
  const appleMobileTitle = '<meta name="apple-mobile-web-app-title" content="Optics Textbook">';

  // Find all HTML files in the build directory
  const htmlFiles = findHtmlFiles(BUILD_DIR);
  console.log(`\nFound ${htmlFiles.length} HTML files to update`);

  let updatedCount = 0;
  htmlFiles.forEach(filePath => {
    try {
      let content = fs.readFileSync(filePath, 'utf8');

      // Check if already injected
      if (content.includes('service-worker.js') || content.includes('manifest.json')) {
        console.log(`⏭️  Skipping ${path.relative(BUILD_DIR, filePath)} (already has PWA tags)`);
        return;
      }

      // Inject in the <head> section
      if (content.includes('</head>')) {
        const headCloseIndex = content.indexOf('</head>');
        const pwaTags = `\n  ${manifestLink}\n  ${themeColorMeta}\n  ${appleTouchIcon}\n  ${appleMobileCapable}\n  ${appleMobileStatusBar}\n  ${appleMobileTitle}\n  `;

        content = content.slice(0, headCloseIndex) + pwaTags + content.slice(headCloseIndex);
      }

      // Inject service worker registration before </body>
      if (content.includes('</body>')) {
        const bodyCloseIndex = content.lastIndexOf('</body>');
        content = content.slice(0, bodyCloseIndex) + swRegisterScript + '\n' + content.slice(bodyCloseIndex);
      }

      fs.writeFileSync(filePath, content, 'utf8');
      updatedCount++;
      console.log(`✅ Updated ${path.relative(BUILD_DIR, filePath)}`);
    } catch (error) {
      console.error(`❌ Error updating ${filePath}:`, error.message);
    }
  });

  console.log(`\n✅ Updated ${updatedCount} HTML files with PWA tags`);
}

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

function createNojekyllFile() {
  // Create .nojekyll file to prevent GitHub Pages from running Jekyll
  // This is CRITICAL for GitHub Pages to serve the site correctly
  const nojekyllPath = path.join(BUILD_DIR, '.nojekyll');
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ Created .nojekyll file (prevents GitHub Pages Jekyll processing)');
}

function create404Page() {
  // Create a 404.html page that redirects to the main site
  // This helps with SPA-style navigation on GitHub Pages
  const html404 = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found - Optics Textbook</title>
  <meta http-equiv="refresh" content="0; url=/opticsTextbook/">
  <link rel="canonical" href="https://veillette.github.io/opticsTextbook/">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
      color: white;
      text-align: center;
      padding: 20px;
    }
    h1 { font-size: 2.5rem; margin-bottom: 1rem; }
    p { font-size: 1.2rem; margin-bottom: 2rem; max-width: 500px; }
    a {
      color: #7dd3fc;
      text-decoration: none;
      padding: 12px 24px;
      border: 2px solid #7dd3fc;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    a:hover {
      background: #7dd3fc;
      color: #1e3a5f;
    }
  </style>
</head>
<body>
  <h1>Page Not Found</h1>
  <p>The page you're looking for doesn't exist or has been moved. You'll be redirected to the homepage automatically.</p>
  <a href="/opticsTextbook/">Go to Homepage</a>
  <script>
    // Store the attempted path for potential SPA routing
    sessionStorage.setItem('redirect', window.location.pathname + window.location.search + window.location.hash);
  </script>
</body>
</html>`;

  const page404Path = path.join(BUILD_DIR, '404.html');
  fs.writeFileSync(page404Path, html404, 'utf8');
  console.log('✅ Created 404.html page (handles missing pages gracefully)');
}

function setupPWA() {
  console.log('=== PWA Setup Script ===\n');

  // Check if build directory exists
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('❌ Build directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  console.log(`Build directory: ${BUILD_DIR}\n`);

  // Create .nojekyll file FIRST - critical for GitHub Pages
  console.log('Creating GitHub Pages configuration:');
  createNojekyllFile();
  create404Page();

  // Copy PWA files
  console.log('\nCopying PWA files:');
  PWA_FILES.forEach(({ src, dest }) => {
    copyFile(src, dest);
  });

  // Copy icons directory
  console.log('\nCopying icons:');
  if (fs.existsSync(ICONS_DIR)) {
    copyDirectory('icons', 'icons');
  } else {
    console.warn('⚠️  Icons directory not found. Run "npm run generate-icons" first.');
  }

  // Copy screenshots directory if it exists (optional for PWA install dialogs)
  console.log('\nCopying screenshots:');
  if (fs.existsSync(SCREENSHOTS_DIR)) {
    copyDirectory('screenshots', 'screenshots');
  } else {
    console.log('ℹ️  Screenshots directory not found (optional - used for PWA install dialogs)');
  }

  // Inject service worker registration and PWA meta tags
  console.log('\nInjecting PWA tags into HTML files:');
  injectServiceWorkerRegistration();

  console.log('\n✅ PWA setup complete!');
  console.log('\nNext steps:');
  console.log('1. Test locally with: npm run serve');
  console.log('2. Use Chrome DevTools > Application > Manifest to verify');
  console.log('3. Use Lighthouse to audit PWA compliance');
}

// Run the setup
setupPWA();
