/**
 * Tests for validate-all.js
 *
 * Tests the unified validation script that runs all validators
 */

const {
  runValidator,
  generateReport,
  saveReport,
  printSummary
} = require('../validation/validate-all');
const fs = require('fs');
const path = require('path');

describe('validate-all', () => {
  describe('runValidator', () => {
    test('should be a function', () => {
      expect(typeof runValidator).toBe('function');
    });

    test('should return an object with validation results', () => {
      // Create a simple test script that exits with 0
      const testScript = path.join(__dirname, 'temp-test-script.js');
      fs.writeFileSync(testScript, 'process.exit(0);', 'utf8');

      const result = runValidator(testScript, [], 'Test Validator');

      expect(result).toHaveProperty('exitCode');
      expect(result).toHaveProperty('output');
      expect(result).toHaveProperty('duration');
      expect(result).toHaveProperty('passed');
      expect(result.exitCode).toBe(0);
      expect(result.passed).toBe(true);

      // Cleanup
      fs.unlinkSync(testScript);
    });

    test('should handle failed validators', () => {
      // Create a simple test script that exits with 1
      const testScript = path.join(__dirname, 'temp-test-script-fail.js');
      fs.writeFileSync(testScript, 'process.exit(1);', 'utf8');

      const result = runValidator(testScript, [], 'Test Validator');

      expect(result.exitCode).toBe(1);
      expect(result.passed).toBe(false);

      // Cleanup
      fs.unlinkSync(testScript);
    });
  });

  describe('generateReport', () => {
    test('should be a function', () => {
      expect(typeof generateReport).toBe('function');
    });

    test('should generate a comprehensive report from results', () => {
      const mockResults = [
        {
          name: 'Test Validator 1',
          exitCode: 0,
          output: 'All tests passed',
          duration: '1.23',
          passed: true
        },
        {
          name: 'Test Validator 2',
          exitCode: 1,
          output: 'Found 5 issues',
          duration: '2.45',
          passed: false
        }
      ];

      const report = generateReport(mockResults, { quiet: false });

      expect(report).toHaveProperty('timestamp');
      expect(report).toHaveProperty('validators');
      expect(report).toHaveProperty('summary');
      expect(report.validators).toHaveLength(2);
      expect(report.summary.totalValidators).toBe(2);
      expect(report.summary.passed).toBe(1);
      expect(report.summary.failed).toBe(1);
      expect(report.summary.overallPass).toBe(false);
    });
  });

  describe('saveReport', () => {
    test('should be a function', () => {
      expect(typeof saveReport).toBe('function');
    });

    test('should save report to files', () => {
      const mockReport = {
        timestamp: '2025-12-07 12:00:00',
        options: {},
        validators: [
          {
            name: 'Test Validator',
            passed: true,
            exitCode: 0,
            duration: '1.23',
            issues: 0
          }
        ],
        summary: {
          totalValidators: 1,
          passed: 1,
          failed: 0,
          totalIssues: 0,
          overallPass: true
        }
      };

      const testOutputFile = 'test_validation_report';
      const result = saveReport(mockReport, testOutputFile);

      expect(result).toHaveProperty('mdFile');
      expect(result).toHaveProperty('jsonFile');
      expect(fs.existsSync(result.mdFile)).toBe(true);
      expect(fs.existsSync(result.jsonFile)).toBe(true);

      // Cleanup
      fs.unlinkSync(result.mdFile);
      fs.unlinkSync(result.jsonFile);
    });
  });

  describe('printSummary', () => {
    test('should be a function', () => {
      expect(typeof printSummary).toBe('function');
    });

    test('should not throw when printing summary', () => {
      const mockReport = {
        timestamp: '2025-12-07 12:00:00',
        validators: [],
        summary: {
          totalValidators: 0,
          passed: 0,
          failed: 0,
          totalIssues: 0,
          overallPass: true
        }
      };

      expect(() => {
        printSummary(mockReport);
      }).not.toThrow();
    });
  });
});
