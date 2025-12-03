#!/usr/bin/env python3
"""
Bulk Fence Converter for MyST Markdown

Converts MyST directives from colon fences (:::) to backtick fences (```)
to comply with MYST_CONVENTIONS.md (updated to prefer backticks for IDE support)

Usage:
    python convert_fences.py [--dry-run] [--content-dir DIR] [--file FILE]

Options:
    --dry-run       Show changes without applying them
    --content-dir   Convert all files in directory (default: content)
    --file          Convert a single file
    --verbose       Show detailed conversion info
"""

import os
import re
import sys
import argparse
from pathlib import Path
from collections import defaultdict
from typing import List, Union, DefaultDict

# Import shared utilities for logging support
from shared_utils import logger

class FenceConverter:
    """Converts colon directive fences to backtick fences."""

    # Directives that should use backtick fences
    BACKTICK_FENCE_DIRECTIVES = [
        'note', 'warning', 'important', 'tip', 'caution', 'attention',
        'danger', 'error', 'hint', 'seealso', 'admonition',
        'dropdown', 'card', 'tab-set', 'tab-item',
        'figure', 'subfigure', 'video', 'image',
        'proof', 'theorem', 'lemma', 'definition', 'example', 'exercise',
        'grid', 'column', 'margin', 'sidebar',
        'epigraph', 'bibliography', 'glossary', 'list-table'
    ]

    def __init__(self, dry_run: bool = False, verbose: bool = False) -> None:
        self.dry_run: bool = dry_run
        self.verbose: bool = verbose
        self.stats: DefaultDict[str, int] = defaultdict(int)

    def convert_file(self, file_path: Union[str, Path]) -> bool:
        """Convert a single file."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
                original_lines = original_content.splitlines(keepends=True)

            converted_lines = self._convert_lines(original_lines, file_path)
            converted_content = ''.join(converted_lines)

            if converted_content == original_content:
                if self.verbose:
                    print(f"✓ {file_path}: No changes needed")
                return False

            changes = self._count_changes(original_content, converted_content)

            if self.dry_run:
                print(f"🔍 {file_path}: Would convert {changes} directives")
                if self.verbose:
                    self._show_diff(original_lines, converted_lines)
            else:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(converted_content)
                print(f"✅ {file_path}: Converted {changes} directives")

            self.stats['files_modified'] += 1
            self.stats['directives_converted'] += changes
            return True

        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
            return False

    def _convert_lines(self, lines: List[str], file_path: Union[str, Path]) -> List[str]:
        """Convert directives in lines."""
        converted = []
        i = 0

        while i < len(lines):
            line = lines[i]

            # Check for colon directive opening
            match = re.match(r'^(\s*):::\{(' + '|'.join(self.BACKTICK_FENCE_DIRECTIVES) + r')\}(.*)$', line)

            if match:
                indent = match.group(1)
                directive_name = match.group(2)
                rest = match.group(3).strip()

                # Convert opening fence - keep rest on same line if present
                if rest:
                    converted.append(f"{indent}```{{{directive_name}}} {rest}\n")
                else:
                    converted.append(f"{indent}```{{{directive_name}}}\n")

                i += 1

                # Process content until closing fence
                while i < len(lines):
                    content_line = lines[i]

                    # Check for closing colon fence
                    closing_match = re.match(r'^(\s*):::\s*$', content_line)
                    if closing_match:
                        # Convert closing fence to backticks (use same or parent indentation)
                        converted.append(f"{indent}```\n")
                        i += 1
                        break
                    else:
                        # Keep content as-is
                        converted.append(content_line)
                        i += 1
            else:
                # Not a directive, keep as-is
                converted.append(line)
                i += 1

        return converted

    def _count_changes(self, original: str, converted: str) -> int:
        """Count number of directives converted."""
        # Count colons in original
        count = 0
        for directive in self.BACKTICK_FENCE_DIRECTIVES:
            count += original.count(f':::{{{directive}}}')
        return count

    def _show_diff(self, original_lines: List[str], converted_lines: List[str]) -> None:
        """Show line-by-line diff."""
        for i, (orig, conv) in enumerate(zip(original_lines, converted_lines), 1):
            if orig != conv:
                print(f"  Line {i}:")
                print(f"    - {orig.rstrip()}")
                print(f"    + {conv.rstrip()}")

def process_directory(content_dir: str, converter: FenceConverter) -> None:
    """Process all markdown files in directory."""
    md_files = []
    for root, dirs, files in os.walk(content_dir):
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))

    if not md_files:
        print(f"No markdown files found in {content_dir}")
        return

    print(f"Found {len(md_files)} markdown files to process\n")

    for md_file in sorted(md_files):
        converter.convert_file(md_file)

    print(f"\n=== SUMMARY ===")
    if converter.dry_run:
        print(f"Dry run - no files were modified")
    print(f"Files that need/needed conversion: {converter.stats['files_modified']}")
    print(f"Total directives converted: {converter.stats['directives_converted']}")

def main() -> int:
    parser = argparse.ArgumentParser(
        description='Convert MyST directive fences from backticks to colons'
    )
    parser.add_argument('--dry-run', action='store_true',
                       help='Show changes without applying them')
    parser.add_argument('--content-dir', default='content',
                       help='Content directory to process (default: content)')
    parser.add_argument('--file',
                       help='Convert a single file instead of directory')
    parser.add_argument('--verbose', action='store_true',
                       help='Show detailed conversion info')

    args = parser.parse_args()

    converter = FenceConverter(dry_run=args.dry_run, verbose=args.verbose)

    if args.file:
        if not os.path.exists(args.file):
            print(f"❌ Error: File '{args.file}' not found!")
            return 1
        converter.convert_file(args.file)
    else:
        if not os.path.exists(args.content_dir):
            print(f"❌ Error: Directory '{args.content_dir}' not found!")
            return 1
        process_directory(args.content_dir, converter)

    print("\n✅ Conversion complete!")
    if args.dry_run:
        print("Run without --dry-run to apply changes")
    else:
        print("Run 'myst build' to verify changes")
        print("Run 'python3 scripts/lint_myst_markdown.py' to check remaining issues")

    return 0

if __name__ == "__main__":
    sys.exit(main())
