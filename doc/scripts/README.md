# Utility Scripts for Optics Textbook

This directory contains JavaScript utility scripts for maintaining and validating the
optics textbook content. All scripts are written in Node.js and are integrated with
npm for easy execution.

## Available Scripts

All scripts can be run via npm commands. See `package.json` for the complete list.

### Image Management

#### Find Unreferenced Images
```bash
# Preview unreferenced images (dry run)
npm run find-unreferenced:dry

# Generate full report
npm run find-unreferenced
```

#### Delete Unreferenced Images
```bash
# Preview deletion (dry run)
npm run clean-unreferenced:dry

# Delete unreferenced images
npm run clean-unreferenced
```

#### Optimize Images
```bash
# Optimize large images
npm run optimize-images
```

#### Standardize Figure Names
```bash
# Preview standardization (dry run)
npm run standardize:figures:dry

# Standardize all figure filenames
npm run standardize:figures
```

#### Insert Figure
```bash
# Insert a new figure into a chapter
npm run insert-figure -- --image path/to/image.png --chapter 3 --position 5 --name "descriptive_name"
```

### Reference Validation

#### Enhanced Validation
```bash
# Full validation with detailed report
npm run validate-enhanced

# Quiet mode (summary only)
npm run validate-enhanced:quiet

# Strict mode (fail on warnings)
npm run validate-enhanced:strict

# With fix suggestions
npm run validate-enhanced:suggestions
```

#### Find Broken References
```bash
# Check for broken references
npm run find-broken

# Save report to file
npm run find-broken:save
```

### Linting

#### MyST Markdown Linting
```bash
# Check for linting issues
npm run lint

# Auto-fix issues
npm run lint:fix

# Quiet mode
npm run lint:quiet
```

#### Equation Label Linting
```bash
# Check equation labels
npm run lint:equations

# Auto-fix equation labels
npm run lint:equations:fix

# Verbose output
npm run lint:equations:verbose
```

#### All Labels Linting
```bash
# Check all labels
npm run lint:labels

# Auto-fix all labels
npm run lint:labels:fix

# Verbose output
npm run lint:labels:verbose
```

### Equation Standardization

```bash
# Check equation label format
npm run standardize:equations:check

# Standardize equation labels
npm run standardize:equations
```

### Text Conversion

#### Convert Fences
```bash
# Preview conversion (dry run)
npm run convert-fences:dry

# Convert fence syntax
npm run convert-fences
```

#### Fix Admonitions
```bash
# Fix admonition syntax
npm run fix-admonitions
```

#### Fix Split References
```bash
# Preview fixes (dry run)
npm run fix-split-refs:dry

# Fix split equation references
npm run fix-split-refs
```

## Testing

Run the JavaScript test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## PWA Scripts

### Generate PWA Icons
```bash
npm run generate-icons
```

### Generate PWA Manifest
```bash
npm run generate-manifest
```

### Setup PWA
```bash
npm run setup-pwa
```

## Build Scripts

### Copy Exports
```bash
npm run copy-exports
```

### Inject Scripts
```bash
npm run inject-scripts
```

## Common Workflows

### Before Committing Changes

1. **Run linter:**
   ```bash
   npm run lint:fix
   ```

2. **Validate references:**
   ```bash
   npm run validate-enhanced
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

### Adding a New Figure

1. **Use the insert-figure script:**
   ```bash
   npm run insert-figure -- --image path/to/new_figure.png \
     --chapter 3 --position 7 --name "descriptive_name"
   ```

2. **Add the figure reference in your markdown:**
   ```markdown
   ```{figure} Images/03_07_descriptive_name.png
   :name: fig:descriptive_name
   :width: 80%

   Your figure caption here.
   ```
   ```

3. **Verify:**
   ```bash
   npm run validate-enhanced
   ```

### Cleaning Up Unreferenced Images

1. **Preview:**
   ```bash
   npm run find-unreferenced:dry
   ```

2. **Generate report:**
   ```bash
   npm run find-unreferenced
   ```

3. **Delete:**
   ```bash
   npm run clean-unreferenced
   ```

4. **Verify:**
   ```bash
   npm run build
   ```

## Configuration

Scripts load configuration from `scripts/config.json`. Key settings include:

- **chapters**: Chapter directory and file mappings
- **image_extensions**: Supported image file types
- **naming_convention**: Filename templates
- **image_optimization**: Settings for image compression

## Troubleshooting

### "Command not found" errors

Ensure you've installed dependencies:
```bash
npm install
```

### Script execution issues

Make sure you're running commands from the project root:
```bash
cd /path/to/opticsTextbook
npm run <command>
```

### Test failures

Run tests with verbose output:
```bash
npm test -- --verbose
```

## Development

### Adding New Scripts

When creating new utility scripts:

1. Add the script to the `scripts/` directory
2. Add an entry in `package.json` under `scripts`
3. Follow the existing patterns for:
   - Argument parsing (using `process.argv` or a library)
   - Configuration loading from `config.json`
   - Dry-run mode support
   - Error handling

### Code Style

- Use modern JavaScript (ES6+)
- Handle errors gracefully
- Provide helpful error messages
- Support dry-run mode where applicable
- Log operations clearly

---

**Last Updated:** December 2025
