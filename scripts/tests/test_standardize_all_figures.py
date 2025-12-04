#!/usr/bin/env python3
"""
Unit tests for standardize_all_figures.py module.

Tests cover:
- Image discovery in chapters
- Reference order building
- Filename standardization logic
- Renaming operations
- Markdown updates
- Collision detection

Run with: pytest scripts/tests/test_standardize_all_figures.py -v
"""

import pytest
import os
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from standardize_all_figures import (
    get_all_chapter_images,
    build_chapter_reference_order,
    find_unreferenced_images,
    perform_renames,
    update_markdown_files,
)


class TestGetAllChapterImages:
    """Tests for get_all_chapter_images function."""

    def test_get_images_basic(self, tmp_path):
        """Test getting images from a chapter."""
        chapter_dir = tmp_path / "Chap03"
        images_dir = chapter_dir / "Images"
        images_dir.mkdir(parents=True)

        (images_dir / "03_01_test.png").write_text("img1")
        (images_dir / "03_02_another.jpg").write_text("img2")

        images = get_all_chapter_images(chapter_dir, 3)

        assert len(images) == 2

    def test_identify_properly_named(self, tmp_path):
        """Test identifying properly named images."""
        chapter_dir = tmp_path / "Chap05"
        images_dir = chapter_dir / "Images"
        images_dir.mkdir(parents=True)

        (images_dir / "05_01_correct.png").write_text("img1")
        (images_dir / "wrong_name.png").write_text("img2")

        images = get_all_chapter_images(chapter_dir, 5)

        properly_named = [img for img in images if img['properly_named']]
        not_properly_named = [img for img in images if not img['properly_named']]

        assert len(properly_named) == 1
        assert len(not_properly_named) == 1

    def test_empty_images_directory(self, tmp_path):
        """Test with empty Images directory."""
        chapter_dir = tmp_path / "Chap01"
        images_dir = chapter_dir / "Images"
        images_dir.mkdir(parents=True)

        images = get_all_chapter_images(chapter_dir, 1)

        assert images == []

    def test_no_images_directory(self, tmp_path):
        """Test when Images directory doesn't exist."""
        chapter_dir = tmp_path / "Chap01"
        chapter_dir.mkdir()

        images = get_all_chapter_images(chapter_dir, 1)

        assert images == []

    def test_multiple_extensions(self, tmp_path):
        """Test finding images with various extensions."""
        chapter_dir = tmp_path / "Chap02"
        images_dir = chapter_dir / "Images"
        images_dir.mkdir(parents=True)

        (images_dir / "02_01_test.png").write_text("img")
        (images_dir / "02_02_test.jpg").write_text("img")
        (images_dir / "02_03_test.gif").write_text("img")
        (images_dir / "02_04_test.svg").write_text("img")

        images = get_all_chapter_images(chapter_dir, 2)

        assert len(images) == 4


class TestBuildChapterReferenceOrder:
    """Tests for build_chapter_reference_order function."""

    def test_build_order_single_file(self, tmp_path):
        """Test building reference order from single file."""
        chapter_dir = tmp_path / "Chap03"
        images_dir = chapter_dir / "Images"
        images_dir.mkdir(parents=True)

        # Create images
        (images_dir / "image1.png").write_text("img1")
        (images_dir / "image2.png").write_text("img2")

        # Create markdown with references
        md_file = chapter_dir / "chapter.md"
        md_file.write_text("""
```{figure} Images/image1.png
Caption 1
```

Some text.

```{figure} Images/image2.png
Caption 2
```
""")

        mapping = build_chapter_reference_order(chapter_dir, 3, images_dir)

        assert 'image1.png' in mapping
        assert 'image2.png' in mapping
        assert mapping['image1.png']['position'] == 1
        assert mapping['image2.png']['position'] == 2

    def test_build_order_determines_position(self, tmp_path):
        """Test that order in markdown determines position."""
        chapter_dir = tmp_path / "Chap05"
        images_dir = chapter_dir / "Images"
        images_dir.mkdir(parents=True)

        # Create images with non-sequential names
        (images_dir / "z_last.png").write_text("img")
        (images_dir / "a_first.png").write_text("img")

        # Reference in specific order
        md_file = chapter_dir / "chapter.md"
        md_file.write_text("""
```{figure} Images/z_last.png
First referenced
```

```{figure} Images/a_first.png
Second referenced
```
""")

        mapping = build_chapter_reference_order(chapter_dir, 5, images_dir)

        assert mapping['z_last.png']['position'] == 1
        assert mapping['a_first.png']['position'] == 2


class TestFindUnreferencedImages:
    """Tests for find_unreferenced_images function."""

    def test_find_unreferenced(self, tmp_path):
        """Test finding unreferenced images."""
        all_images = [
            {'filename': 'used.png'},
            {'filename': 'unused.png'}
        ]
        reference_mapping = {
            'used.png': {'position': 1}
        }

        unreferenced = find_unreferenced_images(all_images, reference_mapping)

        assert len(unreferenced) == 1
        assert unreferenced[0]['filename'] == 'unused.png'

    def test_all_referenced(self, tmp_path):
        """Test when all images are referenced."""
        all_images = [
            {'filename': 'img1.png'},
            {'filename': 'img2.png'}
        ]
        reference_mapping = {
            'img1.png': {'position': 1},
            'img2.png': {'position': 2}
        }

        unreferenced = find_unreferenced_images(all_images, reference_mapping)

        assert unreferenced == []

    def test_empty_lists(self):
        """Test with empty lists."""
        unreferenced = find_unreferenced_images([], {})
        assert unreferenced == []


class TestPerformRenames:
    """Tests for perform_renames function."""

    def test_dry_run_no_rename(self, tmp_path, capsys):
        """Test dry run doesn't rename files."""
        images_dir = tmp_path / "Images"
        images_dir.mkdir()
        old_file = images_dir / "old_name.png"
        old_file.write_text("content")

        reference_mapping = {
            'old_name.png': {
                'needs_rename': True,
                'old_path': old_file,
                'new_path': images_dir / "03_01_new_name.png",
                'new_filename': '03_01_new_name.png',
                'position': 1
            }
        }

        renamed = perform_renames(3, reference_mapping, dry_run=True)

        assert old_file.exists()  # Original still exists
        assert renamed == []

        captured = capsys.readouterr()
        assert "DRY RUN" in captured.out

    def test_actual_rename(self, tmp_path):
        """Test actual file renaming."""
        images_dir = tmp_path / "Images"
        images_dir.mkdir()
        old_file = images_dir / "old_name.png"
        old_file.write_text("content")

        reference_mapping = {
            'old_name.png': {
                'needs_rename': True,
                'old_path': old_file,
                'new_path': images_dir / "03_01_new_name.png",
                'new_filename': '03_01_new_name.png',
                'position': 1
            }
        }

        renamed = perform_renames(3, reference_mapping, dry_run=False)

        assert not old_file.exists()
        assert (images_dir / "03_01_new_name.png").exists()
        assert len(renamed) == 1

    def test_no_rename_needed(self, tmp_path, capsys):
        """Test when no rename is needed."""
        reference_mapping = {
            'already_correct.png': {
                'needs_rename': False,
                'position': 1
            }
        }

        renamed = perform_renames(3, reference_mapping, dry_run=False)

        assert renamed == []


class TestUpdateMarkdownFiles:
    """Tests for update_markdown_files function."""

    def test_dry_run_no_update(self, tmp_path, capsys):
        """Test dry run doesn't update files."""
        chapter_dir = tmp_path / "chapter"
        chapter_dir.mkdir()
        md_file = chapter_dir / "test.md"
        md_file.write_text("```{figure} Images/old.png\nCaption\n```")

        reference_mapping = {
            'old.png': {
                'needs_rename': True,
                'new_filename': '03_01_new.png'
            }
        }

        update_markdown_files(chapter_dir, reference_mapping, dry_run=True)

        assert "Images/old.png" in md_file.read_text()

        captured = capsys.readouterr()
        assert "DRY RUN" in captured.out

    def test_actual_update(self, tmp_path):
        """Test actual markdown update."""
        chapter_dir = tmp_path / "chapter"
        chapter_dir.mkdir()
        md_file = chapter_dir / "test.md"
        md_file.write_text("```{figure} Images/old.png\nCaption\n```")

        reference_mapping = {
            'old.png': {
                'needs_rename': True,
                'new_filename': '03_01_new.png'
            }
        }

        update_markdown_files(chapter_dir, reference_mapping, dry_run=False)

        content = md_file.read_text()
        assert "Images/03_01_new.png" in content
        assert "Images/old.png" not in content

    def test_update_problems_directory(self, tmp_path):
        """Test updating references in Problems directory."""
        chapter_dir = tmp_path / "chapter"
        problems_dir = chapter_dir / "Problems"
        problems_dir.mkdir(parents=True)

        md_file = problems_dir / "problem.md"
        md_file.write_text("```{figure} ../Images/old.png\nCaption\n```")

        reference_mapping = {
            'old.png': {
                'needs_rename': True,
                'new_filename': '03_01_new.png'
            }
        }

        update_markdown_files(chapter_dir, reference_mapping, dry_run=False)

        content = md_file.read_text()
        assert "../Images/03_01_new.png" in content

    def test_no_changes_needed(self, tmp_path, capsys):
        """Test when no markdown changes needed."""
        chapter_dir = tmp_path / "chapter"
        chapter_dir.mkdir()
        md_file = chapter_dir / "test.md"
        md_file.write_text("No image references here.")

        update_markdown_files(chapter_dir, {}, dry_run=False)


class TestNamingConvention:
    """Tests for naming convention handling."""

    def test_standard_naming_format(self, tmp_path):
        """Test standard naming format generation."""
        chapter_dir = tmp_path / "Chap07"
        images_dir = chapter_dir / "Images"
        images_dir.mkdir(parents=True)

        (images_dir / "diagram.png").write_text("img")

        md_file = chapter_dir / "chapter.md"
        md_file.write_text("```{figure} Images/diagram.png\nCaption\n```")

        mapping = build_chapter_reference_order(chapter_dir, 7, images_dir)

        assert mapping['diagram.png']['new_filename'] == '07_01_diagram.png'

    def test_preserve_snake_case_name(self, tmp_path):
        """Test that snake_case name is preserved."""
        chapter_dir = tmp_path / "Chap03"
        images_dir = chapter_dir / "Images"
        images_dir.mkdir(parents=True)

        (images_dir / "lens_diagram_example.png").write_text("img")

        md_file = chapter_dir / "chapter.md"
        md_file.write_text("```{figure} Images/lens_diagram_example.png\nCaption\n```")

        mapping = build_chapter_reference_order(chapter_dir, 3, images_dir)

        # Should extract descriptive name and use it
        new_filename = mapping['lens_diagram_example.png']['new_filename']
        assert new_filename.startswith('03_01_')
        assert new_filename.endswith('.png')


class TestEdgeCases:
    """Tests for edge cases."""

    def test_duplicate_references(self, tmp_path):
        """Test handling duplicate references to same image."""
        chapter_dir = tmp_path / "Chap01"
        images_dir = chapter_dir / "Images"
        images_dir.mkdir(parents=True)

        (images_dir / "test.png").write_text("img")

        md_file = chapter_dir / "chapter.md"
        md_file.write_text("""
```{figure} Images/test.png
First reference
```

Some text.

```{figure} Images/test.png
Second reference (same image)
```
""")

        mapping = build_chapter_reference_order(chapter_dir, 1, images_dir)

        # Should only appear once with first position
        assert mapping['test.png']['position'] == 1

    def test_ai_file_renaming(self, tmp_path):
        """Test that .ai files are renamed with images."""
        images_dir = tmp_path / "Images"
        images_dir.mkdir()

        # Create image and AI file
        old_png = images_dir / "old_name.png"
        old_ai = images_dir / "old_name.ai"
        old_png.write_text("img")
        old_ai.write_text("ai")

        reference_mapping = {
            'old_name.png': {
                'needs_rename': True,
                'old_path': old_png,
                'new_path': images_dir / "03_01_new.png",
                'new_filename': '03_01_new.png',
                'position': 1
            }
        }

        renamed = perform_renames(3, reference_mapping, dry_run=False)

        assert (images_dir / "03_01_new.png").exists()
        assert (images_dir / "03_01_new.ai").exists()
        assert not old_png.exists()
        assert not old_ai.exists()


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
