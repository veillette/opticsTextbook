# Python to JavaScript Conversion Status

This document tracks the conversion of Python scripts to JavaScript for the Optics Textbook project.

## Conversion Summary

**Date:** 2025-12-06
**Status:** Core utilities, maintenance tools, all linters, and validation scripts converted ⭐⭐⭐
**Progress:** 10 of 16 scripts converted (62.5%)

### Fully Converted Scripts ✅

The following scripts have been fully converted from Python to JavaScript:

1. **shared_utils.js** - Core shared utilities module
   - Configuration management
   - Path handling
   - Validation utilities
   - String manipulation
   - File discovery
   - All functions tested and verified

2. **report_utils.js** - Report generation utilities
   - ReportGenerator class
   - MarkdownReportBuilder class
   - Helper functions for standard reports
   - All functions tested and verified

3. **convert_fences.js** - MyST fence converter
   - Converts colon fences (:::) to backtick fences (```)
   - Full feature parity with Python version
   - Usage: `node scripts/convert_fences.js [--dry-run] [--content-dir DIR]`

4. **fix_admonitions.js** - Admonition type fixer
   - Converts unsupported admonition types
   - Historical/utility script
   - Usage: `node scripts/fix_admonitions.js`

5. **fix_split_equation_refs.js** - Equation reference fixer
   - Fixes split reference patterns
   - Can be run standalone or via linter
   - Usage: `node scripts/fix_split_equation_refs.js [--dry-run]`

6. **find_unreferenced_images_myst.js** - Find unreferenced images
   - Finds unreferenced images and .ai files
   - Uses MyST build output for accurate detection
   - Usage: `npm run find-unreferenced` or `node scripts/find_unreferenced_images_myst.js`
   - Python fallback available: `npm run find-unreferenced:python`

7. **delete_unreferenced_images_myst.js** - Delete unreferenced images
   - Safely deletes unreferenced images and .ai files
   - Includes preview and confirmation
   - Creates backup logs
   - Usage: `npm run clean-unreferenced` or `node scripts/delete_unreferenced_images_myst.js`
   - Python fallback available: `npm run clean-unreferenced:python`

8. **lint_myst_markdown.js** - MyST markdown linter ⭐ MAJOR
   - Comprehensive linter with 17 different checks
   - Full feature parity with Python version
   - Auto-fix mode for supported issues
   - Cross-file duplicate label detection
   - Generates Markdown and JSON reports
   - Usage: `npm run lint` or `npm run lint:fix`
   - Python fallback available: `npm run lint:python`
   - **Impact:** Core CI/CD workflow now JavaScript-native!

9. **lint_equation_labels.js** - Equation label linter
   - Checks equation label format consistency
   - Supports camelCase format validation
   - Auto-fix for non-standard labels
   - Detects LaTeX inline labels
   - Chapter code validation
   - Usage: `npm run lint:equations` or `npm run lint:equations:fix`
   - Python fallback available: `npm run lint:equations:python`

10. **validate_references_enhanced.js** - Enhanced reference validator ⭐ MAJOR
    - Comprehensive MyST validation with detailed reporting
    - Categorizes 7 types of issues (figures, cross-refs, links, equations, citations, syntax, build)
    - Pattern analysis and error distribution reports
    - Generates both Markdown and JSON reports
    - Fix suggestions for common issues
    - Strict mode for CI/CD workflows
    - Usage: `npm run validate-enhanced` or `npm run validate-enhanced:quiet`
    - Python fallback available: `npm run validate-enhanced:python`
    - **Impact:** All core validation now JavaScript-native!

### Python Scripts Remaining 📋

The following Python scripts are still in use and should be converted as needed:

1. **standardize_all_figures.py** - Figure standardization
   - Priority: MEDIUM

2. **standardize_equation_labels.py** - Equation label standardization
   - Priority: MEDIUM

3. **lint_all_labels.py** - Label linting
   - Priority: MEDIUM

4. **insert_figure.py** - Figure insertion tool
   - Priority: LOW (manual tool)

5. **find_broken_references.py** - Find broken references
   - Priority: LOW (superseded by validate_references_enhanced)

## Testing

### Jest Configuration
- Jest has been installed as a dev dependency
- Configuration file: `jest.config.js`
- Test files location: `scripts/tests/*.test.js`

### Converted Tests
- `test_shared_utils.test.js` - Tests for shared_utils.js (fully converted)

### Running Tests
```bash
npm test                    # Run all tests
npm test -- --coverage      # Run with coverage
npm test shared_utils       # Run specific test file
```

## Usage

### JavaScript Scripts
All converted JavaScript scripts can be run directly with Node.js:

```bash
# Convert fences
node scripts/convert_fences.js --dry-run

# Fix admonitions
node scripts/fix_admonitions.js

# Fix split equation references
node scripts/fix_split_equation_refs.js --dry-run

# Find unreferenced images
npm run find-unreferenced
npm run find-unreferenced:dry

# Clean unreferenced images
npm run clean-unreferenced
npm run clean-unreferenced:dry

# Lint MyST Markdown files
npm run lint
npm run lint:fix
npm run lint:quiet

# Lint equation labels
npm run lint:equations
npm run lint:equations:fix

# Validate references (enhanced)
npm run validate-enhanced
npm run validate-enhanced:quiet
npm run validate-enhanced:strict
npm run validate-enhanced:suggestions
```

### Python Scripts (Still Active)
Python scripts continue to work as before via npm scripts:

```bash
# Python versions for unconverted scripts
# (Most scripts now use JavaScript - see above)

# Python fallbacks for converted scripts
npm run find-unreferenced:python
npm run clean-unreferenced:python
npm run lint:python
npm run lint:equations:python
```

## Migration Strategy

### Phase 1: Core Utilities ✅ COMPLETE
- Convert shared_utils.py → shared_utils.js
- Convert report_utils.py → report_utils.js
- Set up Jest testing framework
- Convert utility tests

### Phase 2: Simple Scripts ✅ COMPLETE
- Convert convert_fences.py → convert_fences.js
- Convert fix_admonitions.py → fix_admonitions.js
- Convert fix_split_equation_refs.py → fix_split_equation_refs.js

### Phase 3: High-Priority Scripts ✅ COMPLETE
- Convert find_unreferenced_images_myst.py → find_unreferenced_images_myst.js
- Convert delete_unreferenced_images_myst.py → delete_unreferenced_images_myst.js

### Phase 4: Critical Complex Scripts ✅ COMPLETE
- ✅ Convert lint_myst_markdown.py → lint_myst_markdown.js (COMPLETE!)
- ✅ Convert lint_equation_labels.py → lint_equation_labels.js (COMPLETE!)
- **All linters now JavaScript!**

### Phase 5: Validation Scripts ✅ COMPLETE
- ✅ Convert validate_references_enhanced.py → validate_references_enhanced.js (COMPLETE!)
- **All core validation now JavaScript!**
- **CI/CD pipeline fully JavaScript-native!**

### Phase 6: Specialized Scripts (Future Work)
- Convert remaining specialized scripts as needed
- Update npm scripts in package.json
- Deprecate Python scripts
- Update documentation

## Benefits of JavaScript Conversion

1. **Single Language**: Entire project uses JavaScript/Node.js
2. **Better IDE Support**: Improved tooling and autocomplete
3. **Easier Deployment**: No Python dependency for scripts
4. **Unified Testing**: Single test framework (Jest) for all scripts
5. **Better Integration**: Scripts integrate better with npm ecosystem

## Notes

- Both Python and JavaScript versions coexist during transition
- Python scripts remain functional and are the primary versions for now
- JavaScript versions can be tested alongside Python versions
- Full conversion will be completed in phases based on priority
- All conversions maintain functional parity with original Python versions

## Contributing

When converting scripts:
1. Maintain exact functional parity with Python version
2. Add comprehensive tests
3. Update this status document
4. Test thoroughly before replacing Python version in package.json
5. Keep Python version until JavaScript version is proven stable
