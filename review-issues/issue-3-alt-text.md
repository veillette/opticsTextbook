# Issue: Add explicit alt text to all figures for improved accessibility

**Labels:** `enhancement`, `accessibility`, `content`, `priority: medium`

## Problem

All 153 figures in the textbook currently lack explicit `:alt:` text for screen readers. While figures do have comprehensive descriptive captions (successfully implemented in #49), explicit alt text provides additional accessibility benefits.

## Current Status

**Good news:**
- ✅ All figures have `:name:` labels
- ✅ All figures have descriptive captions (>20 chars)
- ✅ Captions are comprehensive and informative

**Missing:**
- ❌ No `:alt:` directives in figure blocks
- Screen readers may not optimally present figure information

## Example Current Format

```markdown
```{figure} Images/01_01_newton_rings.jpg
:name: fig:NewtonRings
:align: center
:width: 80%

Newton's Rings Interference Pattern - When a slightly curved glass lens is placed in contact with a flat glass plate, concentric circular fringes of alternating bright and dark regions appear around the contact point...
```
```

## Recommended Format

```markdown
```{figure} Images/01_01_newton_rings.jpg
:name: fig:NewtonRings
:align: center
:width: 80%
:alt: Concentric circular interference fringes showing Newton's rings pattern with alternating bright and dark bands

Newton's Rings Interference Pattern - When a slightly curved glass lens is placed in contact with a flat glass plate, concentric circular fringes of alternating bright and dark regions appear around the contact point...
```
```

## Impact

**Severity:** Medium
**User Impact:** Affects accessibility for visually impaired users

**Benefits of adding alt text:**
1. **Screen reader optimization** - Provides concise image description
2. **Broken image fallback** - Shows text when images fail to load
3. **SEO improvement** - Search engines index alt text
4. **WCAG compliance** - Meets accessibility standards
5. **Better context** - Alt text is brief, captions can be detailed

## Recommended Implementation

### Alt Text Guidelines

**Good alt text is:**
- **Concise** (1-2 sentences max, ~125 chars)
- **Descriptive** of visual content
- **Context-appropriate** for the surrounding text
- **Not redundant** with caption (complement, don't duplicate)

**Alt text should:**
- Describe what the image shows visually
- Mention key features relevant to the text
- Skip decorative elements
- Avoid "image of" or "picture of" phrases

### Suggested Approach

**Option 1: Manual addition (highest quality)**
- Review each figure individually
- Write concise, meaningful alt text
- Ensure alt text and caption complement each other

**Option 2: Script-assisted (faster)**
1. Create script to add `:alt:` directive
2. Generate initial alt text from caption first sentence
3. Manual review and refinement
4. Validate with accessibility tools

**Option 3: AI-assisted**
- Use image analysis to generate alt text suggestions
- Human review for accuracy and appropriateness
- Particularly useful for complex diagrams

## Implementation Script

Could create `scripts/add_alt_text.py`:
```python
# Parse markdown files
# Identify figure directives
# Extract caption first sentence or summary
# Insert :alt: directive
# Preserve existing formatting
```

## Files Affected

All content files with figures:
- `content/Chap01Basics/Basics.md` (multiple figures)
- `content/Chap02GeometricalOptics/GeometricalOptics.md`
- ... (all 11 chapters)
- Total: ~153 figures

## Testing

After implementation:
1. Build HTML and verify alt text appears
2. Test with screen reader (NVDA, JAWS, or VoiceOver)
3. Validate with accessibility checker
4. Check PDF export (alt text handling)

## References

- [WCAG Image Guidelines](https://www.w3.org/WAI/tutorials/images/)
- [MyST Figure Directive Documentation](https://mystmd.org/guide/figures)
- W3C Web Accessibility Initiative

## Related Issues

- #49 - Figure caption accessibility (completed)
- PWA accessibility considerations

## Priority

**Medium-High** - Accessibility is important for inclusive education

This enhancement would make the textbook more accessible to students with visual impairments and improve overall usability.
