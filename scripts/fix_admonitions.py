#!/usr/bin/env python3
"""
Fix unsupported admonition types for Typst export.
Converts tip, important, and generic admonition blocks to supported types.
"""
import re
import sys
from pathlib import Path

def fix_admonitions_in_file(filepath):
    """Fix admonitions in a single markdown file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes_made = []

    # Pattern to match admonition blocks
    # Matches: ```{admonition} Title\n or ```{tip}\n or ```{important}\n

    # Fix generic admonitions with custom titles
    # Convert ```{admonition} Custom Title to ```{note} Custom Title
    pattern_admonition = r'```\{admonition\}([^\n]*)\n'
    if re.search(pattern_admonition, content):
        content = re.sub(pattern_admonition, r'```{note}\1\n', content)
        changes_made.append("admonition → note")

    # Fix tip admonitions - convert to note with "Tip:" prefix
    pattern_tip = r'```\{tip\}\n'
    if re.search(pattern_tip, content):
        # For tip blocks, we need to add "Tip" as the title
        # This is a bit tricky as we need to handle the content properly
        # For now, convert to note and rely on context
        content = re.sub(pattern_tip, '```{note}\n:class: tip\n\n**Tip:** ', content)
        changes_made.append("tip → note with Tip prefix")

    # Fix important admonitions - convert to warning with "Important:" prefix
    pattern_important = r'```\{important\}\n'
    if re.search(pattern_important, content):
        content = re.sub(pattern_important, '```{warning}\n:class: important\n\n**Important:** ', content)
        changes_made.append("important → warning with Important prefix")

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes_made
    return False, []

def main():
    """Process all markdown files in the content directory."""
    content_dir = Path('/home/user/opticsTextbook/content')

    if not content_dir.exists():
        print(f"Error: Content directory not found: {content_dir}")
        sys.exit(1)

    markdown_files = list(content_dir.rglob('*.md'))

    print(f"Found {len(markdown_files)} markdown files")
    print("=" * 60)

    total_changed = 0
    for filepath in markdown_files:
        changed, changes = fix_admonitions_in_file(filepath)
        if changed:
            total_changed += 1
            rel_path = filepath.relative_to(content_dir)
            print(f"✓ {rel_path}")
            for change in changes:
                print(f"  - {change}")

    print("=" * 60)
    print(f"Modified {total_changed} files")

    if total_changed == 0:
        print("No changes needed!")
    else:
        print("\nAdmonitions have been converted to supported types.")
        print("Run 'npx myst build --typst' to verify the fixes.")

if __name__ == '__main__':
    main()
