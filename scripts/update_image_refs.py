#!/usr/bin/env python3
"""
Update markdown references to match the renamed image files.
"""

import os
from pathlib import Path
from collections import defaultdict

CHAPTERS = [
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

def get_image_mappings():
    """Create mapping of actual image filenames."""
    mappings = defaultdict(dict)

    for chapter_dir in CHAPTERS:
        images_dir = Path(chapter_dir) / "Images"
        if not images_dir.exists():
            continue

        # Get all images in the directory
        for ext in ['*.png', '*.jpg', '*.jpeg', '*.webp', '*.svg']:
            for img in images_dir.glob(ext):
                # Store the actual filename
                mappings[chapter_dir][img.name.lower()] = img.name

    return mappings

def update_markdown_files():
    """Update all markdown references to match actual filenames."""
    mappings = get_image_mappings()

    for chapter_dir in CHAPTERS:
        chapter_path = Path(chapter_dir)
        if not chapter_path.exists():
            continue

        # Find all markdown files
        md_files = list(chapter_path.glob("*.md")) + list(chapter_path.glob("Problems/*.md"))

        for md_file in md_files:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content

            # Find all image references in this file
            import re
            pattern = r'(Images/)([\w\d_\-\.]+\.(png|jpg|jpeg|webp|svg))'

            def replace_func(match):
                prefix = match.group(1)
                filename = match.group(2)
                filename_lower = filename.lower()

                # Check if we have a mapping for this file
                if filename_lower in mappings[chapter_dir]:
                    actual_name = mappings[chapter_dir][filename_lower]
                    return prefix + actual_name

                return match.group(0)  # Return original if no mapping found

            content = re.sub(pattern, replace_func, content, flags=re.IGNORECASE)

            if content != original_content:
                with open(md_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated: {md_file}")

if __name__ == "__main__":
    update_markdown_files()
    print("\nDone!")