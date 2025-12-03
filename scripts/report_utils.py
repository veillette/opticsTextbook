#!/usr/bin/env python3
"""
Standardized report generation utilities for optics textbook scripts.

This module provides consistent report generation across all scripts,
with support for multiple output formats and standardized file locations.

Key Features:
    - Multi-format report generation (Markdown, JSON, plain text)
    - Centralized output directory (reports/)
    - Timestamp support for versioned reports
    - Fluent API for building markdown reports
    - Standardized validation and file list report templates
    - Automatic directory creation

Classes:
    ReportGenerator: Main class for generating reports in multiple formats
    MarkdownReportBuilder: Fluent API for building structured markdown reports

Utility Functions:
    create_validation_report: Generate standardized validation reports
    create_file_list_report: Generate simple file listing reports
    print_report_paths: Pretty-print generated report paths

Usage Examples:

    Basic report generation:
        >>> from report_utils import ReportGenerator
        >>>
        >>> gen = ReportGenerator("my_report")
        >>> gen.write_markdown("# Results\\n\\nAll checks passed.")
        >>> gen.write_json({"status": "success", "count": 42})
        >>> gen.write_text(["file1.txt", "file2.txt"])

    Building structured markdown:
        >>> from report_utils import MarkdownReportBuilder
        >>>
        >>> builder = MarkdownReportBuilder("Analysis Report")
        >>> builder.add_section("Findings")
        >>> builder.add_list(["Finding 1", "Finding 2"])
        >>> builder.add_table(["File", "Issues"], [
        ...     ["test.md", "3"],
        ...     ["example.md", "1"]
        ... ])
        >>> markdown = builder.build()
        >>>
        >>> gen = ReportGenerator("analysis")
        >>> gen.write_markdown(markdown)

    Validation reports:
        >>> from report_utils import create_validation_report, ReportGenerator
        >>>
        >>> issues = {
        ...     "missing_refs": ["ref1", "ref2"],
        ...     "broken_links": ["link1"]
        ... }
        >>> summary = {"total_issues": 3, "files_checked": 10}
        >>>
        >>> markdown, json_data = create_validation_report(
        ...     "Validation Results", issues, summary
        ... )
        >>>
        >>> gen = ReportGenerator("validation_report")
        >>> gen.write_all(markdown, json_data)

    File list reports:
        >>> from report_utils import create_file_list_report, ReportGenerator
        >>>
        >>> files = ["img1.png", "img2.png", "img3.png"]
        >>> markdown, text = create_file_list_report(
        ...     "Unreferenced Images",
        ...     files,
        ...     description="Images not referenced in any markdown file"
        ... )
        >>>
        >>> gen = ReportGenerator("unreferenced_images")
        >>> gen.write_markdown(markdown)
        >>> gen.write_text(text)

Integration:
    This module works seamlessly with shared_utils.py for validation and
    file operations. All reports are saved to the reports/ directory by default,
    which is automatically created if it doesn't exist.

    Reports can include timestamps for versioning:
        >>> gen = ReportGenerator("deletion_log")
        >>> gen.write_json(data, include_timestamp=True)
        # Creates: reports/deletion_log_20251006_143052.json

Author: Optics Textbook Scripts Package
Version: 1.0.0
"""

import json
from pathlib import Path
from datetime import datetime
from typing import Any, Dict, List, Optional, Union, Tuple


class ReportGenerator:
    """Generate standardized reports in various formats."""

    def __init__(self, report_name: str, output_dir: str = 'reports'):
        """
        Initialize report generator.

        Args:
            report_name: Base name for report files (without extension)
            output_dir: Directory to store reports (default: 'reports')
        """
        self.report_name = report_name
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    def get_path(self, extension: str, include_timestamp: bool = False) -> Path:
        """
        Get full path for report file.

        Args:
            extension: File extension (without dot)
            include_timestamp: Whether to include timestamp in filename

        Returns:
            Path object for the report file
        """
        if include_timestamp:
            filename = f"{self.report_name}_{self.timestamp}.{extension}"
        else:
            filename = f"{self.report_name}.{extension}"
        return self.output_dir / filename

    def write_markdown(self, content: str, include_timestamp: bool = False) -> Path:
        """
        Write markdown report.

        Args:
            content: Markdown content to write
            include_timestamp: Whether to include timestamp in filename

        Returns:
            Path to written file
        """
        filepath = self.get_path('md', include_timestamp)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return filepath

    def write_json(self, data: Union[Dict, List], include_timestamp: bool = False) -> Path:
        """
        Write JSON report.

        Args:
            data: Data to serialize as JSON
            include_timestamp: Whether to include timestamp in filename

        Returns:
            Path to written file
        """
        filepath = self.get_path('json', include_timestamp)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return filepath

    def write_text(self, lines: Union[List[str], str], include_timestamp: bool = False) -> Path:
        """
        Write plain text report.

        Args:
            lines: List of lines or single string to write
            include_timestamp: Whether to include timestamp in filename

        Returns:
            Path to written file
        """
        filepath = self.get_path('txt', include_timestamp)
        content = lines if isinstance(lines, str) else '\n'.join(lines)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return filepath

    def write_all(self, markdown_content: str, json_data: Dict,
                  text_lines: Optional[List[str]] = None,
                  include_timestamp: bool = False) -> Dict[str, Path]:
        """
        Write report in all formats at once.

        Args:
            markdown_content: Markdown formatted content
            json_data: JSON serializable data
            text_lines: Optional plain text lines
            include_timestamp: Whether to include timestamp in filenames

        Returns:
            Dictionary mapping format to written file path
        """
        paths = {
            'markdown': self.write_markdown(markdown_content, include_timestamp),
            'json': self.write_json(json_data, include_timestamp)
        }
        if text_lines:
            paths['text'] = self.write_text(text_lines, include_timestamp)
        return paths


class MarkdownReportBuilder:
    """Helper class for building markdown reports."""

    def __init__(self, title: str):
        """
        Initialize markdown report builder.

        Args:
            title: Report title
        """
        self.lines = []
        self.add_title(title)
        self.add_metadata()

    def add_title(self, title: str, level: int = 1) -> 'MarkdownReportBuilder':
        """Add a title/heading."""
        self.lines.append(f"{'#' * level} {title}\n")
        return self

    def add_metadata(self) -> 'MarkdownReportBuilder':
        """Add report generation metadata."""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        self.lines.append(f"*Generated: {timestamp}*\n")
        return self

    def add_section(self, title: str, level: int = 2) -> 'MarkdownReportBuilder':
        """Add a section heading."""
        self.lines.append(f"\n{'#' * level} {title}\n")
        return self

    def add_text(self, text: str) -> 'MarkdownReportBuilder':
        """Add plain text paragraph."""
        self.lines.append(f"{text}\n")
        return self

    def add_list(self, items: List[str], ordered: bool = False) -> 'MarkdownReportBuilder':
        """Add a list (ordered or unordered)."""
        for i, item in enumerate(items, 1):
            prefix = f"{i}." if ordered else "-"
            self.lines.append(f"{prefix} {item}\n")
        return self

    def add_table(self, headers: List[str], rows: List[List[str]]) -> 'MarkdownReportBuilder':
        """Add a markdown table."""
        # Headers
        self.lines.append("| " + " | ".join(headers) + " |\n")
        # Separator
        self.lines.append("| " + " | ".join(["---"] * len(headers)) + " |\n")
        # Rows
        for row in rows:
            self.lines.append("| " + " | ".join(str(cell) for cell in row) + " |\n")
        self.lines.append("\n")
        return self

    def add_code_block(self, code: str, language: str = "") -> 'MarkdownReportBuilder':
        """Add a code block."""
        self.lines.append(f"```{language}\n{code}\n```\n")
        return self

    def add_summary(self, summary_dict: Dict[str, Any]) -> 'MarkdownReportBuilder':
        """Add a summary section with key-value pairs."""
        self.add_section("Summary", level=2)
        for key, value in summary_dict.items():
            self.lines.append(f"- **{key}**: {value}\n")
        return self

    def build(self) -> str:
        """Build and return the complete markdown document."""
        return ''.join(self.lines)


def create_validation_report(title: str, issues: Dict[str, List[Any]],
                             summary: Dict[str, int]) -> Tuple[str, Dict[str, Any]]:
    """
    Create a standardized validation report.

    Args:
        title: Report title
        issues: Dictionary of issue categories to issue lists
        summary: Summary statistics

    Returns:
        Tuple of (markdown_content, json_data)
    """
    builder = MarkdownReportBuilder(title)

    # Add summary
    builder.add_summary(summary)

    # Add issues by category
    for category, issue_list in issues.items():
        if issue_list:
            builder.add_section(f"{category.replace('_', ' ').title()}", level=2)
            builder.add_text(f"Found {len(issue_list)} issue(s):\n")
            builder.add_list([str(issue) for issue in issue_list])

    # Build JSON data
    json_data = {
        'title': title,
        'timestamp': datetime.now().isoformat(),
        'summary': summary,
        'issues': issues
    }

    return builder.build(), json_data


def create_file_list_report(title: str, files: List[str],
                            description: str = "") -> Tuple[str, str]:
    """
    Create a simple file list report.

    Args:
        title: Report title
        files: List of file paths
        description: Optional description

    Returns:
        Tuple of (markdown_content, text_content)
    """
    builder = MarkdownReportBuilder(title)

    if description:
        builder.add_text(description)

    builder.add_section("Files", level=2)
    builder.add_text(f"Total: {len(files)} files\n")
    builder.add_list(files)

    markdown = builder.build()
    text = '\n'.join(files)

    return markdown, text


def print_report_paths(paths: Dict[str, Path]) -> None:
    """
    Print report file paths in a consistent format.

    Args:
        paths: Dictionary mapping format to file path
    """
    print("\nReports generated:")
    for format_name, path in paths.items():
        print(f"  - {format_name.capitalize()}: {path}")
