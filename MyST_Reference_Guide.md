# MyST Markdown Reference Guide for Optics Textbook

This reference guide documents the MyST (Markedly Structured Text) syntax patterns, conventions, and features used in the "Exploring Optics" textbook. This guide serves as a quick reference for maintaining consistency and leveraging MyST's full capabilities.

## Project Structure Overview

### Core Configuration Files
- `myst.yml` - Main MyST configuration with project metadata, exports, and table of contents
- `references.bib` - BibTeX bibliography file for citations
- `package.json` - Node.js dependencies and build scripts

### Content Organization
```
content/
├── Preface/Preface.md
├── Chap##ChapterName/
│   ├── ChapterName.md          # Main chapter content
│   ├── Problems/
│   │   └── ChapterNameExercise.md
│   └── Images/                 # Chapter-specific images
├── Appendices/ComplexNumbers.md
└── Author/author.md
```

### Chapter Naming Convention
- Chapters: `Chap##ChapterName` (e.g., `Chap01Basics`, `Chap04Polarization`)
- Main files: Match directory name (e.g., `Basics.md`, `Polarization.md`)
- Exercise files: `ChapterNameExercise.md`

## MyST Configuration Features

### Project Settings (from myst.yml)
```yaml
project:
  title: "Exploring Optics: From Fundamentals to Advanced Applications"
  bibliography: references.bib
  numbering:
    headings: true    # Auto-number headings
    math: true        # Auto-number equations
    code: false       # Don't number code blocks
```

### Export Formats
- **HTML** (primary): Interactive web textbook with book-theme template
- **PDF**: Via Typst engine with custom book layout
- **Word**: For collaborative editing

## Chapter Structure and Metadata

### Standard Chapter Header
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

### Chapter Labels
- Format: `(chapter.chaptername)=`
- Examples: `(chapter.basics)=`, `(chapter.polarization)=`
- Used for cross-referencing between chapters

## Mathematical Content

### Equation Syntax with Labels

```{math}
:label: eq.labelname
\begin{align*}
E = hf
\end{align*}
```


### Equation Numbering Examples
- Labels: `eq.relativisticMomentum`, `eq.deBroglieWavelength`, `eq.defJones`
- Auto-numbered when `math: true` in configuration
- Referenced using `{eq}` syntax

### Inline Math
- Use single `$` for inline: `$E = h\nu$`
- Use `$$` for display math: `$$\lambda = \frac{h}{p}$$`

### LaTeX Symbols and Commands
- Vectors: `\mathbf{E}`, `\mathbf{k}`
- Calligraphic: `\mathcal{E}`, `\mathcal{A}`
- Greek letters: `\lambda`, `\nu`, `\omega`, `\varphi`
- Special functions: `\cos`, `\sin`, `\exp`

## Figures and Images

### Figure Directive Syntax

```{figure} Images/Chapter_1/filename.jpg
:name: fig:FigureName
:align: center
:width: 80%

Caption text describing the figure. Can be multiple lines and include
mathematical expressions and references.
```


### Figure Conventions
- **Image paths**: `Images/Chapter_N/filename.ext`
- **Name format**: `fig:DescriptiveName` (e.g., `fig:NewtonRings`, `fig:ElectromagneticSpectrum`)
- **Alignment**: Typically `center`
- **Width**: Usually `80%` for main figures
- **Supported formats**: `.jpg`, `.png`, `.svg`

### Figure Referencing
- Reference format: `{numref}` followed by backticks
- Example: `{numref}\`fig:NewtonRings\``
- Auto-generates: "Figure X.Y" with clickable links

## Cross-References and Navigation

### Internal References
- **Chapters**: `[](#chapter.chaptername)` → Links to chapter
- **Equations**: `{eq}\`eq.labelname\`` → Links to numbered equation
- **Figures**: `{numref}\`fig:figurename\`` → Links to figure with number
- **Sections**: `[](#section.label)` → Links to labeled section

### External References (Bibliography)
- **Citation format**: `{cite:p}\`key\`` for parenthetical citations
- **Citation format**: `{cite}\`key\`` for textual citations
- **Multiple citations**: `{cite}\`key1,key2,key3\``

### Bibliography Keys (from references.bib)
- Books: `Hecht_Optics`, `Goodman_FourierOptics`, `Siegman_Lasers`, `Braat_ImagingOptics`
- Articles: `Pendry_PRL_2000`, `PRL_2008`
- Videos: `SixtySymbols_Fourier`, `SixtySymbols_Heisenberg`

## Special Directives and Admonitions

### Learning Objectives

```{admonition} What you should know and be able to do after studying this chapter
- Understand concept A
- Be able to calculate B
- Know how to apply C
```

### Code Cells (Jupyter Integration)

```{code-cell} ipython3
:tags: [remove-input]

from jupyterquiz import display_quiz
display_quiz("questions_ch1.json")
```

### Common Admonition Types
- `{admonition}` - General callout box
- `{note}` - Notes and additional information
- `{warning}` - Important warnings
- `{tip}` - Helpful tips

## Problem Sets and Exercises

### Problem Numbering
- Format: `**X.Y**` (e.g., `**1.1**`, `**4.3**`)
- X = Chapter number, Y = Problem number within chapter

### Problem Structure
```markdown
**1.1** Calculate the de Broglie wavelength of an electron moving at 2.5 × 10⁶ m/s.

**1.2** A photon has a wavelength of 550 nm. Find its:
(a) frequency
(b) energy in joules
(c) energy in eV
```

### Interactive Elements
- Quiz integration using `jupyterquiz`
- JSON question files: `questions_chN.json`
- Code cells for interactive calculations

## Typography and Formatting

### Emphasis and Highlighting
- **Bold**: `**important term**` for key definitions
- *Italics*: `*emphasis*` for light emphasis
- `Code`: `` `inline code` `` for technical terms
- **Bold technical terms**: Key physics concepts on first introduction

### Physics Terminology
- **Capitalized terms**: Used for formal physics concepts
- **Perfect image**, **Jones vector**, **Fermi-Dirac statistics**
- Consistent terminology throughout textbook

### Special Characters
- Scientific notation: Use × symbol (×) not x
- Units: Proper spacing (e.g., `2.5 × 10⁶ m/s`)
- Degrees: Use ° symbol or write out "degrees"

## Build and Export Commands

### Development Commands
```bash
npm start        # Development server with live reload
npm run build    # Build HTML output
npm run export   # Build all formats (HTML, PDF, Word)
npm run pdf      # PDF only
npm run serve    # Serve built files locally
```

### Quality Assurance
```bash
npm run checklinks           # Validate internal/external links
npm run optimize-images      # Compress large images
python scripts/validate_references_enhanced.py  # Check citations
```

## Common Patterns and Best Practices

### Chapter Cross-References
```markdown
We have seen in [](#chapter.basics) that light is an electromagnetic wave...
This will be studied in [](#chapter.diffraction).
```

### Equation References in Text
```markdown
Using equation [](#relativisticMomentum), the momentum is:
From equation [](#deBroglieWavelength) is:
which is [](#one_surface).
```

### Figure Integration
```markdown
See {numref}`4_01_Dphi_000pi_f1_BW`.
Consider the mirror shown in {numref}`Fig_2_03_Descartes_Reflection`.
```

### Footnote Citations
```markdown
[^1]: {cite}`SixtySymbols_Fourier` Basic explanation of Fourier transforms.
[^2]: For a rigorous derivation see {cite}`Goodman_FourierOptics`, §3.3.
```

## Troubleshooting Common Issues

### Reference Errors
- Ensure labels don't have spaces: `fig:NewtonRings` not `fig:Newton Rings`
- Use consistent naming: chapter labels use lowercase with dots
- Check that referenced figures/equations actually have labels

### Build Issues
- Images must exist at specified paths
- Bibliography keys must exist in `references.bib`
- Circular references between chapters can cause problems

### Cross-Reference Format
- Use `[](#target)` for chapters and sections
- Use `{numref}\`target\`` for numbered figures
- Use `{eq}\`target\`` for numbered equations
- Use `{cite}\`key\`` for bibliography references

## File Organization Tips

### Image Management
- Keep images in chapter-specific subdirectories
- Use descriptive filenames that match content
- Maintain consistent image formats (prefer SVG for diagrams, JPG/PNG for photos)
- Run optimization scripts before committing large images

### Content Consistency
- Use the same mathematical notation throughout
- Maintain consistent cross-reference styles
- Follow the established problem numbering scheme
- Keep exercise files in `Problems/` subdirectories

This reference guide should be updated as new patterns and conventions emerge in the textbook development process.