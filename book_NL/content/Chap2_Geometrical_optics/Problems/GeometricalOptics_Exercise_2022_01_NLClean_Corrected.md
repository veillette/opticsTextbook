## Opgaven

1. Principe van de wet van Fermat en de wet van Snellius. 

Beschouw een laag met een dikte $d$ en brekingsindex $n_2$ die is ingeklemd tussen twee halve ruimtes met brekingsindex $n_1$ en $n_3$ zoals weergegeven in {numref}`Fig_2_29_Slab`.
Een straal van punt $P=(x_P,y_P)$ met $y_P>d$ gaat door punt $Q=(x_Q,y_Q)$ met $y_Q<0$.

```{figure} Images/Tutorial_2/2_29_Slab_BW.png
:name: Fig_2_29_Slab
Een straal door punten $P$ en $Q$.
```

- **a)** Schrijf een formule voor de OPL van de straal van $P$ tot $Q$ zoals weergegeven in {numref}`Fig_2_29_Slab`.

- **b)** Bepaal de vergelijkingen waaraan moet worden voldaan door $x_A$ en $x_B$ zodanig dat de OPL minimaal is.
Tip: stel de partiële afgeleiden van de OPL ten opzichte van $x_A$ en $x_B$ gelijk aan nul.
 
- **c)** Druk de vergelijkingen die zijn afgeleid onder b) uit in termen van $\sin \theta_1$, $\sin \theta_2$ en $\sin \theta_3$ en leid af dat de wet van Snellius geldt voor de hoeken $\theta_1$ en $\theta_3$:

```{math}
:label: eq.Snel13
\begin{align*}
n_1 \sin \theta_1 = n_3 \sin \theta_3.
\end{align*}
```
Merk op dat de relatie tussen $\theta_3$ en $\theta_1$ onafhankelijk is van de brekingsindex $n_2$ en de dikte $d$ van de middelste laag.
 
- **d)** Houdt de wet van Snellius {eq}`eq.Snell13` ongeacht het aantal lagen en hun diktes tussen de twee halve ruimten?
Leg je antwoord uit.
 
- **e)** Leid {eq}`eq.Snell13` af door gebruik te maken van de randvoorwaarden voor de tangentiële componenten van het elektromagnetische veld, zoals beschreven in [Maxwell Boundary Conditions](section.bcmaxwell).

2. Perfecte scherpstelling door een ellipsoïde en een hyperboloïde. 

Stel dat er twee media zijn met brekingsindices $n_1>n_2$ en dat punt $S$ op oneindig ligt in het medium met brekingsindex $n_2$. We zullen een oppervlak (interface) construeren tussen de twee media zodanig dat alle stralen van $S$ in hetzelfde punt $F$ worden gefocusseerd (zie {numref}`Fig_2_07_Focus-Right`a). Omdat $S$ op zeer grote afstand ligt, zijn de stralen die van rechts binnenkomen evenwijdig. Aangezien alle evenwijdige stralen dezelfde afstand hebben afgelegd wanneer ze het oppervlak raken $DD'$ loodrecht op de stralen, hebben alle evenwijdige stralen dezelfde fase op hun snijpunten met het vlak $DD'$.
- **a)** Als punt $A$ op de gezochte interface staat, leid dan af dat

```{math}
:label: eq.hyper1
\begin{align*}
\frac{n_2}{c} |DA| + \frac{n_1}{c}|AF| = \text{constant},
\end{align*}
```
De constante is hetzelfde voor alle punten $A$ op de interface.

- **b)** Laat zien dat door het vlak $DD'$ evenwijdig aan zichzelf te verplaatsen, we kunnen bereiken dat we voor het nieuwe vlak $DD'$ krijgen:

- **c)** Stel dat vervolgens $n_2>n_1$. zoals rechts van {numref}`Fig_2_07_Focus-Right`. Laat zien dat nu, met hetzelfde argument als hierboven, de interface een hyperboloïde is met $F$ als een van de focuspunten.


```{figure} Images/Chapter_2/2_07_Focus-Left.png
:name: Fig_2_07_Focus-right
(a) Ellipsoïde ($n_2<n_1$) en (b) hyperboloïde ($n_2>n_1$) om een parallelle bundel die van het medium valt met brekingsindex $n_2$ perfect te focussen op een punt in een medium met brekingsindex $n_1$.
```

- **d)** Gebruik de vorige resultaten om een lens te beschrijven met een brekingsindex $n_2>n_1$ en met hyperboloïde oppervlakken die twee gegeven punten S en P in het omgevingsmedium perfect weergeeft met een brekingsindex $n_1$.

```{figure} Images/Chapter_2/2_08_Perfect_Imaging.png
:name: Fig_2_08_Perfect_Imaging
Een lens met hyperboloïde oppervlakken voor perfecte beeldvorming van een paar punten.
```



3. Perfecte scherpstelling door een parabolische spiegel

Vervolgens beschouwen we de perfecte scherpstelling van parallelle stralen in lucht ($n=1$) door een spiegel.
Stel dat er een evenwijdige bundel stralen in de lucht is ($n=1$) en stel dat we alle stralen in punt $F$ willen focussen.

- **a)** We tekenen een vlak $\Sigma_1$ loodrecht op de stralen zoals weergegeven in {numref}`Fig_2_09_Para_Mirror`. De stralen die $\Sigma_1$ raken, hebben dezelfde optische weglengte afgelegd.
Teken een tweede oppervlak $\Sigma_2$ evenwijdig aan $\Sigma_1$. Denk aan stralen die de spiegel raken in $A_1$ en $A_2$.
Leid af dat

```{math}
:label: eq.parmir1
\begin{align*}
\text{OPL}=|W_1A_1| + |A_1F|= |W_2A_2| + |A_2F|.
\end{align*}
```
- **b)** Leid af dat

```{math}
:label: eq.parmir2
\begin{align*}
|W_1A_1| + |A_1D_1|= |W_2A_2| + |A_2D_2|.
\end{align*}
```
- **c)** Laat zien dat
{eq}`eq.parmir1` is voldaan voor punten $A$ waarvoor $|AF|=|AD|$,
en concludeer dat de spiegel een paraboloïde is met $f$ als focus en $\Sigma_2$ als diretrix.

```{figure} Images/Chapter_2/2_09a_Paraboloid_mirror_BW
:name: Fig_2_09_Para_Mirror
Een paraboloïde spiegel.
```



4. Beeldvorming van een virtueel object. 

Een virtueel object bevindt zich op een afstand $d_0$ achter een convergerende lens. De convergerende invallende stralen links van de lens, die overeenkomen met het virtuele object, worden weergegeven in {numref}`Fig_2_30_Virtual_Object`. De lens heeft een brandpuntsafstand $f$.

```{figure} Images/Tutorial_2/2_30_VirtualObject.png
:name: Fig_2_30_Virtual_Object
Een object wordt gemaakt door inkomende stralen.
```

- **a)** Construeer de afbeelding wanneer $f=2$ cm, $d_0=4$ cm en de hoogte van het object is 1 cm.

- **b)** Is de afbeelding echt of virtueel? Omgekeerd of rechtop?

- **c)** Bereken de locatie van de afbeelding met behulp van de lensformule en vergelijk deze met je tekening. Wat is de vergroting?
 
5. Stel dat we twee dunne lenzen ${\cal L}_1$ en ${\cal L}_2$ hebben. Lens ${\cal L}_1$ is convergent (d.w.z. positief) met brandpuntsafstand $f_1>0 $ en lens ${\cal L}_2$ is divergent (d.w.z. negatief) met brandpuntsafstand $f_2<0$. De afstand tussen de lenzen is $d$.
Laat er een object op afstand $2f_1$ voor lens ${\cal L}_1$ zijn, zoals weergegeven in {numref}`Fig_2_32_Two_Thin_Lenses_C_D`.

```{figure} Images/Tutorial_2/2_32_Two_Thin_Lenses_C_D.png
:name: Fig_2_32_Two_Thin_Lenses_C_D
figuur die overeenkomt met oefening "Een convergente en divergente lens".
```


- **a)** Leid de voorwaarde af op de afstand $d $ tussen de lenzen, zodat het uiteindelijke beeld echt is.
 
- **b)** Laat $f_1=3 \text{ cm}$ en $f_2=-2 \text{ cm}$.
Wat moet de afstand $d $ zijn, zodat het uiteindelijke beeld echt is en de vergroting 2 is?
 
6. Systeemmatrix voor beeldvorming door een bolvormig oppervlak. 

Beschouw een bolvormig oppervlak met een kromtestraal $R$ met links (rechts) van het oppervlak een medium met brekingsindex $n_1$ ($n_2$).
- **a)** Leid de straalmatrix af tussen een vlak links van het oppervlak en op een afstand van $d_1$ tot het hoekpunt, en een vlak rechts van het oppervlak met een afstand van $d_2$ tot het hoekpunt. (Zoals altijd wordt aangenomen dat de stralen zich van links naar rechts voortplanten).
 
- **b)** Leid de voorwaarden af waardoor het vlak op afstand $d_2$ het beeld is van het vlak op afstand $d_1$. Druk de formule uit in coördinaten $s_o=-d_1$, $s_i=d_2$ ten opzichte van het hoekpunt als oorsprong en laat zien dat het resultaat identiek is aan formule {eq}`eq.one_surface2`
 
- **c)** Stel dat $n_1=1$, $n_2=2$ en $R= 2$ cm.
Toon door constructie met behulp van de paraxiale versie van de wet van Snellius aan dat wanneer het object virtueel is met $s_o=-4$ cm, de coördinaat van het beeldpunt wordt gegeven door $s_i= 8$ cm, in overeenstemming met de formule afgeleid in b).

- **d)** Construeer de afbeelding opnieuw wanneer $s_o=-4$ cm maar nu voor het geval dat $R=-2$ cm en controleer of de coördinaat $s_i$ van het afbeeldingspunt overeenkomt met de formule die in b is afgeleid).


7. Het doel van dit probleem is om de formule van de Lensmaker voor een dunne lens af te leiden door de beeldformule van een bolvormig oppervlak twee keer toe te passen.
De afbeelding $P$ van een punt $S$ zoals weergegeven in {numref}`Fig_2_33_Spherical_Lens` wordt in twee stappen berekend. Eerst wordt het tussenliggende beeld $P'$ van $S$ door het bolvormige oppervlak met hoekpunt $V_1$ berekend en vervolgens wordt dit tussenliggende beeld afgebeeld door het bolvormige oppervlak met het hoekpunt $V_2$.

```{figure} Images/Tutorial_2/2_33_Spherical_Lens.png
:name: Fig_2_33_Spherical_Lens
Een sferische lens gemaakt van glas van index $n_l$ in een medium van index $n_m$. Het punt $S$ wordt weergegeven in $P$.
```


- **a)** Gebruik {eq}`eq.one_surface2` om af te leiden dat wanneer $S$ door het eerste bolvormige oppervlak wordt afgebeeld alsof het tweede bolvormige oppervlak afwezig is, de afbeelding $P'$ $z$-coördinaat $s_{i1}$ ten opzichte van de oorsprong in $V$, van $S$, voldoet aan:

$$
-\frac{n_m}{s_{o1}}+\frac{n_l}{s_{i1}} =\frac{n_l-n_m}{R_1},

$$
waarin $s_{o1}$ de $z$-coördinaat is van $S$ ten opzichte van de oorsprong in $V$.
 
- **b)** Toon aan dat ten opzichte van de oorsprong bij $V_2$ de $z$-coördinaat van $P'$ gelijk is aan

$$
s_{o2}= s_{i1}-d.

$$
 
- **c)** Toon aan dat de $z$-coördinaat $s_{i2}$ van P t.o.v. de oorsprong op $V_2$ voldoet aan

$$
-\frac{n_l}{s_{o2}}+\frac{n_m}{s_{i2}}=\frac{n_m-n_l}{R_2}.

$$
 
- **d)** Voeg de resultaten van a) en c) toe om af te leiden dat

$$
-\frac{n_m}{s_{o1}} + \frac{n_m}{s_{i2}}
= (n_l-n_m)\left( \frac{1}{R_1}-\frac{1}{R_2}\right) + \frac{n_l d}{(s_{i1}-d) s_{i1}}.

$$
 
- **e)** Leid de formule van de Lensmaker af voor de dunne lens
{eq}`eq.lensmaker` door de limiet $d\rightarrow 0$ in d) te nemen.

8. Systeemmatrix voor scherpstellen. 

Beschouw de straaloverdrachtsmatrix

```{math}
:label: eq.matrix
\begin{align*}
\left( \begin{array}{cc}A & B \\C & D
\end{array}\right)
\end{align*}
```
tussen twee vlakken.

- **a)** Stel dat elke straal die evenwijdig is aan de optische as in het eerste vlak door een punt op de optische as in het tweede vlak gaat. Dit betekent dat het tweede vlak het beeldbrandpuntsvlak van het systeem is. Wat betekent dit voor de elementen van de overdrachtsmatrix?
 
- **b)** Stel dat het eerste vlak het brandpuntsvlak van het object is, zodat elke straal die door het punt op de optische as in het eerste vlak wordt uitgezonden, in het tweede vlak wordt gecollimeerd. Wat betekent dit voor de elementen voor de overdrachtsmatrix?
 
- **c)** Beschouw twee dunne lenzen met een afstand $d$ en brandpuntsafstanden $f_{1i}$ en $f_{2i}$. Leid de overdrachtsmatrix af die het vlak vlak voor de eerste lens verbindt met het vlak direct achter de tweede lens. U mag ervan uitgaan dat de lenzen zich in de lucht bevinden met een brekingsindex $n=1$.
 
- **d)** Gebruik de voorwaarde die je in a) hebt gevonden om de beeldpuntsafstand af te leiden van een systeem dat bestaat uit twee dunne lenzen met beeldbrandpuntsafstanden $f_{1i}$ en $f_{2i}$ en afstand $d$. Controleer of het resultaat overeenkomt met de afstand voor het beeldbrandpuntsvlak {eq}`eq.2fi`.
Hint: laat $f_i$ de afstand van het beeldbrandpunt van het systeem met twee lenzen tot de tweede lens zijn. Schrijf de overdrachtsmatrix tussen de lens direct voor de eerste lens en het vlak door het brandpunt van het beeld.
 
- **e)** Voeg een derde dunne lens toe met een brandpuntsafstand $f_{3i}$ in contact staat met de tweede lens. Leid de straalmatrix van dit systeem af.
 
- **f)** Laat $f_i$ de afstand zijn van het beeldbrandpuntsvlak tot de derde lens. Gebruik de voorwaarde afgeleid in a) en de straalmatrix afgeleid in e) om $f_i$ af te leiden.
 


9. Matrix voor twee dunne lenzen.
- **a)** Beschouw twee dunne lenzen die zijn omgeven door een medium met brekingsindex $n$. Laat de linker- en rechterlens respectievelijk sterkte ${\cal P}_1$ en ${\cal P}_2$ hebben en laat de afstand tussen hun hoekpunten $d$ zijn.
Leid af dat de matrix tussen de vlakken direct links van de eerste lens en het vlak direct rechts van de tweede lens wordt gegeven door

$$
\left( \begin{array}{cc}1-\frac{d}{n}{\cal P}_1 & -{\cal P}_1-{\cal P}_2 - \frac{d}{n}{\cal P}_1{\cal P}_2 \\\frac{d}{n} & 1-\frac{d}{n}{\cal P}_2
\end{array}\right).
$$ (eq.matrix2)

- **b)** Toon aan dat de coördinaten van de focuspunten van de afbeelding en het object worden gegeven door:

$$
f_i = \frac{P_1+P_2 + \frac{d}{n} {\cal P}_1{\cal P}_2}{n \left( 1 - \frac{d}{n}\right){\cal P}_2 }
$$ (eq.fi)


$$
f_o = \frac{P_1+P_2 + \frac{d}{n} {\cal P}_1{\cal P}_2}{n \left( 1 - \frac{d}{n}\right){\cal P}_1 }.
$$ (eq.fo)

- **c)** Verifieer dat deze formules gelijkwaardig zijn aan {eq}`eq.2fo`,{eq}`eq.2fi`.


10. Ingangspupil van een systeem van twee lenzen.
Beschouw een systeem van twee lenzen $L_1$ en $L_2$ met afstand $d$. De linker lens $L_1$ heeft een brandpuntsafstand $f_{1i}$ en $a_1$, $a_2$ zijn de stralen van de lensopeningen van $L_1$ en $L_2$.

- **a)** Laat lens $L_1$ convergent zijn met $f_{1i}=2 \text{ cm}$ en laat de afstand $d=1 \text{cm}$ zijn. Laat verder $a_1=2 \text{cm}$ en $a_2= 1\text{cm} $. Bepaal door constructie met een liniaal de ingangsleerling. Bereken ook de positie en straal met behulp van de formule van de Lensmaker en leid de raaklijn af van de hoek die de marginale straal maakt met de optische as voor een object op de optische as op 4 cm links van $L_1$.
- **b)** Zelfde vraag maar als $L_1$ een divergente lens is met $f_{1i}=-6 \text{ cm}$, $d=3 \text{ cm}$ en $a_1=a_2=1 \text{cm}$.


11. Diafragma in een systeem van twee dunne lenzen. 
Het doel van dit probleem is om de in- en uitgangsopeningen van een systeem bestaande uit twee dunne lenzen met een diafragma te bepalen met behulp van drie methoden: constructie, toepassing van de formule van de Lensmaker en de matrixmethode.
De situatie is zoals weergegeven in Afb. {numref}`Fig_2_34_Two_thin_lenses`. De brandpuntsafstanden van de twee dunne lenzen zijn $f_1=10$ cm en $f_2=12$ cm en hun afstand
$d = 6$ cm. Stel dat de diafragmastop is zoals weergegeven in {numref}`Fig_2_34_Two_thin_lenses`. Het bevindt zich op een afstand van $ 1.5$ cm voor de lens $L_1$ en heeft een diameter $D_a=5$ cm.

```{figure} Images/Tutorial_2/2_34_Two_Thin_Lenses.png
:name: Fig_2_34_Two_thin_lenses

Twee dunne lenzen
```

- **a)** Bepaal de positie van de ingangspupil en de diameter $D_{e}$ met behulp van de genoemde drie methoden.
 

- **b)** Bepaal de positie van de uittredepupil en de diameter ervan $D_{exit}$ met behulp van de genoemde drie methoden.
 

- **c)** Bereken het $f$-nummer van het systeem.
 


12. \* **Hoofdvlakken voor een dikke lens.** 


In dit probleem wordt de overdrachtsmatrix voor een dikke lens afgeleid. Door de posities van de hoofdvlakken te vinden, kun je afleiden dat de overdrachtsmatrix dezelfde vorm heeft als voor een dunne lens wanneer object-, beeld- en brandpuntsafstanden worden gemeten ten opzichte van hoofdvlakken.

De overdrachtsmatrices die je moet gebruiken, zijn die voor breking door middel van een sferische interface tussen twee media met brekingsindices $n$, $n'$
respectievelijk links en rechts van het interfacegebied, en met een kromtestraal $R$:

$$
{\cal s} = \left(
\begin{array}{cc}1 & -k \\0 & 1
\end{array}\right)
\nonumber
$$

waarin
$k=(n'-n)/R$, en ten tweede de matrix ${\cal M}_d$ de matrix is voor voortplanting door een medium met brekingsindex $n$ over een afstand $d$.

Beschouw een dikke lens gemaakt van een glas met een brekingsindex $n$ met een dikte $d$. Voor paraxiale stralen kan de dikte worden geïdentificeerd met de afstand tussen de hoekpunten $V_1$ en $V_2$ van de oppervlakken van de lens.

```{figure} Images/Tutorial_3/Ex_01_Thick_lens.png
:name: fig:Thicklens1
Dikke lens.
```


- **a)** Leid af dat de overdrachtsmatrix tussen de oppervlakken door de twee hoekpunten van de dikke lens wordt gegeven door:

```{math}
:label: eq.LV1V2
\begin{align*}
{\cal L}_{V_2V_1} =
\left( \begin{array}{cc}1 - k_2 \frac{d}{n} & -k_1 -k_2 + k_1 k_2 \frac{d}{n} \\\frac{d}{n} & 1-k_1 \frac{d}{n}
\end{array}\right)
\end{align*}
```
waarbij $k_1= (n-1)/R_1$ en $k_2= (1-n)/R_2$
 
- **b)** Toon aan dat voor $d=0$ de overdrachtsmatrix identiek is aan die voor een dunne lens gegeven door eq.{eq}`eq.matthinlens`.
 
In paragraaf 3.5.7 van de Collegedictaten zijn het primaire en secundaire principevlak gedefinieerd. Laat de afstand tussen het primaire hoofdvlak ${\cal H}_1$ en het hoekpunt $V_1$ $T_1$ gelijk zijn, en laat de afstand van het tweede hoofdvlak ${\cal H}_2$ tot het hoekpunt $V_2$ $T_2$ zijn, zoals weergegeven in {numref}`fig:Thicklens2`. $T_1>0$ en $T_2>0$ als het eerste hoofdvlak zich links van $V_1$ bevindt en het tweede hoofdvlak rechts van $V_2$, terwijl $T_1$ en $T_2$ anders negatief zijn.

```{figure} Images/Tutorial_3/Ex_02_Thick_lens.png
:name: fig:Thicklens2
Dikke lens met principevlakken.
```


De transformatie van een straal van het primaire hoofdvlak ${\cal H}_1$ naar het secundaire hoofdvlak ${\cal H}_2$ is:

$$
\left( \begin{array}{c}\alpha_1 \\y_1
\end{array}\right) = {\cal L}_{{\cal H}_1{\cal H}_2} \left( \begin{array}{c}\alpha_2 \\y_2
\end{array}\right),
$$ (eq.matH1H2a)

waar

```{math}
\begin{align*}
{\cal L}_{{\cal H}_2{\cal H}_1} = {\cal M}_{ T_2} {\cal L}_{V_2 V_1} {\cal M}_{T_1},
\end{align*}
```

- **c)** Gebruik de volgende afkorting voor de matrix {eq}`eq.LV1V2`:

```{math}
:label: eq.abbrev
\begin{align*}
\left( \begin{array}{cc}1 - k_2 \frac{d}{n} & -k_1 -k_2 + k_1 k_2 \frac{d}{n} \\\frac{d}{n} & 1-k_1 \frac{d}{n}
\end{array}\right) = \left(
\begin{array}{cc}a_{11} & a_{12} \\a_{21} & a_{22}
\end{array}\right),
\end{align*}
```
om af te leiden dat dat:

```{math}
:label: eq.MatH1H2b
\begin{align*}
{\cal L}_{{\cal H}_2{\cal H}_1} = \left( \begin{array}{cc}a_{11} + T_1 a_{12} & \; a_{12} \\T_2 (a_{11} +T_1 a_{12}) + a_{21} + T_1 a_{22} & \; a_{22} + T_2 a_{12}
\end{array}\right)
\end{align*}
```

- **d)** De hoofdvlakken zijn geconjugeerd (d.w.z. het zijn elkaars beelden) met eenheidsvergroting. Leid hieruit af dat de locaties van de hoofdvlakken worden gegeven door:


```{math}
\begin{align*}
T_2&=\frac{1-a_{22}}{a_{12} }\\
T_1&= \frac{1-a_{11}}{a_{12}}
\end{align*}
```

 

Met de oplossingen voor $T_1$ en $T_2$ wordt de systeemmatrix tussen de hoofdvlakken:

$$
{\cal L}_{{\cal H}_2{\cal H}_1} = \left( \begin{array}{cc}1 & a_{12} \\0 & 1
\end{array}\right)
$$ (eq.MatH1H2c)

die dezelfde vorm heeft als de overdrachtsmatrix voor een dunne lens.

- **e)** Laat zien dat het achterste brandpunt zich op een afstand van $1/a_{12}$ van het secundaire hoofdvlak bevindt en dat het voorste brandpuntsvlak zich op een afstand van $1/a_{12}$ van het primaire hoofdvlak bevindt.

