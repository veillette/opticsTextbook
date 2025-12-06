#!/usr/bin/env python3
"""
Lint All Labels (Figures, Tables, Sections, Chapters)

This script checks for non-standard labels in MyST markdown files for:
- Figure labels
- Table labels
- Section labels
- Chapter labels
- Appendix labels

Standard formats:
  - Figure: fig:chapter-code:descriptive-name
  - Table: table:chapter-code:descriptive-name
  - Section: (sec:chapter-code:descriptive-name)=
  - Chapter: (chapter:chapter-code)=
  - Appendix: (appendix:descriptive-name)=

Chapter codes: basics, geo, inst, pol, wave, coh, diff, laser, adv, fiber, ray

Usage:
  python lint_all_labels.py [--fix] [--verbose] [file_path ...]

  --fix: Automatically fix non-standard labels
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
from collections import defaultdict

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
                 suggested_fix: str, context: str, label_category: str):
        self.label = label
        self.line_num = line_num
        self.issue_type = issue_type
        self.suggested_fix = suggested_fix
        self.context = context
        self.label_category = label_category  # 'figure', 'table', 'section', 'chapter', 'appendix'

    def __str__(self):
        return f"Line {self.line_num}: [{self.label_category}] {self.issue_type} - '{self.label}' -> '{self.suggested_fix}'"


def get_chapter_code(file_path: Path) -> Optional[str]:
    """Extract chapter code from file path."""
    path_str = str(file_path)
    for chapter_dir, code in CHAPTER_CODES.items():
        if chapter_dir in path_str:
            return code
    # Check for appendices
    if 'Appendix' in path_str or 'Appendices' in path_str:
        return 'appendix'
    # Check for Preface/Author
    if 'Preface' in path_str or 'Author' in path_str:
        return 'preface'
    return None


def normalize_label_name(name: str) -> str:
    """Convert a label name to the standard format (lowercase, hyphens)."""
    # Convert underscores to hyphens
    name = name.replace('_', '-')
    # Convert camelCase to hyphen-separated
    name = re.sub(r'([a-z])([A-Z])', r'\1-\2', name)
    # Convert to lowercase
    name = name.lower()
    # Remove any invalid characters (keep letters, numbers, hyphens)
    name = re.sub(r'[^a-z0-9-]', '-', name)
    # Remove consecutive hyphens
    name = re.sub(r'-+', '-', name)
    # Remove leading/trailing hyphens
    name = name.strip('-')
    return name


def is_valid_figure_label(label: str, chapter_code: str) -> bool:
    """Check if a figure label follows the standard format."""
    if chapter_code in ['appendix', 'preface']:
        # Appendix/preface figures can use simplified format
        pattern = r'^fig:[a-z0-9]([a-z0-9-]*[a-z0-9])?$'
    else:
        pattern = rf'^fig:{chapter_code}:[a-z0-9]([a-z0-9-]*[a-z0-9])?$'
    return bool(re.match(pattern, label))


def is_valid_table_label(label: str, chapter_code: str) -> bool:
    """Check if a table label follows the standard format."""
    if chapter_code in ['appendix', 'preface']:
        pattern = r'^table:[a-z0-9]([a-z0-9-]*[a-z0-9])?$'
    else:
        pattern = rf'^table:{chapter_code}:[a-z0-9]([a-z0-9-]*[a-z0-9])?$'
    return bool(re.match(pattern, label))


def is_valid_section_label(label: str, chapter_code: str) -> bool:
    """Check if a section label follows the standard format."""
    if chapter_code in ['appendix', 'preface']:
        pattern = r'^sec:[a-z0-9]([a-z0-9-]*[a-z0-9])?$'
    else:
        pattern = rf'^sec:{chapter_code}:[a-z0-9]([a-z0-9-]*[a-z0-9])?$'
    return bool(re.match(pattern, label))


def is_valid_chapter_label(label: str) -> bool:
    """Check if a chapter label follows the standard format."""
    pattern = r'^chapter:[a-z0-9]+$'
    return bool(re.match(pattern, label))


def is_valid_appendix_label(label: str) -> bool:
    """Check if an appendix label follows the standard format."""
    pattern = r'^appendix:[a-z0-9]([a-z0-9-]*[a-z0-9])?$'
    return bool(re.match(pattern, label))


def extract_descriptive_part(label: str) -> str:
    """Extract the descriptive part from various label formats."""
    # Remove common prefixes
    for prefix in ['Fig_', 'fig:', 'fig.', 'fig', 'table_', 'table:', 'table.',
                   'section.', 'subsection.', 'sec:', 'sec.', 'sec',
                   'chapter.', 'chapter:', 'appendix:', 'appendix.']:
        if label.startswith(prefix):
            label = label[len(prefix):]
            break

    # Remove chapter numbers like "2_01_", "10_", etc.
    label = re.sub(r'^\d+[-_]\d*[-_]', '', label)
    label = re.sub(r'^\d+[-_]', '', label)

    # Remove common chapter code prefixes if present
    for code in VALID_CHAPTER_CODES:
        if label.startswith(f'{code}:') or label.startswith(f'{code}-') or label.startswith(f'{code}_'):
            label = label[len(code)+1:]
            break

    # Remove 'Fiber' prefix (common in Chapter 10)
    if label.startswith('Fiber'):
        label = label[5:]

    return label


def suggest_figure_fix(old_label: str, chapter_code: str) -> str:
    """Generate a suggested fix for a non-standard figure label."""
    name = extract_descriptive_part(old_label)
    name = normalize_label_name(name)

    if chapter_code in ['appendix', 'preface']:
        return f'fig:{name}'
    return f'fig:{chapter_code}:{name}'


def suggest_table_fix(old_label: str, chapter_code: str) -> str:
    """Generate a suggested fix for a non-standard table label."""
    name = extract_descriptive_part(old_label)
    name = normalize_label_name(name)

    if chapter_code in ['appendix', 'preface']:
        return f'table:{name}'
    return f'table:{chapter_code}:{name}'


def suggest_section_fix(old_label: str, chapter_code: str) -> str:
    """Generate a suggested fix for a non-standard section label."""
    name = extract_descriptive_part(old_label)
    name = normalize_label_name(name)

    if chapter_code in ['appendix', 'preface']:
        return f'sec:{name}'
    return f'sec:{chapter_code}:{name}'


def suggest_chapter_fix(old_label: str, chapter_code: str) -> str:
    """Generate a suggested fix for a non-standard chapter label."""
    # Extract the chapter name
    name = old_label.replace('chapter.', '').replace('chapter:', '')
    name = normalize_label_name(name)

    # Use the chapter code if available
    if chapter_code and chapter_code in VALID_CHAPTER_CODES:
        return f'chapter:{chapter_code}'
    return f'chapter:{name}'


def suggest_appendix_fix(old_label: str) -> str:
    """Generate a suggested fix for a non-standard appendix label."""
    name = old_label.replace('appendix:', '').replace('appendix.', '')
    name = normalize_label_name(name)
    return f'appendix:{name}'


def find_issues(content: str, chapter_code: str) -> List[LabelIssue]:
    """Find all non-standard labels in content."""
    issues = []
    lines = content.split('\n')

    # Pattern 1: Figure labels in directives (:name: label)
    # Look for figure directives followed by :name:
    figure_pattern = re.compile(r':name:\s*(\S+)')
    in_figure_block = False
    for i, line in enumerate(lines):
        if '```{figure}' in line or '```{image}' in line:
            in_figure_block = True
        elif in_figure_block and line.strip().startswith(':name:'):
            match = figure_pattern.search(line)
            if match:
                label = match.group(1)
                if not is_valid_figure_label(label, chapter_code):
                    issues.append(LabelIssue(
                        label=label,
                        line_num=i + 1,
                        issue_type='non-standard figure label',
                        suggested_fix=suggest_figure_fix(label, chapter_code),
                        context=line.strip(),
                        label_category='figure'
                    ))
        elif in_figure_block and line.strip() == '```':
            in_figure_block = False

    # Pattern 2: Table labels in directives (:name: label)
    table_pattern = re.compile(r':name:\s*(\S+)')
    in_table_block = False
    for i, line in enumerate(lines):
        if '```{table}' in line or '```{list-table}' in line:
            in_table_block = True
        elif in_table_block and line.strip().startswith(':name:'):
            match = table_pattern.search(line)
            if match:
                label = match.group(1)
                if not is_valid_table_label(label, chapter_code):
                    issues.append(LabelIssue(
                        label=label,
                        line_num=i + 1,
                        issue_type='non-standard table label',
                        suggested_fix=suggest_table_fix(label, chapter_code),
                        context=line.strip(),
                        label_category='table'
                    ))
        elif in_table_block and line.strip() == '```':
            in_table_block = False

    # Pattern 3: Section labels (label)=
    section_pattern = re.compile(r'^\(([^)]+)\)\s*=$')
    for i, line in enumerate(lines):
        match = section_pattern.match(line)
        if match:
            label = match.group(1)

            # Determine label type
            if label.startswith('chapter'):
                if not is_valid_chapter_label(label):
                    issues.append(LabelIssue(
                        label=label,
                        line_num=i + 1,
                        issue_type='non-standard chapter label',
                        suggested_fix=suggest_chapter_fix(label, chapter_code),
                        context=line.strip(),
                        label_category='chapter'
                    ))
            elif label.startswith('appendix'):
                if not is_valid_appendix_label(label):
                    issues.append(LabelIssue(
                        label=label,
                        line_num=i + 1,
                        issue_type='non-standard appendix label',
                        suggested_fix=suggest_appendix_fix(label),
                        context=line.strip(),
                        label_category='appendix'
                    ))
            elif label.startswith('sec') or label.startswith('section') or label.startswith('subsection'):
                if not is_valid_section_label(label, chapter_code):
                    issues.append(LabelIssue(
                        label=label,
                        line_num=i + 1,
                        issue_type='non-standard section label',
                        suggested_fix=suggest_section_fix(label, chapter_code),
                        context=line.strip(),
                        label_category='section'
                    ))

    return issues


def fix_content(content: str, issues: List[LabelIssue]) -> Tuple[str, Dict[str, str]]:
    """Apply fixes to content and return mapping of old -> new labels."""
    new_content = content
    label_mapping = {}

    # Group issues by label to handle duplicates
    label_fixes = {}
    for issue in issues:
        label_fixes[issue.label] = issue.suggested_fix

    # Apply replacements
    for old_label, new_label in label_fixes.items():
        label_mapping[old_label] = new_label

        # Replace in :name: directives
        new_content = new_content.replace(f':name: {old_label}', f':name: {new_label}')

        # Replace in (label)= format
        new_content = new_content.replace(f'({old_label})=', f'({new_label})=')

        # Replace references - try various reference formats
        # {numref}`label`
        new_content = re.sub(
            rf'\{{numref\}}`{re.escape(old_label)}`',
            f'{{numref}}`{new_label}`',
            new_content
        )
        # {ref}`label`
        new_content = re.sub(
            rf'\{{ref\}}`{re.escape(old_label)}`',
            f'{{ref}}`{new_label}`',
            new_content
        )
        # [text](#label)
        new_content = re.sub(
            rf'\]\(#{re.escape(old_label)}\)',
            f'](#{new_label})',
            new_content
        )
        # [](#label)
        new_content = re.sub(
            rf'\[\]\(#{re.escape(old_label)}\)',
            f'{{numref}}`{new_label}`',
            new_content
        )

    return new_content, label_mapping


def lint_file(file_path: Path, fix: bool = False, verbose: bool = False) -> Tuple[int, List[LabelIssue], Dict[str, str]]:
    """Lint a single file for non-standard labels."""
    chapter_code = get_chapter_code(file_path)
    if not chapter_code:
        if verbose:
            print(f"  Skipping {file_path} (not in a chapter/appendix directory)")
        return 0, [], {}

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    issues = find_issues(content, chapter_code)
    label_mapping = {}

    if issues and fix:
        new_content, label_mapping = fix_content(content, issues)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        if verbose:
            print(f"  Fixed {len(issues)} issues in {file_path}")

    return len(issues), issues, label_mapping


def main():
    parser = argparse.ArgumentParser(
        description='Lint all labels (figures, tables, sections, chapters) in MyST markdown files',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    parser.add_argument('files', nargs='*', help='Files to lint (default: all content/*.md)')
    parser.add_argument('--fix', action='store_true', help='Automatically fix issues')
    parser.add_argument('--verbose', '-v', action='store_true', help='Show detailed output')
    parser.add_argument('--quiet', '-q', action='store_true', help='Only show summary')
    parser.add_argument('--category', choices=['figure', 'table', 'section', 'chapter', 'appendix', 'all'],
                        default='all', help='Only check specific label category')

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
    category_counts = defaultdict(int)
    all_mappings = {}

    for file_path in files:
        if not file_path.exists():
            print(f"Error: File not found: {file_path}", file=sys.stderr)
            continue

        count, issues, mapping = lint_file(file_path, fix=args.fix, verbose=args.verbose)

        # Filter by category if specified
        if args.category != 'all':
            issues = [i for i in issues if i.label_category == args.category]
            count = len(issues)

        total_issues += count
        all_mappings.update(mapping)

        for issue in issues:
            category_counts[issue.label_category] += 1

        if issues and not args.quiet:
            print(f"\n{file_path}:")
            for issue in issues:
                print(f"  {issue}")
            all_issues.extend(issues)

    # Summary
    if total_issues > 0:
        print(f"\n{'='*60}")
        print("Summary by category:")
        for category in ['figure', 'table', 'section', 'chapter', 'appendix']:
            if category_counts[category] > 0:
                print(f"  {category.capitalize()}: {category_counts[category]} issues")
        print(f"{'='*60}")

        if args.fix:
            print(f"\n✓ Fixed {total_issues} label issues")
            if all_mappings and args.verbose:
                print("\nLabel mappings:")
                for old, new in sorted(all_mappings.items()):
                    print(f"  {old} -> {new}")
            return 0
        else:
            print(f"\n✗ Found {total_issues} non-standard labels")
            print("  Run with --fix to automatically convert them")
            return 1
    else:
        if not args.quiet:
            print("\n✓ All labels follow the standard format")
        return 0


if __name__ == '__main__':
    sys.exit(main())
