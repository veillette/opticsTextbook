"""Regenerate the Chapter 10 mirror-waveguide modal-delay example."""

from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

c = 299_792_458
wavelength_over_twice_width = 0.15
length_km = np.linspace(0, 1, 201)
fig, ax = plt.subplots(figsize=(6.6, 4.3), layout="constrained")
for i, j in [(1, 2), (1, 3), (2, 3), (2, 4)]:
    vi = c * np.sqrt(1 - (i * wavelength_over_twice_width) ** 2)
    vj = c * np.sqrt(1 - (j * wavelength_over_twice_width) ** 2)
    delay_ns = length_km * 1_000 * (1 / vj - 1 / vi) * 1e9
    ax.plot(length_km, delay_ns, linewidth=2, label=fr"$i={i},\ j={j}$")

ax.set(
    xlim=(0, 1),
    ylim=(0, 700),
    xlabel="Waveguide length $L$ (km)",
    ylabel=r"Differential delay $\Delta\tau$ (ns)",
)
ax.legend(loc="upper left", frameon=False)
ax.grid(alpha=0.2)
fig.savefig(
    Path(__file__).resolve().parents[2]
    / "content/Chap10FiberOptics/Images/10_06_mirror_dispersion.png",
    dpi=180,
)
