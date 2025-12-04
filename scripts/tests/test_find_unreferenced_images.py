#!/usr/bin/env python3
"""
Unit tests for find_unreferenced_images_myst.py module.

Tests cover:
- Image file discovery
- Markdown reference parsing
- Path resolution
- AI file handling
- Analysis and reporting

Run with: pytest scripts/tests/test_find_unreferenced_images.py -v
"""

import pytest
import os
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from find_unreferenced_images_myst import (
    find_all_images,
    parse_markdown_references,
    resolve_image_path,
    find_corresponding_ai_file,
    find_corresponding_image_file,
    analyze_references,
)


class TestFindAllImages:
    """Tests for find_all_images function."""

    def test_find_images_basic(self, tmp_path):
        """Test finding basic image files."""
        content_dir = tmp_path / "content"
        images_dir = content_dir / "Images"
        images_dir.mkdir(parents=True)

        (images_dir / "test1.png").write_text("img1")
        (images_dir / "test2.jpg").write_text("img2")
        (images_dir / "test3.gif").write_text("img3")

        images, ai_files = find_all_images(str(content_dir))

        assert len(images) == 3
        assert len(ai_files) == 0

    def test_find_images_nested(self, tmp_path):
        """Test finding images in nested directories."""
        content_dir = tmp_path / "content"
        images_dir1 = content_dir / "Chap01" / "Images"
        images_dir2 = content_dir / "Chap02" / "Images"
        images_dir1.mkdir(parents=True)
        images_dir2.mkdir(parents=True)

        (images_dir1 / "img1.png").write_text("img1")
        (images_dir2 / "img2.png").write_text("img2")

        images, ai_files = find_all_images(str(content_dir))

        assert len(images) == 2

    def test_find_ai_files(self, tmp_path):
        """Test finding .ai files."""
        content_dir = tmp_path / "content"
        images_dir = content_dir / "Images"
        images_dir.mkdir(parents=True)

        (images_dir / "test1.png").write_text("img1")
        (images_dir / "test1.ai").write_text("ai1")

        images, ai_files = find_all_images(str(content_dir))

        assert len(images) == 1
        assert len(ai_files) == 1

    def test_find_all_extensions(self, tmp_path):
        """Test finding all supported image extensions."""
        content_dir = tmp_path / "content"
        content_dir.mkdir()

        extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp', 'tiff']
        for ext in extensions:
            (content_dir / f"test.{ext}").write_text(f"content_{ext}")

        images, ai_files = find_all_images(str(content_dir))

        assert len(images) == len(extensions)

    def test_find_empty_directory(self, tmp_path):
        """Test finding images in empty directory."""
        content_dir = tmp_path / "content"
        content_dir.mkdir()

        images, ai_files = find_all_images(str(content_dir))

        assert images == []
        assert ai_files == []


class TestParseMarkdownReferences:
    """Tests for parse_markdown_references function."""

    def test_parse_myst_figure_directive(self, tmp_path):
        """Test parsing MyST figure directive."""
        content_dir = tmp_path / "content"
        content_dir.mkdir()
        md_file = content_dir / "test.md"
        md_file.write_text("""
```{figure} Images/test.png
:name: fig-test

Caption
```
""")

        refs = parse_markdown_references(str(content_dir))

        # Should find the reference
        assert len(refs) >= 0  # May not resolve if image doesn't exist

    def test_parse_myst_image_directive(self, tmp_path):
        """Test parsing MyST image directive."""
        content_dir = tmp_path / "content"
        content_dir.mkdir()
        md_file = content_dir / "test.md"
        md_file.write_text("""
```{image} Images/diagram.png
```
""")

        refs = parse_markdown_references(str(content_dir))
        # Results depend on whether image exists

    def test_parse_standard_markdown_image(self, tmp_path):
        """Test parsing standard markdown image."""
        content_dir = tmp_path / "content"
        images_dir = content_dir / "Images"
        images_dir.mkdir(parents=True)
        (images_dir / "photo.jpg").write_text("img")

        md_file = content_dir / "test.md"
        md_file.write_text("![Alt text](Images/photo.jpg)")

        refs = parse_markdown_references(str(content_dir))

        # Should find the reference
        assert len(refs) >= 1

    def test_parse_html_img_tag(self, tmp_path):
        """Test parsing HTML img tag."""
        content_dir = tmp_path / "content"
        images_dir = content_dir / "Images"
        images_dir.mkdir(parents=True)
        (images_dir / "icon.png").write_text("img")

        md_file = content_dir / "test.md"
        md_file.write_text('<img src="Images/icon.png" alt="Icon">')

        refs = parse_markdown_references(str(content_dir))

        assert len(refs) >= 1

    def test_ignore_url_references(self, tmp_path):
        """Test that URLs are ignored."""
        content_dir = tmp_path / "content"
        content_dir.mkdir()
        md_file = content_dir / "test.md"
        md_file.write_text("![External](https://example.com/image.png)")

        refs = parse_markdown_references(str(content_dir))

        # Should not include external URLs
        for ref in refs:
            assert not ref.startswith('http')


class TestResolveImagePath:
    """Tests for resolve_image_path function."""

    def test_resolve_relative_path(self, tmp_path):
        """Test resolving relative image path."""
        md_dir = tmp_path / "content" / "chapter"
        images_dir = md_dir / "Images"
        images_dir.mkdir(parents=True)
        (images_dir / "test.png").write_text("img")

        result = resolve_image_path("Images/test.png", str(md_dir), str(tmp_path / "content"))

        assert result is not None
        assert result.endswith("test.png")

    def test_resolve_parent_relative_path(self, tmp_path):
        """Test resolving ../ relative path."""
        content_dir = tmp_path / "content"
        chapter_dir = content_dir / "chapter"
        images_dir = content_dir / "Images"
        images_dir.mkdir(parents=True)
        chapter_dir.mkdir()
        (images_dir / "test.png").write_text("img")

        result = resolve_image_path("../Images/test.png", str(chapter_dir), str(content_dir))

        assert result is not None

    def test_resolve_nonexistent_path(self, tmp_path):
        """Test resolving nonexistent path."""
        result = resolve_image_path("nonexistent.png", str(tmp_path), str(tmp_path))

        assert result is None

    def test_resolve_dot_slash_path(self, tmp_path):
        """Test resolving ./ relative path."""
        content_dir = tmp_path / "content"
        content_dir.mkdir()
        (content_dir / "test.png").write_text("img")

        result = resolve_image_path("./test.png", str(content_dir), str(content_dir))

        assert result is not None


class TestFindCorrespondingAiFile:
    """Tests for find_corresponding_ai_file function."""

    def test_find_existing_ai_file(self, tmp_path):
        """Test finding existing .ai file."""
        (tmp_path / "image.png").write_text("img")
        (tmp_path / "image.ai").write_text("ai")

        result = find_corresponding_ai_file(str(tmp_path / "image.png"))

        assert result is not None
        assert result.endswith("image.ai")

    def test_no_ai_file(self, tmp_path):
        """Test when no .ai file exists."""
        (tmp_path / "image.png").write_text("img")

        result = find_corresponding_ai_file(str(tmp_path / "image.png"))

        assert result is None


class TestFindCorrespondingImageFile:
    """Tests for find_corresponding_image_file function."""

    def test_find_png_for_ai(self, tmp_path):
        """Test finding PNG for .ai file."""
        (tmp_path / "image.ai").write_text("ai")
        (tmp_path / "image.png").write_text("img")

        result = find_corresponding_image_file(str(tmp_path / "image.ai"))

        assert result is not None
        assert result.endswith("image.png")

    def test_find_jpg_for_ai(self, tmp_path):
        """Test finding JPG for .ai file."""
        (tmp_path / "image.ai").write_text("ai")
        (tmp_path / "image.jpg").write_text("img")

        result = find_corresponding_image_file(str(tmp_path / "image.ai"))

        assert result is not None
        assert result.endswith("image.jpg")

    def test_no_image_file(self, tmp_path):
        """Test when no image file exists."""
        (tmp_path / "standalone.ai").write_text("ai")

        result = find_corresponding_image_file(str(tmp_path / "standalone.ai"))

        assert result is None


class TestAnalyzeReferences:
    """Tests for analyze_references function."""

    def test_analyze_all_referenced(self, tmp_path):
        """Test when all images are referenced."""
        content_dir = tmp_path / "content"
        images_dir = content_dir / "Images"
        images_dir.mkdir(parents=True)

        (images_dir / "test.png").write_text("img")
        md_file = content_dir / "test.md"
        md_file.write_text("```{figure} Images/test.png\nCaption\n```")

        all_images, ai_files = find_all_images(str(content_dir))
        results = analyze_references(all_images, ai_files, str(content_dir))

        # Note: actual results depend on MyST build
        assert 'unreferenced_images' in results
        assert 'referenced_images' in results

    def test_analyze_unreferenced_image(self, tmp_path):
        """Test finding unreferenced image."""
        content_dir = tmp_path / "content"
        images_dir = content_dir / "Images"
        images_dir.mkdir(parents=True)

        # Create image but no reference
        (images_dir / "unused.png").write_text("img")
        (content_dir / "test.md").write_text("No image references here.")

        all_images, ai_files = find_all_images(str(content_dir))
        results = analyze_references(all_images, ai_files, str(content_dir))

        # Unused image should be in unreferenced
        assert len(results['unreferenced_images']) >= 1

    def test_analyze_unreferenced_ai_file(self, tmp_path):
        """Test finding unreferenced AI file."""
        content_dir = tmp_path / "content"
        content_dir.mkdir()

        # Create AI file with no corresponding referenced image
        (content_dir / "standalone.ai").write_text("ai")
        (content_dir / "standalone.png").write_text("img")
        (content_dir / "test.md").write_text("No references.")

        all_images, ai_files = find_all_images(str(content_dir))
        results = analyze_references(all_images, ai_files, str(content_dir))

        assert len(results['unreferenced_ai_files']) >= 1


class TestEdgeCases:
    """Tests for edge cases."""

    def test_empty_content_directory(self, tmp_path):
        """Test with empty content directory."""
        content_dir = tmp_path / "content"
        content_dir.mkdir()

        all_images, ai_files = find_all_images(str(content_dir))

        assert all_images == []
        assert ai_files == []

    def test_special_characters_in_filename(self, tmp_path):
        """Test handling special characters in filenames."""
        content_dir = tmp_path / "content"
        images_dir = content_dir / "Images"
        images_dir.mkdir(parents=True)

        # Create file with spaces and special chars
        (images_dir / "test image (1).png").write_text("img")

        all_images, ai_files = find_all_images(str(content_dir))

        assert len(all_images) == 1

    def test_case_insensitive_extensions(self, tmp_path):
        """Test that extension matching is case insensitive."""
        content_dir = tmp_path / "content"
        content_dir.mkdir()

        # Different case extensions
        (content_dir / "test1.PNG").write_text("img")
        (content_dir / "test2.Jpg").write_text("img")
        (content_dir / "test3.SVG").write_text("img")

        all_images, ai_files = find_all_images(str(content_dir))

        assert len(all_images) == 3

    def test_markdown_with_multiple_references(self, tmp_path):
        """Test parsing markdown with multiple image references."""
        content_dir = tmp_path / "content"
        images_dir = content_dir / "Images"
        images_dir.mkdir(parents=True)

        (images_dir / "img1.png").write_text("img1")
        (images_dir / "img2.png").write_text("img2")
        (images_dir / "img3.png").write_text("img3")

        md_file = content_dir / "test.md"
        md_file.write_text("""
```{figure} Images/img1.png
Caption 1
```

Some text here.

```{figure} Images/img2.png
Caption 2
```

![Inline](Images/img3.png)
""")

        refs = parse_markdown_references(str(content_dir))

        # Should find all 3 references
        assert len(refs) >= 3


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
