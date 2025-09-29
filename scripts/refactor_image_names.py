#!/usr/bin/env python3
"""
Refactor image filenames to match their position in the document.
This script:
1. Parses all chapter markdown files
2. Identifies image references in order of appearance
3. Creates a mapping from old to new filenames (with sequential numbering)
4. Renames both image files and their associated .ai source files
5. Updates all references in the markdown files

New filename format: ChapterNum_ImageNum_OriginalName.ext
Example: Newton_rings.jpg -> 01_04_Newton_rings.jpg
"""

import re
import os
import shutil
from pathlib import Path
from collections import defaultdict

# Define chapter mapping
CHAPTERS = [
    ("content/Chap01Basics/Basics.md", "1", "Chap01Basics"),
    ("content/Chap02GeometricalOptics/GeometricalOptics.md", "2", "Chap02GeometricalOptics"),
    ("content/Chap03OpticalInstrument/OpticalInstruments.md", "3", "Chap03OpticalInstrument"),
    ("content/Chap04Polarization/Polarization.md", "4", "Chap04Polarization"),
    ("content/Chap05Wave/Wave.md", "5", "Chap05Wave"),
    ("content/Chap06Interference/InterferenceCoherence.md", "6", "Chap06Interference"),
    ("content/Chap07Diffraction/DiffractiveOptics.md", "7", "Chap07Diffraction"),
    ("content/Chap08Lasers/Lasers.md", "8", "Chap08Lasers"),
    ("content/Chap09AdvancedInstruments/AdvancedInstruments.md", "9", "Chap09AdvancedInstruments"),
    ("content/Chap10FiberOptics/FiberOptics.md", "10", "Chap10FiberOptics"),
    ("content/Chap11RayMatrix/RayMatrix.md", "11", "Chap11RayMatrix"),
]

# Pattern to match MyST figure directives and markdown image syntax
FIGURE_PATTERN = re.compile(r'```\{figure\}\s+([^\n]+)|!\[.*?\]\(([^\)]+)\)')

def extract_images_from_chapter(file_path):
    """Extract all image references from a chapter in order of appearance."""
    images = []

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    for match in FIGURE_PATTERN.finditer(content):
        # Group 1 is for ```{figure} syntax, Group 2 is for ![...](image) syntax
        image_path = match.group(1) if match.group(1) else match.group(2)
        if image_path:
            # Clean up the path
            image_path = image_path.strip()
            # Skip URLs
            if not image_path.startswith('http'):
                images.append(image_path)

    return images

def strip_existing_prefix(filename):
    """Remove existing chapter_number_ prefix if present."""
    # Pattern: starts with digits_digits_ (e.g., "1_01_" or "02_05_")
    pattern = r'^\d+_\d+_'
    return re.sub(pattern, '', filename)

def create_rename_mapping():
    """Create a mapping of old filenames to new filenames based on position."""
    rename_map = {}

    for chapter_file, chapter_num, chapter_dir in CHAPTERS:
        if not os.path.exists(chapter_file):
            print(f"Warning: {chapter_file} not found, skipping...")
            continue

        print(f"\nProcessing Chapter {chapter_num}: {chapter_file}")
        images = extract_images_from_chapter(chapter_file)

        for idx, image_path in enumerate(images, start=1):
            # Convert relative path to absolute
            chapter_path = Path(chapter_file).parent
            full_image_path = (chapter_path / image_path).resolve()

            if not full_image_path.exists():
                print(f"  Warning: Image not found: {full_image_path}")
                continue

            # Get the extension
            ext = full_image_path.suffix

            # Get original basename and strip any existing prefix
            old_basename = full_image_path.stem
            clean_basename = strip_existing_prefix(old_basename)

            # Create new filename: ChapterNum_ImageNum_CleanBaseName.ext
            # Example: 01_04_Newton_rings.jpg
            new_basename = f"{int(chapter_num):02d}_{idx:02d}_{clean_basename}"
            new_filename = f"{new_basename}{ext}"

            # Full paths for renaming
            new_full_path = full_image_path.parent / new_filename

            # Store the mapping
            rename_map[str(full_image_path)] = {
                'new_path': str(new_full_path),
                'old_relative': image_path,
                'new_relative': f"Images/{new_filename}",
                'chapter_file': chapter_file,
                'ai_file': str(full_image_path.with_suffix('.ai'))
            }

            print(f"  [{idx:02d}] {full_image_path.name} -> {new_filename}")

    return rename_map

def perform_rename(rename_map, dry_run=True):
    """Rename image files and their associated .ai files."""
    renamed_count = 0

    for old_path, info in rename_map.items():
        new_path = info['new_path']
        ai_old = info['ai_file']
        ai_new = Path(new_path).with_suffix('.ai')

        if dry_run:
            print(f"[DRY RUN] Would rename: {Path(old_path).name} -> {Path(new_path).name}")
            if os.path.exists(ai_old):
                print(f"[DRY RUN] Would rename AI: {Path(ai_old).name} -> {Path(ai_new).name}")
        else:
            # Rename image file
            if os.path.exists(old_path) and old_path != new_path:
                shutil.move(old_path, new_path)
                print(f"Renamed: {Path(old_path).name} -> {Path(new_path).name}")
                renamed_count += 1

            # Rename .ai file if it exists
            if os.path.exists(ai_old) and str(ai_old) != str(ai_new):
                shutil.move(ai_old, str(ai_new))
                print(f"Renamed AI: {Path(ai_old).name} -> {Path(ai_new).name}")

    return renamed_count

def update_markdown_references(rename_map, dry_run=True):
    """Update all markdown file references to use new image names."""
    # Group by chapter file
    updates_by_file = defaultdict(list)
    for old_path, info in rename_map.items():
        updates_by_file[info['chapter_file']].append(info)

    for chapter_file, updates in updates_by_file.items():
        if not os.path.exists(chapter_file):
            continue

        with open(chapter_file, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Sort by old_relative length (longest first) to avoid partial replacements
        updates.sort(key=lambda x: len(x['old_relative']), reverse=True)

        for info in updates:
            old_rel = info['old_relative']
            new_rel = info['new_relative']

            # Replace in both figure directive and markdown image syntax
            content = content.replace(old_rel, new_rel)

        if content != original_content:
            if dry_run:
                print(f"[DRY RUN] Would update references in: {chapter_file}")
            else:
                with open(chapter_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated references in: {chapter_file}")

def main():
    import argparse

    parser = argparse.ArgumentParser(description='Refactor image filenames to match document position')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be done without making changes')
    parser.add_argument('--execute', action='store_true', help='Actually perform the renaming and updates')

    args = parser.parse_args()

    if not args.dry_run and not args.execute:
        print("Please specify --dry-run to preview changes or --execute to apply them")
        return

    dry_run = args.dry_run

    print("=" * 80)
    print("Image Refactoring Script")
    print("=" * 80)

    # Create rename mapping
    print("\n[STEP 1] Creating rename mapping...")
    rename_map = create_rename_mapping()

    print(f"\nTotal images to rename: {len(rename_map)}")

    # Perform file renames
    print("\n[STEP 2] Renaming files...")
    renamed_count = perform_rename(rename_map, dry_run=dry_run)

    # Update markdown references
    print("\n[STEP 3] Updating markdown references...")
    update_markdown_references(rename_map, dry_run=dry_run)

    print("\n" + "=" * 80)
    if dry_run:
        print("DRY RUN COMPLETE - No changes were made")
        print("Run with --execute to apply changes")
    else:
        print(f"COMPLETE - Renamed {renamed_count} images and updated references")
    print("=" * 80)

if __name__ == "__main__":
    main()