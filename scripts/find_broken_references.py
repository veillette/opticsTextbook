#!/usr/bin/env python3
"""
Script to identify broken figure references in the optics textbook content directory.

This script:
1. Finds all MyST figure/image references in markdown files
2. Checks if the referenced image files actually exist
3. Reports broken references with file locations and line numbers
4. Also finds cross-references to non-existent labels/chapters

Usage:
    python find_broken_references.py [--output-file broken_refs.txt]

Output:
    Displays broken references and optionally saves to file
"""

import os
import re
import glob
import argparse
from pathlib import Path
from collections import defaultdict

def find_markdown_files(content_dir):
    """Find all markdown files in the content directory."""
    md_pattern = os.path.join(content_dir, '**', '*.md')
    return glob.glob(md_pattern, recursive=True)

def extract_figure_references(md_file):
    """Extract all figure/image references from a markdown file."""
    references = []
    
    try:
        with open(md_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        # MyST figure/image patterns
        patterns = [
            (r'```\{figure\}\s+([^\s\n]+)', 'figure'),  # ```{figure} path
            (r'```\{image\}\s+([^\s\n]+)', 'image'),    # ```{image} path
            (r'!\[.*?\]\(([^)]+)\)', 'markdown'),        # ![alt](path)
            (r'<img[^>]+src=["\']([^"\']+)["\']', 'html'), # <img src="path">
        ]
        
        for line_num, line in enumerate(lines, 1):
            for pattern, ref_type in patterns:
                matches = re.findall(pattern, line, re.IGNORECASE)
                for match in matches:
                    # Clean up the path
                    path = match.split('#')[0].split('?')[0].strip()
                    if path:  # Skip empty paths
                        references.append({
                            'path': path,
                            'type': ref_type,
                            'line': line_num,
                            'line_content': line.strip()
                        })
    
    except Exception as e:
        print(f"Error reading {md_file}: {e}")
    
    return references

def extract_cross_references(md_file):
    """Extract cross-references like {ref}`label` from a markdown file."""
    references = []
    
    try:
        with open(md_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        # Cross-reference patterns
        patterns = [
            (r'\{ref\}`([^`]+)`', 'ref'),              # {ref}`label`
            (r'\{numref\}`([^`]+)`', 'numref'),        # {numref}`label`  
            (r'\{eq\}`([^`]+)`', 'eq'),                # {eq}`equation`
            (r'\{doc\}`([^`]+)`', 'doc'),              # {doc}`document`
        ]
        
        for line_num, line in enumerate(lines, 1):
            for pattern, ref_type in patterns:
                matches = re.findall(pattern, line, re.IGNORECASE)
                for match in matches:
                    references.append({
                        'label': match.strip(),
                        'type': ref_type,
                        'line': line_num,
                        'line_content': line.strip()
                    })
    
    except Exception as e:
        print(f"Error reading {md_file}: {e}")
    
    return references

def extract_labels(md_file):
    """Extract all labels defined in a markdown file."""
    labels = []
    
    try:
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Label patterns
        patterns = [
            r'\(([^)]+)\)=',           # (label)=
            r':name:\s*([^\s\n]+)',    # :name: label
            r':label:\s*([^\s\n]+)',   # :label: label (for equations)
            r'\{#([^}]+)\}',           # {#label}
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, content, re.MULTILINE)
            labels.extend(matches)
    
    except Exception as e:
        print(f"Error reading {md_file}: {e}")
    
    return labels

def normalize_image_path(image_path, md_file_dir, content_dir):
    """Normalize an image path to find the actual file location."""
    # Remove any URL fragments or query parameters
    clean_path = image_path.split('#')[0].split('?')[0]
    
    # Skip URLs
    if clean_path.startswith(('http://', 'https://', 'ftp://')):
        return None, 'external_url'
    
    # Handle different path formats
    possible_paths = []
    
    if os.path.isabs(clean_path):
        # Absolute path
        possible_paths.append(clean_path)
    else:
        # Relative path - try different interpretations
        possible_paths.extend([
            os.path.join(md_file_dir, clean_path),                    # Relative to markdown file
            os.path.join(content_dir, clean_path),                    # Relative to content dir
            os.path.join(os.path.dirname(md_file_dir), clean_path),   # Up one level
        ])
        
        # Handle paths starting with ./
        if clean_path.startswith('./'):
            clean_path = clean_path[2:]
            possible_paths.extend([
                os.path.join(md_file_dir, clean_path),
                os.path.join(content_dir, clean_path),
            ])
    
    # Check which path exists
    for path in possible_paths:
        normalized = os.path.normpath(path)
        if os.path.exists(normalized):
            return normalized, 'found'
    
    return possible_paths[0] if possible_paths else clean_path, 'missing'

def find_broken_references(content_dir='content'):
    """Main function to find broken figure references."""
    if not os.path.exists(content_dir):
        print(f"Content directory '{content_dir}' not found!")
        return {}, {}, {}
    
    print(f"Scanning for broken references in '{content_dir}'...")
    md_files = find_markdown_files(content_dir)
    print(f"Found {len(md_files)} markdown files to check")
    
    broken_figure_refs = []
    broken_cross_refs = []
    all_labels = set()
    
    # First pass: collect all labels
    print("Collecting all labels...")
    for md_file in md_files:
        labels = extract_labels(md_file)
        all_labels.update(labels)
    
    print(f"Found {len(all_labels)} labels defined in the content")
    
    # Second pass: check figure references and cross-references
    print("Checking figure and cross-references...")
    for md_file in md_files:
        md_file_dir = os.path.dirname(md_file)
        relative_md_path = os.path.relpath(md_file, content_dir)
        
        # Check figure references
        figure_refs = extract_figure_references(md_file)
        for ref in figure_refs:
            normalized_path, status = normalize_image_path(
                ref['path'], md_file_dir, content_dir
            )
            
            if status == 'missing':
                broken_figure_refs.append({
                    'md_file': relative_md_path,
                    'line': ref['line'],
                    'type': ref['type'],
                    'referenced_path': ref['path'],
                    'resolved_path': normalized_path,
                    'line_content': ref['line_content']
                })
        
        # Check cross-references
        cross_refs = extract_cross_references(md_file)
        for ref in cross_refs:
            if ref['label'] not in all_labels:
                broken_cross_refs.append({
                    'md_file': relative_md_path,
                    'line': ref['line'],
                    'type': ref['type'],
                    'label': ref['label'],
                    'line_content': ref['line_content']
                })
    
    return broken_figure_refs, broken_cross_refs, all_labels

def print_results(broken_figure_refs, broken_cross_refs, all_labels):
    """Print the results of the broken reference check."""
    print(f"\n=== BROKEN REFERENCE ANALYSIS ===")
    
    # Summary
    print(f"\nSUMMARY:")
    print(f"  Broken figure/image references: {len(broken_figure_refs)}")
    print(f"  Broken cross-references: {len(broken_cross_refs)}")
    print(f"  Total defined labels: {len(all_labels)}")
    
    # Broken figure references
    if broken_figure_refs:
        print(f"\n=== BROKEN FIGURE/IMAGE REFERENCES ({len(broken_figure_refs)}) ===")
        
        # Group by file for better readability
        by_file = defaultdict(list)
        for ref in broken_figure_refs:
            by_file[ref['md_file']].append(ref)
        
        for md_file in sorted(by_file.keys()):
            refs = by_file[md_file]
            print(f"\n📄 {md_file} ({len(refs)} broken references):")
            
            for ref in refs:
                print(f"  ❌ Line {ref['line']:3d}: {ref['type']} reference")
                print(f"     Referenced: {ref['referenced_path']}")
                print(f"     Resolved:   {ref['resolved_path']}")
                print(f"     Content:    {ref['line_content'][:80]}{'...' if len(ref['line_content']) > 80 else ''}")
                print()
    else:
        print(f"\n✅ No broken figure/image references found!")
    
    # Broken cross-references  
    if broken_cross_refs:
        print(f"\n=== BROKEN CROSS-REFERENCES ({len(broken_cross_refs)}) ===")
        
        by_file = defaultdict(list)
        for ref in broken_cross_refs:
            by_file[ref['md_file']].append(ref)
        
        for md_file in sorted(by_file.keys()):
            refs = by_file[md_file]
            print(f"\n📄 {md_file} ({len(refs)} broken cross-references):")
            
            for ref in refs:
                print(f"  ❌ Line {ref['line']:3d}: {ref['type']} reference to '{ref['label']}'")
                print(f"     Content:    {ref['line_content'][:80]}{'...' if len(ref['line_content']) > 80 else ''}")
                print()
    else:
        print(f"\n✅ No broken cross-references found!")

def save_results(broken_figure_refs, broken_cross_refs, output_file):
    """Save results to a file."""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Broken References Report\n\n")
        f.write(f"Generated by find_broken_references.py\n\n")
        
        f.write(f"## Summary\n")
        f.write(f"- Broken figure/image references: {len(broken_figure_refs)}\n")
        f.write(f"- Broken cross-references: {len(broken_cross_refs)}\n\n")
        
        if broken_figure_refs:
            f.write(f"## Broken Figure/Image References ({len(broken_figure_refs)})\n\n")
            
            by_file = defaultdict(list)
            for ref in broken_figure_refs:
                by_file[ref['md_file']].append(ref)
            
            for md_file in sorted(by_file.keys()):
                refs = by_file[md_file]
                f.write(f"### {md_file}\n\n")
                
                for ref in refs:
                    f.write(f"- **Line {ref['line']}**: {ref['type']} reference\n")
                    f.write(f"  - Referenced: `{ref['referenced_path']}`\n")
                    f.write(f"  - Resolved: `{ref['resolved_path']}`\n")
                    f.write(f"  - Content: `{ref['line_content']}`\n\n")
        
        if broken_cross_refs:
            f.write(f"## Broken Cross-References ({len(broken_cross_refs)})\n\n")
            
            by_file = defaultdict(list)
            for ref in broken_cross_refs:
                by_file[ref['md_file']].append(ref)
            
            for md_file in sorted(by_file.keys()):
                refs = by_file[md_file]
                f.write(f"### {md_file}\n\n")
                
                for ref in refs:
                    f.write(f"- **Line {ref['line']}**: {ref['type']} reference to `{ref['label']}`\n")
                    f.write(f"  - Content: `{ref['line_content']}`\n\n")

def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(description='Find broken references in the optics textbook')
    parser.add_argument('--content-dir', default='content',
                       help='Content directory to scan (default: content)')
    parser.add_argument('--output-file',
                       help='Save results to file (optional)')
    
    args = parser.parse_args()
    
    # Find broken references
    broken_figure_refs, broken_cross_refs, all_labels = find_broken_references(args.content_dir)
    
    # Print results
    print_results(broken_figure_refs, broken_cross_refs, all_labels)
    
    # Save to file if requested
    if args.output_file:
        save_results(broken_figure_refs, broken_cross_refs, args.output_file)
        print(f"\n📄 Results saved to '{args.output_file}'")

if __name__ == "__main__":
    main()