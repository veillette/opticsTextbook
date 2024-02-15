## Problems

1. Consider a time-harmonic plane wave with real electric field which with respect to a Cartesian coordinate system $(x,y,z)$ is given by:

```{math}
\begin{align*}
\mathbf{E}(z,t)= A \sin\left(k z-\omega t + \pi/2\right) \hat**{x**}+ A \sin\left(k z-\omega t \right) \hat**{y**}
\end{align*}
```
where $A$ is a positive real number.

- **a)** Write this electric field as the real part of a complex field.

- **b)** What is its corresponding Jones vector?

- **c)** What is the polarisation of this electric field? Make a drawing of the electric field vector in the $(x,y)$-plane at $z=0$ as function of time for an observer that is looking towards the source of the field.

- **d)** The beam passes normally through a linear polariser whose transmission axis makes an angle of $45 \degree$ with the positive $x$-axis.
What is the Jones matrix of this linear polariser?

- **e)** Derive the real electric field transmitted by the linear polariser as function of $z$ and $t$.

- **f)** What is the state of polarisation of the transmitted beam?

- **g)** What is the intensity of the transmitted beam?

- **h)** What happens to the difference in energy between the incident and transmitted beam?


2. Partial linear polarisation. 

Consider a light beam that is partially linear polarised. Show that the degree op polarisation is given by

$$
\frac{I_{max}-I_{min}}{I_{max}+I_{min}}.

$$
where $I_{max}$ and $I_{min}$ are the maximum and minimum of the light transmitted through a linear polariser when it is turned through 360 degrees.

3. In this problem we consider an optical isolator as shown in {numref}`Fig_4_4_Optical_Isolator`. In the setup, light can pass in one direction, but it cannot go back. This can for example be used to prevent laser light from going back into the laser source, hereby preventing unwanted effects such as intensity and frequency instabilities.

```{figure} ../Images/Chapter_4/Ex_4_4_Optical_Isolator.png
:name: Fig_4_4_Optical_Isolator
Schematic of a simple optical isolator.
```

- **a)** Give the Jones matrix for a linear polariser $\mathcal{P}$ that polarises light in the vertical direction (i.e. the $y$-direction).

- **b)** Now we rotate the linear polariser by $\theta=\pi/4$ anti-clockwise. Find the Jones matrix for the rotated polariser $\mathcal{P}_{\pi/4}$. Check your result by verifying that:

$$
\mathcal{P}_{\pi/4}\begin{pmatrix}1\\
1\end{pmatrix}=\begin{pmatrix}1\\
1\end{pmatrix},
\quad
\mathcal{P}_{\pi/4}\begin{pmatrix}1\\
\end{pmatrix}=\begin{pmatrix}0\\
\end{pmatrix}.
$$


- **c)** Give the Jones matrix $\mathcal{Q}$ for the quarter-wave plate of which the slow axis points in the vertical direction (i.e. the $y$-direction).


- **d)** Suppose we send light through the linear polariser and the quarter-wave plate. Then the light is partially transmitted and partially reflected by the mirror. The reflected light passes again through the quarter-wave plate and the polariser. Using Jones matrices calculate the state of the light that exits.

A video demonstration of this optical isolator can be viewed at <sup>[^1]</sup> (or search for "MIT optical isolator" on Youtube).


4. Phase plates. 

We consider a time-harmonic plane wave which propagates in the positive $z-$direction.
- **a)** Suppose we have a linear polariser orientated such that the angle with the positive $\hat{\mathbf{x}}$-axis is $+45^o$. Behind the linear polariser there is a half wave plate with fast axis orientated parallel to the $\hat{\mathbf{y}}$-axis.
What is the orientation of the polarisation of the wave transmitted first by the linear polariser and then by the half wave plate when the incident wave is linear polarised parallel to the $\hat{\mathbf{x}}$-axis?

- **b)** What is the intensity of the transmitted wave when the incident wave in a) has amplitude $A$?

- **c)** Suppose now that the half wave plate behind the linear polariser with angle $45^o$ with the $x$-axis, is replaced by a quarter wave plate with the fast axis parallel to the $y$-axis.
What is the polarisation of the transmitted light when the incident wave is linearly polarised parallel to the $\hat{\mathbf{x}}$-axis?


- **d)** What is the intensity of the transmitted wave when the incident wave in c) has amplitude $A$?

- **e)** Suppose that an incident linear polarised wave which is polarised parallel to the $x$-axis light is first transmitted by a quarter wave plate of which the fast axis makes an angle of $+45^o$ with the positive $x$-axis, and is then transmitted by a half wave plate with fast axis parallel to the $y$-axis.

What is the polarisation of the transmitted light if the incident wave is polarised parallel to the $\hat{\mathbf{x}}$-axis?

5. Jones Matrices.

Verify for each of the following matrices whether they correspond to a linear polariser, a wave plate or are neither. Also specify the direction of the linear polariser and the type of the wave plate.
- **a)**

$$
\left( \begin{array}{cc}-1 & 1 \\-\frac{2}{5} + i \frac{2}{5} & -\frac{1}{5}+i\frac{4}{5}
\end{array}\right).

$$

- **b)**

$$
\left( \begin{array}{cc}1 & -1 \\-1 & 1
\end{array}\right).
$$


- **c)**

$$
\left(\begin{array}{cc}1 & 0 \\0 &3
\end{array}\right)

$$
- Determine the Jones matrix for the case of a wave plate of thickness equal to the wavelength, with fast axis parallel to the vector

$$
\left( \begin{array}{c}1 \\-1
\end{array}\right),

$$
and with refractive indices $n_1=1.5$ and $n_2=2$.



[^1]:  [http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/optical-isolator/](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/optical-isolator/)

