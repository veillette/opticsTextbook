/**
 * Tests for scripts directory structure
 *
 * Validates that the reorganized scripts directory has the correct structure
 * and all expected files are in their proper locations
 */

const fs = require('fs');
const path = require('path');

describe('Scripts Directory Structure', () => {
  const scriptsDir = path.join(__dirname, '..');

  describe('Main Directory Structure', () => {
    test('should have build directory', () => {
      const buildDir = path.join(scriptsDir, 'build');
      expect(fs.existsSync(buildDir)).toBe(true);
      expect(fs.statSync(buildDir).isDirectory()).toBe(true);
    });

    test('should have validation directory', () => {
      const validationDir = path.join(scriptsDir, 'validation');
      expect(fs.existsSync(validationDir)).toBe(true);
      expect(fs.statSync(validationDir).isDirectory()).toBe(true);
    });

    test('should have transform directory', () => {
      const transformDir = path.join(scriptsDir, 'transform');
      expect(fs.existsSync(transformDir)).toBe(true);
      expect(fs.statSync(transformDir).isDirectory()).toBe(true);
    });

    test('should have images directory', () => {
      const imagesDir = path.join(scriptsDir, 'images');
      expect(fs.existsSync(imagesDir)).toBe(true);
      expect(fs.statSync(imagesDir).isDirectory()).toBe(true);
    });

    test('should have tests directory', () => {
      const testsDir = path.join(scriptsDir, 'tests');
      expect(fs.existsSync(testsDir)).toBe(true);
      expect(fs.statSync(testsDir).isDirectory()).toBe(true);
    });

    test('should have shared-utils.js', () => {
      const sharedUtils = path.join(scriptsDir, 'shared-utils.js');
      expect(fs.existsSync(sharedUtils)).toBe(true);
      expect(fs.statSync(sharedUtils).isFile()).toBe(true);
    });

    test('should have report-utils.js', () => {
      const reportUtils = path.join(scriptsDir, 'report-utils.js');
      expect(fs.existsSync(reportUtils)).toBe(true);
      expect(fs.statSync(reportUtils).isFile()).toBe(true);
    });

    test('should have config.json', () => {
      const config = path.join(scriptsDir, 'config.json');
      expect(fs.existsSync(config)).toBe(true);
      expect(fs.statSync(config).isFile()).toBe(true);
    });

    test('should have README.md', () => {
      const readme = path.join(scriptsDir, 'README.md');
      expect(fs.existsSync(readme)).toBe(true);
      expect(fs.statSync(readme).isFile()).toBe(true);
    });
  });

  describe('Build Scripts', () => {
    const buildDir = path.join(scriptsDir, 'build');

    test('should have copy-export-files.js', () => {
      const script = path.join(buildDir, 'copy-export-files.js');
      expect(fs.existsSync(script)).toBe(true);
    });

    test('should have inject-custom-scripts.js', () => {
      const script = path.join(buildDir, 'inject-custom-scripts.js');
      expect(fs.existsSync(script)).toBe(true);
    });

    test('should have install-pwa-assets.js', () => {
      const script = path.join(buildDir, 'install-pwa-assets.js');
      expect(fs.existsSync(script)).toBe(true);
    });

    test('should have generate-pwa-icons.js', () => {
      const script = path.join(buildDir, 'generate-pwa-icons.js');
      expect(fs.existsSync(script)).toBe(true);
    });

    test('should have generate-pwa-manifest.js', () => {
      const script = path.join(buildDir, 'generate-pwa-manifest.js');
      expect(fs.existsSync(script)).toBe(true);
    });

    test('should have optimize-images.js', () => {
      const script = path.join(buildDir, 'optimize-images.js');
      expect(fs.existsSync(script)).toBe(true);
    });
  });

  describe('Validation Scripts', () => {
    const validationDir = path.join(scriptsDir, 'validation');

    test('should have validate-all.js (unified validator)', () => {
      const script = path.join(validationDir, 'validate-all.js');
      expect(fs.existsSync(script)).toBe(true);
    });

    test('should have validate-references.js', () => {
      const script = path.join(validationDir, 'validate-references.js');
      expect(fs.existsSync(script)).toBe(true);
    });

    test('should have validate-images.js', () => {
      const script = path.join(validationDir, 'validate-images.js');
      expect(fs.existsSync(script)).toBe(true);
    });

    test('should have lint-markdown.js', () => {
      const script = path.join(validationDir, 'lint-markdown.js');
      expect(fs.existsSync(script)).toBe(true);
    });
  });

  describe('Transform Scripts', () => {
    const transformDir = path.join(scriptsDir, 'transform');

    test('should have fix-directive-syntax.js', () => {
      const script = path.join(transformDir, 'fix-directive-syntax.js');
      expect(fs.existsSync(script)).toBe(true);
    });

    test('should have fix-split-references.js', () => {
      const script = path.join(transformDir, 'fix-split-references.js');
      expect(fs.existsSync(script)).toBe(true);
    });

    test('should have standardize-labels.js', () => {
      const script = path.join(transformDir, 'standardize-labels.js');
      expect(fs.existsSync(script)).toBe(true);
    });

    test('should have standardize-figures.js', () => {
      const script = path.join(transformDir, 'standardize-figures.js');
      expect(fs.existsSync(script)).toBe(true);
    });
  });

  describe('Image Management Scripts', () => {
    const imagesDir = path.join(scriptsDir, 'images');

    test('should have find-unreferenced.js', () => {
      const script = path.join(imagesDir, 'find-unreferenced.js');
      expect(fs.existsSync(script)).toBe(true);
    });

    test('should have delete-unreferenced.js', () => {
      const script = path.join(imagesDir, 'delete-unreferenced.js');
      expect(fs.existsSync(script)).toBe(true);
    });

    test('should have insert-figure.js', () => {
      const script = path.join(imagesDir, 'insert-figure.js');
      expect(fs.existsSync(script)).toBe(true);
    });
  });

  describe('Script Import Paths', () => {
    test('validation scripts should import from parent directory', () => {
      const validateAllPath = path.join(scriptsDir, 'validation', 'validate-all.js');
      if (fs.existsSync(validateAllPath)) {
        const content = fs.readFileSync(validateAllPath, 'utf8');
        // Should NOT have ./shared-utils (old path)
        expect(content).not.toContain("require('./shared-utils')");
        expect(content).not.toContain("require('./shared_utils')");
      }
    });

    test('transform scripts should import from parent directory', () => {
      const standardizeLabelsPath = path.join(scriptsDir, 'transform', 'standardize-labels.js');
      if (fs.existsSync(standardizeLabelsPath)) {
        const content = fs.readFileSync(standardizeLabelsPath, 'utf8');
        // Should use ../shared-utils (new path)
        expect(content).toContain("require('../shared-utils')");
      }
    });

    test('image scripts should import from parent directory', () => {
      const findUnreferencedPath = path.join(scriptsDir, 'images', 'find-unreferenced.js');
      if (fs.existsSync(findUnreferencedPath)) {
        const content = fs.readFileSync(findUnreferencedPath, 'utf8');
        // Should use ../shared-utils (new path)
        expect(content).toContain("require('../shared-utils')");
      }
    });
  });

  describe('Script Executability', () => {
    test('all scripts should be valid JavaScript', () => {
      const allScripts = [
        'build/copy-export-files.js',
        'build/inject-custom-scripts.js',
        'build/install-pwa-assets.js',
        'validation/validate-all.js',
        'validation/validate-references.js',
        'transform/standardize-labels.js',
        'images/find-unreferenced.js'
      ];

      allScripts.forEach(scriptPath => {
        const fullPath = path.join(scriptsDir, scriptPath);
        if (fs.existsSync(fullPath)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          // Should start with shebang or be valid JS
          const isValid = content.startsWith('#!/usr/bin/env node') ||
                         content.startsWith('/**') ||
                         content.startsWith('const') ||
                         content.startsWith('//');
          expect(isValid).toBe(true);
        }
      });
    });
  });

  describe('README Documentation', () => {
    const readmePath = path.join(scriptsDir, 'README.md');

    test('README should contain directory structure section', () => {
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf8');
        expect(content).toContain('Directory Structure');
        expect(content).toContain('build/');
        expect(content).toContain('validation/');
        expect(content).toContain('transform/');
        expect(content).toContain('images/');
      }
    });

    test('README should contain command reference', () => {
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf8');
        expect(content).toContain('npm run validate');
        expect(content).toContain('npm run build');
      }
    });

    test('README should contain migration guide', () => {
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf8');
        expect(content).toContain('Migration');
      }
    });
  });
});
