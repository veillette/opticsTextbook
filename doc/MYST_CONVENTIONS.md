# MyST Markdown Conventions for Optics Textbook

This document defines the MyST Markdown conventions used throughout this
textbook to ensure consistency and proper rendering.

## Fence Syntax Convention

### Use Backtick Fences (` ``` `) for:

**All MyST directives AND code blocks** - Backtick fences work for both MyST
directives and code blocks, providing better IDE support and syntax
highlighting:

- **Admonitions**: `note`, `warning`, `important`, `tip`, `caution`,
  `attention`, `danger`, `error`, `hint`, `seealso`
- **Collapsible content**: `dropdown`, `card`, `tab-set`, `tab-item`
- **Figures and media**: `figure`, `subfigure`, `video`
- **Mathematical content**: `proof`, `theorem`, `lemma`, `definition`,
  `example`, `exercise`
- **Layout elements**: `grid`, `column`, `margin`, `sidebar`
- **Special blocks**: `epigraph`, `bibliography`, `glossary`
- **Code blocks**: Python, MATLAB, shell commands, etc.

**Rationale**: Backtick fences provide better IDE support, syntax highlighting,
and editor tooling compared to colon fences. While colon fences may render
slightly better on GitHub, the improved editing experience is more important for
active development.

**Example**:

```markdown
```{note}
This is an important concept in wave optics.
```

```{dropdown}
**Solution to Problem 1**

**Step 1**: Apply Snell's law...
```

```{figure} path/to/image.png
:name: fig-diffraction
:align: center

Caption describing the diffraction pattern.
```

```python
import numpy as np
import matplotlib.pyplot as plt

wavelength = 633e-9  # HeNe laser wavelength in meters
k = 2 * np.pi / wavelength
```

```

### Use Colon Fences (`:::`) only for:

**Legacy compatibility** - Colon fences are supported but not preferred. Convert
them to backtick fences when editing files

### Directive Syntax Rules

1. **Title placement**: Place directive titles on a separate line after the opening fence, formatted in bold:
   ```markdown
   ```{dropdown}
   **Solution to Problem 1**

   Content here...
   ```

   ```

2. **Options**: Use colon-prefixed options on separate lines:
   ```markdown
   ```{figure} image.png
   :name: fig-label
   :align: center
   :width: 80%

   Caption text here.
   ```

   ```

3. **Nesting**: Indent nested directives by 3 spaces:
   ```markdown
   ```{admonition} Example
   This is the outer content.

      ```{note}
      This is nested inside.
      ```
   ```

   ```

## Specific Directive Conventions

### Dropdowns

Used for collapsible solutions, proofs, and supplementary material:

```markdown
```{dropdown}
**Solution to Problem X**

Detailed solution content...
```

```

### Figures

Always include name, alignment, and descriptive caption:

```markdown
```{figure} path/to/image.png
:name: fig-unique-label
:align: center
:width: 70%

Descriptive caption explaining what the figure shows and its relevance.
```

```

### Admonitions

Use appropriate semantic types:

- `note`: General information or clarification
- `important`: Critical concepts students must understand
- `warning`: Common mistakes or pitfalls to avoid
- `tip`: Helpful hints or best practices
- `example`: Worked examples (use `admonition` with custom title for numbered
  examples)

```markdown
```{note}
Maxwell's equations are linear, so superposition applies.
```

```{warning}
**Common Mistake**: Don't confuse phase velocity with group velocity.
```

```{admonition} Example 4.2: Double-Slit Interference
:class: example

Calculate the fringe spacing for...
```

```

### Math Blocks

Use standard LaTeX delimiters for equations:

- Inline: `$E = mc^2$`
- Display (unnumbered):
  `$$\nabla \times \vec{E} = -\frac{\partial \vec{B}}{\partial t}$$`
- Display (numbered with label):
  ```markdown
  $$E = \hbar \omega$$ (eq:photon-energy)
  ```

## Cross-References

- **Equations**: `{eq}eq:label`
- **Figures**: `{numref}fig-label` or `{ref}fig-label`
- **Sections**: `{ref}section-label`
- **Tables**: `{numref}table-label`

## Label Naming Conventions

All labels follow a standardized format using camelCase for consistency and maintainability.

### Standard Format

Labels use camelCase: lowercase start with capital letters for subsequent words (no hyphens or underscores):

**Chapter codes**:
- `basics` - Chapter 1 (Basics)
- `geo` - Chapter 2 (Geometrical Optics)
- `inst` - Chapter 3 (Optical Instruments)
- `pol` - Chapter 4 (Polarization)
- `wave` - Chapter 5 (Wave Optics)
- `coh` - Chapter 6 (Interference & Coherence)
- `diff` - Chapter 7 (Diffraction)
- `laser` - Chapter 8 (Lasers)
- `adv` - Chapter 9 (Advanced Instruments)
- `fiber` - Chapter 10 (Fiber Optics)
- `ray` - Chapter 11 (Ray Matrix)

### Equation Labels

Format: `eq:chapter-code:descriptiveName`

**Examples**:
```markdown
:label: eq:geo:speedLightMedium
:label: eq:diff:helmholtz
:label: eq:fiber:selfConsistencyCondition
```

### Figure Labels

Format: `fig:chapter-code:descriptiveName`

**Examples**:
```markdown
```{figure} Images/mirror.png
:name: fig:geo:mirror
:align: center

Reflection from a curved mirror.
```

```{figure} Images/fresnel_zones.png
:name: fig:diff:fresnelZones
:align: center

Fresnel zone construction.
```
```

### Table Labels

Format: `table:chapter-code:descriptiveName`

**Examples**:
```markdown
```{table} Sign convention for ray tracing
:name: table:geo:signConvention

| Quantity | Positive | Negative |
|----------|----------|----------|
| ...      | ...      | ...      |
```
```

### Section Labels

Format: `(sec:chapter-code:descriptiveName)=`

**Examples**:
```markdown
(sec:geo:gaussianBeams)=
## Gaussian Beams

(sec:fiber:totalInternalReflection)=
### Total Internal Reflection
```

### Chapter Labels

Format: `(chapter:chapter-code)=`

**Examples**:
```markdown
(chapter:geo)=
# Geometrical Optics

(chapter:fiber)=
# Fiber Optics
```

### Appendix Labels

Format: `(appendix:descriptiveName)=`

**Examples**:
```markdown
(appendix:complexNumbers)=
# Complex Numbers

(appendix:fourierTransform)=
# Fourier Transform
```

### Naming Guidelines

1. **Descriptive**: Labels should clearly indicate content (e.g., `fig:geo:mirror` not `fig:geo:01`)
2. **camelCase**: Start with lowercase, capitalize first letter of subsequent words
3. **No separators**: Don't use hyphens or underscores (use camelCase instead)
4. **Concise**: Keep labels reasonably short but meaningful
5. **Unique**: Each label must be unique across the entire textbook

**Good examples**:
- `eq:wave:energyDensity`
- `fig:laser:cavityModes`
- `table:fiber:lossMechanisms`
- `sec:coh:temporalCoherence`

**Bad examples**:
- `eq:wave:energy-density` (uses hyphens)
- `fig:laser:Fig_8_01` (uses underscores and numbers)
- `table_fiber_loss` (uses underscores)
- `section.coherence` (uses dot notation)

## Linting Rules

The project includes automated linting to enforce these conventions:

1. **Directive fence check**: All MyST directives must use backtick fences (` ``` `)
2. **Title placement**: Dropdown and card titles must be on separate line after opening fence
3. **Figure captions**: All figures must have non-empty caption text
4. **Directive closure**: All directives must be properly closed with matching fence
5. **Equation labels**: Must follow `eq:chapter-code:descriptive-name` format
6. **Figure/table/section labels**: Must follow standardized naming conventions

Run linting with:

```bash
# Check MyST directive syntax
python3 scripts/lint_myst_markdown.py

# Check equation labels only
python3 scripts/lint_equation_labels.py

# Check all labels (equations, figures, tables, sections, chapters)
python3 scripts/lint_all_labels.py

# Auto-fix label issues
python3 scripts/lint_all_labels.py --fix
```

## Migration from Old Syntax

If you find old colon-fence directives (`:::{dropdown}`), convert them to
backtick fences:

**Before**:

```markdown
:::{dropdown}
**Title Text**

Content
:::
```

**After**:

```markdown
```{dropdown}
**Title Text**

Content
```

```

## Why These Conventions?

1. **Consistency**: Uniform syntax throughout the book aids readability and
   maintenance
2. **IDE Support**: Backtick fences provide better syntax highlighting and
   editor tooling
3. **Developer Experience**: Better editing experience is more important than
   slightly better GitHub rendering
4. **Maintainability**: Automated linting catches errors early
5. **Standards compliance**: Follows MyST documentation patterns

## References

- [MyST Guide: Directives and Roles](https://mystmd.org/guide/directives-and-roles)
- [MyST Guide: Dropdowns, Cards, and Tabs](https://mystmd.org/guide/dropdowns-cards-and-tabs)
- [MyST Guide: Figures](https://mystmd.org/guide/figures)
- [MyST Syntax Guide](https://mystmd.org/guide/syntax-overview)
