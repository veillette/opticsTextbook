# Problems

**Problem 10.1** Make a mind map of the material covered in this chapter. For more information about mind maps, see [Wikipedia](https://en.wikipedia.org/wiki/Mind_map)

**Problem 10.2** Describe the (possible) relevance of fiber optics in your line of work.

**Problem 10.3** For a conventional single-mode silica communication fiber, compare operation near $1310$ nm and $1550$ nm in terms of chromatic dispersion and attenuation. Why might a system designer choose either band?

**Problem 10.4** Show that the phase factor $(m-1)\pi$ in {eq}`eq:fiber:downPropagatingWave`
   indeed leads to a vanishing $E$-field at the mirrors. Is this the only
   possible solution?

**Problem 10.5** A plastic fiber has a core refractive index of $n_1=1.49$ and a cladding refractive index of $n_2=1.38$. Its core diameter is $1.00~\text{mm}$ and light with a wavelength of $633~\text{nm}$ is coupled into the fiber from air ($n_{\text{e}}=1.00$). Calculate:
**(a)** the internal critical incidence angle $\theta_{\text{i,c}}$, measured from the normal to the core–cladding interface
**(b)** the maximum external acceptance angle $\bar{\theta}_{\text{e,c}}$, measured from the fiber axis
**(c)** the $\Delta$-parameter (Can you use the approximation?)
**(d)** the numerical aperture
**(e)** the $V$-number (Is this a singlemode or multimode fiber?)
**(f)** the cutoff wavelength of the first higher-order mode; does the fundamental mode also disappear at this wavelength?

**Problem 10.6** Describe, in your own words, the effect of dispersion on a short pulse. For a simplified loss-free link, assume the initial pulse duration is negligible and require the dispersion broadening $|D|L\Delta\lambda$ to remain below one bit period. Find the maximum length when $D=20~\text{ps}/(\text{km}\cdot\text{nm})$, $\Delta\lambda=1.0~\text{nm}$, and the bit rate is $10~\text{GHz}$.

**Problem 10.7** For a simplified dispersion-free link with no connector or splice losses, find the maximum length if $\alpha_{\text{dB}}=0.30~\text{dB/km}$ and the receiver requires at least $1\%$ of the launched power.

**Problem 10.8** Estimate two simplified coupling losses. In each part, report the transmitted fraction $\eta$ and loss $-10\log_{10}\eta$ in dB. Neglect Fresnel reflections, alignment error, and polarization mismatch.

**(a)** Two centered single-mode fibers have core diameters of $7.0$ and $6.0~\mu\mathrm m$. Approximate their guided field amplitudes by coaxial Gaussian profiles with intensity radii $w_1=3.5~\mu\mathrm m$ and $w_2=3.0~\mu\mathrm m$. Use the normalized mode-overlap estimate
$$
\eta=\left(\frac{2w_1w_2}{w_1^2+w_2^2}\right)^2.
$$
Why is core diameter alone insufficient for an exact coupling prediction?

**(b)** Two identical fibers with core radius $a=3.0~\mu\mathrm m$ are separated by a $500~\mu\mathrm m$ air gap. For this rough **geometric collection** model, let the emerging Gaussian intensity radius be $w_0=3.0~\mu\mathrm m$ and use $w(z)=\sqrt{w_0^2+(\mathrm{NA}\,z)^2}$ with $\mathrm{NA}=0.12$. Estimate the fraction of power inside the receiving core using
$$
\eta_{\mathrm{geom}}=1-\exp[-2a^2/w(z)^2].
$$
Explain why this geometric fraction is not an exact guided-mode coupling efficiency.
