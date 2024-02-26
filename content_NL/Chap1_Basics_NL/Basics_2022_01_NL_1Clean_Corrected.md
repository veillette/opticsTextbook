(chapter.basics)=
# Basis elektromagnetische en golfoptica

```{admonition} Wat je moet weten en kunnen na het bestuderen van dit hoofdstuk
Dit hoofdstuk gaat over de vergelijkingen van Maxwell en is een voorwaarde voor de rest van het boek. Er wordt verondersteld dat de lezer al bekend is met elektromagnetisme op bachelorniveau. Daarom zijn de behandelingen van Maxwells vergelijkingen in de materie, de randvoorwaarden op grensvlakken, elektromagnetische energie, het veld van een elektrische dipool en de reflectie en transmissie op een grensvlak vrij beknopt.

Na het bestuderen van dit hoofdstuk zou je moeten weten en in staat moeten zijn om:
- De scalaire golfvergelijking voor de elektromagnetische veldcomponenten af te leiden uit de vergelijkingen van Maxwell.
- Met de complexe notatie van tijdharmonische velden te werken.
- Tijdharmonische vlakke golven, sferische golven en het concept van golffronten te begrijpen.
- De belangrijkste eigenschappen van het veld dat wordt uitgestraald door een tijdharmonische elektrische dipool kennen en begrijpen dat dit de fundamentele oplossing is van de vergelijkingen van Maxwell waaruit de straling van elke tijdharmonische bron kan worden afgeleid.
- Kwalitatief begrijpen van het verre veld stralingspatroon van een tijdharmonische elektrische dipool (je hoeft de formules niet te kennen).
- Langdurige gemiddelden van producten van tijdharmonische functies af te leiden.
- De snelheid van de energiestroom te berekenen met behulp van de Poynting-vector en het langetermijngemiddelde. De afleiding van de wet van behoud van elektromagnetische energie maakt geen deel uit van het examen.
- De methode voor het afleiden van de reflectie en transmissie van een invallende vlakke golf op een grensvlak door te scheiden in s- en p-gepolariseerde toestanden te begrijpen.
De formules voor de Fresnel-coëfficiënten hoef je niet uit je hoofd te kennen.
- De Brewster-hoek, totale interne reflectie en vluchtige golven te begrijpen.
- Het principe van het geleiden van elektromagnetische golven te begrijpen.
```


De vergelijkingen van Maxwell geven een zeer complete beschrijving van licht, inclusief diffractie, interferentie en polarisatie. Toch is het strikt genomen niet helemaal nauwkeurig, omdat het monochromatische elektromagnetische golven in staat stelt om elke hoeveelheid energie te dragen, terwijl volgens de kwantumoptica de energie gekwantiseerd is. Volgens de kwantumoptica is licht een stroom van massaloze deeltjes, de fotonen, die elk een extreem kleine hoeveelheid energie dragen: $\hbar\omega$, waarbij $\hbar = 6,63 \times 10^{-34}/(2\pi)$ Js en $\omega$ de frequentie is, die voor zichtbaar licht in de orde van grootte van $5 \times 10^{14}$ Hz ligt. Vandaar dat voor zichtbaar licht $\hbar\omega \approx 3,3\times {10^{-19}}$ J.

Kwantumoptica is alleen van belang bij experimenten met een klein aantal fotonen, d.w.z. bij zeer lage lichtintensiteiten en voor speciaal geprepareerde fotonentoestanden (bijv. verstrengelde toestanden) waarvoor geen klassieke beschrijving bestaat. In bijna alle toepassingen van de optica zenden de lichtbronnen zoveel fotonen uit dat kwantumeffecten irrelevant zijn, zie afb. {numref}`table:3_1Hecht`.

```{table} De gemiddelde fotonfluxdichtheid voor enkele veelvoorkomende bronnen
:name: table:3_1Hecht
| Lichtbron | Aantal fotonen/s.m$^2$|
| ---- | :--: |
| 
|
| Laserstraal (10m W, He-Ne, gericht op 20 $\mu$m) | $10^{26}$|
| Laserstraal (1 mW, He-Ne) | $10^{21}$|
| Fel zonlicht op aarde | $10^{18}$|
| Lichtniveau binnenshuis | $10^{16}$|
| Schemering | $10^{14}$|
| Maanlicht op aarde| $10^{12}$|
| Sterrenlicht op aarde | $10^{10}$|
```

Het zichtbare deel is slechts een klein deel van het totale elektromagnetische spectrum (zie afb. {numref}`Fig_1_01_Electromagnetic_Spectrum`). De resultaten die we zullen afleiden zijn echter over het algemeen geldig voor elektromagnetische golven van elke frequentie.


```{figure} Images/Chapter_1/1_01_Electromagnetic_Spectrum_f1.png
:name: Fig_1_01_Electromagnetic_Spectrum
Het elektromagnetische spectrum. (uit [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:EM_Spectrum_Properties_edit.svg) door NASA/ CC BY-SA )}.
```


## De Maxwell-vergelijkingen in vacuüm

In een vacuüm wordt licht wiskundig beschreven door vectorvelden $\mathbf{\mathcal{E}}(\mathbf{r},t)$ [Volt/m]<sup>[^1]</sup> en $\mathbf{\mathcal{B}}(\mathbf{r},t)$ [Tesla=Weber/$\text{m}^2$=\\
g/(C.s)], die extreem snel variëren met de positievector $\mathbf{r}$ en tijd $t$.
Deze vectorvelden worden traditioneel respectievelijk de elektrische veldsterkte en de magnetische inductie genoemd, en samen worden ze "het elektromagnetische veld" genoemd. Deze terminologie wordt verklaard door het feit dat, omdat deze velden in de optica variëren met de tijd, de elektrische en magnetische velden altijd samen voorkomen, d.w.z. de een bestaat niet zonder de ander. Alleen als de velden onafhankelijk zijn van de tijd, kan er een elektrisch veld zijn zonder magnetisch veld en omgekeerd. Het eerste geval wordt elektrostatica genoemd, het tweede magnetostatica.
Tijdsafhankelijke elektromagnetische velden worden opgewekt door bewegende elektrische ladingen, de zogenaamde bronnen. Laat de bron ladingsdichtheid $\rho(\mathbf{r},t)$ [C/$\text{m}^3$] en stroomdichtheid $\mathbf{\mathcal{J}}(\mathbf{r},t)$ [C/(s.$\text{m}^2$] hebben. Aangezien lading niet kan worden gecreëerd of vernietigd, moet de snelheid $V$ waarmee de lading in een volume toeneemt gelijk zijn aan de stroom van ladingen die door het oppervlak $S$ gaan van de buitenkant naar de binnenkant van $V$, d.w.z.:

```{math}
:label: eq.maxum1
\begin{align*}
\frac{d}{d t} \int_V \varrho\, \mathrm{d}V= -\int_S \mathbf{\mathcal{J}} \cdot \hat{\mathbf{n}} \, \mathrm{d}S,
\end{align*}
```
waarin $\hat{\mathbf{n}}$ de naar buiten wijzende eenheid normaal is op $S$. Met behulp van de divergentiestelling van Gauss {eq}`eq. VR14` kan de linkerkant van {eq}`eq.maxum1` worden omgezet in een volume-integraal waaruit de differentiaalvorm van de wet van behoud van lading volgt:

```{math}
:label: eq.maxum2
\begin{align*}
-\mathbf{\nabla} \cdot \mathbf{\mathcal{J}} = \frac{\partial \rho}{\partial t}.
\end{align*}
```
Op elk punt in de ruimte en op elk moment voldoen de veldvectoren aan de Maxwell-vergelijkingen<sup>[^2]</sup>$^{, }$<sup>[^3]</sup>:


```{math}
:label: eq.faraday0
\begin{align*}
\mathbf{\nabla} \times \mathbf{\mathcal{E}} & = -\frac{\partial \mathbf{\mathcal{B}}}{\partial t}, & \text{Law's Faraday},
\end{align*}
```
```{math}
:label: eq.maxwell0
\begin{align*}
\\
\mathbf{\nabla} \times \frac{\mathbf{\mathcal{B}}}{\mu_0} & = \epsilon_0 \frac{\partial \mathbf{\mathcal{E}}}{\partial t}+ \mathbf{\mathcal{J}}, & \text{Wet van Maxwell}, \end{align*}
```
```{math}
:label: eq.gauss0
\begin{align*}
\\
\mathbf{\nabla} \cdot \epsilon_0 \mathbf{\mathcal{E}} & = \varrho, & \text{De wet van Gauss},\end{align*}
```
```{math}
:label: eq.divH0
\begin{align*}
\mathbf{\nabla} \cdot \mathbf{\mathcal{B}} & = 0, & \text{geen magnetische lading}.\end{align*}
```
waarin  $\epsilon_0= 8,8544 \times 10^{-12}$ C $^2$N$^{-1}$m$^{-2}$ de diëlektrische permittiviteit is en $\mu_0 = 1,2566 \times 10^{-6} \text{m kg C}^{-2}$ is de magnetische permeabiliteit van vacuüm. De grootheid $c=(1/\epsilon_0\mu_0)^{1/2}=2.997924562 \times 10^{8} \pm 1.1$ m/s is de lichtsnelheid in vacuüm en $Z=\sqrt{\mu_0/\epsilon_0}=377\Omega =377 $Vs/C is de impedantie van vacuüm.

% Er werden krachten waargenomen die tussen de plaatselijke ladingsverdelingen werkten.

```{index} Maxwell Equations
:name: section.maxmat
```

Atomen zijn neutraal en bestaan uit een positief geladen kern omgeven door een negatief geladen elektronenwolk. In een elektrisch veld worden de ladingscentra van de positieve en negatieve ladingen ten opzichte van elkaar verplaatst. Daarom gedraagt een atoom in een elektrisch veld zich als een elektrische dipool. In polaire moleculen zijn de ladingscentra van de positieve en negatieve ladingen permanent gescheiden, zelfs zonder een elektrisch veld. Maar zonder een elektrisch veld zijn ze willekeurig georiënteerd en hebben ze dus geen netto-effect, terwijl ze in aanwezigheid van een elektrisch veld evenwijdig aan het veld staan.
Wat het precieze mechanisme ook is, een elektrisch veld induceert een bepaalde netto dipoolmomentdichtheid per volume-eenheid $\mathbf{\mathcal{P}}(\mathbf{r})$ [C/$\text{m}^2$] in materie die evenredig is met het *lokale* elektrische veld $\mathbf{\mathcal{E}}(\mathbf{r})$:

```{math}
:label: eq.defP0
\begin{align*}
\mathbf{\mathcal{P}}(\mathbf{r},t)= \epsilon_0 \chi_e \mathbf{\mathcal{E}}(\mathbf{r},t),
\end{align*}
```
waar $\chi_e$ een dimensieloze grootheid is, de elektrische gevoeligheid van het materiaal. Een dipoolmoment dat varieert met de tijd straalt een elektromagnetisch veld uit. Het is belangrijk om te beseffen dat in {eq}`eq.defP0` $\mathbf{\mathcal{E}}$ het totale lokale elektrische veld op de positie van de dipool is, d.w.z. het bevat de bijdrage van alle andere dipolen, die ook aangeslagen zijn en zelf een elektromagnetisch veld uitstralen.
Alleen in het geval van verdunde gassen kan de invloed van de andere dipolen in de materie worden verwaarloosd en wordt het lokale elektrische veld eenvoudig gegeven door het veld dat wordt doorgelaten door een bron buiten de beschouwde materie.

Een dipoolmomentdichtheid die in de loop van de tijd verandert, komt overeen met een stroomdichtheid $\mathbf{\mathcal{J}}_p$ [Ampère/$\text{m}^2$=C/($\text{m}^2$ s)] en een ladingsdichtheid $\varrho_p$ [C/$\text{m}^3$] gegeven door

```{math}
:label: eq.defJ
\begin{align*}
\mathbf{\mathcal{J}}_p(\mathbf{r},t)&= \frac{\partial \mathbf{\mathcal{P}}(\mathbf{r},t)}{\partial t} = \epsilon_0 \chi_e
\frac{\partial \mathbf{\mathcal{E}}(\mathbf{r},t)}{\partial t}, \end{align*}
```
```{math}
:label: eq.defrho
\begin{align*}
\\
\varrho_p(\mathbf{r},t) &= -\mathbf{\nabla} \cdot \mathbf{\mathcal{P}}(\mathbf{r},t) =- \mathbf{\nabla} \cdot (\epsilon_0\chi_e \mathbf{\mathcal{E}}),\end{align*}
```
Alle materialen geleiden elektronen tot op zekere hoogte, hoewel de geleidbaarheid $\sigma$ [Ampère/(Volt m)=C/(Volt s] sterk verschilt tussen diëlektrica, halfgeleiders en metalen (de geleidbaarheid van koper is $10^7$ maal die van een goede geleider zoals zeewater en $10^{19}$ keer die van glas). De stroomdichtheid $\mathbf{\mathcal{J}}_c$ en de ladingsdichtheid die overeenkomt met de geleidingselektronen voldoen aan:

```{math}
:label: eq.ohmslaw
\begin{align*}
\mathbf{\mathcal{J}}_c &= \sigma \mathbf{\mathcal{E}}, \end{align*}
```
```{math}
:label: eq.chargec
\begin{align*}
\\
\frac{\partial \varrho_c}{\partial t} &= -\mathbf{\nabla} \cdot \mathbf{\mathcal{J}}_c =- \mathbf{\nabla} \cdot(\sigma \mathbf{\mathcal{E}}),\end{align*}
```
waar {eq}`eq.ohmslaw` de wet van Ohm is.
De totale stroomdichtheid aan de rechterkant van de wet van Maxwell {eq}`eq.maxwell0` is de som van $\mathbf{\mathcal{J}}_p$, $\mathbf{\mathcal{J}}_c$ en een externe stroomdichtheid $\mathbf{\mathcal{J}}_{ext}$, waarvan we aannemen dat deze bekend is.
Op dezelfde manier is de totale ladingsdichtheid rechts van {eq}`eq.gauss0` de som van $\varrho_p$, $\varrho_c$ en een gegeven externe ladingsdichtheid $\varrho_{ext}$. Dit laatste is gekoppeld aan de externe stroomdichtheid door de wet van behoud van lading {eq}`eq.maxum2`. Vandaar dat {eq}`eq.maxwell0` en {eq}`eq.gauss0` worden:

```{math}
:label: eq.maxwell1
\begin{align*}
\mathbf{\nabla} \times \frac{\mathbf{\mathcal{B}}}{\mu_0} &= \epsilon_0 \frac{\partial \mathbf{\mathcal{E}}}{\partial t} + \mathbf{\mathcal{J}}_p + \mathbf{\mathcal{J}}_c + \mathbf{\mathcal{J}}_{ext} \nonumber \\
&= \epsilon_0(1+\chi_e) \frac{\partial \mathbf{\mathcal{E}}}{\partial t} + \sigma \mathbf{\mathcal{E}} + \mathbf{\mathcal{J}}_{ext}
\end{align*}
```
```{math}
:label: eq.gauss1
\begin{align*}
\\
\mathbf{\nabla} \cdot \epsilon_0 \mathbf{\mathcal{E}} &= \varrho_p+\varrho_c + \varrho_{ext} \nonumber \\
&= - \mathbf{\nabla} \cdot (\epsilon_0 \chi_e \mathbf{\mathcal{E}}) +\varrho_c + \varrho_{ext}.\end{align*}
```
We definiëren de permittiviteit $\epsilon$ in materie door

```{math}
:label: eq.defeps
\begin{align*}
\epsilon= \epsilon_0(1 +\chi_e).
\end{align*}
```
Dan kunnen {eq}`eq.maxwell1` en {eq}`eq.gauss1` worden geschreven als

```{math}
:label: eq.maxwell2
\begin{align*}
\mathbf{\nabla} \times \frac{\mathbf{\mathcal{B}}}{\mu_0} &= \epsilon \frac{\partial \mathbf{\mathcal{E}}}{\partial t} + \sigma \mathbf{\mathcal{E}} + \mathbf{\mathcal{J}}_{ext}
		\end{align*}
```
```{math}
:label: eq.gauss2
\begin{align*}
\\
\mathbf{\nabla}\cdot (\epsilon \mathbf{\mathcal{E}}) &= \varrho_c + \varrho_{ext}.\end{align*}
```
In Opgave 1 wordt geverifieerd dat in een geleider elke accumulatie van lading extreem snel tot nul wordt gereduceerd. Daarom mogen we ervan uitgaan dat

```{math}
:label: eq.rhoc0
\begin{align*}
\varrho_c=0.
\end{align*}
```

Als het materiaal magnetisch is, is de magnetische permeabiliteit anders dan vacuüm en wordt geschreven als $\mu=\mu_0(1+\chi_m)$, waarbij $\chi_m$ de magnetische susceptibiliteit is. In de Maxwell-vergelijkingen moet men dan $\mu_0$ vervangen door $\mu$. Bij optische frequenties zijn de magnetische effecten echter verwaarloosbaar (behalve bij ferromagnetische materialen, die zeldzaam zijn). **We zullen er daarom altijd van uitgaan dat de magnetische permeabiliteit die van vacuüm is: $\mu=\mu_0$**.

Het is gebruikelijk om het magnetisch veld te definiëren met $\mathbf{\mathcal{H}}=\mathbf{\mathcal{B}}/\mu_0$ [Ampère/m=C/(ms)].
Door gebruik te maken van het magnetisch veld $\mathbf{\mathcal{H}}$ in plaats van de magnetische inductie $\mathbf{\mathcal{B}}$, worden de vergelijkingen van Maxwell symmetrischer:

```{math}
:label: eq.faraday4
\begin{align*}
\mathbf{\nabla} \times \mathbf{\mathcal{E}} & = -\mu_0 \frac{\partial \mathbf{\mathcal{H}}}{\partial t }, & \text{Wet van Faraday} \end{align*}
```
```{math}
:label: eq.maxwell4
\begin{align*}
, \\
	\mathbf{\nabla} \times \mathbf{\mathcal{H}} & = \epsilon \frac{\partial \mathbf{\mathcal{E}}}{\partial t} + \sigma \mathbf{\mathcal{E}}+ \mathbf{\mathcal{J}}_{ext}, & \text{Wet van Maxwell}, \end{align*}
```
```{math}
:label: eq.gauss4
\begin{align*}
\\
	\mathbf{\nabla} \cdot \epsilon \mathbf{\mathcal{E}} & = \varrho_{ext}, & \text{De wet van Gauss}, \end{align*}
```
```{math}
:label: eq.divH4
\begin{align*}
\\
	\mathbf{\nabla} \cdot \mathbf{\mathcal{H}} & = 0. & \text{geen magnetische lading}.\end{align*}
```

Dit is de vorm waarin we in dit boek de Maxwell-vergelijkingen in materie zullen gebruiken.
Men ziet dat de Maxwell-vergelijkingen in materie identiek zijn aan die in vacuüm, met $\epsilon$ gesubstitueerd door $\epsilon_0$.

We eindigen deze sectie met de opmerking dat onze afleidingen geldig zijn voor niet-magnetische materialen die elektrisch isotroop zijn. Dit betekent dat de magnetische permeabiliteit die van vacuüm is en dat de permittiviteit $\epsilon$ een scalair is. In een anisotroop diëlektricum zijn de geïnduceerde dipoolvectoren over het algemeen niet evenwijdig aan het lokale elektrische veld. Dan worden $\chi_e$ en dus ook $\epsilon$ matrices. In dit boek wordt aangenomen dat alle materie niet-magnetisch en elektrisch isotroop is.

```{index} Scalar Wave Equation
:name: section.scalvecwave
```
We beschouwen een homogene isolator (d.w.z. $\epsilon$ is onafhankelijk van positie en $\sigma$=0) waarin er geen externe bronnen zijn:

```{math}
:label: eq.source0
\begin{align*}
\mathbf{\mathcal{J}}_{ext}=0, \;\; \varrho_{ext}=0.
\end{align*}
```
In de optica is de externe bron, bijvoorbeeld een laser, normaal gesproken ruimtelijk gescheiden van de objecten van belang waarmee het licht interageert. Daarom is de veronderstelling dat de externe bron verdwijnt in het interessegebied vaak gerechtvaardigd.
Neem de rotatie van {eq}`eq.faraday4` en de tijdafgeleide van {eq}`eq.maxwell4` en tel de verkregen vergelijkingen bij elkaar op. Dit geeft

```{math}
:label: eq.vechelm
\begin{align*}
\mathbf{\nabla} \times \mathbf{\nabla} \times \mathbf{\mathcal{E}} + \epsilon \mu_0 \frac{\partial^2 \mathbf{\mathcal{E}}}{\partial t^2}=\mathbf{0}.
\end{align*}
```
Nu geldt voor elk vectorveld $\mathbf{\mathcal{A}}$:

```{math}
:label: eq.vectorA
\begin{align*}
\mathbf{\nabla} \times \mathbf{\nabla} \times \mathbf{\mathcal{A}} = - \mathbf{\nabla}^2 \mathbf{\mathcal{A}} + \mathbf{\nabla} \mathbf{\nabla} \cdot \mathbf{\mathcal{A}}.
\end{align*}
```
waarbij $\mathbf{\nabla}^2 \mathbf{\mathcal{A}}$ de vector is:

```{math}
:label: eq.deflapl
\begin{align*}
\mathbf{\nabla}^2 \mathbf{\mathcal{A}} =	\mathbf{\nabla}^2 {\cal A}_x \, \hat{\mathbf{x}} +
	\mathbf{\nabla}^2 {\cal A}_y \, \hat{\mathbf{y}} +
	\mathbf{\nabla}^2 {\cal A}_z \, \hat{\mathbf{z}},
\end{align*}
```
met

```{math}
:label: eq.bnabla2
\begin{align*}
\mathbf{\nabla}^2 = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2}.
\end{align*}
```
Omdat de wet van Gauss {eq}`eq.gauss4` met $\varrho_{ext}=0$ en $\epsilon$ constant impliceert dat $\mathbf{\nabla}\cdot \mathbf{\mathcal{E}}=0$, {eq}`eq.vectorA` toegepast op $\mathbf{\mathcal{E}}$
levert op

```{math}
:label: eq.vecvecE
\begin{align*}
\mathbf{\nabla} \times \mathbf{\nabla} \times \mathbf{\mathcal{E}} = - \mathbf{\nabla}^2 \mathbf{\mathcal{E}}.
\end{align*}
```
Vandaar dat {eq}`eq.vechelm` wordt:

```{math}
:label: eq.scalhelm
\begin{align*}
\mathbf{\nabla}^2 \mathbf{\mathcal{E}} - \epsilon \mu_0 \frac{\partial^2 \mathbf{\mathcal{E}}}{\partial t^2}=\mathbf{0}.
\end{align*}
```
Door een soortgelijke afleiding wordt gevonden dat ook $\mathbf{\mathcal{H}}$ voldoet aan {eq}`eq.scalhelm`.
In een homogeen diëlektricum zonder externe bronnen voldoet dus elke component van het elektromagnetische veld aan de scalaire golfvergelijking:

```{math}
:label: eq.scalhelm2
\begin{align*}
\mathbf{\nabla}^2 {\cal U} - \epsilon \mu_0 \frac{\partial^2 {\cal U}}{\partial t^2}=0.
\end{align*}
```
De **brekingsindex** is de dimensieloze grootheid gedefinieerd door

```{math}
:label: eq.defn
\begin{align*}
n = \sqrt{\frac{\epsilon}{\epsilon_0}}.
\end{align*}
```
De scalaire golfvergelijking kan dan worden geschreven als

```{math}
:label: eq.scalhelm3
\begin{align*}
\mathbf{\nabla}^2 {\cal U} - n^2 \epsilon_0 \mu_0 \frac{\partial^2 {\cal U}}{\partial t^2}=0.
\end{align*}
```
De lichtsnelheid in materie is

```{math}
:label: eq.lightsped
\begin{align*}
\frac{c}{n}=\frac{1}{\sqrt{\epsilon \mu_0}}.
\end{align*}
```

## Tijdharmonische oplossingen van de golfvergelijking
Het feit dat, in de vaak voorkomende omstandigheid waarin licht interactie heeft met een homogeen diëlektricum, alle componenten van het elektromagnetische veld voldoen aan de scalaire golfvergelijking, rechtvaardigt de studie van oplossingen van deze vergelijking. Aangezien in de meeste gevallen in de optica monochromatische velden worden beschouwd, zullen we onze aandacht richten op tijdharmonische oplossingen van de golfvergelijking.
(subsec.plwav)=
### Tijd-harmonische vlakke golven

Tijdharmonische oplossingen zijn afhankelijk van de tijd door een cosinus- of een sinusfunctie. Men kan gemakkelijk verifiëren door substitutie dat

```{math}
:label: eq.psi1
\begin{align*}
{\cal U} (\mathbf{r},t) ={\cal A} \cos(kx - \omega t + \varphi),
\end{align*}
```
waar ${\cal A}>0$ en $\varphi$ constanten zijn,
een oplossing is van {eq}`eq.scalhelm3`, op voorwaarde dat

```{math}
:label: eq.psi2
\begin{align*}
k = \omega (\epsilon \mu_0)^{1/2} = \omega n \sqrt{\epsilon_0 \mu_0}= n k_0,
\end{align*}
```
waarbij $k_0=\omega \sqrt{\epsilon_0 \mu_0}$ het golfgetal in vacuüm is.
De frequentie $\omega>0$ kan willekeurig worden gekozen. Het golfgetal $k$ in het materiaal wordt dan bepaald door {eq}`eq.psi2`. We definiëren $T=2\pi/\omega$ en $\lambda=2\pi/k$ als respectievelijk de periode en de *-golflengte in het materiaal*. Bovendien is $\lambda_0=2\pi/k_0$ de golflengte in vacuüm.




**Opmerking**. Met "de golflengte" bedoelen we altijd de golflengte in vacuüm.
We kunnen {eq}`eq.psi1` schrijven in de vorm

```{math}
:label: eq.psi3
\begin{align*}
{\cal U} (x,t)={\cal A}\cos\left[k\left(x-\frac{c}{n} t\right)+\varphi\right],
\end{align*}
```
waarbij $c/n=1/\sqrt{\epsilon\mu_0}$ de lichtsnelheid in het materiaal is.
${\cal A}$ is de amplitude en het argument in de cosinus: $k\left(x-\frac{c}{n} t\right)+\varphi$ wordt de fase genoemd op positie $x$ en op tijdstip $t$.
Een golffront is een verzameling ruimte-tijdpunten waar de fase constant is:

```{math}
\begin{align*}
x - \frac{c}{n} t =\text{constant}.
\end{align*}
```
Op elk vast tijdstip $t$ zijn de golffronten vlakken (in dit geval loodrecht op de $x$-as), en daarom wordt de golf een vlakke golf genoemd.
Naarmate de tijd verstrijkt, bewegen de golffronten met een snelheid $c/n$ in de positieve $x$-richting.

Een tijdharmonische vlakke golf die zich in een willekeurige richting voortplant, wordt gegeven door

```{math}
:label: eq.psi5
\begin{align*}
{\cal U} (\mathbf{r},t) ={\cal A} \cos( \mathbf{k}\cdot \mathbf{r} -\omega t + \varphi),
\end{align*}
```
waarin ${\cal A}$ en $\varphi$ weer constanten zijn en
$\mathbf{k}=k_x\hat{\mathbf{x}}+k_y \hat{\mathbf{y}}+k_z \hat{\mathbf{z}}$ is de golfvector.
De golffronten worden gegeven door de verzameling van alle ruimte-tijdpunten $(\mathbf{r}, t)$ waarvoor de fase $\mathbf{k}\cdot \mathbf{r} -\omega t + \varphi$ constant is, d.w.z. waarvoor

```{math}
:label: eq.psi5b
\begin{align*}
\mathbf{k}\cdot \mathbf{r} -\omega t =\text{constant}.
\end{align*}
```
Op vaste tijden zijn de golffronten vlakken loodrecht op de richting van $\mathbf{k}$ zoals weergegeven in {numref}`Fig_2_1_Constant_phase`. Eq. {eq}`eq.psi5` is een oplossing van {eq}`eq.scalhelm3` op voorwaarde dat

```{math}
:label: eq.psi6
\begin{align*}
k_x^2 + k_y^2 + k_z^2 = \omega^2 \epsilon \mu_0 = \omega^2 n^2 \epsilon_0 \mu_0=k_0^2n^2.
\end{align*}
```
De richting van de golfvector kan willekeurig worden gekozen, maar de lengte ervan wordt bepaald door de frequentie $\omega$.


```{figure} Images/Chapter_1/1_02_Constant_phase_f1.png
:name: Fig_2_1_Constant_phase
vlakken van constante fase.
```


We beschouwen een algemene tijdharmonische oplossing van de golfvergelijking {eq}`eq.scalhelm2`:

```{math}
:label: eq.thc1
\begin{align*}
{\cal U} (\mathbf{r},t) = {\cal A}(\mathbf{r}) \cos(\varphi(\mathbf{r})- \omega t),
\end{align*}
```
waarin de amplitude ${\cal A}(\mathbf{r})>0$ en de fase $\varphi(\mathbf{r})$ functies zijn van positie $\mathbf{r}$. De golffronten bestaan uit verzamelingen van ruimte-tijdpunten $(\mathbf{r},t)$ waarbij de fase gelijk is aan een constante:

```{math}
:label: eq.thc1b
\begin{align*}
\varphi(\mathbf{r})- \omega t=\text{constant}.
\end{align*}
```
Op een vaste tijd $t$, zijn de verzamelingen van constante fase: $\varphi(\mathbf{r})=\omega t + \text{constant}$ oppervlakken die in het algemeen geen vlakken zijn, dus de oplossing in het algemeen is geen vlakke golf. Eq. {eq}`eq.thc1` kan bijvoorbeeld een golf zijn met bolvormige golffronten, zoals hieronder besproken.




**Opmerking**.
Een vlakke golf wordt oneindig uitgerekt en transporteert een oneindige hoeveelheid elektromagnetische energie. Een vlak vlak kan dus niet in werkelijkheid bestaan, maar het is toch een gebruikelijke idealisering. Zoals zal worden aangetoond in paragraaf 7.1 kan *elke tijdharmonische oplossing van de golfvergelijking* altijd worden uitgebreid in termen van vlakke golven van de vorm {eq}`eq.psi5`. 



Voor tijdharmonische oplossingen is het vaak handig om **complexe notatie** te gebruiken. Definieer de **complexe amplitude** door:

```{math}
:label: eq.defA
\begin{align*}
U(\mathbf{r}) = {\cal A}(\mathbf{r}) e^{i\varphi(\mathbf{r})},
\end{align*}
```
d.w.z. de modulus van het complexe getal $U(\mathbf{r})$ is de amplitude ${\cal A}(\mathbf{r})$ en het argument van $U(\mathbf{r})$ is de fase $\varphi(\mathbf{r})$ bij $t=0$. Het tijdsafhankelijke deel van de fase: $-\omega t$ is dus gescheiden van het ruimte-afhankelijke deel van de fase.
Dan kan {eq}`eq.thc1` geschreven worden als

```{math}
:label: eq.thc2
\begin{align*}
{\cal U} (\mathbf{r},t) = \text{Re}\left[ U(\mathbf{r}) e^{-i\omega t} \right].
\end{align*}
```
Vandaar dat
${\cal U}(\mathbf{r},t)$ het reële is deel van de complexe tijdharmonische functie

```{math}
:label: eq.thc4
\begin{align*}
U(\mathbf{r}) e^{-i\omega t}.
\end{align*}
```


**Opmerking**.
De complexe amplitude $U(\mathbf{r})$ wordt ook wel het complexe veld genoemd. In het geval van vectorvelden zoals $\mathbf{E}$ en $\mathbf{H}$ spreken we van complexe vectorvelden, of gewoon complexe velden. Complexe amplitudes en complexe (vector)velden zijn slechts functies van positie $\mathbf{r}$; De tijdsafhankelijke factor $\exp(-i\omega t)$ wordt weggelaten. Om de fysisch betekenisvolle reële grootheid te krijgen, moet de complexe amplitude of het complexe veld eerst worden vermenigvuldigd met $\exp(-i\omega t)$ en dan moet het reële deel worden genomen.




De volgende conventie wordt in dit boek gebruikt:




**Werkelijk gewaardeerde fysische grootheden (of ze nu tijdharmonisch zijn of een meer algemene tijdsafhankelijkheid hebben) worden aangeduid met een kalligrafische letter, bijvoorbeeld $\mathcal{U}$, $\mathcal{E}_x$, of $\mathcal{H}_x$. De symbolen zijn dikgedrukt als we te maken hebben met een vector, bijvoorbeeld $\mathbf{\mathcal{E}}$ of $\mathbf{\mathcal{H}}$.
De complexe amplitude van een tijdharmonische functie wordt gekoppeld aan de reële fysische grootheid door {eq}`eq.thc2` en wordt geschreven als een gewone letter zoals $U$ en $\mathbf{E}$.**




Het is gemakkelijker om te rekenen met complexe amplitudes (complexe velden) dan met goniometrische functies (cosinus en sinus). Zolang alle bewerkingen die op de functies worden uitgevoerd *lineair* zijn, kunnen de bewerkingen worden uitgevoerd op de complexe grootheden. Om de reëele fysische grootheid van het resultaat (d.w.z. het fysisch betekenisvolle resultaat) te krijgen, vermenigvuldig je de uiteindelijk verkregen complexe amplitude met $\exp(-i\omega t)$ en neem je het reële deel. De reden dat dit werkt is dat het nemen van het reële deel met alle lineaire operaties commutatief is, d.w.z. eerst het reële deel nemen om de reëel gewaardeerde fysische grootheid te krijgen en dan te werken met deze reële fysische grootheid geeft hetzelfde resultaat als het werken met de complexe scalaire en het nemen van het reële deel aan het eind.

Door {eq}`eq.thc2` te substitueren in de golfvergelijking
{eq}`eq.scalhelm3` krijgen we

```{math}
:label: eq.complH1
\begin{align*}
\nabla^2 {\cal U}(\mathbf{r},t) - n^2 \epsilon_0\mu_0 \frac{\partial^2{\cal U}(\mathbf{r},t)}{\partial t^2} &=
\text{Re}\left[ \nabla^2 U(\mathbf{r})e^{-i\omega t}\right] -
n^2 \epsilon_0\mu_0 \text{Re}\left[ U(\mathbf{r})\frac{\partial^2 e^{-i\omega t}}{\partial ^2}\right]  \\
&= \text{Re}\left\{ \left[\nabla^2 U(\mathbf{r}) + \omega^2 n^2 \epsilon_0\mu_0 U(\mathbf{r}) \right] e^{-i\omega t}\right\}.
\end{align*}
```
Aangezien dit voor alle tijden $t$ moet verdwijnen, volgt daaruit dat
De complexe expressie tussen de haakjes $\{.\}$ moet verdwijnen. Om dit te zien, beschouw bijvoorbeeld de twee instanties $t=0$ en $t=\pi/(2\omega$. We concluderen dat de complexe amplitude voldoet aan


```{math}
:label: eq.complH
\boxed{\begin{align*}
\nabla^2 U(\mathbf{r}) + k_0^2 n^2 U(\mathbf{r})=0,\quad \text{Helmholtz-vergelijking},
\end{align*}}
```

waarbij $k_0=\omega \sqrt{\epsilon_0 \mu_0}$ het golfgetal in vacuüm is.




**Opmerking**. De complexe grootheid waarvan het reële deel genomen moet worden is: $U\exp(-i\omega t)$. Zoals hierboven uitgelegd, is het niet nodig om de tijdsafhankelijke factor $\exp(-i \omega t )$ mee te slepen in de berekeningen: het volstaat om alleen te rekenen met de complexe amplitude $U$, dan te vermenigvuldigen met $\exp(-i\omega t)$ en dan het reële deel te nemen. Echter
wanneer een afgeleide met betrekking tot de tijd moet worden genomen: $\partial /\partial t$, dan wordt het complexe veld vermenigvuldigd met $-i\omega$. Dit wordt ook gedaan in de tijdharmonische Maxwell's vergelijkingen in Sectie {eq}`section.thmaxwell` hieronder.

### Tijd-harmonische sferische golven

\label{subsection.sphericalw}
Een sferische golf is alleen afhankelijk van de positie door de afstand tot een vast punt. Voor de eenvoud kiezen we op dit punt de oorsprong van ons coördinatensysteem. We zoeken dus naar een oplossing van de vorm ${\cal U}(r,t)$ met $r=\sqrt{x^2+y^2+z^2}$.
Voor sferische symmetrische functies hebben we

```{math}
:label: eq.ths1
\begin{align*}
\mathbf{\nabla}^2 {\cal U}(r,t) = \frac{1}{r} \frac{\partial^2}{\partial r^2}[ r {\cal U}(r,t)].
\end{align*}
```
Het is gemakkelijk te zien dat buiten de oorsprong

```{math}
:label: eq.ths3
\begin{align*}
{\cal U} (r,t) = \frac{f( \pm r - ct/n )}{r},
\end{align*}
```
voldoet aan {eq}`eq.ths1` voor elke keuze voor de functie $f$, waarbij zoals voorheen $c=1/\sqrt{\epsilon_0\mu_0}$ de lichtsnelheid is en $n=\sqrt{\epsilon/\epsilon_0}$.
Van bijzonder belang zijn tijd-harmonische sferische golven:

```{math}
:label: eq.ths5
\begin{align*}
{\cal U} (r, t) = \frac{{\cal A}}{r} \cos\left[ k\left( \pm r - \frac{c}{n} t\right) + \varphi \right] = \frac{{\cal A}}{r} \cos[ \pm k r- \omega t + \varphi )
\end{align*}
```
waarin ${\cal A}$ een constante is

```{math}
:label: eq.defk
\begin{align*}
k= n \omega/c.
\end{align*}
```
en $\pm kr - \omega t +\varphi$ is de fase op $\mathbf{r}$ en op tijdstip $t$.
Een golffront is een verzameling ruimte-tijdpunten $(\mathbf{r},t)$ waarbij de fase gelijk is aan een constante:

```{math}
:label: eq.ths4
\begin{align*}
\pm k r - \omega t = \text{constant}.
\end{align*}
``` 
Golffronten zijn dus bollen die met de snelheid van het licht in de radiale richting bewegen.
Wanneer het $+$-teken wordt gekozen, plant de golf zich naar buiten voort, d.w.z. weg van de oorsprong. De golf wordt dan uitgestraald door een **bron** bij de oorsprong. Inderdaad, als het $+$ teken in {eq}`eq.ths5` staat, dan
Als de tijd $t$ toeneemt, impliceert {eq}`eq.ths4` dat een oppervlak van constante fase naar buiten beweegt. Evenzo, als het $-$-teken betreft, plant de golf zich voort in de richting van de oorsprong die dan fungeert als een **put**.

```{figure} Images/Chapter_1/1_03_Spherical_Wavefront_f1.png
:name: Fig_2_2_Spherical_Wavefront
bolvormige golffronten met amplitude afnemend met de afstand.
```

De amplitude van de golf ${\cal A}/r$ is evenredig met de inverse afstand tot de bron van de put. Aangezien het tijdsgemiddelde van de lokale flux van energie evenredig is met het kwadraat ${\cal A}^2/r^2$, is de tijdgemiddelde totale flux door het oppervlak van een bol met middelpunt de oorsprong onafhankelijk van de straal van de bol.

```{figure} Images/Chapter_1/1_04_Spherical_2_Plane_wave_f1.png
:name: Fig_2_3_Spherical_2_Plane_wave
vlakken van constante fase in doorsnede. Voor een waarnemer op grote afstand van de bron lijkt de bolvormige golf op een vlakke golf.
```

Aangezien er een bron of een put bij de oorsprong is, voldoet {eq}`eq.ths5` alleen aan {eq}`eq.ths1` buiten de oorsprong. Er is een $\delta$-functie als brondichtheid aan de rechterkant:

```{math}
:label: eq.ths1b
\begin{align*}
\epsilon \mu_0 \frac{\partial^2 }{\partial t^2}{\cal U}(r,t)- \mathbf{\nabla}^2 {\cal U}(r,t)= 4\pi {\cal A}\, \delta(r),
\end{align*}
```
waarbij de rechterkant overeenkomt met een bron of een put bij de oorsprong, afhankelijk van het teken dat in de fase is gekozen.
Met behulp van complexe notatie hebben we voor de naar buiten voortplantende golf:

```{math}
:label: eq.ths6
\begin{align*}
{\cal U} (r,t) =\text{Re}\left[U(\mathbf{r})e^{-i\omega t}\right]= \text{Re}\left[ \frac{A}{r} e^{i ( kr - i\omega t)}\right]
\end{align*}
```
met $ U(\mathbf{r})=A \exp( ikr)/r$ en $A={\cal A}\exp(i\varphi)$, waarbij $\varphi$ het argument is en ${\cal A}$ de modulus van het complexe getal $A$.

In {numref}`Fig_2_2_Spherical_Wavefront` en {numref}`Fig_2_3_Spherical_2_Plane_wave` zijn bolvormige golffronten te zien. Voor een waarnemer die zich op grote afstand van de bron bevindt, ziet de bolvormige golf eruit als een vlakke golf die zich voortplant van de bron naar de waarnemer (of in de tegenovergestelde richting, als er een put is).

(section.thmaxwell)=
## Tijd-harmonische Maxwell-vergelijkingen in materie

We keren nu terug naar de Maxwell-vergelijkingen en beschouwen tijd-harmonische elektromagnetische velden, omdat dit verreweg de belangrijkste velden in de optica zijn.
Met behulp van complexe notatie hebben we 

```{math}
:label: eq.defveca
\begin{align*}
\mathbf{\mathcal{E}}(\mathbf{r},t) = \text{Re}\left[ \mathbf{E}(\mathbf{r}) e^{-i\omega t}\right],
\end{align*}
```
met

```{math}
:label: eq. E
\begin{align*}
E_x(\mathbf{r}) &= | E_x(\mathbf{r}) | e^{i \varphi_x(\mathbf{r})},  \\
E_y(\mathbf{r}) &= | E_y(\mathbf{r}) | e^{i \varphi_y(\mathbf{r})},  \\
E_z(\mathbf{r}) &= | E_z(\mathbf{r}) | e^{i \varphi_z(\mathbf{r})},
\end{align*}
```
waarin $\varphi_x(\mathbf{r})$ het argument is van het complexe getal $E_x(\mathbf{r})$ enz.
Met vergelijkbare notaties voor het magnetisch veld, verkrijgen we door substitutie in de vergelijkingen van Maxwell
{eq}`eq.faraday4`, {eq}`eq.maxwell4`, {eq}`eq.gauss4` en {eq}`eq.divH4`, de tijdharmonische Maxwell-vergelijkingen voor de **complexe velden**:

```{math}
:label: eq.faraday5
\begin{align*}
\mathbf{\nabla} \times \mathbf{E} & = i\omega \mu_0 \mathbf{H}, & \text{Wet van Faraday}, \end{align*}
```
```{math}
:label: eq.maxwell5
\begin{align*}
\\
\mathbf{\nabla} \times \mathbf{H} & = -i\omega \epsilon\mathbf{E} + \sigma \mathbf{E} + \mathbf{J}_{ext}, & \text{Wet van Maxwell}, \end{align*}
```
```{math}
:label: eq.gauss5
\begin{align*}
\\
\mathbf{\nabla} \cdot \epsilon \mathbf{E} & = \varrho_{ext}, & \text{De wet van Gauss}, \end{align*}
```
```{math}
:label: eq.divH5
\begin{align*}
\\
\mathbf{\nabla} \cdot \mathbf{H} & = 0, & \text{geen magnetische lading},\end{align*}
```
waarbij de tijdafgeleide is vervangen door vermenigvuldiging van de complexe velden met $-i\omega$.

In de tijdharmonische Maxwell-vergelijkingen wordt de geleidbaarheid soms opgenomen in het imaginaire deel van de permittiviteit:

```{math}
:label: eq.defeps2
\begin{align*}
\epsilon = \epsilon_0\left[ 1 + \chi_e + i \frac{\sigma}{\omega} \right].
\end{align*}
```
Hoewel het handig is om dit te doen in de wet van Maxwell {eq}`eq.maxwell5`, moet men niet vergeten dat in de wet van Gauss {eq}`eq.gauss5` de oorspronkelijke permittiviteit: $\epsilon=1+\chi_e$ nog steeds moet worden gebruikt. Als er geen externe bronnen zijn: $\varrho_{ext}=0$ en het materiaal is homogeen (d.w.z. $\chi_e$ en $\sigma$ zijn onafhankelijk van de positie), dan is {eq}`eq.gauss5` gelijk aan

```{math}
:label: eq.gauss5b
\begin{align*}
\mathbf{\nabla} \cdot \mathbf{E} =0.
\end{align*}
```
Vandaar dat in dit (belangrijke) speciale geval de definitie {eq}`eq.defeps2` voor de permittiviteit veilig kan worden gebruikt zonder gevaar voor verwarring.
We zien dat wanneer we definitie {eq}`eq.defeps2` gebruiken, de geleidbaarheid de permittiviteit complex en afhankelijk van de frequentie maakt. Maar eigenlijk, ook voor isolatoren ($\sigma=0$), hangt de permittiviteit $\epsilon$ in het algemeen af van de frequentie en is complex met een positief imaginair deel. Het positieve imaginaire deel van $\epsilon$ is een maat voor de absorptie van het licht door het materiaal.
De eigenschap dat de permittiviteit afhankelijk is van de frequentie wordt **dispersie** genoemd.
Behalve in de buurt van een resonantiefrequentie, is het imaginaire deel van $\epsilon(\omega)$ klein en is het reële deel een langzaam toenemende functie van frequentie. Dit wordt normale dispersie genoemd. Dit wordt geïllustreerd met de brekingsindex van verschillende glassoorten die wordt weergegeven in {numref}`Fig_1_04_Dispersion_Relation`

```{figure} Images/Chapter_1/1_05_Dispersion_Relation_f1.png
:name: Fig_1_04_Dispersion_Relation
Reëel deel $n^2-\kappa^2$ en imaginair deel $2n\kappa$ van de permittiviteit $\epsilon=(n+i\kappa)^2$, als functie van golflengte en frequentie nabij een resonantie.
```


In de buurt van een resonantie verandert het reële deel snel en *neemt af* met $\omega$ (dit gedrag wordt abnormale dispersie genoemd), terwijl het imaginaire deel een maximum heeft bij de resonantiefrequentie van het materiaal, wat overeenkomt met maximale absorptie bij een resonantie zoals te zien is in {numref}`Fig_1_5_Refractive_index_Glass`.
Bij optische frequenties treedt meestal normale dispersie op en voor kleine frequentiebanden zoals bij laserlicht is het vaak voldoende nauwkeurig om de waarde van de permittiviteit en de geleidbaarheid op de middenfrequentie van de band te gebruiken.

```{figure} Images/Chapter_1/1_06_Refractive_index_Glass_f1.png
:name: Fig_1_5_Refractive_index_Glass
Refractive index als een functie van de golflengte voor verschillende soorten glas (from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Mplwp_dispersion_curves.svg) by Geek3 / CC BY-SA).
```


In veel boeken wordt de volgende notatie gebruikt: $\epsilon=(n+i \kappa)^2$, waarbij $n$ en $\kappa$ ("kappa", niet te verwarren met het golfgetal $k$) zowel reëel als positief zijn, waarbij $n$ de brekingsindex en $\kappa$ een maat voor de absorptie. We hebben dan $\text{Re}(\epsilon)=n^2-\kappa^2$ en $\text{Im}(\epsilon)=2 n \kappa$ (zie {numref}`Fig_1_04_Dispersion_Relation`). Merk op dat hoewel $n$ en $\kappa$ beide positief zijn, $\text{Re}(\epsilon)$ negatief kan zijn voor sommige frequenties. Dit gebeurt voor metalen in het zichtbare deel van het spectrum.



 **Opmerking**. Als $\epsilon$ afhankelijk is van frequentie, kunnen de vergelijkingen van Maxwell in de vorm {eq}`eq.maxwell4` en {eq}`eq.gauss4` voor velden die niet tijdharmonisch zijn strikt genomen niet geldig zijn, omdat het niet duidelijk is welke waarde van $\epsilon$ overeenkomt met welke frequentie. In het geval van sterke dispersie zouden de producten $\epsilon \mathbf{\mathcal{E}}$ moeten worden vervangen door convoluties in het tijddomein. Aangezien we bijna altijd velden met een smalle frequentieband zullen beschouwen, zullen we hier niet verder op ingaan.

(subsection.emplw)=
### Tijd-harmonische elektromagnetische vlakgolven

In deze sectie gaan we ervan uit dat het materiaal waarin de golf zich voortplant een geleidbaarheid heeft die verdwijnt: $\sigma=0$, het licht niet absorbeert en homogeen is, d.w.z. dat de permittiviteit $\epsilon$ een reële constante is. Verder gaan we ervan uit dat er in het interessegebied geen bronnen zijn. Deze veronderstellingen impliceren in het bijzonder dat {eq}`eq.gauss5b` geldt.
Het elektrisch veld van een tijdharmonische vlakke golf wordt gegeven door

```{math}
:label: eq.bcE2
\begin{align*}
\mathbf{\mathcal{E}}(\mathbf{r},t) = \text{Re}\left[ \mathbf{E}(\mathbf{r}) e^{-i \omega t}\right],
\end{align*}
```
met

```{math}
:label: eq.defbE
\begin{align*}
\mathbf{E}(\mathbf{r})= \mathbf{A} e^{i \mathbf{k}\cdot \mathbf{r}},
\end{align*}
```
waarin $\mathbf{A}$ een constante complexe vector is (d.w.z. onafhankelijk van positie en tijd):

```{math}
:label: eq.defbA
\begin{align*}
\mathbf{A} =
A_x \hat{\mathbf{x}} +
A_y \hat{\mathbf{y}} +
A_z \hat{\mathbf{z}},
\end{align*}
```
met $A_x=|A_x| e^{i \varphi_x}$ enz..
De golfvector $ \mathbf{k}$ voldoet aan {eq}`eq.psi6`. Substitutie van {eq}`eq.defbE` door {eq}`eq.gauss5b` impliceert dat

```{math}
:label: eq.orth
\begin{align*}
\mathbf{E}(\mathbf{r})\cdot \mathbf{k} =0,
\end{align*}
```
voor alle $\mathbf{r}$ en dus {eq}`eq.bcE2` impliceert dat ook het fysische reële elektrische veld in elk punt $\mathbf{r}$ loodrecht op de golfvector staat: $\mathbf{\mathcal{E}}(\mathbf{r},t)\cdot \mathbf{k}=0$.
Voor de eenvoud kiezen we nu de golfvector in de richting van de $z$-as en nemen we aan dat de elektrische veldvector evenwijdig is aan de $x$-as. Dit geval wordt een $x$-gepolariseerde elektromagnetische golf genoemd. Het complexe veld wordt dan geschreven als

```{math}
:label: eq. Eplanew
\begin{align*}
\mathbf{E}(z) = A e^{i k z} \hat{\mathbf{x}},
\end{align*}
```
waarbij $k=\omega \sqrt{\epsilon \mu_0}$ en $A=|A| \exp(i \varphi)$. Uit de wet van Faraday {eq}`eq.faraday5` volgt dat

```{math}
:label: eq. Hplanew
\begin{align*}
\mathbf{H}(z) = \frac{k}{\omega \mu_0} \hat{\mathbf{z}}\times \hat{\mathbf{x}} A e^{ik z} = \sqrt{\frac{\epsilon}{ \mu_0}} Ae^{i k z } \hat{\mathbf{y}}.
\end{align*}
```
Het werkelijke elektromagnetische veld is dus:

```{math}
:label: eq.bcEzt
\begin{align*}
\mathbf{\mathcal{E}}(z,t) &= \text{Re}\left[ \mathbf{E}(z)e^{-i\omega t}\right] = |A|\cos(kz -\omega t + \varphi) \hat{\mathbf{x}}, \end{align*}
```
```{math}
:label: eq.bcBzt
\begin{align*}
\\
\mathbf{\mathcal{H}}(z,t) &= \text{Re}\left[ \mathbf{H}(z) e^{-i\omega t}\right] = \sqrt{\frac{\epsilon}{ \mu_0}} |A| \cos( k z - \omega t + \varphi) \hat{\mathbf{y}}.\end{align*}
```
We concluderen dat **in een verliesvrij medium, het elektrische en magnetische veld van een vlakke golf in fase zijn en op elk punt en op elk moment loodrecht op de golfvector en op elkaar**. Zoals geïllustreerd in {numref}`Fig_1_07_EB_Propagation`, bereiken het elektrische en het magnetische veld op elk gegeven moment hun maximale en minimale waarden op dezelfde punten.


```{figure} Images/Chapter_1/1_07_EB_Propagation_f1.png
:name: Fig_1_07_EB_Propagation
De tijdharmonische vectoren $\mathbf{\mathcal{E}}$ en $\mathbf{\mathcal{H}}$ van een vlakke gepolariseerde golf staan loodrecht op elkaar en op de richting van de golfvector die ook de richting is van $\mathbf{\mathcal{E}}\times \mathbf{\mathcal{H}}$.
```


### Veld van een elektrische dipool
Een andere belangrijke oplossing van de vergelijking van Maxwell is het veld dat wordt uitgestraald door een tijdharmonische elektrische dipool, d.w.z. twee tegengestelde ladingen met gelijke sterkte die tijdharmonisch rond hun massamiddelpunt bewegen.
In deze sectie is het medium homogeen, maar het kan een deel van het licht absorberen, d.w.z. de permittiviteit kan een niet-nul imaginair deel hebben.
Een elektrische dipool is het klassieke elektromagnetische model voor een atoom of molecuul. Omdat de optische golflengte veel groter is dan een atoom en een molecuul, kunnen deze ladingen worden beschouwd als geconcentreerd in hetzelfde punt $\mathbf{r}_0$. De lading en stroomdichtheden van zo'n elementaire dipool zijn

```{math}
:label: eq.rhodip
\begin{align*}
\rho &= -\mathbf{p} \cdot \mathbf{\nabla} \delta(\mathbf{r}-\mathbf{r}_0), \end{align*}
```
```{math}
:label: eq. Jdip
\begin{align*}
\\
\mathbf{J} &= -i\omega \mathbf{p} \delta(\mathbf{r}-\mathbf{r}_0),\end{align*}
```
met $\mathbf{p}$ de dipoolvector, gedefinieerd door

```{math}
:label: eq.defp1
\begin{align*}
\mathbf{p}= q \mathbf{a},
\end{align*}
```
waarin $q>0$ de positieve lading is en $\mathbf{a}$ de positievector van de positieve lading ten opzichte van de negatieve lading.

Het veld dat door een elektrische dipool wordt uitgestraald, is erg belangrijk. Het is de fundamentele oplossing van de vergelijkingen van Maxwell, in die zin dat het veld dat wordt uitgestraald door een willekeurige verdeling van bronnen altijd kan worden geschreven als een superpositie van de velden van elementaire elektrische dipolen. Dit volgt uit het feit dat de vergelijkingen van Maxwell lineair zijn en dat elke stroomverdeling kan worden geschreven als een superpositie van elementaire dipoolstromen.

Het veld dat wordt uitgestraald door een elementaire dipool in $\mathbf{r}_0$ in homogene materie kan analytisch worden berekend en wordt gegeven door<sup>[^4]</sup>

```{math}
:label: eq. Edipol
\begin{align*}
\mathbf{E}(\mathbf{r})
&= \left\{ k^2
\hat{\mathbf{ R}} \times \left(**p** \times \hat{\mathbf{R}} \right)
+ \left( 3 \hat{\mathbf{R}} \cdot \mathbf{p}\, \hat{\mathbf{R}} - **p** \right)
\left( \frac{1}{R^2}-\frac{ik}{R}\right)
\right\} \frac{e^{i k R}}{4 \pi \epsilon R}, \end{align*}
```
```{math}
:label: eq. Hdipol
\begin{align*}
\\
\mathbf{H}(\mathbf{r}) &=
\frac{k^2 c}{n} \left( 1 + \frac{i}{kR} \right)\,
\hat{\mathbf{R}} \times **p** \frac{e^{i k R}}{4 \pi R},\end{align*}
```
waarin $k=k_0 n $, met $k_0$ bhet golfgetal in vacuüm en $n=\sqrt{\epsilon/\epsilon_0}$, en met $\mathbf{R}=\mathbf{r}-\mathbf{r}_0$, $\hat{\mathbf{R}}=\mathbf{R}/R$.
Men ziet dat de complexe elektrische en magnetische velden evenredig zijn met de complexe bolvormige golf:

$$
\frac{e^{i k R}}{R}

$$
besproken in Sectie {eq}`subsection.sphericalw`, maar dat deze velden aanvullende positieafhankelijke factoren bevatten.
In het bijzonder, op grote afstand van de dipool:

```{math}
:label: eq. Hdipolfar
\begin{align*}
\mathbf{H}(\mathbf{r}) & \approx & \frac{k^2 c}{n} \hat{\mathbf{R}} \times **p** \frac{e^{i k R}}{4 \pi R}, \end{align*}
```
```{math}
:label: eq. Edipolfar
\begin{align*}
\\
\mathbf{E}(\mathbf{r})
& \approx & k^2
\hat{\mathbf{R}} \times \left( \mathbf{p} \times \hat{\mathbf{R}} \right)
\frac{e^{i k R}}{4 \pi \epsilon R} = - \sqrt{\frac{\mu_0}{\epsilon}} \hat{\mathbf{R}} \times \mathbf{H}(\mathbf{r}).\end{align*}
```


```{figure} Images/Chapter_1/1_08_Felder_um_Dipol_f1.png
:name: Fig_1_09_Field_lines_Radiating_Dipole
elektrische en magnetische veldlijnen gemaakt door een uitstralende dipool (van [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Felder_um_Dipol.svg), originele JPG vanwege Averse, SVG door Maschen. / CC0).
```


In {numref}`Fig_1_09_Field_lines_Radiating_Dipole` zijn de elektrische en magnetische veldlijnen van een uitstralende dipool getekend. Voor een waarnemer op grote afstand van de dipool staan de elektrische en magnetische velden loodrecht op elkaar en loodrecht op de richting van de gezichtslijn $\hat{\mathbf{R}}$ van de dipool naar de waarnemer. Verder bevindt het elektrisch veld zich in het vlak door de dipoolvector $\mathbf{p}$ en de vector $\hat{\mathbf{R}}$, terwijl het magnetisch veld loodrecht op dit vlak staat. Voor een verre waarnemer is het dipoolveld dus vergelijkbaar met dat van een vlakke golf die zich voortplant van de dipool naar de waarnemer en een elektrisch veld heeft dat evenwijdig is aan het vlak door de dipool en de zichtlijn $\hat{\mathbf{R}}$ en loodrecht op $\hat{\mathbf{R}}$. Bovendien zijn de amplitudes van de elektrische en magnetische velden afhankelijk van de richting van de gezichtslijn, waarbij het veld verdwijnt wanneer de gezichtslijn $\hat{\mathbf{R}}$ evenwijdig is aan de dipoolvector $\mathbf{p}$ en met maximale amplitude wanneer $\hat{\mathbf{R}}$ zich in het vlak loodrecht op de dipoolvector bevindt. Dit resultaat komt overeen met het bekende stralingspatroon van een antenne wanneer de stroom van de dipool in dezelfde richting staat als die van de antenne.

## Elektromagnetische energie

De totale energie die is opgeslagen in het elektromagnetische veld per volume-eenheid op een punt $\mathbf{r}$ is gelijk aan de som van de elektrische en de magnetische energiedichtheden.
We veronderstellen dat de resultaten voor de energiedichtheden die zijn afgeleid in elektrostatica en magnetostatica ook geldig zijn voor de snel oscillerende velden in de optica; Daarom nemen we aan dat de totale elektromagnetische energiedichtheid wordt gegeven door:

```{math}
:label: eq.defU
\begin{align*}
U_{em} (\mathbf{r},t)=\frac{\epsilon}{2} \mathbf{\mathcal{E}}(\mathbf{r},t)\cdot \mathbf{\mathcal{E}}(\mathbf{r},t) + \frac{\mu_0}{2} \mathbf{\mathcal{H}}(\mathbf{r},t)\cdot \mathbf{\mathcal{H}}(\mathbf{r},t).
\end{align*}
```
Opgemerkt moet worden dat we in deze paragraaf aannemen dat de permittiviteit reëel is, d.w.z. dat er geen absorptie is en dat de permittiviteit de geleidbaarheid niet omvat.

Tijdsafhankelijke elektromagnetische velden planten energie voort.
De stroom van elektromagnetische energie op een bepaalde positie $\mathbf{r}$ en tijd $t$ wordt gegeven door de Poynting-vector, die wordt gedefinieerd door

```{math}
:label: eq.defpoyn1
\begin{align*}
\mathbf{\mathcal{S}}(\mathbf{r},t) = \mathbf{\mathcal{E}}(\mathbf{r},t)\times \mathbf{\mathcal{H}}(\mathbf{r},t).
\end{align*}
```
Om precies te zijn, de stroom van elektromagnetische energie door een klein oppervlak $\mathrm{d}S $ met normaal $\hat{\mathbf{n}}$ op punt $\mathbf{r}$ wordt gegeven door

```{math}
:label: eq.defpoyn2
\begin{align*}
\mathbf{\mathcal{S}}(\mathbf{r},t) \cdot \hat{\mathbf{n}} \mathrm{d}S.
\end{align*}
```
Als dit scalair product positief is, is de energiestroom in de richting van $\hat{\mathbf{n}}$, anders in de richting van $-\hat{\mathbf{n}}$. Vandaar dat de richting van de vector $\mathbf{\mathcal{S}}(\mathbf{r},t)$ de richting is van de energiestroom op punt $\mathbf{r}$ en de lengte $\| \mathbf{\mathcal{S}}(\mathbf{r},t)\|$ is de hoeveelheid energiestroom, per tijdseenheid en per oppervlakte-eenheid loodrecht op de richting van $\mathbf{\mathcal{S}}$. Deze hoeveelheid heeft eenheid J/(s\,$\text{m}^2$).

Dat de Poynting-vector de energiestroom geeft, kan worden gezien in een diëlektricum waarvan de dispersie kan worden verwaarloosd door de volgende afleiding. We beschouwen de verandering in de tijd van de totale elektromagnetische energie in een volume $V$:

```{math}
:label: eq.ddtUem
\begin{align*}
\frac{d}{d t } \int\!\int\!\int_V U_{em}(\mathbf{r},t) \, \mathrm{d}V = \int\!\int\!\int_V \epsilon\frac{\partial \mathbf{\mathcal{E}}(\mathbf{r},t)}{\partial t} \cdot \mathbf{\mathcal{E}}(\mathbf{r},t) + \mu_0 \frac{\partial \mathbf{\mathcal{H}}(\mathbf{r},t)}{\partial t} \cdot \mathbf{\mathcal{H}}(\mathbf{r},t) \mathrm{d}V.
\end{align*}
```
Door {eq}`eq.faraday4`, {eq}`eq.maxwell4` te vervangen en met behulp van

```{math}
:label: eq.rule
\begin{align*}
-\mathbf{\mathcal{A}}\cdot \mathbf{\nabla} \times \mathbf{\mathcal{B}} +\mathbf{\mathcal{B}}\cdot \mathbf{\nabla} \times \mathbf{\mathcal{A}} = \mathbf{\nabla} \cdot (\mathbf{\mathcal{A}}\times \mathbf{\mathcal{B}}),
\end{align*}
```
die geldt voor elke twee vectorvelden, vinden we

```{math}
:label: eq.cons1
\begin{align*}
\int\!\int\!\int_V \epsilon \mathbf{\mathcal{E}}(\mathbf{r},t)\cdot \frac{\partial}{\partial t} \mathbf{\mathcal{E}}(\mathbf{r},t) +
\mu_0 \mathbf{\mathcal{H}}(\mathbf{r},t)\cdot \frac{\partial}{\partial t} \mathbf{\mathcal{H}}(\mathbf{r},t) \mathrm{d}V  \\
= \int\!\int\!\int_V \mathbf{\mathcal{E}}(\mathbf{r},t)\cdot \mathbf{\nabla} \times \mathbf{\mathcal{H}}(\mathbf{r},t) -
\mathbf{\mathcal{H}}(\mathbf{r},t)\cdot \mathbf{\nabla} \times \mathbf{\mathcal{E}}(\mathbf{r},t) \mathrm{d}V - \int\!\int\!\int_V \sigma \mathbf{\mathcal{E}}(\mathbf{r},t) \cdot \mathbf{\mathcal{E}}(\mathbf{r},t) \mathrm{d}V  \\
- \int\!\int\!\int_V \mathbf{\mathcal{E}}(\mathbf{r},t) \cdot \mathbf{\mathcal{J}}_{ext}(\mathbf{r},t) \mathrm{d}V  \\
= -\int\!\int\!\int_V \mathbf{\nabla} \cdot (\mathbf{\mathcal{E}}\times \mathbf{\mathcal{H}}) \mathrm{d}V - \int\!\int\!\int_V \sigma \mathbf{\mathcal{E}}(\mathbf{r},t) \cdot \mathbf{\mathcal{E}}(\mathbf{r},t) \mathrm{d}V - \int\!\int\!\int_V \mathbf{\mathcal{E}}(\mathbf{r},t) \cdot \mathbf{\mathcal{J}}_{ext}(\mathbf{r},t) \mathrm{d}V  \\
= - \int\!\int_S (\mathbf{\mathcal{E}}\times \mathbf{\mathcal{H}})\cdot \hat{\mathbf{n}} \mathrm{d}S - \int\!\int\!\int_V \sigma \mathbf{\mathcal{E}}(\mathbf{r},t) \cdot \mathbf{\mathcal{E}}(\mathbf{r},t) \mathrm{d}V- \int\!\int\!\int_V \mathbf{\mathcal{E}}(\mathbf{r},t) \cdot \mathbf{\mathcal{J}}_{ext}(\mathbf{r},t) \mathrm{d}V,
 \\
\end{align*}
```
waarin $S$ het oppervlaktebegrenzingsvolume $V$ is en $\hat{\mathbf{n}}$ de normaal is op $S$ die uit $V$ wijst.
Vandaar dat

```{math}
:label: eq.cons2
\begin{align*}
\frac{d}{d t } \int\!\int\!\int_V U_{em}(\mathbf{r},t) \, \mathrm{d}V+ \int\!\int\!\int_V \sigma \mathbf{\mathcal{E}}(\mathbf{r},t) \cdot \mathbf{\mathcal{E}}(\mathbf{r},t) \mathrm{d}V+ \int\!\int\!\int_V \mathbf{\mathcal{E}}(\mathbf{r},t) \cdot \mathbf{\mathcal{J}}(\mathbf{r},t) \mathrm{d}V  \\
= -\int\!\int_S \mathbf{\mathcal{S}}(\mathbf{r},t) \cdot \hat{\mathbf{n}} \mathrm{d}S.
\end{align*}
```
Deze vergelijking zegt dat de snelheid van verandering met de tijd van de elektromagnetische energie in een volume $V$ plus de arbeid dat door het veld wordt gedaan aan de geleiding en externe stromen binnen $V$ gelijk is aan de instroom van elektromagnetische energie door de grens van $V$.




**Opmerking**. De energieflux $\mathbf{\mathcal{S}}$ en de energiedichtheid $U_{em}$ zijn kwadratisch afhankelijk op het veld. Voor $U_{em}$ is de kwadratische afhankelijkheid van de elektrische en magnetische velden duidelijk. Om te zien dat de Poynting-vector ook kwadratisch is in het elektromagnetische veld, moet men zich realiseren dat de elektrische en magnetische velden onlosmakelijk met elkaar verbonden zijn: ze vormen samen het elektromagnetische veld. Anders gezegd: als de amplitude van het elektrisch veld wordt verdubbeld, dan wordt ook die van het magnetisch veld verdubbeld en wordt dus de Poynting-vector met de factor 4 verhoogd.
Daarom moeten bij het berekenen van de Poynting-vector of de elektromagnetische energiedichtheid van een tijdharmonisch elektromagnetisch veld de reëel gewaardeerde vectorvelden worden gebruikt, d.w.z. de complexe velden moeten **NIET** worden gebruikt. Een uitzondering is de berekening van het langetermijn gemiddelde van de Poynting-vector of de energiedichtheid. Zoals we in de volgende paragraaf zullen laten zien, kunnen de **tijdgemiddelden** van de energieflux en energiedichtheid van tijdharmonische velden eigenlijk heel gemakkelijk worden uitgedrukt in termen van de complexe veldamplitudes.



Als we de reële velden {eq}`eq. Eplanew`, {eq}`eq. Hplanew` van de vlakke golf in de Poynting-vector en de elektromagnetische energiedichtheid krijgen we:

```{math}
:label: eq. Splanew
\begin{align*}
\mathbf{\mathcal{S}}(z,t) = \mathbf{\mathcal{E}}(z,t)\times \mathbf{\mathcal{H}}(z,t) = \sqrt{\frac{\epsilon}{ \mu_0}} |A|^2 \cos^2(k z -\omega t + \varphi)\, \hat{\mathbf{z}},
\end{align*}
```

```{math}
:label: eq. Uemplanew
\begin{align*}
U_{em} (z,t)
= \epsilon |A|^2 \cos^2(k z - \omega t+\varphi).
\end{align*}
```
We zien dat de energiestroom van een vlakke golf in de richting van de golfvector is, die ook de richting is van de fasesnelheid. Bovendien verandert het met de tijd met de frequentie $2\omega$.




## Tijdgemiddelde energie van tijdharmonische velden
Optische frequenties liggen in het bereik van $5 \times 10^{14}$ Hz en de snelste detectoren die op optische frequenties werken, hebben integratietijden groter dan $10^{-10}$ s. Er is dus geen detector die de tijdfluctuaties van de elektromagnetische velden kan meten bij optische frequenties, elke detector meet altijd een gemiddelde waarde, genomen over een tijdsinterval dat zeer groot is in vergelijking met de periode $2\pi/\omega$ van de lichtgolf, doorgaans minstens een factor $10^5$ langer. We berekenen daarom gemiddelden over dergelijke tijdsintervallen van de Poynting-vector en van de elektromagnetische energie. Omdat de Poynting-vector en de energiedichtheid niet-lineair (kwadratisch) afhankelijk zijn van de veldamplitudes, kunnen we de berekeningen niet uitvoeren met behulp van de complexe amplitudes en daarna het reële deel nemen, maar moeten we in plaats daarvan uitgaan van de reële grootheden. Toch blijkt dat het eindresultaat gemakkelijk kan worden uitgedrukt in termen van de complexe veldamplitudes.

Beschouw twee tijdharmonische functies:

```{math}
:label: eq.defAc
\begin{align*}
{\cal A} (t)&= \text{Re}\left[ A e^{-i\omega t}\right]= |A| \cos ( \varphi_A -\omega t)
\end{align*}
```
```{math}
:label: eq.defBc
\begin{align*}
\\
{\cal B} (t) &= \text{Re}\left[ B e^{-i\omega t}\right] = |B| \cos(\varphi_B-\omega t),\end{align*}
```
met $A=|A| \exp(i\varphi_A)$ en $B=|B| \exp(i\varphi_B)$ de complexe amplitudes.
Voor een algemene functie van de tijd $f(t)$ definiëren we het tijdgemiddelde over een interval T *op een bepaald tijdstip $t$*, door

```{math}
:label: eq.average_a
\begin{align*}
\frac{1}{T} \int_{t-T/2}^{t+T/2} f(t') \text{d} t'.
\end{align*}
```
waarbij $T$ veel groter is (zeg een factor van $10^5$) dan de periode van het licht. Het is duidelijk dat voor tijdharmonische velden het gemiddelde niet afhangt van het precieze tijdstip $t$ waarop het wordt berekend.
en we nemen daarom $t=0$ en schrijven


```{math}
:label: eq.average
\boxed{\begin{align*}
\braket{ f(t) } = \lim_{T\rightarrow \infty} \frac{1}{T} \int_{-T/2}^{T/2} f(t) \text{d} t.
\end{align*}}
```

met

```{math}
\begin{align*}
{\cal A} (t)= \text{Re}\left[ A e^{-i\omega t}\right] = \frac{1}{2} \left[A e^{-i\omega t} + A^* e^{i \omega t}\right],
\end{align*}
```
waar $A^*$ de complexe geconjugeerde is van $A$, en met een soortgelijke uitdrukking voor ${\cal B}(t)$, volgt daaruit dat

```{math}
:label: eq.timav
\begin{align*}
\lim_{T\rightarrow \infty} \frac{1}{T} \int_{-T/2}^{T/2} {\cal A}(t) {\cal B}(t) \mathrm{d}t &=
\lim_{T\rightarrow \infty}\frac{1}{4T} \int_{-T/2}^{T/2} \left[ A B^* + A^* B + A B e^{-2i\omega t} + A^* B^* e^{2i\omega t}\right] \mathrm{d}t
 \\
&= \lim_{T\rightarrow \infty} \frac{1}{4} \left[ AB^* + A^* B + A B \frac{ e^{i \omega T}- e^{-i \omega T} }{2 iT \omega} +
A^* B^* \frac{ e^{i \omega T}-e^{-i \omega T} }{2 iT \omega} \right]
 \\
&= \frac{1}{2} \text{Re} \left[ A B^* \right],
\end{align*}
```
Dit belangrijke resultaat zal keer op keer worden gebruikt. In woorden:

```{note}
Het gemiddelde van het product van twee tijdharmonische grootheden over een lang tijdsinterval in vergelijking met de periode, is de helft van het reële  deel van het product van de complexe amplitude van de ene grootheid en het complexe geconjugeerde van de andere.
```

Als we dit toepassen op Poynting's vector van een algemeen tijdharmonisch elektromagnetisch veld:

```{math}
\begin{align*}
\mathbf{\mathcal{E}}(\mathbf{r},t) &= \text{Re}\left[ \mathbf{E}(\mathbf{r}) e^{-i\omega t}\right],  \\
\mathbf{\mathcal{H}}(\mathbf{r},t) &= \text{Re}\left[ \mathbf{H}(\mathbf{r}) e^{-i\omega t}\right],
\end{align*}
```
dan zien we dat de tijdgemiddelde energiestroom aangeduid met $\mathbf{S}(\mathbf{r})$ wordt gegeven door

```{math}
:label: eq. Sav
\begin{align*}
\mathbf{S}(\mathbf{r}) = \lim_{T\rightarrow \infty} \frac{1}{T} \int_{-T/2}^{T/2} \mathbf{\mathcal{S}}(\mathbf{r},t) dt =
\frac{1}{2} \text{Re}\left[ \mathbf{E} \times \mathbf{H}^* \right].
\end{align*}
```
Evenzo is de tijdgemiddelde elektromagnetische energiedichtheid:

```{math}
:label: eqUav
\begin{align*}
<U_{nl}(\mathbf{r})> &\stackrel{\text{def}}{=} & \lim_{T\rightarrow \infty}\frac{1}{T} \int_{-T/2}^{T/2} U_{en}(\mathbf{r}, t) \mathrm{d}t
=
\frac{1}{2} \epsilon \mathbf{E}(\mathbf{r})\cdot \mathbf{E}(\mathbf{r})^* + \frac{\mu_0}{2} \mathbf{H}(\mathbf{r})\cdot \mathbf{H}(\mathbf{r})^*  \\
&= \frac{1}{2} \epsilon |\mathbf{E}(\mathbf{r})|^2 + \frac{\mu_0}{2} |\mathbf{H}(\mathbf{r})|^2.
\end{align*}
```
Voor het speciale geval van vlakke golf {eq}`eq. Eplanew`, {eq}`eq. In een medium zonder absorptie krijgen we:

```{math}
:label: eq. Saveplanew
\begin{align*}
\mathbf{S} = \frac{1}{2} \sqrt{\frac{\epsilon}{ \mu_0}} \text{Re}\left[ A A^*\right]\hat{\mathbf{z}}
= \frac{1}{2}\sqrt{\frac{\epsilon}{ \mu_0}} |A|^2 \hat{\mathbf{z}}.
\end{align*}
```

De lengte van de vector {eq}`eq. Saveplanew` is de tijdgemiddelde stroom van energie per oppervlakte-eenheid in de richting van de vlakke golf en wordt gewoonlijk de **intensiteit** van de golf genoemd. Voor de tijdgemiddelde elektromagnetische energiedichtheid van de vlakke golf krijgen we:

```{math}
:label: eqUavplanew
\begin{align*}
<U_{nl}> = \frac{1}{2} \epsilon |A|^2 + \frac{1}{2\mu_0}\mu_0 \epsilon |A|^2
= \epsilon |A|^2.
\end{align*}
```

```{note}
Voor een vlakke golf is zowel de tijdgemiddelde energieflux als de tijdgemiddelde energie dichtheid evenredig met het kwadraat van de modulus van het complexe elektrische veld.
```


(section.rt)=
## Reflectie en transmissie op een grensvlak


Wanneer een elektromagnetisch veld invalt op een grensvlak tussen verschillende media, wordt het veld gedeeltelijk gereflecteerd en gedeeltelijk doorgelaten. Een belangrijk speciaal geval is dat van een monochromatische vlakke golf die invalt op een vlak grensvlak zoals in {numref}`Fig_2_16_Interface`.

Laat het grensvlak het vlak $z=0$ zijn tussen materialen in $z<0$ en $z>0$ met respectievelijk permittiviteiten $\epsilon_i$ en $\epsilon_t$. We gaan er eerst van uit dat de materialen verliesvrij zijn, d.w.z. dat de permittiviteiten reëel zijn.
De vlakke golf is invallend vanaf medium $z<0$ en het invallende elektromagnetische veld wordt gegeven door:

```{math}
:label: eq. Ei
\begin{align*}
\mathbf{\mathcal{E}}^{i}(\mathbf{r},t) &= \text{Re}\left[ \mathbf{E}^i(\mathbf{r})e^{-i\omega t}\right]= \text{Re}\left[ \mathbf{A}^i e^{i (\mathbf{k}^i\cdot \mathbf{r} -\omega t)} \right], \end{align*}
```
```{math}
:label: eq. Hoi
\begin{align*}
\\
\mathbf{\mathcal{H}}^i(\mathbf{r},t) &= \text{Re}\left[ \mathbf{H}^i(\mathbf{r}) e^{-i\omega t}\right] = \text{Re} \left[ \frac{\mathbf{k}^i}{\omega \mu_0} \times \mathbf{A}^i e^{i (\mathbf{k}^i\cdot \mathbf{r} -\omega t)} \right],\end{align*}
```
waar
$\mathbf{k}^i= k_x^i \hat{\mathbf{x}} +k_y^i\hat{\mathbf{y}} + k_z^i \hat{\mathbf{z}}$, met

```{math}
:label: eq.kzi
\begin{align*}
k_z^i=\sqrt{k_0^2 \epsilon_i- (k_x^i)^2- (k_y^i)^2}.
\end{align*}
```
Omdat de tijdsafhankelijkheid wordt gegeven door $\exp(-i\omega t)$ met $\omega>0$ en de invallende golf zich voortplant in de positieve $z$-richting, wordt de positieve wortel gekozen voor $k_z^i$.
Een deel van het incidentveld wordt weerspiegeld in $z<0$ en een deel wordt doorgelaten in $z>0$. Het gereflecteerde veld wordt geschreven als

```{math}
:label: eq. Eh
\begin{align*}
\mathbf{\mathcal{E}}^{r}(\mathbf{r},t) &= \text{Re}\left[ \mathbf{E}^r(\mathbf{r})e^{-i\omega t}\right]= \text{Re}\left[ \mathbf{A}^r e^{i (\mathbf{k}^r \cdot \mathbf{r} -\omega t)}\right],
\end{align*}
```
```{math}
:label: eq. Hr
\begin{align*}
\\
\mathbf{\mathcal{H}}^{r}(\mathbf{r},t) &= \text{Re}\left[ \mathbf{H}^r(\mathbf{r})e^{-i\omega t}\right]= \text{Re}\left[ \frac{\mathbf{k}^r}{\omega \mu_0}\times \mathbf{A}^r e^{i (\mathbf{k}^r \cdot \mathbf{r} -\omega t)}\right],\end{align*}
```
waar
$\mathbf{k}^r= k_x^r \hat{\mathbf{x}} +k_y^r\hat{\mathbf{y}} + k_z^r \hat{\mathbf{z}} $,
met

```{math}
:label: eq.kzr
\begin{align*}
k_z^r=-\sqrt{k_0^2 \epsilon_i- (k_x^r)^2-(k_y^r)^2},
\end{align*}
```
waarbij het minteken wordt gekozen omdat de gereflecteerde golf zich voortplant in de negatieve $z$-richting. Het doorgelaten veld is voor $z>0$

```{math}
:label: eq. Et
\begin{align*}
\mathbf{\mathcal{E}}^{t}(\mathbf{r},t) &= \text{Re}\left[ \mathbf{E}^t(\mathbf{r})e^{-i\omega t}\right]= \text{Re}\left[ \mathbf{A}^t e^{i (\mathbf{k}^t\cdot \mathbf{r} -\omega t)} \right],.
\end{align*}
```
```{math}
:label: eq. Ht
\begin{align*}
\\
\mathbf{\mathcal{H}}^{t}(\mathbf{r},t) &= \text{Re}\left[ \mathbf{H}^t(\mathbf{r})e^{-i\omega t}\right]= \text{Re}\left[ \frac{\mathbf{k}^t}{\omega\mu_0}\times \mathbf{A}^t e^{i (\mathbf{k}^t\cdot \mathbf{r} -\omega t)} \right],\end{align*}
```
waar
$\mathbf{k}^t= k_x^t \hat{\mathbf{x}} +k_y^t \hat{\mathbf{y}} + k_z^t \hat{\mathbf{z}}$, met

```{math}
:label: eq.kzt
\begin{align*}
k_z^t=\sqrt{k_0^2 \epsilon_t- (k_x^t)^2-(k_y^t)^2}.
\end{align*}
```
Ons doel is om $\mathbf{A}^r$ en $\mathbf{A}^t$ te bepalen voor gegeven $\mathbf{A}^i$.

```{index} Maxwell Boundary Conditions
:name: section.bcmaxwell
```

Er bestaan voorwaarden voor de continuïteit van de tangentiële en de normale componenten van zowel de elektrische als de magnetische velden op een grensvlak tussen verschillende media.
De randvoorwaarden voor de tangentiële componenten volgen uit de Maxwell-vergelijkingen die de curl-operator bevatten, d.w.z. {eq}`eq.faraday5` en {eq}`eq.maxwell5`. Er geldt voor het raakvlak $z=0$ met de inkomende, de gereflecteerde en doorgelaten vlakke golven die hierboven zijn geïntroduceerd dat:

```{math}
:label: eq.bcE_t
\begin{align*}
\hat{\mathbf{z}} \times (\mathbf{E}^i + \mathbf{E}^r)=\hat{\mathbf{z}} \times \mathbf{E}^t, \end{align*}
```
```{math}
:label: eq.bcH_t
\begin{align*}
\\
\hat{\mathbf{z}} \times (\mathbf{H}^i + \mathbf{H}^r)=\hat{\mathbf{z}} \times \mathbf{H}^t,\end{align*}
```
waarbij $\hat{\mathbf{z}}$ de eenheid normaal is op de interface. Dit betekent dat de tangentiële componenten van het *totale* elektrische en *totale* magnetische veld continu zijn over het grensvlak, of expliciet:

```{math}
:label: eq.bcEx
\begin{align*}
E_x^i(x,y,0) + E_x^r(x,y,0) &= E_x^t(x,y,0), \end{align*}
```
```{math}
:label: eq.bcEy
\begin{align*}
\\
E_y^i(x,y,0) + E_y^r(x,y,0) &= E_y^t(x,y,0),\end{align*}
```
en zo ook voor het magnetisch veld.


```{figure} Images/Chapter_1/1_09_Stokes_loop_f1.png
:name: Fig_2_08_Stokes_loop
Gesloten lus in het $(x,z)$-vlak dat het gebied $A$ en het omringende deel van het grensvlak omsluit $z=0$, zoals gebruikt in de wet van Stokes om de continuïteit af te leiden van de elektrische en magnetische componenten die raakvlak zijn aan het grensvlak en evenwijdig aan het vlak door de lus.
```


We zullen alleen aantonen dat de tangentiële componenten van het elektrische veld continu zijn. Door een gesloten lus te kiezen in het $(x,z)$-vlak dat wordt doorsneden door het grensvlak $z=0$ zoals weergegeven in {numref}`Fig_2_08_Stokes_loop`, en de $y$-component van de wet van Faraday {eq}`eq.faraday4` te integreren voor het totale elektromagnetische veld over het gebied $A$ begrensd door de lus ${\cal L}$, verkrijgen we:

```{math}
:label: eq.stokes
\begin{align*}
-\mu_0 \frac{d}{dt} \int\!\int_A \hat{\mathbf{y}} \cdot \mathbf{\mathcal{H}} \mathrm{d}A &= \int\!\int_A \hat{\mathbf{y}} \cdot \mathbf{\nabla} \times \mathbf{\mathcal{E}} \mathrm{d}A  \\
&= \oint_{\cal L} \mathbf{\mathcal{E}} \cdot \mathrm{d}\mathbf{l},
\end{align*}
```
waar we in de laatste stap de stelling van Stokes gebruikten met de richting van integratie over de lus gegeven door die van de draairichting van een schroevendraaier wanneer deze beweegt in de richting van de normale $\hat{\mathbf{y}}$. Met andere woorden: de veranderingssnelheid van de magnetische flux door het oppervlak $A$ is gelijk aan de integraal van het tangentiële elektrische veld over de begrenzende gesloten lus ${\cal L}$.

Door de limiet $\mathrm{d}z\rightarrow 0$ te nemen, verdwijnen de oppervlakte-integraal en de integralen over de verticale delen van de lus en blijven er alleen de integralen van het tangentiële elektrische veld over de horizontale delen evenwijdig aan de $x$-as van de lus aan beide zijden van het grensvlak $z=0$. Aangezien deze integralen in tegengestelde richtingen worden doorkruist en de lengtes van deze delen hetzelfde en willekeurig zijn, concluderen we voor de lus zoals weergegeven in {numref}`Fig_2_08_Stokes_loop` dat

```{math}
:label: eq.fresnel10
\begin{align*}
\lim_{z\uparrow 0} \mathbf{\mathcal{E}}_x(x,y,z,t) = \lim_{z\downarrow 0} \mathbf{\mathcal{E}}_x(x,y,z,t),
\end{align*}
```
waarin $\mathbf{\mathcal{E}}$ het totale elektrische veld is, d.w.z. het is gelijk aan de som van het invallende en het gereflecteerde veld voor $z<0$, en gelijk aan het doorgelaten veld in $z>0$.
Door te kiezen voor de gesloten lus in het $(y,z)$-vlak in plaats van het $(x,z)$-vlak vindt men op dezelfde manier dat de $y$-component van het elektrische veld continu is.
De continuïteit van de tangentiële componenten van het magnetisch veld wordt op een vergelijkbare manier afgeleid.

Onze afleiding geldt voor elektromagnetische velden van willekeurige tijdsafhankelijkheid. Bovendien kan de hierboven gebruikte afleiding voor het vlakke grensvlak $z=0$ gemakkelijk worden gegeneraliseerd voor gekromde oppervlakken. Daarom concluderen we:

```{note}
De tangentiële elektrische en magnetische veldcomponenten zijn continu over elk grensvlak.
```

Door de vergelijkingen van Maxwell te integreren die de div-operator {eq}`eq.gauss4`, {eq}`eq.divH4` bevatten over een pillendoos met hoogte $\mathrm{d}z$ en boven- en ondervlakken aan weerszijden en evenwijdig aan het grensvlak, en rekening houdend met de limiet $\mathrm{d}z\rightarrow 0$, vinden we continuïteitsrelaties voor de normale componenten van de velden:

```{math}
:label: eq.bcE_z
\begin{align*}
\lim_{z\uparrow 0} \epsilon_i \hat{\mathbf{z}} \cdot\mathbf{\mathcal{E}}(x,y,z,t) &= \lim_{z\downarrow 0} \epsilon_t \hat{\mathbf{z}} \cdot \mathbf{\mathcal{E}}(x,y,z,t), \end{align*}
```
```{math}
:label: eq.bcH_z
\begin{align*}
\lim_{z\uparrow 0} \hat{\mathbf{z}} \cdot\mathbf{\mathcal{H}}(x,y,z,t) &= \lim_{z\downarrow 0} \hat{\mathbf{z}}\cdot \mathbf{\mathcal{H}}(x,y,z,t),\end{align*}
```

```{note}
De normale componenten van $\epsilon \mathbf{\mathcal{E}}$ en $\mathbf{\mathcal{H}}$ zijn continu over een interface.
```

**Opmerkingen.**
- Aangezien de afgeleide randvoorwaarden gelden voor alle tijden t, volgt hieruit dat ze voor tijdharmonische velden ook gelden voor de complexe velden. Vandaar dat {eq}`eq.bcE_t` en {eq}`eq.bcH_t` gelden en op dezelfde manier zien we dat de normale componenten van $\epsilon \mathbf{E}$ en $\mathbf{H}$ continu zijn.
- Wanneer de magnetische permeabiliteit discontinu is, hebben we dat de normale component van $\mu \mathbf{\mathcal{H}}$ continu is over het grensvlak. Maar zoals al eerder is opgemerkt, is bij optische frequenties de magnetische permeabiliteit vaak die van vacuüm en we gaan ervan uit dat dit in dit hele boek het geval is.

(eq.snellslaw)=
### Snell's Law

Door de complexe elektrische velden te vervangen die zijn afgeleid van {eq}`eq. Ei`, {eq}`eq. Er` en {eq}`eq. Et` in vergelijking {eq}`eq.bcE_t` krijgen we

```{math}
:label: eq.contET
\begin{align*}
\hat{\mathbf{z}}\times \left[ \mathbf{A}^i e^{i (k_x^i x + k_y^i y)} + \mathbf{A}^r e^{i (k_x^r x + k_y^r y)}\right] = \hat{\mathbf{z}}\times \mathbf{A}^t e^{i (k_x^t x + k_y^t y)},
\end{align*}
```
Aangezien aan deze vergelijking moet worden voldaan voor alle punten $(x,y)$, volgt hieruit dat

```{math}
:label: eq.contkx
\begin{align*}
k_x^i = k_x^r=k_x^t, \end{align*}
```
```{math}
:label: eq.contky
\begin{align*}
\\
k_y^i = k_y^r=k_y^t.\end{align*}
```
Vandaar dat de tangentiële componenten van de golfvectoren van de invallende, gereflecteerde en doorgelaten golven identiek zijn.
Sterker nog, als {eq}`eq.contkx` niet zou gelden, dan zouden bij een vaste $y$ de exponentiële functies in {eq}`eq.contET` niet allemaal dezelfde periodiciteit hebben als functies van $x$ en dan zou {eq}`eq.contET` nooit voor alle $x$ kunnen worden voldaan. Hetzelfde argument met $x$ vast gehouden leidt tot de conclusie {eq}`eq.contky`.
Zonder de algemeenheid te beperken, gaan we er vanaf nu van uit dat het coördinatenstelsel zo is gekozen dat

```{math}
:label: eq.ky0
\begin{align*}
k_y^i=k_y^r=k_y^t=0.
\end{align*}
```
Het vlak door de invallende golfvector en de normaal naar het grensvlak wordt het **invalsvlak** genoemd. In het geval van {eq}`eq.ky0` is het invalsvlak dus het $(x,z)$-vlak.
Aangezien de lengte van de golfvectoren $\mathbf{k}^i$ en $\mathbf{k}^r$ $k_0 n_i$, met $k_0$ het golfgetal in vacuüm en $n_i=\sqrt{\epsilon_i/\epsilon_0}$ de brekingsindex is, en aangezien de lengte van $\mathbf{k}^t$ $k_0n_t$, met $n_t=\sqrt{\epsilon_t/\epsilon_0}$, volgt uit {eq}`eq.contkx`

```{math}
:label: eq.angle_ir
\begin{align*}
\sin \theta_i = \frac{k_x^i}{k_0 n_i}= \frac{k_x^r}{k_0 n_i}=\sin \theta_r,
\end{align*}
```
en

```{math}
:label: eq.angle_it
\begin{align*}
n_i \sin \theta_i = \frac{k_x^i}{k_0} = \frac{k_x^t}{k_0} = n_t \sin \theta_t,
\end{align*}
```

waar de hoeken zijn zoals in {numref}`Fig_2_16_Interface`. Vandaar

```{figure} Images/Chapter_1/1_10_Interface_f1.png
:name: Fig_2_16_Interface
De invallende, gereflecteerde en doorgelaten golfvectoren met de elektrische en magnetische vectoren voor s- en p-polarisatie. Voor s-polarisatie wijst het elektrische veld uit het vlak op het getoonde moment, terwijl voor p-polarisatie het magnetische veld op het getoonde moment uit het vlak wijst.
```


```{math}
:label: eq.angle_ir2
\boxed{\begin{align*}
\theta_i &= \theta_r,\hspace{1cm}\;\text{hoek van reflectie = invalshoek}, \end{align*}}
```

```{math}
:label: eq.angle_it2
\boxed{\begin{align*}
\\
n_i \sin \theta_i &= n_t \sin \theta_t, \;\;\;
\text{ De wet van Snellius}. \end{align*}}
```

De wet van Snellius <sup>[^5]</sup> impliceert dat wanneer de invalshoek $\theta_i$ toeneemt, de transmissiehoek ook toeneemt. Als het medium in $z<0$ lucht is met brekingsindex $n_i=1$ en het andere medium glas is met brekingsindex $n_t=1,5$, dan
De maximale transmissiehoek treedt op wanneer $\theta_i=90^o$ met

```{math}
:label: eq.thetamax
\begin{align*}
\theta_{t,max} = \arcsin(n_i/n_t)=41.8^o.
\end{align*}
```
In het geval dat het licht uit glas komt, d.w.z. $n_i=1,5$ en $n_t=1,0$, kan de invalshoek $\theta_i$ niet groter zijn dan $41,8^o$ omdat er anders geen echte oplossing is voor $\theta_t$. Het blijkt dat wanneer $\theta_i> 41,8^o$, de golf volledig wordt gereflecteerd en er geen *doorgaande* doorgelaten golf in de lucht is. Zoals uitgelegd in Sectie {eq}`subsection.totalrefl`, betekent dit echter niet dat er geen veld is in $z>0$. In feite is er een niet-voortplantende zogenaamde vluchtige golf in $z>0$. De hoek $\theta_{i,crit}=41.8^o$ wordt de **kritische hoek van totale interne reflectie** genoemd. Het bestaat alleen als een golf wordt ingevallen door een medium met een grotere brekingsindex op een medium met een lagere brekingsindex ($n_t<n_i$). De kritische invalshoek is onafhankelijk van de polarisatie van de invallende golf.

(subsection.fresnell)=
### Fresnel-coëfficiënten

Vanwege {eq}`eq.contkx` en {eq}`eq.ky0` schrijven we $k_x=k_x^i=k_x^r=k_x^t$ en dus $k_z^i = \sqrt{k_0^2\epsilon_i - k_x^2} = -k_z^r$ en
$k_z^t=\sqrt{k_0^2\epsilon_t-k_x^2}$. Vandaar

```{math}
:label: eq.kikr
\begin{align*}
\mathbf{k}^i = k_x \hat{\mathbf{x}} + k_z^i \hat{\mathbf{z}}, \;\;\; \mathbf{k}^r = k_x\hat{\mathbf{x}} - k_z^i \hat{\mathbf{z}},
\end{align*}
```
en

```{math}
:label: eq.kt
\begin{align*}
\mathbf{k}^t = k_x \hat{\mathbf{x}} + k_z^t \hat{\mathbf{z}}.
\end{align*}
```
Volgens {eq}`eq.orth` moeten voor het inkomende, gereflecteerde en doorgelaten vlakke golven daar zijn:

```{math}
:label: eq.orth2
\begin{align*}
\mathbf{A}^i \cdot \mathbf{k}^i = \mathbf{A}^r\cdot \mathbf{k}^r = \mathbf{A}^t\cdot \mathbf{k}^t =0.
\end{align*}
```
We kiezen een orthonormale basis loodrecht op $\mathbf{k}^i$ met eenheidsvectoren:

```{math}
:label: eq.sp
\begin{align*}
\hat{\mathbf{s}} = \hat{\mathbf{y}}, \quad \hat{\mathbf{p}}^i = \frac{1}{|\mathbf{k}^i|} \left( -k_z^i \hat{\mathbf{x}}+ k_x \hat{\mathbf{z}}\right),
\end{align*}
```
waar

```{math}
:label: eq.modk
\begin{align*}
|\mathbf{k}^i| = \sqrt{\mathbf{k}^i \cdot (\mathbf{k}^i)^*} = \sqrt{k_x^2 + |k_z^i|^2},
\end{align*}
```
en waar we bij het schrijven van de complexe geconjugeerde anticiperen op het geval dat de $k_z^i$ complex is, wat bijvoorbeeld kan gebeuren wanneer $\epsilon_i$ complex is (een geval dat tot nu toe is uitgesloten, maar dat later zal worden overwogen) of in het geval van vluchtige golven die worden besproken in sectie [Totale Interne Reflectie en voortvluchtige golven](subsection.totalrefl)
Merk op dat wanneer $k_z^i$ reëel is, $|\mathbf{k}^i|=\sqrt{k_x^2 + (k_z^i)^2}=k_0n_i$.
Het is gemakkelijk in te zien dat de basis {eq}`eq.sp` orthonormaal is in de ruimte van tweedimensionale complexe vectoren en dat $\hat{\mathbf{s}}\cdot\mathbf{k}^i=\hat{\mathbf{p}}^i\cdot \mathbf{k}^i=0$. De vector $\hat{\mathbf{s}}$ staat loodrecht op het invalsvlak, daarom is de elektrische veldcomponent in deze richting loodrecht op het invalsvlak gepolariseerd en wordt s-gepolariseerd ("Senkrecht" in het Duits) genoemd. De andere basisvector $\hat{\mathbf{p}}^i$ is (voor reëel $\mathbf{k}^i$) evenwijdig aan het invalsvlak en wanneer de elektrische component in deze richting  parallel gepolariseerd is, wordt dit p-gepolariseerd genoemd.
De complexe vector $\mathbf{A}^i$ kan op deze basis worden uitgebreid:

```{math}
:label: eq.expandAi
\begin{align*}
\mathbf{A}^i= A^i_s \, \hat{\mathbf{y}} + A^i_p \, \hat{\mathbf{p}}^i.
\end{align*}
```
Sinds

```{math}
:label: eq.vector
\begin{align*}
\mathbf{k}^i\times \hat{\mathbf{y}}= |\mathbf{k}^i| \hat{\mathbf{p}}^i, \;\;\; \mathbf{k}^i \times \hat{\mathbf{p}}^i= - \frac{k_0^2 \epsilon_i}{|\mathbf{k}^i|} \hat{\mathbf{y}},
\end{align*}
```
Hieruit volgt dat het elektrische en magnetische veld van de invallende vlakke golf kan worden geschreven als

```{math}
:label: eq. Eisp
\begin{align*}
\mathbf{E}^i(\mathbf{r}) &= \left(A^i_s\, \hat{\mathbf{y}} + A^i_p \, \hat{\mathbf{p}}^i\right) e^{i\mathbf{k}^i\cdot \mathbf{r}}, \end{align*}
```
```{math}
:label: eq. Hisp
\begin{align*}
\\
\mathbf{H}^i(\mathbf{r}) &=\left( \frac{ |\mathbf{k}^i| } {\omega \mu_0} A^i_s \, \hat{\mathbf{p}}^i - \frac{ \omega \epsilon_0\epsilon_i}{|\mathbf{k}^i|} A^i_p \, \hat{\mathbf{y}} \right) e^{i\mathbf{k}^i\cdot \mathbf{r}}.\end{align*}
```
Het gereflecteerde veld wordt uitgebreid op basis van $\hat{\mathbf{y}}$ en $\hat{\mathbf{p}}^r$ met

```{math}
:label: eq.defpr
\begin{align*}
\hat{\mathbf{p}}^r = -\frac{1}{|\mathbf{k}^i|} \left( k_z^i \hat{\mathbf{x}} + k_x \hat{\mathbf{z}}\right).
\end{align*}
```
Het teken voor de eenheidsvector $\hat{\mathbf{p}}^r$ is zo gekozen dat de $x$-component gelijk is aan die van $\hat{\mathbf{p}}^i$.
Sinds

```{math}
:label: eq.vectorr
\begin{align*}
\mathbf{k}^r\times \hat{\mathbf{y}}= -|\mathbf{k}^i| \hat{\mathbf{p}}^r, \;\;\; \mathbf{k}^r \times \hat{\mathbf{p}}^r= \frac{k_0^2 \epsilon_i}{|\mathbf{k}^i|} \hat{\mathbf{y}},
\end{align*}
```
Hieruit volgt dat

```{math}
:label: eq. Ersp
\begin{align*}
\mathbf{E}^r(\mathbf{r}) &= \left(A^r_s\, \hat{\mathbf{y}} + A^r_p \, \hat{\mathbf{p}}^r \right) e^{i\mathbf{k}^r\cdot \mathbf{r}}, \end{align*}
```
```{math}
:label: eq. Hrsp
\begin{align*}
\\
\mathbf{H}^r(\mathbf{r}) &=\left( -\frac{|\mathbf{k}^i|} {\omega \mu_0} A^r_s \, \hat{\mathbf{p}}^r + \frac{ \omega\epsilon_0 \epsilon_i}{|\mathbf{k}^i|} A^r_p \, \hat{\mathbf{y}} \right) e^{i\mathbf{k}^r\cdot \mathbf{r}},\end{align*}
```
waar we dat $\mathbf{k}^r\cdot \mathbf{k}^r=k_0^2 n_i^2 $ en $|\mathbf{k}^r|=\sqrt{k_x^2 + |k_z^r|^2}=\sqrt{k_x^2+|k_z^i|^2}=|\mathbf{k}^i|$.
Voor de doorgelaten vlakke golf gebruiken we de basis $\hat{\mathbf{y}}$ en $\hat{\mathbf{p}}^t$ met

```{math}
:label: eq.defPt
\begin{align*}
\hat{\mathbf{p}}^t= \frac{1}{|\mathbf{k}^t|} \left( -k_z^t \hat{\mathbf{x}}+ k_x \hat{\mathbf{z}}\right),
\end{align*}
```
waarbij $\hat{\mathbf{p}}^t$ zo is gekozen dat de $x$-component van $\hat{\mathbf{p}}^t$ hetzelfde teken heeft als de $x$-component van $\hat{\mathbf{p}}^i$. Sinds

```{math}
:label: eq.vector2
\begin{align*}
\mathbf{k}^t\times \hat{\mathbf{y}}= |\mathbf{k}^t| \hat{\mathbf{p}}^t, \;\;\; \mathbf{k}^t \times \hat{\mathbf{p}}^t= - \frac{k_0^2 \epsilon_t}{|\mathbf{k}^t|} \hat{\mathbf{y}},
\end{align*}
```
We krijgen

```{math}
:label: eq. Etsp
\begin{align*}
\mathbf{E}^t(\mathbf{r}) &= \left( A^t_s\, \hat{\mathbf{y}} + A^t_p \, \hat{\mathbf{p}}^t \right) e^{i\mathbf{k}^t\cdot \mathbf{r}}, \end{align*}
```
```{math}
:label: eq. Htsp
\begin{align*}
\\
\mathbf{H}^t(\mathbf{r}) &= \left( \frac{ |\mathbf{k}^t|} {\omega \mu_0} A^t_s \, \hat{\mathbf{p}}^t - \frac{ \omega \epsilon_0\epsilon_t}{|\mathbf{k}^t|} A^t_p \, \hat{\mathbf{y}} \right) e^{i\mathbf{k}^t\cdot \mathbf{r}},\end{align*}
```
We beschouwen nu een s-gepolariseerde invallende vlakke golf, d.w.z. $A^i_p=0$. We zullen laten zien dat aan alle randvoorwaarden kan worden voldaan door $A^r_p=A^t_p=0$ en door $A^r_s$ en $A^t_s$ op de juiste manier uit te drukken in termen van $A^i_s$. Dit impliceert dat als de invallende vlakke golf s-gepolariseerd is, de gereflecteerde en doorgelaten golven ook s-gepolariseerd zijn. Voor s-polarisatie heeft het elektrische veld slechts een $y$-component en deze component raakt aan het grensvlak $z=0$. Dit leidt tot de voorwaarde

```{math}
:label: eq. Ascont1
\begin{align*}
A_s^i + A^r_s = A^t_s.
\end{align*}
```
De enige tangentiële component van het magnetisch veld is de $x$-component en de eis dat deze continu is voor $z=0$ leidt tot

```{math}
:label: eq. Ascont2
\begin{align*}
-k_z^i A_s^i + k_z^i A^r_s = -k_z^t A^t_s.
\end{align*}
```
Het oplossen van {eq}`eq. Ascont1`, {eq}`eq. Ascont2` voor $A_s^r$ en $A^t_s$ geeft de volgende formule voor de reflectie- en transmissiecoëfficiënten:


```{math}
:label: eq.rs
\boxed{\begin{align*}
r_s & = \frac{A^r_s}{A^i_s} = \frac{k_z^i-k_z^t}{k_z^i + k_z^t}, \end{align*}}
```

```{math}
:label: eq.ts
\boxed{\begin{align*}
\\
t_s & = \frac{A^t_s}{A^i_s} = \frac{2k_z^i}{k_z^i + k_z^t}. \end{align*}}
```

Alleen het magnetisch veld heeft een $z$-component en het is gemakkelijk te verifiëren dat $H^i_z + H^r_z = H_z$ voor $z=0$.

Als we kijken naar het geval van een p-gepolariseerde invallende golf: $A^i_s=0$, zien we dat de uitdrukking voor het magnetisch veld in het p-gepolariseerde geval gelijkaardig wordt (behalve voor de gekozen tekens) aan die van het elektrische veld voor s-polarisatie en omgekeerd. Het afdwingen van de continuïteit van de tangentiële componenten op $z=0$ geeft voor p-polarisatie:


```{math}
:label: eq.rp
\boxed{\begin{align*}
r_p & = \frac{A^r_p}{A^i_p} = - \frac{\frac{k_z^i}{\epsilon_i}-\frac{k_z^t}{\epsilon_t}}{\frac{k_z^i}{\epsilon_i} + \frac{k_z^t}{\epsilon_t}}, \end{align*}}
```

```{math}
:label: eq.tp
\boxed{\begin{align*}
\\
t_p & = \frac{A^t_p}{A^i_p} =\frac{\epsilon_i |\mathbf{k}^t|} {\epsilon_t|\mathbf{k}^i|} \frac{\frac{2 k_z^i}{\epsilon_i}}{\frac{k_z^i}{\epsilon_i} + \frac{k_z^t}{\epsilon_t}}. \end{align*}}
```

Het is gemakkelijk te verifiëren dat $E_z$ de enige normale component is en dat $\epsilon_i (E^i_z+E^r_z)=\epsilon_t E^t_z$ voor $z=0$.
De reflectie- en transmissiecoëfficiënten $r_s$, $r_p$, $t_s$ en $t_p$ worden **Fresnel-coëfficiënten** genoemd. Zoals volgt uit de afleiding, is er geen overspraak tussen s- en p-gepolariseerde vlakke golven die op een vlakke interface vallen. Een algemeen gepolariseerde invallende vlakke golf kan altijd worden geschreven als een lineaire combinatie van s- en een p-gepolariseerde invallende vlakke golven. Omdat in het algemeen $r_s\neq r_p$ en $t_s\neq t_p$, volgt hieruit dat de gereflecteerde en doorgelaten velden ook lineaire combinaties zijn van s- en p-gepolariseerde velden, maar met andere coëfficiënten (gewichten) van deze twee fundamentele polarisatietoestanden dan voor de invallende golf.




**Opmerkingen.**
- Bij de afleiding van de Fresnel-coëfficiënten werd de continuïteit van de normale veldcomponenten niet gebruikt en werd automatisch voldaan. De reden hiervoor is dat de elektromagnetische velden van de vlakke golven loodrecht op de golfvectoren staan. Dit impliceert dat de divergentie van $\epsilon \mathbf{\mathcal{E}}$ en van $\mathbf{\mathcal{H}}$ verdwijnt, wat op zijn beurt impliceert dat de normale componenten automatisch continu zijn over de interface.
- Als $k_z^i$ en $k_z^t$ beide reëel zijn, hebben we $|\mathbf{k}^i|=k_0n_i$ en $|\mathbf{k}^t|=k_0n_t$ en kunnen de Fresnel-coëfficiënten worden uitgedrukt in de hoeken $\theta_i$, $\theta_r$ en $\theta_t$ en de brekingsindices $n_i=\sqrt{\epsilon_i}/\epsilon_0$ en $n_t=\sqrt{\epsilon_t/\epsilon_0}$. Omdat $k^i_z=k_0n_i \cos\theta_i$ en $k^t_z=k_0 n_t \cos \theta_t$, vinden we

```{math}
:label: eq.rs3
\begin{align*}
r_s &= \frac{n_i \cos \theta_i-n_t \cos \theta_t}{n_i \cos \theta_i + n_t \cos \theta_t} = -\frac{\sin(\theta_i-\theta_t)}{\sin(\theta_i+\theta_t)}, \end{align*}
```
```{math}
:label: eq.ts3
\begin{align*}
\\
t_s &= \frac{2 n_i \cos \theta_i }{ n_i \cos \theta_i + n_t \cos \theta_t} = \frac{2 \cos \theta_i \sin \theta_t}{\sin(\theta_i+\theta_t)},\end{align*}
```
en

```{math}
:label: eq.rp3
\begin{align*}
r_p &= - \frac{\frac{\cos\theta_i}{n_i} - \frac{\cos \theta_t}{n_t}}{ \frac{\cos\theta_i}{n_i} + \frac{\cos \theta_t}{n_t}}= -\frac{\tan(\theta_i-\theta_t)}{ \tan(\theta_i+\theta_t)}, \end{align*}
```
```{math}
:label: eq.tp3
\begin{align*}
\\
t_p &= \frac{\frac{2 \cos\theta_i}{n_i} }{ \frac{\cos\theta_i}{n_i} + \frac{\cos \theta_t}{n_t}}= \frac{ 2 \cos \theta_i \sin\theta_t}{ \sin(\theta_i+\theta_t) \cos(\theta_i-\theta_t)}.\end{align*}
```
Om de uitdrukkingen uiterst rechts in {eq}`eq.rs3`, {eq}`eq.ts3`, {eq}`eq.rs3` en {eq}`eq.tp3` te verkrijgen, is de wet van Snellius gebruikt.

- Het voordeel van de uitdrukkingen {eq}`eq.rs`, {eq}`eq.ts`, {eq}`eq.rp`, {eq}`eq.tp` in termen van de golfvectorcomponenten $k_z^i$ en $k_z^t$ is dat deze ook van toepassing zijn als $k_z^i$ en/of $k_z^t$ complex zijn. De componenten $k_z^i$ en/of $k_z^t$ zijn complex wanneer er sprake is van absorptie in $z<0$ en/of in $z>0$. Wanneer $\epsilon_i>\epsilon_t$ en de invalshoek boven de kritische hoek ligt, is $k_z^t$ imaginair (zie {numref}`subsection.totalrefl`).


```{figure} Images/Chapter_1/1_11_Fresnel_coefficient_AG_f1.png
:name: Fig_1_11_Fresnel_Coefficient
Reflectie- en transmissiecoëfficiënten als functie van de invalshoek van s- en p-gepolariseerde golven die van lucht naar glas vallen. De Brewster-hoek $\theta_B$ wordt aangegeven.
```

### Eigenschappen van de Fresnel-coëfficiënten
Voor normale inval: $\theta_i=0$, impliceert de wet van Snellius: $\theta_t=0$. Vandaar dat {eq}`eq.rs3`, {eq}`eq.rp3` het volgende geven:

```{math}
:label: eq.r_thetai0
\begin{align*}
r_s(\theta_i=0) = r_p(\theta_i=0)=\frac{n_i-n_t}{n_i + n_t},
\end{align*}
```
Dus voor normale inval: $r_p=r_s$, zoals verwacht. Merk echter op dat als we $\hat{\mathbf{p}}^r$ niet zo zouden hebben gedefinieerd dat de tangentiële componenten dezelfde zijn als die van $\hat{\mathbf{p}}^i$, de twee reflectiecoëfficiënten voor normale inval de tegenovergestelde tekens zouden hebben gehad (zoals in sommige boeken het geval is).
Als het invallende medium lucht is en het andere medium glas ($n_i=1.0$, $n_t=1.5$), krijgen we

```{math}
:label: eq.airglass
\begin{align*}
r_s(\theta_i=0)=r_p(\theta_i=0)= -0,2,
\end{align*}
```
En aangezien de energiestroom evenredig is met het kwadraat van het veld, volgt daaruit dat 4% van het normale invallende licht gereflecteerd wordt op het grensvlak tussen lucht en glas. Daarom reflecteert een glazen lens zonder anti-reflectie coating ongeveer 4% van het licht dat loodrecht binnenvalt. De transmissiecoëfficiënt voor loodrechte inval is:
```{math}
:label: eq.t_thetai0
\begin{align*}
t_s(\theta_i=0)=t_p(\theta_i=0)= \frac{2n_i}{n_i+n_t},
\end{align*}
```
die voor lucht-glas $ 0.8 $ wordt.




**Opmerking**. Energiebesparing vereist dat de normale component $<S_z>$ van de tijdgemiddelde energiestroom door het grensvlak continu is.
Door gebruik te maken van de formule voor de tijdgemiddelde Poynting-vector van een vlakke golf {eq}`eq.Saveplanew` in een vlakke golf kan worden nagegaan of de Fresnel-coëfficiënten zodanig zijn dat de energieflux inderdaad continu is.



Uit de wet van Snellius {eq}`eq.angle_it2` volgt dat wanneer beide brekingsindices $n-i$ en $n_t$ reëel zijn, $\sin \theta_t = (n_i/n_t) \sin \theta_i$. Vandaar dat $\theta_t$ monotoon toeneemt met $\theta_i$ en daarom bestaat er enige $\theta_i$ zodanig dat

```{math}
:label: eq.brewster
\begin{align*}
\theta_i + \theta_t = 90^o.
\end{align*}
```
Voor deze specifieke invalshoek is de noemer van {eq}`eq.rp3` oneindig en dus $r_p=0$, d.w.z. de p-gepolariseerde golf wordt helemaal niet gereflecteerd. Deze invalshoek wordt de **Brewster-hoek** $\theta_{B}$<sup>[^6]</sup>.
Het is gemakkelijk te zien aan {eq}`eq.rs3` dat de reflectie nooit nul is voor s-polarisatie.

```{note}
Als niet-gepolariseerd licht onder de Brewster-hoek valt, is het gereflecteerde licht puur s-gepolariseerd.
```
Omdat bij de Brewster-hoek s-gepolariseerd licht slechts gedeeltelijk wordt gereflecteerd en de rest wordt doorgelaten, is het doorgelaten licht bij de Brewster-hoek een mengsel van s- en p-polarisatie.
We hebben
$\theta_t=90^o-\theta_i$, vandaar $\sin\theta_t=\cos\theta_i$ en door de wet van Snellius (met $\theta_i=\theta_{B})$):

```{math}
:label: eq. Brewster
\begin{align*}
\tan(\theta_{B})=\frac{n_t}{n_i}.
\end{align*}
```
We zien dat er altijd een Brewster-hoek is wanneer beide brekingsindces reëel zijn, onafhankelijk van het feit of de golf invalt door het materiaal met de kleinste of grootste brekingsindex. Voor de lucht-glas interface hebben we $\theta_{B}=56.3^o$ en $\theta_t=33.7^o$. Door {eq}`eq.rs3`:

```{math}
:label: eq.rSbrester
\begin{align*}
r_s(\theta_B=56.3^o)=-0.38,
\end{align*}
```
zodat $(0.38)^2/2=0.07$, of 7 \% van het ongepolariseerde licht wordt gereflecteerd als puur s-gepolariseerd licht op het luchtglas-grensvlak onder de Brewster-hoek. Voor een golfinval van glas, $\theta_{B}=33.7^o$.

```{figure} Images/Chapter_1/1_12_Fresnel_coefficient_GA_f1.png
:name: Fig_1_12_Fresnel_Coefficient
Reflectie- en transmissiecoëfficiënten als functie van de invalshoek van s- en p-gepolariseerde golven die van glas naar lucht vallen.
```

In {numref}`Fig_1_12_Fresnel_Coefficient` worden de Fresnel-reflectie- en transmissiecoëfficiënten van s- en p-gepolariseerde golven weergegeven als functies van de invalshoek voor het geval van inval van lucht naar glas. Er is in dit geval geen kritische hoek van totale reflectie. De Brewster-hoek wordt aangegeven. Men ziet dat de reflectiecoëfficiënten afnemen van de waarden $-0,2$ voor $\theta_i=0^o$ tot -1 voor $\theta_i=90^o$.
De transmissiecoëfficiënten nemen monotoon af tot $0$ bij $\theta_i=90^o$.

{numref}`Fig_1_12_Fresnel_Coefficient` toont de Fresnel-coëfficiënten wanneer de golf van glas naar lucht gaat. De kritische hoek is $\theta_{i,crit}=41.8^o$ zoals eerder afgeleid. Bij de hoek van de totale interne reflectie zijn de absolute waarden van de reflectiecoëfficiënten identiek aan 1. Er is weer een hoek waarin de weerkaatsing van p-gepolariseerd licht nul is $\\
heta_{B}=33.7^o$.

Afhankelijk van de brekingsindices en de invalshoek kunnen de Fresnel-reflectiecoëfficiënten negatief zijn. Het gereflecteerde elektrische veld heeft dan een extra $\pi$ faseverschuiving ten opzichte van de invallende golf. Daarentegen (op voorwaarde dat de materialen verliesvrij zijn) is het doorgelaten veld altijd in fase met het invallende veld, d.w.z. de transmissiecoëfficiënten zijn altijd positief.



```{index} Totale interne reflectie en vluchtige golven
:name: subsection.totalrefl
```
### Totale interne reflectie en vluchtige golven

We keren terug naar het geval van een golfinval van glas naar lucht, d.w.z. $n_i=1,5$ en $n_t=1$. Zoals is uiteengezet, is er dan sprake van een kritische invalshoek, die wordt gegeven door

```{math}
\begin{align*}
\sin \theta_{i,crit} = \frac{n_t}{n_i}.
\end{align*}
```
Dit komt overeen met

```{math}
:label: eq.kxt
\begin{align*}
k_x^{t} = k_0 n_i \sin \theta_{i,crit} = k_0 n_t.
\end{align*}
```
De golfvector $\mathbf{k}^t=k_x^t \hat{\mathbf{x}} + k_z^t\hat{\mathbf{z}}$ in $z>0$ voldoet altijd aan:

```{math}
:label: eq.kt2
\begin{align*}
(k_x^t)^2 + (k_z^t)^2 = k_0^2 n_t^2,
\end{align*}
```
en dus in de kritische hebben we

```{math}
:label: eq.kzt0
\begin{align*}
k_z^t=0.
\end{align*}
```
Voor invalshoeken boven de kritische hoek hebben we: $k_x^t>k_0 n_t $ en uit {eq}`eq.kt2` volgt dat
$(k_z^t)^2=k_0^2n_t^2 -(k_x^t)^2<0$, vandaar $k_z^t$ **imaginair**:

```{math}
:label: eq.kzt2
\begin{align*}
k_z^t =\pm \sqrt{ k_0^2n_t^2 - (k_x^t)^2} = \pm i \sqrt{(k_x^t)^2-k_0^2},
\end{align*}
```
waarbij de laatste vierkantswortel een positief reëel getal is. Er kan worden aangetoond dat boven de kritische hoek de reflectiecoëfficiënten **complexe** getallen zijn met modulus 1: $|r_s|=|r_p|=1$. Dit impliceert dat de gereflecteerde intensiteit identiek is aan de intensiteit van het invallen, terwijl tegelijkertijd de transmissiecoëfficiënten niet nul zijn! Bijvoorbeeld voor S-polarisatie hebben we volgens {eq}`eq.rs`, {eq}`eq.ts`:

```{math}
:label: eq.rts
\begin{align*}
t_s=1+ r_s \neq 0,
\end{align*}
```
omdat $r_s \neq -1$ (hoewel $|r_s|=1$).
Daarom is er een elektrisch veld in $z>0$, gegeven door

```{math}
:label: eq. Eevan
\begin{align*}
\mathbf{E}(x,z)e^{-i \omega t} = t_s e^{i k_x^t x + i k_z^t z -i\omega t} \hat{\mathbf{y}}=
t_s e^{i (k_x^t x - \omega t)} e^{ -z \sqrt{(k_x^t)^2-k_0^2n_t^2}} \hat{\mathbf{y}}, \;\; z>0,
\end{align*}
```
waar we het $+$ teken in {eq}`eq.kzt2` hebben gekozen om te voorkomen dat het veld opblaast voor $z \rightarrow \infty$. Aangezien $k_x^t$ reëel is, plant de golf zich voort in de $x$-richting. In de $z$-richting is de golf echter **niet** aan het voortplanten. De amplitude neemt exponentieel af als functie van de afstand $z$ tot het grensvlak en daarom is de golf beperkt tot een dunne laag grenzend aan het grensvlak. Zo'n golf wordt een **vluchtige golf** genoemd.
De Poynting-vector van de vluchtige golf kan worden berekend en blijkt te zijn parallel aan de interface.

```{note}
De energiestroom van een vluchtige golf plant zich evenwijdig aan het grensvlak voort, namelijk in de richting waarin $k_x^t$ positief is.
```
Er wordt dus geen energie van het grensvlak naar het luchtgebied getransporteerd. We komen terug op vluchtige golven in het hoofdstuk over de diffractietheorie.

```{admonition} Externe bronnen in aanbevolen volgorde
1. [Youtube video - 8.03 - Lect 18 - Index van breking, reflectie, Fresnel-vergelijkingen, Brewster-hoek](https://www.youtube.com/watch?v=_D1z6t2z168) - Lezing door Walter Lewin
2. [MIT OCW - Reflection at The Air-glass Boundary](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/reflection-at-the-air-glass-boundary/): demonstratie van reflectie van gepolariseerd licht en de Brewster-hoek.
```


## Glasvezel
We zullen in hoofdstuk {eq}`chapter.diffraction` over diffractie laten zien dat een lichtstraal uiteindelijk altijd breder wordt voor het vergroten van de voortplantingsafstand. De divergentie betekent dat de energiedichtheid in de bundel afneemt met de voortplantingsafstand. Deze divergentie kan worden voorkomen door het licht zich in een vezel te laten voortplanten.
De geleiding van licht in een vezel is gebaseerd op het fenomeen van totale interne reflectie. Het principe is al lang bekend, maar het onderwerp kreeg een enorme boost door de uitvinding van de laser.

Beschouw een rechte glazen cilinder met een brekingsindex $n_2$, omgeven door lucht met een brekingsindex $n_1=1<n_2$. De kern van de cilinder heeft een doorsnede ter grootte van een mensenhaar en is daarom, hoewel vrij klein, nog steeds vele optische golflengten dik. Dit houdt in dat wanneer licht op het cilindrische oppervlak valt, we de cilinder lokaal als een plat oppervlak kunnen beschouwen. Door een laserstraal op het invalsvlak van de vezel te richten, kan licht in de vezel worden gekoppeld. Het deel van het licht in de vezel dat het cilinderoppervlak raakt onder een hoek met de normaal die groter is dan de kritische hoek van totale reflectie, wordt volledig gereflecteerd. Als het de andere kant van het cilinderoppervlak raakt, wordt het weer volledig gereflecteerd enzovoort ({numref}`Fig_2_13_Laser_Glass` bovenaan).

```{figure} Images/Chapter_1/1_15_Fiber.png
```

```{figure} Images/Chapter_1/1_13_Laser_Glas_f1.jpg
```

```{figure} Images/Chapter_1/1_14_Schott_Fibers.jpg
:name: Fig_2_13_Laser_Glass
Boven: schema van een lichtstraal die een glasvezel binnendringt; binnenin wordt het licht volledig gereflecteerd en geleid door de vezel. Links: Licht geleid in een stuk glas. {\footnotesize (van [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Demostration_of_Total-Internal-Reflection(TIR)_in_a_wine_glass.jpg) door Keerthi - CC BY )}; rechts: een glasvezelbeeldomvormer draait een afbeelding 180 graden van het invoeroppervlak naar het uitvoeroppervlak.\footnotesize (Image:&copy; SCHOTT)
```

Omdat zichtbaar licht zulke hoge frequenties heeft (ordegrootte $ 10^{15}$ Hz), kan ongeveer honderdduizend keer meer informatie door een vezel worden vervoerd dan bij microgolffrequenties. Tegenwoordig worden vezels met zeer lage verliezen zo gefabriceerd dat signalen met nauwelijks enige verzwakking over de aarde kunnen worden gestuurd. Abraham van Heel, hoogleraar optica aan de Technische Universiteit Delft, toonde voor het eerst aan in een artikel dat in 1954 in Nature verscheen. A, Nieuwe methode voor het transporteren van optische beelden zonder aberraties. Nature 173, 39 (1954) <sup>[^7]</sup> dat door duizenden vezels in een kabel te verpakken, beelden kunnen worden overgedragen, zelfs als de bundel gebogen is ({numref}`Fig_2_13_Laser_Glass` rechts).

```{admonition} Externe bronnen in aanbevolen volgorde
1. [MIT OCW - Single Mode Fiber](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/single-mode-fiber/): Demonstratie van een single-mode glasvezel.
2. [MIT OCW - Multi-mode Fiber](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/multi-mode-fiber/): Demonstratie van een multimode glasvezel.
```


[^1]: Eenheden van fysische grootheden worden geschreven tussen haakjes [.].

[^2]: [Khan Academy - Faraday's Law Introduction](https://www.khanacademy.org/science/physics/magnetic-flux-and-faradays-law/magnetic-flux-faradays-law/v/faradays-law-introduction)

[^3]: 
[Khan Academy - Magnetic field created by a current carrying wire (Ampere's Law)](https://www.khanacademy.org/science/physics/magnetic-forces-and-magnetic-fields/magnetic-field-current-carrying-wire/v/magnetism-6-magnetic-field-due-to-current)

[^4]: Voor een afleiding zie D.J. Griffiths, *Introduction to Electrodynamics*, Pearson.

[^5]:  Vernoemd na Willebrord Snellius 1580-1626, wiskundeprofessor in Leiden

[^6]: [MIT OCW - Reflection at The Air-glass Boundary](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/reflection-at-the-air-glass-boundary/): demonstratie van reflectie van gepolariseerd en de Brewsterhoek.

[^7]: Van Heel, A. A, New Method of transporting Optical Images without Aberrations. Nature 173, 39 (1954) [link](https://doi.org/10.1038/173039a0)
