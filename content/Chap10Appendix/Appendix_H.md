(sec:basistrans)=
# Basis transformations

In this section, we discuss the relevance of basis transformations and how to apply them. So what are basis transformations essentially? It comes down to the following: if we have some physical object $\mathbf{\Psi}$, we can describe it with a vector (which can in principle be a continuous function). The form of the vector with which we represent $\mathbf{\Psi}$ depends on the basis that we choose. For example, we could represent a position vector $\mathbf{R}$ in Cartesian coordinates $(x,y,z)$, or in spherical coordinates $(\rho,\phi,\theta)$, or in cylindrical coordinates $(r,\phi,z)$. It is important to note that **the physical object** remains unchanged, it is only the **coefficients with which the object is represented** that change. The formulas that describe how the coefficients for one basis transform to the coefficients in the other basis constitute the **basis transformation**. In case these formulas can be described as a matrix operation, we have a **linear basis transformation**. This concept is extensively treated in Linear Algebra courses.

Basis transforms are ubiquitous, so it is important to be familiar with them also outside the context of optics. For example, if you have some signal $\mathbf{\Psi}$, you can either express it in the **time domain** or in the **frequency domain**. These are two different representations of the same physical object, and the basis transformation that relates the two is the **Fourier transform**. In the discrete case it would read

```{math}
\begin{align*}
X_k=\sum_{n=0}^{N-1}x_n e^{-2\pi i k n/N},
\end{align*}
```
where $x_n$ are the coefficients representing the signal in the time domain, and $X_k$ are the coefficients representing the signal in the frequency domain. Note that this basis transformation can be described as a matrix operation

```{math}
\begin{align*}
\left(\begin{array}{c}X_0\\X_1\\\vdots
\end{array}\right)
=
\left(\begin{array}{cccc}1 & 1 &1&\dots\\1 & e^{-2\pi i /N} &e^{-4\pi i /N} &\dots\\1 & e^{-4\pi i /N} &e^{-8\pi i /N} &\dots\\\vdots & \vdots & \vdots &\ddots
\end{array}\right)
\left(\begin{array}{c}x_0\\ x_1\\\vdots
\end{array}\right),
\end{align*}
```
so the Fourier transform is a linear basis transformation. The benefit of applying such a basis transformation is obvious: in different bases, there is different information that becomes apparent more obviously. In the time domain one can see how the signal progresses in time, but it is difficult to identify different frequency components, whereas in the frequency domain it is very easy to see how much each frequency contributes to the signal, but it is difficult to see how the signal changes in time. Also, sometimes it is more efficient to describe a signal in one basis than in the other. For example, if the signal is a sine wave in the time domain, it takes infinitely many nonzero coefficients (each coefficient being a point in time) to describe it in the time domain, while it takes only two nonzero coefficients to describe it in the frequency domain. We say that a signal can be **sparse in a certain basis** (sparse meaning that it be represented with few non-zero coefficients). This sparsity can help in compressing data, or it can be used as a constraint in reconstruction algorithms (this field is known as **compressed sensing**).

A similar observation holds for the different representations of a quantum state. One can represent a quantum state $\ket{\psi}$ in the position basis (i.e. in terms of the eigenvectors of the position operator $\hat{x}$), or in the momentum basis (i.e. in terms of the eigenvectors of the position operator $\hat{p}$). Again, the physical object remains unchanged, but by representing it in different bases, different parts of information become more apparent. In the position basis it becomes easier to see where a particle may be located, while in the momentum basis it is easier to see what momentum it may have. The basis transformation that relates the position representation to the momentum representation is the Fourier transform. One can also represent a quantum state $\ket{\psi}$ in the energy basis (i.e. in terms of the eigenvectors of the energy operator $\hat{H}$, also called the Hamiltonian), in which case it is easier to see what energy a particle may have, and which makes it easier to calculate the time-evolution of the wave function (because the time evolution is determined by the Schr\"odinger equation, which is a differential equation involving $\hat{H}$).

So basis transformations can help in making certain properties of a vector $\mathbf{\Psi}$ become more apparent, or make its description simpler (i.e. more sparse). Another advantage that a basis transformation can have is that **applying operators can be easier in a certain basis**. In particular, applying a linear operator $A$ to some vector $\mathbf{\Psi}$ is much easier if $\mathbf{\Psi}$ is expressed in the eigenbasis of $A$. Suppose we can write

```{math}
\begin{align*}
\mathbf{\Psi}=\sum_k {a_k \mathbf{v}_k},
\end{align*}
```
where $\mathbf{v}_k$ are eigenvectors of $A$ with eigenvalues $\lambda_k$, then applying $A$ to $\mathbf{\Psi}$ will give

```{math}
\begin{align*}
A \mathbf{\Psi} = \sum_k {\lambda_k a_k \mathbf{v}_k}.
\end{align*}
```
In matrix notation, this is written as

```{math}
\begin{align*}
\begin{split}
A \mathbf{\Psi} &=
\left(
\begin{array}{c}\lambda_1 a_1\\\lambda_2 a_2\\\vdots
\end{array}\right)
&=
\left(
\begin{array}{ccc}\lambda_1 &0 &\dots\\0& \lambda_2 &\dots\\\vdots & \vdots & \ddots
\end{array}\right)
\left(
\begin{array}{c}a_1\\ a_2\\\vdots
\end{array}\right).
\end{split}
\end{align*}
```
Thus, we see that **if $\mathbf{\Psi}$ is represented in terms of eigenvectors of the linear operator $A$ (i.e. in the eigenbasis of $A$), then the matrix representation of $A$ is a diagonal matrix, and on its diagonal are its eigenvalues**.

Expressing $\mathbf{\Psi}$ in terms of eigenvectors of $A$ is thus very useful. But if $\mathbf{\Psi}$ is given in some arbitrary basis, how do we find the coefficients that represent it in the eigenbasis of $A$? To do this, let us consider a simple example. Suppose $\mathbf{\Psi}$ has the following representation in the $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis

```{math}
\begin{align*}
\mathbf{\Psi}=4\hat{\mathbf{x}}+7\hat{\mathbf{y}}.
\end{align*}
```
Or in vector notation

```{math}
\begin{align*}
\mathbf{\Psi}_{xy}=
\left(\begin{array}{c}4\\7
\end{array}\right).
\end{align*}
```
Keep in mind that this is not **the** vector corresponding to $\mathbf{\Psi}$. Rather, it is **a** representation of $\mathbf{\Psi}$ which holds in the $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis (i.e. it should be understood that the first entry in the vector is the coefficient corresponding to $\hat{\mathbf{x}}$, and the second entry is the coefficient corresponding to $\hat{\mathbf{y}}$). Now, let us suppose that the linear operator $A$ has eigenvectors

```{math}
\begin{align*}
\begin{split}
\mathbf{v}_1&=1 \hat{\mathbf{x}} +3 \hat{\mathbf{y}},
\mathbf{v}_2&=2 \hat{\mathbf{x}} +1 \hat{\mathbf{y}},
\end{split}
\end{align*}
```
or in vector notation (in the $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis)

```{math}
\begin{align*}
\mathbf{v}_1=\left(\begin{array}{c}1 \\3
\end{array}\right),
\quad
\mathbf{v}_2=\left(\begin{array}{c}2 \\1
\end{array}\right).
\end{align*}
```
Suppose we want to write $\mathbf{\Psi}$ in the $\mathbf{v}_1,\mathbf{v}_2$ basis. We need to find $\Psi[v_1], \Psi[v_2]$ such that

```{math}
\begin{align*}
\mathbf{\Psi}=\Psi[v_1] \mathbf{v}_1 + \Psi[v_2] \mathbf{v}_2,
\end{align*}
```
Obviously

```{math}
\begin{align*}
\mathbf{\Psi}=2 \mathbf{v}_1 + 1 \mathbf{v}_2,
\end{align*}
```
because in the $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis this gives

```{math}
\begin{align*}
\left(
\begin{array}{c}4\\7
\end{array}\right)
=
2
\left(\begin{array}{c}1\\3
\end{array}\right)
+
\left(
\begin{array}{c}2\\1
\end{array}\right).
\end{align*}
```
Thus in the $\mathbf{v}_1,\mathbf{v}_2$ basis the vector representation of $\mathbf{\Psi}$ would read

```{math}
\begin{align*}
\mathbf{\Psi}_A=
\left(\begin{array}{c}2\\1
\end{array}\right).
\end{align*}
```
Once again, we emphasize that although $\mathbf{\Psi}$ is represented with different numbers, the object itself has not changed.

Let us put our previous calculations in more general terms. We know representations of $\mathbf{\Psi}$, $\mathbf{v}_1,\mathbf{v}_2$ in the $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis

```{math}
\begin{align*}
\mathbf{\Psi}=\left(
\begin{array}{c}\Psi[x]\\\Psi[y]
\end{array}\right),
\quad
\mathbf{v}_1=
\left(\begin{array}{c}v_1[x]\\ v_1[y]
\end{array}\right),
\mathbf{v}_2=
\left(\begin{array}{c}v_2[x]\\ v_2[y]
\end{array}\right),
\end{align*}
```
we want to find $\Psi[v_1], \Psi[v_2]$ such that

```{math}
\begin{align*}
\begin{split}
\left(\begin{array}{c}\Psi[x]\\\Psi[y]
\end{array}\right)&=
\Psi[v_1]
\left( \begin{array}{c}v_1[x]\\ v_1[y]
\end{array}\right) +
\Psi[v_2]
\left( \begin{array}{c}v_2[x]\\ v_2[y]
\end{array}\right)
&=
\left(\begin{array}{cc}v_1[x] & v_2[x]\\ v_1[y] & v_2[y]
\end{array}\right)
\left(\begin{array}{c}\Psi[v_1]\\\Psi[v_2]
\end{array}\right).
\end{split}
\end{align*}
```
Here, $\Psi[x],\Psi[y]$ represent $\mathbf{\Psi}$ in the $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis, and $\Psi[v_1],\Psi[v_2]$ represent $\mathbf{\Psi}$ in the $\mathbf{v}_1,\mathbf{v}_2$ basis. Thus, defining the matrix

```{math}
\begin{align*}
B=
\left(\begin{array}{cc}v_1[x] & v_2[x]\\ v_1[y] & v_2[y]
\end{array}\right),
\end{align*}
```
to go from the $\mathbf{v}_1,\mathbf{v}_2$ representation of $\mathbf{\Psi}$ to the $\hat{\mathbf{x}},\hat{\mathbf{y}}$ representation of $\mathbf{\Psi}$, we must calculate

```{math}
\begin{align*}
\left(\begin{array}{c}\Psi[x]\\\Psi[y]
\end{array}\right)
=
B
\left(\begin{array}{c}\Psi[v_1]\\\Psi[v_2]
\end{array}\right).
\end{align*}
```
Conversely, to go from the $\hat{\mathbf{x}},\hat{\mathbf{y}}$ representation to the $\mathbf{v}_1,\mathbf{v}_2$ representation, we must calculate

```{math}
\begin{align*}
\left(\begin{array}{c}\Psi[v_1]\\\Psi[v_2]
\end{array}\right)
=
B^{-1}
\left(\begin{array}{c}\Psi[x]\\\Psi[y]
\end{array}\right).
\end{align*}
```
So now we know how to go from one basis representation to another and back. We have seen previously that it can be convenient to change to the eigenbasis of a linear operator $A$, because in that representation $A$ is diagonal. Thus we can **diagonalize** $A$ as

```{math}
:label: diagonalization
\begin{align*}
A=B
\left(\begin{array}{cc}\lambda_1 &0\\0& \lambda_2
\end{array}\right)
B^{-1}.
\end{align*}
```
To summarize, with $B^{-1}$ we go from some $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis to the eigenbasis of $A$. The columns of $B$ contain the eigenvectors of $B$ in the $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis. Then we apply the operator $A$, which in its eigenbasis is a diagonal matrix with its eigenvalues along the diagonal. Then, to go back from the eigenbasis to the $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis, we apply $B$.
This is in particular useful when one has to apply $A$ many times, because in that case

```{math}
\begin{align*}
A^N=B
\left(\begin{array}{cc}\lambda_1^N &0\\0& \lambda_2^N
\end{array}\right)
B^{-1}.
\end{align*}
```
Or, it could be useful when we want to exponentiate $A$

```{math}
\begin{align*}
\begin{split}
e^{A}&=\sum_{k=0}^{\infty} \frac{A^k}{k!}
&=B \left(\sum_{k=0}^{\infty}
\frac{\left(\begin{array}{cc}\lambda_1 &0\\0& \lambda_2
\end{array}\right)^k}
{k!}
\right)
B^{-1}
&=B
\left(\begin{array}{cc}e^{\lambda_1} &0\\0& e^{\lambda_2}
\end{array}\right)
B^{-1}.
\end{split}
\end{align*}
```
This is for example used in the solution of the Schr\"odinger equation

```{math}
\begin{align*}
\begin{split}
&\hat{H}\mathbf{\psi}=i\hbar \frac{\text{d}}{\text{d}t}\mathbf{\psi}
&\Rightarrow
&\mathbf{\psi}(t)=e^{-i\hat{H}t/\hbar}\mathbf{\psi}(0),
\end{split}
\end{align*}
```
which indicates why it's useful to describe $\mathbf{\psi}(0)$ in the energy basis if we want to find its time evolution.

There are many applications of basis transformations and eigenvalue decompositions in Optics. Suppose we know the transmission axis of a linear polarizer and let it be in the direction of the vector

$$\left(\begin{array}{c}a\\
\end{array}\right)

$$
Then all light polarized in this direction will be transmitted completely, so this vector is an eigenvector of the polarizer operator with eigenvalue 1. We know that all light polarized in the direction of the vector

$$
\left(\begin{array}{c}b\\a
\end{array}\right)

$$
(i.e. perpendicular to the transmission axis) will be completely blocked, so this is an eigenvector with eigenvalue 0. Thus, given the transmission axis of a linear polarizer, we can immediately write down its Jones matrix

```{math}
\begin{align*}
J=
\left(\begin{array}{cc}a & b\\ b & -a
\end{array}\right)
\left(
\begin{array}{cc}1 & 0\\0 & 0
\end{array}\right)
\left( \begin{array}{cc}a & b\\ b & -a
\end{array}\right)^{-1}.
\end{align*}
```
Conversely, from the eigenvalue decomposition of a Jones matrix we can immediately see what its principal axes are, and how it acts on the components along those axes, i.e. whether it is a linear polarizer, half-wave plate, quarter-wave plate, or something else.

Also, basis transformations can be used to describe **optical activity**. In optically active media, there are different refractive indices for left-circularly and right-circularly polarized light, so it is more convenient to represent the Jones vector in the basis of left-circularly and right-circularly polarized light, rather than in the basis of two linear orthogonal polarizations.

It is also interesting to note the equivalence between the Jones vector and the quantum states of photons that are used as qubits: the polarization of a photon is a two-state quantum-mechanical system. This qubit can be represented as

```{math}
\begin{align*}
\ket{\psi}=\alpha\ket{0}+\beta\ket{1},
\end{align*}
```
where $\alpha$ and $\beta$ are analogous to the entries of the Jones vector. Indeed, in experiments on quantum information with photons as qubits, wave plates are ubiquitous<sup>[^1]</sup>. Also in quantum information, it is important to be familiar with basis transformations.

Another application of basis transformations and eigenvalue decompositions in optics is in the **Angular Spectrum Method**. This method is used to propagate a field $U_0$, and it is explained in the chapter on Diffraction Optics. The operation we want to apply in this case is the propagation operator $P_{\Delta z}$ which denotes the propagation over a distance $z$. To do this, we decompose the field $U_0$ in eigenfunctions of $P_{\Delta z}$, which are plane waves $e^{i\mathbf{k} \cdot \mathbf{r}}$ because

```{math}
\begin{align*}
\begin{split}
P_{\Delta z} e^{i(k_x x + k_y y +k_z z)} &= e^{i(k_x x + k_y y +k_z (z+\Delta z))}
&=e^{i k_z \Delta z} e^{i(k_x x + k_y y +k_z z)}.
\end{split}
\end{align*}
```
So indeed, $e^{i\mathbf{k} \cdot \mathbf{r}}$ is an eigenfunction of $P_{\Delta z}$, with eigenvalue $e^{i k_z \Delta z}$. The basis transformation we need to apply in order to decompose $U_0$ into eigenfunctions of $P_{\Delta z}$ is the Fourier transform. So similarly as in Eq. {eq}`diagonalization`, to apply the propagation operator we Fourier transform $U_0$ to decompose it into eigenfunctions of $P_{\Delta z}$, we multiply each component with the eigenvalue $e^{i k_z \Delta z}$, and then we inverse Fourier transform to go back to the original basis

```{math}
\begin{align*}
P_{\Delta z} U_0 = \mathcal{F}^{-1}\{\mathcal{F}\{U_0\}e^{i k_z \Delta z}\}.
\end{align*}
```
In this framework, it can be easily understood how this method should be altered for propagation in non-homogeneous media. In that case the plane waves $e^{i\mathbf{k} \cdot \mathbf{r}}$ are no longer eigenfunctions of the propagation operator, and instead we must find the appropriate eigenfunctions and eigenvalues for propagation through such a medium.

For other explanations of basis transformations see [Khan Academy - Alternate coordinate systems (bases)](https://www.khanacademy.org/math/linear-algebra/alternate_bases/change_of_basis/v/linear-algebra-coordinates-with-respect-to-a-basis), and [Khan Academy - Showing that an eigenbasis is a useful coordinate systems](https://www.khanacademy.org/math/linear-algebra/alternate_bases/eigen_everything/v/linear-algebra-showing-that-an-eigenbasis-makes-for-good-coordinate-systems).


[^1]: See e.g. [Experimental Demonstration of Blind Quantum Computing, S. Barz et al. (2011)](http://arxiv.org/pdf/1110.1381v_1.pdf).
