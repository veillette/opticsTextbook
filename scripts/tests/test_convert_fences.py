#!/usr/bin/env python3
"""
Unit tests for convert_fences.py module.

Tests cover:
- Colon to backtick fence conversion
- Directive detection
- Content preservation
- Dry-run mode
- Statistics tracking

Run with: pytest scripts/tests/test_convert_fences.py -v
"""

import pytest
import os
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from convert_fences import FenceConverter, process_directory


class TestFenceConverterBasic:
    """Basic tests for FenceConverter class."""

    def test_convert_note_directive(self, tmp_path):
        """Test converting note directive."""
        md_file = tmp_path / "test.md"
        md_file.write_text(""":::{note}
This is a note.
:::""")

        converter = FenceConverter(dry_run=False)
        converter.convert_file(md_file)

        content = md_file.read_text()
        assert "```{note}" in content
        assert "```" in content
        assert ":::" not in content

    def test_convert_warning_directive(self, tmp_path):
        """Test converting warning directive."""
        md_file = tmp_path / "test.md"
        md_file.write_text(""":::{warning}
Warning content.
:::""")

        converter = FenceConverter(dry_run=False)
        converter.convert_file(md_file)

        content = md_file.read_text()
        assert "```{warning}" in content

    def test_convert_figure_directive(self, tmp_path):
        """Test converting figure directive."""
        md_file = tmp_path / "test.md"
        md_file.write_text(""":::{figure} image.png
:name: fig-test

Caption text.
:::""")

        converter = FenceConverter(dry_run=False)
        converter.convert_file(md_file)

        content = md_file.read_text()
        assert "```{figure}" in content
        assert ":name: fig-test" in content
        assert "Caption text." in content


class TestFenceConverterDryRun:
    """Tests for dry-run mode."""

    def test_dry_run_no_changes(self, tmp_path, capsys):
        """Test dry run doesn't modify file."""
        md_file = tmp_path / "test.md"
        original = """:::{note}
Content
:::"""
        md_file.write_text(original)

        converter = FenceConverter(dry_run=True)
        converter.convert_file(md_file)

        assert md_file.read_text() == original

        captured = capsys.readouterr()
        assert "Would convert" in captured.out

    def test_dry_run_counts_changes(self, tmp_path):
        """Test dry run tracks statistics."""
        md_file = tmp_path / "test.md"
        md_file.write_text(""":::{note}
Note 1
:::

:::{warning}
Warning 1
:::""")

        converter = FenceConverter(dry_run=True)
        converter.convert_file(md_file)

        assert converter.stats['directives_converted'] == 2


class TestFenceConverterContentPreservation:
    """Tests for content preservation."""

    def test_preserve_directive_content(self, tmp_path):
        """Test that directive content is preserved."""
        md_file = tmp_path / "test.md"
        md_file.write_text(""":::{note}
Line 1
Line 2
Line 3
:::""")

        converter = FenceConverter(dry_run=False)
        converter.convert_file(md_file)

        content = md_file.read_text()
        assert "Line 1" in content
        assert "Line 2" in content
        assert "Line 3" in content

    def test_preserve_directive_options(self, tmp_path):
        """Test that directive options are preserved."""
        md_file = tmp_path / "test.md"
        md_file.write_text(""":::{figure} image.png
:name: my-figure
:width: 80%
:align: center

Caption here.
:::""")

        converter = FenceConverter(dry_run=False)
        converter.convert_file(md_file)

        content = md_file.read_text()
        assert ":name: my-figure" in content
        assert ":width: 80%" in content
        assert ":align: center" in content
        assert "Caption here." in content

    def test_preserve_surrounding_content(self, tmp_path):
        """Test that surrounding content is preserved."""
        md_file = tmp_path / "test.md"
        md_file.write_text("""# Header

Some paragraph text.

:::{note}
Note content.
:::

More text after.

## Another header
""")

        converter = FenceConverter(dry_run=False)
        converter.convert_file(md_file)

        content = md_file.read_text()
        assert "# Header" in content
        assert "Some paragraph text." in content
        assert "More text after." in content
        assert "## Another header" in content

    def test_preserve_indentation(self, tmp_path):
        """Test that indentation is preserved."""
        md_file = tmp_path / "test.md"
        md_file.write_text("""  :::{note}
  Indented content.
  :::""")

        converter = FenceConverter(dry_run=False)
        converter.convert_file(md_file)

        content = md_file.read_text()
        assert content.startswith("  ")  # Indentation preserved


class TestFenceConverterMultipleDirectives:
    """Tests for multiple directives in same file."""

    def test_convert_multiple_directives(self, tmp_path):
        """Test converting multiple directives."""
        md_file = tmp_path / "test.md"
        md_file.write_text(""":::{note}
Note 1
:::

:::{warning}
Warning 1
:::

:::{tip}
Tip 1
:::""")

        converter = FenceConverter(dry_run=False)
        converter.convert_file(md_file)

        content = md_file.read_text()
        assert "```{note}" in content
        assert "```{warning}" in content
        assert "```{tip}" in content
        assert ":::" not in content

    def test_convert_counts_all_directives(self, tmp_path):
        """Test that all directives are counted."""
        md_file = tmp_path / "test.md"
        md_file.write_text(""":::{note}
Note
:::
:::{note}
Another note
:::""")

        converter = FenceConverter(dry_run=False)
        converter.convert_file(md_file)

        assert converter.stats['directives_converted'] == 2


class TestFenceConverterNestedContent:
    """Tests for nested content handling."""

    def test_preserve_code_blocks_inside(self, tmp_path):
        """Test preserving code blocks inside directives."""
        md_file = tmp_path / "test.md"
        md_file.write_text(""":::{note}
Here is some code:

```python
print("Hello")
```
:::""")

        converter = FenceConverter(dry_run=False)
        converter.convert_file(md_file)

        content = md_file.read_text()
        assert "```{note}" in content
        assert "```python" in content
        assert 'print("Hello")' in content


class TestFenceConverterNoConversion:
    """Tests for cases where no conversion is needed."""

    def test_no_conversion_already_backticks(self, tmp_path):
        """Test no conversion when already using backticks."""
        md_file = tmp_path / "test.md"
        original = """```{note}
Already correct.
```"""
        md_file.write_text(original)

        converter = FenceConverter(dry_run=False)
        changed = converter.convert_file(md_file)

        assert not changed
        assert md_file.read_text() == original

    def test_no_conversion_plain_text(self, tmp_path):
        """Test no conversion for plain text file."""
        md_file = tmp_path / "test.md"
        original = """# Heading

Just plain text content.
No directives here.
"""
        md_file.write_text(original)

        converter = FenceConverter(dry_run=False)
        changed = converter.convert_file(md_file)

        assert not changed
        assert md_file.read_text() == original


class TestFenceConverterDirectiveTypes:
    """Tests for various directive types."""

    def test_convert_admonition_directives(self, tmp_path):
        """Test converting all admonition types."""
        admonitions = ['note', 'warning', 'important', 'tip', 'caution',
                       'attention', 'danger', 'error', 'hint', 'seealso']

        for adm in admonitions:
            md_file = tmp_path / f"test_{adm}.md"
            md_file.write_text(f""":::{{{adm}}}
Content
:::""")

            converter = FenceConverter(dry_run=False)
            converter.convert_file(md_file)

            content = md_file.read_text()
            assert f"```{{{adm}}}" in content

    def test_convert_layout_directives(self, tmp_path):
        """Test converting layout directives."""
        directives = ['dropdown', 'card', 'grid', 'column', 'margin', 'sidebar']

        for directive in directives:
            md_file = tmp_path / f"test_{directive}.md"
            md_file.write_text(f""":::{{{directive}}}
Content
:::""")

            converter = FenceConverter(dry_run=False)
            converter.convert_file(md_file)

            content = md_file.read_text()
            assert f"```{{{directive}}}" in content


class TestFenceConverterWithTitle:
    """Tests for directives with titles."""

    def test_convert_admonition_with_title(self, tmp_path):
        """Test converting admonition with title."""
        md_file = tmp_path / "test.md"
        md_file.write_text(""":::{admonition} Custom Title
Content here.
:::""")

        converter = FenceConverter(dry_run=False)
        converter.convert_file(md_file)

        content = md_file.read_text()
        assert "```{admonition} Custom Title" in content
        assert "Content here." in content


class TestProcessDirectory:
    """Tests for process_directory function."""

    def test_process_multiple_files(self, tmp_path, capsys):
        """Test processing multiple files in directory."""
        content_dir = tmp_path / "content"
        content_dir.mkdir()

        (content_dir / "file1.md").write_text(":::{note}\nNote 1\n:::")
        (content_dir / "file2.md").write_text(":::{warning}\nWarning\n:::")
        (content_dir / "file3.md").write_text("No directives here.")

        converter = FenceConverter(dry_run=False)
        process_directory(str(content_dir), converter)

        # Check that directives were converted
        assert "```{note}" in (content_dir / "file1.md").read_text()
        assert "```{warning}" in (content_dir / "file2.md").read_text()

        # Check statistics
        assert converter.stats['files_modified'] == 2
        assert converter.stats['directives_converted'] == 2

    def test_process_nested_directories(self, tmp_path, capsys):
        """Test processing nested directories."""
        content_dir = tmp_path / "content"
        subdir = content_dir / "chapter1"
        subdir.mkdir(parents=True)

        (content_dir / "intro.md").write_text(":::{note}\nIntro\n:::")
        (subdir / "section.md").write_text(":::{note}\nSection\n:::")

        converter = FenceConverter(dry_run=False)
        process_directory(str(content_dir), converter)

        assert converter.stats['files_modified'] == 2


class TestFenceConverterStatistics:
    """Tests for statistics tracking."""

    def test_track_files_modified(self, tmp_path):
        """Test tracking files modified."""
        md_file1 = tmp_path / "file1.md"
        md_file2 = tmp_path / "file2.md"
        md_file3 = tmp_path / "file3.md"

        md_file1.write_text(":::{note}\nNote\n:::")
        md_file2.write_text(":::{note}\nNote\n:::")
        md_file3.write_text("No changes needed")

        converter = FenceConverter(dry_run=False)
        converter.convert_file(md_file1)
        converter.convert_file(md_file2)
        converter.convert_file(md_file3)

        assert converter.stats['files_modified'] == 2

    def test_track_directives_converted(self, tmp_path):
        """Test tracking directives converted."""
        md_file = tmp_path / "test.md"
        md_file.write_text(""":::{note}
1
:::
:::{warning}
2
:::
:::{tip}
3
:::""")

        converter = FenceConverter(dry_run=False)
        converter.convert_file(md_file)

        assert converter.stats['directives_converted'] == 3


class TestFenceConverterErrorHandling:
    """Tests for error handling."""

    def test_handle_nonexistent_file(self, capsys):
        """Test handling nonexistent file."""
        converter = FenceConverter(dry_run=False)
        result = converter.convert_file("/nonexistent/file.md")

        assert result is False
        captured = capsys.readouterr()
        assert "Error" in captured.out

    def test_handle_empty_file(self, tmp_path):
        """Test handling empty file."""
        md_file = tmp_path / "empty.md"
        md_file.write_text("")

        converter = FenceConverter(dry_run=False)
        result = converter.convert_file(md_file)

        assert result is False  # No changes needed


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
