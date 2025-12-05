# Maintenance Guide - Optics Textbook

This guide documents common workflows, commands, and troubleshooting for the optics textbook project. Refer back here when you forget how to do something.

---

## **Quick Start - Most Common Tasks**

### Start Local Development Server
```bash
npm run start
# Open http://localhost:3000 in browser
# Auto-reloads on content changes
```

### Build HTML for Publishing
```bash
npm run build
# Automatically:
# 1. Optimizes all large images (80%+ size reduction)
# 2. Builds HTML with caching
# 3. Output: _build/html/
```

### Fix Linting Issues (Before Committing)
```bash
npm run lint:fix
# Auto-fixes all common linting issues
```

### Validate Everything Before Pushing
```bash
npm run validate-enhanced
# Checks references, citations, cross-refs
# Shows detailed report of any issues
```

---

## **Regular Maintenance Tasks**

### Weekly
- Review GitHub Actions CI/CD status
- Check if build time is increasing (report if >2 minutes)

### Monthly
- Run full validation: `npm run validate-enhanced`
- Check for unreferenced images: `npm run find-unreferenced-dry`
- Auto-fix linting: `npm run lint:fix`

### Before Major Changes
1. Run full validation: `npm run validate-enhanced`
2. Make changes
3. Test with: `npm run build`
4. Push (GitHub Actions will verify again)

---

## **How the Infrastructure Works**

### Git Pre-Commit Hook (Automatic)
When you try to commit, Husky automatically runs:
1. **MyST linter** - Shows warnings but allows commit
2. **Unit tests** - Must pass or commit is blocked

**Example:**
```bash
git add .
git commit -m "Updated chapter 5"
# ✓ Linter runs (shows issues)
# ✓ Tests run (must all pass)
# ✓ Commit succeeds if tests pass
```

**If commit fails:**
```bash
# Fix the test failures, then try again
git commit -m "Updated chapter 5"  # Try again
```

**To bypass (emergency only):**
```bash
git commit --no-verify
```

### CI/CD Validation (Automatic on Push)
GitHub Actions automatically runs when you push:
- MyST markdown linter
- Reference validation
- Python unit tests
- HTML build (must succeed)
- External link checking

View results: https://github.com/veillette/opticsTextbook/actions

---

## **Common Workflows**

### Adding a New Chapter

**Step 1: Create the directory and file**
```bash
mkdir -p content/Chap12MyTopic
touch content/Chap12MyTopic/MyTopic.md
# Add content to MyTopic.md
```

**Step 2: Update scripts/config.json**
```json
"12": {
  "dir": "content/Chap12MyTopic",
  "file": "MyTopic.md"
}
```

**Step 3: Update myst.yml**
Add to the `toc` (table of contents) section:
```yaml
- title: Chapter 12 - My Topic
  file: content/Chap12MyTopic/MyTopic.md
```

**Step 4: Create exercise file (optional)**
```bash
mkdir -p content/Chap12MyTopic/Problems
touch content/Chap12MyTopic/Problems/MyTopicExercise.md
```

**Step 5: Validate and test**
```bash
npm run validate-enhanced
npm run build
npm run lint:fix  # Auto-fix any issues
```

**Step 6: Commit**
```bash
git add .
git commit -m "Add Chapter 12 - My Topic"
git push
```

---

### Adding a Figure to a Chapter

**Option 1: Use the figure insertion script (RECOMMENDED)**
```bash
# Preview first (dry run)
python scripts/insert_figure.py \
  --image ~/Downloads/my_figure.png \
  --chapter 5 \
  --position 3 \
  --name lens_diagram \
  --dry-run

# If preview looks good, remove --dry-run
python scripts/insert_figure.py \
  --image ~/Downloads/my_figure.png \
  --chapter 5 \
  --position 3 \
  --name lens_diagram

# Script automatically:
# - Renames image to: 05_03_lens_diagram.png
# - Updates all figure references in the chapter
# - Renumbers subsequent figures
```

**Option 2: Manual (if script doesn't work)**
1. Copy image to chapter: `content/Chap05Wave/Images/05_03_lens_diagram.png`
2. Add to markdown file:
```markdown
```{figure} Images/05_03_lens_diagram.png
:name: fig:lens_diagram
:width: 80%

Caption describing the figure.
```
```
3. Validate: `npm run validate-enhanced`

---

### Fixing Broken References

**Find broken references:**
```bash
npm run validate-enhanced
# Shows which references are broken, where they are, and why
```

**Common fixes:**
```bash
# Missing figure files
npm run find-unreferenced-dry  # Shows orphaned images

# Broken cross-references
npm run lint  # Shows missing labels or malformed references

# Auto-fix many issues
npm run lint:fix
```

---

### Cleaning Up Unreferenced Images

**Step 1: Preview what will be deleted**
```bash
npm run find-unreferenced-dry
# Shows list of images not referenced anywhere
```

**Step 2: Verify the list looks correct**
```bash
npm run find-unreferenced
# Generates reports: reports/unreferenced_images.txt
```

**Step 3: Delete with confirmation**
```bash
python scripts/delete_unreferenced_images_myst.py
# Shows count and asks for confirmation before deleting
```

**Step 4: Verify build still works**
```bash
npm run build
npm run validate-enhanced
```

---

### Optimizing Images Manually

Large images are auto-optimized before each build, but you can force optimization:
```bash
npm run optimize-images
# Resizes images to max 1920px width
# Typical reduction: 70-94% size decrease
# Example: 3.39 MB → 0.19 MB (94% smaller!)
```

---

### Checking Linting Issues

**See all linting issues:**
```bash
npm run lint
# Shows:
# - Missing figure captions
# - Inconsistent labels
# - Split references across lines
# - Malformed directives
# - Blank lines in equations
```

**Auto-fix most issues:**
```bash
npm run lint:fix
# Automatically fixes:
# - Blank lines in equations
# - Split equation references
# - Basic directive formatting
```

**Note:** Manual review may be needed for complex issues.

---

## **Before Committing - The Checklist**

1. **Test your changes:**
   ```bash
   npm run build
   ```

2. **Fix linting:**
   ```bash
   npm run lint:fix
   ```

3. **Stage and commit:**
   ```bash
   git add .
   git commit -m "Clear description of changes"
   # Husky pre-commit hook runs automatically
   # ✓ If tests pass → commit succeeds
   # ✓ If tests fail → commit blocked (fix and retry)
   ```

4. **Push:**
   ```bash
   git push
   # GitHub Actions validates everything
   # Check: https://github.com/veillette/opticsTextbook/actions
   ```

---

## **Troubleshooting**

### Build fails with "Command not found: myst"
**Solution:**
```bash
npm install
npm run build
```

### "Configuration error: Chapter X info must be a dictionary"
**Cause:** `scripts/config.json` is malformed
**Solution:** Check JSON syntax (missing commas, quotes, etc.)
```bash
# Validate JSON syntax
npm run validate-enhanced
```

### Linting shows 433 issues and I panic
**Don't worry!** Most are informational:
- **Errors (54)**: Usually fixable with `npm run lint:fix`
- **Warnings (157)**: Worth reviewing but don't block builds
- **Info (222)**: Just FYI

**To fix:**
```bash
npm run lint:fix
npm run build
```

### "Reference not found" in build output
**Cause:** Cross-reference or figure reference doesn't exist
**Solution:**
```bash
npm run validate-enhanced
# Shows exactly which references are broken and where
```

### Build is slow
**First time (expected):** First build is slower (no cache)
**Subsequent builds:** Should be faster due to caching

**If builds stay slow:**
1. Check disk space: `df -h`
2. Clear cache: `npm run clean && npm install`
3. Check for large images: `npm run optimize-images`

### Tests are failing
**Check what failed:**
```bash
pytest scripts/tests/ -v
# Shows which tests failed and why
```

**Common test failures:**
- `test_with_dots`: Usually a string handling bug in `shared_utils.py`
- Reference validation: Check that files exist and are referenced correctly

**To run single test:**
```bash
pytest scripts/tests/test_shared_utils.py::TestToSnakeCase -v
```

### GitHub Actions build failed
**View the error:**
1. Go to: https://github.com/veillette/opticsTextbook/actions
2. Click the failed workflow
3. Expand the "Build HTML Documentation" step
4. Read the error message
5. Fix locally and push again

**Common issues:**
- Missing image files (fix with `npm run validate-enhanced`)
- Broken references (fix with `npm run lint:fix`)
- Test failures (run `pytest scripts/tests/ -v` locally)

### I accidentally broke something and need to revert
```bash
# Undo last commit (keep changes locally)
git reset HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# See recent commits
git log --oneline -10

# Revert specific commit
git revert <commit-hash>
```

---

## **Development Environment Setup** (If Starting Over)

```bash
# Clone repository (already done)
git clone https://github.com/veillette/opticsTextbook.git
cd opticsTextbook

# Install dependencies
npm install
pip install -r config/requirements.txt

# Verify setup
npm run build
npm run validate-enhanced
pytest scripts/tests/ -q
```

---

## **File Structure Reference**

```
opticsTextbook/
├── content/                   # All textbook content
│   ├── Preface/
│   ├── Chap01Basics/
│   ├── Chap02GeometricalOptics/
│   └── ... (Chapters 1-11)
├── scripts/                   # Utility scripts
│   ├── config.json           # Chapter mappings
│   ├── lint_myst_markdown.py
│   ├── validate_references_enhanced.py
│   ├── find_unreferenced_images_myst.py
│   └── ...
├── .github/
│   └── workflows/            # CI/CD automation
│       ├── deploy-book.yml   # Deployment
│       └── validate.yml      # Validation on push
├── .husky/
│   └── pre-commit            # Local validation before commit
├── myst.yml                  # MyST configuration
├── package.json              # npm scripts and dependencies
├── doc/                      # Centralized documentation
│   ├── MAINTENANCE.md        # Detailed workflows (this file)
│   ├── MYST_CONVENTIONS.md   # MyST syntax rules
│   ├── LATEX_TO_TYPST_MIGRATION.md
│   ├── MyST_Comprehensive_Reference.md
│   ├── PWA_SETUP.md
│   ├── CONTRIBUTING.md       # Contributor onboarding
│   ├── CLAUDE.md             # AI assistant guidance
│   └── scripts/
│       └── README.md
└── README.md                 # User-facing documentation
```

---

## **Key Commands Reference**

| Command | What it does |
|---------|-------------|
| `npm run start` | Start dev server with auto-reload |
| `npm run build` | Build HTML (optimizes images first) |
| `npm run lint` | Check for linting issues |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run validate-enhanced` | Check references, citations, cross-refs |
| `npm run validate-enhanced-quiet` | Same, but concise output |
| `npm run find-unreferenced-dry` | Find unused images (preview) |
| `npm run find-unreferenced` | Find unused images (full report) |
| `npm run optimize-images` | Compress large images |
| `npm run checklinks` | Check external links |
| `npm run clean` | Clear build cache |
| `pytest scripts/tests/ -v` | Run unit tests |

---

## **Code Quality Standards**

### MyST Conventions (See [MYST_CONVENTIONS.md](MYST_CONVENTIONS.md))
- Use backtick fences (` ``` `) for directives
- All figures must have captions
- All equations must have labels
- Cross-references: `{numref}fig-label` or `{eq}eq:label`

### Commit Messages
- Clear, descriptive (e.g., "Add Chapter 5 - Wave Optics")
- What changed and why
- Example: `"Fix broken cross-reference in Chapter 3 solution"`

### Before Pushing
1. `npm run build` - Verify HTML builds
2. `npm run lint:fix` - Fix linting
3. `npm run validate-enhanced` - Verify all references
4. `git commit` - Local tests must pass (Husky hook)
5. `git push` - GitHub Actions verifies again

---

## **Getting Help**

### For MyST/syntax issues
See: [`MYST_CONVENTIONS.md`](MYST_CONVENTIONS.md)

### For script usage
See: [`scripts/README.md`](scripts/README.md)

### For this repository
- Issues: https://github.com/veillette/opticsTextbook/issues
- Discussions: https://github.com/veillette/opticsTextbook/discussions

---

**Last Updated:** December 2025

**Version:** 1.0

**Contact:** Martin Veillette
