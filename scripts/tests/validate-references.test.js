/**
 * Tests for validate-references.js
 *
 * Tests the comprehensive reference validation script
 */

const {
  runMystValidation,
  parseMystOutput,
  manualValidation,
  analyzeIssues
} = require('../validation/validate-references');
const fs = require('fs');
const path = require('path');

describe('validate-references', () => {
  describe('parseMystOutput', () => {
    test('should be a function', () => {
      expect(typeof parseMystOutput).toBe('function');
    });

    test('should parse validation output into categorized issues', () => {
      const mockValidationResults = {
        buildOutput: '⚠️ WARNING: Image not found: test.png\n❌ ERROR: Syntax error in file.md',
        buildErrors: '',
        checkOutput: '⚠️ WARNING: External link check failed: http://example.com',
        checkErrors: ''
      };

      const issues = parseMystOutput(mockValidationResults);

      expect(issues).toHaveProperty('missingFigures');
      expect(issues).toHaveProperty('brokenCrossRefs');
      expect(issues).toHaveProperty('externalLinkErrors');
      expect(issues).toHaveProperty('equationErrors');
      expect(issues).toHaveProperty('citationErrors');
      expect(issues).toHaveProperty('syntaxErrors');
      expect(issues).toHaveProperty('otherWarnings');
      expect(issues).toHaveProperty('buildErrors');
    });

    test('should categorize image warnings correctly', () => {
      const mockValidationResults = {
        buildOutput: '⚠️ WARNING: Image not found: test.png',
        buildErrors: '',
        checkOutput: '',
        checkErrors: ''
      };

      const issues = parseMystOutput(mockValidationResults);
      expect(issues.missingFigures.length).toBeGreaterThan(0);
    });

    test('should categorize syntax errors correctly', () => {
      const mockValidationResults = {
        buildOutput: '❌ ERROR: Syntax error in file.md',
        buildErrors: '',
        checkOutput: '',
        checkErrors: ''
      };

      const issues = parseMystOutput(mockValidationResults);
      expect(issues.syntaxErrors.length).toBeGreaterThan(0);
    });
  });

  describe('analyzeIssues', () => {
    test('should be a function', () => {
      expect(typeof analyzeIssues).toBe('function');
    });

    test('should generate comprehensive analysis', () => {
      const mockMystIssues = {
        missingFigures: [{ message: 'test1', type: 'missing_figure' }],
        brokenCrossRefs: [],
        externalLinkErrors: [],
        equationErrors: [],
        citationErrors: [],
        syntaxErrors: [{ message: 'test2', type: 'syntax_error' }],
        otherWarnings: [],
        buildErrors: []
      };

      const mockManualIssues = [
        { file: 'test.md', reference: 'img.png', line: 10 }
      ];

      const analysis = analyzeIssues(mockMystIssues, mockManualIssues);

      expect(analysis).toHaveProperty('filesWithIssues');
      expect(analysis).toHaveProperty('errorDistribution');
      expect(analysis).toHaveProperty('severitySummary');
      expect(analysis.severitySummary).toHaveProperty('critical');
      expect(analysis.severitySummary).toHaveProperty('warnings');
      expect(analysis.severitySummary).toHaveProperty('total');
      expect(analysis.severitySummary.total).toBe(3); // 1 missing + 1 syntax + 1 manual
    });

    test('should count critical vs warnings correctly', () => {
      const mockMystIssues = {
        missingFigures: [{ message: 'test1', type: 'missing_figure' }],
        brokenCrossRefs: [],
        externalLinkErrors: [],
        equationErrors: [],
        citationErrors: [],
        syntaxErrors: [{ message: 'test2', type: 'syntax_error' }],
        otherWarnings: [],
        buildErrors: [{ message: 'test3', type: 'build' }]
      };

      const analysis = analyzeIssues(mockMystIssues, []);

      // syntaxErrors and buildErrors are critical
      expect(analysis.severitySummary.critical).toBe(2);
      // missingFigures are warnings
      expect(analysis.severitySummary.warnings).toBe(1);
    });
  });

  describe('manualValidation', () => {
    test('should be a function', () => {
      expect(typeof manualValidation).toBe('function');
    });

    test('should validate image references in content directory', () => {
      const contentDir = 'content';

      if (fs.existsSync(contentDir)) {
        const brokenRefs = manualValidation(contentDir);
        expect(Array.isArray(brokenRefs)).toBe(true);
      } else {
        // If content dir doesn't exist, skip test
        expect(true).toBe(true);
      }
    });
  });
});
