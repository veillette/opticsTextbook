# LaTeX to Typst Migration Guide

This document provides a comprehensive mapping of LaTeX commands to their Typst equivalents for migrating the Optics Textbook.

## Overview

Typst is a modern typesetting system that is faster and more intuitive than LaTeX. This guide covers all LaTeX commands currently used in this textbook.

---

## Basic Math Mode

### Inline vs Display Math

| LaTeX | Typst | Notes |
|-------|-------|-------|
| `$x^2$` | `$x^2$` | Inline math - same syntax |
| `$$x^2$$` | `$ x^2 $` | Display math - add spaces inside `$` |

---

## Common Math Commands

### Fractions

| LaTeX | Typst | Count in Textbook |
|-------|-------|-------------------|
| `\frac{a}{b}` | `frac(a, b)` or `a/b` | 520 occurrences |

**Examples:**
```typst
// LaTeX: \frac{n_1}{n_2}
// Typst:
$ frac(n_1, n_2) $
// or simply:
$ n_1/n_2 $
```

### Square Roots

| LaTeX | Typst | Count in Textbook |
|-------|-------|-------------------|
| `\sqrt{x}` | `sqrt(x)` | 135 occurrences |
| `\sqrt[n]{x}` | `root(n, x)` | - |

**Examples:**
```typst
// LaTeX: \sqrt{2}
// Typst:
$ sqrt(2) $

// LaTeX: \sqrt[3]{x}
// Typst:
$ root(3, x) $
```

### Boxed Equations (IMPORTANT!)

| LaTeX | Typst | Count in Textbook |
|-------|-------|-------------------|
| `\boxed{E = mc^2}` | `#rect($ E = mc^2 $)` or use `mannot` package | 25 occurrences |

**Recommended Approach - mannot Package:**
```typst
#import "@preview/mannot:0.2.2": markrect

$ integral_0^(+oo) e^(-x^2) dif x = markrect(sqrt(pi)/2) $
```

**Alternative - Built-in rect:**
```typst
// For boxed display equations:
#rect(
  inset: 8pt,
  stroke: 1pt,
  $ E = m c^2 $
)
```

---

## Alignment Environments

### align* Environment

| LaTeX | Typst | Count in Textbook |
|-------|-------|-------------------|
| `\begin{align*}...\end{align*}` | Use `&` and `\` in math mode | 394 occurrences |

**Example:**
```typst
// LaTeX:
\begin{align*}
  x &= a + b \\
  &= c + d
\end{align*}

// Typst:
$ x &= a + b \
    &= c + d $
```

**Notes:**
- `&` marks alignment points (alternates between right/left alignment)
- `\` creates line breaks within equations
- No need for explicit environment delimiters

---

## Arrays and Matrices

### Array Environment

| LaTeX | Typst | Count in Textbook |
|-------|-------|-------------------|
| `\begin{array}...\end{array}` | `mat(...)` | 95 occurrences |

**Example - Vectors:**
```typst
// LaTeX:
\begin{pmatrix}
  n\alpha \\
  y
\end{pmatrix}

// Typst:
$ vec(n alpha, y) $
// or with brackets:
$ vec(n alpha, y, delim: "[") $
```

**Example - Matrices:**
```typst
// LaTeX:
\begin{pmatrix}
  A & B \\
  C & D
\end{pmatrix}

// Typst:
$ mat(A, B; C, D) $
```

**Notes:**
- Use `vec()` for column vectors
- Use `mat()` for matrices
- Rows are separated by semicolons `;`
- Columns are separated by commas `,`
- Delimiters: `delim: "("` (default), `delim: "["`, `delim: "|"`, `delim: "||"`

---

## Greek Letters

| LaTeX | Typst | Notes |
|-------|-------|-------|
| `\alpha` | `alpha` | Remove backslash |
| `\beta` | `beta` | Remove backslash |
| `\gamma` | `gamma` | Remove backslash |
| `\delta` | `delta` | Remove backslash |
| `\epsilon` | `epsilon` | Remove backslash |
| `\theta` | `theta` | Remove backslash |
| `\lambda` | `lambda` | Remove backslash |
| `\mu` | `mu` | Remove backslash |
| `\nu` | `nu` | Remove backslash |
| `\omega` | `omega` | Remove backslash |
| `\pi` | `pi` | Remove backslash |
| `\phi` | `phi` | Remove backslash |
| `\Gamma` | `Gamma` | Uppercase - remove backslash |
| `\Delta` | `Delta` | Uppercase - remove backslash |
| `\Omega` | `Omega` | Uppercase - remove backslash |

---

## Operators and Functions

### Trigonometric Functions

| LaTeX | Typst |
|-------|-------|
| `\sin` | `sin` |
| `\cos` | `cos` |
| `\tan` | `tan` |
| `\arcsin` | `arcsin` |
| `\arccos` | `arccos` |
| `\arctan` | `arctan` |

### Calculus

| LaTeX | Typst |
|-------|-------|
| `\partial` | `diff` or `partial` |
| `\int` | `integral` |
| `\sum` | `sum` |
| `\prod` | `product` |
| `\lim` | `lim` |
| `\nabla` | `nabla` |

**Example - Custom Differential (from myst.yml):**
```typst
// LaTeX macro: \dif → \operatorname{d}\!
// Typst:
$ dif x $  // Built-in differential
// or define custom:
#let dif = math.op("d", limits: false)
```

---

## Text in Math Mode

| LaTeX | Typst |
|-------|-------|
| `\text{some text}` | `"some text"` |
| `\operatorname{name}` | `op("name")` |

**Examples:**
```typst
// LaTeX: \text{OPL}
// Typst:
$ "OPL" $

// LaTeX: \operatorname{Re}
// Typst:
$ op("Re") $
```

---

## Formatting and Styles

### Bold and Vectors

| LaTeX | Typst |
|-------|-------|
| `\mathbf{v}` | `bold(v)` |
| `\boldsymbol{\omega}` | `bold(omega)` |
| `\vec{E}` | `arrow(E)` or `bold(E)` |

**Custom Macro (from myst.yml):**
```typst
// LaTeX macro: \Vector{#1} → \boldsymbol{#1}
// Typst equivalent:
#let Vector(x) = $bold(#x)$
```

### Accents

| LaTeX | Typst |
|-------|-------|
| `\hat{x}` | `hat(x)` |
| `\tilde{x}` | `tilde(x)` |
| `\bar{x}` | `overline(x)` |
| `\overline{AB}` | `overline(A B)` |
| `\dot{x}` | `dot(x)` |
| `\ddot{x}` | `dot.double(x)` |

---

## Special Sets and Symbols

### Number Sets

| LaTeX | Typst |
|-------|-------|
| `\mathbb{R}` | `RR` or `bb(R)` |
| `\mathbb{C}` | `CC` or `bb(C)` |
| `\mathbb{N}` | `NN` or `bb(N)` |
| `\mathbb{Z}` | `ZZ` or `bb(Z)` |
| `\mathbb{Q}` | `QQ` or `bb(Q)` |

**Custom Macros (from myst.yml):**
```typst
// LaTeX: \Real → \mathbb{R}
// Typst:
#let Real = $RR$

// LaTeX: \Complex → \mathbb{C}
// Typst:
#let Complex = $CC$
```

### Common Symbols

| LaTeX | Typst |
|-------|-------|
| `\infty` | `infinity` or `oo` |
| `\pm` | `plus.minus` or `±` |
| `\times` | `times` or `×` |
| `\cdot` | `dot.c` or `·` |
| `\approx` | `approx` or `≈` |
| `\neq` | `!=` |
| `\leq` | `<=` |
| `\geq` | `>=` |
| `\rightarrow` | `arrow.r` or `→` |
| `\Rightarrow` | `arrow.r.double` or `=>` |

---

## Subscripts and Superscripts

**Same syntax as LaTeX:**

| LaTeX | Typst | Notes |
|-------|-------|-------|
| `x^2` | `x^2` | Superscript |
| `x_i` | `x_i` | Subscript |
| `x^{n+1}` | `x^(n+1)` | Use parentheses for multi-char |
| `x_{ij}` | `x_(i j)` | Use parentheses for multi-char |

---

## MyST Integration

### Math Directive Blocks

The MyST `{math}` directive should work with Typst syntax once Typst export is enabled in `myst.yml`.

**Current (LaTeX):**
````markdown
```{math}
:label: eq:example
\boxed{\frac{a}{b} = c}
```
````

**Migrated (Typst):**
````markdown
```{math}
:label: eq:example
#rect($ frac(a, b) = c $)
```
````

---

## Migration Strategy

### Phase 1: Global Replacements (Safe)
1. Greek letters: `\alpha` → `alpha`, etc.
2. Simple operators: `\sin`, `\cos`, etc.
3. Number sets: `\mathbb{R}` → `RR`, etc.

### Phase 2: Structural Changes (Requires Care)
1. Fractions: `\frac{a}{b}` → `frac(a, b)` or `a/b`
2. Square roots: `\sqrt{x}` → `sqrt(x)`
3. Alignment: `\begin{align*}...\end{align*}` → inline alignment with `&` and `\`

### Phase 3: Complex Structures
1. Arrays/Matrices: `\begin{array}...\end{array}` → `mat(...)` or `vec(...)`
2. Boxed equations: `\boxed{...}` → `#rect(...)` or mannot package

### Phase 4: Custom Macros
1. Update myst.yml with Typst equivalents
2. Define custom functions in Typst for `\Vector`, `\Real`, `\Complex`, `\dif`

---

## Testing Checklist

- [ ] Build HTML output successfully
- [ ] Verify equation numbering works
- [ ] Check cross-references to equations
- [ ] Verify boxed equations render correctly
- [ ] Test matrix/vector rendering
- [ ] Validate aligned equations
- [ ] Check all Greek letters display properly
- [ ] Verify custom macros work

---

## References

- [Typst Math Documentation](https://typst.app/docs/reference/math/)
- [Typst Forum: Boxed Equations](https://forum.typst.app/t/how-to-emphasize-an-important-equation-in-latexs-boxed-fashion/2900)
- [mannot Package](https://typst.app/universe/package/mannot/)
- [Typst Roots Functions](https://typst.app/docs/reference/math/roots/)
