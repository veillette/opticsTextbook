#!/usr/bin/env python3
"""
Unit tests for shared_utils module.

Run with: pytest scripts/tests/test_shared_utils.py
Or: python -m pytest scripts/tests/
"""

import pytest
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from shared_utils import (
    # String functions
    to_snake_case,
    extract_descriptive_name,
    is_properly_named,
    # Validation
    validate_image_extension,
    validate_chapter_number,
    # Exceptions
    ValidationError,
    ChapterError,
    ConfigurationError,
    # Path handling
    ensure_path,
    # Formatting
    format_file_size,
)


class TestToSnakeCase:
    """Tests for to_snake_case function."""

    def test_basic_camel_case(self):
        assert to_snake_case("TestName") == "test_name"
        assert to_snake_case("testName") == "test_name"

    def test_with_numbers(self):
        assert to_snake_case("HTML2PDF") == "html2_pdf"
        assert to_snake_case("test123Name") == "test123_name"

    def test_already_snake_case(self):
        assert to_snake_case("already_snake_case") == "already_snake_case"

    def test_with_hyphens(self):
        assert to_snake_case("test-name") == "test_name"
        assert to_snake_case("test-name-here") == "test_name_here"

    def test_with_spaces(self):
        assert to_snake_case("test name") == "test_name"
        assert to_snake_case("Test Name Here") == "test_name_here"

    def test_with_dots(self):
        assert to_snake_case("test.name") == "test_name"

    def test_removes_existing_prefix(self):
        assert to_snake_case("01_02_test_name") == "test_name"

    def test_multiple_underscores(self):
        assert to_snake_case("test___name") == "test_name"

    def test_leading_trailing_underscores(self):
        assert to_snake_case("_test_name_") == "test_name"

    def test_special_acronyms(self):
        assert to_snake_case("SiO2Test") == "sio2_test"


class TestExtractDescriptiveName:
    """Tests for extract_descriptive_name function."""

    def test_simple_filename(self):
        assert extract_descriptive_name("lens_diagram.png") == "lens_diagram"

    def test_with_chapter_prefix(self):
        assert extract_descriptive_name("03_07_lens_diagram.png") == "lens_diagram"
        assert extract_descriptive_name("1_2_test.jpg") == "test"

    def test_with_vestigial_prefix(self):
        assert extract_descriptive_name("Fiber_03_diagram.png") == "diagram"
        assert extract_descriptive_name("2_05a_test.jpg") == "test"

    def test_with_date_suffix(self):
        assert extract_descriptive_name("test_210308.png") == "test"

    def test_empty_name(self):
        assert extract_descriptive_name("01_02_.png") == "figure"
        assert extract_descriptive_name("a.png") == "figure"


class TestIsProperlyNamed:
    """Tests for is_properly_named function."""

    def test_valid_names(self):
        assert is_properly_named("03_07_lens_diagram.png", 3) is True
        assert is_properly_named("01_01_test.jpg", 1) is True
        assert is_properly_named("11_99_complex_name_here.webp", 11) is True

    def test_invalid_chapter_number(self):
        assert is_properly_named("03_07_lens_diagram.png", 2) is False
        assert is_properly_named("01_07_test.jpg", 3) is False

    def test_invalid_format(self):
        assert is_properly_named("3_7_lens.png", 3) is False  # Single digit
        assert is_properly_named("03_lens_diagram.png", 3) is False  # Missing position
        assert is_properly_named("lens_diagram.png", 3) is False  # No prefix
        assert is_properly_named("03_07_LensDiagram.png", 3) is False  # Capital letters


class TestValidateImageExtension:
    """Tests for validate_image_extension function."""

    def test_valid_extensions(self):
        assert validate_image_extension("test.png") is True
        assert validate_image_extension("test.jpg") is True
        assert validate_image_extension("test.jpeg") is True
        assert validate_image_extension("test.gif") is True
        assert validate_image_extension("test.svg") is True
        assert validate_image_extension("test.webp") is True

    def test_case_insensitive(self):
        assert validate_image_extension("test.PNG") is True
        assert validate_image_extension("test.JPG") is True

    def test_invalid_extensions(self):
        assert validate_image_extension("test.txt") is False
        assert validate_image_extension("test.pdf") is False
        assert validate_image_extension("test.doc") is False


class TestValidateChapterNumber:
    """Tests for validate_chapter_number function."""

    def test_valid_chapters(self):
        for i in range(1, 12):  # Chapters 1-11
            assert validate_chapter_number(i) is True

    def test_invalid_chapters(self):
        with pytest.raises(ChapterError):
            validate_chapter_number(0)
        with pytest.raises(ChapterError):
            validate_chapter_number(12)
        with pytest.raises(ChapterError):
            validate_chapter_number(100)
        with pytest.raises(ChapterError):
            validate_chapter_number(-1)


class TestEnsurePath:
    """Tests for ensure_path function."""

    def test_string_to_path(self):
        result = ensure_path("/tmp/test")
        assert isinstance(result, Path)
        assert str(result) == "/tmp/test"

    def test_path_to_path(self):
        input_path = Path("/tmp/test")
        result = ensure_path(input_path)
        assert isinstance(result, Path)
        assert result == input_path


class TestFormatFileSize:
    """Tests for format_file_size function."""

    def test_bytes(self):
        assert format_file_size(100) == "100.00 B"
        assert format_file_size(1023) == "1023.00 B"

    def test_kilobytes(self):
        assert format_file_size(1024) == "1.00 KB"
        assert format_file_size(1536) == "1.50 KB"

    def test_megabytes(self):
        assert format_file_size(1024 * 1024) == "1.00 MB"
        assert format_file_size(1024 * 1024 * 2.5) == "2.50 MB"

    def test_gigabytes(self):
        assert format_file_size(1024 * 1024 * 1024) == "1.00 GB"

    def test_zero(self):
        assert format_file_size(0) == "0.00 B"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
