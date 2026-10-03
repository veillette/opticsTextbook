"""Regenerate the two-level laser population-difference plot in Chapter 8."""

from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 5, 401)
rate_ratio = 0.5
steady_fraction = rate_ratio / (rate_ratio + 2)
population_difference = -(steady_fraction + (1 - steady_fraction) * np.exp(-x))

fig, ax = plt.subplots(figsize=(6.4, 4.0), layout="constrained")
ax.plot(x, population_difference, color="#175a8d", linewidth=2.5)
ax.axhline(-steady_fraction, color="#67727c", linestyle="--", linewidth=1)
ax.set(xlim=(0, 5), ylim=(-1.05, 0), xlabel=r"$(A_{21}+2B_{12}W)t$",
       ylabel=r"$\Delta N/N$")
ax.grid(alpha=0.2)
fig.savefig(Path(__file__).resolve().parents[2] /
            "content/Chap08Lasers/Images/08_08_laser_d_nn.png", dpi=180)
