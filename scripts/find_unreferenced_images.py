#!/usr/bin/env python3
"""
Script to identify unreferenced images in the optics textbook content directory.

This script:
1. Finds all image files in the content directory and subdirectories
2. Searches all markdown files for references to these images
3. Outputs unreferenced images to a file that can be used by a deletion script

Usage:
    python find_unreferenced_images.py

Output:
    Creates 'unreferenced_images.txt' with paths to unreferenced images
"""

import os
import re
import glob
from pathlib import Path

def find_image_files(content_dir):
    """Find all image files in the content directory."""
    image_extensions = ['*.png', '*.jpg', '*.jpeg', '*.gif', '*.svg', '*.webp', '*.bmp', '*.tiff']
    image_files = []
    
    for ext in image_extensions:
        pattern = os.path.join(content_dir, '**', ext)
        image_files.extend(glob.glob(pattern, recursive=True))
    
    return sorted(image_files)

def find_markdown_files(content_dir):
    """Find all markdown files in the content directory."""
    md_pattern = os.path.join(content_dir, '**', '*.md')
    return glob.glob(md_pattern, recursive=True)

def extract_image_references(md_file):
    """Extract all image references from a markdown file."""
    references = set()
    
    try:
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # MyST/Markdown image patterns:
        # ![alt](path), ![alt](path "title"), <img src="path">, etc.
        patterns = [
            r'!\[.*?\]\(([^)]+)\)',  # ![alt](path)
            r'<img[^>]+src=["\']([^"\']+)["\']',  # <img src="path">
            r'image:\s*([^\s\n]+)',  # MyST image directive
            r'figure:\s*([^\s\n]+)',  # MyST figure directive
            r':::\s*figure\s+([^\s\n]+)',  # MyST figure block
            r'```\{figure\}\s+([^\s\n]+)',  # MyST figure block ```{figure} path
            r'\{figure\}\s*`([^`]+)`',  # MyST figure with backticks
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, content, re.IGNORECASE | re.MULTILINE)
            references.update(matches)
    
    except Exception as e:
        print(f"Error reading {md_file}: {e}")
    
    return references

def normalize_path(path, base_dir):
    """Normalize a path reference to match actual file paths."""
    # Remove any URL fragments or query parameters
    path = path.split('#')[0].split('?')[0]
    
    # Convert relative paths to absolute paths based on the base directory
    if not os.path.isabs(path):
        if path.startswith('./'):
            path = path[2:]
        elif path.startswith('../'):
            # Handle relative paths going up directories
            return os.path.abspath(os.path.join(base_dir, path))
        
        # Try to find the file in the content directory
        possible_paths = [
            os.path.join(base_dir, path),
            os.path.join(base_dir, '..', path),  # Go up one level
        ]
        
        for possible_path in possible_paths:
            if os.path.exists(possible_path):
                return os.path.abspath(possible_path)
    
    return os.path.abspath(path)

def find_unreferenced_images(content_dir='content'):
    """Main function to find unreferenced images."""
    if not os.path.exists(content_dir):
        print(f"Content directory '{content_dir}' not found!")
        return []
    
    print(f"Scanning for images in '{content_dir}'...")
    image_files = find_image_files(content_dir)
    print(f"Found {len(image_files)} image files")
    
    print("Scanning markdown files for image references...")
    md_files = find_markdown_files(content_dir)
    print(f"Found {len(md_files)} markdown files")
    
    # Collect all image references from all markdown files
    all_references = set()
    for md_file in md_files:
        md_dir = os.path.dirname(md_file)
        references = extract_image_references(md_file)
        
        # Normalize paths relative to the markdown file's directory
        for ref in references:
            normalized_ref = normalize_path(ref, md_dir)
            all_references.add(normalized_ref)
    
    print(f"Found {len(all_references)} image references in markdown files")
    
    # Find unreferenced images
    unreferenced = []
    for image_file in image_files:
        image_abs_path = os.path.abspath(image_file)
        is_referenced = False
        
        # Check if this image is referenced
        for ref in all_references:
            if os.path.exists(ref) and os.path.samefile(image_abs_path, ref):
                is_referenced = True
                break
        
        if not is_referenced:
            # Also check for filename-only matches (common in MyST)
            image_name = os.path.basename(image_file)
            for ref in all_references:
                if os.path.basename(ref) == image_name:
                    # Verify the referenced file exists and is the same
                    if os.path.exists(ref) and os.path.samefile(image_abs_path, ref):
                        is_referenced = True
                        break
        
        if not is_referenced:
            unreferenced.append(image_file)
    
    return unreferenced

def main():
    """Main entry point."""
    unreferenced_images = find_unreferenced_images()
    
    if unreferenced_images:
        output_file = 'unreferenced_images.txt'
        with open(output_file, 'w', encoding='utf-8') as f:
            for image in unreferenced_images:
                f.write(f"{image}\n")
        
        print(f"\nFound {len(unreferenced_images)} unreferenced images:")
        for image in unreferenced_images:
            print(f"  {image}")
        
        print(f"\nUnreferenced images list saved to '{output_file}'")
        print("You can use this file with a deletion script to remove these files.")
    else:
        print("\nAll images appear to be referenced in the markdown files.")

if __name__ == "__main__":
    main()