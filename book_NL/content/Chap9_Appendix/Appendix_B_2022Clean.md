# Het Lorentz-model voor materiaalverspreiding
Het Lorentz-model, dat we al noemden in paragraaf [](section.maxmat), leidt tot een dispersierelatie voor de susceptibiliteit en dus voor de permittiviteit die wordt gegeven door

```{math}
:label: eq.epsdisp1
\begin{align*}
\epsilon(\omega) = \frac{1 + 2 q}{1-q},
\end{align*}
```
met

```{math}
:label: eq.defqdisp
\begin{align*}
q =
\frac{N q_e^2}{3 \epsilon_0 m_e} \sum_j \frac{f_j}{\omega_j^2 - \omega^2 + i \gamma_j \omega},
\end{align*}
```
waarin $N$ de getaldichtheid van elektronen is, $q_e$ en $m_e$ de lading en massa van het elektron zijn, $\omega_j$ de resonantiefrequenties van atomen of moleculen van het materiaal zijn, $\gamma_j>0$ een dempingsterm is en $f_j$ wegingsfactoren (zogenaamde oscillatorsterktes) zijn die voldoen aan: $\sum_j f_j=1$.
De brekingsindex is de wortel van de permittiviteit: $n=\sqrt{\epsilon}$ en het reële deel ervan wordt weergegeven in {numref}`Fig_Resonance`.
Voor verdunde gassen is $N$ klein en dus is $q$ klein in vergelijking met 1. Dan wordt de permittiviteit gelijk aan

```{math}
:label: eq.appdisp
\begin{align*}
\epsilon(\omega) \approx 1 + q = 1 +
\frac{N q_e^2}{3 \epsilon_0 m_e} \sum_j \frac{f_j}{\omega_j^2 - \omega^2 + i \gamma_j \omega},
\end{align*}
```

```{figure} Images/Annexe/Resonance.png
:name: Fig_Resonance
Brekingsindex als functie van frequentie.
```


De resonanties die overeenkomen met overgangen van een lager naar een hoger energieniveau van elektronen die zich in de binnenste schillen van een atoom bevinden, bevinden zich meestal in het röntgengebied, terwijl overgangen van valentie-elektronen zich in het ultraviolet naar het zichtbare kunnen bevinden. Resonanties van relatieve bewegingen van atomen in een molecuul bevinden zich vaak in het infrarood.
Bij een resonantie absorbeert het atoom een foton van energie $\hbar \omega$ gelijk aan het verschil tussen de energieniveaus. Het materiaal is dan absorberend en dit komt overeen met een permittiviteit met een positief imaginair deel. Tussen de resonanties door is de absorptie laag, zodat het imaginaire deel van de permittiviteit bijna nul is, terwijl het reële deel langzaam toeneemt met de frequentie (dit wordt "normale" dispersie genoemd). Dicht bij een resonantie neemt het reële deel van de permittiviteit snel af met de frequentie (abnormale dispersie).

