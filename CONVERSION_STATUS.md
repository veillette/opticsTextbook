# Python to JavaScript Conversion Status

This document tracks the conversion of Python scripts to JavaScript for the Optics Textbook project.

## Conversion Summary

**Date:** 2025-12-06
**Status:** Core utilities and scripts converted

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

### Python Scripts Remaining 📋

The following Python scripts are still in use and should be converted as needed:

1. **find_unreferenced_images_myst.py** - Find unreferenced images
   - Used via: `npm run find-unreferenced`
   - Priority: HIGH (frequently used)

2. **delete_unreferenced_images_myst.py** - Delete unreferenced images
   - Used via: `npm run clean-unreferenced`
   - Priority: HIGH (frequently used)

3. **lint_myst_markdown.py** - MyST markdown linter
   - Used via: `npm run lint` and `npm run lint:fix`
   - Priority: HIGH (critical for CI/CD)

4. **validate_references_enhanced.py** - Enhanced reference validator
   - Used via: `npm run validate-enhanced`
   - Priority: HIGH (critical for validation)

5. **lint_equation_labels.py** - Equation label linter
   - Used via: `npm run lint:equations`
   - Priority: MEDIUM

6. **standardize_all_figures.py** - Figure standardization
   - Priority: MEDIUM

7. **standardize_equation_labels.py** - Equation label standardization
   - Priority: MEDIUM

8. **lint_all_labels.py** - Label linting
   - Priority: MEDIUM

9. **insert_figure.py** - Figure insertion tool
   - Priority: LOW (manual tool)

10. **find_broken_references.py** - Find broken references
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
```

### Python Scripts (Still Active)
Python scripts continue to work as before via npm scripts:

```bash
npm run lint
npm run lint:fix
npm run find-unreferenced
npm run validate-enhanced
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

### Phase 3: Complex Scripts (Future Work)
- Convert lint_myst_markdown.py → lint_myst_markdown.js
- Convert validate_references_enhanced.py → validate_references_enhanced.js
- Convert find_unreferenced_images_myst.py → find_unreferenced_images_myst.js
- Convert delete_unreferenced_images_myst.py → delete_unreferenced_images_myst.js

### Phase 4: Specialized Scripts (Future Work)
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
