#!/usr/bin/env python3
"""
Script to fix split equation references in MyST markdown files.

This script finds instances where {eq} or similar roles are at the end of a line
with the backtick-wrapped label on the next line, and joins them properly.

Usage:
    python fix_split_equation_refs.py [--dry-run]
"""

import os
import re
import sys
import argparse
from pathlib import Path
from typing import Tuple, List, Union

# Import shared utilities for logging support
from shared_utils import logger

def fix_split_references(content: str) -> Tuple[str, List[str]]:
    """
    Fix split equation and reference patterns in content.

    Patterns to fix:
    - {eq}\n`label` -> {eq}`label`
    - {numref}\n`label` -> {numref}`label`
    - {ref}\n`label` -> {ref}`label`
    """
    changes = []

    # Pattern to match split references
    # Matches: {role}\n`label` where role is eq, numref, ref, etc.
    pattern = r'\{(eq|numref|ref|doc|cite)\}\s*\n\s*`([^`]+)`'

    def replacement(match):
        role = match.group(1)
        label = match.group(2)
        changes.append(f"Fixed {{{role}}}`{label}`")
        return f'{{{role}}}`{label}`'

    new_content = re.sub(pattern, replacement, content, flags=re.MULTILINE)

    return new_content, changes

def process_file(file_path: Union[str, Path], dry_run: bool = False) -> int:
    """Process a single markdown file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            original_content = f.read()

        new_content, changes = fix_split_references(original_content)

        if changes:
            relative_path = os.path.relpath(file_path, 'content')
            print(f"\n📄 {relative_path}")
            for change in changes:
                print(f"  ✓ {change}")

            if not dry_run:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)

            return len(changes)

        return 0

    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return 0

def find_markdown_files(content_dir: str = 'content') -> List[str]:
    """Find all markdown files in the content directory."""
    md_files = []
    for root, dirs, files in os.walk(content_dir):
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))
    return sorted(md_files)

def main() -> int:
    parser = argparse.ArgumentParser(
        description='Fix split equation references in MyST markdown files'
    )
    parser.add_argument('--dry-run', action='store_true',
                       help='Show what would be fixed without making changes')
    parser.add_argument('--content-dir', default='content',
                       help='Content directory to process (default: content)')

    args = parser.parse_args()

    if not os.path.exists(args.content_dir):
        print(f"❌ Error: Content directory '{args.content_dir}' not found!")
        return 1

    print("=== Fix Split Equation References ===")
    if args.dry_run:
        print("DRY RUN MODE - No files will be modified\n")

    md_files = find_markdown_files(args.content_dir)
    print(f"Found {len(md_files)} markdown files to check\n")

    total_fixes = 0
    files_modified = 0

    for md_file in md_files:
        fixes = process_file(md_file, args.dry_run)
        if fixes > 0:
            total_fixes += fixes
            files_modified += 1

    # Summary
    print(f"\n=== SUMMARY ===")
    if args.dry_run:
        print(f"Would fix {total_fixes} split references in {files_modified} files")
    else:
        print(f"Fixed {total_fixes} split references in {files_modified} files")

    if total_fixes == 0:
        print("✅ No split references found!")

    return 0

if __name__ == "__main__":
    sys.exit(main())
