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
from pathlib import Path
from typing import List, Dict, Tuple, Optional

# Load configuration
CONFIG_FILE = Path(__file__).parent / 'config.json'

def load_config():
    """Load configuration from config.json."""
    with open(CONFIG_FILE, 'r') as f:
        return json.load(f)

# Chapter mapping - loaded from config
_config = None

def get_config():
    """Get configuration, loading it if necessary."""
    global _config
    if _config is None:
        _config = load_config()
    return _config

def get_chapters():
    """Get chapter mapping dictionary."""
    config = get_config()
    # Convert string keys to integers for easier use
    return {int(k): (v['dir'], v['file']) for k, v in config['chapters'].items()}

def get_image_extensions():
    """Get list of supported image extensions."""
    return get_config()['image_extensions']

# Constants
CHAPTERS = get_chapters()
IMAGE_EXTENSIONS = get_image_extensions()


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

    try:
        with open(md_file, 'r', encoding='utf-8') as f:
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
                        image_path = images_dir / filename
                        if image_path.exists():
                            ref_info['full_path'] = image_path

                    references.append(ref_info)

    except Exception as e:
        print(f"  ⚠️  Error reading {md_file.name}: {e}")

    return references


def get_chapter_info(chapter_num: int) -> Optional[Tuple[Path, str]]:
    """
    Get chapter directory and main file for a chapter number.

    Args:
        chapter_num: Chapter number (1-11)

    Returns:
        Tuple of (chapter_dir, main_file) or None if invalid
    """
    chapters = get_chapters()
    if chapter_num not in chapters:
        return None

    chapter_dir, main_file = chapters[chapter_num]
    return Path(chapter_dir), main_file


def get_all_markdown_files(content_dir: str = 'content') -> List[Path]:
    """
    Get all markdown files in the content directory.

    Args:
        content_dir: Content directory path

    Returns:
        List of Path objects for all .md files
    """
    content_path = Path(content_dir)
    return list(content_path.glob('**/*.md'))


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
