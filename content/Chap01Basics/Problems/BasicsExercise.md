# Problems
1. In a homogeneous medium with permittivity $\epsilon$ and conductivity $\sigma$ and without external sources ($\mathbf{\mathcal{J}}_{ext}=\mathbf{0}$, $\varrho_{ext}=0$), derive from {eq}`eq.chargec` and {eq}`eq.gauss2` that for $t.0$

$$
\varrho_c(t) = -\varrho_c(0) e^{-t/\tau},

$$
where $\varrho_c(0)$ is the charge at time $t=0$ and $\tau=\sigma/\epsilon$ is the relaxation time. Even for a moderate conductor such as sea water, $\tau$ is only $2\times 10^{-10} s$.
This shows that the charge density corresponding to conduction currents is zero.

2. In a medium with constant permittivity $\epsilon$, magnetic permeability $\mu_0$ and conductivity $\sigma=0$ derive that every component of the magnetic field $\mathbf{\mathcal{H}}$ satisfies the wave equation.
3. In a medium with constant $\epsilon$, magnetic permeability $\mu_0$ and conductivity $\sigma$, derive that in a region without external sources the electric field satisfies:	

$$
\mathbf{\nabla}^2 \mathbf{\mathcal{E}} -\epsilon \mu_0 \frac{\partial^2 \mathbf{\mathcal{E}}}{\partial t^2} - \mu_0 \sigma \frac{\partial \mathbf{\mathcal{E}}}{\partial t}=\mathbf{0}.

$$
4. Write the expressions for the real and the complex electric and magnetic field of a time-harmonic plane wave with frequency $\omega$ and wave number $k$ which propagates in the $(x,z)$-plane with angle of $45^0$ with the positive $x$-axis and has electric field parallel to the $y$-direction with unit amplitude and such that it is maximum for $(x=z=0$ at time $t=0$.
5. Derive the Fresnel equations {eq}`eq.rp`, {eq}`eq.tp` for a p-polarized plane wave.
6. Derive the Fresnel equation {eq}`eq.rs3`, {eq}`eq.ts3`, {eq}`eq.rp3` and {eq}`eq.tp3` for the case that $k_z^i$ and $k_z^t$ are real.
7. Let a p-polarized plane wave be incident on an interface $z=0$ from $z<0$. Let there be vacuum i  n $z<0$: $\epsilon_i=\epsilon_0$ and let the permittivity in $z>0$ be $\epsilon_t>0$.
The reflected field can be considered to be radiated in vacuum by dipoles in $z>0$ with 	 density given by {eq}`eq.defP`:


$$
\mathbf{\mathcal{P}}(\mathbf{r}) = (\epsilon-\epsilon_0)\mathbf{\mathcal{E}}^t(\mathbf{r}),

$$
where $\mathbf{\mathcal{E}}^t(\mathbf{r})$ is the transmitted electric field in point $\mathbf{r}$ with $z>0$.

- **a)** According to {eq}`eq.Edipolfar` the field radiated by a dipole vanishes in the line of sight parallel to the direction of the dipole. Derive from this the relationship between the angle of reflection $\theta_r$ and the incident angle $\theta_i$ for which the reflected field vanishes.
- **b)** Show that this relationship is satisfied by the Brewster angle for a $p$-polarized incident wave but that it can not be satisfied for a $s$-polarized incident wave.

8. Consider two electric plane waves with wave vectors $\mathbf{k}_1=k_x\hat{\mathbf{x}}+k_z \hat{\mathbf{z}}$ and $\mathbf{k}_2=k_x\hat{\mathbf{x}}-k_z \hat{\mathbf{z}}$, where $k_z=\sqrt{k_0^2\epsilon-k_x^2}$, where $k_0$ is the wave number in vacuum and $\epsilon$ is the permittivity which is assumed to be real. Let both plane waves be polarized parallel to the $y$-direction and let them have real amplitudes $A_1$ and $A_2$ and suppose that they are in phase for $\mathbf{r}=\mathbf{0}$ at $t=0$.
- **a)** Write the expressions for the total complex and real electric field $\mathbf{E}$, $\mathbf{\mathcal{E}}$ and magnetic field $\mathbf{H}$ and $\mathbf{\mathcal{H}}$.
- **b)** Compute the square modulus $|\mathbf{\mathcal{E}}|^2$ of the total electric field.
- **c)** There is a standing wave as function of $z$. What is the period of this standing wave as function of the angle $\theta=2 \arctan(k_z/k_x)$ between the wave vectors? Make a sketch of this period as function of $\theta$. Note: the standing wave occurs in the direction in which the wave vectors are opposite, i.e. in this case the $z$-direction.
- **d)** Compute the time-averaged Poynting vector. Show that its $z$-component is the sum of the $z$-components of the time-averaged Poynting vectors of the individual plane waves.
This result proves that the net energy flow in the $z$-direction for the case of an incident plane wave that is partially reflected at an interface is the difference between the incident and the reflected intensities.
- **e)** The $x$-component of the Poynting vector is a function of $z$. Show that nevertheless the total flux through the boundary of any cube with faces that are perpendicular to one of the unit vectors $\hat{\mathbf{x}}$, $\hat{\mathbf{y}}$ and $\hat{\mathbf{z}}$, vanishes.

9. Consider a wave in $z<0$ that is incident on an interface $z=0$ between glass with $n_i=1.5$ in $z<0$ and air with $n_t=1$ in $z>0$. Let the wave vector of the incident wave be
$\mathbf{k}^i=k_x\hat{\mathbf{x}}+k_z^i\hat{\mathbf{z}}$ and let $k_x>k_0n_i$, so that the angle of incidence is above the critical angle.
- **a)** If the incident wave is s-polarized, derive expressions for the complex electric $\mathbf{\mathcal{E}}^t$ and magnetic $\mathbf{\mathcal{H}}^t$ field in $z>0$.
- **b)** Compute the time averaged Poynting vector in a point $\mathbf{r}$ with $z>0$.
- **c)** What is the direction of the energy flow in $z>0$?
- **d)** Explain that when the Poynting vector would have a nonzero $z$-component, this would contradict the conservation of energy.

10. \* Let an electric dipole be at the origin and let its dipole vector be parallel to the $z$-direction: $\mathbf{p}=p\hat{\mathbf{z}}$. Then $\hat{\mathbf{R}}=\hat{\mathbf{r}}$ and $R=r$ in {eq}`eq.Hdipolfar` and {eq}`eq.Edipolfar`. Let the frequency be $\omega$ and let the surrounding medium have real permittivity $\epsilon$.
- **a)** Show that at large distance to the dipole, the time-averaged Poynting vector is given by

$$
\mathbf{S}(\mathbf{r})= \left(\frac{\mu_0}{\epsilon_0}\right)^{\frac{1}{2}} n \frac{\omega^4 p^2}{32\pi^2 c^2} \left| \hat{\mathbf{r}} \times \hat{\mathbf{z}} \right|^2 \frac{\hat{\mathbf{r}}}{r^2},

$$
where $n=\sqrt{\epsilon}$ is the refractive index.
- **b)** Show that the totally radiated power is:

$$
P= \left(\frac{\mu_0}{\epsilon_0}\right)^{1/2} n \frac{\omega^4p^2}{12 \pi c^2}.

$$
Hint: integrate over a sphere $r=\text{constant}$ using spherical coordinates $\mathbf{r}=r\sin \theta \cos\varphi \hat{\mathbf{x}}+ r\sin\theta \sin \varphi \hat{\mathbf{y}}+r \cos \theta \hat{\mathbf{z}}$.
- **c)** For a given dipole vector, the radiated power increases with the fourth power of the frequency. Explain with this property why the clear sky is blue.
