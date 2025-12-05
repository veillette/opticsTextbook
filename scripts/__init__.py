"""
MyST Markdown Project Utility Scripts

This package provides utility scripts for maintaining and validating
MyST Markdown projects. The scripts are content-agnostic and work
with any MyST project structure.

Modules:
    shared_utils: Common functions and constants
    report_utils: Standardized report generation
"""

__version__ = '1.0.0'

# Import commonly used items for convenience
from .shared_utils import (
    # Exceptions
    ValidationError,
    ConfigurationError,
    ChapterError,
    # Configuration
    get_chapters,
    get_image_extensions,
    load_config,
    # Validation
    validate_chapter_number,
    validate_image_extension,
    validate_file_exists,
    # String manipulation
    to_snake_case,
    extract_descriptive_name,
    # Path handling
    ensure_path,
    ensure_directory,
    # Chapter info
    get_chapter_info,
    find_markdown_files_in_chapter,
)

from .report_utils import (
    ReportGenerator,
    MarkdownReportBuilder,
)

__all__ = [
    # Version
    '__version__',
    # Exceptions
    'ValidationError',
    'ConfigurationError',
    'ChapterError',
    # Configuration
    'get_chapters',
    'get_image_extensions',
    'load_config',
    # Validation
    'validate_chapter_number',
    'validate_image_extension',
    'validate_file_exists',
    # String manipulation
    'to_snake_case',
    'extract_descriptive_name',
    # Path handling
    'ensure_path',
    'ensure_directory',
    # Chapter info
    'get_chapter_info',
    'find_markdown_files_in_chapter',
    # Report generation
    'ReportGenerator',
    'MarkdownReportBuilder',
]
