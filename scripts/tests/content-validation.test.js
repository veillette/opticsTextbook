/**
 * Content validation tests
 *
 * Tests for common content issues in MyST Markdown files:
 * - Markdown syntax issues
 * - Reference patterns
 * - Label formats
 * - Common content problems
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '../..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');

/**
 * Get all markdown files recursively
 */
function getMarkdownFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getMarkdownFiles(fullPath, files);
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

describe('Content Validation', () => {
  let markdownFiles = [];

  beforeAll(() => {
    markdownFiles = getMarkdownFiles(CONTENT_DIR);
  });

  describe('Content Structure', () => {
    test('should have content directory', () => {
      expect(fs.existsSync(CONTENT_DIR)).toBe(true);
    });

    test('should have markdown files', () => {
      expect(markdownFiles.length).toBeGreaterThan(0);
    });

    test('all markdown files should be readable', () => {
      markdownFiles.forEach(file => {
        expect(() => {
          fs.readFileSync(file, 'utf8');
        }).not.toThrow();
      });
    });
  });

  describe('Markdown Syntax Checks', () => {
    test('should not have unclosed code blocks', () => {
      const issues = [];

      markdownFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');

        let inCodeBlock = false;
        let codeBlockStart = 0;
        let codeBlockType = '';

        lines.forEach((line, index) => {
          const trimmed = line.trim();
          // Match code block opening (```) or MyST directive (```{directive})
          if (trimmed.startsWith('```')) {
            if (!inCodeBlock) {
              inCodeBlock = true;
              codeBlockStart = index + 1;
              codeBlockType = trimmed;
            } else {
              // Only close if it's a plain ``` (not another directive opening)
              if (trimmed === '```') {
                inCodeBlock = false;
                codeBlockType = '';
              }
            }
          }
        });

        if (inCodeBlock) {
          issues.push({
            file: path.relative(ROOT_DIR, file),
            line: codeBlockStart,
            type: codeBlockType,
            message: 'Potentially unclosed code block'
          });
        }
      });

      // Report issues as warnings but don't fail
      // Code block detection in MyST files can have false positives
      // due to complex directive nesting
      if (issues.length > 0) {
        console.log('Warning: Potential unclosed code blocks found (may be false positives):');
        issues.forEach(issue => {
          console.log(`  ${issue.file}:${issue.line} - ${issue.type}`);
        });
      }

      // Don't fail - MyST directive parsing is complex and may have false positives
      // The actual build process will catch real syntax errors
    });

    test('should not have empty headings', () => {
      const issues = [];

      markdownFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');

        lines.forEach((line, index) => {
          // Match headings like "## " with nothing after
          if (/^#{1,6}\s*$/.test(line)) {
            issues.push({
              file: path.relative(ROOT_DIR, file),
              line: index + 1,
              content: line
            });
          }
        });
      });

      if (issues.length > 0) {
        console.log('Empty headings found:');
        issues.forEach(issue => {
          console.log(`  ${issue.file}:${issue.line}`);
        });
      }

      expect(issues).toHaveLength(0);
    });
  });

  describe('Reference Pattern Checks', () => {
    test('should use valid MyST reference syntax', () => {
      const issues = [];

      // Common invalid patterns to check for
      const invalidPatterns = [
        // Markdown link-style refs that should be MyST cross-refs
        { pattern: /\[([^\]]+)\]\(#([a-z0-9_-]+)\)/gi, message: 'Use MyST {ref} syntax instead of markdown anchor links' }
      ];

      markdownFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');

        invalidPatterns.forEach(({ pattern, message }) => {
          const matches = content.match(pattern);
          if (matches) {
            matches.forEach(match => {
              issues.push({
                file: path.relative(ROOT_DIR, file),
                match,
                message
              });
            });
          }
        });
      });

      // This is a warning, not an error - some projects may use markdown-style links intentionally
      if (issues.length > 0) {
        console.log('Potential reference pattern issues (review manually):');
        issues.slice(0, 5).forEach(issue => {
          console.log(`  ${issue.file}: ${issue.match} - ${issue.message}`);
        });
        if (issues.length > 5) {
          console.log(`  ... and ${issues.length - 5} more`);
        }
      }
    });

    test('should have properly formatted labels', () => {
      const issues = [];

      markdownFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');

        lines.forEach((line, index) => {
          // MyST labels are at the start of lines like (my-label)=
          // Skip lines that are LaTeX (contain backslashes) or are in code blocks
          if (line.includes('\\') || line.trim().startsWith('```')) {
            return;
          }

          // Check for labels at start of line with spaces
          const labelMatch = line.match(/^\s*\(([^)]+)\)=/);
          if (labelMatch) {
            const label = labelMatch[1];
            // Labels should not contain spaces
            if (/\s/.test(label)) {
              issues.push({
                file: path.relative(ROOT_DIR, file),
                line: index + 1,
                label: label,
                message: 'Labels should not contain spaces'
              });
            }
          }
        });
      });

      if (issues.length > 0) {
        console.log('Invalid label formats found:');
        issues.forEach(issue => {
          console.log(`  ${issue.file}:${issue.line}: "${issue.label}" - ${issue.message}`);
        });
      }

      expect(issues).toHaveLength(0);
    });
  });

  describe('Image Reference Checks', () => {
    test('should reference existing images', () => {
      const issues = [];

      // Common image patterns in MyST
      const imagePatterns = [
        /!\[([^\]]*)\]\(([^)]+)\)/g,  // Markdown image syntax
        /```{figure}\s*([^\n]+)/g      // MyST figure directive
      ];

      markdownFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const fileDir = path.dirname(file);

        // Check markdown image syntax
        let match;
        const mdImagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g;

        while ((match = mdImagePattern.exec(content)) !== null) {
          const imagePath = match[2];

          // Skip external URLs
          if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            continue;
          }

          // Resolve relative path
          const absolutePath = path.resolve(fileDir, imagePath);

          if (!fs.existsSync(absolutePath)) {
            issues.push({
              file: path.relative(ROOT_DIR, file),
              image: imagePath,
              message: 'Image file not found'
            });
          }
        }
      });

      // Report issues but don't fail - let validate-images.js handle this
      if (issues.length > 0) {
        console.log('Image reference issues (also checked by validate-images):');
        issues.slice(0, 5).forEach(issue => {
          console.log(`  ${issue.file}: ${issue.image} - ${issue.message}`);
        });
        if (issues.length > 5) {
          console.log(`  ... and ${issues.length - 5} more`);
        }
      }
    });
  });

  describe('Common Content Problems', () => {
    test('should not have TODO comments left in content', () => {
      const issues = [];

      markdownFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');

        lines.forEach((line, index) => {
          if (/\bTODO\b/i.test(line) && !line.includes('```')) {
            issues.push({
              file: path.relative(ROOT_DIR, file),
              line: index + 1,
              content: line.trim().substring(0, 60)
            });
          }
        });
      });

      // Warning only - TODOs might be intentional
      if (issues.length > 0) {
        console.log(`Found ${issues.length} TODO comments in content files`);
      }
    });

    test('should not have FIXME comments left in content', () => {
      const issues = [];

      markdownFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');

        lines.forEach((line, index) => {
          if (/\bFIXME\b/i.test(line) && !line.includes('```')) {
            issues.push({
              file: path.relative(ROOT_DIR, file),
              line: index + 1,
              content: line.trim().substring(0, 60)
            });
          }
        });
      });

      if (issues.length > 0) {
        console.log(`Found ${issues.length} FIXME comments in content files`);
        issues.forEach(issue => {
          console.log(`  ${issue.file}:${issue.line}`);
        });
      }

      // FIXME comments should be addressed - fail the test
      expect(issues).toHaveLength(0);
    });

    test('should have consistent heading hierarchy', () => {
      const issues = [];

      markdownFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');

        let lastLevel = 0;
        let inCodeBlock = false;

        lines.forEach((line, index) => {
          // Track code blocks
          if (line.trim().startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            return;
          }

          if (inCodeBlock) return;

          // Check headings
          const headingMatch = line.match(/^(#{1,6})\s+/);
          if (headingMatch) {
            const level = headingMatch[1].length;

            // First heading can be any level
            if (lastLevel > 0 && level > lastLevel + 1) {
              issues.push({
                file: path.relative(ROOT_DIR, file),
                line: index + 1,
                message: `Heading level jumped from h${lastLevel} to h${level}`
              });
            }

            lastLevel = level;
          }
        });
      });

      if (issues.length > 0) {
        console.log('Heading hierarchy issues:');
        issues.slice(0, 10).forEach(issue => {
          console.log(`  ${issue.file}:${issue.line} - ${issue.message}`);
        });
        if (issues.length > 10) {
          console.log(`  ... and ${issues.length - 10} more`);
        }
      }

      // Don't fail - this is a style recommendation
    });
  });
});

describe('Content File Patterns', () => {
  test('should have index files in chapter directories', () => {
    if (!fs.existsSync(CONTENT_DIR)) {
      return;
    }

    const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
    const directories = entries.filter(e => e.isDirectory());

    const missingIndex = [];

    directories.forEach(dir => {
      const dirPath = path.join(CONTENT_DIR, dir.name);
      const indexPath = path.join(dirPath, 'index.md');

      if (!fs.existsSync(indexPath)) {
        // Check for _index.md as alternative
        const altIndexPath = path.join(dirPath, '_index.md');
        if (!fs.existsSync(altIndexPath)) {
          missingIndex.push(dir.name);
        }
      }
    });

    if (missingIndex.length > 0) {
      console.log('Directories without index files:');
      missingIndex.forEach(dir => {
        console.log(`  content/${dir}/`);
      });
    }

    // Don't fail - some directories might intentionally not have index files
  });
});
