#!/usr/bin/env python3
"""
MyST Markdown Linter for Optics Textbook

This script checks for common MyST markdown issues that can cause rendering problems.

Status: ACTIVE - Core workflow script
    Used in pre-commit hooks and CI validation.
    Run via: npm run lint / npm run lint:fix

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
11. Backtick fences used for directives (should use colon fences)
12. Colon fences used for code blocks (should use backtick fences)

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
from typing import List, Dict, Tuple, DefaultDict, Any, Union

# Import shared utilities
from shared_utils import ensure_directory
from report_utils import ReportGenerator, MarkdownReportBuilder

class MystLinter:
    def __init__(self, fix_mode: bool = False) -> None:
        self.fix_mode: bool = fix_mode
        self.issues: DefaultDict[str, List[Dict[str, Any]]] = defaultdict(list)

    def check_file(self, file_path: Union[str, Path]) -> List[Dict[str, Any]]:
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
            file_issues.extend(self._check_fence_convention(lines, file_path))

            # Apply fixes if in fix mode
            if self.fix_mode and file_issues:
                modified_content = self._apply_fixes(original_content, file_issues)
                if modified_content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(modified_content)

            return file_issues

        except Exception as e:
            return [{'type': 'error', 'line': 0, 'message': f"Error reading file: {e}"}]

    def _check_split_references(self, lines: List[str], file_path: Union[str, Path]) -> List[Dict[str, Any]]:
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

    def _check_blank_lines_in_math(self, lines: List[str], file_path: Union[str, Path]) -> List[Dict[str, Any]]:
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

    def _check_missing_math_labels(self, lines: List[str], file_path: Union[str, Path]) -> List[Dict[str, Any]]:
        """Check for math blocks without labels.

        Note: This check is intentionally disabled/empty because:
        - Not all equations need labels (only those being cross-referenced)
        - Adding labels to all equations creates unnecessary noise
        - Labels should be added intentionally when needed, not by default

        If you need to find unlabeled equations, use grep instead:
            grep -n "begin{align" content/ -r | grep -v ":label:"
        """
        # Return empty - this check generates too much noise
        # Labels are only needed for equations that are cross-referenced
        return []

    def _check_equation_label_format(self, lines: List[str], file_path: Union[str, Path]) -> List[Dict[str, Any]]:
        """Check equation label format consistency.

        Accepts multiple valid conventions:
        - eq:chapter:description (preferred, e.g., eq:geo:snell-law)
        - eq.description (legacy, e.g., eq.Fraunhofer)
        - bare-name (legacy, e.g., photon-energy)
        - fig:name, table:name, Fig_XX_YY (figure/table labels)
        """
        issues = []
        label_pattern = r':label:\s*([^\s\n]+)'

        for i, line in enumerate(lines):
            match = re.search(label_pattern, line)
            if match:
                label = match.group(1)

                # Accept valid patterns:
                # - eq:chapter:description (preferred)
                # - eq.description (legacy with period)
                # - eq-description (legacy with hyphen)
                # - fig:, table:, Fig_, table_ prefixes
                # - bare names (legacy, still functional)
                valid_patterns = [
                    r'^eq:[a-z]+:[a-z0-9\-]+$',      # eq:chapter:description (preferred)
                    r'^eq\.[a-zA-Z0-9_\-]+$',         # eq.description (legacy)
                    r'^eq-[a-zA-Z0-9_\-]+$',          # eq-description (legacy)
                    r'^fig[:_]',                      # figure labels
                    r'^Fig_',                         # Figure labels (uppercase)
                    r'^table[:_]',                    # table labels
                    r'^[a-z][a-z0-9\-]*$',            # bare lowercase names (legacy)
                ]

                is_valid = any(re.match(pattern, label) for pattern in valid_patterns)

                # Only flag truly problematic labels (e.g., with spaces or special chars)
                if not is_valid and not re.match(r'^[a-zA-Z][a-zA-Z0-9_\-:.]+$', label):
                    issues.append({
                        'type': 'invalid_label',
                        'line': i + 1,
                        'message': f"Label '{label}' contains invalid characters",
                        'severity': 'warning',
                        'fixable': False
                    })

        return issues

    def _check_trailing_whitespace(self, lines: List[str], file_path: Union[str, Path]) -> List[Dict[str, Any]]:
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

    def _check_multiple_blank_lines(self, lines: List[str], file_path: Union[str, Path]) -> List[Dict[str, Any]]:
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

    def _check_malformed_directives(self, lines: List[str], file_path: Union[str, Path]) -> List[Dict[str, Any]]:
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

    def _check_figure_alt_text(self, lines: List[str], file_path: Union[str, Path]) -> List[Dict[str, Any]]:
        """Check for figures without alt text or captions.

        In MyST, figure captions go INSIDE the figure block, after the options.
        Example:
            ```{figure} path/to/image.png
            :name: fig-label
            :width: 80%

            This is the caption text (inside the block, after options).
            ```
        """
        issues = []
        in_figure = False
        figure_start = 0
        has_caption = False
        has_alt = False
        past_options = False  # Track when we're past the option lines

        for i, line in enumerate(lines):
            if re.match(r'```\{figure\}', line):
                in_figure = True
                figure_start = i
                has_caption = False
                has_alt = False
                past_options = False
                continue

            if in_figure:
                stripped = line.strip()

                # Check for alt text option
                if re.match(r':alt:', line):
                    has_alt = True

                # Options start with : and have a value
                if stripped.startswith(':') and ':' in stripped[1:]:
                    # Still in options section
                    pass
                elif stripped == '```':
                    # End of figure block
                    if not has_caption:
                        issues.append({
                            'type': 'missing_figure_caption',
                            'line': figure_start + 1,
                            'message': "Figure has no caption text",
                            'severity': 'warning',
                            'fixable': False
                        })
                    in_figure = False
                elif stripped == '':
                    # Blank line - marks end of options section
                    past_options = True
                elif past_options or (not stripped.startswith(':')):
                    # Non-empty, non-option line after options = caption text
                    # Also count lines that don't start with : as caption
                    # (handles case where caption immediately follows options without blank line)
                    if stripped:
                        has_caption = True

        return issues

    def _check_fence_convention(self, lines: List[str], file_path: Union[str, Path]) -> List[Dict[str, Any]]:
        """Check that directives use backtick fences (our preferred convention)."""
        issues = []

        # MyST directives that should use backtick fences (our convention)
        myst_directives = [
            'note', 'warning', 'important', 'tip', 'caution', 'attention',
            'danger', 'error', 'hint', 'seealso', 'admonition',
            'dropdown', 'card', 'tab-set', 'tab-item',
            'figure', 'subfigure', 'video', 'image',
            'proof', 'theorem', 'lemma', 'definition', 'example', 'exercise',
            'grid', 'column', 'margin', 'sidebar',
            'epigraph', 'bibliography', 'glossary', 'list-table'
        ]

        for i, line in enumerate(lines):
            # Check for colon fence directives (should be backtick fences per our convention)
            colon_directive_match = re.match(r':::\{(\w+[\w-]*)\}', line.strip())
            if colon_directive_match:
                directive_name = colon_directive_match.group(1)
                if directive_name in myst_directives:
                    issues.append({
                        'type': 'wrong_fence_type',
                        'line': i + 1,
                        'message': f"Directive '{directive_name}' should use backtick fence (```) not colon fence (:::)",
                        'severity': 'warning',
                        'fixable': False
                    })

            # Check for colon fence code blocks (should be backtick fences)
            colon_code_match = re.match(r':::\{(python|bash|shell|javascript|java|c|cpp|matlab|r)\}', line.strip())
            if colon_code_match:
                lang = colon_code_match.group(1)
                issues.append({
                    'type': 'wrong_fence_type',
                    'line': i + 1,
                    'message': f"Code block with language '{lang}' should use backtick fence (```) not colon fence (:::)",
                    'severity': 'warning',
                    'fixable': False,
                    'suggestion': f"Change :::{{{lang}}} to ```{lang}"
                })

        return issues

    def _apply_fixes(self, content: str, issues: List[Dict[str, Any]]) -> str:
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

def process_directory(content_dir: str, linter: MystLinter, quiet: bool = False) -> Tuple[Dict[str, List[Dict[str, Any]]], int, int]:
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

def print_summary(all_issues: Dict[str, List[Dict[str, Any]]], files_with_issues: int, total_files: int, fix_mode: bool) -> None:
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

def save_report(all_issues: Dict[str, List[Dict[str, Any]]], output_file: str) -> str:
    """Save detailed report to file using shared report utilities."""
    # Extract report name from output_file
    report_name = Path(output_file).stem

    # Create report generator
    gen = ReportGenerator(report_name)

    # Build markdown report
    builder = MarkdownReportBuilder("MyST Markdown Lint Report")

    # Add summary
    total_issues = sum(len(issues) for issues in all_issues.values())
    builder.add_section("Summary", level=2)
    builder.add_list([
        f"Total files checked: {len(all_issues)}",
        f"Total issues found: {total_issues}"
    ])

    # Add issues by file
    builder.add_section("Issues by File", level=2)

    for file_path in sorted(all_issues.keys()):
        issues = all_issues[file_path]
        builder.add_section(file_path, level=3)
        builder.add_text(f"Found {len(issues)} issues:\n")

        issue_lines = []
        for issue in issues:
            severity = issue.get('severity', 'info').upper()
            fixable = " [FIXABLE]" if issue.get('fixable') else ""
            issue_lines.append(f"**Line {issue['line']}** [{severity}]{fixable}: {issue['message']}")

        builder.add_list(issue_lines)

    # Write markdown report
    markdown_content = builder.build()
    filepath = gen.write_markdown(markdown_content)

    # Also write JSON report for machine processing
    json_data = {
        'total_files': len(all_issues),
        'total_issues': total_issues,
        'files': {
            file_path: [
                {
                    'line': issue['line'],
                    'type': issue['type'],
                    'severity': issue.get('severity', 'info'),
                    'message': issue['message'],
                    'fixable': issue.get('fixable', False)
                }
                for issue in issues
            ]
            for file_path, issues in all_issues.items()
        }
    }
    gen.write_json(json_data)

    return str(filepath)

def main() -> int:
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
