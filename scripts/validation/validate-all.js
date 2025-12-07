#!/usr/bin/env node
/**
 * Unified Validation Script
 *
 * Runs all validation checks in sequence and generates a comprehensive report:
 * 1. Reference validation (MyST + manual)
 * 2. Label standardization check
 * 3. Image reference validation
 * 4. Markdown lint checks
 * 5. Style guide compliance
 *
 * Status: ACTIVE - Primary validation entry point
 *
 * Usage:
 *   node validation/validate-all.js [options]
 *
 * Options:
 *   --output-file FILE    Save comprehensive report (default: validation_report)
 *   --content-dir DIR     Content directory (default: content)
 *   --strict              Fail on warnings (not just errors)
 *   --quiet               Only show summary
 *   --fix                 Attempt to fix issues automatically (where possible)
 *   --skip-references     Skip reference validation
 *   --skip-labels         Skip label validation
 *   --skip-images         Skip image validation
 *   --skip-lint           Skip markdown linting
 *   --skip-style-guide    Skip style guide validation
 *
 * Exit codes:
 *   0: All validations passed
 *   1: One or more validations failed
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Run a validation script and capture results.
 */
function runValidator(scriptPath, args = [], label = '') {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`${label}`);
  console.log('='.repeat(80));

  const startTime = Date.now();
  let exitCode = 0;
  let output = '';

  try {
    output = execSync(`node ${scriptPath} ${args.join(' ')}`, {
      encoding: 'utf8',
      stdio: 'pipe'
    });
    console.log(output);
  } catch (error) {
    output = error.stdout || '';
    console.log(output);
    if (error.stderr) {
      console.error(error.stderr);
    }
    exitCode = error.status || 1;
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n⏱️  Duration: ${duration}s`);

  return {
    exitCode,
    output,
    duration,
    passed: exitCode === 0
  };
}

/**
 * Parse validation output to extract issue counts.
 */
function parseIssueCount(output) {
  // Look for common patterns like "Found X issues", "X errors", etc.
  const patterns = [
    /Found (\d+) .*?(?:issue|error|warning|problem)/i,
    /(\d+) .*?(?:issue|error|warning|problem)/i,
    /Total.*?:?\s*(\d+)/i,
    /✗.*?(\d+)/
  ];

  for (const pattern of patterns) {
    const match = output.match(pattern);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  // Check if output indicates success
  if (output.includes('✅') || output.includes('All') && output.includes('passed')) {
    return 0;
  }

  return null; // Unable to determine
}

/**
 * Generate comprehensive validation report.
 */
function generateReport(results, options) {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

  let totalIssues = 0;
  let totalPassed = 0;
  let totalFailed = 0;

  const report = {
    timestamp,
    options,
    validators: [],
    summary: {}
  };

  for (const result of results) {
    const issueCount = parseIssueCount(result.output) || 0;
    totalIssues += issueCount;

    if (result.passed) {
      totalPassed++;
    } else {
      totalFailed++;
    }

    report.validators.push({
      name: result.name,
      passed: result.passed,
      exitCode: result.exitCode,
      duration: result.duration,
      issues: issueCount
    });
  }

  report.summary = {
    totalValidators: results.length,
    passed: totalPassed,
    failed: totalFailed,
    totalIssues: totalIssues,
    overallPass: totalFailed === 0
  };

  return report;
}

/**
 * Save report to files.
 */
function saveReport(report, outputFile) {
  const reportsDir = 'reports';
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  if (!outputFile.startsWith('reports/')) {
    outputFile = path.join(reportsDir, path.basename(outputFile));
  }

  // Save JSON
  const jsonFile = outputFile.replace(/\.(txt|md)$/, '') + '.json';
  fs.writeFileSync(jsonFile, JSON.stringify(report, null, 2), 'utf8');

  // Save Markdown
  const mdFile = outputFile.replace(/\.(txt|json)$/, '') + '.md';
  let mdContent = `# Comprehensive Validation Report\n\n`;
  mdContent += `Generated: ${report.timestamp}\n\n`;

  mdContent += `## Summary\n\n`;
  mdContent += `- **Total Validators**: ${report.summary.totalValidators}\n`;
  mdContent += `- **Passed**: ${report.summary.passed} ✅\n`;
  mdContent += `- **Failed**: ${report.summary.failed} ${report.summary.failed > 0 ? '❌' : '✅'}\n`;
  mdContent += `- **Total Issues**: ${report.summary.totalIssues}\n`;
  mdContent += `- **Overall**: ${report.summary.overallPass ? '✅ PASS' : '❌ FAIL'}\n\n`;

  mdContent += `## Validator Results\n\n`;
  for (const validator of report.validators) {
    const status = validator.passed ? '✅ PASS' : '❌ FAIL';
    mdContent += `### ${validator.name} - ${status}\n\n`;
    mdContent += `- Exit Code: ${validator.exitCode}\n`;
    mdContent += `- Duration: ${validator.duration}s\n`;
    mdContent += `- Issues Found: ${validator.issues}\n\n`;
  }

  fs.writeFileSync(mdFile, mdContent, 'utf8');

  return { mdFile, jsonFile };
}

/**
 * Print summary report to console.
 */
function printSummary(report) {
  console.log(`\n${'='.repeat(80)}`);
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(80));

  console.log(`\n📊 Overall Results:`);
  console.log(`   Total Validators: ${report.summary.totalValidators}`);
  console.log(`   Passed: ${report.summary.passed} ✅`);
  console.log(`   Failed: ${report.summary.failed} ${report.summary.failed > 0 ? '❌' : '✅'}`);
  console.log(`   Total Issues: ${report.summary.totalIssues}`);

  console.log(`\n📋 Validator Breakdown:`);
  for (const validator of report.validators) {
    const status = validator.passed ? '✅' : '❌';
    const issues = validator.issues > 0 ? ` (${validator.issues} issues)` : '';
    console.log(`   ${status} ${validator.name} - ${validator.duration}s${issues}`);
  }

  console.log(`\n${report.summary.overallPass ? '✅ ALL VALIDATIONS PASSED!' : '❌ SOME VALIDATIONS FAILED'}`);
  console.log('='.repeat(80));
}

function main() {
  const args = process.argv.slice(2);
  const options = {
    outputFile: 'validation_report',
    contentDir: 'content',
    strict: args.includes('--strict'),
    quiet: args.includes('--quiet'),
    fix: args.includes('--fix'),
    skipReferences: args.includes('--skip-references'),
    skipLabels: args.includes('--skip-labels'),
    skipImages: args.includes('--skip-images'),
    skipLint: args.includes('--skip-lint'),
    skipStyleGuide: args.includes('--skip-style-guide')
  };

  // Parse arguments
  const outputIdx = args.indexOf('--output-file');
  if (outputIdx !== -1 && args[outputIdx + 1]) {
    options.outputFile = args[outputIdx + 1];
  }

  const contentIdx = args.indexOf('--content-dir');
  if (contentIdx !== -1 && args[contentIdx + 1]) {
    options.contentDir = args[contentIdx + 1];
  }

  if (!fs.existsSync(options.contentDir)) {
    console.log(`❌ Error: Content directory '${options.contentDir}' not found!`);
    return 1;
  }

  console.log('='.repeat(80));
  console.log('COMPREHENSIVE VALIDATION');
  console.log('='.repeat(80));
  console.log(`Content Directory: ${options.contentDir}`);
  console.log(`Strict Mode: ${options.strict ? 'Yes' : 'No'}`);
  console.log(`Auto-fix: ${options.fix ? 'Yes' : 'No'}`);

  const results = [];
  const scriptsDir = path.join(__dirname);

  // 1. Reference Validation
  if (!options.skipReferences) {
    const validatorArgs = ['--content-dir', options.contentDir];
    if (options.quiet) validatorArgs.push('--quiet');
    if (options.strict) validatorArgs.push('--strict');

    const result = runValidator(
      path.join(scriptsDir, 'validate-references.js'),
      validatorArgs,
      '🔗 REFERENCE VALIDATION'
    );
    result.name = 'Reference Validation';
    results.push(result);
  }

  // 2. Label Standardization
  if (!options.skipLabels) {
    const validatorArgs = options.fix ? ['--fix'] : ['--check'];
    if (options.quiet) validatorArgs.push('--quiet');

    const result = runValidator(
      path.join(scriptsDir, '..', 'transform', 'standardize-labels.js'),
      validatorArgs,
      '🏷️  LABEL STANDARDIZATION'
    );
    result.name = 'Label Standardization';
    results.push(result);
  }

  // 3. Image Validation
  if (!options.skipImages) {
    const validatorArgs = ['--content-dir', options.contentDir];
    if (options.quiet) validatorArgs.push('--quiet');

    const result = runValidator(
      path.join(scriptsDir, 'validate-images.js'),
      validatorArgs,
      '🖼️  IMAGE VALIDATION'
    );
    result.name = 'Image Validation';
    results.push(result);
  }

  // 4. Markdown Linting
  if (!options.skipLint) {
    const validatorArgs = options.fix ? ['--fix'] : [];
    if (options.quiet) validatorArgs.push('--quiet');

    const result = runValidator(
      path.join(scriptsDir, 'lint-markdown.js'),
      validatorArgs,
      '📝 MARKDOWN LINTING'
    );
    result.name = 'Markdown Linting';
    results.push(result);
  }

  // 5. Style Guide Validation
  if (!options.skipStyleGuide) {
    const validatorArgs = ['--content-dir', options.contentDir];
    if (options.quiet) validatorArgs.push('--quiet');
    if (options.strict) validatorArgs.push('--strict');

    const result = runValidator(
      path.join(scriptsDir, 'validate-style-guide.js'),
      validatorArgs,
      '📋 STYLE GUIDE VALIDATION'
    );
    result.name = 'Style Guide Validation';
    results.push(result);
  }

  // Generate report
  const report = generateReport(results, options);

  // Print summary
  if (!options.quiet) {
    printSummary(report);
  }

  // Save report
  const { mdFile, jsonFile } = saveReport(report, options.outputFile);
  console.log(`\n📄 Reports saved:`);
  console.log(`   Markdown: ${mdFile}`);
  console.log(`   JSON: ${jsonFile}`);

  // Return exit code
  return report.summary.overallPass ? 0 : 1;
}

if (require.main === module) {
  process.exit(main());
}

module.exports = {
  runValidator,
  generateReport,
  saveReport,
  printSummary
};
