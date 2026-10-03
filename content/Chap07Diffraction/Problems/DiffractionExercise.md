# Problems

**Problem 7.1** Consider a radiating time-harmonic point source in $\mathbf{r}_1=(x_1,0,0)$. The complex field at the observation point $\mathbf{r}=(x,y,z)$, where $z>0$, is given by:

```{math}
\begin{align*}
U_1(x,y,z) = Q_1 \frac{e^{ik \sqrt{(x-x_1)^2 + y^2 + z^2}}}{\sqrt{(x-x_1)^2 + y^2 + z^2}}.
\end{align*}
```
where $Q_1$ is a given complex number whose modulus is proportional to the source strength.

**(a)** Derive that for fixed $x_1$ and sufficiently large $z>0$ such that the source-dependent phase $kx_1^2/(2z)$ is negligible, the field can be approximated by

```{math}
:label: eq:diff:farFieldApproximation
\begin{align*}
U_{1,far}(x,y,z) = Q_1 \frac{e^{ik z}}{z} e^{i k\frac{x^2+ y^2}{2z}} e^{-i \frac{k x_1 x}{z}}.
\end{align*}
```


**(b)** Let there be a second point source at $\mathbf{r}_2=(x_2,0,0)$, with complex source strength $Q_2$ with
$|Q_2|=|Q_1|$. We assume that both point sources are coherent. This means that there is $\phi$ such that
$Q_2=Q_1 e^{i \phi}$.
Show that the field at $(x,y,z)$ for $z>0$ large due to the two point sources can be written as

```{math}
:label: eq:diff:twoPointSources
\begin{align*}
U(x,y,z) \approx U_{1,far}(x,y,z)\left( 1 + e^{i\phi} e^{i \frac{k \Delta x x}{z}} \right),
\end{align*}
```
where $\Delta x = x_1-x_2$.

**(c)** For which small angles $\theta\simeq x/z$ does the far-field intensity vanish? Show that the distance between the point sources $\Delta x$ can be determined from the angular separation of the zeros of the intensity. Does the angular separation depend on the phase difference $\phi$?

**(d)** What should be the phase difference between the point sources such that for $x/z=0$ on the screen at large distance $z$ the intensity vanishes?

**Problem 7.2** Consider two slits of equal width $a$ in a non-transparent screen of thickness $d$ in the plane $z=0$ as shown in {numref}`fig:diff:twoSlits`. The screen is illuminated by a plane wave with unit amplitude and propagating in the positive $z$-direction.
In the second slit there is a piece of glass with refractive index $n$ and thickness $d$.
In the first slit there is vacuum. Neglect interface reflections, absorption, and the small lateral displacement inside the glass; treat it as an ideal phase-only insert.

```{figure} ../Images/07_24_01_two_slits_glass.png
:alt: Two equal slits separated by b in an opaque screen, one containing glass, with diffracted light measured to the right.
:name: fig:diff:twoSlits
Two slits with centers separated along $x$ and long sides parallel to $y$ in a dark screen of thickness $d$. The lower slit is filled with glass, the upper is in vacuum.
```

**(a)** If the field immediately behind slit 1 has complex amplitude equal to $1$, explain that the field immediately behind slit 2 is given by

```{math}
\begin{align*}
e^{ i \phi}
\end{align*}
```
with
$\phi=k_0(n-1)d$, where $k_0=2\pi/\lambda_0$ is the vacuum wave number.

**(b)** Derive (using {eq}`eq:diff:farFieldApproximation` or in another way)
  that the Fraunhofer intensity pattern on a screen along the line $y=0$
at large distance $z$ is given by (up to factors that do not depend on $x/z$).

```{math}
:label: eq:diff:twoSlitsIntensity
\begin{align*}
I_{far}(x,0,z) = 2 \frac{a^2}{z^2} \left[ \frac{\sin \left(\frac{kax}{2z}\right)}{\frac{kax}{2z}}\right]^2 \left[ 1 + \cos\left( \frac{k b x}{z} +\phi\right)\right].
\end{align*}
```
In deriving this result you may omit all factors that are independent of $x/z$ and $y/z$.
If you use {eq}`eq:diff:twoPointSources` you may
take $Q_1=1$, $Q_2=e^{i \phi}$.

**(c)** Make a sketch of this intensity pattern, showing the zeros and maxima as a function of $\theta=x/z$ when $a=2 \lambda$,
$b=4 \lambda$ and $\phi=-\pi/2$. Explain where the envelope and the other factor that depends on $x/z$ are caused by.


**Problem 7.3** We consider the optical set-up shown at the left of {numref}`fig:diff:lloydMirror` where a point source at point $\mathbf{r}_s=(a, 0,0)$ is above a plane mirror in the plane $x=0$.
The time-harmonic field emitted by the point source **without the mirror being present** is in complex notation given by:

```{math}
\begin{align*}
U_s(x,y,z,t)= \frac{e^{i k \sqrt{ (x-a)^2 + y^2 + z^2}-i \omega t}}{\sqrt{(x-a)^2 + y^2 + z^2}}.
\end{align*}
```

```{figure} ../Images/07_25_02_lloyd_mirror.png
:alt: A source and an aperture above a horizontal mirror each send direct and reflected light to a distant screen.
:name: fig:diff:lloydMirror
Lloyd mirror configuration with a point source (left) and a rectangular aperture in a dark screen (right), above a mirror and with a screen at distance $z$ where the field is observed.
```

**(a)** Let $U_r$ be the field reflected by the mirror. Assume that the mirror is perfect so that the total field
$U_s(x,y,z)+U_r(x,y,z)$ is zero on the surface of the mirror, i.e. when $x=0$. Show that the reflected field $U_r$
can be considered to be emitted by a point source in $(-a,0,0)$, which is the image of the original point source by the mirror, and which is **out of phase** with the original point source and has the **same strength**.

**(b)** Consider the field on a screen at $z>0$. According to (a) the field in the presence of the mirror can be considered to be radiated by two point sources, namely at $(a,0,0)$ and $(-a,0,0)$, that are of equal strength and out of phase with each other. Assume that $z$ is so large that the spherical waves emitted by these point sources and arriving at the screen can both be considered to be plane waves. Derive that the point on the screen
$(x,0,z)$ with smallest $x>0$ where the field is zero is given by

```{math}
:label: eq:diff:lloydMirrorFirstZero
\begin{align*}
x= \frac{\lambda}{2a} z,
\end{align*}
```
where $\lambda$ is the wavelength. In your derivation use path length differences of interfering rays and make a drawing.

**(c)** What happens with this zero and with the fringe pattern on the screen when the perfect mirror is replaced by a dielectric such as a piece of glass?


**(d)** Suppose now that there is a second point source at $(2a,0,0)$ above the mirror and suppose that it has the same strength and is in phase with the point source in $(a,0,0)$.
Assume again that the mirror is perfectly reflecting and derive (again by considering path length differences and using a drawing) that the smallest $x>0$ for which a zero occurs at point $(x,0,z)$ on the screen is given by

```{math}
\begin{align*}
x= \frac{\lambda}{3a}z
\end{align*}
```

**(e)** Derive the smallest $x>0$ for which the field is zero at $(x,0,z)$ when the two point sources at $(a,0,0)$ and $(2a,0,0)$ are mutually incoherent. Use again path length differences and make a drawing.


**(f)** Next suppose that there is a square aperture with center at $(a,0,0)$ and sides of length $b<a$ parallel to the $x$- and $y$-directions in an opaque (i.e. dark) screen above the mirror as shown at the right of
{numref}`fig:diff:lloydMirror`. The aperture is illuminated by a plane wave that propagates parallel to the $z$-axis, hence the field in the aperture has constant phase and amplitude. Compute the smallest positive $x$ for which a zero occurs at $(x,0,z)$ on the screen at large distance $z>0$.
Use again path length differences and a drawing in your derivation.


**Problem 7.4** Note: to answer the following questions it is **NOT** necessary to compute diffraction integrals.

**(a)** Consider two equally strong point sources which with respect to a coordinate system $(x,y,z)$ are at $(-a/2,0,0)$ and $(a/2,0,0)$, where the $z$-axis is the optical axis. Suppose the point sources are mutually coherent, emit in phase, and have separation $a\gg\lambda$ so that the first zero is within the paraxial range. The maximum intensity on a screen at large (i.e. Fraunhofer) distance is then on the optical axis.
Show that the smallest angle with the optical axis at which there is a zero on this screen is given by $\lambda/(2a)$.

**(b)** What is the smallest angle with the optical axis at which there is a zero on the screen when the two point sources emit with phase difference $\pi/2$?


**(c)** Are there any zeros on the screen when the two point sources are mutually incoherent?


**(d)** Consider now two identical apertures in an opaque screen at $z=0$. One aperture has its center at $(-a/2,0,0)$ and the other has its center at $(a/2,0,0)$.
The apertures are illuminated by a time-harmonic plane wave at perpendicular incidence to the screen (i.e. propagating parallel to the $z$-axis).
Show that the two-aperture **interference factor** vanishes at $\theta\simeq\lambda/(2a)$, whatever their identical shape. Could zeros of the single-aperture envelope occur at smaller angles?

**(e)** Suppose that the plane wave is incident at some angle different from $90^o$. Let its complex field be given by

```{math}
\begin{align*}
U(x,z)= e^{i (k_x x + k_z z)}
\end{align*}
```
where $\sqrt{k_x^2+k_z^2}=k$. Suppose that $k_x a =\pi/2$ (modulo $2\pi$). Find the signed angle of the interference zero closest to the optical axis, assuming the single-aperture envelope does not vanish first. Explain how the oblique illumination shifts the pattern.

**(f)** Now imagine that both (identical) apertures are filled with glass plates with thickness that varies with position. The two glass plates are identical and they are identically positioned in each of the two apertures. Imagine that we illuminate the apertures with a plane wave at perpendicular incidence. The field transmitted by each aperture is now a rather complicated function of position, however the transmitted fields behind both apertures are identical. Does the two-aperture interference zero remain at $\theta\simeq\lambda/(2a)$, or do the identical glass plates shift it? What can change about the envelope? Explain your answer.


**Problem 7.5** Bessel beams.

Suppose there is a mask in the entrance pupil of radius $a$ of a positive thin lens with image focal length $f_i$ with a thin ring-shaped aperture at $r=b$ with width $\Delta r$. If a plane wave with amplitude $A$ is at perpendicular incidence on the mask, the field immediately behind the mask is given by

```{math}
\begin{align*}
U_{Bessel}(x,y)= \left\{ \begin{array}{l}A, \;\;\; \text{ if } b-\Delta r < \sqrt{x^2+y^2}<b, \\0, \;\;\; \text{ otherwise}
\end{array}\right.
\end{align*}
```

**(a)** Use the integral

```{math}
\begin{align*}
\int_0^{2\pi} e^{i \zeta \cos \psi} \mathrm{d}\psi = 2\pi J_0(\zeta).
\end{align*}
```
to derive that for sufficiently small $\Delta r$, the field in the focal plane, apart from the common lens-propagation prefactor and quadratic phase, is approximately

```{math}
\begin{align*}
U_{Bessel}(x,y,f_i)= 2\pi A b \Delta r J_0\left(k\frac{br}{f_i}\right).
\end{align*}
```

**(b)** The beam obtained this way is called a Bessel beam. Explain why this beam has a very long focal depth.

**(c)** In the thin-ring approximation $\Delta r\ll b$, suppose that a full circular pupil illuminated with unit amplitude and the ring pupil carry the same incident power. Show that then the amplitude of the Bessel beam is given by

```{math}
\begin{align*}
A = \frac{a}{\sqrt{2 b \Delta r}}
\end{align*}
```

**(d)** Derive that the ratio of the field amplitudes in the focal point of the Bessel beam: $U_{Bessel}(0,0,f_i)$ and the Airy spot: $U_{Airy}(0,0,f_i)$ is given by

```{math}
\begin{align*}
\frac{U_{Bessel}}{U_{Airy}} = \frac{\sqrt{2 b \Delta r}}{ a}.
\end{align*}
```
If $b=a$ and $\Delta r=0.1 a$ this becomes

```{math}
\begin{align*}
\frac{U_{Bessel }}{U_{Airy}} = \sqrt{\frac{2 \Delta r}{ a}} \approx 0.45,
\end{align*}
```
The finite ring in the plotted example gives about 0.44 when its exact area is used; the displayed formula uses the thin-ring approximation. This is the case shown in {numref}`fig:diff:figBesselplot`.

```{figure} ../Images/07_26_03_bessel_plot.png
:alt: Radial plot comparing an Airy central peak with a lower Bessel peak and stronger Bessel side lobes.
:name: fig:diff:figBesselplot
Amplitude in the focal plane of a Bessel beam and of an Airy spot with the same total energy. The lens pupil has radius $a=10000\lambda$, the ring aperture of the Bessel beam case is at the outer edge of the pupil ($b=a$) and has width $\Delta r = 0.1 a$ and the $\text{NA}=0.1$.
```

**(e)** The Bessel beam has stronger side lobes than the Airy spot. Explain the reason.


**Problem 7.6** Stellar interferometry.

Observe a star through a narrow spectral band centered at vacuum wavelength $\lambda$. Model it as a distant spatially incoherent source with angular brightness $B(\theta_x,\theta_y)$, where $(\theta_x,\theta_y)$ specifies the transverse propagation direction of light arriving at Earth. Assume paraxial propagation, negligible temporal decorrelation across the instrument paths, and equal collection efficiencies. Let two collectors have transverse positions $\mathbf r_1$ and $\mathbf r_2$ and baseline $\mathbf b=\mathbf r_1-\mathbf r_2$.

**(a)** Show that one source element at direction $\boldsymbol\theta=(\theta_x,\theta_y)$ contributes a plane-wave factor $\exp[i(2\pi/\lambda)\boldsymbol\theta\cdot\mathbf r]$ at collector position $\mathbf r$, apart from a common phase.

**(b)** Use the independence of different source elements to derive the mutual coherence
```{math}
\Gamma(\mathbf b)\propto
\iint B(\boldsymbol\theta)
e^{i(2\pi/\lambda)\mathbf b\cdot\boldsymbol\theta}
\,\mathrm d^2\boldsymbol\theta.
```
State the normalized complex visibility $V(\mathbf b)=\Gamma(\mathbf b)/\Gamma(\mathbf 0)$.

**(c)** If the two collected beams have equal mean intensity, how is the measured fringe contrast related to $|V(\mathbf b)|$? What additional phase information is needed to reconstruct an image from measurements at many baselines?

**(d)** Estimate the angular scale probed by a largest baseline $B_{\max}$. Explain why limited baseline coverage and measurement noise also affect the reconstructed image.
