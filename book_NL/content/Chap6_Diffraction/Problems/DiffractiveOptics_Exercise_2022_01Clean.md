## Opgaven

1. Beschouw een uitstralende tijdharmonische puntbron in $\mathbf{r}_1=(x_1,0,0)$. Het complexe veld in het punt van waarneming $\mathbf{r}=(x,y,z)$, waarbij $z>0$, wordt gegeven door:

```{math}
\begin{align*}
U_1(x,y,z) = Q_1 \frac{e^{ik \sqrt{(x-x_1)^2 + y^2 + z^2}}}{\sqrt{(x-x_1)^2 + y^2 + z^2}}.
\end{align*}
```
waarin $Q_1$ een gegeven complex getal is waarvan de modulus evenredig is met de bronsterkte.

- **a)** Leid af dat voor vaste $z_1$ en voor voldoende grote $z>0$ het veld kan worden benaderd door

```{math}
:label: eq.cohps
\begin{align*}
U_{1,far}(x,y,z) = Q_1 \frac{e^{ik z}}{z} e^{i k\frac{x^2+ y^2}{2z}} e^{-i \frac{k x_1 x}{z}}.
\end{align*}
```
 
- **b)** Laat er een tweede puntbron zijn op $\mathbf{r}_2=(x_2,0,0)$, met complexe bronsterkte $Q_2$ met
$|Q_2|=|Q_1|$. We gaan ervan uit dat beide puntbronnen coherent zijn. Dit betekent dat er $\phi$ is, zodanig dat
$Q_2=Q_1 e^{i \phi}$.
Toon aan dat het veld in $(x,y,z)$, voor $z>0$ groot, vanwege de twee puntbronnen kan worden geschreven als

```{math}
:label: eq.cohps_2
\begin{align*}
U(x,y,z) \approx U_{1,far}(x,y,z)\left( 1 + e^{i\phi} e^{i \frac{k \Delta x x}{z}} \right),
\end{align*}
```
waarbij $\Delta x = x_1-x_2$.
 
- **c)** Voor welke hoeken $\theta=x/z$ verdwijnt de intensiteit in het verre veld? Toon aan dat de afstand tussen de puntbronnen $\Delta x$ kan worden bepaald uit de hoekscheiding van de nullen van de intensiteit. Is de hoekscheiding afhankelijk van het faseverschil $\phi$?
 
- **d)** Wat zou het faseverschil moeten zijn tussen de puntbronnen, zodat voor $x/z=0$ op het scherm op grote afstand $z $ de intensiteit verdwijnt?
 

6. Beschouw twee spleten van gelijke breedte $a$ in een niet-transparant scherm met een dikte $d$ in het vlak $z=0$ zoals weergegeven in {numref}`Fig_7_24_Two_slits`. Het scherm wordt verlicht door een vlakke golf met eenheidsamplitude en voortplanting in de positieve $z$-richting.
In de tweede spleet bevindt zich een stuk glas met brekingsindex $n$ en dikte $d$.
In de eerste spleet bevindt zich vacuüm.

```{figure} Images/Tutorial_6/Ex_6_01_Two_slits_glass.png
:name: Fig_7_24_Two_slits
Twee spleten gecentreerd op $y=0$ en zeer lang in de $y$-richting in een donker scherm met een dikte van $d$. De onderste spleet is gevuld met glas, de bovenste is in vacuüm.
```

- **a)** Als het veld direct achter spleet 1 een complexe amplitude heeft die gelijk is aan $1$, leg dan uit dat de veld direct na achter 2 wordt gegeven door

```{math}
\begin{align*}
e^{ i \phi}
\end{align*}
```
met
$\phi= k (n-1)d$.
 
- **b)** Leid af (met behulp van {eq}`eq.cohps` of op een andere manier) dat het Fraunhofer-intensiteitspatroon op een scherm langs de lijn $y=0$
op grote afstand wordt $z$ gegeven door (tot factoren die niet afhankelijk zijn van $x/z$).

```{math}
:label: eq.2cohps_3
\begin{align*}
I_{far}(x,0,z) = 2 \frac{a^2}{z^2} \left[ \frac{\sin \left(\frac{kax}{2z}\right)}{\frac{kax}{2z}}\right]^2 \left[ 1 + \cos\left( \frac{k b x}{z} +\phi\right)\right].
\end{align*}
```
Bij het afleiden van dit resultaat mag je alle factoren weglaten die onafhankelijk zijn van $x/z$ en $y/z$.
Als je {eq}`eq.cohps_2` gebruikt, mag je $Q_1=1$, $Q_2=e^{i \phi}$ nemen.
 
- **c)** Maak een schets van dit intensiteitspatroon, met de nullen en maxima als functie van $\theta=x/z$ wanneer $a=2 \lambda$,
$b=4 \lambda$ en $\phi=-\pi/2$. Leg uit waar de omhulling en de andere factor die afhangt van $x/z$ worden veroorzaakt.
 

10. We beschouwen de optische opstelling links in {numref}`Fig_7_25_Lloyd_Mirror` waar een puntbron is
op punt $\mathbf{r}_s=(a, 0,0)$ boven een vlakke spiegel in het vlak $x=0$.
Het tijdharmonische veld dat door de puntbron **wordt uitgezonden zonder dat de spiegel aanwezig is** wordt in complexe notatie gegeven door:

```{math}
\begin{align*}
U_s(x,y,z,t)= \frac{e^{i k \sqrt{ (x-a)^2 + y^2 + z^2}-i \omega t}}{\sqrt{(x-a)^2 + y^2 + z^2}}.
\end{align*}
```

```{figure} Images/Tutorial_6/Ex_6_02_Lloyd_Mirror.png
:name: Fig_7_25_Lloyd_Mirror
Lloyd spiegelconfiguratie met een puntbron (links) en een rechthoekig diafragma in een donker scherm (rechts), boven een spiegel en met een scherm op afstand $z$ waar het veld wordt waargenomen.
```


- **a)** $U_r$ is het veld dat door de spiegel wordt weerkaatst. Ga ervan uit dat de spiegel perfect is, zodat het totale veld
$U_s(x,y,z)+U_r(x,y,z)$ nul id op het oppervlak van de spiegel, d.w.z. wanneer $x=0$. Laat zien dat het weerspiegelde veld $U_r$
kan worden beschouwd als uitgezonden door een puntbron in $(-a,0,0)$, die het beeld is van de oorspronkelijke puntbron door de spiegel, en die **uit fase** is met de oorspronkelijke puntbron en de **dezelfde sterkte** heeft.
 

- **b)**
Beschouw het veld op een scherm op $z>0$. Volgens (a) kan het veld in aanwezigheid van de spiegel worden geacht te worden uitgestraald door twee puntbronnen, namelijk op $(a,0,0)$ en $(-a,0,0)$, die even sterk en uit fase met elkaar zijn. Veronderstel dat $z$ zo groot is dat de sferische golven die door deze puntbronnen worden uitgezonden en die aankomen op het scherm beide kunnen worden beschouwd als vlakke golven. Leid af dat het punt op het scherm
$(x,0,z)$ met kleinste $x>0$ waarbij het veld nul is, wordt gegeven door

```{math}
:label: eq. Lloyd1
\begin{align*}
x= \frac{\lambda}{2a} z,
\end{align*}
```
waarbij $\lambda$ de golflengte is. Gebruik in je afleiding padlengteverschillen van storende stralen en maak een tekening.
 

- **c)** Wat gebeurt er met deze nul en met het franjepatroon op het scherm wanneer de perfecte spiegel wordt vervangen door een diëlektricum zoals een stuk glas?
 

- **d)** 
Stel nu dat er een tweede puntbron is op $(2a,0,0)$ boven de spiegel en stel dat deze dezelfde sterkte heeft en in fase is met de puntbron in $(a,0,0)$.
Ga er opnieuw van uit dat de spiegel perfect reflecteert leid af (opnieuw door rekening te houden met de verschillen in padlengte en met behulp van een tekening) dat de kleinste $x>0$ waarvoor een nul komt voor in punt $(x,0,z)$ op het scherm wordt gegeven door

```{math}
\begin{align*}
x= \frac{\lambda}{3a}z
\end{align*}
```
 

- **e)** 
Leid de kleinste $x>0$ af waarvoor het veld nul is in $(x,0,z)$ wanneer de twee puntbronnen op $(a,0,0)$ en $(2a,0,0)$ onderling incoherent zijn. Gebruik opnieuw de verschillen in padlengte en maak een tekening.
 

- **f)** 
Veronderstel vervolgens dat er een vierkante opening is met het midden op $(a,0,0)$ en zijden met een lengte $b<a$ evenwijdig aan de $x$- en $y$-richtingen in een ondoorzichtig (d.w.z. donker) scherm boven de spiegel, zoals rechts van de spiegel wordt weergegeven in afb. {numref}`Fig_7_25_Lloyd_Mirror`. Het diafragma wordt verlicht door een vlakke golf die zich evenwijdig aan de $z$-as voortplant, vandaar dat het veld in het diafragma een constante fase en amplitude heeft. Bereken de kleinste positieve $x$ waarvoor een nul voorkomt op $(x,0,z)$ op het scherm op grote afstand $z>0$.
Gebruik opnieuw padlengteverschillen en een tekening in je afleiding.
 

4. Opmerking: om de volgende vragen te beantwoorden is het **NOT** nodig om diffractie-integralen te berekenen.


- **a)** Beschouw twee even sterke puntbronnen die ten opzichte van een coördinatensysteem $(x,y,z)$ gelijk zijn aan $(-a/2,0,0)$ en $(a/2,0,0)$, waarbij de $z$-as de optische as is. Stel dat de puntbronnen onderling coherent zijn en veronderstel dat ze in fase uitzenden. De maximale intensiteit op een scherm op grote afstand (d.w.z. Fraunhofer) ligt dan op de optische as.
Toon aan dat de kleinste hoek met de optische as waarop er een nul is op dit scherm wordt gegeven door $\lambda/(2a)$.

- **b)** Wat is de kleinste hoek met de optische as waarvoor er een nul is op het scherm wanneer de twee puntbronnen stralen met een faseverschil van $\pi/2$?

- **c)** Zijn er nullen op het scherm als de twee puntbronnen onderling onsamenhangend zijn?

- **d)** Beschouw nu twee identieke diafragma's in een ondoorzichtig scherm op $z=0$. Het midden van het ene diafragma ligt op $(-a/2,0,0)$ en het andere diafragma op $(a/2,0,0)$. De openingen worden verlicht door een tijdharmonische vlakke golf die loodrecht op het scherm staat (d.w.z. evenwijdig aan de $z$-as voortplant).
Leg uit dat, ongeacht de vorm van deze openingen, de kleinste hoek waarvoor een nul voorkomt in de intensiteit van het verre veld $\lambda/(2a)$ is.
 
- **e)**  Stel dat de vlakke golf invalt onder een hoek die afwijkt van $90^o$. Laat het complexe veld worden gegeven door

```{math}
\begin{align*}
U(x,z)= e^{i (k_x x + k_z z)}
\end{align*}
```
waarbij $\sqrt{k_x^2+k_z^2}=k$. Stel dat $k_x a =\pi/2$ (modulo $2\pi$). Wat is nu de kleinste hoek waar een nul op het scherm in het verre veld voorkomt? Leg je antwoord uit.
 
- **f)** Stel je nu voor dat beide (identieke) openingen gevuld zijn met glasplaten met een dikte die varieert met de positie. De twee glasplaten zijn identiek en ze zijn identiek gepositioneerd in elk van de twee diafragma's. Stel je voor dat we de openingen verlichten met een vlakke golf bij loodrechte inval. Het veld dat door elke opening wordt uitgezonden, is nu een nogal gecompliceerde functie van de positie, maar de uitgezonden velden achter beide openingen zijn identiek. Verdwijnt de intensiteit van het verre veld nog steeds voor hoek $\lambda/(2a)$ of wordt deze gewijzigd door de aanwezigheid van de glasplaten? Leg je antwoord uit.
 

5. Bessel balken. 

Stel dat er een masker is in de intredepupil met straal $a$ van een positieve dunne lens met een brandpuntsafstand van het beeld $f_i$ met een dunne ringvormige opening op $r=b$ met breedte $\Delta r$. Als een vlakke golf met amplitude $A$ loodrecht op het masker valt, wordt het veld direct achter het masker gegeven door

```{math}
\begin{align*}
U_{Bessel}(x,y)= \left\{ \begin{array}{l}Een\;\;\; \text{ if } b-\Delta r < \sqrt{x^2+y^2}<b, \\0, \;\;\; \text{ anders}
\end{array}\right.
\end{align*}
```

- **a)** Gebruik de integraal

```{math}
\begin{align*}
\int_0^{2\pi} e^{i \zeta \cos \psi} \mathrm{d}\psi = 2\pi J_0(\zeta).
\end{align*}
```
om af te leiden dat voor een voldoende kleine $\Delta r$, het veld in het brandpuntsvlak in goede benadering is gegeven door

```{math}
\begin{align*}
U_{Bessel}(x,y,f_i)= 2\pi A b \Delta r J_0\left( k \frac{b r}{f}\right).
\end{align*}
```
 
- **b)** De op deze manier verkregen straal wordt een Bessel-straal genoemd. Leg uit waarom deze straal een zeer lange brandpuntsdiepte heeft.
 
- **c)** Stel dat de Airy-vlek verkregen door focussering van een eenheidsamplitudevlakke golf en de Bessel-straal dragen dezelfde hoeveelheid energie. Toon aan dat dan de amplitude van de Bessel-straal wordt gegeven door

```{math}
\begin{align*}
A = \frac{a}{\sqrt{2 b \Delta r}}
\end{align*}
```
 
- **d)**
Leid af dat de verhouding van de veldamplitudes in het brandpunt van de Besselbundel i: $U_{Bessel}(0,0,f_i)$ en de Airy spot: $U_{Luchtig}(0,0,f_i)$ wordt gegeven door

```{math}
\begin{align*}
\frac{U_{Bessel}}{U_{Airy}} = \frac{\sqrt{2 b \Delta r}}{ a}.
\end{align*}
```
Als $b=a$ en $\Delta r=0,1 a$ wordt dit

```{math}
\begin{align*}
\frac{U_{Bessel }}{U_{Airy}} = \sqrt{\frac{2 \Delta r}{ a}} \approx 0.44,
\end{align*}
```
wat het geval is in {numref}`Fig.Besselplot`.
 


```{figure} Images/Tutorial_6/Ex_6_03_BesselPlot.png
:name: Fig.Besselplot
Amplitude in het brandpuntsvlak van een Bessel-bundel en van een Airy-spot met dezelfde totale energie. De lenspupil heeft een diameter $a=10000 \lambda$, de ringopening van de Bessel-straalbehuizing bevindt zich aan de buitenrand van de pupil ($b=a$) en heeft breedte $\Delta r = 0,1 a$ en de $\text{NA}=0,1$.
```

- **e)**
De Bessel balk heeft sterkere zijlobben dan de Airy spot. Leg uit waarom.
 


6. \* Stellaire interferometrie. 

We beschouwen de emissie door een ster van licht van een smalle frequentieband met middenfrequentie $\mathbf{a}r{\omega}$ en bijbehorende golflengte $\mathbf{a}r{\lambda}=c 2\pi/\mathbf{a}r{\omega}$
De ster is een uitgebreide ruimtelijk incoherente bron. Laat $I(x,y)$ de intensiteit zijn op het oppervlak van de ster gericht op de aarde. Het doel van de opgave is om $I(x,y)$ te bepalen door middel van stellaire interferometrie.

Laat $U_0(x,y,t)$ het veld zijn dat aan het oppervlak van de ster wordt uitgezonden. Dan is de onderlinge coherentiefunctie op de punten $S_1=(x_1,y_1)$, $S_2=(x_2, y_2)$ op het oppervlak van de ster:

```{math}
\begin{align*}
\Gamma(S_1,S_2, \tau)&= \braket{ U_0(S_1,t)^* U_0(S_2,t+\tau)}  \\
&=
I(x_1,y_1) e^{i \omega \tau} \delta(x_1- x_2)\delta(y_1- y_2) \;\;\; \text{ voor alle } \tau.
\end{align*}
```

- **a)** Laat $z_e$ de afstand van de ster tot de aarde zijn. Gebruik de quasi-monochromatische benadering om het veld af te leiden in een punt $P_e=(x_e,y_e)$ op aarde.
 
- **b)** Toon aan dat de onderlinge coherentiefunctie in twee punten $P_e=(x_e,y_e)$ en $\tilde{P}_2=(\tilde{x}_e, \tilde{y}_e)$ op aarde voor $\tau=0$ gegeven wordt door

```{math}
\begin{align*}
\Gamma(P_e, \tilde{P}_e,\tau=0) = \int\int I(x_1,y_1) e^{2\pi i \left( \frac{x_e - \tilde{x}_e }{\mathbf{a}r{\lambda} z_e} x_1 +
\frac{y_e -\tilde{y}_e }{\mathbf{a}r{\lambda} z_e}y_1\right) } \, dx_1 dy_1.
\end{align*}
```
d.w.z. de wederzijdse coherentiefunctie tussen punten op aarde voor tijdsvertraging $\tau=0$ kan worden uitgedrukt in de Fouriertransformatie van de intensiteit $I(x,y)$ die door de ster wordt uitgezonden, geëvalueerd op ruimtelijke frequenties $\xi=\frac{x_e - \tilde{x}_e }{\mathbf{a}r{\lambda} z_e} $ en $\eta=\frac{y_e -\tilde{y}_e }{\mathbf{a}r{\lambda} z_e}$.
 
- **c)** Leg uit hoe de onderlinge coherentie voor tijdsvertraging $\tau=0$ op aarde gemeten kan worden met behulp van interferometrie en hoe dit kan leiden tot het achterhalen van de intensiteit van de ster.
 
- **d)**Wat bepaalt de resolutie die kan worden bereikt?

