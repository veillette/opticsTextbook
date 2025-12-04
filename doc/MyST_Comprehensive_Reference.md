# Comprehensive MyST Markdown Reference Guide

This comprehensive reference combines the official MyST Markdown documentation from [mystmd.org](https://mystmd.org/guide) with specific patterns and conventions used in the "Exploring Optics" textbook.

## Table of Contents
1. [Project Quick Reference](#project-quick-reference)
2. [MyST Overview](#myst-overview)
3. [Document Structure & Frontmatter](#document-structure--frontmatter)
4. [Mathematical Content](#mathematical-content)
5. [Cross-References & Navigation](#cross-references--navigation)
6. [Figures & Images](#figures--images)
7. [Admonitions & Callouts](#admonitions--callouts)
8. [Code & Computational Content](#code--computational-content)
9. [Tables](#tables)
10. [Advanced Directives](#advanced-directives)
11. [Project-Specific Patterns](#project-specific-patterns)

## Project Quick Reference

- **Content layout:** Chapters live in `content/ChapXXTopic/` with exercises in `Problems/` and figures in `Images/`.
- **Documentation hub:** The `doc/` directory hosts `MAINTENANCE.md`, `MYST_CONVENTIONS.md`, this reference, Typst migration notes, and script docs.
- **Frequently used commands:** `npm run start`, `npm run build`, `npm run validate-enhanced`, and `pytest scripts/tests/ -v`.
- **Need workflows?** See `doc/MAINTENANCE.md` for end-to-end procedures.

## MyST Overview

MyST (Markedly Structured Text) is an ecosystem of open-source, community-driven tools designed to revolutionize scientific communication. It extends Markdown with powerful features for creating:

- Interactive websites and online books
- Scientific papers and reports
- PDFs via LaTeX and Typst
- Microsoft Word documents
- JATS XML for journal publishing

Key features:
- JavaScript parser creating standardized Abstract Syntax Tree (AST)
- Multi-format export capabilities
- Jupyter integration for computational content
- Scientific citations and cross-referencing
- Performance and accessibility optimizations

## Document Structure & Frontmatter

### Basic Document Structure
```markdown
---
title: Document Title
authors:
  - name: Author Name
    affiliations: [Organization Name]
license: CC-BY-4.0
---

# Main Content
```

### Optics Textbook Pattern (Jupytext Integration)
```markdown
---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.16.7
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

(chapter.chaptername)=
# Chapter Title
```

### Project Configuration (myst.yml)
```yaml
version: 1
project:
  title: "Book Title"
  bibliography: references.bib
  numbering:
    headings: true    # Auto-number headings
    math: true        # Auto-number equations
    code: false       # Don't number code blocks
  exports:
    - format: typst
      output: exports/book.pdf
    - format: docx
      output: exports/book.docx
site:
  template: book-theme
  options:
    logo: img/logo.svg
    analytics:
      google: G-XXXXX
```

## Mathematical Content

### Inline Mathematics
```markdown
<!-- MyST role syntax -->
{math}`e = mc^2`

<!-- Dollar sign syntax -->
$E = h\nu$

<!-- In text -->
The energy $E$ is related to frequency $\nu$ by Planck's constant.
```

### Display Mathematics

#### Math Directive (Recommended)
```markdown
```{math}
:label: eq.einstein
E = mc^2
```
```

#### Double Dollar Signs
```markdown
$$
\lambda = \frac{h}{p}
$$
```

#### LaTeX Environments
```markdown
```{math}
:label: eq.maxwell
\begin{aligned}
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \epsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
```
```

### LaTeX Macros in Frontmatter
```yaml
math:
  '\dif': '\operatorname{d}\!'
  '\Vector': '\boldsymbol{#1}'
```

### Optics Textbook Math Patterns
- **Vectors**: `\mathbf{E}`, `\mathbf{k}`, `\mathbf{J}`
- **Calligraphic**: `\mathcal{E}`, `\mathcal{A}` (for field amplitudes)
- **Physics notation**: `\nu` (frequency), `\lambda` (wavelength), `\omega` (angular frequency)
- **Subscripts**: `E_x`, `\varphi_x`, `n_1`, `n_2`

## Cross-References & Navigation

### Reference Syntax Options

#### Markdown Link Syntax
```markdown
[](#target)              # Auto-filled text
[custom text](#target)   # Custom text
```

#### Shorthand @ Syntax
```markdown
@target                  # Automatic reference
```

#### MyST Role Syntax
```markdown
{ref}`target`            # Generic reference
{numref}`target`         # Numbered reference
{eq}`eq.einstein`        # Equation reference
{doc}`filename`          # Document reference
```

### Labeling Targets

#### Headers
```markdown
(section-label)=
# Section Title

(chapter.basics)=
# Chapter Title
```

#### Directives
```markdown
```{figure} image.jpg
:label: fig.example
:name: fig-example      # Alternative label syntax

Caption text
```
```

#### Equations
```markdown
```{math}
:label: eq.schrodinger
i\hbar \frac{\partial}{\partial t} \Psi = \hat{H} \Psi
```
```

### Optics Textbook Reference Patterns
- **Chapters**: `[](#chapter.basics)`, `[](#chapter.polarization)`
- **Figures**: `{numref}`fig:NewtonRings``, `{numref}`Fig_2_01_GeomDiffr``
- **Equations**: `{eq}`eq.relativisticMomentum``, `{eq}`eq.deBroglieWavelength``
- **Sections**: Internal chapter sections with descriptive labels

### Numbering Configuration
```yaml
numbering:
  enumerator:
    figure: "Figure %s"
    equation: "(%s)"
    section: "%s"
  figure:
    template: "Figure %s"
  heading_1: true
  heading_2: true
  math: true
```

## Figures & Images

### Basic Image Syntax
```markdown
![Alt text](path/to/image.png "Title")
```

### Image Directive
```markdown
```{image} https://example.com/image.png
:alt: Description
:width: 500px
:height: 300px
:align: center
:class: custom-class
```
```

### Figure Directive (Recommended)
```markdown
```{figure} Images/Chapter_1/diagram.jpg
:label: fig.diagram
:name: fig-diagram
:align: center
:width: 80%

Caption describing the figure. Can include mathematical expressions like $E = mc^2$ and references to other figures.
```
```

### Subfigures
```markdown
```{figure} #subfig
:label: fig.combined

```{subfigure} image1.jpg
:label: fig.part-a
:width: 49%

First subfigure caption
```

```{subfigure} image2.jpg
:label: fig.part-b
:width: 49%

Second subfigure caption
```

Combined figure caption
```
```

### Optics Textbook Figure Patterns
- **Path structure**: `Images/Chapter_N/filename.ext`
- **Naming**: `fig:DescriptiveName`, `Fig_N_XX_Description`
- **Standard width**: `80%` for main figures
- **Alignment**: Typically `center`
- **Formats**: `.jpg`, `.png`, `.svg` (prefer SVG for diagrams)

## Admonitions & Callouts

### Standard Admonition Types
```markdown
:::{note}
This is a note admonition.
:::

:::{tip}
This is a helpful tip.
:::

:::{warning}
This is a warning.
:::

:::{caution}
Proceed with caution.
:::

:::{danger}
This is dangerous!
:::

:::{attention}
Pay attention to this.
:::

:::{hint}
Here's a hint.
:::

:::{important}
This is important information.
:::

:::{seealso}
See also these references.
:::

:::{error}
An error occurred.
:::
```

### Custom Titles
```markdown
:::{tip} Custom Title
Your content here
:::
```

### Dropdown Admonitions
```markdown
:::{dropdown} Click to expand
:open:

Hidden content that can be toggled
:::
```

### Optics Textbook Learning Objectives Pattern
```markdown
```{admonition} What you should know and be able to do after studying this chapter
- Understand how different states of polarization are related to field components
- Know that elliptical polarization is the most general state
- Be able to work with Jones vectors and Jones matrices
- Know how birefringence is exploited to create wave plates
```
```

## Code & Computational Content

### Basic Code Blocks
````markdown
```python
import numpy as np
import matplotlib.pyplot as plt

# Create data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Plot
plt.plot(x, y)
plt.show()
```
````

### Code Directive with Options
````markdown
```{code} python
:label: code.example
:caption: Creating a TensorMesh
:linenos:
:emphasize-lines: 2,3

import numpy as np
from discretize import TensorMesh
mesh = TensorMesh([10, 10, 10])
```
````

### Jupyter Code Cells
````markdown
```{code-cell} ipython3
:tags: [remove-input]
:label: cell.quiz

from jupyterquiz import display_quiz
display_quiz("questions_ch1.json")
```
````

### Executable Code Options
- `:tags: [remove-input]` - Hide the code, show only output
- `:tags: [remove-output]` - Show code, hide output
- `:tags: [hide-cell]` - Hide entire cell but keep executable

### Optics Textbook Code Patterns
- Interactive quizzes using `jupyterquiz`
- Hidden input cells for clean presentation
- JSON question files: `questions_chN.json`

## Tables

### GitHub Flavored Markdown Tables
```markdown
| Left Align | Center | Right Align |
| :--------- | :----: | ----------: |
| Content    | More   |        Data |
| Values     | Text   |      Numbers|
```

### Table Directive
```markdown
:::{table} Table Caption
:label: tbl.example
:align: center

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Data     | Values   | Results  |
| More     | Info     | Here     |
:::
```

### List Tables
```markdown
:::{list-table} Table Caption
:header-rows: 1
:name: tbl.list

* - Column 1
  - Column 2
  - Column 3
* - Row 1, Col 1
  - Row 1, Col 2
  - Row 1, Col 3
* - Row 2, Col 1
  - Row 2, Col 2
  - Row 2, Col 3
:::
```

### CSV Tables
```markdown
:::{csv-table} Data Table
:file: data.csv
:header-rows: 1
:::
```

## Advanced Directives

### Margins and Asides
```markdown
:::{margin} Margin Note
This content appears in the margin
:::

:::{aside} Side Content
This creates an aside block
:::
```

### Proofs and Exercises
```markdown
:::{prf:theorem} Pythagoras' Theorem
:label: thm.pythagoras

In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.
:::

:::{prf:proof}
The proof follows from the geometric relationship...
:::

:::{exercise}
:label: ex.basic

Calculate the wavelength of light with frequency 5 × 10¹⁴ Hz.
:::
```

### Interactive Elements
```markdown
:::{dropdown} Expandable Content
:open:

Content that can be hidden/shown
:::

:::{tab-set}
:::{tab-item} Tab 1
Content for first tab
:::

:::{tab-item} Tab 2
Content for second tab
:::
:::
```

### Include Directives
```markdown
```{include} path/to/file.md
```

```{literalinclude} code.py
:language: python
:lines: 1-10
```
```

## Citations & Bibliography

### Citation Syntax
```markdown
<!-- Parenthetical citations -->
{cite:p}`key1,key2,key3`

<!-- Narrative citations -->
{cite:t}`author2023`

<!-- DOI-based citations -->
[](doi:10.4230/DAGMAN.1.1.41)
```

### Bibliography Configuration
```yaml
project:
  bibliography: references.bib
```

### Optics Textbook Citation Patterns
- Books: `{cite:p}`Hecht_Optics``
- Articles: `{cite}`Pendry_PRL_2000``
- Multiple citations: `{cite}`key1,key2,key3``
- Footnote citations: `[^1]: {cite}`Source`` explanation text

## Project-Specific Patterns

### Chapter Structure
```
content/
├── ChapXXName/
│   ├── Name.md                    # Main content
│   ├── Problems/
│   │   └── NameExercise.md       # Problem sets
│   └── Images/                    # Chapter images
└── references.bib                 # Global bibliography
```

### Problem Set Formatting
```markdown
## Problems

**1.1** Calculate the de Broglie wavelength of an electron moving at 2.5 × 10⁶ m/s.

**1.2** A photon has a wavelength of 550 nm. Find its:
(a) frequency
(b) energy in joules
(c) energy in eV
(d) momentum
```

### Build Commands
```bash
# Development
npm start               # Live preview server
npm run build          # Build HTML
npm run export         # Build all formats

# Quality assurance
npm run checklinks     # Validate links
npm run optimize-images # Compress images

# Python utilities
python scripts/validate_references_enhanced.py
python scripts/find_unreferenced_images.py
```

### Typography Conventions
- **Scientific notation**: `2.5 × 10⁶` (using ×, not x)
- **Units**: Proper spacing `m/s`, `nm`, `eV`
- **Key terms**: **Bold** on first introduction
- **Emphasis**: *Italics* for light emphasis
- **Technical terms**: `code formatting` for precise technical terms

This comprehensive reference should serve as both a MyST learning resource and a practical guide for maintaining consistency in your optics textbook project.