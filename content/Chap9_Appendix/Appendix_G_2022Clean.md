(chapter.FourierTransform)=
# The Fourier Transform

\label{appendixFI}
## Definitions

```{math}
:label: eq.FI1
\begin{align*}
{\cal F}(h)(\xi,\eta) &= \int\!\!\!\int e^{-2\pi i(x \xi + y \eta)} h(x,y) dx\, dy.
\end{align*}
```
```{math}
:label: eq.FI2
\begin{align*}
\\
{\cal F}^{-1}(H)(x,y) &= \int\!\!\!\int e^{2\pi i(x \xi + y \eta)} H(\xi,\eta) d \xi \, df_y.\end{align*}
```
## General Equations

```{math}
:label: eq.FI2b
\begin{align*}
{\cal F}^{-1}{\cal F}(h)(x,y) &= h(x,y),
\end{align*}
```
```{math}
:label: eq.FI4
\begin{align*}
\\
{\cal F}(h)(\xi,\eta)^* &= {\cal F}(h^*)(-\xi,-\eta),\end{align*}
```
($z^*$ is the complex conjugate of $z$).

```{math}
:label: eq.FI5
\begin{align*}
\int\!\!\!\int | h(x,y)|^2 dx\, dy &= \int\!\!\!\int |{\cal F}(h)(\xi,\eta)|^2 d \xi\, df_y,
\text{ Parseval's formula}),
\end{align*}
```
```{math}
:label: eq.FI6
\begin{align*}
\\
{\cal F}(g*h) &= {\cal F}(g) {\cal F}(h),
\end{align*}
```
```{math}
:label: eq.FI6b
\begin{align*}
\\
{\cal F}(gh) &= {\cal F}(g) * {\cal F}(h),\end{align*}
```
where

```{math}
:label: eq.FI7
\begin{align*}
(g*h)(x,y) = \int\!\!\!\int g(x-x', y-y') h(x',y') dx' \, dy'.
\end{align*}
```
If $h(x)$ is a $p$-periodical function then

```{math}
:label: eq.FI7b
\begin{align*}
{\cal F}(h)(\xi) = \sum_{n=-\infty}^{+\infty} \hat{h}(n)\, \delta\left( \xi - \frac{n}{p}\right),
\end{align*}
```
where

```{math}
:label: eq.FI7c
\begin{align*}
\hat{h}(n) = \frac{1}{p} \int_0^p h(x) e^{-2\pi n x} \, dx.
\end{align*}
```
## Some Fourier transforms


```{math}
:label: eq.FI8
\boxed{\begin{align*}
{\cal F}\left[ 1_{[-a,a]}(x) 1_{[-b,b]} \right](\xi, \eta) =
4 a b \, \text{sinc}(2 a \xi) \text{sinc}(2bf_y),
\end{align*}}
```

where

```{math}
:label: eq.FI9
\begin{align*}
\text{sinc} (x) = \frac{\sin (\pi x)}{\pi x}.
\end{align*}
```


```{math}
:label: eq.FI10
\boxed{\begin{align*}
{\cal F}\left[ \delta(x/a) \delta(y/b)\right] = a b.
\end{align*}}
```


```{math}
:label: eq.FI10b
\boxed{\begin{align*}
{\cal F}\left[1\right](\xi,\eta) = \delta(\xi)\delta(\eta).
\end{align*}}
```


```{math}
:label: eq.FI11
\boxed{\begin{align*}
{\cal F}\left[ e^{-\pi(a^2 x^2 + b^2 y^2})\right] (\xi,\eta) =
\frac{1}{|ab|} e^{-\pi\left(\xi^2/a^2 + \eta^2/b^2 \right) }.
\end{align*}}
```

Let

```{math}
:label: eq.FI12
\begin{align*}
1_{\bigcirc_a}(x,y)
= \left\{ \begin{array}{l}1, \;\; \text{ als } \;\\\sqrt{x^2 + y^2} \leq a, \\0, \;\; \text{ als } \; \sqrt{x^2+y^2} > a.
\end{array} \right.
\end{align*}
```
Then


```{math}
:label: eq.FI13
\boxed{\begin{align*}
{\cal F}(1_{\bigcirc_a})(\xi,\eta)
=a \frac{J_1 \left( 2\pi a \sqrt{\xi^2+\eta^2}\right)}
{ \sqrt{\xi^2 + \eta^2}}.
\end{align*}}
```


```{math}
:label: eq.FI14
\boxed{\begin{align*}
{\cal F}\left[ e^{i \pi\left( a ^2 x^2 + b^2 y^2 \right)}\right](\xi,\eta) =
\frac{i}{|ab|} e^{-i\pi\left( \xi^2/a^2 + \eta^2/b^2\right)}
\end{align*}}
```
%\end{eqnarray}