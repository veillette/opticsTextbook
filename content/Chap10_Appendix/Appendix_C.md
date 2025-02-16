# About the Conservation of Electromagnetic Energy
We consider a time harmonic electric field that is more general than a plane wave (i.e. it is not necessarily a single plane wave but a superposition of plane waves with wave vectors with different directions). Let $V$ be a bounded volume with closed boundary $A$. The time averaged flux of electromagnetic energy through the boundary $A$ outwards from the volume is given by the surface integral

```{math}
:label: eq.defflux
\begin{align*}
F= \int\!\int \mathbf{S}(\mathbf{r}) \cdot \hat{\mathbf{n}} dA,
\end{align*}
```
where $\hat{\mathbf{n}}$ is the outwards pointing unit normal. We assume that there are no sources inside $V$. There are then two possibilities:
1. $F<0$. In this case there is a nonzero net flux into the volume. Because all fields are time harmonic, there can only be a net influx if electromagnetic energy is absorbed inside the volume. Hence the imaginary part of the permittivity must be positive. It can be shown that the time average of the absorbed power is given by

```{math}
:label: eq.abs
\begin{align*}
\text{Absorbed e.m. energy}=\frac{\omega}{2} \text{Im} (\epsilon) |\mathbf{E}(\mathbf{r})|^2 dV,
\end{align*}
```
where $\mathbf{E}(\mathbf{r})$ is the complex amplitude of the electric field at position $\mathbf{r}$.

2. $F=0$. In this case the net energy flow through the boundary is zero and hence the matter in the volume does not absorb.
