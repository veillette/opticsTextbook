---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.16.7
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

(chapter.basics)=
# Nature of Light

This chapter provides a comprehensive introduction to the nature of light, covering its historical development, wave-particle duality, the electromagnetic spectrum, and radiometry. Here's a breakdown of each section:

## Introduction

The chapter opens with a humorous quote from Banesh Hoffmann's 1947 book "The Strange Story of the Quantum," highlighting the historical confusion about light's nature. The introduction establishes that understanding light has been one of physics' most fascinating challenges, noting that even 60 years after early quantum discoveries, Einstein admitted we were still in a state of "learned ignorance" about light's true nature.

The text emphasizes how light connects multiple physics disciplines - optics, electricity, magnetism, and atomic physics - representing one of the great unifications in our understanding of the physical world.

## 1-1 A Brief History

The scientific understanding of light has undergone a remarkable evolution spanning more than three centuries, shaped by competing theories, groundbreaking experiments, and revolutionary insights that fundamentally changed our view of physical reality. This journey from classical mechanics to quantum theory represents one of the most profound intellectual transformations in the history of science, revealing the subtle and counterintuitive nature of light itself.

In the 17th century, Isaac Newton proposed his influential particle theory, suggesting that light consisted of streams of tiny, massless particles—which he called "corpuscles"—traveling through space in perfectly straight lines at enormous speeds. This mechanistic approach was deeply rooted in Newton's broader philosophical framework, which sought to explain all natural phenomena through the motion and interaction of particles governed by mathematical laws. Newton's particle theory elegantly explained many observed optical phenomena: the formation of sharp, well-defined shadows could be understood as particles blocked by opaque objects, while the laws of reflection followed naturally from elastic collisions between light particles and smooth surfaces, much like billiard balls bouncing off cushions. The phenomenon of refraction, where light bends when passing from one medium to another, was explained by assuming that light particles experienced different forces in different materials, causing them to accelerate or decelerate and change direction accordingly. Despite the theory's explanatory power, Newton was troubled by certain observations that seemed difficult to reconcile with his particle hypothesis, particularly the colorful interference patterns known as Newton's rings, which appeared when light passed between closely spaced glass surfaces. Although these phenomena hinted at wave-like behavior, Newton's immense scientific authority and the general success of his mechanical worldview ensured that his particle theory dominated scientific thinking for well over a century.

Contemporary with Newton but representing a fundamentally different philosophical approach, the Dutch physicist Christiaan Huygens advanced a sophisticated wave theory of light that would prove remarkably prescient. Huygens proposed that light propagated as waves through an all-pervading, invisible medium called the "luminiferous ether," much as sound waves travel through air or water waves move across the ocean's surface. According to Huygens' principle, every point on a advancing wavefront could be considered as a source of secondary wavelets, and the envelope of these wavelets determined the new position of the wavefront as it propagated through space. This elegant geometric construction successfully explained not only the familiar phenomena of reflection and refraction but also more complex behaviors that challenged Newton's particle theory. Huygens' wave model provided a natural explanation for the double refraction observed in calcite crystals, where a single incident ray splits into two refracted rays with different polarizations—a phenomenon that seemed to require light to have some form of internal structure or orientation that pure particles could not possess. Perhaps most significantly, the wave theory could account for the fact that when two light beams intersect, they pass through each other completely unmodified, emerging with their original properties intact, much as water waves pass through one another without permanent alteration. This behavior was difficult to explain with particle theory, which would predict collisions and scattering when particles from different beams encountered each other.

The early 19th century witnessed a decisive shift in scientific opinion with Thomas Young's ingenious double-slit experiment, an investigation that many consider one of the most beautiful and profound experiments in the history of physics. Young directed light through two closely spaced, parallel slits and observed the resulting pattern on a screen placed behind the slits. Instead of seeing two bright bands corresponding to light passing through each slit—as particle theory would predict—Young observed a series of alternating bright and dark fringes, a characteristic interference pattern that could only be explained if light behaved as waves. The bright fringes occurred where waves from the two slits arrived in phase, reinforcing each other through constructive interference, while the dark fringes appeared where the waves arrived out of phase, canceling each other through destructive interference. This elegant demonstration provided compelling, virtually irrefutable evidence for the wave nature of light and shifted the scientific consensus decisively away from Newton's particle theory toward Huygens' wave model. Young's experiment also allowed for the first accurate measurements of light's wavelength, revealing that different colors corresponded to different wavelengths, with red light having longer wavelengths than blue light, providing a physical basis for understanding the spectrum of colors that had fascinated natural philosophers since Newton's work with prisms.

The triumph of wave theory in the early 1800s sparked a period of remarkable theoretical and experimental progress that would define 19th-century optics. Augustin Fresnel made fundamental contributions to understanding polarized light, demonstrating that light waves were transverse rather than longitudinal—meaning that the oscillations occurred perpendicular to the direction of propagation, like waves on a string, rather than parallel to it, like sound waves in air. Fresnel's mathematical analysis of polarization phenomena led to his famous equations, which accurately predicted the fraction of light reflected and transmitted when electromagnetic waves encounter interfaces between materials with different optical properties. These equations became cornerstone tools for optical design and engineering, enabling the development of sophisticated optical instruments and technologies. Meanwhile, experimental investigations revealed increasingly subtle wave phenomena, including circular and elliptical polarization, optical activity in certain crystals and solutions, and the precise mathematical relationships governing diffraction patterns created by various apertures and obstacles. The wave theory seemed to provide a complete and satisfying account of all optical phenomena, requiring only the assumption of an ether medium to support the propagation of light waves through apparently empty space.

The intellectual culmination of 19th-century wave theory came with James Clerk Maxwell's revolutionary electromagnetic theory, developed in the 1860s, which unified electricity, magnetism, and light into a single, elegant theoretical framework. Maxwell's equations predicted that oscillating electric and magnetic fields could propagate through space as self-sustaining electromagnetic waves, with the electric and magnetic components oscillating perpendicular to each other and to the direction of propagation. Most remarkably, when Maxwell calculated the speed of these electromagnetic waves using only electrical and magnetic constants measured in laboratory experiments, he found that they traveled at precisely the speed of light—a result so striking that it could hardly be coincidental. This mathematical prediction, confirmed by subsequent measurements, established that light was simply electromagnetic radiation within a specific frequency range, visible to human eyes by evolutionary accident rather than fundamental physical necessity. Maxwell's theory implied the existence of electromagnetic radiation spanning a vast spectrum of frequencies, from radio waves with wavelengths of kilometers to gamma rays with wavelengths smaller than atomic nuclei, with visible light occupying only a tiny sliver of this electromagnetic spectrum. The experimental confirmation of radio waves by Heinrich Hertz in the 1880s provided dramatic validation of Maxwell's theoretical predictions and seemed to establish electromagnetic wave theory as one of the great triumphs of 19th-century physics.

However, the dawn of the 20th century brought a series of experimental discoveries that would shatter the comfortable certainty of classical wave theory and usher in the quantum revolution that continues to shape modern physics. The crisis began with Max Planck's investigation of blackbody radiation—the electromagnetic energy emitted by hot objects—which revealed that classical physics made predictions that disagreed dramatically with experimental observations. To resolve this "ultraviolet catastrophe," Planck made the desperate assumption that energy could only be emitted or absorbed in discrete packets, or "quanta," with energies given by $E = h\nu$, where $h$ was a new fundamental constant of nature (now called Planck's constant) and $\nu$ was the frequency of the radiation. Although Planck initially viewed this quantization as a mathematical artifice rather than a fundamental feature of nature, his quantum hypothesis marked the beginning of a new era in physics that would revolutionize our understanding of light and matter.

Einstein's explanation of the photoelectric effect provided the next crucial step in establishing the particle nature of light, earning him the Nobel Prize and helping to establish the reality of photons as discrete packets of electromagnetic energy. Einstein demonstrated that when light strikes a metal surface, electrons are ejected with kinetic energies that depend on the frequency of the incident light rather than its intensity—a result that could not be explained by classical wave theory but followed naturally if light consisted of photons with energy $E = h\nu$. Each photon could transfer its entire energy to a single electron, providing enough energy to overcome the metal's work function and eject the electron from the surface. Arthur Compton's scattering experiments in the 1920s provided additional confirmation of photon reality by demonstrating that X-rays scattered from electrons behaved exactly like particles with momentum $p = E/c = h\nu/c$, experiencing billiard-ball-like collisions that conserved both energy and momentum according to relativistic mechanics.

The quantum revolution reached its philosophical climax with Louis de Broglie's audacious proposal that the wave-particle duality observed in light was a universal feature of nature, extending to matter itself through the relationship $\lambda = h/p$, where matter particles with momentum $p$ should exhibit wave properties with wavelength $\lambda$. This hypothesis, initially met with skepticism, was dramatically confirmed by electron diffraction experiments that showed electrons creating interference patterns identical to those produced by light waves, revealing that the classical distinction between waves and particles was an artifact of limited experimental resolution rather than a fundamental feature of reality. The subsequent development of quantum mechanics by Schrödinger, Heisenberg, Born, and others established that all quantum objects—photons, electrons, atoms, and even large molecules—exhibit both wave and particle characteristics depending on how they are observed and measured, with the apparent contradiction resolved through the probabilistic interpretation of quantum mechanical wavefunctions that describe the likelihood of finding particles at particular locations when measurements are performed.


# 1-2 Particles and Photons

The quantum mechanical revolution of the early 20th century fundamentally changed our understanding of light and matter. What emerged was a profound realization that neither the classical wave model nor the classical particle model alone could adequately describe the behavior of photons and electrons. Instead, these entities exhibit **wave-particle duality**—displaying both wave and particle characteristics depending on the experimental context in which they are observed.

## Wave-Particle Duality

The concept of wave-particle duality represents one of the most counterintuitive yet essential principles in modern physics. When we observe light in certain experiments, such as interference and diffraction phenomena, it behaves unmistakably like a wave. The famous double-slit experiment demonstrates this beautifully, producing interference patterns that can only be explained by wave superposition. However, in other contexts, such as the photoelectric effect or Compton scattering, light behaves as discrete particles called photons, each carrying a specific quantum of energy.

Similarly, electrons and other material particles, traditionally viewed as solid, localized objects, also exhibit wave-like properties. Louis de Broglie's revolutionary hypothesis proposed that all matter has an associated wavelength, leading to the development of electron microscopy and our modern understanding of atomic structure.

## Fundamental Quantum Mechanical Equations

Quantum mechanics provides a unified mathematical framework that describes both material particles and photons through a set of fundamental relationships. For any particle or photon, the following equations connect energy, momentum, mass, and other properties:

The **relativistic energy-momentum relation** gives us:
$$p = \frac{\sqrt{E^2 - m^2c^4}}{c} \tag{1-3}$$

The **de Broglie wavelength** relates the wave and particle aspects:
$$\lambda = \frac{h}{p} = \frac{hc}{\sqrt{E^2 - m^2c^4}} \tag{1-4}$$

The **relativistic velocity** can be expressed as:
$$v = \frac{pc^2}{E} = c\sqrt{1 - \frac{m^2c^4}{E^2}} \tag{1-5}$$

These equations apply universally to both massive particles and massless photons, though they simplify considerably for the photon case.

## Photon Properties

For photons, which have zero rest mass ($m = 0$), the fundamental equations reduce to elegant, simpler forms. Setting $m = 0$ in the relativistic energy-momentum relation yields:

$$p = \frac{E}{c} \tag{1-6}$$

This tells us that a photon's momentum is directly proportional to its energy, with the speed of light as the proportionality constant.

The de Broglie wavelength for photons becomes:
$$\lambda = \frac{hc}{E} \tag{1-7}$$

This relationship directly connects the wave property (wavelength) with the particle property (energy) through Planck's constant $h$.

Finally, all photons travel at the same speed regardless of their energy:
$$v = c \tag{1-8}$$

This universal speed is one of the defining characteristics of electromagnetic radiation and forms the basis for Einstein's special theory of relativity.

## Example 1-1: Electron and Photon Comparison

To illustrate these concepts, consider an electron with kinetic energy $K = 2.5$ MeV. We can calculate its relativistic properties and compare them with a photon of the same total energy.

For the electron, the total energy is $E = K + mc^2 = 2.5 + 0.511 = 3.011$ MeV. Using equation (1-3), the momentum is:
$$p = \frac{\sqrt{(3.011)^2 - (0.511)^2}}{c} = \frac{2.97}{c} \text{ MeV}$$

The de Broglie wavelength from equation (1-4) is:
$$\lambda = \frac{hc}{pc} = \frac{1.24 \times 10^{-6}}{2.97} = 4.18 \times 10^{-7} \text{ m}$$

The electron's speed from equation (1-5) is:
$$v = c\sqrt{1 - \frac{(0.511)^2}{(3.011)^2}} = 0.987c$$

For a photon with the same total energy (3.011 MeV), the momentum would be $p = E/c = 3.011$ MeV/c, the wavelength would be $\lambda = hc/E = 4.12 \times 10^{-7}$ m, and the speed would be exactly $c$.

## Statistical Behavior

Beyond their individual properties, electrons and photons exhibit fundamentally different statistical behaviors that have profound implications for quantum systems. Electrons, being fermions with half-integer spin, obey **Fermi-Dirac statistics**. This means they are subject to the Pauli exclusion principle—no two electrons can occupy the same quantum state simultaneously. This principle governs the structure of atoms, the periodic table of elements, and the electrical properties of materials.

Photons, on the other hand, are bosons with integer spin and obey **Bose-Einstein statistics**. Unlike electrons, multiple photons can occupy the same quantum state without restriction. This property is crucial for understanding laser operation, where many photons are stimulated to emit into the same mode, creating the coherent, intense light characteristic of laser beams.

The statistical differences also manifest in other phenomena. The tendency of bosons to "cluster" in the same state leads to Bose-Einstein condensation at very low temperatures, while the exclusion principle for fermions results in degeneracy pressure that supports white dwarf stars against gravitational collapse.

## Implications and Applications

The wave-particle duality and quantum mechanical description of light and matter have revolutionized technology and our understanding of nature. Electron microscopy exploits the wave nature of electrons to achieve resolution far beyond optical microscopes. Quantum electronics relies on the particle nature of light in devices like photodiodes and photomultiplier tubes. Modern telecommunications uses both aspects—the wave nature for propagation and interference effects in fiber optics, and the particle nature for quantum cryptography and single-photon detection.

The unification provided by quantum mechanics demonstrates that what we perceive as fundamentally different phenomena—waves and particles—are actually complementary aspects of a deeper quantum reality. This duality extends beyond photons and electrons to all quantum entities, forming the foundation for our modern understanding of atomic physics, condensed matter physics, and quantum field theory.


# 1-3 The Electromagnetic Spectrum

Electromagnetic radiation encompasses an enormous range of wavelengths and frequencies, from radio waves spanning kilometers to gamma rays with wavelengths smaller than atomic nuclei. Despite this vast diversity, all electromagnetic waves share fundamental properties and are unified by the same underlying physics.

## Basic Properties of Electromagnetic Waves

All electromagnetic waves, regardless of their wavelength or frequency, travel at the same speed in vacuum: $c = 3.00 \times 10^8$ m/s. This universal speed represents one of nature's fundamental constants and forms the cornerstone of Einstein's special relativity.

The relationship between wavelength $\lambda$ and frequency $\nu$ is given by:
$$c = \lambda\nu \tag{1-9}$$

This simple equation reveals an inverse relationship: as wavelength increases, frequency decreases proportionally. The energy of electromagnetic radiation is quantized in units called photons, with each photon carrying energy $E = h\nu$, where $h$ is Planck's constant. This quantization means that electromagnetic waves can only gain or lose energy in discrete amounts proportional to their frequency.

## The Electromagnetic Spectrum Regions

The electromagnetic spectrum is traditionally divided into regions based on wavelength, frequency, and the physical mechanisms that produce and detect the radiation. Figure 1-1 illustrates these regions and their characteristic properties.

### Radio Waves
Radio waves represent the longest wavelengths in the electromagnetic spectrum, ranging from kilometers down to about one meter. These waves are produced by oscillating electric charges in antennas and circuits. Radio waves readily penetrate Earth's atmosphere and can travel vast distances, making them ideal for communication. They are used in AM and FM radio broadcasting, television transmission, and various forms of wireless communication.

### Microwaves
With wavelengths from about one meter down to one millimeter, microwaves occupy the transition region between radio waves and infrared radiation. They are extensively used in radar systems, where their ability to reflect off objects enables distance and velocity measurements. Microwave ovens operate at 2.45 GHz, causing water molecules to rotate and generate heat through friction. Satellite communications and cellular phone networks also rely heavily on microwave frequencies.

### Infrared Radiation
Infrared (IR) radiation spans wavelengths from 770 nanometers to about one millimeter. All objects above absolute zero emit thermal infrared radiation, with the peak wavelength determined by temperature according to Wien's displacement law. Infrared radiation is subdivided into near-infrared (closest to visible light), mid-infrared, and far-infrared regions. Night-vision equipment detects infrared emission from warm objects, while infrared spectroscopy identifies molecular vibrations for chemical analysis.

### Visible Light
The visible portion of the electromagnetic spectrum represents only a tiny fraction of the total range, spanning approximately 380 to 770 nanometers. Human eyes have evolved to detect this narrow band because it corresponds to the peak output of our Sun and the wavelengths that penetrate Earth's atmosphere most effectively. Within this range, different wavelengths correspond to different colors: violet (380-450 nm), blue (450-495 nm), green (495-570 nm), yellow (570-590 nm), orange (590-620 nm), and red (620-770 nm).

### Ultraviolet Radiation
Ultraviolet (UV) radiation extends from the violet edge of visible light (380 nm) down to about 10 nanometers. This region is further subdivided based on biological effects and atmospheric absorption: UV-A (315-400 nm) penetrates the atmosphere and can cause skin aging; UV-B (280-315 nm) is partially absorbed by ozone and causes sunburn; UV-C (100-280 nm) is completely absorbed by the atmosphere and is germicidal. UV radiation has sufficient energy to break chemical bonds and ionize atoms, making it both useful for sterilization and potentially harmful to living tissue.

### X-rays
X-rays occupy wavelengths from about 10 nanometers down to 10⁻⁴ nanometers. They are typically produced when high-energy electrons bombard a metal target, causing the emission of characteristic X-rays as inner electron shells are disturbed. X-rays penetrate soft tissue but are absorbed by denser materials like bone, making them invaluable for medical imaging. X-ray crystallography uses the wave nature of X-rays to determine atomic structure in crystals through diffraction patterns.

### Gamma Rays
Gamma rays represent the shortest wavelengths in the electromagnetic spectrum, typically less than 0.1 nanometers. They originate from nuclear decay processes, nuclear reactions, and high-energy astronomical phenomena. Gamma rays have enormous penetrating power and require thick lead or concrete shielding. In medicine, controlled gamma radiation is used for cancer treatment, while gamma-ray astronomy reveals the most energetic processes in the universe.

## Energy Quantization and Detection

A crucial concept for understanding electromagnetic radiation is that its energy becomes increasingly "grainy" at higher frequencies. Low-frequency radio waves have such small photon energies that individual photons are undetectable with ordinary instruments—the signal appears continuous. However, as frequency increases, photon energies become large enough that individual photons can be detected and counted.

## Example 1-2: Radar Detection and Photon Statistics

Consider a radar receiver detecting electromagnetic radiation at different wavelengths. For a 10-meter radio wave (30 MHz), each photon carries energy $E = h\nu = (6.63 \times 10^{-34})(3 \times 10^7) = 2.0 \times 10^{-26}$ J. A typical radar signal might deliver $10^{-12}$ watts to the receiver, corresponding to about $3 \times 10^{13}$ photons per second—far too many to detect individually.

In contrast, X-ray photons with wavelength 0.1 nm have energy $E = hc/\lambda = 2.0 \times 10^{-15}$ J—about $10^{11}$ times more energetic than the radio photons. The same power level would correspond to only about 300 X-ray photons per second, easily counted by modern detectors.

This dramatic difference in photon flux explains why radio astronomy requires large dish antennas to collect sufficient signal, while X-ray astronomy can operate with much smaller collection areas but requires specialized detectors capable of registering individual photons.

The electromagnetic spectrum thus represents a continuum of radiation unified by common physical principles yet displaying remarkably diverse properties and applications across its vast range of wavelengths and frequencies.

# 1-4 Radiometry

The quantitative measurement and characterization of electromagnetic radiation forms the foundation of radiometry, a discipline that provides the mathematical framework essential for understanding energy transport by electromagnetic waves. Whether designing optical instruments, analyzing thermal radiation, or characterizing laser systems, radiometry supplies the precise terminology and mathematical relationships needed to describe how electromagnetic energy flows through space and interacts with matter.

## Fundamental Radiometric Concepts

Radiometry addresses the fundamental question of how electromagnetic energy propagates from sources to detectors. Unlike photometry, which focuses on human visual perception, radiometry treats all electromagnetic radiation objectively, providing universal principles that apply across the entire electromagnetic spectrum. The field establishes standardized quantities and units that enable precise communication about radiation measurements and facilitate the design of optical systems.

The importance of radiometric principles extends far beyond academic physics. Modern applications ranging from satellite remote sensing to fiber optic communications, from thermal imaging to solar energy collection, all rely on accurate radiometric analysis. Understanding these concepts enables engineers and scientists to predict system performance, optimize designs, and interpret measurements correctly.

## Key Radiometric Quantities

Radiometry defines several interconnected quantities, each serving specific purposes in describing electromagnetic radiation. These quantities, summarized in Table 1-1, form a complete framework for characterizing radiation fields.

**Radiant Energy** ($Q_e$), measured in joules, represents the total electromagnetic energy present in a region of space or emitted by a source over a specified time interval. This fundamental quantity provides the foundation for all other radiometric measurements, though it is often more useful to consider rates of energy flow rather than total energy.

**Radiant Flux** or **Radiant Power** ($\Phi_e$), measured in watts, describes the time rate of energy flow:
$$\Phi_e = \frac{dQ_e}{dt}$$

This quantity proves particularly useful for characterizing sources and determining the power available for detection or utilization. Radiant flux forms the basis for more specialized radiometric quantities that account for spatial and angular distributions.

**Irradiance** ($E_e$), measured in watts per square meter, quantifies the radiant flux incident on a surface per unit area:
$$E_e = \frac{d\Phi_e}{dA}$$

Irradiance measurements are fundamental in applications such as solar energy assessment, where the goal is to determine the power available from sunlight falling on a collector of known area.

**Radiant Exitance** ($M_e$), also measured in watts per square meter, describes the radiant flux leaving a surface per unit area. This quantity proves essential for characterizing sources and understanding thermal radiation from heated objects.

## Angular Considerations in Radiometry

Many radiometric applications require understanding how radiation varies with direction, necessitating quantities that incorporate angular dependence.

**Radiant Intensity** ($I_e$), measured in watts per steradian, describes the radiant flux per unit solid angle in a given direction:
$$I_e = \frac{d\Phi_e}{d\omega} \tag{1-10}$$

where $d\omega$ represents the differential solid angle in steradians. Radiant intensity characterizes the directional emission pattern of sources, crucial information for applications such as illumination design and antenna analysis.

**Radiance** ($L_e$), measured in watts per square meter per steradian, represents the most complete radiometric quantity, describing the radiant flux per unit projected area per unit solid angle:
$$L_e = \frac{d^2\Phi_e}{dA\cos\theta \, d\omega}$$

Radiance provides the most detailed description of radiation fields and plays a central role in optical system analysis.

## The Inverse Square Law

For point sources radiating uniformly in all directions, geometric considerations lead to the inverse square law, one of the most important relationships in radiometry. Consider a point source emitting total radiant flux $\Phi_e$ uniformly over all directions. At distance $r$ from the source, this flux is distributed over a spherical surface of area $4\pi r^2$. The irradiance at this distance becomes:

$$E_e = \frac{\Phi_e}{4\pi r^2} \tag{1-11}$$

For sources with directional emission characterized by radiant intensity $I_e$, the relationship simplifies to:
$$E_e = \frac{I_e}{r^2}$$

This inverse square dependence explains why astronomical objects appear dimmer at greater distances and why illumination systems require careful consideration of source-to-target distances. The law assumes point sources and neglects atmospheric absorption, but provides excellent approximations for many practical situations.

## Lambert's Cosine Law and Diffuse Surfaces

Many natural and artificial surfaces exhibit approximately diffuse reflection or emission, characterized by Lambert's cosine law. For a perfectly diffuse surface, the radiant intensity varies with viewing angle $\theta$ (measured from the surface normal) according to:

$$I(\theta) = I(0)\cos\theta \tag{1-13}$$

where $I(0)$ represents the intensity in the normal direction. This angular dependence might initially suggest that diffuse surfaces appear brighter when viewed straight-on than at oblique angles. However, the projected area of the surface as seen by an observer also varies as $\cos\theta$, leading to a remarkable result.

The radiance of a perfectly diffuse surface is given by:
$$L_e = \frac{I(\theta)}{A\cos\theta} = \frac{I(0)\cos\theta}{A\cos\theta} = \frac{I(0)}{A} = \text{constant} \tag{1-14}$$

This constancy of radiance explains why diffuse surfaces appear equally bright from all viewing angles—a familiar observation that the brightness of a white sheet of paper remains constant as you change your viewing position.

## Radiance Invariance Theorem

One of the most powerful principles in radiometry states that radiance remains constant along a ray in a non-absorbing medium. This fundamental theorem can be proven using conservation of energy and the properties of solid angles.

Consider radiance $L_e$ at two points along a ray in vacuum or a transparent medium. Using conservation of energy and the relationship between solid angles as viewed from different positions, it can be shown that:

$$L_e(\text{point 1}) = L_e(\text{point 2}) \tag{1-15}$$

This invariance principle has profound implications for optical system design. It means that no optical system can increase the radiance of a source—lenses and mirrors can redirect and concentrate radiation, but they cannot increase the fundamental brightness of extended sources. This limitation, sometimes called the conservation of étendue or the brightness theorem, constrains the performance of optical systems and explains why simply adding more lenses cannot arbitrarily increase the intensity of solar radiation.

The radiance invariance theorem also applies at boundaries between different media, provided appropriate corrections for refractive index are included:
$$\frac{L_e^{(1)}}{n_1^2} = \frac{L_e^{(2)}}{n_2^2} \tag{1-16}$$

where $n_1$ and $n_2$ are the refractive indices of the two media.

## Practical Example: Helium-Neon Laser Characterization

To illustrate radiometric principles, consider a typical helium-neon laser with the following specifications: output power $P = 1.0$ mW, beam diameter $d = 1.5$ mm, and full-angle beam divergence $\theta = 1.2$ milliradians.

First, we calculate the solid angle subtended by the diverging beam. For small angles, the solid angle is approximately:
$$\Omega = \pi\left(\frac{\theta}{2}\right)^2 = \pi\left(\frac{1.2 \times 10^{-3}}{2}\right)^2 = 1.13 \times 10^{-6} \text{ steradians}$$

The radiant intensity of the laser is:
$$I_e = \frac{\Phi_e}{\Omega} = \frac{1.0 \times 10^{-3}}{1.13 \times 10^{-6}} = 885 \text{ W/sr}$$

The cross-sectional area of the beam is:
$$A = \pi\left(\frac{d}{2}\right)^2 = \pi\left(\frac{1.5 \times 10^{-3}}{2}\right)^2 = 1.77 \times 10^{-6} \text{ m}^2$$

The radiance of the laser beam is:
$$L_e = \frac{I_e}{A} = \frac{885}{1.77 \times 10^{-6}} = 5.0 \times 10^8 \text{ W·m}^{-2}\text{·sr}^{-1}$$

This high radiance value illustrates why even low-power lasers can be dangerous to human vision—the concentrated energy density far exceeds that of conventional sources.

The irradiance at the laser output is:
$$E_e = \frac{\Phi_e}{A} = \frac{1.0 \times 10^{-3}}{1.77 \times 10^{-6}} = 565 \text{ W/m}^2$$

These calculations demonstrate how radiometric quantities provide quantitative characterization essential for laser safety analysis, system design, and performance prediction.

Radiometry thus provides the mathematical foundation for understanding electromagnetic radiation transport, enabling precise analysis and design of optical systems across diverse applications from astronomy to laser technology.

## Problems

The chapter includes 17 problems ranging from basic de Broglie wavelength calculations to more complex radiometric analyses, providing students with opportunities to apply the theoretical concepts to practical situations involving photons, electromagnetic waves, and optical systems.

This chapter effectively establishes the foundation for understanding light as both wave and particle, providing the mathematical tools and physical insights necessary for advanced optics studies.

# Problems

**1.1** Calculate the de Broglie wavelength of an electron moving at 2.5 × 10⁶ m/s. Compare this to the wavelength of a photon with the same momentum.

**1.2** A photon has a wavelength of 550 nm (green light). Find its:
(a) frequency
(b) energy in joules
(c) energy in eV
(d) momentum

**1.3** An electron is accelerated from rest through a potential difference of 100 V. Calculate:
(a) its kinetic energy in eV
(b) its de Broglie wavelength
(c) its speed (non-relativistic approximation is acceptable)

**1.4** For a relativistic electron with total energy E = 2.0 MeV:
(a) Find the kinetic energy
(b) Calculate the momentum using equation 1-3
(c) Determine the de Broglie wavelength
(d) Find the speed using equation 1-5

**1.5** A helium-neon laser emits light at wavelength 632.8 nm with a power of 5.0 mW. How many photons does it emit per second?

**1.6** Compare the energy and momentum of:
(a) A 1.0 MeV photon
(b) A 1.0 MeV electron (total energy)
Which has the shorter wavelength?

**1.7** An X-ray photon has energy 50 keV. Calculate:
(a) its wavelength
(b) its momentum
(c) the momentum of an electron with the same energy

**1.8** The average wavelength of sunlight is approximately 550 nm, and the solar constant (irradiance at Earth's distance) is 1360 W/m². Calculate:
(a) the energy per photon
(b) the number of photons per square meter per second reaching Earth's atmosphere

**1.9** A microwave oven operates at frequency 2.45 GHz. Find:
(a) the wavelength
(b) the photon energy in joules and eV
(c) the number of photons emitted per second if the oven generates 800 W of microwave power

**1.10** An AM radio station broadcasts at 1200 kHz with a power of 50 kW. An FM station broadcasts at 101.5 MHz with the same power. Calculate the number of photons per second emitted by each station and comment on the detectability of individual photons.

**1.11** A point light source emits 60 W uniformly in all directions. Calculate the irradiance at distances of:
(a) 1.0 m
(b) 5.0 m
(c) 100 m

**1.12** A laser pointer has a radiant intensity of 1.5 × 10⁻³ W/sr. Find the irradiance it produces on a screen at distance:
(a) 2.0 m
(b) 10 m

**1.13** A perfectly diffuse surface has radiance L₀ = 1000 W·m⁻²·sr⁻¹. Calculate:
(a) the radiant exitance of the surface
(b) the radiant intensity per unit area in the normal direction
(c) the radiant intensity per unit area at 45° from the normal

**1.14** A collimated laser beam has diameter 2.0 mm and power 10 mW. If the beam divergence is negligible over short distances, calculate:
(a) the irradiance in the beam
(b) the radiant intensity if the beam divergence half-angle is 0.5 mrad
(c) the radiance of the beam

**1.15** Consider a tungsten filament lamp rated at 100 W electrical power with 5% efficiency for visible light production. The filament area is 20 mm² and emits as a Lambert surface. Calculate:
(a) the radiant exitance for visible light
(b) the radiance
(c) the radiant intensity per unit area in the normal direction

**1.16** A camera with lens diameter 50 mm is used to photograph a distant star. The star has apparent magnitude +2.0, corresponding to an irradiance of 2.5 × 10⁻⁹ W/m² at the camera location. If the star light has average wavelength 550 nm, calculate:
(a) the total power collected by the camera lens
(b) the number of photons per second reaching the detector
(c) the minimum exposure time needed to collect 1000 photons

**1.17** A solar panel with area 2.0 m² receives sunlight with irradiance 800 W/m². The average photon energy corresponds to wavelength 600 nm. Calculate:
(a) the total power incident on the panel
(b) the number of photons per second hitting the panel
(c) If the panel has 20% efficiency in converting photons to electrical energy, what is the electrical power output?
(d) Compare the photon flux to that of a 10 mW laser pointer with 1 mm beam diameter


### QUIZ TRYOUT
The following are some possible ways to include questions inline. Source: [Jupyter quiz](https://pypi.org/project/jupyterquiz/#description). The content of the questions can be found in the file ```questions_ch1.json```

```{code-cell} ipython3
:tags: [remove-input]

from jupyterquiz import display_quiz
git_path="https://raw.githubusercontent.com/jmshea/jupyterquiz/main/examples/"
# display_quiz(git_path+"questions.json")
display_quiz("questions_ch1.json")
```
