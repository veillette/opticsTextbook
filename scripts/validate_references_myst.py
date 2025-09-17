#!/usr/bin/env python3
"""
Script to validate references using MyST's built-in validation.

This script leverages MyST's native validation by:
1. Running the MyST build process
2. Capturing and parsing warning/error messages
3. Categorizing issues (missing figures, broken cross-refs, etc.)
4. Providing a clean summary report

This approach is more reliable than manual parsing since it uses
MyST's own reference resolution system.

Usage:
    python validate_references_myst.py [--output-file validation_report.txt]
"""

import subprocess
import re
import argparse
from collections import defaultdict, Counter
import os

def run_myst_build():
    """Run MyST build and capture output."""
    print("Running MyST build to check references...")
    
    try:
        # Run the build command and capture both stdout and stderr
        result = subprocess.run(
            ['npm', 'run', 'build'], 
            capture_output=True, 
            text=True, 
            timeout=300  # 5 minute timeout
        )
        
        # Combine stdout and stderr as MyST may output to either
        output = result.stdout + "\n" + result.stderr
        return output, result.returncode
        
    except subprocess.TimeoutExpired:
        return "Build timed out after 5 minutes", 1
    except subprocess.CalledProcessError as e:
        return f"Build failed: {e}", 1
    except FileNotFoundError:
        return "npm not found. Please ensure Node.js is installed.", 1

def parse_myst_warnings(build_output):
    """Parse MyST build output for warnings and errors."""
    issues = {
        'missing_figures': [],
        'broken_cross_refs': [],
        'missing_labels': [],
        'other_warnings': [],
        'errors': []
    }
    
    lines = build_output.split('\n')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # MyST warning patterns
        if '⚠️' in line or 'WARNING' in line.upper():
            if 'cross reference target was not found' in line.lower():
                # Extract file and reference
                match = re.search(r'(\S+\.md)\s+Cross reference target was not found:\s*(.+)', line)
                if match:
                    file_path = match.group(1)
                    target = match.group(2).strip()
                    issues['broken_cross_refs'].append({
                        'file': file_path,
                        'target': target,
                        'line_content': line
                    })
                else:
                    issues['other_warnings'].append(line)
                    
            elif 'file not found' in line.lower() or 'image not found' in line.lower():
                # Extract file and missing image
                match = re.search(r'(\S+\.md).*?(\S+\.(png|jpg|jpeg|gif|svg))', line, re.IGNORECASE)
                if match:
                    file_path = match.group(1)
                    image_path = match.group(2)
                    issues['missing_figures'].append({
                        'file': file_path,
                        'image': image_path,
                        'line_content': line
                    })
                else:
                    issues['other_warnings'].append(line)
            else:
                issues['other_warnings'].append(line)
                
        # MyST error patterns
        elif '❌' in line or 'ERROR' in line.upper():
            issues['errors'].append(line)
    
    return issues

def analyze_broken_references(broken_refs):
    """Analyze patterns in broken cross-references."""
    ref_types = Counter()
    files_with_issues = Counter()
    
    for ref in broken_refs:
        # Extract reference type (eq, fig, numref, etc.)
        target = ref['target']
        if '.' in target:
            ref_type = target.split('.')[0]
        else:
            ref_type = 'label'
            
        ref_types[ref_type] += 1
        files_with_issues[ref['file']] += 1
    
    return ref_types, files_with_issues

def print_validation_report(issues):
    """Print a formatted validation report."""
    print(f"\n=== MyST VALIDATION REPORT ===")
    
    # Summary
    total_issues = (len(issues['missing_figures']) + 
                   len(issues['broken_cross_refs']) + 
                   len(issues['other_warnings']) + 
                   len(issues['errors']))
    
    print(f"\nSUMMARY:")
    print(f"  Missing figures: {len(issues['missing_figures'])}")
    print(f"  Broken cross-references: {len(issues['broken_cross_refs'])}")
    print(f"  Other warnings: {len(issues['other_warnings'])}")
    print(f"  Errors: {len(issues['errors'])}")
    print(f"  Total issues: {total_issues}")
    
    # Missing figures
    if issues['missing_figures']:
        print(f"\n=== MISSING FIGURES ({len(issues['missing_figures'])}) ===")
        
        by_file = defaultdict(list)
        for issue in issues['missing_figures']:
            by_file[issue['file']].append(issue)
            
        for file_path in sorted(by_file.keys()):
            file_issues = by_file[file_path]
            print(f"\n📄 {file_path} ({len(file_issues)} missing figures):")
            for issue in file_issues:
                print(f"  ❌ Missing: {issue['image']}")
    else:
        print(f"\n✅ No missing figures found!")
    
    # Broken cross-references
    if issues['broken_cross_refs']:
        print(f"\n=== BROKEN CROSS-REFERENCES ({len(issues['broken_cross_refs'])}) ===")
        
        # Analyze patterns
        ref_types, files_with_issues = analyze_broken_references(issues['broken_cross_refs'])
        
        print(f"\nReference types with issues:")
        for ref_type, count in ref_types.most_common():
            print(f"  {ref_type}: {count} references")
        
        print(f"\nFiles with most issues:")
        for file_path, count in files_with_issues.most_common(5):
            short_path = file_path.replace('content/', '')
            print(f"  {short_path}: {count} broken references")
        
        # Show detailed breakdown by file
        by_file = defaultdict(list)
        for issue in issues['broken_cross_refs']:
            by_file[issue['file']].append(issue)
            
        print(f"\nDetailed breakdown:")
        for file_path in sorted(by_file.keys())[:5]:  # Show top 5 files
            file_issues = by_file[file_path]
            short_path = file_path.replace('content/', '')
            print(f"\n📄 {short_path} ({len(file_issues)} broken references):")
            
            # Group by reference type
            by_type = defaultdict(list)
            for issue in file_issues:
                target = issue['target']
                if '.' in target:
                    ref_type = target.split('.')[0]
                else:
                    ref_type = 'label'
                by_type[ref_type].append(target)
            
            for ref_type in sorted(by_type.keys()):
                targets = by_type[ref_type]
                print(f"  ❌ {ref_type}: {', '.join(targets[:5])}{'...' if len(targets) > 5 else ''}")
                
    else:
        print(f"\n✅ No broken cross-references found!")
    
    # Other warnings and errors
    if issues['other_warnings']:
        print(f"\n=== OTHER WARNINGS ({len(issues['other_warnings'])}) ===")
        for warning in issues['other_warnings'][:10]:  # Show first 10
            print(f"  ⚠️  {warning}")
        if len(issues['other_warnings']) > 10:
            print(f"  ... and {len(issues['other_warnings']) - 10} more warnings")
    
    if issues['errors']:
        print(f"\n=== ERRORS ({len(issues['errors'])}) ===")
        for error in issues['errors']:
            print(f"  ❌ {error}")

def save_validation_report(issues, output_file):
    """Save validation report to a file."""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# MyST Validation Report\n\n")
        f.write("Generated by validate_references_myst.py using MyST's built-in validation\n\n")
        
        # Summary
        total_issues = (len(issues['missing_figures']) + 
                       len(issues['broken_cross_refs']) + 
                       len(issues['other_warnings']) + 
                       len(issues['errors']))
        
        f.write("## Summary\n\n")
        f.write(f"- Missing figures: {len(issues['missing_figures'])}\n")
        f.write(f"- Broken cross-references: {len(issues['broken_cross_refs'])}\n")
        f.write(f"- Other warnings: {len(issues['other_warnings'])}\n")
        f.write(f"- Errors: {len(issues['errors'])}\n")
        f.write(f"- **Total issues: {total_issues}**\n\n")
        
        # Missing figures
        if issues['missing_figures']:
            f.write(f"## Missing Figures ({len(issues['missing_figures'])})\n\n")
            
            by_file = defaultdict(list)
            for issue in issues['missing_figures']:
                by_file[issue['file']].append(issue)
                
            for file_path in sorted(by_file.keys()):
                file_issues = by_file[file_path]
                f.write(f"### {file_path}\n\n")
                for issue in file_issues:
                    f.write(f"- Missing: `{issue['image']}`\n")
                f.write("\n")
        
        # Broken cross-references
        if issues['broken_cross_refs']:
            f.write(f"## Broken Cross-References ({len(issues['broken_cross_refs'])})\n\n")
            
            ref_types, files_with_issues = analyze_broken_references(issues['broken_cross_refs'])
            
            f.write("### Reference Types with Issues\n\n")
            for ref_type, count in ref_types.most_common():
                f.write(f"- **{ref_type}**: {count} references\n")
            f.write("\n")
            
            f.write("### Files with Issues\n\n")
            by_file = defaultdict(list)
            for issue in issues['broken_cross_refs']:
                by_file[issue['file']].append(issue)
                
            for file_path in sorted(by_file.keys()):
                file_issues = by_file[file_path]
                f.write(f"#### {file_path} ({len(file_issues)} broken references)\n\n")
                
                # Group by reference type  
                by_type = defaultdict(list)
                for issue in file_issues:
                    target = issue['target']
                    if '.' in target:
                        ref_type = target.split('.')[0]
                    else:
                        ref_type = 'label'
                    by_type[ref_type].append(target)
                
                for ref_type in sorted(by_type.keys()):
                    targets = by_type[ref_type]
                    f.write(f"- **{ref_type}**: {', '.join(f'`{t}`' for t in targets)}\n")
                f.write("\n")

def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(description='Validate references using MyST build')
    parser.add_argument('--output-file',
                       help='Save validation report to file (optional)')
    parser.add_argument('--quiet', action='store_true',
                       help='Only show summary, not detailed output')
    
    args = parser.parse_args()
    
    # Run MyST build
    build_output, return_code = run_myst_build()
    
    if "npm not found" in build_output:
        print("❌ Error: npm not found. Please ensure Node.js is installed.")
        return 1
        
    if "Build timed out" in build_output:
        print("❌ Error: Build timed out. The project may be too large or have infinite loops.")
        return 1
    
    # Parse warnings and errors
    issues = parse_myst_warnings(build_output)
    
    # Print report
    if not args.quiet:
        print_validation_report(issues)
    else:
        total_issues = (len(issues['missing_figures']) + 
                       len(issues['broken_cross_refs']) + 
                       len(issues['other_warnings']) + 
                       len(issues['errors']))
        print(f"MyST Validation: {total_issues} total issues found")
        print(f"  Missing figures: {len(issues['missing_figures'])}")
        print(f"  Broken cross-references: {len(issues['broken_cross_refs'])}")
    
    # Save to file if requested
    if args.output_file:
        save_validation_report(issues, args.output_file)
        print(f"\n📄 Validation report saved to '{args.output_file}'")
    
    # Return appropriate exit code
    if len(issues['errors']) > 0:
        return 1
    elif len(issues['missing_figures']) + len(issues['broken_cross_refs']) > 0:
        return 0  # Warnings but no errors
    else:
        print("\n✅ No validation issues found!")
        return 0

if __name__ == "__main__":
    exit(main())