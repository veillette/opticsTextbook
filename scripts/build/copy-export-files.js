/**
 * Copy export files (PDF and DOCX) to build directory
 * This mirrors the behavior of the GitHub Actions workflow
 * so local builds match production builds
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '../..');
const EXPORTS_DIR = path.join(ROOT_DIR, 'exports');
const BUILD_DIR = path.join(ROOT_DIR, '_build', 'html');
const BUILD_EXPORTS_DIR = path.join(BUILD_DIR, 'exports');
const BUILD_CHAPTERS_DIR = path.join(BUILD_EXPORTS_DIR, 'chapters');

function copyFile(src, dest, description) {
  if (!fs.existsSync(src)) {
    console.warn(`⚠️  ${description} not found: ${src}`);
    return false;
  }

  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.copyFileSync(src, dest);
  console.log(`✅ ${description} copied`);
  return true;
}

function copyExports() {
  console.log('=== Copying Export Files ===\n');

  // Check if build directory exists
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('❌ Build directory not found. Please run "myst build --html" first.');
    process.exit(1);
  }

  // Create exports directories
  if (!fs.existsSync(BUILD_EXPORTS_DIR)) {
    fs.mkdirSync(BUILD_EXPORTS_DIR, { recursive: true });
  }
  if (!fs.existsSync(BUILD_CHAPTERS_DIR)) {
    fs.mkdirSync(BUILD_CHAPTERS_DIR, { recursive: true });
  }

  // Copy full textbook PDF
  copyFile(
    path.join(EXPORTS_DIR, 'textbook.pdf'),
    path.join(BUILD_EXPORTS_DIR, 'textbook.pdf'),
    'Full textbook PDF'
  );

  // Copy full textbook DOCX (if it exists)
  copyFile(
    path.join(EXPORTS_DIR, 'textbook.docx'),
    path.join(BUILD_EXPORTS_DIR, 'textbook.docx'),
    'Full textbook DOCX'
  );

  // Copy chapter PDFs
  const chaptersDir = path.join(EXPORTS_DIR, 'chapters');
  if (fs.existsSync(chaptersDir)) {
    const files = fs.readdirSync(chaptersDir);

    let pdfCount = 0;
    let docxCount = 0;

    files.forEach(file => {
      const srcPath = path.join(chaptersDir, file);
      const destPath = path.join(BUILD_CHAPTERS_DIR, file);

      if (file.endsWith('.pdf')) {
        fs.copyFileSync(srcPath, destPath);
        pdfCount++;
      } else if (file.endsWith('.docx')) {
        fs.copyFileSync(srcPath, destPath);
        docxCount++;
      }
    });

    if (pdfCount > 0) {
      console.log(`✅ ${pdfCount} chapter PDFs copied`);
    }
    if (docxCount > 0) {
      console.log(`✅ ${docxCount} chapter DOCX files copied`);
    }
  } else {
    console.warn('⚠️  Chapters directory not found');
  }

  // Create .nojekyll file to prevent GitHub Pages from processing files with Jekyll
  const nojekyllPath = path.join(BUILD_DIR, '.nojekyll');
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ .nojekyll file created (prevents Jekyll processing on GitHub Pages)');

  console.log('\n✅ Export files copied successfully!');
  console.log('\nFiles are now available at:');
  console.log(`  - _build/html/exports/textbook.pdf`);
  console.log(`  - _build/html/exports/chapters/*.pdf`);
  console.log(`  - _build/html/exports/chapters/*.docx`);
}

// Run the copy
copyExports();
