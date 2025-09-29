#!/usr/bin/env python3
"""
Standardize image filenames by:
1. Using snake_case (lowercase with underscores)
2. Removing vestigial number prefixes (e.g., "Fiber_03_" in "10_03_Fiber_03_mode_waveguide.png")
3. Removing date suffixes (e.g., "_210308", "_220405")
4. Standardizing common patterns
5. Updating all references in markdown files
"""

import re
import os
import shutil
from pathlib import Path
from collections import defaultdict

# Define chapters
CHAPTERS = [
    ("content/Chap01Basics/Basics.md", "Chap01Basics"),
    ("content/Chap02GeometricalOptics/GeometricalOptics.md", "Chap02GeometricalOptics"),
    ("content/Chap03OpticalInstrument/OpticalInstruments.md", "Chap03OpticalInstrument"),
    ("content/Chap04Polarization/Polarization.md", "Chap04Polarization"),
    ("content/Chap05Wave/Wave.md", "Chap05Wave"),
    ("content/Chap06Interference/InterferenceCoherence.md", "Chap06Interference"),
    ("content/Chap07Diffraction/DiffractiveOptics.md", "Chap07Diffraction"),
    ("content/Chap08Lasers/Lasers.md", "Chap08Lasers"),
    ("content/Chap09AdvancedInstruments/AdvancedInstruments.md", "Chap09AdvancedInstruments"),
    ("content/Chap10FiberOptics/FiberOptics.md", "Chap10FiberOptics"),
    ("content/Chap11RayMatrix/RayMatrix.md", "Chap11RayMatrix"),
]

def to_snake_case(name):
    """Convert name to snake_case."""
    # Insert underscore before uppercase letters that follow lowercase letters
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    # Insert underscore before uppercase letters that follow lowercase or uppercase+lowercase
    s2 = re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1)
    # Convert to lowercase
    return s2.lower()

def remove_vestigial_prefix(basename, chapter_prefix):
    """
    Remove vestigial number prefixes like:
    - "10_03_Fiber_03_mode_waveguide" -> "10_03_mode_waveguide"
    - "02_05_2_05a_ConicSection" -> "02_05_conic_section_a"
    - "03_07_3_06b_Accomodation_eye" -> "03_07_accomodation_eye_b"
    """
    # Pattern: chapter_num_image_num_XXX_YY_... where XXX might be "Fiber", number, etc.
    # and YY is a duplicate number pattern

    # First, extract the chapter_num_image_num prefix (e.g., "10_03_")
    match = re.match(r'^(\d{2}_\d{2}_)', basename)
    if not match:
        return basename

    prefix = match.group(1)
    rest = basename[len(prefix):]

    # Remove patterns like "Fiber_03_", "2_05a_", "3_06b_", etc.
    # Pattern: Word_Number_ or Number_Number[letter]_
    rest = re.sub(r'^[A-Za-z]+_\d+[a-z]?_', '', rest)
    rest = re.sub(r'^\d+_\d+[a-z]?_', '', rest)

    return prefix + rest

def remove_date_suffix(name):
    """Remove date suffixes like _210308, _220405, etc."""
    return re.sub(r'_\d{6}(?=\.|$)', '', name)

def remove_suffix_codes(name):
    """Remove single letter/number suffixes like _a, _f1, _BW at the end."""
    # Keep these for now as they might be meaningful (version indicators)
    return name

def standardize_acronyms(name):
    """Standardize common acronyms to lowercase."""
    # Replace common patterns - do this before snake_case conversion
    replacements = {
        '_bw': '_bw',
        '_euv': '_euv',
        'afov': 'afov',
        'asml': 'asml',
        'nsom': 'nsom',
        'sted': 'sted',
        'vcsel': 'vcsel',
        'si_o2': 'sio2',
        'si_o_2': 'sio2',
    }

    for old, new in replacements.items():
        name = name.replace(old, new)

    return name

def clean_special_chars(name):
    """Clean up special characters and normalize spacing."""
    # Replace hyphens with underscores
    name = name.replace('-', '_')

    # Replace dots with underscores (except in extensions)
    name = name.replace('.', '_')

    # Remove multiple consecutive underscores
    name = re.sub(r'_+', '_', name)

    return name

def standardize_filename(filepath):
    """Apply all standardization rules to a filename."""
    path = Path(filepath)
    basename = path.stem
    ext = path.suffix

    # Extract chapter number from beginning
    match = re.match(r'^(\d{2}_\d{2}_)', basename)
    if not match:
        # Not in our standard format, just apply basic cleanup
        new_name = to_snake_case(basename)
        new_name = remove_date_suffix(new_name)
        new_name = clean_special_chars(new_name)
        new_name = standardize_acronyms(new_name)
        return new_name + ext

    prefix = match.group(1)  # e.g., "10_03_"
    rest = basename[len(prefix):]

    # Remove vestigial prefixes
    rest = re.sub(r'^[A-Za-z]+_\d+[a-z]?_', '', rest)
    rest = re.sub(r'^\d+_\d+[a-z]?_', '', rest)

    # Remove date suffixes
    rest = remove_date_suffix(rest)

    # Convert to snake_case
    rest = to_snake_case(rest)

    # Clean special characters
    rest = clean_special_chars(rest)

    # Standardize acronyms
    rest = standardize_acronyms(rest)

    # Remove trailing underscores
    rest = rest.rstrip('_')

    new_basename = prefix + rest

    return new_basename + ext

def find_all_images():
    """Find all image files in chapter directories."""
    images = []

    for chapter_file, chapter_dir in CHAPTERS:
        images_dir = Path(chapter_file).parent / "Images"
        if not images_dir.exists():
            continue

        for ext in ['*.png', '*.jpg', '*.jpeg', '*.webp', '*.svg']:
            for img in images_dir.glob(ext):
                images.append(img)

    return images

def create_rename_mapping(images):
    """Create mapping from old to new filenames."""
    rename_map = {}

    for img_path in images:
        new_filename = standardize_filename(img_path.name)

        if img_path.name != new_filename:
            new_path = img_path.parent / new_filename

            rename_map[str(img_path)] = {
                'new_path': str(new_path),
                'old_name': img_path.name,
                'new_name': new_filename,
                'ai_old': str(img_path.with_suffix('.ai')),
                'ai_new': str(new_path.with_suffix('.ai'))
            }

    return rename_map

def perform_rename(rename_map, dry_run=True):
    """Rename image files and their associated .ai files."""
    renamed_count = 0

    for old_path, info in sorted(rename_map.items()):
        if dry_run:
            print(f"[DRY RUN] {info['old_name']} -> {info['new_name']}")
            if os.path.exists(info['ai_old']):
                print(f"[DRY RUN]   + AI file")
        else:
            # Rename image file
            if os.path.exists(old_path):
                shutil.move(old_path, info['new_path'])
                print(f"Renamed: {info['old_name']} -> {info['new_name']}")
                renamed_count += 1

            # Rename .ai file if it exists
            if os.path.exists(info['ai_old']):
                shutil.move(info['ai_old'], info['ai_new'])
                print(f"  + AI file")

    return renamed_count

def update_markdown_references(rename_map, dry_run=True):
    """Update all markdown file references to use new image names."""
    # Group by chapter directory
    updates_by_chapter = defaultdict(list)

    for old_path, info in rename_map.items():
        chapter_dir = Path(old_path).parent.parent
        updates_by_chapter[chapter_dir].append(info)

    for chapter_dir, updates in updates_by_chapter.items():
        # Find all markdown files in this chapter
        md_files = list(chapter_dir.glob("*.md")) + list(chapter_dir.glob("Problems/*.md"))

        for md_file in md_files:
            if not md_file.exists():
                continue

            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content

            # Sort by old_name length (longest first) to avoid partial replacements
            updates.sort(key=lambda x: len(x['old_name']), reverse=True)

            for info in updates:
                # Replace references to the old filename with the new one
                old_name = info['old_name']
                new_name = info['new_name']

                # Replace in figure directives and image links
                content = content.replace(f"Images/{old_name}", f"Images/{new_name}")

            if content != original_content:
                if dry_run:
                    print(f"[DRY RUN] Would update: {md_file}")
                else:
                    with open(md_file, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated: {md_file}")

def main():
    import argparse

    parser = argparse.ArgumentParser(description='Standardize image filenames')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be done without making changes')
    parser.add_argument('--execute', action='store_true', help='Actually perform the renaming and updates')

    args = parser.parse_args()

    if not args.dry_run and not args.execute:
        print("Please specify --dry-run to preview changes or --execute to apply them")
        return

    dry_run = args.dry_run

    print("=" * 80)
    print("Filename Standardization Script")
    print("=" * 80)

    # Find all images
    print("\n[STEP 1] Finding all images...")
    images = find_all_images()
    print(f"Found {len(images)} images")

    # Create rename mapping
    print("\n[STEP 2] Creating rename mapping...")
    rename_map = create_rename_mapping(images)
    print(f"Files to rename: {len(rename_map)}")

    if len(rename_map) == 0:
        print("\nNo files need renaming!")
        return

    # Show changes
    print("\n[STEP 3] Proposed changes:")
    print("-" * 80)
    perform_rename(rename_map, dry_run=True)

    if not dry_run:
        print("\n[STEP 4] Performing renames...")
        renamed_count = perform_rename(rename_map, dry_run=False)

        print("\n[STEP 5] Updating markdown references...")
        update_markdown_references(rename_map, dry_run=False)

        print("\n" + "=" * 80)
        print(f"COMPLETE - Renamed {renamed_count} files and updated references")
        print("=" * 80)
    else:
        print("\n[STEP 4] Updating markdown references...")
        update_markdown_references(rename_map, dry_run=True)

        print("\n" + "=" * 80)
        print("DRY RUN COMPLETE - No changes were made")
        print("Run with --execute to apply changes")
        print("=" * 80)

if __name__ == "__main__":
    main()