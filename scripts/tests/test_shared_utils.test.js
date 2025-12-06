/**
 * Unit tests for shared_utils module.
 *
 * Run with: npm test
 * Or: npx jest scripts/tests/test_shared_utils.test.js
 */

const {
  // String functions
  toSnakeCase,
  extractDescriptiveName,
  isProperlyNamed,
  // Validation
  validateImageExtension,
  validateChapterNumber,
  // Exceptions
  ValidationError,
  ChapterError,
  ConfigurationError,
  // Path handling
  ensurePath,
  // Formatting
  formatFileSize,
} = require('../shared_utils');

describe('toSnakeCase', () => {
  test('converts basic camel case', () => {
    expect(toSnakeCase('TestName')).toBe('test_name');
    expect(toSnakeCase('testName')).toBe('test_name');
  });

  test('handles numbers', () => {
    expect(toSnakeCase('HTML2PDF')).toBe('html2_pdf');
    expect(toSnakeCase('test123Name')).toBe('test123_name');
  });

  test('handles already snake_case', () => {
    expect(toSnakeCase('already_snake_case')).toBe('already_snake_case');
  });

  test('converts hyphens', () => {
    expect(toSnakeCase('test-name')).toBe('test_name');
    expect(toSnakeCase('test-name-here')).toBe('test_name_here');
  });

  test('handles spaces', () => {
    expect(toSnakeCase('test name')).toBe('test_name');
    expect(toSnakeCase('Test Name Here')).toBe('test_name_here');
  });

  test('converts dots', () => {
    expect(toSnakeCase('test.name')).toBe('test_name');
  });

  test('removes existing prefix', () => {
    expect(toSnakeCase('01_02_test_name')).toBe('test_name');
  });

  test('removes multiple underscores', () => {
    expect(toSnakeCase('test___name')).toBe('test_name');
  });

  test('removes leading/trailing underscores', () => {
    expect(toSnakeCase('_test_name_')).toBe('test_name');
  });

  test('handles special acronyms', () => {
    expect(toSnakeCase('SiO2Test')).toBe('sio2_test');
  });
});

describe('extractDescriptiveName', () => {
  test('extracts simple filename', () => {
    expect(extractDescriptiveName('lens_diagram.png')).toBe('lens_diagram');
  });

  test('removes chapter prefix', () => {
    expect(extractDescriptiveName('03_07_lens_diagram.png')).toBe('lens_diagram');
    expect(extractDescriptiveName('1_2_test.jpg')).toBe('test');
  });

  test('removes vestigial prefix', () => {
    expect(extractDescriptiveName('Fiber_03_diagram.png')).toBe('diagram');
    expect(extractDescriptiveName('2_05a_test.jpg')).toBe('test');
  });

  test('removes date suffix', () => {
    expect(extractDescriptiveName('test_210308.png')).toBe('test');
  });

  test('handles empty name', () => {
    expect(extractDescriptiveName('01_02_.png')).toBe('figure');
    expect(extractDescriptiveName('a.png')).toBe('figure');
  });
});

describe('isProperlyNamed', () => {
  test('validates correct names', () => {
    expect(isProperlyNamed('03_07_lens_diagram.png', 3)).toBe(true);
    expect(isProperlyNamed('01_01_test.jpg', 1)).toBe(true);
    expect(isProperlyNamed('11_99_complex_name_here.webp', 11)).toBe(true);
  });

  test('rejects invalid chapter number', () => {
    expect(isProperlyNamed('03_07_lens_diagram.png', 2)).toBe(false);
    expect(isProperlyNamed('01_07_test.jpg', 3)).toBe(false);
  });

  test('rejects invalid format', () => {
    expect(isProperlyNamed('3_7_lens.png', 3)).toBe(false); // Single digit
    expect(isProperlyNamed('03_lens_diagram.png', 3)).toBe(false); // Missing position
    expect(isProperlyNamed('lens_diagram.png', 3)).toBe(false); // No prefix
    expect(isProperlyNamed('03_07_LensDiagram.png', 3)).toBe(false); // Capital letters
  });
});

describe('validateImageExtension', () => {
  test('accepts valid extensions', () => {
    expect(validateImageExtension('test.png')).toBe(true);
    expect(validateImageExtension('test.jpg')).toBe(true);
    expect(validateImageExtension('test.jpeg')).toBe(true);
    expect(validateImageExtension('test.gif')).toBe(true);
    expect(validateImageExtension('test.svg')).toBe(true);
    expect(validateImageExtension('test.webp')).toBe(true);
  });

  test('is case insensitive', () => {
    expect(validateImageExtension('test.PNG')).toBe(true);
    expect(validateImageExtension('test.JPG')).toBe(true);
  });

  test('rejects invalid extensions', () => {
    expect(validateImageExtension('test.txt')).toBe(false);
    expect(validateImageExtension('test.pdf')).toBe(false);
    expect(validateImageExtension('test.doc')).toBe(false);
  });
});

describe('validateChapterNumber', () => {
  test('validates correct chapter numbers', () => {
    // Note: This test depends on the actual chapters defined in config.json
    // Adjust the range based on your actual configuration
    expect(() => validateChapterNumber(1)).not.toThrow();
    // Add more tests based on your actual chapter configuration
  });

  test('throws error for invalid chapters', () => {
    expect(() => validateChapterNumber(0)).toThrow(ChapterError);
    expect(() => validateChapterNumber(999)).toThrow(ChapterError);
    expect(() => validateChapterNumber(-1)).toThrow(ChapterError);
  });
});

describe('ensurePath', () => {
  test('handles string paths', () => {
    const result = ensurePath('/tmp/test');
    expect(typeof result).toBe('string');
    expect(result).toContain('test');
  });

  test('handles relative paths', () => {
    const result = ensurePath('./test');
    expect(typeof result).toBe('string');
  });
});

describe('formatFileSize', () => {
  test('formats bytes', () => {
    expect(formatFileSize(100)).toBe('100.00 B');
    expect(formatFileSize(1023)).toBe('1023.00 B');
  });

  test('formats kilobytes', () => {
    expect(formatFileSize(1024)).toBe('1.00 KB');
    expect(formatFileSize(1536)).toBe('1.50 KB');
  });

  test('formats megabytes', () => {
    expect(formatFileSize(1024 * 1024)).toBe('1.00 MB');
    expect(formatFileSize(1024 * 1024 * 2.5)).toBe('2.50 MB');
  });

  test('formats gigabytes', () => {
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1.00 GB');
  });

  test('handles zero', () => {
    expect(formatFileSize(0)).toBe('0.00 B');
  });
});
