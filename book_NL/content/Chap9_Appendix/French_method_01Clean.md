(AlternativeGO)=
# Algebraïsche afstand in de meetkundige optica


Er bestaat een methode om met de tekenconventie in de meetkunde om te gaan, die gebruik maakt van zogenaamde algebraïsche afstanden. Het is een kwestie van smaak, maar deze methode, die vooral in Frankrijk wordt onderwezen, kan een interessant alternatief zijn voor de conventie die in hoofdstuk 2 wordt gebruikt.

## Definitie
Stel dat er twee punten A en B zijn in een affiene ruimte waar een gerichte lijn doorheen loopt (een lijn met een richting, d.w.z. gegenereerd door een niet-nulzijnde vector $\vec{v}$). We introduceren de algebraïsche afstand $\overline{AB}$ van A naar B als het reële getal, zodanig dat :
1. de absolute waarde is de afstand tussen A en B
2. als de waarde niet nul is:
- $\overline{AB}$ is positief in het geval dat de vector $\overrightarrow{\rm AB}$ dezelfde richting heeft als $\vec{v}$, d.w.z. $\overrightarrow{\rm AB}= k\vec{v}$ met $k>0$;
- $\overline{AB}$ is anders negatief.


Hieruit volgt dat

```{math}
\begin{align*}
\overline{AB}=\dfrac{\overrightarrow{\rm AB}\cdot\vec{v}}{\Vert\vec{v}\Vert}
\end{align*}
```

Merk op dat om de algebraïsche afstand te definiëren, geen keuze voor de oorsprong nodig is, alleen een vector die de richting van de lijn definieert.

## Eigenschappen
De algebraïsche afstand heeft de volgende eigenschappen:
- $\overline{AA}=0$,
- $\overline{AB}=-\overline{BA}$,
- voor drie punten A, B en C die allemaal op dezelfde regel staan:

```{math}
\begin{align*}
\overline{AC}=\overline{AB}+\overline{BC}
\end{align*}
```
ongeacht de positie van B ten opzichte van A en C op de lijn.

Het laatste punt kan worden aangetoond met behulp van de analoge gelijkheid voor vectoren:

```{math}
\begin{align*}
\overrightarrow{\rm AC}= \overrightarrow{\rm AB}+\overrightarrow{\rm BC}
\end{align*}
```

```{figure} Images/Annexe/AO_Algebric_optics_ABC.png
:name: Fig_AO_02
Definieer de verschillende punten in een optisch systeem.
```


## Algebraïsche afstand in de optica

Wanneer we de algebraïsche afstand in de optica gebruiken, gebruiken we de volgende conventies:
1. Licht plant zich van links naar rechts voort;
2. De optische as is positief naar rechts gericht (d.w.z. in de richting waarin het licht zich voortplant);
3. de verticale as, loodrecht op de optische as, positief naar boven gericht.



```{figure} Images/Annexe/AO_Algebric_optics_def.png
:name: Fig_AO_04
Definieer de verschillende punten in een optisch systeem.
```


In {numref}`Fig_AO_04` worden de definitie van positieve straalhoek en positieve kromtestralen gedefinieerd:

```{math}
\begin{align*}
\overline{R_1}\equiv\overline{V_1C_1}>0, \mbox { en }
\overline{R_2}=\overline{V_2C_2}<0.
\end{align*}
```

## Een bolvormig oppervlak

Laten we eens kijken naar een sferisch grensvlak tussen twee media met verschillende brekingsindex $n_1$ en $n_2$ zoals weergegeven in {numref}`Fig_AO_08`. Laat C het middelpunt van de bol zijn en laat V het hoekpunt zijn, d.w.z. het snijpunt van de bol en de optische as.
Men kan aantonen dat voor het afbeeldingspunt $A_2$ van punt $A_1$:

$$
\dfrac{n_2}{\overline{VA_2}}-\dfrac{n_1}{\overline{VA_1}}=\dfrac{n_2-n_1}{\overline{VC}}=V,
$$ (eq_dioptre)

en dat de transversale vergroting kan worden geschreven als:

```{math}
\begin{align*}
M=\dfrac{\overline{VA_2}}{n_2}.\dfrac{n_1}{\overline{VA_1}}.
\end{align*}
```

Als het object zich op oneindig bevindt, is $A_2=F_2$ het brandpunt van de afbeelding en

```{math}
\begin{align*}
\dfrac{n_2}{\overline{VF_2}}=\dfrac{n_2-n_1}{\overline{VC}}=P,
\end{align*}
```
waarbij $P$ de sterkte van het oppervlak is.
Als het beeld op oneindig is, is $A_1=F_1$ het brandpunt van het object en

```{math}
\begin{align*}
\dfrac{n_1}{\overline{VF_1}}=-\dfrac{n_2-n_1}{\overline{VC}}=-P
\end{align*}
```


```{figure} Images/Annexe/AO_Algebric_optics_dioptre.png
:name: Fig_AO_08
Bolvormig oppervlak dat twee verschillende media scheidt.
```


Als de interface plat is: $\overline{VC}\rightarrow \infty$, krijgen we

```{math}
\begin{align*}
\dfrac{n_2}{\overline{VA_2}}=\dfrac{n_1}{\overline{VA_1}}
\end{align*}
```

We kunnen de Eq. {eq}`eq_dioptre` gemakkelijk herschrijven als functie van het centrum in plaats van de top door V te ruilen met C en $n_1$ met $n_2$:

```{math}
\begin{align*}
\dfrac{n_1}{\overline{CA_2}}-\dfrac{n_2}{\overline{CA_1}}=\dfrac{n_1-n_2}{\overline{CV}}
\end{align*}
```
en voor de transversale vergroting:

```{math}
\begin{align*}
M=\dfrac{\overline{CA_2}}{\overline{CA_1}}
\end{align*}
```

De laatste relatie wordt meestal de relatie van Descartes genoemd en brengt $F_1$ en $F_2$ in relatie met het hoekpunt:

```{math}
:label: eq_rel_descartes
\begin{align*}
\frac{\overline {VF_2}}{\overline {VA_2}}+{\frac {\overline {VF_1}}{\overline {VA_1}}}=1
\end{align*}
```

```{figure} Images/Annexe/AO_Algebric_optics_dioptre_focii.png
:name: Fig_AO_10
Dioptrie sph\'{e]}rique: positie van het brandpunt van het beeld en het brandpunt van het object
```


De relatie van Newton is een andere manier om de positie van het object en die van het beeld te koppelen via de brandpunten:

```{math}
\begin{align*}
\overline{F_2A_2} \cdot \overline{F_1A_1} = \overline{VF_2} \cdot \overline{VF_1}
\end{align*}
```
## Spiegel

Voor de spiegel definiëren we $V$ als het hoekpunt (het snijpunt tussen de spiegel en de optische as), $C$ het middelpunt van de kromming en $F$ het brandpunt zoals te zien is in {numref}`Fig_AO_07`. Voor een concave spiegel geldt $\overline{VC}=2\overline{VF}<0$ en voor een convexe spiegel geldt $\overline{VC}=2\overline{VF}>0$.
```{figure} Images/Annexe/AO_Algebric_optics_Concave.png
```
```{figure} Images/Annexe/AO_Algebric_optics_convex.png
:name: Fig_AO_07
Definitie van $O$, $F_o$ en $F_i$ voor een concave (links) en een convexe (rechts) spiegel.
```


Als een punt A aan de rechterkant van de spiegel wordt geplaatst, d.w.z. $\overline{VA}>0$, wordt het punt als virtueel beschouwd. Wees je ervan bewust dat als je zelf in de spiegel kijkt, je dit virtuele punt kunt "beelden". Om jezelf te overtuigen, gebruik je gewoon een lepel.

We kunnen de wet van conjugatie afleiden uit de werken voor elke bolspiegel die onafhankelijk is van zijn kromming:

```{math}
\begin{align*}
\dfrac{1}{\overline{VA_i}}+\dfrac{1}{\overline{VA_o}}=\dfrac{2}{\overline{VC}}
\end{align*}
```

De vergroting kan ook worden afgeleid:

```{math}
\begin{align*}
M&\equiv\dfrac{\overline{A_iB_i}}{\overline{A_oB_o}}\\
&=\dfrac{\overline{FV}}{\overline{FA_o}}=\dfrac{\overline{FA_i}}{\overline{FV}}=-\dfrac{\overline{VA_i}}{\overline{VA_o}}
\end{align*}
```

Zoals we eerder hebben gedaan, kunnen we deze vergelijkingen herschrijven met het midden in plaats van de top:

```{math}
\begin{align*}
\dfrac{1}{\overline{CA_i}}+\dfrac{1}{\overline{CA_o}}=\dfrac{2}{\overline{CV}}
\end{align*}
```
De vergroting kan ook worden afgeleid met C als oorsprong:

```{math}
\begin{align*}
M&\equiv\dfrac{\overline{A_iB_i}}{\overline{A_oB_o}}\\
&=\dfrac{\overline{CA_i}}{\overline{CA_o}}
\end{align*}
```

## Sferische lens
Sferische lenzen zijn gemaakt van glas en worden begrensd door twee sferische krommingsvlakken $\overline{R_1} = \overline{C_1V_1}$ en $\overline{R_2} = \overline{C_2V_2}$, met middelpunten $C_1$ en $C_2$ en hoekpunten $V_1$ en $V_2$ respectievelijk. Wanneer $\overline{R_1}>0$ en $\overline{R_2}<0$, is de lens biconvex; wanneer $\overline{R_2}>0$ en $\overline{R_1}<0$ is het biconcaaf. Ze zijn dun wanneer de afstand ($V_1V_2$) erg klein is in vergelijking met de kromtestralen $R_1$ en $R_2$.


```{figure} Images/Annexe/AO_Algebric_optics_conv_div.png
:name: Fig_AO_12
Convergerende en divergerende lens afhankelijk van de krommingen.
```


## Dunne sferische lens
Bij het overwegen van een dunne sferische lens definiëren we 3 punten $O$, $F_o$ en $F_i$, respectievelijk het midden van de lens, het brandpuntspunt en het beelbrandpunt. Zoals te zien is in {numref}`Fig_AO_14`, kunnen we zeggen:
- $F_o$ is het punt van waaruit alle stralen evenwijdig aan de optische as bij het verlaten van de lens afkomstig zijn;\\
- $F_i$ is het punt waar alle stralen evenwijdig aan de optische as die naar de lens toe komen, samenkomen.


```{figure} Images/Annexe/AO_Algebric_optics_positive_lens.png
:name: Fig_AO_14
Definitie van $O$, $F_o$ en $F_i$ voor een positieve lens.
```


De **beeldbrandpuntsafstand** $f_i$ van een lens wordt gedefinieerd als de algebraïsche grootheid :

```{math}
\begin{align*}
f_i\equiv\overline{OF_i}=-\overline{OF_o}=f_o
\end{align*}
```
terwijl we ook de **object brandpuntsafstand** $f_o$ introduceren.
- In het geval van een positieve lens is de brandpuntsafstand van het beeld $f_i$ positief, d.w.z. $\overline{OF_i}>0$ en $\overline{OF_o}<0$.
- In het geval van een negatieve lens is de brandpuntsafstand van het beeld $f_i$ negatief, d.w.z. $\overline{OF_i}>0$


De algebraïsche grootheid die de **dioptrie** $\cal{D}$  van een dunne lens wordt genoemd, is:

```{math}
\begin{align*}
\cal{D}&\equiv\dfrac{1}{\overline{OF_i}}=(1-n)\left(\dfrac{1}{\overline{V_2C_2}}-\dfrac{1}{\overline{V_1C_1}}\right)
\end{align*}
```
waarbij $n$ de brekingsindex van het glas is.

Voor elk lenssysteem dat is gedefinieerd met $F_i$ als het beeldbrandpunt, hebben we nu slechts één vergelijking die altijd geldig is:

```{math}
\begin{align*}
\dfrac{1}{\overline{OF_i}}=\dfrac{1}{\overline{OA_i}}-\dfrac{1}{\overline{OA_o}}
\end{align*}
```
waarbij het punt $A_i$ een beeld is van het punt $A_o$ door de lens. Merk op dat we niet hoeven te weten waar $A_o$ is met betrekking tot de lens om de formule te schrijven, noch of we te maken hebben met een positieve lens. Als je in je berekening bijvoorbeeld vindt dat $\overline{OA_i}<0$ dan weet je dat de afbeelding virtueel is.

We kunnen de vergroting ook definiëren als:

```{math}
\begin{align*}
M\equiv\dfrac{\overline{A_iB_i}}{\overline{A_oB_o}}=\dfrac{\overline{OA_i}}{\overline{OA_o}}
\end{align*}
```
waarbij het punt $B_i$ het beeld is van het objectpunt $B_o$. Het teken van $M$ geeft automatisch aan of de afbeelding omgekeerd is of niet.

{numref}`Fig_AO_06` toont het geval waarin de afbeelding omgekeerd is in vergelijking met het object waar $\overline{OA_i}$ positief is en $\overline{OA_o}$ negatief.

```{figure} Images/Annexe/AO_Algebric_optics_lens_image.png
:name: Fig_AO_06
Afbeelding van een object vanuit een positieve lens.
```


