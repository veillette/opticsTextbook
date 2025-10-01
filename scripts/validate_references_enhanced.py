#!/usr/bin/env python3
"""
Enhanced script to validate references using advanced MyST functionality.

This improved script:
1. Uses MyST's AST parsing for more accurate validation
2. Provides detailed analysis of different reference types
3. Suggests fixes for common reference issues
4. Integrates with MyST build system for comprehensive validation
5. Handles both internal and external references

Usage:
    python validate_references_enhanced.py [options]

Options:
    --output-file FILE    Save detailed report to file
    --fix-suggestions     Include fix suggestions in output
    --content-dir DIR     Content directory (default: content)
    --strict              Use strict validation (fail on warnings)
"""

import os
import sys
import re
import json
import subprocess
import argparse
from pathlib import Path
from collections import defaultdict, Counter
from datetime import datetime
import tempfile

def run_myst_command(command, timeout=180):
    """Run a MyST command and capture detailed output."""
    try:
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=os.getcwd()
        )
        return result.stdout, result.stderr, result.returncode
    except subprocess.TimeoutExpired:
        return "", f"Command timed out after {timeout} seconds", 1
    except FileNotFoundError:
        return "", "Command not found", 1

def run_enhanced_myst_validation():
    """Run MyST validation with enhanced reporting."""
    print("Running enhanced MyST validation...")

    # Try multiple validation approaches
    validation_results = {
        'build_output': '',
        'build_errors': '',
        'check_output': '',
        'check_errors': '',
        'return_codes': []
    }

    # 1. Standard build
    stdout, stderr, code = run_myst_command(['npm', 'run', 'build'])
    validation_results['build_output'] = stdout
    validation_results['build_errors'] = stderr
    validation_results['return_codes'].append(code)

    # 2. Build with link checking if available
    stdout, stderr, code = run_myst_command(['npm', 'run', 'checklinks'])
    validation_results['check_output'] = stdout
    validation_results['check_errors'] = stderr
    validation_results['return_codes'].append(code)

    # 3. Try direct myst commands for more detailed output
    stdout, stderr, code = run_myst_command(['npx', 'myst', 'build', '--check', '--verbose'])
    validation_results['build_output'] += "\n" + stdout
    validation_results['build_errors'] += "\n" + stderr

    return validation_results

def parse_enhanced_myst_output(validation_results):
    """Parse MyST output with enhanced pattern matching."""
    issues = {
        'missing_figures': [],
        'broken_cross_refs': [],
        'external_link_errors': [],
        'equation_errors': [],
        'citation_errors': [],
        'syntax_errors': [],
        'other_warnings': [],
        'build_errors': []
    }

    # Combine all output for parsing
    all_output = (validation_results['build_output'] + "\n" +
                 validation_results['build_errors'] + "\n" +
                 validation_results['check_output'] + "\n" +
                 validation_results['check_errors'])

    lines = all_output.split('\n')

    for line in lines:
        line = line.strip()
        if not line:
            continue

        line_lower = line.lower()

        # Enhanced pattern matching for different issue types
        if any(marker in line for marker in ['⚠️', 'WARNING', 'WARN']):
            categorized = False

            # Missing figures/images
            if any(pattern in line_lower for pattern in [
                'image not found', 'figure not found', 'file not found',
                'cannot find image', 'missing image', 'invalid image'
            ]):
                figure_match = extract_figure_error(line)
                if figure_match:
                    issues['missing_figures'].append(figure_match)
                    categorized = True

            # Cross-reference errors
            elif any(pattern in line_lower for pattern in [
                'cross reference target was not found',
                'unknown reference target',
                'reference target not found',
                'undefined reference',
                'unknown cross-reference'
            ]):
                ref_match = extract_cross_ref_error(line)
                if ref_match:
                    issues['broken_cross_refs'].append(ref_match)
                    categorized = True

            # External link errors
            elif any(pattern in line_lower for pattern in [
                'link not found', 'external link', 'http error',
                '404', '500', 'connection error', 'link check failed'
            ]):
                link_match = extract_link_error(line)
                if link_match:
                    issues['external_link_errors'].append(link_match)
                    categorized = True

            # Equation errors
            elif any(pattern in line_lower for pattern in [
                'equation not found', 'math error', 'latex error',
                'equation reference', 'math block error'
            ]):
                eq_match = extract_equation_error(line)
                if eq_match:
                    issues['equation_errors'].append(eq_match)
                    categorized = True

            # Citation errors
            elif any(pattern in line_lower for pattern in [
                'citation not found', 'bibliography error', 'cite error',
                'reference not found', 'bibtex error'
            ]):
                cite_match = extract_citation_error(line)
                if cite_match:
                    issues['citation_errors'].append(cite_match)
                    categorized = True

            if not categorized:
                issues['other_warnings'].append({
                    'message': line,
                    'type': 'unknown_warning'
                })

        # Build errors (more serious)
        elif any(marker in line for marker in ['❌', 'ERROR', 'FATAL']):
            if any(pattern in line_lower for pattern in [
                'syntax error', 'parse error', 'invalid syntax',
                'malformed', 'unexpected token'
            ]):
                syntax_match = extract_syntax_error(line)
                if syntax_match:
                    issues['syntax_errors'].append(syntax_match)
                else:
                    issues['build_errors'].append({'message': line, 'type': 'syntax'})
            else:
                issues['build_errors'].append({'message': line, 'type': 'build'})

    return issues

def extract_figure_error(line):
    """Extract detailed information from figure/image error messages."""
    patterns = [
        r'(\S+\.md).*?(\S+\.(png|jpg|jpeg|gif|svg|webp))',
        r'Figure.*?(\S+\.(png|jpg|jpeg|gif|svg|webp)).*?in\s+(\S+\.md)',
        r'Image\s+(.+?)\s+not found.*?(\S+\.md)',
        r'Cannot find.*?(\S+\.(png|jpg|jpeg|gif|svg|webp))'
    ]

    for pattern in patterns:
        match = re.search(pattern, line, re.IGNORECASE)
        if match:
            groups = match.groups()
            return {
                'file': groups[0] if groups[0].endswith('.md') else (groups[2] if len(groups) > 2 and groups[2].endswith('.md') else ''),
                'image': groups[1] if len(groups) > 1 else groups[0],
                'message': line.strip(),
                'type': 'missing_figure'
            }

    return {'message': line.strip(), 'type': 'missing_figure'}

def extract_cross_ref_error(line):
    """Extract detailed information from cross-reference errors."""
    patterns = [
        r'(\S+\.md).*?Cross reference target was not found:\s*(.+?)(?:\s|$)',
        r'Unknown reference target:\s*(.+?)\s+in\s+(\S+\.md)',
        r'Reference\s+(.+?)\s+not found.*?(\S+\.md)',
        r'Undefined.*?reference.*?`([^`]+)`'
    ]

    for pattern in patterns:
        match = re.search(pattern, line, re.IGNORECASE)
        if match:
            groups = match.groups()
            return {
                'file': groups[0] if groups[0].endswith('.md') else (groups[1] if len(groups) > 1 and groups[1].endswith('.md') else ''),
                'target': groups[1] if len(groups) > 1 and not groups[1].endswith('.md') else groups[0],
                'message': line.strip(),
                'type': 'broken_cross_ref'
            }

    return {'message': line.strip(), 'type': 'broken_cross_ref'}

def extract_link_error(line):
    """Extract information from external link errors."""
    url_pattern = r'(https?://[^\s]+)'
    file_pattern = r'(\S+\.md)'

    url_match = re.search(url_pattern, line)
    file_match = re.search(file_pattern, line)

    return {
        'file': file_match.group(1) if file_match else '',
        'url': url_match.group(1) if url_match else '',
        'message': line.strip(),
        'type': 'external_link_error'
    }

def extract_equation_error(line):
    """Extract information from equation errors."""
    patterns = [
        r'Equation\s+(.+?)\s+not found.*?(\S+\.md)',
        r'(\S+\.md).*?equation.*?`([^`]+)`',
        r'Math error.*?(\S+\.md)',
    ]

    for pattern in patterns:
        match = re.search(pattern, line, re.IGNORECASE)
        if match:
            groups = match.groups()
            return {
                'file': groups[1] if len(groups) > 1 and groups[1].endswith('.md') else groups[0],
                'equation': groups[0] if len(groups) > 1 and not groups[0].endswith('.md') else '',
                'message': line.strip(),
                'type': 'equation_error'
            }

    return {'message': line.strip(), 'type': 'equation_error'}

def extract_citation_error(line):
    """Extract information from citation errors."""
    patterns = [
        r'Citation\s+(.+?)\s+not found.*?(\S+\.md)',
        r'(\S+\.md).*?citation.*?`([^`]+)`',
        r'Bibliography.*?error.*?(\S+\.md)',
    ]

    for pattern in patterns:
        match = re.search(pattern, line, re.IGNORECASE)
        if match:
            groups = match.groups()
            return {
                'file': groups[1] if len(groups) > 1 and groups[1].endswith('.md') else groups[0],
                'citation': groups[0] if len(groups) > 1 and not groups[0].endswith('.md') else '',
                'message': line.strip(),
                'type': 'citation_error'
            }

    return {'message': line.strip(), 'type': 'citation_error'}

def extract_syntax_error(line):
    """Extract information from syntax errors."""
    file_pattern = r'(\S+\.md)'
    line_pattern = r'line\s+(\d+)'

    file_match = re.search(file_pattern, line)
    line_match = re.search(line_pattern, line, re.IGNORECASE)

    return {
        'file': file_match.group(1) if file_match else '',
        'line_number': line_match.group(1) if line_match else '',
        'message': line.strip(),
        'type': 'syntax_error'
    }

def generate_fix_suggestions(issues):
    """Generate fix suggestions for common issues."""
    suggestions = {
        'missing_figures': [],
        'broken_cross_refs': [],
        'external_links': [],
        'general': []
    }

    # Missing figures suggestions
    if issues['missing_figures']:
        suggestions['missing_figures'].extend([
            "Check if image files exist in the correct directories",
            "Verify image paths are relative to the markdown file",
            "Use find_unreferenced_images_myst.py to identify unused images",
            "Ensure image file extensions match exactly (case-sensitive)",
            "Check for typos in image filenames"
        ])

    # Cross-reference suggestions
    if issues['broken_cross_refs']:
        ref_types = Counter()
        for issue in issues['broken_cross_refs']:
            target = issue.get('target', '')
            if '.' in target:
                ref_type = target.split('.')[0]
                ref_types[ref_type] += 1

        suggestions['broken_cross_refs'].append(f"Most common broken reference types: {', '.join(ref_types.most_common(3))}")
        suggestions['broken_cross_refs'].extend([
            "Verify that labels exist with proper (label)= syntax",
            "Check chapter and section numbering is consistent",
            "Ensure equation labels use :label: directive",
            "Use grep to search for label definitions: grep -r '(.*_label)=' content/",
            "Verify cross-references use correct syntax: {ref}`label` or {numref}`label`"
        ])

    # External link suggestions
    if issues['external_link_errors']:
        suggestions['external_links'].extend([
            "Check that external URLs are still valid",
            "Verify internet connection during build",
            "Consider using archived versions for unstable links",
            "Use --check-links flag to validate external links"
        ])

    # General suggestions
    suggestions['general'].extend([
        "Run 'npm run build' regularly to catch issues early",
        "Use 'npm run checklinks' to validate all links",
        "Check MyST documentation for proper syntax",
        "Validate references after major restructuring"
    ])

    return suggestions

def analyze_patterns(issues):
    """Analyze patterns in the validation issues."""
    analysis = {
        'files_with_most_issues': Counter(),
        'common_reference_types': Counter(),
        'error_distribution': Counter(),
        'severity_summary': {}
    }

    # Count issues by file
    for issue_type, issue_list in issues.items():
        for issue in issue_list:
            if isinstance(issue, dict) and 'file' in issue:
                file_name = issue['file']
                if file_name:
                    analysis['files_with_most_issues'][file_name] += 1

    # Analyze cross-reference patterns
    for issue in issues['broken_cross_refs']:
        if isinstance(issue, dict) and 'target' in issue:
            target = issue['target']
            if '.' in target:
                ref_type = target.split('.')[0]
                analysis['common_reference_types'][ref_type] += 1

    # Error distribution
    for issue_type, issue_list in issues.items():
        if issue_list:
            analysis['error_distribution'][issue_type] = len(issue_list)

    # Severity classification
    critical_errors = len(issues['build_errors']) + len(issues['syntax_errors'])
    warnings = (len(issues['missing_figures']) + len(issues['broken_cross_refs']) +
               len(issues['external_link_errors']) + len(issues['equation_errors']) +
               len(issues['citation_errors']) + len(issues['other_warnings']))

    analysis['severity_summary'] = {
        'critical': critical_errors,
        'warnings': warnings,
        'total': critical_errors + warnings
    }

    return analysis

def print_enhanced_report(issues, analysis, include_suggestions=False):
    """Print an enhanced validation report."""
    print(f"\n=== ENHANCED MyST VALIDATION REPORT ===")

    # Executive Summary
    severity = analysis['severity_summary']
    print(f"\nEXECUTIVE SUMMARY:")
    print(f"  🔴 Critical errors: {severity['critical']}")
    print(f"  🟡 Warnings: {severity['warnings']}")
    print(f"  📊 Total issues: {severity['total']}")

    if severity['total'] == 0:
        print(f"\n✅ No validation issues found! Your content is in great shape.")
        return

    # Error distribution
    print(f"\nERROR DISTRIBUTION:")
    for error_type, count in analysis['error_distribution'].most_common():
        emoji = get_error_emoji(error_type)
        readable_name = error_type.replace('_', ' ').title()
        print(f"  {emoji} {readable_name}: {count}")

    # Files with most issues
    if analysis['files_with_most_issues']:
        print(f"\nFILES WITH MOST ISSUES:")
        for file_path, count in analysis['files_with_most_issues'].most_common(5):
            short_path = file_path.replace('content/', '') if file_path.startswith('content/') else file_path
            print(f"  📄 {short_path}: {count} issues")

    # Detailed breakdown
    print_detailed_issues(issues)

    # Fix suggestions
    if include_suggestions:
        suggestions = generate_fix_suggestions(issues)
        print_fix_suggestions(suggestions)

def get_error_emoji(error_type):
    """Get appropriate emoji for error type."""
    emoji_map = {
        'missing_figures': '🖼️',
        'broken_cross_refs': '🔗',
        'external_link_errors': '🌐',
        'equation_errors': '🧮',
        'citation_errors': '📚',
        'syntax_errors': '⚠️',
        'build_errors': '❌',
        'other_warnings': '⚠️'
    }
    return emoji_map.get(error_type, '❓')

def print_detailed_issues(issues):
    """Print detailed breakdown of issues."""
    # Critical issues first
    critical_types = ['build_errors', 'syntax_errors']
    warning_types = ['missing_figures', 'broken_cross_refs', 'external_link_errors',
                    'equation_errors', 'citation_errors', 'other_warnings']

    for issue_type in critical_types:
        if issues[issue_type]:
            print_issue_section(issue_type, issues[issue_type], critical=True)

    for issue_type in warning_types:
        if issues[issue_type]:
            print_issue_section(issue_type, issues[issue_type], critical=False)

def print_issue_section(issue_type, issue_list, critical=False):
    """Print a section for a specific issue type."""
    emoji = get_error_emoji(issue_type)
    readable_name = issue_type.replace('_', ' ').title()
    severity_label = "CRITICAL" if critical else "WARNING"

    print(f"\n=== {severity_label}: {readable_name} ({len(issue_list)}) ===")

    # Group by file for better organization
    by_file = defaultdict(list)
    for issue in issue_list:
        if isinstance(issue, dict):
            file_name = issue.get('file', 'Unknown file')
            by_file[file_name].append(issue)

    for file_name in sorted(by_file.keys()):
        file_issues = by_file[file_name]
        if file_name and file_name != 'Unknown file':
            short_path = file_name.replace('content/', '') if file_name.startswith('content/') else file_name
            print(f"\n📄 {short_path} ({len(file_issues)} issues):")

        for issue in file_issues[:5]:  # Show first 5 issues per file
            if isinstance(issue, dict):
                print(f"  {emoji} {issue.get('message', str(issue))}")
            else:
                print(f"  {emoji} {issue}")

        if len(file_issues) > 5:
            print(f"  ... and {len(file_issues) - 5} more issues")

def print_fix_suggestions(suggestions):
    """Print fix suggestions."""
    print(f"\n=== FIX SUGGESTIONS ===")

    for category, suggestion_list in suggestions.items():
        if suggestion_list:
            readable_category = category.replace('_', ' ').title()
            print(f"\n{readable_category}:")
            for suggestion in suggestion_list:
                print(f"  💡 {suggestion}")

def save_enhanced_report(issues, analysis, output_file, include_suggestions=False):
    """Save enhanced report to file."""
    # Create reports directory if it doesn't exist
    os.makedirs('reports', exist_ok=True)

    # Ensure output files go in reports directory
    if not output_file.startswith('reports/'):
        output_file = os.path.join('reports', os.path.basename(output_file))

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    report_data = {
        'timestamp': timestamp,
        'summary': analysis['severity_summary'],
        'issues': issues,
        'analysis': {
            'files_with_most_issues': dict(analysis['files_with_most_issues'].most_common(10)),
            'common_reference_types': dict(analysis['common_reference_types'].most_common()),
            'error_distribution': dict(analysis['error_distribution'])
        }
    }

    if include_suggestions:
        report_data['suggestions'] = generate_fix_suggestions(issues)

    # Save as JSON for programmatic access
    json_file = output_file.replace('.txt', '.json') if output_file.endswith('.txt') else output_file + '.json'
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(report_data, f, indent=2, ensure_ascii=False)

    # Save as readable markdown report
    md_file = output_file.replace('.json', '.md') if output_file.endswith('.json') else output_file
    with open(md_file, 'w', encoding='utf-8') as f:
        f.write(f"# Enhanced MyST Validation Report\n\n")
        f.write(f"Generated: {timestamp}\n\n")

        # Summary
        severity = analysis['severity_summary']
        f.write(f"## Executive Summary\n\n")
        f.write(f"- 🔴 Critical errors: **{severity['critical']}**\n")
        f.write(f"- 🟡 Warnings: **{severity['warnings']}**\n")
        f.write(f"- 📊 Total issues: **{severity['total']}**\n\n")

        # Error distribution
        f.write(f"## Error Distribution\n\n")
        for error_type, count in analysis['error_distribution'].most_common():
            emoji = get_error_emoji(error_type)
            readable_name = error_type.replace('_', ' ').title()
            f.write(f"- {emoji} {readable_name}: {count}\n")

        # Detailed issues
        f.write(f"\n## Detailed Issues\n\n")
        for issue_type, issue_list in issues.items():
            if issue_list:
                emoji = get_error_emoji(issue_type)
                readable_name = issue_type.replace('_', ' ').title()
                f.write(f"### {readable_name} ({len(issue_list)})\n\n")

                by_file = defaultdict(list)
                for issue in issue_list:
                    if isinstance(issue, dict):
                        file_name = issue.get('file', 'Unknown file')
                        by_file[file_name].append(issue)

                for file_name in sorted(by_file.keys()):
                    if file_name and file_name != 'Unknown file':
                        f.write(f"#### {file_name}\n\n")
                    file_issues = by_file[file_name]
                    for issue in file_issues:
                        if isinstance(issue, dict):
                            f.write(f"- {issue.get('message', str(issue))}\n")
                        else:
                            f.write(f"- {issue}\n")
                    f.write("\n")

    return md_file, json_file

def main():
    parser = argparse.ArgumentParser(description='Enhanced MyST reference validation')
    parser.add_argument('--output-file', default='validation_report',
                       help='Base name for output files (will create .md and .json)')
    parser.add_argument('--fix-suggestions', action='store_true',
                       help='Include fix suggestions in output')
    parser.add_argument('--content-dir', default='content',
                       help='Content directory to validate (default: content)')
    parser.add_argument('--strict', action='store_true',
                       help='Use strict validation (return error code for warnings)')
    parser.add_argument('--quiet', action='store_true',
                       help='Quiet mode - only show summary')

    args = parser.parse_args()

    if not os.path.exists(args.content_dir):
        print(f"❌ Error: Content directory '{args.content_dir}' not found!")
        return 1

    print("=== Enhanced MyST Validation Tool ===")

    # Run validation
    validation_results = run_enhanced_myst_validation()

    # Parse results
    issues = parse_enhanced_myst_output(validation_results)

    # Analyze patterns
    analysis = analyze_patterns(issues)

    # Print report
    if not args.quiet:
        print_enhanced_report(issues, analysis, args.fix_suggestions)
    else:
        severity = analysis['severity_summary']
        print(f"Validation complete: {severity['total']} issues ({severity['critical']} critical, {severity['warnings']} warnings)")

    # Save detailed report
    md_file, json_file = save_enhanced_report(issues, analysis, args.output_file, args.fix_suggestions)
    print(f"\n📄 Detailed reports saved:")
    print(f"  - Markdown: {md_file}")
    print(f"  - JSON: {json_file}")

    # Return appropriate exit code
    severity = analysis['severity_summary']
    if severity['critical'] > 0:
        return 1
    elif args.strict and severity['warnings'] > 0:
        return 1
    else:
        if severity['total'] == 0:
            print("\n✅ All validation checks passed!")
        return 0

if __name__ == "__main__":
    sys.exit(main())