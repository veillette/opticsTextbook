(chapter.diffraction)=
# Scalaire diffractie-optica


```{admonition} Wat je moet weten en kunnen na het bestuderen van dit hoofdstuk
- In staat zijn om de ontleding van het hoekspectrum, ook bekend als de vlakke golfexpansie, af te leiden en de fysische interpretatie ervan te begrijpen.
- De formule van Rayleigh-Sommerfeld kennen; in het bijzonder in staat zijn om de integraal over sferische golven op te schrijven met amplitudes die evenredig zijn met het veld in het startvlak.
- Weten hoe je de Fresnel- en Fraunhofer-benadering van de Rayleigh-Sommerfeld-integraal kunt afleiden en begrijp hun relatie tot de Fouriertransformatie.
- Intuïtief begrijpen in welke zin de Fouriertransformatie gekoppeld is aan resolutie.
- Begrijpen waarom de voortplanting van licht leidt tot verlies van resolutie (d.w.z. de vluchtige golven verdwijnen).
- Begrijpen waarom propagatie naar het brandpuntsvlak van een lens overeenkomt met het nemen van de Fouriertransformatie.
- Begrijpen hoe de numerieke apertuur (NA) van een lens uiteindelijk de resolutie van afbeeldingen bepaalt.
- Begrijpen hoe een lens kan worden gebruikt voor Fourier-filtering.
```

## Inleiding
In dit hoofdstuk bestuderen we hoe licht zich voortplant als een golf. In de studie van het dubbelspleet experiment concludeerden we uit het interferentiepatroon dat op een scherm werd waargenomen dat licht een golf is. Om overtuigender aan te tonen dat licht inderdaad een golf is, hebben we een gedetailleerd kwantitatief model nodig van de voortplanting van licht, dat experimenteel verifieerbare voorspellingen geeft.

Maar een nauwkeurige beschrijving van de voortplanting van licht is niet alleen belangrijk voor de fundamentele wetenschap, het heeft ook veel praktische toepassingen. Als een monster bijvoorbeeld moet worden geanalyseerd door het te verlichten en het verstrooide licht te meten, moet rekening worden gehouden met het feit dat het gedetecteerde licht niet alleen door het monster is beïnvloed, maar door het monster én de voortplanting. Een ander voorbeeld is lithografie. Als een patroon op een substraat moet worden afgedrukt met behulp van een masker dat verlicht is en er een bepaalde afstand is tussen het masker en de fotoresist, heeft het licht dat de resist bereikt niet de exacte vorm van het masker als gevolg van voortplantingseffecten. Het masker moet dus worden ontworpen om deze effecten te compenseren.

```{figure} Images/Chapter_6/6_01_Propagation_Example.png
:name: Fig_6_01_Propagation_Example
Een kwantitatief model van de voortplanting van licht is nodig om de eigenschappen van de voortplanting te voorspellen en toe te passen in monsteranalyses en lithografie.
```


In [](section.scalvecwave) hebben we afgeleid dat in homogene materie (d.w.z. de permittiviteit is constant), elke component $U$ van een tijdharmonisch elektromagnetisch veld voldoet aan de scalaire Helmholtz-vergelijking {eq}`eq.complH`:

```{math}
\begin{align*}
\left( \nabla ^2 + k^2\right) U(\mathbf{r})=0,
\end{align*}
```
waarin $k=\omega\sqrt{\epsilon \mu_0}$ het golfgetal van het licht in materie is met permittiviteit $\epsilon$ en brekingsindex $n=\sqrt{\epsilon/\epsilon_0}$.

Wanneer de brekingsindex niet constant is, zijn de vergelijkingen van Maxwell niet langer gelijk aan de golfvergelijking voor de afzonderlijke elektromagnetische veldcomponenten en is er dan een koppeling tussen de componenten als gevolg van de rotatie-operatoren in de vergelijking van Maxwell. Wanneer de variatie van de brekingsindex traag is op de schaal van de golflengte, kan de scalaire golfvergelijking nog steeds een goede benadering zijn, maar voor structuren die variëren op de schaal van de golflengte (d.w.z. op de schaal van tien micron of minder), is de scalaire golfvergelijking niet voldoende nauwkeurig.

## Voortplanting van licht door een homogeen medium
We zullen twee equivalente methoden beschrijven om de voortplanting van het veld door homogene materie te berekenen, namelijk de hoekspectrummethode en de Rayleigh-Sommerfeld-diffractieformule. Ons doel is om het veld in een bepaald punt $(x,y,z)$ af te leiden met $z>0$, gegeven het veld in het vlak $z=0$, zoals wordt geïllustreerd in {numref}`Fig_6_02_Propagation_Math`.
Hoewel beide methoden uiteindelijk hetzelfde beschrijven, geven ze fysisch inzicht in verschillende aspecten van voortplanting.

```{index} Angular Spectrum Methode
:name: sec:angularspectrum
```
### Angular Spectrum Methode

```{figure} Images/Chapter_6/6_02_Propagation_Math.png
:name: Fig_6_02_Propagation_Math
Gegeven het veld $U(x,y,0)$, willen we $U$ vinden in een punt $(x,y,z)$ met $z>0$. Er wordt verondersteld dat het veld zich voortplant in de positieve $z$-richting, wat betekent dat alle bronnen zich in de regio $z<0$ bevinden.
```



```{math}
:label: eq.FU0
\begin{align*}
\mathcal{F}(U_0)(\xi,\eta) = \int\!\int U_0(x,y) e^{-2\pi i(\xi x + \eta y)} \, \text{d}x \text{d} y,
\end{align*}
```
De inverse Fouriertransformatie impliceert:

```{math}
:label: eq.Finv
\begin{align*}
U_0(x,y)&= \int\!\int {\cal F}(U_0)(\xi,\eta) e^{2\pi i (\xi x + \eta y)}\, \text{d}\xi \text{d} \eta \\
&= \mathcal{F}^{-1}\{{\cal F}(U_0)\}(x,y).
\end{align*}
```
Belangrijke eigenschappen van de Fouriertransformatie zijn opgesomd in {numref}`chapter.FourierTransform`.
Door $k_x=2\pi \xi$, $k_y=2\pi \eta$, kan {eq}`eq.Finv` worden geschreven als

```{math}
:label: eq.FkU0
\begin{align*}
U_0(x,y)= \frac{1}{4\pi^2} \int\!\int {\cal F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right) e^{ i (k_x x + k_y y)}\, \text{d} k_x \text{d} k_y.
\end{align*}
```
De variabelen in het Fouriervlak: $(\xi,\eta)$ en $(k_x, k_y)$ worden **ruimtelijke frequenties** genoemd.

Vergelijking {eq}`eq.FkU0` zegt dat we $U_0(x,y)=U(x,y,z=0)$ kunnen schrijven als een integraal (een som) van vlakke golven<sup>[^1]</sup> met golfvector $\mathbf{k}=(k_x,k_y, k_z)^T$, elk met zijn eigen gewicht (d.w.z. complexe amplitude) ${\cal F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$.
We weten hoe elke vlakke golf met complexe amplitude ${\cal F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$ en golfvector $\mathbf{k}=(k_x,k_y,k_z)^T$ zich voortplant over een afstand $z>0$

```{math}
\begin{align*}
{\cal F} (U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)e^{i (k_x x + k_y y)} \to \mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right) e^{i (k_x x + k_y y + k_z z)},
\end{align*}
```
Daarom wordt het veld $U(x,y,z)$ in het vlak $z$ (voor een $z>0$) gegeven door


```{math}
:label: eq.planewave1
\boxed{\begin{align*}
U(x,y,z)=\frac{1}{4\pi^2} \int\int {\cal F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)e^{i (k_x x + k_y y+k_z z)} \,\text{d}k_x\,\text{d}k_y,
\end{align*}}
```

waar

```{math}
:label: eq.kz
\begin{align*}
k_z =\sqrt{\left(\frac{2\pi }{\lambda}\right)^2-k_x^2-k_y^2},
\end{align*}
```
met $\lambda$ de golflengte van het licht zoals gemeten **in het materiaal** (dus $\lambda=\lambda_0/n$, met $\lambda_0$ de golflengte in vacuüm).
Het teken voor de wortel in {eq}`eq.kz` zou in principe negatief gekozen kunnen worden: men zou dan ook een oplossing van de Helmholtzvergelijking krijgen. De keuze van het teken $k_z$ wordt bepaald door de richting waarin het licht zich voortplant, die op zijn beurt afhangt van de locatie van de bronnen **en** van de conventie die is gekozen voor de tijdsafhankelijkheid. We moeten hier het + teken voor de wortel kiezen omdat de bronnen in $z<0$ liggen en de tijdsafhankelijkheid van tijd-harmonische velden (zoals altijd in dit boek) wordt gegeven door $e^{-i\omega t}$ met $\omega >0$.

eq.{eq}`eq.planewave1` kan ook worden geschreven als

```{math}
\begin{align*}
U(x,y,z)=\mathcal{F}^{-1}\{\mathcal{F}(U_0)(\xi,\eta)e^{i k_z z}\}(x,y),
\end{align*}
```
waar nu $k_z$ moet worden beschouwd als een functie van $(\xi, \eta)$:

```{math}
:label: eq.kzxieta
\begin{align*}
k_z = 2\pi \sqrt{ \left( \frac{1}{\lambda}\right)^2- \xi^2-\eta^2}.
\end{align*}
```
Merk op dat men dit kan interpreteren als een diagonalisatie van de propagatieoperator, zoals uitgelegd in {numref}`sec:basistrans`.

We kunnen iets interessants waarnemen: als $k_x^2+k_y^2 > \left(\frac{2\pi }{\lambda}\right)^2$, dan wordt $k_z$ imaginair, en $\exp(i k_z z)$ vervalt exponentieel voor toenemende $z$:

```{math}
:label: evanescent
\begin{align*}
\exp\left\{i\left[k_x x+k_y y +z\sqrt{\left(\frac{2\pi n}{\lambda}\right)^2-k_x^2-k_y^2 }\right]\right\}=e^{i(k_x x+k_y y)}e^{-z\sqrt{ k_x^2+k_y^2- \left(\frac{2\pi n}{\lambda}\right)^2} }.
\end{align*}
```
Deze exponentieel vervallende golven worden **evanescent in de positieve $z$-richting** genoemd. We zijn al vluchtige golven tegengekomen in de context van totale interne reflectie die wordt besproken in {numref}`subsection.totalrefl`. De fysische gevolgen van vluchtige golven in het hoekspectrum ontleding wordt uitgelegd in sectie {numref}`sec:fourierintuition`.

De golven waarvoor $k_z$ reëel is, hebben een constante amplitude: alleen hun fase verandert door voortplanting. Deze golven worden daarom **voortplantingsgolven** genoemd.

```{figure} Images/Chapter_6/6_03_Angular_Spectrum.png
:name: Fig_6_03_Angular_Spectrum
De ruimtelijke frequenties $k_x$, $k_y$ van de vlakke golven in het hoekspectrum van een tijdharmonisch veld dat zich voortplant in de $z$-richting. Er zijn twee soorten golven: de voortplantende golven met ruimtelijke frequenties binnen de cirkel $\sqrt{k_x^2+k_y^2}<k=2\pi/\lambda $ en die een fase hebben die afhankelijk is van de voortplantingsafstand $z$ maar een constante amplitude, en de vluchtige golven waarvoor $\sqrt{k_x^2+k_y^2}>k$ en waarvan de amplitude exponentieel afneemt tijdens de voortplanting.
```


**Opmerking**. In een homogene ruimte is de scalaire Helmholtz-vergelijking voor elke elektrische veldcomponent equivalent aan de vergelijkingen van Maxwell en daarom kunnen we elke component $E_x$, $E_y$ en $E_z$ afzonderlijk propageren met behulp van de hoekspectrummethode. Indien de gegevens van de velcomponenten in het vlak $z=0$ fysisch consistent zijn, of these field, zal het verkregen elektrische veld autmatisch aan het divergentie-vrij criterium voldoen. In andere woorden:

```{math}
:label: eq.devE0
\begin{align*}
\mathbf{\nabla} \cdot \mathbf{E}=0,
\end{align*}
```
overal in $z>0$.
Dit komt overeen met de bewering dat de elektrische vectoren van de vlakke golven in het hoekspectrum loodrecht staan op hun golfvectoren.
Als alternatief kan men alleen de $E_x$- en $E_y$-componenten propageren en daarna $E_z$ bepalen uit de voorwaarde dat aan {eq}`eq.devE0` moet worden voldaan.


(sec:rayleighsommerfeld)=
### Rayleigh-Sommerfeld diffractie-integraal

Een andere methode om een golfveld voort te bewegen is door gebruik te maken van de **Rayleigh-Sommerfeld** integraal. Een zeer goede benadering van deze integraal stelt dat elk punt in het vlak $z=0$ sferische golven uitzendt met een amplitude die evenredig is met het veld in het vlak $z=0$. Om het veld in een punt $(x, y,z)$ te vinden, moeten we de bijdragen van al deze puntbronnen bij elkaar optellen. Dit komt overeen met het eerder gepostuleerde Huygens-Fresnel-principe in Sectie {eq}`section.spatcoh`. Omdat een meer rigoureuze afleiding uitgaande van de Helmholtz-vergelijking<sup>[^2]</sup> nogal lang zou zijn, geven we alleen het eindresultaat:

````{note}
```{math}
:label: eq.RS
\begin{align*}
U(x,y,z)&= \frac{1}{i\lambda}\int\int U_0(x',y')\frac{ z \, e^{ik\sqrt{(x-x')^2+(y-y')^2+z^2}}}{(x-x')^2+(y-y')^2+z^2}\,\text{d}x'\,\text{d}y' 
&= \frac{1}{i\lambda}\int\int U_0(x',y')\frac{z}{r} \frac{e^{ikr}}{r}\,\text{d}x'\,\text{d}y',
\end{align*}
```
````

waar we weer schreven $U_0(x,y)=U(x,y,0)$ en waar

```{math}
:label: eq.defr
\begin{align*}
r=\sqrt{(x-x')^2+(y-y')^2+z^2}.
\end{align*}
```
**Opmerkingen**. 

1. De formule {eq}`eq.RS` is niet helemaal rigoureus omdat een term die een factor $1/(kr)$ kleiner is (en die in de praktijk dus veel kleiner is) is weggelaten. 

2. In {eq}`eq.RS` is er een extra factor
$z/r$ die is weggelaten in de tijdharmonische sferische golf zoals gegeven in {eq}`eq.ths6` en aan de rechterkant van {eq}`eq.timeharm`. Deze factor betekent dat de amplitudes van de sferische golven in de Rayleigh-Sommerfeld-diffractieintegraal afhangen van de richting (hoewel hun golffronten bolvormig zijn), waarbij de amplitudes het grootst zijn in voorwaartse richting. 

3. De hoekspectrummethode komt neer op een vermenigvuldiging met $\exp(i z k_z)$ in de Fourierruimte, terwijl de Rayleigh-Sommerfeld-integraal een convolutie is ten opzichte van $(x,y)$. Het is een eigenschap van de Fouriertransformatie dat een vermenigvuldiging in de Fourierruimte overeenkomt met een convolutie in de reële ruimte en vice versa. Inderdaad, een wiskundig resultaat genaamd **Weyl's identiteit** impliceert dat de rigoureuze versie van {eq}`eq.RS` en de vlakke golfexpansie (d.w.z. de hoekspectrummethode) identieke resultaten geven.

(sec:fourierintuition)=
## Intuïtie voor de ruimtelijke Fouriertransformatie in de optica

Aangezien ruimtelijke Fouriertransformaties een belangrijke rol spelen in onze bespreking van de voortplanting van licht, is het belangrijk om ze niet alleen wiskundig, maar ook intuïtief te begrijpen.

Wat gebeurt er als een object wordt verlicht en het gereflecteerde of doorgelaten licht op enige afstand van het object wordt gedetecteerd? Laten we bijvoorbeeld eens kijken naar transmissie. Wanneer het object veel groter is dan de golflengte, wordt vaak een transmissiefunctie $\tau(x,y)$ gedefinieerd en wordt het door het object uitgezonden veld verondersteld gewoon het product te zijn van het invallende veld en de functie $\tau(x,y)$. Voor een gat in een metalen scherm met een diameter die groot is in vergelijking met de golflengte, zou de transmissiefunctie bijvoorbeeld 1 in het gat en 0 buiten zijn. Als het object echter kenmerken heeft van de grootte van de orde van de golflengte, valt dit eenvoudige model van vermenigvuldigen met een transmissiefunctie uiteen en moet het doorgelaten veld in plaats daarvan worden bepaald door de vergelijkingen van Maxwell op te lossen. Dit is niet eenvoudig, maar sommige softwarepakketten kunnen het wel.

Stel nu dat het uitgezonden elektrische veld is verkregen in een vlak $z=0$ zeer dicht bij het object (een afstand binnen een fractie van een golflengte). Dit veld wordt het **doorgelaten nabije veld** genoemd en kan verkregen zijn door simpelweg het invallende veld te vermenigvuldigen met een transmissiefunctie $\tau(x,y)$ of door de vergelijkingen van Maxwell op te lossen. Dit doorgelaten nabije veld is een soort voetafdruk van het object.
Maar het mag duidelijk zijn dat, hoewel het in de optica vrij gebruikelijk is om te spreken in termen van "het afbeelden van een object", we strikt genomen geen object als zodanig afbeelden, maar we beelden het doorgelaten of gereflecteerde af in de buurt van velden die een soort kopie van het object zijn.
Nadat het doorgelaten nabije veld is verkregen, passen we de hoekspectrummethode toe om de individuele vlakke golven door homogene materie (bijv. lucht) van het object naar het detectorvlak of naar een optisch element zoals een lens te verspreiden.

Laat $U_0(x,y)=U(x,y,0)$ een component zijn van het doorgelaten nabije veld.
De eerste stap is om het te Fourier-transformeren, waardoor de veldcomponent wordt ontleed in vlakke golven.
Aan elke vlakke golf, gekenmerkt door de golfgetallen $k_x$ en $k_y$, kent de Fouriertransformatie een complexe amplitude toe
$\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$, waarvan de grootte aangeeft hoe belangrijk de rol is die deze specifieke golf speelt bij de vorming van het nabije veld. Dus wat kan er gezegd worden over het objectveld $U_0(x,y)$,
door te kijken naar de grootte van zijn ruimtelijke Fouriertransformatie $|\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)|$?

Stel dat $U_0(x,y)$ scherpe kenmerken heeft, d.w.z. dat er regio's zijn waar $U_0(x,y)$ snel varieert als functie van $x$ en $y$. Om deze kenmerken te beschrijven als een combinatie van vlakke golven, moeten deze golven ook snel variëren als functie van $x$ en $y$, wat betekent dat de lengte van hun golfvectoren $\sqrt{k_x^2+k_y^2}$ groot moet zijn. Dus hoe scherper de functies die $U_0(x,y)$ heeft, hoe groter we kunnen verwachten dat
$|\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)|$ is voor grote $\sqrt{k_x^2+k_y^2}$, d.w.z. dat hoge ruimtelijke frequenties naar verwachting een grote amplitude hebben. Op dezelfde manier worden de langzaam variërende, brede kenmerken van $U_0(x,y)$ beschreven door langzaam fluctuerende golven, d.w.z. door
$\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$ voor kleine $\sqrt{k_x^2+k_y^2}$, d.w.z. voor lage ruimtelijke frequenties. Dit wordt geïllustreerd in {numref}`Fig_6_04_Spatial_Fourier_Transform`.

Om deze concepten verder te onderzoeken kiezen we een bepaald veld, nemen we de Fouriertransformatie, verwijderen we de hogere ruimtelijke frequenties en keren we vervolgens de Fouriertransformatie om. We verwachten dan dat het resulterende veld zijn scherpe kenmerken heeft verloren en alleen zijn brede kenmerken behoudt, d.w.z. dat het beeld wazig is. Omgekeerd, als we de lagere ruimtelijke frequenties verwijderen maar de hogere behouden, dan zal het resultaat alleen de scherpe kenmerken vertonen, d.w.z. de contouren. Deze effecten worden weergegeven in {numref}`Fig_6_05_FourierFilter`.
Bedenk dat wanneer $k_x^2+k_y^2 > \left(\frac{2\pi}{\lambda}\right)^2$, vervalt de vlakke golf exponentieel naarmate het veld zich voortplant. Omdat door voortplanting door homogene ruimte de informatie in de hoge ruimtelijke frequenties die overeenkomen met vluchtige golven verloren gaat (er blijven slechts exponentieel kleine amplitudes van de vluchtige golven over), is perfecte beeldvorming onmogelijk, hoe goed een optisch systeem ook is ontworpen.

```{note}
Voortplanting van licht leidt tot onherstelbaar verlies van resolutie.
```

Het is dit feit dat de near-field microscopie motiveert, die deze vluchtige golven probeert te detecteren door dicht bij het monster te scannen, waardoor subgolflengte resolutie wordt behaald.

We hebben dus gezien hoe we eigenschappen van een objectveld $U_0(x,y)$ kunnen raden gegeven de amplitude van zijn ruimtelijke Fouriertransformatie $|\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)|$. Maar hoe zit het met de fase van $\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$? Hoewel men de eigenschappen van $U_0(x,y)$ niet echt kan raden door te kijken naar de fase van $\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$ op dezelfde manier als we kunnen door naar de amplitude te kijken, is het in feite de fase die een grotere rol speelt bij het definiëren van $U_0(x, y)$. Dit wordt geïllustreerd in {numref}`Fig_6_06_FourierPhase`: als de amplitude-informatie van $\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$ wordt verwijderd, kunnen kenmerken van de oorspronkelijke $U_0(x,y)$ nog steeds worden opgehaald. Als we echter alleen de amplitude $|\mathcal{F}(U_0)(k_x,k_y)|$ kennen, maar niet de fase, dan is het oorspronkelijke object volledig verloren. De fase van een veld $\mathcal{F}(U_0)$ is dus erg belangrijk, misschien wel vaak belangrijker dan de amplitude. We kunnen de fase van een veld echter niet direct meten, alleen de intensiteit $I=|\mathcal{F}(U_0)|^2$ waaruit we de amplitude $|\mathcal{F}(U_0)|$ kunnen berekenen. Het is dit gegeven dat **phase retrieval** tot een heel vakgebied op zich maakt: hoe kunnen we de fase van een veld vinden, gegeven het feit dat we alleen intensiteitsmetingen kunnen uitvoeren? Deze vraag houdt verband met een nieuw gebied van de optica, "lensloze beeldvorming" genaamd, waarbij amplitudes en fasen worden opgehaald uit intensiteitsmetingen en het beeld **computationeel** wordt gereconstrueerd. Hoe interessant dit onderwerp ook is, we zullen het in deze toelichting niet behandelen en in plaats daarvan verwijzen naar mastervakken in de optica <sup>[^3]</sup>.

**Opmerking**. Het belang van de fase voor het veld kan ook worden gezien door te kijken naar de vlakke golfexpansie {eq}`eq.planewave1`. We hebben gezien dat het veld in een vlak $z=\text{constant}$ kan worden verkregen door de vlakke golven voort te planten door hun amplitudes te vermenigvuldigen met de fasefactoren $\exp(i z k_z)$, die afhangt van de voortplantingsafstand $z$. Als men de vluchtige golven buiten beschouwing laat (omdat ze na enige afstand toch nauwelijks bijdragen aan het veld), volgt daaruit dat alleen de fasen van de vlakke golven veranderen bij voortplanting, terwijl hun amplitudes (de moduli van hun complexe amplitudes) niet veranderen. Toch worden, afhankelijk van de voortplantingsafstand $z$, zeer uiteenlopende lichtpatronen verkregen (zie b.v. {numref}`Fig_6_08_FresnelFraunhoferSlit`).


```{figure} Images/Chapter_6/6_04_Spatial_Fourier_Transform.png
:name: Fig_6_04_Spatial_Fourier_Transform
Een kwalitatieve interpretatie van ruimtelijke Fouriertransformaties. De lage ruimtelijke frequenties (d.w.z. kleine $\sqrt{k_x^2+k_y^2}$) vertegenwoordigen langzame fluctuaties en dragen daarom bij aan de brede kenmerken van het object in de reële ruimte. De hoge ruimtelijke frequenties (d.w.z. grote $\sqrt{k_x^2+k_y^2}$) fluctueren snel, en kunnen daarom scherpe kenmerken vormen in het object in de echte ruimte.
```

```{figure} Images/Chapter_6/6_05_RemoveHigh.pdf
(a) Het verwijderen van de hoge ruimtelijke frequenties

```
```{figure} Images/Chapter_6/6_05_RemoveLow.pdf
:name: Fig_6_05_FourierFilter
(b) Verwijdering van de lage ruimtelijke frequenties

Demonstratie van de rol van verschillende ruimtelijke frequenties. Door de hoge ruimtelijke frequenties te verwijderen, blijven alleen de grote kenmerken van het beeld over en gaat de resolutie verloren. Als de lage ruimtelijke frequenties worden verwijderd, blijven alleen de scherpe kenmerken (d.w.z. de contouren) over.
```

```{figure} Images/Chapter_6/6_06_RemoveAmp.pdf
(a) Het verwijderen van de amplitude-informatie door de amplitude van voortplantende en vluchtige golven in te stellen op respectievelijk 1 en 0.
```
```{figure} Images/Chapter_6/6_06_RemovePhase.pdf
:name: Fig_6_06_FourierPhase
(b) Het verwijderen van de fase-informatie door de fase gelijk te stellen aan 0.

Demonstratie van de rol van de fase van de ruimtelijke Fouriertransformatie. Als de amplitude-informatie wordt verwijderd, maar fase-informatie wordt behouden, zijn sommige kenmerken van de oorspronkelijke afbeelding nog steeds herkenbaar. Als de fase-informatie echter wordt verwijderd, maar de amplitude-informatie behouden blijft, gaat de oorspronkelijke afbeelding volledig verloren.
```


Een ander aspect van de Fouriertransformatie is het **onzekerheidsprincipe**. Het stelt dat er veel golven van verschillende frequenties moeten worden toegevoegd om een functie te krijgen die beperkt is tot een kleine ruimte<sup>[^4]</sup>. Anders gezegd, als $U(x,y)$ beperkt is tot een zeer klein gebied, dan moet $\mathcal{F}(U)(k_x,k_y)$ zeer verspreid zijn. Dit kan ook worden geïllustreerd door de schaaleigenschap van de Fouriertransformatie:

```{math}
\begin{align*}
\text{if} \quad h(x)=f(ax) \quad \text{then} \quad \mathcal{F}(h)\left(\frac{k_x}{2\pi}\right)=\frac{1}{|a|} \mathcal{F}(f)\left(\frac{k_x}{2\pi a}\right),
\end{align*}
```
die simpelweg stelt dat hoe meer $h(x)$ wordt geperst door $a$ te verhogen, hoe meer de Fouriertransformatie
$\mathcal{F}(h)$ zich uitspreidt. Dit principe wordt geïllustreerd in {numref}`Fig_6_07_Uncertainty`. Het onzekerheidsprincipe is bekend uit de kwantumfysica, waar wordt gesteld dat een deeltje niet zowel een bepaalde impuls als een bepaalde positie kan hebben. In feite is dit slechts één specifieke manifestatie van het zojuist beschreven onzekerheidsbeginsel. Een kwantumtoestand $\ket{\psi}$ kan zowel in de positiebasis $\psi_{x}(x)$ als in de impulsbasis $\psi_p(p)$ worden beschreven. De basistransformatie die deze twee uitdrukkingen met elkaar verbindt, is de Fouriertransformatie

```{math}
\begin{align*}
\psi_p(p)=\mathcal{F}\{\psi_x(x)\}(p).
\end{align*}
```
De twee zijn dus duidelijk onderworpen aan het onzekerheidsbeginsel! In feite gehoorzamen twee kwantumwaarneembare objecten die met elkaar in verband staan door een Fouriertransformatie (ook wel geconjugeerde variabelen genoemd), zoals positie en momentum, aan deze onzekerheidsrelatie.
De **onzekerheidsrelatie** luidt:

```{note}
Als een functie $f(x)$ breedte $\Delta x$ heeft, heeft de Fouriertransformatie een breedte $\Delta k_x \approx 2\pi/ \Delta x$.
```

Omdat na voortplanting over een afstand $z$,
de vluchtige golven niet bijdragen aan de Fouriertransformatie van het veld, volgt hieruit dat deze Fouriertransformatie een maximale breedte $\Delta k_x = k$ heeft. Uit het onzekerheidsprincipe volgt dat na voortplanting de minimale breedte van het veld $\Delta x, \Delta y \approx 2\pi/k=\lambda$ is.
```{note}
De minimale kenmerkgrootte van een veld na propagatie is in de orde van grootte van de golflengte.
```

Dit vormt een fundamentele limiet voor de resolutie die wordt gegeven door de golflengte van het licht.


```{figure} Images/Chapter_6/6_07_UncertaintyPrinciple.pdf
:name: Fig_6_07_Uncertainty
Demonstratie van het onzekerheidsprincipe. Hoe beperkter $U(x,y)$ is, hoe groter de spreiding van $\mathcal{F}(U)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)$.
```


(sec:fresnelfraunhofer)=
## Fresnel- en Fraunhofer-benaderingen

De Fresnel- en Fraunhofer-benadering zijn twee benaderingen van de Rayleigh-Sommerfeld-integraal {eq}`eq.RS`. De benaderingen zijn nauwkeurig op voorwaarde dat de voortplantingsafstand $z$ voldoende groot is. In de Fraunhofer-benadering moet $z$ *best* groot zijn, d.w.z. groter dan voor de Fresnel-benadering, die al nauwkeurig is voor typische afstanden die voorkomen in optische systemen. Anders gezegd: in volgorde van meest nauwkeurig naar minst nauwkeurig (d.w.z. alleen geldig voor grote voortplantingsafstanden), zouden de diffractie-integralen gerangschikt zijn als:
```{note}
**[Meest nauwkeurig]** Rayleigh-Sommerfeld $\rightarrow$ Fresnel $\rightarrow$ Fraunhofer **[Minst nauwkeurig]**.
```

### Fresnel-benadering
We gaan ervan uit dat $z$ in eq.{eq}`eq.RS` is zo groot dat we in de noemer $r$ kunnen benaderen met $z$:

```{math}
:label: eq.fesnel1
\begin{align*}
U(x,y,z)&= \frac{1}{i\lambda}\int\int U_0(x',y')\frac{z}{r} \frac{e^{ikr}}{r}\,\text{d}x'\,\text{d}y'
&\approx & \frac{1}{i\lambda z}\int\int U_0(x',y')e^{iKr}\,\text{d}x'\,\text{d}y'.
\end{align*}
```
De reden waarom we niet dezelfde benadering kunnen toepassen voor $r$ in de exponent, is dat in de exponent $r$ wordt vermenigvuldigd met $k= 2\pi /\lambda$, wat een zeer groot getal is bij optische frequenties, dus elke fout die wordt geïntroduceerd door het benaderen van $r$ zou drastisch worden vergroot door te vermenigvuldigen met $k$, wat gemakkelijk kan leiden tot een heel andere waarde van $\exp(ikr)=\cos(kr)+i\sin(kr)$. Om $r$ in $\exp(ikr)$ te benaderen moeten we voorzichtiger zijn en een Taylor-expansie toepassen. Bedenk dat

```{math}
:label: eq.r1
\begin{align*}
r&= \sqrt{(x-x')^2+(y-y')^2+z^2} 
&= z\, \sqrt{\frac{(x-x')^2+(y-y')^2}{z^2}+1}.
\end{align*}
```
We weten dat de Taylor-expansie rond $s=0$ impliceert:

```{math}
:label: eq.approxpar
\begin{align*}
\sqrt{s+1}=1+\frac{s}{2}-\frac{s^2}{8}+\dots.
\end{align*}
```
Aangezien we aannemen dat $z$ groot is, is $\frac{(x-x')^2+(y-y')^2}{z^2}$ klein, dus we hebben

```{math}
:label: eq.fresnel2
\begin{align*}
r&= z\sqrt{\frac{(x-x')^2+(y-y')^2}{z^2}+1} 
&\approx& z\left[1+\frac{(x-x')^2+(y-y')^2}{2 z^2}\right] 
&= z+\frac{(x-x')^2+(y-y')^2}{2 z}, \quad \quad**Fresnel-benadering**.
\end{align*}
```
Met deze benadering komen we uit op de **Fresneldiffractie-integraal**, die in de volgende equivalente vormen kan worden geschreven:


```{math}
:label: eq.FresnelF
\boxed{\begin{align*}
\begin{split}
U(x,y,z)&\approx
\frac{e^{ikz}}{i\lambda z}\int\!\int U_0(x',y')e^{\frac{ik}{2z}\left[(x-x')^2+(y-y')^2\right]}\,\text{d}x'\,\text{d}y'


&=
\frac{ e^{ikz}e^{\frac{ik(x^2+y^2)}{2z}}}{i\lambda z}\int\!\int U_0(x',y') e^{\frac{ik(x'^2+y'^2)}{2z}}e^{-ik\left(\frac{x}{z}x'+\frac{y}{z}y'\right)}\,\text{d}x'\,\text{d}y'


&= \frac{e^{ikz}e^{\frac{ik(x^2+y^2)}{2z}}}{i\lambda z} \mathcal{F}\left\{U_0(x',y')e^{\frac{ik(x'^2+y'^2)}{2z}}\right\}\left(\frac{x}{ \lambda z },\frac{y}{\lambda z}\right).
\end{split}
\end{align*}}
```

Vooral de laatste uitdrukking is interessant, omdat het laat zien dat

```{note}
De Fresnel-benadering is evenredig met de Fouriertransformatie van het veld $U_0(x',y')$ vermenigvuldigd met de Fresnel-propagator $\exp\left(\frac{ik(x'^2+y'^2)}{2z}\right)$.
```

Merk op dat deze propagator afhankelijk is van de voortplantingsafstand $z$.

**Opmerking**. Door {eq}`eq.FresnelF` te Fourier transformeren, kan men de vlakke golfamplitudes van de Fresnel-benadering krijgen.
Het blijkt dat deze amplitudes gelijk zijn aan ${\cal F}(U_0)$ vermenigvuldigd met een fasefactor die wordt verkregen uit een paraxiale benadering van de exacte fasefactor $\exp(i z k_z)$, d.w.z. $k_z$ wordt benaderd door een kwadratische functie van $k_x, k_y$. Daarom wordt de Fresnel-benadering ook wel de paraxiale benadering genoemd. In feite kan worden aangetoond dat de Fresnel-diffractie-integraal een oplossing is van de
**paraxiale golfvergelijking** en omgekeerd, dat elke oplossing van de paraxiale golfvergelijking kan worden geschreven als een Fresnel-diffractieintegraal<sup>[^5]</sup>.


### Fraunhofer-benadering
Om de Fraunhofer-benadering te verkrijgen, zullen we naast de Fresnel-benadering nog een benadering maken van $r$ in $\exp(ikr)$:

```{math}
:label: eq.r_fresnel
\begin{align*}
r
&\approx & z+\frac{(x-x')^2+(y-y')^2}{2 z} \quad**Fresnel-benadering** \end{align*}
```
```{math}
:label: eq.r_Fraunhofer
\begin{align*}
&\approx & z+\frac{x^2+y^2-2xx'-2yy'}{2 z} \quad**Fraunhofer approximation**.\end{align*}
```
Daarom hebben we de kwadratische termen $x'^2+y'^2$ weggelaten, en in vergelijking met de Fresnel-diffractie-integraal, laten we de factor $ \exp\left[ik(x'^2+y'^2)/(2z)\right]$ weg om de **Fraunhofer-diffractie-integraal** te verkrijgen:


```{math}
:label: eq.Fraunhofer
\boxed{\begin{align*}
U(x,y,z)\approx \frac{e^{ikz}e^{\frac{ik(x^2+y^2)}{2z}}}{i\lambda z} \mathcal{F}(U_0)\left(\frac{x }{ \lambda z},
\frac {y}{\lambda z }\right).
\end{align*}}
```

Dit leidt tot de volgende belangrijke constatering:

```{note}
Het Fraunhofer-veld van $U_0(x',y')$ is evenredig met de Fouriertransformatie van $U_0$.
```

Merk op dat om het Fraunhofer-veld in $(x,y,z)$ te verkrijgen, de Fouriertransformatie moet worden geëvalueerd op ruimtelijke frequenties $x/(\lambda z)$ en $y/(\lambda z)$. Deze ruimtelijke frequenties schalen met $1/z$ en het totale veld $U(x,y,z)$ is evenredig met $1/z$. Dit houdt in dat wanneer $z$ wordt verhoogd, het veldpatroon zich verspreidt zonder van vorm te veranderen, terwijl de amplitude daalt, zodat de totale energie behouden blijft. Anders gezegd, afgezien van de factor $1/z$ voor de integraal, hangt het Fraunhofer-veld af van de hoeken $x/z$ en $y/z$. Daarom wordt voor grote voortplantingsafstanden $z$ waarvoor de Fraunhofer-benadering nauwkeurig is, het veld breder (het divergeert) wanneer de voortplantingsafstand toeneemt.

```{note}
Uiteindelijk, bij voldoende grote voortplantingsafstanden, d.w.z. in de Fraunhofer-limiet, verspreidt het licht zich altijd zonder vormverandering van de lichtverdeling.
```

**Opmerkingen**.
1. De Fresnel-benadering is, net als de Fraunhofer-benadering, een Fouriertransformatie van het veld in het startvlak ($z=0$), geëvalueerd in ruimtelijke frequenties die afhankelijk zijn van het waarnemingspunt:

```{math}
:label: eq.spatial
\begin{align*}
\xi = \frac{x}{\lambda z}, \quad \eta=\frac{y}{\lambda z}.
\end{align*}
```
In tegenstelling tot de Fraunhofer-benadering hangt de Fresnel-benadering echter ook op een andere manier af van de voortplantingsafstand $z$, namelijk door de exponent van de Fresnel-propagator in de integrand.
Dit is de reden waarom de Fresnel-integraal niet alleen afhankelijk is van $z$ door de verhoudingen $x/z$ en $y/z$, maar op een meer gecompliceerde manier.
Daarom geeft de Fresnel-benadering zeer uiteenlopende patronen, afhankelijk van de voortplantingsafstand $z$, zoals te zien is in {numref}`Fig_6_08_FresnelFraunhoferSlit`.


2. In de diffractie-integraal van Rayleigh-Sommerfeld wordt het veld geschreven als een superpositie van sferische golven. In de Fresnel-benadering worden de sferische golven benaderd door parabolische golven. Ten slotte is in de Fraunhofer-benadering de voortplantingsafstand zo groot dat de parabolische golven kunnen worden benaderd door vlakke golven.

3. Laat $f_{a,b}(x,y)=f(x-a,y-b)$ de functie zijn die wordt verkregen uit $f$ door translatie. Van de algemene eigenschap van de Fouriertransformatie:

```{math}
\begin{align*}
{\cal F} (f_{a,b}) (\xi,\eta) = e^{ -2\pi i (\xi a + \eta b)} {\cal F}(f)(\xi,\eta),
\end{align*}
```
volgt dat wanneer het veld $U_0$ wordt verplaatst, de intensiteit in het Fraunhofer-veld niet wordt gewijzigd.
Daarentegen, als gevolg van de extra kwadratische fasefactor in de integrand van de Fresnel-integraal, verandert de intensiteit van het Fresnel-veld in het algemeen wanneer $U_0$ wordt verplaatst.
4. Stel dat $U_0$ het veld is direct achter een diafragma ${\cal A}$ met een diameter $D$ in een ondoorzichtig scherm. Er kan dan worden aangetoond dat de punten $(x,y,z)$ van de waarneming, waarvoor de diffractie-integralen van Fresnel en Fraunhofer voldoende nauwkeurig zijn, voldoen aan:

```{math}
:label: eq.eisFresnel
\begin{align*}
\frac{z}{\lambda} & \gg & \left( \frac{\max_{(x',y')\in{\cal A}}\sqrt{(x-x')^2+(y-y')^2}}{\lambda}\right)^{4/3}, \;\; \textbf{Fresnel} \end{align*}
```
```{math}
:label: eq.eisFraunhofer
\begin{align*}
\\
\frac{z}{\lambda} & \gg & \left( \frac{D}{\lambda}\right)^{2}, \;\; \textbf{Fraunhofer}\end{align*}
```
Het Fresnel-getal wordt gedefinieerd door


```{math}
:label: eq.NF
\boxed{\begin{align*}
N_F = \frac{D^2}{\lambda z}, \;\;\; \textbf{Fresnel-getal}.
\end{align*}}
```

Wanneer $N_F < 0,1$, is de Fraunhofer-benadering nauwkeurig, terwijl het voor $N_F>0,1$ beter is om de Fresnel-benadering te gebruiken (zie {numref}`Fig_6_08_FresnelFraunhoferSlit`).
Stel dat $D= 1\text{ mm}$ en de golflengte is die van groen licht: $\lambda=550 \text{ nm}$, dan is de benadering van Fraunhofer accuraat als $z> 10 \text{ m}$.


5. De waarnemingspunten waarop de Fraunhofer-benadering kan worden toegepast, moeten in ieder geval voldoen aan:

```{math}
:label: eq.condition
\begin{align*}
\frac{x}{z} < 1, \quad \frac{y}{z} <1.
\end{align*}
```
Wanneer $x/z>1$, komt de ruimtelijke frequentie $k_x = \frac{2 \pi x}{z \lambda} > k$ geassocieerd met dit punt overeen met een vluchtige golf. Een vluchtige golf kan uiteraard niet bijdragen aan het Fraunhofer-veld omdat deze exponentieel afneemt met de afstand $z$. In de praktijk worden de Fresnel- en Fraunhofer-benaderingen alleen gebruikt als $x/z$ en $y/z$ kleiner zijn dan 0,3. 

6. In elke uitdrukking voor een optisch veld kan men altijd factoren van constante fase weglaten, d.w.z. een totale fase die niet afhankelijk is van de positie. Als men alleen geïnteresseerd is in het veld in bepaalde vlakken $z=\text{constant}$, dan kan een factor als $\exp(ikz)$ ook weggelaten worden. Verder wordt in sommige gevallen ook een positieafhankelijke fasefactor voor de Fresnel- en Fraunhofer-diffractie-integralen weggelaten, namelijk wanneer alleen de intensiteit van belang is. In oefeningen wordt meestal vermeld dat deze factor kan worden weggelaten: als dit niet wordt vermeld, moet het in de formules worden behouden.

(secton.examples)=
### Voorbeelden van Fresnel- en Fraunhofer-benaderingen

**Fresnel-benadering van het veld van twee puntbronnen.** 

Beschouw twee onderling coherente tijd-harmonische puntbronnen in $\mathbf{r}_s^+=(a/2,0,0)$ en $\mathbf{r}_s^-=(-a/2,0,0)$. De velden in $\mathbf{r}=(x,y,z)$ uitgestoten zijn volgens {eq}`eq.timeharm` evenredig met

$$
U_{\pm}(\mathbf{r}) = \frac{e^{i k |\mathbf{r}-\mathbf{r}_s^\pm|}} {|\mathbf{r} -\mathbf{r}_s^\pm|}.
$$ (eq.Upm)

We passen de Fresnel-benadering toe voor grote $z$:

```{math}
:label: eq.fresnelps
\begin{align*}
|\mathbf{r}-\mathbf{r}_s^\pm| &= z \sqrt{ 1 + \frac{(x\mp a/2)^2 + y^2}{z^2}}  \\
& \approx & z + \frac{(x\mp a/2)^2 + y^2}{2 z}  \\
&= z + \frac{x^2+ y^2+a^2/4}{2z} \mp \frac{a x}{2z}.
\end{align*}
```
Vandaar dat

$$
U_\pm(\mathbf{r}) \approx \frac{e^{ikz}}{z} e^{i k \frac{x^2+y^2}{2z} } e^{ i k\frac{ a^2}{8z}} \, e^{\mp i k \frac{a x}{2z}},
$$ (eq.Ufresnel)

waarbij we in de noemer $|\mathbf{r}-\mathbf{r}_s^\pm|$ hebben vervangen door $z$. Merk op dat de Fraunhofer-benadering $e^{ i k a^2/(8z)} \approx 1$ bedraagt, terwijl de
Fasefactor $e^{i K \frac{x^2+y^2}{2z} } $ blijft. De intensiteit op een scherm $z=\text{constant}$ van de som van de twee velden voor het geval dat de bronnen even sterk zijn en in fase uitzenden is:

```{math}
:label: eq.Itot
\begin{align*}
I_{tot}(\mathbf{r}) &= | U_+(\mathbf{r})+U_{-}(\mathbf{r}) |^2 = \frac{1}{z^2} |e^{-i k \frac{a x}{2z}} + e^{i k \frac{a x}{2z}}|^2  \\
&= \frac{2}{z^2} \left[ 1 + \cos\left(2 \pi \frac{a x}{\lambda z}\right)\right].
\end{align*}
```
Men ziet dat de intensiteit het gevolg is van de interferentie van twee vlakke golven: $\exp[\pm i k ax/(\lambda z)]$ en wordt gegeven door een cosinusfunctie (zie {numref}`Fig_6_09_2_point_source`).
Merk op dat voor twee puntbronnen het intensiteitspatroon hetzelfde is in de Fresnel- en de Fraunhofer-benadering. Dit is echter bijzonder voor twee puntbronnen: wanneer meer dan twee puntbronnen in aanmerking worden genomen, zijn de Fresnel en Fraunhofer 
patronen anders. Het intensiteitspatroon is onafhankelijk van $y$, en verdwijnt op de lijnen


```{math}
:label: eq.lines2
\begin{align*}
\frac{x}{z} = (2m+1)\frac{\lambda}{2a},
\end{align*}
```
en heeft maxima op de lijnen

```{math}
:label: eq.lines3
\begin{align*}
\frac{x}{z} = m\frac{\lambda}{a},
\end{align*}
```
voor een geheel getal $m$.

```{figure} Images/Chapter_6/6_09_Fraunhofer_2_point_source_light.png
:name: Fig_6_09_2_point_source
Intensiteitspatroon van twee onderling coherente puntbronnen van gelijke sterkte en in fase uitzendend op de golflengte $\lambda =600$ nm van Eq.&nbsp;{eq}`eq.Itot`. De afstand tussen de puntbron is 200 nm. Bovenaan is de doorsnede langs de $z$-as weergegeven.
```


**Fraunhofer-benadering van een rechthoekig diafragma in een scherm.** 
Laat het scherm $z=0$ zijn en het diafragma wordt gegeven door $-a/2 < x < a/2$, $-b/2 < y < b/2$. De transmissiefunctie $\tau(x,y)$ is:

```{math}
:label: eq.tauslit
\begin{align*}
\tau(x,y)= 1_{[-a/2,a/2]}(x) 1_{[-b/2, b/2]}(y),
\end{align*}
```
waar

```{math}
:label: eq.indicator
\begin{align*}
1_{[-a/2, a/2]}(x) = \left\{ \begin{array}{l}1, \text{ if } -\frac{a}{2} \leq x \leq\frac{a}{2}, \\0, \text{ anders},
\end{array}\right.
\end{align*}
```
en op dezelfde manier voor $1_{[-b/2, b/2]}(y)$.
Laat het diafragma worden verlicht door een loodrechte invallende vlakke golf met eenheidsamplitude. Dan is het veld direct achter het scherm:

```{math}
:label: eq.U0spleet
\begin{align*}
U_0(x,y)=\tau(x,y) = 1_{[-a/2,a/2]}(x) 1_{[-b/2, b/2]}(y),
\end{align*}
```
We hebben

```{math}
:label: eq.Fspleet
\begin{align*}
{\cal F}\left( 1_{[-a/2,a/2] }\right)(\xi) &= \int_{-a/2}^{a/2} e^{-2\pi i\xi x} \, \text{d} x  \\
&= \frac{ e^{\pi i a \xi}-e^{-\pi i a\xi}}{2\pi i \xi}  \\
&= a \text{ sinc}(\pi a \xi),
\end{align*}
```
waarbij $\text{ sinc}(u)=\sin(u)/u$.
Vandaar dat

```{math}
:label: eq.FU02
\begin{align*}
{\cal F} (U_0)\left(\frac{x}{\lambda z},\frac{y}{\lambda z}\right) = a b \text{ sinc}\left(\frac{\pi a x}{\lambda z}\right) \text{ sinc}\left(\frac{\pi b y}{\lambda z}\right).
\end{align*}
```
Het Fraunhofer-veld op grote afstand $z$ van een rechthoekige opening in masker wordt verkregen door {eq}`eq.FU02` in {eq}`eq.Fraunhofer`.

**Opmerkingen**. 

1. De eerste nul langs de $x$-richting vanuit het centrum $x=0$ komt voor

```{math}
:label: eq.zero
\begin{align*}
x= \pm \frac{\lambda z}{a}.
\end{align*}
```
De afstand tussen de eerste twee nullen langs de $x$-as is $2\lambda z/a$ en is dus groter als de breedte langs de $x$-richting van de opening kleiner is.

2. De ongelijkheden {eq}`eq.condition` impliceren dat wanneer $ a< \lambda$, het verre veldpatroon geen nullen heeft als functie van $x$. Wanneer $a$ verder wordt verlaagd, wordt het steeds moeilijker om de breedte $a$ af te leiden uit de Fraunhofer-intensiteit. Dit is een illustratie van het feit dat informatie over kenmerken die dan de golflengte zijn, zich niet kan voortplanten naar het verre veld. 

3. Zoals geïllustreerd in {numref}`Fig_6_10_Fraunhofer`, is het Fraunhofer-diffractiepatroon als functie van de diffractiehoek het smalst in de richting waarin de opening het grootst is.


```{figure} Images/Chapter_6/6_10_Fraunhofer_diffraction_aperture.png
:name: Fig_6_10_Fraunhofer
Fraunhofer-diffractiepatroon van een rechthoekig diafragma in een ondoorzichtig scherm. Links: de breedte van het diafragma in de $y$-richting is twee keer zo groot als in de $x$-richting; midden: de breedte in de $y$-richting is 5 keer zo groot als in de $x$-richting; rechts: de breedte in de $y$-richting is 10 keer zo groot als in de $x$-richting.
```


**Fresnel-benadering van een rechthoekig diafragma in een masker** 

De integraal in de Fresnel-benadering voor het veld van een rechthoekige opening in een masker kan analytisch worden berekend en leidt tot functies die eigenlijk "Fresnel-integralen" worden genoemd en die kunnen worden bestudeerd met behulp van de Cornu-spiralen. We zullen hier niet dieper op ingaan, maar alleen de resultaten van de simulaties laten zien in
Afb. {numref}`Fig_6_08_FresnelFraunhoferSlit`. De afstand tot het masker neemt toe ($N_F$ neemt af), van heel dicht bij het masker rechtsonder, tot verder van het masker linksonder, tot vrij ver van het masker rechtsboven, tot de Fraunhofer-afstand in de figuren linksboven. Let op de schaalverandering langs de as in de figuren en de afname van de intensiteit met de voortplantingsafstand. Het is te zien dat het patroon drastisch verandert en verbreedt met de afstand van wat min of meer een kopie is van het diafragma, tot een patroon dat gelijk is aan de Fouriertransformatie van het diafragma. Zodra de Fraunhofer-benadering nauwkeurig is, resulteert een verdere toename van de afstand alleen in een verbreding van het patroon en een afname van de totale amplitude zonder vormverandering. In het gebied waar de Fresnel-benadering nauwkeurig is, verandert de vorm van het patroon daarentegen veel met de afstand tot het masker.

```{figure} Images/Chapter_6/6_08_FresnelDiffraction_L_distance.png
:name: Fig_6_08_FresnelFraunhoferSlit
Diffractiepatronen van een vierkante opening in een masker met overeenkomstige doorsneden langs de $x$-as, die de overgang van Fresnel- naar Fraunhofer-benaderingen laten zien. De afstand tot het masker neemt toe met het Fresnel-getal $N_F$ van het nabije veldpatroon dicht bij het masker in de figuren rechtsonder tot het Fraunhofer-diffractiepatroon in de linkerbovenhoek. Let op de verschillende schalen langs de as in de figuren.
```



**Fraunhofer-benadering van een periodieke reeks spleten**

We kunnen nu voorspellen wat het diffractiepatroon is van een reeks van spleten van eindige breedte.
Uit het Fraunhofer-patroon van een enkele rechthoekige opening volgt dat, als de zijden evenwijdig aan de $y$-richting zeer lang zijn, het Fraunhofer-diffractiepatroon als functie van de hoek in de $y$-richting zeer smal is.
In {numref}`Fig_6_10_Fraunhofer`b is het Fraunhofer diffractiepatroon van een rechthoekige opening te zien, waarvan de breedte in de $y$-richting 10 maal die in de $x$-richting is. Het diffractiepatroon is dan sterk geconcentreerd langs de $x$-as.
Als we alleen het Fraunhofer-patroon voor $y/z=0$ beschouwen, terwijl we het nog steeds beschouwen als een functie van $x/z$, volstaat het om de Fouriertransformatie alleen te berekenen met betrekking tot $x$. Het probleem wordt dan een diffractieprobleem voor een eendimensionale spleet.

We beschouwen nu een reeks van dergelijke spleten waarvan de lange zijden allemaal evenwijdig zijn aan de $y$-as en we verwaarlozen vanaf nu de $y$-variabele.
Stel dat $W_{\text{slit}}(x)$ de functie is die de transmissie van een enkele spleet beschrijft. Dan is de transmissiefunctie van $M$ equidistante spleten:

```{math}
\begin{align*}
\tau(x)=\sum_{m=1}^{M} W_{\text{slit}}\left(x+ (M+1)\frac{p}{2}- mp\right),
\end{align*}
```
waarbij $p$ de afstand tussen aangrenzende spleten is, d.w.z. $p$ de periode van de rij is. Als de verlichting wordt uitgevoerd door een loodrechte invallende vlakke golf met eenheidsamplitude, is het uitgezonden nabije veld $U_0(x)$ gewoon $\tau(x)$.
Dan

```{math}
:label: eq.Fsum
\begin{align*}
{\cal F} (U_0) (\xi) = {\cal F}(\tau)(\xi)=\sum_{m=1}^M {\cal F}(W_{slit})(\xi)\, e^{\pi i (M+1)p\xi } e^{-2\pi i m p \, \xi},
\end{align*}
```
waar we voor een spleet met breedte $a$ hebben volgens {eq}`eq.Fspleet`:

$$
{\cal F} (W_{spleet}) (\xi) = a \frac{\sin(\pi a \xi)}{\pi a \xi}.

$$
Er moet uiteraard $a< p$ worden aangehouden.
Gebruik

```{math}
:label: eq.geom
\begin{align*}
\sum_{m=1}^M e^{-2\pi i m p \, \xi } &= e^{-2\pi i p\xi } \frac{ 1- e^{-2\pi i M p \, \xi}}{1-e^{-2\pi i p \, \xi}}  \\
&= e^{-\pi i (M +1) p \, \xi}\, \frac{ e^{i \pi M p \, \xi} - e^{-i \pi M p \, \xi}}{e^{i \pi p \, \xi}- e^{-i \pi p \, \xi}}  \\
&= e^{-\pi i (M+1) p \, \xi} \, \frac{ \sin( \pi Mp \, \xi)}{\sin(\pi p \, \xi)},
\end{align*}
```
we krijgen dan

$$
{\cal F} (U_0) (\xi) =
{\cal F} (W_{spleet}) (\xi) \frac{\sin( \pi M p \xi)}{ \sin(\pi p \xi)}.
$$ (eq.Ftau)

De intensiteit van het Fraunhofer-gebied is:

```{math}
:label: eq.ftau3
\begin{align*}
I(x,z)= \left| \frac{1}{\lambda z}\mathcal{F}(U_0)\left(\frac{x}{\lambda z}\right) \right|^2 = \frac{1}{\lambda^2 z^2}\,
\left|{\cal F} (W_{slit})\left(\frac{\theta}{\lambda}\right)\right|^2 \,
\frac{\sin^2\left( \pi M\frac{p}{\lambda} \, \theta \right)}{ \sin^2\left(\pi \frac{p}{\lambda}\, \theta \right)}.
\end{align*}
```
waarbij $\theta=x/z$ de diffractiehoek is. De factor

$$
\frac{\sin^2\left( \pi M \frac{p}{\lambda} \, \theta \right)}{ \sin^2\left(\pi \frac{p}{\lambda}\, \theta \right)},
$$ (eq.fastosc)

is, als gevolg van de factor $M$ onder de sinus in de teller, een snelle oscillerende functie van $\theta$ terwijl $|{\cal F} (W_{spleet}) (\theta/\lambda)|^2$ een langzaam variërende omhullende functie is.
Dit is een manifestatie van de eigenschap van de Fouriertransformatie dat kleine details van een structuur (bijvoorbeeld de grootte van een enkele spleet) grootschalige kenmerken van het verre veldpatroon veroorzaken, terwijl grootschalige eigenschappen zoals de lengte $M p$ van de totale structuur, snel veranderende kenmerken veroorzaken. Dit wordt geïllustreerd in {numref}`Fig_6_11_MultipleSlits712`.

De diffractieamplitude is maximaal voor hoeken waar zowel de noemer als de teller van ({eq}`eq.fastosc`) verdwijnen:


```{math}
:label: eq.orderm
\boxed{\begin{align*}
\theta_m= \frac{ m \lambda}{ p },\;\;\; m=0,\pm1, \pm 2, \ldots, \hspace{0.6cm} \textbf{diffractieorders.}
\end{align*}}
```

Deze richtingen worden diffractieorden genoemd en aangezien

$$
\frac{\sin^2\left( \pi M\frac{p}{\lambda} \, \theta_m \right)}{ \sin^2\left(\pi \frac{p}{\lambda}\, \theta_m \right)} = M^2,
$$ (eq.maxm)

die volgt door toepassing van de regel van l'H\^{o}pital, is de intensiteit van de m$^{th}$ orde

```{math}
\begin{align*}
\frac{M^2}{\lambda^2 z^2} \, \left| {\cal F} (W_{slit})\left(\frac{m}{p}\right) \right|^2,
\end{align*}
```
daarom is het evenredig met het kwadraat van het aantal perioden en met de kwadraatmodulus van de omhulling in $\theta_m$.

Tussen twee aangrenzende diffractieorden heeft {eq}`eq.fastosc` $M-1$ nullen en $M-2$ secundaire maxima (zie {numref}`Fig_6_11_MultipleSlits712`).
De hoekbreedte van een diffractieorde is de helft van de hoekafstand tot de dichtstbijzijnde nullen naast de orde, d.w.z.


```{math}
:label: eq.widthorder
\boxed{\begin{align*}
\Delta \theta = \frac{\lambda}{M p},
\hspace{1cm} \textbf{hoekbreedte van een diffractieorde.}
\end{align*}}
```

Als er meer spleten zijn, zijn de intensiteitspieken waarin
de energie wordt verstrooid, smaller en hoger.

```{figure} Images/Chapter_6/6_11_MultipleSlits712.png
:name: Fig_6_11_MultipleSlits712
Een illustratie van een diffractiepatroon van een reeks van vijf spleten.
```


Zoals hierboven uitgelegd, gelden er in het verre Fraunhofer-veld: $\theta= x/z<1$. Dit stelt een limiet aan het aantal diffractie orders:

```{math}
:label: eq.finite
\begin{align*}
|m|\leq p/\lambda.
\end{align*}
```
Dus hoe groter de verhouding van de periode en de golflengte, hoe meer diffractie ordes.

De eigenschap {eq}`eq.orderm` dat de diffractieorders $ m\neq 0$ afhankelijk zijn van de golflengte wordt gebruikt om golflengten te scheiden. **Grating-spectrometers** gebruiken periodieke structuren zoals een reeks spleten om golflengten zeer nauwkeurig te scheiden en te meten. De $m$de diffractieorde van twee golflengten $\lambda_1$ en $\lambda_2>\lambda_1$ zijn gescheiden als

$$
m\frac{\lambda_2}{p} > m\frac{\lambda_1}{p} + \Delta \theta =
m\frac{\lambda_1}{p } + \frac{\lambda_1}{M p},

$$
wat impliceert dat met $\Delta \lambda=\lambda_2-\lambda_1$ en $\lambda=\lambda_1$, dat

$$
\frac{\Delta \lambda}{\lambda}> \frac{1}{m M}.
$$ (eq.gratres)

Hieruit volgt dat de resolutie hoger is wanneer er meer spleten zijn en voor een grotere diffractievolgorde. Het nadeel van het gebruik van hogere diffractieorders is echter dat de intensiteit ervan vaak minder is.
Voor een rooster met 1000 perioden kan men een resolutie van $\Delta \lambda/\lambda =10^{-3}$ in de eerste orde verkrijgen.

Opgemerkt moet worden dat een rooster wordt verkregen voor elke periodieke variatie van de brekingsindex. Als de juiste transmissiefunctie voor de eenheidscel van het rooster wordt vervangen door $W_{slit}$, geven de bovenstaande formules ook het Fraunhofer-veld van dergelijke meer algemene diffractieroosters. Door de eenheidscel te veranderen, kan de omhulling van het diffractiepatroon worden gewijzigd en kan een bepaalde orde meer intensiteit krijgen. In {numref}`Fig_6_12_Blazed_grating` is een zogenaamd geblakerd rooster te zien, dat bij reflectie wordt gebruikt en dat een sterke eerste gediffracteerde orde heeft voor een bepaalde invalshoek.

```{figure} Images/Chapter_6/6_12_Blazed_grating.png
:name: Fig_6_12_Blazed_grating
Diffractierooster gebruikt bij reflectie met een zogenaamde "blazed unit cell".
```


**Opmerking**. Een periodieke rij spleten is een voorbeeld van een diffractierooster. Een rooster is een periodieke structuur, d.w.z. de brekingsindex is een periodieke functie van de positie.
Structuren kunnen periodiek zijn in één, twee en drie richtingen.
Een kristal fungeert als een driedimensionaal rooster waarvan de periode de periode van het kristal is, wat meestal een paar Angström is.
Elektromagnetische golven met een golflengte van minder dan één Angststrom worden röntgenstralen genoemd. Wanneer een bundel röntgenstralen een kristal verlicht, meet een detector in het verre veld het Fraunhofer-diffractiepatroon dat wordt gegeven door de intensiteit van de Fouriertransformatie van het gebroken nabije veld. Deze diffractieorden van kristallen voor röntgenstralen werden ontdekt door Von Laue en worden gebruikt om de atomaire structuur van kristallen te bestuderen.


## Fraunhofer Diffraction Revisited
Fraunhofer-diffractiepatronen kunnen kwalitatief worden verklaard door na te denken over richtingen waarin destructieve en constructieve interferenties optreden.
Beschouw twee onderling coherente puntbronnen $S_1$, $S_2$ op de $x$-as, zoals weergegeven in {numref}`Fig_6_13_2Sources`. We gaan ervan uit dat deze puntbronnen in fase zijn. Op een scherm op grote afstand $z$ wordt een interferentiepatroon waargenomen. Als de afstand $z$ van het scherm erg groot is, zijn de bolvormige golffronten die door de puntbronnen worden uitgezonden bijna vlak op het scherm en is het veld het Fraunhofer-veld van de twee puntbronnen. In punt $P$ op het scherm op een afstand $x$ boven de $z$-as worden de optische padverschillen van de golven die door de twee bronnen worden uitgezonden bij benadering gegeven door $S_2Q=a \theta$, waarbij $\theta=x/z$ klein wordt verondersteld. Vandaar dat constructieve interferentie optreedt voor hoeken $\theta$ zodanig dat
$S_2Q=m\lambda$ voor een geheel getal $m$, d.w.z. wanneer

```{math}
:label: eq.constr
\begin{align*}
\theta = m \frac{\lambda}{a}, \hspace{1cm} \text{constructieve interferentie}.
\end{align*}
```
Destructieve interferentie treedt op wanneer het verschil in weglengte voldoet aan $S_2Q=\lambda/2 + m \lambda$ voor een geheel getal $m$, dus voor hoeken

```{math}
:label: eq.destruct
\begin{align*}
\theta = ( 1/2 + m)\frac{\lambda}{a} \hspace{1cm} \text{destructieve interferentie}.
\end{align*}
```
Als de puntbronnen dezelfde sterkte hebben, heffen hun velden perfect op voor deze hoeken.

```{figure} Images/Chapter_6/6_13_2Sources.png
:name: Fig_6_13_2Sources
Interferentie van onderling coherente puntbronnen. Voor $z$ zijn zeer grote punten $P$ waar constructieve en destructieve interferentie optreedt zodanig dat voor sommige gehele getallen $m$: $S_2Q=m \lambda$ en $S_2Q=(1/2 + m) \lambda$, respectievelijk.
```

Beschouw nu een spleet zoals getoond in {numref}`Fig_6_14_Slits` die wordt verlicht door een loodrechte invallende vlakke golf.
Volgens het Huygens-Fresnel-principe is het veld op een scherm ver van de spleet de som van de velden van puntbronnen in de opening, met sterktes evenredig met het veld in de spleet op de positie van de puntbronnen. Wanneer de spleet wordt verlicht door een vlakke golf met een loodrechte inval, zijn alle puntbronnen in fase en hebben ze dezelfde sterkte. Verdeel de spleet in twee gelijke helften zoals weergegeven in Afb. {numref}`Fig_6_14_Slits`.
De puntbronnen in de spleet kunnen in paren worden gerangschikt, waarvan de ene puntbron zich in de bovenste helft van de spleet bevindt en de andere zich op dezelfde positie bevindt (op een afstand $a/2$ van de andere puntbron) in de onderste helft van de spleet. Laat $\theta$ een hoek zijn waarvoor de twee puntbronnen van een paar elkaar opheffen, d.w.z.

```{math}
:label: eq.destruct2
\begin{align*}
\theta= (1/2+ m) \frac{\lambda}{a/2} = (1+ 2m)\frac{\lambda}{a},
\end{align*}
```
aangezien de afstand tussen de puntbronnen $a/2$ is.
Door het paar puntbronnen door de spleten te bewegen, volgt dat beide halve spleten elkaar perfect opheffen voor deze hoeken. Op deze manier hebben we de hoeken $\theta = m\lambda/a$ gevonden met $m$ oneven waarvoor destructieve interferentie optreedt. Destructieve interferentie voor $m$ kan zelfs worden afgeleid door verdere onderverdelingen van het diafragma.


```{figure} Images/Chapter_6/6_14_Slit.png
:name: Fig_6_14_Slits
Door de spleet in twee spleten van elk $a/2$ te verdelen en paren van puntbronnen in aanmerking te nemen, waarvan de ene zich in de bovenste helft van de spleet bevindt en de andere op de overeenkomstige positie in de onderste helft, leiden hoeken waar destructieve interferentie optreedt tussen deze puntbronnen tot minima in het diffractiepatroon. Merk op dat de puntbronnen corresponderende posities hebben in de twee delen van de spleet als hun afstand $a/2$. is
```


Over het algemeen is het gemakkelijker om de hoeken te vinden waarvoor het verre veld verdwijnt dan om (lokale) maxima van het veld te vinden. Een uitzondering is het geval van een diffractierooster. Uit {numref}`Fig_6_15_Grating` volgt dat er constructieve interferentie zal zijn tussen aangrenzende perioden, en dus voor alle perioden, voor hoeken waarvoor de afstand $SQ$ in {numref}`Fig_6_15_Grating` een veelvoud is van de golflengte, d.w.z. voor

```{math}
:label: eq.order
\begin{align*}
\theta = m \frac{\lambda}{p},
\end{align*}
```
die overeenkomt met de richting van de diffractieorders. Voor andere hoeken lopen de fasen van de velden van de verschillende perioden sterk uiteen en daarom heffen de velden zich bijna op onder deze hoeken als er veel perioden zijn. Dit verklaart dat voor een diffractierooster van vele perioden, de intensiteit van het verre veld sterk geconcentreerd is in bepaalde richtingen die worden gegeven door de orders {eq}`eq.order` die alleen afhangen van de verhouding van de golflengte en de periode.

```{figure} Images/Chapter_6/6_15_Grating.png
:name: Fig_6_15_Grating
Als de hoek $\theta$ zodanig is dat $SQ$ een veelvoud is van de golflengte, interfereren twee aangrenzende perioden, en dus alle perioden van het rooster, constructief. Deze hoeken komen overeen met de diffractievolgordes.
```


## Fourier-optiek
In deze sectie passen we de diffractietheorie toe op een lens.
We kijken in het bijzonder naar het focussen van een parallelle bundel en de beeldvorming van een object.

### Scherpstellen van een parallelle bundel
Een lens induceert een lokale faseverandering in een invallend veld in verhouding tot de lokale dikte van de lens. Laat een vlakke golf die zich evenwijdig aan de optische as voortplant, invallen op een positieve lens. In de Gaussiaanse geometrische optica worden de invallende stralen allemaal in het brandpunt van het beeld gefocust. Volgens het principe van Fermat hebben alle stralen dezelfde optische afstand afgelegd wanneer ze elkaar kruisen in het brandpunt van het beeld, waar ze constructief interfereren en een maximale intensiteit veroorzaken. De golffronten bevinden zich in het brandpuntsgebied van **bollen met het brandpunt als midden** en worden afgesneden door de kegel met het brandpunt als top en openingshoek $2 a/f$, zoals weergegeven in {numref}`Fig_6_16_Focusing_Lens`. Achter het brandpunt bevindt zich een tweede kegel met opnieuw bolvormige golffronten, maar daar plant het licht zich voort *weg* van het brandpunt. Volgens de Gaussiaanse geometrische optica is het in de beeldruimte volledig donker buiten de twee kegels in {numref}`Fig_6_16_Focusing_Lens`. Zoals we echter zullen laten zien, is dit in diffractie-optica niet waar.

We nemen aan dat de lens dun is en kiezen als oorsprong van het coördinatenstelsel het centrum van de dunne lens met de positieve $z$-as langs de optische as. Laat $f_i$ de $z$-coördinaat zijn van het brandpunt van het beeld volgens de Gaussiaanse geometrische optica. Dan is $(0,0,f_i)$ het brandpunt van de afbeelding. Laat $(x,y,z)$ een punt zijn tussen de lens en dit brandpunt. Volgens geometrische optica is het veld in $(x,y,z)$ evenredig met

$$
\left\{
\begin{array}{lr}\frac{e^{- i k \sqrt{x^2 + y^2 + (z-f_i)^2}-i\omega t}}{\sqrt{x^2 + y^2 + (z-f_i)^2}},\\&\text{if } (x,y,z) \text{ bevindt zich in de kegel}, \\0,\\&\text{ if } (x,y,z) \text{ buiten de kegel} ligt,
\end{array}\right.
$$ (eq.sphericalw)

waarin we de tijdsafhankelijkheid hebben opgenomen. Inderdaad de oppervlakken van constante fase:

```{math}
\begin{align*}
-\sqrt{x^2 + y^2 + (z-f_i)^2}-\omega t=\text{constant},
\end{align*}
```
zijn bollen met het brandpunt als middelpunt. Gedurende de toenemende tijd convergeren deze bollen naar het brandpunt, terwijl de amplitude toeneemt naarmate de afstand tot het brandpunt kleiner wordt, zodat de energie behouden blijft.

**Opmerking**.
Voor een punt $(x,y,z)$  **rechts** ten opzichte van het brandpunt, d.w.z. voor $z>f_i$, planten de bolvormige golffronten zich voort weg van het brandpunt en daarom moet daar $-ik$ worden vervangen door $+ik$ in de exponent in {eq}`eq.sfericalw`.




De uittredepupil van de lens bevindt zich in het vlak $z=0$ waar, volgens {eq}`eq.sfericalw`, het veld is

```{math}
:label: eq.lens1
\begin{align*}
1_{\bigodot_a}(x,y) \frac{e^{-i k \sqrt{x^2 + y^2 + f_i^2}}}{
\sqrt{ x^2 + y^2 + f_i^2}},
\end{align*}
```
wanneer de tijdsafhankelijkheid is weggelaten en

```{math}
\begin{align*}
1_{\bigodot_a}(x,y)= \left\{ \begin{array}{l}1 \;\;\; \text{ if } x^2+y^2< a^2, \\0 \;\;\; \text{ anders}
\end{array}
\right.
\end{align*}
```
d.w.z. $1_{\bigodot_a}(x,y)=1$ voor $(x,y)$ in de uittredepupil van de lens en $=0$ anders.
Als $a/f_i$ voldoende klein is, kunnen we de afstand $\sqrt{x^2 +y^2 + f_i^2}$ tussen een punt in de uittredepupil en het beeldbrandpunt in de noemer van {eq}`eq.lens1` vervangen door $f_i$. Dit is echter niet toegestaan in de exponent vanwege de vermenigvuldiging met het grote golfgetal $k$. In de exponent gebruiken we daarom in plaats daarvan de eerste twee termen van de Taylor-reeks {eq}`eq.approxpar`:

```{math}
:label: eq.parax1
\begin{align*}
\sqrt{x^2 + y^2 + f_i^2} = f_i \sqrt{ 1 + \frac{x^2 + y^2 }{f_i^2}} \approx f_i + \frac{x^2 + y^2}{2f_i},
\end{align*}
```
die geldig is voor $a/f_i$ voldoende klein. Dan wordt {eq}`eq.lens1`:

```{math}
:label: eq.lens2
\begin{align*}
1_{\bigodot_a}(x,y) e^{-i k \frac{x^2 + y^2}{2 f_i}},
\end{align*}
```
waar we de constante factoren $e^{i k f_i}$ en $1/f_i$ hebben laten vallen.
Voor een algemeen veld $U_0(x,y)$ dat op de lens valt, d.w.z. in de intredepupil, past de lens een transformatie toe zodat het veld in het uittredevlak wordt:\\

```{math}
:label: eq.lens3
\boxed{\begin{align*}
& U_0(x,y) \to U_0(x,y) 1_{\bigodot_a}(x,y) e^{- i k \frac{x^2 + y^2}{2 f_i}}, \end{align*}}
```

De functie die $U_0(x,y)$ vermenigvuldigt is de **transmissiefunctie van de lens**:

```{math}
:label: eq.translens
\begin{align*}
\tau_{\text{lens}}(x,y) = 1_{\bigodot_a}(x,y) e^{-ik \frac{x^2 + y^2}{2 f_i}}.
\end{align*}
```
Dit resultaat is logisch: in het midden $(x,y)=0$ is de lens het dikst, dus de fase is het meest verschoven
(maar we kunnen deze faseverschuiving definiëren als nul, omdat alleen fase *verschillen* ertoe doen, niet de absolute fase).
Zoals aangegeven door het minteken in de exponent, hoe verder je van het midden van de lens af beweegt, hoe minder de fase wordt verschoven. Voor kortere $f_i$ stelt de lens sterker scherp, zodat de faseverschuiving sneller verandert als functie van de radiale coördinaat. Merk op dat de transmissiefunctie {eq}`eq.translens` modulus 1 heeft, zodat energie behouden blijft.

Het veld rechts van {eq}`eq.lens3` wordt in de diffractie-optica gebruikt als het veld in de uittredepupil. Maar in plaats van ray tracing te gebruiken, wordt het veld in het brandpuntsgebied berekend met behulp van diffractie-integralen.
We substitueren het veld in de uittredepupil in de Fresnel-diffractieintegraal {eq}`eq.FresnelF` en verkrijgen:

```{math}
\begin{align*}
U(x,y,z)=\frac{e^{ikz}e^{\frac{ik(x^2+y^2)}{2z}}}{i\lambda z} \mathcal{F}\left\{U_0(x',y') 1_{\bigodot_a}(x',y') e^{ik\frac{x'^2+y'^2}{2}\left(\frac{1}{z}-\frac{1}{f_i}\right)}\right\}\left(\frac{x}{\lambda z },\frac{y}{ \lambda z }\right).
\end{align*}
```
De intensiteit $I=|U|^2$ wordt linksonder in {numref}`Fig_6_16_Focusing_Lens` weergegeven. Het is te zien dat de intensiteit niet monotoon toeneemt bij het verkleinen van de afstand tot het brandpunt. In plaats daarvan komen secundaire maxima voor langs de optische as. Ook de grens van de lichtkegel is niet scherp, zoals voorspeld door geometrische optica, maar diffuus. Rechtsonder in {numref}`Fig_6_16_Focusing_Lens` staat de fase in het brandpuntsgebied. De golffronten bevinden zich dicht bij, maar niet precies bolvormig in de kegels.

```{figure} Images/Chapter_6/6_16_Focusing_Lens_Sketch_BW.png
:name: Fig_6_16_Focusing_Lens
Boven: golffronten van de invallende vlakke golf en het focusveld volgens Gaussiaanse geometrische optica. Er is geen licht buiten de twee kegels. Linksonder: amplitude zoals voorspeld door diffractie-optica. De grens van de kegels is diffuus en buiten de kegels is het niet absoluut donker. Bovendien neemt de intensiteit niet monotoon toe met afnemende afstand tot het brandpunt, zoals voorspeld door geometrische optica. Rechtsonder: fase van het scherpstelveld zoals voorspeld door diffractie-optica. 
```


Voor punten in het beeldbrandpuntsvlak van de lens, d.w.z. $z=f_i$, hebben we

```{math}
:label: fourierlens
\begin{align*}
U(x,y,f_i)= \frac{e^{ikf_i}e^{\frac{ik(x^2+y^2)}{2f_i}}}{i\lambda f_i} \mathcal{F}\left\{U_0(x',y')1_{\bigodot_a}(x',y') \right\}\left(\frac{ x}{ \lambda f_i},\frac{ y}{ \lambda f_i }\right),
\end{align*}
```
wat hetzelfde is als de Fraunhofer-integraal voor voortplanting over de afstand $f_i$!

```{note}
Het veld in de intredepupil van de lens en het veld in het brandpuntsvlak zijn met elkaar verbonden door een Fouriertransformatie (afgezien van een kwadratische fasefactor voor de integraal).
```

Er kan worden aangetoond dat de velden in het voorste brandpuntsvlak $U(x,y,-f_i)$ en het achterste brandpuntsvlak $U(x,y,f_i)$ **exact** gerelateerd zijn door een Fouriertransformatie, d.w.z. zonder de kwadratische fasefactor<sup>[^6]</sup> 
Een lens voert dus een Fouriertransformatie uit. Laten we eens kijken of dat overeenkomt met enkele van de feiten die we kennen uit de geometrische optica.

1. We weten uit de Gaussiaanse geometrische optica dat als we een positieve lens verlichten met stralen evenwijdig aan de optische as, deze stralen elkaar allemaal kruisen in het brandpunt van het beeld. Dit komt overeen met het feit dat voor $U_0(x,y)=1$ (d.w.z. vlakke golfverlichting, waarbij de eindige opening van de lens wordt verwaarloosd, d.w.z. diffractie wordt verwaarloosd vanwege de eindige grootte van de pupil), de Fouriertransformatie van het pupilveld een deltapiek is:

```{math}
:label: eq.F1
\begin{align*}
\mathcal{F}(U_0)\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi}\right)=\delta\left(\frac{k_x}{2\pi}\right)\delta\left(\frac{k_y}{2\pi}\right),
\end{align*}
```
die de perfecte gefocuste plek vertegenwoordigt (zonder diffractie).

2. Als we in de Gaussiaanse geometrische optica een lens verlichten met schuine parallelle lichtstralen (een vlakke golf die zich in een schuine richting voortplant), dan wordt het punt in het achterste brandpuntsvlak waar de stralen elkaar kruisen zijdelings verplaatst. Een gekantelde vlakke golf wordt beschreven door $U_0(\mathbf{r})=\exp(i\mathbf{k}_0\cdot\mathbf{r})$, en zijn Fouriertransformatie ten opzichte van $(x,y)$
wordt gegeven door

$$
\mathcal{F}\{U_0\}\left(\frac{k_x}{2\pi},\frac{k_y}{2\pi},z\right)=\delta\left(\frac{k_x-k_{0,x}}{2\pi}\right)\delta\left(\frac{k_y-k_{0,y}}{2\pi}\right),

$$
wat inderdaad een verschoven deltapiek is (d.w.z. een verschoven brandpunt).

Het lijkt erop dat het diffractiemodel van licht bevestigt wat we weten uit de geometrische optica. Maar in de vorige twee voorbeelden hebben we de invloed van de eindige grootte van de pupil buiten beschouwing gelaten, d.w.z. we hebben de functie $1_{\bigodot_a}$ bij het berekenen van de Fouriertransformatie buiten beschouwing gelaten. Als $U_0(x,y)=1$ in de intredepupil en we houden goed rekening met de eindige grootte van de pupil, dan worden de $\delta$-pieken wazig: het focusveld wordt dan gegeven door de Fouriertransformatie van de cirkelvormige schijf met straal $a$, geëvalueerd op ruimtelijke frequenties
$\xi = \frac{x}{\lambda f_i}$, $\eta =\frac{ y}{\lambda f_i}$. Dit veld wordt de **Airy spot** genoemd en wordt gegeven door (Zie {numref}`eq.FI13`):


```{math}
:label: eq.Airy_image
\boxed{\begin{align*}
U(x,y,z)=\frac{ \pi a^2}{\lambda f_i} \, \frac{ 2 J_1\left(2\pi \frac{ a }{\lambda f_i } \sqrt{x^2 + y^2} \right) }
{ \frac{2\pi a }{\lambda f_i } \sqrt{x^2 + y^2} }, \hspace{1cm} \textbf{Luchtig patroon voor scherpstellen},
\end{align*}}
```

waarbij $J_1$ de Bessel-functie van de eerste soort is en waar de fasefactoren voor de Fouriertransformatie zijn weggelaten. Het patroon is te zien in {numref}`Fig_6_17_AirySpot`. Het is cirkelvormig symmetrisch en bestaat uit een centraal maximum omgeven door concentrische ringen van afwisselend nullen en secundaire maxima met afnemende amplitudes. In doorsnede, als functie van $r=\sqrt{x^2+y^2}$, is het Airy-patroon vergelijkbaar (maar niet identiek) met de $\text{ sinc}$-functie. Uit het in {numref}`Fig_6_07_Uncertainty` geïllustreerde onzekerheidsprincipe volgt dat de grootte van het brandpunt afneemt naarmate $a$ toeneemt, en uit {eq}`eq.Airy_image` zien we dat de Airy-functie een functie is van de dimensieloze variabele $a r/(\lambda f_i)$. Vandaar dat het brandpunt smaller wordt naarmate $a/(\lambda f_i)$ toeneemt. De numerieke apertuur ($\textit{NA}$) wordt gedefinieerd door

```{math}
\boxed{ \begin{align*}
\text{NA}=\frac{a}{f_i}, \hspace{1cm} \textbf{numerieke apertuur}.
\end{align*}}
```

Aangezien de eerste nul van het Airy-patroon optreedt voor $a r/(\lambda f_i)= 0.61$, kan de breedte van het brandpuntspunt worden geschat door


```{math}
:label: eq.resolution
\boxed{\begin{align*}
\textbf{Grootte van brandpuntspunt} \approx 0,61 \frac{\lambda}{\text{NA}}
\end{align*}}
```


```{figure} Images/Chapter_6/AiryDisk_Color_220405.png
:name: Fig_6_17_AirySpot
Left: dwarsdoorsnede van het veld van het Airy-patroon. Rechts: intensiteit van het Airy-patroon.
```

**Opmerking**.
In het eenvoudige geval van een enkele dunne lens vallen de in- en uitgangspupillen samen met de lens zelf. Zoals is uitgelegd in Sectie {eq}`section.Stops`, de uittredepupil in systemen die uit meerdere lenzen bestaan, is het reële of virtuele beeld van de diafragmastop onder alle optische lenzen rechts van de stop. Om het effect van diffractie in dergelijke meer gecompliceerde systemen te modelleren, wordt verondersteld dat diffractie volledig in de uittredepupil plaatsvindt. Het veld in de uittredepupil wordt eerst bepaald door niet-paraxiale ray tracing en wordt vervolgens geïntegreerd over de uittredepupil met behulp van de Fresnel-diffractieintegraal.

### Beeldvorming door een lens
Uit de afleidingen in de vorige paragraaf volgt dat het Airy-patroon het beeld is van een puntbron die oneindig ver voor een lens ligt. In deze sectie bestuderen we de beeldvorming van een algemeen object op eindige afstand tot de lens.
Beschouw eerst een reëel puntobject op de optische as met coördinaat $z=s_o<f_o$ links van het objectbrandpunt van een positieve lens met beeldbrandpuntscoördinaat $f_i>0$. Deze lens vormt een echt beeld met een positieve coördinaat $s_i>0$.

Het veld in de beeldruimte wordt afgeleid met behulp van de Fresnel-diffractie-integraal, vergelijkbaar met het focusveld in de vorige paragraaf. We veronderstellen dat de lens het veld dat door het puntobject wordt uitgestraald, omzet in een sferische golf in de uittredepupil, die convergeert naar het ideale beeldpunt van de Gaussiaanse geometrische optica. We substitueren dit bolvormige pupilveld in de Fresnel-diffractie-integraal om het veld in de beeldruimte te berekenen. Dan vinden we voor een objectpunt op de optische as hetzelfde Airy-patroon als in {numref}`Fig_6_17_AirySpot`, behalve dat de variabele $a r/(\lambda f_i)$ is vervangen door
$a r/(\lambda s_i)$,
waarbij $s_i$ de beeldcoördinaat is zoals gegeven door de formule van de Lensmaker. Dit veld wordt de Point Spread Function (PSF) genoemd:


```{math}
:label: eq.PSF
\boxed{\begin{align*}
\text{PSF}(x,y) =\frac{ \pi a^2}{\lambda s_i} \frac{J_1\left(2\pi \frac{ a }{\lambda s_i } \sqrt{x^2 + y^2} \right) }{ \frac{2\pi a }{\lambda s_i } \sqrt{x^2 + y^2} }, \hspace{1cm} \textbf{Luchtig patroon voor beeldvorming}.
\end{align*}}
```

Voor objectpunten die zich niet op de optische as bevinden, wordt de PSF zodanig verplaatst dat deze gecentreerd blijft op het ideale Gaussiaanse beeldpunt.

Een algemeen objectveld $U_o(x,y) $ kan worden beschouwd als een superpositie van puntobjecten en de afbeeldingen van deze punten worden gegeven door verplaatste PSF's:

$$
\text{PSF}(x-x_i, y-y_i),

$$
waarin $(x_i, y_i)$ de transversale coördinaten van het beeldpunt zijn volgens de Gaussiaanse geometrische optica.
Het totale beeldveld wordt verkregen door deze PSF's op te tellen (te integreren), gewogen door het veld op de objectpunten:

```{math}
:label: eq.imaging
\begin{align*}
U_{i}(x,y,s_i) =
\int\!\int \text{PSF}\left(x-Mx_o, x-My_o \right) U_o(x_o,y_o,s_o)\, \text{d}x_o \text{d}y_o.
\end{align*}
```
waarbij $x_o=x_i/M$, $y_o=y_i/M$ het afbeeldingspunt is en $M$ de vergroting.
Van de integraal kan een convolutie worden gemaakt door de coördinaten $x_i, y_i$ als integratievariabelen te gebruiken.

Uit {eq}`eq.PSF` volgt dat een grotere straal $a $ van de lens en een kleinere golflengte $\lambda$ een smallere PSF impliceren.
Dit impliceert op zijn beurt dat de kern in de convolutie scherper piekt en dus dat de resolutie van het beeld hoger is
<sup>[^7]</sup>. Als alternatief zou men kunnen denken aan het diafragma van de lens dat de hogere ruimtelijke frequenties wegsnijdt, zoals weergegeven in {numref}`Fig_6_05_FourierFilter`, wat leidt tot verlies van resolutie van de Fouriertransformatie die in het beeldvlak wordt waargenomen.


**Opmerkingen**
1. Als laserlicht wordt gebruikt om het object te verlichten, kan het objectveld als perfect coherent worden beschouwd. Dit houdt in dat een detector in het beeldvlak de kwadraatmodulus van het complexe veld meet {eq}`eq.imaging` :

```{math}
:label: eq.intenscoh
\begin{align*}
I_i(x,y,s_i) = \left| \int\!\int \text{PSF}\left(x-M x_o, y- My_o \right) U_o(x_o,y_o,s_o)\, \text{d}x_o \text{d}y_o \right|^2.
\end{align*}
```
In dit geval wordt het systeem een **coherent beeldvormingssysteem** genoemd. 

2. Als het object een ruimtelijk incoherente uitgebreide bron is, kunnen de velden die worden uitgezonden door de puntbronnen waaruit de uitgebreide bron bestaat, niet interfereren met het beeldvlak. Daarom wordt in dit geval de intensiteit in het beeldvlak gegeven door de incoherente som:

```{math}
:label: eq.intensincoh
\begin{align*}
I_i(x,y,s_i) = \ \int\!\int \left|\text{PSF}\left(x-M x_o, y- M x_o \right)\right|^2 \, I_o(x_o,y_o,s_o)\, \text{d}x_o \text{d}y_o,
\end{align*}
```
waarbij $I_o=|U_o|^2$ de intensiteitsverdeling van de uitgebreide bron is.
Vandaar dat de beeldintensiteit wordt uitgedrukt in de intensiteit van de bron door een convolutie met de intensiteit van de PSF. Dit systeem wordt een **incoherent beeldvormingssysteem** genoemd.

3. Een object wordt vaak verlicht door een ruimtelijk onsamenhangende uitgebreide lichtbron en vervolgens in beeld gebracht. Volgens de discussie in Sectie {eq}`section.scprop` is het veld dat het object verlicht dan gedeeltelijk coherent. Het is coherenter wanneer de hoek die de bron bij het object uitbreidt kleiner is. De intensiteit in het beeldvlak kan worden berekend door de ruimtelijk incoherente bron op te splitsen in voldoende veel onderling incoherente puntbronnen en de intensiteiten in het beeldvlak te berekenen als gevolg van de verlichting van het object door elke afzonderlijke puntbron. De totale intensiteit in het beeldvlak is dan de som van deze intensiteiten.

4. We hebben alleen de scalaire diffractietheorie beschouwd. Voor een lens met een numerieke apertuur groter dan 0,6 kan de verandering van polarisatie echter belangrijk zijn. Dan is een meer algemene diffractietheorie nodig <sup>[^8]</sup>.

### Ruimtelijke lichtmodulatoren en optische Fourier-filtering

- **SLM.** Het veld in de intredepupil van een lens, in het bijzonder de fase, kan ruimtelijk worden veranderd door een zogenaamde **spatial light modulator** (SLM). Een SLM heeft duizenden pixels waarmee zeer algemene focusvelden kunnen worden gemaakt.
Een voorbeeld is een focusveld met alleen een longitudinale component in het brandpunt (d.w.z. alleen de $E_z$-component is niet-nul in het brandpunt) <sup>[^9]</sup>. 

- **Fourierfiltering.** Stel dat we de opstelling hebben zoals weergegeven in {numref}`Fig_6_18_Fourier_Filtering`. Met één lens kunnen we de Fouriertransformatie van een veld maken $U(x,y)$. Laat een masker in het brandpuntsvlak plaatsen en een tweede lens gebruiken om het licht opnieuw te focussen.
Dit impliceert dat de amplitude en/of fase van de vlakke golven in het hoekspectrum van het veld worden gemanipuleerd.
De procedure wordt Fourierfiltering met behulp van lenzen genoemd. Een toepassing van dit idee is de fasecontrastmicroscoop.



```{figure} Images/Chapter_6/6_18_Fourier_Filtering.png
:name: Fig_6_18_Fourier_Filtering
Set-up voor Fourier-filtering. De eerste lens creëert een Fouriertransformatie van $U(x,y)$, waarop we een bewerking kunnen toepassen (bijvoorbeeld het toepassen van verschillende faseverschuivingen op verschillende delen van het veld). De tweede lens past dan nog een Fouriertransformatie toe (die hetzelfde is als de inverse Fouriertransformatie en een spiegeltransformatie).
```


## Superresolutie
We hebben benadrukt dat vluchtige golven de ultieme grens stellen aan de resolutie in de optica. In Hoofdstuk {eq}`chapter.GeomOptics` werd uitgelegd dat, hoewel men binnen de geometrische optica een enkel punt perfect kan afbeelden met behulp van conische oppervlakken, meerdere punten, laat staan een verlengd object, niet perfect kunnen worden afgebeeld.
Verder werd uitgelegd dat wanneer alleen paraxiale stralen worden beschouwd, d.w.z. binnen de Gaussiaanse geometrische optica, een perfecte beeldvorming van uitgebreide objecten mogelijk is. Stralen waarvan de hoek met de optische as groot is, veroorzaken echter aberraties. Maar zelfs als perfecte beeldvorming mogelijk zou zijn in geometrische optica, kan een echt beeld nooit perfect zijn vanwege het feit dat informatie in de amplitudes en fase van de vluchtige golven zich niet kan voortplanten.
De resolutie die kan worden verkregen met een optisch systeem bestaande uit lenzen is minder dan volgt uit het verlies van informatie als gevolg van vluchtige golven, omdat voortplantende golven met ruimtelijke frequenties die te groot zijn om door het optische systeem te worden opgevangen (d.w.z. golven waarvan de hoeken met de optische as groter zijn dan de numerieke apertuur) niet kunnen bijdragen aan het beeld. Daarom heeft de afbeelding van een puntobject de grootte

```{math}
:label: eq.resol
\begin{align*}
\lambda/\textit{NA}_i,
\end{align*}
```
waarin $\textit{NA}_i=a/s_i$ de numerieke apertuur in de beeldruimte is, d.w.z. het is de sinus van de helft van de openingshoek van de kegel die wordt verlengd door de uittredepupil op het Gaussiaanse beeldpunt op de optische as. Deze resolutielimiet wordt de diffractielimiet genoemd.
De grootte van de afbeelding van een punt zoals gegeven door de PSF in {eq}`eq.PSF` wordt beïnvloed door de vergroting van het systeem. Om de resolutie van een diffractiebeperkt systeem te karakteriseren, is het daarom beter om de numerieke apertuur aan de objectzijde te beschouwen: $\textit{NA}_o = \textit{NA}_i |M| = A/s_o$. De waarde van $\textit{NA}_o$ is de sinus van de halve hoek van de kegel die wordt ingesloten door de ingangspupil van het systeem op het objectpunt op de optische as. Dit is de kegel van golfvectoren die door dit objectpunt worden uitgezonden en die kunnen bijdragen aan het beeld (ze worden "geaccepteerd" door het optische systeem). Hoe groter de halve hoek van deze kegel, hoe meer ruimtelijke frequenties kunnen bijdragen aan het beeld en dus hoe groter de informatie over fijnere details van het object die het beeldvlak kan bereiken.
Het zou inmiddels duidelijk moeten zijn dat het verslaan van de diffractielimiet uiterst moeilijk is. Toch is veel onderzoek in de optica gericht op het realiseren van dit doel. Er zijn vele pogingen ondernomen, sommige succesvol, andere niet, maar of ze nu succesvol waren of niet, de meeste waren gebaseerd op zeer ingenieuze ideeën. Om dit hoofdstuk over de diffractietheorie af te sluiten, zullen we voorbeelden geven van pogingen om te bereiken wat superresolutie wordt genoemd.

- **Confocale microscopie.** Een gefocusseerde spot wordt gebruikt om het object te scannen en het gereflecteerde veld wordt afgebeeld op een kleine detector (''puntdetector'').
De resolutie is ongeveer een factor 1,5 beter dan bij normale beeldvorming met een volledig gezichtsveld met hetzelfde objectief. De hogere resolutie wordt bereikt dankzij de verlichting door schuine vlakke golven die aanwezig zijn in de ruimtelijke Fouriertransformatie van de lichtgevende spot. Door verlichting met vlakke golven met grote invalshoeken worden hogere ruimtelijke frequenties van het object, die bij normale inval niet door het objectief worden geaccepteerd, nu "teruggevouwen" tot de kegel van vlakke golven die door het objectief worden geaccepteerd. De hogere resolutie gaat ten koste van een langere beeldvormingstijd vanwege het scannen. De confocale microscoop werd in 1957 uitgevonden door Marvin Minsky.

- **De perfecte lens op basis van negatieve breking.** Er kan worden aangetoond dat een plaat van een materiaal met **negatieve permittiviteit** en **negatieve permeabiliteit**, die tegengesteld zijn aan de permittiviteit en permeabiliteit van het omringende medium, er geen reflectie is op de grensvlakken. Bovendien is de fasesnelheid in een materiaal met een negatieve permittiviteit en negatieve permeabiliteit tegengesteld aan de richting van de energiestroom en worden vlakke golven gebroken op het grensvlak alsof de brekingsindex in de wet van Snellius negatief is. Daarom worden deze media negatieve indexmedia genoemd. Omdat de fasesnelheid tegengesteld is aan de energiesnelheid, is het alsof de tijd in de plaat wordt omgekeerd. De verandering van fase van voortplantingsgolven van het veld van puntbron als gevolg van voortplanting in het omringende medium wordt omgekeerd in de plaat en op enige afstand aan de andere kant van de plaat is er een beeldpunt waar alle voortplantingsgolven in fase zijn, zoals geïllustreerd in
Afb. {numref}`Fig_6_19_Pendry_Lens`. Bovendien neemt de amplitude van vluchtige golven amplitude **toe** in de plaat en het blijkt dat ze dezelfde amplitude hebben in het beeldpunt als in de bron, vandaar dat het beeldpunt perfect is. Merk op dat de toename van de amplitude van een vluchtige golf het behoud van energie niet schendt, omdat een vluchtige golf geen energie voortplant in de richting waarin deze vluchtig is.

```{figure} Images/Chapter_6/6_19_Pendry_Lens.png
:name: Fig_6_19_Pendry_Lens
De perfecte lens van Pendry bestaat uit een plaat van een materiaal met een negatieve permittiviteit en negatieve permeabiliteit, zodat de absolute waarden gelijk zijn aan de positieve permittiviteit en positieve permeabiliteit van het omringende medium. Punten buiten de plaat worden perfect afgebeeld in twee vlakken: één in de plaat en de andere aan de andere kant van de plaat.
```

De eenvoudige plaatgeometrie die te zien is in {numref}`Fig_6_19_Pendry_Lens` die als een perfecte lens fungeert, werd voorgesteld door John Pendry in 2000 <sup>[^10]</sup>. Helaas is er in de natuur geen materiaal gevonden met een negatieve permittiviteit en negatieve permeabiliteit. Daarom hebben veel onderzoekers geprobeerd een dergelijk materiaal na te bootsen door metalen en diëlektrica op een subgolflengteschaal te mengen. Het lijkt erop dat een negatieve index zonder absorptie in strijd is met de causaliteit. Maar als er absorptie is, is het beeld niet meer perfect.

- **Hyperbolische materialen.** Hyperbolische materialen zijn anisotroop, d.w.z. de fasesnelheid van een vlakke golf hangt af van de polarisatie en van de richting van de golfvector. De permittiviteit van een anisotroop materiaal is een tensor (losjes gezegd een (3,3)-matrix). Normaal gesproken zijn de eigenwaarden van de permittiviteitsmatrix positief; In een hyperbolisch materiaal zijn echter twee eigenwaarden van gelijk teken en de derde heeft een tegengesteld teken. In zo'n medium planten alle golven met de zogenaamde buitengewone staat van polarisatie zich voort, hoe hoog de ruimtelijke frequenties ook zijn. Vandaar dat voor de buitengewone staat van polarisatie geen verdampingsgolven bestaan en daarom zouden superresolutie en perfecte beeldvorming mogelijk moeten zijn in een dergelijk medium.

```{figure} Images/Chapter_6/6_20_Metamaterials.jpg
:name: Fig_6_20_Multilayers
Voorbeelden van composietmaterialen die bestaan uit dunne (subgolflengte) lagen metalen en diëlektrica. Deze kunstmatige materialen worden metamaterialen genoemd. \footnotesize{(A. Poddubny, I. Iorsh, P. Belov, \& Y. Kivshar, *Hyperbolic Metamaterials*, {N}at. {P}hoton., 7(12), 948-957 [(2013)](https://doi.org/10.1038/nphoton.2013.243)).}
```

Er bestaan een paar natuurlijke hyperbolische media voor zichtbare frequenties, maar er zijn er meer in het midden-infrarood. Onderzoekers proberen hyperbolische media te benaderen aan de hand van metamaterialen, bijvoorbeeld gemaakt van meerlagen die bestaan uit afwisselend dunne metaal- en diëlektrische lagen, zodat de effectieve permittiviteit de gewenste hyperbolische eigenschap heeft. Ook metallische nanopilars ingebed in een diëlektricum worden gebruikt.

- **Niet-lineaire effecten.** Wanneer de brekingsindex van een materiaal afhankelijk is van het lokale elektrische veld, is het materiaal niet-lineair. Bij optische frequenties zijn niet-lineaire effecten over het algemeen erg klein, maar met een sterke laser kunnen ze significant worden. Een van de effecten is zelffocus, waarbij de brekingsindex evenredig is met de lokale lichtintensiteit. De lokaal hogere intensiteit veroorzaakt een toename van de brekingsindex, wat leidt tot een golfgeleidend effect waardoor de bundel nog sterker focust. Vandaar dat de gefocusseerde bundel tijdens de voortplanting steeds smaller wordt, totdat het materiaal uiteindelijk afbreekt.

- **Gestimuleerde Emissie Depletie Microscopie (STED).** Deze techniek werd in 1986 in de USSR uitgevonden door V.A. Okhonin en werd in de jaren negentig verder ontwikkeld door Stefan Hell en zijn medewerkers. Hell ontving in 2014 de Nobelprijs voor scheikunde voor zijn werk. STED is een niet-lineaire techniek waarmee superresolutie in fluorescentiemicroscopie kan worden bereikt. Beelden gemaakt met een fluorescentiemicroscoop zijn wazig wanneer de fluorescerende moleculen heel dicht bij elkaar staan. In de STED-microscoop wordt een speciale truc gebruikt om ervoor te zorgen dat moleculen die tegelijkertijd fluoresceren voldoende ver van elkaar verwijderd zijn, zodat ze afzonderlijk kunnen worden afgebeeld. Om dit te bereiken worden twee gefocuste spots gebruikt: de eerste spot prikkelt de moleculen naar een hoger niveau. De tweede vlek is licht rood verschoven en heeft een donutvorm (zie afb. {numref}`Fig_6_21_STED_Small`). Het veroorzaakt verval van de geëxciteerde moleculen naar het lagere niveau door gestimuleerde emissie (de aangeslagen toestand is uitgeput). Door de donutvorm van de tweede vlek wordt het molecuul in het midden van de vlek niet aangetast en zal het toch fluoresceren. Cruciaal is dat een donutvlek een centraal donker gebied heeft dat erg smal is, d.w.z. het kan veel kleiner zijn dan de Airy-vlek en dit is de reden voor de superresolutie.

```{figure} Images/Chapter_6/6_21_STED_Large.png
:name: Fig_6_21_STED_Small
vlek gebruikt voor excitatie (linksboven) en voor uitputting (midden boven). Fluorescentiesignaal rechtsboven. In de onderste figuur wordt het confocale beeld vergeleken met het STED-beeld. (P.F. Rodriguez e.a., *Building a fast scanning stimulated emission depletion microscope*, Materials Science [(2012)](https://www.semanticscholar.org/paper/Building-a-fast-scanning-stimulated-emission-a-step-Rodriguez-Wu/46d8c4148e93f30cf11e1ae4356620bd5fcd0475))
```




```{admonition} Externe bronnen in aanbevolen volgorde
1. [Every picture is made of waves - Sixty Symbols, 3:33 to 7:15](https://www.youtube.com/watch?v=mEN7DTdHbAU): Basisuitleg van Fouriertransformaties.
2. [Heisenberg's Microscope - Sixty Symbols, 0:20 to 2:38](https://www.youtube.com/watch?v=dgoA_jmGIcA): Basisuitleg van het onzekerheidsprincipe (hoewel in de context van de kwantumfysica).
3. E. Hecht, *Optics*, \S 7.4.4, subsectie '*Fourieranalyse en diffractie*'.
4. J. Goodman, *Introduction to Fourier Optics*, \S5.2.2: Verschillende berekeningen over de Fourier-transformerende eigenschappen van lenzen.
5. E. Hecht, *Optics*, \S 10.2.6, subsectie '*Resolutie van beeldvormingssystemen*'.
```



[^1]: [Elke afbeelding is gemaakt van golven - Zestig symbolen, 3:33 tot 7:15](https://www.youtube.com/watch?v=mEN7DTdHbAU): Basisuitleg van Fouriertransformaties. Zie ook sectie [](sec:fourierintuition).

[^2]: Voor een rigoureuze afleiding zie b.v. [J. Goodman, *Introduction to Fourier Optics](http://iate.oac.uncor.edu/ manuel/libros/Optics/Introduction\%20to\%20Fourier\%20Optics\%202nd\%20-\%20J.\%20Goodman.pdf), \S3.3, \S3.4, \S3.5* - en *Lecture Notes of Advanced Photonics*, Technische Universiteit Delft. 

[^3]: Zie de cursus Advanced Photonics gegeven aan de TUDelft.

[^4]: [Heisenberg's Microscope - Sixty Symbols, 0:20 tot 2:38](https://www.youtube.com/watch?v=dgoA_jmGIcA): Basisverklaring van het onzekerheidsprincipe (hoewel in de context van de kwantumfysica)

[^5]: Voor een bewijs zie
A.E. Siegman, *Lasers*

[^6]:  J.W. Goodman, [Introduction to Fourier Optics](http://iate.oac.uncor.edu/&nbsp;manuel/libros/Optics/Introduction\%20to\%20Fourier\%20Optics\%202nd\%20-\%20J.\%20Goodman.pdf), &sect;5.2.2* - Berekeningen van de fourier tansformatie eigenschappen van lenzen.

[^7]: Hecht &sect; 10.2.6 '*Resolutie van beeldvormingssystemen*'.

[^8]: J.Braat et al. Imaging Optics, Cambridge University Press, 2019

[^9]: Zie Phys. Rev. Lett. 100, 123904, 2008

[^10]: J.B. Pendry, PRL 18, 2000

