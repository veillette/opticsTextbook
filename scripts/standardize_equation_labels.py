#!/usr/bin/env python3
"""
Standardize Equation Labels

This script converts legacy equation labels to the new standardized format:
  Format: eq:chapter-code:descriptive-name

Chapter codes:
  - basics = Chapter 1 (Nature of Light)
  - geo = Chapter 2 (Geometrical Optics)
  - inst = Chapter 3 (Optical Instruments)
  - pol = Chapter 4 (Polarization)
  - wave = Chapter 5 (Wave Equations)
  - coh = Chapter 6 (Interference and Coherence)
  - diff = Chapter 7 (Diffraction)
  - laser = Chapter 8 (Lasers)
  - fiber = Chapter 10 (Fiber Optics)
  - ray = Chapter 11 (Ray Matrix)

Usage:
  python standardize_equation_labels.py [--check] [file_path]

  --check: Only check for non-standard labels without modifying files
"""

import re
import sys
import os
from pathlib import Path

# Chapter code mappings
CHAPTER_CODES = {
    'Chap01Basics': 'basics',
    'Chap02GeometricalOptics': 'geo',
    'Chap03OpticalInstruments': 'inst',
    'Chap04Polarization': 'pol',
    'Chap05Wave': 'wave',
    'Chap06InterferenceCoherence': 'coh',
    'Chap07Diffraction': 'diff',
    'Chap08Lasers': 'laser',
    'Chap09AdvancedInstruments': 'adv',
    'Chap10FiberOptics': 'fiber',
    'Chap11RayMatrix': 'ray',
}

# Label mappings for Chapter 6 (Interference and Coherence)
CHAPTER6_MAPPINGS = {
    'eq.U1plusU2': 'eq:coh:sum-fields',
    'eq.averageII': 'eq:coh:time-average',
    'eq.I2': 'eq:coh:intensity-sum',
    'eq.interf': 'eq:coh:interference-general',
    'eq.fringecontrast': 'eq:coh:fringe-contrast',
    'eq.tcoh': 'eq:coh:coherence-time',
    'eq.lcoh': 'eq:coh:coherence-length',
    'eq.dlambdadomega': 'eq:coh:wavelength-frequency-ratio',
    'eq.lcoh2': 'eq:coh:coherence-length-wavelength',
    'eq.defUrealt': 'eq:coh:real-field-integral',
    'eq.defUcomplext': 'eq:coh:complex-field-integral',
    'eq.Urc': 'eq:coh:real-from-complex',
    'eq.poly10': 'eq:coh:polychromatic-intensity',
    'eq.poly10b': 'eq:coh:polychromatic-intensity-b',
    'eq.defI': 'eq:coh:intensity-definition',
    'eq.Itau': 'eq:coh:intensity-time-delay',
    'eq.defgamma': 'eq:coh:self-coherence-degree',
    'eq.defgamma2': 'eq:coh:self-coherence-bounds',
    'eq.inter_coh': 'eq:coh:interference-coherence',
    'eq.SelfG_mono': 'eq:coh:self-coherence-monochromatic',
    'eq.gamma': 'eq:coh:gamma-monochromatic',
    'temporalcoherence': 'eq:coh:temporal-coherence',
    'eq.fringe': 'eq:coh:fringe-two-frequencies',
    'eq.gamma2': 'eq:coh:gamma-two-frequencies',
    'eq.intens2freq': 'eq:coh:intensity-two-frequencies',
    'eq.Gammaomegsa': 'eq:coh:wiener-khinchin',
    'eq.defUcomplext1': 'eq:coh:complex-field-p1',
    'eq.timeharm': 'eq:coh:time-harmonic-spherical',
    'eq.Uhuygens': 'eq:coh:huygens-fresnel',
    'eq.Uhuygens2': 'eq:coh:huygens-fresnel-p2',
    'eq.tau2': 'eq:coh:time-difference',
    'eq.fringe_sp': 'eq:coh:spatial-fringe',
    'eq.mutcoh': 'eq:coh:mutual-coherence',
    'eq.defgamma12': 'eq:coh:mutual-coherence-degree',
    'eq.gamma12': 'eq:coh:gamma12-bound',
    'eq.Gamma110': 'eq:coh:gamma-self-coherence',
    'eq.gamma12a': 'eq:coh:gamma12-monochromatic',
    'doubleslitinterference': 'eq:coh:double-slit-interference',
    'eq.theta_Young': 'eq:coh:young-maxima-angles',
    'eq.spatincoh0a': 'eq:coh:spatial-incoherence-a',
    'eq.spatincoh0b': 'eq:coh:spatial-incoherence-b',
    'eq.Gamma0cc': 'eq:coh:gamma0-conjugate',
    'eq.UP1': 'eq:coh:field-p1',
    'eq.UP2': 'eq:coh:field-p2',
    'eq.GammaP1P2': 'eq:coh:gamma-p1p2-full',
    'eq.GammaP1P2b': 'eq:coh:gamma-p1p2-simplified',
    'eq.GammaP1P1': 'eq:coh:gamma-p1p1',
    'eq.dist1': 'eq:coh:path-difference-1',
    'eq.dist2': 'eq:coh:path-difference-2',
    'eq.gamP1P2': 'eq:coh:gamma-p1p2-angle',
    'eq.quasimon': 'eq:coh:quasi-monochromatic',
    'eq.GamP1P2mon0': 'eq:coh:gamma-p1p2-quasi',
    'eq.gamP1P2mon': 'eq:coh:gamma-p1p2-quasi-degree',
    'eq.coh12': 'eq:coh:coherence-condition',
    'eq.alphasun': 'eq:coh:sun-angle',
    'eq.rFB': 'eq:coh:fabry-perot-reflection',
    'eq.roundtrip1': 'eq:coh:round-trip',
    'eq.tFP': 'eq:coh:fabry-perot-transmission',
    'eq.inside': 'eq:coh:fabry-perot-internal',
    'eq.defG': 'eq:coh:fabry-perot-g',
    'eq.defF': 'eq:coh:fabry-perot-finesse',
    'eq.R_FB': 'eq:coh:fabry-perot-reflectance',
    'eq.T_FB': 'eq:coh:fabry-perot-transmittance',
    'eq.defdelta': 'eq:coh:phase-change',
    'eq.R_TB2': 'eq:coh:reflectance-delta',
    'eq.T_FB2': 'eq:coh:transmittance-delta',
    'eq.R1': 'eq:coh:high-reflectance',
    'eq.deltam': 'eq:coh:resonance-condition',
    'eq.res': 'eq:coh:resonance-wavelength',
    'eq.FWHM': 'eq:coh:fwhm-condition',
    'eq.width': 'eq:coh:resonance-width',
    'eq.lambdafree': 'eq:coh:wavelength-width',
    'eq.resolution2': 'eq:coh:resolution',
    'eq.wavelengthwidth': 'eq:coh:free-spectral-range',
    'eq.freewavel': 'eq:coh:free-spectral-wavelength',
    'eq.resolution3': 'eq:coh:resolution-ratio',
    'eq.interpol1': 'eq:coh:polarization-interference',
}

# Label mappings for Chapter 7 (Diffraction)
CHAPTER7_MAPPINGS = {
    'eq.complH': 'eq:diff:helmholtz',
    'eq.FU0': 'eq:diff:fourier-field',
    'eq.Finv': 'eq:diff:fourier-inverse',
    'eq.FkU0': 'eq:diff:fourier-wavevector',
    'eq.planewave1': 'eq:diff:plane-wave',
    'eq.kz': 'eq:diff:kz-component',
    'eq.kzxieta': 'eq:diff:kz-spatial-freq',
    'evanescent': 'eq:diff:evanescent',
    'eq.devE0': 'eq:diff:divergence-free',
    'eq.rs': 'eq:diff:rayleigh-sommerfeld',
    'eq.defr': 'eq:diff:distance-definition',
    'eq.fesnel1': 'eq:diff:fresnel-1',
    'eq.r1_ch6': 'eq:diff:distance-approx',
    'eq.approxpar': 'eq:diff:paraxial-approx',
    'eq.fresnel2': 'eq:diff:fresnel-2',
    'eq.FresnelF': 'eq:diff:fresnel-integral',
    'eq.r_fresnel': 'eq:diff:fresnel-distance',
    'eq.r_Fraunhofer': 'eq:diff:fraunhofer-distance',
    'eq.Fraunhofer': 'eq:diff:fraunhofer-integral',
    'eq.spatial': 'eq:diff:spatial-frequency',
    'eq.eisFresnel': 'eq:diff:fresnel-condition',
    'eq.eisFraunhofer': 'eq:diff:fraunhofer-condition',
    'eq.NF': 'eq:diff:fresnel-number',
    'eq.condition': 'eq:diff:far-field-condition',
    'eq.fresnelps': 'eq:diff:fresnel-point-source',
    'eq.Itot': 'eq:diff:total-intensity',
    'eq.lines2': 'eq:diff:bright-fringes',
    'eq.lines3': 'eq:diff:dark-fringes',
    'eq.tauslit': 'eq:diff:slit-transmission',
    'eq.indicator': 'eq:diff:indicator-function',
    'eq.U0slit': 'eq:diff:slit-field',
    'eq.Fspleet': 'eq:diff:slit-fourier',
    'eq.FU02': 'eq:diff:rectangular-aperture',
    'eq.zero': 'eq:diff:zero-condition',
    'eq.Fsum': 'eq:diff:grating-sum',
    'eq.geom': 'eq:diff:geometric-series',
    'eq.Ftau3': 'eq:diff:grating-fourier',
    'eq.fastosc': 'eq:diff:fast-oscillation',
    'eq.orderm': 'eq:diff:diffraction-order',
    'eq.widthorder': 'eq:diff:order-width',
    'eq.finite': 'eq:diff:finite-grating',
    'eq.constr': 'eq:diff:constructive',
    'eq.destruct': 'eq:diff:destructive',
    'eq.destruct2': 'eq:diff:destructive-2',
    'eq.order': 'eq:diff:grating-order',
    'eq.lens1': 'eq:diff:lens-transmission-1',
    'eq.parax1': 'eq:diff:paraxial-lens',
    'eq.lens2': 'eq:diff:lens-transmission-2',
    'eq.lens3': 'eq:diff:lens-field-output',
    'eq.translens': 'eq:diff:lens-transform',
    'fourierlens': 'eq:diff:fourier-lens',
    'eq.F1': 'eq:diff:focal-plane-field',
    'eq.Airy_image': 'eq:diff:airy-pattern',
    'eq.resolution': 'eq:diff:rayleigh-resolution',
    'eq.PSF': 'eq:diff:point-spread-function',
    'eq.imaging': 'eq:diff:imaging-equation',
    'eq.intenscoh': 'eq:diff:coherent-intensity',
    'eq.intensincoh': 'eq:diff:incoherent-intensity',
    'eq.resol': 'eq:diff:resolution-limit',
}


def get_chapter_code(file_path):
    """Extract chapter code from file path."""
    for chapter_dir, code in CHAPTER_CODES.items():
        if chapter_dir in str(file_path):
            return code
    return None


def convert_label(old_label, chapter_code, mappings):
    """Convert an old label to the new standardized format."""
    # Check if already in new format
    if old_label.startswith(f'eq:{chapter_code}:'):
        return old_label

    # Check mappings
    if old_label in mappings:
        return mappings[old_label]

    # Convert dot notation to colon notation
    if old_label.startswith('eq.'):
        name = old_label[3:]  # Remove 'eq.'
        # Convert underscores and camelCase to hyphens
        name = re.sub(r'_', '-', name)
        name = re.sub(r'([a-z])([A-Z])', r'\1-\2', name).lower()
        return f'eq:{chapter_code}:{name}'

    # Labels without 'eq.' prefix
    name = re.sub(r'_', '-', old_label)
    name = re.sub(r'([a-z])([A-Z])', r'\1-\2', name).lower()
    return f'eq:{chapter_code}:{name}'


def find_non_standard_labels(content, chapter_code):
    """Find all non-standard equation labels in content."""
    issues = []

    # Pattern for MyST math block labels
    label_pattern = r':label:\s*(\S+)'

    for match in re.finditer(label_pattern, content):
        label = match.group(1)
        # Check if label follows the standard format
        if not re.match(rf'^eq:{chapter_code}:[a-z0-9-]+$', label):
            issues.append({
                'old': label,
                'position': match.start(),
                'type': 'myst'
            })

    # Pattern for inline labels in $$ ... \label{} ... $$
    inline_pattern = r'\$\$[^$]*\\label\{([^}]+)\}[^$]*\$\$'
    for match in re.finditer(inline_pattern, content, re.DOTALL):
        label = match.group(1)
        issues.append({
            'old': label,
            'position': match.start(),
            'type': 'latex_inline'
        })

    return issues


def standardize_file(file_path, check_only=False):
    """Standardize equation labels in a single file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    chapter_code = get_chapter_code(file_path)
    if not chapter_code:
        print(f"Warning: Could not determine chapter code for {file_path}")
        return 0

    # Get appropriate mappings
    if chapter_code == 'coh':
        mappings = CHAPTER6_MAPPINGS
    elif chapter_code == 'diff':
        mappings = CHAPTER7_MAPPINGS
    else:
        mappings = {}

    issues = find_non_standard_labels(content, chapter_code)

    if check_only:
        if issues:
            print(f"\n{file_path}:")
            for issue in issues:
                new_label = convert_label(issue['old'], chapter_code, mappings)
                print(f"  Line ~{content[:issue['position']].count(chr(10))+1}: "
                      f"{issue['old']} -> {new_label}")
        return len(issues)

    # Apply fixes
    if not issues:
        return 0

    new_content = content

    # Replace labels in reverse order to preserve positions
    for issue in sorted(issues, key=lambda x: x['position'], reverse=True):
        old_label = issue['old']
        new_label = convert_label(old_label, chapter_code, mappings)

        # Replace the label definition
        new_content = new_content.replace(f':label: {old_label}', f':label: {new_label}')

        # Replace all references to this label
        # MyST equation reference format: {eq}`label`
        new_content = re.sub(rf'\{{eq\}}`{re.escape(old_label)}`',
                            f'{{eq}}`{new_label}`', new_content)

        # Also handle inline equation references: [](#label)
        new_content = new_content.replace(f'[](#{old_label})', f'{{eq}}`{new_label}`')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Updated {len(issues)} labels in {file_path}")
    return len(issues)


def validate_labels(content_dir):
    """Validate all equation labels in the content directory."""
    issues_found = 0

    for md_file in Path(content_dir).rglob('*.md'):
        chapter_code = get_chapter_code(md_file)
        if not chapter_code:
            continue

        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()

        issues = find_non_standard_labels(content, chapter_code)
        if issues:
            print(f"\n{md_file}:")
            for issue in issues:
                print(f"  Non-standard label: {issue['old']}")
            issues_found += len(issues)

    return issues_found


def main():
    check_only = '--check' in sys.argv

    # Find content directory
    script_dir = Path(__file__).parent
    content_dir = script_dir.parent / 'content'

    if len(sys.argv) > 1 and not sys.argv[-1].startswith('--'):
        # Process specific file
        file_path = Path(sys.argv[-1])
        if file_path.exists():
            count = standardize_file(file_path, check_only)
            print(f"\nTotal issues: {count}")
        else:
            print(f"File not found: {file_path}")
            sys.exit(1)
    else:
        # Process all files
        total = 0
        for md_file in content_dir.rglob('*.md'):
            count = standardize_file(md_file, check_only)
            total += count

        print(f"\n{'Issues found' if check_only else 'Labels updated'}: {total}")


if __name__ == '__main__':
    main()
