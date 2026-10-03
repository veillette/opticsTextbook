---
tags:
  - mathematics
  - reference
  - foundational
---

(appendix:matrixMultiplication)=
# Appendix B: Matrix Multiplication in Optics

> "In mathematics you don't understand things. You just get used to them."
>
> — John von Neumann

```{note}
While matrix multiplication may initially seem like abstract algebra, it becomes an indispensable tool in optics. Matrices elegantly describe how light transforms as it propagates through optical systems, making complex calculations surprisingly manageable. From polarization analysis to ray tracing, matrices reveal the underlying mathematical structure of optical phenomena.
```

Matrix multiplication provides one of the most powerful and systematic approaches to analyzing optical systems. Far from being merely computational shortcuts, matrices encode the fundamental transformations that light undergoes, revealing deep connections between seemingly different optical phenomena. This appendix will guide you through matrix operations with a focus on their physical meaning in optics, building from basic concepts to sophisticated applications in polarization and ray optics.

## What Are Matrices and Why Do We Need Them in Optics?

### The Power of Linear Transformations

```{note}
:class: tip

**Tip:** In linear materials, Maxwell's equations obey superposition: a sum of two solutions is also a solution. Nonlinear optical effects require additional models.
```

Many optical operations in a specified linear regime can be described as **linear transformations** of suitable state vectors. Examples include:

- A polarizer acts on a fully polarized Jones vector (unpolarized light needs a different description)
- A wave plate changes the polarization state of light
- A lens transforms a parallel beam into a converging beam
- A sequence of paraxial interfaces changes a ray's height and angle

Each of these transformations can be represented mathematically as a matrix operation, where the input state is multiplied by a transformation matrix to yield the output state.

### Matrix Basics: Structure and Notation

A matrix is a rectangular array of numbers arranged in rows and columns. For optics, we primarily work with **2×2 matrices** for both polarization and ray optics:

$$\mathbf{M} = \begin{pmatrix} m_{11} & m_{12} \\ m_{21} & m_{22} \end{pmatrix}$$

```{warning}
:class: important

**Important:** **Index Convention**: The first subscript indicates the row, the second indicates the column. So $m_{12}$ is the element in the first row, second column.
```

### Vectors: Representing Optical States

In matrix optics, we represent physical states as **column vectors**:

**Polarization States** (Jones vectors):
$$\vec{E} = \begin{pmatrix} E_x \\ E_y \end{pmatrix}$$

**Ray States** (ray vectors):
$$\vec{r} = \begin{pmatrix} y \\ \theta \end{pmatrix}$$

where $y$ is the ray height and $\theta$ is the ray angle.

This appendix uses the common $(y,\theta)^T$ ray-vector order. Chapter 11
instead uses $(n\alpha,y)^T$, so its matrix entries occupy different
positions. Both conventions describe the same paraxial rays once the
coordinates and refractive-index factors are converted. In this
$(y,\theta)^T$ convention, two transverse planes are conjugate when
$B=0$; in Chapter 11's $(n\alpha,y)^T$ convention, the corresponding
condition is $C=0$.

### Why Matrix Multiplication Works for Optics

The reason matrices are so powerful in optics is that **optical systems are compositional**: if you have two optical elements in series, the combined effect is the product of their individual effects. Mathematically:

If element A transforms state $\vec{s}_1$ to $\vec{s}_2$: $\vec{s}_2 = \mathbf{A}\vec{s}_1$
And element B transforms state $\vec{s}_2$ to $\vec{s}_3$: $\vec{s}_3 = \mathbf{B}\vec{s}_2$

Then the combined transformation is: $\vec{s}_3 = \mathbf{B}(\mathbf{A}\vec{s}_1) = (\mathbf{B}\mathbf{A})\vec{s}_1$

The combined system has matrix **$\mathbf{BA}$**—the product of the individual matrices.

## Matrix Multiplication: Rules and Mechanics

### The Fundamental Rule

Matrix multiplication follows a specific pattern. For matrices $\mathbf{A}$ and $\mathbf{B}$:

$$(\mathbf{AB})_{ij} = \sum_{k} A_{ik}B_{kj}$$

In plain English: to get element $(i,j)$ of the product, take the dot product of row $i$ from the first matrix with column $j$ from the second matrix.

### Step-by-Step Process for 2×2 Matrices

For two 2×2 matrices:
$$\mathbf{A} = \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix}, \quad \mathbf{B} = \begin{pmatrix} b_{11} & b_{12} \\ b_{21} & b_{22} \end{pmatrix}$$

The product $\mathbf{C} = \mathbf{AB}$ has elements:
$$\mathbf{C} = \begin{pmatrix} a_{11}b_{11} + a_{12}b_{21} & a_{11}b_{12} + a_{12}b_{22} \\ a_{21}b_{11} + a_{22}b_{21} & a_{21}b_{12} + a_{22}b_{22} \end{pmatrix}$$

```{note} Example: Basic Matrix Multiplication
Let's multiply two simple matrices:
$$\mathbf{A} = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}, \quad \mathbf{B} = \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}$$

**Step by step:**
- $c_{11} = (1)(5) + (2)(7) = 5 + 14 = 19$
- $c_{12} = (1)(6) + (2)(8) = 6 + 16 = 22$
- $c_{21} = (3)(5) + (4)(7) = 15 + 28 = 43$
- $c_{22} = (3)(6) + (4)(8) = 18 + 32 = 50$

**Result:**
$$\mathbf{AB} = \begin{pmatrix} 19 & 22 \\ 43 & 50 \end{pmatrix}$$
```

### Matrix-Vector Multiplication

When multiplying a matrix by a vector:
$$\mathbf{A}\vec{v} = \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} a_{11}v_1 + a_{12}v_2 \\ a_{21}v_1 + a_{22}v_2 \end{pmatrix}$$

This is how we transform optical states—the matrix represents the optical element, and the vector represents the light state.

### Important Properties of Matrix Multiplication

```{list-table} Matrix Multiplication Properties
:header-rows: 1
:name: table:matrixProperties

* - Property
  - Mathematical Statement
  - Physical Meaning
* - **Associative**
  - $(\mathbf{AB})\mathbf{C} = \mathbf{A}(\mathbf{BC})$
  - Order of grouping doesn't matter
* - **Not Commutative**
  - $\mathbf{AB} \neq \mathbf{BA}$ (usually)
  - Order of optical elements matters!
* - **Identity Element**
  - $\mathbf{AI} = \mathbf{IA} = \mathbf{A}$
  - Identity represents "do nothing"
* - **Distributive**
  - $\mathbf{A}(\mathbf{B} + \mathbf{C}) = \mathbf{AB} + \mathbf{AC}$
  - Superposition principle
```

```{warning}
**Order Matters!** With column vectors, $\mathbf{AB}\vec v$ applies element B first and then element A. The rightmost matrix acts first.
```

## Special Matrices in Optics

### The Identity Matrix

The **identity matrix** represents "no change":
$$\mathbf{I} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$$

For any matrix $\mathbf{A}$ or vector $\vec{v}$:
- $\mathbf{AI} = \mathbf{IA} = \mathbf{A}$
- $\mathbf{I}\vec{v} = \vec{v}$

**Physical meaning**: No change between two coincident reference planes. Propagation over a finite distance changes ray height and has its own matrix.

### Rotation Matrices

A **rotation matrix** rotates vectors by angle $\theta$:
$$\mathbf{R}(\theta) = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$$

```{note} Example: 45° Rotation Matrix
For $\theta = 45°$:
$$\mathbf{R}(45°) = \begin{pmatrix} \frac{1}{\sqrt{2}} & -\frac{1}{\sqrt{2}} \\ \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} \end{pmatrix}$$

Applying this to a horizontal vector $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$:
$$\mathbf{R}(45°)\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} \frac{1}{\sqrt{2}} \\ \frac{1}{\sqrt{2}} \end{pmatrix}$$

This rotates the vector from the x-axis to 45° above the x-axis.
```

### Inverse Matrices

The **inverse** of matrix $\mathbf{A}$ is denoted $\mathbf{A}^{-1}$ and satisfies:
$$\mathbf{A}\mathbf{A}^{-1} = \mathbf{A}^{-1}\mathbf{A} = \mathbf{I}$$

For a 2×2 matrix:
$$\mathbf{A}^{-1} = \frac{1}{\det(\mathbf{A})} \begin{pmatrix} a_{22} & -a_{12} \\ -a_{21} & a_{11} \end{pmatrix}$$

where $\det(\mathbf{A}) = a_{11}a_{22} - a_{12}a_{21}$ is the **determinant**, provided $\det(\mathbf A)\ne0$.

**Physical meaning**: For an invertible transformation, the inverse maps an output state back to its input. An ideal polarizer is singular and cannot be inverted.

## Jones Matrices: Polarization Optics

### Representing Polarized Light

In **Jones calculus**, we represent polarized light as a complex 2D vector:
$$\mathbf E = \begin{pmatrix} \mathcal E_x \\ \mathcal E_y \end{pmatrix}
= \begin{pmatrix} A_x e^{i\phi_x} \\ A_y e^{i\phi_y} \end{pmatrix},\qquad A_x,A_y\ge0.$$

The physical field is $\operatorname{Re}[\mathbf E e^{-i\omega t}]$.
Jones vectors describe fully polarized, coherent fields.

```{list-table} Common Polarization States
:header-rows: 1
:name: table:polarizationJonesVectors

* - Polarization Type
  - Jones Vector
  - Physical Description
* - Horizontal linear
  - $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$
  - Electric field oscillates in x-direction
* - Vertical linear
  - $\begin{pmatrix} 0 \\ 1 \end{pmatrix}$
  - Electric field oscillates in y-direction
* - 45° linear
  - $\frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$
  - Equal x and y components, in phase
* - Right circular
  - $\frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -i \end{pmatrix}$
  - Quadrature components; clockwise rotation when viewed toward the source
* - Left circular
  - $\frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ i \end{pmatrix}$
  - Quadrature components; counterclockwise rotation when viewed toward the source
```

### Jones Matrices for Common Optical Elements

**Linear Polarizer (transmission axis at angle $\theta$):**
$$\mathbf{P}(\theta) = \begin{pmatrix} \cos^2\theta & \cos\theta\sin\theta \\ \cos\theta\sin\theta & \sin^2\theta \end{pmatrix}$$

**Special cases:**
- Horizontal polarizer ($\theta = 0$): $\mathbf{P}_H = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$
- Vertical polarizer ($\theta = 90°$): $\mathbf{P}_V = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$

**Quarter-Wave Plate (fast axis at angle $\theta$):**
$$\mathbf{Q}(\theta) = \mathbf{R}(\theta) \begin{pmatrix} 1 & 0 \\ 0 & i \end{pmatrix} \mathbf{R}(-\theta)$$

**Half-Wave Plate (fast axis at angle $\theta$):**
$$\mathbf{H}(\theta) = \mathbf{R}(\theta) \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} \mathbf{R}(-\theta)$$

These forms follow from the active rotation matrix $\mathbf R$ defined above:
rotate into the element's axes with $\mathbf R(-\theta)$, apply its
principal-axis matrix, then rotate back.

### Worked Example: Polarization Analysis

```{note} Example: Light Through Crossed Polarizers
Analyze what happens when horizontally polarized light passes through:
1. A 45° polarizer
2. A vertical polarizer

**Solution:**

**Initial state:** $\vec{E}_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ (horizontal)

**Step 1:** 45° polarizer
$$\mathbf{P}_{45°} = \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & 1/2 \end{pmatrix}$$

$$\vec{E}_1 = \mathbf{P}_{45°}\vec{E}_0 = \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & 1/2 \end{pmatrix}\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 1/2 \\ 1/2 \end{pmatrix}$$

**Step 2:** Vertical polarizer
$$\mathbf{P}_V = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$$

$$\vec{E}_2 = \mathbf{P}_V\vec{E}_1 = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}\begin{pmatrix} 1/2 \\ 1/2 \end{pmatrix} = \begin{pmatrix} 0 \\ 1/2 \end{pmatrix}$$

**Combined effect:**
$$\mathbf P_V\mathbf P_{45°}
= \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}
\begin{pmatrix} 1/2 & 1/2 \\ 1/2 & 1/2 \end{pmatrix}
= \begin{pmatrix} 0 & 0 \\ 1/2 & 1/2 \end{pmatrix},\qquad
\vec E_2=(\mathbf P_V\mathbf P_{45°})\vec E_0
=\begin{pmatrix}0\\1/2\end{pmatrix}.$$

**Intensity:** $I = |\vec{E}_2|^2 = |1/2|^2 = 1/4$ of the original intensity.

Without the intermediate polarizer, crossed polarizers would transmit zero intensity (Malus's law). The 45° polarizer allows 25% transmission.
```

### Complex Polarization States

Real optical systems often involve complex Jones matrices with both real and imaginary elements:

```{note} Example: Quarter-Wave Plate Action
A quarter-wave plate with fast axis along x converts linear polarization to circular:

**QWP matrix:** $\mathbf{Q} = \begin{pmatrix} 1 & 0 \\ 0 & i \end{pmatrix}$

**Input:** 45° linear polarization $\vec{E}_{in} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$

**Output:**
$$\vec{E}_{out} = \mathbf{Q}\vec{E}_{in} = \begin{pmatrix} 1 & 0 \\ 0 & i \end{pmatrix}\frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ i \end{pmatrix}$$

This is left-handed circular polarization! The imaginary unit $i$ represents a 90° phase shift.
```

## Ray Transfer Matrices: Geometrical Optics

### The ABCD Matrix Formalism

In **geometrical optics**, we can represent ray propagation using 2×2 matrices. A ray is characterized by:
- Height $y$ above the optical axis
- Angle $\theta$ with respect to the optical axis

$$\vec{r} = \begin{pmatrix} y \\ \theta \end{pmatrix}$$

An optical element transforms the ray according to:
$$\vec{r}_{out} = \begin{pmatrix} A & B \\ C & D \end{pmatrix}\vec{r}_{in} = \begin{pmatrix} A & B \\ C & D \end{pmatrix}\begin{pmatrix} y_{in} \\ \theta_{in} \end{pmatrix}$$

### ABCD Matrices for Common Elements

```{list-table} Ray Transfer Matrices
:header-rows: 1
:name: table:transferMatrices

* - Optical Element
  - ABCD Matrix
  - Physical Effect
* - **Free space (distance d)**
  - $\begin{pmatrix} 1 & d \\ 0 & 1 \end{pmatrix}$
  - Ray height changes, angle unchanged
* - **Thin lens (focal length f)**
  - $\begin{pmatrix} 1 & 0 \\ -1/f & 1 \end{pmatrix}$
  - Height unchanged, angle changes
* - **Curved mirror ($R>0$ for a focusing concave mirror; unfolded path)**
  - $\begin{pmatrix} 1 & 0 \\ -2/R & 1 \end{pmatrix}$
  - Reflection and focusing with the optical axis unfolded after reflection
* - **Flat interface (n₁ to n₂)**
  - $\begin{pmatrix} 1 & 0 \\ 0 & n_1/n_2 \end{pmatrix}$
  - Refraction changes angle
```

### System Analysis Using Matrix Products

For multiple elements in series, multiply their matrices **in reverse order**:

$$\mathbf{M}_{total} = \mathbf{M}_N \mathbf{M}_{N-1} \cdots \mathbf{M}_2 \mathbf{M}_1$$

```{note} Example: Simple Telescope
Analyze a telescope consisting of:
1. Objective lens (focal length $f_1 = 100$ mm)
2. Distance $d = 120$ mm
3. Eyepiece lens (focal length $f_2 = 20$ mm)

**Solution:**

**Individual matrices:**
- Objective: $\mathbf{L}_1 = \begin{pmatrix} 1 & 0 \\ -1/100 & 1 \end{pmatrix}$
- Free space: $\mathbf{D} = \begin{pmatrix} 1 & 120 \\ 0 & 1 \end{pmatrix}$
- Eyepiece: $\mathbf{L}_2 = \begin{pmatrix} 1 & 0 \\ -1/20 & 1 \end{pmatrix}$

**System matrix:**
$$\mathbf{M} = \mathbf{L}_2 \mathbf{D} \mathbf{L}_1$$

**Step 1:** $\mathbf{D}\mathbf{L}_1 = \begin{pmatrix} 1 & 120 \\ 0 & 1 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ -1/100 & 1 \end{pmatrix} = \begin{pmatrix} -0.2 & 120 \\ -0.01 & 1 \end{pmatrix}$

**Step 2:** $\mathbf{M} = \begin{pmatrix} 1 & 0 \\ -1/20 & 1 \end{pmatrix}\begin{pmatrix} -0.2 & 120 \\ -0.01 & 1 \end{pmatrix} = \begin{pmatrix} -0.2 & 120 \\ 0 & -5 \end{pmatrix}$

**Analysis:**
- $C=0$, so an on-axis parallel input bundle leaves parallel: this telescope is afocal.
- The output beam-height ratio for a parallel input bundle is $A=-0.2$; its magnitude is one fifth of the input beam height.
- The signed angular ratio is $D=-5$ for a ray entering on the axis, so the angular magnification has magnitude 5 and the view is inverted. A finite-plane lateral image magnification is not defined for this afocal setup.
```

### Physical Meaning of ABCD Elements

Each element of the ABCD matrix has physical significance:

$$\begin{pmatrix} y_{out} \\ \theta_{out} \end{pmatrix} = \begin{pmatrix} A & B \\ C & D \end{pmatrix}\begin{pmatrix} y_{in} \\ \theta_{in} \end{pmatrix}$$

- **A**: Height magnification ($y_{out}/y_{in}$ when $\theta_{in} = 0$)
- **B**: Height displacement per unit input angle (length per radian)
- **C**: Angle change per unit input height (radians per length)
- **D**: Angle magnification ($\theta_{out}/\theta_{in}$ when $y_{in} = 0$)

```{warning}
:class: important

**Important:** **Determinant Rule**: For any optical system in the same medium: $AD - BC = 1$

This follows from the paraxial ray invariant for a system whose input and output media have the same refractive index. With the $(y,\theta)^T$ convention across different media, the determinant is $n_{\rm in}/n_{\rm out}$.
```

## Practical Applications and Examples

### Polarization State Analysis

```{note} Example: Complete Polarization System
Design a system to convert right-handed circular polarization to 30° linear polarization.

**Solution:**

**Input:** $\vec{E}_{in} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -i \end{pmatrix}$ (RCP)

**Target:** $\vec{E}_{target} = \begin{pmatrix} \cos 30° \\ \sin 30° \end{pmatrix} = \begin{pmatrix} \sqrt{3}/2 \\ 1/2 \end{pmatrix}$ (30° linear)

**Step 1:** A quarter-wave plate with fast axis at $-45°$ gives

$$\mathbf Q_{-45°}
=\frac12\begin{pmatrix}1+i&i-1\\i-1&1+i\end{pmatrix},
\qquad
\mathbf E_1=\mathbf Q_{-45°}\mathbf E_{\rm in}
=\frac{1+i}{\sqrt2}\begin{pmatrix}1\\0\end{pmatrix}.$$

The output is horizontal linear polarization, up to an overall phase.

**Step 2:** A half-wave plate with fast axis at $15°$ rotates horizontal
linear polarization to $30°$:

$$\mathbf H_{15°}=\begin{pmatrix}\cos30°&\sin30°\\
\sin30°&-\cos30°\end{pmatrix},\qquad
\mathbf E_{\rm out}=\frac{1+i}{\sqrt2}
\begin{pmatrix}\cos30°\\\sin30°\end{pmatrix}.$$

The prefactor has unit modulus, so ideal plates preserve intensity.
```

### Optical System Design

```{note} Example: Beam Expander Design
Design a Galilean beam expander with a threefold increase in the width of a collimated beam, using lenses with focal lengths $-50$ mm and $+150$ mm.

**Solution:**

**System layout:** Negative lens → distance $d$ → positive lens

**Matrices:**
- $\mathbf{L}_1 = \begin{pmatrix} 1 & 0 \\ 1/50 & 1 \end{pmatrix}$ ($f_1=-50$ mm)
- $\mathbf{D} = \begin{pmatrix} 1 & d \\ 0 & 1 \end{pmatrix}$ (distance d)
- $\mathbf{L}_2 = \begin{pmatrix} 1 & 0 \\ -1/150 & 1 \end{pmatrix}$ ($f_2=150$ mm)

**For an afocal threefold expansion:** $C=0$ and $A=3$ for parallel incident rays. These conditions give $d=f_1+f_2=100$ mm.

**System matrix:** $\mathbf{M} = \mathbf{L}_2\mathbf{D}\mathbf{L}_1$

Multiplication gives $\mathbf M=\begin{pmatrix}3&100\ {\rm mm}\\0&1/3\end{pmatrix}$, so a collimated input beam exits three times wider with one third the angular spread.
```

## Common Pitfalls and How to Avoid Them

### Order of Operations

```{warning}
**Pitfall**: Multiplying matrices in the wrong order.

**Solution**: Remember that for light traveling left to right through elements 1, 2, 3, the system matrix is $\mathbf{M}_3\mathbf{M}_2\mathbf{M}_1$ (reverse order). Think "last element acts first on the result."
```

### Sign Conventions

```{warning}
**Pitfall**: Inconsistent sign conventions for angles and distances.

**Solution**: Establish clear conventions early:
- Angles: positive counterclockwise
- Distances: positive in direction of light propagation
- Focal lengths: positive for converging elements
```

### Physical Interpretation

```{warning}
**Pitfall**: Treating matrices as pure mathematics without physical meaning.

**Solution**: Always ask "What does this matrix element represent physically?" Each number should have units and physical significance.
```

### Complex vs. Real Matrices

```{warning}
**Pitfall**: Mixing Jones calculus (complex) with ray matrices (real).

**Solution**: Jones matrices describe polarization (wave optics), ABCD matrices describe ray propagation (geometrical optics). Don't mix the formalisms unless you're doing sophisticated coherent ray analysis.
```

## Matrix Multiplication Techniques and Shortcuts

### Special Matrix Products

**Rotation matrices:**
$$\mathbf{R}(\alpha)\mathbf{R}(\beta) = \mathbf{R}(\alpha + \beta)$$

**Translation matrices:**
$$\begin{pmatrix} 1 & d_1 \\ 0 & 1 \end{pmatrix}\begin{pmatrix} 1 & d_2 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 & d_1 + d_2 \\ 0 & 1 \end{pmatrix}$$

**Thin lens combinations:**
Two thin lenses in contact: $\mathbf{L}_{total} = \mathbf{L}_2\mathbf{L}_1$
$$\begin{pmatrix} 1 & 0 \\ -1/f_2 & 1 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ -1/f_1 & 1 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ -1/f_{eff} & 1 \end{pmatrix}$$

where $\frac{1}{f_{eff}} = \frac{1}{f_1} + \frac{1}{f_2}$ is the power-addition rule for thin lenses in contact.

### Computational Tips

**For hand calculations:**
1. Look for patterns (identity elements, zeros)
2. Factor common terms
3. Use special properties (orthogonal, symmetric matrices)
4. Check dimensions and units at each step

**For computer calculations:**
```python
import numpy as np

# Define matrices
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Matrix multiplication
C = A @ B  # or np.dot(A, B)
```

## Summary and Physical Insights

### Why Matrix Methods Work So Well

Matrix multiplication succeeds in optics because:

```{list-table} Fundamental Reasons for Matrix Success
:header-rows: 1
:name: table:matrixSuccessReasons

* - Mathematical Property
  - Physical Principle
  - Optical Example
* - **Linearity**
  - Superposition of waves
  - Interference, diffraction
* - **Composition**
  - Sequential operations
  - Multi-element systems
* - **Invertible subset**
  - Invertibility of lossless ray propagation
  - Reverse tracing through lenses
* - **Representation theory**
  - Symmetries
  - Crystal optics, polarization
```

### Connections to Other Physics

**Quantum Mechanics**: Matrix methods in optics directly parallel quantum mechanical operators acting on state vectors.

**Classical Mechanics**: ABCD matrices are analogous to transfer matrices in mechanical vibrations and electrical circuits.

**Signal Processing**: Jones matrices operate on complex signals just like digital filters operate on electronic signals.

### Practical Benefits

```{note} Why Learn Matrix Methods?
**Design**: Systematic approach to complex optical systems
**Analysis**: Reveal system properties (stability, bandwidth, etc.)
**Optimization**: Mathematical framework for improvement
**Simulation**: Direct computer implementation
**Insight**: Physical understanding through mathematical structure
```

## Practice Problems

### Basic Matrix Operations

```{note} Problem 1
:class: exercise

Calculate the following matrix products:

a) $\begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix}\begin{pmatrix} 1 & 4 \\ 2 & 1 \end{pmatrix}$

b) $\begin{pmatrix} 1 & 0 \\ -1/50 & 1 \end{pmatrix}\begin{pmatrix} 1 & 100 \\ 0 & 1 \end{pmatrix}$ (100 mm of free space followed by a 50 mm lens)

c) $\begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}^2$ (double rotation)
```

### Polarization Analysis

```{note} Problem 2
:class: exercise

Light is initially linearly polarized at 45° and passes through:
1. A quarter-wave plate with fast axis at 0°
2. A half-wave plate with fast axis at 22.5°
3. A linear polarizer at 60°

Find the final Jones vector and intensity (as a fraction of input).
```

### Ray Optics System

```{note} Problem 3
:class: exercise

A thick lens in air has material index $n$, axial thickness $t$, and signed
surface radii $R_1$ and $R_2$. Define the front and back surface powers
$P_1=(n-1)/R_1$ and $P_2=(1-n)/R_2$.

Find the ABCD matrix between the two vertex planes using the
$(y,\theta)^T$ ray-vector convention.
```

### System Design

```{note} Problem 4
:class: exercise

Design a 4f optical processor with an object plane one focal length before
the first lens and an image plane one focal length after the second, using:
- Input lens: f₁ = 200 mm
- Output lens: f₂ = 100 mm

a) Find all three propagation distances
b) Calculate the ABCD matrix from object plane to image plane
c) What is the lateral magnification?
d) What happens to the angular magnification?
```

## Solutions to Practice Problems

```{note} Solution to Problem 1
:class: dropdown

a) $\begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix}\begin{pmatrix} 1 & 4 \\ 2 & 1 \end{pmatrix} = \begin{pmatrix} 4 & 9 \\ 6 & 3 \end{pmatrix}$

b) $\begin{pmatrix} 1 & 0 \\ -1/50 & 1 \end{pmatrix}\begin{pmatrix} 1 & 100 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 & 100 \\ -1/50 & -1 \end{pmatrix}$

c) $\begin{pmatrix} \cos 2\theta & -\sin 2\theta \\ \sin 2\theta & \cos 2\theta \end{pmatrix}$ (rotation by $2\theta$)
```

```{note} Solution to Problem 2
:class: dropdown

For unit input amplitude, $\mathbf E_{\rm in}=(1,1)^T/\sqrt2$.
The quarter-wave plate gives $\mathbf E_1=(1,i)^T/\sqrt2$.
The half-wave plate has matrix

$$\mathbf H_{22.5°}=\frac1{\sqrt2}
\begin{pmatrix}1&1\\1&-1\end{pmatrix},\qquad
\mathbf E_2=\frac12\begin{pmatrix}1+i\\1-i\end{pmatrix}.$$

The final polarizer transmits along
$\mathbf p=(1/2,\sqrt3/2)^T$, so

$$\mathbf E_{\rm out}
=\mathbf p(\mathbf p^T\mathbf E_2)
=\frac{(1+\sqrt3)+i(1-\sqrt3)}4
\begin{pmatrix}1/2\\\sqrt3/2\end{pmatrix}.$$

The transmitted intensity fraction is
$|\mathbf p^T\mathbf E_2|^2=1/2$.
```

```{note} Solution to Problem 3
:class: dropdown

The interface matrix in $(y,\theta)^T$ coordinates is
$\begin{pmatrix}1&0\\-(n_2-n_1)/(n_2R)&n_1/n_2\end{pmatrix}$.
Thus

$$\mathbf M
=\underbrace{\begin{pmatrix}1&0\\-P_2&n\end{pmatrix}}_{\rm back}
\underbrace{\begin{pmatrix}1&t\\0&1\end{pmatrix}}_{\rm glass}
\underbrace{\begin{pmatrix}1&0\\-P_1/n&1/n\end{pmatrix}}_{\rm front}
=\begin{pmatrix}
1-tP_1/n&t/n\\
-P_1-P_2+tP_1P_2/n&1-tP_2/n
\end{pmatrix}.$$

The determinant is one because the exterior medium is air on both sides.
```

```{note} Solution to Problem 4
:class: dropdown

a) The object plane is 200 mm before lens 1, the lenses are 300 mm apart,
and the image plane is 100 mm after lens 2.

b) With $\mathbf D(d)=\begin{pmatrix}1&d\\0&1\end{pmatrix}$ and
$\mathbf L(f)=\begin{pmatrix}1&0\\-1/f&1\end{pmatrix}$,

$$\mathbf M=\mathbf D(100)\mathbf L(100)\mathbf D(300)
\mathbf L(200)\mathbf D(200)
=\begin{pmatrix}-1/2&0\\0&-2\end{pmatrix}.$$

c) Since $B=0$ in this $(y,\theta)^T$ convention, the two planes are
conjugate and the lateral magnification is $A=-f_2/f_1=-0.5$.

d) The angular magnification is $D=-f_1/f_2=-2$.
```

## Final Thoughts: The Elegance of Linear Algebra in Physics

Matrix multiplication reveals deep structural relationships in optics that would be nearly impossible to see otherwise. The mathematical framework doesn't just make calculations easier—it reveals the underlying symmetries and conservation laws that govern how light behaves.

> "Mathematics is the language with which God has written the universe."
>
> — Galileo Galilei

As you continue studying optics, you'll discover that matrix methods appear everywhere: from the simplest polarizer to the most sophisticated laser system. The investment in understanding these mathematical tools pays dividends throughout your career in optics and photonics.

```{note}
:class: tip

**Tip:** **Developing Matrix Intuition**: The key to mastering matrix methods is developing physical intuition for what each mathematical operation means:
- Matrix multiplication = sequential operations
- Matrix inverse = reverse operation
- Determinant = scaling factor
- Trace = system characteristic

With practice, you'll begin to "think in matrices" when analyzing optical systems, making complex designs seem surprisingly manageable.
```

Matrix multiplication in optics is more than a computational tool—it's a window into the mathematical structure of the electromagnetic world. Master these methods, and you'll have one of the most powerful techniques in all of physics at your command.
