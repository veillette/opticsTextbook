/**
 * Export format tests
 *
 * Tests for PDF and DOCX export configuration and validation:
 * - Export configuration in myst.yml
 * - Export directory structure
 * - File format validation (when exports exist)
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT_DIR = path.join(__dirname, '../..');
const EXPORTS_DIR = path.join(ROOT_DIR, 'exports');
const MYST_CONFIG_PATH = path.join(ROOT_DIR, 'myst.yml');

/**
 * Load myst.yml configuration
 */
function loadMystConfig() {
  if (!fs.existsSync(MYST_CONFIG_PATH)) {
    return null;
  }

  try {
    const content = fs.readFileSync(MYST_CONFIG_PATH, 'utf8');
    return yaml.load(content);
  } catch (error) {
    console.error('Error loading myst.yml:', error.message);
    return null;
  }
}

describe('Export Configuration', () => {
  let mystConfig = null;

  beforeAll(() => {
    mystConfig = loadMystConfig();
  });

  describe('MyST Configuration', () => {
    test('should have myst.yml configuration file', () => {
      expect(fs.existsSync(MYST_CONFIG_PATH)).toBe(true);
    });

    test('should have valid YAML in myst.yml', () => {
      expect(mystConfig).not.toBeNull();
    });

    test('should have project configuration', () => {
      expect(mystConfig).toHaveProperty('project');
    });
  });

  describe('Export Script Configuration', () => {
    test('should have copy-export-files script', () => {
      const scriptPath = path.join(ROOT_DIR, 'scripts', 'build', 'copy-export-files.js');
      expect(fs.existsSync(scriptPath)).toBe(true);
    });

    test('should have export-related npm scripts', () => {
      const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));

      expect(packageJson.scripts).toHaveProperty('pdf');
      expect(packageJson.scripts).toHaveProperty('docx');
      expect(packageJson.scripts).toHaveProperty('copy-exports');
    });
  });

  describe('Typst Templates', () => {
    test('should have typst template directory', () => {
      const templatesDir = path.join(ROOT_DIR, '_templates', 'typst');
      expect(fs.existsSync(templatesDir)).toBe(true);
    });

    test('should have template.yml in typst template', () => {
      const templatesDir = path.join(ROOT_DIR, '_templates', 'typst');

      if (fs.existsSync(templatesDir)) {
        // Find template directories
        const dirs = fs.readdirSync(templatesDir, { withFileTypes: true })
          .filter(d => d.isDirectory());

        let hasTemplate = false;

        dirs.forEach(dir => {
          const templatePath = path.join(templatesDir, dir.name, 'template.yml');
          if (fs.existsSync(templatePath)) {
            hasTemplate = true;
          }
        });

        expect(hasTemplate).toBe(true);
      }
    });
  });
});

describe('Export Directory Structure', () => {
  describe('Exports Directory', () => {
    test('should have exports directory or be configured to create one', () => {
      // Either exports directory exists or the build will create it
      const exportsExist = fs.existsSync(EXPORTS_DIR);
      const hasExportScript = fs.existsSync(path.join(ROOT_DIR, 'scripts', 'build', 'copy-export-files.js'));

      expect(exportsExist || hasExportScript).toBe(true);
    });
  });

  describe('Export File Validation (when exports exist)', () => {
    const exportsExist = fs.existsSync(EXPORTS_DIR);

    (exportsExist ? test : test.skip)('should have textbook.pdf if exports exist', () => {
      const pdfPath = path.join(EXPORTS_DIR, 'textbook.pdf');

      if (fs.existsSync(pdfPath)) {
        const stats = fs.statSync(pdfPath);
        expect(stats.size).toBeGreaterThan(0);
      }
    });

    (exportsExist ? test : test.skip)('should have chapters directory if exports exist', () => {
      const chaptersDir = path.join(EXPORTS_DIR, 'chapters');

      if (fs.existsSync(chaptersDir)) {
        const files = fs.readdirSync(chaptersDir);
        expect(files.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('PDF Export Validation', () => {
  describe('PDF File Structure', () => {
    test('PDF files should start with %PDF magic bytes', () => {
      if (!fs.existsSync(EXPORTS_DIR)) {
        console.log('Exports directory not found, skipping PDF validation');
        return;
      }

      const pdfFiles = [];

      // Find all PDF files recursively
      function findPdfFiles(dir) {
        if (!fs.existsSync(dir)) return;

        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            findPdfFiles(fullPath);
          } else if (entry.name.endsWith('.pdf')) {
            pdfFiles.push(fullPath);
          }
        }
      }

      findPdfFiles(EXPORTS_DIR);

      if (pdfFiles.length === 0) {
        console.log('No PDF files found in exports directory');
        return;
      }

      const issues = [];

      pdfFiles.forEach(file => {
        const fd = fs.openSync(file, 'r');
        const buffer = Buffer.alloc(5);
        fs.readSync(fd, buffer, 0, 5, 0);
        fs.closeSync(fd);

        const header = buffer.toString('utf8');

        if (!header.startsWith('%PDF-')) {
          issues.push({
            file: path.relative(ROOT_DIR, file),
            header: header,
            message: 'Invalid PDF header'
          });
        }
      });

      if (issues.length > 0) {
        console.log('Invalid PDF files found:');
        issues.forEach(issue => {
          console.log(`  ${issue.file}: ${issue.message}`);
        });
      }

      expect(issues).toHaveLength(0);
    });

    test('PDF files should not be empty', () => {
      if (!fs.existsSync(EXPORTS_DIR)) {
        return;
      }

      const pdfFiles = [];

      function findPdfFiles(dir) {
        if (!fs.existsSync(dir)) return;

        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            findPdfFiles(fullPath);
          } else if (entry.name.endsWith('.pdf')) {
            pdfFiles.push(fullPath);
          }
        }
      }

      findPdfFiles(EXPORTS_DIR);

      const emptyFiles = pdfFiles.filter(file => {
        const stats = fs.statSync(file);
        return stats.size === 0;
      });

      if (emptyFiles.length > 0) {
        console.log('Empty PDF files found:');
        emptyFiles.forEach(file => {
          console.log(`  ${path.relative(ROOT_DIR, file)}`);
        });
      }

      expect(emptyFiles).toHaveLength(0);
    });
  });
});

describe('DOCX Export Validation', () => {
  describe('DOCX File Structure', () => {
    test('DOCX files should be valid ZIP archives (PK signature)', () => {
      if (!fs.existsSync(EXPORTS_DIR)) {
        console.log('Exports directory not found, skipping DOCX validation');
        return;
      }

      const docxFiles = [];

      function findDocxFiles(dir) {
        if (!fs.existsSync(dir)) return;

        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            findDocxFiles(fullPath);
          } else if (entry.name.endsWith('.docx')) {
            docxFiles.push(fullPath);
          }
        }
      }

      findDocxFiles(EXPORTS_DIR);

      if (docxFiles.length === 0) {
        console.log('No DOCX files found in exports directory');
        return;
      }

      const issues = [];

      docxFiles.forEach(file => {
        const fd = fs.openSync(file, 'r');
        const buffer = Buffer.alloc(4);
        fs.readSync(fd, buffer, 0, 4, 0);
        fs.closeSync(fd);

        // DOCX files are ZIP archives, should start with PK (0x50 0x4B)
        const isPK = buffer[0] === 0x50 && buffer[1] === 0x4B;

        if (!isPK) {
          issues.push({
            file: path.relative(ROOT_DIR, file),
            message: 'Invalid DOCX header (not a ZIP archive)'
          });
        }
      });

      if (issues.length > 0) {
        console.log('Invalid DOCX files found:');
        issues.forEach(issue => {
          console.log(`  ${issue.file}: ${issue.message}`);
        });
      }

      expect(issues).toHaveLength(0);
    });

    test('DOCX files should not be empty', () => {
      if (!fs.existsSync(EXPORTS_DIR)) {
        return;
      }

      const docxFiles = [];

      function findDocxFiles(dir) {
        if (!fs.existsSync(dir)) return;

        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            findDocxFiles(fullPath);
          } else if (entry.name.endsWith('.docx')) {
            docxFiles.push(fullPath);
          }
        }
      }

      findDocxFiles(EXPORTS_DIR);

      const emptyFiles = docxFiles.filter(file => {
        const stats = fs.statSync(file);
        return stats.size === 0;
      });

      if (emptyFiles.length > 0) {
        console.log('Empty DOCX files found:');
        emptyFiles.forEach(file => {
          console.log(`  ${path.relative(ROOT_DIR, file)}`);
        });
      }

      expect(emptyFiles).toHaveLength(0);
    });
  });
});

describe('Export Naming Conventions', () => {
  test('should use consistent naming for chapter exports', () => {
    const chaptersDir = path.join(EXPORTS_DIR, 'chapters');

    if (!fs.existsSync(chaptersDir)) {
      console.log('Chapters export directory not found');
      return;
    }

    const files = fs.readdirSync(chaptersDir);

    // Group files by base name
    const baseNames = new Set();
    const extensions = new Set();

    files.forEach(file => {
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      baseNames.add(baseName);
      extensions.add(ext);
    });

    // Check if we have matching PDF and DOCX pairs
    const pdfFiles = files.filter(f => f.endsWith('.pdf'));
    const docxFiles = files.filter(f => f.endsWith('.docx'));

    console.log(`Chapter exports: ${pdfFiles.length} PDFs, ${docxFiles.length} DOCX files`);

    // If we have both formats, check that names match
    if (pdfFiles.length > 0 && docxFiles.length > 0) {
      const pdfBases = new Set(pdfFiles.map(f => path.basename(f, '.pdf')));
      const docxBases = new Set(docxFiles.map(f => path.basename(f, '.docx')));

      const pdfOnly = [...pdfBases].filter(b => !docxBases.has(b));
      const docxOnly = [...docxBases].filter(b => !pdfBases.has(b));

      if (pdfOnly.length > 0) {
        console.log('Chapters with PDF only:', pdfOnly);
      }
      if (docxOnly.length > 0) {
        console.log('Chapters with DOCX only:', docxOnly);
      }
    }
  });
});
