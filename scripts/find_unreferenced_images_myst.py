#!/usr/bin/env python3
"""
Enhanced script to identify unreferenced images using MyST's built-in functionality.

Status: UTILITY - Maintenance script
    Run periodically to identify unused images for cleanup.
    Run via: npm run find-unreferenced / npm run find-unreferenced-dry

This improved script:
1. Leverages MyST's AST parsing for more accurate reference detection
2. Handles .ai files paired with their corresponding image files (.png/.jpg)
3. Uses MyST build output to identify actually referenced images
4. Provides better path resolution using MyST's internal mechanisms
5. Creates separate lists for .ai files and image files for easier management

Usage:
    python find_unreferenced_images_myst.py [--dry-run] [--include-ai]

Output:
    - unreferenced_images.txt (image files only)
    - unreferenced_ai_files.txt (AI source files)
    - referenced_images.txt (for verification)
"""

import os
import sys
import re
import json
import subprocess
import argparse
from pathlib import Path
from collections import defaultdict, Counter
import tempfile
import shutil
from typing import Tuple, List, Dict, Set, Any, Optional

# Import shared utilities
from shared_utils import run_myst_command
from report_utils import ReportGenerator

def get_myst_build_references():
    """Use MyST build to identify referenced images."""
    print("Running MyST build to identify referenced images...")

    # Try to build and capture output
    stdout, stderr, return_code = run_myst_command(['npm', 'run', 'build'])
    output = stdout + stderr

    # Also try a dry run build if available
    if 'myst' in output.lower():
        # Try direct myst command for more detailed info
        myst_stdout, myst_stderr, _ = run_myst_command(['npx', 'myst', 'build', '--check', '--verbose'])
        output += "\n" + myst_stdout + myst_stderr

    # Extract image references from build output
    referenced_images = set()

    # Look for image processing messages in MyST output
    image_patterns = [
        r'Processing image:\s+(.+)',
        r'Found image:\s+(.+)',
        r'Image:\s+(.+)',
        r'figure.*?(\S+\.(?:png|jpg|jpeg|gif|svg|webp))',
        r'image.*?(\S+\.(?:png|jpg|jpeg|gif|svg|webp))',
    ]

    for pattern in image_patterns:
        matches = re.findall(pattern, output, re.IGNORECASE | re.MULTILINE)
        for match in matches:
            # Clean up the path
            if isinstance(match, tuple):
                match = match[0]
            clean_path = match.strip().strip('"\'')
            if clean_path and not clean_path.startswith('http'):
                referenced_images.add(clean_path)

    return referenced_images, output

def find_all_images(content_dir='content'):
    """Find all image files and corresponding .ai files."""
    image_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.tiff']

    all_images = []
    ai_files = []

    for root, dirs, files in os.walk(content_dir):
        for file in files:
            file_path = os.path.join(root, file)
            file_ext = os.path.splitext(file)[1].lower()

            if file_ext in image_extensions:
                all_images.append(file_path)
            elif file_ext == '.ai':
                ai_files.append(file_path)

    return sorted(all_images), sorted(ai_files)

def parse_markdown_references(content_dir='content'):
    """Parse markdown files to extract image references using improved patterns."""
    referenced_images = set()

    # Find all markdown files
    md_files = []
    for root, dirs, files in os.walk(content_dir):
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))

    print(f"Scanning {len(md_files)} markdown files for image references...")

    # Enhanced MyST patterns
    patterns = [
        # MyST figure directives
        r'```\{figure\}\s+([^\s\n]+)',
        r'```\{image\}\s+([^\s\n]+)',
        r':::\s*\{figure\}\s+([^\s\n]+)',
        r':::\s*\{image\}\s+([^\s\n]+)',
        # Standard markdown
        r'!\[.*?\]\(([^)]+)\)',
        # HTML img tags
        r'<img[^>]+src=["\']([^"\']+)["\']',
        # MyST roles
        r'\{figure\}`([^`]+)`',
        r'\{image\}`([^`]+)`',
        # Directive with options
        r':\s*figure:\s*([^\s\n]+)',
        r':\s*image:\s*([^\s\n]+)',
    ]

    for md_file in md_files:
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()

            md_dir = os.path.dirname(md_file)

            for pattern in patterns:
                matches = re.findall(pattern, content, re.IGNORECASE | re.MULTILINE)
                for match in matches:
                    # Clean and resolve path
                    image_path = match.strip().strip('"\'')
                    # Remove URL fragments
                    image_path = image_path.split('#')[0].split('?')[0]

                    if image_path and not image_path.startswith(('http://', 'https://', 'ftp://')):
                        # Try to resolve the path
                        resolved_path = resolve_image_path(image_path, md_dir, content_dir)
                        if resolved_path:
                            referenced_images.add(resolved_path)

        except Exception as e:
            print(f"Warning: Error reading {md_file}: {e}")

    return referenced_images

def resolve_image_path(image_path, md_dir, content_dir):
    """Resolve an image path to its actual location."""
    possible_paths = []

    if os.path.isabs(image_path):
        possible_paths.append(image_path)
    else:
        # Try relative to markdown file
        possible_paths.append(os.path.join(md_dir, image_path))
        # Try relative to content directory
        possible_paths.append(os.path.join(content_dir, image_path))
        # Try relative to project root
        possible_paths.append(image_path)

        # Handle ../ paths
        if image_path.startswith('../'):
            possible_paths.append(os.path.join(os.path.dirname(md_dir), image_path[3:]))
        if image_path.startswith('./'):
            possible_paths.append(os.path.join(md_dir, image_path[2:]))

    # Find the first path that exists
    for path in possible_paths:
        normalized = os.path.normpath(path)
        if os.path.exists(normalized):
            return os.path.abspath(normalized)

    return None

def find_corresponding_ai_file(image_path):
    """Find the corresponding .ai file for an image."""
    base_path = os.path.splitext(image_path)[0]
    ai_path = base_path + '.ai'
    return ai_path if os.path.exists(ai_path) else None

def find_corresponding_image_file(ai_path):
    """Find the corresponding image file for a .ai file."""
    base_path = os.path.splitext(ai_path)[0]
    image_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']

    for ext in image_extensions:
        image_path = base_path + ext
        if os.path.exists(image_path):
            return image_path

    return None

def analyze_references(all_images, ai_files, content_dir='content'):
    """Analyze image references using multiple methods."""
    print("Analyzing image references using multiple methods...")

    # Method 1: Parse markdown files directly
    print("  1. Parsing markdown files...")
    markdown_refs = parse_markdown_references(content_dir)

    # Method 2: Use MyST build output
    print("  2. Using MyST build output...")
    myst_refs, build_output = get_myst_build_references()

    # Combine all references
    all_referenced = set()

    # Convert to absolute paths for comparison
    for ref in markdown_refs | myst_refs:
        if os.path.exists(ref):
            all_referenced.add(os.path.abspath(ref))

    print(f"  Found {len(markdown_refs)} references from markdown parsing")
    print(f"  Found {len(myst_refs)} references from MyST build")
    print(f"  Total unique references: {len(all_referenced)}")

    # Find unreferenced images
    unreferenced_images = []
    unreferenced_ai_files = []
    referenced_images = []

    for image_path in all_images:
        abs_image_path = os.path.abspath(image_path)
        is_referenced = abs_image_path in all_referenced

        if is_referenced:
            referenced_images.append(image_path)
        else:
            unreferenced_images.append(image_path)

    # Handle .ai files
    for ai_path in ai_files:
        # Check if the corresponding image file is referenced
        corresponding_image = find_corresponding_image_file(ai_path)

        if corresponding_image:
            abs_image_path = os.path.abspath(corresponding_image)
            is_image_referenced = abs_image_path in all_referenced

            if not is_image_referenced:
                unreferenced_ai_files.append(ai_path)
        else:
            # No corresponding image file found, consider AI file unreferenced
            unreferenced_ai_files.append(ai_path)

    return {
        'unreferenced_images': unreferenced_images,
        'unreferenced_ai_files': unreferenced_ai_files,
        'referenced_images': referenced_images,
        'all_referenced': all_referenced,
        'build_output': build_output
    }

def save_results(results, include_ai=True):
    """Save the analysis results to files."""
    # Save unreferenced images
    if results['unreferenced_images']:
        report_gen = ReportGenerator("unreferenced_images")
        lines = [
            "# Unreferenced image files",
            f"# Found {len(results['unreferenced_images'])} unreferenced images",
            "# Generated by find_unreferenced_images_myst.py",
            "",
            *sorted(results['unreferenced_images'])
        ]
        filepath = report_gen.write_text(lines)
        print(f"  Saved {len(results['unreferenced_images'])} unreferenced images to '{filepath}'")

    # Save unreferenced .ai files if requested
    if include_ai and results['unreferenced_ai_files']:
        report_gen = ReportGenerator("unreferenced_ai_files")
        lines = [
            "# Unreferenced .ai source files",
            f"# Found {len(results['unreferenced_ai_files'])} unreferenced .ai files",
            "# These .ai files correspond to unreferenced image files",
            "# Generated by find_unreferenced_images_myst.py",
            ""
        ]
        for ai_file in sorted(results['unreferenced_ai_files']):
            corresponding_image = find_corresponding_image_file(ai_file)
            line = ai_file
            if corresponding_image:
                line += f"  # corresponds to {corresponding_image}"
            lines.append(line)
        filepath = report_gen.write_text(lines)
        print(f"  Saved {len(results['unreferenced_ai_files'])} unreferenced .ai files to '{filepath}'")

    # Save referenced images for verification
    report_gen = ReportGenerator("referenced_images")
    lines = [
        "# Referenced image files (for verification)",
        f"# Found {len(results['referenced_images'])} referenced images",
        "# Generated by find_unreferenced_images_myst.py",
        "",
        *sorted(results['referenced_images'])
    ]
    filepath = report_gen.write_text(lines)
    print(f"  Saved {len(results['referenced_images'])} referenced images to '{filepath}'")

def print_summary(results, include_ai=True):
    """Print a summary of the analysis."""
    print(f"\n=== UNREFERENCED IMAGES ANALYSIS ===")
    print(f"Total images found: {len(results['referenced_images']) + len(results['unreferenced_images'])}")
    print(f"Referenced images: {len(results['referenced_images'])}")
    print(f"Unreferenced images: {len(results['unreferenced_images'])}")

    if include_ai:
        print(f"Total .ai files found: {len(results['unreferenced_ai_files']) + len([ai for ai in results['referenced_images'] if ai.endswith('.ai')])}")
        print(f"Unreferenced .ai files: {len(results['unreferenced_ai_files'])}")

    if results['unreferenced_images']:
        print(f"\n=== UNREFERENCED IMAGES ===")
        # Group by directory
        by_dir = defaultdict(list)
        for img in results['unreferenced_images']:
            dir_name = os.path.dirname(img)
            by_dir[dir_name].append(os.path.basename(img))

        for dir_name in sorted(by_dir.keys()):
            files = by_dir[dir_name]
            print(f"  {dir_name}/ ({len(files)} files)")
            for file in sorted(files)[:3]:  # Show first 3
                print(f"    - {file}")
            if len(files) > 3:
                print(f"    ... and {len(files) - 3} more")

    if include_ai and results['unreferenced_ai_files']:
        print(f"\n=== UNREFERENCED .AI FILES ===")
        # Group by directory
        by_dir = defaultdict(list)
        for ai in results['unreferenced_ai_files']:
            dir_name = os.path.dirname(ai)
            by_dir[dir_name].append(os.path.basename(ai))

        for dir_name in sorted(by_dir.keys()):
            files = by_dir[dir_name]
            print(f"  {dir_name}/ ({len(files)} files)")
            for file in sorted(files)[:3]:  # Show first 3
                print(f"    - {file}")
            if len(files) > 3:
                print(f"    ... and {len(files) - 3} more")

def main() -> int:
    parser = argparse.ArgumentParser(description='Find unreferenced images using MyST functionality')
    parser.add_argument('--content-dir', default='content',
                       help='Content directory to scan (default: content)')
    parser.add_argument('--dry-run', action='store_true',
                       help='Show what would be found without creating files')
    parser.add_argument('--include-ai', action='store_true', default=True,
                       help='Include .ai file analysis (default: True)')
    parser.add_argument('--no-ai', dest='include_ai', action='store_false',
                       help='Skip .ai file analysis')

    args = parser.parse_args()

    if not os.path.exists(args.content_dir):
        print(f"❌ Error: Content directory '{args.content_dir}' not found!")
        return 1

    print("=== Enhanced Unreferenced Images Finder (MyST-powered) ===\n")

    # Find all images and AI files
    print("Scanning for image and .ai files...")
    all_images, ai_files = find_all_images(args.content_dir)
    print(f"  Found {len(all_images)} image files")
    if args.include_ai:
        print(f"  Found {len(ai_files)} .ai files")

    # Analyze references
    results = analyze_references(all_images, ai_files, args.content_dir)

    # Print summary
    print_summary(results, args.include_ai)

    # Save results unless dry run
    if not args.dry_run:
        print(f"\n=== SAVING RESULTS ===")
        save_results(results, args.include_ai)

        if results['unreferenced_images'] or (args.include_ai and results['unreferenced_ai_files']):
            print(f"\nTo delete unreferenced files, you can use:")
            print(f"  python scripts/delete_unreferenced_images_myst.py")
        else:
            print(f"\n✅ No unreferenced images found!")
    else:
        print(f"\n(Dry run - no files created)")

    return 0

if __name__ == "__main__":
    sys.exit(main())