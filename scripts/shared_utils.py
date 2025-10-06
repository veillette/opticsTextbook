#!/usr/bin/env python3
"""
Shared utility functions and constants for optics textbook scripts.

This module provides common functionality used across multiple scripts
to avoid code duplication and ensure consistency.
"""

import os
import re
import json
import subprocess
import logging
import functools
from pathlib import Path
from typing import List, Dict, Tuple, Optional, Callable

# Set up logging
logger = logging.getLogger(__name__)

# Configuration file path
CONFIG_FILE = Path(__file__).parent / 'config.json'


# ============================================================================
# Custom Exceptions
# ============================================================================

class ValidationError(Exception):
    """Raised when validation fails."""
    pass


class ConfigurationError(Exception):
    """Raised when configuration is invalid or missing."""
    pass


class ChapterError(Exception):
    """Raised when chapter-related operations fail."""
    pass


# ============================================================================
# Configuration Management
# ============================================================================

@functools.lru_cache(maxsize=1)
def load_config() -> Dict:
    """
    Load and validate configuration from config.json.

    Returns:
        Dictionary containing configuration

    Raises:
        ConfigurationError: If config file is missing or invalid
    """
    try:
        with open(CONFIG_FILE, 'r') as f:
            config = json.load(f)
        validate_config(config)
        return config
    except FileNotFoundError:
        raise ConfigurationError(f"Configuration file not found: {CONFIG_FILE}")
    except json.JSONDecodeError as e:
        raise ConfigurationError(f"Invalid JSON in configuration file: {e}")


def validate_config(config: Dict) -> None:
    """
    Validate that configuration has required fields and structure.

    Args:
        config: Configuration dictionary to validate

    Raises:
        ConfigurationError: If configuration is invalid
    """
    required_fields = ['chapters', 'image_extensions', 'image_optimization', 'reports']

    for field in required_fields:
        if field not in config:
            raise ConfigurationError(f"Missing required config field: '{field}'")

    # Validate chapter structure
    for chapter_num, info in config['chapters'].items():
        if not isinstance(info, dict):
            raise ConfigurationError(f"Chapter {chapter_num} info must be a dictionary")
        if 'dir' not in info:
            raise ConfigurationError(f"Chapter {chapter_num} missing 'dir' field")
        if 'file' not in info:
            raise ConfigurationError(f"Chapter {chapter_num} missing 'file' field")

    # Validate image extensions
    if not isinstance(config['image_extensions'], list):
        raise ConfigurationError("'image_extensions' must be a list")

    # Validate image optimization settings
    opt = config['image_optimization']
    required_opt_fields = ['max_dimension', 'quality', 'min_size_mb']
    for field in required_opt_fields:
        if field not in opt:
            raise ConfigurationError(f"Missing image_optimization field: '{field}'")


@functools.lru_cache(maxsize=1)
def get_chapters() -> Dict[int, Tuple[str, str]]:
    """
    Get chapter mapping dictionary.

    Returns:
        Dictionary mapping chapter number to (directory, main_file) tuple
    """
    config = load_config()
    return {int(k): (v['dir'], v['file']) for k, v in config['chapters'].items()}


@functools.lru_cache(maxsize=1)
def get_image_extensions() -> List[str]:
    """
    Get list of supported image extensions.

    Returns:
        List of image file extensions (without dots)
    """
    return load_config()['image_extensions']


# Backwards compatibility - but lazy loaded now
@functools.lru_cache(maxsize=1)
def _get_chapters_constant():
    return get_chapters()

@functools.lru_cache(maxsize=1)
def _get_extensions_constant():
    return get_image_extensions()

# Module-level "constants" that are actually lazy-loaded
# These maintain backwards compatibility with existing code
class _LazyConstants:
    @property
    def CHAPTERS(self):
        return _get_chapters_constant()

    @property
    def IMAGE_EXTENSIONS(self):
        return _get_extensions_constant()

_constants = _LazyConstants()
CHAPTERS = _constants.CHAPTERS
IMAGE_EXTENSIONS = _constants.IMAGE_EXTENSIONS


# ============================================================================
# Path Handling Utilities
# ============================================================================

def ensure_path(path_like) -> Path:
    """
    Convert string or Path-like to Path object.

    Args:
        path_like: String path or Path object

    Returns:
        Path object
    """
    return Path(path_like) if not isinstance(path_like, Path) else path_like


def ensure_directory(directory: Path) -> Path:
    """
    Ensure directory exists, create if necessary.

    Args:
        directory: Directory path

    Returns:
        Path object for the directory
    """
    dir_path = ensure_path(directory)
    dir_path.mkdir(parents=True, exist_ok=True)
    return dir_path


# ============================================================================
# Validation Utilities
# ============================================================================

def validate_chapter_number(chapter_num: int) -> bool:
    """
    Validate chapter number is in valid range.

    Args:
        chapter_num: Chapter number to validate

    Returns:
        True if valid

    Raises:
        ChapterError: If chapter number is invalid
    """
    chapters = get_chapters()
    if chapter_num not in chapters:
        valid_range = f"1-{max(chapters.keys())}"
        raise ChapterError(
            f"Invalid chapter number: {chapter_num}. Valid range: {valid_range}"
        )
    return True


def validate_image_extension(filename: str) -> bool:
    """
    Check if file has valid image extension.

    Args:
        filename: Filename to check

    Returns:
        True if extension is valid, False otherwise
    """
    ext = Path(filename).suffix.lower().lstrip('.')
    return ext in get_image_extensions()


def validate_file_exists(filepath: Path) -> bool:
    """
    Validate that a file exists.

    Args:
        filepath: Path to file

    Returns:
        True if file exists

    Raises:
        ValidationError: If file doesn't exist
    """
    path = ensure_path(filepath)
    if not path.exists():
        raise ValidationError(f"File not found: {filepath}")
    if not path.is_file():
        raise ValidationError(f"Path is not a file: {filepath}")
    return True


# ============================================================================
# MyST Command Execution
# ============================================================================

def run_myst_command(command: List[str], timeout: int = 180) -> Tuple[str, str, int]:
    """
    Run a MyST command and capture detailed output.

    Args:
        command: Command and arguments as list
        timeout: Timeout in seconds (default: 180)

    Returns:
        Tuple of (stdout, stderr, return_code)
    """
    try:
        logger.debug(f"Running command: {' '.join(command)}")
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=os.getcwd()
        )
        return result.stdout, result.stderr, result.returncode
    except subprocess.TimeoutExpired:
        logger.error(f"Command timed out after {timeout} seconds")
        return "", f"Command timed out after {timeout} seconds", 1
    except FileNotFoundError:
        logger.error(f"Command not found: {command[0]}")
        return "", "Command not found", 1


# ============================================================================
# String Manipulation
# ============================================================================

def to_snake_case(name: str) -> str:
    """
    Convert name to snake_case.

    Args:
        name: Name to convert (may include extension)

    Returns:
        snake_case version of the name
    """
    # Remove extension if present
    name = os.path.splitext(name)[0]

    # Remove any existing chapter/number prefix
    name = re.sub(r'^\d{2}_\d{2}_', '', name)

    # Insert underscore before uppercase letters
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    s2 = re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1)

    # Convert to lowercase
    result = s2.lower()

    # Replace hyphens, spaces, and dots with underscores
    result = result.replace('-', '_').replace(' ', '_').replace('.', '_')

    # Remove multiple consecutive underscores
    result = re.sub(r'_+', '_', result)

    # Remove leading/trailing underscores
    result = result.strip('_')

    # Fix common acronyms
    result = result.replace('si_o2', 'sio2').replace('si_o_2', 'sio2')

    return result


def extract_descriptive_name(filename: str) -> str:
    """
    Extract a descriptive name from a filename, handling various formats.

    Args:
        filename: Filename to extract from

    Returns:
        Descriptive name in snake_case
    """
    # Remove extension
    name = os.path.splitext(filename)[0]

    # Remove chapter/number prefix if present
    name = re.sub(r'^\d{1,2}_\d{1,2}_', '', name)

    # Remove vestigial prefixes like "Fiber_03_" or "2_05a_"
    name = re.sub(r'^[A-Za-z]+_\d+[a-z]?_', '', name)
    name = re.sub(r'^\d+_\d+[a-z]?_', '', name)

    # Remove date suffixes like _210308
    name = re.sub(r'_\d{6}$', '', name)

    # Convert to snake_case
    name = to_snake_case(name)

    # If name is empty or too short, use a generic name
    if len(name) < 2:
        name = "figure"

    return name


# ============================================================================
# Filename Validation
# ============================================================================

def is_properly_named(filename: str, chapter_num: int) -> bool:
    """
    Check if a filename follows the naming convention.

    Convention: ChapterNum_ImageNum_descriptive_name.ext
    Example: 03_07_lens_diagram.png

    Args:
        filename: Filename to check
        chapter_num: Chapter number (1-11)

    Returns:
        True if filename follows convention, False otherwise
    """
    pattern = rf'^{chapter_num:02d}_\d{{2}}_[a-z0-9_]+\.\w+$'
    return bool(re.match(pattern, filename))


# ============================================================================
# Figure Reference Extraction
# ============================================================================

def extract_figure_references(md_file: Path, images_dir: Optional[Path] = None) -> List[Dict]:
    """
    Extract all figure references from a markdown file in order of appearance.

    Args:
        md_file: Path to markdown file
        images_dir: Optional path to images directory (for validation)

    Returns:
        List of dictionaries containing reference information
    """
    references = []
    md_path = ensure_path(md_file)

    try:
        with open(md_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        # MyST figure/image patterns
        patterns = [
            r'```\{figure\}\s+([^\s\n]+)',          # ```{figure} path
            r'```\{image\}\s+([^\s\n]+)',           # ```{image} path
            r'!\[.*?\]\(([^)]+)\)',                  # ![alt](path)
            r'<img[^>]+src=["\']([^"\']+)["\']',    # <img src="path">
        ]

        for line_num, line in enumerate(lines, 1):
            for pattern in patterns:
                matches = re.findall(pattern, line, re.IGNORECASE)
                for match in matches:
                    # Clean up the path
                    path = match.split('#')[0].split('?')[0].strip()

                    # Skip URLs
                    if path.startswith(('http://', 'https://', 'ftp://')):
                        continue

                    # Extract filename
                    if 'Images/' in path:
                        filename = path.split('Images/')[-1]
                    elif '../Images/' in path:
                        filename = path.split('../Images/')[-1]
                    else:
                        filename = os.path.basename(path)

                    # Build reference info
                    ref_info = {
                        'filename': filename,
                        'line': line_num,
                        'line_content': line.strip(),
                        'original_reference': path
                    }

                    # Add file path if images_dir provided and file exists
                    if images_dir:
                        image_path = ensure_path(images_dir) / filename
                        if image_path.exists():
                            ref_info['full_path'] = image_path

                    references.append(ref_info)

    except Exception as e:
        logger.warning(f"Error reading {md_file.name}: {e}")

    return references


# ============================================================================
# File and Directory Discovery
# ============================================================================

def find_markdown_files_in_chapter(chapter_dir: Path) -> List[Path]:
    """
    Find all markdown files in a chapter directory.

    Searches in:
    - Chapter root directory (*.md)
    - Problems subdirectory (*.md)

    Args:
        chapter_dir: Path to chapter directory

    Returns:
        Sorted list of markdown file paths
    """
    md_files = []
    chapter_path = ensure_path(chapter_dir)

    # Main chapter files
    md_files.extend(chapter_path.glob("*.md"))

    # Problems directory
    problems_dir = chapter_path / "Problems"
    if problems_dir.exists():
        md_files.extend(problems_dir.glob("*.md"))

    return sorted(md_files)


def get_all_markdown_files(content_dir: str = 'content') -> List[Path]:
    """
    Get all markdown files in the content directory.

    Args:
        content_dir: Content directory path

    Returns:
        List of Path objects for all .md files
    """
    content_path = ensure_path(content_dir)
    return list(content_path.glob('**/*.md'))


# ============================================================================
# Chapter Information
# ============================================================================

def get_chapter_info(chapter_num: int) -> Optional[Tuple[Path, str]]:
    """
    Get chapter directory and main file for a chapter number.

    Args:
        chapter_num: Chapter number (1-11)

    Returns:
        Tuple of (chapter_dir, main_file) or None if invalid

    Raises:
        ChapterError: If chapter number is invalid
    """
    validate_chapter_number(chapter_num)
    chapters = get_chapters()
    chapter_dir, main_file = chapters[chapter_num]
    return ensure_path(chapter_dir), main_file


# ============================================================================
# Formatting Utilities
# ============================================================================

def format_file_size(size_bytes: int) -> str:
    """
    Format file size in human-readable format.

    Args:
        size_bytes: Size in bytes

    Returns:
        Formatted string (e.g., "1.5 MB")
    """
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.2f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.2f} TB"


# ============================================================================
# Progress Callback Support
# ============================================================================

def create_progress_callback(total: int, description: str = "Processing") -> Callable:
    """
    Create a simple progress callback function.

    Args:
        total: Total number of items
        description: Description to display

    Returns:
        Callback function that takes (current, item) arguments
    """
    def callback(current: int, item: str = ""):
        percent = (current / total) * 100 if total > 0 else 0
        item_desc = f": {item}" if item else ""
        logger.info(f"{description} [{current}/{total}] ({percent:.1f}%){item_desc}")

    return callback


def process_with_progress(items: List, process_func: Callable,
                         description: str = "Processing",
                         callback: Optional[Callable] = None) -> List:
    """
    Process items with optional progress reporting.

    Args:
        items: List of items to process
        process_func: Function to apply to each item
        description: Description for progress reporting
        callback: Optional custom callback function

    Returns:
        List of results
    """
    results = []
    total = len(items)

    # Use provided callback or create default
    if callback is None:
        callback = create_progress_callback(total, description)

    for i, item in enumerate(items, 1):
        result = process_func(item)
        results.append(result)
        if callback:
            callback(i, str(item))

    return results
