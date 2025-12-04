# Issue: Add CONTRIBUTING.md file for open source contributors

**Labels:** `documentation`, `enhancement`, `good first issue`, `priority: low`

## Problem

The repository currently lacks a dedicated `CONTRIBUTING.md` file. While contribution guidelines are briefly mentioned in README.md, a standalone contributing guide is an open source best practice.

## Current Status

**Existing documentation:**
- ✅ README.md has brief "Contributing" section
- ✅ MAINTENANCE.md has detailed workflows
- ✅ CLAUDE.md has comprehensive AI assistant guidance
- ✅ MYST_CONVENTIONS.md has syntax rules

**Missing:**
- ❌ Dedicated CONTRIBUTING.md file
- Standard location contributors expect to find

## Impact

**Severity:** Low
**User Impact:** Makes it slightly harder for new contributors to get started

**Benefits of adding CONTRIBUTING.md:**
1. **Discoverability** - GitHub automatically links to it
2. **First impression** - Shows project welcomes contributions
3. **Reduced friction** - Clear entry point for contributors
4. **Consistency** - Contributors follow same workflow
5. **GitHub integration** - Appears in PR/issue creation flow

## Recommended Content Structure

```markdown
# Contributing to Optics Textbook

## Welcome! 👋

Thank you for your interest in contributing to this open educational resource...

## Quick Start

### Prerequisites
- Node.js >= 22.0.0
- Python 3.8+
- Git

### Setup
```bash
git clone https://github.com/veillette/opticsTextbook.git
cd opticsTextbook
npm install
npm run start
```

## How to Contribute

### Types of Contributions Welcome

1. **Content Improvements**
   - Fix typos or errors
   - Clarify explanations
   - Add examples or problems

2. **Figures and Diagrams**
   - Improve existing figures
   - Add new illustrations
   - Enhance accessibility

3. **Technical Improvements**
   - Bug fixes
   - Performance enhancements
   - Documentation updates

### Contribution Workflow

1. **Fork the repository**
2. **Create a branch** (`git checkout -b feature/your-feature`)
3. **Make your changes** (see Development Guidelines below)
4. **Test thoroughly** (`npm run build`)
5. **Commit with clear messages**
6. **Push to your fork**
7. **Open a Pull Request**

## Development Guidelines

### Before Committing

```bash
npm run lint:fix              # Auto-fix linting issues
npm run validate-enhanced     # Validate references
npm run build                 # Full build test
```

### Code Style

- Follow MyST conventions (see MYST_CONVENTIONS.md)
- Use backtick fences for directives
- All figures must have :name: labels and captions
- Run linter before committing

### Commit Messages

- Clear and descriptive
- Explain what and why
- Reference issues when applicable

Examples:
- `Add section on fiber optic modes to Chapter 10`
- `Fix broken cross-reference in Chapter 3 (#35)`
- `Update diffraction equation derivation`

## Testing

- Pre-commit hooks run automatically
- Unit tests must pass
- Validate with `npm run validate-enhanced`

## Pull Request Guidelines

### PR Checklist

- [ ] Tests pass locally
- [ ] Linting passes
- [ ] Documentation updated if needed
- [ ] Descriptive PR title and description
- [ ] Related issues referenced

### PR Review Process

1. Automated checks run (linting, tests, build)
2. Maintainer reviews changes
3. Address feedback if requested
4. Merge when approved

## Documentation

For detailed information:
- **MAINTENANCE.md** - Comprehensive workflows
- **MYST_CONVENTIONS.md** - MyST syntax rules
- **CLAUDE.md** - Project context (for AI assistants)
- **PWA_SETUP.md** - PWA implementation details

## Questions?

- **Issues:** https://github.com/veillette/opticsTextbook/issues
- **Discussions:** Use GitHub Discussions tab
- **Documentation:** Start with README.md

## Code of Conduct

Be respectful, professional, and inclusive. This is an educational resource - let's maintain a welcoming environment for all learners and contributors.

## License

By contributing, you agree that your contributions will be licensed under CC BY-SA 4.0.

---

Thank you for contributing to open educational resources! 🎓
```

## Implementation

**Files to create:**
- `CONTRIBUTING.md` (new file, ~200-300 lines)

**Related files to reference:**
- Extract contribution section from README.md
- Link to MAINTENANCE.md for detailed workflows
- Reference MYST_CONVENTIONS.md for style guide

## Benefits

1. **GitHub Integration**
   - Link appears in issue/PR creation
   - "Contributing" button in repository

2. **New Contributor Experience**
   - Clear entry point
   - Reduces barrier to first contribution
   - Sets expectations

3. **Project Professionalism**
   - Shows project is well-maintained
   - Signals welcoming of contributions
   - Follows open source best practices

## Similar Projects

Many successful open source projects have excellent CONTRIBUTING.md files:
- [Jupyter](https://github.com/jupyter/notebook/blob/master/CONTRIBUTING.md)
- [MyST](https://github.com/executablebooks/MyST-Parser/blob/master/CONTRIBUTING.md)
- [NumPy](https://github.com/numpy/numpy/blob/main/CONTRIBUTING.md)

## Related

- README.md already has brief contribution section
- MAINTENANCE.md provides detailed workflows for maintainers
- Could cross-reference these documents

## Priority

**Low** - Project already has excellent documentation; this is a nice-to-have enhancement for contributor experience.
