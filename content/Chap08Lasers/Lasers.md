---
tags:
  - lasers
  - advanced
  - applications
  - theory
downloads:
  - id: chapter-08-pdf
    title: Download Chapter PDF
  - id: chapter-08-docx
    title: Download Chapter DOCX
---

(chapter:laser)=
# Lasers

```{note} What you should know and be able to do after studying this chapter
- Know the special properties of laser sources.
- Understand the optical resonator and why it is needed.
- Understand the role of the amplifier and explain what the gain curve is.
- Explain the principle of population inversion and how it can be achieved.
- Explain how single frequency operation can be obtained.
- Understand what transverse modes are and how they can be prevented.
```

In the early 1950s a new source of microwave radiation, **the maser**, was invented by C.H. Townes in the USA and A.M. Prokhorov and N.G. Basov in the USSR. Maser stands for "Microwave Amplification by Stimulated Emission of Radiation". In 1958, A.L. Schawlow and Townes formulated the physical conditions for realizing a similar device for visible light. This resulted in 1960 in the first optical maser by T.H. Maiman in the USA.
This device has since been called **L**ight **A**mplification by **S**timulated **E**mission of **R**adiation or **laser**.
It has revolutionized science and engineering and has many applications, e.g.
- bar code readers,
- compact discs,
- computer printers,
- fiber optic communication,
- sensors,
- material processing,
- non-destructive testing,
- position and motion control,
- medical applications, such as treatment of retina detachment,
- nuclear fusion,
- holography.


## Unique Properties of Lasers
The broad application of lasers is made possible by the unique properties that distinguish lasers from all other light sources. We discuss these unique properties below.
### Narrow Spectral Width; High Temporal Coherence
A narrow spectrum generally corresponds to a long temporal coherence time; the precise relationship depends on spectral shape.
A spectral lamp, such as a mercury-vapor discharge lamp, can have a spectral width of $\Delta\nu=10$ GHz. At $\lambda=550$ nm the optical frequency is about $5.45\times10^{14}$ Hz, so the fractional width is about $0.0018\%$. The line width measured in wavelengths satisfies

```{math}
:label: eq:laser:spectralWidthRatio
\begin{align*}
\frac{\Delta \lambda}{\lambda}=\frac{\Delta \nu}{\nu},
\end{align*}
```
For this example, $\Delta\lambda\approx0.010$ nm. A laser with a 10 MHz linewidth is narrower by a factor of 1000; at 550 nm its wavelength width is about $10^{-5}$ nm. These are illustrative linewidths.
As explained in Chapter 6, the coherence time $\tau_c$ is of the order of the reciprocal frequency bandwidth:

```{math}
:label: eq:laser:coherenceTime
\begin{align*}
\tau_c\sim1/\Delta\nu.
\end{align*}
```
Light is emitted by atoms in bursts of harmonic (cosine) waves consisting of a great but finite number of periods. As will be explained in this chapter, due to the special configuration of the laser, the wave trains in laser light can be extremely long, corresponding to a very long coherence time.
### Highly Collimated Beam
Consider a discharge lamp as shown in {numref}`fig:laser:gasSourceCollimation`.

```{figure} Images/08_01_gas_source_collimation.png
:name: fig:laser:gasSourceCollimation
:alt: Blue rays from the top and bottom of a tall gas discharge pass through a green converging lens at focal distance f; their different outgoing directions define divergence about h over f.
A discharge lamp in the focal plane of a converging lens. Every atom in the lamp emits a spherical wave during a burst of radiation, lasting on average a coherence time $\Delta \tau_c$. The overall divergence of the beam is determined by the atoms at the extreme positions of the source.
```

To collimate the light, the lamp can be positioned in the focal plane of a lens.
The spherical waves emitted by the atoms (point sources) in the lamp are collimated into plane waves whose direction depends on the position of the atoms in the source. The atoms at the edges of the source determine the overall divergence angle $\theta$, which is given by

```{math}
:label: eq:laser:divergenceAngle
\begin{align*}
\theta=h/f,
\end{align*}
```
where $2h$ is the size of the source and $f$ is the focal length of the lens as shown in {numref}`fig:laser:gasSourceCollimation`. Hence the light can be collimated by either choosing a lens with large focal length or by reducing the size of the source, or both. Both methods lead, however, to weak intensities.
Due to the special configuration of the laser source, which consists of a Fabry-Perot resonator in which the light bounces up and down many times before being emitted, the atomic sources are effectively all at a very large distance and hence the effective size of the source is very small. The divergence of a well-designed single-transverse-mode laser is then governed mainly by diffraction at its output beam aperture.
As follows from {ref}`chapter:diff`, the characteristic diffraction angle of a beam with diameter $D$ and wavelength $\lambda$ scales as:

```{math}
:label: eq:laser:diffractionLimitedDivergence
\begin{align*}
\theta \sim \frac{\lambda}{D}.
\end{align*}
```
The diffraction-limited divergence thus depends on the wavelength and decreases when the diameter of the emitting surface increases. With a suitable single-mode laser, the diffraction-limited divergence angle can nearly be reached and therefore a collimated beam with very high intensity can be realized ({numref}`fig:laser:laserSourceCollimation`).

```{figure} Images/08_02_laser_source_collimation.png
:name: fig:laser:laserSourceCollimation
:alt: Cylindrical laser emits a blue beam through an aperture labeled D; the beam slowly widens with characteristic angle theta approximately lambda over D.
A laser beam can almost reach diffraction-limited collimation.
```

### Diffraction-Limited Focused Spot, High Spatial Coherence
For a uniformly filled circular lens aperture of diameter $D$, focal length $f$, and small-angle numerical aperture $\mathrm{NA}\approx D/(2f)$ in air, the radius to the first dark Airy ring is, according to {ref}`chapter:diff`,

```{math}
:label: eq:laser:diffractionLimitedSpot
\begin{align*}
r_{\mathrm{Airy}}= 1.22\frac{f}{D}\lambda\approx0.61\frac{\lambda}{\text{NA}}.
\end{align*}
```
With a laser one can achieve a diffraction-limited spot with a very high intensity.

As has been explained in {ref}`chapter:coh`, a light wave has **high spatial coherence** if at any given time, its amplitude and phase at different points can be predicted. The spherical waves emitted by a point source have this property. But when there are many point sources (atoms) that each emit bursts of harmonic waves that start at random times, as is the case in a classical light source, the amplitude and phase of the total emitted field at any position in space cannot be predicted. The only way to make the light spatially coherent is by making the light source very small, but then there is hardly any light. As will be explained below, by the design of the laser, the emissions by the atoms of the amplifying medium in a laser are phase-correlated, which leads to a very high temporal and spatial coherence.

```{figure} Images/08_03_laser_focus.png
:name: fig:laser:laserFocus
:alt: Parallel blue rays spanning diameter D pass through a green lens and meet near its focal distance f before diverging.
Diffraction-limited spot obtained by focusing a collimated beam.
```

A small, bright focal spot is useful in high-resolution imaging, material processing, and carefully controlled ophthalmic laser procedures.

### High Power
Lasers can operate in continuous-wave (CW) mode or emit pulses. These pulses can be very short: from nanoseconds to even femtoseconds ($10^{-15}$ s). A relatively low-power CW laser is the HeNe laser which emits roughly 1 mW at the wavelength 632 nm. Some continuous-wave lasers deliver kilowatts of output power. Because their energy is delivered over a short duration, pulsed lasers can reach peak powers far above their average output power.

There are many applications of high-power lasers such as for cutting and welding materials.
To obtain EUV light with sufficiently high intensity for use in photolithography for manufacturing ICs, extremely powerful CO$_2$ lasers are used to excite a plasma.
Extremely high-power lasers are also applied to initiate fusion and in many nonlinear optics applications.
Lasers with very short pulses are used to study very fast phenomena with short decay times.

### Wide Tuning Range
For a wide range of wavelengths, from the vacuum ultra-violet (VUV), the ultra-violet (UV), the visible, the infrared (IR), the mid-infrared (MIR) up into the far infrared (FIR), lasers are available. For some types of lasers, the tuning range can be quite broad.
The gaps in the electromagnetic spectrum that are not directly addressed by laser emission can be covered by techniques such as higher harmonic generation and frequency differencing.

(sec:laser:optres)=
## Optical Resonator

```{openlyceum} InterferometryLab
:screen: 3
:label: fig:laser-fabry-perot-cavity-sim

The same Fabry–Pérot geometry that appears as a spectrometer in {ref}`chapter:coh`, now read as a laser cavity: raise the mirror reflectance and watch the resonance peaks sharpen. The amplifying medium and population inversion are treated interactively in {numref}`fig:laser-phet-sim`.
```

We now explain the working of lasers. A laser consists of
1. an optical resonator;
2. an amplifying medium.


In this section we consider the resonator. Its function is to obtain a high light energy density and to gain control over the emission wavelengths.

A mechanical or electrical resonator has one or more resonance frequencies $\nu_{res}$. Without energy input, losses make its amplitude decay, as shown in {numref}`fig:laser:laserResonant`. The resulting spectrum has a finite width of order $\Delta\nu\sim1/\tau$, where $\tau$ is a characteristic decay time. The numerical coefficient depends on how the linewidth and decay time are defined.

```{figure} Images/08_04_laser_decay.png
:name: fig:laser:laserResonant
:alt: Left, sinusoidal field with a decaying amplitude envelope. Right, a narrow resonance peak centered on nu res.
Damped field amplitude versus time (left) and its broadened resonance spectrum versus frequency (right); a shorter decay time gives a wider spectral line.
```


The optical resonator  is a Fabry-Perot resonator filled with some material with refractive index $n$ bounded by two aligned, highly reflective mirrors at a distance $L$. The Fabry-Perot resonator is discussed extensively in the {ref}`Fabry-Perot Interferometer section <sec:coh:fabryperot>` of the {ref}`Interference chapter <chapter:coh>` but to understand this chapter a detailed analysis of the Fabry-Perot is not needed.

Let the $z$-axis be chosen along the axis of the cavity as shown in {numref}`fig:laser:fabryPerrotResonanceMode`, and assume that the transverse directions are so large that the light can be considered a plane wave bouncing back and forth along the $z$-axis between the two mirrors. Let $\omega$ be the frequency and $k_0=\omega/c$ the wave number in vacuum. The plane wave that propagates in the positive $z$-direction is given by:

```{math}
:label: eq:laser:planeWavePropagation
\begin{align*}
E(z) = A e^{i k_0 n z},
\end{align*}
```

```{figure} Images/08_05_fabry_perrot_resonance_mode.png
:name: fig:laser:fabryPerrotResonanceMode
:alt: Three standing-wave profiles between two mirrors spaced by L illustrate successively higher longitudinal cavity modes.
Fabry-Perot resonances.
```

For ideal mirrors that each contribute the same reflection phase, the two reflection phases add to an integer multiple of $2\pi$. Neglecting loss, the field after one round trip is:

```{math}
:label: eq:laser:roundTripField
\begin{align*}
E(z)=A e^{2i k_0 n L} e^{i k_0 n z}.
\end{align*}
```

A high field builds up when this wave constructively interferes with {eq}`eq:laser:planeWavePropagation`, i.e. when

```{math}
:label: eq:laser:resonanceCondition
\begin{align*}
k_0=\frac{\pi m}{nL},\qquad \nu=\frac{k_0c}{2\pi}=m\frac{c}{2nL},
\end{align*}
```
for $m=1,2,\ldots$. Hence, provided dispersion of the medium can be neglected (i.e. $n$ is independent of the frequency), the resonance frequencies are separated by

```{math}
:label: eq:laser:freeSpectralRange
\begin{align*}
\Delta \nu_{f}=c/(2nL),
\end{align*}
```
which is the so-called **free spectral range**. For a gas laser of length 1 m, the free spectral range is approximately 150 MHz.

### Example: Cavity Mode Number

Suppose that the cavity is 100 cm long and is filled with a material with refractive index $n=1$. Light with visible wavelength of $\lambda= 500$ nm corresponds to mode number $m=2L/\lambda = 4\times 10^6$ and the free spectral range is $\Delta \nu_f=c/(2L)=150$ MHz.


The multiple reflections of the laser light inside the resonator make the optical path length very large. For an observer, the atomic sources seem to be at a very large distance and the light that is exiting the cavity resembles a plane wave. As explained above, the divergence of the beam is therefore not limited by the size of the source, but by diffraction due to the aperture of the exit mirror.

Because of losses caused by the mirrors (which never reflect perfectly) and by the absorption and scattering of the light, the resonances have a certain frequency width $\Delta \nu$. When a resonator is used as a laser, one of the mirrors is given a small transmission to couple the laser light out and this also contributes to the loss of the resonator. To compensate for all losses, the cavity must contain an amplifying medium. Due to the amplification, the resonance line widths inside the bandwidth of the amplifier are reduced to very sharp lines as shown in {numref}`fig:laser:laserLine`.

```{figure} Images/08_06_laser_spectra.png
:name: fig:laser:laserLine
:alt: Upper plot shows evenly spaced longitudinal resonances. Lower plot shows resonances inside a broad red gain envelope becoming narrower after amplification.
Resonant frequencies of a cavity of length $L$ when the refractive index $n=1$. With an amplifier inside the cavity, the line widths of the resonances within the bandwidth of the amplifier are reduced. The envelope is the spectral function of the amplification.
```


## Amplification
Amplification can be achieved by a medium with atomic resonances that are at or close to one of the resonances of the resonator. We first recall the simple theory developed by Einstein in 1916 of the dynamic equilibrium of a material in the presence of electromagnetic radiation.
### The Einstein Coefficients

We consider two atomic energy levels $E_2>E_1$. By absorbing a photon of energy

```{math}
:label: eq:laser:photonEnergy
\begin{align*}
ℏ\omega = E_2-E_1,
\end{align*}
```
an atom that is initially in the lower energy state $1$ can be excited to state 2. Here $\hbar=h/(2\pi)$ is the reduced Planck constant:

```{math}
:label: eq:laser:planckConstant
\begin{align*}
\hbar=\frac{6.62607015\times10^{-34}\ \mathrm{J\,s}}{2\pi}.
\end{align*}
```
Suppose $W(\omega)$ is the time-averaged electromagnetic energy density *per unit of frequency interval* around frequency $\omega$. Hence $W$ has units $\mathrm{J\,s\,m^{-3}}$. Let $N_1$ and $N_2$ be the number of atoms in states 1 and 2, respectively, where

```{math}
:label: eq:laser:totalAtomNumber
\begin{align*}
N_1 + N_2 = N,
\end{align*}
```
is the total number of atoms (which is constant). The rate of absorption is the rate of decrease of $N_1$ and is proportional to the energy density and the number of atoms in state 1:

```{math}
:label: eq:laser:absorptionRate
\begin{align*}
\frac{d N_1}{dt} = - B_{12} N_1 W(\omega), \hspace{1cm} \mathbf{absorption},
\end{align*}
```

where the constant $B_{12}>0$ has
dimension $\text{m}^3 \text{J}^{-1} \text{s}^{-2}$. Without any external
influence, an atom that is in the excited state will usually transfer to state 1
after a lifetime that depends on the transition, while emitting a photon of energy {eq}`eq:laser:photonEnergy`. This process is called **spontaneous emission**, since
it happens also without an electromagnetic field present. The rate of
spontaneous emission is given by:

```{math}
:label: eq:laser:spontaneousEmissionRate
\begin{align*}
\frac{d N_2}{dt} = - A_{21} N_2, \hspace{1cm} \mathbf{spontaneous emission},
\end{align*}
```
where $A_{21}$ has dimension $\text{s}^{-1}$. The lifetime of spontaneous emission is $\tau_{sp}=1/A_{21}$. It is important to note that the spontaneously emitted photon is emitted in a **random direction**. Furthermore, since the radiation occurs at a random time, there is no phase relation between the spontaneously emitted field and the field that excites the atom.

It is less obvious that in the presence of an electromagnetic field of frequency close to the atomic resonance, an atom in the excited state can also be **stimulated** by that field to emit a photon and transfer to the lower energy state. The rate of **stimulated emission** is proportional to the number of excited atoms and to the energy density of the field:

```{math}
:label: eq:laser:stimulatedEmission
\begin{align*}
\frac{d N_2}{dt} = - B_{21} N_2 W(\omega), \hspace{1cm} \mathbf{stimulated emission},
\end{align*}
```
where $B_{21}$ has the same dimension as $B_{12}$. It is very important to remark that stimulated emission occurs in the **same electromagnetic mode** (e.g. a plane wave) as the mode of the field that stimulates the transition and that the phase of the radiated field is **identical** to that of the exciting field. This implies that stimulated emission enhances the electromagnetic field by constructive interference. This property is crucial for the operation of the laser.

```{figure} Images/08_07_laser_2level.png
:name: fig:laser:laser2level
:alt: Three two-level energy diagrams show upward photon absorption, downward spontaneous photon emission, and downward emission stimulated by an incident photon.
Absorption, spontaneous emission and stimulated emission.
```


### Relation Between the Einstein Coefficients
The Einstein coefficients $A_{21}$, $B_{12}$ and $B_{21}$ are related. Here the two levels are assumed to have equal statistical weights; unequal degeneracies modify the relation between $B_{12}$ and $B_{21}$.
Consider a black body, such as a closed empty box. Because no radiation enters or leaves the box, after a certain time the electromagnetic energy density is the thermal density $W_T(\omega)$, which, according to Planck's Law, is independent of the material of which the box is made and is given by:

```{math}
:label: eq:laser:planckBlackbodyLaw
\begin{align*}
W_T(\omega) = \frac{ℏ \omega^3}{\pi^2 c^3} \frac{1}{ \exp\left(\frac{ℏ \omega}{k_B T}\right) -1},
\end{align*}
```
where $k_B$ is Boltzmann's constant:

```{math}
:label: eq:laser:boltzmannConstant
\begin{align*}
k_B = 1.380649 \times 10^{-23}\ \mathrm{J\,K^{-1}}.
\end{align*}
```
The rates of upward and downward transitions of the atoms in the wall of the box must be identical:

```{math}
:label: eq:laser:thermalEquilibrium
\begin{align*}
B_{12} N_1 W_T(\omega) = A_{21} N_2 + B_{21} N_2 W_T(\omega).
\end{align*}
```
Hence,

```{math}
:label: eq:laser:energyDensityEquilibrium
\begin{align*}
W_T(\omega) = \frac{A_{21} }{B_{12}N_1/N_2 - B_{21}}.
\end{align*}
```
But in thermal equilibrium:

```{math}
:label: eq:laser:boltzmannPopulation
\begin{align*}
\frac{N_2}{N_1} = \exp\left( -\frac{E_2-E_1}{k_B T}\right) = \exp\left( -\frac{ℏ \omega}{k_B T}\right).
\end{align*}
```

By substituting {eq}`eq:laser:boltzmannPopulation` into {eq}`eq:laser:energyDensityEquilibrium`, and comparing the result with {eq}`eq:laser:planckBlackbodyLaw`, it follows that both expressions
for $W_T(\omega)$ are identical for all temperatures only if

```{math}
:label: eq:laser:einsteinCoefficientsRelation
\begin{align*}
B_{12}=B_{21}, \;\;\; A_{21} = \frac{ℏ \omega^3}{\pi^2 c^3} B_{21}.
\end{align*}
```


### Example: Einstein Coefficients Ratio

For green light of $\lambda=550$ nm, $\omega/c=2\pi/\lambda\approx1.1424\times10^7\ \mathrm{m}^{-1}$ and thus

```{math}
:label: eq:laser:einsteinRatioGreen
\begin{align*}
\frac{A_{21}}{B_{21}}\approx1.593\times10^{-14}\ \mathrm{J\,s\,m^{-3}}.
\end{align*}
```
Hence the spontaneous and stimulated emission rates are equal if $W(\omega)\approx1.593\times10^{-14}\ \mathrm{J\,s\,m^{-3}}$.


For a (narrow) frequency band $\mathrm{d}\omega$ the time-averaged energy density is $W(\omega)\mathrm{d}\omega$ and for a plane wave the energy density is related to the intensity $I$ (i.e. the length of the time-averaged Poynting vector) by:

```{math}
:label: eq:laser:energyDensityIntensity
\begin{align*}
W(\omega) \mathrm{d}\omega = I /c.
\end{align*}
```
For an illustrative frequency interval of $10^{10}$ Hz, $\mathrm{d}\omega=2\pi\times10^{10}\ \mathrm{rad\,s^{-1}}$. The equal-rate spectral density above corresponds to an intensity of about $3.00\times10^5\ \mathrm{W\,m^{-2}}$ concentrated in that interval. The representative intensities in {numref}`table:laser:laser2` alone cannot determine the stimulated-emission rate: the spectral energy density at the transition frequency is what matters.
```{table}
:name: table:laser:laser2

Typical intensities of light sources
| | $I$ (W $\text{m}^{-2}$) |
| :--- | :--: |
| Mercury lamp | $10^4$ |
| Continuous laser | $10^5 $ |
| Pulsed laser | $10^{13}$ |
```


If a beam with frequency width $\mathrm{d}\omega$ and energy density $W(\omega)\mathrm{d}\omega$ propagates through a material, the rate of loss of energy is proportional to:

```{math}
:label: eq:laser:lossRate
\begin{align*}
(N_1-N_2)B_{12} W(\omega).
\end{align*}
```

The expression gives net removal of photons from the incident mode when $N_1>N_2$; spontaneous emission feeds radiation into many modes and is not an attenuation term for that beam.

When $N_2>N_1$, the light is **amplified**. This state is called **population
inversion** and it is essential for the operation of the laser. At fixed spectral energy density $W(\omega)$, the Einstein relation gives $A_{21}/[B_{21}W(\omega)]\propto\omega^3$. This scaling makes stimulated emission harder to dominate at shorter wavelengths, although practical laser design also depends on the gain medium and pumping scheme.

### Population Inversion

```{phet-legacy} lasers
:sim-name: Lasers
:label: fig:laser-phet-sim

A two- and three-level laser with pump, mirrors, and output coupler. (This is one of PhET's original Java simulations, run in the browser by CheerpJ; it downloads a Java runtime before it starts, so give it a few seconds on first load.) Build a population inversion and watch stimulated emission grow into a cavity mode.
```

For electromagnetic energy density $W(\omega)$ per unit of frequency interval, the rate equations are

```{math}
:label: eq:laser:populationRateUpper
\begin{align*}
\frac{d N_2}{d t}=-A_{21}N_2+(N_1-N_2)B_{12}W(\omega).\end{align*}
```
```{math}
:label: eq:laser:populationRateLower
\begin{align*}
\frac{d N_1}{d t}=A_{21}N_2-(N_1-N_2)B_{12}W(\omega).\end{align*}
```
Hence, for $\Delta N=N_2-N_1$:

```{math}
:label: eq:laser:populationDifferenceRate
\begin{align*}
\frac{d \Delta N}{dt} = -A_{21} \Delta N - 2 \Delta N B_{12} W(\omega) - A_{21} N,
\end{align*}
```

where as before: $N=N_1+N_2$ is constant. If initially (i.e. at $t=0$) all atoms
are in the lowest state: $\Delta N(t=0)=-N$, then it follows from {eq}`eq:laser:populationDifferenceRate`:

```{math}
:label: eq:laser:populationDifferenceTime
\begin{align*}
\Delta N(t) = -N \left[ \frac{A_{21}}{A_{21} + 2 B_{12} W(\omega)} + \left( 1-\frac{A_{21}}{A_{21}+ 2 B_{12} W(\omega)} \right) e^{ -(A_{21}+2B_{12}W(\omega))t } \right].
\end{align*}
```

An example where $A_{21}/B_{12}W(\omega)=0.5$ is shown in {numref}`fig:laser:laserDNn`. We always have $\Delta N<0$, hence $N_2(t)<N_1(t)$ for
all times $t$. Therefore, this closed two-level system cannot develop population inversion when it is pumped only on the same transition.
```{figure} Images/08_08_laser_d_nn.png
:name: fig:laser:laserDNn
:alt: Population-difference curve rises from minus one toward about minus one fifth; the horizontal axis is dimensionless time $(A_{21}+2B_{12}W)t$.
$\Delta N/N$ as a function of $(A_{21}+2B_{12}W)t$ when all atoms are in the ground state at $t=0$, i.e. $\Delta N(0)=-N$.
```


A way to achieve population inversion between levels 1 and 2, and thus amplification at $\hbar\omega=E_2-E_1$, is to use a third atomic level. In {numref}`fig:laser:laser3level` the ground state is state 1 with two upper levels 2 and 3 such that $E_1<E_2<E_3$. The transition of interest is still that from level 2 to level 1. Initially almost all atoms are in the ground state 1. Then atoms are pumped with rate $R$ from level 1 directly to level 3. The transition $3 \rightarrow 2$ is non-radiative and has a high rate $A_{32}$ so that level 3 is quickly emptied and therefore $N_3$ remains small. State 2 is called a metastable state, because the residence time of each atom in this state is relatively long. Therefore its population tends to increase, leading to population inversion between the metastable state 2 and the lower ground state 1 (which is continuously being depopulated by pumping to the highest level).

The direct relaxation rate $A_{31}$ should be small compared with $A_{32}$ so that pumping efficiently populates level 2. Because level 1 is the ground state, a three-level laser requires substantial pumping to deplete it before inversion occurs.

Pumping may be done optically as described, but the energy to transfer atoms from level 1 to level 3 can also be supplied by an electrical discharge in a gas or by an electric current.
Spontaneous emission provides seed photons in the cavity modes. Once the gain exceeds losses, stimulated emission amplifies these photons and laser oscillation grows. Photons emitted into a resonant cavity mode can stimulate atoms in level 2 to decay to level 1, each adding a photon of energy $\hbar\omega$ to that mode. The **stimulated emission enters the same mode with a fixed phase relation to the exciting light** and hence the light amplitude continuously builds up coherently, while it is bouncing back and forth between the mirrors of the resonator. An output coupler transmits a fraction of the circulating light as useful laser output.


```{figure} Images/08_09_laser_3level.png
:name: fig:laser:laser3level
:alt: Three levels E1, E2, E3 with pump arrow from E1 to E3, fast relaxation from E3 to E2, and light emission from E2 to E1.
Three-level pumping scheme: level 1 to 3 pumping, rapid 3 to 2 relaxation, and 2 to 1 laser emission.
```


## Cavities
The amplifying medium can completely fill the space between the mirrors as at the top of {numref}`fig:laser:lasercavity`, or there can be space between the amplifier and the mirrors. For example, if the amplifier is a gas, it may be enclosed by a glass cylinder. Its end faces may be cut so that the intracavity beam meets them at Brewster incidence, as shown in the middle figure of {numref}`fig:laser:lasercavity`, to minimize reflections. This type of resonator is called a resonator with external mirrors.

Often one or both mirrors are concave toward the cavity, as in the bottom drawing of {numref}`fig:laser:lasercavity`. We state without proof that in that case the distance $L$ between the mirrors and the radii of curvature $R_1$ and $R_2$ of the mirrors has to satisfy

```{math}
:label: eq:laser:cavityStabilityCondition
\begin{align*}
0 < \left( 1 - \frac{L}{R_1}\right)\left( 1- \frac{L}{R_2}\right) < 1,
\end{align*}
```
or else the laser light will ultimately leave the cavity laterally, i.e. it will escape sideways. This condition is called the **stability condition**. In this formula $R_i$ is positive for a mirror concave toward the cavity and negative for a convex mirror. Two concave mirrors can form a stable cavity when their radii and spacing satisfy the stated inequality; limiting cases require separate treatment.

```{figure} Images/08_10_laser_cavity.png
:name: fig:laser:lasercavity
:alt: Three laser cavities: gas between flat mirrors, a crystal with angled end faces and external mirrors, and a crystal between a curved and flat mirror.
Three types of laser cavity. The shaded region is the amplifier. The middle case is called a laser with external mirrors.
```


## Problems with Laser Operation
In this section we consider some problems that occur with lasers and discuss what can be done to solve them.

1. **Multiple Resonance Frequencies**

In many applications such as laser communication and interferometry one needs a single wavelength. Consider a cavity of length $L$ as shown in {numref}`fig:laser:laserLoss` and suppose that the amplifier has a gain curve covering many resonances of the resonator. One way to achieve single-frequency output is by taking care that there is only one frequency for which the gain is larger than the losses. One then says that the laser is above threshold for only one frequency. This can be done by choosing the length $L$ of the cavity to be so small that there is only one mode under the gain curve for which the gain is higher than the losses. However, a small length of the amplifier means less output power and a less collimated output beam. Another method would be to reduce the pumping so that for only one mode the gain compensates the losses. But this implies again that the laser output power is relatively small. A better solution is to add a Fabry-Perot cavity inside the laser cavity as shown in {numref}`fig:laser:laserExtraCavity`. The added Fabry–Pérot etalon has optical thickness $a$. Its approximate free spectral range at normal incidence is $c/(2a)$; for a glass plate of physical thickness $d$ and refractive index $n_e$, $a=n_e d$. Choosing a small optical thickness can leave only one etalon transmission peak under the amplifier gain curve. Furthermore, by choosing the proper angle for the Fabry-Perot cavity with respect to the axis of the laser cavity, the Fabry-Perot resonance can be coupled to the desired resonance frequency.

```{figure} Images/08_11_laser_loss_a.png
:name: fig:laser:laserLoss
:alt: Laser cavity with gain medium between mirrors; plots below show many resonances under a broad gain curve and several modes above threshold.
Laser with cavity of length $L$ and broad amplifier gain curve. Many resonance frequencies are above threshold to compensate the losses.
```


```{figure} Images/08_12_laser_extra_cavity_b.png
:name: fig:laser:laserExtraCavity
:alt: Cavity contains a thin Fabry-Perot filter of thickness a; resonance plots show its widely spaced passbands selecting a single laser line.
Laser with cavity of length $L$, a broad amplifier gain curve and an added Fabry-Perot cavity. The Fabry-Perot resonances act as an extra filter to select only one mode of the laser.
```

2. **Multiple Transverse Modes**

A common laser mode has a Gaussian transverse intensity distribution. The Gaussian transverse pattern is the fundamental **TEM$_{00}$ transverse mode**. Its standing-wave resonance has a longitudinal mode index $m$; in the plane-wave approximation for an air-filled cavity, $\nu_m\approx mc/(2L)$. However, inside the laser cavity other modes with different transverse patterns can also resonate. An example is shown in {numref}`fig:laser:laserCavityMode` where TEM$_{10}$ has two intensity maxima.

```{figure} Images/08_13_laser_cavity_mode.png
:name: fig:laser:laserCavityMode
:alt: Two curved-mirror cavity patterns: one centered TEM00 intensity lobe and a TEM10 pattern with two lobes.
Laser cavity with (0,0) and (1,0) modes.
```

There exist many more transverse modes, as shown in {numref}`fig:laser:spatialModes`. Different transverse families generally have slightly different resonance frequencies.
So even when only one longitudinal index $m$ is above threshold for TEM$_{00}$, there can be many transverse modes with frequencies very close to the frequency of the Gaussian mode, which are also above threshold. This is illustrated in {numref}`fig:laser:spectraTransMode` where the frequencies of modes (0,0), (1,0) and (1,1) all are above threshold.

```{figure} Images/08_14_laser_spatial_modes.png
:name: fig:laser:spatialModes
:alt: Grid of transverse electromagnetic intensity patterns from TEM00 through TEM33, with increasing rows and columns of bright lobes.
Intensity pattern of several transverse modes.
```

For a smooth, focusable beam, the fundamental Gaussian transverse mode is often preferred over higher-order modes.
Because TEM$_{00}$ is concentrated closest to the optical axis, a suitably chosen intracavity aperture can give higher-order transverse modes greater loss and favor fundamental-mode operation.


```{figure} Images/08_15_spectra_trans_mode.png
:name: fig:laser:spectraTransMode
:alt: Four stacked spectra show a broad gain curve, longitudinal mode spacing, and several closely spaced transverse-mode peaks.
Resonance frequencies of transverse modes that have sufficient gain to compensate the losses.
```


## Types of Lasers
There are many types of lasers: gas, solid, liquid, semiconductor, chemical, excimer, e-beam, free electron, fiber and even waveguide lasers. We classify them according to the pumping mechanism.

### Optical Pumping
The energy to transfer the atom $A$ from the ground state to the excited state is provided by light. The source could be another laser or an incoherent light source, such as a discharge lamp. If $A$ is the atom in the ground state and $A^*$ is the excited atom, we have

```{math}
:label: eq:laser:opticalPumping
\begin{align*}
ℏ \omega_{13} + A \rightarrow A^*,
\end{align*}
```
where $\omega_{13}$ is the frequency for the transition $1 \rightarrow 3$ as seen in {numref}`fig:laser:pumpingA`. The ruby laser, using chromium-doped $\mathrm{Al_2O_3}$, was the first demonstrated laser in 1960. It emits pulses of light of wavelength 694.3 nm and is optically pumped with a gas discharge lamp. Other examples include Nd:YAG, doped-glass, fiber, and dye lasers; some semiconductor lasers can also be optically pumped.

```{figure} Images/08_16_pumping_meta.png
:name: fig:laser:pumpingA
:alt: Atoms at level 1 are pumped to level 3, then relax to metastable level m, which holds a larger population.
Population transfer in an optically pumped laser: the pump raises atoms from level 1 to level 3, and a rapid transition feeds metastable level $m$, where atoms can accumulate.
```

In a dye laser the gain medium is a liquid dye, such as Rhodamine 6G. An external light source pumps it; the broad gain spectrum allows tuning over a range of wavelengths. We can select a certain wavelength by inserting a dispersive element like the Fabry-Perot cavity inside the laser cavity and rotating it at the right angle to select the desired wavelength, as explained above.

### Electron-Collision Pump
Energetic electrons are used to collide with the atoms of the amplifier, thereby transferring some of their energy:

```{math}
:label: eq:laser:electronCollisionPumping
\begin{align*}
A+e (\mathcal{E}_3) \rightarrow A^* + e(\mathcal{E}_1),
\end{align*}
```
where $e(\mathcal{E}_3)$ means an electron with energy $\mathcal{E}_3$ and where $\mathcal{E}_3-\mathcal{E}_1$ is equal to
$ℏ \omega_{13}$ so that the atom is transferred from the ground state 1 to state 3 to obtain population inversion.
Examples include some argon, krypton, nitrogen, and copper vapor lasers. In a He–Ne laser the discharge primarily excites helium, which transfers energy to neon through collisions. Electrons can be created by a discharge or by an electron beam.

```{figure} Images/08_17_hene.png
:name: fig:laser:hene
:alt: Cutaway of a helium-neon laser showing output coupler, cathode, narrow laser bore, gas reservoir, anode, and high reflector.
He–Ne laser schematic with a discharge bore, gas reservoir, cathode and anode; the output coupler and high reflector form the cavity (from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Hene-1.png) by DrBob / CC BY-SA 3.0).
```

### Atomic Collision
Let $B^m$ be atom $B$ in an excited, so-called metastable state. This means that $B^m$, although unstable, has a very long relaxation time, i.e. longer than 1 ms or so. If $B^m$ collides with atom $A$, it transfers energy to $A$.

```{math}
:label: eq:laser:atomicCollisionPumping
\begin{align*}
B^m + A \rightarrow
B + A^*,
\end{align*}
```
$A^*$ is the excited state used for the stimulated emission. If $\tau_{m1}$ is the relaxation time of metastable state $B^m$, then $\tau_{m1}$ is very large and hence the spontaneous emission rate is very small. This implies that the number of metastable atoms as a function of time $t$ is given by a slowly decaying exponential function $\exp(-t/\tau_{m1})$.

```{figure} Images/08_18_pumping_collision.png
:name: fig:laser:pumping
:alt: Excited metastable atoms B transfer energy in collisions to atoms A, moving A from level 1 to an upper excited level.
Pumping atoms $A$ to an excited state by collision with metastable atoms $B^m$.
```

To get metastable atoms, one can for example pump atom B from its ground state 1 to an excited state 3 above state m such that the spontaneous emission rate $3 \rightarrow m$ is large. The pumping can be done electrically or by any other means. If it is done electrically, then we have

```{math}
:label: eq:laser:metastablePumping
\begin{align*}
B + e(\mathcal{E}_3) \rightarrow B^m + e(\mathcal{E}_1),
\end{align*}
```

Examples of these types of laser are
He–Ne, which commonly emits red light near 632.8 nm,
N$_2$-CO$_2$ and He-Cd. Energy-transfer collisions are important in these examples, but the pumping and lasing transitions differ among the gas mixtures.
The CO$_2$ laser emits near 10.6 $\mu$m and can achieve huge power.

### Chemical Pump
In some chemical reactions, a molecule is created in an excited state with population inversion. An example is:

```{math}
:label: eq:laser:chemicalPumping
\begin{align*}
A + B_2 \rightarrow (AB)^* + B.
\end{align*}
```
So in this case the lasing will take place for a transition between states of molecule $AB$.
HF is an example of a chemically pumped laser. Excimer lasers such as ArF and XeCl use different discharge-driven mechanisms.
### Semiconductor Laser

```{figure} Images/08_19_vcsel_a.png
:name: fig:laser:vcsel
:alt: Layered semiconductor chip with top and bottom electrical contacts and a thin active layer; blue light emerges perpendicular to the chip surface.
Surface-emitting semiconductor laser: current enters through the top contact and recombination in the active layer produces a beam normal to the chip surface.
```

In the surface-emitting semiconductor laser shown in {numref}`fig:laser:vcsel`, electrical current injects electrons and holes into an active region, where recombination provides optical gain. The beam leaves approximately perpendicular to the chip surface. A vertical-cavity surface-emitting laser (VCSEL) uses mirrors above and below this region, typically distributed Bragg reflectors. This geometry differs from an edge-emitting diode laser, whose cavity runs along the chip and whose output leaves an edge.

## Chapter Summary

- **Laser** stands for Light Amplification by Stimulated Emission of Radiation.
- **Key laser properties**: High intensity, monochromaticity, directionality (low divergence), and high temporal and spatial coherence.
- **Einstein coefficients** describe absorption ($B_{12}$), stimulated emission ($B_{21}$), and spontaneous emission ($A_{21}$).
- **Population inversion** ($N_2 > N_1$) is essential for amplification; it cannot occur in thermal equilibrium.
- **Optical resonator** (cavity): Two mirrors select specific longitudinal modes; mode spacing is $\Delta\nu = c/2nL$.
- **Gain medium** amplifies light through stimulated emission; the gain curve depends on the medium's energy levels.
- **Threshold condition**: Gain must exceed losses (mirror transmission, scattering, absorption) for lasing.
- **Three-level systems**: Pumping must deplete the ground state enough for the upper laser level to become more populated.
- **Transverse modes** (TEM$_{mn}$): Higher-order modes have more complex spatial profiles; often suppressed for beam quality.
- **Pumping mechanisms**: Optical (flashlamp, diode laser), electrical (gas discharge, current injection), or chemical.
- **Laser types**: Solid-state (Nd:YAG, Ruby), gas (He-Ne, CO$_2$), semiconductor (diode lasers), and dye lasers.
