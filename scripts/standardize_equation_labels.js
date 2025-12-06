#!/usr/bin/env node
/**
 * Standardize Equation Labels
 *
 * This script converts legacy equation labels to the new standardized format:
 *   Format: eq:chapter-code:descriptive-name
 *
 * Chapter codes:
 *   - basics = Chapter 1 (Nature of Light)
 *   - geo = Chapter 2 (Geometrical Optics)
 *   - inst = Chapter 3 (Optical Instruments)
 *   - pol = Chapter 4 (Polarization)
 *   - wave = Chapter 5 (Wave Equations)
 *   - coh = Chapter 6 (Interference and Coherence)
 *   - diff = Chapter 7 (Diffraction)
 *   - laser = Chapter 8 (Lasers)
 *   - fiber = Chapter 10 (Fiber Optics)
 *   - ray = Chapter 11 (Ray Matrix)
 *
 * Usage:
 *   node standardize_equation_labels.js [--check] [file_path]
 *
 *   --check: Only check for non-standard labels without modifying files
 */

const fs = require('fs');
const path = require('path');

// Chapter code mappings
const CHAPTER_CODES = {
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
};

// Label mappings for Chapter 6 (Interference and Coherence)
const CHAPTER6_MAPPINGS = {
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
};

// Label mappings for Chapter 7 (Diffraction)
const CHAPTER7_MAPPINGS = {
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
};

/**
 * Extract chapter code from file path.
 * @param {string} filePath - File path to analyze
 * @returns {string|null} Chapter code or null if not found
 */
function getChapterCode(filePath) {
  for (const [chapterDir, code] of Object.entries(CHAPTER_CODES)) {
    if (filePath.includes(chapterDir)) {
      return code;
    }
  }
  return null;
}

/**
 * Convert an old label to the new standardized format.
 * @param {string} oldLabel - Old label to convert
 * @param {string} chapterCode - Chapter code
 * @param {Object} mappings - Specific mappings for this chapter
 * @returns {string} New standardized label
 */
function convertLabel(oldLabel, chapterCode, mappings) {
  // Check if already in new format
  if (oldLabel.startsWith(`eq:${chapterCode}:`)) {
    return oldLabel;
  }

  // Check mappings
  if (mappings[oldLabel]) {
    return mappings[oldLabel];
  }

  // Convert dot notation to colon notation
  if (oldLabel.startsWith('eq.')) {
    let name = oldLabel.substring(3); // Remove 'eq.'
    // Convert underscores and camelCase to hyphens
    name = name.replace(/_/g, '-');
    name = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `eq:${chapterCode}:${name}`;
  }

  // Labels without 'eq.' prefix
  let name = oldLabel.replace(/_/g, '-');
  name = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  return `eq:${chapterCode}:${name}`;
}

/**
 * Find all non-standard equation labels in content.
 * @param {string} content - File content to analyze
 * @param {string} chapterCode - Chapter code
 * @returns {Array} Array of issues found
 */
function findNonStandardLabels(content, chapterCode) {
  const issues = [];

  // Pattern for MyST math block labels
  const labelPattern = /:label:\s*(\S+)/g;
  let match;

  while ((match = labelPattern.exec(content)) !== null) {
    const label = match[1];
    // Check if label follows the standard format
    const standardPattern = new RegExp(`^eq:${chapterCode}:[a-z0-9-]+$`);
    if (!standardPattern.test(label)) {
      issues.push({
        old: label,
        position: match.index,
        type: 'myst'
      });
    }
  }

  // Pattern for inline labels in $$ ... \label{} ... $$
  const inlinePattern = /\$\$[^$]*\\label\{([^}]+)\}[^$]*\$\$/gs;
  while ((match = inlinePattern.exec(content)) !== null) {
    const label = match[1];
    issues.push({
      old: label,
      position: match.index,
      type: 'latex_inline'
    });
  }

  return issues;
}

/**
 * Standardize equation labels in a single file.
 * @param {string} filePath - Path to file to process
 * @param {boolean} checkOnly - Only check without modifying
 * @returns {number} Number of issues found/fixed
 */
function standardizeFile(filePath, checkOnly = false) {
  const content = fs.readFileSync(filePath, 'utf8');

  const chapterCode = getChapterCode(filePath);
  if (!chapterCode) {
    console.log(`Warning: Could not determine chapter code for ${filePath}`);
    return 0;
  }

  // Get appropriate mappings
  let mappings = {};
  if (chapterCode === 'coh') {
    mappings = CHAPTER6_MAPPINGS;
  } else if (chapterCode === 'diff') {
    mappings = CHAPTER7_MAPPINGS;
  }

  const issues = findNonStandardLabels(content, chapterCode);

  if (checkOnly) {
    if (issues.length > 0) {
      console.log(`\n${filePath}:`);
      for (const issue of issues) {
        const newLabel = convertLabel(issue.old, chapterCode, mappings);
        const lineNum = content.substring(0, issue.position).split('\n').length;
        console.log(`  Line ~${lineNum}: ${issue.old} -> ${newLabel}`);
      }
    }
    return issues.length;
  }

  // Apply fixes
  if (issues.length === 0) {
    return 0;
  }

  let newContent = content;

  // Replace labels in reverse order to preserve positions
  const sortedIssues = issues.sort((a, b) => b.position - a.position);
  for (const issue of sortedIssues) {
    const oldLabel = issue.old;
    const newLabel = convertLabel(oldLabel, chapterCode, mappings);

    // Replace the label definition
    newContent = newContent.replace(`:label: ${oldLabel}`, `:label: ${newLabel}`);

    // Replace all references to this label
    // MyST equation reference format: {eq}`label`
    const eqRefPattern = new RegExp(`\\{eq\\}\`${oldLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\``, 'g');
    newContent = newContent.replace(eqRefPattern, `{eq}\`${newLabel}\``);

    // Also handle inline equation references: [](#label)
    newContent = newContent.replace(`[](#${oldLabel})`, `{eq}\`${newLabel}\``);
  }

  fs.writeFileSync(filePath, newContent, 'utf8');

  console.log(`Updated ${issues.length} labels in ${filePath}`);
  return issues.length;
}

/**
 * Validate all equation labels in the content directory.
 * @param {string} contentDir - Content directory path
 * @returns {number} Total number of issues found
 */
function validateLabels(contentDir) {
  let issuesFound = 0;

  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file.endsWith('.md')) {
        const chapterCode = getChapterCode(fullPath);
        if (!chapterCode) {
          continue;
        }

        const content = fs.readFileSync(fullPath, 'utf8');
        const issues = findNonStandardLabels(content, chapterCode);

        if (issues.length > 0) {
          console.log(`\n${fullPath}:`);
          for (const issue of issues) {
            console.log(`  Non-standard label: ${issue.old}`);
          }
          issuesFound += issues.length;
        }
      }
    }
  }

  walkDir(contentDir);
  return issuesFound;
}

/**
 * Main function.
 */
function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');

  // Find content directory
  const scriptDir = __dirname;
  const contentDir = path.join(scriptDir, '..', 'content');

  // Get file path if specified
  const fileArg = args.find(arg => !arg.startsWith('--'));

  if (fileArg) {
    // Process specific file
    const filePath = path.resolve(fileArg);
    if (fs.existsSync(filePath)) {
      const count = standardizeFile(filePath, checkOnly);
      console.log(`\nTotal issues: ${count}`);
    } else {
      console.log(`File not found: ${filePath}`);
      process.exit(1);
    }
  } else {
    // Process all files
    let total = 0;

    function processDir(dir) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          processDir(fullPath);
        } else if (file.endsWith('.md')) {
          const count = standardizeFile(fullPath, checkOnly);
          total += count;
        }
      }
    }

    processDir(contentDir);
    console.log(`\n${checkOnly ? 'Issues found' : 'Labels updated'}: ${total}`);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  getChapterCode,
  convertLabel,
  findNonStandardLabels,
  standardizeFile,
  validateLabels
};
