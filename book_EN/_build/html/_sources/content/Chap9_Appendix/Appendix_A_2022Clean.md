(appendixVR)=
# Vector Calculus
 Below, $\mathbf{A}$, $\mathbf{B}$ $\mathbf{C}$, and $\mathbf{D}$ are vector fields (or constant vectors) and $\phi$ and $\psi$
are scalar functions. Then:

```{math}
:label: eq.VR1
\begin{align*}
\mathbf{A}\cdot (\mathbf{B}\times\mathbf{C}) = \mathbf{B}\cdot (\mathbf{C}\times \mathbf{A}) =
\mathbf{C} \cdot ( \mathbf{A}\times \mathbf{B}).
\end{align*}
```

```{math}
:label: eq.VR2
\begin{align*}
\mathbf{A}\times (\mathbf{B}\times \mathbf{C}) = (\mathbf{A}\cdot \mathbf{C}) \mathbf{B}
- (\mathbf{A}\cdot \mathbf{B}) \mathbf{C}.
\end{align*}
```

```{math}
:label: eq.VR3
\begin{align*}
(\mathbf{A}\times \mathbf{B})\cdot (\mathbf{C} \times \mathbf{D})
= (\mathbf{A}\cdot \mathbf{C}) (\mathbf{B}\cdot \mathbf{D})
- (\mathbf{A}\cdot \mathbf{D}) (\mathbf{B}\cdot \mathbf{C})
\end{align*}
```

```{math}
:label: eq.VR4
\begin{align*}
\mathbf{\nabla} \cdot (\phi \mathbf{A}) = \phi \mathbf{\nabla}\cdot \mathbf{A} + \nabla \phi \cdot \mathbf{A}.
\end{align*}
```

```{math}
:label: eq.VR5
\begin{align*}
\mathbf{\nabla} \times (\phi \mathbf{A}) = \phi \mathbf{\nabla} \times \mathbf{A} + \nabla \phi \times \mathbf{A}.
\end{align*}
```

```{math}
:label: eq.VR7
\begin{align*}
\mathbf{\nabla} \cdot (\mathbf{A}\times \mathbf{B}) = - \mathbf{A}\cdot \mathbf{\nabla} \times \mathbf{B} +
\mathbf{B} \cdot \mathbf{\nabla} \times \mathbf{A}.
\end{align*}
```

```{math}
:label: eq.VR8
\begin{align*}
\mathbf{\nabla} \times (\mathbf{A}\times \mathbf{B}) = - (\mathbf{A}\cdot \mathbf{\nabla}) \mathbf{B}
+ \mathbf{A} \mathbf{\nabla} \cdot \mathbf{B}
+ ( \mathbf{B} \cdot \mathbf{\nabla}) \mathbf{A}
- \mathbf{B} \mathbf{\nabla} \cdot \mathbf{A}.
\end{align*}
```

```{math}
:label: eq.VR9
\begin{align*}
\mathbf{\nabla} (\mathbf{A}\cdot \mathbf{B}) = (\mathbf{A}\cdot \mathbf{\nabla}) \mathbf{B}
+ \mathbf{A} \times \mathbf{\nabla} \times \mathbf{B}
+ ( \mathbf{B} \cdot \mathbf{\nabla}) \mathbf{A}
+ \mathbf{B} \times \mathbf{\nabla} \times \mathbf{A}.
\end{align*}
```

```{math}
:label: eq.VR10
\begin{align*}
\mathbf{\nabla} \cdot \mathbf{\nabla} \phi = \Delta \phi,
\end{align*}
```
where $\Delta = \partial^2/\partial x^2 + \partial^2/\partial y^2
+
\partial^2/\partial z^2$ provided that $(x,y,z)$ is an orthonormal basis.


```{math}
:label: eq.VR11
\begin{align*}
\mathbf{\nabla} \times \mathbf{\nabla} \times \mathbf{A}= - \Delta \mathbf{A}
+ \mathbf{\nabla} \mathbf{\nabla} \cdot \mathbf{A}.
\end{align*}
```
*Remark*: The last formula is only valid in a Cartesian coordinate system. This means that the vector field $\mathbf{A}$
must be decomposed on the Cartesian basis and the derivatives must be computed with respect to the corresponding Cartesian coordinates and then $\Delta \mathbf{A}$ must be interpreted component-by-component: $\Delta \mathbf{A}$= ($\Delta A_x$, $\Delta
A_y$, $\Delta A_z)^{T}$, where $A_x, A_y, A_z$ are components with respect to the Cartesian basis. The formula does *not* hold in cylindrical or spherical coordinates!.


```{math}
:label: eq.VR12
\begin{align*}
\mathbf{\nabla} \times \mathbf{\nabla} \phi =0.
\end{align*}
```

```{math}
:label: eq.VR13
\begin{align*}
\mathbf{\nabla} \cdot (\mathbf{\nabla} \times \mathbf{A}) =0.
\end{align*}
```
 In addition, the following integral theorems apply
($V$ is a volume with surface area $S$ and *outward* unit normal
$\mathbf{n}$).

*Gauss's Theorem* (or divergence theorem):

```{math}
:label: eq.VR14
\begin{align*}
\int\!\!\int\!\!\int_{V} \, \mathbf{\nabla} \cdot \mathbf{A} \, dV =
\int\!\!\int_{S} \, \mathbf{A}\cdot \mathbf{n} \, dS.
\end{align*}
```
 Apply this to the vector field $\mathbf{A} = \phi
\mathbf{\nabla} \psi$. Because of {eq}`eq.VR4` and {eq}`eq.VR10` holds
$\mathbf{\nabla}\cdot \mathbf{A}= \phi \Delta \psi + \mathbf{\nabla} \cdot \mathbf{\nabla}
\psi$ and thus (*Green's Theorem*):

```{math}
:label: eq.VR15
\begin{align*}
\int\!\!\int\!\!\int_{V}\, \phi \Delta \psi + \mathbf{\nabla} \phi \cdot \mathbf{\nabla} \psi \, dV=
\int\!\!\int_{S} \, \phi \frac{\partial \psi }{\partial n} \, dS.
\end{align*}
```

By subtracting the analogous relation from {eq}`eq.VR15` with
$\phi$ and $\psi$ interchanged, one gets:

```{math}
:label: eq.VR16
\begin{align*}
\int\!\!\int\!\!\int_{V} \, \phi \Delta \psi - \psi \Delta \phi \, dV=
\int\!\!\int_{S} \, \phi \frac{\partial \psi }{\partial n} -
\psi \frac{\partial \phi}{\partial n} \, dS.
\end{align*}
```

By using {eq}`eq.VR7` and Gauss's theorem it follows furthermore that

```{math}
:label: eq.VR16b
\begin{align*}
\int\!\!\int\!\!\int_{V} \mathbf{B}\cdot \mathbf{\nabla} \times \mathbf{A} dV-
\int\!\!\int\!\!\int_{V} \mathbf{A}\cdot \mathbf{\nabla} \times \mathbf{B} dV&=
\int\!\!\int_{S} \, \mathbf{n}\dot (\mathbf{A}\times \mathbf{B}) \, dS  \\
&=
\int\!\!\int_{S} \, (\mathbf{n} \times \mathbf{A})\cdot \mathbf{B}) \, dS  \\
&=
\int\!\!\int_{S} \,\mathbf{A}\cdot (\mathbf{n} \times \mathbf{B}) \, dS,
\end{align*}
```
where in the right-hand side we used
{eq}`eq.VR1`.

*Stokes' Theorem* ($S$ is a possibly curved surface with contour $C$):

```{math}
:label: eq.VR17
\begin{align*}
\int\!\!\int_{S}\, \mathbf{\nabla} \times \mathbf{A} \cdot \mathbf{n} \, dS =
\int_C \, \mathbf{A} \cdot d \mathbf{s},
\end{align*}
```
where $\mathbf{n}$ is the unit vector field that is perpendicular to
$S$, which is in the direction to which a right-handed corkscrew points if it is rotated in the positive direction of the line integral along $C$.

There is also an analogue of Green's Theorem for the curl operator:

```{math}
:label: eq.VR18
\begin{align*}
\int\!\int\!\int_V \mathbf{\nabla} \times \mathbf{A} \cdot \mathbf{B} \,
dS - \int\!\int\!\int_V \mathbf{A} \cdot \mathbf{\nabla} \times
\mathbf{B} \, dS = \int\!\int_S \left(\mathbf{n}\times
\mathbf{A} \right) \cdot \mathbf{B}\, dS = -\int\!\int_S
\mathbf{A} \cdot \left(\mathbf{n}\times \mathbf{B} \right) \,
dS.
\end{align*}
```

%