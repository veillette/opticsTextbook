(chapter.polarisation)=
# Polarisatie

```{admonition} Wat je moet weten en kunnen na het bestuderen van dit hoofdstuk
- Begrijpen hoe verschillende polarisatietoestanden verband houden met de verhouding van de amplitudes en het faseverschil tussen twee orthogonale componenten van het elektrische veld.
- Weten dat elliptische polarisatie de meest algemene staat van polarisatie is.
- Weten dat lineaire polarisatie en circulaire polarisatie speciale gevallen zijn.
- Weten hoe je de mate van polarisatie moet berekenen.
- In staat zijn om te werken met Jones-vectoren en Jones-matrices.
- Weten hoe dubbele breking wordt gebruikt om golfplaten te maken en ken de soorten golfplaten.
- Weten hoe je een toestand van lineaire polarisatie over een bepaalde hoek kunt roteren.
- Weten hoe je lineaire polarisatie om zet in circulaire polarisatie en omgekeerd.
- In staat zijn om aan te tonen dat elliptische polarisatie kan worden geschreven als de som van twee orthogonale lineaire polarisaties en als de som van twee circulaire polarisaties.
```



## Polarisatietoestanden en Jones-vectoren
We hebben in hoofdstuk {eq}`chapter.basics` gezien dat licht een elektromagnetische golf is die voldoet aan de vergelijkingen van Maxwell en de daarvan afgeleide golfvergelijking. Aangezien het elektrisch veld een vector is die als functie van de tijd in een bepaalde richting oscilleert, zeggen we dat de golf een bepaalde polarisatie heeft. In dit hoofdstuk kijken we naar de verschillende soorten polarisatie en hoe de polarisatie van een lichtstraal gemanipuleerd kan worden.

We beginnen met Eqs. {eq}`eq.bcE2`, {eq}`eq.defbE` en {eq}`eq.orth` die laten zien dat het (reële) elektrische veld $\mathbf{\mathcal{E}}(\mathbf{r},t)$ van een tijdharmonische vlakke golf altijd loodrecht staat op de voortplantingsrichting, dat is de richting van de golfvector $\mathbf{k}$ en de richting van de Poynting-vector (de richting van de krachtstroom). Laat de golf zich voortplanten in de $z$-richting:

```{math}
:label: eq.wavek
\begin{align*}
\mathbf{k}=
\left( \begin{array}{c}0\\0\\ k
\end{array}\right).
\end{align*}
```
Dan heeft de elektrische veldvector geen $z$-component en dus kan het reële elektrische veld op $z$ en op tijdstip $t$ worden geschreven als

```{math}
:label: eq. Evec
\begin{align*}
\mathbf{\mathcal{E}}(z,t) = \left(\begin{array}{c}{\cal A}_x \cos(kz-\omega t + \varphi_x) \\{\cal A}_y \cos(kz-\omega t + \varphi_y) \\0
\end{array}\right).
\end{align*}
```
waar ${\cal A}_x$ en ${\cal A}_y$ positieve amplitudes zijn en $\varphi_x$, $\varphi_y$ de fasen van de elektrische veldcomponenten. Hoewel $k$ en $\omega$ vast zijn, kunnen we ${\cal A}_x$, ${\cal A}_y$, $\varphi_x$ en $\varphi_y$ variëren. Deze mate van vrijheid is de reden waarom er verschillende polarisatietoestanden bestaan: **de polarisatietoestand wordt bepaald door de verhouding van de amplitudes en door het faseverschil $\varphi_y-\varphi_x$ tussen de twee orthogonale componenten van de lichtgolf**. Het variëren van de hoeveelheid $\varphi_y-\varphi_x$ betekent dat we ${\cal E}_y(\mathbf{r},t)$ 'verschuiven' ten opzichte van ${\cal E}_x(\mathbf{r},t)$ <sup>[^1]</sup>. Beschouw het elektrische veld in een vast vlak $z=0$:

```{math}
\begin{align*}
\begin{split}
\left(\begin{array}{c}{\cal E}_x(0,t) \\{\cal E}_y(0,t)
\end{array} \right)
&= \left( \begin{array}{c}{\cal A}_x \cos(-\omega t + \varphi_x) \\{\cal A}_y \cos(-\omega t + \varphi_y)
\end{array}\right)
&=\text{Re}\left\{
\left( \begin{array}{c}{\cal A}_x e^{i\varphi_x} \\{\cal A}_y e^{i\varphi_y}
\end{array}\right)
e^{-i\Omega t}
\right\}
&= \text{Re}\left\{ \left(\begin{array}{c}E_x(0) \\E_y(0)
\end{array}\right) e^{-i \omega t} \right\},
\end{split}
\end{align*}
```
De complexe vector

```{math}
:label: eq.defJones
\begin{align*}
{\mathbf J}=
\left(\begin{array}{c}E_x(0) \\E_y(0)
\end{array}\right) =
\left(\begin{array}{c}{\cal A}_x e^{i\varphi_x} \\{\cal A}_y e^{i\varphi_y}
\end{array}\right),
\end{align*}
```
wordt de **Jones-vector** genoemd. Het wordt gebruikt om de polarisatietoestand te karakteriseren.
Laten we eens kijken hoe, op een vaste positie in de ruimte, de elektrische veldvector zich gedraagt als een functie van de tijd voor verschillende keuzes van ${\cal A}_x$, ${\cal A}_y$ en $\varphi_y-\varphi_x$.

**a) Lineare polarisatie:** $\varphi_y-\varphi_x=0$ of $\varphi_y-\varphi_x=\pi$.
Wanneer $\varphi_y-\varphi_x=0$ hebben we

```{math}
:label: eq. Jlinpol
\begin{align*}
{\mathbf J}=
\left(\begin{array}{c}{\cal A}_x \\{\cal A}_y
\end{array}\right) e^{i \varphi_x}.
\end{align*}
```
Gelijkheid van de fasen: $\varphi_y=\varphi_x$, betekent dat de veldcomponenten ${\cal E}_x(z,t)$ en ${\cal E}_y(z,t)$ in fase zijn: wanneer ${\cal E}_x(z,t)$ groot is, ${\cal E}_y(z,t)$ groot is, en wanneer ${\cal E}_x(z,t)$ klein is, is ${\cal E}_y(z,t)$ klein. We kunnen schrijven

```{math}
\begin{align*}
\left(\begin{array}{c}{\cal E}_x(0,t) \\{\cal E}_y(0,t)
\end{array}\right)
= \left(\begin{array}{c}{\cal A}_x \\{\cal A}_y
\end{array}\right)
\cos(\omega t-\varphi_x),
\end{align*}
```
wat aantoont dat voor $\varphi_y-\varphi_x=0$ het elektrische veld gewoon oscilleert in één richting gegeven door de reële vector ${\cal A}_x \hat{\mathbf{x}} + {\cal A}_y \hat{\mathbf{y}}$.
Zie afb. {numref}`fig:linpol`.

Als $\varphi_y-\varphi_x=\pi$ hebben we

```{math}
:label: eq. Jlinpol2
\begin{align*}
{\mathbf J}=
\left( \begin{array}{c}{\cal A}_x \\-{\cal A}_y
\end{array}\right) e^{i \varphi_x}.
\end{align*}
```
In dit geval zijn ${\cal E}_x(z,t)$ en ${\cal E}_y(z,t)$ uit fase en oscilleert het elektrische veld in de richting die wordt gegeven door de reële vector ${\cal A}_x \hat{\mathbf{x}} - {\cal A}_y \hat{\mathbf{y}}$.

**b) Circulaire polarisatie:** $\varphi_y-\varphi_x=\pm \pi/2$, ${\cal A}_x={\cal A}_y$. 
In dit geval is de Jones-vector:

```{math}
:label: eq. Jcircpol
\begin{align*}
{\mathbf J}=
\left(\begin{array}{c}1 \\\pm i
\end{array}\right) {\cal A}_x e^{i \varphi_x}.
\end{align*}
```
De veldcomponenten ${\cal E}_x(z,t)$ en ${\cal E}_y(z,t)$ zijn $\pi/2$ radiaal (90 graden) uit fase: wanneer ${\cal E}_x(z,t)$ groot is, ${\cal E}_y(z,t)$ klein is, en wanneer ${\cal E}_x(z,t)$ klein is, is ${\cal E}_y(z,t)$ groot. We kunnen voor $z=0$ met $\varphi_x=0$ schrijven dat:

```{math}
:label: eq.circpol
\begin{align*}
\begin{split}
\left(
\begin{array}{c}{\cal E}_x(0,t) \\{\cal E}_y(0,t)
\end{array}\right)
&=
\left(\begin{array}{c}{\cal A}_x \cos(-\omega t)\\{\cal A}_x \cos(-\omega t \pm \pi/2)
\end{array}\right)
&=
{\cal A}_x
\left(\begin{array}{c}\cos(\omega t)\\\pm \sin(\omega t)
\end{array}\right).
\end{split}
\end{align*}
```
Op een bepaalde positie beweegt de elektrische veldvector langs een cirkel naarmate de tijd verstrijkt. Wanneer voor een waarnemer die naar de bron kijkt, het elektrische veld tegen de klok in draait, wordt de polarisatie **links-circulair gepolariseerd** genoemd (+ teken in {eq}`eq.circpol`), terwijl als de elektrische vector met de klok mee beweegt, de polarisatie **rechts-circulair gepolariseerd** wordt genoemd (- teken in {eq}`eq.circpol`).

**c) Elliptische polarisatie:** $\varphi_y-\varphi_x=\pm \pi/2$, ${\cal A}_x$ en ${\cal A}_y$ willekeurig.
De Jones-vector is:

```{math}
:label: eq. Jellipspol
\begin{align*}
{\mathbf J}=
\left(\begin{array}{c}{\cal A}_x \\\pm i {\cal A}_y
\end{array} \right) e^{i \varphi_x}.
\end{align*}
```
In dit geval krijgen we in plaats van {eq}`eq.circpol` (waarbij we weer $\varphi_x=0$) nemen:

```{math}
\begin{align*}
\begin{split}
\left(\begin{array}{c}{\cal E}_x(0,t) \\{\cal E}_y(0,t)
\end{array}\right)
&=
\left( \begin{array}{c}{\cal A}_x \cos(\omega t)\\\pm {\cal A}_y\sin(\omega t)
\end{array}\right).
\end{split}
\end{align*}
```
waaruit blijkt dat de elektrische vector langs een ellips beweegt met grote en kleine assen evenwijdig aan de $x$- en $y$-as. Wanneer het +-teken van toepassing is, wordt het veld links-elliptisch gepolariseerd genoemd, anders wordt het rechts-elliptisch gepolariseerd genoemd.

**d) Elliptische polarisatie:** $\varphi_y-\varphi_x=$ al het andere, ${\cal A}_x$ en ${\cal A}_y$ willekeurig.
De Jones vector is nu de meest algemene:

```{math}
:label: eq. Jellips2pol
\begin{align*}
{\mathbf J}=
\left(\begin{array}{c}{\cal A}_x e^{i \varphi_x} \\{\cal A}_y e^{i \varphi_y}
\end{array}\right).
\end{align*}
```
Het kan worden aangetoond dat de vector van het elektrische veld altijd langs een ellips beweegt.
De exacte vorm en oriëntatie van deze ellips varieert met het verschil in fase $\varphi_y-\varphi_x$ en de verhouding van de amplitude ${\cal A}_x,{\cal A}_y$ en, behalve wanneer $\varphi_y-\varphi_x = \pm \pi/2$, de lange en korte as van de ellips niet evenwijdig zijn aan de $x$- en $y$-as. Zie afb. {numref}`fig:ellpol`.

**Opmerkingen**.
- Vaak wordt de Jones-vector zodanig genormaliseerd dat

```{math}
:label: eq. Genormaliseerd
\begin{align*}
|J_x|^2 + |J_y|^2 =1.
\end{align*}
```
De genormaliseerde vector vertegenwoordigt natuurlijk dezelfde polarisatietoestand als de niet-genormaliseerde. Over het algemeen verandert het vermenigvuldigen van de Jones-vector met een complex getal de polarisatietoestand niet. Als we bijvoorbeeld vermenigvuldigen met $e^{i\theta}$, heeft dit hetzelfde resultaat als het veranderen van het moment dat $t=0$, dus het verandert de polarisatietoestand niet. Eigenlijk geldt dat:

```{math}
:label: eq.shift_t
\begin{align*}
\mathbf{\mathcal{E}}(0,t) = \text{Re} \left[ e^{i \theta} \mathbf{J} e^{-i\omega t} \right] = \text{Re} \left[ \mathbf{J} e^{-i\omega( t- \theta/\omega)}\right]
\end{align*}
```

- We zullen in sectie {numref}`sec:angularspectrum` laten zien dat een algemeen tijdharmonisch elektromagnetisch veld een superpositie is van vlakke golven met golfvectoren van dezelfde lengte die worden bepaald door de frequentie van de golf, maar met verschillende richtingen. Een voorbeeld is het elektromagnetische veld in de buurt van het brandpuntsvlak van een sterk convergerende lens. Er is dan geen bepaalde voortplantingsrichting waarop het elektrische veld loodrecht moet staan. Met andere woorden, er is geen voor de hand liggende keuze voor een vlak waarin het elektrische veld oscilleert als functie van de tijd. Desalniettemin kan worden aangetoond dat voor elk punt in de ruimte zo'n vlak bestaat, maar dat de oriëntatie van het vlak in het algemeen varieert met de positie.
Bovendien beweegt het elektrische veld in een bepaald punt langs een ellips in het overeenkomstige vlak, maar de vorm van de ellips en de oriëntatie van de hoofdas kunnen willekeurig zijn.
We kunnen concluderen dat in elk punt van een willekeurig tijdharmonisch elektromagnetisch veld, de elektrische (en in feite ook de magnetische) veldvector als functie van de tijd een ellips in een of ander vlak voorschrijft die afhankelijk is van de positie <sup>[^2]</sup>. In dit hoofdstuk beschouwen we alleen het veld en de polarisatietoestand van een enkele vlakke golf.


```{figure} Images/Chapter_4/4_01_Dphi_000pi_f1_BW.png
:name: fig:linpol
```

```{figure} Images/Chapter_4/4_02_Dphi_05pi_f1_BW.png
:name: fig:circpol
```

```{figure} Images/Chapter_4/4_03_Dphi_025pi_f1_BW.png
:name: fig:ellpol
Illustratie van verschillende soorten polarisatie. Boven: lineaire polarisatie; midden: circulaire polarisatie; onder: elliptische polarisatie. De horizontale en verticale pijlen geven de kortstondige veldcomponenten ${\cal E}_x, {\cal E}_y$ aan. De dikke pijl geeft de vector $\mathbf{\mathcal{E}}$ aan. De zwarte curve geeft de baan van $\mathbf{\mathcal{E}}(t)$aan.
```


```{admonition} Externe bron
- [KhanAcademy - Polarisatie van licht, lineair en circulair](https://www.khanacademy.org/science/physics/light-waves/introduction-to-light-waves/v/polarization-of-light-linear-and-circular): Uitleg van verschillende polarisatietoestanden en hun toepassingen.
```

## Polarisatietoestanden creëren en manipuleren
We hebben gezien hoe de vergelijkingen van Maxwell het bestaan van vlakke golven met veel verschillende polarisatietoestanden mogelijk maken. Maar hoe kunnen we deze staten creëren, en hoe manifesteren deze staten zich?

Natuurlijk licht heeft vaak geen duidelijke polarisatie. In plaats daarvan fluctueert de polarisatie snel met de tijd.
Om zulk willekeurig gepolariseerd licht om te zetten in lineair gepolariseerd licht in een bepaalde richting, moeten we het licht dat in de loodrechte richting is gepolariseerd doven. Het resterende licht wordt vervolgens lineair gepolariseerd in de gewenste richting. Men zou dit kunnen doen door gebruik te maken van licht dat wordt gereflecteerd onder de Brewster-hoek (die p-gepolariseerd licht dooft), of men zou licht door een dichroïsch kristal kunnen laten gaan, een materiaal dat licht gepolariseerd loodrecht op zijn zogenaamde optische as absorbeert.
Een derde methode is het sturen van het licht door een draadrasterpolarisator, die bestaat uit een metalen rooster met spleten onder de golflengte. Zo'n rooster brengt alleen de elektrische veldcomponent over die loodrecht op de spleten staat.

Stel dus dat we met een van deze methoden lineair gepolariseerd licht hebben verkregen. Dan ontstaat de vraag hoe de toestand van lineaire polarisatie kan worden veranderd in circulair of elliptisch gepolariseerd licht? Of hoe de toestand van lineaire polarisatie over een bepaalde hoek kan worden gedraaid? We hebben gezien dat de polarisatietoestand afhangt van de verhouding van de amplitudes en van het faseverschil $\varphi_y-\varphi_x$ van de orthogonale componenten ${\cal E}_y$ en ${\cal E}_x$ van het elektrische veld. Dus, om lineair gepolariseerd licht te veranderen in een andere polarisatietoestand, moet een bepaalde faseverschuiving (bijvoorbeeld $\Delta \varphi_x$) worden geïntroduceerd in een component (bijvoorbeeld ${\cal E}_x$), en een andere faseverschuiving $\Delta \varphi_y$ naar de orthogonale component ${\cal E}_y$. We kunnen dit bereiken met een **dubbelbrekend kristal**, zoals calciet.
Het bijzondere aan zo'n kristal is dat het twee brekingsindices heeft: licht dat in een bepaalde richting is gepolariseerd, ervaart een brekingsindex $n_o$, terwijl licht dat loodrecht daarop is gepolariseerd een andere brekingsindex $n_e$ voelt (de subscripts $o$ en $e$ staan voor "ordinary" en "extraordinary", maar voor ons doel hoeven we deze terminologie niet te begrijpen). De richting waarvoor de brekingsindex *kleinste* is (die zowel $n_o$ als $n_e$ kan zijn) wordt de **snelle as** genoemd omdat de fasesnelheid het grootst is, en de andere richting is de **langzame as**. Omdat er twee verschillende brekingsindices zijn, kan men dubbele beelden zien door een dubbelbrekend kristal<sup>[^3]</sup>. Het verschil tussen de twee brekingsindices $\Delta n=n_e-n_o$ wordt de **birefringence** genoemd.

Stel dat $n_e>n_o$ en dat de snelle as, die overeenkomt met $n_o$, is uitgelijnd met ${\cal E}_x$, terwijl de langzame as (die dan brekingsindex $n_e$ heeft) is uitgelijnd met ${\cal E}_y$. Als de golf een afstand $d$ door het kristal aflegt, zal ${\cal E}_y$ een fase $\Delta \varphi_y=\frac{2\pi n_e}{\lambda}d$, en ${\cal E}_x$ zal een fase $\Delta \varphi_x=\frac{2\pi n_o}{\lambda}d$ accumuleren. Na voortplanting door het kristal is het faseverschil $\varphi_y-\varphi_x$ dus toegenomen met

```{math}
:label: waveplate
\begin{align*}
\Delta\varphi_y-\Delta\varphi_x = \frac{2\pi}{\lambda}d(n_e-n_o).
\end{align*}
```

### Jones-matrices

Door licht door kristallen van verschillende diktes $d$ te laten gaan, kunnen we verschillende faseverschillen creëren tussen de orthogonale veldcomponenten en op deze manier kunnen we verschillende polarisatietoestanden creëren.
Om precies te zijn, laat $\mathbf{J}$, zoals gegeven door {eq}`eq.defJones`, de Jones-vector zijn van de vlakke golf voor het kristal. Dan hebben we, voor de Jones-vector na de passage door het kristal:

```{math}
:label: eq.defM1a
\begin{align*}
\mathbf{\tilde{J}}={\cal M}\mathbf{J},
\end{align*}
```
waar

```{math}
:label: eq.defM2a
\begin{align*}
{\cal M}= \left( \begin{array}{cc}e^{\frac{2\pi i}{\lambda } d n_o} & 0 \\0 & e^{\frac{2\pi i}{\lambda } d n_e}
\end{array}\right) = e^{\frac{2\pi i}{\lambda } d n_o}
\left( \begin{array}{cc}1 & 0 \\0 & e^{\frac{2\pi i}{\lambda } d (n_e -n_o)}
\end{array}\right).
\end{align*}
```
Een matrix zoals ${\cal M}$, die de ene polarisatietoestand van een vlakke golf in een andere overbrengt, wordt een **Jones-matrix** genoemd.
Afhankelijk van het faseverschil dat een golf accumuleert door door het kristal te reizen, worden deze apparaten **kwartgolfplaten** (faseverschil $\pi/2$), **halfgolfplaten** (faseverschil $\pi$), of **vollegolfplaten**  (faseverschil $2\pi$) genoemd. De toepassingen van deze golfplaten zullen in latere paragrafen worden besproken.

Beschouw als voorbeeld de Jones-matrix die de verandering van lineair gepolariseerd licht in circulaire polarisatie beschreef.
Stel dat we diagonaal (lineair) gepolariseerd licht hebben, zodat

```{math}
\begin{align*}
J=
\frac{1}{\sqrt{2}}
\left(\begin{array}{c}1\\1
\end{array}\right).
\end{align*}
```
We willen het veranderen in circulair gepolariseerd licht, waarvoor

```{math}
\begin{align*}
J=
\frac{1}{\sqrt{2}}
\left(\begin{array}{c}1\\Ik
\end{array}\right),
\end{align*}
```
waar men kan controleren dat inderdaad $\varphi_y-\varphi_x=\pi/2$.
Dit kan worden gedaan door het licht door een kristal te laten gaan, zodat ${\cal E}_y$ een faseverschil van $\pi/2$ accumuleert ten opzichte van ${\cal E}_x$. De transformatie waardoor dit wordt bereikt, kan worden geschreven als

```{math}
\begin{align*}
\left( \begin{array}{cc}1&0\\0&i
\end{array}\right)
\frac{1}{\sqrt{2}}
\left(\begin{array}{c}1\\1
\end{array}\right)
=\frac{1}{\sqrt{2}}
\left(\begin{array}{c}1\\Ik
\end{array}\right).
\end{align*}
```
De matrix aan de linkerkant is de Jones-matrix die de werking van een kwartgolfplaat beschrijft.

Een andere belangrijke Jones-matrix is de **rotatiematrix**. In de voorgaande bespreking werd aangenomen dat de snelle en langzame assen uitgelijnd waren met de $x$- en $y$-richting (d.w.z. ze waren evenwijdig aan ${\cal E}_x$ en ${\cal E}_y$). Stel nu dat de langzame en snelle assen van de golfplaat niet meer samenvallen met $\widehat{\mathbf{x}}$ en $\widehat{\mathbf{y}}$, maar eerder met een andere $\widehat{\mathbf{x}}'$ en $\widehat{\mathbf{y}}'$ zoals in {numref}`Fig_4_2_Rotation_Axis`. In dat geval passen we een basistransformatie toe: de elektrische veldvector die wordt uitgedrukt in de $\widehat{\mathbf{x}}$, $\widehat{\mathbf{y}}$ basis moet eerst worden uitgedrukt in de $\widehat{\mathbf{x}}'$, $\widehat{\mathbf{y}}'$ basis voordat de Jones-matrix van de golfplaat erop wordt toegepast. Na toepassing van de Jones-matrix moet het elektrische veld worden getransformeerd van de $\widehat{\mathbf{x}}'$, $\widehat{\mathbf{y}}'$ basis naar de $ \widehat{\mathbf{x}}$, $\widehat{\mathbf{y}}$ basis.

Laat $\mathbf{E}$ gegeven worden in termen van zijn componenten op de $\hat{\mathbf{x}}$, $\hat{\mathbf{y}}$ basis:

```{math}
:label: eq. Exybasis
\begin{align*}
\mathbf{E}=E_x \widehat{\mathbf{x}} + E_y \widehat{\mathbf{y}}.
\end{align*}
```
Om de componenten $E_{x'}$, $E_{y'}$ te vinden op de $\widehat{\mathbf{x}}'$, $\widehat{\mathbf{y}}'$ basis:

```{math}
:label: eq. Exyprime
\begin{align*}
\mathbf{E}=E_{x'} \widehat{\mathbf{x}}' + E_{y'} \widehat{\mathbf{y}}'.
\end{align*}
```
We schrijven eerst de eenheidsvectoren
$\widehat{\mathbf{x}}'$ en $\widehat{\mathbf{y}}'$ in termen van de basis
$\hat{\mathbf{x}}$, $\hat{\mathbf{y}}$
(zie afb. {numref}`Fig_4_2_Rotation_Axis`)

```{math}
:label: eq.hatxprime
\begin{align*}
\widehat{\mathbf{x}}' &= \cos\theta \, \widehat{\mathbf{x}} + \sin \theta \, \widehat{\mathbf{y}}, \end{align*}
```
```{math}
:label: eq.hatyprime
\begin{align*}
\\
\widehat{\mathbf{y}}' &= -\sin\theta \, \widehat{\mathbf{x}} + \cos \theta \, \widehat{\mathbf{y}},\end{align*}
```
Door {eq}`eq.hatxprime` en {eq}`eq.hatyprime` te vervangen door {eq}`eq. Exyprime` vinden we

```{math}
:label: eq. Etrans1
\begin{align*}
\mathbf{E} &= E_{x'} \widehat{\mathbf{x}}' + E_{y'} \widehat{\mathbf{y}}'  \\
&= E_{x'} ( \cos\theta \, \widehat{\mathbf{x}} + \sin \theta \, \widehat{\mathbf{y}} )+ E_{y'} (-\sin\theta \, \widehat{\mathbf{x}} + \cos \theta \, \widehat{\mathbf{y}}),
 \\
&= ( \cos \theta E_{x'} - \sin\theta E_{y'} )\widehat{\mathbf{x}}+ ( \sin\theta E_x + \cos \theta E_y)\widehat{\mathbf{y}}.
\end{align*}
```
Vergelijken met {eq}`eq. Exybasis` impliceert

```{math}
:label: eq.defRtheta
\begin{align*}
\begin{pmatrix}
E_{x} \\
E_{y}
\end{pmatrix}=\begin{pmatrix}
E_{x'} \cos \theta - E_{y'} \sin \theta \\
E_{x'} \sin \theta + E_{y'} \cos \theta
\end{pmatrix} =
{\cal R}_{\theta}
\begin{pmatrix}
E_{x'} \\
E_{y'}
\end{pmatrix},
\end{align*}
```
waarin ${\cal R}_{\theta}$ de rotatiematrix is over een hoek $\theta$ tegen de klok in: <sup>[^4]</sup>


```{math}
:label: eq.defRtheta1
\boxed{\begin{align*}
{\cal R}_{\theta} \equiv
\begin{pmatrix}
\cos\theta& -\sin\theta


\sin\theta& \cos\theta
\end{pmatrix}.
\end{align*}}
```

Dat ${\cal R}(\theta)$ inderdaad een rotatie is over hoek $\theta$ tegen de klok in is gemakkelijk te zien door te kijken wat er gebeurt als ${\cal R}_\theta$ wordt toegepast op de vector $(1,0)^T$.
Aangezien ${\cal R}_\theta^{-1}={\cal R}_{-\theta}$ krijgen we:


```{math}
:label: eq. Rtheta
\boxed{\begin{align*}
\begin{pmatrix}
E_{x'} \\
E_{y'}
\end{pmatrix}
= {\cal R}_{-\theta}
\begin{pmatrix}
E_{x} \\
E_{y}
\end{pmatrix}.
\end{align*}}
```

Deze relatie drukt de componenten $E_{x'}$, $E_{y'}$ van de Jones-vector uit op de $\widehat{\mathbf{x}}'$, $\widehat{\mathbf{y}}'$, die is uitgelijnd met de snelle en langzame assen van het kristal, in termen van de componenten $E_x$ en $E_y$ op de oorspronkelijke basis $\widehat{\mathbf{x}}$, $\widehat{\mathbf{y}}$.
Als de matrix ${\cal M}$ de Jones-matrix beschrijft zoals gedefinieerd in {eq}`eq.defM2a`, dan is de matrix $M_{\theta}$ voor dezelfde golfplaat maar met $x'$ als langzame en $y'$ als snelle as, met betrekking tot de $\widehat{\mathbf{x}}$, $\widehat{\mathbf{y}}$ basis, gegeven door:


```{math}
:label: eq. Rpmtheta
\boxed{\begin{align*}
{\cal M}_{\theta}={\cal R}_{\theta}{\cal M} {\cal R}_{-\theta}.
\end{align*}}
```

Voor meer informatie over basistransformaties, zie {numref}`sec:basistrans`.


```{figure} Images/Chapter_4/4_2_Rotation_Polarisation.png
:name: Fig_4_2_Rotation_Axis
Als de golfplaat wordt gedraaid, komen de snelle en langzame as niet meer overeen met $x$ en $y$. In plaats daarvan moeten we een nieuw coördinatensysteem ($x',y'$) invoeren.
```


### Lineaire polarisatoren

Een polarisator die alleen horizontaal gepolariseerd licht doorlaat, wordt beschreven door de Jones-matrix:

```{math}
:label: eq. MLP
\begin{align*}
{\cal M}_{LP}=\left( \begin{array}{cc}1&0\\0&0
\end{array}\right).
\end{align*}
```
Het is duidelijk dat horizontaal gepolariseerd licht volledig wordt doorgelaten, terwijl verticaal gepolariseerd licht helemaal niet wordt doorgelaten. In het algemeen krijgen we voor licht dat gepolariseerd is onder een hoek $\alpha$,

```{math}
:label: eq.linpol
\begin{align*}
{\cal M}_\alpha={\cal M}_{LP}\left(\begin{array}{c}\cos\alpha\\\sin\alpha
\end{array}\right)=\left(\begin{array}{cc}1&0\\0&0
\end{array}\right)
\left(\begin{array}{c}\cos\alpha\\\sin\alpha
\end{array}\right)
=
\left( \begin{array}{c}\cos\alpha\\0
\end{array}\right).
\end{align*}
```
De amplitude van het uitgezonden veld wordt verminderd met de factor $\cos\alpha$, wat impliceert dat de intensiteit van het doorgelaten licht wordt verminderd met de factor $\cos^2 \alpha$. Deze relatie staat bekend als **Wet van Malus**.

### Mate van polarisatie
Natuurlijk licht, zoals zonlicht, is niet gepolariseerd. De momentane polarisatie van ongepolariseerd licht fluctueert snel op een willekeurige manier. Een lineaire polarisator produceert lineair gepolariseerd licht uit ongepolariseerd licht. Uit {eq}`eq.linpol` volgt dat de intensiteit die door een lineaire polarisator wordt uitgezonden wanneer niet-gepolariseerd licht invalt, de gemiddelde waarde is van $\cos^2\alpha$ namelijk $\frac{1}{2}$, maal de invallende intensiteit.

Licht dat een mengsel is van gepolariseerd en ongepolariseerd licht wordt gedeeltelijk gepolariseerd genoemd. De **graad van polarisatie** wordt gedefinieerd als het deel van de totale intensiteit dat gepolariseerd is:

```{math}
:label: eq.degreepol
\begin{align*}
\text{ mate van polarisatie} = \frac{I_{pol}}{I_{pol} + I_{unpol}}.
\end{align*}
```

### Kwartgolfplaten

Hierboven is al een kwartgolfplaat geïntroduceerd. Het introduceert een faseverschuiving van $\pi/2$, dus de Jones-matrix is

```{math}
:label: eq. MQW
\begin{align*}
{\cal M}_{QWP}=
\left(\begin{array}{cc}1&0\\0& ik
\end{array}\right),
\end{align*}
```
omdat $\exp(i\pi/2)=i$. Om de werkelijke transmissie door de kwartgolfplaat te beschrijven, moet de matrix worden vermenigvuldigd met een globale fasefactor, maar omdat we alleen geven om het **faseverschil** tussen de veldcomponenten, kan deze globale fasefactor zonder problemen worden weggelaten. De kwartgolfplaat wordt meestal gebruikt om **lineair gepolariseerd licht om te zetten in elliptisch gepolariseerd licht en vice versa**<sup>[^5]</sup>. Als het invallende licht lineair gepolariseerd is onder hoek $\alpha$, is de polarisatietoestand na de kwartgolfplaat:

```{math}
:label: eq.alpha2
\begin{align*}
\left(\begin{array}{c}\cos\alpha\\ i\sin\alpha
\end{array}\right)
=
\left( \begin{array}{cc}1&0\\0& ik
\end{array}\right)
\left(\begin{array}{c}\cos\alpha\\\sin\alpha
\end{array}\right).
\end{align*}
```
In het bijzonder, als invallend licht lineair gepolariseerd is onder $45^o$, of gelijkwaardig, als de kwartgolfplaat over deze hoek wordt gedraaid, zal het lineair gepolariseerd licht omzetten in circulair gepolariseerd licht (en vice versa).

```{math}
\begin{align*}
\frac{1}{\sqrt{2}}
\left(\begin{array}{c}1\\Ik
\end{array}\right)
=
\left(\begin{array}{cc}1&0\\0& ik
\end{array}\right)
\frac{1}{\sqrt{2}}
\left(\begin{array}{c}1\\1
\end{array}\right).
\end{align*}
```
Een demonstratie wordt getoond in<sup>[^6]</sup>.

### Halfgolfplaten

Een halfgolfplaat introduceert een faseverschuiving van $\pi$, dus de Jones-matrix is

```{math}
\begin{align*}
{\cal M}_{HWP}=
\left( \begin{array}{cc}1&0\\0& -1
\end{array}\right),
\end{align*}
```
omdat $\exp(i\pi)=-1$. Een belangrijke toepassing van de halfgolfplaat is het **veranderen van de oriëntatie van lineair gepolariseerd licht**. Immers, wat deze matrix doet, is het spiegelen van de polarisatietoestand in de $x$-as. Dus als we onze spiegelas correct kiezen (d.w.z. als we de oriëntatie van de golfplaat correct kiezen), kunnen we de richting waarin het licht lineair gepolariseerd is willekeurig veranderen<sup>[^7]</sup><sup>[^8]</sup>. Om een voorbeeld te geven: een golf met lineaire polarisatie evenwijdig aan de $x$-richting, kan over hoek $\alpha$ gedraaid worden door het kristal zo te draaien dat de snelle as hoek $\alpha/2$ maakt met de $x$-as. Bij voortplanting door het kristal krijgt de langzame as een extra fase van $\pi$, waardoor de elektrische vector hoek $\alpha$ maakt met de $x$-as (zie {numref}`Fig_4_04_Rotation_Polarisation`). Het is niet moeilijk om na te gaan dat wanneer de snelle en langzame as worden verwisseld, dezelfde lineaire polarisatietoestand ontstaat.

```{figure} Images/Chapter_4/4_04_Rotation_polarisation.png
:name: Fig_4_04_Rotation_Polarisation
Rotatie van horizontaal gepolariseerd licht over een hoek $\alpha$ met behulp van een halfgolfplaat.
```


### Vollegolfplaten

Een vollegolfplaat introduceert een faseverschil van $2\pi$, wat hetzelfde is als het introduceren van geen faseverschil tussen de twee veldcomponenten.
Dus wat kan een toepassing zijn voor een full-wave plaat? We herinneren ons van Eq. {eq}`waveplate` dat het faseverschil $2\pi$ alleen is voor een bepaalde golflengte. Als we lineair (zeg maar verticaal) gepolariseerd licht van andere golflengten doorsturen, zullen deze elliptisch gepolariseerd worden, terwijl het licht met de juiste golflengte $\lambda_0$ verticaal gepolariseerd blijft. Als we dan al het licht door een horizontale polarisator laten gaan, zal het licht met golflengte $\lambda_0$ volledig worden gedoofd, terwijl het licht van andere golflengten er op zijn minst gedeeltelijk doorheen kan gaan. Daarom kunnen **vollegolfplaten worden gebruikt om specifieke golflengten van licht uit te filteren**.

## Meer over Jones-matrices
Als de richting van de langzame of snelle as gegeven is en de ordinary en extraordinary brekingsindices $n_o$ en $n_e$ zijn, is het gemakkelijk om de Jones-matrix van een dubbelbrekende plaat met een gegeven dikte $d$ te noteren met behulp van de rotatiematrices, zie {eq}`eq. Rpmtheta`. In plaats van de rotatiematrices te gebruiken, kan men ook een stelsel van vergelijkingen opschrijven voor de elementen van de Jones-matrix. Stel dat $\hat{\mathbf{v_o}}=v_{o,x}+\hat{\mathbf{x}}+v_{o,y}\hat{\mathbf{y}}$ en $\hat{\mathbf{v_e}}=v_{e,x}\hat{\mathbf{x}}+ v_{e,y} \hat{\mathbf{y}}$, respectievelijk in de richting van de gewone en de buitengewone as staan. Als de Jones-matrix wordt gegeven door

$$
{\cal M}=\left( \begin{array}{cc}A & B \\C & D
\end{array}\right),
$$ (eq. MJones)

dan

```{math}
\begin{align*}
{\cal M} \hat{\mathbf{v}}_o & = e^{i k n_o d} \, \hat{\mathbf{v}}_o,  \\
{\cal M} \hat{\mathbf{v}}_e & = e^{i k n_e d} \, \hat{\mathbf{v}}_e
\end{align*}
```
wat impliceert dat

$$
\begin{array}{cc}a v_{o,x} + b v_{o,y} & = e^{i k n_o d} v_{o,x}, \\c v_{o,x} + d v_{o,y} & = e^{i k n_o d} v_{o,y}, \\a v_{e,x} + b v_{e,y} & = e^{i k n_e d} v_{e,x}, \\c v_{e,x} + d v_{e,y} & = e^{i k n_e d} v_{e,x}.
\end{array}
$$ (eq.system)

Op dezelfde manier is het voor een lineaire polarisator eenvoudig om de Jones-matrix op te schrijven als men weet in welke richting de polarisator al het licht absorbeert of doorlaat: gebruik {eq}`eq. MLP` in combinatie met de rotatiematrices. Als $\hat{\mathbf{v}}$ in de richting van de lineaire polarisator staat en $\hat{\mathbf{w}}$ er loodrecht op staat, hebben we

```{math}
\begin{align*}
{\cal M} \hat{\mathbf{v}} & = \hat{\mathbf{v}}  \\
{\cal M} \hat{\mathbf{w}} & = \mathbf{0},
\end{align*}
```
dit is een stelsel vergelijkingen van het type {eq}`eq.system` voor de elementen van de Jones-matrix.

Stel nu dat de complexe (2,2)-matrix
{eq}`eq. MJones` wordt gegeven.
Hoe kan men nagaan of deze matrix overeenkomt met een lineaire polarisator of met een golfplaat?
Merk op dat de elementen van een Jones-matrix over het algemeen complex zijn.


**1.** **Lineaire polarisator**.
De matrix komt overeen met een lineaire polarisator als er een reële vector is die invariant blijft onder ${\cal M}$ en alle vectoren loodrecht op deze vector worden afgebeeld op nul. Met andere woorden, er moet een orthogonale basis zijn van **reële** eigenvectoren en een van de eigenwaarden moet 1 zijn en de andere 0.
Om te controleren of een gegeven matrix overeenkomt met een lineaire polarisator, moet men dus nagaan of de ene eigenwaarde 1 is en de andere 0 en bovendien dat de eigenvectoren orthogonale vectoren zijn. Het is belangrijk om te controleren of de eigenvectoren reëel zijn, want als dat niet het geval is, komen ze niet overeen met bepaalde lineaire polarisatierichtingen en dan komt de matrix niet overeen met een lineaire polarisator.

**2/** **Golfplaat**.
Om aan te tonen dat de matrix overeenkomt met een golfplaat, moeten er twee orthogonale eigenvectoren bestaan met, in het algemeen, complexe eigenwaarden van modulus 1. In feite komt een van de eigenvectoren overeen met de ordinary-as met brekingsindex $n_{o}$, en de andere met de extraordinary-as met brekingsindex $n_e$. De eigenwaarden zijn dan

```{math}
\begin{align*}
e^{i k n_1 d} \;\;\text{ en } \;\; e^{i k n_2 d},
\end{align*}
```
waarbij $d$ de dikte van de plaat is en $k$ het golfgetal. Om te verifiëren dat een $(2,2)$-matrix overeenkomt met een golfplaat, moet men dus de eigenwaarden berekenen en controleren of deze modulus 1 hebben en of de corresponderende eigenvectoren reële, orthogonale vectoren zijn.

**3.** **Jones-matrix voor voortplanting door suikers** In suikers planten links en rechts circulair gepolariseerd licht zich voort met hun eigen brekingsindex. Daarom worden suikers **circulair dubbelbrekend** genoemd. De matrix {eq}`eq. MJonen` komt overeen met voortplanting door suiker wanneer er twee reële orthogonale eenheidsvectoren zijn
$\hat{\mathbf{v}}$ en $\hat{\mathbf{w}}$ zodanig dat de circulaire polarisatietoestanden:

$$
\hat{\mathbf{v}}+ i \hat{\mathbf{w}}, \;\;\;
\hat{\mathbf{v}}- i \hat{\mathbf{w}}
$$

eigentoestanden zijn van ${\cal M}$ met complexe eigenwaarden met modulus 1.


## Decompositie van een elliptische polarisatietoestand in sommen van lineaire \& van circulaire toestanden
Elke elliptische polarisatietoestand kan worden geschreven als de som van twee loodrechte lineaire gepolariseerde toestanden:

```{math}
:label: eq. JEllipsLin
\begin{align*}
J=
\left(\begin{array}{cc}{\cal A}_x e^{i \varphi_x} \\{\cal A}_y e^{i \varphi_y}
\end{array}\right) = {\cal A}_x e^{i \varphi_x} \left( \begin{array}{c}1\\0
\end{array} \right) + {\cal A}_y e^{i \varphi_y} \left(\begin{array}{c}0 \\1
\end{array}\right).
\end{align*}
```
Bovendien kan elke elliptische polarisatietoestand worden geschreven als de som van twee circulaire polarisatietoestanden, de ene rechts- en de andere links-circulair gepolariseerd:

```{math}
:label: eq. JEllipsCirc
\begin{align*}
J=
\left(\begin{array}{c}{\cal A}_x e^{i \varphi_x} \\{\cal A}_y e^{i \varphi_y}
\end{array}\right) =\frac{1}{2}({\cal A}_x e^{i \varphi_x} - i {\cal A}_y e^{i \varphi_y}) \left( \begin{array}{c}1\\Ik
\end{array}\right) + \frac{1}{2} ( {\cal A}_x e^{i \varphi_x} + i {\cal A}_y e^{i \varphi}) \left(\begin{array}{c}1 \\-Ik
\end{array}\right).
\end{align*}
```

We concluderen dat, om te bestuderen wat er gebeurt met elliptische polarisatie, het voldoende is om twee orthogonale lineaire polarisaties te beschouwen, of, als dat handiger is, links- en rechtscirkelvormig gepolariseerd licht. In een dubbelbrekend materiaal planten twee lineaire polarisaties, namelijk evenwijdig aan de O-as en evenwijdig aan de E-as,  zich voort met hun eigen brekingsindex. Om te voorspellen wat er gebeurt met een willekeurige lineaire polarisatietoestand die niet is uitgelijnd met een van deze assen, of meer in het algemeen wat er gebeurt met een elliptische polarisatietoestand, schrijven we deze polarisatietoestand als een lineaire combinatie van o- en e-toestanden, d.w.z. we breiden het veld uit op de o- en e-basis.

Om te zien wat er gebeurt met een willekeurige elliptische polarisatietoestand in een cirkelvormig dubbelbrekend materiaal, kan het invallende licht het beste worden geschreven als een lineaire combinatie van links- en rechtscirkelvormige polarisaties.

```{admonition} Externe bronnen in aanbevolen volgorde
1. [Double Vision - Sixty Symbols](https://www.youtube.com/watch?v=k1oh3lXR5PE): Demonstratie van dubbele breking door een calcietkristal als gevolg van dubbele breking.
2. [MIT OCW - Linear Polarizer](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/linear-polarizer/): Demonstratie van lineaire polarisatoren en lineaire polarisatie.
3. [MIT OCW - Polarisatierotatie met behulp van polarisatoren](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/polarisation-rotation-using-polarizers/): Demonstratie van polarisatierotatie met behulp van lineaire polarisatoren.
4. [Demonstratie van een QuarterWavePlate](https://www.youtube.com/watch?v=ZhkcKlksV1g) door Andrew Berger.
5. [MIT OCW - Quarter-wave Plate](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/quarter-wave-plate/): Demonstratie van de kwartgolfplaat om elliptische (in het bijzonder circulaire) polarisatie te creëren.
6. [Demonstratie van een HalfWavePlate](https://www.youtube.com/watch?v=HriBBJ-6gd8) door Andrew Berger.
7. [MIT OCW - Half-wave Plate](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/half-wave-plate/): Demonstratie van de half-wave plaat.
```



[^1]: [KhanAcademy - Polarisation of light, linear and circular](https://www.khanacademy.org/science/physics/light-waves/introduction-to-light-waves/v/polarization-of-light-linear-and-circular): Verklaring van verschillende polarisatietoestanden en hun toepassingen.

[^2]: Born and Wolf, *Principles of Optics*, Paragraaf 1.4.3.

[^3]: [Double Vision - Sixty Symbols](https://www.youtube.com/watch?v=k1oh3lXR5PE): Demonstratie van dubbele breking door een calcietkristal.

[^4]: [KhanAcademy - Linear transformation examples: Rotations](https://www.khanacademy.org/math/linear-algebra/matrix_transformations/lin_trans_examples/v/linear-transformation-examples-rotations-in-r2)

[^5]: [Demonstratie van een kwartgolfplaat](https://www.youtube.com/watch?v=ZhkcKlksV1g) door Andrew Berger

[^6]: [MIT OCW - Quarter-wave Plate](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/quarter-wave-plate/): Demonstratie van de kwartgolfplaat om elliptische (in het bijzonder circulaire) polarisatie te creëren.

[^7]: [Demonstration of a Half-Wave Plate](https://www.youtube.com/watch?v=HriBBJ-6gd8) door Andrew Berger

[^8]: [MIT OCW - Half-wave Plaat](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/half-wave-plate/): Demonstratie van de halfgolfplaat.
