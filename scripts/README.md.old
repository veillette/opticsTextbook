# MyST Markdown Project Utility Scripts

This directory contains reusable utility scripts for MyST Markdown projects. These scripts are **content-agnostic** and work with any MyST project structure.

## Overview

The scripts have been designed to automatically discover project structure and configuration from your `myst.yml` file and content directory, making them portable across different MyST projects.

## Key Features

- **Auto-discovery**: Automatically finds chapters/sections in your content directory
- **Configuration-driven**: Reads project metadata from `myst.yml`
- **Content-agnostic**: No hardcoded paths or project-specific values
- **PWA support**: Generate Progressive Web App assets from project configuration

## Prerequisites

- Python 3.12+
- Node.js 20+
- MyST Markdown CLI (`mystmd`)

## Installation

```bash
# Install Python dependencies (if using Python scripts)
pip install -r config/requirements.txt

# Install Node.js dependencies
npm install
```

## Configuration

### scripts/config.json

The main configuration file supports auto-discovery:

```json
{
  "chapters": {
    "_auto_discover": true,
    "_content_directory": "content",
    "_chapter_pattern": "Chap*"
  }
}
```

- **_auto_discover**: Enable automatic chapter discovery (recommended)
- **_content_directory**: Directory containing your content (default: "content")
- **_chapter_pattern**: Glob pattern to match chapter directories (default: "Chap*")

You can override auto-discovery by explicitly defining chapters:

```json
{
  "chapters": {
    "_auto_discover": true,
    "1": {
      "dir": "content/Chapter01",
      "file": "main.md"
    }
  }
}
```

## Python Scripts

### Core Utilities

**shared_utils.py** - Common utility functions
- Auto-discovers chapters from content directory
- Provides path handling and validation utilities
- Works with any MyST project structure

**report_utils.py** - Report generation utilities
- Generate reports in multiple formats (Markdown, JSON, text)
- Standardized report templates

### Image Management

**find_unreferenced_images_myst.py** - Find unused images
```bash
npm run find-unreferenced
```

**delete_unreferenced_images_myst.py** - Delete unused images
```bash
npm run clean-unreferenced-dry  # dry run
npm run clean-unreferenced      # actual deletion
```

**optimize-images.js** - Optimize images for web
```bash
npm run optimize-images
```

### Validation

**validate_references_enhanced.py** - Validate internal references
```bash
npm run validate-enhanced
```

**lint_myst_markdown.py** - Lint MyST markdown files
```bash
npm run lint       # check for issues
npm run lint:fix   # fix issues automatically
```

## Build and Export Scripts

### copy-exports.js

Copies PDF and DOCX export files to the build directory for web access:

```bash
npm run copy-exports
```

**Purpose:**
- Mirrors the behavior of the GitHub Actions workflow
- Ensures local builds match production builds
- Copies exports from `exports/` to `_build/html/exports/`
- Creates `.nojekyll` file to prevent Jekyll processing on GitHub Pages

**Actions:**
- Copies full textbook PDF to `_build/html/exports/textbook.pdf`
- Copies full textbook DOCX (if available)
- Copies all chapter PDFs to `_build/html/exports/chapters/`
- Copies all chapter DOCX files to `_build/html/exports/chapters/`
- Creates `.nojekyll` file in `_build/html/`

**Note:** This script is automatically run as part of `npm run build`, so you typically don't need to run it manually.

## PWA (Progressive Web App) Scripts

The PWA scripts automatically generate PWA assets from your `myst.yml` configuration.

### generate-pwa-icons.js

Generates PWA icons from your project logo defined in `myst.yml`:

```bash
npm run generate-icons
```

**Requirements:**
- Logo defined in `myst.yml` under `site.options.logo`
- Logo file must exist (PNG format recommended)

**Generates:**
- Multiple icon sizes (72x72 to 512x512)
- Maskable icons for Android
- Favicon
- Apple Touch Icon

### generate-pwa-manifest.js

Generates `pwa/manifest.json` from template using `myst.yml`:

```bash
npm run generate-manifest
```

**Uses:**
- `project.title` or `site.title` for app name
- `site.options.logo_text` for short name
- `project.description` for app description
- `BASE_URL` environment variable for deployment path

### setup-pwa.js

Copies PWA files to build directory and injects PWA tags:

```bash
npm run setup-pwa  # runs generate-manifest first
```

**Actions:**
- Generates manifest.json from template
- Copies manifest, service worker, and offline page to build
- Copies icons to build directory
- Injects PWA meta tags into all HTML files
- Injects service worker registration script

### service-worker.js

Content-agnostic service worker that:
- Auto-detects base path from deployment URL
- Auto-generates cache names from project path
- Caches static assets and pages for offline access
- Supports network-first strategy for fresh content

## Using These Scripts in Your Project

### 1. Copy the scripts directory

```bash
cp -r scripts /path/to/your/project/
cp -r pwa /path/to/your/project/
```

### 2. Update package.json

Add the required dependencies and scripts from this project's `package.json`:

```json
{
  "dependencies": {
    "js-yaml": "^4.1.0",
    "sharp": "^0.33.2"
  },
  "scripts": {
    "generate-icons": "node scripts/generate-pwa-icons.js",
    "generate-manifest": "node scripts/generate-pwa-manifest.js",
    "copy-exports": "node scripts/copy-exports.js",
    "setup-pwa": "npm run generate-manifest && node scripts/setup-pwa.js",
    "build": "myst build --html && npm run copy-exports && npm run setup-pwa"
  }
}
```

### 3. Ensure myst.yml has required fields

```yaml
project:
  title: "Your Project Title"
  description: "Your project description"

site:
  title: "Your Site Title"
  options:
    logo: img/your-logo.png
    logo_text: "Short Name"
```

### 4. Run the scripts

```bash
npm install
npm run generate-icons
npm run build
```

## Customization

### Chapter Discovery Pattern

Modify `scripts/config.json` to match your content structure:

```json
{
  "chapters": {
    "_auto_discover": true,
    "_content_directory": "docs",
    "_chapter_pattern": "chapter-*"
  }
}
```

### PWA Theme Colors

Edit `pwa/manifest.json.template` to customize colors:

```json
{
  "theme_color": "#your-color",
  "background_color": "#your-bg-color"
}
```

## Environment Variables

- **BASE_URL**: Deployment base path (e.g., `/myproject/` for GitHub Pages)
  ```bash
  BASE_URL=/myproject/ npm run build
  ```

## Troubleshooting

### Auto-discovery not finding chapters

1. Check your content directory structure
2. Verify `_chapter_pattern` matches your directory names
3. Ensure directories contain `.md` files

### PWA icon generation fails

1. Verify logo path in `myst.yml` is correct
2. Ensure logo file exists and is readable
3. Check that Sharp library is installed (`npm install sharp`)

### Manifest generation fails

1. Ensure `myst.yml` exists and is valid YAML
2. Check that `js-yaml` is installed (`npm install js-yaml`)
3. Verify template file exists at `pwa/manifest.json.template`

## Contributing

When adding new scripts:

1. Keep them content-agnostic
2. Read configuration from `myst.yml` or `scripts/config.json`
3. Use auto-discovery where possible
4. Document in this README

## License

These scripts are part of the MyST Markdown ecosystem and can be freely used and modified for your projects.
