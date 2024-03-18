
(section.basistrans)=
# Basistransformaties

In deze paragraaf bespreken we de relevantie van basistransformaties en hoe deze toe te passen. Dus wat zijn basistransformaties eigenlijk? Het komt op het volgende neer: als we een fysiek object $\mathbf{\Psi}$ hebben, kunnen we het beschrijven met een vector (die in principe een continue functie kan zijn). De vorm van de vector waarmee we $\mathbf{\Psi}$ representeren, hangt af van de basis die we kiezen. We kunnen bijvoorbeeld een positievector $\mathbf{R}$ weergeven in Cartesische coördinaten $(x,y,z)$, of in sferische coördinaten $(\rho,\phi,\theta)$, of in cilindrische coördinaten $(r,\phi,z)$. Het is belangrijk op te merken dat **het fysieke object** ongewijzigd blijft, het zijn alleen de **coëfficiënten waarmee het object wordt weergegeven** die veranderen. De formules die beschrijven hoe de coëfficiënten voor de ene basis transformeren naar de coëfficiënten in de andere basis vormen de **basistransformatie**. In het geval dat deze formules kunnen worden beschreven als een matrixbewerking, hebben we een **lineaire basistransformatie**. Dit concept wordt uitgebreid behandeld in cursussen Lineaire Algebra.

Basistransformaties zijn alomtegenwoordig, dus het is belangrijk om er ook buiten de context van de optica bekend mee te zijn. Als je bijvoorbeeld een signaal $\mathbf{\Psi}$ hebt, kun je dit uitdrukken in het **tijddomein** of in het **frequentiedomein**. Dit zijn twee verschillende representaties van hetzelfde fysieke object, en de basistransformatie die de twee met elkaar in verband brengt is de **Fouriertransformatie**. In het discrete geval zou het luiden

```{math}
\begin{align*}
X_k=\sum_{n=0}^{N-1}x_n e^{-2\pi i k n/N},
\end{align*}
```
waarin $x_n$ de coëfficiënten zijn die het signaal in het tijddomein vertegenwoordigen, en $X_k$ de coëfficiënten zijn die het signaal in het frequentiedomein vertegenwoordigen. Merk op dat deze basistransformatie kan worden beschreven als een matrixbewerking

```{math}
\begin{align*}
\left(\begin{array}{c}X_0\\X_1\\\vdots
\end{array}\right)
=
\left(\begin{array}{cccc}1 & 1 &1&\dots\\1 & e^{-2\pi i /N} &e^{-4\pi i /N} &\dots\\1 & e^{-4\pi i /N} &e^{-8\pi i /N} &\dots\\\vdots & \vdots & \vdots &\ddots
\end{array}\right)
\left(\begin{array}{c}x_0\\ x_1\\\vdots
\end{array}\right),
\end{align*}
```
dus de Fouriertransformatie is een lineaire basistransformatie. Het voordeel van het toepassen van zo'n basistransformatie ligt voor de hand: in verschillende bases is er verschillende informatie die duidelijker naar voren komt. In het tijddomein kan men zien hoe het signaal in de tijd vordert, maar het is moeilijk om verschillende frequentiecomponenten te identificeren, terwijl het in het frequentiedomein heel gemakkelijk is om te zien hoeveel elke frequentie bijdraagt aan het signaal, maar het is moeilijk om te zien hoe het signaal in de tijd verandert. Ook is het soms efficiënter om een signaal in de ene basis te beschrijven dan in de andere. Als het signaal bijvoorbeeld een sinusgolf is in het tijddomein, zijn er oneindig veel niet-nulzijnde coëfficiënten nodig (elke coëfficiënt is een punt in de tijd) om het in het tijddomein te beschrijven, terwijl er slechts twee niet-nulzijnde coëfficiënten nodig zijn om het in het frequentiedomein te beschrijven. We zeggen dat een signaal **schaars in een bepaalde basis** kan zijn (schaars betekent dat het wordt weergegeven met weinig niet-nulzijnde coëfficiënten). Deze schaarste kan helpen bij het comprimeren van gegevens, of het kan worden gebruikt als een beperking in reconstructiealgoritmen (dit veld staat bekend als **compressed sensing**).

Een soortgelijke observatie geldt voor de verschillende representaties van een kwantumtoestand. Men kan een kwantumtoestand $\ket{\psi}$ voorstellen in de positiebasis (d.w.z. in termen van de eigenvectoren van de positieoperator $\hat{x}$), of in de impulsbasis (d.w.z. in termen van de eigenvectoren van de positie-operator $\hat{p}$). Nogmaals, het fysieke object blijft onveranderd, maar door het in verschillende bases weer te geven, worden verschillende delen van informatie duidelijker. In de positiebasis wordt het gemakkelijker om te zien waar een deeltje zich kan bevinden, terwijl het in de impulsbasis gemakkelijker is om te zien welke impuls het kan hebben. De basistransformatie die de positierepresentatie relateert aan de momentumrepresentatie is de Fouriertransformatie. Men kan ook een kwantumtoestand $\ket{\psi}$ voorstellen in de energiebasis (d.w.z. in termen van de eigenvectoren van de energieoperator $\hat{H}$, ook wel de Hamiltoniaan genoemd), in welk geval het gemakkelijker is om te zien welke energie een deeltje kan hebben, en wat het gemakkelijker maakt om de tijdsevolutie van de golffunctie te berekenen (omdat de tijdsevolutie wordt bepaald door de Schrödingervergelijking, wat een differentiaalvergelijking is met $\hat{H}$).

Basistransformaties kunnen dus helpen om bepaalde eigenschappen van een vector $\mathbf{\Psi}$ duidelijker te maken, of de beschrijving ervan eenvoudiger (d.w.z. schaarser) te maken. Een ander voordeel dat een basistransformatie kan hebben, is dat **het toepassen van operatoren gemakkelijker kan zijn in een bepaalde basis**. In het bijzonder is het toepassen van een lineaire operator $A$ op een vector $\mathbf{\Psi}$ veel gemakkelijker als $\mathbf{\Psi}$ wordt uitgedrukt in de eigenbasis van $A$. Stel dat we kunnen schrijven

```{math}
\begin{align*}
\mathbf{\psi}=\sum_k {a_k \mathbf{v}_k},
\end{align*}
```
waar $\mathbf{v}_k$ eigenvectoren zijn van $A$ met eigenwaarden $\lambda_k$, dan zal het toepassen van $A$ op $\mathbf{\Psi}$ geven

```{math}
\begin{align*}
A \mathbf{\psi} = \sum_k {\lambda_k a_k \mathbf{v}_k}.
\end{align*}
```
In matrixnotatie wordt dit geschreven als

```{math}
\begin{align*}
\begin{split}
A \mathbf{\psi} &=
\left(
\begin{array}{c}\lambda_1 a_1\\\lambda_2 a_2\\\vdots
\end{array}\right)
&=
\left(
\begin{array}{ccc}\lambda_1 &0 &\dots\\0& \lambda_2 &\dots\\\vdots & \vdots & \ddots
\end{array}\right)
\left(
\begin{array}{c}a_1\\ a_2\\\vdots
\end{array}\right).
\end{split}
\end{align*}
```
We zien dus dat **als $\mathbf{\Psi}$ wordt weergegeven in termen van eigenvectoren van de lineaire operator $A$ (d.w.z. in de eigenbasis van $A$), dan is de matrixrepresentatie van $A$ een diagonale matrix, en op zijn diagonaal zijn de eigenwaarden**.

Het uitdrukken van $\mathbf{\Psi}$ in termen van eigenvectoren van $A$ is dus zeer nuttig. Maar als $\mathbf{\Psi}$ op een willekeurige basis wordt gegeven, hoe vinden we dan de coëfficiënten die het voorstellen in de eigenbasis van $A$? Laten we hiervoor eens kijken naar een eenvoudig voorbeeld. Stel dat $\mathbf{\Psi}$ de volgende representatie heeft in de $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis

```{math}
\begin{align*}
\mathbf{\Psi}=4\hat{\mathbf{x}}+7\hat{\mathbf{y}}.
\end{align*}
```
Of in vectornotatie

```{math}
\begin{align*}
\mathbf{\Psi}_{xy}=
\left(\begin{array}{c}4\\7
\end{array}\right).
\end{align*}
```
Houd er rekening mee dat dit niet **de** vector is die overeenkomt met $\mathbf{\Psi}$. Het is eerder **een** representatie van $\mathbf{\Psi}$ die geldt in de $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis (d.w.z. het moet worden begrepen dat het eerste element in de vector de coëfficiënt is die overeenkomt met $\hat{\mathbf{x}}$, en het tweede element is de coëfficiënt die overeenkomt met $\hat{\mathbf{y}}$). Laten we nu veronderstellen dat de lineaire operator $A$ eigenvectoren heeft

```{math}
\begin{align*}
\begin{split}
\mathbf{v}_1&=1 \hat{\mathbf{x}} +3 \hat{\mathbf{y}},
\mathbf{v}_2&=2 \hat{\mathbf{x}} +1 \hat{\mathbf{y}},
\end{split}
\end{align*}
```
of in vectornotatie (op basis van $\hat{\mathbf{x}},\hat{\mathbf{y}}$)

```{math}
\begin{align*}
\mathbf{v}_1=\left(\begin{array}{c}1 \\3
\end{array}\right),
\quad
\mathbf{v}_2=\left(\begin{array}{c}2 \\1
\end{array}\right).
\end{align*}
```
Stel dat we $\mathbf{\Psi}$ willen schrijven op basis van $\mathbf{v}_1,\mathbf{v}_2$. We moeten $\Psi[v_1], \Psi[v_2]$ vinden, zodat

```{math}
\begin{align*}
\mathbf{\psi}=\psi[v_1] \mathbf{v}_1 + \psi[v_2] \mathbf{v}_2,
\end{align*}
```
Klaarblijkelijk

```{math}
\begin{align*}
\mathbf{\psi}=2 \mathbf{v}_1 + 1 \mathbf{v}_2,
\end{align*}
```
omdat in de $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis dit resulteert in:

```{math}
\begin{align*}
\left(
\begin{array}{c}4\\7
\end{array}\right)
=
2
\left(\begin{array}{c}1\\3
\end{array}\right)
+
\left(
\begin{array}{c}2\\1
\end{array}\right).
\end{align*}
```
Dus in de $\mathbf{v}_1,\mathbf{v}_2$ basis zou de vectorrepresentatie van $\mathbf{\Psi}$ als volgt luiden

```{math}
\begin{align*}
\mathbf{\psi}_A=
\left(\begin{array}{c}2\\1
\end{array}\right).
\end{align*}
```
Nogmaals benadrukken we dat, hoewel $\mathbf{\Psi}$ met verschillende getallen wordt weergegeven, het object zelf niet is veranderd.

Laten we onze eerdere berekeningen algemener formuleren. We kennen representaties van $\mathbf{\Psi}$, $\mathbf{v}_1,\mathbf{v}_2$ in de $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis

```{math}
\begin{align*}
\mathbf{\psi}=\left(
\begin{array}{c}\psi[x]\\\Psi[y]
\end{array}\right),
\quad
\mathbf{v}_1=
\left(\begin{array}{c}v_1[x]\\ v_1[y]
\end{array}\right),
\mathbf{v}_2=
\left(\begin{array}{c}v_2[x]\\ v_2[y]
\end{array}\right),
\end{align*}
```
we willen $\Psi[v_1], \Psi[v_2]$ vinden, zodat

```{math}
\begin{align*}
\begin{split}
\left(\begin{array}{c}\psi[x]\\\Psi[y]
\end{array}\right)&=
\psi[v_1]
\left( \begin{array}{c}v_1[x]\\ v_1[y]
\end{array}\right) +
\psi[v_2]
\left( \begin{array}{c}v_2[x]\\ v_2[y]
\end{array}\right)
&=
\left(\begin{array}{cc}v_1[x] & v_2[x]\\ v_1[y] & v_2[y]
\end{array}\right)
\left(\begin{array}{c}\psi[v_1]\\\psi[v_2]
\end{array}\right).
\end{split}
\end{align*}
```
Hier vertegenwoordigt $\Psi[x],\Psi[y]$ $\mathbf{\Psi}$ in de $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis, en $\Psi[v_1],\Psi[v_2]$ vertegenwoordigt $\mathbf{\Psi}$ in de $\mathbf{v}_1,\mathbf{v}_2$ basis. Zo wordt de matrix gedefinieerd

```{math}
\begin{align*}
B=
\left(\begin{array}{cc}v_1[x] & v_2[x]\\ v_1[y] & v_2[y]
\end{array}\right),
\end{align*}
```
om van de $\mathbf{v}_1,\mathbf{v}_2$ representatie van $\mathbf{\Psi}$ naar de $\hat{\mathbf{x}},\hat{\mathbf{y}}$ representatie van $\mathbf{\Psi}$ te gaan, moeten we berekenen

```{math}
\begin{align*}
\left(\begin{array}{c}\psi[x]\\\Psi[y]
\end{array}\right)
=
B
\left(\begin{array}{c}\psi[v_1]\\\psi[v_2]
\end{array}\right).
\end{align*}
```
Omgekeerd, om van de $\hat{\mathbf{x}},\hat{\mathbf{y}}$ representatie naar de $\mathbf{v}_1,\mathbf{v}_2$ representatie te gaan, moeten we berekenen

```{math}
\begin{align*}
\left(\begin{array}{c}\psi[v_1]\\\psi[v_2]
\end{array}\right)
=
B^{-1}
\left(\begin{array}{c}\psi[x]\\\Psi[y]
\end{array}\right).
\end{align*}
```
Dus nu weten we hoe we van de ene basisrepresentatie naar de andere en terug moeten gaan. We hebben eerder gezien dat het handig kan zijn om over te schakelen naar de eigenbasis van een lineaire operator $A$, omdat in die representatie $A$ diagonaal is. Zo kunnen we **diagonaliseren** $A$ als

```{math}
:label: diagonalization
\begin{align*}
A=B
\left(\begin{array}{cc}\lambda_1 &0\\0& \lambda_2
\end{array}\right)
B^{-1}.
\end{align*}
```
Samenvattend, met $B^{-1}$ gaan we van een $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis naar de eigenbasis van $A$. De kolommen van $B$ bevatten de eigenvectoren van $B$ in de $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis. Vervolgens passen we de operator $A$ toe, die in zijn eigenbasis een diagonale matrix is met zijn eigenwaarden langs de diagonaal. Om vervolgens terug te gaan van de eigenbasis naar de $\hat{\mathbf{x}},\hat{\mathbf{y}}$ basis, passen we $B$ toe.
Dit is vooral handig wanneer men $A$ vele malen moet toepassen, want in dat geval

```{math}
\begin{align*}
A^N=B
\left(\begin{array}{cc}\lambda_1^N &0\\0& \lambda_2^N
\end{array}\right)
B^{-1}.
\end{align*}
```
Of het kan handig zijn als we $A$ willen exponentiëren

```{math}
\begin{align*}
\begin{split}
e^{A}&=\sum_{k=0}^{\infty} \frac{A^k}{k!}
&=B \left(\sum_{k=0}^{\infty}
\frac{\left(\begin{array}{cc}\lambda_1 &0\\0& \lambda_2
\end{array}\right)^k}
{k!}
\right)
B^{-1}
&=B
\left(\begin{array}{cc}e^{\lambda_1} &0\\0& e^{\lambda_2}
\end{array}\right)
B^{-1}.
\end{split}
\end{align*}
```
Dit wordt bijvoorbeeld gebruikt in de oplossing van de Schrödingervergelijking

```{math}
\begin{align*}
\begin{split}
&\hat{H}\mathbf{\psi}=i\hbar \frac{\text{d}}{\text{d}t}\mathbf{\psi}
&\Rightarrow
&\mathbf{\psi}(t)=e^{-i\hat{H}t/\hbar}\mathbf{\psi}(0),
\end{split}
\end{align*}
```
wat aangeeft waarom het nuttig is om $\mathbf{\psi}(0)$ te beschrijven in de energiebasis als we de tijdsevolutie willen vinden.

Er zijn veel toepassingen van basistransformaties en eigenwaarde-decomposities in de optica. Stel dat we de transmissie-as van een lineaire polarisator kennen en deze in de richting van de vector laten staan

$$\left(\begin{array}{c}a\\
\end{array}\right)

$$
Dan wordt al het licht dat in deze richting gepolariseerd is volledig doorgelaten, dus deze vector is een eigenvector van de polarisatoroperator met eigenwaarde 1. We weten dat al het licht polariseert in de richting van de vector

$$
\left(\begin{array}{c}b\\a
\end{array}\right)

$$
(d.w.z. loodrecht op de transmissie-as) wordt volledig geblokkeerd, dus dit is een eigenvector met eigenwaarde 0. Gegeven de transmissie-as van een lineaire polarisator kunnen we dus onmiddellijk de Jones-matrix opschrijven

```{math}
\begin{align*}
J=
\left(\begin{array}{cc}A & B\\B&-A
\end{array}\right)
\left(
\begin{array}{cc}1 & 0\\0 & 0
\end{array}\right)
\left( \begin{array}{cc}A & B\\B&-A
\end{array}\right)^{-1}.
\end{align*}
```
Omgekeerd kunnen we uit de eigenwaarde-decompositie van een Jones-matrix onmiddellijk zien wat de hoofdassen zijn, en hoe het inwerkt op de componenten langs die assen, d.w.z. of het een lineaire polarisator, halfgolfplaat, kwartgolfplaat of iets anders is.

Basistransformaties kunnen ook worden gebruikt om **optische activiteit** te beschrijven. In optisch actieve media zijn er verschillende brekingsindices voor links-circulair en rechts-circulair gepolariseerd licht, dus het is handiger om de Jones-vector weer te geven in de basis van links-circulair en rechts-circulair gepolariseerd licht, in plaats van in de basis van twee lineaire orthogonale polarisaties.

Het is ook interessant om de equivalentie op te merken tussen de Jones-vector en de kwantumtoestanden van fotonen die als qubits worden gebruikt: de polarisatie van een foton is een kwantummechanisch systeem met twee toestanden. Deze qubit kan worden weergegeven als

```{math}
\begin{align*}
\ket{\psi}=\alpha\ket{0}+\beta\ket{1},
\end{align*}
```
waarin $\alpha$ en $\beta$ analoog zijn aan de ingangen van de Jones-vector. Inderdaad, in experimenten met kwantuminformatie met fotonen als qubits zijn golfplaten alomtegenwoordig<sup>[^1]</sup>. Ook bij kwantuminformatie is het belangrijk om bekend te zijn met basistransformaties.

Een andere toepassing van basistransformaties en eigenwaarde-decomposities in de optica is in de **Angular Spectrum Method**. Deze methode wordt gebruikt om een veld $U_0$ te vermeerderen, en wordt uitgelegd in het hoofdstuk over diffractie-optica. De bewerking die we in dit geval willen toepassen is de propagatieoperator $P_{\Delta z}$ die de propagatie over een afstand $z$ aangeeft. Om dit te doen, ontleden we het veld $U_0$ in eigenfuncties van $P_{\Delta z}$, die vlakke golven zijn $e^{i\mathbf{k} \cdot \mathbf{r}}$ omdat

```{math}
\begin{align*}
\begin{split}
P_{\Delta z} e^{i(k_x x + k_y y +k_z z)} &= e^{i(k_x x + k_y y +k_z (z+\Delta z))}
&=e^{i k_z \Delta z} e^{i(k_x x + k_y y +k_z z)}.
\end{split}
\end{align*}
```
Dus inderdaad, $e^{i\mathbf{k} \cdot \mathbf{r}}$ is een eigenfunctie van $P_{\Delta z}$, met eigenwaarde $e^{i k_z \Delta z}$. De basistransformatie die we moeten toepassen om $U_0$ te ontleden in eigenfuncties van $P_{\Delta z}$ is de Fouriertransformatie. Dus op dezelfde manier als in eq.{eq}`diagonalization`, om de voortplantingsoperator toe te passen, Fourier-transformeren we $U_0$ om het te ontleden in eigenfuncties van $P_{\Delta z}$, vermenigvuldigen we elke component met de eigenwaarde $e^{i k_z \Delta z}$, en dan keren we Fouriertransformatie om terug te gaan naar de oorspronkelijke basis

```{math}
\begin{align*}
P_{\Delta z} U_0 = \mathcal{F}^{-1}\{\mathcal{F}\{U_0\}e^{i k_z \Delta z}\}.
\end{align*}
```
In dit kader kan gemakkelijk worden begrepen hoe deze methode moet worden gewijzigd voor vermeerdering in niet-homogene media. In dat geval zijn de vlakke golven $e^{i\mathbf{k} \cdot \mathbf{r}}$ niet langer eigenfuncties van de propagatieoperator, maar moeten we de juiste eigenfuncties en eigenwaarden vinden voor voortplanting door zo'n medium.

Voor andere verklaringen van basistransformaties zie [Khan Academy - Alternate coordinate systems (bases)](https://www.khanacademy.org/math/linear-algebra/alternate_bases/change_of_basis/v/linear-algebra-coordinates-with-respect-to-a-basis), en [Khan Academy - Showing that an eigenbasis is a useful coördinaten systemen](https://www.khanacademy.org/math/linear-algebra/alternate_bases/eigen_everything/v/linear-algebra-showing-that-an-eigenbasis-makes-for-good-coordinate-systems).



[^1]: Zie bijv. [Experimental Demonstration of Blind Quantum Computing, S. Barz et al. (2011)](http://arxiv.org/pdf/1110.1381v_1.pdf).

