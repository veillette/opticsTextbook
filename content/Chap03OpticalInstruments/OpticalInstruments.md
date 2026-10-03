---
tags:
  - optical-instruments
  - intermediate
  - applications
downloads:
  - id: chapter-03-pdf
    title: Download Chapter PDF
  - id: chapter-03-docx
    title: Download Chapter DOCX
---

(chapter:inst)=
# Optical Instruments

```{note} What you should know and be able to do after studying this chapter
- Understand the working principle of a camera.
- Understand the optics of the eye and its accommodation with the near and far point.
- Understand how eyeglasses work.
- Understand the principle of the magnifier and the eyepiece and its use in the microscope and the telescope.
- Understand the microscope and the telescope concept and the (angular) magnification in both cases.
```
After the treatment in the preceding chapter of the laws of Gaussian geometrical optics, more complex systems based on lenses and reflectors can now be considered.

## The Camera Obscura

The camera obscura or pinhole camera is the simplest image forming system.
It consists of a closed box with a pinhole on one side. An inverted image is cast on the opposite side of the box as shown in {numref}`fig:inst:cameraObscura`.
If the hole is too large, the image is very blurred. At the cost of less light, the image can be made sharper by reducing the aperture.
The camera obscura can have a wide angular field and can keep objects over a large range of distances acceptably sharp (great depth of field), as in the right picture of {numref}`fig:inst:cameraObscura`.
If a film is used to record the image, long exposure times are often needed because only a small amount of light enters the pinhole. Some artists have used a camera obscura as a drawing aid.

```{figure} Images/03_01_camera_obscura.jpg
:name: fig:inst:cameraObscura
:alt: Diagram of an inverted image forming through a pinhole, alongside a room-sized camera obscura projecting an outdoor scene.
The principle of the camera obscura (from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Camera_obscura_1.jpg) in Fizyka z. (1910) / Public Domain). Contemporary examples of camera obscura photography can be found in the work of [Abelardo Morell](https://www.abelardomorell.net/selectedworks/camera-obscura).
```


## The Camera

In {numref}`fig:inst:reflexCamera` a single-lens reflex (SLR) camera is shown. The name means that the photographer views the scene through the same objective used to take the picture; an objective can contain several lens elements.
Light passes through an adjustable iris diaphragm that controls the $f$-number. In the viewing position, a mirror tilted at about $45^\circ$ directs light through a prism to the viewfinder. During exposure the mirror swings up, the diaphragm reaches its selected opening, and light reaches the image sensor. Focusing changes the position of one or more lens elements. Cameras may determine focus by contrast detection, phase detection, or a combination of methods.
```{figure} Images/03_02_reflex_camera.png
:name: fig:inst:reflexCamera
:alt: Cutaway of a digital SLR camera showing its lens, movable reflex mirror, prism, viewfinder, and image sensor.
Digital SLR camera. The pixelated digital sensor is behind a movable mirror at an angle of 45 degrees with the optical axis. (from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Reflex_camera_numeric.svg) by Jean François WITZ / CC BY-SA 3.0).
```

The **angular field of view** (AFOV) is defined for scenes at large distances and is approximately the angle subtended by the sensor at the image-side principal plane when the image distance is the focal length $f$ ({numref}`fig:inst:afov`). For a fixed sensor size, AFOV decreases as $f$ increases. For example, a 50 mm lens on a 36 mm-wide sensor has a horizontal field of view of about $40^\circ$.
```{figure} Images/03_03_afov.png
:name: fig:inst:afov
:alt: Rays from the edges of a distant object meet opposite edges of the image sensor, defining the camera's angular field of view.
Angular field of view of a camera.
```

More complex systems can have a variable focal length by changing the distance between the lenses, i.e. they are able to *zoom* into a scene.

The **depth of field** is a range of object distances around a given distance for which the images on the sensor are sharp. The depth of field depends on the diaphragm.
When the aperture is wide open, rays forming the image will make larger angles with the optical axis. With a large diaphragm, rays from objects at various distances produce more blurred images on the sensor (see {numref}`fig:inst:legoDepth`). When the aperture is reduced, this effect is less and therefore a smaller diaphragm implies a larger depth of field.
The drawback is that less light reaches the sensor; therefore, a longer exposure time is needed.

```{figure} Images/03_04_lego_depth.jpg
:name: fig:inst:legoDepth
:alt: Four photographs of Lego figures comparing wide and narrow apertures and different focus distances; the narrow-aperture view keeps more figures sharp.
Four images taken with different diaphragm settings and different focal planes. The image on the bottom right is taken with a small diaphragm and the entire image appears clear (photos taken by Aur&egrave;le J.L. ADAM / CC BY-SA).
```


## Camera in a Smartphone
A smartphone camera typically combines a compact objective with several lens elements, often including aspheric surfaces, and an electronic image sensor. Its short focal length and small sensor produce a wide field of view in a thin package.

Autofocus changes the position of lens elements to place the subject image on the sensor. Contrast detection evaluates image sharpness, while phase detection estimates the direction and size of a focus error from separated views of the scene. Some cameras also use a time-of-flight sensor to estimate subject distance from the delay of reflected light. Image processing can combine exposures and reduce noise, but it cannot recover arbitrary detail lost to severe defocus.

## The Human Eye

The eye is an adaptive imaging system.

### Anatomy
The eyeball is roughly 24 mm long. Its interior is largely filled by the transparent, gel-like **vitreous humor** (refractive index about 1.337), and its outer white coat is the **sclera** ({numref}`fig:inst:threeInternalChambersOfTheEye`). The transparent **cornea** forms the curved front surface of the eye; its refractive index for green light is about 1.376. Much of the eye's refracting power comes from the air–cornea interface, which loses power under water because water and cornea have more similar refractive indices.
```{figure} Images/03_05_three_internal_chambers_of_the_eye.png
:name: fig:inst:threeInternalChambersOfTheEye
:alt: Labeled cross section of an eye showing the cornea, aqueous humor, iris, pupil, crystalline lens, vitreous humor, retina, and optic nerve.
Cross section of a human eye (from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Three_Internal_chambers_of_the_Eye.png) by Holly Fischer / CC BY).
```

After passing through the cornea, light crosses the **aqueous humor** ($n\approx 1.336$) and enters the **pupil**, the opening in the colored **iris**. The iris changes pupil diameter to regulate the amount of light entering the eye. Behind the iris is the flexible **crystalline lens**, about 9 mm across and 4 mm thick when relaxed. Its refractive index varies across the lens; accommodation changes its shape and optical power.

```{figure} Images/03_06_focus_in_an_eye_a.png
:alt: Two ray diagrams comparing focus on the retina for distant and near objects as the eye accommodates.

Ray diagrams of the eye focusing distant and nearby objects on the retina.
```
```{figure} Images/03_07_accomodation_eye.png
:name: fig:inst:eye
:alt: Two cross sections of the ciliary body and crystalline lens: relaxed ciliary muscle and flatter lens at left, contracted muscle and rounder lens at right.
Accommodation changes the shape of the crystalline lens: the ciliary muscle is relaxed at left and contracted at right. Adapted from Sjaastad O.V., Sand O. and Hove K. (2010), *Physiology of Domestic Animals*, 2nd ed., Scandinavian Veterinary Press.
```


### Working of the eye
The cornea and crystalline lens form a compound optical system. For a first approximation, we replace them with one effective thin lens near the front of the eye. This simplified model neglects the separation of the eye's refracting surfaces.

```{phet} geometric-optics-basics
:label: fig:inst-eye-optics-sim

A single thin lens with object and image distances under control. Treat it as the one-lens model of the eye used below: move the object inside and outside the near point and watch the image distance respond the way accommodation must.
```

In this model, the relaxed eye focuses rays from infinity on a retina 24 mm behind the effective lens, so its image-side focal distance is $f_i=24$ mm. With air on the object side and vitreous humor on the image side, the focal distances differ. The power and signed object-side focal distance are (see the thin-lens matrices in the {ref}`Ray Matrix chapter <chapter:ray>`):

```{math}
:label: eq:inst:eyeDioptricPower
\begin{align*}
\mathfrak{D} =\frac{n_{vh}}{f_i}= \frac{1.337}{0.024}\approx 55.7~\text{D},
\qquad f_o=-\frac{1}{\mathfrak{D}}\approx-18.0~\text{mm}.
\end{align*}
```

When an object moves closer, the ciliary muscle contracts, allowing the crystalline lens to become rounder and increasing the eye's optical power, as shown at the right of {numref}`fig:inst:eye`.
At a certain point, the object will be too close to be focused on the retina. This is called the **near point** of the eye.
The near point generally moves farther away with age as the crystalline lens becomes less flexible. In calculations of angular magnification, 25 cm is a conventional reference viewing distance, not a fixed physiological near point. The **far point** is the furthest object imaged sharply on the retina by the relaxed eye; for an emmetropic eye it is at infinity.

### Retina

The retina contains two principal types of photoreceptor: **rods**, which are highly sensitive in dim light, and **cones**, which support color vision and fine detail in brighter light. The **fovea centralis** has a high density of cones and provides the sharpest central vision. Visual signals travel to the brain through the optic nerve. The point where the optic nerve exits the retina has no photoreceptors and creates a blind spot.

### Dioptric Power of a lens

For a single lens the dioptric power is defined by:

```{math}
\begin{align*}
\mathfrak{D} = \frac{n_m}{f}=(n_l-n_m)\left(\frac{1}{R_1}-\frac{1}{R_2}\right)
\end{align*}
```
with $R_1$ and $R_2$ the radii of the thin lens measured in meters, $n_l$ is the index of refraction of the lens and $n_m$ that of the ambient medium.
(When the media to the left and right of the lens are different, the refractive index to the right of the lens and the right focal distance should be taken).
For two lenses in contact, the focal length is given by:

```{math}
\begin{align*}
\frac{1}{f}=\frac{1}{f_1}+\frac{1}{f_2},
\end{align*}
```
hence the combined power of the two lenses in contact is the sum of the individual powers:

```{math}
\begin{align*}
\mathfrak{D} = \mathfrak{D}_1+\mathfrak{D}_2
\end{align*}
```
A positive thin lens of focal length $f_1=10$ cm in air has power $\mathfrak{D}_1=+10$ D. If it is in contact with a thin negative lens of power $\mathfrak{D}_2=-10$ D, the combined optical power is zero: collimated incident rays remain collimated in the thin-lens approximation.


### Eyeglasses

The eye can suffer from imperfections as seen in {numref}`fig:inst:eyeCorrection`. We discuss the most common imperfections and their solutions.


**a. Myopia or nearsightedness**.
A myopic eye has focal distances that are too short (has too high power). Distant objects
are focused in front of the retina by the relaxed eye. The far point is thus not
at infinity, but closer. This can be corrected by a negative lens. Suppose the
far point is at 2 m. If a correcting lens is placed close to the cornea, it must form a virtual image of a distant object about 2 m in front of the eye. The thin-lens imaging equation $-1/s_o+1/s_i=\mathcal{P}$ in air, with $s_o=-\infty$ and $s_i=-2$ m, gives the approximate required power:

```{math}
:label: eq:inst:myopiaCorrection
\begin{align*}
\mathfrak{D} =\frac{1}{f}= -0.5 \; \text{diopter}.
\end{align*}
```

For eyeglasses held away from the cornea, the required power changes with **vertex distance**, the separation between the lens and the eye. The value above assumes negligible separation.

Because a contact lens sits close to the cornea, adding its power to the eye's effective power is a useful first approximation.


**b. Hyperopia or farsightedness**.
In this case a distant object is imaged by the relaxed eye behind the retina, i.e. the back focal distance of the relaxed eye is larger than the depth of the eye. Close objects cannot be imaged on the retina; hence, the near point is relatively far from the cornea. In order to bend the rays more, a positive lens is placed in front of the eye. Suppose that a hyperopic eye has a near point at a distance of 125 cm. For an object at the 25 cm reference distance $s_o=-25$ cm to have a virtual image at $s_i=-125$ cm, so that it can be seen, the focal length of the positive lens must satisfy

```{math}
:label: eq:inst:hyperopiaFocalLength
\begin{align*}
\frac{1}{f}=-\frac{1}{s_o}+\frac{1}{s_i}= \frac{1}{0.25}-\frac{1}{1.25} =\frac{1}{0.3125},
\end{align*}
```
hence the power must be $\mathfrak{D}=1/f=+3.2$ diopter.
```{figure} Images/03_08_eye_correction.png
:name: fig:inst:eyeCorrection
:alt: Ray diagrams showing how a converging lens corrects hyperopia and a diverging lens corrects myopia.
Correction of farsighted (left) and nearsighted (right) eyes (adapted from [Wikimedia Commons](https://en.wikipedia.org/wiki/File:Myopia_and_lens_correction.svg) by Gumenyuk I.S. / CC BY-SA 4.0).
```


**c. Presbyopia.**
Presbyopia is an age-related reduction in accommodation that moves the near point farther from the eye. Reading glasses, bifocals, or progressive lenses can supply the extra power needed for near tasks.


**d. Astigmatism.**
In this case the focal distances for two directions perpendicular to the optical axis are different.
It is attributed to a lack of symmetry of revolution of the cornea. This is compensated by using glasses which themselves are astigmatic.

### New Correction Technique
In recent years, to correct eye defects such as myopia and astigmatism, technology has been developed to change the local curvatures of the surface of the cornea using an excimer laser. The laser is computer-controlled and causes photo-ablation in parts of the cornea.


## Magnifying Glasses
A magnifying glass produces a larger retinal image than unaided viewing at the conventional reference distance $d_o=25$ cm. Bringing an object closer to the eye also increases its angular size, but accommodation limits how close it can be while remaining sharp. A positive lens can place a magnified, upright virtual image at a comfortable viewing distance or at infinity.
An example is given in {numref}`fig:inst:magnifierGruffalo`.

```{figure} Images/03_09_magnifier_gruffalo_small.png
:name: fig:inst:magnifierGruffalo
:alt: A handheld magnifying glass enlarges words and an illustration on a children's book page.
Example of a positive lens used as a magnifying glass (picture taken by A.J.L. Adam / CC-BY-SA 4.0).
```


### Magnifying Power
The **magnifying power** $\text{MP}$ or **angular magnification** $M_a$ is defined as the ratio of the size of the retinal image obtained with the instrument to the size of the retinal image as seen by the unaided eye at normal viewing distance $d_o$.
To estimate the size of the retinal image, we compare in both cases where **the chief ray through the top of the object and the center of the pupil of the eye hits the retina**. Since the distance between the eye lens and the retina is fixed, the ratio of the image size on the retina for the eye with and without a magnifying glass is:

```{math}
\begin{align*}
\text{MP}=\frac{\alpha_a}{\alpha_u},
\end{align*}
```
where $\alpha_a$ and $\alpha_u$ are the angles between the optical axis and the chief rays for the aided and the unaided eye, respectively, as shown in {numref}`fig:inst:magnifier`. Working with these angles instead of distances is in particular useful when the virtual image of the magnifying glass is at infinity.
Using $\alpha_a\approx y_i/L$ and $\alpha_u\approx y_o/d_o$ with $y_i$ and $y_o$ positive and $L$ the positive distance from the virtual image to the eye, we find

```{math}
:label: eq:inst:magnifyingPower
\begin{align*}
\text{MP}=\frac{y_i d_o}{y_o L}.
\end{align*}
```
Since $s_i<0$ and $f_o<0$ we have,

$$
\frac{y_i}{y_o} = \frac{s_i}{s_o} = 1 + \frac{s_i}{f_o},
$$
where we used the lens equation for the magnifying glass. We have $s_i = -|s_i|=-(L-\mathcal{l})$, where
$\mathcal{l}$ is the distance between the magnifying glass and the eye. Hence,
{eq}`eq:inst:magnifyingPower` becomes:

```{math}
:label: eq:inst:magnifyingPowerDistance
\begin{align*}
\text{MP} &= \frac{d_o}{L} \left[ 1 + \frac{L-\mathcal{l}}{|f_o|} \right]  \\
&= \frac{d_o}{L} \left[ 1 + {\cal P}\left(L-\mathcal{l}\right) \right],
\end{align*}
```
where ${\cal P}$ is the power of the magnifying glass.

```{figure} Images/03_10_magnifier.png
:name: fig:inst:magnifier
:alt: Two ray diagrams compare an unaided view at the reference distance with the larger angular image produced by a magnifying glass.
An unaided view (top) and an aided view using a magnifier.
```


We distinguish three situations:
1. $\mathcal{l}=|f_o|$: the magnifying power is then $\text{MP}=d_o{\cal P}$.
1. $\mathcal{l}=0$ and the virtual image is at the 25 cm reference distance, $L=d_o$: the magnifying power is

```{math}
\begin{align*}
\text{MP}|_{\mathcal{l}=0,L=d_o}=d_o{\cal P}+1.
\end{align*}
```
1. The object is at the focal point of the magnifier ($s_o=f_o$), so that the virtual image is at infinity ($L=\infty$) and hence

```{math}
:label: eq:inst:magnifyingPowerInfinity
\begin{align*}
\text{MP}|_{L=\infty}=d_o{\cal P},
\end{align*}
```
for every distance $\mathcal{l}$ between the eye and the magnifying glass. The rays are parallel, so that the eye views the object in a relaxed way. This is the most common use of the magnifier.

For a 10 D magnifier and $d_o=25$ cm, the relaxed-eye value is $2.5\times$, while placing the lens close to the eye and viewing a virtual image at 25 cm gives $3.5\times$. The difference becomes relatively smaller for stronger magnifiers.

### Nomenclature

Magnifiers are commonly labeled by their magnifying power when the final image is at infinity (case 3 above). For example, a 10 D magnifier has $\text{MP}=2.5$, or $2.5\times$, relative to unaided viewing from the 25 cm reference distance.

## Eyepieces

An **eyepiece** or **ocular** is a magnifier used before the eye at the end of another optical instrument such as a microscope or a telescope. The eye looks into the ocular and the ocular "looks" into the optical instrument.
The ocular provides a magnified virtual image of the image produced by the optical instrument. Similar to the magnifying glass, the virtual image should preferably be at or near infinity to be viewed by a relaxed eye. A simple eyepiece can contain:
1. the field lens, which is the first lens in the ocular;
2. the eye lens, which is closest to the viewer.
The **eye relief** is the distance from the last eyepiece surface to the exit pupil, where the eye should be placed to see the full field.
A field stop limits the angular field of view, while an aperture stop limits the cone of rays admitted from each object point.
An example is given in {numref}`fig:inst:eyePiece`.
```{figure} Images/03_11_eye_piece.png
:name: fig:inst:eyePiece
:alt: Section through a three-element eyepiece marking its intermediate image, field stop, eye relief, and position of the viewer's pupil.
Example of an eyepiece consisting of three lenses. 1) Real image, 2) field diaphragm, 3) eye relief, 4) eye pupil (adapted from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Exitpupil.png) by Tamas-flex / CC BY-SA 3.0).
```


## The Compound Microscope
A magnifier alone can provide very high magnification only at the cost of intolerable aberrations.
The **compound microscope** is a magnifier of close objects with a high angular magnification, generally more than $30\times$. It was invented by Zacharias Janssen in Middelburg in 1590 (but this claim is disputed). The first element of the compound microscope is an objective (in {numref}`fig:inst:compoundMicroscope` a simple positive lens) which makes a real, inverted and magnified image of the object in the front focal plane of an eyepiece (where there is also the field stop). The eyepiece will make a virtual image at infinity, as explained above.

```{figure} Images/03_12_compound_microscope.png
:name: fig:inst:compoundMicroscope
:alt: Ray diagram of a compound microscope in which an objective forms an inverted real intermediate image and an eyepiece sends rays toward the eye.
Simple compound microscope. The objective forms a real image of a nearby object. The eyepiece enlarges this intermediate image. The final image can be bigger than the barrel of the device, since it is virtual.
```


The magnifying power of the entire system is the product of the transverse linear magnification of the objective $M_{T}$ and the angular magnification of the eyepiece $M_{Ae}$:

```{math}
\begin{align*}
\text{MP}=M_{T}M_{Ae}.
\end{align*}
```

According to the transverse magnification equation (see the {ref}`Ray Matrix chapter <chapter:ray>`): $M_{T}=- x_i/f_i^{obj}$,
where $x_i$ is the distance from the objective's back focal plane to its image plane and $f_i^{obj}$ is the objective focal length. In the finite-tube model shown, $x_i=L$ is the optical tube length: the distance between the objective's back focal point and the eyepiece's front focal point. A traditional finite-tube example uses $L=16$ cm; infinity-corrected microscopes have a different optical layout.
Furthermore, according to {eq}`eq:inst:magnifyingPowerInfinity`, the angular
magnification for a virtual image at infinity is: $M_{Ae}=d_o/f_i^e$. Hence,
we obtain:

```{math}
\begin{align*}
\text{MP}=-\frac{L}{f_i^{obj}}\frac{d_o}{f_i^e},
\end{align*}
```
where $d_o=25$ cm is the reference viewing distance and all lengths use the same units. For example, a $40\times$ objective combined with a $10\times$ eyepiece gives $400\times$ total magnification.

The **numerical aperture**
of a microscope is a measure of the capability to gather light from the object.
It is defined by:

```{math}
\begin{align*}
\text{NA} = n_{im} \sin\theta_{max}
\end{align*}
```
with $n_{im}$ the refractive index of the immersing medium, usually air, but it could be water or oil, and $\theta_{max}$ the half-angle of the maximum cone of light accepted by the lens. The numerical aperture is the second number etched in the barrel of the objective. It ranges from 0.07 (low-power objectives) to 1.4 for high-power objectives. Note that it depends on the object distance. In {ref}`chapter:diff` it will be explained that $\text{NA}$ is, for a given object distance, proportional to the resolving power; the resolution is the minimum transverse distance between two object points that can be resolved in the image.


## The Telescope


A telescope enlarges the retinal image of a distant object. Like a compound microscope, it is also composed of an objective and an eyepiece as seen in {numref}`fig:inst:keplerTelescope`.
```{figure} Images/03_13_kepler_telescope.png
:name: fig:inst:keplerTelescope
:alt: Keplerian telescope with a long-focal-length objective and short-focal-length eyepiece in a tube.
Keplerian astronomical telescope.
```

The objective forms a real intermediate image of a distant object near its back focal plane. If that intermediate image lies at the eyepiece's front focal plane, the emerging rays are parallel and the eye can view the final image while relaxed. The final image is inverted. For objects at a large but finite distance, the objective's image lies just beyond its back focal point and the eyepiece position must be adjusted slightly to retain relaxed viewing.

As seen earlier, angular magnification is $\text{MP}=\alpha_a/\alpha_u$, where $\alpha_u$ is the small angle subtended by the distant object at the unaided eye and $\alpha_a$ is its apparent angle through the telescope. For an object at infinity, the ray triangles in {numref}`fig:inst:raysTelescope` give

```{math}
:label: eq:inst:telescopeMagnification
\begin{align*}
\text{MP} = -\frac{f_i^{obj}}{f_i^e}.
\end{align*}
```
(The minus sign is because the image is inverted.)

```{figure} Images/03_14_rays_telescope.png
:name: fig:inst:raysTelescope
:alt: Telescope ray diagram showing the incident and emerging ray angles and the focal lengths of objective and eyepiece.
Ray angles for a telescope.
```

## Chapter Summary

- **The camera** uses a lens to form a real, inverted image on film or a sensor; exposure is controlled by the f-number and shutter speed.
- **The human eye** is a variable-focus optical system where accommodation changes the lens power to focus objects at different distances.
- **Vision defects**: Myopia (nearsightedness) is corrected with negative lenses; hyperopia (farsightedness) with positive lenses.
- **The magnifying glass** produces a magnified virtual image; angular magnification is $\text{MP}=d_o/f$ for an image at infinity.
- **The compound microscope** uses an objective to form an intermediate real image, then an eyepiece for further magnification: $\text{MP}=-L d_o/(f_i^{obj}f_i^e)$ in the finite-tube model.
- **Numerical aperture** (NA $= n \sin\theta_{max}$) determines light-gathering ability and resolution of microscopes.
- **The telescope** magnifies distant objects; angular magnification is $\text{MP} = -f_{obj}/f_e$ for objects at infinity.
- Both microscopes and telescopes achieve magnification through the combined action of objective and eyepiece lenses.
