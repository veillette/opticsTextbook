(appendixVR)=
# Vectorrekening
Hieronder geldt dat $\mathbf{A}$, $\mathbf{B}$ $\mathbf{C}$, en $\mathbf{D}$ vectorvelden zijn (of constante vectoren) en $\phi$ en $\psi$
zijn scalaire functies. Dan:

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
waarin $\Delta = \partial^2/\partial x^2 + \partial^2/\partial y^2
+
\partial^2/\partial z^2$ op voorwaarde dat $(x,y,z)$ een orthonormale basis is.


```{math}
:label: eq.VR11
\begin{align*}
\mathbf{\nabla} \times \mathbf{\nabla} \times \mathbf{A}= - \Delta \mathbf{A}
+ \mathbf{\nabla} \mathbf{\nabla} \cdot \mathbf{A}.
\end{align*}
```
*Opmerking*: De laatste formule is alleen geldig in een Cartesiaanse coördinatenstelsel. Dit betekent dat het vectorveld $\mathbf{A}$
moet worden ontleed op de cartesiaanse basis en de afgeleiden moeten worden berekend ten opzichte van de corresponderende cartesische coördinaten en dan moet $\Delta \mathbf{A}$ component-voor-component worden geïnterpreteerd: $\Delta \mathbf{A}$= ($\Delta A_x$, $\Delta
A_y$, $\Delta A_z)^{T}$, waarbij $A_x, A_y, A_z$ componenten zijn met met betrekking tot de Cartesiaanse basis. De formule houdt *geen* stand in cilindrische of bolvormige coördinaten!.


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
 Daarnaast gelden de volgende integraalstellingen
($V$ is een volume met een oppervlakte $S$ en *naar buiten gericht* eenheid normaal
$\mathbf{n}$.

*Stelling van Gauss* (of divergentiestelling):

```{math}
:label: eq.VR14
\begin{align*}
\int\!\!\int\!\!\int_{V} \, \mathbf{\nabla} \cdot \mathbf{A} \, dV =
\int\!\!\int_{S} \, \mathbf{A}\cdot \mathbf{n} \, dS.
\end{align*}
```
 Pas dit toe op het vectorveld $\mathbf{A} = \phi
\mathbf{\nabla} \psi$. Vanwege {eq}`eq.VR4` en {eq}`eq.VR10` geldt dat
$\mathbf{\nabla}\cdot \mathbf{A}= \phi \Delta \psi + \mathbf{\nabla} \cdot \mathbf{\nabla}
\psi$ en dus: (*Stelling van Green*):

```{math}
:label: eq.VR15
\begin{align*}
\int\!\!\int\!\!\int_{V}\, \phi \Delta \psi + \mathbf{\nabla} \phi \cdot \mathbf{\nabla} \psi \, dV=
\int\!\!\int_{S} \, \phi \frac{\partial \psi }{\partial n} \, dS.
\end{align*}
```

Door de analoge relatie af te trekken van {eq}`eq.VR15` met
$\phi$ en $\psi$ verwisseld, krijgt men:

```{math}
:label: eq.VR16
\begin{align*}
\int\!\!\int\!\!\int_{V} \, \phi \Delta \psi - \psi \Delta \phi \, dV=
\int\!\!\int_{S} \, \phi \frac{\partial \psi }{\partial n} -
\psi \frac{\partial \phi}{\partial n} \, dS.
\end{align*}
```

Door gebruik te maken van {eq}`eq.VR7` en de stelling van Gauss volgt verder dat

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
waar we aan de rechterkant
{eq}`eq.VR1` hebben gebruikt.

*Stelling van Stokes* ($S$ is een mogelijk gekromd oppervlak met contour $C$):

```{math}
:label: eq.VR17
\begin{align*}
\int\!\!\int_{S}\, \mathbf{\nabla} \times \mathbf{A} \cdot \mathbf{n} \, dS =
\int_C \, \mathbf{A} \cdot d \mathbf{s},
\end{align*}
```
waarin $\mathbf{n}$ het eenheidsvectorveld is dat loodrecht staat op
$S$, dat is in de richting waarin een rechtshandige kurkentrekker wijst als het in de positieve richting van de lijnintegraal over $C$ wordt gedraaid.

Er is ook een analoog van de stelling van Green voor de rotatieoperator:

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

