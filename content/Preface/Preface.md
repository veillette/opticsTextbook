(chapter.preface)=
# Introduction to Interactive Optics

This book is about optics for advanced undergraduate and beginning graduate students of physics, electrical engineering and related fields.
As a student of these subjects you are probably already familiar with many concepts of optics and the nature of light.
You may remember Snell's law of refraction, the lens formula, ray tracing and interference fringes as observed in the double-slit experiment. By now you have also learned that from Maxwell's equations one can derive that light consists of electromagnetic waves, that its speed $c$ was found to be constant, which resulted in the development of the theory of relativity, and that light exhibits a wave-particle duality that is explained by the De Broglie hypothesis in quantum mechanics. Although this is already a rather sizeable body of knowledge, there is still a lot to learn about optics. However, many of the important topics of optics do not require knowledge of quantum mechanics or even Maxwell's equations. Instead, they concern approximate theories and models of the behavior of light which are sufficiently advanced to explain the phenomena and sufficiently simple so that explicit computations of (approximate) solutions are possible. Using simplified models such a geometrical optics to study problems leads to approaches that differ quite substantially from applying more rigorous theories such as Maxwell's equations. However, the simplified model gives in many circumstances more insight in the physical phenomena and furthermore Maxwell's equations are much too complicated to apply to macroscopic imaging systems in microscopy, lithography or astronomy. This will remain the case for a long time to come in spite of increasing computer resources. When studying different approximate models it is essential to understand their hierarchy and the limits of validity of the approximations made.

Maybe you wonder why you will learn to apply theories which are from the fundamental point of view not correct. But remember that in the end all of physics is merely a model that tries to describe reality. Some models, which tend to be more complex, are more accurate than others, but depending on the phenomena we want to predict, a simpler, less accurate model may suffice. For example in many practical cases, such as the modeling of imaging formation in cameras, geometrical optics is already sufficiently accurate and a model based on Maxwell's equations or even a model based on the scalar wave equation would be too computationally demanding. From a pedagogical point of view, it surely seems preferable to learn the simpler model prior to learning the more accurate model.

We remark that what you will learn from this book applies to a much larger part of physics than only optics. In fact, optics refers strictly speaking only to electromagnetic fields of visible wavelengths from 390 nm to 780 nm. However, everything we will discuss applies to electromagnetic radiation of any wavelength, from $\gamma$ radiation of
$10^{-13}$ nm wavelength to long radio waves of more than $10^3$ m wavelength. Since the approximate theories that we will discuss, such as geometrical optics, are valid provided the wavelength is sufficiently small compared to the size of the objects in the problem, these theories apply also to any of the above-mentioned wavelengths, provided the same ratio of wavelength to typical size of the objects holds.

We summarize the content of the book.
In [](#chapter.basics) we recall some basic facts about Maxwell's equations and show in particular how the wave equation is derived from these equations. Then we discuss some special solutions of Maxwell's equations, such as plane waves and the field emitted by an electric dipole. The use of complex notation for the important case of time-harmonic fields is reviewed.
The derivation of the Fresnel reflection and transmission coefficients of a plane wave incident on an interface is so general that the results apply also to materials with absorption. Evanescent waves are studied in the context of total internal reflection.

In subsequent chapters of the book it is assumed that the reader is familiar with the main part of the topics treated in [](#chapter.basics).

In [](#chapter.GeomOptics), we study light from the point of view of **Geometrical Optics**.
This model of optics applies to cases where the wavelength of light can be considered to be much smaller than other lengths in the problem. In geometrical optics, light is considered to travel as rays. With this concept we can explain phenomena observed in for example the pinhole camera or simple microscopes and telescopes. As the basis of geometrical optics we use the Principle of Fermat. Next, the paraxial theory is introduced. Ray matrices are used extensively, in particular in the study of a thick lens.

In [](#chapter.instrument) geometrical optics is applied to some imaging systems such as the pinhole camera, an ordinary camera, the human eye, the microscope and the telescope.

Then in [](#chapter.polarization) different kinds of **polarization of light** are studied and how these can be manipulated. Here Jones matrices and Jones vectors are used.

In [](#chapter.coherence), the theory of time and spatial coherence is explained. The superposition of light waves is discussed and the phenomenon of interference of light and how this is linked to the degree of coherence is explained. The change of the degree of coherence during the propagation of light is derived and applied to stellar interferometry.

In [](#chapter.diffraction) we treat **Diffraction Optics**. In this model light is described as a wave. With this theory one can explain phenomena such as interference fringes caused by the interaction of light with structures of finite size such as a slit or aperture in a screen. Furthermore, diffraction gratings and applications to spectroscopy are studied and the limit of resolution of a diffraction limited imaging system is derived.

Finally, in [](#chapter.lasers) the unique properties of **lasers and their applications** are discussed. In the treatment of lasers, many of the properties of light discussed in previous chapters will play a role, in particular coherence. A laser contains an optical resonator with a medium which amplifies the light by stimulated emission. To understand the mechanism of stimulated emission, the theory of Einstein is discussed.

All chapters are followed by Problems. Advanced problems are noted by a *.
Finally, in the Appendix some background such as vector calculus, the Lorentz Model for material dispersion and a list of Fourier transformations is given.


The digital version of the book contains links to websites with useful demonstrations and is freely available at
[https://textbooks.open.tudelft.nl/textbooks](https://textbooks.open.tudelft.nl/textbooks).


The book has profited from constructive criticisms of many students that have attended the course over the years. The authors like to thank in particular the teaching assistants Yifeng Shao, Marco Mout, Paulo Ansuinelli, Po-Ju Chen, Thomas van den Hooven, Xukang Wei, Alex Heemels and Thomas Kotte for their help in pointing out mistakes and inconsistencies. For the remaining errors solely the authors are responsible.

---

This book is licensed under a <a rel="license" href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>. It is part of the collection of [Interactive Open Textbooks](https://textbooks.open.tudelft.nl/textbooks/catalog/category/interactive) of [TU Delft Open](https://textbooks.open.tudelft.nl/textbooks/index).

This website is a [Jupyter Book](https://jupyterbook.org/intro.html). MarkDown source files are available for download using the button on the top right.


<a rel="license" href="https://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png"/></a>

Delft, 2022 


A.P.K., A.J.L.A., H.P.U., T.H.A.R.
