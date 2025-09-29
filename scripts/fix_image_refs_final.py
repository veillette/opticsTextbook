#!/usr/bin/env python3
"""
Final fix for image references - map old names to new standardized names.
"""

import re
from pathlib import Path

def to_snake_case(name):
    """Convert name to snake_case."""
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    s2 = re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1)
    return s2.lower()

def standardize_name(old_name):
    """Convert old filename pattern to new standardized pattern."""
    # Extract parts
    match = re.match(r'^(\d{2}_\d{2}_)(.+)(\.\w+)$', old_name)
    if not match:
        # No prefix, just standardize the whole name
        name, ext = old_name.rsplit('.', 1)
        result = to_snake_case(name)
        result = re.sub(r'_+', '_', result)
        result = result.replace('-', '_').replace('.', '_')
        result = result.replace('si_o2', 'sio2').replace('si_o_2', 'sio2')
        return result + '.' + ext

    prefix, body, ext = match.groups()

    # Remove vestigial prefixes
    body = re.sub(r'^[A-Za-z]+_\d+[a-z]?_', '', body)
    body = re.sub(r'^\d+_\d+[a-z]?_', '', body)

    # Remove date suffixes
    body = re.sub(r'_\d{6}(?=\.|$)', '', body)

    # Convert to snake_case
    body = to_snake_case(body)

    # Clean special characters
    body = body.replace('-', '_').replace('.', '_')

    # Remove multiple underscores
    body = re.sub(r'_+', '_', body).strip('_')

    # Fix specific patterns
    body = body.replace('si_o2', 'sio2').replace('si_o_2', 'sio2')

    return prefix + body + ext

def update_file(filepath):
    """Update image references in a markdown file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Find all image references
    pattern = r'(Images/)([\w\d_\-\.]+)'

    def replace_func(match):
        prefix = match.group(1)
        old_name = match.group(2)

        # Standardize the name
        new_name = standardize_name(old_name)

        return prefix + new_name

    content = re.sub(pattern, replace_func, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True

    return False

def main():
    """Update all markdown files."""
    chapters = [
        "content/Chap01Basics",
        "content/Chap02GeometricalOptics",
        "content/Chap03OpticalInstrument",
        "content/Chap04Polarization",
        "content/Chap05Wave",
        "content/Chap06Interference",
        "content/Chap07Diffraction",
        "content/Chap08Lasers",
        "content/Chap09AdvancedInstruments",
        "content/Chap10FiberOptics",
        "content/Chap11RayMatrix",
    ]

    updated_count = 0

    for chapter_dir in chapters:
        chapter_path = Path(chapter_dir)
        if not chapter_path.exists():
            continue

        # Find all markdown files
        md_files = list(chapter_path.glob("*.md")) + list(chapter_path.glob("Problems/*.md"))

        for md_file in md_files:
            if update_file(md_file):
                print(f"Updated: {md_file}")
                updated_count += 1

    print(f"\nUpdated {updated_count} files")

if __name__ == "__main__":
    main()