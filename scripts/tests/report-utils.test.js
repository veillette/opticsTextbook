/**
 * Tests for report-utils.js
 *
 * Tests the report generation utilities
 */

const {
  ReportGenerator,
  MarkdownReportBuilder
} = require('../report-utils');
const fs = require('fs');

describe('report-utils', () => {
  describe('ReportGenerator', () => {
    test('should create a ReportGenerator instance', () => {
      const generator = new ReportGenerator('test-report');
      expect(generator).toBeDefined();
      expect(generator).toBeInstanceOf(ReportGenerator);
    });

    test('should have required methods', () => {
      const generator = new ReportGenerator('test-report');
      expect(typeof generator.writeMarkdown).toBe('function');
      expect(typeof generator.writeJson).toBe('function');
      expect(typeof generator.writeText).toBe('function');
      expect(typeof generator.writeAll).toBe('function');
      expect(typeof generator.getPath).toBe('function');
    });

    test('should generate file paths correctly', () => {
      const generator = new ReportGenerator('test-report');
      const mdPath = generator.getPath('md');
      const jsonPath = generator.getPath('json');

      expect(mdPath).toContain('test-report.md');
      expect(jsonPath).toContain('test-report.json');
    });

    test('should write JSON report', () => {
      const generator = new ReportGenerator('test-report-json');
      const data = { test: 'data', count: 42 };
      const filepath = generator.writeJson(data);

      expect(fs.existsSync(filepath)).toBe(true);
      const content = JSON.parse(fs.readFileSync(filepath, 'utf8'));
      expect(content).toEqual(data);

      // Cleanup
      fs.unlinkSync(filepath);
    });

    test('should write markdown report', () => {
      const generator = new ReportGenerator('test-report-md');
      const markdown = '# Test Report\n\nThis is a test.';
      const filepath = generator.writeMarkdown(markdown);

      expect(fs.existsSync(filepath)).toBe(true);
      const content = fs.readFileSync(filepath, 'utf8');
      expect(content).toBe(markdown);

      // Cleanup
      fs.unlinkSync(filepath);
    });
  });

  describe('MarkdownReportBuilder', () => {
    test('should create a MarkdownReportBuilder instance', () => {
      const builder = new MarkdownReportBuilder('Test Report');
      expect(builder).toBeDefined();
      expect(builder).toBeInstanceOf(MarkdownReportBuilder);
    });

    test('should have formatting methods', () => {
      const builder = new MarkdownReportBuilder('Test');
      expect(typeof builder.addTitle).toBe('function');
      expect(typeof builder.addSection).toBe('function');
      expect(typeof builder.addText).toBe('function');
      expect(typeof builder.addList).toBe('function');
      expect(typeof builder.addCodeBlock).toBe('function');
      expect(typeof builder.addTable).toBe('function');
      expect(typeof builder.addSummary).toBe('function');
      expect(typeof builder.build).toBe('function');
    });

    test('should build markdown content', () => {
      const builder = new MarkdownReportBuilder('Test Report');
      builder.addSection('Section 1');
      builder.addText('This is a test report');
      builder.addList(['Item 1', 'Item 2', 'Item 3']);

      const markdown = builder.build();
      expect(typeof markdown).toBe('string');
      expect(markdown).toContain('Test Report');
      expect(markdown).toContain('Section 1');
      expect(markdown).toContain('This is a test report');
      expect(markdown).toContain('- Item 1');
    });

    test('should format headings correctly', () => {
      const builder = new MarkdownReportBuilder('Main Title');
      builder.addSection('Subsection', 2);
      builder.addSection('Another Section', 3);

      const markdown = builder.build();
      expect(markdown).toContain('# Main Title');
      expect(markdown).toContain('## Subsection');
      expect(markdown).toContain('### Another Section');
    });

    test('should format lists correctly', () => {
      const builder = new MarkdownReportBuilder('Test');
      builder.addList(['First', 'Second', 'Third']);

      const markdown = builder.build();
      expect(markdown).toContain('- First');
      expect(markdown).toContain('- Second');
      expect(markdown).toContain('- Third');
    });

    test('should format code blocks correctly', () => {
      const builder = new MarkdownReportBuilder('Test');
      builder.addCodeBlock('const x = 42;', 'javascript');

      const markdown = builder.build();
      expect(markdown).toContain('```javascript');
      expect(markdown).toContain('const x = 42;');
      expect(markdown).toContain('```');
    });

    test('should chain method calls', () => {
      const builder = new MarkdownReportBuilder('Test');
      const markdown = builder
        .addSection('Section')
        .addText('Content')
        .addList(['Item'])
        .build();

      expect(markdown).toContain('Test');
      expect(markdown).toContain('Section');
      expect(markdown).toContain('Content');
      expect(markdown).toContain('- Item');
    });

    test('should format tables correctly', () => {
      const builder = new MarkdownReportBuilder('Test');
      const headers = ['Name', 'Age', 'City'];
      const rows = [
        ['Alice', '25', 'NYC'],
        ['Bob', '30', 'LA']
      ];
      builder.addTable(headers, rows);

      const markdown = builder.build();
      expect(markdown).toContain('Name');
      expect(markdown).toContain('Alice');
      expect(markdown).toContain('Bob');
    });

    test('should add summary correctly', () => {
      const builder = new MarkdownReportBuilder('Test');
      const summary = {
        'Total': 100,
        'Passed': 95,
        'Failed': 5
      };
      builder.addSummary(summary);

      const markdown = builder.build();
      expect(markdown).toContain('Total');
      expect(markdown).toContain('100');
      expect(markdown).toContain('Passed');
      expect(markdown).toContain('95');
    });
  });
});
