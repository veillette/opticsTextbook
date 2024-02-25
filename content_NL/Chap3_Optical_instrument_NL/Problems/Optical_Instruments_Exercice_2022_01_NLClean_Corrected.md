## Opgaven

1. Beschouw een straaloverdrachtsmatrix

$$
\left( \begin{array}{cc}A & B \\C & D
\end{array}\right)
$$ (eq.matrix3)

tussen twee vlakken.

- **a)** Stel dat elke straal die evenwijdig is aan de optische as in het eerste vlak door een punt op de optische as in het tweede vlak gaat. Dit betekent dat het tweede vlak het brandpuntsvlak van het systeem is. Wat betekent dit voor de elementen van de overdrachtsmatrix?
 
- **b)** Stel dat het eerste vlak een brandpuntsvlak is, zodat elke straal die door het punt op de optische as in dit vlak wordt uitgezonden, in het tweede vlak wordt gecollimeerd. Wat betekent dit voor de elementen voor de overdrachtsmatrix?
 
- **c)** Beschouw twee dunne lenzen met een afstand $d $ en brandpuntsafstanden $f_1$ en $f_2$. Leid de overdrachtsmatrix af die het vlak vlak voor de eerste lens verbindt met het vlak direct achter de tweede lens. Je mag ervan uitgaan dat de lenzen zich in de lucht bevinden met een brekingsindex $n=1$.
 
- **d)**  Gebruik de voorwaarde die je hebt gevonden in a) om de achterste brandpuntsafstand af te leiden van een systeem dat bestaat uit twee dunne lenzen met een brekingsindex $f_1$ en $f_2$ en een afstand $d$. Controleer of het resultaat komt overeen met de afstand voor het achterste brandpuntsvlak in sectie 3.5.4.
Hint: laat $f_b$ de afstand van het achterste brandpunt van het systeem met twee lenzen tot de tweede lens. Schrijf de overdrachtsmatrix tussen de lens direct voor de eerste lens en het vlak door het achterste brandpunt.
 
- **e)**  Voeg een derde dunne lens met brekingsindex $f_3$ toe in contact met de tweede lens. Beantwoord vraag c) voor dit systeem.
 


2. Het oog en het vergrootglas.
Bij dit probleem wordt het oog gemodelleerd als een enkele dunne lens die een beeld op het netvlies creëert.

De afstand tussen het netvlies en de lens is $d_r$. Laten we de brandpuntsafstand van de lens $f_{\text{eye}}$ noemen. Het oog is in staat om $f_{\text{eye}}$ te variëren.

- **a)** Stel dat het ontspannen oog objecten in de verte scherp kan zien. Hoe verhouden $f_{\text{eye}}$ en $d_r$ zich tot elkaar voor een ontspannen oog?
 
- **b)** Stel dat we een object willen zien dat dichtbij is, met bijvoorbeeld coördinaat $s_o$. Wat moet $f_{\text{eye}}$ zijn om een scherp beeld op het netvlies te krijgen?
 
- **c)** We introduceren een vergrootglas, d.w.z. we plaatsen een dunne lens met brandpuntsafstand $f$ voor het oog. Voor het vergrootglas bevindt zich een object in de buurt. We willen het object zo plaatsen dat een volledig ontspannen oog het scherp kan zien. Waar moet het object zijn? Verifieer je antwoord met behulp van de applet die je hier kunt vinden

[http://www.geogebra.org/m/977919](http://www.geogebra.org/m/977919).
 
- **d)** Bereken de vergroting van het systeem met behulp van de transfermatrices. Ga er voor de eenvoud van uit dat in het hele systeem $n=1$. Hoe hangt de vergroting van het object af van $f$? Verifieer je antwoord met de applet.
 

3. Vergroting van het hoekveld van het zicht. 

Patiënten met tunnelvisie hebben slechts een beperkt gezichtsveld omdat alleen het centrale deel van hun netvlies lichtgevoelig is. Stel dat het gevoelige gebied van het netvlies cirkelvormig is en een straal heeft $r=2 \text{cm}$.
De lengte van het oog is 24 \text{cm} en het hoornvlies en de kristallens worden samen behandeld als één dunne lens.
- **a)** Laat zien dat het hoekige gezichtsveld van verre objecten

$$
\alpha_u= 6.4^o.
$$

(Houd er rekening mee dat de straal die het midden van de ooglens binnendringt, wordt gebroken omdat het vitreous humor een brekingsindex heeft $n=1,337$).
 
- **b)**
Gebruik een negatieve lens met een brandpuntsafstand $f<0 $ op een afstand $d $ voor het oog. Laat zien dat wanneer

$$
d=9 |f|,

$$
Het gezichtsveld met een factor 10 wordt vergroot.
 
- **c)**
We vereisen dat de virtuele beelden van alle verre objecten zich op een afstand bevinden van ten minste de afstand van het normale nabije punt. Dit houdt in dat we vereisen dat $d+|f_2|> 25 \text{cm}$.
Leid $d $ en de sterkte van de negatieve lens af in dioptrie.
 
```{figure} Images/Tutorial_3/Ex_03_Eye.png
:name: fig:Eye
Hoek-weergave $\alpha_u$ zonder en met behulp van een negatieve lens.
```


4. \* Beeldvorming met een vlakke interface.
In dit probleem onderzoeken we of het mogelijk is om een object in beeld te brengen met een enkele vlakke interface.

- **a)** We hebben twee media met brekingsindices $n_1$ en $n_2$, gescheiden door een vlakke interface. Geef de overdrachtsmatrix $\mathcal{T}$ voor breking op een vlak grensvlak met behulp van de paraxiale benadering.
 

- **b)** Stel dat we een object hebben dat zich op een afstand $d$ van de interface bevindt. Geef de systeemmatrix die een straal beschrijft die zich voortplant van het object naar het vlak dat zich op een afstand $d$ achter het grensvlak bevindt (zie {numref}`fig:PlanarInterface`).

```{figure} Images/Tutorial_3/Ex_04_Planar_Interface.png
:name: fig:PlanarInterface
Vlak oppervlak
```

- **c)** Ervan uitgaande dat $d>0$, aan welke voorwaarde moet dan worden voldaan om een afbeelding te maken in het vlak achter de interface? Zo'n beeldvormingssysteem wordt een **Veselago-lens** genoemd.
