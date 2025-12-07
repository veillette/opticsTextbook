/**
 * Tests for shared-utils.js
 *
 * Tests the core utility functions used across all scripts
 */

const fs = require('fs');
const path = require('path');
const {
  getChapters,
  getImageExtensions,
  runMystCommand,
  getAllMarkdownFiles,
  getChapterCodes
} = require('../shared-utils');

describe('shared-utils', () => {
  describe('getChapters', () => {
    test('should return an object with chapter information', () => {
      const chapters = getChapters();
      expect(chapters).toBeDefined();
      expect(typeof chapters).toBe('object');
    });

    test('each chapter should have dir and file properties', () => {
      const chapters = getChapters();
      const chapterKeys = Object.keys(chapters);

      if (chapterKeys.length > 0) {
        const firstChapter = chapters[chapterKeys[0]];
        expect(firstChapter).toHaveProperty('dir');
        expect(firstChapter).toHaveProperty('file');
      }
    });
  });

  describe('getImageExtensions', () => {
    test('should return an array of image extensions', () => {
      const extensions = getImageExtensions();
      expect(Array.isArray(extensions)).toBe(true);
      expect(extensions.length).toBeGreaterThan(0);
    });

    test('should include common image formats', () => {
      const extensions = getImageExtensions();
      const commonFormats = ['png', 'jpg', 'jpeg', 'gif', 'svg'];

      commonFormats.forEach(format => {
        expect(extensions).toContain(format);
      });
    });
  });

  describe('getChapterCodes', () => {
    test('should return an object with chapter code mappings', () => {
      const codes = getChapterCodes();
      expect(codes).toBeDefined();
      expect(typeof codes).toBe('object');
    });

    test('should have valid chapter codes', () => {
      const codes = getChapterCodes();
      const codeValues = Object.values(codes);

      codeValues.forEach(code => {
        expect(typeof code).toBe('string');
        expect(code.length).toBeGreaterThan(0);
        // Chapter codes should be lowercase
        expect(code).toMatch(/^[a-z]+$/);
      });
    });
  });

  describe('runMystCommand', () => {
    test('should be a function', () => {
      expect(typeof runMystCommand).toBe('function');
    });

    test('should return object with stdout, stderr, and returnCode', () => {
      // Test with --version which should always work
      const result = runMystCommand(['npx', 'myst', '--version']);
      expect(result).toHaveProperty('returnCode');
      expect(result).toHaveProperty('stdout');
      expect(result).toHaveProperty('stderr');
      expect(typeof result.stdout).toBe('string');
      expect(typeof result.stderr).toBe('string');
      expect(typeof result.returnCode).toBe('number');
    });
  });

  describe('getAllMarkdownFiles', () => {
    test('should be a function', () => {
      expect(typeof getAllMarkdownFiles).toBe('function');
    });

    test('should return an array', () => {
      const contentDir = 'content';
      if (fs.existsSync(contentDir)) {
        const files = getAllMarkdownFiles(contentDir);
        expect(Array.isArray(files)).toBe(true);
      }
    });

    test('should only return .md files', () => {
      const contentDir = 'content';
      if (fs.existsSync(contentDir)) {
        const files = getAllMarkdownFiles(contentDir);
        files.forEach(file => {
          expect(file).toMatch(/\.md$/);
        });
      }
    });
  });
});
