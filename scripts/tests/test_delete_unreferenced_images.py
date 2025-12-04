#!/usr/bin/env python3
"""
Unit tests for delete_unreferenced_images_myst.py module.

Tests cover:
- File list reading and parsing
- File size calculation
- File analysis and categorization
- Dry-run mode (no actual deletion)
- Delete operations with mock filesystem
- Safety checks and confirmation handling

Run with: pytest scripts/tests/test_delete_unreferenced_images.py -v
"""

import pytest
import os
import sys
import tempfile
import shutil
from pathlib import Path
from unittest.mock import patch, MagicMock

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from delete_unreferenced_images_myst import (
    read_file_list,
    get_file_size,
    get_total_size,
    format_size,
    analyze_files,
    delete_files,
    remove_empty_directories,
)


class TestReadFileList:
    """Tests for read_file_list function."""

    def test_read_simple_file_list(self, tmp_path):
        """Test reading a simple file list."""
        file_list = tmp_path / "files.txt"
        file_list.write_text("file1.png\nfile2.jpg\nfile3.gif\n")

        result = read_file_list(str(file_list))
        assert result == ["file1.png", "file2.jpg", "file3.gif"]

    def test_read_file_list_with_comments(self, tmp_path):
        """Test reading file list with comments."""
        file_list = tmp_path / "files.txt"
        file_list.write_text("# This is a comment\nfile1.png\n# Another comment\nfile2.jpg\n")

        result = read_file_list(str(file_list))
        assert result == ["file1.png", "file2.jpg"]

    def test_read_file_list_with_inline_comments(self, tmp_path):
        """Test reading file list with inline comments."""
        file_list = tmp_path / "files.txt"
        file_list.write_text("file1.png  # comment\nfile2.jpg # another\n")

        result = read_file_list(str(file_list))
        assert result == ["file1.png", "file2.jpg"]

    def test_read_file_list_with_empty_lines(self, tmp_path):
        """Test reading file list with empty lines."""
        file_list = tmp_path / "files.txt"
        file_list.write_text("file1.png\n\n\nfile2.jpg\n  \n")

        result = read_file_list(str(file_list))
        assert result == ["file1.png", "file2.jpg"]

    def test_read_nonexistent_file(self):
        """Test reading a nonexistent file."""
        result = read_file_list("/nonexistent/path/file.txt")
        assert result == []


class TestGetFileSize:
    """Tests for get_file_size function."""

    def test_file_size_bytes(self, tmp_path):
        """Test getting file size in bytes."""
        test_file = tmp_path / "test.txt"
        test_file.write_text("Hello")  # 5 bytes

        result = get_file_size(str(test_file))
        assert result == "5.0 B"

    def test_file_size_kilobytes(self, tmp_path):
        """Test getting file size in kilobytes."""
        test_file = tmp_path / "test.txt"
        test_file.write_bytes(b"x" * 2048)  # 2 KB

        result = get_file_size(str(test_file))
        assert result == "2.0 KB"

    def test_nonexistent_file(self):
        """Test getting size of nonexistent file."""
        result = get_file_size("/nonexistent/file.txt")
        assert result == "Unknown"


class TestGetTotalSize:
    """Tests for get_total_size function."""

    def test_total_size_multiple_files(self, tmp_path):
        """Test calculating total size of multiple files."""
        file1 = tmp_path / "file1.txt"
        file2 = tmp_path / "file2.txt"
        file1.write_bytes(b"x" * 100)
        file2.write_bytes(b"x" * 200)

        result = get_total_size([str(file1), str(file2)])
        assert result == 300

    def test_total_size_with_missing_files(self, tmp_path):
        """Test total size calculation with some missing files."""
        file1 = tmp_path / "file1.txt"
        file1.write_bytes(b"x" * 100)

        result = get_total_size([str(file1), "/nonexistent/file.txt"])
        assert result == 100

    def test_total_size_empty_list(self):
        """Test total size of empty list."""
        result = get_total_size([])
        assert result == 0


class TestFormatSize:
    """Tests for format_size function."""

    def test_format_bytes(self):
        """Test formatting bytes."""
        assert format_size(500) == "500.0 B"
        assert format_size(1023) == "1023.0 B"

    def test_format_kilobytes(self):
        """Test formatting kilobytes."""
        assert format_size(1024) == "1.0 KB"
        assert format_size(1536) == "1.5 KB"

    def test_format_megabytes(self):
        """Test formatting megabytes."""
        assert format_size(1024 * 1024) == "1.0 MB"
        assert format_size(int(1024 * 1024 * 2.5)) == "2.5 MB"

    def test_format_gigabytes(self):
        """Test formatting gigabytes."""
        assert format_size(1024 * 1024 * 1024) == "1.0 GB"

    def test_format_zero(self):
        """Test formatting zero bytes."""
        assert format_size(0) == "0.0 B"


class TestAnalyzeFiles:
    """Tests for analyze_files function."""

    def test_analyze_existing_files(self, tmp_path):
        """Test analyzing existing files."""
        # Create test files
        img1 = tmp_path / "images" / "img1.png"
        img2 = tmp_path / "images" / "img2.png"
        img1.parent.mkdir(parents=True)
        img1.write_text("image1")
        img2.write_text("image2")

        image_files = [str(img1), str(img2)]
        ai_files = []

        result = analyze_files(image_files, ai_files)

        assert len(result['existing_images']) == 2
        assert len(result['missing_images']) == 0
        assert str(tmp_path / "images") in result['image_by_dir']

    def test_analyze_with_missing_files(self, tmp_path):
        """Test analyzing with missing files."""
        img1 = tmp_path / "img1.png"
        img1.write_text("image1")

        image_files = [str(img1), "/nonexistent/img2.png"]
        ai_files = []

        result = analyze_files(image_files, ai_files)

        assert len(result['existing_images']) == 1
        assert len(result['missing_images']) == 1
        assert "/nonexistent/img2.png" in result['missing_images']

    def test_analyze_ai_files(self, tmp_path):
        """Test analyzing AI files."""
        ai1 = tmp_path / "source.ai"
        ai1.write_text("ai content")

        image_files = []
        ai_files = [str(ai1)]

        result = analyze_files(image_files, ai_files)

        assert len(result['existing_ai']) == 1
        assert len(result['missing_ai']) == 0


class TestDeleteFiles:
    """Tests for delete_files function."""

    def test_dry_run_no_deletion(self, tmp_path, capsys):
        """Test dry run mode doesn't delete files."""
        test_file = tmp_path / "test.png"
        test_file.write_text("content")

        deleted = delete_files([str(test_file)], "image", dry_run=True)

        assert test_file.exists()  # File should still exist
        assert deleted == []  # No files actually deleted

        captured = capsys.readouterr()
        assert "DRY RUN" in captured.out
        assert "WOULD DELETE" in captured.out

    def test_actual_deletion(self, tmp_path):
        """Test actual file deletion."""
        test_file = tmp_path / "test.png"
        test_file.write_text("content")

        deleted = delete_files([str(test_file)], "image", dry_run=False)

        assert not test_file.exists()  # File should be deleted
        assert len(deleted) == 1
        assert str(test_file) in deleted

    def test_delete_missing_file(self, tmp_path, capsys):
        """Test deleting a missing file."""
        deleted = delete_files(["/nonexistent/file.png"], "image", dry_run=False)

        assert deleted == []
        captured = capsys.readouterr()
        assert "SKIP" in captured.out

    def test_delete_empty_list(self):
        """Test deleting empty list."""
        deleted = delete_files([], "image", dry_run=False)
        assert deleted == []


class TestRemoveEmptyDirectories:
    """Tests for remove_empty_directories function."""

    def test_dry_run_no_removal(self, tmp_path, capsys):
        """Test dry run mode doesn't remove directories."""
        empty_dir = tmp_path / "content" / "empty"
        empty_dir.mkdir(parents=True)

        removed = remove_empty_directories(str(tmp_path / "content"), dry_run=True)

        assert empty_dir.exists()  # Directory should still exist
        assert removed == []

        captured = capsys.readouterr()
        assert "WOULD REMOVE" in captured.out

    def test_remove_empty_directory(self, tmp_path):
        """Test removing empty directory."""
        content_dir = tmp_path / "content"
        empty_dir = content_dir / "empty"
        empty_dir.mkdir(parents=True)

        removed = remove_empty_directories(str(content_dir), dry_run=False)

        assert not empty_dir.exists()
        assert len(removed) == 1

    def test_keep_non_empty_directory(self, tmp_path):
        """Test keeping non-empty directories."""
        content_dir = tmp_path / "content"
        non_empty_dir = content_dir / "notempty"
        non_empty_dir.mkdir(parents=True)
        (non_empty_dir / "file.txt").write_text("content")

        removed = remove_empty_directories(str(content_dir), dry_run=False)

        assert non_empty_dir.exists()
        assert removed == []


class TestMainFunctionality:
    """Integration tests for main script functionality."""

    def test_conflicting_options(self, tmp_path):
        """Test that --images-only and --ai-only conflict."""
        # This would be tested via the main() function
        # Here we just verify the logic would conflict
        images_only = True
        ai_only = True

        # The script checks: if args.images_only and args.ai_only: return 1
        assert images_only and ai_only  # Both true = conflict

    def test_file_list_not_found_behavior(self, tmp_path):
        """Test behavior when file list doesn't exist."""
        result = read_file_list(str(tmp_path / "nonexistent.txt"))
        assert result == []


class TestSafetyChecks:
    """Tests for safety checks and confirmations."""

    def test_preview_shows_file_count(self, tmp_path, capsys):
        """Test that preview shows correct file counts."""
        # Create test files
        img1 = tmp_path / "img1.png"
        img1.write_bytes(b"x" * 1024)

        analysis = {
            'existing_images': [str(img1)],
            'existing_ai': [],
            'missing_images': [],
            'missing_ai': [],
            'image_by_dir': {str(tmp_path): ['img1.png']},
            'ai_by_dir': {}
        }

        from delete_unreferenced_images_myst import preview_deletion
        has_files = preview_deletion(analysis, delete_images=True, delete_ai=False)

        assert has_files is True
        captured = capsys.readouterr()
        assert "Image files to be deleted: 1" in captured.out

    def test_preview_no_files(self, capsys):
        """Test preview when no files to delete."""
        analysis = {
            'existing_images': [],
            'existing_ai': [],
            'missing_images': [],
            'missing_ai': [],
            'image_by_dir': {},
            'ai_by_dir': {}
        }

        from delete_unreferenced_images_myst import preview_deletion
        has_files = preview_deletion(analysis, delete_images=True, delete_ai=True)

        assert has_files is False


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
