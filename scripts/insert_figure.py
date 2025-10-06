#!/usr/bin/env python3
"""
Script to insert a new figure into a chapter and renumber subsequent figures.

This script:
1. Accepts a new image file and desired position in a chapter
2. Renames the new image to follow the chapter's naming convention (ChapterNum_ImageNum_descriptive_name.ext)
3. Renumbers all subsequent figures in that chapter
4. Updates all markdown references to the renumbered figures
5. Handles both image files and their corresponding .ai source files

Usage:
    python scripts/insert_figure.py --image path/to/new_image.png --chapter 3 --position 5 --name "lens_diagram"

    This would:
    - Rename new_image.png to 03_05_lens_diagram.png
    - Renumber existing 03_05_*.* to 03_06_*.*
    - Renumber existing 03_06_*.* to 03_07_*.*
    - And so on...
    - Update all markdown references

Options:
    --image PATH         Path to the new image file (required)
    --chapter NUM        Chapter number (1-11) (required)
    --position NUM       Position to insert (1-based) (required)
    --name NAME          Descriptive name for the image (optional, will use original filename if not provided)
    --dry-run           Show what would be done without making changes
"""

import os
import re
import shutil
import argparse
from pathlib import Path
from collections import defaultdict

# Import shared utilities
from shared_utils import CHAPTERS, to_snake_case

def get_existing_figures(chapter_dir, chapter_num):
    """Get all existing figures in a chapter sorted by position number."""
    images_dir = Path(chapter_dir) / "Images"
    if not images_dir.exists():
        return []

    figures = []
    pattern = re.compile(rf'^{chapter_num:02d}_(\d+)_(.+)\.(\w+)$')

    for ext in ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp']:
        for img in images_dir.glob(f"*.{ext}"):
            match = pattern.match(img.name)
            if match:
                position = int(match.group(1))
                name = match.group(2)
                extension = match.group(3)

                figures.append({
                    'path': img,
                    'position': position,
                    'name': name,
                    'extension': extension,
                    'filename': img.name
                })

    # Sort by position
    figures.sort(key=lambda x: x['position'])
    return figures

def generate_new_filename(chapter_num, position, descriptive_name, extension):
    """Generate a new filename following the naming convention."""
    # Ensure descriptive name is in snake_case
    clean_name = to_snake_case(descriptive_name)

    return f"{chapter_num:02d}_{position:02d}_{clean_name}.{extension}"

def create_rename_map(existing_figures, insert_position, chapter_num):
    """Create a mapping of old to new filenames for renumbering."""
    rename_map = []

    for fig in existing_figures:
        if fig['position'] >= insert_position:
            # This figure needs to be renumbered
            new_position = fig['position'] + 1
            new_filename = f"{chapter_num:02d}_{new_position:02d}_{fig['name']}.{fig['extension']}"
            new_path = fig['path'].parent / new_filename

            rename_map.append({
                'old_path': fig['path'],
                'new_path': new_path,
                'old_filename': fig['filename'],
                'new_filename': new_filename,
                'old_position': fig['position'],
                'new_position': new_position
            })

    # Process in reverse order to avoid conflicts
    rename_map.reverse()

    return rename_map

def copy_and_rename_new_image(source_path, chapter_dir, chapter_num, position, descriptive_name, dry_run=False):
    """Copy the new image to the chapter's Images directory with proper naming."""
    source = Path(source_path)

    if not source.exists():
        print(f"❌ Error: Source image '{source_path}' not found!")
        return None

    # Get extension
    extension = source.suffix[1:]  # Remove the leading dot

    # Generate new filename
    new_filename = generate_new_filename(chapter_num, position, descriptive_name, extension)

    # Destination path
    images_dir = Path(chapter_dir) / "Images"
    images_dir.mkdir(exist_ok=True)
    dest_path = images_dir / new_filename

    if dry_run:
        print(f"[DRY RUN] Would copy: {source} -> {dest_path}")
    else:
        shutil.copy2(source, dest_path)
        print(f"✓ Copied new image: {source.name} -> {new_filename}")

    # Check for corresponding .ai file
    ai_source = source.with_suffix('.ai')
    if ai_source.exists():
        ai_dest = dest_path.with_suffix('.ai')
        if dry_run:
            print(f"[DRY RUN] Would copy AI file: {ai_source} -> {ai_dest}")
        else:
            shutil.copy2(ai_source, ai_dest)
            print(f"✓ Copied AI file: {ai_source.name} -> {ai_dest.name}")

    return {
        'filename': new_filename,
        'path': dest_path
    }

def perform_renumbering(rename_map, dry_run=False):
    """Rename existing figures to make room for the new insertion."""
    if not rename_map:
        print("No files need renumbering.")
        return []

    print(f"\n{'[DRY RUN] ' if dry_run else ''}Renumbering {len(rename_map)} existing figures...")

    renamed = []
    for item in rename_map:
        if dry_run:
            print(f"  Would rename: {item['old_filename']} -> {item['new_filename']}")
        else:
            # Rename image file
            if item['old_path'].exists():
                shutil.move(str(item['old_path']), str(item['new_path']))
                print(f"  ✓ Renamed: {item['old_filename']} -> {item['new_filename']}")
                renamed.append(item)

                # Rename corresponding .ai file if it exists
                ai_old = item['old_path'].with_suffix('.ai')
                ai_new = item['new_path'].with_suffix('.ai')
                if ai_old.exists():
                    shutil.move(str(ai_old), str(ai_new))
                    print(f"    + AI file renamed")

    return renamed

def update_markdown_references(chapter_dir, rename_map, new_image_info, dry_run=False):
    """Update all markdown references to reflect the renumbering."""
    if not rename_map and not new_image_info:
        print("No markdown updates needed.")
        return

    print(f"\n{'[DRY RUN] ' if dry_run else ''}Updating markdown references...")

    # Find all markdown files in the chapter
    chapter_path = Path(chapter_dir)
    md_files = list(chapter_path.glob("*.md")) + list(chapter_path.glob("Problems/*.md"))

    for md_file in md_files:
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Update references for renumbered files (process in order of rename_map which is reversed)
        for item in rename_map:
            # Replace references to old filename with new filename
            # Handle both "Images/filename" and just "filename" patterns
            old_name = item['old_filename']
            new_name = item['new_filename']

            # Pattern 1: Images/filename
            content = content.replace(f"Images/{old_name}", f"Images/{new_name}")
            # Pattern 2: ../Images/filename (from Problems directory)
            content = content.replace(f"../Images/{old_name}", f"../Images/{new_name}")

        if content != original_content:
            if dry_run:
                print(f"  Would update: {md_file.relative_to(chapter_path)}")
            else:
                with open(md_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"  ✓ Updated: {md_file.relative_to(chapter_path)}")

def validate_inputs(args):
    """Validate command line arguments."""
    errors = []

    # Validate chapter number
    if args.chapter not in CHAPTERS:
        errors.append(f"Invalid chapter number: {args.chapter}. Must be 1-11.")

    # Validate image file exists
    if not os.path.exists(args.image):
        errors.append(f"Image file not found: {args.image}")

    # Validate position is positive
    if args.position < 1:
        errors.append(f"Position must be >= 1, got: {args.position}")

    # Get existing figures to validate position
    if args.chapter in CHAPTERS:
        chapter_dir, _ = CHAPTERS[args.chapter]
        if os.path.exists(chapter_dir):
            existing = get_existing_figures(chapter_dir, args.chapter)
            max_position = len(existing) + 1
            if args.position > max_position:
                errors.append(f"Position {args.position} is too large. Chapter {args.chapter} has {len(existing)} figures. Maximum position is {max_position}.")

    return errors

def main():
    parser = argparse.ArgumentParser(
        description='Insert a new figure into a chapter and renumber subsequent figures',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Insert a new figure as the 5th image in chapter 3
  python scripts/insert_figure.py --image ~/Downloads/lens.png --chapter 3 --position 5 --name "lens_diagram"

  # Preview what would happen (dry run)
  python scripts/insert_figure.py --image lens.png --chapter 7 --position 10 --name "diffraction_pattern" --dry-run

  # Insert at the end of chapter 2 (position will be auto-detected)
  python scripts/insert_figure.py --image mirror.jpg --chapter 2 --position 999 --name "curved_mirror"
        """
    )

    parser.add_argument('--image', required=True,
                       help='Path to the new image file')
    parser.add_argument('--chapter', type=int, required=True,
                       help='Chapter number (1-11)')
    parser.add_argument('--position', type=int, required=True,
                       help='Position to insert the image (1-based)')
    parser.add_argument('--name',
                       help='Descriptive name for the image (optional, uses original filename if not provided)')
    parser.add_argument('--dry-run', action='store_true',
                       help='Show what would be done without making changes')

    args = parser.parse_args()

    # Validate inputs
    errors = validate_inputs(args)
    if errors:
        print("❌ Validation errors:")
        for error in errors:
            print(f"  - {error}")
        return 1

    print("=" * 80)
    print("Figure Insertion and Renumbering Tool")
    print("=" * 80)

    # Get chapter info
    chapter_dir, chapter_file = CHAPTERS[args.chapter]
    chapter_path = Path(chapter_dir)

    # Get descriptive name
    if args.name:
        descriptive_name = args.name
    else:
        # Use original filename without extension
        descriptive_name = Path(args.image).stem

    print(f"\nChapter: {args.chapter} ({chapter_dir})")
    print(f"New image: {args.image}")
    print(f"Insert position: {args.position}")
    print(f"Descriptive name: {descriptive_name}")

    # Get existing figures
    existing_figures = get_existing_figures(chapter_dir, args.chapter)
    print(f"\nExisting figures in chapter: {len(existing_figures)}")

    # Adjust position if it's beyond the end
    if args.position > len(existing_figures) + 1:
        adjusted_position = len(existing_figures) + 1
        print(f"⚠️  Position {args.position} is beyond the end. Adjusting to {adjusted_position}.")
        args.position = adjusted_position

    # Show existing figures around the insertion point
    if existing_figures:
        print(f"\nFigures around insertion point:")
        for fig in existing_figures:
            marker = "  "
            if fig['position'] == args.position - 1:
                marker = "↑ "
            elif fig['position'] == args.position:
                marker = "→ INSERT HERE"

            if abs(fig['position'] - args.position) <= 2 or marker == "→ INSERT HERE":
                print(f"  {marker} [{fig['position']:02d}] {fig['filename']}")

        if args.position > len(existing_figures):
            print(f"  → INSERT HERE (at end)")

    # Create rename map for existing figures
    rename_map = create_rename_map(existing_figures, args.position, args.chapter)

    if not args.dry_run:
        response = input(f"\nProceed with insertion and renumbering? (yes/no): ").lower().strip()
        if response not in ['yes', 'y']:
            print("Operation cancelled.")
            return 0

    # Step 1: Renumber existing figures (in reverse order to avoid conflicts)
    renamed_files = perform_renumbering(rename_map, dry_run=args.dry_run)

    # Step 2: Copy and rename the new image
    print(f"\n{'[DRY RUN] ' if args.dry_run else ''}Inserting new figure...")
    new_image_info = copy_and_rename_new_image(
        args.image, chapter_dir, args.chapter, args.position, descriptive_name, dry_run=args.dry_run
    )

    # Step 3: Update markdown references
    update_markdown_references(chapter_dir, rename_map, new_image_info, dry_run=args.dry_run)

    # Summary
    print("\n" + "=" * 80)
    if args.dry_run:
        print("DRY RUN COMPLETE - No changes were made")
        print(f"Would insert: {new_image_info['filename'] if new_image_info else 'N/A'}")
        print(f"Would renumber: {len(rename_map)} existing figures")
    else:
        print("INSERTION COMPLETE")
        print(f"✓ Inserted: {new_image_info['filename'] if new_image_info else 'N/A'}")
        print(f"✓ Renumbered: {len(renamed_files)} existing figures")
        print(f"✓ Updated markdown references")
        print(f"\n⚠️  Don't forget to add the figure reference in your markdown file!")
        print(f"    Example: ```{{figure}} Images/{new_image_info['filename']}")
    print("=" * 80)

    return 0

if __name__ == "__main__":
    exit(main())