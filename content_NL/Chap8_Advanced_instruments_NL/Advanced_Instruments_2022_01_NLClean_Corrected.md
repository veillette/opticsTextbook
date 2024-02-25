# Geavanceerde optische microscopen

Er zijn en worden nog steeds veel pogingen gedaan om tot betere beelden te komen. Een voor de hand liggende manier om de resolutie te verbeteren is het gebruik van kortere golflengten. Bij golflengten van minder dan 200 nm (d.w.z. bij diepe, extreme ultraviolette, zachte röntgenstralen en harde röntgenstralen) hebben de meeste materialen echter een laag optisch contrast en zijn brekingsoptica (lenzen) niet praktisch. In plaats van de golflengte te verkleinen, zijn er andere methoden uitgevonden om een hogere resolutie te bereiken. Sommige hiervan (zeker niet alle) worden in dit hoofdstuk besproken.
Afgezien van deze reeds bestaande systemen, wordt er nog steeds onderzoek gedaan naar het bereiken van een hogere resolutie. Pendry's artikel over een superlens op basis van negatieve breking<sup>[^1]</sup> is begonnen met een zeer actief onderzoek naar superresolutie met behulp van metamaterialen, in het bijzonder hyperbolische materialen. We gaan hier niet in op deze onderwerpen en verwijzen geïnteresseerde studenten in plaats daarvan door naar het mastervak *Advanced Photonics*.

## Fase Contrast Microscoop

Stel dat we een zuiver fase-object hebben $U_0(x,y)=e^{i\varphi(x,y)}$, d.w.z. een object dat overal licht doorlaat (een transparant object), maar dat de fase van het licht voor verschillende posities anders verschuift. Een voorbeeld van dergelijke objecten zijn biologische cellen. Aangezien alleen de intensiteit kan worden gemeten en aangezien i $|U(x,y)|^2=1$ het bevat in dit geval geen zinvolle informatie.
Om een beeld te verkrijgen moet het veld zo worden gemanipuleerd dat fase-informatie wordt omgezet in amplitude-informatie. Als $\varphi(x,y)$ klein is, kunnen we aantonen dat dit kan door Fouriertransformatie $U(x,y)$, de fase van de Fouriertransformatie in het punt $(k_x,k_y)=(0,0)$ te verschuiven met $\pi/2$, en de Fouriertransformatie om te keren. Het verschuiven van de Fouriertransformatie van $U(x,y)$ in $(0,0)$ geeft

$$
\mathcal{F}(U)\left(\xi,\eta\right)\to \mathcal{F}(U)(\xi,\eta)+(i-1)\delta(\xi,\eta)\mathcal{F}(U)(0,0).
$$

Deze verschuiving kan worden gerealiseerd met een fasemasker in de pupil van de lens.
Inverse Fouriertransformatie geeft

$$
\begin{split}
\mathcal{F}(U)(\xi,\eta)+(i-1)\delta(\xi,\eta)\mathcal{F}(U)(0,0) &\to U(x,y)+(i-1)\mathcal{F}(U)(0,0)


&=e^{i\varphi(x,y)}+(i-1)\mathcal{F}(U)(0,0).
\end{split}
$$

Dit is het veld in het beeldbrandpuntsvlak van de lens. De intensiteit ervan is

$$
\begin{split}
I(x,y)&=|e^{i\varphi(x,y)}+(i-1)\mathcal{F}(U)(0,0)|^2


&= 1+2\mathcal{F}(U)(0,0)^2-2\mathcal{F}(U)(0,0)\cos(\varphi(x,y))+2\mathcal{F}(U)(0,0)\sin(\varphi(x,y)),
\end{split}
$$

waarbij we zonder verlies van algemeenheid aannemen dat $\mathcal{F}(U)(0,0)$ reëel is (een constante faseverschuiving kan zo gekozen worden dat $\mathcal{F}(U)(0,0)$ reëel is).
We zien dat de fase-informatie nu inderdaad gemeten kan worden als intensiteitsinformatie, vanwege de faseverschuiving die wordt toegepast op de Fouriertransformatie van $U(x,y)$ in één punt<sup>[^2]</sup>. Ervan uitgaande dat $\varphi(x,y)$ klein is, en de hogere-orde term $\hat{U}(0,0)^2$ verwaarlozend, kunnen we schrijven

$$
I(x,y)\approx 1+2\mathcal{F}(U)(0,0)\varphi(x,y).
$$

Fasecontrastmicroscopie vereist dunne monsters.

## Confocale microscoop
Een confocale microscoop is een optische microscoop die in staat is om beelden op te nemen met een zeer kleine scherptediepte (~400 nm). Door het brandpuntsvlak door het object te vertalen, is het mogelijk om een 3D-weergave van het object te krijgen. Voor de reconstructie is dan een computer nodig.
De techniek is te zien in afb. {numref}`Fig_8_01_Confocal`, ontleend aan het patent dat Minsky in 1957 had aangevraagd.

Het idee is om het object te verlichten met een strak gefocuste spot, met behulp van een objectieflens. Het object reflecteert de laserspot en het gereflecteerde licht wordt door hetzelfde objectief in beeld gebracht. Er wordt een klein gaatje voor de detector geplaatst in het afbeeldingsvlak. De spot wordt lateraal gescand en het totale beeld wordt verkregen door alle beelden voor alle laterale scanposities te verwerken.
Zoals wordt geïllustreerd in {numref}`Fig_8_01_Confocal`, door gebruik te maken van een gefocusseerde spot voor de verlichting in combinatie met een gaatje voor de detector, passeren alleen de fotonen die zich zeer dicht bij het brandpuntsvlak bevinden het gaatje en worden ze gedetecteerd. Dit betekent dat de axiale resolutie van de beelden ongeveer 600 nm is wanneer licht met een golflengte van 400 nm wordt gebruikt, wat beter is dan bij heldere veldverlichting en conventionele detectie. De verlichting door een gefocusseerde vlek houdt in dat het monster wordt verlicht door een veld met grote laterale ruimtelijke frequenties. Omdat het gereflecteerde nabije veld het product is van de invallende vlek en de reflectiefunctie, kunnen hoge ruimtelijke frequenties van de reflectiefunctie door de lens worden overgedragen, vanwege de convolutie in het Fourier-domein tussen de Fourier-getransformeerde invallende vlek en de getransformeerde reflectiefunctie. De laterale resolutie wordt daarom ook verhoogd van ongeveer 200 nm naar 160 nm, d.w.z. met een factor rond 1,2. De confocale microscoop geeft dus een hogere resolutie, zowel in axiale als in laterale richting. Het kan natuurlijk alleen worden toegepast op een object dat niet verandert gedurende de tijd die nodig is om te scannen.


```{figure} Images/Chapter_8/Confocal.png
:name: Fig_8_01_Confocal
Schematische tekening van een confocale microscoop en zijn principe.
```


We verkrijgen ook een iets betere laterale resolutie (180-160 nm) dan verwacht voor een conventionele optische microscoop (200 nm). De resolutie in de diepte (samen met $z$) is in de orde van grootte van 600 nm.


```{figure} Images/Chapter_8/Confocal_1euro.png
:name: Fig_8_02_Confocal_euro
Gedeeltelijk oppervlakteprofiel van een 1 Euromunt, gemeten met een confocale Nipkowschijfmicroscoop. *Bron Wikipedia*
```


## Fluorescentiemicroscoop

In dit geval worden fluorescerende moleculen, zoals die van de GFP-familie (Green Fluorescence Protein), in de cel van belang geïntroduceerd. Het licht van de lichtbron is monochromatisch (laser) en exiteerd deze GFP-moleculen die vervolgens opnieuw uitzenden met een karakteristieke langere golflengte. Door gebruik te maken van een dichromaat (een spiegel die alleen een bepaalde kleur doorlaat en de rest weerkaatst) kan dit opnieuw uitgezonden licht worden gedetecteerd met behulp van een detector met een gaatje. Men verkrijgt kleurrijke afbeeldingen zoals die in {numref}`Fig_03_Flurorescence`. Het voordeel van fluorescentiemicroscopie is dat de bronnen van het fluorescentielicht zich in het monster bevinden en dat door selectieve binding van de fluorescerende moleculen aan bepaalde organen zeer specifieke beelden kunnen worden verkregen.


```{figure} Images/Chapter_8/FluorescentCells.jpg
:name: Fig_03_Flurorescence
Endotheelcellen onder de microscoop met behulp van fluorescentiemicroscopie. De verschillende kleuren verlichten verschillende GFP.
```


## Scanning Near-Field Optical Microscope

Zoals we eerder hebben besproken, wanneer een object wordt verlicht,
kunnen componenten met een hoge ruimtelijke frequentie van het uitgezonden en gereflecteerde nabije veld dat informatie bevat over subgolflengtekenmerken de detector niet bereiken in verre veldmicroscopie, omdat de golven die overeenkomen met hoge ruimtelijke frequenties vluchtig zijn. Dit houdt in dat kenmerken kleiner dan de golflengte niet kunnen worden gedetecteerd met conventionele far field-microscopie. Door een vloeistof met een hoge brekingsindex, zoals olie, tussen het monster en de objectieflens te plaatsen, wordt de effectieve golflengte verminderd met de brekingsindex en wordt de resolutie verbeterd. Dit wordt immersiemicroscopie genoemd.




Maar om superresolutie te bereiken, d.w.z. de detectie van kenmerken die aanzienlijk onder de golflengte liggen, is het noodzakelijk dat de informatie in ten minste een deel van de vluchtige golven op de een of andere manier wordt gedetecteerd. Dit wordt gedaan in een SNOM (**Scanning Near-Field Optical Microscope**). Er zijn twee methoden om superresolutie te bereiken. De eerste methode wordt geïllustreerd aan de linkerkant van {numref}`Fig_8_04_SNOM`. Het monster wordt verlicht en het verstrooide veld wordt gedetecteerd met behulp van een subgolflengtepunt op een vezel die het lokaal verstrooide licht naar een detector leidt. Het monster wordt zijdelings gescand door de subgolflengtepunt, die bijna in contact staat met het monster en daarom gevoelig is voor subgolflengtedetails in het verspreide veld.

De tweede methode is te zien aan de rechterkant van {numref}`Fig_8_05_NSOM`. Een vezel met subgolflengtepunt wordt nu gebruikt om het monster vanaf een zeer kleine afstand te verlichten, terwijl de detectie wordt gedaan met een conventioneel objectief. Het lijkt op het eerste gezicht misschien vreemd dat het gedetecteerde verre veld informatie bevat over subgolflengtekenmerken van het object en dus superresolutiebeelden oplevert. De superresolutie is echter te wijten aan het feit dat de verlichting voor een deel uit vluchtige golven bestaat.
De twee opstellingen in {numref}`Fig_8_04_SNOM` zijn wederkerig aan elkaar en geven een vergelijkbare resolutieverbetering.

```{figure} Images/Chapter_8/NSOM_Collection.jpg
:name: Fig_8_04_SNOM
Collection (links) en Excitation (rechts) modus voor een SNOM.
```


Aan de linkerkant in {numref}`Fig_8_05_NSOM` wordt een topografische Atomic Force Mircoscopic (AFM) afbeelding getoond van een Photonics Band Gap (PBG) structuur; ernaast is een NSOM-beeld gemeten met een verzamelvezelopstelling.

Een waarschuwing is op zijn plaats.
Omdat bij SNOM de vezel zich zeer dicht bij het monster bevindt, hetzij om het monster te verlichten, hetzij om het verspreide nabije veld op te vangen, zal de vezel in het algemeen de meting beïnvloeden, d.w.z. het veld dat men wil detecteren wordt tot op zekere hoogte verstoord door het meetapparaat.

```{figure} NSOM_imageA.jpg
:name: Fig_8_05_NSOM
Links: Topografisch AFM-beeld van een Photonics Band Gap (PBG) structuur, afgebeeld met een 150 \text{nm} AFM/NSOM vrijdragende sonde. Rechts: NSOM-afbeelding van de PBG-structuur met behulp van een lasergolflengte van 532 nm.
```


[^1]: Phys Rev. Lett. **85**, 3966, 2000

[^2]: Zie ook Hecht &sect; 13.2.4 '*Phase Contrast*'.

