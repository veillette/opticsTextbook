# Problems

**Problem 6.1** Michelson interferometer.

**(a)** A Michelson interferometer is illuminated with monochromatic light. One of its mirrors is moved 2.53 $\times10^{-5}$ m, and it is observed that 92 complete bright-to-bright fringe cycles pass a fixed point on the screen. Determine the wavelength of the incident beam.

**(b)** Suppose that for the wavelength determined in part (a), fringes lose appreciable visibility after the mirror has moved far enough for 23 bright-to-bright cycles to pass a fixed point, starting at zero arm-length difference. Estimate the coherence length and coherence time using this visibility threshold.


**Problem 6.2** Two sources.

**(a)** Suppose the two sources
$S_1$ and $S_2$ are coherent and emit radio waves with a wavelength of 3 m. The two sources are in phase, and they are separated by 3 m. How far should an observer be directly in front of either source (along a perpendicular to $\overline{S_1S_2}$, see {numref}`fig:coh:ex51`), to encounter a minimum of irradiance?

```{figure} ../Images/06_14_1_sources.png
:name: fig:coh:ex51
:alt: Two radio sources separated horizontally by three meters, with an observer located along the perpendicular from one source.
Geometry for two-source interference problem. Two coherent radio wave sources S₁ and S₂ are separated by 3 m, and an observer is positioned at a perpendicular distance from the baseline connecting the sources. The path difference between waves from the two sources determines whether constructive or destructive interference occurs at the observation point.
```

**(b)** Now let the two sources be independent, equally bright, and quasi-monochromatic. Their separation is still $a=3$ m and the center wavelength is $\lambda=3$ m. Two observation points in a distant plane are separated by $b=6$ m, parallel to the source baseline. In the far-field approximation, find the **largest** source-to-observation-plane distance $z$ for which the modulus of their mutual degree of coherence is $0.866\approx\sqrt3/2$. State why smaller distances can also satisfy this visibility value.


**Problem 6.3** Reflection coating.

A thin, lossless planar film with an index of refraction of $n_2=1.5$ is immersed in air with $n_1=n_3=1$ as shown in {numref}`fig:coh:ex52`. A plane wave with a wavelength of $\lambda=632$ nm hits the film at an angle of incidence of $\theta_1=30$° with respect to the normal to the surface. Some of the light will reflect directly at the air-film interface, and some of the light will make one or several round trips through the film and then add to the directly reflected light. In this exercise we only consider the directly reflected light at the air-film interface and the light that makes one round trip inside the film.

```{figure} ../Images/06_15_2_planar_film.png
:name: fig:coh:ex52
:alt: Oblique light reaches a thin film in air; one ray reflects at the first surface and another after one round trip in the film.
Thin film illuminated by a plane wave.
```

**(a)** In the two-beam approximation, what is the smallest positive film thickness for a reflected maximum? The direct reflection at the air–film interface acquires a phase shift of $\pi$; reflection at the film–air interface does not.


**(b)** Calculate the phase difference between the two reflected beams when the film is 237 nm thick. Is this thickness closer to a reflected maximum or minimum?


**Problem 6.4** Let a point source $P$ be at $\mathbf{r}_p =(0,0,d)$ where $d>0$ is the distance to a mirror in the $z=0$ plane ({numref}`fig:coh:figEx53`).

```{figure} ../Images/06_16_3_point_source_mirror_bw.png
:name: fig:coh:figEx53
:alt: A point source at height d above a flat mirror and an observation point above the mirror.
A point source $P$ above a perfect mirror.
```


The point source emits a time-harmonic field with complex amplitude at a point $\mathbf{r}=(x,y,z)$ given by

```{math}
\begin{align*}
U_{p}(\mathbf{r}) = \frac{e^{i k \sqrt{x^2 + y^2 + (z-d)^2}}}{\sqrt{ x^2 + y^2 + (z-d)^2}}.
\end{align*}
```
Assume that the mirror is perfect, i.e. the total field on the mirror surface vanishes: $U_{total}(x,y,0)=0$.

**(a)** Derive the formula for the reflected and the total field at an arbitrary point $\mathbf{r}=(x,y,z)$ with $z>0$.

**(b)** What is the total intensity at an arbitrary point $\mathbf{r}$?

**(c)** Compute the intensity on the $z$-axis for $0\leq z \leq d$. What is the spatial period of the oscillating interference term? At which $z$ does the intensity vanish? Exclude the singular source point $z=d$.

**(d)** Derive the intensity for $x=y=0$ and $z>d$.
Show that for very large $z$ the leading $1/z^2$ intensity term vanishes when $d=m\lambda/2$ for positive integers $m$. Where does that leading term attain its maxima?

**(e)** Suppose that the coherence time of the field radiated by the point source is $\tau_c$. Along the $z$-axis beyond the source, what delay separates the direct and reflected fields? Under what condition on $d$ and an operational coherence time $\tau_c$ will their fringe visibility be negligible? Give the resulting incoherent intensity on that axis.


**Problem 6.5** Two independent sources and two pinholes.

Two equally bright, independent, quasi-monochromatic point sources $S_1$ and $S_2$ of center wavelength $\lambda$ are separated transversely by $a$. Their bandwidth is narrow enough that path delays in this problem are much smaller than the coherence time. A first screen at distance $z_1\gg a,b$ contains two identical pinholes $P_1$ and $P_2$ separated by $b$ parallel to the source baseline. An observation screen lies a Fraunhofer distance $z_2$ beyond the pinholes.

```{figure} ../Images/06_17_extended_source_2pinhole.png
:name: fig:coh:extendedSource
:alt: Two separated source points illuminate a pair of pinholes; light from the pinholes overlaps on a distant observation screen.

The two-source, two-pinhole geometry.
```

**(a)** Show that the mutual degree of coherence at the pinholes is $\gamma_{12}(0)=\cos(\pi ab/(\lambda z_1))$, up to a phase set by the coordinate origin.

**(b)** For equal intensities through the two pinholes, what is the fringe visibility on the observation screen?

**(c)** What happens to the visibility if one source is switched off? What happens to the two-pinhole fringe pattern if one pinhole is closed?

**(d)** Within the first visibility lobe, how does increasing $z_1$ affect visibility? How does changing $z_2$ affect the fringe spacing $\Delta x$ in the paraxial approximation?

**Problem 6.6** Fabry–Perot interferometer.

A lossless, symmetric Fabry–Perot etalon is in air at normal incidence. Its mirror separation is $d=1.00$ mm, and each mirror has power reflectance $\mathcal R=0.90$. Consider a vacuum wavelength $\lambda_0=500$ nm and neglect dispersion.

**(a)** Find the resonance order $m$ nearest this wavelength and the coefficient of finesse $F$.

**(b)** Estimate the finesse $\mathcal F$, the frequency free spectral range, and the frequency full width at half maximum.

**(c)** Estimate the wavelength resolving power $\lambda_0/\Delta\lambda_0$. Explain why the resolving power and the free spectral range change in opposite directions when $d$ is increased at fixed reflectance.
