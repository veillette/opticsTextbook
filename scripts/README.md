# Utility Scripts for Optics Textbook

This directory contains utility scripts for maintaining and validating the
optics textbook content. The scripts are organized as a Python package with
shared utilities, comprehensive testing, and standardized reporting.

## Package Structure

The `scripts/` directory is organized as a Python package:

```
scripts/
├── __init__.py              # Package initialization
├── shared_utils.py          # Shared utilities and functions
├── report_utils.py          # Standardized report generation
├── config.json              # Centralized configuration
├── tests/                   # Unit tests
│   ├── __init__.py
│   ├── test_shared_utils.py
│   └── README.md
└── [script files]           # Individual utility scripts
```

### Core Modules

#### `shared_utils.py`

Shared utility functions and constants used across all scripts.

**Key Features:**

- Lazy-loaded configuration (doesn't crash on import if config missing)
- Comprehensive validation functions
- Standardized path handling
- Progress reporting support
- Logging integration
- Custom exception classes

**Example Usage:**

```python
from shared_utils import (
    get_chapters, validate_chapter_number,
    to_snake_case, extract_descriptive_name,
    ValidationError, ChapterError
)

# Validate chapter
try:
    validate_chapter_number(3)
except ChapterError as e:
    logger.error(f"Invalid chapter: {e}")

# Get chapter info
chapters = get_chapters()
chapter_dir, main_file = chapters[3]
```

**Available Functions:**

- Configuration: `load_config()`, `get_chapters()`, `get_image_extensions()`
- Validation: `validate_chapter_number()`, `validate_image_extension()`,
  `validate_file_exists()`
- String manipulation: `to_snake_case()`, `extract_descriptive_name()`
- Path handling: `ensure_path()`, `ensure_directory()`
- File discovery: `find_markdown_files_in_chapter()`, `get_all_markdown_files()`
- Progress: `create_progress_callback()`, `process_with_progress()`
- Formatting: `format_file_size()`

**Exception Classes:**

- `ValidationError` - Validation failures
- `ConfigurationError` - Configuration file issues
- `ChapterError` - Chapter-related errors

#### `report_utils.py`

Standardized report generation in multiple formats.

**Classes:**

- `ReportGenerator` - Generate reports in markdown, JSON, or text
- `MarkdownReportBuilder` - Build markdown reports with structured content

**Example Usage:**

```python
from report_utils import ReportGenerator, MarkdownReportBuilder

# Simple report
gen = ReportGenerator("my_report")
gen.write_json(data_dict)
gen.write_markdown(markdown_content)

# Structured markdown
builder = MarkdownReportBuilder("Validation Report")
builder.add_section("Issues Found")
builder.add_list(["Issue 1", "Issue 2"])
markdown = builder.build()
```

**All reports are saved to `reports/` directory.**

#### `config.json`

Centralized configuration file containing:

- Chapter mappings (directory and main file for each chapter)
- Image file extensions
- Naming convention templates
- Image optimization settings
- Report generation settings

**Example:**

```json
{
  "chapters": {
    "1": {"dir": "content/Chap01Basics", "file": "Basics.md"}
  },
  "image_extensions": ["png", "jpg", "jpeg", "gif", "svg", "webp"],
  "image_optimization": {
    "max_dimension": 1920,
    "quality": 80,
    "min_size_mb": 0.5
  }
}
```

---

## Available Scripts

### Image Management

#### `standardize_all_figures.py`

Automatically standardize ALL figure filenames across chapters to follow naming
conventions.

**Features:**
- Scans all image directories for figures that don't follow naming convention
- Finds where each figure is referenced in markdown documents
- Determines correct position-based filename based on order of appearance
- Renames figures to follow convention:
  `ChapterNum_ImageNum_descriptive_name.ext`
- Updates all markdown references automatically
- Handles both image files and their corresponding .ai source files
- Can process all chapters or a specific chapter
- Dry-run mode to preview all changes

**Usage:**
```bash
# Preview what would be standardized across ALL chapters
python scripts/standardize_all_figures.py --dry-run

# Standardize all chapters
python scripts/standardize_all_figures.py

# Standardize only chapter 3
python scripts/standardize_all_figures.py --chapter 3

# Verbose output with dry-run for chapter 7
python scripts/standardize_all_figures.py --chapter 7 --verbose --dry-run
```

---

#### `insert_figure.py`

Insert a new figure into a chapter and automatically renumber subsequent
figures.

**Features:**

- Automatically renames new image to follow chapter naming convention
- Renumbers all subsequent figures in the chapter
- Updates all markdown references to renumbered figures
- Handles both image files and their corresponding .ai source files
- Dry-run mode to preview changes
- Smart position detection (auto-adjusts if position is beyond end)

**Usage:**
```bash
# Insert a new figure as the 5th image in chapter 3
python scripts/insert_figure.py --image ~/Downloads/lens.png --chapter 3 --position 5 --name "lens_diagram"

# Preview what would happen (dry run)
python scripts/insert_figure.py --image lens.png --chapter 7 --position 10 --name "diffraction_pattern" --dry-run
```

---

#### `find_unreferenced_images_myst.py`

Find images that are not referenced in any markdown content files.

**Features:**
- Uses MyST build system for accurate reference detection
- Scans both markdown files and MyST build output
- Identifies both image files and their corresponding .ai source files
- Supports dry-run mode to preview results
- Generates reports using `report_utils`

**Usage:**
```bash
# Dry run (preview only)
python scripts/find_unreferenced_images_myst.py --dry-run

# Generate unreferenced image lists
python scripts/find_unreferenced_images_myst.py

# Skip .ai file analysis
python scripts/find_unreferenced_images_myst.py --no-ai
```

**Output Files** (in `reports/` directory):
- `unreferenced_images.txt` - List of unreferenced image files
- `unreferenced_ai_files.txt` - List of unreferenced .ai source files
- `referenced_images.txt` - List of referenced images (for verification)

---

#### `delete_unreferenced_images_myst.py`

Delete unreferenced images and their corresponding .ai source files.

**Features:**
- Safety features: requires confirmation before deletion
- Dry-run mode to preview deletions
- Creates backup log of deleted files using `report_utils`
- Removes empty directories after deletion
- Can selectively delete images or .ai files only

**Usage:**
```bash
# Preview what would be deleted
python scripts/delete_unreferenced_images_myst.py --dry-run

# Delete with confirmation prompt
python scripts/delete_unreferenced_images_myst.py

# Delete without confirmation (use with caution!)
python scripts/delete_unreferenced_images_myst.py --force
```

**Output Files** (in `reports/` directory):
- `deletion_log_YYYYMMDD_HHMMSS.json` - Detailed log of deletion operation

---

#### `optimize-images.js`

Optimize and compress large images in the build output.

**Features:**

- Recursively scans all subdirectories in build output
- Automatically finds images larger than configured threshold (default: 500KB)
- Compresses images while maintaining quality
- Shows reduction percentages and summary statistics
- Loads settings from `config.json`
- Dry-run mode to preview optimizations
- Verbose mode for detailed output

**Usage:**
```bash
# Via npm script (recommended)
npm run optimize-images

# Direct execution
node scripts/optimize-images.js

# Dry run (preview only)
node scripts/optimize-images.js --dry-run

# Verbose output
node scripts/optimize-images.js --verbose

# Show help
node scripts/optimize-images.js --help
```

**Note:** This script operates on built output in `_build/site/public`, so run
`npm run build` first.

---

### Reference Validation

#### `validate_references_enhanced.py`

Comprehensive validation of all references, citations, and cross-references.

**Features:**
- Runs MyST build with enhanced error detection
- Categorizes issues by type (missing figures, broken cross-refs, etc.)
- Provides detailed analysis and fix suggestions
- Generates both markdown and JSON reports using `report_utils`
- Supports strict mode for CI/CD integration
- Uses shared utilities for validation

**Usage:**
```bash
# Standard validation with full report
python scripts/validate_references_enhanced.py

# With fix suggestions
python scripts/validate_references_enhanced.py --fix-suggestions

# Quiet mode (summary only)
python scripts/validate_references_enhanced.py --quiet

# Strict mode (fail on warnings)
python scripts/validate_references_enhanced.py --strict
```

**Output Files** (in `reports/` directory):
- `validation_report.md` - Human-readable markdown report
- `validation_report.json` - Machine-readable JSON report

---

#### `find_broken_references.py`

Find broken figure references and cross-reference targets.

**Features:**
- Checks if referenced images actually exist
- Validates cross-references against defined labels
- Reports broken references with file locations and line numbers
- Groups issues by file for easy fixing
- Uses shared utilities for file discovery

**Usage:**
```bash
# Check all references
python scripts/find_broken_references.py

# Save report to file
python scripts/find_broken_references.py --output-file broken_refs.txt

# Check specific content directory
python scripts/find_broken_references.py --content-dir content
```

---

#### `lint_myst_markdown.py`

Check MyST markdown for common syntax issues and convention violations.

**Features:**

- Detects split equation/reference roles across lines
- Identifies blank lines inside math blocks
- Checks for missing labels on math blocks
- Validates equation label format
- Checks broken figure references
- Enforces fence conventions (see `MYST_CONVENTIONS.md`)
- Auto-fix mode available

**Usage:**

```bash
# Check for issues
python scripts/lint_myst_markdown.py

# Auto-fix issues
python scripts/lint_myst_markdown.py --fix

# Strict mode (exit with error code)
python scripts/lint_myst_markdown.py --strict

# Quiet mode (summary only)
python scripts/lint_myst_markdown.py --quiet
```

**Output Files** (in `reports/` directory):

- `lint_report.md` - Detailed linting report

---

## Testing

The scripts package includes comprehensive unit tests.

### Running Tests

```bash
# Install pytest (if not already installed)
pip install pytest

# Run all tests
pytest scripts/tests/ -v

# Run specific test file
pytest scripts/tests/test_shared_utils.py -v

# Run with coverage report
pytest scripts/tests/ --cov=scripts --cov-report=html
```

### Test Coverage

- **40+ test cases** covering all major functions
- String manipulation functions
- Validation functions
- Path handling
- Exception raising
- File size formatting

See `scripts/tests/README.md` for detailed testing documentation.

---

## Logging

All scripts use Python's standard `logging` module for consistent output.

### Enabling Logging

Most scripts support verbose/quiet modes:

```bash
# Verbose output (DEBUG level)
python script.py --verbose

# Quiet output (WARNING level only)
python script.py --quiet
```

### Programmatic Logging

```python
import logging
from shared_utils import logger

# Configure logging level
logging.basicConfig(level=logging.INFO)

# Use logger
logger.info("Processing started")
logger.debug("Detailed debug information")
logger.warning("Warning message")
logger.error("Error occurred")
```

---

## Recommended Workflows

### Standardizing All Figure Names (After Bulk Imports or Restructuring)

1. **Preview standardization across all chapters:**
   ```bash
   python scripts/standardize_all_figures.py --dry-run
   ```

2. **Check a specific chapter first:**
   ```bash
   python scripts/standardize_all_figures.py --chapter 3 --verbose --dry-run
   ```

3. **If preview looks good, standardize all chapters:**
   ```bash
   python scripts/standardize_all_figures.py
   ```

4. **Verify everything works:**
   ```bash
   python scripts/find_broken_references.py
   npm run build
   ```

### Adding a New Figure to a Chapter

1. **Preview the insertion (dry run):**
   ```bash
   python scripts/insert_figure.py --image path/to/new_figure.png \
     --chapter 3 --position 7 --name "descriptive_name" --dry-run
   ```

2. **If preview looks good, insert the figure:**
   ```bash
   python scripts/insert_figure.py --image path/to/new_figure.png \
     --chapter 3 --position 7 --name "descriptive_name"
   ```

3. **Add the figure reference to your markdown file:**
   ```markdown
   ```{figure} Images/03_07_descriptive_name.png
   :name: fig:descriptive_name
   :width: 80%

   Your figure caption here.
   ```
   ```

4. **Verify references are working:**
   ```bash
   python scripts/find_broken_references.py
   ```

### Before Committing Changes

1. **Run linter:**
   ```bash
   python scripts/lint_myst_markdown.py
   ```

2. **Check for broken references:**
   ```bash
   python scripts/find_broken_references.py
   ```

3. **Validate all references:**
   ```bash
   python scripts/validate_references_enhanced.py
   ```

4. **Check for unreferenced images:**
   ```bash
   python scripts/find_unreferenced_images_myst.py --dry-run
   ```

5. **Run tests:**
   ```bash
   pytest scripts/tests/ -v
   ```

### After Major Restructuring

1. **Validate everything:**
   ```bash
   python scripts/validate_references_enhanced.py --fix-suggestions
   ```

2. **Clean up unreferenced images:**
   ```bash
   python scripts/find_unreferenced_images_myst.py
   python scripts/delete_unreferenced_images_myst.py --dry-run
   # Review the preview, then:
   python scripts/delete_unreferenced_images_myst.py
   ```

3. **Run full test suite:**
   ```bash
   pytest scripts/tests/ -v
   ```

### Before Building for Distribution

1. **Lint all markdown:**
   ```bash
   python scripts/lint_myst_markdown.py --strict
   ```

2. **Ensure all references are valid:**
   ```bash
   python scripts/validate_references_enhanced.py --strict
   ```

3. **Build and optimize:**
   ```bash
   npm run build
   npm run optimize-images
   ```

---

## Requirements

### Python Scripts

- Python 3.7+
- pytest (for running tests)
- All other dependencies are from Python standard library

Install Python requirements:

```bash
pip install -r requirements.txt
```

### Node.js Scripts

- Node.js 14+
- Dependencies are managed through `package.json`

Install Node.js dependencies:

```bash
npm install
```

---

## Integration with npm Scripts

These scripts are integrated into the project's npm workflow:

```bash
# From package.json
npm run checklinks              # Validate all internal and external links
npm run optimize-images         # Run image optimization
npm run find-unreferenced       # Find unreferenced images
npm run find-unreferenced-dry   # Dry run for unreferenced images
npm run clean-unreferenced      # Delete unreferenced images
npm run clean-unreferenced-dry  # Dry run for deletion
npm run validate-enhanced       # Comprehensive validation
npm run validate-enhanced-quiet # Quiet validation
```

For Python scripts not in npm, run them directly as shown in the usage examples
above.

---

## Configuration

All scripts load configuration from `scripts/config.json`. Key settings:

- **chapters**: Chapter directory and file mappings
- **image_extensions**: Supported image file types
- **naming_convention**: Filename template
- **image_optimization**: Settings for image compression
- **reports**: Report generation settings

To modify settings, edit `config.json` directly. The configuration is validated
on load with helpful error messages if something is wrong.

---

## Troubleshooting

### "npm not found" error

Ensure Node.js is installed and available in your PATH.

### "Command timed out" error

The build process may be taking too long. Try increasing the timeout in the
script or ensure there are no infinite loops in your content.

### "File not found" errors

Ensure you're running scripts from the project root directory and that the
`content/` directory exists.

### "Module not found" errors

If importing from scripts package fails:

```bash
# Make sure you're in the project root
cd /path/to/opticsTextbook

# Try adding to PYTHONPATH
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
```

### "Configuration file not found"

The `scripts/config.json` file is required. If it's missing, check that you're
in the correct directory.

### No issues found but problems persist

Try running `npm run build` to see MyST's native error messages, which may
provide additional context.

### Test failures

```bash
# Run tests with more verbose output
pytest scripts/tests/ -vv

# Run specific failing test
pytest scripts/tests/test_shared_utils.py::TestToSnakeCase::test_basic_camel_case -vv
```

---

## Development

### Adding New Scripts

When creating new utility scripts:

1. Import shared utilities:
   ```python
   from shared_utils import (
       get_chapters, validate_chapter_number,
       to_snake_case, logger
   )
   from report_utils import ReportGenerator
   ```

2. Use consistent argument parsing:
   ```python
   parser = argparse.ArgumentParser(description="...")
   parser.add_argument('--dry-run', action='store_true')
   parser.add_argument('--verbose', action='store_true')
   ```

3. Set up logging:
   ```python
   import logging
   logging.basicConfig(
       level=logging.DEBUG if args.verbose else logging.INFO
   )
   ```

4. Generate reports in standard location:
   ```python
   gen = ReportGenerator("my_report")
   gen.write_json(data)
   ```

5. Add tests:
   ```python
   # In scripts/tests/test_my_script.py
   def test_my_function():
       result = my_function("input")
       assert result == "expected"
   ```

### Code Style

- Follow PEP 8 guidelines
- Use type hints where helpful
- Add docstrings to all functions
- Use logging instead of print statements
- Handle errors with custom exceptions from shared_utils

---

## Maintenance

These scripts are maintained as part of the optics textbook project. If you
encounter issues or have suggestions for improvements, please file an issue in
the project repository.

For detailed information about recent refactorings and improvements, see:

- `REFACTORING_NOTES.md` - Initial refactoring summary
- `REFACTORING_COMPLETE.md` - Comprehensive refactoring documentation

**Last Updated:** October 2025
