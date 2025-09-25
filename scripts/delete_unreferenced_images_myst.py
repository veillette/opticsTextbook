#!/usr/bin/env python3
"""
Enhanced script to delete unreferenced images, including .ai files.

This improved script:
1. Handles both image files and their corresponding .ai source files
2. Provides better safety checks and preview functionality
3. Uses the output from find_unreferenced_images_myst.py
4. Allows selective deletion of just images or just .ai files
5. Creates comprehensive logs and backup information

Usage:
    python delete_unreferenced_images_myst.py [options]

Options:
    --dry-run           Show what would be deleted without actually deleting
    --force             Delete without asking for confirmation
    --images-only       Delete only image files (skip .ai files)
    --ai-only          Delete only .ai files (skip image files)
    --input-images     Custom path to unreferenced images list
    --input-ai         Custom path to unreferenced .ai files list
"""

import os
import sys
import json
import shutil
import argparse
from pathlib import Path
from collections import defaultdict
from datetime import datetime

def read_file_list(filename):
    """Read a list of files from a text file, ignoring comments."""
    if not os.path.exists(filename):
        return []

    files = []
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                # Skip comments and empty lines
                if line and not line.startswith('#'):
                    # Remove inline comments
                    file_path = line.split('#')[0].strip()
                    if file_path:
                        files.append(file_path)
    except Exception as e:
        print(f"❌ Error reading {filename}: {e}")

    return files

def get_file_size(file_path):
    """Get human-readable file size."""
    try:
        size = os.path.getsize(file_path)
        for unit in ['B', 'KB', 'MB', 'GB']:
            if size < 1024.0:
                return f"{size:.1f} {unit}"
            size /= 1024.0
        return f"{size:.1f} TB"
    except OSError:
        return "Unknown"

def get_total_size(file_paths):
    """Calculate total size of files that exist."""
    total = 0
    for path in file_paths:
        if os.path.exists(path):
            try:
                total += os.path.getsize(path)
            except OSError:
                continue
    return total

def format_size(size_bytes):
    """Format bytes as human-readable size."""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.1f} TB"

def analyze_files(image_files, ai_files):
    """Analyze the files to be deleted."""
    existing_images = [f for f in image_files if os.path.exists(f)]
    existing_ai = [f for f in ai_files if os.path.exists(f)]
    missing_images = [f for f in image_files if not os.path.exists(f)]
    missing_ai = [f for f in ai_files if not os.path.exists(f)]

    # Group by directory
    image_by_dir = defaultdict(list)
    ai_by_dir = defaultdict(list)

    for img in existing_images:
        dir_name = os.path.dirname(img)
        image_by_dir[dir_name].append(os.path.basename(img))

    for ai in existing_ai:
        dir_name = os.path.dirname(ai)
        ai_by_dir[dir_name].append(os.path.basename(ai))

    return {
        'existing_images': existing_images,
        'existing_ai': existing_ai,
        'missing_images': missing_images,
        'missing_ai': missing_ai,
        'image_by_dir': dict(image_by_dir),
        'ai_by_dir': dict(ai_by_dir)
    }

def preview_deletion(analysis, delete_images=True, delete_ai=True):
    """Show a preview of what will be deleted."""
    print(f"\n=== DELETION PREVIEW ===")

    total_files = 0
    total_size = 0

    if delete_images:
        total_files += len(analysis['existing_images'])
        total_size += get_total_size(analysis['existing_images'])

        print(f"\nImage files to be deleted: {len(analysis['existing_images'])}")
        if analysis['missing_images']:
            print(f"Image files already missing: {len(analysis['missing_images'])}")

        if analysis['existing_images']:
            image_size = get_total_size(analysis['existing_images'])
            print(f"Image files size: {format_size(image_size)}")

            # Show by directory
            for dir_name in sorted(analysis['image_by_dir'].keys())[:5]:  # Top 5 dirs
                files = analysis['image_by_dir'][dir_name]
                print(f"  📁 {dir_name}/ ({len(files)} images)")
                for file in sorted(files)[:3]:  # First 3 files
                    full_path = os.path.join(dir_name, file)
                    size = get_file_size(full_path)
                    print(f"    📄 {file} ({size})")
                if len(files) > 3:
                    print(f"    ... and {len(files) - 3} more")

    if delete_ai:
        total_files += len(analysis['existing_ai'])
        total_size += get_total_size(analysis['existing_ai'])

        print(f"\n.ai files to be deleted: {len(analysis['existing_ai'])}")
        if analysis['missing_ai']:
            print(f".ai files already missing: {len(analysis['missing_ai'])}")

        if analysis['existing_ai']:
            ai_size = get_total_size(analysis['existing_ai'])
            print(f".ai files size: {format_size(ai_size)}")

            # Show by directory
            for dir_name in sorted(analysis['ai_by_dir'].keys())[:5]:  # Top 5 dirs
                files = analysis['ai_by_dir'][dir_name]
                print(f"  📁 {dir_name}/ ({len(files)} .ai files)")
                for file in sorted(files)[:3]:  # First 3 files
                    full_path = os.path.join(dir_name, file)
                    size = get_file_size(full_path)
                    print(f"    🎨 {file} ({size})")
                if len(files) > 3:
                    print(f"    ... and {len(files) - 3} more")

    print(f"\nTOTAL: {total_files} files, {format_size(total_size)}")

    return total_files > 0

def create_backup_log(analysis, delete_images=True, delete_ai=True):
    """Create a backup log of what will be deleted."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_file = f"deletion_log_{timestamp}.json"

    backup_data = {
        'timestamp': timestamp,
        'delete_images': delete_images,
        'delete_ai': delete_ai,
        'files_to_delete': {
            'images': analysis['existing_images'] if delete_images else [],
            'ai_files': analysis['existing_ai'] if delete_ai else []
        },
        'missing_files': {
            'images': analysis['missing_images'],
            'ai_files': analysis['missing_ai']
        },
        'summary': {
            'total_images_deleted': len(analysis['existing_images']) if delete_images else 0,
            'total_ai_deleted': len(analysis['existing_ai']) if delete_ai else 0,
            'total_size_deleted': (get_total_size(analysis['existing_images']) if delete_images else 0) +
                                 (get_total_size(analysis['existing_ai']) if delete_ai else 0)
        }
    }

    with open(log_file, 'w', encoding='utf-8') as f:
        json.dump(backup_data, f, indent=2, ensure_ascii=False)

    return log_file

def delete_files(file_paths, file_type, dry_run=False):
    """Delete a list of files with progress tracking."""
    if not file_paths:
        return []

    deleted_files = []
    print(f"\n{'DRY RUN: ' if dry_run else ''}Deleting {file_type} files...")

    for i, file_path in enumerate(file_paths, 1):
        if not os.path.exists(file_path):
            print(f"  [{i:3d}/{len(file_paths)}] SKIP (missing): {file_path}")
            continue

        try:
            size = get_file_size(file_path)
            if dry_run:
                print(f"  [{i:3d}/{len(file_paths)}] WOULD DELETE: {os.path.basename(file_path)} ({size})")
            else:
                os.remove(file_path)
                deleted_files.append(file_path)
                print(f"  [{i:3d}/{len(file_paths)}] DELETED: {os.path.basename(file_path)} ({size})")

        except Exception as e:
            print(f"  [{i:3d}/{len(file_paths)}] ERROR: {file_path} - {e}")

    return deleted_files

def remove_empty_directories(base_dir='content', dry_run=False):
    """Remove empty directories after file deletion."""
    removed_dirs = []

    # Walk from bottom up to catch nested empty directories
    for root, dirs, files in os.walk(base_dir, topdown=False):
        if root == base_dir:
            continue

        # Check if directory is empty (no files and no non-empty subdirs)
        if not files and not dirs:
            try:
                if dry_run:
                    print(f"  WOULD REMOVE empty directory: {root}")
                else:
                    os.rmdir(root)
                    removed_dirs.append(root)
                    print(f"  REMOVED empty directory: {root}")
            except Exception as e:
                print(f"  ERROR removing directory {root}: {e}")

    return removed_dirs

def main():
    parser = argparse.ArgumentParser(description='Delete unreferenced images and .ai files')
    parser.add_argument('--dry-run', action='store_true',
                       help='Show what would be deleted without actually deleting')
    parser.add_argument('--force', action='store_true',
                       help='Delete without asking for confirmation')
    parser.add_argument('--images-only', action='store_true',
                       help='Delete only image files (skip .ai files)')
    parser.add_argument('--ai-only', action='store_true',
                       help='Delete only .ai files (skip image files)')
    parser.add_argument('--input-images', default='unreferenced_images.txt',
                       help='Input file with unreferenced images (default: unreferenced_images.txt)')
    parser.add_argument('--input-ai', default='unreferenced_ai_files.txt',
                       help='Input file with unreferenced .ai files (default: unreferenced_ai_files.txt)')

    args = parser.parse_args()

    print("=== Enhanced Unreferenced Images Deletion Tool ===\n")

    # Determine what to delete
    delete_images = not args.ai_only
    delete_ai = not args.images_only

    if args.images_only and args.ai_only:
        print("❌ Error: Cannot specify both --images-only and --ai-only")
        return 1

    # Read file lists
    image_files = read_file_list(args.input_images) if delete_images else []
    ai_files = read_file_list(args.input_ai) if delete_ai else []

    if not image_files and not ai_files:
        if delete_images and not os.path.exists(args.input_images):
            print(f"❌ Error: Image file list '{args.input_images}' not found!")
            print("Please run 'find_unreferenced_images_myst.py' first.")
        if delete_ai and not os.path.exists(args.input_ai):
            print(f"❌ Error: AI file list '{args.input_ai}' not found!")
            print("Please run 'find_unreferenced_images_myst.py --include-ai' first.")
        return 1

    # Analyze files
    analysis = analyze_files(image_files, ai_files)

    # Show preview
    has_files_to_delete = preview_deletion(analysis, delete_images, delete_ai)

    if not has_files_to_delete:
        print("\n✅ No files to delete.")
        return 0

    # Ask for confirmation unless --force or --dry-run
    if not args.force and not args.dry_run:
        total_files = 0
        if delete_images:
            total_files += len(analysis['existing_images'])
        if delete_ai:
            total_files += len(analysis['existing_ai'])

        print(f"\n⚠️  This will PERMANENTLY DELETE {total_files} files!")
        print("A backup log will be created before deletion.")

        while True:
            response = input("\nProceed with deletion? (yes/no): ").lower().strip()
            if response in ['yes', 'y']:
                break
            elif response in ['no', 'n']:
                print("Deletion cancelled.")
                return 0
            else:
                print("Please answer 'yes' or 'no'")

    # Create backup log
    if not args.dry_run:
        log_file = create_backup_log(analysis, delete_images, delete_ai)
        print(f"\n📄 Backup log created: {log_file}")

    # Delete files
    all_deleted = []

    if delete_images and analysis['existing_images']:
        deleted_images = delete_files(analysis['existing_images'], "image", args.dry_run)
        all_deleted.extend(deleted_images)

    if delete_ai and analysis['existing_ai']:
        deleted_ai = delete_files(analysis['existing_ai'], ".ai", args.dry_run)
        all_deleted.extend(deleted_ai)

    # Remove empty directories
    if not args.dry_run and all_deleted:
        print(f"\nCleaning up empty directories...")
        removed_dirs = remove_empty_directories('content', args.dry_run)

    # Summary
    print(f"\n=== SUMMARY ===")
    if args.dry_run:
        print("DRY RUN completed.")
        if delete_images:
            print(f"Would delete {len(analysis['existing_images'])} image files")
        if delete_ai:
            print(f"Would delete {len(analysis['existing_ai'])} .ai files")
    else:
        print("Deletion completed.")
        if delete_images:
            deleted_images = len([f for f in all_deleted if not f.endswith('.ai')])
            print(f"Image files deleted: {deleted_images}")
        if delete_ai:
            deleted_ai = len([f for f in all_deleted if f.endswith('.ai')])
            print(f".ai files deleted: {deleted_ai}")

        if all_deleted:
            total_size = sum(os.path.getsize(f) for f in all_deleted if os.path.exists(f))
            print(f"Total space freed: {format_size(get_total_size(all_deleted))}")
            print(f"Backup log: {log_file}")

        if 'removed_dirs' in locals() and removed_dirs:
            print(f"Empty directories removed: {len(removed_dirs)}")

    return 0

if __name__ == "__main__":
    sys.exit(main())