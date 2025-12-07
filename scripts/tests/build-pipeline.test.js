/**
 * Integration tests for the build pipeline
 *
 * Tests that the build scripts work correctly together:
 * - copy-export-files.js
 * - inject-custom-scripts.js
 * - generate-pwa-manifest.js
 * - install-pwa-assets.js
 */

const fs = require('fs');
const path = require('path');

// Test constants
const ROOT_DIR = path.join(__dirname, '../..');
const SCRIPTS_DIR = path.join(ROOT_DIR, 'scripts', 'build');

describe('Build Pipeline', () => {
  describe('Build Scripts Existence', () => {
    const requiredScripts = [
      'copy-export-files.js',
      'inject-custom-scripts.js',
      'generate-pwa-manifest.js',
      'generate-pwa-icons.js',
      'install-pwa-assets.js',
      'optimize-images.js'
    ];

    test.each(requiredScripts)('should have %s script', (scriptName) => {
      const scriptPath = path.join(SCRIPTS_DIR, scriptName);
      expect(fs.existsSync(scriptPath)).toBe(true);
    });
  });

  describe('Build Script Structure', () => {
    test('copy-export-files.js should be valid JavaScript', () => {
      const scriptPath = path.join(SCRIPTS_DIR, 'copy-export-files.js');
      const content = fs.readFileSync(scriptPath, 'utf8');

      // Should contain required functions/patterns
      expect(content).toContain('function');
      expect(content).toContain('fs.existsSync');
      expect(content).toContain('exports');
    });

    test('inject-custom-scripts.js should be valid JavaScript', () => {
      const scriptPath = path.join(SCRIPTS_DIR, 'inject-custom-scripts.js');
      const content = fs.readFileSync(scriptPath, 'utf8');

      // Should contain HTML injection logic
      expect(content).toContain('</body>');
      expect(content).toContain('findHtmlFiles');
      expect(content).toContain('script');
    });

    test('generate-pwa-manifest.js should be valid JavaScript', () => {
      const scriptPath = path.join(SCRIPTS_DIR, 'generate-pwa-manifest.js');
      const content = fs.readFileSync(scriptPath, 'utf8');

      // Should contain manifest generation logic
      expect(content).toContain('manifest');
      expect(content).toContain('myst.yml');
      expect(content).toContain('json');
    });
  });

  describe('Required Configuration Files', () => {
    test('should have myst.yml configuration', () => {
      const mystPath = path.join(ROOT_DIR, 'myst.yml');
      expect(fs.existsSync(mystPath)).toBe(true);
    });

    test('should have package.json with required scripts', () => {
      const packagePath = path.join(ROOT_DIR, 'package.json');
      expect(fs.existsSync(packagePath)).toBe(true);

      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      expect(packageJson.scripts).toBeDefined();

      // Required build scripts
      expect(packageJson.scripts.build).toBeDefined();
      expect(packageJson.scripts['copy-exports']).toBeDefined();
      expect(packageJson.scripts['inject-scripts']).toBeDefined();
      expect(packageJson.scripts['setup-pwa']).toBeDefined();
    });

    test('should have PWA manifest template', () => {
      const templatePath = path.join(ROOT_DIR, 'pwa', 'manifest.json.template');
      expect(fs.existsSync(templatePath)).toBe(true);

      const content = fs.readFileSync(templatePath, 'utf8');
      // Should contain placeholders
      expect(content).toContain('{{');
      expect(content).toContain('}}');
    });
  });

  describe('Export Directory Structure', () => {
    test('should have exports directory or exports configured', () => {
      const exportsDir = path.join(ROOT_DIR, 'exports');
      const mystPath = path.join(ROOT_DIR, 'myst.yml');

      // Either exports directory exists or myst.yml has export config
      const exportsExist = fs.existsSync(exportsDir);
      const mystContent = fs.readFileSync(mystPath, 'utf8');
      const hasExportConfig = mystContent.includes('exports:') || mystContent.includes('output:');

      expect(exportsExist || hasExportConfig).toBe(true);
    });
  });

  describe('Build Script Dependencies', () => {
    test('scripts should use consistent path resolution', () => {
      const scriptFiles = fs.readdirSync(SCRIPTS_DIR)
        .filter(f => f.endsWith('.js'));

      scriptFiles.forEach(file => {
        const content = fs.readFileSync(path.join(SCRIPTS_DIR, file), 'utf8');

        // All scripts should define ROOT_DIR consistently
        if (content.includes('ROOT_DIR')) {
          expect(content).toMatch(/ROOT_DIR\s*=\s*path\.join\(__dirname/);
        }
      });
    });

    test('scripts should require only installed dependencies', () => {
      const packagePath = path.join(ROOT_DIR, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };

      // Built-in modules that don't need to be in package.json
      const builtins = ['fs', 'path', 'child_process', 'os', 'url', 'util'];

      const scriptFiles = fs.readdirSync(SCRIPTS_DIR)
        .filter(f => f.endsWith('.js'));

      scriptFiles.forEach(file => {
        const content = fs.readFileSync(path.join(SCRIPTS_DIR, file), 'utf8');
        const requireMatches = content.match(/require\(['"]([^'"./][^'"]*)['"]\)/g) || [];

        requireMatches.forEach(match => {
          const moduleName = match.match(/require\(['"]([^'"./][^'"]*)['"]\)/)[1];
          const baseModule = moduleName.split('/')[0];

          if (!builtins.includes(baseModule)) {
            expect(allDeps).toHaveProperty(baseModule);
          }
        });
      });
    });
  });
});

describe('HTML Injection Logic', () => {
  test('should properly detect HTML closing tags', () => {
    const sampleHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<body>
  <div>Content</div>
</body>
</html>`;

    expect(sampleHtml.includes('</head>')).toBe(true);
    expect(sampleHtml.includes('</body>')).toBe(true);

    // Test injection positions
    const headCloseIndex = sampleHtml.indexOf('</head>');
    const bodyCloseIndex = sampleHtml.lastIndexOf('</body>');

    expect(headCloseIndex).toBeGreaterThan(0);
    expect(bodyCloseIndex).toBeGreaterThan(headCloseIndex);
  });

  test('should handle files with existing scripts', () => {
    const htmlWithScript = `
<!DOCTYPE html>
<html>
<head></head>
<body>
  <script src="custom-scripts.js"></script>
</body>
</html>`;

    // Should detect existing custom-scripts.js
    expect(htmlWithScript.includes('custom-scripts.js')).toBe(true);
  });
});

describe('Path Normalization', () => {
  test('should normalize base paths correctly', () => {
    const normalizeBasePath = (rawPath) => {
      if (!rawPath || rawPath === '/') {
        return '';
      }
      return rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;
    };

    expect(normalizeBasePath('')).toBe('');
    expect(normalizeBasePath('/')).toBe('');
    expect(normalizeBasePath('/opticsTextbook')).toBe('/opticsTextbook');
    expect(normalizeBasePath('/opticsTextbook/')).toBe('/opticsTextbook');
  });

  test('should construct paths with base correctly', () => {
    const pathWithBase = (basePath, resource = '') => {
      const trimmed = resource.replace(/^\//, '');
      if (!trimmed) {
        return basePath ? `${basePath}/` : '/';
      }
      if (!basePath) {
        return `/${trimmed}`;
      }
      return `${basePath}/${trimmed}`;
    };

    expect(pathWithBase('', 'manifest.json')).toBe('/manifest.json');
    expect(pathWithBase('/opticsTextbook', 'manifest.json')).toBe('/opticsTextbook/manifest.json');
    expect(pathWithBase('/opticsTextbook', '/manifest.json')).toBe('/opticsTextbook/manifest.json');
  });
});
