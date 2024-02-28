## Opgaven

1. Beschouw een tijdharmonische vlakke golf met een reëel elektrisch veld die ten opzichte van een cartesiaans coördinatenstelsel $(x,y,z)$ wordt gegeven door:

```{math}
\begin{align*}
\mathbf{E}(z,t)= A \sin\left(k z-\omega t + \pi/2\right) \hat**{x**}+ A \sin\left(k z-\omega t \right) \hat**{y**}
\end{align*}
```
waarbij $A$ een positief reëel getal is.

- **a)** Schrijf dit elektrische veld als het reële deel van een complex veld.

- **b)** Wat is de corresponderende Jones-vector?

- **c)** Wat is de polarisatie van dit elektrische veld? Maak een tekening van de elektrische veldvector in het $(x,y)$-vlak op $z=0$ als functie van de tijd voor een waarnemer die naar de bron van het veld kijkt.

- **d)** De bundel gaat normaal gesproken door een lineaire polarisator waarvan de transmissie-as een hoek maakt van $45 \degree$ met de positieve $x$-as.
Wat is de Jones-matrix van deze lineaire polarisator?

- **e)** Leid het werkelijke elektrische veld af dat door de lineaire polarisator wordt uitgezonden als functie van $z$ en $t$.

- **f)** Wat is de polarisatietoestand van de uitgezonden bundel?

- **g)** Wat is de intensiteit van de uitgezonden straal?

- **h)** Wat gebeurt er met het verschil in energie tussen de invallende en de uitgezonden straal?
 


2. Gedeeltelijke lineaire polarisatie. 

Beschouw een lichtstraal die gedeeltelijk lineair gepolariseerd is. Toon aan dat de mate van polarisatie wordt gegeven door

$$
\frac{I_{max}-I_{min}}{I_{max}+I_{min}}.

$$
waarbij $I_{max}$ en $I_{min}$ het maximum en minimum zijn van het licht dat door een lineaire polarisator wordt doorgelaten wanneer het 360 graden wordt gedraaid.
 
3. In dit probleem beschouwen we een optische isolator zoals weergegeven in {numref}`Fig_4_4_Optical_Isolator`. In de opstelling kan licht in één richting gaan, maar het kan niet terug. Dit kan bijvoorbeeld worden gebruikt om te voorkomen dat laserlicht teruggaat in de laserbron, waardoor ongewenste effecten zoals intensiteits- en frequentie-instabiliteiten worden voorkomen.

```{figure} Images/Chapter_4/Ex_4_4_Optical_Isolator.png
:name: Fig_4_4_Optical_Isolator
Schematische tekening van een eenvoudige optische isolator.
```

- **a)** Geef de Jones-matrix voor een lineaire polarisator $\mathcal{P}$ die licht polariseert in de verticale richting (d.w.z. de $y$-richting).

- **b)** Nu draaien we de lineaire polarisator met $\theta=\pi/4$ tegen de klok in. Zoek de Jones-matrix voor de geroteerde polarisator $\mathcal{P}_{\pi/4}$. Controleer uw resultaat door te controleren of:

$$
\mathcal{P}_{\pi/4}\begin{pmatrix}1\\
1\end{pmatrix}=\begin{pmatrix}1\\
1\end{pmatrix},
\quad
\mathcal{P}_{\pi/4}\begin{pmatrix}1\\
\end{pmatrix}=\begin{pmatrix}0\\
\end{pmatrix}.
$$

 
- **c)** Geef de Jones-matrix $\mathcal{Q}$ voor de kwartgolfplaat waarvan de langzame as in de verticale richting wijst (d.w.z. de $y$-richting).
 
- **d)** Stel dat we licht door de lineaire polarisator en de kwartgolfplaat sturen. Dan het licht wordt gedeeltelijk doorgelaten en gedeeltelijk gereflecteerd door de spiegel. Het gereflecteerde licht gaat weer door de kwartgolfplaat en de polarisator. Bereken met behulp van Jones-matrices de toestand van het licht dat naar buiten gaat.
 
Een videodemonstratie van deze optische isolator kan worden bekeken op <sup>[^1]</sup> (of zoek naar "MIT optical isolator" op Youtube).


4. Fase platen. 

We beschouwen een tijdharmonische vlakke golf die zich voortplant in de positieve $z-$direction.
- **a)** Stel dat we een lineaire polarisator hebben die zo georiënteerd is dat de hoek met de positieve $\hat{\mathbf{x}}$-as $+45^o$ is. Achter de lineaire polarisator bevindt zich een halve golfplaat met een snelle as die evenwijdig aan de $\hat{\mathbf{y}}$-as is georiënteerd.
Wat is de oriëntatie van de polarisatie van de golf die eerst door de lineaire polarisator en vervolgens door de halve golfplaat wordt uitgezonden wanneer de invallende golf lineair gepolariseerd is evenwijdig aan de $\hat{\mathbf{x}}$-as?
 
- **b)** Wat is de intensiteit van de uitgezonden golf als de invallende golf in a) een amplitude heeft $A$?
 

- **c)** Stel nu dat de halve golfplaat achter de lineaire polarisator met hoek $45^o$ met de $x$-as, wordt vervangen door een kwartgolfplaat met de snelle as evenwijdig aan de $y$-as. 
Wat is de polarisatie van het doorgelaten licht als de invallende golf lineair gepolariseerd is, evenwijdig aan de $\hat{\mathbf{x}}$-as?
 
- **d)** Wat is de intensiteit van de uitgezonden golf als de invallende golf in c) amplitude $A$?
 

- **e)** Stel dat een invallende lineaire gepolariseerde golf die evenwijdig aan het $x$-as licht gepolariseerd is, eerst wordt doorgelaten door een kwartgolfplaat waarvan de snelle as een hoek van $+45^o$ maakt met de positieve $x$-as, en vervolgens wordt uitgezonden door een halve golfplaat met een snelle as evenwijdig aan de $y$-as.

Wat is de polarisatie van het doorgelaten licht als de invallende golf evenwijdig aan de $\hat{\mathbf{x}}$-as gepolariseerd is?


5. Jones Matrices.

Controleer voor elk van de volgende matrices of ze overeenkomen met een lineaire polarisator, een golfplaat of geen van beide. Specificeer ook de richting van de lineaire polarisator en het type golfplaat.
- **a)**

$$
\left( \begin{array}{cc}-1 & 1 \\-\frac{2}{5} + i \frac{2}{5} & -\frac{1}{5}+i\frac{4}{5}
\end{array}\right).

$$

- **b)**

$$
\left( \begin{array}{cc}1 & -1 \\-1 en 1
\end{array}\right).
$$


- **c)**

$$
\left(\begin{array}{cc}1 & 0 \\0 &3
\end{array}\right)

$$
- Bepaal de Jones-matrix voor het geval van een golfplaat met een dikte gelijk aan de golflengte, met een snelle as evenwijdig aan de vector

$$
\left( \begin{array}{c}1 \\-1
\end{array}\right),

$$
en met brekingsindices $n_1=1,5$ en $n_2=2$.



[^1]:  [http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/optical-isolator/](http://ocw.mit.edu/resources/res-6-006-video-demonstrations-in-lasers-and-optics-spring-2008/demonstrations-in-physical-optics/optical-isolator/)

