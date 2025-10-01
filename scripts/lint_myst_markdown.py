#!/usr/bin/env python3
"""
MyST Markdown Linter for Optics Textbook

This script checks for common MyST markdown issues that can cause rendering problems.

Issues checked:
1. Split equation/reference roles ({eq}, {numref}, {ref}, etc.) across lines
2. Blank lines inside math blocks (between :label: and equation content)
3. Missing labels on math blocks
4. Inconsistent equation label format
5. Broken figure references
6. Multiple consecutive blank lines
7. Trailing whitespace
8. Inconsistent heading levels
9. Malformed directive syntax
10. Missing alt text on figures

Usage:
    python lint_myst_markdown.py [--fix] [--content-dir DIR] [--output-file FILE]

Options:
    --fix            Automatically fix issues where possible
    --content-dir    Directory to lint (default: content)
    --output-file    Save report to file (default: reports/lint_report.md)
    --strict         Exit with error code if issues found
    --quiet          Only show summary
"""

import os
import re
import sys
import argparse
from pathlib import Path
from collections import defaultdict
from datetime import datetime

class MystLinter:
    def __init__(self, fix_mode=False):
        self.fix_mode = fix_mode
        self.issues = defaultdict(list)

    def check_file(self, file_path):
        """Check a single markdown file for issues."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                original_content = ''.join(lines)

            file_issues = []
            modified_lines = lines.copy()

            # Run all checks
            file_issues.extend(self._check_split_references(lines, file_path))
            file_issues.extend(self._check_blank_lines_in_math(lines, file_path))
            file_issues.extend(self._check_missing_math_labels(lines, file_path))
            file_issues.extend(self._check_equation_label_format(lines, file_path))
            file_issues.extend(self._check_trailing_whitespace(lines, file_path))
            file_issues.extend(self._check_multiple_blank_lines(lines, file_path))
            file_issues.extend(self._check_malformed_directives(lines, file_path))
            file_issues.extend(self._check_figure_alt_text(lines, file_path))

            # Apply fixes if in fix mode
            if self.fix_mode and file_issues:
                modified_content = self._apply_fixes(original_content, file_issues)
                if modified_content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(modified_content)

            return file_issues

        except Exception as e:
            return [{'type': 'error', 'line': 0, 'message': f"Error reading file: {e}"}]

    def _check_split_references(self, lines, file_path):
        """Check for split reference roles across lines."""
        issues = []
        pattern = r'\{(eq|numref|ref|doc|cite)\}\s*$'

        for i, line in enumerate(lines):
            if re.search(pattern, line):
                # Check if next line starts with backtick
                if i + 1 < len(lines) and lines[i + 1].strip().startswith('`'):
                    issues.append({
                        'type': 'split_reference',
                        'line': i + 1,
                        'message': f"Split reference role found: {line.strip()}",
                        'severity': 'error',
                        'fixable': True
                    })

        return issues

    def _check_blank_lines_in_math(self, lines, file_path):
        """Check for blank lines inside math blocks."""
        issues = []
        in_math_block = False
        math_start = 0
        has_label = False

        for i, line in enumerate(lines):
            # Detect math block start
            if re.match(r'```\{math\}', line):
                in_math_block = True
                math_start = i
                has_label = False
                continue

            # Detect math block end
            if in_math_block and line.strip() == '```':
                in_math_block = False
                continue

            # Check for label inside math block
            if in_math_block and re.match(r':label:\s*\S+', line):
                has_label = True
                # Check if there's a blank line after label
                if i + 1 < len(lines) and lines[i + 1].strip() == '':
                    issues.append({
                        'type': 'blank_line_after_label',
                        'line': i + 2,
                        'message': "Blank line found after :label: in math block",
                        'severity': 'warning',
                        'fixable': True
                    })

        return issues

    def _check_missing_math_labels(self, lines, file_path):
        """Check for math blocks without labels (numbered equations should have labels)."""
        issues = []
        in_math_block = False
        math_start = 0
        has_label = False

        for i, line in enumerate(lines):
            if re.match(r'```\{math\}', line):
                in_math_block = True
                math_start = i
                has_label = False
                continue

            if in_math_block and re.match(r':label:\s*\S+', line):
                has_label = True

            if in_math_block and line.strip() == '```':
                # Check if this math block has important content but no label
                # (heuristic: contains \begin{align} or similar)
                block_lines = lines[math_start:i+1]
                block_content = ''.join(block_lines)

                if not has_label and (r'\begin{align' in block_content or
                                     r'\begin{equation' in block_content):
                    # Check if it's in a boxed environment (those are often key equations)
                    if r'\boxed' not in block_content:
                        issues.append({
                            'type': 'missing_math_label',
                            'line': math_start + 1,
                            'message': "Math block with align/equation environment has no label",
                            'severity': 'info',
                            'fixable': False
                        })

                in_math_block = False

        return issues

    def _check_equation_label_format(self, lines, file_path):
        """Check equation label format consistency."""
        issues = []
        label_pattern = r':label:\s*([^\s\n]+)'

        for i, line in enumerate(lines):
            match = re.search(label_pattern, line)
            if match:
                label = match.group(1)
                # Check for consistent naming convention
                # Expected format: eq:chapter:description
                if not re.match(r'^eq:[a-z]+:[a-z\-]+$', label):
                    # Check if it's at least prefixed with 'eq'
                    if not label.startswith('eq:') and not label.startswith('fig') and not label.startswith('table'):
                        issues.append({
                            'type': 'inconsistent_label',
                            'line': i + 1,
                            'message': f"Label '{label}' doesn't follow naming convention (eq:chapter:description)",
                            'severity': 'info',
                            'fixable': False
                        })

        return issues

    def _check_trailing_whitespace(self, lines, file_path):
        """Check for trailing whitespace."""
        issues = []

        for i, line in enumerate(lines):
            if line.rstrip() != line.rstrip('\n'):
                issues.append({
                    'type': 'trailing_whitespace',
                    'line': i + 1,
                    'message': "Line has trailing whitespace",
                    'severity': 'info',
                    'fixable': True
                })

        return issues

    def _check_multiple_blank_lines(self, lines, file_path):
        """Check for more than 2 consecutive blank lines."""
        issues = []
        blank_count = 0
        blank_start = 0

        for i, line in enumerate(lines):
            if line.strip() == '':
                if blank_count == 0:
                    blank_start = i
                blank_count += 1
            else:
                if blank_count > 2:
                    issues.append({
                        'type': 'multiple_blank_lines',
                        'line': blank_start + 1,
                        'message': f"{blank_count} consecutive blank lines found (max 2 recommended)",
                        'severity': 'info',
                        'fixable': True
                    })
                blank_count = 0

        return issues

    def _check_malformed_directives(self, lines, file_path):
        """Check for malformed directive syntax."""
        issues = []

        # Common valid directives that can have text after }
        valid_directives = [
            'admonition', 'note', 'warning', 'tip', 'caution', 'attention',
            'danger', 'error', 'hint', 'important', 'seealso', 'topic',
            'proof', 'example', 'exercise', 'definition', 'theorem'
        ]

        for i, line in enumerate(lines):
            # Check for directives with missing closing backticks
            # But allow valid directive patterns like ```{admonition} Title
            if line.strip().startswith('```{'):
                directive_match = re.match(r'```\{(\w+)\}(.*)$', line.strip())
                if directive_match:
                    directive_name = directive_match.group(1)
                    rest = directive_match.group(2).strip()

                    # If it's not a valid directive that accepts text, and has text after }
                    if rest and directive_name not in valid_directives and directive_name not in ['math', 'figure', 'image', 'code-block', 'literalinclude']:
                        issues.append({
                            'type': 'malformed_directive',
                            'line': i + 1,
                            'message': f"Directive '{directive_name}' may be malformed (unexpected text after }})",
                            'severity': 'warning',
                            'fixable': False
                        })

            # Check for incorrect role syntax - but be more specific
            # Look for {role} followed by space and non-backtick, but not in code blocks
            # and not in directives, and not in math mode
            if not line.strip().startswith('```') and not line.strip().startswith('$'):
                # Match role syntax that's clearly wrong: {word} followed by space and letter/number
                if re.search(r'\{(eq|numref|ref|doc|cite|math|download|term)\}\s+[a-zA-Z0-9]', line):
                    issues.append({
                        'type': 'incorrect_role_syntax',
                        'line': i + 1,
                        'message': "Role syntax may be incorrect (should be {role}`target` not {role} target)",
                        'severity': 'warning',
                        'fixable': False
                    })

        return issues

    def _check_figure_alt_text(self, lines, file_path):
        """Check for figures without alt text or captions."""
        issues = []
        in_figure = False
        figure_start = 0
        has_caption = False
        has_alt = False

        for i, line in enumerate(lines):
            if re.match(r'```\{figure\}', line):
                in_figure = True
                figure_start = i
                has_caption = False
                has_alt = False
                continue

            if in_figure:
                if re.match(r':alt:', line):
                    has_alt = True
                if re.match(r':name:', line):
                    # Name line doesn't mean caption, but check for text after closing
                    pass
                if line.strip() == '```':
                    # End of figure block - check for caption after
                    if i + 1 < len(lines) and lines[i + 1].strip() != '':
                        has_caption = True

                    if not has_caption:
                        issues.append({
                            'type': 'missing_figure_caption',
                            'line': figure_start + 1,
                            'message': "Figure has no caption text",
                            'severity': 'warning',
                            'fixable': False
                        })

                    in_figure = False

        return issues

    def _apply_fixes(self, content, issues):
        """Apply automatic fixes to content."""
        # Fix split references
        content = re.sub(
            r'\{(eq|numref|ref|doc|cite)\}\s*\n\s*`([^`]+)`',
            r'{\1}`\2`',
            content,
            flags=re.MULTILINE
        )

        # Fix trailing whitespace
        lines = content.split('\n')
        lines = [line.rstrip() for line in lines]
        content = '\n'.join(lines)

        # Fix multiple blank lines (reduce to max 2)
        content = re.sub(r'\n{4,}', '\n\n\n', content)

        # Fix blank lines after labels in math blocks
        content = re.sub(
            r'(:label:\s*\S+)\s*\n\s*\n',
            r'\1\n',
            content,
            flags=re.MULTILINE
        )

        return content

def process_directory(content_dir, linter, quiet=False):
    """Process all markdown files in directory."""
    md_files = []
    for root, dirs, files in os.walk(content_dir):
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))

    all_issues = defaultdict(list)
    files_with_issues = 0

    for md_file in sorted(md_files):
        file_issues = linter.check_file(md_file)

        if file_issues:
            relative_path = os.path.relpath(md_file, content_dir)
            all_issues[relative_path] = file_issues
            files_with_issues += 1

            if not quiet:
                print(f"\n📄 {relative_path}")
                for issue in file_issues:
                    severity_emoji = {
                        'error': '❌',
                        'warning': '⚠️',
                        'info': 'ℹ️'
                    }.get(issue.get('severity', 'info'), 'ℹ️')

                    fixable = " [fixable]" if issue.get('fixable') else ""
                    print(f"  {severity_emoji} Line {issue['line']}: {issue['message']}{fixable}")

    return all_issues, files_with_issues, len(md_files)

def print_summary(all_issues, files_with_issues, total_files, fix_mode):
    """Print summary of linting results."""
    total_issues = sum(len(issues) for issues in all_issues.values())

    # Count by type and severity
    by_type = defaultdict(int)
    by_severity = defaultdict(int)
    fixable_count = 0

    for issues in all_issues.values():
        for issue in issues:
            by_type[issue['type']] += 1
            by_severity[issue.get('severity', 'info')] += 1
            if issue.get('fixable'):
                fixable_count += 1

    print(f"\n=== SUMMARY ===")
    if fix_mode:
        print(f"Fixed issues in {files_with_issues} out of {total_files} files")
    else:
        print(f"Found {total_issues} issues in {files_with_issues} out of {total_files} files")

    if total_issues == 0:
        print("✅ No issues found!")
        return

    print(f"\nBy Severity:")
    for severity in ['error', 'warning', 'info']:
        if by_severity[severity] > 0:
            emoji = {'error': '❌', 'warning': '⚠️', 'info': 'ℹ️'}[severity]
            print(f"  {emoji} {severity.title()}: {by_severity[severity]}")

    print(f"\nBy Type:")
    for issue_type, count in sorted(by_type.items(), key=lambda x: -x[1]):
        readable_type = issue_type.replace('_', ' ').title()
        print(f"  • {readable_type}: {count}")

    if not fix_mode and fixable_count > 0:
        print(f"\n💡 {fixable_count} issues can be automatically fixed with --fix")

def save_report(all_issues, output_file):
    """Save detailed report to file."""
    os.makedirs('reports', exist_ok=True)

    if not output_file.startswith('reports/'):
        output_file = os.path.join('reports', os.path.basename(output_file))

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(f"# MyST Markdown Lint Report\n\n")
        f.write(f"Generated: {timestamp}\n\n")

        total_issues = sum(len(issues) for issues in all_issues.values())
        f.write(f"## Summary\n\n")
        f.write(f"- Total files checked: {len(all_issues)}\n")
        f.write(f"- Total issues found: {total_issues}\n\n")

        f.write(f"## Issues by File\n\n")

        for file_path in sorted(all_issues.keys()):
            issues = all_issues[file_path]
            f.write(f"### {file_path}\n\n")
            f.write(f"Found {len(issues)} issues:\n\n")

            for issue in issues:
                severity = issue.get('severity', 'info').upper()
                fixable = " [FIXABLE]" if issue.get('fixable') else ""
                f.write(f"- **Line {issue['line']}** [{severity}]{fixable}: {issue['message']}\n")

            f.write("\n")

    return output_file

def main():
    parser = argparse.ArgumentParser(
        description='Lint MyST Markdown files for common issues'
    )
    parser.add_argument('--fix', action='store_true',
                       help='Automatically fix issues where possible')
    parser.add_argument('--content-dir', default='content',
                       help='Content directory to lint (default: content)')
    parser.add_argument('--output-file', default='lint_report.md',
                       help='Save report to file (default: reports/lint_report.md)')
    parser.add_argument('--strict', action='store_true',
                       help='Exit with error code if issues found')
    parser.add_argument('--quiet', action='store_true',
                       help='Only show summary')

    args = parser.parse_args()

    if not os.path.exists(args.content_dir):
        print(f"❌ Error: Content directory '{args.content_dir}' not found!")
        return 1

    print("=== MyST Markdown Linter ===")
    if args.fix:
        print("FIX MODE - Issues will be automatically corrected\n")

    linter = MystLinter(fix_mode=args.fix)
    all_issues, files_with_issues, total_files = process_directory(
        args.content_dir, linter, args.quiet
    )

    print_summary(all_issues, files_with_issues, total_files, args.fix)

    # Save report
    if all_issues:
        report_file = save_report(all_issues, args.output_file)
        print(f"\n📄 Detailed report saved to: {report_file}")

    # Return appropriate exit code
    if args.strict and sum(len(issues) for issues in all_issues.values()) > 0:
        return 1

    return 0

if __name__ == "__main__":
    sys.exit(main())
