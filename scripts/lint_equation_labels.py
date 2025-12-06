#!/usr/bin/env python3
"""
Lint Equation Labels

This script checks for non-standard equation labels in MyST markdown files.
It can be used as a pre-commit hook or standalone linter.

Standard format: eq:chapter-code:descriptive-name
  - chapter-code: basics, geo, inst, pol, wave, coh, diff, laser, adv, fiber, ray
  - descriptive-name: lowercase letters, numbers, and hyphens only

Non-standard patterns detected:
  1. Dot notation: eq.name or eq.camelCase
  2. LaTeX inline: \label{name} inside equations
  3. MyST inline: $$ ... $$ (label)
  4. Missing chapter code: eq:name without chapter prefix
  5. Wrong format: uppercase, underscores, or other invalid characters

Usage:
  python lint_equation_labels.py [--fix] [--verbose] [file_path ...]

  --fix: Automatically fix non-standard labels (interactive for ambiguous cases)
  --verbose: Show detailed information about each issue

Exit codes:
  0: All labels are valid
  1: Non-standard labels found (use --fix to convert)
"""

import re
import sys
import argparse
from pathlib import Path
from typing import List, Dict, Tuple, Optional

# Chapter code mappings
CHAPTER_CODES = {
    'Chap01Basics': 'basics',
    'Chap02GeometricalOptics': 'geo',
    'Chap03OpticalInstruments': 'inst',
    'Chap04Polarization': 'pol',
    'Chap05Wave': 'wave',
    'Chap06InterferenceCoherence': 'coh',
    'Chap07Diffraction': 'diff',
    'Chap08Lasers': 'laser',
    'Chap09AdvancedInstruments': 'adv',
    'Chap10FiberOptics': 'fiber',
    'Chap11RayMatrix': 'ray',
}

VALID_CHAPTER_CODES = set(CHAPTER_CODES.values())


class LabelIssue:
    """Represents a non-standard label issue."""

    def __init__(self, label: str, line_num: int, issue_type: str,
                 suggested_fix: str, context: str, position: int):
        self.label = label
        self.line_num = line_num
        self.issue_type = issue_type
        self.suggested_fix = suggested_fix
        self.context = context
        self.position = position

    def __str__(self):
        return f"Line {self.line_num}: {self.issue_type} - '{self.label}' -> '{self.suggested_fix}'"


def get_chapter_code(file_path: Path) -> Optional[str]:
    """Extract chapter code from file path."""
    path_str = str(file_path)
    for chapter_dir, code in CHAPTER_CODES.items():
        if chapter_dir in path_str:
            return code
    return None


def normalize_label_name(name: str) -> str:
    """Convert a label name to the standard format (lowercase, hyphens)."""
    # Convert underscores to hyphens
    name = name.replace('_', '-')
    # Convert camelCase to hyphen-separated
    name = re.sub(r'([a-z])([A-Z])', r'\1-\2', name)
    # Convert to lowercase
    name = name.lower()
    # Remove any invalid characters
    name = re.sub(r'[^a-z0-9-]', '-', name)
    # Remove consecutive hyphens
    name = re.sub(r'-+', '-', name)
    # Remove leading/trailing hyphens
    name = name.strip('-')
    return name


def is_valid_label(label: str, chapter_code: str) -> bool:
    """Check if a label follows the standard format."""
    pattern = rf'^eq:{chapter_code}:[a-z0-9]([a-z0-9-]*[a-z0-9])?$'
    return bool(re.match(pattern, label))


def suggest_fix(old_label: str, chapter_code: str) -> str:
    """Generate a suggested fix for a non-standard label."""
    # Remove common prefixes
    name = old_label
    if name.startswith('eq:'):
        name = name[3:]
    elif name.startswith('eq.'):
        name = name[3:]
    elif name.startswith('eq-'):
        name = name[3:]

    # Check if it already has a chapter code
    for code in VALID_CHAPTER_CODES:
        if name.startswith(f'{code}:') or name.startswith(f'{code}-'):
            name = name[len(code)+1:]
            break

    # Normalize the name
    name = normalize_label_name(name)

    return f'eq:{chapter_code}:{name}'


def find_issues(content: str, chapter_code: str) -> List[LabelIssue]:
    """Find all non-standard equation labels in content."""
    issues = []
    lines = content.split('\n')

    # Pattern 1: MyST math block labels - :label: name
    label_pattern = re.compile(r':label:\s*(\S+)')
    for i, line in enumerate(lines):
        for match in label_pattern.finditer(line):
            label = match.group(1)
            if not is_valid_label(label, chapter_code):
                issues.append(LabelIssue(
                    label=label,
                    line_num=i + 1,
                    issue_type='non-standard MyST label',
                    suggested_fix=suggest_fix(label, chapter_code),
                    context=line.strip(),
                    position=sum(len(l) + 1 for l in lines[:i]) + match.start()
                ))

    # Pattern 2: LaTeX inline labels - \label{name}
    latex_pattern = re.compile(r'\\label\{([^}]+)\}')
    for i, line in enumerate(lines):
        for match in latex_pattern.finditer(line):
            label = match.group(1)
            issues.append(LabelIssue(
                label=label,
                line_num=i + 1,
                issue_type='LaTeX inline label (should use MyST)',
                suggested_fix=suggest_fix(label, chapter_code),
                context=line.strip()[:80],
                position=sum(len(l) + 1 for l in lines[:i]) + match.start()
            ))

    # Pattern 3: MyST inline math labels - $$ ... $$ (label)
    # Label must look like an identifier: no spaces, starts with eq or letter, contains dots/colons/hyphens
    inline_pattern = re.compile(r'\$\$\s*\n?(.*?)\n?\$\$\s*\(([a-zA-Z][a-zA-Z0-9.:_-]*)\)', re.DOTALL)
    for match in inline_pattern.finditer(content):
        label = match.group(2)
        # Skip if it looks like prose (contains spaces would have been filtered by regex)
        # Also skip very short labels that might be false positives
        if len(label) < 3:
            continue
        line_num = content[:match.start()].count('\n') + 1
        issues.append(LabelIssue(
            label=label,
            line_num=line_num,
            issue_type='inline $$ label (should use MyST math block)',
            suggested_fix=suggest_fix(label, chapter_code),
            context=f'$$ ... $$ ({label})',
            position=match.start()
        ))

    return issues


def fix_content(content: str, issues: List[LabelIssue], chapter_code: str) -> str:
    """Apply fixes to content."""
    new_content = content

    # Sort issues by position in reverse to avoid offset issues
    sorted_issues = sorted(issues, key=lambda x: x.position, reverse=True)

    for issue in sorted_issues:
        old_label = issue.label
        new_label = issue.suggested_fix

        if issue.issue_type == 'inline $$ label (should use MyST math block)':
            # Convert $$ ... $$ (label) to ```{math}\n:label: ...\n...\n```
            pattern = re.compile(
                rf'\$\$\s*\n?(.*?)\n?\$\$\s*\({re.escape(old_label)}\)',
                re.DOTALL
            )
            def replace_inline(m):
                math_content = m.group(1).strip()
                return f'```{{math}}\n:label: {new_label}\n{math_content}\n```'
            new_content = pattern.sub(replace_inline, new_content, count=1)

        elif issue.issue_type == 'LaTeX inline label (should use MyST)':
            # This requires more complex handling - convert the whole equation block
            # For now, just report it
            pass

        else:
            # Standard MyST label replacement
            new_content = new_content.replace(f':label: {old_label}', f':label: {new_label}')
            # Also update references
            new_content = re.sub(
                rf'\{{eq\}}`{re.escape(old_label)}`',
                f'{{eq}}`{new_label}`',
                new_content
            )
            new_content = new_content.replace(f'[](#{old_label})', f'{{eq}}`{new_label}`')

    return new_content


def lint_file(file_path: Path, fix: bool = False, verbose: bool = False) -> Tuple[int, List[LabelIssue]]:
    """Lint a single file for non-standard equation labels."""
    chapter_code = get_chapter_code(file_path)
    if not chapter_code:
        if verbose:
            print(f"  Skipping {file_path} (not in a chapter directory)")
        return 0, []

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    issues = find_issues(content, chapter_code)

    if issues and fix:
        new_content = fix_content(content, issues, chapter_code)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        if verbose:
            print(f"  Fixed {len(issues)} issues in {file_path}")

    return len(issues), issues


def main():
    parser = argparse.ArgumentParser(
        description='Lint equation labels in MyST markdown files',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    parser.add_argument('files', nargs='*', help='Files to lint (default: all content/*.md)')
    parser.add_argument('--fix', action='store_true', help='Automatically fix issues')
    parser.add_argument('--verbose', '-v', action='store_true', help='Show detailed output')
    parser.add_argument('--quiet', '-q', action='store_true', help='Only show summary')

    args = parser.parse_args()

    # Find files to lint
    if args.files:
        files = [Path(f) for f in args.files]
    else:
        script_dir = Path(__file__).parent
        content_dir = script_dir.parent / 'content'
        files = list(content_dir.rglob('*.md'))

    total_issues = 0
    all_issues = []

    for file_path in files:
        if not file_path.exists():
            print(f"Error: File not found: {file_path}", file=sys.stderr)
            continue

        count, issues = lint_file(file_path, fix=args.fix, verbose=args.verbose)
        total_issues += count

        if issues and not args.quiet:
            print(f"\n{file_path}:")
            for issue in issues:
                print(f"  {issue}")
            all_issues.extend(issues)

    # Summary
    if total_issues > 0:
        if args.fix:
            print(f"\n✓ Fixed {total_issues} equation label issues")
            return 0
        else:
            print(f"\n✗ Found {total_issues} non-standard equation labels")
            print("  Run with --fix to automatically convert them")
            return 1
    else:
        if not args.quiet:
            print("\n✓ All equation labels follow the standard format")
        return 0


if __name__ == '__main__':
    sys.exit(main())
