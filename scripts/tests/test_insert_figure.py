#!/usr/bin/env python3
"""
Unit tests for insert_figure.py module.

Tests cover:
- Figure filename generation
- Existing figures detection
- Rename map creation
- File copy and rename operations
- Markdown reference updates
- Input validation
- Dry-run mode

Run with: pytest scripts/tests/test_insert_figure.py -v
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

from insert_figure import (
    get_existing_figures,
    generate_new_filename,
    create_rename_map,
    copy_and_rename_new_image,
    perform_renumbering,
    update_markdown_references,
)


class TestGenerateNewFilename:
    """Tests for generate_new_filename function."""

    def test_basic_filename_generation(self):
        """Test basic filename generation."""
        result = generate_new_filename(3, 5, "lens_diagram", "png")
        assert result == "03_05_lens_diagram.png"

    def test_two_digit_chapter(self):
        """Test two-digit chapter number."""
        result = generate_new_filename(11, 1, "test", "jpg")
        assert result == "11_01_test.jpg"

    def test_two_digit_position(self):
        """Test two-digit position number."""
        result = generate_new_filename(1, 15, "figure", "gif")
        assert result == "01_15_figure.gif"

    def test_snake_case_conversion(self):
        """Test that descriptive name is converted to snake_case."""
        result = generate_new_filename(5, 2, "TestName", "png")
        assert result == "05_02_test_name.png"

    def test_with_spaces(self):
        """Test descriptive name with spaces."""
        result = generate_new_filename(2, 3, "my test image", "png")
        assert result == "02_03_my_test_image.png"


class TestGetExistingFigures:
    """Tests for get_existing_figures function."""

    def test_find_existing_figures(self, tmp_path):
        """Test finding existing figures in a chapter."""
        # Create chapter structure
        chapter_dir = tmp_path / "Chap03Test"
        images_dir = chapter_dir / "Images"
        images_dir.mkdir(parents=True)

        # Create test images
        (images_dir / "03_01_first.png").write_text("image1")
        (images_dir / "03_02_second.jpg").write_text("image2")
        (images_dir / "03_03_third.png").write_text("image3")

        figures = get_existing_figures(chapter_dir, 3)

        assert len(figures) == 3
        assert figures[0]['position'] == 1
        assert figures[0]['name'] == 'first'
        assert figures[1]['position'] == 2
        assert figures[2]['position'] == 3

    def test_find_figures_sorted_by_position(self, tmp_path):
        """Test that figures are sorted by position."""
        chapter_dir = tmp_path / "Chap05Test"
        images_dir = chapter_dir / "Images"
        images_dir.mkdir(parents=True)

        # Create images out of order
        (images_dir / "05_03_third.png").write_text("image3")
        (images_dir / "05_01_first.png").write_text("image1")
        (images_dir / "05_02_second.png").write_text("image2")

        figures = get_existing_figures(chapter_dir, 5)

        assert figures[0]['position'] == 1
        assert figures[1]['position'] == 2
        assert figures[2]['position'] == 3

    def test_empty_images_directory(self, tmp_path):
        """Test with empty Images directory."""
        chapter_dir = tmp_path / "Chap01Test"
        images_dir = chapter_dir / "Images"
        images_dir.mkdir(parents=True)

        figures = get_existing_figures(chapter_dir, 1)
        assert figures == []

    def test_no_images_directory(self, tmp_path):
        """Test when Images directory doesn't exist."""
        chapter_dir = tmp_path / "Chap01Test"
        chapter_dir.mkdir()

        figures = get_existing_figures(chapter_dir, 1)
        assert figures == []

    def test_ignores_non_matching_files(self, tmp_path):
        """Test that non-matching files are ignored."""
        chapter_dir = tmp_path / "Chap03Test"
        images_dir = chapter_dir / "Images"
        images_dir.mkdir(parents=True)

        # Create matching and non-matching files
        (images_dir / "03_01_valid.png").write_text("image1")
        (images_dir / "invalid_name.png").write_text("image2")
        (images_dir / "readme.txt").write_text("readme")

        figures = get_existing_figures(chapter_dir, 3)

        assert len(figures) == 1
        assert figures[0]['filename'] == "03_01_valid.png"


class TestCreateRenameMap:
    """Tests for create_rename_map function."""

    def test_create_map_for_insertion(self, tmp_path):
        """Test creating rename map when inserting a figure."""
        images_dir = tmp_path / "Images"
        images_dir.mkdir()

        existing_figures = [
            {
                'path': images_dir / "03_01_first.png",
                'position': 1,
                'name': 'first',
                'extension': 'png',
                'filename': '03_01_first.png'
            },
            {
                'path': images_dir / "03_02_second.png",
                'position': 2,
                'name': 'second',
                'extension': 'png',
                'filename': '03_02_second.png'
            },
        ]

        # Insert at position 2
        rename_map = create_rename_map(existing_figures, 2, 3)

        assert len(rename_map) == 1
        assert rename_map[0]['old_filename'] == '03_02_second.png'
        assert rename_map[0]['new_filename'] == '03_03_second.png'
        assert rename_map[0]['old_position'] == 2
        assert rename_map[0]['new_position'] == 3

    def test_no_renaming_needed_at_end(self, tmp_path):
        """Test no renaming needed when inserting at end."""
        images_dir = tmp_path / "Images"
        images_dir.mkdir()

        existing_figures = [
            {
                'path': images_dir / "03_01_first.png",
                'position': 1,
                'name': 'first',
                'extension': 'png',
                'filename': '03_01_first.png'
            },
        ]

        # Insert at position 2 (after existing)
        rename_map = create_rename_map(existing_figures, 2, 3)

        assert len(rename_map) == 0

    def test_multiple_renames(self, tmp_path):
        """Test multiple files need renaming."""
        images_dir = tmp_path / "Images"
        images_dir.mkdir()

        existing_figures = [
            {
                'path': images_dir / "03_01_first.png",
                'position': 1,
                'name': 'first',
                'extension': 'png',
                'filename': '03_01_first.png'
            },
            {
                'path': images_dir / "03_02_second.png",
                'position': 2,
                'name': 'second',
                'extension': 'png',
                'filename': '03_02_second.png'
            },
            {
                'path': images_dir / "03_03_third.png",
                'position': 3,
                'name': 'third',
                'extension': 'png',
                'filename': '03_03_third.png'
            },
        ]

        # Insert at position 1
        rename_map = create_rename_map(existing_figures, 1, 3)

        # All 3 should need renaming (reversed order)
        assert len(rename_map) == 3
        # Check reverse order (to avoid conflicts)
        assert rename_map[0]['old_position'] == 3
        assert rename_map[0]['new_position'] == 4
        assert rename_map[1]['old_position'] == 2
        assert rename_map[2]['old_position'] == 1


class TestCopyAndRenameNewImage:
    """Tests for copy_and_rename_new_image function."""

    def test_copy_image_dry_run(self, tmp_path, capsys):
        """Test dry run mode doesn't copy files."""
        source_image = tmp_path / "source" / "new_image.png"
        source_image.parent.mkdir()
        source_image.write_text("image content")

        chapter_dir = tmp_path / "chapter"
        chapter_dir.mkdir()

        result = copy_and_rename_new_image(
            str(source_image), chapter_dir, 3, 5, "test_figure", dry_run=True
        )

        # File should not be copied
        assert not (chapter_dir / "Images" / "03_05_test_figure.png").exists()
        assert result is not None
        assert result['filename'] == "03_05_test_figure.png"

        captured = capsys.readouterr()
        assert "DRY RUN" in captured.out

    def test_copy_image_actual(self, tmp_path):
        """Test actual file copy."""
        source_image = tmp_path / "source" / "new_image.png"
        source_image.parent.mkdir()
        source_image.write_text("image content")

        chapter_dir = tmp_path / "chapter"
        chapter_dir.mkdir()

        result = copy_and_rename_new_image(
            str(source_image), chapter_dir, 3, 5, "test_figure", dry_run=False
        )

        # File should be copied
        dest_file = chapter_dir / "Images" / "03_05_test_figure.png"
        assert dest_file.exists()
        assert dest_file.read_text() == "image content"
        assert result['filename'] == "03_05_test_figure.png"

    def test_copy_with_ai_file(self, tmp_path):
        """Test copying image with corresponding .ai file."""
        source_dir = tmp_path / "source"
        source_dir.mkdir()
        source_image = source_dir / "figure.png"
        source_ai = source_dir / "figure.ai"
        source_image.write_text("image")
        source_ai.write_text("ai content")

        chapter_dir = tmp_path / "chapter"
        chapter_dir.mkdir()

        result = copy_and_rename_new_image(
            str(source_image), chapter_dir, 2, 1, "test", dry_run=False
        )

        # Both files should be copied
        assert (chapter_dir / "Images" / "02_01_test.png").exists()
        assert (chapter_dir / "Images" / "02_01_test.ai").exists()

    def test_source_not_found(self, tmp_path):
        """Test when source file doesn't exist."""
        chapter_dir = tmp_path / "chapter"
        chapter_dir.mkdir()

        result = copy_and_rename_new_image(
            "/nonexistent/image.png", chapter_dir, 1, 1, "test", dry_run=False
        )

        assert result is None


class TestPerformRenumbering:
    """Tests for perform_renumbering function."""

    def test_dry_run_no_rename(self, tmp_path, capsys):
        """Test dry run doesn't rename files."""
        images_dir = tmp_path / "Images"
        images_dir.mkdir()
        old_file = images_dir / "03_01_test.png"
        old_file.write_text("content")

        rename_map = [{
            'old_path': old_file,
            'new_path': images_dir / "03_02_test.png",
            'old_filename': '03_01_test.png',
            'new_filename': '03_02_test.png',
            'old_position': 1,
            'new_position': 2
        }]

        renamed = perform_renumbering(rename_map, dry_run=True)

        assert old_file.exists()  # Original still exists
        assert not (images_dir / "03_02_test.png").exists()
        assert renamed == []

        captured = capsys.readouterr()
        assert "DRY RUN" in captured.out
        assert "Would rename" in captured.out

    def test_actual_rename(self, tmp_path):
        """Test actual file renaming."""
        images_dir = tmp_path / "Images"
        images_dir.mkdir()
        old_file = images_dir / "03_01_test.png"
        old_file.write_text("content")

        rename_map = [{
            'old_path': old_file,
            'new_path': images_dir / "03_02_test.png",
            'old_filename': '03_01_test.png',
            'new_filename': '03_02_test.png',
            'old_position': 1,
            'new_position': 2
        }]

        renamed = perform_renumbering(rename_map, dry_run=False)

        assert not old_file.exists()
        assert (images_dir / "03_02_test.png").exists()
        assert len(renamed) == 1

    def test_empty_map(self, capsys):
        """Test with empty rename map."""
        renamed = perform_renumbering([], dry_run=False)

        assert renamed == []
        captured = capsys.readouterr()
        assert "No files need renumbering" in captured.out


class TestUpdateMarkdownReferences:
    """Tests for update_markdown_references function."""

    def test_dry_run_no_update(self, tmp_path, capsys):
        """Test dry run doesn't update files."""
        chapter_dir = tmp_path / "chapter"
        chapter_dir.mkdir()
        md_file = chapter_dir / "test.md"
        md_file.write_text("```{figure} Images/03_01_old.png\nCaption\n```")

        rename_map = [{
            'old_filename': '03_01_old.png',
            'new_filename': '03_02_new.png',
        }]

        update_markdown_references(chapter_dir, rename_map, None, dry_run=True)

        assert "Images/03_01_old.png" in md_file.read_text()

        captured = capsys.readouterr()
        assert "DRY RUN" in captured.out

    def test_actual_update(self, tmp_path):
        """Test actual markdown update."""
        chapter_dir = tmp_path / "chapter"
        chapter_dir.mkdir()
        md_file = chapter_dir / "test.md"
        md_file.write_text("```{figure} Images/03_01_old.png\nCaption\n```")

        rename_map = [{
            'old_filename': '03_01_old.png',
            'new_filename': '03_02_new.png',
        }]

        update_markdown_references(chapter_dir, rename_map, None, dry_run=False)

        content = md_file.read_text()
        assert "Images/03_02_new.png" in content
        assert "Images/03_01_old.png" not in content

    def test_update_problems_directory(self, tmp_path):
        """Test updating references in Problems subdirectory."""
        chapter_dir = tmp_path / "chapter"
        problems_dir = chapter_dir / "Problems"
        problems_dir.mkdir(parents=True)

        md_file = problems_dir / "problem.md"
        md_file.write_text("See ```{figure} ../Images/03_01_old.png\nCaption\n```")

        rename_map = [{
            'old_filename': '03_01_old.png',
            'new_filename': '03_02_new.png',
        }]

        update_markdown_references(chapter_dir, rename_map, None, dry_run=False)

        content = md_file.read_text()
        assert "../Images/03_02_new.png" in content

    def test_no_changes_needed(self, tmp_path, capsys):
        """Test when no markdown changes are needed."""
        chapter_dir = tmp_path / "chapter"
        chapter_dir.mkdir()
        md_file = chapter_dir / "test.md"
        md_file.write_text("Some text without image references")

        update_markdown_references(chapter_dir, [], None, dry_run=False)

        # No update messages expected
        captured = capsys.readouterr()
        assert "No markdown updates needed" in captured.out


class TestInputValidation:
    """Tests for input validation in the script."""

    def test_validate_inputs_chapter_error(self, tmp_path):
        """Test validation catches invalid chapter."""
        from insert_figure import validate_inputs
        from argparse import Namespace

        # Create a test image
        test_image = tmp_path / "test.png"
        test_image.write_text("image")

        args = Namespace(
            chapter=99,  # Invalid chapter
            position=1,
            image=str(test_image),
            name="test"
        )

        errors = validate_inputs(args)
        assert len(errors) > 0
        assert any("Invalid chapter" in e for e in errors)

    def test_validate_inputs_position_error(self, tmp_path):
        """Test validation catches invalid position."""
        from insert_figure import validate_inputs
        from argparse import Namespace

        # Create a test image
        test_image = tmp_path / "test.png"
        test_image.write_text("image")

        args = Namespace(
            chapter=1,
            position=-1,  # Invalid position
            image=str(test_image),
            name="test"
        )

        errors = validate_inputs(args)
        assert len(errors) > 0
        assert any("Position must be >= 1" in e for e in errors)

    def test_validate_inputs_missing_image(self, tmp_path):
        """Test validation catches missing image file."""
        from insert_figure import validate_inputs
        from argparse import Namespace

        args = Namespace(
            chapter=1,
            position=1,
            image="/nonexistent/image.png",
            name="test"
        )

        errors = validate_inputs(args)
        assert len(errors) > 0
        assert any("not found" in e for e in errors)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
