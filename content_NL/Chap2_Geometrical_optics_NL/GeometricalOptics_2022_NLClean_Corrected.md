(Chapter.GeomOptics)=
# Geometrische optica


```{admonition} Wat je moet weten en kunnen na het bestuderen van dit hoofdstuk
- Principe van Fermat.
- Begrijpen hoe de benadering die wordt gemaakt in de Gaussiaanse geometrische optica werkt.
- Weten hoe je moet werken met de tekenconventie van de lenzenmakersformule (niet de afleiding van de formule).
- Begrijpen hoe de lenzenmakersformule van een enkele lens volgt uit de formule voor een enkel oppervlak.
- Begrijpen hoe het beeld van twee of meer lenzen kan worden afgeleid uit het beeld van een enkele lens door constructie en door het berekenen van de tussenliggende beelden. Je hoeft de vergelijking voor het beeld en de formules voor de brandpuntsafstanden van twee dunne lenzen niet te kennen.
- Begrijpen van de matrixmethode (je hoeft de matrices niet uit je hoofd te kennen).
- Begrijpen van de aanpassing van het lensmodel voor een dikke lens.
- Begrijpen van de beperkingen van geometrische optica, in het bijzonder wanneer diffractie-optica nodig is.
```
**Fijne software voor het oefenen van geometrische optica**:\\
[https://www.geogebra.org/m/X8RuneVy](https://www.geogebra.org/m/X8RuneVy)

## Inleiding
Geometrische optica is een oud onderwerp, maar het is nog steeds essentieel om optische instrumenten zoals camera's, microscopen, telescopen enz. te begrijpen en te ontwerpen. Geometrische optica ontstond lang voordat licht werd beschreven als een golf (zoals wordt gedaan in golfoptica) en lang voordat werd ontdekt dat licht een elektromagnetische golf is en dat optica deel uitmaakt van elektromagnetisme.

In dit hoofdstuk gaan we terug in de geschiedenis en behandelen we geometrische optica. Dat lijkt misschien vreemd nu we een veel nauwkeurigere en betere theorie tot onze beschikking hebben. De voorspellingen van geometrische optica zijn echter onder vrij gewone omstandigheden zeer nuttig en ook zeer nauwkeurig. In feite is er voor veel optische systemen en praktische instrumenten geen alternatief voor geometrische optica, omdat nauwkeurigere theorien veel te ingewikkeld zijn om te gebruiken.

Wanneer een materiaal wordt verlicht, beginnen de moleculen bolvormige golven uit te stralen (om precies te zijn, ze stralen als kleine elektrische dipolen). De totale golf die door het materiaal wordt verstrooid, is de som van al deze bolvormige golven. Een tijd-harmonische golf heeft op elk punt in de ruimte en op elk moment van de tijd een welbepaalde fase.
Een **golffront** is een verzameling ruimte-tijdpunten waarbij de fase dezelfde waarde heeft. Op elk vast tijdstip wordt het golffront een oppervlak van constante fase genoemd. Dit oppervlak beweegt met de fasesnelheid in de richting van zijn lokale normaal.

Voor vlakke golven hebben we in het vorige hoofdstuk aangetoond dat de oppervlakken van constante fase vlakken zijn en dat de normaal voor deze oppervlakken in de richting van de golfvector ligt die samenvalt met de richting van de fasesnelheid en met de richting van de energiestroom (de richting van de Poynting-vector). In het algemeen wordt de lokale richting van de energiestroom gegeven door de richting van de Poynting-vector. Op voorwaarde dat de kromtestraal van de oppervlakken veel groter is dan de golflengte, kan de richting van de normaal van de oppervlakken van constante fase nog steeds worden beschouwd als in de richting van de lokale energiestroom. Dergelijke golven gedragen zich lokaal als vlakke golven en hun effect kan nauwkeurig worden beschreven door de methoden van geometrische optica.

Geometrische optica is gebaseerd op het intuïtieve idee dat licht bestaat uit een bundel stralen. Maar wat is een straal?


```{note}
Een straal is een georinteerde kromme die overal loodrecht staat op de oppervlakken van constante fase en in de richting van de energiestroom wijst.
```

Beschouw een puntbron op enige afstand voor een ondoorzichtig scherm met een diafragma. Volgens het straalbeeld is de lichtverdeling op een tweede scherm verder weg van de bron en evenwijdig aan het eerste scherm gewoon een vergrote kopie van het diafragma (zie {numref}`Fig_2_01_GeomDiffr`). De kopie wordt vergroot door het uitwaaieren van de stralen. Deze beschrijving is echter alleen nauwkeurig als de golflengte van het licht erg klein is in vergelijking met de diameter van het diafragma. Als het diafragma slechts tien keer de golflengte is, is het patroon veel breder door de buiging van de stralen rond de rand van het diafragma. Dit fenomeen wordt **-diffractie** genoemd. Diffractie kan niet worden verklaard door geometrische optica en zal worden bestudeerd in {numref}`chapter.diffraction`.

```{figure} Images/Chapter_2/2_01_Figgeom.png
:name: Fig_2_01_GeomDiffr
lichtverdeling op een scherm door een rechthoekig diafragma. Links: voor een groot diafragma krijgen we een vergrote kopie van het diafragma. Rechts: voor een diafragma dat dezelfde ordegrootte heeft als de golflengte, is er sterke buiging (diffractie) van het licht. 
```


Geometrische optica is nauwkeurig wanneer de afmetingen van de objecten in het systeem groot zijn in vergelijking met de golflengte. Het is mogelijk om geometrische optica af te leiden uit de vergelijkingen van Maxwell door het elektromagnetische veld formeel uit te breiden in een machtsreeks in de golflengte en alleen de eerste term van deze expansie te behouden <sup>[^1]</sup>. Deze afleiding is echter niet rigoureus omdat de machtreeks over het algemeen niet convergeert (het is een zogenaamde asymptotische reeks).

Hoewel het mogelijk is polarisatie in de geometrische optica op te nemen <sup>[^2]</sup>, is dit geen standaard theorie en zullen we in dit hoofdstuk geen polarisatie-effecten beschouwen.

## Principe van Fermat

Het uitgangspunt van de behandeling van geometrische optica is het \\
```{note}
**Principe van Fermat (1657)**. Het pad dat door een lichtstraal tussen twee punten wordt gevolgd, is het pad dat de minste tijd in beslag neemt.
```

De lichtsnelheid in een materiaal met brekingsindex $n$, is $c/n$, waarbij $c=3\times 10^8$ m/s de lichtsnelheid in vacuum is. Ten tijde van Fermat was men ervan overtuigd dat de lichtsnelheid eindig moest zijn, maar niemand kon vermoeden hoe ongelooflijk groot die eigenlijk is. In 1676 berekende de Deense astronoom Ole R&ouml;mer de snelheid van het licht door het inspecteren van de verduisteringen van een maan van Jupiter en kwam tot een schatting die slechts 30% te laag was.

Laat $\mathbf{r}(s)$, een straal zijn met lengteparameter $s$. De straal verbindt twee punten $S$ en $P$.
Stel dat de brekingsindex varieert met de positie: $n(\mathbf{r})$. Over de oneindig kleine afstand van $s$ tot
$s+\mathrm{d}$, is de snelheid van het licht:

```{math}
:label: eq.defcn
\begin{align*}
\frac{c}{n(\mathbf{r}(s))}.
\end{align*}
```
Vandaar dat de tijd die het licht nodig heeft om van $\mathbf{r}(s)$ naar $\mathbf{r}(s+\mathrm{d})$ te gaan gelijk is aan:

```{math}
:label: eq.defdt
\begin{align*}
\mathrm{d} = \frac{n(\mathbf{r}(s))}{c} \mathrm{d},
\end{align*}
```
en de totale tijd om van $S$ naar $P$ te gaan gelijk is aan:

```{math}
:label: eq.ttot
\begin{align*}
t_{S \rightarrow P} = \int_0^{s_P} \frac{n(\mathbf{r}(s))}{c} \mathrm{d},
\end{align*}
```
waarin $s_P$ de afstand langs de straal van S naar P is.
De **optische weglengte** [m] van de straal tussen S en P wordt gedefinieerd door:


```{math}
:label: eq.defOPL
\boxed{\begin{align*}
\text{OPL} = \int_0^{s_P} n(\mathbf{r}(s)) \mathrm{d},
\end{align*}}
```

De OPL is dus de afstand gewogen door de brekingsindex. 

```{note}
Het principe van Fermat is dus equivalent aan de bewering dat een straal het pad volgt met de kortste OPL.
```


```{figure} Images/Chapter_2/2_02_Theory_of_mirage.jpg
:name: Fig_2_02_Theory_of_mirage
Omdat de temperatuur dicht bij de grond hoger is, is de brekingsindex daar lager. Daarom buigen de stralen naar boven, waardoor een spiegelbeeld ontstaat van de boom onder de grond. \footnotesize{(Uit Popular Science Monthly Volume 5, Public Domain, [link](https://commons.wikimedia.org/w/index.php?curid=10770493)).}
```

**Opmerking.**
Eigenlijk is het principe van Fermat zoals hierboven geformuleerd niet volledig. Er zijn omstandigheden waarin een straal twee paden kan nemen tussen twee punten met verschillende reistijden. Elk van deze paden komt dan overeen met een minimale reistijd in vergelijking met nabijgelegen paden, dus de reistijd is over het algemeen een *lokaal minimum*. Een voorbeeld is de reflectie door een spiegel die in de volgende paragraaf wordt besproken.

## Enkele gevolgen van het principe van Fermat
- **Homogene materie**\\
In homogene materie is de brekingsindex constant en daarom zijn de paden van de kortste OPL rechte lijnen. Vandaar dat stralen in homogene materie rechte lijnen zijn.
- **Inhomogene materie**\\
Wanneer de brekingsindex een functie is van de positie, zoals lucht met een temperatuurgradient, buigen de stralen naar gebieden met een hogere brekingsindex. In het geval van {numref}`Fig_2_02_Theory_of_mirage` bijvoorbeeld, loopt de straal van de top van de boom naar het oog van de waarnemer op een warme dag dicht bij de grond, omdat daar de temperatuur hoger is en dus de brekingsindex kleiner is. Hoewel het gebogen pad langer is dan het rechte pad, is de totale reistijd van het licht korter omdat in de buurt van de grond de lichtsnelheid hoger is (omdat de brekingsindex kleiner is). De waarnemer krijgt de indruk dat de boom ondersteboven onder de grond staat.

- **Wet van reflectie**


Beschouw de spiegel die wordt getoond in {numref}`Fig_2_03_Descartes_Reflection`. Aangezien het medium boven de spiegel homogeen is, kan een straal van punt $P$ op twee manieren in $Q$ terechtkomen: door langs een rechte lijn rechtstreeks van $P$ naar $Q$ te gaan of door rechte lijnen via de spiegel. Beide mogelijkheden hebben verschillende weglengtes en dus verschillende reistijden en daarom zijn beide lokale minima, zoals benoemd in het einde van de vorige paragraaf. We beschouwen hier het pad door middel van reflectie door de spiegel.
Laat de $x$-as het snijpunt zijn van de spiegel en het vlak door de punten $P$ en $Q$ en loodrecht op de spiegel. Laat de $y$-as loodrecht zijn ten opzichte van de spiegel. Laat $(x_P, y_P)$ en $(x_Q,y_Q)$ de coordinaten zijn van respectievelijk $P$ en $Q$. Als $(x,0)$ het punt is waar een straal van $P$ naar $Q$ de spiegel raakt, is de reistijd van die straal

```{math}
:label: eq.mirror1
\begin{align*}
\frac{n}{c}d_1(x) + \frac{n}{c}d_2(x) = \frac{n}{c}\sqrt{ (x-x_P)^2 + y_P^2} +\frac{n}{c} \sqrt{ (x_Q-x)^2 + y_Q^2},
\end{align*}
```
waarbij $n$ de brekingsindex van het medium in $y>0$ is. Volgens het principe van Fermat moet het punt $(x,0)$ zodanig zijn dat de reistijd minimaal is, d.w.z.

```{math}
:label: eq.mirror2
\begin{align*}
\frac{d }{d x} [d_1(x) + d_2(x)] = \frac{(x-x_P)}{d_1(x)} - \frac{(x_Q-x)}{d_2(x)} =0.
\end{align*}
```
Vandaar

```{math}
:label: eq.mirror3
\begin{align*}
\sin \theta_i = \sin \theta_r,
\end{align*}
```
of

```{math}
:label: eq.mirror4
\begin{align*}
\theta_r = \theta_i.
\end{align*}
```
waarbij $\theta_i$ en $\theta_r$ de invals- en reflectiehoeken zijn zoals weergegeven in {numref}`Fig_2_03_Descartes_Reflection`.


```{figure} Images/Chapter_2/2_03_Descartes_Reflection_BW.png
:name: Fig_2_03_Descartes_Reflection

Straal van $P$ naar $Q$ via de spiegel.
```


- **Brekingswet van Snellius**


Nu kijken we naar breking op een grensvlak. Laat $y=0$ het grensvlak zijn tussen een medium met brekingsindex $n_i$ in $y>0$ en een medium met brekingsindex $n_t$ in $y<0$. We gebruiken hetzelfde coördinatenstelsel als in het geval van reflectie hierboven. Laat $(x_P,y_P)$ en $(x_Q,y_Q)$ met $y_P>0$ en $y_Q<0$ de coördinaten zijn van twee punten $P$ en $Q$, welke worden weergegeven in {numref}`Fig_2_04_Descartes_Refraction`. Welk pad zal een straal volgen die van $P$ naar $Q$ gaat? Aangezien de brekingsindex constant is in beide halfruimtes, is de straal een rechte lijn in beide media. Laat $(x,0)$ het coördinaat zijn van het snijpunt van de straal met het grensvlak. Dan is de reistijd

```{math}
:label: eq.refrac1
\begin{align*}
\frac{n_i}{c} d_1(x) + \frac{n_t}{c} d_2(x) = \frac{n_i}{c} \sqrt{(x-x_P)^2 + y_P^2} +
\frac{n_t}{c} \sqrt{(x_Q-x)^2 + y_Q^2}.
\end{align*}
```
De reistijd moet minimaal zijn, dus er moet

```{math}
:label: eq.refrac2
\begin{align*}
\frac{d}{d x} \left[ n_i d_1(x) + n_t d_2(x)\right] = n_i \frac{(x-x_P)}{d_1(x)} - n_t \frac{(x_Q-x)}{d_2(x)}=0.
\end{align*}
```
waarbij de reistijd is vermenigvuldigd met de lichtsnelheid in het vacuum. Eq.&nbsp;{eq}`eq.refrac2` impliceert

```{math}
:label: eq.refrac3
\begin{align*}
n_i \sin \theta_i = n_t \sin \theta_t,
\end{align*}
```
waarin $\theta_i$ en $\theta_t$ de hoeken zijn tussen de straal en de normaal ten opzichte van het oppervlak in respectievelijk de bovenste helft van de ruimte en de onderste helft van de ruimte ({numref}`Fig_2_04_Descartes_Refraction`).
```{figure} Images/Chapter_2/2_04_Descartes_Refraction_BW.png
:name: Fig_2_04_Descartes_Refraction

De straal van $P$ naar $Q$ wordt gebroken door een interface.
```


Hiermee hebben we de wet van Snellius afgeleid uit het principe van Fermat. In {numref}`chapter.basics` zijn de reflectiewet en de wet van Snellius afgeleid volgens een andere methode, namelijk uit de continuïteit van de parallele component van het elektromagnetische veld op het grensvlak.

## Perfecte beeldvorming door conische secties
In deze paragraaf zijn de kegelsneden ellips, hyperbool en parabool van belang. Zie {numref}`Fig_2_05_ConicSection` voor hun definities (als een snelle herinnering)<sup>[^2]</sup>.

```{figure} Images/Chapter_2/2_05a_ConicSection.png
```
```{figure} Images/Chapter_2/2_05b_ConicSection.png
:name: Fig_2_05_ConicSection
Overzicht van kegelsneden. De onderste figuur toont een definitie die de drie definities in de bovenste figuur verenigt door een parameter te introduceren die de excentriciteit $e$ wordt genoemd. Het punt $F$ is het brandpunt en de lijn $e=\infty$ is de richtlijn van de kegelsneden.
```

We beginnen met uit te leggen wat in de geometrische optica wordt bedoeld met **perfecte beeldvorming**.
Laat $S$ een puntbron zijn. De stralen loodrecht op de bolvormige golffronten die door $S$ worden uitgezonden, waaieren radiaal uit van $S$. Door objecten zoals lenzen etc. worden de bolvormige golffronten vervormd en wordt de richting van de straal afwijkend van de radiale voortplantingsrichting.
Wanneer er een kegel van stralen is die uit punt $S$ komt waarvan alle stralen in die kegel elkaar snijden in een punt $P$, dan hebben al deze stralen volgens het principe van Fermat paden met een minimale reistijd afgelegd. In het bijzonder zijn hun reistijden gelijk en daarom tellen ze allemaal in fase op wanneer ze aankomen in $P$. Vandaar dat er bij $P$ een hoge lichtintensiteit is. Wanneer er dus een kegel van stralen is uit punt $S$ die elkaar allemaal snijden in een punt $P$ zoals weergegeven in {numref}`Fig_2_06_Perfect_Imaging`, wordt punt $P$ het **perfecte beeld** van $S$ genoemd.
Door de richting van de stralen om te keren, is $S$ op dezelfde manier een perfect beeld van $P$. Het optische systeem waarin dit gebeurt, wordt **stigmatisch genoemd voor de twee punten $S$ en $P$**. 

```{figure} Images/Chapter_2/2_06_Perfect_Imaging_BW.png
:name: Fig_2_06_Perfect_Imaging

Perfecte beeldvorming: een kegel van stralen die divergeren uit $S$ en elkaar allemaal kruisen in punt $P$. De stralen gaan door na $P$.
```


**Opmerking**. Het concept van een perfect beeldpunt bestaat alleen in geometrische optica. In werkelijkheid veroorzaken eindige diafragma's van lenzen en andere beeldvormingssystemen diffractie, waardoor beeldpunten nooit perfect, maar wazig, zijn.

We vatten de belangrijkste voorbeelden van stigmatische systemen samen.
- **1.**
**Perfecte scherpstelling en beeldvorming door breking.** Een parallelle bundel stralen die zich voortplant in een medium met brekingsindex $n_2$ kan worden gefocust in een punt $F$ in een medium $n_1$. Als $n_2>n_1$, moet de interface tussen de media een hyperbool zijn met focus $F$. Als $n_2<n_1$ moet de interface een ellips zijn met focus $F$ (zie {numref}`Fig_2_07_Focus-Right` en
{numref}`Fig_2_08_Perfect_Imaging`). Door de stralen om te keren krijgen we perfecte collimatie. Daarom kan een punt $S$ in lucht perfect worden afgebeeld op een punt $F$ in lucht door er een stuk glas tussen te plaatsen met hyperbolische oppervlakken, zoals weergegeven in {numref}`Fig_2_08_Perfect_Imaging`. Deze eigenschappen worden afgeleid in opgave 2.2.
- **2.** **Perfecte scherpstelling van parallelle stralen door een spiegel**. 

Een bundel parallele stralen in de lucht kan in een punt $F$ worden gefocusseerd door een spiegel van parabolische vorm met focus $F$ (zie {numref}`Fig_2_09_Para_Mirror`). Dit wordt afgeleid in opgave 2.3.
Door de pijlen om te draaien, krijgen we (binnen de geometrische optica) een perfect parallele straal.
Parabolische spiegels worden overal gebruikt, van koplampen van auto's tot radiotelescopen.



**Opmerking.** 
Hoewel we hebben ontdekt dat kegelvormige oppervlakken een perfect beeld geven voor een bepaald aantal punten, hebben andere punten *geen* perfecte beelden in de zin dat voor een bepaalde kegel van stralen alle stralen worden gebroken (of gereflecteerd) op hetzelfde punt.





```{admonition} Externe bronnen in aanbevolen volgorde
-{[KhanAcademy - Geometrical Optics](https://www.khanacademy.org/science/physics/geometric-optics): Afspeellijst over elementaire geometrische optica.}
- [Yale-cursussen - 16. Ray of Geometrical Optics I](https://www.youtube.com/watch?v=bxGgcgSbQBA) - College door Ramamurti Shankar
- [Yale-cursussen - 17. Ray or Geometrical Optics II](https://www.youtube.com/watch?v=qm4QR_ycRhY) - College door Ramamurti Shankar
```

## Gaussiaanse geometrische optica
We hebben gezien dat, hoewel we door lenzen of spiegels te gebruiken met oppervlakken die kegelsneden zijn, we een bepaald paar punten perfect kunnen afbeelden, het beeld voor andere punten niet perfect is. De imperfecties worden veroorzaakt door stralen die grotere hoeken maken met de **optische as**, d.w.z. met de symmetrie-as van het systeem. Stralen waarvoor deze hoeken klein zijn, worden **paraxiale stralen** genoemd.
Omdat voor paraxiale stralen de invals- en doorlaathoeken aan de oppervlakken van de lenzen klein zijn,
de sinus van de hoeken in de wet van Snellius wordt vervangen door de hoeken zelf:

```{math}
:label: eq. Snel3
\begin{align*}
n_i \theta_i = n_t \theta_t \quad \text{(alleen paraxiale stralen)}.
\end{align*}
```
Deze benadering vereenvoudigt de berekeningen aanzienlijk. Wanneer alleen paraxiale stralen worden beschouwd, kan men elk oppervlak vervangen door een bol met dezelfde kromming op het hoekpunt. Fouten veroorzaakt door het vervangen van een oppervlak door een bol zijn van de tweede orde in de hoek die de straal maakt met de optische as en zijn daarom onbelangrijk voor paraxiale stralen.
Bolvormige oppervlakken zijn niet alleen eenvoudiger voor afleidingen, maar ze zijn ook veel gemakkelijker te produceren. Vandaar dat in de optische industrie veel gebruik wordt gemaakt van bolvormige oppervlakken. Om beeldvormingsfouten veroorzaakt door niet-paraxiale stralen te verminderen, past men twee strategien toe: 1. het toevoegen van meer bolvormige oppervlakken; 2 het vervangen van een van de bolvormige oppervlakken (meestal de laatste vóór de beeldruimte) door een niet-bol.


```{note}
In de Gaussiaanse geometrische optica worden alleen paraxiale stralen en bolvormige oppervlakken beschouwd. In de Gaussiaanse geometrische optica heeft elk punt een perfect beeld.
```

(section.Gaussian_SSS)=
### Gaussiaanse beeldvorming door een enkel bolvormig oppervlak


We zullen eerst laten zien dat binnen de Gaussiaanse optica een enkel bolvormig oppervlak tussen twee media met brekingsindices $n_1< n_2$ alle punten perfect weergeeft ({numref}`Fig_2_10_Spherical_interface`). De bol heeft een straal $R$ en een middelpunt $C$ die zich in medium 2 bevindt. We beschouwen een puntobject $S$ links van het oppervlak. We tekenen een straal van $S$ loodrecht op het oppervlak. Het snijpunt is $V$. Omdat bij deze straal de invalshoek met de plaatselijke normaal op het oppervlak verdwijnt, gaat de straal zonder breking verder in het tweede medium en gaat door het centrum $C$ van de bol. Vervolgens tekenen we een straal die het bolvormige oppervlak raakt in een bepaald punt $A$ en tekenen de gebroken straal in medium 2 met behulp van de wet van Snellius in de paraxiale vorm {eq}`eq. Snel3`. Merk op dat de invals- en transmissiehoeken moeten worden gemeten ten opzichte van de lokale normaal op $A$, d.w.z. ten opzichte van $CA$. We nemen aan dat deze straal de eerste straal snijdt in punt $P$. We zullen laten zien dat binnen de benadering van de Gaussiaanse geometrische optica, alle stralen van $S$ door $P$ gaan.
Verder hebben we met betrekking tot een coördinatenstelsel $(y,z)$ met oorsprong $V$ waarbij de $z$-as van $V$ naar $C$ en de $y$-as positief naar boven wijst, zoals weergegeven in {numref}`Fig_2_10_Spherical_interface`, het volgende:

```{math}
:label: eq.one_surface
\begin{align*}
-\frac{n_1}{s_o } + \frac{n_2}{s_i} = {\cal P},
\end{align*}
```
waar

$$
{\cal P} = \frac{n_2-n_1}{R},
$$ (eq.power)

de kracht van het oppervlak wordt genoemd en waarin $s_o$ en $s_i$ de $z$-**-coördinaten** zijn van $S$ en $P$ respectievelijk, vandaar dat $s_0<0$ en $s_i>0$ in {numref}`Fig_2_10_Spherical_interface`.
```{figure} Images/Chapter_2/2_10_Spherical_interface_BW.png
:name: Fig_2_10_Spherical_interface

Beeldvorming door een bolvormig interface tussen twee media met brekingsindices $n_2>n_1$.
```





*Proof*. 

(Let op: het bewijs is **niet** onderdeel van het examen).
Het volstaat om aan te tonen dat $P$ onafhankelijk is van de straal, d.w.z. van $A$. We doen dit door $s_i$ uit te drukken in $s_o$ en te laten zien dat het resultaat onafhankelijk is van $A$. Laat $\alpha_1$ en $\alpha_2$ de hoeken van de stralen $SA$ en $AP$ met de $z$-as zijn zoals weergegeven in {numref}`Fig_2_10_Spherical_interface`.
Laat $\theta_i$ de invalshoek van de straal $SA$ met de lokale normale $CA$ op het oppervlak zijn en $\theta_t$ de brekingshoek. Door de hoeken in een driehoek $\Delta \text{SCA}$ te beschouwen, vinden we


```{math}
:label: eq.alpha1
\begin{align*}
\theta_i = \alpha_1 + \varphi.
\end{align*}
```
Op dezelfde manier vinden we uit $\Delta \,\text{CPA}$

```{math}
:label: eq.lpha2
\begin{align*}
\theta_t=-\alpha_2 + \varphi.
\end{align*}
```
Door substitutie in de paraxiale versie van de wet van Snellius {eq}`eq. Snell3`, krijgen we

```{math}
:label: eq.n1al1n2al2
\begin{align*}
n_1 \alpha_1 + n_2 \alpha_2 = (n_2-n_1)
\varphi.
\end{align*}
```
Laat $y_A$ en $z_A$ de coördinaten zijn van punt $A$. Sinds $s_o<0$ en $s_i>0$ hebben we

```{math}
:label: eq.alpha
\begin{align*}
\alpha_1 \approx \tan(\alpha_1) = \frac{y_A}{z_A-s_o}, \;\; \;\; \alpha_2\approx \tan(\alpha_2)= \frac{y_A}{s_i-z_A}.
\end{align*}
```
Bovendien

```{math}
:label: eq.varphi
\begin{align*}
\varphi \approx \sin \varphi \approx \frac{y_A}{R}.
\end{align*}
```
die klein is voor paraxiale stralen.
Vandaar

```{math}
:label: eq.xA
\begin{align*}
z_A=R-R\cos\varphi = R - R\left(1-\frac{\varphi^2}{2}\right)= \frac{R}{2}\varphi^2 \approx 0,
\end{align*}
```
omdat dit van de tweede orde is in $y_A$ wordt het verwaarloosd in de paraxiale benadering. Vervolgens wordt {eq}`eq.alpha`

```{math}
:label: eq.alpha22
\begin{align*}
\alpha_1 = -\frac{y_A}{s_o}, \quad \alpha_2 =\frac{y_A}{s_i}.
\end{align*}
```
Door {eq}`eq.alpha22` en {eq}`eq.varphi` te substitueren in {eq}`eq.n1al1n2al2` vinden we

```{math}
\begin{align*}
-\frac{n_1}{s_o} y_A + \frac{n_2}{z_i} y_A = \frac{n_2-n_1}{R} y_A,
\end{align*}
```
of

```{math}
\begin{align*}
-\frac{n_1}{s_o } + \frac{n_2}{s_i} = \frac{n_2-n_1}{R},
\end{align*}
```
welke gelijk is aan {eq}`eq.one_surface`.
Dit impliceert dat $s_i$, en dus $P$, onafhankelijk is van $y_A$, d.w.z. van de gekozen straal.
Daarom is $P$ een perfect beeld binnen de benadering van Gaussiaanse geometrische optica.



Wanneer
$s_o \rightarrow -\infty$, zijn de invallende stralen evenwijdig aan de $z$-as in medium 1 en wordt het corresponderende beeldpunt $F_i$ het **tweede brandpunt** of **beeldbrandpunt** genoemd.
De $z$-coördinaat wordt gegeven door:



```{math}
:label: eq.def_fi
\boxed{\begin{align*}
	f_i = \frac{n_2}{{\cal P}}=\frac{n_2 R}{n_2-n_1},
	\end{align*}}
```

en de absolute waarde (het is negatief wanneer $n_2<n_1$) de **tweede brandpuntsafstand** of **beeldbrandpuntsafstand** wordt genoemd.

Als $s_i\rightarrow \infty$, zijn de stralen na breking evenwijdig aan de $z$-as en krijgen we $s_o \rightarrow -n_1 R/(n_2-n_1)$. Het objectpunt waarvoor de stralen in het medium 2 evenwijdig zijn aan de $z$-as wordt het **eerste brandpunt** of **object brandpunt** $F_o$ genoemd. De $z$-coördinaat is:


```{math}
:label: eq.def_fo
\boxed{\begin{align*}
f_o=-\frac{n_1}{{\cal P}}= -\frac{n_1 R}{n_2-n_1}.
\end{align*}}
```

De absolute waarde $|f_o|$ van $f_o$ wordt de **voorste brandpuntsafstand** of **brandpuntsafstand van het object** genoemd.

Met {eq}`eq.def_fi` en {eq}`eq.def_fo` kan {eq}`eq.one_surface` herschreven worden als:


```{math}
:label: eq.one_surface2
\boxed{\begin{align*}
-\frac{n_1}{s_o} + \frac{n_2}{s_i} = {\cal P} =-\frac{n_2}{f_i}= -\frac{n_1}{f_o}.
\end{align*}}
```


(subsection.virtualSSS)=
### Virtuele afbeeldingen en virtuele objecten van een enkel bolvormig oppervlak

Als we de tekenconventie aannemen die is opgenomen in
Tabel {eq}`table_signconv` hieronder,
blijkt dat {eq}`eq.one_surface` in het algemeen geldt. Tot nu toe hebben we een convex (bol) oppervlak beschouwd waarvan het middelpunt $C$ rechts van het oppervlak ligt, maar {eq}`eq.one_surface` geldt ook voor een concaaf (hol) oppervlak waarvan het middelpunt links van het oppervlak ligt, mits de straal $R$ negatief wordt gekozen.
De conventie voor het teken van de straal wordt geïllustreerd in {numref}`Fig_2_11_Radius`.
```{figure} Images/Chapter_2/2_11_Radius_Convention.png
:name: Fig_2_11_Radius
Tekenconventie voor de straal $R$ van een bolvormig oppervlak
```


Als de kracht ${\cal P}$ gegeven door {eq}`eq.power` positief is, dan maakt het oppervlak bundels invallende stralen convergent of minder divergent.
Als de kracht negatief is, worden bundels invallende stralen divergent of minder convergent gemaakt. De kracht van het oppervlak kan om twee redenen negatief zijn:
1) $R$>0 en $n_1>n_2$, of
2) $R$<0 en $n_1<n_2$, het effect van de twee gevallen is hetzelfde.
Voor elk object links van het oppervlak: $s_o<0$, {eq}`eq.one_surface2` en een negatieve macht  impliceren dat $s_i<0$, wat suggereert dat het beeld zich links van het oppervlak bevindt. Inderdaad, in beide afbeeldingen.
de divergerende straalbundel die door S wordt uitgezonden, wordt sterker divergent gemaakt door het oppervlak. Door deze stralen in de beeldruimte terug te rekken naar de objectruimte (zonder breking aan het oppervlak), zien we dat ze elkaar kruisen in een punt $P$ links van het oppervlak. Dit impliceert dat het voor een waarnemer aan de rechterkant van het oppervlak lijkt alsof de divergerende stralen in de beeldruimte worden uitgezonden door $P$. Omdat er geen werkelijke concentratie van lichtintensiteit is bij $P$, wordt het een **virtueel beeld** genoemd, in tegenstelling tot de **echte beelden** die rechts van het oppervlak voorkomen en waar er een werkelijke concentratie van lichtenergie is. We hebben in dit geval $f_o>0$ en $f_<0$, wat betekent dat de brandpunten van het object en het beeld zich respectievelijk rechts en links van het oppervlak bevinden.

Merk op dat ook wanneer het vermogen positief is, er een virtueel beeld kan ontstaan, namelijk wanneer het object $S$ zich tussen het objectbrandpunt $F_o$ en het oppervlak bevindt. Dan is de bundel stralen van S zo sterk divergerend dat het oppervlak deze niet kan omzetten in een convergente bundel en dus lijken de stralen in de beeldruimte weer uit een punt $P$ links van het oppervlak te komen. Dit komt overeen met het feit dat wanneer ${\cal P}>0$ en $f_o< s_o<0$,
{eq}`eq.one_surface2` impliceert dat $s_i<0$.

```{figure} Images/Chapter_2/2_12_Concave_Surface_Real_object_1
:name: Fig_2_12_Surf_Concave
Beeldvorming door een concaaf oppervlak ($R<0$) met $n_2>n_1$. Alle beeldpunten bevinden zich links van het oppervlak, d.w.z. deze zijn virtueel ($s_i<0$).
```


Ten slotte kijken we naar een geval dat er een bundel convergente stralen is die van links op het oppervlak valt en die, wanneer ze worden uitgebreid naar het rechter medium zonder breking aan het oppervlak, elkaar zouden snijden in een punt $S$. Omdat dit punt niet echt aanwezig is, wordt het een **virtueel objectpunt** genoemd, in tegenstelling tot **echte objectpunten** die zich links van het oppervlak bevinden. De coördinaat van een virtueel objectpunt is positief: $s_o>0$.
Je kunt je afvragen waarom we deze situatie behandelen. De reden is dat als we meerdere bolvormige oppervlakken achter elkaar hebben, we het beeld van een objectpunt kunnen berekenen door eerst het tussenliggende beeld te bepalen door het meest linker oppervlak en vervolgens dit tussenliggende beeld te gebruiken als object voor het volgende oppervlak, enzovoort. In zo'n geval kan het gemakkelijk gebeuren dat een tussenliggend beeld zich rechts van het volgende oppervlak bevindt en dus een virtueel object is voor dat oppervlak. In het geval van {numref}`Fig_2_13_Convex_Virtual_Object` is het vermogen aan de linkerkant positief, vandaar dat de convergente bundel van invallende stralen nog meer convergent wordt gemaakt, wat leidt tot een echt beeldpunt. Inderdaad, als $s_o>0$ en ${\cal P}>0$ dan impliceert {eq}`eq.one_surface` dat altijd $s_i>0$. Aan de rechterkant van {numref}`Fig_2_13_Convex_Virtual_Object` is het vermogen negatief, maar niet sterk genoeg om de convergente incidentenbundel in een divergente bundel te veranderen. Het beeld is dus nog steeds echt. Het beeld zal echter virtueel zijn wanneer het virtuele object $S$ zich rechts van $F_o$ bevindt (wat in dit geval rechts van het oppervlak is), aangezien de bundel stralen dan zo zwak convergeert dat het oppervlak het in een divergente bundel verandert.

```{figure} Images/Chapter_2/2_13_Spherical_Interface_Concave_BW
:name: Fig_2_13_Convex_Virtual_Object
Beeldvorming van een virtueel object $S$ door een bolvormig oppervlak met $R>0$ tussen twee media met brekingsindices $n_1>n_2$ (links) en $n_2>n_1$ (rechts).
```


Concluderend: mits de tekenconventie zoals vermeld in Tabel {numref}`table_signconv` wordt gebruikt, kan formule {eq}`eq.one_surface` altijd worden gebruikt om het beeld van een bepaald object te bepalen aan de hand van een bolvormig oppervlak.

```{table} Tekenconventie voor bolvormige oppervlakken en dunne lenzen. De conventie voor $s_o$, $f_o$, $s_i$, $f_i$ volgt uit het feit dat dit $z$-coördinaten zijn met de oorsprong op hoekpunt $V$ van het boloppervlak (of het midden van de dunne lens) en de positieve $z$-as naar rechts wijst. De conventie voor de $y$-coördinaat volgt uit het feit dat de $y$-as positief is naar boven.
:name: table_signconv
| **grootheid** | **positief** | **negatief** |
| :--: | :--: | :--: |
| $s_o$, $s_i$. $f_0$, $f_i$ | corresponderend punt is | corresponderend punt is |
| | rechts van hoekpunt | links van hoekpunt |
| $y_o$, $y_i$ | object, beeldpunt | object, beeldpunt |
| | boven optische as | onder optische as.|
| 
|
| $R$ | Krommingsmiddelpunt | Krommingsmiddelpunt |
| | rechts van hoekpunt | links van hoekpunt |
| Brekingsindex $n$ massa | voor reflectie | na reflectie |
| medium van een spiegel | | |
```


### Straalvectoren en straalmatrices
Nu we weten dat binnen de Gaussiaanse geometrische optica een enkel bolvormig oppervlak elk objectpunt afbeeldt naar een perfect, reëel of virtueel beeldpunt, is het gemakkelijk in te zien dat elke rij bolvormige oppervlakken gescheiden door homogene materialen ook elk punt perfect zal afbeelden. We bepalen eerst het tussenliggende beeld van het objectpunt onder het meest linkse bolvormige oppervlak alsof de andere oppervlakken niet aanwezig zijn en gebruiken dit tussenliggende beeldpunt als objectpunt voor beeldvorming door het volgende bolvormige oppervlak, enzovoort. Natuurlijk kunnen de tussenliggende beeld- en objectpunten virtueel zijn.

Hoewel deze procedure in principe eenvoudig is, is het toch handig om in de Gaussiaanse meetkundige optica het concept van straalvectoren en straalmatrices te introduceren om optische systemen te behandelen die bestaan uit verschillende bolvormige oppervlakken.
Met behulp van straalmatrices is het gemakkelijk om af te leiden hoe de afstand van een bepaalde straal tot de optische as en de richting ervan veranderen tijdens de voortplanting door een optisch systeem. Dit kan op zijn beurt worden gebruikt om het beeldvlak in een optisch systeem voor een bepaald objectvlak te bepalen.

In elk vlak loodrecht op de $z$-as wordt een straal bepaald door de $y$-coördinaat van het snijpunt van de straal met het vlak en de hoek $\alpha$ met de optische ($z$)-as. Deze hoek heeft een teken en wordt als volgt gedefinieerd. Laat $(y_1,z_1)$ en $(y_2,z_2)$ de coördinaten zijn van twee punten op de straal en laat het licht zich voortbewegen van punt 1 naar punt 2. Vervolgens definiren we

$$
\alpha = \frac{ y_2-y_1}{z_2-z_1}.
$$ (eq.defalpha)

Voorbeelden van positieve en negatieve $\alpha$ worden gegeven in Fig.\ref{Fig.alpha}. Het geval $z_2-z_1<0$ doet zich voor wanneer een straal zich voortplant in de negatieve $z$-richting nadat deze door een spiegel is weerkaatst.
Volgens tabel {eq}`table_signconv` moet de brekingsindex van het omringende medium na de reflectie negatief worden genomen. Na een tweede reflectie waardoor de straal zich weer voortplant in de positieve $z$-richting, moet de brekingsindex opnieuw positief worden gekozen.
```{figure} Images/Chapter_2/2_14_Angle_definition.png
:name: Fig.alpha
Tekenconventie voor de straalhoek. In de bovenste twee figuren is $\alpha>0$ terwijl in de onderste twee figuren $\alpha<0$.
```


We definiren de straalvector

```{math}
:label: eq.rayvector
\begin{align*}
\left( \begin{array}{c}n\alpha \\y
\end{array} \right),
\end{align*}
```
waarbij $n$ de lokale brekingsindex is. De definitie met de brekingsindex als factor in het eerste element van de straalvector blijkt handig te zijn.
De straalvectoren van een straal in twee willekeurige vlakken $z=z_1$, $z=z_2$, met $z_2>z_1$, zijn met elkaar verbonden door een zogenaamde straalmatrix:

```{math}
:label: eq.matgen
\begin{align*}
\left( \begin{array}{c}n_2\alpha_2 \\y_2
\end{array}\right) = {\cal M}
\left( \begin{array}{c}n_1 \alpha_1 \\y_1
\end{array}\right).
\end{align*}
```
waar

```{math}
:label: eq.defM2
\begin{align*}
{\cal M} =\left( \begin{array}{cc}A & B \\C & D
\end{array}\right).
\end{align*}
```
De elementen van matrix ${\cal M}$ zijn afhankelijk van de optische componenten en materialen tussen de vlakken $z=z_1$ en $z=z_2$.

Beschouw als voorbeeld de straalmatrix die een straalvector in het vlak direct voor het bolvormige oppervlak in {numref}`Fig_2_10_Spherical_interface` relateert aan de corresponderende straalvector in het vlak direct achter dat oppervlak.
Met behulp van {eq}`eq.n1al1n2al2` en {eq}`eq.varphi` volgt het volgende

```{math}
:label: eq.alphas
\begin{align*}
n_1 \alpha_1 - n_2 \alpha_2 = \frac{(n_2-n_1)y_1}{R},
\end{align*}
```
waar we $\alpha_2$ hebben vervangen door $-\alpha_2$ in {eq}`eq.n1al1n2al2`, omdat volgens de tekenconventie de hoek $\alpha_2$ in {numref}`Fig_2_10_Spherical_interface` negatief moet worden genomen.
Omdat bovendien $y_2=y_1$, kunnen we concluderen dat:

```{math}
:label: eq.matsph0
\begin{align*}
\left( \begin{array}{c}n_2\alpha_2 \\y_2
\end{array}\right) &= \left( \begin{array}{c}n_1 \alpha_1 - \frac{(n_2-n_1)y_1}{R} \\y_1
\end{array}\right)  \\
&= \left( \begin{array}{cc}1 & -P \\0 & 1
\end{array}\right)\left(
\begin{array}{c}n_1 \alpha_1 \\y_1
\end{array}\right), \quad \textbf{bolvormig oppervlak,}
\end{align*}
```
waar

```{math}
:label: eq.defP
\begin{align*}
{\cal P}= \frac{n_2-n_1}{R},
\end{align*}
```
net als voorheen de **kracht** is van het oppervlak.

Vervolgens beschouwen we een bolvormige spiegel met een kromtestraal $R$.
We zullen laten zien dat de straalmatrix tussen de vlakken net voor en na de spiegel wordt gegeven door:

```{math}
:label: eq.sphmirror
\begin{align*}
\left( \begin{array}{c}n_2\alpha_2 \\y_2
\end{array}\right)
&= \left( \begin{array}{cc}1 & -{\cal P} \\0 & 1
\end{array}\right)\left(
\begin{array}{c}n_1 \alpha_1 \\y_1
\end{array}\right), \quad \textbf{bolvormige reflector,}
\end{align*}
```
waar

```{math}
:label: eq.defPrefl
\begin{align*}
{\cal P}= \frac{2n}{R},
\end{align*}
```
de kracht van de spiegel is. $n_1=n$ maar $n_2=-n$, omdat de conventie wordt gehanteerd dat als een straal zich voortplant van **van rechts naar links** (d.w.z. in de negatieve $z$-richting), de brekingsindex in de straalvectoren en straalmatrices **negatief** wordt gekozen. Merk op dat wanneer de spiegel plat is: $R=\infty$, de straalmatrix van de reflector impliceert

```{math}
\begin{align*}
n_2\alpha_2 = n_1 \alpha_1,
\end{align*}
```
wat overeenkomt met het feit dat $n_2=-n_1$ en volgens de definitie {eq}`eq.defalpha` $\alpha_2$ en $\alpha_1$ een tegengesteld teken hebben voor een spiegel.
```{figure} Images/Chapter_2/2_15_Concave_mirror.png
:name: Fig_2_15_Mirror
Weerspiegeling door een spiegel.
```


Als alle hoeken positief zijn, volgt uit {numref}`Fig_2_15_Mirror`

```{math}
:label: eq.refl1
\begin{align*}
\alpha_1&= \theta_i +\varphi, \end{align*}
```
```{math}
:label: eq.refl2
\begin{align*}
\\
\alpha_2 &= \varphi-\theta_r= \varphi-\theta_i.\end{align*}
```
Vandaar dat,

```{math}
:label: eq.refl3
\begin{align*}
\alpha_2= -\alpha_1 + 2\varphi.
\end{align*}
```
Nu

$$
\varphi\approx \frac{y_1}{R}
$$ (eq.varphi3)

In de situatie geschetst in {numref}`Fig_2_15_Mirror`,
impliceert {eq}`eq.defalpha` dat zowel $\alpha_2$ als $\alpha _1$ positief zijn. Door de brekingsindex negatief te kiezen na reflectie, concluderen we uit {eq}`eq.refl3` en {eq}`eq.varphi3`:

```{math}
:label: eq.n2alpha2
\begin{align*}
n_2\alpha_2 = -n \alpha_2 = n \alpha_1 - \frac{2n}{R} y_1 = n_1\alpha_1 - \frac{2n}{R}.
\end{align*}
```
Dit bewijst Eq.&nbsp;{eq}`eq.sphmirror`.


We beschouwen nu de straalmatrix wanneer een straal zich voortplant van een vlak $z_1$ naar een vlak $z_2$ door een medium met met brekingsindex $n$.
In dat geval hebben we
$\alpha_2=\alpha_1$ en $y_2=y_1 + \alpha_1(z_2-z_1)$, vandaar

```{math}
:label: eq.mathom
\begin{align*}
{\cal M}=\left( \begin{array}{cc}1 & 0 \\\frac{z_2-z_1}{n} & 1
\end{array}\right), \quad \textbf{homogene ruimte}.
\end{align*}
```
Merk op dat als het licht zich van links naar rechts voortplant: $z_2>z_1$ en dus $z_2-z_1$ in de eerste kolom en tweede rij van de matrix positief is, d.w.z. het de afstand tussen de vlakken is.

Voor twee vlakken waartussen zich een aantal optische componenten bevinden, eventueel gescheiden door gebieden met homogeen materiaal (b.v. lucht), kan de straalmatrix worden verkregen door de matrices van de afzonderlijke componenten en van de homogene gebieden te vermenigvuldigen. De volgorde van de vermenigvuldiging van de matrices is zodanig dat de **meest rechtse matrix overeenkomt met de eerste component die wordt aangetroffen door het licht**, enzovoort.

In de straalmatrixbenadering blijven alle stralen in hetzelfde vlak, namelijk het vlak door de straal en de $z$-as. Deze stralen worden **meridionale stralen** genoemd. Door alleen meridionale stralen mee te nemen, is de beeldvorming door optische systemen beperkt tot twee dimensies. Niet-meridionale stralen worden **scheve stralen** genoemd. Scheve stralen gaan niet door de optische as en worden niet in aanmerking genomen in de paraxiale theorie.

**Opmerkingen**. 

1. In matrix {eq}`eq.mathom` zijn $z_1$ en $z_2$ **coördinaten**, d.w.z. ze hebben een teken. 

2. In plaats van de brekingsindex negatief te kiezen in straalvectoren van stralen die zich van rechts naar links verplaatsen, kan men na elke reflectie de richting van de positieve $z$-as omkeren. De conventie om de brekingsindex negatief te maken is echter handiger in ray tracing-software. 

3. De determinant van de straalmatrices {eq}`eq.matsph0`, {eq}`eq.sphmirror` en
{eq}`eq.mathom` zijn allemaal 1. Aangezien alle hieronder beschouwde straalmatrices vermenigvuldigingen zijn van deze elementaire matrices, is de determinant van elke beschouwde straalmatrix gelijk aan 1.

### De lensmatrix
We passen nu straalmatrices toe op een lens.
{numref}`Fig_2_16_Spherical_Lens_simplified` toont een lens met twee bolvormige oppervlakken. De brekingsindex van de lens is $n_l$ en die van de media links en rechts van de lens zijn respectievelijk $n_1$ en $n_2$. Laat de afstand tussen de hoekpunten $d$ zijn.
```{figure} Images/Chapter_2/2_16_Spherical_Lens_simplified.png
:name: Fig_2_16_Spherical_Lens_simplified

Een lens met een dikte $d$. De straalmatrix wordt gedefinieerd tussen de vlakken direct voor en na de lens.
```

We zullen eerst de matrix afleiden die de straalvector in het vlak **direct voor** de lens afbeeldt op die in het vlak **direct achter** de lens. Laat

```{math}
:label: eq.rayvectors
\begin{align*}
\left( \begin{array}{c}n_1 \alpha_1 \\y_1
\end{array}\right)
\;\;\; \text{ en }
\left( \begin{array}{c}n_2 \alpha_2 \\y_2
\end{array}\right)
\end{align*}
```
twee vectoren zijn in de twee vlakken die overeenkomen met dezelfde straal. De straal wordt eerst gebroken door het bolvormige oppervlak met een straal $R_1$ en het middelpunt $C_1$. Met behulp van {eq}`eq.matsph0` en {eq}`eq.defP` volgt dat de matrix tussen de straalvectoren net voor en net achter het bolvormige oppervlak met straal $R_1$ en middelpunt $C_1$ wordt gegeven door

```{math}
:label: eq.matsph1
\begin{align*}
{\cal M}_1= \left( \begin{array}{cc}1 & - {\cal P}_1 \\0 & 1
\end{array}\right)
\end{align*}
```
,
waar

$$
{\cal P}_1 = \frac{n_l-n_1}{R_1}.
$$ (eq.defP1)

De straal plant zich dan voort over de afstand $d$ door het materiaal waarvan de lens is gemaakt. De matrix die straalvectoren afbeeldt van het vlak in de lens direct achter het linker bolvormig oppervlak naar een straalvector in het vlak direct voor het rechter bolvormig oppervlak volgt uit {eq}`eq.mathom`:

```{math}
:label: eq.matglass
\begin{align*}
{\cal M}_2=\left( \begin{array}{cc}1 & 0 \\\frac{d}{n_l} & 1
\end{array}\right).
\end{align*}
```
Ten slotte is de matrix die straalvectoren van het vlak in de lens direct voor het tweede bolvormige oppervlak afbeeldt naar vectoren in het vlak direct erachter,

```{math}
:label: eq.matsph2
\begin{align*}
{\cal M}_3= \left( \begin{array}{cc}1 & -{\cal P}_2 \\0 & 1
\end{array}\right).
\end{align*}
```
met

$$
{\cal P}_2 = \frac{n_2-n_l}{R_2}.
$$ (eq.defP2)

De matrix die straalvectoren in het vlak vlak voor de lens afbeeldt op straalvectoren in het vlak direct achter de lens, wordt gegeven door het matrixproduct:

```{math}
:label: eq.matlens
\begin{align*}
{\cal M}&= {\cal M}_3 {\cal M}_2 {\cal M}_1  \\
&= \left( \begin{array}{cc}1 - \frac{d}{n_l}P_2 & -P_1 - P_2 + \frac{d}{n_l} P_1P_2 \\\frac{d}{n_l} & 1 -\frac{d}{n_l}P_1
\end{array}\right), \quad \textbf{lens}.
\end{align*}
```
De grootheid

```{math}
:label: eq.powerlens
\begin{align*}
{\cal P}={\cal P}_1+{\cal P}_2 - \frac{d}{n_l}{\cal P}_1{\cal P}_2
\end{align*}
```
wordt de **sterkte** van de lens genoemd. De sterkte heeft de eenheid 1/lengte en wordt gegeven in dioptrie (${\cal D}$), waarbij $1 \,\, {\cal D}=\text{m}^{-1}$. De sterkte kan positief en negatief zijn.
De ruimte links van de lens wordt de **objectruimte** genoemd en die rechts van de lens wordt de **beeldruimte** genoemd.

(subsection.focthin)=
### Scherpstellen met een dunne lens

Voor een dunne lens vallen de hoekpunten $V_1$ en $V_2$ samen en $d=0$, vandaar dat {eq}`eq.matlens`:

```{math}
:label: eq.matthinlens
\begin{align*}
{\cal M} = \left( \begin{array}{cc}1 & -P\\0 & 1
\end{array}\right), \quad \textbf{dunne lens},
\end{align*}
```
wordt, waar

$$
P=P_1+P_2 = \left( \frac{n_l-n_1}{R_1}-\frac{n_2-n_l}{R_2}\right),
$$ (eq. Pthinlens)

De oorsprong van het coördinatenstelsel wordt gekozen in het gemeenschappelijke hoekpunt $V_1=V_2$.

Als we kijken naar een straal in medium 1 die evenwijdig is aan de optische as ($\alpha_1=0$) en op hoogte $y_1$, krijgen we $n_2 \alpha_2= - Py_1$ en $y_2=y_1$. Vandaar dat, wanneer $P>0$, de hoek $\alpha_2$ van de straal een teken heeft dat negatief is ten opzichte van $y_2$ en daarom wordt de straal in de beeldruimte teruggebogen naar de optische as, wat een **tweede brandpunt** of **beeldbrandpunt** $F_i$ oplevert. Zijn $z$-coördinaat $f_i$ is:

```{math}
:label: eq.thinlensfo
\begin{align*}
f_i = \frac{\alpha_2}{y_2} = \frac{n_2}{{\cal P}}.
\end{align*}
```
Voor een straal die in de beeldruimte verschijnt op hoogte $y_2$ en evenwijdig is aan de optische as: $\alpha_2=0$, hebben we $y_1=y_2$ en 
```{math}
\begin{align*}
n_1\alpha_1 = P y_1.
\end{align*}
```
Als de sterkte positief is: ${\cal P}>0$, heeft de hoek $\alpha_1$ hetzelfde teken als $y_1$, wat impliceert dat de straal in de objectruimte de optische as heeft gekruist in een punt $F_o$ met $z$-coördinaat: $z=f_o$

```{math}
:label: eq.thinlensfi
\begin{align*}
f_o = -\frac{y_1}{\alpha_1} = -\frac{n_1}{{\cal P}}.
\end{align*}
```
Het punt $F_o$ wordt het **eerste brandpunt** of **objectbrandpunt** genoemd.

We concluderen dat wanneer de sterkte ${\cal P}$ van de lens positief is, $f_i>0$ en $-f_o>0$, wat betekent dat de beeld- en objectbrandpunten zich respectievelijk in de beeld- en objectruimte bevinden, en dus beide echt zijn. Een lens met een positief vermogen wordt **convergent** of **positief** genoemd. Het maakt invallende bundels van stralen convergent of minder divergent.

Een lens met een negatieve sterkte wordt divergent genoemd en heeft $f_i<0$, $-f_o<0$. Deze maakt invallende stralen meer divergent of minder convergent.
Invallende stralen die evenwijdig aan de optische as zijn, worden van de optische as afgebogen en lijken afkomstig te zijn van een punt voor de lens met $z$-coördinaat $f_i<0$. Het brandpunt van het beeld komt dus niet overeen met een locatie waar sprake is van een werkelijke concentratie van lichtintensiteit, d.w.z. het is virtueel. Het objectbrandpunt is een virtueel objectpunt, omdat alleen een bundel invallende stralen die samenkomen naar een bepaald punt achter de negatieve lens kan worden omgezet in een bundel stralen evenwijdig aan de optische as.

Met de verkregen resultaten voor de brandpuntscoördinaten kunnen we de lensmatrix van een dunne lens herschrijven tot

```{math}
:label: eq.matthinlens2
\begin{align*}
{\cal M} = \left( \begin{array}{cc}1 & -\frac{n_2}{f_i} \\0 & 1
\end{array}\right), \quad \textbf{dunne lens}.
\end{align*}
```

(subsection.imagingthinlens)=
### Beeldvorming met een dunne lens

We beschouwen eerst een algemene straalmatrix {eq}`eq.matgen`, {eq}`eq.defM2` tussen twee vlakken $z=z_1$ en $z=z_2$ en stellen de volgende vraag:
Wat zijn eigenschappen van de straalmatrix zodanig dat de twee vlakken beelden van elkaar zijn, of (zoals dit ook wel wordt genoemd) elkaars geconjugeerde zijn?
Het is duidelijk dat als deze vlakken elkaars beeld zijn, we moeten hebben dat voor elke coördinaat $y_1$ in het vlak $z=z_1$ er een punt is met een coördinaat $y_2$ in het vlak $z=z_2$, zodat elke straal door $(y_1,z_1)$ (binnen een bepaalde kegel van stralen) door punt $(y_2, z_2)$ gaat.
Vandaar dat er voor elke hoek $\alpha_1$ (in een bepaald interval van hoeken) een hoek $\alpha_2$ is, zodanig dat {eq}`eq.matgen` geldig is.
Dit betekent dat er voor elke $y_1$ een $y_2$ is, zodat voor alle hoeken $\alpha_1$:

```{math}
:label: eq.eq
\begin{align*}
y_2=C n_1\alpha_1 + D y_1,
\end{align*}
```
Dit vereist dat

```{math}
:label: eq.condimage
\boxed{\begin{align*}
C=0, \quad \textbf{voorwaarde voor beeldvorming}.
\end{align*}}
```

De verhouding tussen $y_2$ en $y_1$ IS de vergroting $M$. Vandaar

```{math}
:label: eq.magn
\begin{align*}
M=\frac{y_2}{y_1} = D,
\end{align*}
```
is de **vergroting** van de afbeelding (deze hoeveelheid heeft een teken).

Om het beeld met een dunne lens te bepalen, leiden we eerst de straalmatrix af tussen twee vlakken $z=z_1<0$ en $z=z_2>0$ aan weerszijden van de dunne lens. De oorsprong van het coördinatenstelsel ligt weer op het hoekpunt van de dunne lens.
Deze straalmatrix is het product van de matrix voor propagatie van $z=z_1$ naar het vlak direct voor de lens, de matrix van de dunne lens en de matrix voor propagatie van het vlak direct achter de lens naar het vlak $z=z_2$:

```{math}
:label: eq.matz1z2
\begin{align*}
{\cal M} &= \left( \begin{array}{cc}1 & 0 \\\frac{z_2}{n_2} & 1
\end{array}\right) \left( \begin{array}{cc}1 & - {\cal P} \\0 & 1
\end{array}\right) \left( \begin{array}{cc}1 & 0 \\\frac{-z_1}{n_1} & 1
\end{array}\right)  \\
&=
\left( \begin{array}{cc}1+\frac{z_1}{n_1}{\cal P} & -{\cal P} \\-\frac{z_1}{n_1} + \frac{z_2}{n_2} + \frac{z_1z_2}{n_1 n_2}{\cal P} & 1-\frac{z_2}{n_2} {\cal P}
\end{array}\right)
\end{align*}
```
De beeldvorming-voorwarde {eq}`eq.condimage` impliceert:


```{math}
:label: eq.lensmaker
\boxed{\begin{align*}
-\frac{n_1}{s_o} + \frac{n_2}{s_i}={\cal P},
\quad \bf{Lensmaker's \;\; Formule},
\end{align*}}
```
 waar we $s_o=z_1$ en $s_i=z_2$ hebben gekozen voor de $z$-coördinaten van het object en de afbeelding.
Omdat voor de dunne lensmatrix {eq}`eq.matz1z2`: $D=1-z_2/f_i$, volgt bij gebruik van {eq}`eq.lensmaker` dat de vergroting {eq}`eq.magn` wordt gegeven door

```{math}
:label: eq. Mlens
\begin{align*}
M = \frac{y_i}{y_o}= 1-\frac{s_i}{f_i}= \frac{s_i}{s_o},
\end{align*}
```
waar we nu $y_o$ en $y_i$ hebben geschreven in plaats van respectievelijk $y_1$ en $y_2$.

**Opmerking.**
De lenzenmakersformule voor beeldvorming door een dunne lens kan ook worden afgeleid met behulp van de beeldvormingsformule {eq}`eq.one_surface` van de twee bolvormige oppervlakken van de lens. We creëren eerst een gegeven punt $S$ door het linker bolvormige oppervlak met behulp van {eq}`eq.one_surface` alsof het tweede oppervlak afwezig is. Het verkregen tussenliggende beeld $P'$ wordt dan afgebeeld door het tweede bolvormige oppervlak alsof het eerste oppervlak afwezig is. $P'$ kan een reëel of virtueel object zijn voor het tweede oppervlak. De afleiding wordt uitgevoerd in Opgave 2.5.


Net als het geval van een enkel bolvormig oppervlak, wordt een afbeelding een **echt beeld** genoemd als het zich rechts van de lens bevindt ($s_i>0$) en wordt het een **virtueel beeld** genoemd als het zich links van de lens lijkt te bevinden ($s_i<0$). Een object wordt een **reëel object** genoemd als het zich links van de lens bevindt ($s_o<0$) en een **virtueel object** als het rechts van de lens lijkt te staan ($s_o>0$).
Voor een positieve lens: ${\cal P}>0$ en dus {eq}`eq.lensmaker` impliceert dat $s_i>0$ $|s_o|>|f_o|$, wat betekent dat het beeld door een convergente lens echt is als het object verder van de lens verwijderd is dan het brandpunt van het object $F_o$.
Het geval $s_o>0$ komt overeen met een virtueel object, d.w.z. met het geval van een convergerende bundel invallende stralen, die voor een waarnemer in de objectruimte lijkt te convergeren naar een punt op afstand $s_o$ achter de lens.
Een convergente lens ($f_i>0$) maakt dan een beeld tussen de lens en het tweede brandpunt. Een divergerende lens ($f_i<0$) kan de convergerende bundel daarentegen alleen omzetten in een echt beeld als het virtuele objectpunt zich tussen de lens en het brandpunt bevindt. Als het virtuele objectpunt een grotere afstand tot de lens heeft, is de convergentie van de invallende bundel te zwak en breekt de divergerende lens deze bundel vervolgens in een divergerende bundel stralen die afkomstig lijken te zijn van een virtueel beeldpunt voor de lens ($s_i<0$).

In plaats van straalmatrices te gebruiken, kan men het beeld construeren met een liniaal.
Beschouw de beeldvorming van een eindig object $S_1S_2$ zoals weergegeven in {numref}`Fig_2_17_Real_Image` in het geval dat de media aan de linker- en rechterlens hetzelfde zijn. Laat $y_o$ de y-coördinaat zijn van $S_2$. Er geldt dat $y_o>0$ wanneer het object zich boven de optische as bevindt.
```{figure} Images/Chapter_2/2_17_Real_Image_BW.png
:name: Fig_2_17_Real_Image
Object en afbeelding voor een dunne lens.
```

Teken de straal door het brandpunt $F_o$ in de objectruimte en de straal door het midden $V$ van de lens. De eerste straal wordt evenwijdig in de beeldruimte. De tweede snijdt beide oppervlakken van de lens bijna in hun (bijna samenvallende) hoekpunten en daarom is de breking aan beide oppervlakken tegengesteld en verlaat de straal de lens evenwijdig aan de invalsrichting. Bovendien kan de zijdelingse verplaatsing worden verwaarloosd omdat de lens dun is. (Dit is natuurlijk niet correct als de brekingsindexen links en rechts van de lens verschillend zijn). Vandaar dat **de straal door het midden van een dunne lens niet wordt gebroken**. Het snijpunt in de beeldruimte van de twee stralen geeft de locatie van het beeldpunt $P_2$ van $S_2$. Het beeld is echt als het snijpunt zich voordoet in de beeldruimte en anders virtueel.
Voor het geval van een convergente lens met een reëel object met $y_o>0$ zoals weergegeven in {numref}`Fig_2_17_Real_Image`, volgt uit de gelijkvormige driehoeken
$\Delta\,\text{BV}\text{F}_i$ en $\Delta\, \text{P}_2\text{P}_1\text{F}_i$ dat

```{math}
:label: eq.ratio1
\begin{align*}
\frac{y_o}{|y_i|} = \frac{f_i}{s_i -f_i},
\end{align*}
```
.
Van de gelijkvormige driehoeken $\Delta\, \text{S}_2\text{S}_1\text{F}_o$ en $\Delta\, \text{AVF}_o$:

```{math}
:label: eq.ratio2
\begin{align*}
\frac{|y_i|} {y_o}=\frac{f_i}{f_o-s_o}.
\end{align*}
```
Hier gebruikten we $|f_o|=f_i$.
(de absolute waarde van $y_i$ wordt genomen omdat volgens onze tekenconventie $y_i$ in {numref}`Fig_2_17_Real_Image` negatief is, terwijl {eq}`eq.ratio2` een ratio van lengtes is).
Door deze twee vergelijkingen te vermenigvuldigen krijgen we de **Newtoniaanse vorm** van de lensvergelijking (geldig als $n_2=n_1$):


```{math}
:label: eq.newton
\boxed{\begin{align*}
x_o x_i =- f_i^2=- f_o^2,
\end{align*}}
```

waarbij $x_o$ en $x_i$ de $z$-coördinaten zijn van het object en het beeld ten opzichte van die van respectievelijk het eerste en tweede brandpunt:

```{math}
:label: eq.defxoxi
\begin{align*}
x_o = s_o-f_o, \;\;\; x_i = s_i-f_i.
\end{align*}
```
Vandaar dat $x_o$ negatief is als het object zich links van $F_o$ bevindt en $x_i$ positief is als het beeld zich rechts van $F_i$ bevindt.

De **transversale vergroting** is

```{math}
:label: eq.defM1
\begin{align*}
M=\frac{y_i}{y_o} = \frac{s_i}{s_o} = -\frac{x_i}{f_i},
\end{align*}
```
waarbij de tweede gelijkheid volgt uit het beschouwen van de gelijkvormige driehoeken $\Delta \text{P}_2\text{P}_1\text{F}_i$ en $\Delta \text{BVF}_i$ in {numref}`Fig_2_17_Real_Image`.
Een positieve $M$ betekent dat het beeld rechtop staat, een negatieve $M$ betekent dat het beeld omgekeerd is.

Alle vergelijkingen zijn ook geldig voor een dunne negatieve lens en voor virtuele objecten en afbeeldingen.
Voorbeelden van echte en virtuele object- en beeldpunten voor een positieve en een negatieve lens worden getoond in {numref}`Fig_2_18_Positive_Lens` en {numref}`Fig_2_19_Negative_Lens`.

```{figure} Images/Chapter_2/2_18_Positive_Lens_BW.png
:name: Fig_2_18_Positive_Lens
Echte en virtuele objecten en afbeeldingen voor een convergente dunne lens met dezelfde brekingsindex links en rechts van de lens, d.w.z. $-f_o=f_i>0$. In (a) is het object reëel met $s_o<f_o$ en is het beeld ook reëel ($s_i>0$). In (b) bevindt het object zich tussen het voorste brandpunt en de lens: $f_o< s_o<0$. Dan zijn de stralen van het object te divergent voor de lens om ze convergent te maken in de beeldruimte en daarom is het beeld virtueel: $s_i<0$. In (c) is er een kegel van convergerende stralen die van links op de lens valt en die, zonder de lens, zou convergeren naar een punt $S $ achter de lens. Daarom is $S$ een virtueel object ($s_0>0$). Het beeld is echt en kan worden geconstrueerd met de twee getoonde stralen.
		In (d) wordt $s_i$ weergegeven als functie van $s_o$ voor een convergente lens (zie Eq.&nbsp;{eq}`eq.lensmaker`).
```

```{figure} Images/Chapter_2/2_19_Negative_Lens_BW.png
:name: Fig_2_19_Negative_Lens

Echte en virtuele objecten en afbeeldingen voor een divergente dunne lens met dezelfde brekingsindex links en rechts van de lens, d.w.z. $-f_o=f_i<0$. In (a) is het object reëel, d.w.z. $s_o<0$. De divergerende lens maakt de straalkegel van het object meer divergent, zodat het beeld virtueel is: $s_i<0$. Wanneer het object virtueel is, is er een kegel van convergerende stralen die van links komt en die na verlenging naar rechts van de lens (alsof de lens niet aanwezig is) elkaar kruisen in het virtuele object S ($s_o>0$). Het hangt ervan af hoe sterk de convergentie is of de divergerende lens deze kegel in convergerende stralen verandert of dat de stralen blijven divergeren. In (b) $0<s_o<-f_i$, en het beeld is echt. In c) $s_o>-f_i$ en de beeld is virtueel ($s_i<0$). In (d) wordt $s_i$ weergegeven als functie van $s_o$ voor een divergente lens ($f_i<0$ (zie Eq.&nbsp;{eq}`eq.lensmaker`).
```


(subsection.twolenses)=
### Twee dunne lenzen

De straalmatrix is een geschikte methode om de beeldvorming van een systeem dat uit meerdere dunne lenzen bestaat te bestuderen. Voor twee lenzen kan de beeldvorming echter nog steeds gemakkelijk worden verkregen door constructie.
We construeren gewoon het beeld verkregen door de eerste lens alsof de tweede lens niet aanwezig is en gebruiken dit beeld als (eventueel virtueel) object voor de tweede lens.
In {numref}`Fig_2_20_Double_Lens` wordt een voorbeeld getoond waarbij de afstand tussen de lenzen groter is dan de som van hun brandpuntsafstanden.
Eerst wordt het beeld $P'$ van $S$ geconstrueerd zoals verkregen door $L_1$ alsof $L_2$ niet aanwezig zou zijn.
We construeren het tussenliggende beeld $P'$ als gevolg van lens $L_1$ met behulp van straal 2 en 3. $P'$ is een echt beeld voor lens $L_1 $ en ook een echt object voor lens $L_ 2 $. Straal 3 is evenwijdig aan de optische as tussen de twee lenzen en wordt dus gebroken door lens $L_2$ naar het achterste brandpunt $F_{2i}$. Straal 4 is de straal van $P'$ door het midden van de lens $L_2$. Het beeldpunt $P$ is het snijpunt van straal 3 en 4.

```{figure} Images/Chapter_2/2_20_Two_Thin_Lenses_Separated_BW.png
:name: Fig_2_20_Double_Lens

Twee dunne lenzen gescheiden door een afstand die groter is dan de som van hun brandpuntsafstanden. 
```


In het geval van {numref}`Fig_2_21_Two_Thin_Lenses_close` is de afstand $d$ tussen de twee positieve lenzen kleiner dan hun brandpuntsafstanden.
Het tussenliggende beeld $P'$ is een reëel beeld voor $L_1$, verkregen door het snijpunt van stralen 2 en 4 die door het object en de beeldbrandpunten gaan $F_{o1}$ en $F_{i1}$ van lens $L_1$. $P'$ is nu een virtueel object voor lens $L_2$. Om het beeld te vinden met $L_2$, teken  straal 3 van $P'$ door het midden van de lens $L_2$ terug naar $S$ (deze straal wordt gebroken door lens $L_1$ maar niet door $L_2$) en teken straal 4 zoals gebroken door lens $L_2$. Omdat straal 4 evenwijdig is aan de optische as tussen de lenzen, gaat deze door het achterste brandpuntspunt $F_{2i}$ van de lens $L_2$. Het snijpunt van straal 3 en 4 is het uiteindelijke beeldpunt $P$.
```{figure} Images/Chapter_2/2_21_Two_Thin_Lenses_close_BW.png
:name: Fig_2_21_Two_Thin_Lenses_close
Twee dunne lenzen op een afstand die kleiner is dan hun brandpuntsafstanden.
```


Het is gemakkelijk om de $z$-coördinaat $s_i$ uit te drukken ten opzichte van het coördinatenstelsel met de oorsprong op het hoekpunt van $L_2$ van het uiteindelijke beeldpunt, in de $z$-component $s_o$ ten opzichte van de oorsprong op het hoekpunt van lens $L_1$ van het objectpunt. We gebruiken de Lenzenmakersformule voor elke lens en zorgen ervoor dat de juiste lokale coördinatensystemen worden gebruikt.
De tussenliggende afbeelding $P'$ als gevolg van lens $L_1$ heeft $z$-coördinaat $s_{1i}$ ten opzichte van het coördinatenstelsel met oorsprong op het hoekpunt $V_1$, welke voldoet aan:

```{math}
:label: eq. L1
\begin{align*}
-\frac{1}{s_o} + \frac{1}{s_{1i}}=\frac{1}{f_{1i}}.
\end{align*}
```
Als object voor lens $L_2$, heeft $P'$ een $z$-coördinaat ten opzichte van het coördinatenstelsel met oorsprong op $V_2$ gegeven door:
$s_{2o}=s_{1i}-d$, waarbij $d$ de afstand tussen de lenzen is. Vandaar dat met $s_i=s_{2i}$ de Lenzenmakersformule voor lens $L_2$ impliceert:

```{math}
:label: eq. L2
\begin{align*}
-\frac{1}{s_{1i}-d} + \frac{1}{s_i} = \frac{1}{f_{2i}}.
\end{align*}
```
Door het oplossen van {eq}`eq. L1` voor $s_{1i}$ en het resultaat in te vullen in {eq}`eq. L2`, vinden we

```{math}
:label: eq. L1L2
\begin{align*}
s_i = \frac{ -d f_{1i}f_{2i} + f_{2i}(f_{i1}-d)s_o }{f_{1i}(f_{2i}-d) + (f_{1i}+f_{2i}-d) s_o}, \;\;\; \quad \textbf{twee dunne lenzen}.
\end{align*}
```
Door de limiet $s_o \rightarrow -\infty$ te nemen, krijgen we de $z$-coördinaat $f_i$ van het beeldbrandpunt van de twee lenzen, terwijl $s_i\rightarrow \infty$ de $z$-coördinaat $f_o$ van het brandpunt van het object geeft:

```{math}
:label: eq.2fi
\begin{align*}
f_i&= \frac{ (f_{1i}-d) f_{2i}}{f_{1i}+f_{2i}-d}, \end{align*}
```
```{math}
:label: eq.2fo
\begin{align*}
\\
f_o &= -\frac{(f_{2i}-d)f_{1i}}{f_{1i}+f_{2i} - d},\end{align*}
```
We ontdekten in sectie {eq}`subsection.focthin` dat wanneer de brekingsindices van de media voor en na de lens hetzelfde zijn, de object- en beeldbrandpuntsafstanden van een dunne lens identiek zijn. Echter, zoals volgt uit {eq}`eq.2fi` en {eq}`eq.2fo` zijn de brandpuntsafstanden van het object en het beeld over het algemeen verschillend wanneer er meerdere lenzen zijn.

Door te construeren met behulp van het tussenliggende beeld, is het duidelijk dat de vergroting van het systeem met twee lenzen het product is van de vergrotingen van de twee lenzen:

```{math}
:label: eq. M
\begin{align*}
M = M_1 M_2.
\end{align*}
```
**Opmerkingen**. 

1. Wanneer $f_{1i}+f_{2i}=d$ staan de brandpunten op oneindig. Zo'n systeem wordt **telecentrisch** genoemd. 

2. In de limiet dat de lenzen heel dicht bij elkaar staan: $d\rightarrow 0$, {eq}`eq. L1L2` wordt

```{math}
:label: eq. L1L2d0
\begin{align*}
-\frac{1}{s_o } + \frac{1}{s_i} = \frac{1}{f_{1i}} + \frac{1}{f_{2i}}.
\end{align*}
```
De brandpuntsafstand $ f_i$ van het systeem van twee lenzen die met elkaar in contact staan, voldoet dus aan:

```{math}
:label: eq.ftwo
\begin{align*}
\frac{1}{f_i} = \frac{1}{f_{1i}} + \frac{1}{f_{2i}}.
\end{align*}
```
Door het gebruik van twee identieke lenzen in contact, wordt de brandpuntsafstand gehalveerd. 

3. Hoewel voor twee lenzen de beeldcoördinaat nog relatief eenvoudig kan worden uitgedrukt in de objectafstand, is het voor systemen met meer lenzen een veel betere strategie om de totale straalmatrix te vinden en vervolgens de beeldvorming-voorwarde {eq}`eq.condimage` te gebruiken.

### De dikke lens

Aan de linkerkant van {numref}`Fig_2_22_Thick_Lens_Principle_plane` is een dikke lens te zien. Het brandpunt van het object wordt gedefinieerd als het punt waarvan de stralen zodanig worden gebroken dat de resulterende stralen evenwijdig zijn aan de optische as. Door de invallende en resulterende stralen met rechte segmenten uit te breiden, worden de snijpunten gevonden op een gebogen oppervlak, dat dicht bij de optische lig, d.w.z. in de paraxiale benadering, in goede benadering een vlak loodrecht op de optische as is. Dit vlak wordt het **primaire hoofdvlak** genoemd en het snijpunt met de optische as wordt het primaire hoofdpunt $H_1$ genoemd.

```{figure} Images/Chapter_2/2_22_Thick_Lens_Principle_plane_BW.png
:name: Fig_2_22_Thick_Lens_Principle_plane

Hoofdvlakken van een dikke lens, met brandpuntsafstanden voor en achter: f.f.l en b.f.l.
```

Door invallende stralen te beschouwen die evenwijdig zijn aan de optische as en daarom in het brandpunt van het beeld zijn gefocust, worden het **secundaire hoofdvlak** en het secundaire hoofdpunt $H_2$ op een vergelijkbare manier gedefinieerd (zie de tekening rechts in {numref}`Fig_2_22_Thick_Lens_Principle_plane`).
De hoofdvlakken kunnen zich buiten de lens bevinden. Voor meniscuslenzen is dit meestal het geval, zoals weergegeven in {numref}`Fig_2_23_Principle_planes`.
Het is te zien aan {numref}`Fig_2_22_Thick_Lens_Principle_plane`
dat de hoofdvlakken afbeeldingen van elkaar zijn, met vergroting één. Dus als een object in het primaire hoofdvlak wordt geplaatst (hypothetisch als dit vlak zich in de lens bevindt), bevindt het beeld zich in het secundaire hoofdvlak. Het beeld is rechtop en wordt niet vergroot.

```{figure} Images/Chapter_2/2_23_Principle_planes_BW.png
:name: Fig_2_23_Principle_planes

Positie van de hoofdvlakken voor meerdere lenzen. 
```


Als nu de objectcoördinaten en het objectbrandpunt zijn gedefinieerd ten opzichte van de oorsprong op $H_1$ en de beeldcoördinaten en het beeldbrandpunt zijn gedefinieerd ten opzichte van de oorsprong in $H_2$, kan de lenzenmakersformule {eq}`eq.lensmaker` ook worden gebruikt voor een dikke lens.




*Bewijs* \\
We herinneren ons het resultaat {eq}`eq.matlens` voor de straalmatrix tussen de vlakken door de voorste en achterste hoekpunten $V_1$, $V_2$ van een dikke lens met brekingsindex $n_l$ en dikte $d$:

```{math}
:label: eq.matlens_b
\begin{align*}
{\cal M}_{V_1V_2}
&= \left( \begin{array}{cc}1 - \frac{d}{n_l}P_2 & -P \\\frac{d}{n_l} & 1 -\frac{d}{n_l}P_1
\end{array}\right), \quad \textbf{dikke lens},
\end{align*}
```
waar

```{math}
:label: eq. P1P2_b
\begin{align*}
P_1= \frac{n_l-n_1}{R_1}, \quad P_2=\frac{n_2-n_l}{R_2},
\end{align*}
```
en $n_1$, $n_2$ zijn de brekingsindices links en rechts van de lens, respectievelijk, en waar

```{math}
:label: eq.powerlens_b
\begin{align*}
P=P_1+P_2 - \frac{d}{n_l}P_1P_2.
\end{align*}
```
Als $h_1$ de $z$-coördinaat van het eerste hoofdpunt $H_1$ is ten opzichte van het coördinatenstelsel met oorsprong op hoekpunt $V_1$, dan hebben we volgens {eq}`eq.mathom` voor de straalmatrix tussen het primaire hoofdvlak en het vlak door hoekpunt $V_1$

```{math}
:label: eq.mathom_b
\begin{align*}
{\cal M}_1=\left( \begin{array}{cc}1 & 0 \\\frac{h_1}{n_1} & 1
\end{array}\right).
\end{align*}
```
Evenzo, als $h_2$ de coördinaat is van het secundaire hoofdpunt $H_2$ ten opzichte van het coördinatensysteem met $V_2$ als oorsprong, is de straalmatrix tussen het vlak door hoekpunt $V_2$ en het secundaire hoofdvlak

```{math}
:label: eq.mathom_c
\begin{align*}
{\cal M}_2=\left( \begin{array}{cc}1 & 0 \\\frac{h_2}{n_2} & 1
\end{array}\right).
\end{align*}
```
De straalmatrix tussen de twee hoofdvlakken is dan

```{math}
:label: eq.matH1H2
\begin{align*}
{\cal M}_{H_1H_2}= {\cal M}_2 {\cal M}_{V_1V_2}{\cal M}_1.
\end{align*}
```
De coördinaten $h_1$ en $h_2$ kunnen worden gevonden door de beeldvorming-voorwarde toe te passen op de resulterende matatrix 
{eq}`eq.condimage`: $C=0$ en de voorwaarde dat de vergroting 1 moet zijn: $D=1$, die volgt uit {eq}`eq.magn`.
We laten de details weg en geven hier alleen de resulterende vergelijkingen:

```{math}
:label: eq. V1H1
\begin{align*}
h_1 &= \frac{n_1}{n_l} \frac{P_2}{P} d, \end{align*}
```
```{math}
:label: eq. V2H2
\begin{align*}
\\
h_2 &= -\frac{n_2}{n_l} \frac{P_1}{P} d.\end{align*}
```
Met deze resultaten wordt {eq}`eq.matH1H2`

```{math}
:label: eq.matH1H2_b
\begin{align*}
{\cal M}_{H_1H_2}= \left( \begin{array}{cc}1 & -P \\0 & 1
\end{array}\right).
\end{align*}
```
We zien dat **de straalmatrix tussen de hoofdvlakken identiek is aan de straalmatrix van een dunne lens** {eq}`eq.matthinlens`.
We concluderen dus dat als de coördinaten in de objectruimte worden gekozen ten opzichte van de oorsprong in het primaire hoofdpunt $H_1$, en de coördinaten in de beeldruimte worden gekozen ten opzichte van de oorsprong in het secundaire hoofdpunt $H_2$, de uitdrukkingen voor het eerste en tweede brandpunt en voor de coördinaten van het beeldpunt in termen van die van het objectpunt identiek zijn aan die voor a dunne lens. Een voorbeeld van beeldvorming door een dikke lens wordt getoond in {numref}`Fig_2_24_Thick_Lens_Imaging`.
```{figure} Images/Chapter_2/2_24_Thick_Lens_Imaging_BW.png
:name: Fig_2_24_Thick_Lens_Imaging

Geometrie van dikke lenzen. Er geldt
	 $f_i=f_o$ als het omgevingsmedium links van de lens hetzelfde is als rechts van de lens. Alle coördinaten in de object- en afbeeldingsruimte zijn ten opzichte van de oorsprong in respectievelijk $H_1$ en $H_2$.
```


(section.Stops)=
### Stops

Een element zoals de rand van een lens of een diafragma dat de verzameling stralen bepaalt die aan het beeld kunnen bijdragen, wordt de **diafragmastop** genoemd. Een gewone camera heeft een variabel diafragma.

De **intredepupil** is het beeld van de diafragmastop door alle elementen links van de diafragmastop. Bij het construeren van de intredepupil worden stralen gebruikt die zich van rechts naar links voortbewegen. Het beeld kan echt of virtueel zijn. Als er zich geen lenzen tussen object en diafragmastop bevinden, is de diafragmastop zelf de intredepupil. Op dezelfde manier is de **uittredepupil** het beeld van de diafragmastop door alle elementen rechts ervan. Dit beeld kan echt of virtueel zijn. De intredepupil bepaalt voor een gegeven object de kegel van stralen in de objectruimte die bijdragen aan het beeld, terwijl de kegel van stralen die de uittredepupil verlaten, de stralen zijn die deelnemen aan de beeldvormingspupil (zie {numref}`Fig_2_25_Aperture_Stop`).

Voor elk objectpunt is de **hoofdstraal** de straal in de kegel die door het midden van de intredepupil gaat, en dus ook door de middelpunten van de diafragmastop en de uittredepupil. Een marginale straal is de straal die voor een objectpunt op de optische as door de rand van de intredepupil gaat (en dus ook door de randen van de diafragmastop en de uittredepupil).

Voor een vaste diameter $D$ van de uittredepupil en voor gegeven $x_o$ is de vergroting van het systeem volgens {eq}`eq.defM1` en {eq}`eq.newton` gegeven door $M=-x_i/f_i=f_i/x_o$. Hieruit volgt dat wanneer $f_i$ wordt verhoogd, de vergroting toeneemt.
Een grotere vergroting betekent een lagere energiedichtheid, dus een langere belichtingstijd, d.w.z. **de snelheid van de lens wordt verminderd**. Cameralenzen worden meestal gespecificeerd met twee getallen: de brandpuntsafstand $f$, gemeten ten opzichte van de uittredepupil en de diameter $D$ van de uittredepupil. Het **$f$-getal** is de verhouding tussen de brandpuntsafstand en deze diameter:


```{math}
:label: eq.fnumber
\boxed{\begin{align*}
\text{f-getal}=f/D.
\end{align*}}
```

Bijvoorbeeld, f-getal$=2$ betekent $f = 2D$. Omdat de belichtingstijd evenredig is met het kwadraat van het f-getal, is een lens met f-nummer 1.4 twee keer zo snel als een lens met f-nummer 2.

```{figure} Images/Chapter_2/2_25_Aperture_Stop_BW.png
:name: Fig_2_25_Aperture_Stop

diafragmastop (A.S.) tussen de tweede en derde lens, met intredepupil en uittredepupil (in dit geval zijn deze pupillen virtuele beelden van de diafragmastop). Ook worden de hoofdstraal en de marginale straal getoond. 
```


## Voorbij Gaussiaanse geometrische optica

### Aberraties
Voor het ontwerpen van geavanceerde optische systemen is Gaussiaanse geometrische optica niet voldoende.
In plaats daarvan moeten niet-paraxiale stralen, waaronder ook niet-meridionale stralen, worden getraceerd met behulp van software op basis van de wet van Snellius met de sinus van de invals- en brekingshoeken. Vaak worden vele duizenden stralen getraceerd om de kwaliteit van een afbeelding te evalueren.
Vervolgens wordt vastgesteld dat de niet-paraxiale stralen elkaar in het algemeen niet kruisen op het ideale Gaussiaanse beeldpunt. In plaats van een enkele vlek wordt een vlekkendiagram gevonden dat min of meer beperkt is. De afwijking van een ideaal puntbeeld wordt gekwantificeerd in termen van **aberraties**. Men maakt onderscheid tussen monochromatische en chromatische aberraties. Deze laatste worden veroorzaakt door het feit dat de brekingsindex afhankelijk is van de golflengte.
Onthoud dat in de paraxiale meetkunde de wet van Snellius {eq}`eq.refrac3` wordt vervangen door: $n_i \theta_i = n_t \theta_t$, d.w.z. $\sin \theta_i$ en $\sin \theta_t$ zijn vervangen door de lineaire termen. Als men in plaats daarvan de eerste twee termen van de Taylor-reeks van de sinus behoudt, kunnen de fouten in het beeld worden gekwantificeerd door vijf monochromatische aberraties, de zogenaamde **primaire** of **Seidel-aberraties**. De bekendste is **bolvormige aberratie**, die wordt veroorzaakt door het feit dat bij een convergente bolvormige lens de stralen die een grote hoek maken met de optische as dichter bij de lens worden gefocusseerd dan de paraxiale stralen (zie {numref}`Fig_2_26_Aberration_Lens`).

```{figure} Images/Chapter_2/2_26_Aberration_Lens_BW.png
:name: Fig_2_26_Aberration_Lens

bolvormige aberratie van een vlak-convexe lens. 
```

**Vertekening** is een van de vijf primaire afwijkingen. Het veroorzaakt vervorming van afbeeldingen vanwege het feit dat de vergroting afhangt van de afstand van het objectpunt tot de optische as.

Voor hoogwaardige beeldvorming moeten de aberraties worden verminderd door meer lenzen toe te voegen en de krommingen van de oppervlakken, de diktes van de lenzen en de afstanden ertussen te optimaliseren. Voor hoogwaardige systemen wordt soms een lens met een asferisch oppervlak gebruikt. Systemen met zeer kleine aberraties zijn extreem duur, vooral als het gezichtsveld groot is, zoals het geval is bij lithografische beeldvormingssystemen die worden gebruikt bij de fabricage van chips, zoals weergegeven in het lithografische systeem in {numref}`Fig_2_27_ASML_EUV`.

Een uitgebreide behandeling van de aberratietheorie is te vinden in Braat et al.<sup>[^3]</sup>.

```{figure} Images/Chapter_2/2_27_ASML_EUV
:name: Fig_2_27_ASML_EUV
De EUV-stepper TWINSCAN NXE:3400B. Lithografisch lenzensysteem voor DUV (192 nm) dat meer dan € 500.000 kost. Straalpaden worden in het paars weergegeven. Het optische systeem bestaat uit spiegels omdat er geen geschikte lenzen zijn voor deze golflengte \footnotesize{(Courtesy of [ASML](https://www.asml.com/en/news/media-library))}.
```

### Diffractie

Volgens een algemeen aanvaard criterium dat als eerste door Rayleigh werd geformuleerd, beginnen aberraties de beelden aanzienlijk te verslechteren als deze padlengteverschillen veroorzaken van meer dan een kwart van de golflengte.
Wanneer de aberraties kleiner zijn dan dit, wordt het systeem **diffraction limited**. genoemd.
```{figure} Images/Chapter_2/2_28_AiryDisk_210308.png
:name: Fig_2_28_AirySpot
Links: dwarsdoorsnede van het veld van het Airy-patroon. Rechts: intensiteitspatroon van het Airy-patroon.
```


Zelfs wanneer de golf die door de uittredepupil wordt uitgezonden perfect bolvormig zou zijn (geen aberraties), bestaat het golffront slechts uit een cirkelvormig gedeelte van een bol, aangezien het veld wordt beperkt door de opening. Een diafragma veroorzaakt **diffractie**, d.w.z. buiging en verspreiding van het licht. Wanneer men een puntobject op de optische as afbeeldt, veroorzaakt diffractie onvermijdelijke vervaging door de zogenaamde Airy-vlek, zoals weergegeven in {numref}`Fig_2_28_AirySpot`. De Airy-vlek is het breedst op de helft van het maximum:

```{math}
:label: eq. Airy_res
\begin{align*}
\text{FWHM} = 0.6 \frac{ \lambda}{\text{NA}},
\end{align*}
```
waarin NA$=\arcsin(a/s_i)$ de numerieke apertuur is (d.w.z. 0<NA<1) met $a$ de straal van de uittredepupil en $s_i$ de beeldafstand zoals voorspeld door Gaussiaanse geometrische optica. Diffractie hangt af van de golflengte en kan daarom niet worden beschreven door geometrische optica, welke alleen van toepassing is op de limiet van de verdwijnende golflengte.  We zullen diffractie door openingen behandelen in {numref}`chapter.diffraction`.



[^1]: Zie hoofdstuk 1 van M. Born \& E. Wolf, "Principles of Optics", Cambridge University Press (2013)

[^2]: Zie ook [https://en.wikipedia.org/wiki/Conic\_section](https://en.wikipedia.org/wiki/Conic_section)

[^3]: J. Braat, P. T&ouml;r&ouml;k, *Imaging Optics*, Cambridge University Press [(2019)](https://doi.org/10.1017/9781108552264)

