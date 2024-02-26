# Over het behoud van elektromagnetische energie
We beschouwen een tijdharmonisch elektrisch veld dat algemener is dan een vlakke golf (d.w.z. het is niet noodzakelijk een enkele vlakke golf, maar een superpositie van vlakke golven met golfvectoren met verschillende richtingen). Laat $V$ een begrensd volume zijn met een gesloten grens $A$. De tijdgemiddelde flux van elektromagnetische energie door de grens $A$ naar buiten van het volume wordt gegeven door de oppervlakteintegraal

```{math}
:label: eq.defflux
\begin{align*}
F= \int\!\int \mathbf{S}(\mathbf{r}) \cdot \hat{\mathbf{n}} dA,
\end{align*}
```
waarbij $\hat{\mathbf{n}}$ de naar buiten wijzende eenheidsnormaal is. We gaan ervan uit dat er geen bronnen zijn binnen $V$. Er zijn dan twee mogelijkheden:
1. $F<0$. In dit geval is er een netto flux van niet-nul in het volume. Omdat alle velden tijdharmonisch zijn, kan er alleen een netto instroom zijn als elektromagnetische energie in het volume wordt geabsorbeerd. Daarom moet het imaginaire deel van de permittiviteit positief zijn. Er kan worden aangetoond dat het tijdsgemiddelde van het geabsorbeerde vermogen wordt gegeven door

```{math}
:label: eq.abs
\begin{align*}
\text{Geabsorbeerde e.m. energie}=\frac{\omega}{2} \text{Im} (\epsilon) |\mathbf{E}(\mathbf{r})|^2 dV,
\end{align*}
```
waarin $\mathbf{E}(\mathbf{r})$ de complexe amplitude van het elektrische veld op positie $\mathbf{r}$ is.

2. $F=0$. In dit geval is de netto energiestroom door de grens nul en wordt de materie in het volume dus niet geabsorbeerd.

