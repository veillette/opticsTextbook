# Problems

**Problem 3.1** Consider a ray transfer matrix

```{math}
:label: eq:inst:transferMatrix
\left( \begin{array}{cc}A & B \\C & D
\end{array}\right)
```

between two planes, acting on the ray vector $(n\alpha,y)^T$ with reduced angle first and height second.


**(a)** Suppose that any ray that is parallel to the optical axis in the first plane goes through a point on the optical axis in the second plane. This means that the second plane is the focal plane of the system. What does this imply for the elements of the transfer matrix?

**(b)** Suppose that the first plane is a focal plane so that any ray emitted by the point on the optical axis in this plane becomes collimated in the second plane. What does this imply for the elements of the transfer matrix?

**(c)** Consider two thin lenses separated by a distance $d$ and focal distances $f_1$ and $f_2$. Derive the transfer matrix linking the plane immediately before the first lens with the plane immediately behind the second lens. You may assume that the lenses are in air with refractive index $n=1$.

**(d)** Use the condition that you found in a) to derive the back focal distance of a system consisting of two thin lenses with focal distances $f_1$ and $f_2$ and distance $d$. Verify that the result agrees with the distance for the back focal plane in {ref}`sec:ray:twolenses`.
Hint: let $f_b$ be the distance of the back focal point of the two-lens system to the second lens. Write the transfer matrix between the plane immediately before the first lens and the plane through the back focal point.

**(e)** Add a third thin lens with focal distance $f_3$ in contact with the second lens. Answer question c) for this system.


**Problem 3.2** The eye and the magnifying glass.

In this problem the eye is modeled as a single thin lens that creates an image on the retina.

The distance between the retina and the lens is $d_r$. Let us call the focal length of the lens $f_{\text{eye}}$. The eye is capable of varying $f_{\text{eye}}$.

**(a)** Suppose that the relaxed eye can see far-away objects sharply. How are $f_{\text{eye}}$ and $d_r$ related for a relaxed eye?

**(b)** Suppose we want to see an object that is nearby, with coordinate $s_o$, say. What should $f_{\text{eye}}$ be to obtain a sharp image on the retina?

**(c)** We introduce a magnifying glass, i.e. we put a thin lens with focal length $f$ in front of the eye. In front of the magnifying glass, there is a nearby object. We want to place the object such that a completely relaxed eye can see it sharply. Where should the object be? Verify your answer using the applet found here:

[https://www.geogebra.org/m/schcyhz3](https://www.geogebra.org/m/schcyhz3).

**(d)** Use transfer matrices to calculate the transverse magnification from the object plane to the retina when the eye is relaxed and the object is positioned as in part (c). Assume $n=1$ throughout. How does the magnification depend on $f$? Verify your answer with the applet.

**Problem 3.3** Increasing the angular field of view.

Patients with tunnel vision have only a limited field of view because only the central region of their retina is light sensitive. Suppose that the sensitive region of the retina is circular and has radius $r=2\,\text{mm}$.
The length of the eye is $24\,\text{mm}$ and the cornea and crystalline lens are treated together as a single thin lens at the front of the eye.

**(a)** Show that the angular field of view of distant objects is

$$
\alpha_u\approx 6.4^\circ.
$$

Here $\alpha_u$ is the half-angle of the field of view. Use the paraxial approximation and take into account that the ray entering the center of the eye lens is refracted into vitreous humor of refractive index $n=1.337$.

**(b)** Use a negative lens with focal distance $f<0$ at a distance $d$ in front of the eye. Show that when

$$
d=9 |f|,
$$
the angular field of view is increased by a factor 10.

**(c)** Require the virtual images of distant objects to be at least as far from the eye as the 25 cm reference distance; thus $d+|f|\geq25\,\text{cm}$. Combined with part (b), find the minimum possible $d$ and the corresponding negative-lens power in diopters.

```{figure} ../Images/03_15_eye.png
:name: fig:inst:eyeFieldOfView
:alt: Ray diagrams compare the unaided narrow retinal field of view with the wider external field seen through a negative lens in front of the eye.
Half-angle $\alpha_u$ of the unaided field of view and the field enlarged by a negative lens.
```


**Problem 3.4** \* Imaging with a planar interface.
In this problem we investigate whether a single planar interface can image an object in the paraxial approximation. Allow the second medium to have a negative refractive index, as in an idealized negative-index material.

**(a)** We have two media with refractive indices $n_1$ and $n_2$, separated by a planar interface. Give the transfer matrix $\mathcal{T}$ for refraction at a planar interface using the paraxial approximation.

**(b)** Suppose we have an object that is a distance $d$ from the interface. Give the system matrix that describes a ray propagating from the object to the plane that is a distance $d$ behind the interface (see {numref}`fig:inst:planarInterface`).

```{figure} ../Images/03_16_planar_interface.png
:name: fig:inst:planarInterface
:alt: Rays from an object at distance d to the left of a planar interface refract toward an image plane at distance d to the right.
Planar interface between media of indices $n_1$ and $n_2$, with object and candidate image planes each at distance $d$ from the interface.
```

**(c)** Assuming $d>0$, what condition on $n_1$ and $n_2$ makes the matrix image the object plane onto the plane behind the interface? Explain why ordinary positive-index media cannot satisfy this condition. The negative-refraction arrangement is related to the principle of a **Veselago lens**.
