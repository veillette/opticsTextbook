# Optics MyST editorial review

Started 2026-09-30. Scope: the 32 student-facing pages in `myst.yml`.
This is a paced page-by-page review of the MyST book. The fleet inventory is
tracked in `../../bindery/reviews/myst-fleet-2026.md`.

## Progress

| Pages | Status | Review |
| --- | --- | --- |
| Preface | Reviewed | Corrected chapter order and PDF production description. |
| Chapter 1: Basics | Reviewed | Corrected the relativistic wavelength example, photon flux arithmetic, spectrum descriptions, historical speed measurement, Newton's rings phase, and phase versus group index; inspected all six figures and supplied explicit alternative text. |
| Chapter 1 problems | Reviewed | Repaired equation references and specified kinetic energy for the electron in Problem 1.7. |
| Chapter 2: Geometrical optics | Reviewed | Corrected stationary optical path, spherical-surface focal sign, image phase, f-number, numerical aperture, Airy width, EUV caption, and figure labels; inspected and described all 15 figures. |
| Chapter 2 problems | Reviewed | Repaired the two-lens transfer matrix and focal-coordinate formulas, clarified the virtual-object diagram and conic construction, and described all eight figures. |
| Chapter 3: Optical instruments | Reviewed | Corrected the reduced-eye power and focal distances, camera and eye anatomy, magnifier notation, eyepiece field stop, finite-tube microscope formula, and telescope focus; inspected and described all 14 figures. |
| Chapter 3 problems | Reviewed | Corrected the eye dimensions in the field-of-view problem, made its minimum-distance question determinate, clarified ray-vector and magnification conventions, and identified the negative-index condition in the planar-interface exercise; described both figures. |
| Chapter 4: Polarization | Reviewed | Repaired rotated-basis and Jones eigenvector equations, corrected the circular-basis decomposition and full-wave filter geometry, distinguished vacuum wavelength, clarified wave-plate axes and ideal-polarizer criteria, and described all five figures. |
| Chapter 4 problems | Reviewed | Reframed the mirror exercise as rejection of an ideal back-reflection with a 45° polarizer, clarified energy transfer and vacuum wavelength, and described its figure. |
| Chapter 5: Wave equations | Reviewed | Corrected the traveling-wave derivative sign, complex phase quadrant, cylindrical far-field limit, instantaneous Poynting factor, circular-field phasor, and low-speed Doppler signs; clarified group velocity, Gaussian beams, and cosmological redshift. |
| Chapter 5 problems | Reviewed | Repaired a nontraveling pulse, unequal-amplitude node question, point-source normalization, Gaussian-beam and interference prompts, and assumptions in Doppler and energy-density exercises. |
| Chapter 6: Interference and coherence | Reviewed | Corrected coherence-time conventions, two-line revivals, spatial visibility, the solar-disk baseline, Huygens delays, Fabry–Perot Airy formulas, and polarization principles; inspected and described all 13 figures. |
| Chapter 6 problems | Reviewed | Clarified Michelson fringe counting, the two-source visibility branch, thin-film phase, mirror-image source nodes, and source-pinhole geometry; completed the Fabry–Perot exercise and described all four figures. |
| Chapter 7: Scalar diffraction optics | Reviewed | Corrected evanescent-wave scale, far-field conditions, point-source and grating approximations, Airy and point-spread functions, coherent and incoherent imaging coordinates, and limits of super-resolution claims; inspected and described all 23 figures. |
| Chapter 7 problems | Reviewed | Repaired source-phase assumptions, phase-only slit glass, aperture-envelope zeros, Bessel-beam normalization, and the stellar visibility derivation; described all three figures. |
| Chapter 8: Lasers | Reviewed | Corrected linewidth and Airy-radius arithmetic, Einstein-coefficient units and constants, population dynamics, cavity stability, transverse-mode terminology, and pump examples; aligned the He–Ne and VCSEL captions with their figures, inspected and described all 19 figures, and regenerated the population plot with a correct time axis. |
| Chapter 8 problems | Reviewed | Defined ring-cavity power gain and mirror phase, made the 1 GHz mode-count question acknowledge cavity alignment, and specified flat-top pulse shape. |
| Chapter 9: Advanced optical microscopes | Reviewed | Rebuilt the weak-phase contrast derivation, separated wide-field fluorescence from confocal detection, clarified pinhole and near-field resolution limits, checked all five figures against their actual panels, and added image sources and alternative text. |
| Chapter 9 problems | Reviewed | Made the phase-contrast reference explicit, recast pinhole size in Airy units, defined the Stokes energy difference, qualified SNOM aperture resolution, and supplied a Gaussian model for the confocal resolution comparison. |
| Chapter 10: Fiber optics | Reviewed | Corrected index contrast and numerical aperture, higher-mode cutoff, modal delay, material-dispersion sign, guided-mode dispersion, loss and component descriptions; inspected and described all 21 figures and regenerated the modal-delay plot. |
| Chapter 10 problems | Reviewed | Defined telecom-band tradeoffs, critical-angle conventions, higher-order cutoff, bit-period and power thresholds, and normalized Gaussian coupling estimates. |
| Chapter 11: Ray vectors and matrices | Reviewed | Corrected focal-length dimensions, the general magnification ratio, the lensmaker versus imaging-equation distinction, two-lens notation and afocal classification, and the first principal-plane matrix sign; inspected and described all 11 chapter figures. |
| Chapter 11 problems | Reviewed | Corrected the direction of the ray-vector transformation, signed front and back focal coordinates, stale section reference, and both figure descriptions. |
| Appendix A: Complex numbers | Reviewed | Corrected phase-quadrant guidance, real-field intensity averaging, extinction-coefficient notation, total-internal-reflection Fresnel coefficient, absorbing-slab arithmetic and approximation, and exercise intensity units. |
| Appendix B: Matrix multiplication | Reviewed | Aligned ray-vector conventions with Chapter 11, corrected matrix order and rotated Jones matrices, recomputed the telescope and Galilean expander, and completed the four practice solutions. |
| Remaining appendices, downloads, author page | Pending | Continue in table-of-contents order. |

Twenty-five of 32 pages have completed the editorial pass.

## Verification

- `npm run verify` passes all 181 tests. Its existing nonfatal reports contain
  20 directive lint warnings and 70 style findings, primarily the problem-set
  format documented by this repository. The image inventory lists three
  pre-existing WebP copies and the two superseded Chapter 2 PNG exports.
- `myst build --site --strict` passes all 32 pages with the local Node/npm
  version shim required by the installed MyST CLI. The build reports one large
  existing image in Chapter 7.
- The read-only Bindery fleet audit has zero optics alternative-text findings,
  down from 152 at intake; none remain on the twenty-five reviewed pages. Chapter 5
  and its problem page contain no figures.
- Chapter 1 arithmetic was recomputed independently: an electron with 2.5 MeV
  kinetic energy has wavelength about 0.418 pm and speed about 0.9855c. A received
  1 pW signal gives about 5.0×10¹³ photon energies/s at 10 m and about 503
  photons/s at 0.1 nm.
- The Chapter 2 matrix was checked by direct multiplication for the book's
  $(n\alpha,y)^T$ convention. For $n=1$, $f_1=10$ cm, $f_2=12$ cm, and
  $d=6$ cm, its determinant is one and it gives signed focal coordinates
  $f_i=3$ cm and $f_o=-3.75$ cm, matching Chapter 11.
- Two vector figures were corrected from their Illustrator PDF sources and
  visually checked: the conic diagram labels its directrix correctly, and
  the aperture-stop diagram places entrance and exit pupils on the correct
  sides. The older PNG exports remain as source companions.
- Chapter 3's one-lens eye model was checked numerically: 1.337/0.024 m is
  55.708 D and its object-side focal coordinate is -17.951 mm. The corrected
  tunnel-vision data give a 6.384° half-field and, at the 25 cm boundary,
  a 22.5 cm lens distance with a -40 D lens. A 50 mm lens on a 36 mm-wide
  sensor gives a 39.60° horizontal field.
- Chapter 4's circular-basis expansion and ideal double pass through the
  quarter-wave plate and 45° polarizer were checked with complex arithmetic.
- Chapter 5's corrected pulse moves from $x=5$ m at $t=0$ to $x=7$ m at
  $t=1$ s. The galaxy example's wavelength ratio gives $\beta=0.0231183$
  and a Doppler-equivalent speed of 6930.7 km/s. The Gaussian irradiance
  integral gives $P=\pi\varepsilon_0 cE_0^2w_0^2/4$.
- Chapter 6 numerical checks: a uniform solar disk with angular diameter 0.0093 rad has its first visibility null near 72.1 µm at 550 nm; the film in Problem 6.3 has a first reflected maximum near 111.7 nm; the two-source geometry in Problem 6.2 gives 36 m on its first visibility lobe. For mirror reflectance 0.9, the symmetric Fabry–Perot has coefficient of finesse 360, finesse about 29.8, and a 1 mm air-gap frequency free spectral range of 149.9 GHz.

- Chapter 7 numerical and analytic checks: with the book’s Fresnel-number definition, a 1 mm aperture at 550 nm needs over 18.2 m for $N_F<0.1$; the Airy amplitude and point-spread function both use $2J_1(q)/q$; equal-power thin-ring illumination with $\Delta r=0.1a$ gives a central-amplitude ratio of $\sqrt{0.2}\approx0.447$, while exact ring area gives $\sqrt{0.19}\approx0.436$.
- Chapter 8 numerical checks: at 550 nm, 10 GHz corresponds to about 0.0101 nm, while 10 MHz corresponds to about 0.0000101 nm. The Einstein ratio is about $1.593\times10^{-14}\ \mathrm{J\,s\,m^{-3}}$, implying $3.00\times10^5\ \mathrm{W\,m^{-2}}$ for a 10 GHz band under the chapter assumptions. Problem 8.1(a) needs one-pass power gain $1/0.99^4\approx1.041$; a 30 cm air cavity has about 499.7 MHz mode spacing, so a 1 GHz rectangular band contains two or three resonances depending on alignment; Problem 8.3 gives 10 kW peak and 0.1 W average power.
- Chapter 9 numerical checks: the weak-phase model gives intensity 1.4 for a relative phase of 0.2 rad; the 50 µm pinhole is 1.74 Airy units for the stated 60×, 550 nm, NA 1.4 system. The 488-to-509 nm Stokes shift is 21 nm or about 0.1048 eV. The conventional Rayleigh distances in Problems 9.4 and 9.5 are about 218 nm and 258 nm, respectively.
- Chapter 10 numerical checks: for $n_1=1.448$ and $n_2=1.444$, $\Delta\approx0.002759$ and $\mathrm{NA}\approx0.10755$; the high-$V$ intermodal delay scale is about 13.3 ns/km. In Problem 10.5 the plastic fiber has internal critical incidence near $67.85^\circ$, external acceptance half-angle near $34.19^\circ$, exact $\Delta\approx0.07110$, $V\approx2789$, and first-higher-mode cutoff near 0.734 mm. The simplified links in Problems 10.6 and 10.7 reach about 5 km and 66.7 km, respectively. Problem 10.8 gives roughly 0.10 dB Gaussian mode-size loss and 23.0 dB geometric air-gap loss under its stated approximations.
- Chapter 11 matrix checks: direct symbolic multiplication with the corrected propagation from $H_1$ to $V_1$ gives $\begin{pmatrix}1&-\mathcal P\\0&1\end{pmatrix}$ between principal planes. Solving two consecutive imaging equations reproduces the corrected two-lens image-coordinate formula. The chapter's signed convention gives $f_o=-n_1/\mathcal P$, $f_i=n_2/\mathcal P$, and $M=(n_1s_i)/(n_2s_o)$.
- Appendix A numerical checks: for $\tilde n=1.5+0.01i$, the air-to-slab field reflection coefficient is approximately $-0.200013-0.003200i$, its power reflectance is $0.040015$, and the single-pass two-surface transmission prefactor is about $0.92157$. At 500 nm, a 1 mm slab gives an absorption exponent of about $-251.3$.
- Appendix B symbolic checks: the afocal 100 mm/20 mm telescope has $(y,\theta)^T$ matrix $\begin{pmatrix}-0.2&120\\0&-5\end{pmatrix}$ with millimetre units for the upper-right entry; the $-50$ mm/$150$ mm Galilean expander at 100 mm spacing has $\begin{pmatrix}3&100\\0&1/3\end{pmatrix}$. The 4f system has $\operatorname{diag}(-0.5,-2)$, the thick-lens matrix has unit determinant for air on both sides, and the Jones exercise gives one-half transmitted intensity.


## Sources checked

- [NIST CODATA constants](https://physics.nist.gov/cuu/Constants/) for the
  electron rest energy, Planck constant, and light speed.
- [OpenStax thin-film interference](https://pressbooks.bccampus.ca/test3/chapter/thin-film-interference-2/)
  for the phase inversion in reflected Newton's rings.
- [Michelson's 1927 report](https://supernovae.in2p3.fr/~llg/Enseignements/Agregation/Relativite/biblio/Michelson-1927-Speed-of-Light--1927ApJ....65....1M.pdf)
  for the 1926 speed result and uncertainty.
- [NIST refractive-index guidance](https://emtoolbox.nist.gov/Wavelength/Documentation.asp)
  for phase versus group index, and [NIST X-ray optics](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=851479)
  for an X-ray phase index below unity.
- [WHO ultraviolet overview](https://www.who.int/news-room/questions-and-answers/item/radiation-ultraviolet-%28uv%29)
  for UVA, UVB, and UVC distinctions.
- [University of Reading geometrical optics](https://www.met.reading.ac.uk/pplato2/h-flap/phys6_2.html)
  for the stationary rather than invariably least-time form of Fermat's
  principle.
- [Thorlabs camera-lens tutorial](https://www.thorlabs.com/catalogpages/Obsolete/2015/MVL16L.pdf)
  for effective focal length divided by entrance-pupil diameter.
- [Nikon numerical-aperture guidance](https://www.microscopyu.com/tutorials/imageformation-airyna)
  for $\mathrm{NA}=n\sin\theta$, and the circular-pupil Airy intensity
  profile for the 0.514 $\lambda_0/\mathrm{NA}$ full-width coefficient.
- [ASML NXE:3400B product page](https://www.asml.com/en/products/euv-lithography-systems/twinscan-nxe3400b)
  for the 13.5 nm EUV identification and reflective optics.
- [National Eye Institute, How the Eyes Work](https://www.nei.nih.gov/learn-about-eye-health/healthy-vision/how-eyes-work)
  and [About the Eye](https://www.nei.nih.gov/eye-health-information/healthy-vision/nei-for-kids/about-eye)
  for the cornea, pupil, iris, lens, retina, and vitreous anatomy.
- [National Eye Institute, Presbyopia](https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/presbyopia)
  for age-related loss of crystalline-lens flexibility.
- [Nikon MicroscopyU objective specifications](https://www.microscopyu.com/microscopy-basics/microscope-objective-specifications)
  for finite versus infinity-corrected microscope objectives.
- [All-angle negative refraction and active flat lensing of ultraviolet light](https://www.nature.com/articles/nature12158)
  for the negative-index premise of the planar-interface exercise.
- [MIT Fundamentals of Photonics class notes](https://ocw.mit.edu/courses/6-974-fundamentals-of-photonics-quantum-electronics-spring-2006/bf3bdeb971819ddc9c68719d28bb2745_classnotes.pdf)
  for half-wave and quarter-wave plate polarization transformations.
- [Thorlabs quarter-wave plate tutorial](https://www.thorlabs.com/newgrouppage9.cfm?objectgroup_id=7234&tabname=Tutorial)
  for the 45° input condition and the scope of a wave plate's retardance.
- [OpenStax Doppler effect for light](https://openstax.org/books/university-physics-volume-3/pages/5-7-doppler-effect-for-light)
  for the recession sign in the relativistic frequency and wavelength laws.
- [NASA Hubble glossary](https://science.nasa.gov/mission/hubble/multimedia/hubble-glossary/)
  for the distinction between cosmological and ordinary Doppler redshift.
- [ESO interferometry analysis](https://www.eso.org/sci/facilities/paranal/telescopes/vlti/tecpub/2004/precision_pke.pdf) for the uniform-disk first-null baseline and finite-bandwidth limits.
- [NASA solar angular diameter activity](https://spacemath.gsfc.nasa.gov/transits/TRACEvenus.html) for the approximate 0.53° solar diameter.
- [Thorlabs scanning Fabry–Perot catalog](https://www.thorlabs.com/catalogpages/V21/969.PDF) for finesse and free spectral range definitions.
- [Nikon MicroscopyU diffraction barrier](https://www.microscopyu.com/techniques/super-resolution/the-diffraction-barrier-in-optical-microscopy) for the Airy first-zero radius and numerical-aperture definition.
- [Hell and Wichmann, original 1994 STED proposal](https://opg.optica.org/ol/abstract.cfm?URI=ol-19-11-780) and [2014 Nobel announcement](https://www.nobelprize.org/prizes/chemistry/2014/press-release/PMC/) for the technique and award attribution.
- [NIST CODATA 2018 chart](https://physics.nist.gov/cuu/pdf/wall_2018.pdf) for the exact SI values of Planck’s and Boltzmann’s constants.
- [MIT Fundamentals of Photonics, Gaussian Beams and Resonators](https://ocw.mit.edu/courses/6-974-fundamentals-of-photonics-quantum-electronics-spring-2006/e9852c138493233bc2813f683da5b199_gaussian_bem_res.pdf) for two-mirror cavity stability.
- [RP Photonics He–Ne lasers](https://www.rp-photonics.com/helium_neon_lasers.html) for helium-to-neon collisional pumping and the common 632.8 nm line.
- [RP Photonics VCSELs](https://www.rp-photonics.com/vertical_cavity_surface_emitting_lasers.html) for vertical emission and the mirror structure.
- [Pendry, original 2000 perfect-lens proposal](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.85.3966) for the historical metamaterial reference.
- [Nikon phase-contrast optical pathways](https://www.microscopyu.com/tutorials/optical-pathways-in-the-phase-contrast-microscope) for the undeviated/diffracted field separation and phase plate.
- [Nikon confocal microscopy guidance](https://www.microscopyu.com/techniques/confocal/critical-aspects-of-confocal-microscopy) for the dependence on objective, pinhole and signal.
- [Nikon near-field microscopy reference](https://www.microscopyu.com/references/near-field-scanning-nsom) for probe-based subwavelength imaging.
- [Wikimedia one-euro confocal image](https://commons.wikimedia.org/wiki/File:Confocal_measurement_of_1-euro-star_3d_and_euro.png) and [endothelial-cell fluorescence image](https://commons.wikimedia.org/wiki/File:FluorescentCells.jpg) for the two figure attributions.
- [RP Photonics single-mode fibers](https://www.rp-photonics.com/single_mode_fibers.html) for the $V<2.405$ higher-mode cutoff.
- [RP Photonics chromatic-dispersion tutorial](https://www.rp-photonics.com/tutorial_passive_fiber_optics10.html) and [group-index reference](https://www.rp-photonics.com/group_index.html) for material and guided-mode group delay.
- [RP Photonics fiber-loss tutorial](https://www.rp-photonics.com/tutorial_passive_fiber_optics7.html) for Rayleigh scattering in amorphous silica and hydroxyl absorption.
- [Fiber Optic Association dispersion guidance](https://www.thefoa.org/tech/ref/testing/test/CD_PMD.html) for the 1310 nm and 1550 nm tradeoff, and [connector terminology](https://www.thefoa.org/tech/ref/termination/names.html) for SC, FC, and MPO names.
- [RP Photonics erbium-doped amplifiers](https://www.rp-photonics.com/erbium_doped_fiber_amplifiers.html) for the common C-band gain region, and [fiber Bragg gratings](https://www.rp-photonics.com/fiber_bragg_gratings.html) for the Bragg-wavelength relation.
- [MIT ray-optical systems notes](https://ocw.mit.edu/courses/6-974-fundamentals-of-photonics-quantum-electronics-spring-2006/cf57a5a4b9a8e2919408daa82557e18f_ray_optical_sys.pdf) and [MIT thick-lens lecture](https://ocw.mit.edu/courses/2-71-optics-spring-2009/0783da3aa46b10365378d762a37bc716_JmK0vSLULP8.pdf) for the ray-transfer and principal-plane conventions.
- [RP Photonics lens reference](https://www.rp-photonics.com/lenses.html) for the lensmaker formula, and its [afocal](https://www.rp-photonics.com/afocal_optical_systems.html) and [telecentric](https://www.rp-photonics.com/telecentric_lenses.html) references for the distinct system conditions.
- [RP Photonics optical-intensity reference](https://www.rp-photonics.com/optical_intensity.html) for complex peak-amplitude and time-average conventions, and [MIT Fresnel-equation lecture](https://ocw.mit.edu/courses/6-007-electromagnetic-energy-from-motors-to-lasers-spring-2011/4c2d4e2527151fd840c3a725bae3d13a_MIT6_007S11_lec34.pdf) for total internal reflection and evanescence.
