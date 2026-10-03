# Problems

**Problem 11.1. Principal planes for a thick lens.**


In this problem the transfer matrix for a thick lens is derived. By finding the positions of the principal planes, you will derive that the transfer matrix has the same form as for a thin lens when object, image and focal distances are measured with respect to principal planes.


The transfer matrices which you should use are those for refraction through a spherical interface between two media with refractive indices $n$, $n'$
to the left and right of the interface, respectively, and with radius of curvature $R$:

$$
{\cal S} = \left(
\begin{array}{cc}1 & -k \\0 & 1
\end{array}\right)
$$

where
$k=(n'-n)/R$, and the matrix ${\cal M}_d$ for propagation through a medium with refractive index $n$ over a distance $d$.

Consider a thick lens made of a glass of refractive index $n$ with thickness $d$. For paraxial rays, the thickness can be identified with the distance between the vertices $V_1$ and $V_2$ of the surfaces of the lens.

```{figure} ../Images/11_01_thick_lens.png
:name: fig:ray:thicklens1
:alt: Cross-section of a thick biconvex lens in air with front and back vertices V1 and V2, thickness d, and signed surface radii R1 and R2.
Thick lens geometry showing the two curved surfaces with vertices V₁ and V₂ separated by thickness d. The lens has refractive index n and is surrounded by air, with radii of curvature R₁ and R₂ for the left and right surfaces respectively.
```


**(a)** Derive that the transfer matrix between the surfaces through the two vertices of the thick lens is given by:

```{math}
:label: eq:ray:thickLensVertexMatrix
\begin{align*}
{\cal L}_{V_2V_1} =
\left( \begin{array}{cc}1 - k_2 \frac{d}{n} & -k_1 -k_2 + k_1 k_2 \frac{d}{n} \\\frac{d}{n} & 1-k_1 \frac{d}{n}
\end{array}\right)
\end{align*}
```
where $k_1= (n-1)/R_1$ and $k_2= (1-n)/R_2$


**(b)** Show that for $d=0$ the transfer matrix is identical to that for a thin lens given by
  {eq}`eq:ray:thinLensMatrix`.


The thick-lens section of this chapter defines the primary and secondary principal planes. Let $T_1$ be the signed distance from the first principal plane ${\cal H}_1$ to vertex $V_1$, and $T_2$ the signed distance from vertex $V_2$ to the second principal plane ${\cal H}_2$, as shown in {numref}`fig:ray:thicklens2`. Thus $T_1>0$ when ${\cal H}_1$ is left of $V_1$, and $T_2>0$ when ${\cal H}_2$ is right of $V_2$.

```{figure} ../Images/11_02_thick_lens.png
:name: fig:ray:thicklens2
:alt: Thick lens with principal planes H1 and H2 marked relative to vertices V1 and V2; T1 and T2 denote their signed offsets.
Thick lens with principal planes.
```


The transformation of a ray from the primary principal plane ${\cal H}_1$ to the secondary principal plane ${\cal H}_2$ is:

```{math}
:label: eq:ray:principalPlaneTransform
\left( \begin{array}{c}\alpha_2 \\y_2
\end{array}\right) = {\cal L}_{{\cal H}_2{\cal H}_1} \left( \begin{array}{c}\alpha_1 \\y_1
\end{array}\right),
```

where

```{math}
\begin{align*}
{\cal L}_{{\cal H}_2{\cal H}_1} = {\cal M}_{ T_2} {\cal L}_{V_2 V_1} {\cal M}_{T_1},
\end{align*}
```

**(c)** By using the following abbreviation for the matrix {eq}`eq:ray:thickLensVertexMatrix`:

```{math}
:label: eq:ray:matrixAbbreviation
\begin{align*}
\left( \begin{array}{cc}1 - k_2 \frac{d}{n} & -k_1 -k_2 + k_1 k_2 \frac{d}{n} \\\frac{d}{n} & 1-k_1 \frac{d}{n}
\end{array}\right) = \left(
\begin{array}{cc}a_{11} & a_{12} \\a_{21} & a_{22}
\end{array}\right),
\end{align*}
```
derive that:

```{math}
:label: eq:ray:principalPlaneMatrixExpanded
\begin{align*}
{\cal L}_{{\cal H}_2{\cal H}_1} = \left( \begin{array}{cc}a_{11} + T_1 a_{12} & \; a_{12} \\T_2 (a_{11} +T_1 a_{12}) + a_{21} + T_1 a_{22} & \; a_{22} + T_2 a_{12}
\end{array}\right)
\end{align*}
```

**(d)** The principal planes are conjugate (i.e. they are images of each other) with unit magnification. Derive from this fact that the locations of the principal planes are given by:


```{math}
\begin{align*}
T_2&=\frac{1-a_{22}}{a_{12} }\\
T_1&= \frac{1-a_{11}}{a_{12}}
\end{align*}
```


With the solutions for $T_1$ and $T_2$ the system matrix between the principal planes becomes:

```{math}
:label: eq:ray:principalPlaneMatrix
{\cal L}_{{\cal H}_2{\cal H}_1} = \left( \begin{array}{cc}1 & a_{12} \\0 & 1
\end{array}\right)
```

which has the same shape as the transfer matrix for a thin lens.

**(e)** Show that the signed image focal coordinate measured from ${\cal H}_2$ is $f_i=-1/a_{12}$ and the signed object focal coordinate measured from ${\cal H}_1$ is $f_o=1/a_{12}$. For a positive lens in air, both focal distances have magnitude $-1/a_{12}$.
