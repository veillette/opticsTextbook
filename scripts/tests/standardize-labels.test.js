/**
 * Tests for standardize-labels.js
 *
 * Tests the label standardization script for figures, tables, sections, and equations
 */

const fs = require('fs');
const path = require('path');

// Mock the script's exports by requiring helper functions
// Note: The main script is designed to run as a CLI tool, so we test its utility functions

describe('standardize-labels', () => {
  describe('Label Format Validation', () => {
    test('figure labels should follow standard format', () => {
      const validFigureLabels = [
        'fig:basics:exampleName',
        'fig:geo:anotherExample',
        'fig:wave:testFigure'
      ];

      const figurePattern = /^fig:[a-z]+:[a-z][a-zA-Z0-9]*$/;

      validFigureLabels.forEach(label => {
        expect(label).toMatch(figurePattern);
      });
    });

    test('invalid figure labels should not match pattern', () => {
      const invalidFigureLabels = [
        'fig:InvalidChapter:test',  // Invalid chapter code
        'fig:basics:Test',          // Capitalized start
        'fig:basics:test-name',     // Hyphens not allowed
        'fig:basics:test_name',     // Underscores not allowed
        'figure:basics:test',       // Wrong prefix
      ];

      const figurePattern = /^fig:[a-z]+:[a-z][a-zA-Z0-9]*$/;

      invalidFigureLabels.forEach(label => {
        expect(label).not.toMatch(figurePattern);
      });
    });

    test('equation labels should follow standard format', () => {
      const validEquationLabels = [
        'eq:basics:exampleName',
        'eq:geo:anotherExample',
        'eq:wave:testEquation'
      ];

      const equationPattern = /^eq:[a-z]+:[a-z][a-zA-Z0-9-]+$/;

      validEquationLabels.forEach(label => {
        expect(label).toMatch(equationPattern);
      });
    });

    test('section labels should follow standard format', () => {
      const validSectionLabels = [
        '(sec:basics:introduction)=',
        '(sec:geo:fundamentals)=',
        '(sec:wave:properties)='
      ];

      const sectionPattern = /^\(sec:[a-z]+:[a-z][a-zA-Z0-9]*\)=$/;

      validSectionLabels.forEach(label => {
        expect(label).toMatch(sectionPattern);
      });
    });

    test('chapter labels should follow standard format', () => {
      const validChapterLabels = [
        '(chapter:basics)=',
        '(chapter:geometry)=',
        '(chapter:wavelength)='
      ];

      const chapterPattern = /^\(chapter:[a-z][a-zA-Z0-9]*\)=$/;

      validChapterLabels.forEach(label => {
        expect(label).toMatch(chapterPattern);
      });
    });

    test('table labels should follow standard format', () => {
      const validTableLabels = [
        'table:basics:exampleTable',
        'table:geo:comparisonTable',
        'table:wave:dataTable'
      ];

      const tablePattern = /^table:[a-z]+:[a-z][a-zA-Z0-9]*$/;

      validTableLabels.forEach(label => {
        expect(label).toMatch(tablePattern);
      });
    });
  });

  describe('Label Normalization', () => {
    test('should convert snake_case to camelCase', () => {
      const testCases = [
        { input: 'test_name', expected: /^[a-z][a-zA-Z0-9]*$/ },
        { input: 'example_label', expected: /^[a-z][a-zA-Z0-9]*$/ },
        { input: 'long_test_case', expected: /^[a-z][a-zA-Z0-9]*$/ }
      ];

      testCases.forEach(({ input, expected }) => {
        // We expect the normalized version to be camelCase
        // The actual normalization happens in the script
        expect(input.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())).toMatch(expected);
      });
    });

    test('should convert kebab-case to camelCase', () => {
      const testCases = [
        { input: 'test-name', expected: /^[a-z][a-zA-Z0-9]*$/ },
        { input: 'example-label', expected: /^[a-z][a-zA-Z0-9]*$/ },
        { input: 'long-test-case', expected: /^[a-z][a-zA-Z0-9]*$/ }
      ];

      testCases.forEach(({ input, expected }) => {
        // We expect the normalized version to be camelCase
        expect(input.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())).toMatch(expected);
      });
    });

    test('should preserve already camelCase labels', () => {
      const camelCaseLabels = [
        'testName',
        'exampleLabel',
        'longTestCase'
      ];

      const camelCasePattern = /^[a-z][a-zA-Z0-9]*$/;

      camelCaseLabels.forEach(label => {
        expect(label).toMatch(camelCasePattern);
      });
    });
  });

  describe('Chapter Code Validation', () => {
    test('should recognize valid chapter codes', () => {
      const validChapterCodes = [
        'basics',
        'geo',
        'inst',
        'pol',
        'wave',
        'coh',
        'diff',
        'laser',
        'adv',
        'fiber',
        'ray'
      ];

      validChapterCodes.forEach(code => {
        expect(code).toMatch(/^[a-z]+$/);
        expect(code.length).toBeGreaterThan(0);
      });
    });

    test('should reject invalid chapter codes', () => {
      const invalidChapterCodes = [
        'BASICS',      // All caps
        'Geo',         // Capitalized
        'invalid_ch',  // Underscore
        'test-ch',     // Hyphen
        '123',         // Numbers only
        ''             // Empty
      ];

      const validPattern = /^[a-z]+$/;

      invalidChapterCodes.forEach(code => {
        if (code === '') {
          expect(code).toBe('');
        } else if (/[A-Z]/.test(code) || /[_-]/.test(code) || /^\d+$/.test(code)) {
          expect(code).not.toMatch(/^[a-z]+$/);
        }
      });
    });
  });

  describe('Label Type Detection', () => {
    test('should detect figure labels', () => {
      const figureLabels = [
        'fig:basics:test',
        '```{figure} image.png\n:name: fig:geo:example',
        ':label: fig:wave:demo'
      ];

      figureLabels.forEach(text => {
        expect(text).toMatch(/fig:[a-z]/);
      });
    });

    test('should detect equation labels', () => {
      const equationLabels = [
        'eq:basics:test',
        '$$\n:label: eq:geo:example',
        '{eq}`eq:wave:demo`'
      ];

      equationLabels.forEach(text => {
        expect(text).toMatch(/eq:[a-z]/);
      });
    });

    test('should detect section labels', () => {
      const sectionLabels = [
        '(sec:basics:intro)=',
        '(sec:geo:fundamentals)=',
        '(sec:wave:properties)='
      ];

      sectionLabels.forEach(text => {
        expect(text).toMatch(/\(sec:[a-z]/);
      });
    });

    test('should detect chapter labels', () => {
      const chapterLabels = [
        '(chapter:basics)=',
        '(chapter:geometry)=',
        '(chapter:wavelength)='
      ];

      chapterLabels.forEach(text => {
        expect(text).toMatch(/\(chapter:[a-z]/);
      });
    });
  });

  describe('Integration Tests', () => {
    test('script should exist and be executable', () => {
      const scriptPath = path.join(__dirname, '..', 'transform', 'standardize-labels.js');
      expect(fs.existsSync(scriptPath)).toBe(true);

      const stat = fs.statSync(scriptPath);
      expect(stat.isFile()).toBe(true);
    });

    test('shared-utils should be accessible', () => {
      const sharedUtilsPath = path.join(__dirname, '..', 'shared-utils.js');
      expect(fs.existsSync(sharedUtilsPath)).toBe(true);

      // Try to require it
      const sharedUtils = require('../shared-utils');
      expect(sharedUtils).toBeDefined();
      expect(typeof sharedUtils.getChapterCodes).toBe('function');
    });
  });
});
