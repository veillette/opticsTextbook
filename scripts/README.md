# Utility Scripts for Optics Textbook

This directory contains utility scripts for maintaining and validating the
optics textbook content.

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

**What it does:**

1. Scans each chapter's Images directory
2. Identifies improperly named figures
3. Parses markdown files to find reference order
4. Generates correct filenames based on appearance order
5. Renames files while avoiding conflicts
6. Updates all markdown references
7. Handles .ai source files automatically

**Example output:**

```
Processing Chapter 2: content/Chap02GeometricalOptics
  Total images: 23
  Properly named: 15
  Need standardization: 8
  Referenced images: 22
  Images to rename: 7

Renaming 7 images...
  ✓ 2_34_two_thin_lenses.png -> 02_22_two_thin_lenses.png
  ✓ 2_33_spherical_lens.png -> 02_21_spherical_lens.png
  ✓ 2_32_two_thin_lenses_c_d.png -> 02_20_two_thin_lenses_c_d.png

Updating markdown references...
  ✓ Updated: GeometricalOptics.md
  ✓ Updated: Problems/GeometricalOpticsExercise.md
```

**When to use:**

- After importing new figures with inconsistent naming
- After restructuring chapter content
- To establish consistent naming across the entire textbook
- Before major releases to ensure consistency

---

#### `insert_figure.py`

Insert a new figure into a chapter and automatically renumber subsequent
figures.

**Features:**

- Automatically renames new image to follow chapter naming convention (
  ChapterNum_ImageNum_descriptive_name.ext)
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

# Insert at the end of chapter 2 (position auto-detected)
python scripts/insert_figure.py --image mirror.jpg --chapter 2 --position 999 --name "curved_mirror"

# Let script use original filename as descriptive name
python scripts/insert_figure.py --image new_image.png --chapter 4 --position 3
```

**Arguments:**

- `--image PATH` - Path to the new image file (required)
- `--chapter NUM` - Chapter number 1-11 (required)
- `--position NUM` - Position to insert (1-based, required)
- `--name NAME` - Descriptive name (optional, uses original filename if not
  provided)
- `--dry-run` - Preview changes without modifying files

**What it does:**

1. Validates inputs (chapter exists, position is valid, image exists)
2. Shows existing figures around the insertion point
3. Renames existing figures with position >= insertion point (increments by 1)
4. Copies new image with proper naming convention
5. Updates all markdown references in chapter files
6. Handles .ai source files automatically

**Example output:**

```
Existing figures in chapter: 6

Figures around insertion point:
     [02] 01_02_electromagnetic_spectrum_f1.png
  ↑  [03] 01_03_roemer.webp
  → INSERT HERE [04] 01_04_fizeau.webp
     [05] 01_05_refractive_index_glass_f1.png

Renumbering 3 existing figures...
  ✓ Renamed: 01_06_light_paths.webp -> 01_07_light_paths.webp
  ✓ Renamed: 01_05_refractive_index_glass_f1.png -> 01_06_refractive_index_glass_f1.png
  ✓ Renamed: 01_04_fizeau.webp -> 01_05_fizeau.webp

Inserting new figure...
✓ Copied new image: lens.png -> 01_04_lens_diagram.png

Updating markdown references...
  ✓ Updated: Basics.md
```

---

#### `find_unreferenced_images_myst.py`

Find images that are not referenced in any markdown content files.

**Features:**

- Uses MyST build system for accurate reference detection
- Scans both markdown files and MyST build output
- Identifies both image files and their corresponding .ai source files
- Supports dry-run mode to preview results

**Usage:**

```bash
# Dry run (preview only)
python scripts/find_unreferenced_images_myst.py --dry-run

# Generate unreferenced image lists
python scripts/find_unreferenced_images_myst.py

# Skip .ai file analysis
python scripts/find_unreferenced_images_myst.py --no-ai
```

**Output Files:**

- `unreferenced_images.txt` - List of unreferenced image files
- `unreferenced_ai_files.txt` - List of unreferenced .ai source files
- `referenced_images.txt` - List of referenced images (for verification)

---

#### `delete_unreferenced_images_myst.py`

Delete unreferenced images and their corresponding .ai source files.

**Features:**

- Safety features: requires confirmation before deletion
- Dry-run mode to preview deletions
- Creates backup log of deleted files
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

# Delete only image files (keep .ai files)
python scripts/delete_unreferenced_images_myst.py --images-only

# Delete only .ai files (keep images)
python scripts/delete_unreferenced_images_myst.py --ai-only
```

**Output Files:**

- `deletion_log_YYYYMMDD_HHMMSS.json` - Detailed log of deletion operation

---

#### `optimize-images.js`

Optimize and compress large images in the build output.

**Features:**

- Automatically finds images larger than 500KB
- Compresses images while maintaining quality
- Shows reduction percentages
- Works on built output in `_build/` directory

**Usage:**

```bash
# Via npm script (recommended)
npm run optimize-images

# Direct execution
node scripts/optimize-images.js
```

**Note:** This script operates on built output, so run `npm run build` first.

---

### Reference Validation

#### `validate_references_enhanced.py`

Comprehensive validation of all references, citations, and cross-references.

**Features:**

- Runs MyST build with enhanced error detection
- Categorizes issues by type (missing figures, broken cross-refs, etc.)
- Provides detailed analysis and fix suggestions
- Generates both markdown and JSON reports
- Supports strict mode for CI/CD integration

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

# Save detailed report
python scripts/validate_references_enhanced.py --output-file validation_report
```

**Output Files:**

- `validation_report.md` - Human-readable markdown report
- `validation_report.json` - Machine-readable JSON report

**Issue Categories:**

- Missing figures/images
- Broken cross-references
- External link errors
- Equation errors
- Citation errors
- Syntax errors
- Build errors

---

#### `find_broken_references.py`

Find broken figure references and cross-reference targets.

**Features:**

- Checks if referenced images actually exist
- Validates cross-references against defined labels
- Reports broken references with file locations and line numbers
- Groups issues by file for easy fixing

**Usage:**

```bash
# Check all references
python scripts/find_broken_references.py

# Save report to file
python scripts/find_broken_references.py --output-file broken_refs.txt

# Check specific content directory
python scripts/find_broken_references.py --content-dir content
```

**Output:**

- Console report with broken references
- Optional file output for documentation

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

1. **Check for broken references:**
   ```bash
   python scripts/find_broken_references.py
   ```

2. **Validate all references:**
   ```bash
   python scripts/validate_references_enhanced.py
   ```

3. **Check for unreferenced images:**
   ```bash
   python scripts/find_unreferenced_images_myst.py --dry-run
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

### Before Building for Distribution

1. **Ensure all references are valid:**
   ```bash
   python scripts/validate_references_enhanced.py --strict
   ```

2. **Optimize images:**
   ```bash
   npm run build
   npm run optimize-images
   ```

---

## Requirements

### Python Scripts

- Python 3.7+
- No external dependencies (uses only standard library)

### Node.js Scripts

- Node.js 14+
- Dependencies are managed through `package.json`

---

## Integration with npm Scripts

These scripts are integrated into the project's npm workflow:

```bash
# From package.json
npm run checklinks      # Validate all internal and external links
npm run optimize-images # Run image optimization
```

For Python scripts, run them directly as shown in the usage examples above.

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

### No issues found but problems persist

Try running `npm run build` to see MyST's native error messages, which may
provide additional context.

---

## Maintenance

These scripts are maintained as part of the optics textbook project. If you
encounter issues or have suggestions for improvements, please file an issue in
the project repository.

**Last Updated:** September 2025