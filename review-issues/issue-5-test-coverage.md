# Issue: Expand test coverage beyond shared_utils

**Labels:** `testing`, `enhancement`, `priority: medium`

## Problem

The project currently has only one test file (`scripts/tests/test_shared_utils.py`) covering the shared utilities module. While this provides 40+ unit tests for core functions, many other Python scripts lack automated test coverage.

## Current Test Coverage

**Tested:**
- ✅ `shared_utils.py` - Comprehensive coverage (40+ tests)
  - Chapter discovery and validation
  - File path handling
  - Markdown parsing
  - Reference extraction
  - Configuration loading

**Untested:**
- ❌ `validate_references_enhanced.py` - No tests
- ❌ `lint_myst_markdown.py` - No tests
- ❌ `find_unreferenced_images_myst.py` - No tests
- ❌ `delete_unreferenced_images_myst.py` - No tests **(destructive operation!)**
- ❌ `insert_figure.py` - No tests **(modifies files!)**
- ❌ `standardize_all_figures.py` - No tests
- ❌ `fix_split_equation_refs.py` - No tests
- ❌ `convert_fences.py` - No tests

## Impact

**Severity:** Medium
**Risk:** Changes to untested scripts could introduce bugs that go undetected until runtime

**Current safeguards:**
- ✅ Pre-commit hook runs existing tests (blocking)
- ✅ GitHub Actions validation workflow
- ❌ Many critical scripts not covered by tests

## Recommended Test Coverage

### Priority 1: High-risk operations

**`delete_unreferenced_images_myst.py`** (HIGHEST PRIORITY)
- Tests with mock filesystem
- Validate dry-run mode doesn't delete
- Verify only truly unreferenced images deleted
- Test safety checks and confirmations

**`insert_figure.py`**
- Test figure numbering logic
- Validate markdown injection doesn't corrupt files
- Test dry-run mode
- Verify image file copying

**`fix_split_equation_refs.py`**
- Test pattern matching for split references
- Validate fixes don't break valid references
- Test dry-run vs. actual mode
- Edge cases (already-fixed refs, nested structures)

### Priority 2: Validation tools

**`validate_references_enhanced.py`**
- Test reference parsing
- Mock markdown files with known references
- Validate detection of broken references
- Test report generation

**`lint_myst_markdown.py`**
- Test detection of common issues
- Validate auto-fix mode
- Test with various malformed inputs
- Verify fixes preserve content

### Priority 3: Image management

**`find_unreferenced_images_myst.py`**
- Test image reference detection
- Mock content with known references
- Validate report generation

**`standardize_all_figures.py`**
- Test filename standardization logic
- Validate renaming doesn't break references
- Test collision detection

## Recommended Testing Strategy

### 1. Add pytest fixtures

```python
# conftest.py
@pytest.fixture
def temp_content_dir(tmp_path):
    """Create temporary content directory structure."""
    content_dir = tmp_path / "content"
    content_dir.mkdir()
    # Create mock chapters, images, etc.
    return content_dir

@pytest.fixture
def mock_markdown_file(tmp_path):
    """Create mock markdown file with figures."""
    # Return path to file with known content
    pass
```

### 2. Use test data

Create `scripts/tests/fixtures/` with:
- Sample markdown files
- Mock image files
- Test configuration files
- Known good/bad references

### 3. Test safety features

For destructive operations:
- Test dry-run mode does nothing
- Verify confirmations required
- Check rollback/undo capability

### 4. Test edge cases

- Empty files
- Missing directories
- Malformed input
- Unicode characters
- Very long paths

## Implementation Plan

### Phase 1: Critical operations (~2-4 hours)
- Add tests for delete_unreferenced_images
- Add tests for insert_figure
- Add tests for fix_split_equation_refs

### Phase 2: Validation tools (~2-3 hours)
- Add tests for validate_references_enhanced
- Add tests for lint_myst_markdown

### Phase 3: Image management (~1-2 hours)
- Add tests for find_unreferenced_images
- Add tests for standardize_all_figures

### Phase 4: Other utilities (~1-2 hours)
- Add tests for convert_fences
- Integration tests for workflows

## Target Coverage

**Goal:** 70-80% code coverage for all Python scripts

**Minimum:** All destructive operations must have tests

## Testing Tools

Already available:
- ✅ pytest configured in pyproject.toml
- ✅ Pre-commit hook runs tests
- ✅ GitHub Actions runs tests

Could add:
- pytest-cov for coverage reports
- pytest-mock for easier mocking
- Coverage badge in README

## Benefits

1. **Confidence** - Refactor safely
2. **Documentation** - Tests show expected behavior
3. **Regression prevention** - Catch bugs before deployment
4. **Faster debugging** - Tests pinpoint issues
5. **Contributor safety** - Contributors can verify changes

## Example Test Structure

```python
# test_delete_unreferenced_images.py
import pytest
from pathlib import Path
from delete_unreferenced_images_myst import (
    find_unreferenced_images,
    delete_images_safely
)

def test_find_unreferenced_images_empty_content(temp_content_dir):
    """Test with no markdown files."""
    result = find_unreferenced_images(temp_content_dir)
    assert result == []

def test_delete_in_dry_run_mode(temp_content_dir, mock_images):
    """Verify dry-run doesn't actually delete."""
    result = delete_images_safely(mock_images, dry_run=True)
    assert all(img.exists() for img in mock_images)

def test_delete_only_unreferenced(temp_content_dir):
    """Verify only unreferenced images deleted."""
    # Setup: create referenced and unreferenced images
    # Execute: delete unreferenced
    # Assert: only unreferenced deleted
    pass
```

## Related

- `scripts/tests/test_shared_utils.py` - Good example to follow
- Pre-commit hook configuration
- GitHub Actions validation workflow

## Priority

**Medium** - Would improve project quality and maintainability, but existing tests + validation workflows provide some coverage.

## Acceptance Criteria

- [ ] All destructive operations have tests
- [ ] Critical validation scripts tested
- [ ] Coverage report available (`pytest --cov`)
- [ ] Tests pass in CI/CD
- [ ] Documentation updated with testing guidelines
