# AI Assistant Guide - Optics Textbook Project

This document provides context and guidance for AI assistants (like Claude) working on this repository.

## Project Overview

This is an **interactive optics textbook** built with MyST Markdown and deployed as a Progressive Web App (PWA). It covers advanced topics in optics for undergraduate students in physics and electrical engineering.

**Key Technologies:**
- MyST Markdown for content
- Node.js and Python for tooling
- GitHub Actions for CI/CD
- Progressive Web App features

## Quick Reference

### Before Making Changes

1. **Read relevant files first** - Never propose changes without reading the code
2. **Check existing conventions** - Review MYST_CONVENTIONS.md and MAINTENANCE.md
3. **Understand the structure** - Content is in `content/`, scripts in `scripts/`

### Essential Commands

```bash
# Development
npm run start              # Launch dev server (http://localhost:3000)
npm run build             # Build HTML (auto-optimizes images)

# Quality Control
npm run lint:fix          # Auto-fix linting issues
npm run validate-enhanced # Validate all references and citations
pytest scripts/tests/ -v  # Run unit tests

# Before Committing
npm run lint:fix
npm run build
git add .
git commit -m "Clear description"  # Pre-commit hook runs automatically
git push
```

### File Structure

```
opticsTextbook/
├── content/                    # All textbook content
│   ├── Chap01Basics/          # Chapter 1
│   ├── Chap02GeometricalOptics/
│   └── ...                    # Chapters 1-11 + Appendices
├── scripts/                   # Utility scripts
│   ├── config.json           # Chapter mappings (IMPORTANT!)
│   ├── lint_myst_markdown.py
│   └── validate_references_enhanced.py
├── myst.yml                   # MyST configuration
├── package.json               # npm scripts
├── README.md                  # User-facing docs
├── MAINTENANCE.md             # Detailed workflows
├── MYST_CONVENTIONS.md        # MyST syntax rules
└── CLAUDE.md                  # This file
```

## MyST Markdown Conventions

### Critical Rules

1. **Use backtick fences** (` ``` `) for ALL directives and code blocks
   ```markdown
   ```{figure} path/to/image.png
   :name: fig-label
   :width: 80%

   Caption text here.
   ```
   ```

2. **All figures must have**:
   - A `:name:` label (format: `fig-label-name`)
   - A descriptive caption
   - Alignment and width specified

3. **All equations must have labels**:
   ```markdown
   $$E = mc^2$$ (eq:einstein)
   ```

4. **Cross-references**:
   - Figures: `{numref}fig-label`
   - Equations: `{eq}eq:label`
   - Sections: `{ref}section-label`

### Common Directives

```markdown
```{note}
Important concept explanation.
```

```{dropdown}
**Solution to Problem 1**

Step-by-step solution...
```

```{warning}
**Common Mistake**: Explanation of pitfall.
```
```

## Common Tasks

### Adding a New Figure

**Use the script (recommended):**
```bash
python scripts/insert_figure.py \
  --image ~/path/to/figure.png \
  --chapter 5 \
  --position 3 \
  --name lens_diagram \
  --dry-run  # Preview first, then remove --dry-run
```

**Manual approach:**
1. Copy image to: `content/ChapXX.../Images/XX_YY_name.png`
2. Add to markdown:
   ```markdown
   ```{figure} Images/05_03_lens_diagram.png
   :name: fig:lens_diagram
   :width: 80%

   Descriptive caption.
   ```
   ```
3. Validate: `npm run validate-enhanced`

### Adding a New Chapter

1. Create directory: `mkdir -p content/Chap12MyTopic`
2. Create file: `content/Chap12MyTopic/MyTopic.md`
3. Update `scripts/config.json`:
   ```json
   "12": {
     "dir": "content/Chap12MyTopic",
     "file": "MyTopic.md"
   }
   ```
4. Update `myst.yml` table of contents
5. Validate: `npm run validate-enhanced && npm run build`

### Fixing Broken References

```bash
# Find all broken references
npm run validate-enhanced

# Common fixes
npm run lint:fix           # Auto-fix many issues
npm run find-unreferenced-dry  # Find orphaned images
```

## Git Workflow

### Pre-Commit Hook (Automatic)
When you commit, Husky automatically runs:
- MyST linter (warnings only)
- Unit tests (must pass or commit is blocked)

### GitHub Actions (Automatic on Push)
- Linting validation
- Reference validation
- Unit tests
- HTML build verification
- External link checking

## Important Files to Know

- **MAINTENANCE.md** - Comprehensive guide for all workflows
- **MYST_CONVENTIONS.md** - MyST syntax rules and examples
- **scripts/config.json** - Chapter mappings (update when adding chapters!)
- **myst.yml** - MyST configuration and table of contents
- **scripts/README.md** - Documentation for utility scripts

## Quality Standards

### Before Committing
✓ Run `npm run build` - Verify HTML builds successfully
✓ Run `npm run lint:fix` - Auto-fix linting issues
✓ Run `npm run validate-enhanced` - Check all references
✓ Commit triggers pre-commit hook automatically
✓ Push triggers GitHub Actions validation

### Code Style
- Use backtick fences for directives
- All figures must have captions and labels
- All equations must have labels
- Follow MyST conventions strictly

### Commit Messages
- Clear and descriptive
- Explain what changed and why
- Example: "Add Chapter 5 section on wave interference"
- Example: "Fix broken cross-reference in Chapter 3"

## Common Pitfalls to Avoid

1. **Don't use colon fences** (`:::`) - Use backtick fences (` ``` `) instead
2. **Don't skip image optimization** - Images are auto-optimized during build
3. **Don't commit without testing** - Always run `npm run build` first
4. **Don't forget to update config.json** - Required when adding chapters
5. **Don't bypass pre-commit hooks** - They catch issues early
6. **Don't create files without reading existing code first**

## Development Philosophy

- **ALWAYS prefer editing existing files** over creating new ones
- **Keep changes minimal** - Only change what's necessary
- **Read before modifying** - Understand existing code first
- **Test thoroughly** - Build and validate before committing
- **Follow conventions** - Consistency is critical

## Troubleshooting

### Build Fails
```bash
npm install
npm run build
```

### Tests Fail
```bash
pytest scripts/tests/ -v  # See what failed
# Fix issues, then retry commit
```

### Broken References
```bash
npm run validate-enhanced  # Shows exactly what's broken
npm run lint:fix          # Auto-fix common issues
```

### Pre-Commit Hook Blocked My Commit
The hook is protecting code quality. Fix the test failures shown, then try again:
```bash
git commit -m "Your message"  # Try again after fixes
```

## Additional Resources

- **Repository**: https://github.com/veillette/opticsTextbook/
- **Issues**: https://github.com/veillette/opticsTextbook/issues
- **Actions**: https://github.com/veillette/opticsTextbook/actions
- **MyST Documentation**: https://mystmd.org/guide
- **License**: CC BY-SA 4.0

## Notes for AI Assistants

1. **Always read files before modifying them** - Use Read tool extensively
2. **Check existing patterns** - Look at other chapters for examples
3. **Use validation tools** - Run `npm run validate-enhanced` frequently
4. **Test changes** - Always run `npm run build` before committing
5. **Follow MyST conventions** - Review MYST_CONVENTIONS.md
6. **Keep it simple** - Don't over-engineer or add unnecessary features
7. **Update this file** - If you discover new patterns or conventions

---

**Last Updated:** December 2025

**Version:** 1.0

**For:** AI Assistants working on the Optics Textbook project
