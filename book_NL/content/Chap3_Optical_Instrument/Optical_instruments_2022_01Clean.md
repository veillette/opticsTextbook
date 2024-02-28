(chapter.instrument)=
# Optische instrumenten

```{admonition} Wat je moet weten en kunnen na het bestuderen van dit hoofdstuk
- Het werkingsprincipe van een camera.
- De optiek van het oog en zijn accommodatie met het nabije en verre punt.
- De werking van een bril.
- Het principe van het vergrootglas en het oculair en het gebruik ervan in de microscoop en de telescoop.
- De microscoop en het telescoopconcept en de (hoek)vergroting in beide gevallen.
```
Na de behandeling van de wetten van de Gaussiaanse meetkundige optica in het vorige hoofdstuk, kunnen nu complexere systemen op basis van lenzen en reflectoren worden beschouwd.

## De Camera Obscura

De camera obscura of pinhole camera is het eenvoudigste beeldvormende systeem.
Het bestaat uit een gesloten doos met aan één kant een gaatje. Een omgekeerd beeld wordt aan de andere kant van de doos gevormd, zoals weergegeven in {numref}`Fig_3_01_Camera_obscura`.
Als het gat te groot is, is het beeld erg wazig. Ten koste van minder licht kan het beeld scherper worden gemaakt door het diafragma te verkleinen.
De camera obscura kan beelden vormen van objecten over een extreem breed hoekveld als gevolg van een grote scherptediepte en over een groot bereik van afstanden (grote velddiepte), zoals je kunt zien in de rechter afbeelding van {numref}`Fig_3_01_Camera_obscura`.
Als een film zou worden gebruikt om het beeld op te nemen, zijn echter zeer lange belichtingstijden nodig omdat er maar een kleine hoeveelheid licht door het gaatje komt (f-getal= 500). Er wordt aangenomen dat schilders zoals Johannes Vermeer de camera obscura hebben gebruikt om schilderijen van externe scènes te maken.


```{figure} Images/Chapter_3/3_01_Camera_obscura.jpg
:name: Fig_3_01_Camera_obscura
Het principe van de camera obscura (from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Camera_obscura_1.jpg) in Fizyka z. (1910) / Public Domain). Voorbeelden van foto's gemaakt met een camera obscura zijn 
[hier](https://www.pinterest.com/bonfoton/camera-obscura-photographs/) te vinden.
```


## De camera

In {numref}`Fig_3_02_Reflex_camera` wordt een spiegelreflexcamera (SLR) getoond. De naam betekent niet dat er maar één lens in het optische systeem zit, maar dat de fotograaf door dezelfde lenzen kijkt als waarmee de foto is gemaakt, in plaats van door een apart parallel optisch systeem te kijken zoals bij de dubbele reflexcamera.
Na het passeren van de eerste paar lenselementen gaat het licht door een irisdiafragma met instelbare diameter waarmee het $f$-nummer kan worden gewijzigd. Na de lenzen wordt het licht gereflecteerd door een beweegbare spiegel gekanteld op $ 45^o$, gaat door een prisma en verlaat de camera via het zoekeroculair. Wanneer de sluiter wordt losgelaten, sluit het diafragma tot een vooraf ingestelde waarde, zwaait de spiegel omhoog en wordt de CCD belicht. Om de camera scherp te stellen, wordt de hele lens naar of van het detectievlak bewogen. Autofocus is gebaseerd op het maximaliseren van het contrast van de beelden.

```{figure} Images/Chapter_3/3_02_Reflex_camera.png
:name: Fig_3_02_Reflex_camera
digitale spiegelreflexcamera. De gepixelde digitale sensor bevindt zich achter een beweegbare spiegel in een hoek van 45 graden met de optische as. (van [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Reflex_camera_numeric.svg) door Jean François WITZ / CC BY-SA 3.0).
```

Het **hoekveld** (AFOV) is gedefinieerd voor scènes op grote afstanden en is gelijk aan de hoek die door de detector op de lens wordt ingesloten wanneer de beeldafstand gelijk is aan de brandpuntsafstand $f$, d.w.z. het object bevindt zich op oneindig ({numref}`Fig_3_03_AFOV`). De AFOV daalt wanneer $f$ stijgt. Een standaard spiegelreflex heeft een brandpuntsafstand van ongeveer 6 cm met AFOV tussen de 40&deg en 50&deg.

```{figure} Images/Chapter_3/3_03_AFOV.png
:name: Fig_3_03_AFOV
hoekig gezichtsveld
```

Complexere systemen kunnen een variabele brandpuntsafstand hebben door de afstand tussen de lenzen te veranderen, d.w.z. ze kunnen *zoomen* in een scène.

De **scherptediepte** is een bereik van objectafstanden rond een bepaalde afstand waarvoor de beelden op de sensor scherp zijn. De scherptediepte is afhankelijk van het diafragma.
Wanneer het diafragma wijd open staat, zullen stralen die het beeld vormen grotere hoeken maken met de optische as. Wanneer deze stralen afkomstig zijn van objecten op verschillende afstanden, zullen ze voor een groot diafragma meer wazige beelden op de sensor veroorzaken (zie {numref}`Fig_3_04_Lego_Depth`). Wanneer het diafragma wordt verkleind, is dit effect minder en daarom impliceert een kleiner diafragma een grotere scherptediepte.
Het nadeel is dat er minder licht op de sensor komt, waardoor een langere belichtingstijd nodig is.


```{figure} Images/Chapter_3/3_04_Lego_Depth.jpg
:name: Fig_3_04_Lego_Depth
Vier foto's gemaakt met een ander diafragma en een ander brandpuntsvlak. De afbeelding rechtsonder is gemaakt met een klein diafragma en de hele afbeelding ziet er duidelijk uit: (foto's gemaakt door Aur&eacute;le J.L. ADAM / CC BY-SA).
```


## Camera in een smartphone
Een camera in een smartphone kan standaard **double Gauss** of **Cook triplet** lenzen bevatten en soms meer geavanceerde asferen. De beeldsensor is een CMOS-apparaat.
Tegenwoordig hebben smartphones autofocussystemen waarbij de lens met behulp van verschillende criteria naar de sensor toe of van de sensor wordt bewogen. Bij de standaard contrastdetectie autofocus wordt de lens bewogen totdat het contrast in het beeld het grootst is. Deze trial-and-error-methode is relatief traag: het duurt meestal 1 seconde om scherp te stellen. In high-end camera's wordt zogenaamde fasedetectie autofocus gebruikt, waarbij de relatieve positie van twee spots wordt geanalyseerd die wordt verkregen door het scherpstellen van twee kleine diafragma's aan weerszijden van de optische as.
Een derde autofocussysteem is vergelijkbaar met radar. Er wordt een infrarood laserpuls uitgezonden en de afstand van het object van belang wordt bepaald aan de hand van de terugkeertijd van de gereflecteerde puls.
De methode werkt zeer goed bij weinig licht, maar is niet nauwkeurig voor objecten op afstanden van meer dan 5 m. In alle smartphonecamera's worden wazige beelden verscherpt door nabewerking met behulp van software.

## Het menselijk oog

Het oog is een adaptief beeldvormingssysteem.

Het menselijk oog bestaat uit een bijna bolvormige (24 mm lang en 22 mm breed) gelatineuze substantie genaamd het **vitreous humor** met brekingsindex 1,337, omgeven door een witte schelp, de **sclera** ({numref}`Fig_3_05_Three_Internal_chambers_of_the_Eye`). Aan de voorkant heeft de sclera een opening met een transparante lens die het **hoornvlies** wordt genoemd, met voor groen licht een brekingsindex van 1,376. Het grootste deel van de afbuiging van de stralen vindt plaats op het grensvlak tussen lucht en hoornvlies en daarom is het moeilijk om onder water te zien ($n_{water}=1.33$).

```{figure} Images/Chapter_3/3_05_Three_Internal_chambers_of_the_Eye.png
:name: Fig_3_05_Three_Internal_chambers_of_the_Eye
dwarsdoorsnede van een menselijk oog (uit [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Three_Internal_chambers_of_the_Eye.png) door Holly Fischer / CC BY).
```

Na het passeren van het hoornvlies bereiken de stralen het **aqueous humour** ($n\approx. $ 1.336) met de **iris** of pupil. Het kan uitzetten of inkrimpen van een diameter van 2 mm (felle zon) tot 8 mm (weinig licht) om zich aan te passen aan de lichtintensiteit. De iris geeft kleur aan het oog. Na de iris bereiken de stralen de flexibele **kristallijne lens** die de grootte heeft van een boon (9 mm in diameter en 4 mm dik in ontspannen toestand). De brekingsindex varieert van 1,406 in het midden tot 1,386 aan de rand.

```{figure} Images/Chapter_3/3_06_Focus_in_an_eye_a.png
```
```{figure} Images/Chapter_3/3_06b_Accomodation_eye.png
:name: Fig_3_06_Eye
Left: Optische stralen die laten zien hoe een oog zich aanpast door de brandpuntsafstand te veranderen. Rechts: Ontspannen en samengetrokken spier bij de kristallijne lens die nodig is voor deze accommodatie.(Links: aangepast van [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Focus_in_an_eye.svg) Erin Silversmith / BY-NC-SA 2.5 Generiek. Rechts: bewerking van Sjaastad O.V., Sand O. en Hove K. (2010) Physiology of domestic animals, 2nd edn., Oslo: Scandinavian Veterinary Press).
```


### Werking van het oog
Het hele oog kan nauwkeurig worden behandeld als twee lenzen die met elkaar in contact komen, waarvan de tweede lens de brandpuntsafstand kan veranderen. Maar vaak wordt het systeem benaderd door slechts één lens en dit is ook wat we hieronder zullen doen.
In ontspannen toestand is de brandpuntsafstand van het objectsysteem $f_o=16$ mm, gemeten vanaf het hoornvlies, terwijl de brandpuntsafstand van het beeld gelijk is aan de lengte van het oog: $f_i=24$ mm. Deze brandpuntsafstanden zijn verschillend, omdat de brekingsindices van het omringende medium (lucht en glasvocht) verschillen. De sterkte van het gezonde, ontspannen oog is volgens {eq}`eq.matthinlens`, {eq}`eq.matthinlens2`:

```{math}
:label: eq. EyePower
\begin{align*}
\mathfrak{D} =\frac{n_{vh}}{f_i}= \frac{1.337}{0.024}= 55 \text{ Dioptrie}.
\end{align*}
```

In ontspannen toestand focust de lens licht dat van oneindig komt op het netvlies. Wanneer het object dichterbij is, trekken de oogspieren samen, waardoor de kristallijne lens boller wordt en de brandpuntsafstand van het systeem afneemt,
zoals te zien aan de rechterkant van {numref}`Fig_3_06_Eye`.
Op een gegeven moment zal het object te dichtbij zijn om op het netvlies te worden scherpgesteld. Dit wordt het **near point** van het oog genoemd.
Door het verlies van elasticiteit van de spier gaat het nabije punt van 7 cm voor tieners naar 100 cm voor een 60-jarige. {numref}`Fig_3_06_Eye` toont de optische stralen die de ogen binnenkomen, voor twee configuraties: een object op oneindig en een object in de buurt. Het **loodrechte nabije punt** wordt gedefinieerd als op een afstand van 25 cm van het oog. Het **verre punt** is het verste object dat door het ontspannen oog op het netvlies wordt afgebeeld. Voor een normaal oog is het verre punt op oneindig.

### Netvlies

Het netvlies bestaat uit ongeveer 125 miljoen fotoreceptorcellen: de **staafjes** en de **kegeltjes**. De staafjes zijn zeer gevoelige zwart-wit (intensiteits)sensoren, terwijl de kegeltjes kleurgevoelig zijn voor de golflengten 390 nm - 780 nm. UV-licht wordt geabsorbeerd door de lens (mensen van wie de lens is verwijderd vanwege cataract kunnen UV-licht "zien"). De fovea centralis is het meest gevoelige centrum van het netvlies met een hoge dichtheid aan kegeltjes. De ogen bewegen continu om het beeld op dit gebied te focussen. De informatie wordt overgedragen door de oogzenuw, die aan de achterkant van het oog is geplaatst, waar het een blinde vlek veroorzaakt.

### Dioptrische sterkte van een lens

Voor een enkel brillenglas wordt de dioptriesterkte bepaald door:

```{math}
\begin{align*}
\mathfrak{D} = \dfrac{n_m}{f}=(n_l-n_m)\left(\dfrac{1}{R_1}-\dfrac{1}{R_2}\right)
\end{align*}
```
met $R_1$ en $R_2$ de stralen van de dunne lens in meter, $n_l$ is de brekingsindex van de lens en $n_m$ die van het omgevingsmedium.
(Wanneer de media links en rechts van de lens verschillend zijn, moeten de brekingsindex rechts van de lens en de rechter brandpuntsafstand worden genomen).
Voor twee lenzen die met elkaar in contact staan, wordt de brandpuntsafstand gegeven door:

```{math}
\begin{align*}
\dfrac{1}{f}=\dfrac{1}{f_1}+\dfrac{1}{f_2},
\end{align*}
```
Vandaar dat de gecombineerde sterkte van de twee lenzen die met elkaar in contact komen de som is van de individuele sterktes:

```{math}
\begin{align*}
\mathfrak{D} = \mathfrak{D_1}+\mathfrak{D_2}
\end{align*}
```
Een positieve lens met een brandpuntsafstand $f_1$=10 cm lucht heeft een dioptriesterkte van $\mathfrak{D_1}=10$ dioptrie. Als het in contact komt met een negatieve lens van dioptriesterkte $\mathfrak{D_2}=-10$ dioptrie, is het resulterende vermogen $\mathfrak{D}=0$, gelijk aan een parallelle glasplaat.


### Brillen

Het oog kan last hebben van onvolkomenheden zoals te zien is in {numref}`Fig_3_07_eye_correction`. We bespreken de meest voorkomende onvolkomenheden en hun oplossingen.




**a. Myopia of bijziendheid**.
Een bijziend oog heeft te korte brandpuntsafstanden (heeft een te hoge sterkte). Objecten in de verte worden door het ontspannen oog voor het netvlies scherpgesteld. Het verre punt ligt dus niet op oneindig, maar dichterbij. Dit kan worden gecorrigeerd door een negatieve lens. Stel dat het uiterste punt op 2 m ligt. Als de holle lens een virtueel beeld maakt van een object in de verte op een afstand van 2 m voor het hoornvlies, kan het ontspannen oog dit duidelijk zien. De lenswet {eq}`eq.lensmaker`, met $s_o=-\infty$ impliceert dan $f_i=s_i= -2$ m. Daarom is de vereiste sterkte van de lens:

```{math}
:label: eq. Bijziendheid
\begin{align*}
\mathfrak{D} =\frac{1}{f}= -0.5 \; \text{dioptrie}.
\end{align*}
```
De lens kan het beste in het voorste brandpuntsvlak van het ontspannen oog worden geplaatst, d.w.z. op ongeveer 16 mm voor het hoornvlies. Dit volgt uit {eq}`eq.lensmaker` en het feit dat de afstand van het netvlies tot de ooglens ongeveer 22 mm is, terwijl de brekingsindex van het virtrous humor 1.337 is. Vandaar dat de brandpuntsafstand in de lucht van het ontspannen oog van $ 22/1.337 \approx 16 \mbox {mm} $. De reden om de lens op brandpuntsafstand te zetten is dat in dit geval de vergroting van het oog en de negatieve lens samen hetzelfde zijn als voor het ongecorrigeerde oog. Om dit te zien, trek je een straal van de bovenkant van het object door het midden van de negatieflens. Dit wordt dan evenwijdig aan de optische as gemaakt door de ooglens; De afstand van deze straal tot de optische as is de beeldgrootte op het netvlies. Deze straal zal op hetzelfde punt van het netvlies terechtkomen als wanneer de negatieve lens wordt verwijderd, omdat deze niet door deze lens wordt gebroken.
Contactlenzen zitten heel dicht bij de ooglens en daarom is de totale sterkte van het oog met een contactlens gewoon de som van de sterkte van het oog en de contactlens.



**b. Hyperopia of verziendheid**.
In dit geval wordt een object in de verte afgebeeld door het ontspannen oog achter het netvlies, d.w.z. de achterste brandpuntsafstand van het ontspannen oog is groter dan de diepte van het oog. Nabije objecten kunnen niet op het netvlies worden afgebeeld, vandaar dat het nabije punt relatief ver van het hoornvlies verwijderd is. Om de stralen meer te buigen, wordt een positieve lens voor het oog geplaatst. Stel dat een verziend oog een nabijheidspunt heeft op een afstand van 125 cm. Om ervoor te zorgen dat een object op het normale nabije punt $s_o=-25$ cm een virtueel beeld heeft op $s_i=-125$ cm, zodat het kan worden gezien, moet de brandpuntsafstand van de positieve lens voldoen aan

```{math}
:label: eq.fconv
\begin{align*}
\frac{1}{f}=-\frac{1}{s_o}+\frac{1}{s_i}= \frac{1}{0.25}-\frac{1}{1.25} =\frac{1}{0.31},
\end{align*}
```
vandaar dat de sterkte $\mathfrak{D}=1/f=+3.2$ dioptrie moet zijn.

```{figure} Images/Chapter_3/3_07_Eye_correction.png
:name: Fig_3_07_eye_correction
Correctie van verziend (links) en bijziend (rechts) oog (aangepast van [Wikimedia Commons](https://en.wikipedia.org/wiki/File:Myopia_and_lens_correction.svg) door Gumenyuk I.S. / CC BY-SA 4.0).
```





**c. Presbyopie.**
Dit is het gebrek aan accommodatie van het oog, zoals gebruikelijk is bij mensen boven de 40. Het resulteert in een toename van de afstand tussen het nabije punt en het hoornvlies. Dit defect is van invloed op alle afbeeldingen. Presbyopie wordt meestal gecorrigeerd door een bril met progressieve correctie, waarbij het bovenste deel van het glas wordt gebruikt voor veraf zien en het onderste deel voor dichtbij zien.




**d. Astigmatisme.**
In dit geval zijn de brandpuntsafstanden voor twee richtingen loodrecht op de optische as verschillend.
Het wordt toegeschreven aan een gebrek aan symmetrie van de omwenteling van het hoornvlies. Dit wordt gecompenseerd door het gebruik van een bril die zelf astigmatisch is.

### Nieuwe correctietechniek
Om oogafwijkingen zoals bijziendheid en astigmatisme te corrigeren, is de afgelopen jaren technologie ontwikkeld om de lokale krommingen van het oppervlak van het hoornvlies te veranderen met behulp van een excimerlaser. De laser is computergestuurd en veroorzaakt foto-ablatie in delen van het hoornvlies.



## Vergrootglazen
Een vergrootglas zorgt voor een beeld op het netvlies dat groter is dan zonder het vergrootglas. In principe kan het beeld op het netvlies worden vergroot door het object simpelweg dichter bij het oog te brengen (verklein $|s_o|$ bij vaste $s_i$). Maar $|s_o|$ kan niet kleiner zijn dan het nabije punt $d_o$, dat we hier op 25 cm houden. Het is wenselijk om een lens te gebruiken die een vergroot rechtopstaand beeld maakt op een afstand van het oog groter dan $d_o$. Dit kan worden bereikt door een positieve lens met het object dichter bij de lens dan het eerste brandpunt, waardoor een vergroot virtueel beeld wordt geproduceerd.
Een voorbeeld wordt gegeven in {numref}`Fig_3_08_magnifier_gruffalo`.


```{figure} Images/Chapter_3/3_08_magnifier_gruffalo_small.png
:name: Fig_3_08_magnifier_gruffalo
Voorbeeld van een positieve lens die als vergrootglas wordt gebruikt (foto gemaakt door A.J.L. Adam / CC-BY-SA 4.0).
```


### Vergrotingskracht
De **vergrotingskracht** $\text{MP}$ of **hoekvergroting** $M_a$ wordt gedefinieerd als de verhouding tussen de grootte van het netvliesbeeld verkregen met het instrument en de grootte van het netvliesbeeld zoals gezien door het blote oog op normale kijkafstand $d_o$.
Om de grootte van het netvliesbeeld te schatten, vergelijken we in beide gevallen waarin **de hoofdstraal door de bovenkant van het object en het midden van de pupil van het oog het netvlies raakt**. Aangezien de afstand tussen de ooglens en het netvlies vast is, is de verhouding van de beeldgrootte op het netvlies voor het oog met en zonder vergrootglas:

```{math}
\begin{align*}
\text{MP}=\dfrac{\alpha_a}{\alpha_u},
\end{align*}
```
waarin $\alpha_a$ en $\alpha_u$ de hoeken zijn tussen de optische as en de hoofdstralen voor respectievelijk het hulp- en het niet-ondersteunde oog, zoals weergegeven in {numref}`Fig_3_09_Magnifier`. Het werken met deze hoeken in plaats van afstanden is vooral handig wanneer het virtuele beeld van het vergrootglas op oneindig staat.
Gebruik van $\alpha_a\approx y_i/L$ en $\alpha_u\approx y_0/d_0$ met $y_i$ en $y_0$ positief en $L$ de positieve afstand van het beeld tot het oog (met als eis : $L\geq d_o$), vinden we

```{math}
:label: eq. MP
\begin{align*}
\text{MP}=\dfrac{y_id_0}{y_0 L}.
\end{align*}
```
Sinds $s_i<0$ en $f_o<0$ hebben we,

$$
\frac{y_i}{y_o} = \frac{s_i}{s_o} = 1 + \frac{s_i}{f_o},
$$

waar we de lensvergelijking gebruikten voor het vergrootglas. We hebben $s_i = -|s_i|=-(L-\mathcal{l})$, waarbij
$\mathcal{l}$ de afstand is tussen het vergrootglas en het oog. Vandaar
{eq}`eq. MP` wordt:

```{math}
:label: eq.mP2
\begin{align*}
\text{MP} &= \frac{d_0}{L} \left[ 1 + \frac{L-\mathcal{l}}{|f_o|} \right]  \\
&= \frac{d_0}{L} \left[ 1 + {\cal P}\left(L-\mathcal{l}\right) \right],
\end{align*}
```
waarbij ${\cal P}$ de kracht van het vergrootglas is.


```{figure} Images/Chapter_3/3_09_Magnifier.png
:name: Fig_3_09_Magnifier
Een weergave zonder hulp (boven) en een ondersteunde weergave met een vergrootglas.
```


We onderscheiden drie situaties:
1. $\mathcal{l}=|f_o|$: de vergrotende kracht is dan $\text{MP}=d_0{\cal P}$.
2. $\mathcal{l}=0$: waardoor dat $L=d_0$ het kleinst is, terwijl $\text{MP}$ maximaal is:

```{math}
\begin{align*}
\text{MP}|_{\mathcal{l}=0,L=d_0}=d_0{\cal P}+1.
\end{align*}
```
3. Het object bevindt zich in het brandpunt van het vergrootglas ($s_0=f_o$), zodat het virtuele beeld op oneindig staat ($L=\infty$) en dus

```{math}
:label: eq. MPinfinity
\begin{align*}
\text{MP}|_{L=\infty}=d_0{\cal P},
\end{align*}
```
voor elke afstand $\mathcal{l}$ tussen het oog en het vergrootglas. De stralen zijn evenwijdig, zodat het oog het object op een ontspannen manier bekijkt. Dit is het meest voorkomende gebruik van het vergrootglas.

In de praktijk is $d_0 {\cal P}=d_o/|f_o|$ veel groter dan 1, zodat $\text{MP}$ in de drie gevallen gelijk is.

### Nomenclatuur

Normaal gesproken worden vergrootglazen uitgedrukt in termen van de vergrotingssterkte wanneer $L=\infty$ (geval 3 hierboven). Een vergrootglas met een sterkte van 10 dioptrie heeft bijvoorbeeld een $\text{MP}$ gelijk aan 2,5 of $2,5\times$. Met andere woorden, het beeld is 2,5 keer groter dan het zou zijn als het object zich in de buurt van het blote oog zou bevinden.

## Oculairs

Een **oculair** is een vergrootglas dat voor het oog wordt gebruikt aan het uiteinde van een ander optisch instrument zoals een microscoop of een telescoop. Het oog kijkt in het oculair en het oculair "kijkt" in het optische instrument.
Het oculair geeft een vergroot virtueel beeld van het beeld dat door het optische instrument wordt geproduceerd. Net als bij het vergrootglas moet het virtuele beeld bij voorkeur op of in de buurt van oneindig zijn om met een ontspannen oog te kunnen worden bekeken. Er bestaan verschillende soorten oculairs en de meeste bestaan uit twee lenzen:
1. de veldlens, de eerste lens in de oculaire;
2. de ooglens, die zich het dichtst bij het oog bevindt op een vaste afstand die de **oogafstand** wordt genoemd.
De opening van het oculair wordt geregeld door een veldstop.
Een voorbeeld wordt gegeven in {numref}`Fig_3_10_EyePiece`.

```{figure} Images/Chapter_3/3_10_EyePiece.png
:name: Fig_3_10_EyePiece
Voorbeeld van een oculair bestaande uit drie lenzen. 1) Echt beeld, 2) velddiafragma, 3) oogafstand, 4) oogpupil (aangepast van [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Exitpupil.png) door Tamas-flex / CC BY-SA 3.0).
```


## De samengestelde microscoop
Een vergrootglas alleen kan alleen een zeer hoge vergroting bieden ten koste van extreme aberraties.
De **samengestelde microscoop** is een vergrootglas van nabije objecten met een hoge hoekvergroting, over het algemeen meer dan $30\times$. Het werd in 1590 uitgevonden door Zacharias Janssen in Middelburg (maar deze bewering wordt betwist). Het eerste element van de samengestelde microscoop is een objectief (in {numref}`Fig_3_11_Compound_Microscope` een eenvoudige positieve lens) dat een echt, omgekeerd en vergroot beeld maakt van het object in het voorste brandpuntsvlak van een oculair (waar zich ook de veldstop bevindt). Het oculair maakt een virtueel beeld op oneindig, zoals hierboven uitgelegd.


```{figure} Images/Chapter_3/3_11_Compound_Microscope.png
:name: Fig_3_11_Compound_Microscope
Eenvoudige samengestelde microscoop. Het objectief vormt een reëel beeld van een object in de buurt. Het oculair vergroot dit tussenbeeld. Het uiteindelijke beeld kan groter zijn dan de loop van het apparaat, omdat het virtueel is.
```


Het vergrotend vermogen van het gehele systeem is het product van de transversale lineaire vergroting van het objectief $M_{T}$ en de hoekvergroting van het oculair $M_{Ae}$:

```{math}
\begin{align*}
\text{MP}=M_{T}M_{Ae}.
\end{align*}
```
Volgens {eq}`eq.defM1` geldt: $M_{T}=\mathbin{-} x_i/f_i^{obj}$, waarbij $x_i$ de afstand is van het beeld dat door het objectief wordt gemaakt tot het achterste brandpuntsvlak met brandpuntsafstand $f_i^{obj}$. We hebben $x_i=L$ wat de buislengte is, d.w.z. de afstand tussen het tweede brandpunt van het objectief en het eerste brandpunt van het oculair. De buislengte is gestandaardiseerd op 16 cm.
Bovendien blijkt uit {eq}`eq. MPinfinity` dat de hoekvergroting voor een virtueel beeld op oneindig gelijk is aan: $M_{Ae}=d_o/f_i^e$. Zo verkrijgen we:

```{math}
\begin{align*}
\text{MP}=\frac{\mathbin{-} x_i}{f_i^{obj}} \frac{d_o}{f_i^e} = \dfrac{\mathbin{-} 16}{f_0}.\dfrac{25}{f_e},
\end{align*}
```
met de standaard near-point $d_o=$25 cm. Een Amici-objectief geeft bijvoorbeeld $40 \times$ en in combinatie met een $10\times$ oculair krijgt men $MP=400$.\\
De **numerieke apertuur** van een microscoop is een maat voor het vermogen om licht van het object te verzamelen.
Het wordt gedefinieerd door:

```{math}
\begin{align*}
\text{NA} = n_{im} \sin\theta_{max}
\end{align*}
```
met $n_{im}$ de brekingsindex van het onderdompelingsmedium, meestal lucht, maar het kan ook water of olie zijn, en $\theta_{max}$ de halve hoek van de maximale lichtkegel die door de lens wordt geaccepteerd. De numerieke apertuur is het tweede getal dat in de loop van het objectief is geëtst. Het varieert van 0,07 (objectieven met laag vermogen) tot 1,4 voor objectieven met hoog vermogen. Houd er rekening mee dat dit afhangt van de objectafstand. In hoofdstuk 7 wordt uitgelegd dat $\text{NA}$ voor een gegeven objectafstand evenredig is met het oplossend vermogen, dat is de minimale transversale afstand tussen twee objectpunten die in de afbeelding kan worden weergegeven.
 

## De telescoop


Een telescoop vergroot het netvliesbeeld van een object in de verte. Net als een samengestelde microscoop is het ook samengesteld uit een objectief en een oculair, zoals te zien is in {numref}`Fig_3_12_Kepler_Telescope`.

```{figure} Images/Chapter_3/3_12_Kepler_Telescope.png
:name: Fig_3_12_Kepler_Telescope
Kepleriaanse astronomische telescoop. 
```

Het object in deze figuur bevindt zich op een grote maar eindige afstand; Daarom wordt een beeld gevormd door het objectief net na het tweede brandpunt. Het oculair maakt een virtueel vergroot beeld, dat met een ontspannen oog kan worden bekeken. Daarom moet het tussenliggende beeld van het objectief zich binnen de brandpuntsafstand $f_i^e$ van het oculair bevinden. Het uiteindelijke beeld is omgekeerd.\\
Zoals eerder gezien, is de hoekvergroting: $\text{MP} = \alpha_a/\alpha_u$ waarbij $\alpha_u$ de halve hoek van de lichtkegel is die zonder telescoop zou worden opgevangen en $\alpha_a$ de halve hoek van de virtuele kegel van stralen afkomstig is van het virtuele beeld van het oculair. Voor een object op oneindig vinden we, rekening houdend met de driehoeken $F_{o}^{obj}AB$ en $F_i^{e}CD$ in {numref}`Fig_3_13_Rays_Telescope` dat

```{math}
:label: eq. MPtelescoop
\begin{align*}
\text{MP} = -\frac{f_i^{obj}}{f_i^e}.
\end{align*}
```
(Het minteken is omdat de afbeelding omgekeerd is).


```{figure} Images/Chapter_3/3_13_Rays_Telescope.png
:name: Fig_3_13_Rays_Telescope
straalhoeken voor een telescoop
```


