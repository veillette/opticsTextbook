#!/usr/bin/env python3
"""
Script to standardize all figure filenames across all chapters.

This script:
1. Scans all image directories for figures that don't follow naming convention
2. Finds where each figure is referenced in markdown documents
3. Determines the correct position-based filename based on order of appearance
4. Renames figures to follow the convention: ChapterNum_ImageNum_descriptive_name.ext
5. Updates all markdown references accordingly
6. Handles both image files and their corresponding .ai source files

Naming Convention:
- Format: ChapterNum_ImageNum_descriptive_name.ext
- ChapterNum: Two-digit chapter number (01-11)
- ImageNum: Two-digit position in chapter (01-99)
- descriptive_name: snake_case description
- Example: 03_07_lens_diagram.png

Usage:
    python scripts/standardize_all_figures.py [--dry-run] [--chapter NUM]

Options:
    --dry-run           Show what would be done without making changes
    --chapter NUM       Only process specific chapter (1-11)
    --verbose           Show detailed processing information
"""

import os
import re
import shutil
import argparse
from pathlib import Path
from collections import defaultdict
from typing import List, Dict, Tuple, Optional

# Import shared utilities
from shared_utils import (
    CHAPTERS, IMAGE_EXTENSIONS,
    to_snake_case, is_properly_named, extract_figure_references,
    extract_descriptive_name, find_markdown_files_in_chapter
)

def get_all_chapter_images(chapter_dir: Path, chapter_num: int) -> List[Dict]:
    """Get all images in a chapter's Images directory."""
    images = []
    images_dir = chapter_dir / "Images"

    if not images_dir.exists():
        return images

    for ext in IMAGE_EXTENSIONS:
        for img_path in images_dir.glob(f"*.{ext}"):
            images.append({
                'filename': img_path.name,
                'path': img_path,
                'extension': ext,
                'properly_named': is_properly_named(img_path.name, chapter_num)
            })

    return images

def build_chapter_reference_order(chapter_dir: Path, chapter_num: int,
                                   images_dir: Path, verbose: bool = False) -> Dict:
    """
    Build a mapping of images to their correct position based on order of appearance in markdown.
    """
    if verbose:
        print(f"\n  Building reference order for Chapter {chapter_num}...")

    # Find all markdown files
    md_files = find_markdown_files_in_chapter(chapter_dir)

    # Track all image references in order
    all_references = []
    seen_images = set()

    for md_file in md_files:
        refs = extract_figure_references(md_file, images_dir)
        for ref in refs:
            # Only add each image once (first occurrence determines position)
            if ref['filename'] not in seen_images:
                all_references.append(ref)
                seen_images.add(ref['filename'])
                if verbose:
                    print(f"    [{len(all_references):02d}] {ref['filename']} (in {md_file.name}:{ref['line']})")

    # Build mapping: old_filename -> {position, descriptive_name, new_filename}
    mapping = {}

    for position, ref in enumerate(all_references, start=1):
        old_filename = ref['filename']
        descriptive_name = extract_descriptive_name(old_filename)
        extension = os.path.splitext(old_filename)[1][1:]  # Remove dot
        new_filename = f"{chapter_num:02d}_{position:02d}_{descriptive_name}.{extension}"

        mapping[old_filename] = {
            'position': position,
            'descriptive_name': descriptive_name,
            'new_filename': new_filename,
            'old_path': ref['full_path'],
            'new_path': images_dir / new_filename,
            'needs_rename': old_filename != new_filename
        }

    return mapping

def find_unreferenced_images(all_images: List[Dict], reference_mapping: Dict) -> List[Dict]:
    """Find images that are not referenced in any markdown file."""
    unreferenced = []

    for img in all_images:
        if img['filename'] not in reference_mapping:
            unreferenced.append(img)

    return unreferenced

def perform_renames(chapter_num: int, reference_mapping: Dict, dry_run: bool = False) -> List[Dict]:
    """Rename images according to the mapping."""
    renamed = []

    # Filter to only those that need renaming
    to_rename = {k: v for k, v in reference_mapping.items() if v['needs_rename']}

    if not to_rename:
        return renamed

    print(f"\n  {'[DRY RUN] ' if dry_run else ''}Renaming {len(to_rename)} images...")

    # Group by position to handle conflicts
    # Rename in reverse order to avoid conflicts
    sorted_items = sorted(to_rename.items(), key=lambda x: x[1]['position'], reverse=True)

    for old_filename, info in sorted_items:
        old_path = info['old_path']
        new_path = info['new_path']

        # Check for conflicts
        if new_path.exists() and new_path != old_path:
            # There's a conflict - need to rename to temporary name first
            temp_path = new_path.parent / f"_temp_{new_path.name}"
            if dry_run:
                print(f"    [Conflict] Would use temporary name: {temp_path.name}")
            else:
                if old_path.exists():
                    shutil.move(str(old_path), str(temp_path))
                    old_path = temp_path

        if dry_run:
            print(f"    {old_filename} -> {info['new_filename']}")
        else:
            if old_path.exists():
                shutil.move(str(old_path), str(new_path))
                print(f"    ✓ {old_filename} -> {info['new_filename']}")
                renamed.append(info)

                # Handle .ai file
                ai_old = old_path.with_suffix('.ai')
                ai_new = new_path.with_suffix('.ai')
                if ai_old.exists():
                    shutil.move(str(ai_old), str(ai_new))
                    print(f"      + AI file renamed")

    return renamed

def update_markdown_files(chapter_dir: Path, reference_mapping: Dict, dry_run: bool = False):
    """Update all markdown files with new image filenames."""
    # Filter to only those that need updating
    to_update = {k: v for k, v in reference_mapping.items() if v['needs_rename']}

    if not to_update:
        return

    print(f"\n  {'[DRY RUN] ' if dry_run else ''}Updating markdown references...")

    md_files = find_markdown_files_in_chapter(chapter_dir)

    for md_file in md_files:
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Update each reference
        for old_filename, info in to_update.items():
            new_filename = info['new_filename']

            # Replace various reference patterns
            # Pattern 1: Images/filename
            content = content.replace(f"Images/{old_filename}", f"Images/{new_filename}")
            # Pattern 2: ../Images/filename
            content = content.replace(f"../Images/{old_filename}", f"../Images/{new_filename}")
            # Pattern 3: Just filename (less common)
            # Use word boundaries to avoid partial matches
            content = re.sub(
                rf'\b{re.escape(old_filename)}\b',
                new_filename,
                content
            )

        if content != original_content:
            if dry_run:
                print(f"    Would update: {md_file.relative_to(chapter_dir)}")
            else:
                with open(md_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"    ✓ Updated: {md_file.relative_to(chapter_dir)}")

def process_chapter(chapter_num: int, dry_run: bool = False, verbose: bool = False):
    """Process a single chapter to standardize all figure names."""
    chapter_dir_name, chapter_file = CHAPTERS[chapter_num]
    chapter_dir = Path(chapter_dir_name)
    images_dir = chapter_dir / "Images"

    print(f"\n{'='*80}")
    print(f"Processing Chapter {chapter_num}: {chapter_dir_name}")
    print(f"{'='*80}")

    if not chapter_dir.exists():
        print(f"  ⚠️  Chapter directory not found: {chapter_dir}")
        return

    if not images_dir.exists():
        print(f"  ⚠️  Images directory not found: {images_dir}")
        return

    # Get all images
    all_images = get_all_chapter_images(chapter_dir, chapter_num)
    properly_named = sum(1 for img in all_images if img['properly_named'])

    print(f"  Total images: {len(all_images)}")
    print(f"  Properly named: {properly_named}")
    print(f"  Need standardization: {len(all_images) - properly_named}")

    # Build reference order from markdown files
    reference_mapping = build_chapter_reference_order(
        chapter_dir, chapter_num, images_dir, verbose
    )

    print(f"  Referenced images: {len(reference_mapping)}")

    # Find unreferenced images
    unreferenced = find_unreferenced_images(all_images, reference_mapping)
    if unreferenced:
        print(f"  ⚠️  Unreferenced images: {len(unreferenced)}")
        if verbose:
            for img in unreferenced[:5]:
                print(f"      - {img['filename']}")
            if len(unreferenced) > 5:
                print(f"      ... and {len(unreferenced) - 5} more")

    # Count how many actually need renaming
    need_rename = sum(1 for v in reference_mapping.values() if v['needs_rename'])

    if need_rename == 0:
        print(f"  ✅ All referenced images already follow naming convention!")
        return

    print(f"  Images to rename: {need_rename}")

    if not dry_run:
        response = input(f"\n  Proceed with renaming in Chapter {chapter_num}? (yes/no): ").lower().strip()
        if response not in ['yes', 'y']:
            print(f"  Skipped Chapter {chapter_num}")
            return

    # Perform renames
    renamed = perform_renames(chapter_num, reference_mapping, dry_run)

    # Update markdown files
    update_markdown_files(chapter_dir, reference_mapping, dry_run)

    # Summary
    print(f"\n  Summary for Chapter {chapter_num}:")
    if dry_run:
        print(f"    [DRY RUN] Would rename {need_rename} images")
    else:
        print(f"    ✓ Renamed {len(renamed)} images")
        print(f"    ✓ Updated markdown references")

def main():
    parser = argparse.ArgumentParser(
        description='Standardize all figure filenames across chapters',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Preview what would be standardized across all chapters
  python scripts/standardize_all_figures.py --dry-run

  # Standardize all chapters
  python scripts/standardize_all_figures.py

  # Standardize only chapter 3
  python scripts/standardize_all_figures.py --chapter 3

  # Standardize chapter 7 with verbose output
  python scripts/standardize_all_figures.py --chapter 7 --verbose --dry-run
        """
    )

    parser.add_argument('--dry-run', action='store_true',
                       help='Show what would be done without making changes')
    parser.add_argument('--chapter', type=int,
                       help='Only process specific chapter (1-11)')
    parser.add_argument('--verbose', action='store_true',
                       help='Show detailed processing information')

    args = parser.parse_args()

    print("="*80)
    print("Figure Filename Standardization Tool")
    print("="*80)
    print("\nThis script will:")
    print("  1. Find all figures that don't follow naming convention")
    print("  2. Determine correct position based on order in markdown")
    print("  3. Rename figures to: ChapterNum_ImageNum_descriptive_name.ext")
    print("  4. Update all markdown references")

    if args.dry_run:
        print("\n⚠️  DRY RUN MODE - No changes will be made")

    # Determine which chapters to process
    if args.chapter:
        if args.chapter not in CHAPTERS:
            print(f"\n❌ Error: Invalid chapter number {args.chapter}. Must be 1-11.")
            return 1
        chapters_to_process = [args.chapter]
    else:
        chapters_to_process = sorted(CHAPTERS.keys())

    # Process each chapter
    total_renamed = 0
    for chapter_num in chapters_to_process:
        try:
            process_chapter(chapter_num, args.dry_run, args.verbose)
        except Exception as e:
            print(f"\n❌ Error processing Chapter {chapter_num}: {e}")
            if args.verbose:
                import traceback
                traceback.print_exc()

    # Final summary
    print(f"\n{'='*80}")
    if args.dry_run:
        print("DRY RUN COMPLETE - No changes were made")
        print("Run without --dry-run to apply changes")
    else:
        print("STANDARDIZATION COMPLETE")
        print("\n⚠️  Recommendations:")
        print("  1. Run validation: python scripts/validate_references_enhanced.py")
        print("  2. Test the build: npm run build")
        print("  3. Check for broken references: python scripts/find_broken_references.py")
    print("="*80)

    return 0

if __name__ == "__main__":
    exit(main())