---
tags:
  - fiber-optics
  - advanced
  - applications
  - theory
downloads:
  - id: chapter-10-pdf
    title: Download Chapter PDF
  - id: chapter-10-docx
    title: Download Chapter DOCX
---

(chapter:fiber)=
# Fiber Optics

```{note} What you should know and be able to do after studying this chapter
- Have a basic understanding of the principles of fiber optics. You understand how light can be confined by total internal reflection and you know how optical fibers give rise to propagation modes. You can list the various dispersion and loss mechanisms that play a role in light propagation through fibers.
- Describe optical fibers using typical fiber parameters. You know the most important fiber types and connectors, along with their (dis)advantages.
- List important components that are typically found in optical fiber research setups and other applications and have a basic understanding of the working principles of these components.
- Name the main applications of fiber optics.
```

(sec:fiber:introFib)=
## Introduction to fiber optics

This chapter introduces the field of fiber optics. In comparison to free space optics considered so far, fibers confine light to a small volume, which prevents power loss by diffraction. As such, optical signals can propagate over large distances enabling, among others, fast and reliable communication all over the world.

In this chapter we will restrict ourselves to the cylindrical step-index fiber to confine light and to introduce fiber optics concepts. Such a fiber consists of a core (refractive index $n_1$) and a cladding (refractive index $n_2$, $n_2<n_1$) as shown in {numref}`fig:fiber:tir`. A single-mode silica communication fiber typically has a core diameter of several micrometres and a cladding diameter of about $125\ \mu\mathrm{m}$; a protective coating and jacket surround the glass. Other fiber types have different dimensions and are protected by a (reinforced) jacket around the cladding, as observed in the same figure.

```{figure} Images/10_01_step_index.png
:name: fig:fiber:tir
:alt: Longitudinal cutaway of a step-index fiber: a red ray reflects within a core of index n1, bounded by lower-index cladding n2 and an outer jacket; the right plot shows the step in refractive index.
Light ray transmission through a cylindrical step-index fiber. These fibers have a core, cladding and often a jacket. For $n_1>n_2$ total internal reflection may occur, such that the light remains confined to the fiber.
```

This chapter can be subdivided in three parts in which we move gradually from theory to application. Based on the step index fiber, this chapter first discusses light confinement by total internal reflection. Then, in {ref}`sec:fiber:modes`, the concept of modes of light propagating through an optical fiber is introduced. This gives rise to certain figures of merit and leads to the important distinction between ''single mode'' and ''multimode'' fibers, discussed in {ref}`sec:fiber:figuresMerit`. Although fiber optics has advantages over free space optics in terms of light propagation, propagation is not ideal. The effects and causes of dispersion and loss are therefore introduced and discussed in {ref}`sec:fiber:dispersion` and {ref}`sec:fiber:loss` respectively.

After this theoretical view on optical fibers, we zoom out a little to introduce various other fiber types in {ref}`sec:fiber:types`, since the step-index fiber is not the only implementation of optical fibers (although it is the most common). In {ref}`sec:fiber:connections`, we discuss how optical fibers can be connected to the outside world. What this outside world may consist of is briefly discussed in {ref}`sec:fiber:components`. This section introduces common fiber optic components used to manipulate light propagating through fibers enabling us to build useful setups and applications. Some of these applications are elaborated on in {ref}`sec:fiber:applications`. This section also provides an outlook in the possible directions the rich field of fiber optics is headed.

(sec:fiber:tir)=
## Total internal reflection

```{phet} bending-light
:screen: 2
:label: fig:fiber-tir-sim

A prism and interfaces with adjustable indices. Increase the angle of incidence past the critical angle and watch the transmitted ray vanish — total internal reflection, the confinement mechanism of the step-index fiber.
```

Let us first concern ourselves with the question of how light can be confined in fibers. This happens by total internal reflection (TIR), which can be well explained using ray optics. Typically, fibers have a silicon-oxide ($\text{SiO}_2$) cladding, whereas in the $\text{SiO}_2$ core small amounts of germanium-oxide ($\text{GeO}_2$) are ''dissolved''. This doping increases the index of refraction $n_1$ slightly, thus $n_1>n_2$, as in {numref}`fig:fiber:tir`. The step in refractive index $n_1-n_2$ is indeed small, in the order of $10^{-3}$.

Now consider Snell's law for the core-cladding boundary in {numref}`fig:fiber:tir`,
```{math}
\begin{align*}
n_1 \sin\left(\theta_{\text{i}}\right) = n_2 \sin\left(\theta_{\text{cl}}\right).
\end{align*}
```
For angles $\theta_{\text{i}}$ in excess of the angle $\theta_{\text{i,c}}=\arcsin(n_2/n_1)$ refraction no longer occurs (the maximum value of a sine is 1) and light is totally reflected back into the core. Therefore we will refer to $\theta_{\text{i,c}}$ as the internal critical angle. For meridional rays entering from air, only a limited external cone of directions is accepted; its half-angle is $\bar{\theta}_{\text{e,c}}$. This angle will be further discussed in {ref}`sec:fiber:figuresMerit`. For $\text{SiO}_2$, in which $n_2\approx 1.444$ at telecom wavelengths ($\lambda=1550~\text{nm}$), TIR occurs if $\theta_{\mathrm i}>85.7^{\circ}$ when the core has $n_1=1.448$. Because this $\theta_{\text{i}}$ is close to $90^{\circ}$, fibers with $n_1\approx n_2$ are also referred to as ''weakly guiding''.

Since the angle of reflection equals the angle of incidence upon reflection, TIR occurs at every core-cladding interface and the light remains confined to the core (strictly speaking, this argument only holds for straight fibers. The influence of bends in fibers is discussed in {ref}`sec:fiber:loss`). Because low-loss silica fibers can have attenuation of a few tenths of a decibel per kilometre,[^1] see {ref}`sec:fiber:loss`), this implies fibers can easily carry optical signals over distances in the order of several kilometers without considerable loss.

(sec:fiber:modes)=
## Fiber modes

Although some of the properties of optical fibers can be understood from ray optics, the exact propagation of light through fibers is described by Maxwell's equations. These give rise to guided modes: electromagnetic fields whose transverse pattern retains its shape while a phase factor accumulates along the fiber. All possible EM-fields in fibers can be described as a superposition of fiber modes, like a musical tone played by an instrument can be described using a superposition of a note and its overtones.

```{figure} Images/10_02_wavefront_mirror_waveguide.png
:name: fig:fiber:modesIntro
:alt: Red ray zigzags between two parallel mirrors separated by d; green wavefronts and points A and B mark paths used to determine allowed angles.
Wavefront transmission through a mirror waveguide. The transmission of light can be described using EM-field modes that only allow specific angles $\theta$.
```

To introduce the concept of fiber modes, we consider the planar mirror waveguide in {numref}`fig:fiber:modesIntro`. This waveguide consists of two (perfect) planar mirrors placed in the $(x,z)$-plane in vacuum at positions $y=\pm d/2$ (hence their separation is $d$). Monochromatic light rays with wavelength $\lambda_0$ enter the waveguide under an angle $\bar{\theta}$. They propagate through the waveguide while constantly bouncing back and forth between the mirrors. This waveguide is a simplification of the optical fibers we are considering in this chapter, but it is more straightforward to study. Modes in optical fibers follow from the same considerations and the necessary generalizations are touched upon toward the end of this section.

In order for a light ray to represent a mode, we impose a self-consistency condition that guarantees the invariance of distribution and polarization under propagation. In practice, this boils down to the wave repeating itself after every second bounce. With reference to {numref}`fig:fiber:modesIntro`, the self-consistency condition thus imposes that the phase acquired by the reflected wave traveling from A to C equals the phase acquired by the ''non-reflected'' wave traveling from A to the virtual point B up to an integer multiple of $2\pi$. Of course, as the mirrors are considered perfect, both reflections add a phase shift of $\pi$, such that
```{math}
\begin{align*}
\Delta\phi=\frac{2\pi |AC|}{\lambda_0}-2\pi-\frac{2\pi |AB|}{\lambda_0}=2\pi q,\quad q=0,1,2,\dots
\end{align*}
```
or
```{math}
\begin{align*}
\frac{2\pi(|AC|-|AB|)}{\lambda_0}=2\pi m,\quad m=q+1,\quad m=1,2,3,\dots.
\end{align*}
```
Using elementary geometry and the relation $\cos(2\bar{\theta})=1-2\sin^2(\bar{\theta})$, it can be shown that $|AC|-|AB|=2d\sin(\bar{\theta})$ and thus the self-consistency condition becomes
```{math}
:label: eq:fiber:selfConsistencyCondition
\begin{align*}
	\sin(\bar{\theta}_m)=m\frac{\lambda_0}{2d}.
\end{align*}
```

We thus find that only certain bouncing angles $\bar{\theta}_m$ are allowed by
the self-consistency condition and these are referred to as the $m$ modes of
propagation. From {eq}`eq:fiber:selfConsistencyCondition` we can draw the
important conclusion that the number of modes in the waveguide is limited,
because $\max(\sin(\bar{\theta}_m))=1$. This implies that:
- the maximum number of modes $M$ possibly propagating through the waveguide equals
```{math}
\begin{align*}
M=\left\lceil\frac{2d}{\lambda_0}\right\rceil-1,
\end{align*}
```
where $M$ counts the positive integers $m$ for which $m\lambda_0/(2d)<1$. Away from an exact cutoff, this equals $\lfloor2d/\lambda_0\rfloor$; at cutoff, the mode has no forward propagation;
- for $M=1$, the waveguide is a single mode waveguide, and if $M>1$ the waveguide is said to be multimode;
- if $M=0$, this particular $x$-polarized mirror-waveguide family has no forward-propagating mode. Its lowest-order cutoff is $\lambda_{\mathrm{c}}=2d$; the statement does not apply to every possible polarization of a parallel-plate waveguide.

To obtain the field distributions of the EM-fields propagating through the waveguide, consider a wave propagating along the waveguide in $z$-direction, which is polarized in $x$-direction. It should be realized that such a wave actually consists of two superposed waves, one in the upward and one in the downward direction due to internal reflection of the wave fronts, see {numref}`fig:fiber:mirrorModes`. In case the up-propagating wave is described by
```{math}
\begin{align*}
E_{\text{up}}=A_m\exp(-ik_{y,m}y-ik_{z,m}z),
\end{align*}
```
the down-propagating wave is described by
```{math}
:label: eq:fiber:downPropagatingWave
\begin{align*}
	E_{\text{down}}=A_m\exp(i[m-1]\pi)\exp(+ik_{y,m}y-ik_{z,m}z).
\end{align*}
```

Here, the wavenumbers are $k_{y,m}=2\pi\sin(\theta_m)/\lambda_0$ and $k_{z,m}=2\pi\cos(\theta_m)/\lambda_0$. The phase shift in the down-propagating wave of $(m-1)\pi$ follows from the condition that after superposing the two fields, their magnitude at the mirrors (at $y=\pm d/2$) should vanish[^2]. Therefore, the total field is of the form
```{math}
\begin{align*}
E_x(y,z)= E_{\text{up}}+E_{\text{down}}= E_0 u_m(y)\exp(-ik_{z,m}z)
\end{align*}
```
in which $E_0$ is the field's amplitude and the mode distributions are

```{math}
:label: eq:fiber:modeDistributions
\begin{align*}
u_m(y)=
\begin{cases}
\sqrt{\frac{2}{d}}\cos\left(\frac{m\pi}{d}y\right),& \text{if } m=1,3,5,\dots\\
\sqrt{\frac{2}{d}}\sin\left(\frac{m\pi}{d}y\right),& \text{if } m=2,4,6,\dots
\end{cases}
\end{align*}
```

The first few distributions are plotted in {numref}`fig:fiber:mirrorModes`; the mode index $m$ counts the transverse half-wave variations between the mirrors. The pre-factors $\sqrt{2/d}$ in {eq}`eq:fiber:modeDistributions` are chosen such that the functions are
orthonormal, meaning
```{math}
\begin{align*}
\int_{-d/2}^{d/2} u_i\cdot u_j\mathrm{d}y =
	\begin{cases}
		1,& \text{if } i=j\\
		0,& \text{otherwise.}
	\end{cases}
\end{align*}
```
In practice this implies that all possible light pulses transmitting through the waveguide can be written as a linear combination, or superposition, of modes. As stressed before, this is analogous to tones played by a musical instrument.

```{figure} Images/10_03_mode_waveguide.png
:name: fig:fiber:mirrorModes
:alt: Five blue transverse field profiles labeled mode 1 through 5 vanish at both parallel mirrors and add successive half-wave variations.
The first five modes ($m=1$ through $5$) in the mirror waveguide.
```

This concludes our discussion on fiber modes in the planar-mirror waveguide. To generalize this discussion to optical step-index fibers, two considerations are added. First, in optical fibers the EM-fields are not bounded by the core. Rather, the fields also extend partly into the cladding, where their amplitude diminishes rapidly, or evanescent. Second, a cylindrical fiber has angular structure as well as radial structure, illustrated schematically in {numref}`fig:fiber:circularSection` and by the field patterns in {numref}`fig:fiber:modes`. This implies fiber modes are labeled by two indices, generally $m$ (linear self-consistency) and $l$ (circumferential self-consistency). A selection of fiber mode field distributions is depicted in {numref}`fig:fiber:modes` (b). A distinction is made between single mode fibers (SMF) and multimode fibers (MMF). In the former only the $(m,l)=(1,0)$ mode can propagate, whereas the MMF supports more or even many modes.


```{figure} Images/10_04_circular_waveguide.png
:name: fig:fiber:circularSection
:alt: Circular cross-section with orange cladding around a white core; red ray segments trace a polygonal path near the core perimeter.
:width: 50%

Circular waveguide cross-section showing the cylindrical geometry of optical fibers. The circumferential self-consistency condition requires that light rays complete an integer number of cycles as they propagate around the fiber core.
```
```{figure} Images/10_05_modes3.png
:name: fig:fiber:modes
:alt: Twelve colored transverse field patterns arranged by angular index l and radial index m, from one central spot to multiple lobes and rings.
:width: 50%
Modes in step-index fibers. (a) Apart from the linear self-consistency condition, modes in optical fibers also follow from circumferential self-consistency. This imposes that rays representing a mode should bounce around the core an integer number of steps during one up-down cycle of the rays. (b) Collection of step-index fiber EM-field modes. $m$ represents the linear self-consistency condition and $l$ the circumferential self-consistency condition.
```

(sec:fiber:figuresMerit)=
## Fiber parameters

Optical fibers can be characterized by a number of parameters. Here we list a selection of these numbers.
- **$\Delta$-parameter** -- The $\Delta$-parameter is directly related to the relative difference in core and cladding refractive index, see {numref}`fig:fiber:tir`. It is defined as
```{math}
:label: eq:fiber:deltaParameter
\Delta=\frac{n_1^2-n_2^2}{2n_1^2}\approx \frac{n_1-n_2}{n_1}.
```
The approximation, which entails the relative difference of $n_1$ and $n_2$, holds for the weakly guiding fibers under consideration in this chapter. It follows from setting $n_2=n_1-\Delta n$ and neglecting terms of order $\Delta n^2$. For $n_1=1.448$ and $n_2=1.444$, the exact expression gives $\Delta\approx2.76\times10^{-3}$.
- **Numerical aperture (NA)** -- The NA relates the fiber and the (external) critical angle under which it accepts (or emits) light, $\bar{\theta}_{\text{e,c}}$. That is, the maximum value of $\bar{\theta}_{\text{e}}$ in {numref}`fig:fiber:tir` such that TIR occurs. The NA for fibers is defined as
```{math}
:label: eq:fiber:numericalAperture
\begin{align*}
	\mathrm{NA}=\sin\left(\bar{\theta}_{\text{e,c}}\right)=\sqrt{n_1^2-n_2^2}
\end{align*}
```
and equals approximately $0.108$ if $n_1=1.448$ and $n_2=1.444$. With reference to {numref}`fig:fiber:tir`, this follows from
```{math}
\begin{align*}
\sin\left(\bar{\theta}_{\text{e,c}}\right)&=n_1\sin\left(\bar{\theta}_{\text{i,c}}\right)\\
			&=n_1\sqrt{1-\cos^2\left(\bar{\theta}_{\text{i,c}}\right)}\\
			&=n_1\sqrt{1-\left(\frac{n_2}{n_1}\right)^2}\\
			&=\sqrt{n_1^2-n_2^2}
\end{align*}
```
in which we use $\bar{\theta}_{\text{i,c}}=\arccos(n_2/n_1)$, such that $\cos(\bar{\theta}_{\text{i,c}})=n_2/n_1$. This expression assumes an external medium with $n_{\mathrm e}=1$. In general $n_{\mathrm e}\sin\bar\theta_{\mathrm{e,c}}=\sqrt{n_1^2-n_2^2}$ for meridional rays.

- **$V$-number** – The $V$-number, or fiber parameter, governs the number of modes supported in the fiber. It is defined as
	```{math}
	:label: eq:fiber:vNumber
	\begin{align*}
		V=\frac{\pi d}{\lambda_0}\mathrm{NA}.
	\end{align*}
	```

	For step-index fibers, the number of modes is approximately equal to $M=V^2/2$ if $V\gg 1$. If $V<2.405$, only the fundamental spatial mode is supported and the fiber is referred to as an SMF. If $V>2.405$, the fiber is multimode.

- **higher-order-mode cutoff wavelength** – For an ideal step-index fiber, $V=2.405$ marks the cutoff of the first higher-order mode. Its corresponding vacuum wavelength is
```{math}
\begin{align*}
\lambda_{\mathrm c}=\frac{\pi d\,\mathrm{NA}}{2.405}\approx1.31d\,\mathrm{NA}.
\end{align*}
```
Above $\lambda_{\mathrm c}$ the ideal fiber supports only the fundamental mode; this cutoff does not extinguish it.

(sec:fiber:dispersion)=
## Fiber dispersion

Light propagating through fibers often suffers from dispersion, or pulse broadening. The cause for dispersion is that transmitting waves (e.g. at different wavelengths) do not travel at the same velocity, which may cause information loss. In e.g. telecommunication, information is typically sent using short pulses of light, which may start to overlap in time upon broadening, see {numref}`fig:fiber:pulseBroadening`. Substantial overlap makes symbols harder to distinguish and can increase errors unless the link uses suitable compensation. Here three main causes for dispersion are discussed, modal dispersion, material dispersion and waveguide dispersion.

Modal dispersion is relevant for MMFs, in which several modes of light are
present simultaneously. As discussed in {ref}`sec:fiber:modes`, light rays bounce
through a fiber or any other waveguide. To introduce modal dispersion we refer
back to the planar mirror waveguide depicted in {numref}`fig:fiber:modesIntro`.
Since the rays of higher-order modes are at larger angles $\bar{\theta}_m$ (see
{eq}`eq:fiber:selfConsistencyCondition`) than lower-order modes, the
higher-order modes have a longer path length. This means that the effective
propagation velocity $v_z$, the velocity at which the wave travels in $z$
-direction, decreases with increasing mode number. For the planar mirror
waveguide in vacuum the propagation velocity for the $m^{\text{th}}$ mode is
```{math}
\begin{align*}
v_{z,m}=c\cos(\bar{\theta}_m)=c\sqrt{1-\left(m\frac{\lambda_0}{2d}\right)^2}
\end{align*}
```

Here we used that $\cos^2(\theta)+\sin^2(\theta)=1$ along with {eq}`eq:fiber:selfConsistencyCondition`.

Now consider an infinitely short pulse that consists of light in the $i^{\text{th}}$ and the $j^{\text{th}}$ mode only, with $i<j$. For the sake of the argument, we still presume that the light is monochromatic, although in reality this is not the case (see below). Then these modes travel in $z$-direction with a velocity difference
```{math}
\begin{align*}
\Delta v=c\left(\sqrt{1-\left(i\frac{\lambda_0}{2d}\right)^2}-\sqrt{1-\left(j\frac{\lambda_0}{2d}\right)^2}\right).
\end{align*}
```
Due to the velocity difference, the difference in arrival time of the two modes at the end of the waveguide of length $L$ is
```{math}
:label: eq:fiber:mirrorWaveguideDispersion
\begin{align*}
	\Delta\tau=L\left(\frac{1}{v_{z,j}}-\frac{1}{v_{z,i}}\right)
=\frac{L}{c}\left[\frac{1}{\sqrt{1-\left(j\frac{\lambda_0}{2d}\right)^2}}-\frac{1}{\sqrt{1-\left(i\frac{\lambda_0}{2d}\right)^2}}\right],
\end{align*}
```
which is depicted in {numref}`fig:fiber:mirrorDispersion` for several combinations of $i$ and $j$ at $\lambda_0/(2d)=0.15$. Thus, the infinitely short pulse that we started with has broadened to a ''width'' $\Delta\tau$ at the end of the waveguide. To avoid substantial overlap in a simple on–off link, the pulse period should be comfortably longer than this differential delay.

```{figure} Images/10_06_mirror_dispersion.png
:name: fig:fiber:mirrorDispersion
:alt: Four straight lines plot differential modal delay in nanoseconds against waveguide length in kilometres for mode pairs 1–2, 1–3, 2–3, and 2–4; the 2–4 pair has the largest slope.
Differential group delay in the mirror waveguide for $\lambda_0/(2d)=0.15$, calculated from {eq}`eq:fiber:mirrorWaveguideDispersion`.
```

In reality, light pulses in multimode waveguides contain many modes and are not infinitely short. However, the same ideas hold: due to modal dispersion the pulse broadens, thereby limiting the rate of information transfer. This is also true for optical fibers. For a weakly guiding step-index fiber at large $V$, a ray estimate for the differential delay per unit length between near-axial and highest-angle paths is $\Delta\tau^{\mathrm{mod}}/L\approx(n_1-n_2)/c$. With $n_1=1.448$ and $n_2=1.444$, this scale is about $13.3\ \mathrm{ns/km}$. The precise delay depends on the supported modes and launch conditions.

Up to this point we have implicitly assumed that the light transmitted through optical fibers is monochromatic. This is not the case: in telecommunication information is sent through fibers by means of short pulses of light. However, the shorter the pulse, the broader its wavelength spectrum, as schematically depicted in {numref}`fig:fiber:timeBandwidth`. Apart from this effect, any light source has an intrinsic width of its emitted wavelength spectrum.

Now we consider a signal pulse propagating through a medium. The pulse has a central wavelength $\lambda_0$ and a spectral width $\Delta\lambda$. If the index of refraction is wavelength-dependent, $n=n(\lambda)$, such as in SiO$_2$ , the spectral width of the signal propagating through a fiber results in dispersion. This is due to the fact that the pulse's (group) propagation velocity is imposed by the group refractive index $n_{\text{g}}$ as $v_{\text{g}}=c/n_{\text{g}}$, which in turn depends on $n(\lambda)$ as
```{math}
:label: eq:fiber:groupRefractiveIndex
\begin{align*}
	n_{\text{g}}=n-\lambda\frac{\mathrm{d}n}{\mathrm{d}\lambda}.
\end{align*}
```

Hence all wavelength components present in the pulse travel at slightly
different velocities and dispersion is the result. From {eq}`eq:fiber:groupRefractiveIndex` we see, however, that the effect only occurs
whenever $\mathrm{d}^2n/\mathrm{d}\lambda^2\neq 0$ (NB: if $n$ is constant or of
the form $n=a\lambda+b$, {eq}`eq:fiber:groupRefractiveIndex` still yields
a constant group refractive index). This is the case for SiO$_2$ as can be
observed in {numref}`fig:fiber:groupIndexPlot`.

```{figure} Images/10_07_dispersion.png
:name: fig:fiber:pulseBroadening
:alt: Blue and magenta spectral peaks separate along the waveguide length, illustrating different group delays for different wavelength components.

Pulse broadening due to dispersion in optical fibers. As a light pulse propagates through a fiber, different wavelength components travel at slightly different velocities, causing the pulse to spread out over time. This temporal broadening limits the maximum data transmission rate in fiber optic communication systems.
```
```{figure} Images/10_08_dispersion.png
:name: fig:fiber:timeBandwidth
:alt: Left graph compares narrow and broad temporal pulses; right graph shows the corresponding broad and narrow wavelength spectra.

Relationship between pulse duration and spectral width. Shorter optical pulses contain a broader range of wavelengths (larger spectral width), while longer pulses have narrower spectral content. This fundamental relationship, based on the Fourier transform, explains why ultrashort pulses are more susceptible to dispersion effects.
```
```{figure} Images/10_09_sio2.png
:name: fig:fiber:groupIndexPlot
:alt: Curves of silica phase index n and group index n g versus wavelength: n decreases, while n g reaches a shallow minimum and then rises.
Silica phase index $n$ and group index $n_{\mathrm g}=n-\lambda\,\mathrm{d}n/\mathrm{d}\lambda$ versus wavelength; the group index curve has a shallow minimum.
```

Due to material dispersion, the change in pulse width after fiber length $L$ is given by
```{math}
\begin{align*}
\Delta\tau^{\text{mat}}\approx\left|D^{\text{mat}}\right|L\Delta\lambda.
\end{align*}
```
However, in practice often the dispersion is reported as
```{math}
:label: eq:fiber:materialDispersion
\begin{align*}
	D^{\text{mat}}=\frac{1}{c}\frac{\mathrm{d}n_{\mathrm g}}{\mathrm{d}\lambda}
=-\frac{\lambda_0}{c}\frac{\mathrm{d}^2n}{\mathrm{d}\lambda^2}
\end{align*}
```
in units of $\text{ps}/(\text{km} \cdot \text{nm})$. The magnitude $|D^{\mathrm{mat}}|L\Delta\lambda$ estimates differential group delay across a narrow spectrum; the sign of $D$ indicates which wavelengths arrive later. Its value depends strongly on wavelength.

A second effect of the spectral width of light pulses is that they disperse even
if light propagates in a single mode. As observed from {eq}`eq:fiber:selfConsistencyCondition`, the angle $\bar{\theta}_m$ not only
depends on the mode $m$, but also on the wavelength of the light. Therefore, all
wavelength components of the light will propagate at a slightly
different $\bar{\theta}_m$. This will cause dispersion in the same fashion as
discussed before for modal dispersion. Waveguide dispersion can matter in both single-mode and multimode fibers; it is particularly important when a single mode is used and intermodal delay is absent.

For a guided mode, its effective refractive index $n_{\mathrm{eff}}(\lambda)$ depends on both material indices and the waveguide geometry. Its total chromatic-dispersion parameter is

```{math}
:label: eq:fiber:waveguideDispersion
\begin{align*}
D=\frac{1}{c}\frac{\mathrm{d}n_{\mathrm{g,eff}}}{\mathrm{d}\lambda}
=-\frac{\lambda}{c}\frac{\mathrm{d}^2n_{\mathrm{eff}}}{\mathrm{d}\lambda^2},
\qquad
n_{\mathrm{g,eff}}=n_{\mathrm{eff}}-\lambda\frac{\mathrm{d}n_{\mathrm{eff}}}{\mathrm{d}\lambda}.
\end{align*}
```

The contribution caused by wavelength-dependent mode confinement is called **waveguide dispersion**. It depends on core size and index profile; there is no universal formula depending only on $n_1-n_2$ and $\lambda$.

```{figure} Images/10_10_dispersion_fiber.png
:name: fig:fiber:dispersionSiO2
:alt: Graph of material, waveguide, and total chromatic dispersion versus wavelength; total dispersion crosses zero near 1.31 micrometres.
Schematic material, waveguide, and total chromatic dispersion of a conventional silica single-mode fiber; the total crosses zero near $1.31\ \mu\mathrm{m}$.
```

In a conventional single-mode silica fiber, material and waveguide contributions can partly cancel near $1310\ \mathrm{nm}$, as illustrated in {numref}`fig:fiber:dispersionSiO2`. This is why that wavelength is useful when low chromatic dispersion matters. The exact zero-dispersion wavelength depends on the fiber design. Around $1550\ \mathrm{nm}$, silica attenuation is generally lower, while ordinary single-mode fiber has appreciable chromatic dispersion. Dispersion-shifted designs can move the zero-dispersion wavelength by changing the waveguide profile; low dispersion does not inherently require higher attenuation.

(sec:fiber:loss)=
## Fiber loss mechanisms

So far, we have implicitly neglected fiber losses. However, in reality, losses do occur while light propagates through a fiber. This causes the light to be attenuated following the exponential decay
```{math}
\begin{align*}
P(z)=P(0)\exp\left(-\alpha z\right),
\end{align*}
```
where $P(z)$ is the light power at position $z$ along the fiber and $\alpha$ is the loss coefficient per unit length. Taking the $\text{km}$ as unit for $z$, this value can be obtained from the loss coefficient in dB/km as $\alpha=-\ln(10^{-\alpha_{\text{dB}}/10})$. For SiO$_2$ the loss coefficient is plotted in {numref}`fig:fiber:loss`. In this section we discuss the main loss mechanisms in optical fibers: Rayleigh scattering, absorption, bending and coupling losses.

```{figure} Images/10_11_absorption_attenuation.png
:name: fig:fiber:loss
:alt: Logarithmic fiber attenuation plot versus wavelength showing a Rayleigh-scattering decline, hydroxyl absorption peaks, and a rising infrared absorption tail.
Fiber loss as a function of wavelength. Material losses occur due to scattering and absorption processes.
```

Rayleigh scattering arises from small refractive-index fluctuations frozen into the amorphous silica during manufacture. These fluctuations scatter a fraction of the guided light. The average loss factor from Rayleigh scattering is given by
```{math}
\begin{align*}
\alpha_{\text{R}}=\alpha_0^{\text{R}}\left(\frac{\lambda_0^{\text{R}}}{\lambda}\right)^4,
\end{align*}
```
where $\alpha_0^{\text{R}}$ is the loss factor experimentally measured at a wavelength $\lambda_0^{\text{R}}$. For SiO$_2$, $\alpha_0^{\text{R}}$ is approximately $0.15~\text{dB/km}$ at $\lambda_0^{\text{R}}=1550~\text{nm}$. This makes Rayleigh scattering the dominant loss mechanism in SiO$_2$ for lower wavelengths.

At larger wavelengths infrared absorption becomes the dominant loss mechanism in SiO$_2$ fibers. Infrared light may excite vibrational states of SiO$_2$, and the excitation energy is subsequently dissipated as heat in the fiber. The loss coefficient for infrared absorption is given by
```{math}
\begin{align*}
\alpha_{\text{IR}}=\alpha_0^{\text{IR}}\exp\left(-\frac{\lambda_0^{\text{IR}}}{\lambda}\right).
\end{align*}
```
For SiO$_2$ fibers $\alpha_0^{\text{IR}}$ is on the order of $10^{12}$ dB/km and $\lambda_0^{\text{IR}}$ equals approximately $50\mu \text{m}$.

Additionally, the three attenuation peaks at approximately $975$, $1225$ and $1400~\text{nm}$ in {numref}`fig:fiber:loss` are due to absorption. These absorption bands are caused by the presence of hydroxyl (OH) groups stemming from water vapor dissolved in the SiO$_2$ during fabrication. Apart from these bands, other bands may be present due to other contaminants such as Copper (Cu), Iron (Fe) and Nickel (Ni) (not depicted in {numref}`fig:fiber:loss`).

As can be observed in {numref}`fig:fiber:loss`, silica-fiber attenuation has a low-loss window near $1550~\text{nm}$. This favors that band for long links, subject to dispersion and system-design constraints.

Besides the intrinsic losses of Rayleigh scattering and absorption, losses also occur as a result of extrinsic factors, such as (excessive) bending and coupling.

In case an optical fiber bends, losses may occur if the bending radius is too small. This can be understood from considering the light rays in the fiber. As these travel on straight paths, a bend changes the angle under which the rays hit the core-cladding boundary, see {numref}`fig:fiber:bendingLoss`. As such, the ray may reach this boundary under an angle $\theta_{\text{i}}$ below the internal critical angle. As a result some of the light refracts into the cladding and is lost.

Bending may occur over a visible radius, as in {numref}`fig:fiber:macrobend`, or through small local deformations, as in {numref}`fig:fiber:bendingLoss`. The latter may occur as a result of improper fiber handling, e.g. when the fiber is strained excessively.

To prevent macro-bending losses, the critical radius of fibers should be noted. This parameter is listed in the fiber datasheet. Making bends tighter than this critical radius results in macro-bending losses.

```{figure} Images/10_12_bending_loss.png
:name: fig:fiber:macrobend
:alt: Tightly curved fiber with a red ray leaking through the outer core–cladding boundary where incidence falls below the critical angle.

Macrobend schematic: at the outside of a tight curve, a ray reaches the core–cladding boundary below the critical incidence angle and leaks into the cladding.
```

```{figure} Images/10_13_bending_loss.png
:name: fig:fiber:bendingLoss
:alt: Small deformation of the core–cladding boundary deflects a red guided ray so some light escapes into the cladding.
Local deformation of a fiber changes the incidence angle of a guided ray; the sketch shows a portion of the light leaking into the cladding.

```

Apart from internal fiber losses, losses may also occur while coupling fibers,
see {numref}`fig:fiber:couplingLoss`. This happens when fiber cores are not
aligned properly (they are shifted with respect to each other, placed under an
angle or there is a gap in between the fibers), when a higher-NA fiber is
coupled to a fiber with lower NA, or when the core size of the two fibers is
different. In case of a mismatch in NA, the lower-NA fiber will support fewer
modes (see {eq}`eq:fiber:vNumber`) and the higher order modes will be lost.
Apart from these issues with connecting fibers, internal reflections between
different fiber cores cause losses. These reflections occur whenever the index
of refraction changes. For each type of coupling loss, the loss factor can be
easily a few dB, as you can estimate yourself in one of the problems at the end
of this chapter. Therefore care must be taken to couple fibers properly.

```{figure} Images/10_14_loss.png
:name: fig:fiber:couplingLoss
:alt: Six sketches of coupling loss from lateral offset, gap, angular misalignment, tilt, numerical-aperture mismatch, and core-size mismatch.
Collection of situations in which coupling loss occurs. $\delta$ is the misalignment parameter (different in every subfigure).
```

(sec:fiber:types)=
## Fiber types

Apart from the step index fibers that we have considered up to this point, other types of optical fibers are available. The only condition for constructing an optical fiber is that light remains confined to the fiber core. In step index fibers this occurs due to the discontinuous decrease of the refractive index at the core-cladding boundary giving rise to TIR. In this section we briefly introduce different types of optical fibers and color coding.

In graded index fibers, the refractive index changes in a continuous fashion over the fiber diameter. At a cost of a more complex fabrication process, the advantage of GRIN fibers over step index fibers is that modal dispersion is less severe.

Another fiber type is the so-called holey fiber, see {numref}`fig:fiber:holeyPbf`. Instead of changing the refractive index using dopants, the cladding of holey fibers contains a carefully designed array of holes containing air, which change the refractive index of the ''cladding'' (part of the fiber with holes) with respect to the ''core'' (part of the fiber without holes). These holes run over the whole length of the fiber. This implies holey fibers can be constructed from a single material.

```{figure} Images/10_15_photonic_crystal_fiber_from_nrl.jpg
:name: fig:fiber:holeyPbf
:alt: Two grayscale microscope images show a photonic-crystal-fiber cross-section filled with a regular array of air holes and a close-up of several holes.
SEM micrographs of US Naval Research Laboratory-produced photonic-crystal fiber. (left) The diameter of the solid core at the center of the fiber is $\sim 5~\mu\text{m}$, while (right) the diameter of the holes is $\sim 4~\mu\text{m}$. (Image courtesy of US Naval Research Laboratory / CC BY-SA)
```

A photonic-bandgap fiber also uses a periodic microstructure, although {numref}`fig:fiber:holeyPbf` shows a solid-core holey fiber rather than a bandgap-guided hollow core. However, in PBFs these holes are arranged in a fashion that a bandgap is created in the cladding. Such a bandgap does not allow light of certain wavelength(s) to transmit through the cladding, thus confining light of this wavelength to the core. This is fundamentally different from fibers based on changes in refractive index. Photonic-bandgap guidance works in designed spectral bands, whereas ordinary step-index guidance is governed by total internal reflection. The band width depends on the particular microstructure.

Apart from wavelength, light also carries the property of polarization. In the fiber types discussed so far, no measures are taken to preserve the polarization of the light transmitting through the fiber. Therefore, crosstalk may occur between light transmitted in different polarizations as a result of, e.g., bends in the fiber. This is not a problem if the fibers are used in applications in which only the intensity of the transmitted light is considered, e.g., in telecommunication, in which information is stored in binary pulses that are either on (logical $1$) or off (logical $0$). However, in other applications such as quantum key distribution, information is stored in the polarization of the light: horizontal or vertical.

In such applications, the light's polarization needs to be preserved throughout the fiber's length for which polarization maintaining fibers have been developed. When light is launched along one of their principal axes, polarization-maintaining fibers reduce coupling to the orthogonal axis and preserve that axis approximately over the specified operating conditions. Polarization-maintaining fibers are usually chosen when controlling polarization justifies their added cost and handling requirements.

The final fiber type to be discussed is the plastic fiber. Plastic fibers are generally made with a PMMA (polymethyl methacrylate, $n_1=1.49$) core, whereas the cladding is fluorinated. This lowers the refractive index to approximately $n_2=1.40$, implying plastic fibers have a large NA. Apart from such step-index plastic fibers, GRIN plastic fibers are available. Plastic fibers are low-cost and more resilient to bending and handling than SiO$_2$ fibers. This is due to plastic fibers having a core diameter of typically $1~\text{mm}$, instead of the fragile few-micrometer core diameter of SiO$_2$ fibers. Using plastic instead of SiO$_2$ comes, however, at a cost of higher losses in the order of $1~\text{dB/m}$. Due to these properties, plastic fibers can be found in, e.g., home, company and car data networks.

To distinguish fibers from each other, jacket colors often follow deployment conventions. For example, many multimode cables are orange or aqua and many single-mode cables are yellow, but color alone does not establish the fiber specification. The manufacturer marking or test documentation should be checked. In cables with multiple fibers and MPO connectors, individual fibers may use a separate sequence of colors to identify their positions. Such markings help technicians trace and connect the intended fibers.

(sec:fiber:connections)=
## Fiber connections

In order to couple light into and out of optical devices and components, fiber connections need to be made. This also holds in case one wants to couple two fibers together. These connections are made using fiber connectors for which many designs have been put forward over the years. Ideally, the connection is loss-less. However, in practice all connections induce some (sub-dB) loss. This section discusses the most common manners in which fibers are connected currently, by splicing or using a fiber connector. The most common fiber connectors are depicted in {numref}`fig:fiber:connectors`.

In fiber splicing, two fibers are permanently joined together by fusion or mechanical means. In fusion splicing the fibers are fused together by aligning the cores and claddings of both fibers and heating the joint shortly. Fusion splicing often gives low loss and a mechanically robust joint. In mechanical splicing a mechanical fixture is used to align and fixate the fibers. Although such splices are less strong and increase loss with respect to fusion splices, the equipment for making mechanical splices is less expensive. Fusion splices are commonly used where a durable, low-loss permanent joint is needed, including submarine links. Apart from this, splicing can be used as a means to repair broken optical fibers.

```{figure} Images/10_16_connectors.png
:name: fig:fiber:connectors
:alt: Gallery of five fiber connector styles labeled LC, SC, ST, FC, and MTP, each shown vertically with its cable.
Gallery of optical fiber connectors. For connector terminology and ferrule sizes, see the [Fiber Optic Association guide](https://www.thefoa.org/tech/ref/termination/names.html).
```

There are many types of connector. We report on the main ones here.

**Lucent connector (LC)** -- The lucent connector, also referred to as the little connector, is a widely used compact connector. In the tip of the connector, the fiber is protected by a so-called ferrule ({numref}`fig:fiber:pc`), which for LCs is only $1.25~\text{mm}$ in diameter. The connector snaps into place and can be detached using a push-pull motion. This makes installation an easy procedure. Due to its small footprint, it is ideal for high-density fiber applications such as in data centers.

**Subscriber connector (SC)** -- The square-bodied connector was an early attempt to standardize fiber connectors. With a $2.5~\text{mm}$-diameter ferrule, it is larger than the previous LC connector, and is used in many passive networks and equipment connections. The SC connector uses a push-pull latch, making its installation easy.

**Straight tip (ST) connector** -- The straight tip connector has a $2.5~\text{mm}$-diameter spring-loaded ferrule. This implies that the ferrule is pushed onto the device it is connected to thereby improving the transmission. Typically used for multimode fibers, it has a bayonet mount, which secures itself after turning it by a half twist.

**Ferrule connector (FC)** -- The FC connector is typically used for SMF and high precision applications, such as optical time domain reflectometry (OTDR). Its spring-loaded ferrule is $2.5~\text{mm}$ in diameter. It has an alignment key ensuring the connector is always inserted to the device in the same orientation. Secondly, the connector is secured using a threaded collet. Although this connector is thus more complex in installation, as well as in manufacturing, the repeatable accuracy with which it can be installed gives the precision in aforementioned applications.

**Multi-position optical (MPO) connector** -- The multi-position optical connector, with MTP as one trade name, can terminate multiple fibers in one ferrule, commonly in arrays of 12 or more. Such fibers are often used for high-bandwidth optical parallel connections in, e.g., data centers and servers.

**Physical contact (PC)** -- All of the above connectors are available in three forms of physical contact of the ferrule, see {numref}`fig:fiber:pc`. PC indicates that the connectors are designed such that fibers are brought into physical contact upon coupling a connector to a photonic device or another connector. As a result of polishing, the air gap in a fiber connection is diminished, thus improving the transmission of light through the connection (and reducing the back-reflection). Ordinary PC connectors have a back reflection below $-40~\text{dB}$. As variations, ultra-physical contact (UPC, connector colored blue) and angled physical contact (APC, colored green) connectors are available. UPC connectors have a finer polish which decreases back reflection to below $-50~\text{dB}$. APC connectors are polished under an angle of $8^{\circ}$, which changes the direction of the reflected light. As such, back-reflection of less than $-60~\text{dB}$ is achieved. Improving physical contact comes with increased cost: PC connectors are cheapest, and connector cost depends on construction and required return loss. Importantly, it should be noted that PC and UPC connectors are compatible, whereas APC connectors are incompatible with both. Connecting PC and APC fibers leads to a large air gap between the fibers, see {numref}`fig:fiber:couplingLoss`-(c), and thus to large losses.

```{figure} Images/10_17_contact.png
:name: fig:fiber:pc
:alt: Three connector-end sketches compare ordinary physical contact PC, ultraphysical contact UPC, and angled physical contact APC between opposed ferrules.
Physical contact between fiber connectors. (top) (ordinary) physical contact, (middle) ultra-physical contact and (bottom) angled physical contact.
```

(sec:fiber:components)=
## Fiber components

Now that a solid background on the topic of optical fibers has been established, we move on toward optical fiber setups. These setups contain fibers as a means to transmit light, and contain fiber components to manipulate light. Examples of light manipulation are splitting or combining light, influencing its polarization or changing its intensity by attenuation or amplification. This section describes components commonly found in fiber setups.

In order to couple light into or out of fiber setups from free space, collimators are used as a gateway. Collimators contain a positive lens and are attached to a fiber with its end placed in one of its focal points. As such, a collimated beam of light, such as laser light, can be coupled into the fiber. The opposite process can be used to couple light out of the fiber setup into free space and yields a collimated beam. This is illustrated in {numref}`fig:fiber:collimator`. In case the collimator is used to couple light out of a fiber, the beam width (half the beam diameter) of the resulting collimated beam can be reasonably approximated as
```{math}
:label: eq:fiber:collimatorBeamWidth
\begin{align*}
	w_{\text{coll}}=f_{\text{coll}}\mathrm{NA},
\end{align*}
```

where $f_{\text{coll}}$ is the focal length of the collimating
lens. $w_{\text{coll}}$ is in the order of $1~\text{mm}$ for a typical fiber NA
of $0.1$ and an $f_{\text{coll}}=1~\text{cm}$. On the other hand, it should be
realized that upon coupling light into a fiber from a collimated beam, the (
incoming) beam width should be smaller than the value resulting from {eq}`eq:fiber:collimatorBeamWidth`. If the beam is broader, some light will not
couple into the fiber and is therefore lost. This results
from $\bar{\theta}_{\text{e,c}}$ (see {numref}`fig:fiber:tir`) being exceeded by
part of the light beam.

```{figure} Images/10_18_collimation.png
:name: fig:fiber:collimator
:alt: Fiber emits a divergent red cone into a green lens one focal length away; the output is collimated with half-width w coll.
A fiber collimator can be used to couple collimated light out of and into an optical fiber
```

Light propagating in fibers can be split in (un)equal parts and light from
multiple fibers can be combined into one fiber. Devices for these goals are
called splitters and combiners. These belong to the general class of couplers, in
which light from $N_{\text{in}}$ input channels is redistributed
over $N_{\text{out}}$ output channels. Couplers are based on the phenomenon of
evanescent fields. Although light rays are confined to fiber cores, their
associated EM-fields extend in the fiber cladding, the evanescent field, as
briefly mentioned in {ref}`sec:fiber:modes` and illustrated in {numref}`fig:fiber:couplerEv`. If two fiber cores are brought in close proximity, energy
from the evanescent field from light transmitting through the one fiber core
enters the other fiber's core and continues its path there. The coupling fraction depends on core separation, interaction length, wavelength, and mode properties. Wavelength-division multiplexing requires components designed to combine or separate wavelength channels; a wavelength-independent splitter alone does not perform that task.

```{figure} Images/10_19_fused_biconal.png
:name: fig:fiber:couplerEv
:alt: Two tapered parallel fibers exchange red optical power through a central coupling region of length L, producing two output powers.
EM-fields in optical fibers are not confined to the core but extend in the cladding. By bringing two fiber cores in close proximity, light can be coupled from one fiber into another.
```

In isolators, light is able to propagate in one direction, but not in the other. As such optical devices can be isolated from each other, with the result that light reflected from one device cannot back-propagate to another device. This is important to protect e.g. a laser from incoming light back-reflected from another device. A common free-space isolator combines a nonreciprocal Faraday rotator with polarizing elements: forward light passes, while reverse light is rejected or directed to an absorber.

Circulators also use nonreciprocal routing. These components can have three or more ports and light coupled into one port is only transmitted to one other port. Thus, in a three-port circulator, port $1$ is coupled to port $2$, $2$ to $3$ and $3$ to $1$. Using circulators, a single fiber can be used to transmit and receive a (reflected) signal. Both are then separated using this component, which is relevant for Fiber Bragg gratings (discussed in {ref}`sec:fiber:applications`) and Michelson-Morley-type interferometers.

In some applications it is necessary to attenuate or amplify the light power
transmitting through fibers. This would be the case if power levels are too high
or low for a detector or for another component further downstream in the fiber
network. Also, attenuators and amplifiers may be used to stress-test a network
under (unwanted) power loss or gain, and amplifiers in particular can be used to
compensate for fiber losses in long-distance fiber connections.

Optical attenuation can be achieved by the methods that have so far been considered as a negative influence on light transmission: scattering, absorption and air gaps, see {ref}`sec:fiber:loss`. Attenuators can either be fixed or variable in their attenuation. The latter can be tuned continuously or step-wise by hand or electronically to the desired attenuation level. This allows for testing a network under variable attenuation level without making hardware changes. Reflection performance depends on the attenuator design; a return-loss specification is needed when back-reflections matter.

For optical amplification, an intense pump signal is coupled into an amplifier, along with the signal-to-be-amplified. In a rare-earth-doped fiber amplifier, an optical pump laser supplies this energy. Due to stimulated emission in the amplifier, some energy supplied by the pump is transferred to the signal-to-be-amplified, thus increasing (amplifying) its intensity. An erbium-doped fiber amplifier (EDFA) is commonly optimized for signals around $1530$ to $1565~\text{nm}$, with some designs extending into the L band. Optical pumping excites erbium ions, enabling stimulated emission that amplifies telecom signals near $1550~\text{nm}$. However, fiber amplifiers based on other rare-earth dopants are also available, in particular neodymium, ytterbium, praseodymium, or thulium.

With polarization controllers the polarization of the light within an optical fiber can be influenced. These controllers consist of two or three ''flaps'' around which the fiber is wound, see {numref}`fig:fiber:polarizationController`. By adjusting the position of these flaps, either manually or electronically, the polarization state of the propagating light is controlled as a result of stresses applied to the fiber. A suitable controller can transform the output polarization over a useful range; complete control depends on the number of paddles and their adjustment.

```{figure} Images/10_20_fiber_polarization_controller_a1_780.jpg
:name: fig:fiber:polarizationController
:alt: Photograph of a fiber wound around two adjustable black paddles mounted on a Thorlabs base.
A fiber polarization controller (courtesy of [Thorlabs](https://www.thorlabs.com/newgrouppage9.cfm?objectgroup_id=343)).
```

(sec:fiber:applications)=
## Applications of fiber optics and future directions

Nowadays, fiber optics is applied in many fields, both in industry and in academia. In this section we give a (non-exhaustive) overview of these fields as well as a hint in which direction the field of fiber optics is moving.

The main field in which fiber optics is applied is the field of telecommunication. Fiber optics allows for reliable communication over large distances with little loss of power, as we have seen throughout this chapter. Fiber optics is replacing conventional electronic (copper) technology, which is subject to different bandwidth, reach, and power constraints, first in intercontinental communication lines and nowadays in local communication lines. Also data centers have transferred or are transferring from copper technology to fiber optics, which can change link power consumption depending on the application. Also, fiber optics can be used as a medium for quantum communication, which promises secure communication based on the laws of quantum physics.

```{figure} Images/10_21_bragg_grating.png
:name: fig:fiber:fbg
:alt: Fiber Bragg grating diagram shows periodic core-index stripes, a narrow reflected wavelength band, and a corresponding notch in transmitted spectrum.
A fiber Bragg grating reflects light of a specific wavelength only. This can be used to measure strain as straining the FBG results in a wavelength shift (adapted from [Wikimedia Commons](https://en.wikipedia.org/wiki/Fiber_Bragg_grating) by Sakurambo / CC BY-SA)
```

Apart from telecommunication, fiber optics can be applied in sensing systems. Fiber Bragg Gratings (FBGs) have been developed to measure strain (due to mechanical, temperature and pressure loading) in structures and materials. In FBGs, the fiber core consists of periodically interdigitated sections with refractive index $n_1$ and $n_3$, see {numref}`fig:fiber:fbg`, such that at each $n_1$-$n_3$ boundary some light is reflected. Reflections from successive index modulations add constructively near the Bragg wavelength $\lambda_{\mathrm B}=2n_{\mathrm{eff}}\Lambda$, where $\Lambda$ is the grating period and $n_{\mathrm{eff}}$ is the effective index of the guided mode. Upon attaching an FBG to a structure, it stretches or shortens due to strain and accordingly, the reflection peak shifts in wavelength. The same goal can be achieved using fiber-optic interferometers.

Another application of fiber optics in sensing is given by evanescent wave sensing. Evanescent waves have been briefly introduced in the context of couplers in {ref}`sec:fiber:components`. Tapering a fiber can increase the overlap of the guided mode’s evanescent field with its surroundings; changes in absorption or refractive index can then be detected through transmitted or reflected light. With this technique optical biosensors, water quality sensors and chemical sensors have been developed and the toolbox of evanescent sensors is still increasing.

Fiber lasers have been developed in which the gain medium is formed from a fiber doped with rare-earth elements, such as erbium. Since the gain medium is a fiber, it is flexible and therefore fiber lasers are easier to use as they allow for more straightforward delivery of power in a desired direction. This makes fiber lasers useful in processes such as cutting and welding. Their power and beam quality depend on the particular design and application. Fiber systems can produce narrowband or broadband output, including supercontinuum light in nonlinear fibers. The development of fiber lasers is still ongoing.

Other areas of current and future development of fiber optic applications are photonic integrated circuits that integrate electronic and optical devices. Multicore fibers are being developed to further increase information density and microstructured fibers such as holey fibers and PBFs are further investigated and developed in order to find designs with optimal properties in terms of loss and dispersion. The same holds for evanescent wave sensing and FBGs for which new applications are being explored continuously, e.g. in the sectors of biosensing and health monitoring (in particular point of care diagnostics).

With new applications of fiber optics arising in sectors such as agriculture, food, space, defense and energy, the field is steadily expanding. It holds promise for developments making processes in those sectors easier to measure, more cost effective and more energy efficient. This makes the field very interesting to follow in the upcoming years.

## Chapter Summary

- **Total internal reflection** confines light in optical fibers when $n_{core} > n_{cladding}$.
- **Fiber modes** are discrete propagation patterns satisfying self-consistency; determined by the V-number: $V = \frac{2\pi a}{\lambda}\text{NA}$.
- **Single-mode fibers** ($V < 2.405$) support only the fundamental mode; **multimode fibers** support many modes.
- **Numerical aperture** satisfies $n_{\mathrm e}\sin\theta_{\mathrm{e,max}}=\sqrt{n_1^2-n_2^2}$ for meridional rays; the usual air-side NA equals the right-hand side.
- **Dispersion** causes pulse broadening: modal dispersion (multimode), material dispersion, and waveguide dispersion.
- **Fiber losses** arise from Rayleigh scattering, absorption, bending, and coupling; minimized at $\lambda \approx 1550$ nm in silica.
- **Step-index fibers** have uniform core index; **graded-index fibers** have gradual index variation reducing modal dispersion.
- **Photonic crystal fibers** (holey fibers, photonic bandgap fibers) offer unique dispersion and single-mode properties.
- **Fiber connections**: Connectors (LC, SC, FC) for temporary connections; splicing (fusion or mechanical) for permanent joins.
- **Fiber components**: Couplers/splitters, isolators, circulators, wavelength-division multiplexers, and fiber amplifiers (EDFA).
- **Applications**: Telecommunications, fiber sensors (FBGs), and fiber lasers.

```{note} External sources in recommended order
General optics and theory of optical fibers:
1. Pedrotti, Pedrotti and Pedrotti, *Introduction to optics*, Cambridge University Press
2. Hecht, *Optics*, Pearson
3. Saleh and Teich, *Fundamentals of Photonics* ($2$ parts), Wiley
4. Kasap, *Optoelectronics and photonics*, Pearson

Optical fibers in practice:
- FOA: FOA reference guide to fiber optics [https://www.thefoa.org/](https://www.thefoa.org/FOArgfo.html).

(Future) applications of fiber optics:
- [Photonics21](https://www.photonics21.org/ppp-services/photonics-downloads.php): Strategic research and innovation agenda;
- [PhotonicsNL](https://www.photonicsnl.org/our-network/photonics-in-the-netherlands/photonics-roadmap-netherlands/): Photonics roadmap $2023$.
```

[^1]: The dB, or decibel, is a unit to quantify loss and gain. The gain in dB is calculated as $G_{\text{dB}}=10\log_{10}(P_{\text{out}}/P_{\text{in}})$, where $P_{\text{in(out)}}$ is the (optical) power entering (leaving) a component or device. Loss in dB equals $-G_{\text{dB}}$. The advantage of using the unit dB is that the total gain or loss of a system can be calculated using addition and subtraction instead of multiplication and division. This is due to its definition using the logarithm.

[^2]: Due to the continuity condition, the field parallel to the interface of the mirror is $0$. Showing the correctness of this phase factor is left as an exercise to the reader.
