# Problems

**Problem 4.1** Consider a time-harmonic plane wave whose real electric field, in a Cartesian coordinate system $(x,y,z)$ is given by:

```{math}
\begin{align*}
\mathbf{E}(z,t)= A \sin\left(k z-\omega t + \pi/2\right)  \widehat{\mathbf{x}}+ A \sin\left(k z-\omega t \right)  \widehat{\mathbf{y}}
\end{align*}
```
where $A$ is a positive real number.

**(a)** Write this electric field as the real part of a complex field.

**(b)** What is its corresponding Jones vector?

**(c)** What is the polarization of this electric field? Make a drawing of the electric field vector in the $(x,y)$-plane at $z=0$ as a function of time for an observer that is looking towards the source of the field.

**(d)** The beam passes normally through a linear polarizer whose transmission axis makes an angle of $45 \degree$ with the positive $x$-axis.
What is the Jones matrix of this linear polarizer?

**(e)** Derive the real electric field transmitted by the linear polarizer as a function of $z$ and $t$.

**(f)** What is the state of polarization of the transmitted beam?

**(g)** What is the intensity of the transmitted beam?

**(h)** Where can the energy removed from the transmitted beam go in an absorptive polarizer and in a reflective polarizer?


**Problem 4.2** Partial linear polarization.

Consider a light beam that is partially linearly polarized. Show that the degree of polarization is given by

$$
\frac{I_{max}-I_{min}}{I_{max}+I_{min}}.
$$
Here, $I_{max}$ and $I_{min}$ are the maximum and minimum intensities of the light transmitted through a linear polarizer when it is turned through 360 degrees.

**Problem 4.3** Consider the polarizer, quarter-wave plate, and normally reflecting mirror in {numref}`fig:pol:opticalIsolator`. At the intended wavelength, this arrangement can reject light returning from the mirror toward the source. It illustrates suppression of a specific back-reflection; the mirror blocks forward transmission, so the diagram is not a general two-port optical isolator.

```{figure} ../Images/04_06_4_optical_isolator.png
:name: fig:pol:opticalIsolator
:alt: Light travels through a linear polarizer and quarter-wave plate to a mirror, then returns through the plate and polarizer along the same path.
Polarizer, quarter-wave plate, and mirror used to reject an ideal normal-incidence back-reflection.
```

**(a)** Give the Jones matrix for a linear polarizer $\mathcal{P}$ that polarizes light in the vertical direction (i.e. the $y$-direction).

**(b)** Now we rotate the linear polarizer by $\theta=\pi/4$ counterclockwise. Find the Jones matrix for the rotated polarizer $\mathcal{P}_{\pi/4}$. Check your result by verifying that:

$$
\mathcal{P}_{\pi/4}\begin{pmatrix}1\\
1\end{pmatrix}=\begin{pmatrix}1\\
1\end{pmatrix},
\quad
\mathcal{P}_{\pi/4}\begin{pmatrix}1\\
-1\end{pmatrix}=\begin{pmatrix}0\\
0\end{pmatrix}.
$$


**(c)** Give the Jones matrix $\mathcal{Q}$ for the quarter-wave plate of which the slow axis points in the vertical direction (i.e. the $y$-direction).


**(d)** Use the polarizer rotated in part (b), followed by the quarter-wave plate in part (c). Model the normal-incidence mirror as multiplying both transverse field components by the same reflection coefficient. In fixed laboratory $x,y$ axes, the reflected light traverses the quarter-wave plate and the same rotated polarizer again. Using Jones matrices, calculate the returned field after the polarizer and explain the role of the $45^\circ$ angle.

A related demonstration of optical isolation is linked in [^1]. Compare its optical elements with the mirror-return arrangement in this problem.

**Problem 4.4** Phase plates.

We consider a time-harmonic plane wave which propagates in the positive $z-$direction.

**(a)** Suppose we have a linear polarizer orientated such that the angle with the positive $\hat{\mathbf{x}}$-axis is $+45^o$. Behind the linear polarizer there is a half wave plate with fast axis orientated parallel to the $\hat{\mathbf{y}}$-axis.
What is the orientation of the polarization of the wave transmitted first by the linear polarizer and then by the half wave plate when the incident wave is linearly polarized parallel to the $\hat{\mathbf{x}}$-axis?

**(b)** What is the intensity of the transmitted wave when the incident wave in a) has amplitude $A$?

**(c)** Suppose now that the half wave plate behind the linear polarizer with angle $45^o$ with the $x$-axis is replaced by a quarter wave plate with the fast axis parallel to the $y$-axis.
What is the polarization of the transmitted light when the incident wave is linearly polarized parallel to the $\hat{\mathbf{x}}$-axis?


**(d)** What is the intensity of the transmitted wave when the incident wave in c) has amplitude $A$?

**(e)** Suppose that an incident linearly polarized wave which is polarized parallel to the $x$-axis is first transmitted by a quarter wave plate of which the fast axis makes an angle of $+45^o$ with the positive $x$-axis, and is then transmitted by a half wave plate with fast axis parallel to the $y$-axis.

What is the polarization of the transmitted light if the incident wave is polarized parallel to the $\hat{\mathbf{x}}$-axis?

**Problem 4.5** Jones Matrices.

Verify for each of the following matrices whether they correspond to a linear polarizer, a wave plate or are neither. Also specify the direction of the linear polarizer and the type of the wave plate.

**(a)**

$$
\left( \begin{array}{cc}-1 & 1 \\-\frac{2}{5} + i \frac{2}{5} & -\frac{1}{5}+i\frac{4}{5}
\end{array}\right).
$$

**(b)**

$$
\left( \begin{array}{cc}1 & -1 \\-1 & 1
\end{array}\right).
$$


**(c)**

$$
\left(\begin{array}{cc}1 & 0 \\0 &3
\end{array}\right)
$$

**(d)** Determine the Jones matrix, up to an overall phase, for a wave plate of thickness equal to the **vacuum** wavelength $\lambda_0$, with fast axis parallel to the vector

$$
\left( \begin{array}{c}1 \\-1
\end{array}\right),
$$
and with refractive indices $n_1=1.5$ and $n_2=2$.


[^1]:  [https://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/optical-isolator/](https://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/optical-isolator/)
