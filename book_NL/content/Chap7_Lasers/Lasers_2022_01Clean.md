(chapter.lasers)=
# Lasers

```{admonition} Wat je moet weten en kunnen na het bestuderen van dit hoofdstuk
- De bijzondere eigenschappen van laserbronnen kennen.
- De optische resonator gebrijpen en waarom deze nodig is.
- De rol van de versterker begrijpen en uitleggen wat de versterkingscurve is.
- Het principe van populatie-inversie en hoe dit kan worden bereikt kunnen uitleggen.
- Hoe een enkelvoudige frequentiewerking kan worden verkregen kunnen uitleggen.
- Begrijpen wat transversale modi zijn en hoe ze kunnen worden voorkomen.
```

In het begin van de jaren 1950 werd een nieuwe bron van microgolfstraling, de maser, uitgevonden door C.H. Townes in de VS en A.M. Prokhorov en N.G. Basov in de USSR. Maser staat voor "Microwave Amplification by Stimulated Emission of Radiation". In 1958 formuleerden A.L. Schawlow en Townes de fysieke beperking om een soortgelijk apparaat voor zichtbaar licht te realiseren. Dit resulteerde in 1960 in de eerste optische maser van T.H. Maiman in de USA.
Dit apparaat werd sindsdien  **L**ight **A**mplification by **S**timulated **E**mission of **R**adiation of **laser** genoemd.
Het heeft een revolutie teweeggebracht in wetenschap en techniek en heeft vele toepassingen, bijv.
- streepjescodelezers,
- compact discs,
- computerprinters,
- glasvezel communicatie,
- sensoren,
- materiaalverwerking,
- niet-destructief onderzoek,
- positie en bewegingsbesturing,
- medische toepassingen, zoals de behandeling van netvliesloslating,
- kernfusie,
- holografie.


## Unieke eigenschappen van lasers
De brede toepassing van lasers wordt mogelijk gemaakt door de unieke eigenschappen die lasers onderscheiden van alle andere lichtbronnen. Hieronder bespreken we deze unieke eigenschappen.
### Smalle spectrale breedte; Hoge temporele coherentie
Deze eigenschappen zijn gelijkwaardig.
Een spectrale lamp kan, net als een gasontladingslamp op basis van kwikdamp, een spectrale breedte hebben van $\Delta \nu=$ 10 GHz. Zichtbare frequenties zijn ongeveer $2\times 10^{14}$ Hz, vandaar dat de spectrale breedte van de lamp ongeveer $0,02\%$ is. De lijndikte gemeten in golflengten voldoet aan

```{math}
:label: eq.Dlambda
\begin{align*}
\frac{\Delta \lambda}{\lambda}=\frac{\Delta \nu}{\nu},
\end{align*}
```
en dus is voor $\lambda=550 nm$, $\Delta \lambda$ van een spectrale lamp in de orde van $0,1$ nm.
Een laser kan echter gemakkelijk een frequentieband hebben die een factor $100$ kleiner is, d.w.z. minder dan 10 MHz=$10^7$ Hz in het zichtbare. Voor een golflengte van $550$ nm betekent dit dat de lijnbreedte slechts $0,001$ nm is.
Zoals in hoofdstuk 7 is uitgelegd, is de coherentietijd $\tau_c$ van het uitgezonden licht het omgekeerde van de frequentiebandbreedte:

```{math}
:label: eq.tau
\begin{align*}
\Delta \tau_c= 1/\Delta \nu.
\end{align*}
```
Licht wordt uitgezonden door atomen in uitbarstingen van harmonische (cosinus) golven die bestaan uit een groot maar eindig aantal perioden. Zoals in dit hoofdstuk zal worden toegelicht, is de bijzondere configuratie van de laser, kunnen de golftreinen in laserlicht extreem lang zijn, wat overeenkomt met een zeer lange coherentietijd.
### Sterk gecollammeerde bundel
Beschouw een ontladingslamp zoals getoond in Afb. {numref}`Fig_7_01_Gas_Source_Collimation`.

```{figure} Images/Chapter_7/7_01_Gas_Source_Collimation.png
:name: Fig_7_01_Gas_Source_Collimation
Een ontladingslamp in het brandpuntsvlak van een convergerende lens. Elk atoom in de lamp zendt een bolvormige golf uit tijdens een uitbarsting van straling, die gemiddeld een coherentietijd $\Delta \tau_c$ duurt. De totale divergentie van de bundel wordt bepaald door de atomen op de uiterste posities van de bron. 
```

Om het licht te collimeren, kan de lamp in het brandpuntsvlak van een lens worden geplaatst.
De bolvormige golven die door de atomen (puntbronnen) in de lamp worden uitgezonden, worden gecollimeerd tot vlakke golven waarvan de richting afhangt van de positie van de atomen in de bron. De atomen aan de randen van de bron bepalen de totale divergentiehoek $\theta$, die wordt gegeven door

```{math}
:label: eq.theta
\begin{align*}
\theta=h/f,
\end{align*}
```
waarbij $2h$ de grootte van de bron is en $f$ de brandpuntsafstand van de lens is, zoals weergegeven in {numref}`Fig_7_01_Gas_Source_Collimation`. Daarom kan het licht worden gecollimeerd door een lens met een grote brandpuntsafstand te kiezen of door de grootte van de bron te verkleinen, of beide. Beide methoden leiden echter tot zwakke intensiteiten.
Door de speciale configuratie van de laserbron, die bestaat uit een Fabry-Perot resonator waarbij het licht vele malen op en neer kaatst voordat het wordt uitgezonden, bevinden de atomaire bronnen zich in feite allemaal op zeer grote afstand en is de effectieve grootte van de bron zeer klein. De divergentie van de laserstraal wordt dus niet beperkt door de grootte van de bron, maar door de grootte van het emitterende oppervlak door het onvermijdelijke effect van diffractie.
Zoals volgt uit hoofdstuk {eq}`chapter.diffcraction`, heeft een evenwijdige bundel met een diameter $D$ en golflengte $\lambda$
een diffractiebeperkte divergentie die wordt gegeven door:

```{math}
:label: eq.theta2
\begin{align*}
\theta = \frac{\lambda}{D}.
\end{align*}
```
De diffractiebeperkte divergentie hangt dus af van de golflengte en neemt af naarmate de diameter van het emitterende oppervlak toeneemt. Met een laserbron kan de diffractiebeperkte convergentiehoek bijna worden bereikt en daardoor kan een gecollimeerde bundel met een zeer hoge intensiteit worden gerealiseerd ({numref}`Fig_7_02_Laser_Source_Collimation`).

```{figure} Images/Chapter_7/7_02_Laser_Source_Collimation.png
:name: Fig_7_02_Laser_Source_Collimation
Een laserstraal kan bijna diffractiebeperkte collimatie bereiken.
```

### Diffractie-beperkte focusspot, hoge ruimtelijke coherentie
Als een perfect gecollimeerde bundel wordt gefocusseerd met een lens met zeer kleine aberraties en met numerieke apertuur $\text{NA}$, is de laterale grootte van de focusvlek, volgens hoofdstuk {eq}`chapter.diffraction`, diffractie-beperkt en gegeven door

```{math}
:label: eq.diffrspot
\begin{align*}
\text{diffractie-beperkte spotgrootte}= 0.6 \frac{f}{D}\lambda = 0.6 \frac{\lambda}{\textit{NA}}.
\end{align*}
```
Met een laser kan men een diffractie-beperkte plek bereiken met een zeer hoge intensiteit.

Zoals is uitgelegd in {numref}`chapter.coherence`, heeft een lichtgolf **hoge ruimtelijke coherentie**  als op een bepaald moment de amplitude en fase op verschillende punten kunnen worden voorspeld. De bolvormige golven die door een puntbron worden uitgezonden, hebben deze eigenschap. Maar wanneer er veel puntbronnen (atomen) zijn die elk uitbarstingen van harmonische golven uitzenden die op willekeurige tijdstippen beginnen, zoals het geval is in een klassieke lichtbron, kunnen de amplitude en fase van het totale uitgezonden veld op elke positie in de ruimte niet worden voorspeld. De enige manier om het licht ruimtelijk coherent te maken is door de lichtbron heel klein te maken, maar dan is er nauwelijks licht. Zoals hieronder zal worden uitgelegd, zijn door het ontwerp van de laser de emissies door de atomen van het versterkende medium in een laser fasegecorreleerd, wat leidt tot een zeer hoge temporele en ruimtelijke coherentie.

```{figure} Images/Chapter_7/7_03_Laser_Focus.png
:name: Fig_7_03_Laser_Focus
diffractie-beperkte vlek verkregen door het focussen van een gecollimeerde bundel. 
```

De eigenschap van een kleine vlekgrootte met hoge intensiteit is essentieel voor veel toepassingen, zoals beeldvorming met hoge resolutie, materiaalverwerking met snij-, las- en boorplekken met zeer hoog vermogen en bij netvlieschirurgie, waarbij een zeer kleine vlek met hoge intensiteit wordt aangebracht om het netvlies te lassen zonder het omliggende gezonde weefsel te beschadigen.

### Hoog vermogen
Er zijn twee soorten lasers, namelijk continue golf (CW)  lasers, die een continue output produceren, en gepulseerde lasers die een trein van pulsen uitzenden. Deze pulsen kunnen erg kort zijn: van nanoseconden tot zelfs femtoseconden ($10^{-15}$ s). Een CW-laser met een relatief laag vermogen is de HeNe-laser, die ongeveer 1 mW uitzendt op de golflengte 632 nm. Andere lasers kunnen tot een megawatt continu vermogen uitstralen. Gepulseerde lasers kunnen enorme piekintensiteiten uitzenden (d.w.z. op het maximum van een puls), variërend van $ 10^9$ tot $ 10^{15}$ Watt.

Er zijn veel toepassingen van krachtige lasers, zoals voor het snijden en lassen van materialen.
Om EUV-licht te verkrijgen met voldoende hoge intensiteit voor gebruik in fotolithografie voor de fabricage van IC's, worden extreem krachtige CO$_2$ lasers gebruikt om een plasma te exciteren.
Extreem krachtige lasers worden ook toegepast om fusie te initiëren en in veel niet-lineaire optische toepassingen.
Lasers met zeer korte pulsen worden gebruikt om zeer snelle verschijnselen met korte vervaltijden te bestuderen.

### Breed afstembereik
Voor een breed scala aan golflengten, van het vacuüm ultraviolet (VUV), het ultraviolet (UV), het zichtbare, het infrarood (IR), het midden-infrarood (MIR) tot het ver-infrarood (FIR), zijn lasers beschikbaar. Voor sommige soorten lasers kan het afstembereik vrij breed zijn.
De hiaten in het elektromagnetische spectrum die niet direct worden aangepakt door laseremissie, kunnen worden opgevuld door technieken zoals hogere harmonische opwekking en frequentiedifferentie.

(section.optres)=
## Optische resonator

We leggen nu de werking van lasers uit. Een laser bestaat uit
1. een optische resonator;
2. een versterkend medium.


In deze sectie beschouwen we de resonator. Zijn functie is om een hoge lichtenergiedichtheid te verkrijgen en controle te krijgen over de emissiegolflengten.

Een resonator, of het nu mechanisch is zoals een slinger, een veer of een snaar, of elektrisch zoals een LRC-circuit, heeft een of meerdere resonantiefrequenties $\nu_{res}$. Elke resonator heeft verliezen waardoor de oscillatie geleidelijk uitsterft als er geen energie wordt geleverd. De verliezen veroorzaken een exponentiële afname van de amplitude van de oscillatie, zoals weergegeven in {numref}`Fig_7_04_Laser_Resonant`. De oscillatie is dus niet zuiver monochromatisch, maar heeft een eindige bandbreedte van orde $\Delta \nu\approx 1/\Delta \tau$ zoals weergegeven in {numref}`Fig_7_04_Laser_Resonant`, waarbij $\Delta \tau$ het tijdstip is waarop de amplitude van de oscillatie is teruggebracht tot de helft van de beginwaarde.

```{figure} Images/Chapter_7/7_04_Laser_Decay.png
:name: Fig_7_04_Laser_Resonant
Gedempte oscillatie (links) en frequentiespectrum van een gedempte oscillatie (rechts) met resonantiegolflengte en frequentiebreedte gelijk aan het omgekeerde van de vervaltijd. 
```


De optische resonator is een Fabry-Perot resonator gevuld met wat materiaal met brekingsindex $n$ begrensd door twee uitgelijnde, sterk reflecterende spiegels op een afstand $L$. De Fabry-Perot resonator wordt uitgebreid besproken in Sectie {eq}`section.fabryperot` maar om dit hoofdstuk te begrijpen is een gedetailleerde analyse van de Fabry-Perot niet nodig.

Laat de $z$-as gekozen worden langs de as van de holte, zoals weergegeven in {numref}`Fig_7_05_Fabry_Perrot_resonance_mode`, en neem aan dat de dwarsrichtingen zo groot zijn dat het licht kan worden beschouwd als een vlakke golf die heen en weer stuitert langs de $z$-as tussen de twee spiegels. Laat $\omega$ de frequentie zijn en $k_0=\omega/c$ het golfgetal in vacuüm. De vlakke golf die zich voortplant in de positieve $z$-richting wordt gegeven door:

```{math}
:label: eq.resonator1
\begin{align*}
E(z) = A e^{i k_0 n z},
\end{align*}
```

```{figure} Images/Chapter_7/7_05_Fabry_Perrot_resonance_mode.png
:name: Fig_7_05_Fabry_Perrot_resonance_mode
Fabry-Perot resonanties.
```

Voor zeer goede spiegels blijft de amplitude ongewijzigd bij reflecties, terwijl de fase meestal verandert met $\pi$. Vandaar dat na één rondreis (d.w.z. twee reflecties) het veld {eq}`eq.resonator1` is (de mogelijke faseveranderingen bij de spiegels tellen op tot $2\pi$ en hebben dus geen effect):

```{math}
:label: eq.resonator2
\begin{align*}
E(z)=A e^{2i k_0 n L} e^{i k_0 n z}.
\end{align*}
```
Er ontstaat een sterk veld wanneer deze golf constructief interfereert met {eq}`eq.resonator1`, d.w.z. wanneer

```{math}
:label: eq.resonator3
\begin{align*}
k_0 =\frac{ 2\pi m }{2 n L}, \;\;\text{ or } \;\; \nu = \frac{k c}{2\pi} = m \frac{c }{2n L},
\end{align*}
```
voor $m=1,2,\ldots$. Vandaar dat, op voorwaarde dat de dispersie van het medium kan worden verwaarloosd (d.w.z. $n$ onafhankelijk is van de frequentie), de resonantiefrequenties worden gescheiden door

```{math}
:label: eq.freespectral
\begin{align*}
\Delta \nu_{f}=c/(2nL),
\end{align*}
```
dat is het zogenaamde **vrije spectrale bereik**. Voor een gaslaser met een lengte van 1 m is het vrije spectrale bereik ongeveer 150 MHz.

**Voorbeeld**
Stel dat de holte 100 cm lang is en gevuld is met een materiaal met brekingsindex $n=1$. Licht met een zichtbare golflengte van $\lambda= 500$ nm komt overeen met modusnummer $m=2L/\lambda = 4\times 10^6$ en het vrije spectrale bereik is $\Delta \nu_f=c/(2L)=150$ MHz.

De meervoudige reflecties van het laserlicht in de resonator maken de optische weglengte erg groot. Voor een waarnemer lijken de atomaire bronnen zich op een zeer grote afstand te bevinden en het licht dat de holte verlaat lijkt op een vlakke golf. Zoals hierboven uitgelegd, wordt de divergentie van de bundel dus niet beperkt door de grootte van de bron, maar door diffractie als gevolg van de opening van de uitgangsspiegel.

Door verliezen veroorzaakt door de spiegels (die nooit perfect reflecteren) en door de absorptie en verstrooiing van het licht, hebben de resonanties een bepaalde frequentiebreedte $\Delta \nu$. Wanneer een resonator als laser wordt gebruikt, krijgt een van de spiegels een kleine transmissie om het laserlicht te koppelen en dit draagt ook bij aan het verlies van de resonator. Om alle verliezen te compenseren, moet de holte een versterkend medium bevatten. Door de versterking worden de resonantielijnbreedtes binnen de bandbreedte van de versterker gereduceerd tot zeer scherpe lijnen, zoals weergegeven in {numref}`Fig_7_06_Laser_line`.

```{figure} Images/Chapter_7/7_06_Laser_Spectra.png
:name: Fig_7_06_Laser_line
Resonantiefrequenties van een holte met een lengte $L$ wanneer de brekingsindex $n=1$. Met een versterker in de holte worden de lijnbreedtes van de resonanties binnen de bandbreedte van de versterker verkleind. De omhulling is de spectrale functie van de versterking. 
```

## Versterking
Versterking kan worden bereikt door een medium met atomaire resonanties die zich op of dicht bij een van de resonanties van de resonator bevinden. We herinneren ons eerst de eenvoudige theorie die Einstein in 1916 ontwikkelde over het dynamische evenwicht van een materiaal in aanwezigheid van elektromagnetische straling.
### De Einstein-coëfficiënten

We beschouwen twee atoomenergieniveaus $E_2>E_1$. Door een foton van energie te absorberen

```{math}
:label: eq.planck1
\begin{align*}
\hbar\omega = E_2-E_1,
\end{align*}
```
kan een atoom dat zich aanvankelijk in de lagere energietoestand $1$ bevindt, worden opgewonden tot toestand 2. Hier is $\hbar$ de constante van Planck:

```{math}
:label: eq.hbar
\begin{align*}
\hbar= \frac{6.626070040}{2\pi} \times 10^{-34} \;\; \text{ Js }.
\end{align*}
```
Stel dat $W(\omega)$ de tijdgemiddelde elektromagnetische energiedichtheid *per eenheid van frequentie-interval* rond frequentie $\omega$ is. Vandaar dat $W$ de dimensie $\text{J}\text{s}\text{m}^3$ heeft. Laat $N_1$ en $N_2$ het aantal atomen zijn in respectievelijk toestand 1 en 2, waarbij

```{math}
:label: eq.N
\begin{align*}
N_1 + N_2 = N,
\end{align*}
```
het totale aantal atomen is (dat constant is). De absorptiesnelheid is de afnamesnelheid van $N_1$ en is evenredig met de energiedichtheid en het aantal atomen in toestand 1:

```{math}
:label: eq.stimulatedabsorption
\begin{align*}
\frac{d N_1}{dt} = - B_{12} N_1 W(\omega), \hspace{1cm} \textbf{absorptie},
\end{align*}
```
waar de constante $B_{12}>0$ de dimensie $\text{m}^3 \text{J}^{-1} \text{s}^{-2}$ heeft. Zonder enige invloed van buitenaf zal een atoom dat zich in de aangeslagen toestand bevindt, gewoonlijk binnen 1 ns of zo overgaan naar toestand 1, terwijl het een foton van energie {eq}`eq.planck1` uitzendt. Dit proces wordt **spontane emissie** genoemd, omdat het ook gebeurt zonder dat er een elektromagnetisch veld aanwezig is. De snelheid van spontane emissie wordt gegeven door:

```{math}
:label: eq.spontaneousemission
\begin{align*}
\frac{d N_2}{dt} = - A_{21} N_2, \hspace{1cm} \textbf{spontane emissie},
\end{align*}
```
waarbij $A_{21}$ de dimensie $\text{s}^{-1}$ heeft. De levensduur van spontane transmissie is $\tau_{sp}=1/A_{21}$. Het is belangrijk op te merken dat het spontaan uitgezonden foton wordt uitgezonden in een **willekeurige richting**. Bovendien, aangezien de straling op een willekeurig tijdstip plaatsvindt, is er geen faserelatie tussen het spontaan uitgezonden veld en het veld dat het atoom aanslaat.
Het ligt minder voor de hand dat in de aanwezigheid van een elektromagnetisch veld met een frequentie dicht bij de atomaire resonantie, een atoom in de aangeslagen toestand ook door dat veld kan worden gestimuleerd om een foton uit te zenden en over te brengen naar de lagere energietoestand. De snelheid van **gestimuleerde emissie** is evenredig met het aantal aangeslagen atomen en met de energiedichtheid van het veld:

```{math}
:label: eq.gestimuleerde emissie
\begin{align*}
\frac{d N_2}{dt} = - B_{21} N_2 W(\omega), \hspace{1cm} \textbf{gestimuleerde emissie},
\end{align*}
```
waarbij $B_{21}$ dezelfde dimensie heeft als $B_{12}$. Het is zeer belangrijk op te merken dat gestimuleerde emissie plaatsvindt in dezelfde elektromagnetische modus (bijvoorbeeld een vlakke golf) als de modus van het veld dat de transmissie opwekt en dat de fase van het uitgestraalde veld identiek is aan die van het gestimuleerde veld. Dit impliceert dat gestimuleerde emissie het elektromagnetische veld versterkt door constructieve interferentie. Deze eigenschap is cruciaal voor de werking van de laser.

```{figure} Images/Chapter_7/7_07_Laser_2level.png
:name: Fig_7_07_Laser_2level
absorptie, spontane emissie en gestimuleerde emissie.
```

### Relatie tussen de Einstein-coëfficiënten
De Einstein-coëfficiënten $A_{21}$, $B_{12}$ en $B_{21}$ zijn gerelateerd.
Denk aan een zwart lichaam, zoals een gesloten lege doos. Omdat er geen straling de doos binnenkomt of verlaat, zal na een bepaalde tijd de elektromagnetische energiedichtheid gelijk zijn aan de thermische dichtheid $W_T(\omega)$, die volgens de wet van Planck onafhankelijk is van het materiaal waarvan de doos is gemaakt en wordt gegeven door:

```{math}
:label: eq.planck2
\begin{align*}
W_T(\omega) = \frac{\hbar \omega^3}{\pi^2 c^3} \frac{1}{ \exp\left(\frac{\hbar \omega}{k_B T}\right) -1},
\end{align*}
```
waarin $k_B$ de constante van Boltzmann is:

```{math}
:label: eq.kBoltzmann
\begin{align*}
k_B = 1.38064852 \times 10^{-23} \text{mbox{m}^2 \mbox{kg} \mbox{s}^{-2} \mbox{K}^{-1}.
\end{align*}
```
De snelheden van opwaartse en neerwaartse overgangen van de atomen in de wand van de doos moeten identiek zijn:

```{math}
:label: eq.equilibrium
\begin{align*}
B_{12} N_1 W_T(\omega) = A_{21} N_2 + B_{21} N_2 W_T(\omega).
\end{align*}
```
Vandaar

```{math}
:label: eq.WT
\begin{align*}
W_T(\omega) = \frac{A_{21} }{B_{12}N_1/N_2 - B_{21}}.
\end{align*}
```
Maar in thermisch evenwicht:

```{math}
:label: eq.N2N1
\begin{align*}
\frac{N_2}{N_1} = \exp\left( -\frac{E_2-E_1}{k_B T}\right) = \exp\left( -\frac{\hbar \omega}{k_B T}\right).
\end{align*}
```
Door {eq}`eq.N2N1` in {eq}`eq.WT`, en als je het resultaat vergelijkt met {eq}`eq.planck2`, volgt daaruit dat beide uitdrukkingen voor $W_T(\omega)$ identiek zijn voor alle temperaturen, alleen als

```{math}
:label: eq.Einstein
\begin{align*}
B_{12}=B_{21}, \;\;\; A_{21} = \frac{\hbar \omega^3}{\pi^2 c^3} B_{21}.
\end{align*}
```

**voorbeeld**
Voor groen licht van $\lambda=550$ nm hebben we $\omega/c=2\pi/\lambda=2.8560 \times 10^6 \mbox{m}^{-1}$ en dus

```{math}
:label: eq.ratio
\begin{align*}
\frac{A_{21}}{B_{21}} = 1.5640 \times 10^{-15} \mbox{J s }\mbox{m}^{-3}.
\end{align*}
```
Vandaar dat de spontane en gestimuleerde emissiesnelheden gelijk zijn als $W(\omega)= 1,5640 \times 10^{-15} $ Js $\mbox{m}^{-3}$.


Voor een (smalle) frequentieband $\mathrm{d}\omega$ is de tijdgemiddelde energiedichtheid $W(\omega)\mathrm{d}\omega$ en voor een vlakke golf is de energiedichtheid gerelateerd aan de intensiteit $I$ (d.w.z. de lengte van de tijdgemiddelde Poynting-vector) door:

```{math}
:label: eq.WI
\begin{align*}
W(\omega) \mathrm{d}\omega = I /c.
\end{align*}
```
Een typische waarde voor de frequentiebreedte van een smalle emissielijn van een gewone lichtbron is: $10^{10}$ Hz, d.w.z. $\mathrm{d}\omega = 2\pi \times 10^{10}$ Hz. De spontane en gestimuleerde emissiewaarden zijn dan identiek als de intensiteit $I=2.95 \times 10^4$ W/m$^2$ is. Zoals te zien is in tabel {eq}`table_laser2`, is alleen voor laserlicht gestimuleerde emissie groter dan spontane emissie. Voor klassieke lichtbronnen is de spontane emissiesnelheid veel groter dan de gestimuleerde emissiesnelheid.
```{table} Typische intensiteiten van lichtbronnen.
:name: table_laser2
| | $I$ (W $\mbox{m}^{-2}$) |
| :--- | :--: |
| Kwik lamp | $10^4$ |
| Continue laser | $10^5 $ |
| Gepulseerde laser | $10^{13}$ |
```

Als een bundel met frequentiebreedte $\mathrm{d}\omega$ en energiedichtheid $W(\omega)\mathrm{d}\omega$ zich door een materiaal voortplant, is de snelheid van energieverlies evenredig met:

```{math}
:label: eq.loss
\begin{align*}
(N_1-N_2) B_{12} W(\omega).
\end{align*}
```
Volgens {eq}`eq.equilibrium` is dit gelijk aan de spontane emissiesnelheid. Het spontaan uitgezonden licht komt namelijk overeen met een verlies aan intensiteit van de bundel, omdat het in willekeurige richtingen en met willekeurige fase wordt uitgezonden.
Bij $N_2>N_1$, wordt het licht **versterkt**. Deze toestand wordt **populatie-inversie** genoemd en is essentieel voor de werking van de laser. Merk op dat de verhouding tussen de spontane en gestimuleerde emissiewaarden volgens {eq}`eq.Einstein`, evenredig met $\omega^3$. Daarom is het voor kortere golflengten zoals röntgenstralen veel moeilijker om lasers te maken dan voor zichtbaar licht.

### Populatie-inversie
Voor elektromagnetische energiedichtheid $W(\omega)$ per eenheid van frequentie-interval zijn de snelheidsvergelijkingen

```{math}
:label: eq.rate1
\begin{align*}
\frac{d N_2}{d t}&= - A_{21} N_2 + (N_1-N_2) B_{12} W(\omega), \end{align*}
```
```{math}
:label: eq.rate2
\begin{align*}
\\
\frac{d N_1}{d t}&= A_{21} N_2 - (N_1-N_2) B_{12} W(\omega).\end{align*}
```
Dus voor $\Delta N=N_2-N_1$:

```{math}
:label: eq.rateDN
\begin{align*}
\frac{d \Delta N}{dt} = -A_{21} \Delta N - 2 \Delta N B_{12} W(\omega) - A_{21} N,
\end{align*}
```
waarbij, zoals voorheen: $N=N_1+N_2$ constant is. Als aanvankelijk (d.w.z. bij $t=0$) alle atomen zich in de laagste toestand bevinden: $\Delta N(t=0)=-N$, dan volgt uit {eq}`eq.rateDN`:

```{math}
:label: eq.DN
\begin{align*}
\Delta N(t) = -N \left[ \frac{A_{21}}{A_{21} + 2 B_{12} W(\omega)} + \left( 1-\frac{A_{21}}{A_{21}+ 2 B_{12} W(\omega)} \right) e^{ -(A_{21}+2B_{12}W(\omega))t } \right].
\end{align*}
```
Een voorbeeld waarbij $A_{21}/B_{12}W(\omega)=0.5$ wordt weergegeven in {numref}`Fig_7_08_Laser_dNN`. We hebben altijd $\Delta N<0$, vandaar $N_2(t)< N_1(r)$ voor alle tijden $t$. Daarom kan een systeem met slechts twee niveaus geen populatie-inversie hebben. 
```{figure} Images/Chapter_7/7_08_Laser_dNN.png
:name: Fig_7_08_Laser_dNN
$\Delta N/N$ als functie van $t/(A_{21}+2B_{12}W)$ wanneer alle atomen zich in de grondtoestand bevinden op $t=0$, d.w.z. $\Delta N(0)=-N$.
```

Een manier om populatie-inversie van niveaus 1 en 2 te bereiken en dus amplificatie van de straling met frequentie $\omega$ met $\hbar \omega = E_2-E_1$ is om meer atomaire niveaus te gebruiken, bijvoorbeeld drie. In {numref}`Fig_7_09_Laser_3level` is de grondtoestand toestand 1 met twee bovenste niveaus 2 en 3, zodanig dat $E_1<E_2<E_3$. De overgang van interesse is nog steeds die van niveau 2 naar niveau 1. Aanvankelijk bevinden bijna alle atomen zich in de grondtoestand 1. Vervolgens worden atomen met een snelheid $R$ van niveau 1 rechtstreeks naar niveau 3 gepompt. De overgang $3 \rightarrow 2$ is niet-stralingsgericht en heeft een hoog tarief $A_{32}$ zodat niveau 3 snel wordt geleegd en daarom $N_3$ klein blijft. Toestand 2 wordt een metastabiele toestand genoemd, omdat de verblijftijd in deze toestand voor elk atoom relatief lang is. Daarom heeft de populatie de neiging om toe te nemen, wat leidt tot populatie-inversie tussen de metastabiele toestand 2 en de lagere grondtoestand 1 (die voortdurend wordt ontvolkt door naar het hoogste niveau te pompen).

Merk op dat $A_{31}$ klein moet zijn, omdat anders niveau 1 snel wordt opgevuld, waardoor populatie-inversie wordt gestopt. Dit effect kan worden gebruikt om een reeks laserpulsen als output te verkrijgen, maar is ongewenst voor een continu outputvermogen.

Pompen kan optisch gebeuren zoals beschreven, maar de energie om atomen van niveau 1 naar niveau 3 over te brengen kan ook worden geleverd door een elektrische ontlading in een gas of door een elektrische stroom.
Nadat het pompen populatie-inversie heeft bereikt, wordt er aanvankelijk geen licht uitgestraald. Dus hoe begint de laser eigenlijk?
Het laseren begint met spontane emissie. De spontaan uitgezonden fotonen stimuleren de emissie van de atomen in niveau 2 om te vervallen tot niveau 1, terwijl ze een foton van energie $\hbar \omega$ uitzenden. De **gestimuleerde emissie vindt plaats in fase met het aangeslagen licht** en daarom bouwt de lichtamplitude zich voortdurend coherent op, terwijl het heen en weer kaatst tussen de spiegels van de resonator. Doordat een van de spiegels enigszins transparant is, wordt er een bepaald laservermogen uitgezonden.

```{figure} Images/Chapter_7/7_09_Laser_3level.png
:name: Fig_7_09_Laser_3level
De drie Einstein-overgangen en de pomp.
```


## Gaatjes
Het versterkende medium kan de ruimte tussen de spiegels volledig opvullen zoals aan de bovenkant van {numref}`fig.lasercavity`, of er kan ruimte zijn tussen de versterker en de spiegels. Als de versterker bijvoorbeeld een gas is, kan deze worden omsloten door een glazen cilinder. De eindvlakken van de cilinder zijn gepositioneerd onder de Brewster-hoek ten opzichte van de as, zoals weergegeven in de middelste afbeelding van {numref}`fig.lasercavity`, om reflecties te minimaliseren. Dit type resonator wordt een resonator met buitenspiegels genoemd.
Gewoonlijk zijn een of beide spiegels convex, zoals te zien is in de onderste figuur van {numref}`fig.lasercavity`. We stellen zonder bewijs dat in dat geval de afstand $L$ tussen de spiegels en de kromtestralen $R_1$ en $R_2$ van de spiegels moet voldoen aan

```{math}
:label: eq.stab
\begin{align*}
0 < \left( 1 - \frac{L}{R_1}\right)\left( 1- \frac{L}{R_2}\right) < 1,
\end{align*}
```
anders zal het laserlicht uiteindelijk zijdelings de holte verlaten, d.w.z. het zal zijwaarts ontsnappen. Deze voorwaarde wordt de **stabiliteitsvoorwaarde** genoemd. De kromming van een bolle spiegel is positief en die van een holle spiegel is negatief. Het is duidelijk dat wanneer beide spiegels concaaf zijn, de laser altijd onstabiel is.

```{figure} Images/Chapter_7/7_10_laser_cavity.png
:name: fig.lasercavity
Drie soorten laserholtes. Het gearceerde gebied is de versterker. De middelste kast wordt een laser met uitwendige holtes genoemd.
```

## Problemen met laserbediening
In dit gedeelte bespreken we enkele problemen die zich voordoen met lasers en bespreken we wat er kan worden gedaan om ze op te lossen.
1. **Meerdere resonantiefrequenties** 

In veel toepassingen, zoals lasercommunicatie en interferometrie, heeft men een enkele golflengte nodig. Beschouw een holte met een lengte $L$ zoals weergegeven in {numref}`Fig_7_11_Laser_loss` en veronderstel dat de versterker een versterkingscurve heeft die veel resonanties van de resonator omvat. Een manier om een enkelvoudige frequentie-output te bereiken, is door ervoor te zorgen dat er slechts één frequentie is waarvoor de versterking groter is dan de verliezen. Men zegt dan dat de laser slechts voor één frequentie boven de drempel zit. Dit kan worden gedaan door de lengte $L$ van de holte zo klein te kiezen dat er slechts één modus onder de winstcurve is waarvoor de winst hoger is dan de verliezen. Een kleine lengte van de versterker betekent echter minder uitgangsvermogen en een minder gecollimeerde uitgangsbundel. Een andere methode zou zijn om het pompen te verminderen, zodat voor slechts één modus de winst de verliezen compenseert. Maar dit impliceert opnieuw dat het uitgangsvermogen van de laser relatief klein is. Een betere oplossing is om een Fabry-Perot holte in de laserholte toe te voegen, zoals weergegeven in {numref}`Fig_7_12_Laser_extra_Cavity`. De holte bestaat b.v. uit een stuk glas van een bepaalde dikte $a$. Door $a$ te kiezen die voldoende klein is, wordt de afstand in frequentie $c/(2a)$ tussen de resonanties van de Fabry-Perot-holte zo groot dat er slechts één Fabry-Perot-resonantie is onder de versterkingscurve van de versterker. Door de juiste hoek voor de Fabry-Perot holte ten opzichte van de as van de laserholte te kiezen, kan de Fabry-Perot resonantie bovendien gekoppeld worden aan de gewenste resonantiefrequentie.

```{figure} Images/Chapter_7/7_11_Laser_loss_a.png
:name: Fig_7_11_Laser_loss
laser met holte van lengte $L$ en brede versterkerversterkingscurve. Veel resonantiefrequenties van de resonanties liggen boven de drempel om de verliezen te compenseren. 
```


```{figure} Images/Chapter_7/7_12_Laser_extra_Cavity_b.png
:name: Fig_7_12_Laser_extra_Cavity
laser met holte van lengte $L$, een brede versterkerversterkingscurve en een toegevoegde Fabry-Perot-holte. De FB-resonanties fungeren als een extra filter om slechts één modus van de laser te selecteren.
```

2.**Meerdere transversale modi**

De bekendste lasermodus heeft een transversale intensiteitsverdeling, wat een Gaussiaanse functie is van de transversale afstand tot de optische as. We noemen een modus met Gaussiaanse transversale vorm een **longitudinale modus** en wanneer de frequentie voldoet aan $\nu=m c/(2L)$, wordt het de $m$ste longitudinale modus genoemd. In de laserholte kunnen echter ook andere modi met verschillende transversale patronen resoneren. Een voorbeeld is te zien in {numref}`Fig_7_13_Laser_cavity_mode` waar modus (1,0) uit twee maxima bestaat.

```{figure} Images/Chapter_7/7_13_Laser_cavity_mode.png
:name: Fig_7_13_Laser_cavity_mode
laserholte met (0,0) en (1,0) modi. 
```

Er bestaan nog veel meer transversale modi, zoals te zien is in {numref}`Fig_7_14_laser_spatial_modes`. De transversale modi hebben allemaal iets andere frequenties.
Dus zelfs als er slechts één Gaussiaanse modus boven de drempel is (d.w.z. modi komen voor slechts één waarde van $m$), kunnen er veel transversale modi zijn met frequenties die zeer dicht bij de frequentie van de Gaussiaanse modus liggen, die ook boven de drempel liggen. Dit wordt geïllustreerd in {numref}`Fig_7_15_Spectra_Trans_Mode` waar de frequenties van de modi (0,0), (1,0) en (1,1) allemaal boven de drempel liggen.

```{figure} Images/Chapter_7/7_14_laser_spatial_modes.png
:name: Fig_7_14_laser_spatial_modes
Intensiteitspatroon van verschillende transversale modi. 
```

Meestal geeft men de voorkeur aan de Gaussiaanse modus en zijn de transversale modi ongewenst.
Omdat de Gauss-modus de kleinste dwarsbreedte heeft, kunnen de andere transversale modi worden geëlimineerd door een opening in de laserholte te plaatsen.

```{figure} Images/Chapter_7/7_15_Spectra_Trans_Mode.png
:name: Fig_7_15_Spectra_Trans_Mode
resonantiefrequenties van transversale modi die voldoende versterking hebben om de verliezen te compenseren. 
```


## Soorten lasers
Er zijn veel soorten lasers: gas-, vaste-, vloeibare, halfgeleider-, chemische, excimer-, e-beam-, vrije elektronen-, vezel- en zelfs golfgeleiderlasers. We classificeren ze volgens het pompmechanisme.

### Optisch pompen
De energie om het atoom $A$ van de grondtoestand naar de aangeslagen toestand over te brengen, wordt geleverd door licht. De bron kan een andere laser zijn of een onsamenhangende lichtbron, zoals een ontladingslamp. Als $A$ het atoom in de grondtoestand is en $A^*$ het aangeslagen atoom, hebben we

```{math}
:label: eq.opticalpumP
\begin{align*}
\hbar \omega_{13} + A \rightarrow A^*,
\end{align*}
```
waarbij $\omega_{13}$ de frequentie is voor de overgang $1 \rightarrow 3$ zoals te zien is in {numref}`Fig_7_18_Pumping`. De Ruby-laser, waarvan het versterkende medium bestaat uit $\mbox{Al}_2\mbox{O}_3$ met 0,05 gewichtsprocent $\mbox{Cr}_2\mbox{O}_3$, was de eerste laser, uitgevonden in 1960. Het zendt lichtpulsen uit met een golflengte van 694,3 nm en wordt optisch gepompt met een gasontladingslamp. Andere optisch gepompte lasers zijn de YAG-, glas-, fiber-, halfgeleider- en kleurstoflaser.

```{figure} Images/Chapter_7/7_16_Pumping_Meta.png
:name: Fig_7_16_Pumping_a
Optisch pompen. 
```

In de kleurstoflaser is de versterker een vloeistof (bijv. Rhodamine6G). Het wordt optisch gepompt door een argonlaser en heeft een enorme versterkingsbreedte, die bijna het volledige zichtbare golflengtebereik bestrijkt. We kunnen een bepaalde golflengte selecteren door een dispersief element zoals de Fabry-Perot-holte in de laserholte te plaatsen en het in de juiste hoek te draaien om de gewenste golflengte te selecteren, zoals hierboven uitgelegd.

### Elektronenbotsingspomp
Energetische elektronen worden gebruikt om te botsen met de atomen van de versterker, waardoor een deel van hun energie wordt overgedragen:

```{math}
:label: eq.electronpump
\begin{align*}
A+e (\mathcal{E}_3) \rightarrow A^* + e(\mathcal{E}_1),
\end{align*}
```
waarin $e(\mathcal{E}_3)$ een elektron betekent met energie $\mathcal{E}_3$ en waarbij $\mathcal{E}_3-\mathcal{E}_1$ gelijk is aan
$\hbar \omega_{13}$ zodat het atoom wordt overgebracht van de grondtoestand 1 naar toestand 3 om populatie-inversie te verkrijgen.
Voorbeelden zijn de HeNe-, Argon-, Krypton-, Xenon-, Stikstof- en Koperlasers. Elektronen kunnen ontstaan door een ontlading of door een elektronenbundel.

```{figure} Images/Chapter_7/7_17_Hene.png
:name: Fig_7_17_Hene
HeNe-laser met sferische buitenspiegels, een persbuis met vlakken in de Brewster-hoek om reflecties te minimaliseren, en een anode en kathode voor de afvoerpomp (van [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Hene-1.png) door DrBob / CC BY-SA 3.0).
```

### Atoombotsing
Laat $B^m$ atoom $B$ zijn in een opgewekte, zogenaamde metastabiele toestand. Dit betekent dat $B^m$, hoewel onstabiel, een zeer lange ontspanningstijd heeft, d.w.z. langer dan 1 ms of zo. Als $B^m$ botst met atoom $A$, draagt het energie over aan $A$.

```{math}
:label: eq.atomcollission
\begin{align*}
B^m + A \pijl naar rechts
B + A^*,
\end{align*}
```
$A^*$ is de aangeslagen toestand die wordt gebruikt voor de gestimuleerde emissie. Als $\tau_{m1}$ de relaxatietijd van de metastabiele toestand $B^m$ is, dan is $\tau_{m1}$ erg groot en dus is de spontane emissiesnelheid erg klein. Dit impliceert dat het aantal metastabiele atomen als functie van de tijd $t$ wordt gegeven door een langzaam vervallende exponentiële functie $\exp(-t/\tau_{m1})$.

```{figure} Images/Chapter_7/7_18_Pumping_Collision.png
:name: Fig_7_18_Pumping
Aatomen $A$ naar toestand 2 pompen door botsing met metastabiele atomen $B^m$. 
```

Om metastabiele atomen te krijgen, kan men bijvoorbeeld atoom B van zijn grondtoestand 1 naar een aangeslagen toestand 3 boven toestand m pompen, zodat de spontane emissiesnelheid $3 \rightarrow m$ groot is. Het pompen kan elektrisch of op een andere manier gebeuren. Als het elektrisch gebeurt, dan hebben we

```{math}
:label: eq.Bm
\begin{align*}
B + e(\mathcal{E}_3) \rightarrow B^m + e(\mathcal{E}_1),
\end{align*}
```
Voorbeelden van dit soort lasers zijn
He-Ne, die in het rood uitstraalt bij 632 nm,
N$_2$-CO$_2$ en He-Cd. Al deze zijn afhankelijk van atoom- of molecuulbotsingen, waarbij het atoom of molecuul dat als eerste in de naam wordt genoemd, in de metastabiele toestand wordt gebracht en lasing plaatsvindt op een golflengte die overeenkomt met een niveauverschil van het tweede genoemde atoom of molecuul.
De CO$_2$ laser zendt uit met 10 $\mu$m en kan een enorm vermogen bereiken.

### Chemische pomp
In sommige chemische reacties wordt een molecuul gecreëerd in een aangeslagen toestand met populatie-inversie. Een voorbeeld is:

```{math}
:label: eq.chemical
\begin{align*}
A + B_2 \pijl naar rechts (AB)^* + B.
\end{align*}
```
Dus in dit geval zal de lasing plaatsvinden voor een overdracht tussen toestanden van molecuul $AB$.
De HF-, Ar-F-, Cr-F-, Xe-F- en Xe-Cl-lasers worden allemaal chemisch gepompt.

### Halfgeleiderlaser

```{figure} Images/Chapter_7/7_19_VCSEL_a.png
:name: Fig_7_19_VCSEL
halfgeleiderlaser met actieve *p-n* junctie, gepolijste eindvlakken en stroomtoevoer voor pompen.
```

In een halfgeleiderlaser zoals weergegeven in {numref}`Fig_7_19_VCSEL`, wordt het pompen gedaan door elektronenstroominjectie. Het is een van de meest compacte lasers en toch straalt hij doorgaans 20 mW vermogen uit. Er treden overgangen op tussen de geleidings- en valentiebanden in de buurt van de *p-n*-overgang. Elektronen uit de *n*-laags geleidingsband zullen recombineren met de gaten in de *p*-laag. Een holte wordt verkregen door de eindvlakken die loodrecht op de kruising staan te polijsten om ze sterk reflecterend te maken. Halfgeleiderlasers worden geproduceerd voor golflengten van 700 nm tot 30 $\mu$m en geven continue (CW) output.