(hoofdstuk.coherentie)=
# Interferentie en coherentie

```{admonition} Wat je moet weten en kunnen na het bestuderen van dit hoofdstuk
- Begrijpen van tijdscoherentie en ruimtelijke coherentie.
- Weten hoe de mate van tijdscoherentie kan worden gemeten met een Michelson-interferometer.
- Het verband tussen de tijdscoherentie en de frequentiebandbreedte begrijpen.
- Weten dat de ruimtelijke coherentie van het veld op twee punten in de ruimte kan worden gemeten met het tweespletenexperiment van Young.
- Begrijpen dat ruimtelijke coherentie toeneemt door voortplanting.
- Begrijpen hoe de grootte van een incoherente bron zoals een ster kan worden afgeleid uit het meten van de ruimtelijke coherentie op grote afstand van de bron.
- De definitie van franjecontrast.
- Kennen en begrijpen van de drie wetten van Fresnel-Arago.
```

## Inleiding
Hoewel het model van geometrische optica ons helpt bij het ontwerpen van optische systemen en veel fenomenen verklaart, zijn er eigenschappen van licht die een uitgebreider model vereisen. Bijvoorbeeld, interferentieranden waargenomen in Young's dubbelspleet experiment of de Arago-spot ({numref}`Arago`) geven aan dat licht nauwkeuriger wordt gemodelleerd als een golf.
```{figure} Images/Chapter_5/Arago1.jpg
```
```{figure} Images/Chapter_5/Arago2.jpg
```
```{figure} Images/Chapter_5/Arago3.jpg
:name: Arago
De Aragovlek is de lichtvlek die ontstaat in het midden van de schaduw van een cirkelvormige schijf en die wordt veroorzaakt door diffractie. De schijf heeft een diameter van 4&nbsp;mm, 2&nbsp;mm en 1&nbsp;mm, van links naar rechts, de golflengte is 633&nbsp;nm en de intensiteit wordt geregistreerd op 1&nbsp;m achter de schijf en heeft een breedte van 16&nbsp;mm
```


In dit hoofdstuk bestuderen we het golfmodel van licht. Er zal worden aangetoond dat de mate waarin licht interferentie kan vertonen, afhangt van een eigenschap die coherentie wordt genoemd. In het grootste deel van de discussie gaan we ervan uit dat al het licht dezelfde polarisatie heeft, zodat we de velden als scalair kunnen behandelen. In de laatste paragraaf zullen we kijken hoe polarisatie interferentie beïnvloedt, zoals beschreven door de Fresnel-Arago-wetten.

Het is belangrijk op te merken dat de concepten interferentie en coherentie niet alleen beperkt zijn tot optica. Aangezien de kwantummechanica voorschrijft dat deeltjes een golfachtig karakter hebben, spelen interferentie en coherentie ook een rol in bijvoorbeeld de vastestoffysica en kwantuminformatie.

```{admonition} Externe bronnen in aanbevolen volgorde
- [KhanAcademy - Interferentie van lichtgolven](https://www.khanacademy.org/science/physics/light-waves/interference-of-light-waves/v/wave-interference): Afspeellijst over golfinterferentie op middelbare school niveau.
- [Yale-cursussen - 18. Golftheorie van het licht](https://www.youtube.com/watch?v=5tKPLfZ9JVQ)
```

## interferentie van monochromatische velden met dezelfde frequentie
Laten we eerst de basisbegrippen van interferentie in herinnering brengen. Wat interferentie veroorzaakt, is het feit dat licht een golf is, wat betekent dat het niet alleen een **amplitude** heeft, maar ook een **fase**. Stel bijvoorbeeld dat we een tijdharmonisch veld in twee punten evalueren

```{math}
\begin{align*}
\mathcal{U}_1(t)=\cos(\omega t), \quad \mathcal{U}_2(t)=\cos(\omega t +\varphi).
\end{align*}
```
Hier geeft $\varphi$ het faseverschil aan tussen de velden op de twee punten. Als $\varphi=0$, of $\varphi$ een veelvoud is van $2\pi$, dan zijn de velden **in fase**, en als ze worden opgeteld interfereren ze **constructief**

```{math}
\begin{align*}
\mathcal{U}_1(t)+\mathcal{U}_2(t)=\cos(\omega t) + \cos(\omega t + 2 m \pi) =2\cos(\omega t).
\end{align*}
```
Echter, als $\varphi=\pi$, of meer in het algemeen $\varphi=\pi+ 2 m \pi$, voor een geheel getal $m$, dan zijn de golven **uit fase**, en wanneer ze over elkaar heen worden gelegd, interfereren ze **destructief**.

```{math}
\begin{align*}
\begin{split}
\mathcal{U}_1(t)+\mathcal{U}_2(t)&=\cos(\omega t)+\cos(\omega t+\pi+ 2 m\pi)
&=\cos(\omega t)-\cos(\omega t)
&=0.
\end{split}
\end{align*}
```
We kunnen de twee velden voor willekeurige $\varphi$ gemakkelijker optellen met behulp van complexe notatie:

```{math}
\begin{align*}
\mathcal{U}_1(t)=\text{Re}[ e^{-i\omega t}], \; \; \mathcal{U}_2(t) =\text{Re}[ e^{-i\omega t}e^{-i\varphi}].
\end{align*}
```
Optellen geeft

```{math}
:label: eq.U1plusU2
\begin{align*}
\mathcal{U}_1(t)+\mathcal{U}_2(t)&= \text{Re}[e^{-i\omega t}(1+e^{-i\varphi})] 
&=\text{Re}[e^{-i\omega t}e^{-i\varphi/2}(e^{i\varphi/2}+e^{-i\varphi/2})] 
&=\text{Re}[e^{-i\omega t}e^{-i\varphi/2}2\cos(\varphi/2)] 
&= 2\cos(\varphi/2)\cos(\omega t+\varphi/2).
\end{align*}
```
Voor $\varphi= 2 m \pi$ en $\varphi=\pi+2 m \pi$ zien we de eerder verkregen resultaten. Het is belangrijk om te beseffen dat wat we fysiek zien of waarnemen (de 'helderheid' van licht) niet overeenkomt met de grootheden $\mathcal{U}_1$, $\mathcal{U}_2$. Immers, $\mathcal{U}_1$ en $\mathcal{U}_2$ kunnen negatief zijn, terwijl er niet zoiets bestaat als 'negatieve helderheid'. Wat $\mathcal{U}_1$ en $\mathcal{U}_2$ beschrijven zijn de **velden**, die positief of negatief kunnen zijn.
De 'helderheid' of de **bestraling** of **intensiteit** wordt gegeven door een gemiddelde te nemen over een lange tijd van
$\mathcal{U}(t)^2$ (zie {eq}`eq.Splanew`,
We laten de factor $\sqrt{\epsilon/\mu_0}$) weg. Zoals uitgelegd in Hoofdstuk 1, zien en meten we alleen het lange tijdgemiddelde van $\mathcal{U}(t)^2$, omdat bij optische frequenties $\mathcal{U}(t)^2$ zeer snel fluctueert.
We herinneren ons de definitie van het tijdgemiddelde over een interval van lengte $T$ op een bepaald tijdstip $t$ gegeven in {eq}`eq.average` in hoofdstuk 1:

```{math}
:label: eq.averageII
\begin{align*}
\braket{f(t)}= \frac{1}{T}\int_{t}^{t+T}f(t')\,\text{d}t',
\end{align*}
```
waarbij $T$ een tijdsinterval is dat de responstijd is van een typische detector, d.w.z. $T\approx 10^{-6}\,\text{s}$ wat extreem lang is in vergelijking met de periode van zichtbaar licht die in de orde van $10^{-14}\, \text{s}$ ligt.
Voor een tijdharmonische functie is het langtijdgemiddelde gelijk aan het gemiddelde over een periode van het veld en dus **het is onafhankelijk van het tijdstip $t$ waarop het wordt genomen**.
Inderdaad voor {eq}`eq.U1plusU2` krijgen we

```{math}
\begin{align*}
I &= \braket{(\mathcal{U}_1(t)+\mathcal{U}_2(t))^2} 
&=4\cos^2(\varphi/2) \braket{\cos^2(\omega t+\varphi/2)} 
&= 2(1+\cos\phi) \braket{\cos^2(\omega t+\varphi/2)}  \\
&= 1 +\cos(\varphi)
\end{align*}
```
Met behulp van complexe notatie kan men dit resultaat gemakkelijker verkrijgen. Laat:

```{math}
\begin{align*}
\mathcal{U}_1(t)=\text{Re}[U_1 e^{-i\omega t}], \quad \mathcal{U}_2(t)=\text{Re}[U_2 e^{-i\omega t}],
\end{align*}
```
waar

```{math}
\begin{align*}
U_1=1, \quad U_2=e^{-i\varphi}.
\end{align*}
```
Dan vinden we

```{math}
\begin{align*}
\begin{split}
|U_1+U_2|^2&=|1+e^{-i\varphi}|^2
&=(1+e^{i\varphi})(1+e^{-i\varphi})
&=1+1+e^{-i\varphi}+e^{i\varphi}
&=2+2\cos(\varphi),
\end{split}
\end{align*}
```
vandaar dat

```{math}
:label: eq.I2
\begin{align*}
I = \frac{1}{2}|U_1 + U_2|^2.
\end{align*}
```
Om te zien waarom dit werkt, herinner eq.{eq}`eq.timav` en kies $A=B=U_1+U_2$.

**Opmerking.** Om de formules in te korten, laten we in dit hoofdstuk de factor $1/2$ voor de tijdgemiddelde intensiteit weg.

Daarom definiëren we $I_1=|U_1|^2$ en $I_2=|U_2|^2$, en we vinden dan voor de tijdgemiddelde intensiteit van de som van $U_1$ en $U_2$:

```{math}
:label: eq.interf
\begin{align*}
Ik &= |U_1+U_2|^2=(U_1+U_2)(U_1+U_2)^*
 \\
&= |U_1|^2+|U_2|^2+U_1U_2^*+U_1^* U_2
 \\
&= I_1+I_2+2\text{Re}[ U_1 U_2^* ]
 \\
&= I_1 + I_2 + 2 \sqrt{I_1}\sqrt{I_2}\cos(\phi_1-\phi_2),
\end{align*}
```
waarbij $\phi_1$ en $\phi_2$ de argumenten zijn van $U_1$ en $U_2$ en $\phi_1-\phi_2$ het faseverschil is.
De term $2\text{Re}[U_1^* U_2]$ staat bekend als de **interferentieterm**. In het beroemde dubbelspletenexperiment (dat we in een latere paragraaf zullen bespreken) kunnen we de termen als volgt interpreteren: laten we zeggen dat $U_1$ het veld is dat afkomstig is van spleet 1, en $U_2$ komt van spleet 2. Als alleen spleet 1 open is, meten we op het scherm de intensiteit $I_1$, en als alleen spleet 2 open is, meten we $I_2$. Als beide spleten open zijn, meten we niet $I_1+I_2$, maar we nemen randen waar vanwege de interferentieterm $2\text{Re}[U_1^* U_2]$.

De intensiteit {eq}`eq.interf` varieert wanneer het faseverschil varieert. Deze variaties worden randen, of fringes, genoemd.
Het randcontrast wordt bepaald door

```{math}
:label: eq.fringecontrast
\begin{align*}
\textrm{ Fringe contrast} = \frac{ I_{max}-I_{min}}{I_{max}+I_{min}}.
\end{align*}
```
Het is maximaal en gelijk aan $ 1$ wanneer de intensiteiten van de interferende velden hetzelfde zijn. Als deze intensiteiten verschillend zijn, is het randcontrast kleiner dan 1.

Meer in het algemeen wordt de intensiteit van een som van meerdere tijdharmonische velden $U_j$ die allemaal dezelfde frequentie hebben, gegeven door de **coherente som**

```{math}
\begin{align*}
I=\left|\sum_j U_j\right|^2.
\end{align*}
```
We zullen echter in de volgende sectie zien dat de velden soms niet in staat zijn om te interfereren. In dat geval verdwijnen alle interferentietermen van de coherente som, en wordt de intensiteit gegeven door de **incoherente som**

```{math}
\begin{align*}
I=\sum_j |U_j|^2.
\end{align*}
```

## Coherentie
In de discussie tot nu toe hebben we alleen gekeken naar **monochromatisch** licht, wat betekent dat het spectrum van het licht uit slechts één frequentie bestaat.
Hoewel licht van een laser vaak een zeer smalle frequentieband heeft en daarom als monochromatisch kan worden beschouwd, bestaat puur monochromatisch licht niet.
Een van de redenen dat licht niet perfect monochromatisch kan zijn, is dat elke bron een eindige tijd geleden moet zijn ingeschakeld.
Vandaar dat al het licht uit meerdere frequenties bestaat en daarom **polychromatisch** is.
Klassieke lichtbronnen zoals gloeilampen en ook LED's hebben relatief brede frequentiebanden. De vraag ontstaat dan hoe anders polychromatisch licht zich gedraagt in vergelijking met het geïdealiseerde geval van monochromatisch licht.
Om deze vraag te beantwoorden, moeten we het onderwerp coherentie bestuderen. Men onderscheidt twee uitersten: volledig **coherent** en volledig **incoherent** licht, terwijl de mate van coherentie van praktisch licht daar ergens tussenin ligt. Over het algemeen geldt: hoe breder de frequentieband van de bron, hoe incoherenter het licht is. Het is een zeer belangrijke observatie dat geen enkel licht eigenlijk volledig coherent of volledig incoherent is. Al het licht is **gedeeltelijk coherent**, maar sommige lichten zijn coherenter dan andere.

Een intuïtieve manier om over deze concepten na te denken is in termen van het vermogen om interferentieranden te vormen. Met laserlicht, dat meestal bijna monochromatisch en dus coherent is, kan men bijvoorbeeld met behulp van een dubbele spleet een interferentiepatroon vormen met duidelijke maxima en minima in intensiteiten, terwijl dit met zonlicht (dat incoherent is) veel moeilijker is. Elke frequentie in het spectrum van zonlicht geeft zijn eigen interferentiepatroon met een eigen frequentieafhankelijk franjepatroon. Deze franjepatronen vervagen door superpositie en de totale intensiteit vertoont daardoor weinig franjecontrast, d.w.z. de coherentie is minder.
Het is echter niet onmogelijk om interferentieranden te creëren met natuurlijk licht.<sup>[^1]</sup>
De truc is om de twee spleten zo dicht bij elkaar te laten liggen (in de orde van grootte van $0,02 \, \text{mm}$) dat het *verschil* in afstanden van de spleten tot de zon zo klein is dat de velden in de spleten voldoende coherent zijn om te interfereren.
Om het effect van polychromatisch licht te begrijpen, is het essentieel om te begrijpen dat de mate waarin de velden in twee punten coherent zijn, d.w.z. het vermogen om randen te vormen, wordt bepaald door het 
**verschil in afstanden tussen deze punten en de bron**. De afstand tot de bron zelf is **niet** relevant.
Dit zal in dit hoofdstuk duidelijk worden gemaakt.

(subsection.cohsources)=
### coherentie van lichtbronnen

In een conventionele lichtbron zoals een gasontladingslamp worden fotonen opgewekt door **spontane emissie** met een energie die gelijk is aan het energieverschil tussen bepaalde elektron-toestanden van de atomen van het gas. Deze overgangen hebben een duur in de orde van $10^{-8}$ tot
$10^{-9} \, \text{s}$. Omdat de uitgezonden golftreinen eindig zijn, heeft het uitgezonden licht geen enkele frequentie; In plaats daarvan is er een frequentieband rond een middenfrequentie met een breedte die ongeveer gelijk is aan het omgekeerde van de duur van de golftrein. Deze spreiding van frequenties wordt de **natuurlijke lijnbreedte** genoemd. Willekeurige thermische bewegingen van de moleculen zorgen voor verdere verbreding door het Doppler-effect. Bovendien ondergaan de atomen botsingen die de golftreinen onderbreken en daardoor het frequentiespectrum verder verbreden.

We beschouwen eerst een **enkelvoudig emitterend atoom**. Wanneer botsingen het overheersende verbredende effect hebben en deze botsingen voldoende kort zijn, zodat de straling die tijdens de botsing wordt uitgezonden kan worden genegeerd, is een nauwkeurig model voor de uitgezonden golf een constante monochromatische golftrein met frequentie $\mathbf{a}r{\omega}$ in het midden van de frequentieband, onderbroken door willekeurige fasesprongen telkens wanneer een botsing plaatsvindt. De discontinuïteiten in de fase als gevolg van de botsingen veroorzaken een spreiding van frequenties rond de middenfrequentie. Een voorbeeld is te zien in {numref}`Fig_5_01_Atom_Random_Emission`. De gemiddelde tijd $\tau_0$ tussen de botsingen is typisch minder dan $10^{-10}$ s, wat inhoudt dat er gemiddeld tussen twee botsingen ongeveer $10^6$ harmonische oscillaties optreden en dat tijdens een atoomovergang in de orde van grootte van honderd botsingen kunnen optreden. De coherentietijd $\Delta \tau_c$ wordt gedefinieerd als het maximale tijdsinterval waarover de fase van het elektrische veld kan worden voorspeld. In het geval van door botsingen gedomineerde emissie door een enkel atoom, is de coherentietijd gelijk aan de gemiddelde tijd tussen opeenvolgende botsingen: $\Delta \tau_c = \tau_0\text{ }10^{-10}$ s.

Om coherentie en incoherentie te begrijpen, is het nuttig om dit model te gebruiken voor de emissie door een enkel atoom als harmonische golftreinen van vele duizenden perioden onderbroken door ongeveer honderd willekeurige fasesprongen. Door de willekeurige fasesprongen wordt de interferentieterm van de som van harmonische golftreinen die door twee atomen worden uitgezonden wanneer geïntegreerd over de relatief lange integratietijd van een detector een som over integralen over tijdsintervallen van gemiddelde lengte $\tau_0$:

$$
\sum_{j} \int_0^{\tau_0} \cos(\omega t) \cos(\omega t + \phi_j) \text{d} t,

$$
waarbij de som meer is dan ongeveer honderd willekeurige fasesprongen gedurende de totale duur van de golftreinen. De willekeurige fasesprongen leiden tot annulering van de integralen en daarmee verdwijnt de interferentieterm.
We concluderen dat over de integratietijd van typische detectoren


```{note}
Licht treinen die spontaan door verschillende atomen zijn uitgezonden, kunnen niet interfereren.
```



```{figure} Images/Chapter_5/5_01_Atom_Random_Emission.png
:name: Fig_5_01_Atom_Random_Emission
De amplitude van het elektrische veld van de harmonische golftrein die wordt uitgestraald door een enkel atoom op de middenfrequentie $\mathbf{a}r{\omega}$. De verticale lijnen zijn botsingen gescheiden door perioden van vrije vlucht met een gemiddelde duur $\tau_0$. De hoeveelheid $\mathbf{a}r{\omega}\tau_0$, dat is het aantal perioden in een typische golftrein, wordt onrealistisch klein gekozen (namelijk 60, terwijl een realistische waarde $10^5$ zou zijn) om de willekeurige faseveranderingen weer te geven.
```

De coherentietijd en de breedte $\Delta \omega$ van de frequentielijn zijn gerelateerd als

```{math}
:label: eq.tcoh
\begin{align*}
\Delta \tau_c = \frac{2\pi}{\Delta \omega}.
\end{align*}
```
De coherentielengte wordt bepaald door

```{math}
:label: eq.lcoh
\begin{align*}
\Delta \ell_{c}= c \Delta \tau_c.
\end{align*}
```
Aangezien $\lambda \omega = 2\pi c$, hebben we

```{math}
:label: eq.dlambdadomega
\begin{align*}
\frac{\Delta \lambda}{\mathbf{a}r{\lambda}} = \frac{\Delta \omega}{\mathbf{a}r{\omega}},
\end{align*}
```
waarbij $\mathbf{a}r{\lambda}$ en $\mathbf{a}r{\omega}$ de golflengte en de frequentie in het midden van de lijn zijn. Vandaar dat

```{math}
:label: eq.lcoh2
\begin{align*}
\Delta \ell_c = c \frac{2\pi}{\Delta \omega} = 2\pi \frac{c}{\mathbf{a}r{\omega}} \frac{\mathbf{a}r{\omega}}{\Delta \omega} = \frac{\mathbf{a}r{\lambda}^2}{\Delta \lambda}.
\end{align*}
```
De coherentielengte en coherentietijd van een aantal bronnen staan vermeld in {numref}`Table.coh`. Voor een laser is de lijnbreedte extreem klein en de coherentietijd erg lang. Dit komt omdat de fotonen in een laser niet voornamelijk worden gegenereerd door spontane emissie zoals klassieke bronnen, maar in plaats daarvan door **gestimuleerde emissie**. Lasers worden besproken in hoofdstuk {eq}`chapter.lasers`.

```{table} Coherentietijd en coherentielengte van verschillende bronnen
:name: Table.coh
| Bron | Gemiddelde golflengte | Lijnbreedte | Coherentie Lengte | Coherentie Tijd |
| :--- | :--: | :--: | :--: | :--: |
| | $\mathbf{a}r{\lambda}$ | $\Delta \lambda$ | $\mathbf{a}r{\lambda}^2/\Delta \lambda$ | $ \Delta \tau_c $ |
| | | | | |
| Mid-IR (3-5 $\mu\text{m}$) | 4.0 $\mu\text{m}$ | $2.0 \, \mu\text{m} $ | 8.0 $\mu\text{m}$| $2.66 \times10^{-14}$ s. 
|
| Wit licht | 550 nm | $\approx 300 $ nm | $ \approx 900$ nm | $ \approx 3,0 \times 10^{-14}$s.|
| Mercuriusboog | 546,1 nm | $\approx 1,0$ nm | $\approx 0,3$ mm | $\approx 1,0 \times 10^{-12}$s. 
|
| $\text{Kr}^{86}$ ontladingslamp | 605,6 nm | $1,2 \times 10^{-3}$ nm | 0,3 m | $ 1,0 \times 10^{-9}$s. 
|
| Gestabiliseerde He-Ne-laser | 632,8 nm | $\approx 10^{-6}$ nm | 400 m | $1,33\times 10^{-6}$s. 
|
```


### Polychromatisch licht
Als het om coherentie gaat, moet men rekening houden met velden die bestaan uit een reeks van verschillende frequenties. Laat ${\cal U}(\mathbf{r},t)$ de reële veldcomponent zijn. Het is altijd mogelijk om ${\cal U}(\mathbf{r},t)$ te schrijven als een integraal in de tijd-harmonische componenten:

```{math}
:label: eq.defUrealt
\begin{align*}
{\cal U} (\mathbf{r}, t) = \text{Re} \int_0^\infty A_\omega(\mathbf{r}) e^{-i \omega t} \, \, \text{d} \omega,
\end{align*}
```
waarin $A_\omega(r)$ de complexe amplitude van het tijdharmonische veld met frequentie $\omega$ is.
Als er alleen een bepaalde frequentieband is die bijdraagt, dan is $A_\omega=0$ voor $\omega$ buiten deze band.
We definiëren het **complex tijdsafhankelijk veld** $U(\mathbf{r},t)$ door

```{math}
:label: eq.defUcomplext
\begin{align*}
U(\mathbf{r},t) = \int_0^\infty A_\omega(\mathbf{r}) e^{-i\omega t}\ \, \text{d} \omega.
\end{align*}
```
Dan

```{math}
:label: eq.Urc
\begin{align*}
\mathcal{U}(\mathbf{r},t)= \text{Re}\, U(\mathbf{r},t).
\end{align*}
```
**Opmerking**: Het complexe veld $U(\mathbf{r},t)$ bevat nu de tijdsafhankelijkheid in tegenstelling tot de notatie die werd gebruikt voor een tijdharmonisch (d.w.z. enkelvoudig frequentie) veld dat in hoofdstuk 2 werd geïntroduceerd, waar de tijdsafhankelijke $e^{-i\omega t}$ een aparte factor was.



We berekenen nu de intensiteit van polychromatisch licht.
De momentane energieflux is (net als bij monochromatisch licht) evenredig met het kwadraat van het momentane reële veld:
$\mathcal{U}(\mathbf{r},t)^2$. We nemen het gemiddelde van de momentane intensiteit over de integratietijd $T $ van gewone detectoren die, zoals eerder vermeld, erg lang is in vergelijking met de periode op de centrale frequentie $2\pi/\mathbf{a}r{\omega}$ van het veld. Met behulp van de definitie {eq}`eq.averageII` en

```{math}
\begin{align*}
\mathcal{U}(\mathbf{r},t)=
\text{Re}\, U(\mathbf{r},t)
=(U(\mathbf{r},t)+U(\mathbf{r},t)^*)/2,
\end{align*}
```
krijgen we

```{math}
:label: eq.poly10
\begin{align*}
\braket{ \mathcal{U}(\mathbf{r},t)^2 } &= \frac{1}{4} \braket{ (U(\mathbf{r},t)+U(\mathbf{r},t)^*)(U(\mathbf{r},t)+U(\mathbf{r},t)^*)} \nonumber \\
&= \frac{1}{4} \left\{ \braket{U(\mathbf{r},t)^2} + \braket{(U(\mathbf{r},t)^*)^2} + 2 \braket{U(\mathbf{r},t)^* U(\mathbf{r},t)}\right\} \nonumber \\
& \approx & \frac{1}{2} \braket{U(\mathbf{r},t)U(\mathbf{r},t)^*} \nonumber \\
&= \frac{1}{2} \braket{|U(\mathbf{r},t)|^2 },
\end{align*}
```
```{math}
:label: eq.poly10b
\begin{align*}
\\\end{align*}
```
waarbij de gemiddelden van $U(\mathbf{r},t)^2$ en $(U(\mathbf{r},t)^*)^2$ nul zijn omdat ze snel oscilleren en vele cycli doorlopen tijdens de integratietijd van de detector.
Daarentegen, $|U(\mathbf{r},t)|^2=U(\mathbf{r},t)^*U(\mathbf{r},t)$ heeft een DC-component die niet gemiddeld gelijk is aan nul.




**Opmerking:** In tegenstelling tot het tijdharmonische geval hangt het langetermijn gemiddelde van polychromatisch licht af van het tijdstip $t$ waarop het gemiddelde wordt genomen. We gaan er in dit hoofdstuk echter van uit dat de velden zijn geproduceerd door bronnen die **stationair** zijn. De eigenschap van stationariteit houdt in dat het gemiddelde over het tijdsinterval van lange lengte $T$ niet afhangt van de tijd dat het gemiddelde wordt genomen. Veel lichtbronnen, met name conventionele lasers, zijn stationair. (Een laserbron die korte pulsen met hoog vermogen uitzendt, kan echter niet als een stationaire bron worden beschouwd).
Verder gaan we ervan uit dat de velden **ergodisch** zijn, wat betekent dat het nemen van het tijdgemiddelde over een lang tijdsinterval hetzelfde is als het nemen van het gemiddelde over het geheel van mogelijke velden. Er kan worden aangetoond dat deze eigenschap impliceert dat de limiet $T\rightarrow \infty$ in {eq}`eq.averageII` inderdaad bestaat<sup>[^2]</sup>.




We gebruiken voor de intensiteit opnieuw de uitdrukking zonder de factor $1/2$ ervoor, d.w.z.

```{math}
:label: eq.defI
\begin{align*}
I(\mathbf{r}) &= \braket{ |U(\mathbf{r},t)|^2}.
\end{align*}
```
De tijdsgemiddelde intensiteit is hierbij uitgedrukt in termen van het **tijdgemiddelde van de kwadraatmodulus van het complexe veld**.

**Quasi-monochromatisch veld**.
Als de breedte $\Delta \omega$ van de frequentieband erg smal is ten opzichte van de middenfrequentie $\mathbf{a}r{\omega}$, spreken we van een quasi-monochromatisch veld. Bij de voortplanting van quasi-monochromatische velden gebruiken we de formule voor tijdharmonische velden op $\mathbf{a}r{\omega}$. De quasi-monochromatische aanname vereenvoudigt de berekeningen aanzienlijk en zal daarom veelvuldig worden gebruikt.

(section.tempcoh)=
## Temporele coherentie en de Michelson-interferometer

Om de tijdscoherentie van een veld in een bepaald punt $\mathbf{r}$ te onderzoeken, 
laten we het veld op dat punt met zichzelf interfereren, maar vertraagd in de tijd, d.w.z. we laten
$U(\mathbf{r},t)$ interfereren met $U(\mathbf{r}, t-\tau)$. Omdat bij het bestuderen van temporele coherentie het punt $\mathbf{r}$ altijd hetzelfde is, laten we het weg uit de formule. Bovendien nemen we, om de verschijnselen beter te begrijpen, voorlopig aan dat het beschouwde veld wordt uitgezonden door een enkel atoom (d.w.z. een puntbron).

Temporele coherentie hangt nauw samen met de spectrale inhoud van het licht: als het licht uit minder frequenties bestaat (denk aan monochromatisch licht), dan is het meer temporeel coherent. Om de interferentie van $U(t)$ met $U(t-\tau)$ te bestuderen, is een Michelson-interferometer, getoond in {numref}`Fig_5_02_Temporal_Coherence`, een geschikte opstelling. Het licht dat door de ene arm gaat, heeft tijd $t$ nodig om de detector te bereiken, terwijl het licht dat door de andere (langere) arm gaat $t+\tau$ noid heeft, wat betekent dat het eerder is uitgestraald. Daarom neemt de detector de tijdgemiddelde intensiteit $\braket{|U(t)+U(t-\tau)|^2}$. Zoals eerder opgemerkt, hangt deze gemiddelde intensiteit niet af van het tijdstip waarop het gemiddelde wordt genomen, maar alleen van het tijdsverschil $\tau$ tussen de twee bundels.

```{figure} Images/Chapter_5/5_02_Temporal_Coherence.png
:name: Fig_5_02_Temporal_Coherence
Een Michelson-interferometer om de temporele coherentie van een veld te bestuderen. Een bundel wordt in tweeën gesplitst door een bundelsplitser, en de twee bundels planten zich voort over verschillende afstanden, wat overeenkomt met een tijdsverschil $\tau$ en interfereren dan bij de detector.
```

We hebben

```{math}
:label: eq.Itau
\begin{align*}
I(\tau)&= \braket{|U(t)+U(t-\tau)|^2}
&= \braket{|U(t)|^2}+\braket{|U(t-\tau)|^2}+2\text{Re} \braket{U(t)U(t-\tau)^*}  \\
&= 2 \braket{|U(t)|^2} + 2\text{Re}\braket{U(t)U(t-\tau)^*}.
\end{align*}
```
De gedetecteerde intensiteit varieert met het verschil in armlengte.

Tot nu toe hebben we een veld overwogen dat afkomstig is van een enkel atoom. Het totale veld dat door een uitgebreide bron wordt uitgezonden, is de som van de velden $U_i(t)$ die overeenkomen met alle atomen $i$. Zoals al is uitgelegd, kunnen de velden die door verschillende atomen worden uitgezonden niet interfereren. Maar het veld dat door een atoom wordt uitgezonden, kan interfereren met het vertraagde veld van datzelfde atoom. Voor elk atoom wordt de interferentie gegeven door dezelfde uitdrukking {eq}`eq.Itau`. De totale intensiteit is eenvoudig gegeven door die van een enkel atoom vermenigvuldigd met het aantal atomen.
In het bijzonder is de verhouding van de interferentieterm en de andere termen voor de hele bron hetzelfde als voor een enkel atoom.

De **zelfcoherentiefunctie** $\Gamma(\tau)$ wordt gedefinieerd door

```{math}
\boxed{ \begin{align*}
\Gamma(\tau)=\braket{U(t)U(t-\tau)^*} \hspace{1.5cm}\textbf{self-coherence}.
\end{align*}}
```

De intensiteit van $U(t)$ is

```{math}
\begin{align*}
I_0=\braket{|U(t)|^2} = \Gamma(0).
\end{align*}
```
De **complexe mate van zelfcoherentie** wordt gedefinieerd door:


```{math}
:label: eq.defgamma
\boxed{\begin{align*}
\gamma(\tau)=\frac{\Gamma(\tau)}{\Gamma(0)}. \hspace{1.2cm} \textbf{complexe mate van zelfcoherentie}
\end{align*}}
```
Met behulp van de ongelijkheid van Bessel kan worden aangetoond dat dit een complex getal is met een modulus tussen $0$ en $1$:

```{math}
:label: eq.defgamma2
\begin{align*}
0 \leq |\gamma(\tau)| \leq 1.
\end{align*}
```
De waargenomen intensiteit kan dan worden geschreven:

```{math}
:label: eq.inter_coh
\begin{align*}
I(\tau)=2 I_0 \left\{1 +\text{Re}\left[\gamma(\tau)
\right]\right\},
\end{align*}
```
Onthoud dat we $\tau$ variëren door de lengte van een van de armen in de Michelson-interferometer te variëren.
We beschouwen twee speciale gevallen:

1. Stel dat $U(t)$ een monochromatische golf is

```{math}
\begin{align*}
U(t)=e^{-i\omega t}.
\end{align*}
```
In dat geval krijgen we voor de zelfcoherentie

```{math}
:label: eq.SelfG_mono
\begin{align*}
\begin{split}
\Gamma(\tau)&=\braket{e^{-i\omega t}e^{i\omega (t-\tau)}}
=e^{-i\omega \tau},
\end{split}
\end{align*}
```
en

```{math}
:label: eq.gamma
\begin{align*}
\gamma(\tau) = e^{-i\omega \tau}.
\end{align*}
```
Vandaar dat het interferentiepatroon wordt gegeven door

```{math}
:label: temporalcoherence
\begin{align*}
\begin{split}
I(\tau)&=2\left[1+ \cos\left( \omega\tau \right) \right].
\end{split}
\end{align*}
```
Dus voor monochromatisch licht verwachten we een cosinusinterferentiepatroon te detecteren, dat verschuift als we de armlengte van de interferometer veranderen (d.w.z. $\tau$ veranderen). Hoe groot de tijdsvertraging $\tau$ ook is, er moet een duidelijk interferentiepatroon worden waargenomen.


2. Vervolgens bekijken we wat er gebeurt als het licht een superpositie is van twee frequenties:

```{math}
\begin{align*}
U(t)=\frac{e^{-i(\mathbf{a}r{\omega}+\Delta\omega/2) t}+e^{-i(\mathbf{a}r{\omega}-\Delta\omega/2) t}}{2},
\end{align*}
```
waarbij $\left(2\pi/T\right) \ll \Delta \omega \ll \mathbf{a}r{\omega}$, waarin $T$ de integratietijd van de detector is.
Dan:

```{math}
:label: eq.fringe
\begin{align*}
\Gamma(\tau)&=\frac{1}{4}\braket{\left(e^{-i(\mathbf{a}r{\omega}+\Delta\omega/2) t}+e^{-i(\mathbf{a}r{\omega}-\Delta\omega/2) t}\right)\left(e^{i(\mathbf{a}r{\omega}+\Delta\omega/2) (t-\tau)}+e^{i(\mathbf{a}r{\omega}-\Delta\omega/2) (t-\tau)}\right)}
&\approx & \frac{e^{-i(\mathbf{a}r{\omega}+\Delta\omega/2) \tau}+e^{-i(\mathbf{a}r{\omega}-\Delta\omega/2) \tau}}{4}
 \\
&= \cos\left(\Delta\omega\,\tau/2\right)\frac{e^{-i \mathbf{a}r{\omega} \tau}}{2},
\end{align*}
```
waarbij in de tweede regel het tijdsgemiddelde van termen die oscilleren met de tijd op nul wordt gezet omdat het gemiddelde wordt gedaan over tijdsinterval $T$ dat voldoet aan $T\Delta \mathbf{a}r{\omega} \gg 1$.
De complexe mate van zelfcoherentie is dus:

```{math}
:label: eq.gamma2
\begin{align*}
\gamma(\tau)= \cos\left(\Delta\omega\,\tau/2 \right) e^{-i \mathbf{a}r{\omega} \tau}
\end{align*}
```
en {eq}`eq.inter_coh` wordt

```{math}
:label: eq.intens2freq
\begin{align*}
I(\tau)= \left\{1 +\text{Re}\left[\gamma(\tau)
\right]\right\}= 1 + \cos\left(\Delta\omega\,\tau/2\right) \cos(\mathbf{a}r{\omega} \tau ).
\end{align*}
```
De interferentieterm is het product van de functie $\cos(\mathbf{a}r{\omega}\tau))$, die een snel oscillerende functie is van $\tau$, en een langzaam variërende omhulling $\cos \left(\Delta\omega\,\tau/2\right)$.
Het is interessant om op te merken dat de omhulling, en dus $\gamma(\tau)$, verdwijnt voor een periodiek gespreide $\tau$, wat betekent dat voor bepaalde $\tau$ de mate van zelfcoherentie verdwijnt en er geen interferentieranden vormen <sup>[^3]</sup>.$ ^,$<sup>[^4]</sup>. Merk op dat wanneer $\Delta\omega$ groter is, de intervallen tussen de nullen van $\gamma(\tau)$ afnemen.
En inderdaad is de coherentietijd over het algemeen omgekeerd evenredig met de spreiding van het frequentiespectrum van het licht.
Als er meer frequenties worden toegevoegd, is de omhullende functie geen cosinusfunctie, maar neemt deze gemiddeld af met $\tau$. De typische waarde van $\tau$ waaronder interferenties worden waargenomen is ongeveer gelijk aan de helft van de eerste nul van de omhullende functie. Deze waarde wordt de **coherentietijd** $ \Delta \tau_c$ genoemd.
We sluiten af met enkele verdere interpretaties van de mate van zelfcoherentie $\gamma(\tau)$.

**Opmerkingen.**

1. In de stochastische signaalanalyse wordt $\Gamma(\tau)=\braket{U(t)U(t-\tau)^*}$ de **autocorrelatie** van $U(t)$ genoemd. Informeel kan men de autocorrelatiefunctie interpreteren als het vermogen om het veld te voorspellen $U$ op tijdstip $t$ gegeven het veld op tijdstip $t-\tau$. 

2. De stelling van Wiener-Khinchin zegt dat (onder de aanname van ergodiciteit en voor stationaire velden) de **Fouriertransformatie van de zelfcoherentiefunctie de spectrale vermogensdichtheid is van** $U(t)$:

$$
\hat{\Gamma}(\omega)=|\hat{U}(\omega)|^2,
$$ (eq.Gammaomegsa)

'Met behulp van het onzekerheidsprincipe kunnen we zien dat hoe groter de spreiding van de frequenties van $U(t)$ (d.w.z. hoe groter de bandbreedte), hoe scherper de piek $\Gamma(\tau)$ is. Het licht wordt dus tijdelijk minder coherent wanneer het uit een breder frequentiebereik bestaat. Het meten van de spectrale vermogensdichtheid met een spectroscoop en het toepassen van een terug-Fouriertransformatie is een alternatieve methode om de complexe zelfcoherentiefunctie te verkrijgen.

Merk op dat, zelfs als de bron niet monochromatisch is en de coherentietijd van de bron kort is, de velden in de dwars gescheiden punten $P_1$ en $P_4$ aan de linkerkant van {numref}`Fig_Hechtcoh` altijd volledig gecorreleerd zijn omdat ze zich voor alle frequenties op hetzelfde golffront bevinden. In feite zijn de afstanden tussen de bron en deze punten identiek. Echter, in plaats van tegelijkertijd naar de velden in deze punten te kijken, zou men het veld in het ene punt vergelijken met een vertraagde versie van het veld in het andere punt, en die tijdsvertraging zou groter zijn dan de coherentietijd, dan zal de interferentie van de twee velden zwak zijn.

(section.spatcoh)=
## ruimtelijke coherentie en Young's experiment

Temporele coherentie betreft de coherentie van het veld in één punt. De absolute waarde van de mate van zelfcoherentie {eq}`eq.defgamma` kwantificeert hoe sterk de interferentie is van het veld in het aandachtspunt met het veld in datzelfde punt op een later tijdstip. Bij ruimtelijke coherentie daarentegen gaat het erom te bepalen hoe coherent de velden op twee verschillende punten zijn. Dit wordt gedaan door de velden te laten interfereren met behulp van een masker met twee kleine gaatjes op de posities van de aandachtspunten en het randcontrast op een ver scherm te observeren (Young's experiment).

Terwijl we voor temporele coherentie een **Michelson-interferometer** gebruikten, is de natuurlijke keuze om ruimtelijke coherentie te karakteriseren
**Young's experiment**, omdat het de velden in twee punten $P_1$, $P_2$ die in de ruimte gescheiden zijn, met elkaar laat interfereren.

```{figure} Images/Chapter_5/5_04_Spatial Coherence.png
:name: Fig_5_04_Spatial Coherentie
Young's experiment om de ruimtelijke coherentie van twee punten te evalueren. Een masker met twee gaten op de twee aandachtspunten, $\mathbf{r}_1$ en $\mathbf{r}_2$, wordt gebruikt om de velden op deze punten op een scherm op grote afstand te laten interfereren. Omdat het licht zich voortplant over verschillende afstanden van de twee gaten naar de waarnemingspunten, interfereert $U(\mathbf{r}_1,t)$ met $U(\mathbf{r}_2,t+\tau)$, waarbij $\tau$ het verschil in voortplantingstijd is.
```

Laat $\mathbf{r}_1$en $\mathbf{r}_2$ de positievectoren zijn van de punten $P_1$ en $P_2$, respectievelijk.
We schrijven het complexe veld in $P_1$ als een superpositie van monochromatische velden zoals in {eq}`eq.defUcomplext`:

```{math}
:label: eq.defUcomplext1
\begin{align*}
U(\mathbf{r}_1,t) = \int A_\omega(\mathbf{r}_1) e^{-i\omega t}\ \, \text{d} \omega.
\end{align*}
```
De reden hiervoor is dat we voor een monochromatisch veld in het gaatje, d.w.z. een veld met een goed gedefinieerde frequentie, de verstoring kunnen afleiden op elk punt $\mathbf{r}$ achter het masker.
Volgens het Huygens-Fresnel-principe genereert een monochromatische verstoring met frequentie $\omega$ in het gaatje op $\mathbf{r}_1$ een uitstralende sferische golf met dezelfde frequentie $\omega$, zodanig dat in een punt $\mathbf{r}$ achter het masker het veld gelijk is aan:

```{math}
:label: eq.timeharm
\begin{align*}
{\cal S} A_\omega(\mathbf{r}_1)\, \frac{\omega}{c} \,\frac{e^{-i \omega(t- |\mathbf{r}-\mathbf{r}_1|/c)}}{ |\mathbf{r}-\mathbf{r}_1|},
\end{align*}
```
waar ${\cal S}$
de oppervlakte van het gaatje is.
We gaan ervan uit dat de frequentieband zo klein is dat de frequentiefactor die $A_\omega$ vermenigvuldigt, kan worden vervangen door de middenfrequentie $\mathbf{a}r{\omega}$. Merk op dat dit niet moet worden gedaan in de exponent in {eq}`eq.timeharm` omdat een fout in de fase gemakkelijk kan leiden tot grote fouten in het totale veld.
Het totale veld $U_1(\mathbf{r},t)$ in $\mathbf{r}$ als gevolg van het gaatje op $P_1$ wordt verkregen door de monochromatische componenten over frequentie te integreren:

```{math}
:label: eq.Uhuygens
\begin{align*}
U_1(\mathbf{r},t) = {\cal S} \,\frac{\mathbf{a}r{\omega}}{c} \int A_\omega(\mathbf{r}_1)\frac{e^{-i \omega( t-|\mathbf{r}-\mathbf{r}_1|/c)}}{ |\mathbf{r}-\mathbf{r}_1|} \text{d} \omega ={\cal S}\, \frac{\mathbf{a}r{\omega}}{c}
\frac{U(\mathbf{r}_1, t - |\mathbf{r}-\mathbf{r}_1|/c)}{ |\mathbf{r}-\mathbf{r}_1|}.
\end{align*}
```
In woorden:

```{note}
Het veld in $\mathbf{r}$ op tijdstip $t$ als gevolg van het gaatje op $\mathbf{r}_1$ is evenredig met het veld op $\mathbf{r}_1$ op de eerdere tijd $=|\mathbf{r}-\mathbf{r}_1|/c$ die het licht nodig heeft om zich voort te planten van $\mathbf{r}_1$ tot $\mathbf{r}$. De evenredigheidsfactor schaalt met de reciproke afstand tussen $\mathbf{r}$ en $\mathbf{r}_1$.
```

Voor het veld in $\mathbf{r}$ als gevolg van gaatje 2 hebben we op dezelfde manier

```{math}
:label: eq.Uhuygens2
\begin{align*}
U_2(\mathbf{r},t) = {\cal S}\, \frac{\mathbf{a}r{\omega}}{c}
\frac{U(\mathbf{r}_2, t - |\mathbf{r}-\mathbf{r}_1|/c)}{ |\mathbf{r}-\mathbf{r}_2|}.
\end{align*}
```
Het totale veld in $\mathbf{r}$ is de som $U_1(\mathbf{r},t)+U_2(\mathbf{r},t)$.
Vanwege het verschil in voortplantingsafstand
$\Delta R=|\mathbf{r}-\mathbf{r}_2|-|\mathbf{r}-\mathbf{r}_1|$, is er een tijdsverschil $\tau$ tussen het moment waarop de twee velden zijn uitgezonden door de twee gaatjes wanneer ze op een bepaald tijdstip aankomen $T$ IN-punt $\mathbf{r}$ op het scherm in {numref}`Fig_5_04_Spatial Coherentie`. Dit tijdsverschil wordt gegeven door

```{math}
:label: eq.tau2
\begin{align*}
\tau = \frac{\Delta R}{c}.
\end{align*}
```
Bovendien worden de amplitudes verminderd met een factor die evenredig is met de reciproke afstand die voor de twee velden verschillend is. Maar als de afstand van het scherm tot het masker groot genoeg is, kunnen we aannemen dat deze factoren hetzelfde zijn en ze vervolgens weglaten.
Met behulp van {eq}`eq.tau2` wordt dan het interferentiepatroon op het scherm, afgezien van een constante factor, gegeven door

```{math}
:label: eq.fringe_sp
\begin{align*}
I(\tau)&= \braket{ \, |U_1(\mathbf{r},t) + U_2(\mathbf{r},t) |^2 \, } 
&= \braket{\, | U(\mathbf{r}_1, t-|\mathbf{r}-\mathbf{r}_1||/c) + U(\mathbf{r}_2, t-|\mathbf{r}-\mathbf{r}_2||/c)|^2 \, }  \\
&= \braket{\, |U(\mathbf{r}_1,t)+U(\mathbf{r}_2,t- \tau)|^2\, }  \\
&=\braket{\, |U(\mathbf{r}_1,t)|^2}+\braket{|U(\mathbf{r}_2,t-\tau)|^2\,}+2\text{Re}\braket{\,U(\mathbf{r}_1,t)U(\mathbf{r}_2,t-\tau)^*\, }
 \\
&= \braket{\, |U(\mathbf{r}_1,t)|^2\,}+\braket{\, |U(\mathbf{r}_2,t)|^2\, }+2\text{Re}\braket{\, U(\mathbf{r}_1,t)U(\mathbf{r}_2,t-\tau)^*\,},
\end{align*}
```
Waar we in de derde en laatste regel hebben gebruikt dat het tijdgemiddelde niet afhankelijk is van de tijd die het nodig heeft, omdat de lichtbron wordt verondersteld stil te staan.
We definiëren de **wederzijdse coherentiefunctie** door:


```{math}
:label: eq.mutcoh
\boxed{\begin{align*}
\Gamma_{12}(\tau)=\braket{\,U(\mathbf{r}_1,t)U(\mathbf{r}_2,t-\tau)^*\,}, \hspace{1.5cm} \textbf{wederzijdse coherentie}.
\end{align*}}
```

Met de intensiteiten

```{math}
\begin{align*}
\begin{split}
I_1&=\braket{\, |U(\mathbf{r}_1,t)|^2\, } = \Gamma_{11}(0),\\
I_2&=\braket{\, |U(\mathbf{r}_2,t)|^2\, } = \Gamma_{22}(0).
\end{split}
\end{align*}
```
De **complexe graad van wederzijdse coherentie** wordt gedefinieerd door 

```{math}
:label: eq.defgamma12
\boxed{\begin{align*}
\gamma_{12}(\tau)=\frac{\Gamma_{12}(\tau)}{\sqrt{ \Gamma_{11}(0)}\sqrt{\Gamma_{22}(0)}}, \quad \textbf{complexe mate van onderlinge coherentie}.
\end{align*}}
```

Aan de hand van de ongelijkheid van Bessel kan worden aangetoond dat

$$
|\gamma_{12}(\tau)| \leq 1.
$$ (eq.gamma12)

We kunnen nu {eq}`eq.fringe_sp` schrijven als

```{math}
\begin{align*}
I(\tau)=I_1+I_2+2\sqrt{I_1}\sqrt{I_2}\,\text{Re} \, \gamma_{12}(\tau).
\end{align*}
```
Door het punt $\mathbf{r}$ over het scherm te variëren, kunnen we $\tau$ variëren en door de intensiteiten te meten, kunnen we het reële deel van $\gamma_{12}(\tau)$ bepalen en dus het randcontrast dat op het scherm worden waargenomen.

Beschouw bijvoorbeeld wat er gebeurt als $U(\mathbf{r},t)$ een monochromatisch veld is

```{math}
\begin{align*}
U(\mathbf{r},t)=A(\mathbf{r})e^{-i\omega t}.
\end{align*}
```
In dat geval

```{math}
\begin{align*}
\begin{split}
\Gamma_{12}(\tau)&=\braket{A(\mathbf{r}_1)A(\mathbf{r}_2)^*e^{-i\omega t}e^{i\omega (t-\tau)}}
&=A(\mathbf{r}_1) A(\mathbf{r}_2)^*e^{-i\omega \tau}.
\end{split}
\end{align*}
```
en

$$
\Gamma_{11}(0)= |A(\mathbf{r}_1)|^2, \quad \Gamma_{22}(0)=|A(\mathbf{r}_2)|^2.
$$ (eq.Gamma110)

Dus we krijgen

```{math}
:label: eq.gamma12a
\begin{align*}
\gamma_{12} (\tau) = \frac{\Gamma_{12}(\tau)}{|A(\mathbf{r}_1)| |A(\mathbf{r}_2)|} = e^{-i \omega \tau + i \varphi},
\end{align*}
```
waarbij $\varphi$ het faseverschil is van $A(\mathbf{r}_2)$ en $A(\mathbf{r}_1)$. In dit geval heeft
$\gamma_{12}$ modulus 1, zoals verwacht voor een monochromatisch veld.
De intensiteit op het scherm wordt

```{math}
:label: doubleslitinterference
\begin{align*}
I(\tau)=|A(\mathbf{r}_1)|^2+|A(\mathbf{r}_2)|^2+2|A(\mathbf{r}_1)||A(\mathbf{r}_2)|\cos\left(\omega \tau -\varphi\right).
\end{align*}
```
We zien dus inderdaad interferentieranden met maximaal contrast 1 en dus zijn de velden in $P_1$ en $P_2$ volledig cohreent zoals je zou verwachten voor een monochromatische golf. Als $\varphi=0$, dan treden interferentiemaxima op voor

```{math}
\begin{align*}
\omega\tau=0,\pm 2\pi, \pm 4\pi, \pm 6\pi,\dots
\end{align*}
```
Omdat $\omega=c\frac{2\pi}{\lambda}$, en $\Delta R=c\tau$, vinden we dat maxima optreden wanneer

```{math}
\begin{align*}
\Delta R = 0,\pm \ lambda,\pm 2 \ lambda, \pm 3 \ lambda,\dots
\end{align*}
```
Voor een grote afstand tussen het scherm en het masker (in de Fraunhofer-limiet) komen deze verschillen in weglengte overeen met de richtingen van de maxima die worden gegeven door de hoeken $\theta_m$ (zie {numref}`Fig_5_04_Spatial Coherentie`):

```{math}
:label: eq.theta_Young
\begin{align*}
\theta_m = \frac{\Delta R}{d} = m \frac{\lambda}{d},
\end{align*}
```
waarbij $d$ de afstand tussen de spleten is en $m$ een geheel getal is<sup>[^5]</sup>.


**Opmerkingen**. 

1. De onderlinge coherentie $\Gamma_{12}(\tau)= \braket{U(\mathbf{r}_1,t)U(\mathbf{r}_2,t-\tau)^*}$ is de **kruiscorrelatie** van de twee signalen $U(\mathbf{r}_1,t)$ en $U(\mathbf{r}_2,t)$.


2. Zoals hierboven opgemerkt, kan men door het waarnemingspunt $\mathbf{r}$ over het scherm te bewegen, het reële deel van de complexe graad van wederzijdse coherentie verkrijgen. Om ook het imaginaire deel af te leiden, kan men een stuk glas achter een van de gaatjes plaatsen met een zodanige dikte dat voor de middenfrequentie $\mathbf{a}r{\omega}$ een extra faseverschil van $\pi/2$ wordt verkregen van de velden in $\mathbf{r}_1$ en $\mathbf{r}_2$. Als de frequentieband $\Delta \omega$ voldoende smal is, geldt dit faseverschil bij goede benaderingen voor alle frequenties in de band.

```{index} Meer over ruimtelijke coherentie
:name: section.scprop
```
## Meer over ruimtelijke coherentie


We gaan eerst na of de bron zo klein is (bijvoorbeeld een enkel emitterend atoom) dat deze als een puntbron kan worden beschouwd
$S$.
In dat geval is het zo dat de velden in twee punten $P_1$, $P_2$
ergens in de ruimte coherent zijn dan en slechts dan als het verschil in tijd dat licht nodig heeft om zich voort te planten van $S$ tot $P_1$ en van $S$ tot $P_2$ kleiner is dan de coherentietijd $\Delta\tau_c$. Voor coherentie moet het verschil tussen de afstanden $SP_1$ en $SP_2$ kleiner zijn dan de coherentielengte $\Delta l_c$.

Een uitgebreide klassieke lichtbron bestaat uit een groot aantal emitterende puntbronnen die uitzenden door spontane emissie.
Zoals we hebben uitgelegd in Sectie {eq}`subsection.cohsources`, ondergaan de golftreinen die worden uitgezonden door verschillende atomen (puntbronnen) in de bron willekeurige fasesprongen als gevolg van b.v. botsingen en daarom kunnen de velden die worden uitgezonden door verschillende puntbronnen in een uitgebreide klassieke lichtbron niet interfereren. Zo'n lichtbron wordt **ruimtelijk incoherent** genoemd. Voor een ruimtelijk incoherente lichtbron wordt de
ruimtelijke coherentie in twee willekeurige punten $P_1$ en $P_2$ bepaald door het randcontrast te meten op een afstandsscherm wanneer een masker wordt gebruikt dat loodrecht staat op de gemiddelde voortplantingsrichting van het licht en dat gaatjes bevat op $P_1$ en $P_2$. Het marginale contrast en dus de onderlinge coherentie bij $P_1$ en $P_2$ wordt bepaald door twee effecten:


1. Allereerst wordt het bepaald door hoe coherent de bijdragen aan het totale veld in $P_1$ en $P_2$ zijn van de individuele puntbronnen $S$ in de uitgebreide bron. Deze coherentie wordt bepaald door de mate waarin het verschil tussen de afstand van $S$ tot $P_1$ en van $S$ tot $P_2$ kleiner is dan de coherentielengte. Als deze verschillen in afstanden voor alle puntbronnen groter zijn dan de coherentielengte, zal het randcontrast op het scherm n Young's experiment erg laag zijn en dus is de onderlinge coherentie erg laag.


2. Het tweede effect is de grootte van de uitgebreide bron. Zelfs als voor alle puntbronnen in de bron de velden in $P_1$ en $P_2$ coherent zijn, kan de coherentie van de totale velden op $P_1$ en $P_2$ als gevolg van de gehele bron klein zijn. Zoals we weten, kunnen de bijdragen van verschillende puntbronnen niet interfereren. Vandaar dat de intensiteit die in het experiment van Young wordt waargenomen de som is van de intensiteiten die te wijten zijn aan de individuele puntbronnen in de uitgebreide bron. De reden dat de coherentie van de totale velden in $P_1$ en $P_2$ als gevolg van de gehele uitgebreide bron laag kan zijn, ook al is voor alle puntbronnen afzonderlijk de onderlinge coherentie in $P_1$ en $P_2$ hoog, is dat de randpatronen als gevolg van de puntbronnen ten opzichte van elkaar worden verschoven, waardoor het randcontrast en daarmee de onderlinge coherentie afneemt. De verschuiving van de randpatronen is te wijten aan de verschillende posities in de uitgebreide bron van de puntbronnen die ervoor zorgen dat het faseverschil tussen de velden in $P_1$ en $P_2$ varieert met de puntbronnen.

We zullen laten zien dat wanneer $P_1$ en $P_2$ een grote afstand hebben tot de uitgebreide bron, de twee hierboven genoemde voorwaarden voor de velden in $P_1$ en $P_2$ om ruimtelijk wederzijds coherent te zijn, gelijkwaardig zijn aan de eis dat:


```{note}
Het product van de hoek die door de uitgebreide bron wordt ingesloten in het midden van $P_1P_2$ en de afstand tussen $P_1$ en $P_2$ moet kleiner zijn dan de coherentielengte $\Delta l_c=c \Delta \tau_c$.
```


Om dit aan te tonen beschouwen we twee onderling incoherente puntbronnen $S_1$ en $S_2$ in het $z=0$ vlak. Hun functie van onderlinge coherentie voldoet aan:

```{math}
:label: eq.spatincoh0a
\begin{align*}
\Gamma_{S_1S_2}(\tau) &=
0, \text{ voor alle $\tau$},
\end{align*}
```
```{math}
:label: eq.spatincoh0b
\begin{align*}
\\
\Gamma_{S_1S_1}(\tau)&=\Gamma_{S_2S_2}(\tau)= \Gamma_0(\tau),\end{align*}
```
waarin $\Gamma_0$ de zelfcoherentie is waarvan we aannemen dat deze voor beide puntbronnen hetzelfde is. $\Gamma_0(\tau)$ heeft breedte die wordt gegeven door de coherentietijd $\Delta \tau_c$ van de bron en neemt gemiddeld af met $\tau$ (hoewel niet altijd monotoon).
eq.{eq}`eq.spatincoh0a` drukt het feit uit dat twee puntbronnen onderling incoherent zijn. Gebruikmakend van het feit dat langetermijn gemiddelde niet afhankelijk is van de oorsprong van de tijd die op de aanname was gebaseerd dat de bron stationair is, vinden we:

```{math}
:label: eq.Gamma0cc
\begin{align*}
\Gamma_0(-\tau)=<U(S_1,t) U(S_1,t+\tau)^*> = < U(S_1,t-\tau)U(S_1,t)^*> = \Gamma_0(\tau)^*.
\end{align*}
```
Verder geldt voor $\tau=0$: $\Gamma_0(0)=I_0$, wat de intensiteit is van een van beide bronnen.

We nemen gemakshalve aan dat de twee punten $P_1$, $P_2$ zich op een grote afstand $z$ van de twee puntbronnen bevinden en dat de lijn $P_1P_2$ evenwijdig is aan de uitgebreide bron zoals weergegeven in {numref}`Fig_5_06_Coherence_Propagation`. We berekenen de onderlinge coherentie $\Gamma_{P_1P_2}(0)$ voor nul vertraging $\tau=0$ (we kunnen ook de onderlinge coherentie berekenen voor meer algemene tijdsvertragingen $\tau>0$, d.w.z. $\Gamma_{P_1P_2}(\tau)$, maar het is voldoende voor ons doel om $\tau=0$ te nemen).
De velden in $P_1$ en $P_2$ zijn de som van de velden die worden uitgezonden door $S_1$ en $S_2$.
Omdat $S_1$ en $S_2$ puntbronnen zijn, zenden ze sferische golven uit. Daarom, net als {eq}`eq.Uhuygens` vinden we dat het veld in $P_1$ evenredig is met

```{math}
:label: eq.UP1
\begin{align*}
U(P_1, t) \propto \frac{U(S_1,t-|S_1P_1|/c)}{|S_1P_1|} + \frac{U(S_2,t-|S_2P_1|/c)}{|S_2P_1|},
\end{align*}
```
en

```{math}
:label: eq.UP2
\begin{align*}
U(P_2, t) \propto \frac{U(S_1,t-|S_1P_2|/c)}{|S_1P_2|} + \frac{U(S_2,t-|S_2P_2|/c)}{|S_2P_2|},
\end{align*}
```
waar we de constante factoren voor {eq}`eq.Uhuygens` weglaten.

```{figure} Images/Chapter_5/5_06_Coherence_Propagation.png
:name: Fig_5_06_Coherence_Propagation
Twee incoherente puntbronnen $S_1$, $S_2$ op een afstand $a$ van elkaar en twee punten $P_1$, $P_2$ in een vlak op grote afstand $z$ van de puntbronnen.
```

Voor $z$ voldoende groot kunnen alle afstanden $|S_iP_j|$ in de noemers worden vervangen door $z$ en dan
kunnen deze gelijke afstanden worden weggelaten. Door {eq}`eq.UP1` en {eq}`eq.UP2` in {eq}`eq.mutcoh` met $\tau=0$, vinden we voor de onderlinge coherentie van $P_1$ en $P_2$:

```{math}
:label: eq.GammaP1P2
\begin{align*}
\Gamma_{P_1P_2}(0) &= \braket{\, U(P_1,t)U(P_2,t)^*\,}  \\
&= \Gamma_{S_1S_1}\left( \frac{ |S_1P_2|-|S_1P_1|} {c}\right)
+ \Gamma_{S_1S_2}\left( \frac{|S_2P_2|- |S_1P_1|} {c}\right)  \\
& & + \Gamma_{S_2S_1}\left( \frac{|S_1P_2|-|S_2P_1|} {c}\right)
+ \Gamma_{S_2S_2}\left( \frac{|S_2P_2|- |S_2P_1|} {c}\right).
\end{align*}
```
Nu gebruiken we {eq}`eq.spatincoh0a` en {eq}`eq.spatincoh0b`
om te krijgen dat

```{math}
:label: eq.GammaP1P2b
\begin{align*}
\Gamma_{P_1P_2}(0) &= \Gamma_0\left( \frac{ |S_1P_2|-|S_1P_1|} {c}\right) + \Gamma_0\left( \frac{|S_2P_2|- |S_2P_1|} {c}\right).
\end{align*}
```
En

```{math}
:label: eq.GammaP1P1
\begin{align*}
\Gamma_{P_1P_1}(0) = \Gamma_{P_2P_2}(0)=2\Gamma_0(0)= 2I_0.
\end{align*}
```
Aangezien de breedte van de zelfcoherentiefunctie $\Gamma_0$ gelijk is aan de coherentietijd $\Delta \tau_c$,
bevestigt {eq}`eq.GammaP1P2b` dat om de velden in $P_1$ en $P_2$ coherent te laten zijn,
het **verschil in afstand** van elk van de bronpunten naar punten $P_1$ en $P_2$ kleiner moet zijn dan de coherentielengte $\Delta l_c = c \Delta \tau_c $.
Om het resultaat uit te drukken in de hoek $\alpha$ die door de bron wordt ingesloten in het midden van $P_1P_2$ kiezen we coördinaten zodanig dat
$P_j=(x_j,0,z)$ voor $j=1,2$. Als de afstand tot de bron zo groot is dat $S_1P_1$ en $S_1P_2$ bijna evenwijdig zijn, zien we in {numref}`Fig_5_07_Coherence_Propagation`
dat

```{math}
:label: eq.dist1
\begin{align*}
|S_1P_2|-|S_1P_1|\approx |QP_2|
= \frac{\alpha}{2}|x_1-x_2|.
\end{align*}
```
Ook geldt dat

```{math}
:label: eq.dist2
\begin{align*}
|S_2P_1|-|S_2P_2|\approx \frac{\alpha}{2}|x_1-x_2|.
\end{align*}
```

```{figure} Images/Chapter_5/5_07_Coherence_Propagation.png
:name: Fig_5_07_Coherence_Propagation
Voor $z$ zeer groot, zijn $S_1P_1$ en $S_1P_2$ bijna evenwijdig en $|S_1P_2|-|S_1P_1|\approx |QP_2|= |x_1-x_2| \alpha/2$.
```

Vandaar dat met $\Gamma_0(-\tau)=\Gamma_0(\tau)^*$, {eq}`eq.GammaP1P2b` gelijk wordt aan

```{math}
:label: eq.gamP1P2
\begin{align*}
\Gamma_{P_1P_2}(0) = 2\text{Re}\, \Gamma_0\left( \frac{\alpha}{2} \frac{(x_1-x_2)}{c}\right).
\end{align*}
```
We concluderen dat om de velden in $P_1$ en $P_2$ coherent te laten zijn, het product van de hoek $\alpha$ die de bron in het midden van $P_1P2$ en de afstand van $P_1P_2$ onderbrengt, kleiner moet zijn dan de coherentielengte $\Delta l_c = c \Delta \tau_c$.
Hoe kleiner dit product is, hoe hoger de mate van ruimtelijke coherentie van $P_1$ en $P_2$.

De hoek $\alpha$ neemt af wanneer de afstand tot de bronnen wordt vergroot en/of wanneer de grootte van de bron wordt verkleind. Losjes gezegd kan men zeggen dat naarmate het licht zich voortplant, het coherenter wordt. In beide gevallen, wanneer de afstand tot de bron toeneemt en wanneer de grootte van de bron kleiner wordt, neemt het **verschil in afstand van alle puntbronnen tot $P_1$ en $P_2$** af en zal uiteindelijk kleiner worden dan de coherentielengte. Bovendien overlappen de randpatronen op het verre scherm in het experiment van Young als gevolg van verschillende puntbronnen elkaar sterker, wat leidt tot een sterker algemeen randcontrast.

Beschouw als voorbeeld quasi-monochromatisch licht waarvoor (zie
{eq}`eq.SelfG_mono`):

```{math}
:label: eq.quasimon
\begin{align*}
\Gamma_0(\tau) = I_0 e^{-i\mathbf{a}r{\omega}\tau}, \text{ voor alle $\tau$}.
\end{align*}
```
waarbij $\mathbf{a}r{\omega}$ de middenfrequentie is. In dit geval is de coherentielengte $\Delta l_c$ van de bron zo groot dat de bijdragen aan het totale veld van alle individuele puntbronnen coherent zijn. Vandaar dat het enige overgebleven criterium voor de coherentie van de totale velden in $P_1$ en $P_2$ is dat de randpatronen als gevolg van de verschillende puntbronnen in het experiment van Young elkaar voldoende overlappen. Inderdaad, in dit geval van zeer lange coherentietijd $\Delta \tau_c$ hebben we

```{math}
:label: eq.GamP1P2mon0
\begin{align*}
\Gamma_{P_1P_2}(0) = 2 I_0 \cos\left[\frac{\alpha}{2}\frac{\mathbf{a}r{\omega}|x_1-x_2|} {c}\right],
\end{align*}
```
en dus is de mate van onderlinge coherentie:

```{math}
:label: eq.gamP1P2mon
\begin{align*}
\gamma_{P_1P_2}(0) &= \frac{\Gamma_{P_1P_2}(0)}{\sqrt{\Gamma_{P_1P_1}(0)} \sqrt{\Gamma_{P_2P_2}(0)}}  \\
&= \cos\left[\frac{\alpha}{2}\frac{\mathbf{a}r{\omega}|x_1-x_2|} {c}\right].
\end{align*}
```
We zien dat wanneer

```{math}
:label: eq.coh12
\begin{align*}
|x_1-x_2| < \mathbf{a}r{\lambda}/(2 \alpha),
\end{align*}
```
de velden in $P_1$ en $P_2$ ten minste gedeeltelijk onderling coherent zijn.

**Voorbeeld**. We bepalen de maximale afstand $d$ tussen twee punten op aarde waarvoor zonlicht coherent is. De zon creëert op aarde de hoek:

$$
\alpha = \frac{\text{AU}}{2R_\circ}\approx 0.015,
$$ (eq.alphasun)

waarbij $\text{AU}$ en $R_\circ$ de afstand van de zon tot de aarde en de straal van de zon zijn.
Vandaar dat voor groen licht $\lambda=550 nm$ en door te eisen dat

$$
d < \frac{\mathbf{a}r{\lambda}}{4\alpha}
\nonumber
$$

Vinden we voor merkbare onderlinge coherentie te merken dat $d_{\max}\approx 20$ micron.

## Stellaire interferometrie
De eigenschap dat de ruimtelijke coherentie van twee punten afneemt voor het vergroten van de hoek die de bron halverwege tussen de twee punten onderbrengt, wordt gebruikt in de sterinterferometrie.
Het werkt als volgt: we willen de grootte van een bepaalde ster weten. De grootte van de ster, die een uitgebreide ruimtelijk incoherente bron is, bepaalt de ruimtelijke coherentie van het licht dat we op aarde ontvangen. Door de interferentie te meten van het licht dat wordt opgevangen door twee dwars gescheiden telescopen, kan men dus effectief een tweespletenexperiment creëren, waarmee de mate van ruimtelijke coherentie van het sterlicht op aarde kan worden gemeten, en daarmee de hoek die de ster op aarde maakt. De resolutie bij het afleiden van de hoek uit de ruimtelijke coherentie is groter als de afstand tussen de telescopen groter is (zie {eq}`eq.gamP1P2mon`). Als we dan de afstand van de ster op onafhankelijke wijze kennen, bijvoorbeeld uit zijn spectrale helderheid, kunnen we zijn grootte afleiden uit zijn hoekgrootte.
De methode kan ook worden gebruikt om de intensiteitsverdeling aan het oppervlak van de ster af te leiden. Er kan worden aangetoond dat de mate van ruimtelijke coherentie als functie van de relatieve positie van de telescopen de Fouriertransformatie van deze intensiteitsverdeling is. Door de telescopen te verplaatsen en de ruimtelijke coherentie voor veel posities te meten, kan de intensiteitsverdeling aan het oppervlak van de ster dus worden afgeleid uit een Fouriertransformatie.

```{figure} Images/Chapter_5/5_08_Stellar_interferometry.png
:name: Fig_5_08_Stellar_interferometry
Links: een stellaire interferometer met twee telescopen die kunnen worden verplaatst om de interferentie op vele relatieve posities te meten. Rechts: enkele telescoop met twee buitenste beweegbare spiegels. De telescoop kan om zijn as bewegen. Hoe groter de afstand $d$, hoe hoger de resolutie.
```


## Fringecontrast

We hebben gezien dat wanneer de interferentieterm
$\text{Re} \braket{ U_1 U_2^* }$ verdwijnt, er geen franjes formen, terwijl wanneer deze term niet-nul is, er franjes zijn. Het **fringecontrast** wordt direct uitgedrukt in meetbare intensiteiten. Gegeven een interferentie-intensiteitspatroon $I(x)$ zoals in {numref}`Fig_5_09_Visibility`, wordt het fringecontrast gedefinieerd als

```{math}
\boxed{ \begin{align*}
\mathcal{V}=\frac{I_{\text{max}}-I_{\text{min}}}{I_{\text{max}}+I_{\text{min}}}. \hspace{1.5cm} \textbf{fringe contrast}.
\end{align*}}
```

Als we bijvoorbeeld twee perfect coherente, monochromatische puntbronnen hebben die de velden $U_1$, $U_2$ uitzenden met intensiteiten $I_1=|U_1|^2$, $I_2=|U_2|^2$, dan is het interferentiepatroon met
{eq}`doubleslitinterference`:

```{math}
\begin{align*}
I(\tau)=I_1+I_2+2\sqrt{I_1 I_2}\cos(\omega \tau +\varphi).
\end{align*}
```
We krijgen dan

```{math}
\begin{align*}
I_{\text{max}}=I_1+I_2+2\sqrt{I_1 I_2}, \quad I_{\text{min}}=I_1+I_2-2\sqrt{I_1 I_2},
\end{align*}
```
dus

```{math}
\begin{align*}
\mathcal{V}=\frac{2\sqrt{I_1 I_2}}{I_1+I_2}.
\end{align*}
```
In het geval $I_1=I_2$, vinden we $\mathcal{V}=1$.

Wanneer $U_1$ en $U_2$ daarentegen volledig incoherent zijn, vinden we

```{math}
\begin{align*}
I(\tau)=I_1+I_2,
\end{align*}
```
waaruit volgt

```{math}
\begin{align*}
I_{\text{max}}=I_{\text{min}}=I_1+I_2,
\end{align*}
```
wat $\mathcal{V}=0$ geeft.


```{figure} Images/Chapter_5/5_09_Visibility.png
:name: Fig_5_09_Visibility
Illustratie van $I_{\text{max}}$ en $I_{\text{min}}$ van een interferentiepatroon $I(x)$ dat het fringecontrast $\mathcal{V}$ bepaalt.
```


```{index} Fabry-Perot resonator
:name: section.fabryperot
```
## Fabry-Perot resonator

Bij interferometrie worden twee onderling coherente golven opgeteld en wordt de intensiteit van de som van de twee velden gemeten. Deze intensiteit bevat informatie over het faseverschil van de golven waaruit bijvoorbeeld een weglengteverschil kan worden afgeleid. Men onderscheidt twee soorten interferometers: **golffront splitsende interferometers** en **amplitude splitsende interferometers**. Voorbeelden van het eerste type zijn Young's tweespletenexperiment en Lloyd's spiegel ({numref}`Fig_5_10_Lloydsmirror`). Voorbeelden van amplitudesplitsende interferometers zijn de Michelson-interferometer en de Fabry-Perot-interferometer. Deze laatste is niet alleen een spectrometer met een extreem hoge resolutie, maar is ook de resonantieholte in een laser.

```{figure} Images/Chapter_5/5_10_Lloyd_Mirror.png
:name: Fig_5_10_Lloydsmirror
Lloyd's spiegel als voorbeeld van golffront splitsende interferometrie.
```


Een Fabry-Perot interferometer bestaat uit twee evenwijdige, sterk reflecterende oppervlakken met daartussen vacuüm of een diëlektricum. Deze oppervlakken kunnen optische vlakken zijn die aan één kant zijn gecoat met een metaal zoals zilver. Beschouw een coördinatensysteem zoals in Afb. {numref}`Fig_FP1`
zodanig dat de reflecterende oppervlakken op $z=0$ en $z=d$. De brekingsindices van de halve ruimten $z<0$ en $z>d$ zijn respectievelijk $n_1$ en $n_3$, en de brekingsindex van het medium tussen de oppervlakken is $n_2$. We gaan er eerst van uit dat alle brekingsindices reëel zijn.

Laat er een vlakke golf **met eenheidsamplitude** invallen van $z<0$ onder hoek $\theta_1$ met de normaal, zoals weergegeven in {numref}`Fig_FP1`.
Van de invallende golf wordt aangenomen dat deze S- of P-gepolariseerd is. Er zijn een gereflecteerde vlakke golf in $z<0$, twee vlakke golven in medium 2 waarvan de ene zich voortplant in de positieve $z$-richting en de andere in de negatieve $z$-richting en er is een doorgelaten vlakke golf in $z>d$. Uit de randvoorwaarden dat de tangentiële component van het elektrische en magnetische veld continu zijn over de grensvlakken, volgt dat de tangentiële componenten van de golfvectoren van al deze vlakke golven identiek zijn.

Laat $r_{ij}$ en $t_{ij}$ de reflectie- en transmissiecoëfficiënt zijn voor een golf die invalt vanaf medium $i$ op het grensvlak met medium $j$. Wanneer de golf s-gepolariseerd is, worden $r_{12}$ en $t_{12}$ gegeven door Fresnel-coëfficiënten {eq}`eq.rs`,{eq}`eq.ts`, terwijl als de golf p-gepolariseerd is, ze worden gegeven door {eq}`eq.rp`, {eq}`eq.tp`.

```{figure} Images/Chapter_5/5_11_Fabry_Perot.png
:name: Fig_FP1
Fabry-Perot met 3 lagen. Het licht komt van onderaf en wordt gereflecteerd door elke interface.
```


De invallende golf, die in punt A een amplitude $1$ heeft, wordt gedeeltelijk gereflecteerd en gedeeltelijk doorgelaten door de interface $z=0$. De gereflecteerde golf krijgt amplitude $r_{12}$. Het doorgelaten veld plant zich voort in medium $0<z<d$ naar het grensvlak op $z=d$ en wordt vervolgens gedeeltelijk gereflecteerd met reflectiecoëfficiënt $r_{23}$ terug naar het grensvlak $z=0$. Omdat de weglengte binnen medium 2 gelijk is aan
$ 2d /\cos \theta_2$,
is de complexe ampère B van deze golf in punt B na transmissie door het grensvlak $z=0$:

$$
t_{21} r_{23} t_{21} e^{ 2 i k_0 n_2 \frac{d}{\cos \theta_2}},
$$ (eq.roundtrip1)

waarin $k_0$ het golfgetal in vacuüm is.
Om de interferentie te berekenen van de direct gereflecteerde golf en de golf die één rondreis heeft gemaakt in medium 2, moeten de twee velden worden geëvalueerd op hetzelfde golffront, zoals golffront CB in Afb. {numref}`Fig_FP1`.
Het direct gereflecteerde veld in C wordt verkregen door zich voort te planten vanuit B over de afstand

```{math}
\begin{align*}
\text{AC} &= \text{AB} \sin \theta_1
 \\
&= 2 d \tan\theta_2 \sin \theta_1  \\
&= 2 d \frac{n_2}{n_1 }
\frac{\sin^2 \theta_2}{\cos\theta_1}.
\end{align*}
```
waar de wet van Snellius: $n_1 \sin\theta_1 = n_2 sin \theta_2$ is gebruikt.
Vandaar het totale veld als gevolg van de directe reflectie op $z=0$ en één retour {eq}`eq.roundtrip1` gelijk is aan

```{math}
\begin{align*}
r_{12} e^{i 2k_0 n_2 \frac{\sin^2 \theta_2}{cos \theta_2}} +
t_{21} r_{23} t_{21} e^{ 2 i k_0 n_2 \frac{d}{\cos \theta_2}}  \\
= e^{ i 2 k_0 n_2 d \frac{\sin^2\theta_2}{\cos\theta_2}} \left( r_{12} + t_{21}r_{23}t_{12} e^{2 i k_0 n_2d \cos \theta_2}\right).
\end{align*}
```
De gemeenschappelijke fasefactor voor de haakjes kan worden weggelaten omdat deze geen invloed heeft op de gereflecteerde intensiteit. Vervolgens verkrijgen we

$$
r_{12} + t_{21}r_{23}t_{12} e^{2 i k^{(2)}_z d},
$$

waar

$$
k_z^{(2)}= k_0 n_2 \cos\theta_2,

$$
de $z$-component van de golfvector in medium 2 van de golf die zich voortplant in de positieve $z$-richting is.
Het opnemen van de bijdragen van golven die twee of meer rondreizen in de plaat hebben gemaakt, leidt tot de reflectiecoëfficiënt van de Fabry-Perot wanneer het veld invalt vanaf medium 1:

```{math}
:label: eq.rFB
\begin{align*}
r &= r_{12} + t_{21}r_{13}t_{12} e^{2 i k^{(2)}_z d} \left[ 1 + r_{23} r_{21} e^{2 i k^{(2)}_z d} + ( r_{23} r_{21} e^{2 i k_z^{(2)} d})^2 + \ldots \right]  \\
&= r_{12} + t_{21}r_{13}t_{12} e^{2 i k^{(2)}_z d}\frac{1}{ 1 - r_{23} r_{21} e^{2 i k_z^{(2)} d}}  \\
&= \frac{r_{12}-r_{23} e^{2 i k^{(2)}_z d}}{1- r_{23}r_{21} e^{2 i k^{(2)}_z d}},
\end{align*}
```
waar we in de laatste stap

```{math}
\begin{align*}
t_{21}&= 1 + r_{21},  \\
t_{12}&= 1+ r_{12},  \\
r_{12}&= -r_{21}
\end{align*}
```
Evenzo geeft de amplitude van het doorgelaten veld in $z=d$ de transmissiecoëfficiënt van de Fabry-Perot wanneer het veld invalt vanaf medium 1:

```{math}
:label: eq.tFP
\begin{align*}
t &= t_{12} t_{23} e^{i k^{(2)}_z d} \left[ 1 + r_{21}r_{23} e^{2 k_z^{(2)} d} + ( r_{21}r_{23} e^{i k^{(2)}_z d})^2 + \ldots \right]  \\
&= \frac{ t_{12} t_{23} e^{i k^{(2)}_z d}}{1- r_{21} r_{23} e^{ 2 i k^{(2)}_z d}}.
\end{align*}
```

```{figure} Images/Chapter_5/5_12_Fabry_Perot.Resonance.png
:name: Fig_FP2
transmissiecoëfficiënt versus de faseverandering $\delta$ als gevolg van de Fabry-Perot. Men kan de resonanties zien optreden bij elk veelvoud van $\pi$.
```


Ten slotte wordt het elektrische veld tussen de reflectoren gegeven door

```{math}
:label: eq.inside
\begin{align*}
U(z) &= t_{12} e^{i k^{(2)}_z z} \left[ 1 + r_{21} r_{23} e^{2 i k^{(2)}_z d} +
( r_{21} r_{23} e^{2 i k^{(2)}_z d})^2+\ldots +\right]  \\
& & + t_{12} e^{i k^{(2)}_z (d-z)}\left[ 1 + r_{21} r_{23} e^{2 i k^{(2)}_z d} +
( r_{21} r_{23} e^{2 i k^{(2)}_z d})^2+\ldots +\right]  \\
&= t_{12} \frac{ e^{i k^{(2)}_z z} + r_{23} e^{i k^{(2)}_z(d-z)}}
{1- r_{21} r_{23} e^{ 2 i k^{(2)}_z d}},
\end{align*}
```
waarbij de factor $\exp[i(k_x x+ k_y y)]$ die de afhankelijkheid van $(x,y)$ geeft, is weggelaten.

Definieer

```{math}
:label: eq.defG
\begin{align*}
G &= \frac{(|r_{12}|-|r_{23}|) ^2}
{(1-|r_{23}||r_{21}|) ^2},
\end{align*}
```
```{math}
:label: eq.defF
\begin{align*}
\\
F &= \frac{ 4|r_{23}||r_{21}|} {(1-|r_{23}||r_{21}|) ^2}.\end{align*}
```
$F$ wordt de **coëfficiënt van Finesse** van de Fabry-Perot genoemd. Het is groot als de spiegels zeer goede reflectoren zijn. De gereflecteerde en uitgezonden sterktes, ten opzichte van de invallende macht, worden dan

$$
R=|r|^2 = \frac{G + F \sin^2(k^{(2)}_z d)}{1+ F \sin^2(k^{(2)}_z d)},
$$ (eq.R_FB)

en

```{math}
:label: eq.T_FB
\begin{align*}
T &= |t|^2 = 1- |R|^2  \\
&= \frac{1-G}{1+ F \sin^2(k^{(2)}_z d)}.
\end{align*}
```
Wij definiëren

$$
\delta = k^{(2)}_z d,
$$ (eq.defdelta)

dat is de faseverandering als gevolg van één doorgang door de middelste laag van de Fabry-Perot. Dan worden {eq}`eq.R_FB` en {eq}`eq.T_FB` 

$$
R = \frac{G + F \sin^2(k^{(2)}_z d)}{1+ F \sin^2 \delta}.
$$ (eq.R_TB2)


$$
T
= \frac{1-G}{1+ F \sin^2 \delta}.
$$ (eq.T_FB2)


Als de reflectie door de spiegels hoog is: $|r_{21}|\approx 1$, $|r_{23}|\approx 1$, dan is $F$ groot. Dit impliceert

$$
R \approx 1, \quad T\approx 0,
$$ (eq.R1)

voor alle $\delta$ behalve wanneer $\sin(\delta)=0$, d.w.z. wanneer

$$
\delta = m\pi,
$$ (eq.deltam)

voor een positief geheel getal $m$.
Met $k_0=2\pi/\lambda_0$ wordt dit qua golflengte:

$$
\frac{2 d}{\lambda_0}n_2 \cos \theta_2 = m.
$$ (eq.res)

De golflengten komen overeen met de maximumwaarden van de transmissie:

$$
T_{max} = 1-G.
$$

En ze worden daarom resonanties genoemd.
De breedte $\Delta \delta$ bij een resonantie wordt gedefinieerd als de volledige breedte bij half maximum (FWHM) van de transmissie, d.w.z.

$$
\frac{1-G}{1+ \sin^2(m\pi + \Delta \delta/2)} = \frac{1}{2}(1-G),
$$ (eq.FWHM)

wat impliceert met $\sin^2(m\pi + \Delta \delta/2) \approx (\Delta \delta/2)^2$:

$$
\Delta \delta = \frac{2}{\sqrt{F}}.
$$ (eq/width)

Opnieuw gebruiken we $k_0=2\pi/\lambda_0$ en het feit dat de breedte in termen van golflengte klein is:

```{math}
:label: eq.lambdafree
\begin{align*}
\frac{|\Delta \lambda_0|} {\lambda_0} &\approx & \lambda_0 \Delta\left(\frac{1}{\lambda_0}\right) \\
&= = \lambda_0 \frac{\Delta \delta}{2\pi n_2 d \cos\theta_2}  \\
&= \frac{\Delta \delta}{m \pi}  \\
&= \frac{2}{m \pi\sqrt{F}}
\end{align*}
```
waar {eq}`eq.res` is gebruikt. De resolutie wordt gedefinieerd als

$$
\text{Resolution} = \frac{\lambda_0}{|\Delta \lambda_0|} = \frac{m\pi \sqrt{r_{23}||r_{21}|}} {1-|r_{23}||r_{21}|}.
$$ (eq.resolution2)


Het vrije spectrale bereik is de afstand tussen aangrenzende resonanties:

$$
\Delta \delta_{free} =
\pi
$$ (eq.wavelengthwidth)

Met een vergelijkbare afleiding als voor {eq}`eq.lambdafree`

```{math}
:label: eq.freewavel
\begin{align*}
\frac{|( \Delta \lambda_0)_{free}|} {\lambda_0}&\approx&
-\lambda_0 \Delta\left(\frac{1}{\lambda_0}\right)_{free}  \\
&= \frac{\Delta \delta_{free}}{m\pi}  \\
&= \frac{1}{m}.
\end{align*}
```

Een Fabry-Perot kan worden gebruikt als een spectrometer met hoge resolutie. eq.{eq}`eq.resolution2` impliceert dat de resolutie toeneemt voor een hogere orde $m$. Echter, $M $ kan niet willekeurig groot gemaakt worden omdat het verhogen van $m$ volgens {eq}`eq.freewavel` betekent dat het vrije spectrale bereik afneemt.
De verhouding

$$
\frac{(\Delta \lambda_0)_{free}}{(\Delta \lambda_0) = \frac{\pi}{2} \sqrt{F}},
$$ (eq.resolution3)

moet daarom groot zijn.




**Voorbeeld.**
Voor een golflengte van $\lambda_0=600\text{nm}$ en $n_f d= 12 \text{mm}$ hebben we voor loodrechte inval $m=40000$. Als de reflectiecoëfficiënten voldoen aan $|r_{12}|^2=|r_{23}|^2=0,9$, hebben we $F=360$ en $G=0$. De resolutie is meer dan een miljoen, wat beter is dan de roosterspectrometers, die zullen worden besproken in sectie {eq}`secton.examples`.




**Opmerking.** Hoewel we in de afleiding hebben aangenomen dat alle brekingsindices reëel zijn, zijn de uiteindelijke formules ook van toepassing op het geval dat $n_2$ complex is. In dat geval zijn $k^{(2)}_z$ en de reflectiecoëfficiënten complex.

## Interferentie en polarisatie
In de studie van interferentie hebben we tot nu toe de vectoriële aard van licht genegeerd door aan te nemen dat alle velden dezelfde polarisatie hebben.
Stel nu dat we twee reële vectorvelden $\mathbf{\mathcal{E}}_1$, $\mathbf{\mathcal{E}}_2$ hebben. De (momentane) intensiteit van elk veld wordt (afgezien van een constante factor) gegeven door

```{math}
\begin{align*}
\mathbf{\mathcal{E}}_1\cdot \mathbf{\mathcal{E}}_1, \quad
\mathbf{\mathcal{E}}_2\cdot \mathbf{\mathcal{E}}_2.
\end{align*}
```
Als de twee velden interfereren, wordt de momentane intensiteit gegeven door

```{math}
:label: eq.interpol1
\begin{align*}
(\mathbf{\mathcal{E}}_1+\mathbf{\mathcal{E}}_2)\cdot(\mathbf{\mathcal{E}}_1+\mathbf{\mathcal{E}}_2)
= \mathbf{\mathcal{E}}_1\cdot \mathbf{\mathcal{E}}_1+\mathbf{\mathcal{E}}_2\cdot \mathbf{\mathcal{E}}_2+2\mathbf{\mathcal{E}}_1\cdot \mathbf{\mathcal{E}}_2,
\end{align*}
```
waarbij $2\mathbf{\mathcal{E}}_1\cdot \mathbf{\mathcal{E}}_2$ de interferentieterm is. Stel dat de polarisatie van $\mathbf{\mathcal{E}}_1$ loodrecht staat op de polarisatie van $\mathbf{\mathcal{E}}_2$, bijv.

```{math}
\begin{align*}
\mathbf{\mathcal{E}}_1=\begin{pmatrix}\mathcal{E}_{1x}\\
\end{pmatrix}, \quad \mathbf{\mathcal{E}}_2=\begin{pmatrix}0\\
\mathcal{E}_{2y} \\
\end{pmatrix}.
\end{align*}
```
Dan $\mathbf{\mathcal{E}}_1\cdot \mathbf{\mathcal{E}}_2=0$, wat betekent dat de twee velden niet kunnen interfereren. Deze constatering is de

```{note}
**Eerste wet van Fresnel-Arago**: velden met orthogonale polarisatie kunnen niet interfereren.
```

Vervolgens schrijven we de velden in termen van orthogonale componenten

```{math}
\begin{align*}
\mathbf{\mathcal{E}}_1=\begin{pmatrix}\mathcal{E}_{1\bot} \\
\mathcal{E}_{1\parallel}\end{pmatrix},
\quad
\mathbf{\mathcal{E}}_2=\begin{pmatrix}\mathcal{E}_{2\bot} \\
\mathcal{E}_{2\parallel} \end{pmatrix}.
\end{align*}
```
Dit is altijd mogelijk, of de velden nu gepolariseerd of willekeurig gepolariseerd zijn. Dan wordt {eq}`eq.interpol1`

```{math}
\begin{align*}
\mathbf{\mathcal{E}}_1\cdot \mathbf{\mathcal{E}}_1+\mathbf{\mathcal{E}}_2\cdot \mathbf{\mathcal{E}}_2+2\mathbf{\mathcal{E}}_1\cdot \mathbf{\mathcal{E}}_2
=\mathcal{E}_{1\bot}^2 + \mathcal{E}_{2\bot}^2 + 2\mathcal{E}_{1\bot} \mathcal{E}_{2\bot}
+ \mathcal{E}_{1\parallel}^2 + \mathcal{E}_{2\parallel}^2 + 2\mathcal{E}_{1\parallel} \mathcal{E}_{2\parallel}.
\end{align*}
```
Als de velden willekeurig gepolariseerd zijn, zal het tijdsgemiddelde van het $\bot$-deel gelijk zijn aan het gemiddelde van het $\parallel$-deel, zodat de tijdgemiddelde intensiteit gegeven wordt door

```{math}
\begin{align*}
\begin{split}
I &=2\braket**calE_{1\bot**^2 + \mathcal{E}_{2\bot}^2 + 2\mathcal{E}_{1\bot} \mathcal{E}_{2\bot}}
&=2\braket**calE_{1\parallel**^2 + \mathcal{E}_{2\parallel}^2 + 2\mathcal{E}_{1\parallel} \mathcal{E}_{2\parallel}}.
\end{split}
\end{align*}
```
Dit is kwalitatief hetzelfde als wat we zouden krijgen als de velden parallelle polarisatie zouden hebben, bijv.

```{math}
\begin{align*}
\mathbf{\mathcal{E}}_1=\begin{pmatrix}\mathcal{E}_{1\bot} \\
0\end{pmatrix}, \quad \mathbf{\mathcal{E}}_2=\begin{pmatrix}\mathcal{E}_{2\bot} \\
0\end{pmatrix}.
\end{align*}
```
Dit leidt tot de

```{note}
**Tweede wet van Fresnel-Arago**: twee velden met parallelle polarisatie interfereren op dezelfde manier als twee velden die willekeurig gepolariseerd zijn.
```

Dit geeft aan dat onze aanvankelijke veronderstelling in de vorige paragrafen dat al onze velden parallelle polarisatie hebben, niet zo beperkend is als het op het eerste gezicht leek.

Veronderstel nu dat we een veld hebben

```{math}
\begin{align*}
\mathbf{\mathcal{E}}=\begin{pmatrix}\mathcal{E}_{\bot} \\
\mathcal{E}_{\parallel}\end{pmatrix},
\end{align*}
```
dat **willekeurig gepolariseerd** is. Stel dat we de twee polarisaties scheiden, en er een roteren zodat de twee resulterende velden op één lijn liggen, bijv.

```{math}
\begin{align*}
\mathbf{\mathcal{E}}_1=\begin{pmatrix}\mathcal{E}_{\bot} \\
0\end{pmatrix}, \quad \mathbf{\mathcal{E}}_2=\begin{pmatrix}\mathcal{E}_{\parallel} \\
0\end{pmatrix}.
\end{align*}
```
Deze velden kunnen niet interfereren omdat $\mathcal{E}_{\bot}$ en $\mathcal{E}_{\parallel}$ incoherent zijn. Dit leidt tot de 
```{note}
**Derde wet van Fresnel-Arago**:
De twee samenstellende orthogonale lineair gepolariseerde toestanden van natuurlijk licht kunnen niet interfereren om een gemakkelijk waarneembaar interferentiepatroon te vormen, zelfs niet als ze op één lijn worden gedraaid.
```


```{admonition} Externe bronnen in aanbevolen volgorde
1. [Veritasium - Het oorspronkelijke experiment met dubbele spleet vanaf 2:15](https://www.youtube.com/watch?v=Iuv6hY6zsd0) - Demonstratie van een interferentiepatroon verkregen met zonlicht.
2. [MIT OCW - Two-beam Interference - Collimated Beams](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/two-beam-interference-2014-collimated-beams/): Interferentie van laserlicht in een Michelson-interferometer.
3. [MIT OCW - Fringe Contrast - Path Difference](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/fringe-contrast-2014-path-difference/): Demonstratie van hoe fringe contrast varieert met propagatieafstand.
4. [MIT OCW - Coherence Length and Source Spectrum](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/coherence-length-and-source-spectrum/): Demonstratie van hoe de coherentielengte afhangt van het spectrum van het laserlicht.
5. [Lezing - 18 Coherentie](https://www.youtube.com/watch?v=fwRFaZnr2WU): Lezingenreeks over natuurkunde - I: Oscillaties en golven door Prof. S. Bharadwaj, Afdeling Natuurkunde en Meteorologie, IIT Kharagpur.
6. [Lezing - 19 Coherentie](https://www.youtube.com/watch?v=jnQFMdMSRAE): Lezingenreeks over natuurkunde - I: Oscillaties en golven door Prof. S. Bharadwaj, Afdeling Natuurkunde en Meteorologie, IIT Kharagpur.
```


[^1]: Zie [Veritasium - Het oorspronkelijke dubbelspletenexperiment, beginnend op 2:15](https://www.youtube.com/watch?v=Iuv6hY6zsd0) - Demonstratie van een interferentiepatroon verkregen met zonlicht. 

[^2]: Voor meer details zie J.W. Goodman, *Statistical Optics*

[^3]: [MIT OCW - Fringe Contrast - Path Difference](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/fringe-contrast-2014-path-difference/): Demonstratie van hoe het randcontrast varieert met voortplantingsafstand

[^4]: [MIT OCW - Coherence Length and Source Spectrum](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/coherence-length-and-source-spectrum/): Demonstratie van hoe de coherentielengte afhangt van het spectrum van het laserlicht.

[^5]: [KhanAcademy - Young's Double slit part 1](https://www.khanacademy.org/science/physics/light-waves/interference-of-light-waves/v/youngs-double-split-part-1)

