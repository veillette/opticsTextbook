---
tags:
  - interference
  - wave-optics
  - intermediate
  - theory
  - experimental
downloads:
  - id: chapter-06-pdf
    title: Download Chapter PDF
  - id: chapter-06-docx
    title: Download Chapter DOCX
---

(chapter:coh)=
# Interference and Coherence

```{note} What you should know and be able to do after studying this chapter
- Understand time coherence and spatial coherence.
- Know how the degree of time coherence can be measured with a Michelson interferometer.
- Understand the connection between the time coherence and the frequency bandwidth.
- Know that the spatial coherence of the field at two points in space can be measured with Young's two-slit experiment.
- Understand that spatial coherence increases by propagation.
- Understand how the size of an incoherent source such as a star can be derived from measuring the spatial coherence at a large distance from the source.
- Know the definition of fringe contrast.
- Know and understand the three Laws of Fresnel-Arago.
```
## Introduction

Although the model of geometrical optics helps us to design optical systems and explains many phenomena, there are properties of light that require a more elaborate model. For example, interference fringes observed in Young's double-slit experiment or the Arago spot ({numref}`fig:coh:arago`) indicate that light is more accurately modeled as a wave.
```{figure} Images/06_01_arago1.jpg
:alt: Diffraction image of a four-millimeter circular obstacle showing a small bright spot in the center of its dark shadow.

Arago spot observed with a 4 mm diameter circular disc. The bright central spot appears at the center of the disc's shadow, demonstrating the wave nature of light through constructive interference of diffracted waves. Image captured at 1 m distance using 633 nm laser light.
```
```{figure} Images/06_02_arago2.jpg
:alt: Diffraction image of a two-millimeter circular obstacle with a central bright Arago spot and surrounding rings.

Arago spot observed with a 2 mm diameter circular disc. The relative size of the central bright spot increases compared to the disc diameter, as diffraction effects become more pronounced with smaller obstacles. Image captured at 1 m distance using 633 nm laser light.
```
```{figure} Images/06_03_arago3.jpg
:alt: Diffraction image of a one-millimeter circular obstacle with a central bright spot and pronounced surrounding rings.
:name: fig:coh:arago
The Arago spot is the bright spot which occurs at the center of the shadow of a circular disc and which is caused by diffraction. The three images in this sequence show discs of diameter 4&nbsp;mm, 2&nbsp;mm, and 1&nbsp;mm, respectively. The wavelength is 633&nbsp;nm, and the intensity is recorded at 1&nbsp;m behind the discs and has a width of 16&nbsp;mm.
```


In this chapter we will study the wave model of light. It will be shown that the extent to which light can show interference depends on a property called coherence. For most of the discussion we will assume that all light has the same polarization, so that we can treat the fields as scalar. In the last section we will look at how polarization affects interference, as described by the Fresnel-Arago laws.

It is important to note that the concepts of interference and coherence are not just restricted to optics. Since quantum mechanics dictates that particles have a wave-like nature, interference and coherence also play a role in e.g. solid state physics and quantum information.

```{note} External sources in recommended order
- [KhanAcademy - Interference of light waves](https://www.khanacademy.org/science/physics/light-waves/interference-of-light-waves/v/wave-interference): Playlist on wave interference at secondary school level.
- [Yale Courses - 18. Wave Theory of Light](https://www.youtube.com/watch?v=5tKPLfZ9JVQ)
- {cite:t}`born_wolf_coherence`: Comprehensive treatment of coherence theory
- {cite:t}`michelson_interferometer`: Original paper on interferometry
- {cite:t}`fresnel_arago`: Original work on polarized light interference
```

## Interference of Monochromatic Fields of the Same Frequency
Let us first recall the basic concepts of interference. What causes interference is the fact that light is a wave, which means that it not only has an **amplitude** but also a **phase**. Suppose for example we evaluate a time-harmonic field at two points

```{math}
\begin{align*}
\mathcal{U}_1(t)=\cos(\omega t), \quad \mathcal{U}_2(t)=\cos(\omega t +\varphi).
\end{align*}
```
Here $\varphi$ denotes the phase difference between the fields at the two points. If $\varphi=0$, or $\varphi$ is a multiple of $2\pi$, the fields are **in phase**, and when they are added they interfere **constructively**

```{math}
\begin{align*}
\mathcal{U}_1(t)+\mathcal{U}_2(t)=\cos(\omega t) + \cos(\omega t + 2 m \pi) =2\cos(\omega t).
\end{align*}
```
However, when $\varphi=\pi$, or more generally $\varphi=\pi+ 2 m \pi$, for some integer $m$, then the waves are **out of phase**, and when they are superimposed, they interfere **destructively**.

```{math}
\begin{align*}
\begin{split}
\mathcal{U}_1(t)+\mathcal{U}_2(t)&=\cos(\omega t)+\cos(\omega t+\pi+ 2 m\pi) \\
&=\cos(\omega t)-\cos(\omega t) \\
&=0
\end{split}
\end{align*}
```
We can sum the two fields for arbitrary $\varphi$ more conveniently using complex notation:

```{math}
\begin{align*}
\mathcal{U}_1(t)=\text{Re}[ e^{-i\omega t}], \; \; \mathcal{U}_2(t) =\text{Re}[ e^{-i\omega t}e^{-i\varphi}].
\end{align*}
```
Adding gives

```{math}
:label: eq:coh:sumFields
\begin{aligned}
\mathcal U_1(t)+\mathcal U_2(t)
&=\operatorname{Re}\!\left[e^{-i\omega t}(1+e^{-i\varphi})\right]\\
&=\operatorname{Re}\!\left[2e^{-i(\omega t+\varphi/2)}\cos(\varphi/2)\right]\\
&=2\cos(\varphi/2)\cos(\omega t+\varphi/2).
\end{aligned}
```
For $\varphi= 2 m \pi$ and $\varphi=\pi+2 m \pi$ we retrieve the results obtained before. It is important to realize that what we see or detect physically (the 'brightness' of light) does not correspond to the quantities $\mathcal{U}_1$, $\mathcal{U}_2$. After all, $\mathcal{U}_1$ and $\mathcal{U}_2$ can attain negative values, while there is no such thing as 'negative brightness'. What $\mathcal{U}_1$ and $\mathcal{U}_2$ describe are the **fields**, which may be positive or negative.
The 'brightness' or the **irradiance** or **intensity** is given by taking an average over a long time of
$\mathcal{U}(t)^2$ (as discussed in Chapter 1).
We shall omit the factor $\sqrt{\epsilon/\mu_0}$. As explained in Chapter 1, we see and measure only the long time-average of $\mathcal{U}(t)^2$, because at optical frequencies $\mathcal{U}(t)^2$ fluctuates very rapidly.
We recall the definition of the time average over an interval of length $T$ at a specific time $t$ from Chapter 1:

```{math}
:label: eq:coh:timeAverage
\begin{align*}
\langle f(t) \rangle= \frac{1}{T}\int_{t}^{t+T}f(t')\,\text{d}t',
\end{align*}
```
where $T$ is a time interval that is the response time of a typical detector, i.e. $T\approx 10^{-6}\,\text{s}$ which is extremely long compared to the period of visible light which is of the order of $10^{-15}\, \text{s}$.
For a time-harmonic function, the long-time average is equal to the average over one period of the field and hence **it is independent of the time $t$ at which it is taken**.
Indeed for {eq}`eq:coh:sumFields` we get

```{math}
\begin{aligned}
I
&=\left\langle\left(\mathcal U_1(t)+\mathcal U_2(t)\right)^2\right\rangle\\
&=4\cos^2(\varphi/2)\left\langle\cos^2(\omega t+\varphi/2)\right\rangle\\
&=2\cos^2(\varphi/2)=1+\cos\varphi.
\end{aligned}
```
Using complex notation one can obtain this result more easily. Let

```{math}
\begin{align*}
\mathcal{U}_1(t)=\text{Re}[U_1 e^{-i\omega t}], \quad \mathcal{U}_2(t)=\text{Re}[U_2 e^{-i\omega t}],
\end{align*}
```
where

```{math}
\begin{align*}
U_1=1, \quad U_2=e^{-i\varphi}.
\end{align*}
```
Then we find

```{math}
\begin{align*}
\begin{split}
|U_1+U_2|^2 &= |1+e^{-i\varphi}|^2 \\
&= (1+e^{i\varphi})(1+e^{-i\varphi}) \\
&= 1+1+e^{-i\varphi}+e^{i\varphi} \\
&= 2+2\cos(\varphi),
\end{split}
\end{align*}
```
hence

```{math}
:label: eq:coh:intensitySum
\begin{align*}
I = \frac{1}{2}|U_1 + U_2|^2.
\end{align*}
```
To see why this works, recall the time averaging formula and choose $A=B=U_1+U_2$.


**Remark.** To shorten the formulae, we will omit in this chapter the factor $1/2$ in front of the time-averaged intensity.


Hence we define $I_1=|U_1|^2$ and $I_2=|U_2|^2$, and we then find for the time-averaged intensity of the sum of $U_1$ and $U_2$:

```{math}
:label: eq:coh:interferenceGeneral
\begin{align*}
I &= |U_1+U_2|^2=(U_1+U_2)(U_1+U_2)^*
 \\
&= |U_1|^2+|U_2|^2+U_1U_2^*+U_1^* U_2
 \\
&= I_1+I_2+2\text{Re}[ U_1 U_2^* ]
 \\
&= I_1 + I_2 + 2 \sqrt{I_1}\sqrt{I_2}\cos(\phi_1-\phi_2),
\end{align*}
```
where $\phi_1$ and $\phi_2$ are the arguments of $U_1$ and $U_2$ and $\phi_1-\phi_2$ is the phase difference.
The term $2\text{Re}[U_1^* U_2]$ is known as the **interference term**. In the famous double-slit experiment (which we will discuss in a later section), we can interpret the terms as follows: let us say $U_1$ is the field that comes from slit 1, and $U_2$ comes from slit 2. If only slit 1 is open, we measure intensity $I_1$ on the screen, and if only slit 2 is open, we measure $I_2$. If both slits are open, we would not measure $I_1+I_2$, but we would observe fringes due to the interference term $2\text{Re}[U_1^* U_2]$.

The intensity {eq}`eq:coh:interferenceGeneral` varies when the phase difference varies. These variations are called fringes.
The fringe contrast is defined by

```{math}
:label: eq:coh:fringeContrast
\begin{align*}
\textrm{ Fringe contrast} = \frac{ I_{max}-I_{min}}{I_{max}+I_{min}}.
\end{align*}
```
It is maximum and equal to $1$ when the intensities of the interfering fields are the same. If these intensities are different the fringe contrast is less than 1.

More generally, the intensity of a sum of multiple time-harmonic fields $U_j$ all having the same frequency is given by the **coherent sum**

```{math}
\begin{align*}
I=\left|\sum_j U_j\right|^2.
\end{align*}
```
However, we will see in the next section that sometimes the fields are unable to interfere. In that case all the interference terms of the coherent sum vanish, and the intensity is given by the **incoherent sum**

```{math}
\begin{align*}
I=\sum_j |U_j|^2.
\end{align*}
```

## Coherence
In the discussion so far we have only considered **monochromatic** light, which means that the spectrum of the light consists of only one frequency.
Although light from a laser often has a very narrow band of frequencies and therefore can be considered to be monochromatic, purely monochromatic light does not exist.
One reason that light can not be perfectly monochromatic is that any source must have been switched on a finite time ago.
Hence, all light consists of multiple frequencies and therefore is **polychromatic**.
Classical light sources such as incandescent lamps and also LEDs have relatively broad frequency bands. The question then arises how polychromatic light behaves differently from idealized monochromatic light.
To answer this question, we must study the topic of coherence. One distinguishes between two extremes: fully **coherent** and fully **incoherent** light, while the degree of coherence of practical light is somewhere in between. A broader frequency band generally gives a shorter temporal coherence time. Spatial coherence also depends on source size and geometry. It is a very important observation that no light is actually completely coherent or completely incoherent. All light is **partially coherent**, but some light is more coherent than others.

An intuitive way to think about these concepts is in terms of the ability to form interference fringes. For example, with laser light, which usually is almost monochromatic and hence coherent, one can form an interference pattern with clear maxima and minima in intensities using a double slit, while with sunlight (which is incoherent) this is much more difficult. Every frequency in the spectrum of sunlight gives its own interference pattern with its own frequency dependent fringe pattern. These fringe patterns wash out due to superposition and the total intensity therefore shows little fringe contrast, i.e. the coherence is less.
However, it is not impossible to create interference fringes with natural light{cite:p}`young_interference`.
The trick is to let the two slits be so close together (of the order of $0.02~\text{mm}$) that the *difference* in distances from the slits to the sun is small enough for the fields in the slits to be sufficiently coherent to interfere.
For one point source, a path difference determines the time delay between fields at two observation points. For an extended source, distance matters as well: it changes the angular size of the source and thus the spatial coherence.

(sec:coh:cohsources)=
### Coherence of Light Sources

In a conventional light source such as a gas discharge lamp, photons are generated by **spontaneous emission** with energy equal to the energy difference between certain electronic states of the atoms of the gas. These transitions have a duration of the order of $10^{-8}$ to
$10^{-9} \, \text{s}$. Because the emitted wave trains are finite, the emitted light does not have a single frequency; instead, there is a band of frequencies around a center frequency with width roughly equal to the reciprocal of the duration of the wave train. This spread of frequencies is called the **natural linewidth**. Random thermal motions of the molecules cause further broadening due to the Doppler effect. In addition, the atoms undergo collisions that interrupt the wave trains and therefore further broaden the frequency spectrum.

We first consider a **single emitting atom**. When collisions are the dominant broadening effect and these collisions are sufficiently brief, so that any radiation emitted during the collision can be ignored, an accurate model for the emitted wave is a steady monochromatic wave train at frequency $\bar{\omega}$ at the center of the frequency band, interrupted by random phase jumps each time that a collision occurs. The discontinuities in the phase due to the collisions cause a spread of frequencies around the center frequency. An example is shown in {numref}`fig:coh:atomRandomEmission`. The average time $\tau_0$ between the collisions is typically less than $10^{-10}$&nbsp;s which implies that on average between two collisions roughly $10^5$ harmonic oscillations occur and that during an atomic transition of the order of a hundred collisions may occur. A coherence time characterizes the delay over which a field remains strongly correlated with itself; its precise value depends on the chosen correlation threshold. In this collision-dominated model it is of the order of the mean time between collisions, $\tau_0$, which may be about $10^{-10}$&nbsp;s.

To understand coherence and incoherence, it is helpful to use this model for the emission by a single atom as harmonic wave trains of many thousands of periods interrupted by roughly a hundred random phase jumps. Due to the random phase jumps, the interference term of the sum of harmonic wave trains emitted by two atoms, when integrated over the relatively long integration time of a detector, becomes a sum over integrals over time intervals of average length $\tau_0$:

$$
\sum_{j} \int_0^{\tau_0} \cos(\omega t) \cos(\omega t + \phi_j) \text{d} t,
$$
where the sum is over roughly one hundred random phase jumps during the total duration of the wave trains. The random phase jumps lead to cancellation of the integrals and hence the interference term vanishes.
We conclude that over the integration time of typical detectors


```{note}
Independent atoms have uncorrelated phases, so their interference cross terms vanish after averaging. Their instantaneous fields still add.
```


```{figure} Images/06_04_atom_random_emission.png
:alt: A sinusoidal wave train with abrupt random phase changes at collision times separated on average by tau zero.
:name: fig:coh:atomRandomEmission
The electric field amplitude of the harmonic wave train radiated by a single atom at the center frequency $\bar{\omega}$. The vertical lines are collisions separated by periods of free flight with mean duration $\tau_0$. The quantity $\bar{\omega}\tau_0$, which is the number of periods in a typical wave train, is chosen unrealistically small (namely 60, whereas a realistic value would be $10^5$) to show the random phase changes.
```

For a narrow, smooth spectral line, the coherence time is of order the reciprocal bandwidth. If linewidth is quoted as an ordinary frequency width $\Delta f=\Delta\omega/(2\pi)$, an estimate is

```{math}
:label: eq:coh:coherenceTime
\begin{align*}
\tau_c \sim \frac{1}{\Delta f}=\frac{2\pi}{\Delta\omega}.
\end{align*}
```
The corresponding coherence length is estimated by

```{math}
:label: eq:coh:coherenceLength
\begin{align*}
\ell_c=c\tau_c.
\end{align*}
```
For a narrow band in vacuum, $\lambda\omega=2\pi c$ gives, to first order in bandwidth,

```{math}
:label: eq:coh:wavelengthFrequencyRatio
\begin{align*}
\frac{\Delta \lambda}{\bar{\lambda}} = \frac{\Delta \omega}{\bar{\omega}},
\end{align*}
```
where $\bar{\lambda}$ and $\bar{\omega}$ are the wavelength and the frequency at the center of the line. Hence,

```{math}
:label: eq:coh:coherenceLengthWavelength
\begin{align*}
\ell_c \sim c\tau_c \sim \frac{\bar{\lambda}^2}{\Delta\lambda}.
\end{align*}
```
Order-of-magnitude coherence lengths and times of several sources are listed in {numref}`table:coh:tableCoh`. For a laser, the linewidth is extremely small and the coherence time very long. This is because the photons in a laser are not generated predominantly by spontaneous emission as they are in classical sources, but instead by **stimulated emission**. Lasers are discussed in {ref}`chapter:laser`.

```{table}
:name: table:coh:tableCoh

Coherence time and coherence length of several sources
| Source | Mean wavelength | Linewidth | Coherence Length | Coherence Time |
| :--- | :--: | :--: | :--: | :--: |
| | $\bar{\lambda}$ | $\Delta \lambda$ | $\bar{\lambda}^2/\Delta \lambda$ | $\tau_c$ |
| Mid-IR (3-5 $\mu\text{m}$) | 4.0 $\mu\text{m}$ | $2.0~\mu\text{m}$ | 8.0 $\mu\text{m}$| $2.66 \times10^{-14}$ s. |
| White light | 550 nm | $\approx 300 $ nm | $ \approx 900$ nm | $ \approx 3.0 \times 10^{-15}$s.|
| Mercury arc | 546.1 nm | $\approx 1.0$ nm | $\approx 0.3$ mm | $ \approx 1.0 \times 10^{-12}$s. |
| $\text{Kr}^{86}$ discharge lamp | 605.6 nm | $1.2 \times 10^{-3}$ nm | 0.3 m | $ 1.0 \times 10^{-9}$s. |
| Stabilized He-Ne laser | 632.8 nm | $\approx 10^{-6}$ nm | 400 m | $1.33\times 10^{-6}$s. |
```


### Polychromatic Light
When dealing with coherence one has to consider fields that consist of a range of different frequencies. Let ${\cal U}(\mathbf{r},t)$ be the real-valued field component. It is always possible to write ${\cal U}(\mathbf{r},t)$ as an integral over time-harmonic components:

```{math}
:label: eq:coh:realFieldIntegral
\begin{align*}
{\cal U}(\mathbf{r}, t) = \text{Re} \int_0^\infty A_\omega(\mathbf{r}) e^{-i \omega t} \, \, \text{d} \omega,
\end{align*}
```
where $A_\omega(\mathbf{r})$ is the complex amplitude of the time-harmonic field with frequency $\omega$.
When there is only a certain frequency band that contributes, then $A_\omega=0$ for $\omega$ outside this band.
We define the **complex time-dependent field** $U(\mathbf{r},t)$ by

```{math}
:label: eq:coh:complexFieldIntegral
\begin{align*}
U(\mathbf{r},t) = \int_0^\infty A_\omega(\mathbf{r}) e^{-i\omega t}\ \, \text{d} \omega.
\end{align*}
```
Then

```{math}
:label: eq:coh:realFromComplex
\begin{align*}
\mathcal{U}(\mathbf{r},t)= \text{Re}\, U(\mathbf{r},t).
\end{align*}
```
**Remark**: The complex field $U(\mathbf{r},t)$ now contains the time dependence in contrast to the notation used for a time-harmonic (i.e. single frequency) field introduced in Chapter 2, where the time-dependent $e^{-i\omega t}$ was a separate factor.


We now compute the intensity of polychromatic light.
The instantaneous energy flux is (as for monochromatic light) proportional to the square of the instantaneous real field:
$\mathcal{U}(\mathbf{r},t)^2$. We average the instantaneous intensity over the
integration time $T$ of common detectors. As stated before, this integration time
is very long compared to the period at the center frequency $2\pi/\bar{\omega}$ of the
field. Using {eq}`eq:coh:timeAverage` and

```{math}
\begin{align*}
\mathcal{U}(\mathbf{r},t)=
\text{Re}\, U(\mathbf{r},t)
=(U(\mathbf{r},t)+U(\mathbf{r},t)^*)/2,
\end{align*}
```
we get

```{math}
:label: eq:coh:polychromaticIntensity
\begin{align*}
\langle  \mathcal{U}(\mathbf{r},t)^2  \rangle &= \frac{1}{4} \langle  (U(\mathbf{r},t)+U(\mathbf{r},t)^*)(U(\mathbf{r},t)+U(\mathbf{r},t)^*) \rangle \nonumber \\
&= \frac{1}{4} \left\{ \langle U(\mathbf{r},t)^2 \rangle + \langle (U(\mathbf{r},t)^*)^2 \rangle + 2 \langle U(\mathbf{r},t)^* U(\mathbf{r},t) \rangle\right\} \nonumber \\
&\approx \frac{1}{2} \langle U(\mathbf{r},t)U(\mathbf{r},t)^* \rangle \nonumber \\
&= \frac{1}{2} \langle |U(\mathbf{r},t)|^2  \rangle,
\end{align*}
```
where the averages of $U(\mathbf{r},t)^2$ and $(U(\mathbf{r},t)^*)^2$ are zero because they are fast-oscillating and go through many cycles during the integration time of the detector.
In contrast, $|U(\mathbf{r},t)|^2=U(\mathbf{r},t)^*U(\mathbf{r},t)$ has a DC-component which does not average to zero.


**Remark:** In contrast to the time-harmonic case, the long time average of polychromatic light depends on the time $t$ at which the average is taken. However, we assume in this chapter that the fields are emitted by sources that are **stationary**. The property of stationarity implies that the average over the time interval of long length $T$ does not depend on the time at which the average is taken. Many light sources, in particular conventional lasers, are stationary. (However, a laser source which emits short high-power pulses cannot be considered as a stationary source).
We furthermore assume that the fields are **ergodic**, which means that taking
the time-average over a long time interval amounts to the same as taking the
average over the ensemble of possible fields. It can be shown that this property
implies that the limit $T\rightarrow \infty$ in {eq}`eq:coh:timeAverage` indeed
exists{cite:p}`mandel_wolf`.


We use for the intensity again the expression without the factor $1/2$ in front, i.e.

```{math}
:label: eq:coh:intensityDefinition
\begin{align*}
I(\mathbf{r}) &= \langle  |U(\mathbf{r},t)|^2 \rangle.
\end{align*}
```
The time-averaged intensity has hereby been expressed in terms of the **time-average of the squared modulus of the complex field**.

**Quasi-monochromatic field**.
If the width $\Delta \omega$ of the frequency band is very narrow compared to the center frequency $\bar{\omega}$, we speak of a quasi-monochromatic field. In the propagation of quasi-monochromatic fields, we use the formula for time-harmonic fields at $\bar{\omega}$. The quasi-monochromatic assumption simplifies the computations considerably and will therefore be used frequently.

(sec:coh:tempcoh)=
## Temporal Coherence and the Michelson Interferometer

To investigate the time coherence of a field at a certain point $\mathbf{r}$,
we let the field at that point interfere with a delayed copy of itself, i.e. we let
$U(\mathbf{r},t)$ interfere with $U(\mathbf{r}, t-\tau)$.
Because, when studying temporal coherence, the point $\mathbf{r}$ is always the same, we omit it from the formula. Furthermore, for easier understanding of the phenomena, we assume for the time being that the field considered is emitted by a single atom (i.e. a point source).

Temporal coherence is closely related to the spectral content of the light: if the light consists of fewer frequencies (think of monochromatic light), then it is more temporally coherent. To study the interference of $U(t)$ with $U(t-\tau)$, a Michelson interferometer, shown in {numref}`fig:coh:temporalCoherence`, is a suitable setup. The light that goes through one arm takes time $t$ to reach the detector, while the light that goes through the other (longer) arm takes time $t+\tau$, which means that it was radiated earlier. Therefore, the detector observes the time-averaged intensity $\langle |U(t)+U(t-\tau)|^2 \rangle$. As remarked before, this averaged intensity does not depend on the time the average is taken; it only depends on the time difference $\tau$ between the two beams.
```{figure} Images/06_05_temporal_coherence.png
:alt: Michelson interferometer: a beam splitter sends light to two mirrors and recombines the returning beams at a detector.
:name: fig:coh:temporalCoherence
A Michelson interferometer to study the temporal coherence of a field. A beam is split in two by a beam splitter, and the two beams propagate over different distances, corresponding to a time difference $\tau$, and then interfere at the detector.
```

```{openlyceum} InterferometryLab
:screen: 1
:label: fig:coh-michelson-sim

A physical-optics Michelson: move a mirror, change the source coherence length, and watch fringe visibility collapse. The intensity versus delay is the self-coherence function of this section, measured rather than postulated.
```

We have

```{math}
:label: eq:coh:intensityTimeDelay
\begin{aligned}
I(\tau)
&=\left\langle|U(t)+U(t-\tau)|^2\right\rangle\\
&=\langle|U(t)|^2\rangle+\langle|U(t-\tau)|^2\rangle
 +2\operatorname{Re}\langle U(t)U(t-\tau)^*\rangle\\
&=2I_0+2\operatorname{Re}\Gamma(\tau).
\end{aligned}
```
The detected intensity varies with the difference in arm length.

So far we have considered a field that originates from a single atom. The total field emitted by an extended source is the sum of fields $U_i(t)$ corresponding to all atoms $i$. As has been explained already, fields from independent atoms have cross terms that vanish after averaging. But the field emitted by an atom can interfere with the delayed field of that same atom and for every atom the interference is given by the same expression {eq}`eq:coh:intensityTimeDelay`. If the atoms contribute equally and share the same spectral shape, the total intensity is the single-atom result multiplied by their number. More generally, their intensities add, each with its own self-coherence term.

The **self coherence function** $\Gamma(\tau)$ is defined by

```{math}
\begin{align*}
\Gamma(\tau)=\langle U(t)U(t-\tau)^* \rangle \hspace{1.5cm}\mathbf{self-coherence}.
\end{align*}
```

The intensity of $U(t)$ is

```{math}
\begin{align*}
I_0=\langle |U(t)|^2 \rangle = \Gamma(0).
\end{align*}
```
The **complex degree of self-coherence** is defined by:


```{math}
:label: eq:coh:selfCoherenceDegree
\begin{align*}
\gamma(\tau)=\frac{\Gamma(\tau)}{\Gamma(0)}. \hspace{1.2cm} \mathbf{complex degree of self-coherence}
\end{align*}
```
 Using the Cauchy–Schwarz inequality it can be shown that this is a complex number with modulus between $0$ and $1$:

```{math}
:label: eq:coh:selfCoherenceBounds
\begin{align*}
0 \leq |\gamma(\tau)| \leq 1.
\end{align*}
```
The observed intensity can then be written:

```{math}
:label: eq:coh:interferenceCoherence
\begin{align*}
I(\tau)=2 I_0 \left\{1 +\text{Re}\left[\gamma(\tau)
\right]\right\},
\end{align*}
```

We consider two special cases.

1. Suppose $U(t)$ is a monochromatic wave

```{math}
\begin{align*}
U(t)=e^{-i\omega t}.
\end{align*}
```
In that case we get for the self-coherence

```{math}
:label: eq:coh:selfCoherenceMonochromatic
\begin{align*}
\begin{split}
\Gamma(\tau)&=\langle e^{-i\omega t}e^{i\omega (t-\tau)} \rangle
=e^{-i\omega \tau},
\end{split}
\end{align*}
```
and

```{math}
:label: eq:coh:gammaMonochromatic
\begin{align*}
\gamma(\tau) = e^{-i\omega \tau}.
\end{align*}
```
Hence the interference pattern is given by

```{math}
:label: eq:coh:temporalCoherence
\begin{align*}
\begin{split}
I(\tau)&=2\left[1+ \cos\left( \omega\tau \right) \right].
\end{split}
\end{align*}
```
So for monochromatic light we expect to detect a cosine interference pattern, which shifts as we change the arm length of the interferometer (i.e. change $\tau$). No matter how large the time delay $\tau$, a clear interference pattern should be observed.


2. Next we consider what happens when the light is a superposition of two frequencies:

```{math}
\begin{align*}
U(t)=\frac{e^{-i(\bar{\omega}+\Delta\omega/2) t}+e^{-i(\bar{\omega}-\Delta\omega/2) t}}{2},
\end{align*}
```
where $\left(2\pi/T\right) \ll \Delta \omega \ll \bar{\omega}$, and $T$ is the integration time of the detector.
Then:

```{math}
:label: eq:coh:fringeTwoFrequencies
\begin{aligned}
\Gamma(\tau)
&=\frac14\left\langle
\left(e^{-i\omega_+t}+e^{-i\omega_-t}\right)
\left(e^{i\omega_+(t-\tau)}+e^{i\omega_-(t-\tau)}\right)
\right\rangle\\
&\simeq\frac14\left(e^{-i\omega_+\tau}+e^{-i\omega_-\tau}\right)\\
&=\frac12e^{-i\bar\omega\tau}\cos(\Delta\omega\tau/2),
\qquad \omega_\pm=\bar\omega\pm\Delta\omega/2.
\end{aligned}
```
where in the second line the time average of terms that oscillate with time is set to zero because the averaging is done over a time interval $T$ satisfying $T\Delta\omega \gg 1$.
Hence, the complex degree of self-coherence is:

```{math}
:label: eq:coh:gammaTwoFrequencies
\begin{align*}
\gamma(\tau)= \cos\left(\Delta\omega\,\tau/2 \right) e^{-i \bar{\omega} \tau}
\end{align*}
```
and {eq}`eq:coh:interferenceCoherence` becomes

```{math}
:label: eq:coh:intensityTwoFrequencies
\begin{align*}
I(\tau)= \left\{1 +\text{Re}\left[\gamma(\tau)
\right]\right\}= 1 + \cos\left(\Delta\omega\,\tau/2\right) \cos(\bar{\omega} \tau ).
\end{align*}
```
The interference term is the product of the function $\cos(\bar{\omega}\tau)$, which is a rapidly oscillating function of $\tau$, and a slowly varying envelope $\cos \left(\Delta\omega\,\tau/2\right)$.
The visibility envelope $|\cos(\Delta\omega\tau/2)|$ vanishes at some delays and then revives periodically. Thus this ideal two-line source has no single coherence decay time. Increasing line separation brings the first zero closer to zero delay[^3][^4]. For a smooth, broad spectrum the correlation envelope commonly narrows as bandwidth increases. A practical **coherence time** needs a stated visibility threshold or linewidth convention.
We conclude with some further interpretations of the degree of self-coherence $\gamma(\tau)$.

**Remarks.**

1. In stochastic signal analysis $\Gamma(\tau)=\langle U(t)U(t-\tau)^* \rangle$ is
   called the **autocorrelation** of $U(t)$. Informally, one can interpret the
   autocorrelation function as the ability to predict the field $U$ at time $t$
   given the field at time $t-\tau$.

2. For a stationary field, the Wiener–Khinchin theorem relates the self-coherence function to the power spectral density. With the Fourier convention used here,

```{math}
:label: eq:coh:wienerKhinchin
S_U(\omega)=\int_{-\infty}^{\infty}\Gamma(\tau)e^{i\omega\tau}\,\mathrm{d}\tau.
```

The Fourier relation shows that the larger the spread of the frequencies of $U(t)$ (i.e. the larger the bandwidth), the more sharply peaked $\Gamma(\tau)$ is. Thus, the light gets temporally less coherent when it consists of a broader range of frequencies. Measuring the spectral power density with a spectroscope and applying an inverse Fourier transform is an alternative method to obtain the complex self-coherence function.


(sec:coh:spatcoh)=
## Spatial Coherence and Young's Experiment

Temporal coherence concerns the coherence of the field in one point. The absolute value of the degree of self coherence {eq}`eq:coh:selfCoherenceDegree` quantifies how strong the interference is of the field in the point of interest with the field in that same point at a later time. In contrast, spatial coherence is concerned with determining how coherent the fields in two different points are. This is done by letting the fields interfere using a mask with two small holes at the positions of the points of interest and observing the fringe contrast at a distant screen (Young's experiment).

While for temporal coherence we used a **Michelson interferometer**, the natural choice to characterize spatial coherence is
**Young's experiment**, because it allows the fields in two points $P_1$, $P_2$ which are separated in space to interfere with each other.

```{phet} wave-interference
:screen: 3
:label: fig:coh-young-sim

Young's geometry with slit separation, slit width, and wavelength under direct control. Switch between one slit and two: the fringe contrast on the screen is the spatial-coherence diagnostic used throughout this section.
```

```{figure} Images/06_06_spatial_coherence.png
:alt: Light from two pinholes P1 and P2 travels different distances to a point on a distant screen.
:name: fig:coh:spatialCoherence
The spatial coherence of light from an extended source.
```

Let $\mathbf{r}_1$ and $\mathbf{r}_2$ be the position vectors of the points $P_1$ and $P_2$, respectively.
We write the complex field in $P_1$ as a superposition of monochromatic fields as in {eq}`eq:coh:complexFieldIntegral`:

```{math}
:label: eq:coh:complexFieldP1
\begin{align*}
U(\mathbf{r}_1,t) = \int A_\omega(\mathbf{r}_1) e^{-i\omega t}\ \, \text{d} \omega.
\end{align*}
```
The reason for doing this is that for a monochromatic field in the pinhole, i.e. a field with a well defined frequency, we can derive the disturbance in any point $\mathbf{r}$ behind the mask.
In fact, according to the Huygens-Fresnel Principle, a monochromatic disturbance with frequency $\omega$ in the pinhole at $\mathbf{r}_1$ generates a radiating spherical wave with the same frequency $\omega$. Apart from a common diffraction and obliquity factor, its field at $\mathbf{r}$ is proportional to

```{math}
:label: eq:coh:timeHarmonicSpherical
\frac{C\,A_\omega(\mathbf r_1)}{|\mathbf r-\mathbf r_1|}
e^{-i\omega\left(t-|\mathbf r-\mathbf r_1|/c\right)}
```
Here $C$ is a common complex coupling factor that includes pinhole area, diffraction normalization, and the obliquity factor. We treat it as frequency independent over a narrow band and approximately equal for the two identical pinholes in the far field. The frequency remains in the propagation phase because even a small frequency change can produce a substantial phase change over a long path.
The total field $U_1(\mathbf{r},t)$ in $\mathbf{r}$ due to the pinhole at $P_1$ is obtained by integrating the monochromatic components over frequency:

```{math}
:label: eq:coh:huygensFresnel
\begin{aligned}
U_1(\mathbf r,t)
&=C\int_0^\infty A_\omega(\mathbf r_1)
\frac{e^{-i\omega\left(t-|\mathbf r-\mathbf r_1|/c\right)}}{|\mathbf r-\mathbf r_1|}
\,\mathrm d\omega\\
&=\frac{C}{|\mathbf r-\mathbf r_1|}
U\!\left(\mathbf r_1,t-\frac{|\mathbf r-\mathbf r_1|}{c}\right).
\end{aligned}
```
In words:

```{note}
The field in $\mathbf{r}$ at time $t$ due to the pinhole at $\mathbf{r}_1$ is proportional to the field at $\mathbf{r}_1$ at the earlier time $t-|\mathbf{r}-\mathbf{r}_1|/c$ for the light to propagate from $\mathbf{r}_1$ to $\mathbf{r}$. The proportionality factor scales with the reciprocal distance between $\mathbf{r}$ and $\mathbf{r}_1$.
```

For the field in $\mathbf{r}$ due to pinhole 2 we have similarly

```{math}
:label: eq:coh:huygensFresnelP2
U_2(\mathbf r,t)=
\frac{C}{|\mathbf r-\mathbf r_2|}
U\!\left(\mathbf r_2,t-\frac{|\mathbf r-\mathbf r_2|}{c}\right).
```
The total field in $\mathbf{r}$ is the sum $U_1(\mathbf{r},t)+U_2(\mathbf{r},t)$.
Because of the difference in propagation distance
$\Delta R=|\mathbf{r}-\mathbf{r}_2|-|\mathbf{r}-\mathbf{r}_1|$, there is a time difference $\tau$ between the times when the two fields were emitted by the two pinholes so that they arrive at a given time $T$ at point $\mathbf{r}$ on the screen in {numref}`fig:coh:spatialCoherence`. This time difference is given by

```{math}
:label: eq:coh:timeDifference
\begin{align*}
\tau = \frac{\Delta R}{c}.
\end{align*}
```
Furthermore, the amplitudes are reduced by a factor proportional to the reciprocal distance which is different for the two fields. But if the distance of the screen to the mask is large enough, we may assume these factors to be the same and then omit them.
Using {eq}`eq:coh:timeDifference`, the interference pattern on the screen is then, apart from a constant factor, given by

```{math}
:label: eq:coh:spatialFringe
\begin{aligned}
I(\tau)
&=\left\langle\left|U(\mathbf r_1,t)+U(\mathbf r_2,t-\tau)\right|^2\right\rangle\\
&=\langle|U(\mathbf r_1,t)|^2\rangle
 +\langle|U(\mathbf r_2,t)|^2\rangle
 +2\operatorname{Re}\langle U(\mathbf r_1,t)U(\mathbf r_2,t-\tau)^*\rangle\\
&=I_1+I_2+2\operatorname{Re}\Gamma_{12}(\tau).
\end{aligned}
```
The second line uses stationarity: delaying a field does not change its mean intensity.
We define the **mutual coherence function** by:


```{math}
:label: eq:coh:mutualCoherence
\begin{align*}
\Gamma_{12}(\tau)=\langle \,U(\mathbf{r}_1,t)U(\mathbf{r}_2,t-\tau)^*\, \rangle, \hspace{1.5cm} \mathbf{mutual coherence}.
\end{align*}
```

With the intensities

```{math}
\begin{align*}
\begin{split}
I_1&=\langle \, |U(\mathbf{r}_1,t)|^2\,  \rangle = \Gamma_{11}(0),\\
I_2&=\langle \, |U(\mathbf{r}_2,t)|^2\,  \rangle = \Gamma_{22}(0).
\end{split}
\end{align*}
```

the **complex degree of mutual coherence** is defined by

```{math}
:label: eq:coh:mutualCoherenceDegree
\begin{align*}
\gamma_{12}(\tau)=\frac{\Gamma_{12}(\tau)}{\sqrt{ \Gamma_{11}(0)}\sqrt{\Gamma_{22}(0)}}, \quad \mathbf{complex degree of mutual coherence}.
\end{align*}
```

It can be proved using Bessel's inequality that

```{math}
:label: eq:coh:gamma12Bound
|\gamma_{12}(\tau)| \leq 1.
```

We can now write {eq}`eq:coh:spatialFringe` as

```{math}
\begin{align*}
I(\tau)=I_1+I_2+2\sqrt{I_1}\sqrt{I_2}\,\text{Re} \, \gamma_{12}(\tau).
\end{align*}
```
By varying the point $\mathbf{r}$ over the screen we can vary $\tau$ and by measuring the intensities we can determine the real part of $\gamma_{12}(\tau)$ and hence the fringe contrast observed on the screen.

As an example, consider what happens when $U(\mathbf{r},t)$ is a monochromatic field

```{math}
\begin{align*}
U(\mathbf{r},t)=A(\mathbf{r})e^{-i\omega t}.
\end{align*}
```
In that case

```{math}
\begin{align*}
\begin{split}
\Gamma_{12}(\tau) &= \langle A(\mathbf{r}_1)A(\mathbf{r}_2)^*e^{-i\omega t}e^{i\omega (t-\tau)} \rangle \\
&= A(\mathbf{r}_1) A(\mathbf{r}_2)^*e^{-i\omega \tau}
\end{split}
\end{align*}
```
and

```{math}
:label: eq:coh:gammaSelfCoherence
\Gamma_{11}(0)= |A(\mathbf{r}_1)|^2, \quad \Gamma_{22}(0)=|A(\mathbf{r}_2)|^2.
```

So we get

```{math}
:label: eq:coh:gamma12Monochromatic
\begin{align*}
\gamma_{12} (\tau) = \frac{\Gamma_{12}(\tau)}{|A(\mathbf{r}_1)| |A(\mathbf{r}_2)|} = e^{-i \omega \tau + i \varphi},
\end{align*}
```
where $\varphi=\arg A(\mathbf{r}_1)-\arg A(\mathbf{r}_2)$. In this case
$\gamma_{12}$ has modulus 1, as expected for a monochromatic field.
The intensity on the screen becomes

```{math}
:label: eq:coh:doubleSlitInterference
\begin{align*}
I(\tau)=|A(\mathbf{r}_1)|^2+|A(\mathbf{r}_2)|^2+2|A(\mathbf{r}_1)||A(\mathbf{r}_2)|\cos\left(\omega \tau -\varphi\right).
\end{align*}
```
The fields are fully coherent because $|\gamma_{12}|=1$. Their fringe contrast is $2\sqrt{I_1I_2}/(I_1+I_2)$, reaching 1 only when the pinhole intensities are equal. If $\varphi=0$, then interference maxima occur for

```{math}
\begin{align*}
\omega\tau=0,\pm 2\pi, \pm 4\pi, \pm 6\pi,\dots
\end{align*}
```
Because $\omega=c\frac{2\pi}{\lambda}$, and $\Delta R=c\tau$, we find that maxima occur when

```{math}
\begin{align*}
\Delta R =0,\pm\lambda,\pm 2\lambda, \pm 3\lambda,\dots
\end{align*}
```
For a large distance between the screen and the mask (in the Fraunhofer limit), these path length differences correspond to directions of the maxima given by the angles $\theta_m$ (see {numref}`fig:coh:spatialCoherence`):

```{math}
:label: eq:coh:youngMaximaAngles
\begin{align*}
\sin\theta_m = \frac{\Delta R}{d} = m\frac{\lambda}{d},\qquad \theta_m\approx m\frac{\lambda}{d}\quad\text{for small angles},
\end{align*}
```
where $d$ is the distance between the slits and $m$ is an integer[^5].

**Remarks**.

1. The mutual coherence $\Gamma_{12}(\tau)= \langle U(\mathbf{r}_1,t)U(\mathbf{r}_2,t-\tau)^* \rangle$ is the **cross-correlation** of the two signals $U(\mathbf{r}_1,t)$ and $U(\mathbf{r}_2,t)$.


2. As remarked above, by moving the point of observation $\mathbf{r}$ over the screen, one can obtain the real part of the complex degree of mutual coherence. To derive also the imaginary part, one can put a piece of glass behind one of the pinholes with thickness such that for the center frequency $\bar{\omega}$ an additional phase difference of $\pi/2$ is obtained between the fields in $\mathbf{r}_1$ and $\mathbf{r}_2$. If the frequency band $\Delta \omega$ is sufficiently narrow this phase difference applies to a good approximation to all frequencies in the band.

(sec:coh:scprop)=
## More on Spatial Coherence


We first consider the case that the source is so small (e.g. a single emitting atom) that it can be considered to be a point source
$S$.
The correlation of the fields at two points $P_1$ and $P_2$ then depends on the travel-time difference from $S$. A path difference much smaller than the source coherence length $\ell_c$ generally gives high visibility; a much larger difference gives low visibility for a smooth broad spectrum.

An extended classical light source consists of a large set of emitting point sources that emit by spontaneous emission.
As we have explained in [](#sec:coh:cohsources), the wave trains emitted by different atoms (point sources) in the source suffer random phase jumps due to e.g. collisions and therefore their averaged cross terms vanish. Such a light source is called **spatially incoherent**. For a spatially incoherent light source, the spatial coherence in any two points $P_1$ and $P_2$ is determined by measuring the fringe contrast on a distant screen when a mask is used that is perpendicular to the mean direction of propagation of the light and which contains pinholes at $P_1$ and $P_2$. The fringe contrast and hence the mutual coherence at $P_1$ and $P_2$ are determined by two effects:


1. First of all it is determined by how coherent the contributions of the individual point sources $S$ in the extended source to the total fields at $P_1$ and $P_2$ are. This coherence is determined by the extent to which the difference between the distance of $S$ to $P_1$ and of $S$ to $P_2$ is smaller than the coherence length. If these differences in distances are for all point sources larger than the coherence length, the fringe contrast on the screen in Young's experiment will be very low and hence the mutual coherence is very low.


2. The second effect is the size of the extended source. Even if for all point sources in the source the fields in $P_1$ and $P_2$ are coherent, the coherence of the total fields at $P_1$ and $P_2$ due to the entire source can be small. As we know, the cross terms between independent source points vanish after averaging. Hence the intensity observed in Young's experiment is the sum of the intensities due to the individual point sources in the extended source. The total coherence can still be low because the fringe patterns from different source points shift relative to one another and cancel on averaging. The shift of the fringe patterns is due to the different positions of the point sources in the extended source, which cause the phase difference between the fields in $P_1$ and $P_2$ to vary with the point sources.

For a distant source, a small product of angular source size and pinhole separation keeps path delays small. This alone does not prevent fringes from different source points from canceling when their intensities are added.


```{note}
Temporal coherence requires relevant path differences to be small compared with the coherence length. Spatial coherence also depends on how source brightness is distributed over angle.
```


To show this we consider two mutually incoherent point sources $S_1$ and $S_2$ in the $z=0$ plane. Their mutual coherence function satisfies:

```{math}
:label: eq:coh:spatialIncoherenceA
\begin{align*}
\Gamma_{S_1S_2}(\tau) &=
0, \text{ for all $\tau$},
\end{align*}
```
```{math}
:label: eq:coh:spatialIncoherenceB
\begin{align*}
\Gamma_{S_1S_1}(\tau)&=\Gamma_{S_2S_2}(\tau)= \Gamma_0(\tau),\end{align*}
```
where $\Gamma_0$ is the self-coherence which we assume to be the same for both point sources. $\Gamma_0(\tau)$ has a characteristic width set by the source spectrum. For a smooth broad spectrum its envelope generally decreases with delay, although it need not be monotonic.
{eq}`eq:coh:spatialIncoherenceA` expresses the fact that two point sources are mutually
incoherent. Using the fact, based on the assumption that the source is stationary,
that the long-time average does not depend on the origin of time, we find:

```{math}
:label: eq:coh:gamma0Conjugate
\begin{align*}
\Gamma_0(-\tau)=<U(S_1,t) U(S_1,t+\tau)^*> = < U(S_1,t-\tau)U(S_1,t)^*> = \Gamma_0(\tau)^*.
\end{align*}
```
Furthermore, for $\tau=0$: $\Gamma_0(0)=I_0$, which is the intensity of either source.

We assume for convenience that the two points $P_1$, $P_2$ are at a large distance $z$ from the two point sources and that the line $P_1P_2$ is parallel to the line joining the two point sources as shown in {numref}`fig:coh:coherencePropagation`. We will compute the mutual coherence $\Gamma_{P_1P_2}(0)$ for zero time delay $\tau=0$ (we can also compute the mutual coherence for more general time delays $\tau>0$, i.e. $\Gamma_{P_1P_2}(\tau)$, but it will suffice for our purpose to take $\tau=0$).
The fields in $P_1$ and $P_2$ are the sum of the fields emitted by $S_1$ and $S_2$.
Since $S_1$ and $S_2$ are point sources they emit spherical waves. Therefore, similarly to {eq}`eq:coh:huygensFresnel` we find that the field in $P_1$ is proportional to

```{math}
:label: eq:coh:fieldP1
\begin{align*}
U(P_1, t) \propto \frac{U(S_1,t-|S_1P_1|/c)}{|S_1P_1|} + \frac{U(S_2,t-|S_2P_1|/c)}{|S_2P_1|},
\end{align*}
```
and

```{math}
:label: eq:coh:fieldP2
\begin{align*}
U(P_2, t) \propto \frac{U(S_1,t-|S_1P_2|/c)}{|S_1P_2|} + \frac{U(S_2,t-|S_2P_2|/c)}{|S_2P_2|},
\end{align*}
```
where we omitted the constant factors in front of {eq}`eq:coh:huygensFresnel`.
```{figure} Images/06_07_coherence_propagation.png
:alt: Two independent sources separated by a illuminate two observation points separated by b in a plane at distance z.
:name: fig:coh:coherencePropagation
Two incoherent point sources $S_1$, $S_2$ at a distance $a$ from each other and two points $P_1$, $P_2$ in a plane at large distance $z$ from the point sources.
```

For sufficiently large $z$, all distances $|S_iP_j|$ in the denominators may be replaced by $z$. We absorb their common amplitude factor, including the coupling coefficient, into the field normalization. By substituting {eq}`eq:coh:fieldP1` and {eq}`eq:coh:fieldP2` into {eq}`eq:coh:mutualCoherence` with $\tau=0$, we find for the mutual coherence of $P_1$ and $P_2$:

```{math}
:label: eq:coh:gammaP1p2Full
\begin{align*}
\Gamma_{P_1P_2}(0) &= \langle \, U(P_1,t)U(P_2,t)^*\, \rangle  \\
&= \Gamma_{S_1S_1}\left( \frac{ |S_1P_2|-|S_1P_1|}{c}\right)
+ \Gamma_{S_1S_2}\left( \frac{|S_2P_2|- |S_1P_1|}{c}\right)  \\
&\quad + \Gamma_{S_2S_1}\left( \frac{|S_1P_2|-|S_2P_1|}{c}\right)
+ \Gamma_{S_2S_2}\left( \frac{|S_2P_2|- |S_2P_1|}{c}\right).
\end{align*}
```
Now we use {eq}`eq:coh:spatialIncoherenceA` and {eq}`eq:coh:spatialIncoherenceB`
to get

```{math}
:label: eq:coh:gammaP1p2Simplified
\begin{align*}
\Gamma_{P_1P_2}(0) &= \Gamma_0\left( \frac{ |S_1P_2|-|S_1P_1|}{c}\right) + \Gamma_0\left( \frac{|S_2P_2|- |S_2P_1|}{c}\right).
\end{align*}
```
Similarly,

```{math}
:label: eq:coh:gammaP1p1
\begin{align*}
\Gamma_{P_1P_1}(0) = \Gamma_{P_2P_2}(0)=2\Gamma_0(0)= 2I_0.
\end{align*}
```
Because the width of the self-coherence function $\Gamma_0$ is set by the coherence time $\tau_c$,
result {eq}`eq:coh:gammaP1p2Simplified` confirms that for the fields in $P_1$ and $P_2$ to be coherent,
the **path difference** from each source point to $P_1$ and $P_2$ should be small compared with the coherence length $\ell_c=c\tau_c$ for that source contribution to retain appreciable visibility.
To express the result in terms of the angle $\alpha$ subtended by the source at the midpoint of $P_1P_2$ we choose coordinates such that
$P_j=(x_j,0,z)$ for $j=1,2$. If the distance to the source is so large that $S_1P_1$ and $S_1P_2$ are almost parallel, we see from {numref}`fig:coh:coherencePropagation`
that

```{math}
:label: eq:coh:pathDifference1
\begin{align*}
|S_1P_2|-|S_1P_1|\approx |QP_2|
= \frac{\alpha}{2}|x_1-x_2|.
\end{align*}
```
Similarly,

```{math}
:label: eq:coh:pathDifference2
\begin{align*}
|S_2P_1|-|S_2P_2|\approx \frac{\alpha}{2}|x_1-x_2|.
\end{align*}
```
```{figure} Images/06_08_coherence_propagation.png
:alt: Nearly parallel rays from an extended source show the projected path difference between two observation points.
:name: fig:coh:coherencePropagationGeometry
For $z$ very large, $S_1P_1$ and $S_1P_2$ are almost parallel and $|S_1P_2|-|S_1P_1|\approx |QP_2|= |x_1-x_2| \alpha/2$.
```

Hence, with $\Gamma_0(-\tau)=\Gamma_0(\tau)^*$, {eq}`eq:coh:gammaP1p2Simplified` becomes

```{math}
:label: eq:coh:gammaP1p2Angle
\begin{align*}
\Gamma_{P_1P_2}(0) = 2\text{Re}\, \Gamma_0\left( \frac{\alpha}{2} \frac{(x_1-x_2)}{c}\right).
\end{align*}
```
The argument of $\Gamma_0$ shows how finite bandwidth reduces each source contribution as its path difference grows. The sum of those contributions can also cancel because their phases differ, even when each is individually coherent.

At fixed pinhole separation, moving a source farther away reduces its angular size. Near zero angular size the contributions have nearly the same phase and spatial coherence approaches one. For a discrete source, visibility can have additional zeros and revivals at larger angular sizes.

As an example, consider quasi-monochromatic light for which (see
{eq}`eq:coh:selfCoherenceMonochromatic`):

```{math}
:label: eq:coh:quasiMonochromatic
\begin{align*}
\Gamma_0(\tau) = I_0 e^{-i\bar{\omega}\tau}, \text{ for all $\tau$}.
\end{align*}
```
Here $\bar\omega$ is the center frequency. This idealization treats each source as monochromatic over the delays of interest, so its temporal coherence length is effectively much larger than all relevant path differences. Hence the only remaining criterion for coherence of the total fields in $P_1$ and $P_2$ is that the fringe patterns due to the different point sources in Young's experiment sufficiently overlap. Indeed, in this case of very long coherence time $\tau_c$ we have

```{math}
:label: eq:coh:gammaP1p2Quasi
\begin{align*}
\Gamma_{P_1P_2}(0) = 2 I_0 \cos\left[\frac{\alpha}{2}\frac{\bar{\omega}|x_1-x_2|}{c}\right],
\end{align*}
```
and hence the degree of mutual coherence is:

```{math}
:label: eq:coh:gammaP1p2QuasiDegree
\begin{align*}
\gamma_{P_1P_2}(0) &= \frac{\Gamma_{P_1P_2}(0)}{\sqrt{\Gamma_{P_1P_1}(0)} \sqrt{\Gamma_{P_2P_2}(0)}}  \\
&= \cos\left[\frac{\alpha}{2}\frac{\bar{\omega}|x_1-x_2|}{c}\right].
\end{align*}
```
For these two equal point sources, with baseline $b=|x_1-x_2|$, the first visibility zero occurs at $b=\bar\lambda/(2\alpha)$. This is a first null, not a maximum allowed separation: $|\gamma_{P_1P_2}|$ revives at larger baselines. A continuous source has a different visibility function.

### Example: Solar coherence across a baseline

The Sun has an angular diameter of about $\alpha=2R_\odot/\mathrm{AU}\simeq0.0093$ radians, or $0.53^\circ$. The two-point-source cosine derived above does not describe a filled solar disk. For a uniformly bright circular disk observed through a narrow spectral band, the van Cittert–Zernike result gives the modulus of the spatial degree of coherence at baseline $b$:

```{math}
:label: eq:coh:sunAngle
|\gamma(b)|=\left|\frac{2J_1(\pi\alpha b/\lambda)}{\pi\alpha b/\lambda}\right|,
```

where $J_1$ is a Bessel function. The first zero occurs at $b\simeq1.22\lambda/\alpha$. At $\lambda=550\,\mathrm{nm}$, this is about $72\,\mu\mathrm{m}$. A baseline of $20\,\mu\mathrm{m}$ still gives appreciable visibility; it is not a hard maximum coherence distance. Solar limb darkening and finite bandwidth alter the precise visibility curve.

## Stellar Interferometry
The dependence of spatial coherence on source angular size is used in **stellar interferometry**.
It works as follows: we want to know the size of a certain star. The size of the star, being an extended spatially incoherent source, determines the spatial coherence of the light we receive on earth. Thus, by measuring the interference of the light collected by two transversely separated telescopes, one can effectively create a double-slit experiment, with which the degree of spatial coherence of the starlight on Earth can be measured, and thereby the angle which the star subtends on earth. A longer telescope baseline probes finer angular structure (see&nbsp;{eq}`eq:coh:gammaP1p2QuasiDegree`). If the distance of the star is measured independently, for example by parallax, its physical size follows from its angular size.

With measurements of complex visibility, including phase, across enough telescope baselines, one can reconstruct the projected brightness distribution of the star. The van Cittert–Zernike theorem relates that visibility to the Fourier transform of angular source brightness. Measuring fringe contrast alone gives only the modulus of visibility and does not by itself determine a unique image.

```{figure} Images/06_09_stellar_interferometry.png
:alt: Two telescope arrangements combine starlight collected at separated points to measure angular source size.
:name: fig:coh:stellarInterferometry
Left: a stellar interferometer with two telescopes that can be moved around to measure the interference at many relative positions. Right: single telescope with two outer movable mirrors. The telescope can move around its axis. The larger the distance $d$ the higher the resolution.
```


## Fringe contrast

We have seen that when the interference term
$\text{Re} \langle  U_1 U_2^*  \rangle$ vanishes, no fringes form, while when this term is nonzero, there are fringes. The **fringe contrast** is expressed directly in measurable intensities. Given some interference intensity pattern $I(x)$ as in {numref}`fig:coh:visibility`, the fringe contrast is defined as

```{math}
\begin{align*}
\mathcal{V}=\frac{I_{\text{max}}-I_{\text{min}}}{I_{\text{max}}+I_{\text{min}}}. \hspace{1.5cm} \mathbf{fringe contrast}.
\end{align*}
```

For example, if we have two perfectly coherent, monochromatic point sources emitting the fields $U_1$, $U_2$
with intensities $I_1=|U_1|^2$, $I_2=|U_2|^2$, then the interference pattern is given by
{eq}`eq:coh:doubleSlitInterference`:

```{math}
\begin{align*}
I(\tau)=I_1+I_2+2\sqrt{I_1 I_2}\cos(\omega \tau +\varphi).
\end{align*}
```
We then get

```{math}
\begin{align*}
I_{\text{max}}=I_1+I_2+2\sqrt{I_1 I_2}, \quad I_{\text{min}}=I_1+I_2-2\sqrt{I_1 I_2},
\end{align*}
```
so

```{math}
\begin{align*}
\mathcal{V}=\frac{2\sqrt{I_1 I_2}}{I_1+I_2}.
\end{align*}
```
In case $I_1=I_2$, we find $\mathcal{V}=1$.

In contrast, when $U_1$ and $U_2$ are completely incoherent, we find

```{math}
\begin{align*}
I(\tau)=I_1+I_2,
\end{align*}
```
from which follows

```{math}
\begin{align*}
I_{\text{max}}=I_{\text{min}}=I_1+I_2,
\end{align*}
```
which gives $\mathcal{V}=0$.

```{figure} Images/06_10_visibility.png
:alt: A sinusoidal intensity plot marks its maximum and minimum, used to define fringe visibility.
:name: fig:coh:visibility
Illustration of $I_{\text{max}}$ and $I_{\text{min}}$ of an interference pattern $I(x)$ that determines the fringe contrast $\mathcal{V}$.
```


(sec:coh:fabryperot)=
## Fabry–Perot resonator

```{openlyceum} InterferometryLab
:screen: 3
:label: fig:coh-fabry-perot-sim

A Fabry–Pérot cavity with adjustable mirror reflectance, spacing, and absorption. Watch finesse, free spectral range, and resolving power update as the transmission peaks sharpen.
```

An interferometer combines fields whose phase difference contains information about an optical path. Young's slits and Lloyd's mirror divide a wavefront; a Michelson interferometer divides amplitude. A Fabry–Perot etalon divides amplitude repeatedly between two parallel reflecting surfaces. It is used as a high-resolution spectrometer and as an optical cavity.

```{figure} Images/06_11_lloyd_mirror.png
:name: fig:coh:lloydsmirror
:alt: Direct and mirror-reflected rays reach an observation point as if they came from a source and its virtual image.

Lloyd's mirror is an example of wavefront division.
```

The figure below shows a slab of thickness $d$ and refractive index $n_2$, between media $n_1$ and $n_3$. Snell's law determines the internal angle $\theta_2$. In the derivation below, **specialize to a lossless, symmetric etalon**: the outside media are identical, the two mirrors have the same power reflectance $\mathcal R$, their reflection phases are neglected or absorbed into the cavity phase, and polarization and angle are held fixed. These assumptions make incident and transmitted powers directly comparable. Absorption or unequal mirrors require different peak heights and a modified transmission formula.

```{figure} Images/06_12_fabry_perot.png
:name: fig:coh:fp1
:alt: An oblique incident ray enters a slab between two parallel reflecting surfaces and splits into successive reflected and transmitted rays.

Three-layer geometry of the Fabry–Perot etalon. The formulas below use identical outside media and mirror reflectances.
```

Let $k_0=2\pi/\lambda_0$, where $\lambda_0$ is the vacuum wavelength. The phase gained across the slab in the normal direction is

```{math}
:label: eq:coh:phaseChange
\delta=k_0n_2d\cos\theta_2.
```

Successive transmitted beams have a round-trip phase difference $2\delta$. With the electric-field phase convention $e^{-i\omega t}$, the round-trip amplitude factor is $\mathcal R e^{2i\delta}$. For a symmetric lossless etalon, the transmitted amplitude, normalized to unit incident amplitude, is

```{math}
:label: eq:coh:fabryPerotTransmission
\begin{aligned}
t&=(1-\mathcal R)e^{i\delta}
\sum_{j=0}^{\infty}(\mathcal R e^{2i\delta})^j\\
&=\frac{(1-\mathcal R)e^{i\delta}}{1-\mathcal R e^{2i\delta}}.
\end{aligned}
```

The numerator combines the two mirror transmissions. Their possible common phase has no effect on transmitted power. Taking the squared modulus gives the Airy transmission law

```{math}
:label: eq:coh:fabryPerotTransmittance
T=\lvert t\rvert^2
 =\frac{1}{1+F\sin^2\delta},
\qquad
F=\frac{4\mathcal R}{(1-\mathcal R)^2}.
```

Here $F$ is the **coefficient of finesse**, distinct from the finesse defined below. Energy conservation gives the reflected power fraction

```{math}
:label: eq:coh:fabryPerotReflectance
R=1-T=\frac{F\sin^2\delta}{1+F\sin^2\delta}.
```

Thus $R+T=1$. At resonance, transmission is unity and reflection vanishes in this ideal symmetric model. Real absorption and mirror asymmetry reduce the transmission peak.

```{figure} Images/06_13_fabry_perot_resonance.png
:name: fig:coh:fp2
:alt: Airy transmission peaks repeat every pi radians of single-pass phase; the curve with larger finesse coefficient has narrower peaks.

Transmission versus single-pass phase for two values of $F$. The plotted symmetric case has peak transmission 1.
```

Resonance occurs when the round-trip phase is a multiple of $2\pi$:

```{math}
:label: eq:coh:resonanceCondition
\delta=m\pi,\qquad m=1,2,\ldots
```

Equivalently, when dispersion can be neglected over one peak,

```{math}
:label: eq:coh:resonanceWavelength
2n_2d\cos\theta_2=m\lambda_0.
```

The **free spectral range** is the separation between neighboring orders:

```{math}
:label: eq:coh:freeSpectralRange
\Delta\delta_{\mathrm{FSR}}=\pi,
\qquad
\Delta\nu_{\mathrm{FSR}}\simeq\frac{c}{2n_2d\cos\theta_2}.
```

The frequency expression assumes negligible material and mirror-phase dispersion over the interval. With dispersion, obtain the spacing from the frequency derivative of the full round-trip phase.

For $F\geq1$, the full width at half maximum of one isolated peak is

```{math}
:label: eq:coh:resonanceWidth
\Delta\delta_{\mathrm{FWHM}}
=2\arcsin\!\left(\frac{1}{\sqrt F}\right)
\simeq\frac{2}{\sqrt F}\quad(F\gg1).
```

The **finesse** is the ratio of free spectral range to this width:

```{math}
:label: eq:coh:fabryPerotFinesse
\mathcal F
=\frac{\pi}{\Delta\delta_{\mathrm{FWHM}}}
\simeq\frac{\pi\sqrt F}{2}
=\frac{\pi\sqrt{\mathcal R}}{1-\mathcal R}.
```

Near order $m$, the fractional wavelength width is approximately $\Delta\lambda_0/\lambda_0=\Delta\delta_{\mathrm{FWHM}}/(m\pi)$. The wavelength resolving power is therefore

```{math}
:label: eq:coh:resolution
\frac{\lambda_0}{\Delta\lambda_0}
\simeq m\mathcal F.
```

Also $\Delta\lambda_{\mathrm{FSR}}/\lambda_0\simeq1/m$, so the ratio of free spectral range to linewidth is $\mathcal F$. Raising $m$ improves local resolving power but narrows the unambiguous wavelength interval.

### Example: Fabry–Perot resolution

For normal incidence, $\lambda_0=600\,\mathrm{nm}$ and $n_2d=12\,\mathrm{mm}$ give $m=40\,000$. If each mirror has $\mathcal R=0.9$, then $F=360$ and $\mathcal F\simeq29.8$. The resolving power is approximately $1.19\times10^6$, assuming negligible absorption and dispersion. This example uses the high-finesse approximation.

## Interference and polarization

```{openlyceum} LightPropagation
:screen: 2
:label: fig:coh-polarization-interference-sim

Rotate a polarizer and compare the transmitted intensity of two field components. Their ability to form fringes depends on both polarization overlap and phase correlation.
```

Light is a vector field. For a detector that does not analyze polarization, the intensity of two superposed complex fields is proportional to

```{math}
:label: eq:coh:polarizationInterference
I=I_1+I_2+2\operatorname{Re}
\left\langle\mathbf E_1(t)\cdot\mathbf E_2(t)^*\right\rangle.
```

The averaging includes the detector response. The dot product describes polarization overlap; the correlation describes whether the relative phase persists during averaging. Both are needed for visible interference.

**First Fresnel–Arago principle.** Orthogonally polarized fields have zero dot product, so they produce no interference term at a polarization-insensitive detector. A subsequent polarizer can project both fields onto the same direction, after which interference is possible if the projected fields remain correlated.

**Second Fresnel–Arago principle.** Parallel polarized components *can* interfere if they are mutually coherent. Two copies made from the same natural-light field can show fringes when the path delay is within its coherence time. Two independent natural-light sources generally have no stable interference term even if their polarizations are made parallel.

**Third Fresnel–Arago principle.** The two orthogonal components of ideal unpolarized natural light are mutually uncorrelated. Splitting them and rotating one into alignment does not create the missing correlation, so no stable fringes appear. The conclusion assumes the original light is unpolarized; a polarized source can have correlated components.

These principles explain why a shared polarization was useful in the scalar calculations above, while also showing that shared polarization alone cannot guarantee fringe visibility.

## Chapter Summary

- **Interference** occurs when two or more coherent waves overlap; the resulting intensity depends on their relative phase.
- **Temporal coherence** measures how well a wave correlates with itself over time; it is related to bandwidth by $\tau_c \approx 1/\Delta f$.
- **Coherence length** $L_c = c\tau_c$ is the path difference over which fringes remain visible.
- **Spatial coherence** measures correlation between different points in a wave field at the same time.
- **Young's double-slit experiment**: Fringe spacing $\Delta y = \lambda D/a$, where $D$ is screen distance and $a$ is slit separation.
- **Michelson interferometer** measures path differences and coherence length and is used for spectroscopy and surface metrology.
- **Visibility** (fringe contrast) $V = (I_{max} - I_{min})/(I_{max} + I_{min})$ quantifies interference quality.
- **Van Cittert-Zernike theorem**: The degree of spatial coherence equals the Fourier transform of the source intensity distribution.
- **Fabry-Perot interferometer** uses multiple-beam interference for high-resolution spectroscopy; resolution increases with mirror reflectivity.
- **Fresnel–Arago principles**: Fringe visibility requires both polarization overlap and mutual coherence; aligning independent components does not create coherence.

```{note} External sources in recommended order
1. [KhanAcademy - Interference of light waves](https://www.khanacademy.org/science/ap-physics-1/ap-mechanical-waves-and-sound/wave-interference-ap/v/wave-interference-pulses): Playlist on wave interference at secondary school level.
2. [Yale Courses - 18. Wave Theory of Light](https://www.youtube.com/watch?v=5tKPLfZ9JVQ)
3. {cite:t}`born_wolf_coherence`: Comprehensive treatment of coherence theory
4. {cite:t}`michelson_interferometer`: Original paper on interferometry
5. {cite:t}`fresnel_arago`: Original work on polarized light interference
```

[^1]:
See [Veritasium - The original double-slit experiment, starting at 2:15](https://www.youtube.com/watch?v=Iuv6hY6zsd0) -
Demonstration of an interference pattern obtained with sunlight.

[^2]: For more details see J.W. Goodman, *Statistical Optics*

[^3]: [MIT OCW - Fringe Contrast - Path Difference](https://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/fringe-contrast-2014-path-difference/): Demonstration of how fringe contrast varies with propagation distance

[^4]: [MIT OCW - Coherence Length and Source Spectrum](https://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/coherence-length-and-source-spectrum/): Demonstration of how the coherence length depends on the spectrum of the laser light.

[^5]: [KhanAcademy - Young's Double slit part 1](https://www.khanacademy.org/science/in-in-class-12th-physics-india/in-in-wave-optics/x51bd77206da864f3:young-s-double-slit-experiment/v/youngs-double-split-part-1)

## References

<!-- Bibliography is rendered from references.bib in HTML output -->
