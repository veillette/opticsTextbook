# MyST Markdown Project Utility Scripts

This directory contains reusable utility scripts for MyST Markdown projects. These scripts are **content-agnostic** and work with any MyST project structure.

## 📁 Directory Structure

The scripts are organized by responsibility:

```
scripts/
├── build/                  # Build & deployment scripts
│   ├── copy-export-files.js
│   ├── inject-custom-scripts.js
│   ├── install-pwa-assets.js
│   ├── generate-pwa-icons.js
│   ├── generate-pwa-manifest.js
│   └── optimize-images.js
│
├── validation/            # Content validation scripts
│   ├── validate-all.js           # 🎯 Unified validator (runs all checks)
│   ├── validate-references.js    # Reference & link validation
│   ├── validate-images.js        # Image reference validation
│   └── lint-markdown.js          # MyST markdown linting
│
├── transform/             # Content transformation scripts
│   ├── fix-directive-syntax.js   # Fix MyST directive syntax issues
│   ├── fix-split-references.js   # Fix split equation references
│   ├── standardize-labels.js     # Standardize all label types
│   └── standardize-figures.js    # Standardize figure naming
│
├── images/                # Image management scripts
│   ├── find-unreferenced.js      # Find unused images
│   ├── delete-unreferenced.js    # Delete unused images
│   └── insert-figure.js          # Insert & renumber figures
│
├── shared-utils.js        # Shared utility functions
├── report-utils.js        # Report generation utilities
├── config.json            # Project configuration
└── README.md             # This file
```

## 🚀 Quick Start

### Primary Commands

```bash
# Build the project
npm run build

# Validate all content (recommended before commits)
npm run validate

# Lint and fix markdown issues
npm run lint:fix

# Standardize labels across the project
npm run standardize:labels
```

## 📋 Complete Command Reference

### Build & Deployment

```bash
# Standard build pipeline
npm run build                      # Full build with PWA
npm run build:no-pwa               # Build without PWA setup

# Build components
npm run copy-exports               # Copy PDF/DOCX exports to build
npm run inject-scripts             # Inject custom scripts into HTML
npm run optimize-images            # Optimize images for web

# PWA setup
npm run generate-icons             # Generate PWA icons from logo
npm run generate-manifest          # Generate PWA manifest
npm run setup-pwa                  # Complete PWA installation
```

### Validation

```bash
# Comprehensive validation
npm run validate                   # Run all validators
npm run validate:quiet             # Quiet mode (summary only)
npm run validate:strict            # Fail on warnings
npm run validate:fix               # Auto-fix issues where possible

# Specific validators
npm run validate:references        # Validate all references
npm run validate:references:suggestions  # Include fix suggestions
npm run validate:images            # Validate image references

# Linting
npm run lint                       # Check markdown syntax
npm run lint:fix                   # Fix markdown issues
npm run lint:quiet                 # Quiet mode
```

### Content Transformation

```bash
# Fix directive syntax
npm run fix:directives             # Fix all directive issues
npm run fix:directives:dry         # Dry run (preview changes)
npm run fix:directives:fences      # Only fix fence types
npm run fix:directives:admonitions # Only fix admonitions

# Fix split references
npm run fix:split-refs             # Fix split equation references
npm run fix:split-refs:dry         # Dry run

# Standardize labels
npm run standardize:labels         # Standardize all label types
npm run standardize:labels:check   # Check without fixing
npm run standardize:labels:figures # Only figure labels
npm run standardize:labels:equations # Only equation labels

# Standardize figures
npm run standardize:figures        # Standardize figure naming
npm run standardize:figures:dry    # Dry run
```

### Image Management

```bash
# Find unreferenced images
npm run images:find-unreferenced       # Find unused images
npm run images:find-unreferenced:dry   # Dry run

# Clean unreferenced images
npm run images:clean-unreferenced      # Delete unused images
npm run images:clean-unreferenced:dry  # Dry run (safer!)

# Insert figures
npm run images:insert              # Interactive figure insertion
# Example: npm run images:insert -- --image new.png --chapter 3 --position 5
```

## 🎯 Common Workflows

### Before Committing

```bash
# Validate everything
npm run validate

# Fix any issues
npm run lint:fix
npm run standardize:labels
```

### After Adding New Content

```bash
# Validate references
npm run validate:references

# Check for broken links
npm run checklinks

# Find any unreferenced images
npm run images:find-unreferenced
```

### Cleaning Up the Project

```bash
# Find unused images (dry run first!)
npm run images:find-unreferenced

# Delete unused images (be careful!)
npm run images:clean-unreferenced:dry
npm run images:clean-unreferenced  # only after reviewing dry run
```

### Standardizing an Existing Project

```bash
# Step 1: Fix directive syntax
npm run fix:directives:dry         # preview changes
npm run fix:directives             # apply changes

# Step 2: Standardize labels
npm run standardize:labels:check   # check current state
npm run standardize:labels         # fix labels

# Step 3: Standardize figures
npm run standardize:figures:dry    # preview changes
npm run standardize:figures        # apply changes

# Step 4: Validate everything
npm run validate
```

## 📖 Detailed Script Documentation

### Validation Scripts

#### `validate-all.js` ⭐
**Primary validation tool** - runs all validators in sequence.

```bash
node scripts/validation/validate-all.js [options]

Options:
  --quiet              Only show summary
  --strict             Fail on warnings
  --fix                Auto-fix issues
  --skip-references    Skip reference validation
  --skip-labels        Skip label validation
  --skip-images        Skip image validation
  --skip-lint          Skip markdown linting
```

Features:
- Runs all validators automatically
- Generates comprehensive reports
- Shows duration for each validator
- Saves JSON and Markdown reports

#### `standardize-labels.js`
Standardizes labels across all content types.

Standard formats:
- Figure: `fig:chapter-code:descriptiveName`
- Table: `table:chapter-code:descriptiveName`
- Section: `(sec:chapter-code:descriptiveName)=`
- Chapter: `(chapter:chapter-code)=`
- Appendix: `(appendix:descriptiveName)=`
- Equation: `eq:chapter-code:descriptiveName`

```bash
# Standardize all labels
npm run standardize:labels

# Check specific type
npm run standardize:labels -- --type figure --check
```

## 🔧 Configuration

### `config.json`

The main configuration file supports auto-discovery:

```json
{
  "chapters": {
    "_auto_discover": true,
    "_content_directory": "content",
    "_chapter_pattern": "Chap*"
  },
  "image_extensions": ["png", "jpg", "jpeg", "gif", "svg", "webp"]
}
```

## 📚 Migration from Old Structure

### Old vs New Script Names

| Old Command | New Command |
|------------|-------------|
| `npm run validate-enhanced` | `npm run validate` or `npm run validate:references` |
| `npm run find-unreferenced` | `npm run images:find-unreferenced` |
| `npm run clean-unreferenced` | `npm run images:clean-unreferenced` |
| `npm run lint:equations` | `npm run standardize:labels -- --type equation` |
| `npm run lint:labels` | `npm run standardize:labels:check` |
| `npm run convert-fences` | `npm run fix:directives:fences` |
| `npm run fix-admonitions` | `npm run fix:directives:admonitions` |
| `npm run find-broken` | `npm run validate:references` |
| `npm run insert-figure` | `npm run images:insert` |

### Updated Directory Locations

Scripts have been reorganized into clear categories:
- **build/** - Build and deployment
- **validation/** - All validation and linting
- **transform/** - Content transformation and standardization
- **images/** - Image management

All imports updated from `shared_utils` to `shared-utils` for consistency.

## 🐛 Troubleshooting

### Script not found

Ensure you're using the new npm script names (see migration table above).

### Import errors

All imports have been updated. Old scripts with `require('./shared_utils')` now use `require('../shared-utils')`.

## 📄 License

These scripts are part of the MyST Markdown ecosystem and can be freely used and modified for your projects.

---

**Last Updated:** December 2025
**Version:** 2.0.0 (Reorganized structure)
