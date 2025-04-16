---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.16.7
---

(chapter.GeomOptics)=
# Geometrical Optics


```{admonition} What you should know and be able to do after studying this chapter
- Principle of Fermat.
- Understand the approximation made in Gaussian geometrical optics.
- Know how to work with the sign convention of the Lens Maker's Formula (not the derivation of the formula).
- Understand how the Lens Maker's Formula of a single lens follows from the formula for a single interface.
- Understand how the image of two and more lenses is derived from that of a single lens by construction and by computing the intermediate images. You do not need to know the imaging equation and the formulae for the focal distances of two thin lenses.
- Understand the matrix method (you do not need to know the matrices by hart).
- Understand the modification of the lens model to incorporate a thick lens.
- Understand the limitations of geometrical optics, in particular when diffraction optics is needed.
```
**Nice software for practicing geometrical optics**:

[https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics_all.html](https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics_all.html)

## Introduction
Geometrical optics is an old subject but it is still essential to understand and design optical instruments such as camera's, microscopes, telescopes etc. Geometrical optics started long before light was described as a wave as is done in wave optics, and long before it was discovered that light is an electromagnetic wave and that optics is part of electromagnetism.

In this chapter, we go back in history and treat geometrical optics. That may seem strange now that we have a much more accurate and better theory at our disposal. However, the predictions of geometrical optics are under quite common circumstances very useful and also very accurate. In fact, for many optical systems and practical instruments there is no alternative for geometrical optics because more accurate theories are much too complicated to use.

When a material is illuminated, its molecules start to radiate spherical waves (more precisely, they radiate like tiny electric dipoles) and the total wave scattered by the material is the sum of all these spherical waves. A time-harmonic wave has at every point in space and at every instant of time a well defined phase.
A **wave front** is a set of space-time points where the phase has the same value. At any fixed time, the wave front is called a surface of constant phase. This surface moves with the phase velocity in the direction of its local normal.

For plane waves, we have shown in the previous chapter that the surfaces of constant phase are planes and that the normal to these surfaces is in the direction of the wave vector which coincides with the direction of the phase velocity as well as with the direction of the flow of energy (the direction of the Poynting vector). For general waves, the local direction of energy flow is given by the direction of the Poynting vector. Provided that the radius of curvature of the surfaces is much larger than the wavelength, the normal to the surfaces of constant phase may still be considered to be in the direction of the local flow of energy. Such waves behave locally as plane waves and their effect can be accurately described by the methods of geometrical optics.

Geometrical optics is based on the intuitive idea that light consists of a bundle of rays. But what is a ray?


```{note}
A ray is an oriented curve which is everywhere perpendicular to the surfaces of constant phase and points in the direction of the flow of energy.
```

Consider a point source at some distance before an opaque screen with an aperture. According to the ray picture, the light distribution on a second screen further away from the source and parallel to the first screen is simply an enlarged copy of the aperture (see {numref}`Fig_2_01_GeomDiffr`). The copy is enlarged due to the fanning out of the rays. However, this description is only accurate when the wavelength of the light is very small compared to the diameter of the aperture. If the aperture is only ten times the wavelength, the pattern is much broader due to the bending of the rays around the edge of the aperture. This phenomenon is called **diffraction**. Diffraction can not be explained by geometrical optics and will be studied in [](#chapter.diffraction).


```{figure} Images/Chapter_2/2_01_Figgeom.png
:name: Fig_2_01_GeomDiffr
Light distribution on a screen due to a rectangular aperture. Left: for a large aperture, we get an enlarged copy of the aperture. Right: for an aperture that is of the order of the wavelength there is strong bending (diffraction) of the light. 
```


Geometrical optics is accurate when the sizes of the objects in the system are large compared to the wavelength. It is possible to derive geometrical optics from Maxwell's equations by formally expanding the electromagnetic field in a power series in the wavelength and retaining only the first term of this expansion <sup>[^1]: Derivation of geometrical optics from Maxwell's equations.</sup>. However, this derivation is not rigorous because the power series generally does not converge (it is a so-called asymptotic series).

Although it is possible to incorporate polarization into geometrical optics <sup>[^2]: Treatment of polarization effects in geometrical optics.</sup>, this is not standard theory and we will not consider polarization effects in this chapter.

## Principle of Fermat

The starting point of the treatment of geometrical optics is the 

```{note}
**Principle of Fermat (1657)**. The path followed by a light ray between two points is the one that takes the least amount of time.
```

The speed of light in a material with refractive index $n$, is $c/n$, where $c=3\times 10^8$ m/s is the speed of light in vacuum. At the time of Fermat, the conviction was that the speed of light must be finite, but nobody could suspect how incredibly large it actually is. In 1676 the Danish astronomer Ole R&ouml;mer computed the speed from inspecting the eclipses of a moon of Jupiter and arrived at an estimate that was only 30\% too low.

Let $\mathbf{r}(s)$, be a ray with $s$ the length parameter. The ray links two points $S$ and $P$.
Suppose that the refractive index varies with position: $n(\mathbf{r})$. Over the infinitesimal distance from $s$ to
$s+\mathrm{d}s$, the speed of the light is

```{math}
:label: eq.defcn
\begin{align*}
\frac{c}{n(\mathbf{r}(s))}.
\end{align*}
```
Hence the time it takes for light to go from $\mathbf{r}(s)$ to $\mathbf{r}(s+\mathrm{d}s)$ is:

```{math}
:label: eq.defdt
\begin{align*}
\mathrm{d}t = \frac{n(\mathbf{r}(s))}{c} \mathrm{d}s,
\end{align*}
```
and the total total time to go from $S$ to $P$ is:

```{math}
:label: eq.ttot
\begin{align*}
t_{S \rightarrow P} = \int_0^{s_P} \frac{n(\mathbf{r}(s))}{c} \mathrm{d}s,
\end{align*}
```
where $s_P$ is the distance along the ray from S to P.
The **optical path length** [m] of the ray between S and P is defined by:



```{math}
:label: eq.defOPL
\boxed{\begin{align*}
\text{OPL} = \int_0^{s_P} n(\mathbf{r}(s)) \mathrm{d}s,
\end{align*}}
```

So the OPL is the distance weighted by the refractive index. 

```{note}
Fermat's principle is thus equivalent to the statement that a ray follows the path with shortest OPL.
```



```{figure} Images/Chapter_2/2_02_Theory_of_mirage.jpg
:name: Fig_2_02_Theory_of_mirage
Because the temperature close to the ground is higher, the refractive index is lower there. Therefore the rays bend upwards, creating a mirror image of the tree below the ground. (From Popular Science Monthly Volume 5, Public Domain, [link](https://commons.wikimedia.org/w/index.php?curid=10770493)).
```

**Remark.**
Actually, Fermat's principle as formulated above is not complete. There are circumstances that a ray can take two paths between two points that have different travel times. Each of these paths then corresponds to a minimum travel time compared to nearby paths, so the travel time is in general a *local minimum*. An example is the reflection by a mirror discussed in the following section.

## Some Consequences of Fermat's Principle
- **Homogeneous matter**

In homogeneous matter, the refractive index is constant and therefore paths of shortest OPL are straight lines. Hence in homogeneous matter rays are straight lines.
- **Inhomogeneous matter**

When the refractive index is a function of position such as air with a temperature gradient, the rays bend towards regions of higher refractive index. In the case of {numref}`Fig_2_02_Theory_of_mirage` for example, the ray from the top of the tree to the eye of the observer passes on a warm day close to the ground because there the temperature is higher and hence the refractive index is smaller. Although the curved path is longer than the straight path, the total travel time of the light is less because near the ground the light speed is higher (since the refractive index is smaller). The observer gets the impression that the tree is upside down under the ground.

- **Law of reflection**


Consider the mirror shown in {numref}`Fig_2_03_Descartes_Reflection`. Since the medium above th mirror is homogeneous, a ray from point $P$ can end up in $Q$ in two ways: by going along a straight line directly from $P$ to $Q$ or alternatively by straight lines via the mirror. Both possibilities have different path lengths and hence different travel times, and hence both are local minima mentioned at the end of the previous section. We consider here the path by means of reflection by the mirror.
Let the $x$-axis be the intersection of the mirror and the plane through the points $P$ and $Q$ and perpendicular to the mirror. Let the $y$-axis be normal to the mirror. Let $(x_P, y_P)$ and $(x_Q,y_Q)$ be the coordinates of $P$ and $Q$, respectively. If $(x,0)$ is the point where a ray from $P$ to $Q$ hits the mirror, the travel time of that ray is

```{math}
:label: eq.mirror1
\begin{align*}
\frac{n}{c}d_1(x) + \frac{n}{c}d_2(x) = \frac{n}{c}\sqrt{ (x-x_P)^2 + y_P^2} +\frac{n}{c} \sqrt{ (x_Q-x)^2 + y_Q^2},
\end{align*}
```
where $n$ is the refractive index of the medium in $y>0$. According to Fermat's Principle, the point $(x,0)$ should be such that the travel time is minimum, i.e.

```{math}
:label: eq.mirror2
\begin{align*}
\frac{d }{d x} [d_1(x) + d_2(x)] = \frac{(x-x_P)}{d_1(x)} - \frac{(x_Q-x)}{d_2(x)} =0.
\end{align*}
```
Hence

```{math}
:label: eq.mirror3
\begin{align*}
\sin \theta_i = \sin \theta_r,
\end{align*}
```
or

```{math}
:label: eq.mirror4
\begin{align*}
\theta_r = \theta_i.
\end{align*}
```
where $\theta_i$ and $\theta_r$ are the angles of incidence and reflection as shown in {numref}`Fig_2_03_Descartes_Reflection`.


```{figure} Images/Chapter_2/2_03_Descartes_Reflection.png
:name: Fig_2_03_Descartes_Reflection
Ray from $P$ to $Q$ via the mirror.
```


- **Snell's law of refraction**


Next, we consider refraction at an interface. Let $y=0$ be the interface between a medium with refractive index $n_i$ in $y>0$ and a medium with refractive index $n_t$ in $y<0$. We use the same coordinate system as in the case of reflection above. Let $(x_P,y_P)$ and $(x_Q,y_Q)$ with $y_P>0$ and $y_Q<0$ be the coordinates of two points $P$ and $Q$ are shown in {numref}`Fig_2_04_Descartes_Refraction`. What path will a ray follow that goes from $P$ to $Q$? Since the refractive index is constant in both half spaces, the ray is a straight line in both media. Let $(x,0)$ be the coordinate of the intersection point of the ray with the interface. Then the travel time is

```{math}
:label: eq.refrac1
\begin{align*}
\frac{n_i}{c} d_1(x) + \frac{n_t}{c} d_2(x) = \frac{n_i}{c} \sqrt{(x-x_P)^2 + y_P^2} +
\frac{n_t}{c} \sqrt{(x_Q-x)^2 + y_Q^2}.
\end{align*}
```
The travel time must be minimum, hence there must hold

```{math}
:label: eq.refrac2
\begin{align*}
\frac{d}{d x} \left[ n_i d_1(x) + n_t d_2(x)\right] = n_i \frac{(x-x_P)}{d_1(x)} - n_t \frac{(x_Q-x)}{d_2(x)}=0.
\end{align*}
```
where the travel time has been multiplied by the speed of light in vacuum. Eq. {eq}`eq.refrac2` implies

```{math}
:label: eq.refrac3
\begin{align*}
n_i \sin \theta_i = n_t \sin \theta_t,
\end{align*}
```
where $\theta_i$ and $\theta_t$ are the angles between the ray and the normal to the surface in the upper half space and the lower half space, respectively ({numref}`Fig_2_04_Descartes_Refraction`).

```{figure} Images/Chapter_2/2_04_Descartes_Refraction.png
:name: Fig_2_04_Descartes_Refraction
Ray from $P$ to $Q$ refracted by an interface.
```

+++

Hence we have derived the law of reflection and Snell's law from Fermat's principle. In {ref}`chapter.basics` the reflection law and Snell's law have been derived by a different method, namely from the continuity of the tangential electromagnetic field components at the interface.

## Perfect Imaging by Conic Sections
In this section, the conic sections ellipse, hyperbole and parabola are important. In {numref}`Fig_2_05_ConicSection` their definitions are shown as a quick reminder<sup>[^3]: Properties of thin lenses and optical systems.</sup>.

```{figure} Images/Chapter_2/2_05a_ConicSection.png
```
```{figure} Images/Chapter_2/2_05b_ConicSection.png
:name: Fig_2_05_ConicSection
Overview of conic sections. The lower figure shows a definition that unifies the three definitions in the figure above by introducing a parameter called the eccentricity $e$. The point $F$ is the focus and the line $e=\infty$ is the directrix of the conic sections.
```

We start with explaining what in geometrical optics is meant by **perfect imaging**.
Let $S$ be a point source. The rays perpendicular to the spherical wave fronts emitted by $S$ radially fan out from $S$. Due to objects such as lenses etc. the spherical wave fronts are deformed and the direction of the ray are made to deviate from the radial propagation direction.
When there is a point $P$ and a cone of rays coming from point $S$ and all rays in that cone intersect in point $P$, then by Fermat's principle, all these rays have traversed paths of minimum travel time. In particular, their travel times are equal and therefore they **all add up in phase** when they arrive in $P$. Hence at $P$ there is a high light intensity. Hence, if there is a cone of rays from point $S$ which all intersect in a point $P$ as shown in {numref}`Fig_2_06_Perfect_Imaging`, point $P$ is called the **perfect image** of $S$.
By reversing the direction of the rays, $S$ is similarly a perfect image of $P$. The optical system in which this happens is called **stigmatic for the two points $S$ and $P$**. 


```{figure} Images/Chapter_2/2_06_Perfect_Imaging.png
:name: Fig_2_06_Perfect_Imaging
Perfect imaging: a cone of rays which diverge from $S$ and all intersect in point $P$. The rays continue after $P$.
```


**Remark**. The concept of a perfect image point exists only in geometrical optics. In reality finite apertures of lenses and other imaging systems cause diffraction due to which image points are never perfect but blurred.

We summarize the main examples of stigmatic systems.

**1.**
**Perfect focusing and imaging by refraction.** A parallel bundle of rays propagating in a medium with refractive index $n_2$ can be focused into a point $F$ in a medium $n_1$. If $n_2>n_1$, the interface between the media should be a hyperbole with focus $F$, whereas if $n_2<n_1$ the interface should be an ellipse with focus $F$ (see {numref}`Fig_2_07_Focus-Right` and
{numref}`Fig_2_08_Perfect_Imaging`). By reversing the rays we obtain perfect collimation. Therefore, a point $S$ in air can be perfectly imaged onto a point $F$ in air by inserting a piece of glass in between them with hyperbolic surfaces as shown in {numref}`Fig_2_08_Perfect_Imaging`. These properties are derived in Problem 2.2.

**2.** 
**Perfect focusing of parallel rays by a mirror**. 
A bundle of parallel rays in air can be focused into a point $F$ by a mirror of parabolic shape with $F$ as focus (see {numref}`Fig_2_09_Para_Mirror`). This is derived in Problem 2.3.
By reversing the arrows, we get (within geometrical optics) a perfectly parallel beam.
Parabolic mirrors are used everywhere, from automobile headlights to radio telescopes.



**Remark.** 

Although we found that conic surfaces give perfect imaging for a certain pair of points, other points do *not* have perfect images in the sense that for a certain cone of rays, all rays are refracted (or reflected) to the same point.






```{admonition} External sources in recommended order
- [KhanAcademy - Geometrical Optics](https://www.khanacademy.org/science/physics/geometric-optics): Playlist on elementary geometrical optics.
- [Yale Courses - 16. Ray or Geometrical Optics I](https://www.youtube.com/watch?v=bxGgcgSbQBA) - Lecture by Ramamurti Shankar
- [Yale Courses - 17. Ray or Geometrical Optics II](https://www.youtube.com/watch?v=qm4QR_ycRhY) - Lecture by Ramamurti Shankar
```

## Gaussian Geometrical Optics
We have seen that, although by using lenses or mirrors which have surfaces that are conic sections we can perfectly image a certain pair of points, for other points the image is not perfect. The imperfections are caused by rays that make larger angles with the **optical axis**, i.e. with the symmetry axis of the system. Rays for which these angles are small are called **paraxial rays**.
Because for paraxial rays the angles of incidence and transmission at the surfaces of the lenses are small,
the sine of the angles in Snell's Law are replaced by the angles themselves:

```{math}
:label: eq.Snell3
\begin{align*}
n_i \theta_i = n_t \theta_t \quad \text{(paraxial rays only)}.
\end{align*}
```
This approximation greatly simplifies the calculations. When only paraxial rays are considered, one may replace any surface by a sphere with the same curvature at its vertex. Errors caused by replacing a surface by a sphere are of second order in the angles the ray makes with the optical axis and hence are insignificant for paraxial rays.
Spherical surfaces are not only more simple in the derivations but they are also much easier to manufacture. Hence in the optical industry spherical surfaces are used a lot. To reduce imaging errors caused by non-paraxial rays one applies two strategies: 1. adding more spherical surfaces; 2 replacing one of the spherical surfaces (typically the last before image space) by a non-sphere.


```{note}
In Gaussian geometrical optics only paraxial rays and spherical surfaces are considered. In Gaussian geometrical optics every point has a perfect image.
```


```{index} Gaussian Imaging by a Single Spherical Surface
:name: section.Gaussian_SSS
```
### Gaussian Imaging by a Single Spherical Surface

We will first show that within Gaussian optics a single spherical surface between two media with refractive indices $n_1< n_2$ images all points perfectly ({numref}`Fig_2_10_Spherical_interface`). The sphere has radius $R$ and center $C$ which is inside medium 2. We consider a point object $S$ to the left of the surface. We draw a ray from $S$ perpendicular to the surface. The point of intersection is $V$. Since for this ray the angle of incidence with the local normal on the surface vanishes, the ray continues into the second medium without refraction and passes through the center $C$ of the sphere. Next we draw a ray that hits the spherical surface in some point $A$ and draw the refracted ray in medium 2 using Snell's law in the paraxial form {eq}`eq.Snell3`. Note that the angles of incidence and transmission must be measured with respect to the local normal at $A$, i.e. with respect to $CA$. We assume that this ray intersects the first ray in point $P$. We will show that within the approximation of Gaussian geometrical optics, all rays from $S$ pass through $P$.
Furthermore, with respect to a coordinate system $(y,z)$ with origin at $V$, the $z$-axis pointing from $V$ to $C$ and the $y$-axis positive upwards as shown in {numref}`Fig_2_10_Spherical_interface`, we have:

```{math}
:label: eq.one_surface
\begin{align*}
-\frac{n_1}{s_o } + \frac{n_2}{s_i} = {\cal P},
\end{align*}
```
where

$$
{\cal P} = \frac{n_2-n_1}{R},
$$ (eq.power)

is called the power of the surface and where $s_o$ and $s_i$ are the $z$-**coordinates** of $S$ and $P$, respectively, hence $s_0<0$ and $s_i>0$ in {numref}`Fig_2_10_Spherical_interface`.

```{figure} Images/Chapter_2/2_10_Spherical_interface.png
:name: Fig_2_10_Spherical_interface
Imaging by a spherical interface between two media with refractive indices $n_2>n_1$.
```





*Proof*. 

It suffices to show that $P$ is independent of the ray, i.e. of $A$. We will do this by expressing $s_i$ into $s_o$ and showing that the result is independent of $A$. Let $\alpha_1$ and $\alpha_2$ be the angles of the rays $SA$ and $AP$ with the $z$-axis as shown in {numref}`Fig_2_10_Spherical_interface`.
Let $\theta_i$ be the angle of incidence of ray $SA$ with the local normal $CA$ on the surface and $\theta_t$ be the angle of refraction. By considering the angles in triangle $\Delta \text{SCA}$ we find


```{math}
:label: eq.alpha1
\begin{align*}
\theta_i = \alpha_1 + \varphi.
\end{align*}
```
Similarly, from $\Delta \,\text{CPA}$ we find

```{math}
:label: eq.lpha2
\begin{align*}
\theta_t=-\alpha_2 + \varphi.
\end{align*}
```
By substitution into the paraxial version of Snell's Law {eq}`eq.Snell3`, we obtain

```{math}
:label: eq.n1al1n2al2
\begin{align*}
n_1 \alpha_1 + n_2 \alpha_2 = (n_2-n_1)
\varphi.
\end{align*}
```
Let $y_A$ and $z_A$ be the coordinates of point $A$. Since $s_o<0$ and $s_i>0$ we have

```{math}
:label: eq.alpha
\begin{align*}
\alpha_1 \approx \tan(\alpha_1) = \frac{y_A}{z_A-s_o}, \;\; \;\; \alpha_2\approx \tan(\alpha_2)= \frac{y_A}{s_i-z_A}.
\end{align*}
```
Furthermore,

```{math}
:label: eq.varphi
\begin{align*}
\varphi \approx \sin \varphi \approx \frac{y_A}{R}.
\end{align*}
```
which is small for paraxial rays.
Hence,

```{math}
:label: eq.xA
\begin{align*}
z_A=R-R\cos\varphi = R - R\left(1-\frac{\varphi^2}{2}\right)= \frac{R}{2}\varphi^2 \approx 0,
\end{align*}
```
because it is second order in $y_A$ and therefore is neglected in the paraxial approximation. Then, {eq}`eq.alpha`
becomes

```{math}
:label: eq.alpha22
\begin{align*}
\alpha_1 = -\frac{y_A}{s_o}, \quad \alpha_2 =\frac{y_A}{s_i}.
\end{align*}
```
By substituting {eq}`eq.alpha22` and {eq}`eq.varphi` into {eq}`eq.n1al1n2al2` we find

```{math}
\begin{align*}
-\frac{n_1}{s_o} y_A + \frac{n_2}{z_i} y_A = \frac{n_2-n_1}{R} y_A,
\end{align*}
```
or

```{math}
\begin{align*}
-\frac{n_1}{s_o } + \frac{n_2}{s_i} = \frac{n_2-n_1}{R},
\end{align*}
```
which is {eq}`eq.one_surface`.
It implies that $s_i$, and hence $P$, is independent of $y_A$, i.e. of the ray chosen.
Therefore, $P$ is a perfect image within the approximation of Gaussian geometrical optics.



When
$s_o \rightarrow -\infty$, the incident rays are parallel to the $z$-axis in medium 1 and the corresponding image point $F_i$ is called the **second focal point** or **image focal point**.
Its $z$-coordinate is given by:



```{math}
:label: eq.def_fi
\boxed{\begin{align*}
	f_i = \frac{n_2}{{\cal P}}=\frac{n_2 R}{n_2-n_1},
	\end{align*}}
```

and its absolute value (it is negative when $n_2<n_1$) is called the **second focal length** or **image focal length**.
When $s_i\rightarrow \infty$, the rays after refraction are parallel to the $z$-axis and we get $s_o \rightarrow -n_1 R/(n_2-n_1)$. The object point for which the rays in the medium 2 are parallel to the $z$-axis is called the **first focal point** or **object focal point** $F_o$. Its $z$-coordinate is:


```{math}
:label: eq.def_fo
\boxed{\begin{align*}
f_o=-\frac{n_1}{{\cal P}}= -\frac{n_1 R}{n_2-n_1}.
\end{align*}}
```

The absolute value $|f_o|$ of $f_o$ is called the **front focal length** or **object focal length**.

With {eq}`eq.def_fi` and {eq}`eq.def_fo`, {eq}`eq.one_surface` can be rewritten as:


```{math}
:label: eq.one_surface2
\boxed{\begin{align*}
-\frac{n_1}{s_o} + \frac{n_2}{s_i} = {\cal P} =-\frac{n_2}{f_i}= -\frac{n_1}{f_o}.
\end{align*}}
```


```{index} Virtual Images and Virtual Objects of a Single Spherical Surface
:name: subsection.virtualSSS
```
### Virtual Images and Virtual Objects of a Single Spherical Surface

If we adopt the sign convention listed in
{numref}`table_signconv` below,
it turns out that {eq}`eq.one_surface` holds generally. So far we have considered a convex surface of which the center $C$ is to the right of the surface, but {eq}`eq.one_surface` applies also to a concave surface of which the center is to the left of the surface, provided that the radius $R$ is chosen negative.
The convention for the sign of the radius is illustrated in {numref}`Fig_2_11_Radius`.

```{figure} Images/Chapter_2/2_11_Radius_Convention.png
:name: Fig_2_11_Radius
Sign convention for the radius $R$ of a spherical surface
```


If the power ${\cal P}$ given by {eq}`eq.power` is positive, then the surface makes bundles of incident rays convergent or less divergent.
If the power is negative, incident bundles are made divergent or less convergent. The power of the surface can be negative because of two reasons:
1) $R$>0 and $n_1>n_2$, or
2) $R$<0 and $n_1<n_2$, but the effect of the two cases is the same.
For any object to the left of the surface: $s_o<0$, {eq}`eq.one_surface2` and a negative power imply that $s_i<0$, which suggests that the image is to the left of the surface. Indeed, in both Figs.
the diverging ray bundle emitted by S is made more strongly divergent by the surface. By extending these rays in image space back to object space (without refraction at the surface), they are seen to intersect in a point $P$ to the left of the surface. This implies that for an observer at the right of the surface it looks as if the diverging rays in image space are emitted by $P$. Because there is no actual concentration of light intensity at $P$, it is called a **virtual image**, in contrast with the **real images** that occur to the right of the surface and where there is an actual concentration of light energy. We have in this case $f_o>0$ and $f_<0$, which means that the object and image focal points are to the right and left, respectively, of the surface.

Note that also when the power is positive, a virtual image can occur, namely when the object $S$ is in between the object focal point $F_o$ and the surface. Then the bundle of rays from S is so strongly diverging that the surface can not convert it into a convergent bundle and hence again the rays in image space seem to come from a point $P$ to the left of the surface. This agrees with the fact that when ${\cal P}>0$ and $f_o< s_o<0$,
{eq}`eq.one_surface2` implies that $s_i<0$.


```{figure} Images/Chapter_2/2_12_Concave_Surface_Real_object_1.png
:name: Fig_2_12_Surf_Concave
Imaging by a concave surface ($R<0$) with $n_2>n_1$. All image points are to the left of the surface, i.e. are virtual ($s_i<0$).
```


Finally we look at a case that there is a bundle of convergent rays incident from the left on the surface which when extended into the right medium without refraction at the surface, would intersect in a point $S$. Since this point is not actually present, it is called a **virtual object point**, in contrast to **real object points** which are to the left of the surface. The coordinate of a virtual object point is positive: $s_o>0$.
One may wonder why we look at this case. The reason is that if we have several spherical surfaces behind each other, we can compute the image of an object point by first determining the intermediate image by the most left surface and then use this intermediate image as the object for the next surface and so on. In such a case, it can easily happen that an intermediate image is to the right of the next surface and hence is a virtual object for that surface. In the case of {numref}`Fig_2_13_Convex_Virtual_Object` at the left, the power is positive, hence the convergent bundle of incident rays is made even more convergent which leads to a real image point. Indeed when $s_o>0$ and ${\cal P}>0$ then {eq}`eq.one_surface` implies that always $s_i>0$. At the right of {numref}`Fig_2_13_Convex_Virtual_Object` the power is negative but is not sufficiently strong to turn the convergent incident bundle into a divergent bundle. So the image is still real. However, the image will be virtual when the virtual object $S$ is to the right of $F_o$ (which in this case is to the right of the surface) since then the bundle of rays converges so weakly that the surface turns is into a divergent bundle.


```{figure} Images/Chapter_2/2_13_Spherical_Interface_Concave.png
:name: Fig_2_13_Convex_Virtual_Object
Imaging of a virtual object $S$ by a spherical interface with $R>0$ between two media with refractive indices $n_1>n_2$ (left) and $n_2>n_1$ (right).
```


In conclusion: provided the sign convention listed in {numref}`table_signconv` is used, formula {eq}`eq.one_surface`
can always be used to determine the image of a given object by a spherical surface.

```{table} Sign convention for spherical surfaces and thin lenses. The convention for $s_o$, $f_o$, $s_i$, $f_i$ follows from the fact that these are $z$-coordinates with the origin at vertex $V$ of the spherical surface (or the center of the thin lens) and the positive $z$-axis is pointing to the right. The convention for the $y$-coordinate follows from the fact that the $y$-axis is positive upwards.
:name: table_signconv
| **quantity** | **positive** | **negative** |
| :--: | :--: | :--: |
| $s_o$, $s_i$. $f_0$, $f_i$ | corresponding point is to the right of vertex | corresponding point is to left of vertex |
| $y_o$, $y_i$ | object, image point above optical axis | object, image point below optical axis |
| $R$ | center of curvature right of vertex | center of curvature left of vertex |
| Refractive index $n$ ambient medium of a mirror | before reflection | after reflection |
```



### Ray Vectors and Ray Matrices
Now that we know that within Gaussian geometrical optics a single spherical surface images every object point to a perfect, real or virtual, image point it is easy to see that any row of spherical surfaces separated by homogeneous materials will also image any point perfectly. We first determine the intermediate image of the object point under the most left spherical surface as if the other surfaces are not present and use this intermediate image point as object point for imaging by the next spherical surface and so on. Of course, the intermediate image and object points can be virtual.

Although this procedure is in principle simple, it is nevertheless convenient in Gaussian geometrical optics to introduce the concept of ray vectors and ray matrices to deal with optical system consisting of several spherical surfaces.
With ray matrices it is easy to derive how the distance of a given ray to the optical axis and its direction change during propagation through an optical system. This in turn can be used to determine the image plane in an optical system for a given object plane.

In any plane perpendicular to the $z$-axis, a ray is determined by the $y$-coordinate of the point of intersection of the ray with the plane and the angle $\alpha$ with the optical ($z$)-axis. This angle has a sign and is defined as follows. Let $(y_1,z_1)$ and $(y_2,z_2)$ be the coordinates of two points on the ray and let the light propagate from point 1 to point 2. Then we define

$$
\alpha = \frac{ y_2-y_1}{z_2-z_1}.
$$ (eq.defalpha)

Examples of positive and negative $\alpha$ are given in {numref}`Fig.alpha`. The case $z_2-z_1<0$ occurs when a ray propagates in the negative $z$-direction after it has been reflected by a mirror.
According to {numref}`table_signconv` the refractive index of the ambient medium should after the reflection be taken negative. After a second reflection due to which the ray propagates again in the positive $z$-direction the refractive index should be chosen positive again.

```{figure} Images/Chapter_2/2_14_Angle_definition.png
:name: Fig.alpha
Sign convention for the ray angle. In the upper two figures $\alpha>0$ while in the lower two figures $\alpha<0$.
```


We define the ray vector

```{math}
:label: eq.rayvector
\begin{align*}
\left( \begin{array}{c}n\alpha \\y
\end{array} \right),
\end{align*}
```
where $n$ is the local refractive index. The definition with the refractive index as factor in the first element of the ray vector turns out to be convenient.
The ray vectors of a ray in any two planes $z=z_1$, $z=z_2$, with $z_2>z_1$, are related by a so-called ray matrix:

```{math}
:label: eq.matgen
\begin{align*}
\left( \begin{array}{c}n_2\alpha_2 \\y_2
\end{array}\right) = {\cal M}
\left( \begin{array}{c}n_1 \alpha_1 \\y_1
\end{array}\right).
\end{align*}
```
where

```{math}
:label: eq.defM2
\begin{align*}
{\cal M} =\left( \begin{array}{cc}A & B \\C & D
\end{array}\right).
\end{align*}
```
The elements of matrix ${\cal M}$ depend on the optical components and materials between the planes $z=z_1$ and $z=z_2$.

As an example consider the ray matrix that relates a ray vector in the plane immediately before the spherical surface in {numref}`Fig_2_10_Spherical_interface` to the corresponding ray vector in the plane immediately behind that surface.
Using {eq}`eq.n1al1n2al2` and {eq}`eq.varphi` it follows

```{math}
:label: eq.alphas
\begin{align*}
n_1 \alpha_1 - n_2 \alpha_2 = \frac{(n_2-n_1)y_1}{R},
\end{align*}
```
where we have replaced $\alpha_2$ by $-\alpha_2$ in {eq}`eq.n1al1n2al2`, because according to the sign convention, the angle $\alpha_2$ in {numref}`Fig_2_10_Spherical_interface` should be taken negative.
Because furthermore $y_2=y_1$, we conclude
    
```{math}
:label: eq.matsph0
\begin{align*}
\left( \begin{array}{c}n_2\alpha_2 \\    y_2
\end{array}\right) &= \left( \begin{array}{c}n_1 \alpha_1 - \frac{(n_2-n_1)y_1}{R} \\    y_1
\end{array}\right)  \\
    &= \left( \begin{array}{cc}1 & -P \\    0 & 1
\end{array}\right)\left(
    \begin{array}{c}n_1 \alpha_1 \\    y_1
\end{array}\right), \quad \textbf{spherical surface,}
\end{align*}
```
where

```{math}
:label: eq.defP
\begin{align*}
{\cal P}= \frac{n_2-n_1}{R},
\end{align*}
```
is as before the **power** of the surface.

Next we consider a spherical mirror with radius of curvature $R$.
We will show that the ray matrix between the planes just before and after the mirror is given by:

```{math}
:label: eq.sphmirror
\begin{align*}
\left( \begin{array}{c}n_2\alpha_2 \\y_2
\end{array}\right)
&= \left( \begin{array}{cc}1 & -{\cal P} \\0 & 1
\end{array}\right)\left(
\begin{array}{c}n_1 \alpha_1 \\y_1
\end{array}\right), \quad \textbf{spherical reflector,}
\end{align*}
```
where

```{math}
:label: eq.defPrefl
\begin{align*}
{\cal P}= \frac{2n}{R},
\end{align*}
```
is the power of the mirror, $n_1=n$ but $n_2=-n$, because the convention is used that if a ray propagates from **right to left** (i.e. in the negative $z$-direction), the refractive index in the ray vectors and ray matrices is chosen **negative**. Note that when the mirror is flat: $R=\infty$, the ray matrix of the reflector implies

```{math}
\begin{align*}
n_2\alpha_2 = n_1 \alpha_1,
\end{align*}
```
which agrees with the fact that $n_2=-n_1$ and according to  {eq}`eq.defalpha` $\alpha_2$ and $\alpha_1$ have opposite sign for a mirror.

```{figure} Images/Chapter_2/2_15_Concave_mirror.png
:name: Fig_2_15_Mirror
Reflection by a mirror.
```


With all angles positive for the moment, it follows from {numref}`Fig_2_15_Mirror`

```{math}
:label: eq.refl1
\begin{align*}
\alpha_1&= \theta_i +\varphi, \end{align*}
```
```{math}
:label: eq.refl2
\begin{align*}
\\
\alpha_2 &= \varphi-\theta_r= \varphi-\theta_i.\end{align*}
```
Hence,

```{math}
:label: eq.refl3
\begin{align*}
\alpha_2= -\alpha_1 + 2\varphi.
\end{align*}
```
Now

$$
\varphi\approx \frac{y_1}{R}
$$ (eq.varphi3)

In the situation drawn in {numref}`Fig_2_15_Mirror`,
{eq}`eq.defalpha` implies that both $\alpha_2$ and $\alpha _1$ are positive. By choosing the refractive index negative after reflection,
we conclude from {eq}`eq.refl3` and {eq}`eq.varphi3`:

```{math}
:label: eq.n2alpha2
\begin{align*}
n_2\alpha_2 = -n \alpha_2 = n \alpha_1 - \frac{2n}{R} y_1 = n_1\alpha_1 - \frac{2n}{R}.
\end{align*}
```
This proves Eq. {eq}`eq.sphmirror`.


We now consider the ray matrix when a ray propagates from a plane $z_1$ to a plane $z_2$ through a medium with refractive index $n$.
In that case we have
$\alpha_2=\alpha_1$ and $y_2=y_1 + \alpha_1(z_2-z_1)$, hence

```{math}
:label: eq.mathom
\begin{align*}
{\cal M}=\left( \begin{array}{cc}1 & 0 \\\frac{z_2-z_1}{n} & 1
\end{array}\right), \quad \textbf{homogeneous space}.
\end{align*}
```
Note that if the light propagates from the left to the right: $z_2>z_1$ and hence $z_2-z_1$ in the first column and second row of the matrix is positive, i.e. it is the distance between the planes.

For two planes between which there are a number of optical components, possibly separated by regions with homogeneous material (e.g. air), the ray matrix can be obtained by multiplying the matrices of the individual components and of the homogeneous regions. The order of the multiplication of the matrices is such that the **right-most matrix corresponds to the first component that is encountered while propagating**, and so on.

In the ray matrix approach all rays stay in the same plane, namely the plane through the ray and the $z$-axis. These rays are called **meridional rays**. By considering only meridional rays, the imaging by optical systems is restricted to two dimensions. Non-meridional rays are called **skew rays**. Skew rays do not pass through the optical axis and are not considered in the paraxial theory.

**Remarks**. 

1. In matrix {eq}`eq.mathom` $z_1$ and $z_2$ are **coordinates**, i.e. they have a sign. 

2. Instead of choosing the refractive index negative in ray vectors of rays that propagate from right to left, one can reverse the direction of the positive $z$-axis after every reflection. The convention to make the refractive index negative is however more convenient in ray tracing software. 

3. The determinant of the ray matrices {eq}`eq.matsph0`, {eq}`eq.sphmirror` and
{eq}`eq.mathom` are all 1. Since all ray matrices considered below are products of these elementary matrices, the determinant of every ray matrix considered is unity.

### The Lens Matrix
We apply ray matrices to a lens.
{numref}`Fig_2_16_Spherical_Lens_simplified` shows a lens with two spherical surfaces. The refractive index of the lens is $n_l$ and that of the media to the left and to the right of the lens is $n_1$ and $n_2$, respectively. Let the distance between the vertices be $d$.

```{figure} Images/Chapter_2/2_16_Spherical_Lens_simplified.png
:name: Fig_2_16_Spherical_Lens_simplified
A lens with thickness $d$. The ray matrix is defined between the planes immediately before and after the lens.
```

```{code-cell}
:tags: [remove-input]

%%HTML

<!DOCTYPE html>
<html>
<head>
<meta name=viewport content="width=device-width,initial-scale=1">
<meta charset="utf-8"/>
<script src="https://cdn.geogebra.org/apps/deployggb.js"></script>

</head>
<body>
<div id="ggbApplet"></div>

<script>
var parameters = {
"id": "ggbApplet",
"width":"100%",
// "height":695,
"showMenuBar":false,
"showAlgebraInput":false,
"showToolBar":false,
"customToolBar":"0 39 59 || 1 501 67 , 5 19 , 72 | 2 15 45 , 18 65 , 7 37 | 4 3 8 9 , 13 44 , 58 , 47 || 16 51 64 , 70 | 10 34 53 11 , 24  20 22 , 21 23 | 55 56 57 , 12 || 36 46 , 38 49 50 , 71 | 30 29 54 32 31 33 | 17 26 62 , 14 66 68 | 25 52 60 61 || 40 41 42 , 27 28 35 , 6",
"showToolBarHelp":false,
"showResetIcon":false,
"enableLabelDrags":false,
"enableShiftDragZoom":false,
"enableRightClick":false,
"errorDialogsActive":false,
"useBrowserForJS":false,
"allowStyleBar":false,
"preventFocus":false,
"showZoomButtons":false,
"capturingThreshold":3,
// add code here to run when the applet starts
"appletOnLoad":function(api){ /* api.evalCommand('Segment((1,2),(3,4))');*/ },
"showFullscreenButton":false,
"scale":0.428,
"disableAutoScale":false,
"allowUpscale":false,
"clickToLoad":false,
"appName":"classic",
"buttonRounding":0.7,
"buttonShadows":false,
"language":"en-GB",
// use this instead of ggbBase64 to load a material from geogebra.org
// "material_id":"RHYH3UQ8",
// use this instead of ggbBase64 to load a .ggb file
// "filename":"myfile.ggb",
"ggbBase64":"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",
};
// is3D=is 3D applet using 3D view, AV=Algebra View, SV=Spreadsheet View, CV=CAS View, EV2=Graphics View 2, CP=Construction Protocol, PC=Probability Calculator DA=Data Analysis, FI=Function Inspector, macro=Macros
var views = {'is3D': 0,'AV': 0,'SV': 0,'CV': 0,'EV2': 0,'CP': 0,'PC': 0,'DA': 0,'FI': 0,'macro': 0};
var applet = new GGBApplet(parameters, '5.0', views);
window.onload = function() {applet.inject('ggbApplet')};
applet.setPreviewImage('data:image/gif;base64,R0lGODlhAQABAAAAADs=','https://www.geogebra.org/images/GeoGebra_loading.png','https://www.geogebra.org/images/applet_play.png');
</script>
</body>
</html>
```

We will first derive the matrix which maps the ray vector in the plane **immediately in front** of the lens to that in the plane **immediately behind** the lens. Let

```{math}
:label: eq.rayvectors
\begin{align*}
\left( \begin{array}{c}n_1 \alpha_1 \\y_1
\end{array}\right)
\;\;\; \text{ and }
\left( \begin{array}{c}n_2 \alpha_2 \\y_2
\end{array}\right)
\end{align*}
```
be two vectors in the two planes which correspond to the same ray. The ray is first refracted by the spherical surface with radius $R_1$ and center $C_1$. Using {eq}`eq.matsph0` and {eq}`eq.defP` it follows that the matrix between the ray vectors just before and just behind the spherical surface with radius $R_1$ and center $C_1$ is given by

```{math}
:label: eq.matsph1
\begin{align*}
{\cal M}_1= \left( \begin{array}{cc}1 & - {\cal P}_1 \\0 & 1
\end{array}\right)
\end{align*}
```
,
where

$$
{\cal P}_1 = \frac{n_l-n_1}{R_1}.
$$ (eq.defP1)

The ray propagates then over the distance $d$ through the material of which the lens is made. The matrix that maps ray vectors from the plane inside the lens immediately behind the left spherical surface to a ray vector in the plane immediately before the right spherical surface follows from {eq}`eq.mathom`:

```{math}
:label: eq.matglass
\begin{align*}
{\cal M}_2=\left( \begin{array}{cc}1 & 0 \\\frac{d}{n_l} & 1
\end{array}\right).
\end{align*}
```
Finally, the matrix that maps ray vectors from the plane in the lens immediately before the second spherical surface to vectors in the plane immediately behind it is

```{math}
:label: eq.matsph2
\begin{align*}
{\cal M}_3= \left( \begin{array}{cc}1 & -{\cal P}_2 \\0 & 1
\end{array}\right).
\end{align*}
```
with

$$
{\cal P}_2 = \frac{n_2-n_l}{R_2}.
$$ (eq.defP2)

Hence the matrix that maps ray vectors in the plane immediately before the lens to ray vectors in the plane immediately behind the lens is given by the matrix product:

```{math}
:label: eq.matlens
\begin{align*}
{\cal M}&= {\cal M}_3 {\cal M}_2 {\cal M}_1  \\
&= \left( \begin{array}{cc}1 - \frac{d}{n_l}P_2 & -P_1 - P_2 + \frac{d}{n_l} P_1P_2 \\\frac{d}{n_l} & 1 -\frac{d}{n_l}P_1
\end{array}\right), \quad \textbf{lens}.
\end{align*}
```
The quantity

```{math}
:label: eq.powerlens
\begin{align*}
{\cal P}={\cal P}_1+{\cal P}_2 - \frac{d}{n_l}{\cal P}_1{\cal P}_2
\end{align*}
```
is called the **power** of the lens. It has dimension 1/length and is given in diopter (${\cal D}$), where $1 \,\, {\cal D}=\text{m}^{-1}$. The power can be positive and negative.
The space to the left of the lens is called the **object space** and that to the right of the lens is called the **image space**.

```{index} Focusing with a Thin Lens
:name: subsection.focthin
```
### Focusing with a Thin Lens

For a thin lens the vertices $V_1$ and $V_2$ coincide and $d=0$, hence {eq}`eq.matlens` becomes

```{math}
:label: eq.matthinlens
\begin{align*}
{\cal M} = \left( \begin{array}{cc}1 & -P\\0 & 1
\end{array}\right), \quad \textbf{thin lens},
\end{align*}
```
where

$$
P=P_1+P_2 = \left( \frac{n_l-n_1}{R_1}-\frac{n_2-n_l}{R_2}\right),
$$ (eq.Pthinlens)

The origin of the coordinate system is chosen in the common vertex $V_1=V_2$.

By considering a ray in medium 1 which is parallel to the optical axis ($\alpha_1=0$) and at height $y_1$, we get $n_2 \alpha_2= - Py_1$ and $y_2=y_1$. Hence, when $P>0$, the angle $\alpha_2$ of the ray has sign opposite to $y_2$ and therefore the ray in image space is bent back to the optical axis, yielding a **second focal point** or **image focal point** $F_i$. Its
$z$-coordinate $f_i$ s:

```{math}
:label: eq.thinlensfo
\begin{align*}
f_i = \frac{\alpha_2}{y_2} = \frac{n_2}{{\cal P}}.
\end{align*}
```
For a ray emerging in image space at height $y_2$ and parallel to the optical axis: $\alpha_2=0$, we have $y_1=y_2$ and 
```{math}
\begin{align*}
n_1\alpha_1 = P y_1.
\end{align*}
```
If the power is positive: ${\cal P}>0$, the angle $\alpha_1$ has the same sign as $y_1$, which implies that the ray in object space has intersected the optical axis in a point $F_o$ with $z$-coordinate: $z=f_o$

```{math}
:label: eq.thinlensfi
\begin{align*}
f_o = -\frac{y_1}{\alpha_1} = -\frac{n_1}{{\cal P}}.
\end{align*}
```
The point $F_o$ is called the **first focal point** or **object focal point**.

We conclude that when the power ${\cal P}$ of the lens is positive, $f_i>0$ and $-f_o>0$, which means that the image and object focal points are in the image and object space, respectively, hence they are both real. A lens with positive power is called **convergent** or **positive**. It makes incident bundles of rays convergent or less divergent.

A lens with negative power is called divergent and has $f_i<0$, $-f_o<0$. It makes incident rays more divergent or less convergent.
Incident rays which are parallel to the optical axis are refracted away from the optical axis and seem to come from a point in front of the lens with $z$-coordinate $f_i<0$. Hence the image focal point does not correspond to a location where there is an actual concentration of light intensity, i.e. it is virtual. The object focal point is a virtual object point, because only a bundle of incident rays that are converging to a certain point behind the negative lens can be turned into a bundle of rays parallel to the optical axis.

With the results obtained for the focal coordinates we can rewrite the lens matrix of a thin lens as

```{math}
:label: eq.matthinlens2
\begin{align*}
{\cal M} = \left( \begin{array}{cc}1 & -\frac{n_2}{f_i} \\0 & 1
\end{array}\right), \quad \textbf{thin lens}.
\end{align*}
```


```{index} Imaging with a Thin Lens
:name: subsection.imagingthinlens
```
### Imaging with a Thin Lens

We first consider a general ray matrix {eq}`eq.matgen`, {eq}`eq.defM2` between two planes $z=z_1$ and $z=z_2$ and ask the following question:
what are the properties of the ray matrix such that the two planes are images of each other, or (as this is also called) are each other's conjugate?
Clearly for these planes to be each other's image, we should have that for every point coordinate $y_1$ in the plane $z=z_1$ there is a point with some coordinate $y_2$ in the plane $z=z_2$ such that any ray through $(y_1,z_1)$ (within some cone of rays) will pass through point $(y_2,z_2)$.
Hence for any angle $\alpha_1$ (in some interval of angles) there is an angle $\alpha_2$ such that {eq}`eq.matgen` is valid.
This means that for any $y_1$ there is a $y_2$ such that for all angles $\alpha_1$:

```{math}
:label: eq.eq
\begin{align*}
y_2=C n_1\alpha_1 + D y_1,
\end{align*}
```
This requires that


```{math}
:label: eq.condimage
\boxed{\begin{align*}
C=0, \quad \textbf{condition for imaging}.
\end{align*}}
```

The ratio of $y_2$ and $y_1$ IS the magnification $M$. Hence,

```{math}
:label: eq.magn
\begin{align*}
M=\frac{y_2}{y_1} = D,
\end{align*}
```
is the **magnification** of the image (this quantity has sign).

To determine the image by a thin lens we first derive the ray matrix between two planes $z=z_1<0$ and $z=z_2>0$ on either side of the thin lens. The origin of the coordinate system is again at the vertex of the thin lens.
This ray matrix is the product of the matrix for propagation from $z=z_1$ to the plane immediately in front of the lens, the matrix of the thin lens and the matrix for propagation from the plane immediately behind the lens to the plane $z=z_2$:

```{math}
:label: eq.matz1z2
\begin{align*}
{\cal M} &= \left( \begin{array}{cc}1 & 0 \\\frac{z_2}{n_2} & 1
\end{array}\right) \left( \begin{array}{cc}1 & - {\cal P} \\0 & 1
\end{array}\right) \left( \begin{array}{cc}1 & 0 \\\frac{-z_1}{n_1} & 1
\end{array}\right)  \\
&=
\left( \begin{array}{cc}1+\frac{z_1}{n_1}{\cal P} & -{\cal P} \\-\frac{z_1}{n_1} + \frac{z_2}{n_2} + \frac{z_1z_2}{n_1 n_2}{\cal P} & 1-\frac{z_2}{n_2} {\cal P}
\end{array}\right)
\end{align*}
```
The imaging condition {eq}`eq.condimage` implies:


```{math}
:label: eq.lensmaker
\boxed{\begin{align*}
-\frac{n_1}{s_o} + \frac{n_2}{s_i}={\cal P},
\quad \bf{Lensmaker's \;\; Formula},
\end{align*}}
```
 where we have written $s_o=z_1$ and $s_i=z_2$ for the $z$-coordinates of the object and the image.
Because for the thin lens matrix {eq}`eq.matz1z2`: $D=1-z_2/f_i$, it follows by using {eq}`eq.lensmaker` that the magnification {eq}`eq.magn` is given by

```{math}
:label: eq.Mlens
\begin{align*}
M = \frac{y_i}{y_o}= 1-\frac{s_i}{f_i}= \frac{s_i}{s_o},
\end{align*}
```
where we have written now $y_o$ and $y_i$ instead of $y_1$ and $y_2$, respectively.

**Remark.**
The Lensmaker's formula for imaging by a thin lens can alternatively be derived by using the imaging formula {eq}`eq.one_surface` of the two spherical surfaces of the lens. We first image a given point $S$ by the left spherical surface using {eq}`eq.one_surface` as if the second surface were absent. The obtained intermediate image $P'$ is then imaged by the second spherical surface as if the first surface were absent. $P'$ can be a real or virtual object for the second surface. The derivation is carried out in Problem 2.5.


Analogous to the case of a single spherical surface, an image is called a **real image** if it is to the right of the lens ($s_i>0$) and is called a **virtual image** when it seems to be to the left of the lens ($s_i<0$). An object is called a **real object** if it is to the left of the lens ($s_o<0$) and is a **virtual object** if it seems to be right of the lens ($s_o>0$).
For a positive lens: ${\cal P}>0$ and hence {eq}`eq.lensmaker` implies that $s_i>0$ provided $|s_o|>|f_o|$, which means that the image by a convergent lens is real if the object is further from the lens than the object focal point $F_o$.
The case $s_o>0$ corresponds to a virtual object, i.e. to the case of a converging bundle of incident rays, which for an observer in object space seems to converge to a point at distance $s_o$ behind the lens.
A convergent lens ($f_i>0$) will then make an image between the lens and the second focal point. In contrast, a diverging lens ($f_i<0$) can turn the incident converging bundle into a real image only if the virtual object point is between the lens and the focal point. If the virtual object point has larger distance to the lens, the convergence of the incident bundle is too weak and the diverging lens then refracts this bundle into a diverging bundle of rays which seem to come from a virtual image point in front of the lens ($s_i<0$).

Instead of using ray matrices, one can construct the image with a ruler.
Consider the imaging of a finite object $S_1S_2$ as shown in {numref}`Fig_2_17_Real_Image` for the case that the media to the left and right lens are the same. Let $y_o$ be the y-coordinate of $S_2$. We have $y_o>0$ when the object is above the optical axis.

```{figure} Images/Chapter_2/2_17_Real_Image.png
:name: Fig_2_17_Real_Image
Object and image for a thin lens.
```

Draw the ray through the focal point $F_o$ in object space and the ray through the center $V$ of the lens. The first ray becomes parallel in image space. The latter intersects both surfaces of the lens almost in their (almost coinciding) vertices and therefore the refraction is opposite at both surfaces and the ray exits the lens parallel to its direction of incidence. Furthermore, its lateral displacement can be neglected because the lens is thin. (Of course, this is not correct when the refractive indices to the left and right of the lens are different). Hence, **the ray through the center of a thin lens is not refracted**. The intersection in image space of the two rays gives the location of the image point $P_2$ of $S_2$. The image is real if the intersection occurs in image space and is virtual otherwise.
For the case of a convergent lens with a real object with $y_o>0$ as shown in {numref}`Fig_2_17_Real_Image`, it follows from the similar triangles
$\Delta\,\text{BV}\text{F}_i$ and $\Delta\, \text{P}_2\text{P}_1\text{F}_i$ that

```{math}
:label: eq.ratio1
\begin{align*}
\frac{y_o}{|y_i|} = \frac{f_i}{s_i -f_i},
\end{align*}
```
.
From the similar triangles $\Delta\, \text{S}_2\text{S}_1\text{F}_o$ and $\Delta\, \text{AVF}_o$:

```{math}
:label: eq.ratio2
\begin{align*}
\frac{|y_i|}{y_o}=\frac{f_i}{f_o-s_o}.
\end{align*}
```
here we used $|f_o|=f_i$.
(the absolute value of $y_i$ is taken because according to our sign convention $y_i$ in {numref}`Fig_2_17_Real_Image` is negative whereas {eq}`eq.ratio2` is a ratio of lengths).
By multiplying these two equations we get the **Newtonian form** of the lens equation (valid when $n_2=n_1$):


```{math}
:label: eq.newton
\boxed{\begin{align*}
x_o x_i =- f_i^2=- f_o^2,
\end{align*}}
```

where $x_o$ and $x_i$ are the $z$-coordinates of the object and image relative to those of the first and second focal point, respectively:

```{math}
:label: eq.defxoxi
\begin{align*}
x_o = s_o-f_o, \;\;\; x_i = s_i-f_i.
\end{align*}
```
Hence $x_o$ is negative if the object is to the left of $F_o$ and $x_i$ is positive if the image is to the right of $F_i$.

The **transverse magnification** is

```{math}
:label: eq.defM1
\begin{align*}
M=\frac{y_i}{y_o} = \frac{s_i}{s_o} = -\frac{x_i}{f_i},
\end{align*}
```
where the second identity follows from considering the similar triangles $\Delta \text{P}_2\text{P}_1\text{F}_i$ and $\Delta \text{BVF}_i$ in {numref}`Fig_2_17_Real_Image`.
A positive $M$ means that the image is erect, a negative $M$ means that the image is inverted.

All equations are also valid for a thin negative lens and for virtual objects and images.
Examples of real and virtual object and image points for a positive and a negative lens are shown in {numref}`Fig_2_18_Positive_Lens` and {numref}`Fig_2_19_Negative_Lens`.


```{figure} Images/Chapter_2/2_18_Positive_Lens.png
:name: Fig_2_18_Positive_Lens
Real and virtual objects and images for a convergent thin lens with the same refractive index left and right of the lens, i.e. $-f_o=f_i>0$. In (a) the object is real with $s_o<f_o$ and the image is real as well ($s_i>0$). In (b) the object is between the front focal point and the lens: $f_o< s_o<0$. Then the rays from the object are too divergent for the lens to make them convergent in image space and hence the image is virtual: $s_i<0$. In \(c\) there is a cone of converging rays incident on the lens from the left which, in the absence of the lens, would converge to point $S$ behind the lens. Therefore $S$ is a virtual object ($s_0>0$). The image is real and can be constructed with the two rays shown.
		In (d) $s_i$ is shown as function of $s_o$ for a convergent lens (see Eq. {eq}`eq.lensmaker`).
```



```{figure} Images/Chapter_2/2_19_Negative_Lens.png
:name: Fig_2_19_Negative_Lens
Real and virtual objects and images for a divergent thin lens with the same refractive index to the left and right of the lens, i.e. $-f_o=f_i<0$. In (a) the object is real, i.e. $s_o<0$. The diverging lens makes the cone of rays from the object more divergent so that the image is virtual: $s_i<0$. When the object is virtual, there is a cone of converging rays incident from the left which after extension to the right of the lens (as if the lens is not present) intersect in the virtual object S ($s_o>0$). It depends on how strong the convergence is whether the diverging lens turns this cone into converging rays or whether the rays keep diverging. In (b) $0<s_o<-f_i$, and the image is real. In c) $s_o>-f_i$ and the image is virtual ($s_i<0$). In (d) $s_i$ is shown as function of $s_o$ for a divergent lens ($f_i<0$ (see Eq. {eq}`eq.lensmaker`).
```


```{index} Two Thin Lenses
:name: subsection.twolenses
```
### Two Thin Lenses

The ray matrix is a suitable method to study the imaging of a system consisting of several thin lenses. For two lenses however, the imaging can still easily be obtained by construction.
We simply construct the image obtained by the first lens as if the second lens were not present and use this image as (possibly virtual) object for the second lens.
In {numref}`Fig_2_20_Double_Lens` an example is shown where the distance between the lenses is larger than the sum of their focal lengths.
First the image $P'$ of $S$ is constructed as obtained by $L_1$ as if $L_2$ were not present.
We construct the intermediate image $P'$ due to lens $L_1$ using ray 2 and 3. $P'$ is a real image for lens $L_1$ and also a real object for lens $L_2$. Ray 3 is parallel to the optical axis between the two lenses and is thus refracted by lens $L_2$ through its back focal point $F_{2i}$. Ray 4 is the ray from $P'$ through the center of lens $L_2$. The image point $P$ is the intersection of ray 3 and 4.


```{figure} Images/Chapter_2/2_20_Two_Thin_Lenses_Separated.png
:name: Fig_2_20_Double_Lens
Two thin lenses separated by a distance that is larger than the sum of their focal lengths. 
```


In the case of {numref}`Fig_2_21_Two_Thin_Lenses_close` the distance $d$ between the two positive lenses is smaller than their focal lengths.
The intermediate image $P'$ is a real image for $L_1$ obtained as the intersection of rays 2 and 4 passing through the object and image focal points $F_{o1}$ and $F_{i1}$ of lens $L_1$. $P'$ is now a virtual object for lens $L_2$. To find its image by $L_2$, draw ray 3 from $P'$ through the center of lens $L_2$ back to $S$ (this ray is refracted by lens $L_1$ but not by $L_2$) and draw ray 4 as refracted by lens $L_2$. Since ray 4 is parallel to the optical axis between the lenses, it passes through the back focal point $F_{2i}$ of lens $L_2$. The intersection point of ray 3 and 4 is the final image point $P$.

```{figure} Images/Chapter_2/2_21_Two_Thin_Lenses_close.png
:name: Fig_2_21_Two_Thin_Lenses_close
Two thin lenses at a distance smaller than their focal lengths.
```


It is easy to express the $z$-coordinate $s_i$ with respect to the coordinate system with origin at the vertex of $L_2$ of the final image point, in the $z$-component $s_o$ with respect to the origin at the vertex of lens $L_1$ of the object point. We use the Lensmaker's Formula for each lens while taking care that the proper local coordinate systems are used.
The intermediate image $P'$ due to lens $L_1$ has $z$-coordinate $s_{1i}$ with respect to the coordinate system with origin at the vertex $V_1$, which satisfies:

```{math}
:label: eq.L1
\begin{align*}
-\frac{1}{s_o} + \frac{1}{s_{1i}}=\frac{1}{f_{1i}}.
\end{align*}
```
As object for lens $L_2$, $P'$ has $z$-coordinate with respect to the coordinate system with origin at $V_2$ given by:
$s_{2o}=s_{1i}-d$, where $d$ is the distance between the lenses. Hence, with $s_i=s_{2i}$ the Lensmaker's Formula for lens $L_2$ implies:

```{math}
:label: eq.L2
\begin{align*}
-\frac{1}{s_{1i}-d} + \frac{1}{s_i} = \frac{1}{f_{2i}}.
\end{align*}
```
By solving {eq}`eq.L1` for $s_{1i}$ and substituting the result into {eq}`eq.L2`, we find

```{math}
:label: eq.L1L2
\begin{align*}
s_i = \frac{ -d f_{1i}f_{2i} + f_{2i}(f_{i1}-d)s_o }{f_{1i}(f_{2i}-d) + (f_{1i}+f_{2i}-d) s_o}, \;\;\; \quad \textbf{two thin lenses}.
\end{align*}
```
By taking the limit $s_o \rightarrow -\infty$, we obtain the $z$-coordinate $f_i$ of the image focal point of the two lenses, while $s_i\rightarrow \infty$ gives the $z$-coordinate $f_o$ of the object focal point:

```{math}
:label: eq.2fi
\begin{align*}
f_i&= \frac{ (f_{1i}-d) f_{2i}}{f_{1i}+f_{2i}-d},
\end{align*}
```

```{math}
:label: eq.2fo
\begin{align*}
f_o &= -\frac{(f_{2i}-d)f_{1i}}{f_{1i}+f_{2i} - d},
\end{align*}
```
We found in [](subsection.focthin) that when the refractive indices of the media before and after the lens are the same, the object and image focal lengths of a thin lens are the identical. However, as follows from {eq}`eq.2fi` and {eq}`eq.2fo` the object and image focal lengths are in general different when there are several lenses.

By construction using the intermediate image, it is clear that the magnification of the two-lens system is the product of the magnifications of the two lenses:

```{math}
:label: eq.M
\begin{align*}
M = M_1 M_2.
\end{align*}
```
**Remarks**. 

1. When $f_{1i}+f_{2i}=d$ the focal points are at infinity. Such a system is called **telecentric**. 

2. In the limit where the lenses are very close together: $d\rightarrow 0$, {eq}`eq.L1L2` becomes

```{math}
:label: eq.L1L2d0
\begin{align*}
-\frac{1}{s_o } + \frac{1}{s_i} = \frac{1}{f_{1i}} + \frac{1}{f_{2i}}.
\end{align*}
```
The focal length $ f_i$ of the system of two lenses in contact thus satisfies:

```{math}
:label: eq.ftwo
\begin{align*}
\frac{1}{f_i} = \frac{1}{f_{1i}} + \frac{1}{f_{2i}}.
\end{align*}
```
In particular, by the using two identical lenses in contact, the focal length is halved. 

3. Although for two lenses the image coordinate can still be expressed relatively easily in the object distance, for systems with more lenses finding the overall ray matrix and then using the image condition {eq}`eq.condimage` is a much better strategy.

### The Thick Lens

At the left of {numref}`Fig_2_22_Thick_Lens_Principle_plane` a thick lens is shown. The object focal point is defined as the point whose rays are refracted such that the emerging rays are parallel to the optical axis. By extending the incident and emerging rays by straight segments, the points of intersection are found to be on a curved surface, which close to the optical axis, i.e. in the paraxial approximation, is in good approximation a plane perpendicular to the optical axis. This plane is called the **primary principal plane** and its intersection with the optical axis is called the primary principal point $H_1$.

```{figure} Images/Chapter_2/2_22_Thick_Lens_Principle_plane.png
:name: Fig_2_22_Thick_Lens_Principle_plane
Principal planes of a thick lens, with front and back focal lengths: f.f.l and b.f.l.
```

By considering incident rays which are parallel to the optical axis and therefore focused in the image focal point, the **secondary principal plane** and secondary principal point $H_2$ are defined in a similar way (see the drawing at the right in {numref}`Fig_2_22_Thick_Lens_Principle_plane`).
The principal planes can be outside the lens. For meniscus lenses, this is usually the case as shown in {numref}`Fig_2_23_Principle_planes`.
It can be seen from {numref}`Fig_2_22_Thick_Lens_Principle_plane`
that the principal planes are images of each other, with unit magnification. Hence, if an object is placed in the primary principal plane (hypothetically if this plane is inside the lens), its image is in the secondary principal plane. The image is erect and has unit magnification.


```{figure} Images/Chapter_2/2_23_Principle_planes.png
:name: Fig_2_23_Principle_planes
Position of the principal planes for several lenses. 
```


Now, if the object coordinates and object focal point are defined with respect to the origin at $H_1$ and the image coordinates and image focal point are defined with respect to the origin in $H_2$, the Lensmaker's formula {eq}`eq.lensmaker` can also be used for a thick lens.




*Proof* 

We recall the result {eq}`eq.matlens` for the ray matrix between the planes through the front and back vertices $V_1$, $V_2$ of a thick lens with refractive index $n_l$ and thickness $d$:

```{math}
:label: eq.matlens_b
\begin{align*}
{\cal M}_{V_1V_2}
&= \left( \begin{array}{cc}1 - \frac{d}{n_l}P_2 & -P \\\frac{d}{n_l} & 1 -\frac{d}{n_l}P_1
\end{array}\right), \quad \textbf{thick lens},
\end{align*}
```
where

```{math}
:label: eq.P1P2_b
\begin{align*}
P_1= \frac{n_l-n_1}{R_1}, \quad P_2=\frac{n_2-n_l}{R_2},
\end{align*}
```
and $n_1$, $n_2$ are the refractive indices to the left and the right of the lens, respectively, and where

```{math}
:label: eq.powerlens_b
\begin{align*}
P=P_1+P_2 - \frac{d}{n_l}P_1P_2.
\end{align*}
```
If $h_1$ is the $z$-coordinate of the first principal point $H_1$ with respect to the coordinate system with origin at vertex $V_1$, we have according to {eq}`eq.mathom` for the ray matrix between the primary principal plane and the plane through vertex $V_1$

```{math}
:label: eq.mathom_b
\begin{align*}
{\cal M}_1=\left( \begin{array}{cc}1 & 0 \\\frac{h_1}{n_1} & 1
\end{array}\right).
\end{align*}
```
Similarly, if $h_2$ is the coordinate of the secondary principal point $H_2$ with respect to the coordinate system with $V_2$ as origin, the ray matrix between the plane through vertex $V_2$ and the secondary principal plane is

```{math}
:label: eq.mathom_c
\begin{align*}
{\cal M}_2=\left( \begin{array}{cc}1 & 0 \\\frac{h_2}{n_2} & 1
\end{array}\right).
\end{align*}
```
The ray matrix between the two principle planes is then

```{math}
:label: eq.matH1H2
\begin{align*}
{\cal M}_{H_1H_2}= {\cal M}_2 {\cal M}_{V_1V_2}{\cal M}_1.
\end{align*}
```
The coordinates $h_1$ and $h_2$ can be found by imposing to the resulting matrix the imaging condition
{eq}`eq.condimage`: $C=0$ and the condition that the magnification should be unity: $D=1$, which follows from {eq}`eq.magn`.
We omit the details and only give the resulting expressions here:

```{math}
:label: eq.V1H1
\begin{align*}
h_1 &= \frac{n_1}{n_l} \frac{P_2}{P} d, \end{align*}
```
```{math}
:label: eq.V2H2
\begin{align*}
\\
h_2 &= -\frac{n_2}{n_l} \frac{P_1}{P} d.\end{align*}
```
With these results, {eq}`eq.matH1H2` becomes

```{math}
:label: eq.matH1H2_b
\begin{align*}
{\cal M}_{H_1H_2}= \left( \begin{array}{cc}1 & -P \\0 & 1
\end{array}\right).
\end{align*}
```
We see that **the ray matrix between the principal planes is identical to the ray matrix of a thin lens** {eq}`eq.matthinlens`.
We therefore conclude that if the coordinates in object space are chosen with respect to the origin in the primary principal point $H_1$, and the coordinates in image space are chosen with respect to the origin in the secondary principal point $H_2$, the expressions for the first and second focal points and for the coordinates of the image point in terms of that of the object point are identical to that for a thin lens. An example of imaging by a thick lens is shown in {numref}`Fig_2_24_Thick_Lens_Imaging`.

```{figure} Images/Chapter_2/2_24_Thick_Lens_Imaging.png
:name: Fig_2_24_Thick_Lens_Imaging
Thick-lens geometry. There holds
	 $f_i=f_o$ if the ambient medium left of the lens is the same as to the right of the lens. All coordinates in object and image space are with respect to the origin in $H_1$ and $H_2$, respectively.
```


```{index} Stops
:name: sec.stops
```

### Stops

An element such as the rim of a lens or a diaphragm which determines the set of rays that can contribute to the image, is called the **aperture stop**. An ordinary camera has a variable diaphragm.

The **entrance pupil** is the image of the aperture stop by all elements to the left of the aperture stop. In constructing the entrance pupil, rays are used which propagate from the right to the left. The image can be real or virtual. If there are no lenses between object and aperture stop, the aperture stop itself is the entrance pupil. Similarly, the **exit pupil** is the image of the aperture stop by all elements to the right of it. This image can be real or virtual. The entrance pupil determines for a given object the cone of rays in object space that contribute to the image, while the cone of rays leaving the exit pupil are those taking part in the image formation pupil (see {numref}`Fig_2_25_Aperture_Stop`).

For any object point, the **chief ray** is the ray in the cone that passes through the center of the entrance pupil, and hence also through the centers of the aperture stop and the exit pupil. A marginal ray is the ray that for an object point on the optical axis passes through the rim of the entrance pupil (and hence also through the rims of the aperture stop and the exit pupil).

For a fixed diameter $D$ of the exit pupil and for given $x_o$, the magnification of the system is according to {eq}`eq.defM1` and {eq}`eq.newton` given by $M=-x_i/f_i=f_i/x_o$. It follows that when $f_i$ is increased, the magnification increases.
A larger magnification means a lower energy density, hence a longer exposure time, i.e. **the speed of the lens is reduced**. Camera lenses are usually specified by two numbers: the focal length $f$, measured with respect to the exit pupil and the diameter $D$ of the exit pupil. The **$f$-number** is the ratio of the focal length to this diameter:


```{math}
:label: eq.fnumber
\boxed{\begin{align*}
\text{f-number}=f/D.
\end{align*}}
```

For example, f-number$=2$ means $f = 2D$. Since the exposure time is proportional to the square of the f-number, a lens with f-number 1.4 is twice as fast as a lens with f-number 2.


```{figure} Images/Chapter_2/2_25_Aperture_Stop.png
:name: Fig_2_25_Aperture_Stop
Aperture stop (A.S.) between the second and third lens, with entrance pupil and exit pupil (in this case these pupils are virtual images of the aperture stop). Also shown are the chief ray and the marginal ray. 
```


## Beyond Gaussian Geometrical Optics

### Aberrations
For designing advanced optical systems Gaussian geometrical optics is not sufficient.
Instead non-paraxial rays, and among them also non-meridional rays, must be traced using software based on Snell's Law with the sine of the angles of incidence and refraction. Often many thousands of rays are traced to evaluate the quality of an image.
It is then found that in general the non-paraxial rays do not intersect at the ideal Gaussian image point. Instead of a single spot, a spot diagram is found which is more or less confined. The deviation from an ideal point image is quantified in terms of **aberrations**. One distinguishes between monochromatic and chromatic aberrations. The latter are caused by the fact that the refractive index depends on wavelength.
Recall that in paraxial geometrical optics Snell's Law {eq}`eq.refrac3` is replaced by: $n_i \theta_i = n_t \theta_t$, i.e. $\sin \theta_i$ and $\sin \theta_t$ are replaced by the linear terms. If instead one retains the first two terms of the Taylor series of the sine, the errors in the image can be quantified by five monochromatic aberrations, the so-called **primary** or **Seidel aberrations**. The best known is **spherical aberration**, which is caused by the fact that for a convergent spherical lens, the rays that make a large angle with the optical axis are focused closer to the lens than the paraxial rays (see {numref}`Fig_2_26_Aberration_Lens`).

```{figure} Images/Chapter_2/2_26_Aberration_Lens.png
:name: Fig_2_26_Aberration_Lens
Spherical aberration of a planar-convex lens. 
```

**Distortion** is one of the five primary aberrations. It causes deformation of images due to the fact that the magnification depends on the distance of the object point to the optical axis.

For high-quality imaging,
the aberrations have to be reduced by adding more lenses and optimizing the curvatures of the surfaces,
the thicknesses of the lenses and the distances between them.
For high quality systems, a lens with an aspherical surface is sometimes used.
Systems with very small aberrations are extremely expensive, in particular if the field of view is large,
as is the case in lithographic imaging systems
used in the manufacturing of integrated circuits as shown in the lithographic system in {numref}`Fig_2_27_ASML_EUV`.

A comprehensive treatment of aberration theory can be found in Braat et al.<sup>[^4]: Advanced optical systems and aberrations.</sup>.


```{figure} Images/Chapter_2/2_27_ASML_EUV.png
:name: Fig_2_27_ASML_EUV
The EUV stepper TWINSCAN NXE:3400B.Lithographic lens system for DUV (192 nm), costing more than € 500.000. Ray paths are shown in purple. The optical system consists of mirrors because there are no suitable lenses for this wavelength (Courtesy of [ASML](https://www.asml.com/en/news/media-library)).
```


### Diffraction

According to a generally accepted criterion formulated first by Rayleigh, aberrations start to deteriorate images considerably if they cause path length differences of more than a quarter of the wavelength.
When the aberrations are less than this, the system is called **diffraction limited**.

```{figure} Images/Chapter_2/2_28_AiryDisk_210308.png
:name: Fig_2_28_AirySpot
Left: cross section of the field of the Airy pattern. Right: intensity pattern of the Airy pattern.
```


Even if the wave transmitted by the exit pupil would be perfectly spherical (no aberrations), the wave front consists of only a circular section of a sphere since the field is limited by the aperture. An aperture causes **diffraction**, i.e. bending and spreading of the light. When one images a point object on the optical axis, diffraction causes inevitable blurring given by the so-called Airy spot, as shown in {numref}`Fig_2_28_AirySpot`. The Airy spot has full-width at half-maximum:

```{math}
:label: eq.Airy_res
\begin{align*}
\text{FWHM} = 0.6 \frac{ \lambda}{\text{NA}},
\end{align*}
```
where NA$=\arcsin(a/s_i)$ is the numerical aperture (i.e. 0<NA<1) with $a$ the radius of the exit pupil and $s_i$ the image distance as predicted by Gaussian geometrical optics. Diffraction depends on the wavelength, and hence it cannot be described by geometrical optics, which applies in the limit of vanishing wavelength.  We will treat diffraction by apertures in [](chapter.diffraction).



[^1]: See Chapter 1 of M. Born \& E. Wolf, "Principles of Optics", Cambridge University Press (2013)

[^2]: R.K. Luneburg, Mathematical Theory of Optics, University of California Press, Berkeley and Los Angeles, 1964

[^3]: See also [https://en.wikipedia.org/wiki/Conic\_section](https://en.wikipedia.org/wiki/Conic_section)

[^4]: J. Braat, P. T&ouml;r&ouml;k, *Imaging Optics*, Cambridge University Press [(2019)](https://doi.org/10.1017/9781108552264)


```{code-cell}

```
