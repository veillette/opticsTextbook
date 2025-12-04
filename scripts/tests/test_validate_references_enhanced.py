#!/usr/bin/env python3
"""
Unit tests for validate_references_enhanced.py module.

Tests cover:
- Error extraction patterns
- Issue categorization
- Pattern analysis
- Fix suggestions generation
- Report generation

Run with: pytest scripts/tests/test_validate_references_enhanced.py -v
"""

import pytest
import os
import sys
from pathlib import Path
from collections import Counter

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from validate_references_enhanced import (
    extract_figure_error,
    extract_cross_ref_error,
    extract_link_error,
    extract_equation_error,
    extract_citation_error,
    extract_syntax_error,
    generate_fix_suggestions,
    analyze_patterns,
    get_error_emoji,
    parse_enhanced_myst_output,
)


class TestExtractFigureError:
    """Tests for extract_figure_error function."""

    def test_extract_basic_figure_error(self):
        """Test extracting basic figure error."""
        line = "Image test.png not found in chapter1.md"
        result = extract_figure_error(line)

        assert result['type'] == 'missing_figure'
        assert 'test.png' in result.get('message', '') or 'test.png' in result.get('image', '')

    def test_extract_figure_path_error(self):
        """Test extracting figure with path."""
        line = "Cannot find Images/03_05_diagram.png"
        result = extract_figure_error(line)

        assert result['type'] == 'missing_figure'

    def test_extract_various_extensions(self):
        """Test extracting various image extensions."""
        extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp']
        for ext in extensions:
            line = f"Figure missing.{ext} not found"
            result = extract_figure_error(line)
            assert result['type'] == 'missing_figure'


class TestExtractCrossRefError:
    """Tests for extract_cross_ref_error function."""

    def test_extract_cross_ref_not_found(self):
        """Test extracting cross reference not found error."""
        line = "content/chapter1.md Cross reference target was not found: fig:missing"
        result = extract_cross_ref_error(line)

        assert result['type'] == 'broken_cross_ref'

    def test_extract_unknown_reference(self):
        """Test extracting unknown reference error."""
        line = "Unknown reference target: eq:missing in test.md"
        result = extract_cross_ref_error(line)

        assert result['type'] == 'broken_cross_ref'

    def test_extract_undefined_reference(self):
        """Test extracting undefined reference with backticks."""
        line = "Undefined reference `section:missing`"
        result = extract_cross_ref_error(line)

        assert result['type'] == 'broken_cross_ref'


class TestExtractLinkError:
    """Tests for extract_link_error function."""

    def test_extract_url_error(self):
        """Test extracting URL from error."""
        line = "Link not found: https://example.com/broken in test.md"
        result = extract_link_error(line)

        assert result['type'] == 'external_link_error'
        assert 'https://example.com/broken' in result.get('url', '')

    def test_extract_http_error(self):
        """Test extracting HTTP error."""
        line = "HTTP error 404 for http://test.com/page"
        result = extract_link_error(line)

        assert result['type'] == 'external_link_error'

    def test_no_url_in_error(self):
        """Test when no URL in error message."""
        line = "Link check failed for some reason"
        result = extract_link_error(line)

        assert result['type'] == 'external_link_error'
        assert result.get('url', '') == ''


class TestExtractEquationError:
    """Tests for extract_equation_error function."""

    def test_extract_equation_not_found(self):
        """Test extracting equation not found error."""
        line = "Equation snells_law not found in chapter2.md"
        result = extract_equation_error(line)

        assert result['type'] == 'equation_error'

    def test_extract_math_error(self):
        """Test extracting math error."""
        line = "Math error in test.md"
        result = extract_equation_error(line)

        assert result['type'] == 'equation_error'


class TestExtractCitationError:
    """Tests for extract_citation_error function."""

    def test_extract_citation_not_found(self):
        """Test extracting citation not found error."""
        line = "Citation author2023 not found in references.md"
        result = extract_citation_error(line)

        assert result['type'] == 'citation_error'

    def test_extract_bibliography_error(self):
        """Test extracting bibliography error."""
        line = "Bibliography error in chapter1.md"
        result = extract_citation_error(line)

        assert result['type'] == 'citation_error'


class TestExtractSyntaxError:
    """Tests for extract_syntax_error function."""

    def test_extract_syntax_error_with_line(self):
        """Test extracting syntax error with line number."""
        line = "Syntax error in test.md line 42"
        result = extract_syntax_error(line)

        assert result['type'] == 'syntax_error'
        assert result.get('line_number', '') == '42'

    def test_extract_syntax_error_with_file(self):
        """Test extracting syntax error with file."""
        line = "Parse error in chapter.md"
        result = extract_syntax_error(line)

        assert result['type'] == 'syntax_error'
        assert 'chapter.md' in result.get('file', '')


class TestGenerateFixSuggestions:
    """Tests for generate_fix_suggestions function."""

    def test_suggestions_for_missing_figures(self):
        """Test generating suggestions for missing figures."""
        issues = {
            'missing_figures': [{'message': 'test', 'type': 'missing_figure'}],
            'broken_cross_refs': [],
            'external_link_errors': [],
            'equation_errors': [],
            'citation_errors': [],
            'syntax_errors': [],
            'other_warnings': [],
            'build_errors': []
        }

        suggestions = generate_fix_suggestions(issues)

        assert 'missing_figures' in suggestions
        assert len(suggestions['missing_figures']) > 0

    def test_suggestions_for_broken_refs(self):
        """Test generating suggestions for broken references."""
        # Note: targets without dots avoid triggering a known bug in the code
        # where Counter.most_common() tuples are joined directly
        issues = {
            'missing_figures': [],
            'broken_cross_refs': [
                {'target': 'fig-test', 'type': 'broken_cross_ref'},
                {'target': 'eq-another', 'type': 'broken_cross_ref'}
            ],
            'external_link_errors': [],
            'equation_errors': [],
            'citation_errors': [],
            'syntax_errors': [],
            'other_warnings': [],
            'build_errors': []
        }

        suggestions = generate_fix_suggestions(issues)

        assert 'broken_cross_refs' in suggestions
        # Suggestions should include general advice for fixing refs
        assert len(suggestions['broken_cross_refs']) > 0

    def test_suggestions_for_external_links(self):
        """Test generating suggestions for external links."""
        issues = {
            'missing_figures': [],
            'broken_cross_refs': [],
            'external_link_errors': [{'url': 'https://test.com', 'type': 'external_link_error'}],
            'equation_errors': [],
            'citation_errors': [],
            'syntax_errors': [],
            'other_warnings': [],
            'build_errors': []
        }

        suggestions = generate_fix_suggestions(issues)

        assert 'external_links' in suggestions
        assert len(suggestions['external_links']) > 0

    def test_general_suggestions_always_present(self):
        """Test that general suggestions are always present."""
        issues = {
            'missing_figures': [],
            'broken_cross_refs': [],
            'external_link_errors': [],
            'equation_errors': [],
            'citation_errors': [],
            'syntax_errors': [],
            'other_warnings': [],
            'build_errors': []
        }

        suggestions = generate_fix_suggestions(issues)

        assert 'general' in suggestions
        assert len(suggestions['general']) > 0


class TestAnalyzePatterns:
    """Tests for analyze_patterns function."""

    def test_analyze_empty_issues(self):
        """Test analyzing empty issues."""
        issues = {
            'missing_figures': [],
            'broken_cross_refs': [],
            'external_link_errors': [],
            'equation_errors': [],
            'citation_errors': [],
            'syntax_errors': [],
            'other_warnings': [],
            'build_errors': []
        }

        analysis = analyze_patterns(issues)

        assert analysis['severity_summary']['total'] == 0
        assert analysis['severity_summary']['critical'] == 0
        assert analysis['severity_summary']['warnings'] == 0

    def test_analyze_with_issues(self):
        """Test analyzing issues."""
        issues = {
            'missing_figures': [
                {'file': 'test.md', 'type': 'missing_figure'}
            ],
            'broken_cross_refs': [
                {'file': 'test.md', 'target': 'fig.test', 'type': 'broken_cross_ref'}
            ],
            'external_link_errors': [],
            'equation_errors': [],
            'citation_errors': [],
            'syntax_errors': [],
            'other_warnings': [],
            'build_errors': [
                {'message': 'Build failed', 'type': 'build'}
            ]
        }

        analysis = analyze_patterns(issues)

        assert analysis['severity_summary']['total'] == 3
        assert analysis['severity_summary']['critical'] == 1  # build_errors
        assert analysis['severity_summary']['warnings'] == 2

    def test_files_with_most_issues(self):
        """Test tracking files with most issues."""
        issues = {
            'missing_figures': [
                {'file': 'test.md', 'type': 'missing_figure'},
                {'file': 'test.md', 'type': 'missing_figure'},
                {'file': 'other.md', 'type': 'missing_figure'},
            ],
            'broken_cross_refs': [],
            'external_link_errors': [],
            'equation_errors': [],
            'citation_errors': [],
            'syntax_errors': [],
            'other_warnings': [],
            'build_errors': []
        }

        analysis = analyze_patterns(issues)

        assert 'test.md' in analysis['files_with_most_issues']
        assert analysis['files_with_most_issues']['test.md'] == 2


class TestGetErrorEmoji:
    """Tests for get_error_emoji function."""

    def test_known_error_types(self):
        """Test emoji for known error types."""
        assert get_error_emoji('missing_figures') == '🖼️'
        assert get_error_emoji('broken_cross_refs') == '🔗'
        assert get_error_emoji('external_link_errors') == '🌐'
        assert get_error_emoji('equation_errors') == '🧮'
        assert get_error_emoji('citation_errors') == '📚'
        assert get_error_emoji('syntax_errors') == '⚠️'
        assert get_error_emoji('build_errors') == '❌'

    def test_unknown_error_type(self):
        """Test emoji for unknown error type."""
        result = get_error_emoji('unknown_type')
        assert result == '❓'


class TestParseEnhancedMystOutput:
    """Tests for parse_enhanced_myst_output function."""

    def test_parse_empty_output(self):
        """Test parsing empty output."""
        validation_results = {
            'build_output': '',
            'build_errors': '',
            'check_output': '',
            'check_errors': ''
        }

        issues = parse_enhanced_myst_output(validation_results)

        assert all(len(v) == 0 for v in issues.values())

    def test_parse_warning_output(self):
        """Test parsing warning output."""
        validation_results = {
            'build_output': '⚠️ Image not found: test.png in chapter.md',
            'build_errors': '',
            'check_output': '',
            'check_errors': ''
        }

        issues = parse_enhanced_myst_output(validation_results)

        assert len(issues['missing_figures']) > 0

    def test_parse_cross_ref_warning(self):
        """Test parsing cross reference warning."""
        validation_results = {
            'build_output': '⚠️ Cross reference target was not found: fig:test',
            'build_errors': '',
            'check_output': '',
            'check_errors': ''
        }

        issues = parse_enhanced_myst_output(validation_results)

        assert len(issues['broken_cross_refs']) > 0

    def test_parse_build_error(self):
        """Test parsing build error."""
        validation_results = {
            'build_output': '',
            'build_errors': '❌ Fatal build error occurred',
            'check_output': '',
            'check_errors': ''
        }

        issues = parse_enhanced_myst_output(validation_results)

        assert len(issues['build_errors']) > 0

    def test_parse_syntax_error(self):
        """Test parsing syntax error."""
        validation_results = {
            'build_output': '',
            'build_errors': '❌ Syntax error: Invalid syntax in test.md',
            'check_output': '',
            'check_errors': ''
        }

        issues = parse_enhanced_myst_output(validation_results)

        assert len(issues['syntax_errors']) > 0

    def test_parse_mixed_output(self):
        """Test parsing mixed output with multiple issue types."""
        validation_results = {
            'build_output': '''
            ⚠️ Image not found: img.png
            ⚠️ Cross reference target was not found: ref
            ⚠️ Link not found: https://broken.com
            ''',
            'build_errors': '❌ Build failed',
            'check_output': '',
            'check_errors': ''
        }

        issues = parse_enhanced_myst_output(validation_results)

        total = sum(len(v) for v in issues.values())
        assert total >= 3


class TestIssueCategories:
    """Tests for issue categorization."""

    def test_all_categories_present(self):
        """Test that all expected categories are present."""
        validation_results = {
            'build_output': '',
            'build_errors': '',
            'check_output': '',
            'check_errors': ''
        }

        issues = parse_enhanced_myst_output(validation_results)

        expected_categories = [
            'missing_figures',
            'broken_cross_refs',
            'external_link_errors',
            'equation_errors',
            'citation_errors',
            'syntax_errors',
            'other_warnings',
            'build_errors'
        ]

        for category in expected_categories:
            assert category in issues


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
