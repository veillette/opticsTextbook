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
from typing import List, Dict, Tuple, Optional, Union, Any

# Import shared utilities
from shared_utils import ensure_directory
from report_utils import ReportGenerator, MarkdownReportBuilder

def find_markdown_files(content_dir: str) -> List[str]:
    """Find all markdown files in the content directory."""
    md_pattern = os.path.join(content_dir, '**', '*.md')
    return glob.glob(md_pattern, recursive=True)

def extract_figure_references(md_file: Union[str, Path]) -> List[Dict[str, Any]]:
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

def extract_cross_references(md_file: Union[str, Path]) -> List[Dict[str, Any]]:
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

def extract_labels(md_file: Union[str, Path]) -> List[str]:
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

def normalize_image_path(image_path: str, md_file_dir: str, content_dir: str) -> Tuple[Optional[str], str]:
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

def find_broken_references(content_dir: str = 'content') -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]], List[str]]:
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

def print_results(broken_figure_refs: List[Dict[str, Any]], broken_cross_refs: List[Dict[str, Any]], all_labels: List[str]) -> None:
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

def save_results(broken_figure_refs: List[Dict[str, Any]], broken_cross_refs: List[Dict[str, Any]], output_file: str) -> str:
    """Save results to a file using shared report utilities."""
    # Extract report name from output_file
    report_name = Path(output_file).stem

    # Create report generator
    gen = ReportGenerator(report_name)

    # Build markdown report
    builder = MarkdownReportBuilder("Broken References Report")

    # Add summary
    builder.add_section("Summary", level=2)
    builder.add_list([
        f"Broken figure/image references: {len(broken_figure_refs)}",
        f"Broken cross-references: {len(broken_cross_refs)}"
    ])

    # Add broken figure references
    if broken_figure_refs:
        builder.add_section(f"Broken Figure/Image References ({len(broken_figure_refs)})", level=2)

        by_file = defaultdict(list)
        for ref in broken_figure_refs:
            by_file[ref['md_file']].append(ref)

        for md_file in sorted(by_file.keys()):
            refs = by_file[md_file]
            builder.add_section(md_file, level=3)

            for ref in refs:
                builder.add_text(f"**Line {ref['line']}**: {ref['type']} reference\n")
                builder.add_list([
                    f"Referenced: `{ref['referenced_path']}`",
                    f"Resolved: `{ref['resolved_path']}`",
                    f"Content: `{ref['line_content']}`"
                ])

    # Add broken cross-references
    if broken_cross_refs:
        builder.add_section(f"Broken Cross-References ({len(broken_cross_refs)})", level=2)

        by_file = defaultdict(list)
        for ref in broken_cross_refs:
            by_file[ref['md_file']].append(ref)

        for md_file in sorted(by_file.keys()):
            refs = by_file[md_file]
            builder.add_section(md_file, level=3)

            for ref in refs:
                builder.add_text(f"**Line {ref['line']}**: {ref['type']} reference to `{ref['label']}`\n")
                builder.add_list([f"Content: `{ref['line_content']}`"])

    # Write markdown report
    markdown_content = builder.build()
    filepath = gen.write_markdown(markdown_content)

    # Also write JSON report for machine processing
    json_data = {
        'broken_figure_refs': len(broken_figure_refs),
        'broken_cross_refs': len(broken_cross_refs),
        'figure_references': [
            {
                'md_file': ref['md_file'],
                'line': ref['line'],
                'type': ref['type'],
                'referenced_path': ref['referenced_path'],
                'resolved_path': ref['resolved_path'],
                'line_content': ref['line_content']
            }
            for ref in broken_figure_refs
        ],
        'cross_references': [
            {
                'md_file': ref['md_file'],
                'line': ref['line'],
                'type': ref['type'],
                'label': ref['label'],
                'line_content': ref['line_content']
            }
            for ref in broken_cross_refs
        ]
    }
    gen.write_json(json_data)

    return str(filepath)

def main() -> int:
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