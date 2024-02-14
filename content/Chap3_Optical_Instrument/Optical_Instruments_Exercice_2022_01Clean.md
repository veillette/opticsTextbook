## Problems

1. Consider a ray transfer matrix

$$
\left( \begin{array}{cc}A & B \\C & D
\end{array}\right)
$$ (eq.matrix3)

between two planes.


- **a)** Suppose that any ray that is parallel to the optical axis in the first plane goes through a point on the optical axis in the second plane. This means that the second plane is the focal plane of the system. What does this imply for the elements of the transfer matrix?

- **b)** Suppose that the first plane is a focal plane so that any ray emitted by the point on the optical axis in this plane becomes collimated in the second plane. What does this imply for the elements for the transfer matrix?

- **c)** Consider two thin lenses with distance $d$ and focal distances $f_1$ and $f_2$. Derive the transfer matrix linking the plane immediately before the first lens with the plane immediately behind the second lens. You may assume that the lenses are in air with refractive index $n=1$.

- **d)** Use the condition that you found in a) to derive the back focal distance of a system consisting of two thin lenses with refractive index $f_1$ and $f_2$ and distance $d$. Verify that the result agrees with the distance for the back focal plane in Section 3.5.4.
Hint: let $f_b$ be the distance of the back focal point of the two-lens system to the second lens. Write the transfer matrix between the lens immediately before the first lens and the plane through the back focal point.

- **e)** Add a third thin lens with refractive index $f_3$ in contact to the second lens. Answer question c) for this system.


2. The eye and the magnifying glass.

In this problem the eye is modelled as a single thin lens that creates an image on the retina.

The distance between the retina and the lens is $d_r$. Let us call the focal length of the lens $f_{\text{eye}}$. The eye is capable of varying $f_{\text{eye}}$.

- **a)** Suppose that the relaxed eye can see far-away objects sharply. How are $f_{\text{eye}}$ and $d_r$ related for a relaxed eye?

- **b)** Suppose we want to see an object that is nearby, with coordinate $s_o$, say. What should $f_{\text{eye}}$ be to obtain a sharp image on the retina?

- **c)** We introduce a magnifying glass, i.e. we put a thin lens with focal length $f$ in front of the eye. In front of the magnifying glass, there is a nearby object. We want to place the object such that a completely relaxed eye can see it sharply. Where should the object be? Verify your answer using the applet found here:

[http://www.geogebra.org/m/977919](http://www.geogebra.org/m/977919).

- **d)** Calculate the magnification of the system by using the transfer matrices. Assume for simplicity that throughout the entire system $n=1$. How does the magnification of the object depend on $f$? Verify your answer with the applet.

3. Increasing the angular field of vieuw. 

Patients with tunnel vision have only a limited field of view because only the central region of their retina is light sensitive. Suppose that the sensitive region of the retina is circular and has radius $r=2 \text{cm}$.
The length of the eye is 24 \text{cm} and the cornea and crystaline lens are together treated as a single thin lens.
- **a)** Show that the angular field of view of distant objects is

$$
\alpha_u= 6.4^o.
$$

(take into account that the ray which enters the centre of the eye lens is refracted because the vitreous humor has refractive index $n=1.337$).

- **b)**
Use a negative lens with focal distance $f<0$ at a distance $d$ in front of the eye. Show that when

$$
d=9 |f|,

$$
the angular field of view is increased by a factor 10.

- **c)**
We require that the virtual images of all distant objects are at distance of at least the distance of the normal near point. This implies that we require that $d+|f_2|> 25 \text{cm}$.
Derive $d$ and the strength of the negative lens in diopter.


```{figure} Images/Tutorial_3/Ex_03_Eye.png
:name: fig:Eye
\begin{footnotesize}Angular view $\alpha_u$ without and with the use of a negative lens.\end{footnotesize}
```


4. Imaging with a planar interface.
In this problem we investigate whether it is possible to image an object with a single planar interface.

- **a)** We have two media with refractive indices $n_1$ and $n_2$, separated by a planar interface. Give the transfer matrix $\mathcal{T}$ for refraction at a planar interface using the paraxial approximation.

- **b)** Suppose we have an object that is a distance $d$ from the interface. Give the system matrix that describes a ray propagating from the object to the plane that is a distance $d$ behind the interface (see {numref}`fig:PlanarInterface`).

```{figure} Images/Tutorial_3/Ex_04_Planar_Interface.png
:name: fig:PlanarInterface
Planar Interface
```

- **c)** Assuming that $d>0$, what condition has to be fulfilled in order to create an image in the plane behind the interface? Such an imaging system is called a **Veselago lens**.


