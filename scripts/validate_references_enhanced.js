#!/usr/bin/env node
/**
 * Enhanced script to validate references using advanced MyST functionality.
 *
 * Status: ACTIVE - Core workflow script
 *     Used in CI validation pipeline.
 *     Run via: npm run validate-enhanced
 *
 * This improved script:
 * 1. Uses MyST's AST parsing for more accurate validation
 * 2. Provides detailed analysis of different reference types
 * 3. Suggests fixes for common reference issues
 * 4. Integrates with MyST build system for comprehensive validation
 * 5. Handles both internal and external references
 *
 * Usage:
 *     node validate_references_enhanced.js [options]
 *
 * Options:
 *     --output-file FILE    Save detailed report to file
 *     --fix-suggestions     Include fix suggestions in output
 *     --content-dir DIR     Content directory (default: content)
 *     --strict              Use strict validation (fail on warnings)
 *     --quiet               Quiet mode - only show summary
 */

const fs = require('fs');
const path = require('path');
const { runMystCommand } = require('./shared_utils');
const { ReportGenerator, MarkdownReportBuilder } = require('./report_utils');

/**
 * Run MyST validation with enhanced reporting.
 * @returns {Object} Validation results with output and error streams
 */
function runEnhancedMystValidation() {
  console.log("Running enhanced MyST validation...");

  const validationResults = {
    buildOutput: '',
    buildErrors: '',
    checkOutput: '',
    checkErrors: '',
    returnCodes: []
  };

  // 1. Standard HTML build without prebuild side effects
  let result = runMystCommand(['npx', 'myst', 'build', '--html', '--strict']);
  validationResults.buildOutput = result.stdout;
  validationResults.buildErrors = result.stderr;
  validationResults.returnCodes.push(result.code);

  // 2. Link checking pass (skips npm prebuild hook)
  result = runMystCommand(['npx', 'myst', 'build', '--check-links']);
  validationResults.checkOutput = result.stdout;
  validationResults.checkErrors = result.stderr;
  validationResults.returnCodes.push(result.code);

  // 3. Direct MyST validation with verbose diagnostics
  result = runMystCommand(['npx', 'myst', 'build', '--check', '--verbose']);
  validationResults.buildOutput += "\n" + result.stdout;
  validationResults.buildErrors += "\n" + result.stderr;

  return validationResults;
}

/**
 * Parse MyST output with enhanced pattern matching.
 * @param {Object} validationResults - Validation results from MyST commands
 * @returns {Object} Categorized issues by type
 */
function parseEnhancedMystOutput(validationResults) {
  const issues = {
    missingFigures: [],
    brokenCrossRefs: [],
    externalLinkErrors: [],
    equationErrors: [],
    citationErrors: [],
    syntaxErrors: [],
    otherWarnings: [],
    buildErrors: []
  };

  // Combine all output for parsing
  const allOutput =
    validationResults.buildOutput + "\n" +
    validationResults.buildErrors + "\n" +
    validationResults.checkOutput + "\n" +
    validationResults.checkErrors;

  const lines = allOutput.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const lineLower = trimmedLine.toLowerCase();

    // Enhanced pattern matching for different issue types
    if (line.includes('⚠️') || line.includes('WARNING') || line.includes('WARN')) {
      let categorized = false;

      // Missing figures/images
      if (lineLower.includes('image not found') ||
          lineLower.includes('figure not found') ||
          lineLower.includes('file not found') ||
          lineLower.includes('cannot find image') ||
          lineLower.includes('missing image') ||
          lineLower.includes('invalid image')) {
        const figureMatch = extractFigureError(trimmedLine);
        if (figureMatch) {
          issues.missingFigures.push(figureMatch);
          categorized = true;
        }
      }

      // Cross-reference errors
      else if (lineLower.includes('cross reference target was not found') ||
               lineLower.includes('unknown reference target') ||
               lineLower.includes('reference target not found') ||
               lineLower.includes('undefined reference') ||
               lineLower.includes('unknown cross-reference')) {
        const refMatch = extractCrossRefError(trimmedLine);
        if (refMatch) {
          issues.brokenCrossRefs.push(refMatch);
          categorized = true;
        }
      }

      // External link errors
      else if (lineLower.includes('link not found') ||
               lineLower.includes('external link') ||
               lineLower.includes('http error') ||
               lineLower.includes('404') ||
               lineLower.includes('500') ||
               lineLower.includes('connection error') ||
               lineLower.includes('link check failed')) {
        const linkMatch = extractLinkError(trimmedLine);
        if (linkMatch) {
          issues.externalLinkErrors.push(linkMatch);
          categorized = true;
        }
      }

      // Equation errors
      else if (lineLower.includes('equation not found') ||
               lineLower.includes('math error') ||
               lineLower.includes('latex error') ||
               lineLower.includes('equation reference') ||
               lineLower.includes('math block error')) {
        const eqMatch = extractEquationError(trimmedLine);
        if (eqMatch) {
          issues.equationErrors.push(eqMatch);
          categorized = true;
        }
      }

      // Citation errors
      else if (lineLower.includes('citation not found') ||
               lineLower.includes('bibliography error') ||
               lineLower.includes('cite error') ||
               lineLower.includes('reference not found') ||
               lineLower.includes('bibtex error')) {
        const citeMatch = extractCitationError(trimmedLine);
        if (citeMatch) {
          issues.citationErrors.push(citeMatch);
          categorized = true;
        }
      }

      if (!categorized) {
        issues.otherWarnings.push({
          message: trimmedLine,
          type: 'unknown_warning'
        });
      }
    }

    // Build errors (more serious)
    else if (line.includes('❌') || line.includes('ERROR') || line.includes('FATAL')) {
      if (lineLower.includes('syntax error') ||
          lineLower.includes('parse error') ||
          lineLower.includes('invalid syntax') ||
          lineLower.includes('malformed') ||
          lineLower.includes('unexpected token')) {
        const syntaxMatch = extractSyntaxError(trimmedLine);
        if (syntaxMatch) {
          issues.syntaxErrors.push(syntaxMatch);
        } else {
          issues.buildErrors.push({ message: trimmedLine, type: 'syntax' });
        }
      } else {
        issues.buildErrors.push({ message: trimmedLine, type: 'build' });
      }
    }
  }

  return issues;
}

/**
 * Extract detailed information from figure/image error messages.
 * @param {string} line - Error line to parse
 * @returns {Object} Extracted error information
 */
function extractFigureError(line) {
  const patterns = [
    /(\S+\.md).*?(\S+\.(png|jpg|jpeg|gif|svg|webp))/i,
    /Figure.*?(\S+\.(png|jpg|jpeg|gif|svg|webp)).*?in\s+(\S+\.md)/i,
    /Image\s+(.+?)\s+not found.*?(\S+\.md)/i,
    /Cannot find.*?(\S+\.(png|jpg|jpeg|gif|svg|webp))/i
  ];

  for (const pattern of patterns) {
    const match = line.match(pattern);
    if (match) {
      const groups = match.slice(1);
      return {
        file: groups[0] && groups[0].endsWith('.md') ? groups[0] :
              (groups[2] && groups[2].endsWith('.md') ? groups[2] : ''),
        image: groups.length > 1 ? groups[1] : groups[0],
        message: line,
        type: 'missing_figure'
      };
    }
  }

  return { message: line, type: 'missing_figure' };
}

/**
 * Extract detailed information from cross-reference errors.
 * @param {string} line - Error line to parse
 * @returns {Object} Extracted error information
 */
function extractCrossRefError(line) {
  const patterns = [
    /(\S+\.md).*?Cross reference target was not found:\s*(.+?)(?:\s|$)/i,
    /Unknown reference target:\s*(.+?)\s+in\s+(\S+\.md)/i,
    /Reference\s+(.+?)\s+not found.*?(\S+\.md)/i,
    /Undefined.*?reference.*?`([^`]+)`/i
  ];

  for (const pattern of patterns) {
    const match = line.match(pattern);
    if (match) {
      const groups = match.slice(1);
      return {
        file: groups[0] && groups[0].endsWith('.md') ? groups[0] :
              (groups.length > 1 && groups[1].endsWith('.md') ? groups[1] : ''),
        target: groups.length > 1 && !groups[1].endsWith('.md') ? groups[1] : groups[0],
        message: line,
        type: 'broken_cross_ref'
      };
    }
  }

  return { message: line, type: 'broken_cross_ref' };
}

/**
 * Extract information from external link errors.
 * @param {string} line - Error line to parse
 * @returns {Object} Extracted error information
 */
function extractLinkError(line) {
  const urlPattern = /(https?:\/\/[^\s]+)/;
  const filePattern = /(\S+\.md)/;

  const urlMatch = line.match(urlPattern);
  const fileMatch = line.match(filePattern);

  return {
    file: fileMatch ? fileMatch[1] : '',
    url: urlMatch ? urlMatch[1] : '',
    message: line,
    type: 'external_link_error'
  };
}

/**
 * Extract information from equation errors.
 * @param {string} line - Error line to parse
 * @returns {Object} Extracted error information
 */
function extractEquationError(line) {
  const patterns = [
    /Equation\s+(.+?)\s+not found.*?(\S+\.md)/i,
    /(\S+\.md).*?equation.*?`([^`]+)`/i,
    /Math error.*?(\S+\.md)/i
  ];

  for (const pattern of patterns) {
    const match = line.match(pattern);
    if (match) {
      const groups = match.slice(1);
      return {
        file: groups.length > 1 && groups[1].endsWith('.md') ? groups[1] : groups[0],
        equation: groups.length > 1 && !groups[0].endsWith('.md') ? groups[0] : '',
        message: line,
        type: 'equation_error'
      };
    }
  }

  return { message: line, type: 'equation_error' };
}

/**
 * Extract information from citation errors.
 * @param {string} line - Error line to parse
 * @returns {Object} Extracted error information
 */
function extractCitationError(line) {
  const patterns = [
    /Citation\s+(.+?)\s+not found.*?(\S+\.md)/i,
    /(\S+\.md).*?citation.*?`([^`]+)`/i,
    /Bibliography.*?error.*?(\S+\.md)/i
  ];

  for (const pattern of patterns) {
    const match = line.match(pattern);
    if (match) {
      const groups = match.slice(1);
      return {
        file: groups.length > 1 && groups[1].endsWith('.md') ? groups[1] : groups[0],
        citation: groups.length > 1 && !groups[0].endsWith('.md') ? groups[0] : '',
        message: line,
        type: 'citation_error'
      };
    }
  }

  return { message: line, type: 'citation_error' };
}

/**
 * Extract information from syntax errors.
 * @param {string} line - Error line to parse
 * @returns {Object} Extracted error information
 */
function extractSyntaxError(line) {
  const filePattern = /(\S+\.md)/;
  const linePattern = /line\s+(\d+)/i;

  const fileMatch = line.match(filePattern);
  const lineMatch = line.match(linePattern);

  return {
    file: fileMatch ? fileMatch[1] : '',
    lineNumber: lineMatch ? lineMatch[1] : '',
    message: line,
    type: 'syntax_error'
  };
}

/**
 * Generate fix suggestions for common issues.
 * @param {Object} issues - Categorized issues
 * @returns {Object} Fix suggestions by category
 */
function generateFixSuggestions(issues) {
  const suggestions = {
    missingFigures: [],
    brokenCrossRefs: [],
    externalLinks: [],
    general: []
  };

  // Missing figures suggestions
  if (issues.missingFigures.length > 0) {
    suggestions.missingFigures.push(
      "Check if image files exist in the correct directories",
      "Verify image paths are relative to the markdown file",
      "Use find_unreferenced_images_myst.js to identify unused images",
      "Ensure image file extensions match exactly (case-sensitive)",
      "Check for typos in image filenames"
    );
  }

  // Cross-reference suggestions
  if (issues.brokenCrossRefs.length > 0) {
    const refTypes = {};
    for (const issue of issues.brokenCrossRefs) {
      const target = issue.target || '';
      if (target.includes('.')) {
        const refType = target.split('.')[0];
        refTypes[refType] = (refTypes[refType] || 0) + 1;
      }
    }

    const topRefTypes = Object.entries(refTypes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type]) => type)
      .join(', ');

    if (topRefTypes) {
      suggestions.brokenCrossRefs.push(`Most common broken reference types: ${topRefTypes}`);
    }
    suggestions.brokenCrossRefs.push(
      "Verify that labels exist with proper (label)= syntax",
      "Check chapter and section numbering is consistent",
      "Ensure equation labels use :label: directive",
      "Use grep to search for label definitions: grep -r '(.*_label)=' content/",
      "Verify cross-references use correct syntax: {ref}`label` or {numref}`label`"
    );
  }

  // External link suggestions
  if (issues.externalLinkErrors.length > 0) {
    suggestions.externalLinks.push(
      "Check that external URLs are still valid",
      "Verify internet connection during build",
      "Consider using archived versions for unstable links",
      "Use --check-links flag to validate external links"
    );
  }

  // General suggestions
  suggestions.general.push(
    "Run 'npm run build' regularly to catch issues early",
    "Use 'npm run checklinks' to validate all links",
    "Check MyST documentation for proper syntax",
    "Validate references after major restructuring"
  );

  return suggestions;
}

/**
 * Analyze patterns in the validation issues.
 * @param {Object} issues - Categorized issues
 * @returns {Object} Analysis results with patterns and statistics
 */
function analyzePatterns(issues) {
  const analysis = {
    filesWithMostIssues: {},
    commonReferenceTypes: {},
    errorDistribution: {},
    severitySummary: {}
  };

  // Count issues by file
  for (const [issueType, issueList] of Object.entries(issues)) {
    for (const issue of issueList) {
      if (issue && typeof issue === 'object' && issue.file) {
        const fileName = issue.file;
        if (fileName) {
          analysis.filesWithMostIssues[fileName] = (analysis.filesWithMostIssues[fileName] || 0) + 1;
        }
      }
    }
  }

  // Analyze cross-reference patterns
  for (const issue of issues.brokenCrossRefs) {
    if (issue && typeof issue === 'object' && issue.target) {
      const target = issue.target;
      if (target.includes('.')) {
        const refType = target.split('.')[0];
        analysis.commonReferenceTypes[refType] = (analysis.commonReferenceTypes[refType] || 0) + 1;
      }
    }
  }

  // Error distribution
  for (const [issueType, issueList] of Object.entries(issues)) {
    if (issueList.length > 0) {
      analysis.errorDistribution[issueType] = issueList.length;
    }
  }

  // Severity classification
  const criticalErrors = issues.buildErrors.length + issues.syntaxErrors.length;
  const warnings = issues.missingFigures.length + issues.brokenCrossRefs.length +
                   issues.externalLinkErrors.length + issues.equationErrors.length +
                   issues.citationErrors.length + issues.otherWarnings.length;

  analysis.severitySummary = {
    critical: criticalErrors,
    warnings: warnings,
    total: criticalErrors + warnings
  };

  return analysis;
}

/**
 * Get appropriate emoji for error type.
 * @param {string} errorType - Type of error
 * @returns {string} Emoji representing the error type
 */
function getErrorEmoji(errorType) {
  const emojiMap = {
    missingFigures: '🖼️',
    brokenCrossRefs: '🔗',
    externalLinkErrors: '🌐',
    equationErrors: '🧮',
    citationErrors: '📚',
    syntaxErrors: '⚠️',
    buildErrors: '❌',
    otherWarnings: '⚠️'
  };
  return emojiMap[errorType] || '❓';
}

/**
 * Sort object entries by value (for counters).
 * @param {Object} obj - Object to sort
 * @param {number} limit - Maximum number of entries to return
 * @returns {Array} Sorted [key, value] pairs
 */
function sortByCount(obj, limit = null) {
  const sorted = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Print an enhanced validation report.
 * @param {Object} issues - Categorized issues
 * @param {Object} analysis - Analysis results
 * @param {boolean} includeSuggestions - Whether to include fix suggestions
 */
function printEnhancedReport(issues, analysis, includeSuggestions = false) {
  console.log("\n=== ENHANCED MyST VALIDATION REPORT ===");

  // Executive Summary
  const severity = analysis.severitySummary;
  console.log("\nEXECUTIVE SUMMARY:");
  console.log(`  🔴 Critical errors: ${severity.critical}`);
  console.log(`  🟡 Warnings: ${severity.warnings}`);
  console.log(`  📊 Total issues: ${severity.total}`);

  if (severity.total === 0) {
    console.log("\n✅ No validation issues found! Your content is in great shape.");
    return;
  }

  // Error distribution
  console.log("\nERROR DISTRIBUTION:");
  for (const [errorType, count] of sortByCount(analysis.errorDistribution)) {
    const emoji = getErrorEmoji(errorType);
    const readableName = errorType.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());
    console.log(`  ${emoji} ${readableName}: ${count}`);
  }

  // Files with most issues
  if (Object.keys(analysis.filesWithMostIssues).length > 0) {
    console.log("\nFILES WITH MOST ISSUES:");
    for (const [filePath, count] of sortByCount(analysis.filesWithMostIssues, 5)) {
      const shortPath = filePath.startsWith('content/') ? filePath.replace('content/', '') : filePath;
      console.log(`  📄 ${shortPath}: ${count} issues`);
    }
  }

  // Detailed breakdown
  printDetailedIssues(issues);

  // Fix suggestions
  if (includeSuggestions) {
    const suggestions = generateFixSuggestions(issues);
    printFixSuggestions(suggestions);
  }
}

/**
 * Print detailed breakdown of issues.
 * @param {Object} issues - Categorized issues
 */
function printDetailedIssues(issues) {
  // Critical issues first
  const criticalTypes = ['buildErrors', 'syntaxErrors'];
  const warningTypes = ['missingFigures', 'brokenCrossRefs', 'externalLinkErrors',
                        'equationErrors', 'citationErrors', 'otherWarnings'];

  for (const issueType of criticalTypes) {
    if (issues[issueType] && issues[issueType].length > 0) {
      printIssueSection(issueType, issues[issueType], true);
    }
  }

  for (const issueType of warningTypes) {
    if (issues[issueType] && issues[issueType].length > 0) {
      printIssueSection(issueType, issues[issueType], false);
    }
  }
}

/**
 * Print a section for a specific issue type.
 * @param {string} issueType - Type of issue
 * @param {Array} issueList - List of issues
 * @param {boolean} critical - Whether issues are critical
 */
function printIssueSection(issueType, issueList, critical = false) {
  const emoji = getErrorEmoji(issueType);
  const readableName = issueType.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());
  const severityLabel = critical ? "CRITICAL" : "WARNING";

  console.log(`\n=== ${severityLabel}: ${readableName} (${issueList.length}) ===`);

  // Group by file for better organization
  const byFile = {};
  for (const issue of issueList) {
    if (issue && typeof issue === 'object') {
      const fileName = issue.file || 'Unknown file';
      if (!byFile[fileName]) {
        byFile[fileName] = [];
      }
      byFile[fileName].push(issue);
    }
  }

  for (const fileName of Object.keys(byFile).sort()) {
    const fileIssues = byFile[fileName];
    if (fileName && fileName !== 'Unknown file') {
      const shortPath = fileName.startsWith('content/') ? fileName.replace('content/', '') : fileName;
      console.log(`\n📄 ${shortPath} (${fileIssues.length} issues):`);
    }

    for (const issue of fileIssues.slice(0, 5)) {  // Show first 5 issues per file
      if (issue && typeof issue === 'object') {
        console.log(`  ${emoji} ${issue.message || JSON.stringify(issue)}`);
      } else {
        console.log(`  ${emoji} ${issue}`);
      }
    }

    if (fileIssues.length > 5) {
      console.log(`  ... and ${fileIssues.length - 5} more issues`);
    }
  }
}

/**
 * Print fix suggestions.
 * @param {Object} suggestions - Fix suggestions by category
 */
function printFixSuggestions(suggestions) {
  console.log("\n=== FIX SUGGESTIONS ===");

  for (const [category, suggestionList] of Object.entries(suggestions)) {
    if (suggestionList.length > 0) {
      const readableCategory = category.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());
      console.log(`\n${readableCategory}:`);
      for (const suggestion of suggestionList) {
        console.log(`  💡 ${suggestion}`);
      }
    }
  }
}

/**
 * Save enhanced report to file.
 * @param {Object} issues - Categorized issues
 * @param {Object} analysis - Analysis results
 * @param {string} outputFile - Base filename for reports
 * @param {boolean} includeSuggestions - Whether to include fix suggestions
 * @returns {Object} Object with markdown and JSON file paths
 */
function saveEnhancedReport(issues, analysis, outputFile, includeSuggestions = false) {
  // Create reports directory if it doesn't exist
  const reportsDir = 'reports';
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // Ensure output files go in reports directory
  if (!outputFile.startsWith('reports/')) {
    outputFile = path.join(reportsDir, path.basename(outputFile));
  }

  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

  const reportData = {
    timestamp: timestamp,
    summary: analysis.severitySummary,
    issues: issues,
    analysis: {
      filesWithMostIssues: Object.fromEntries(sortByCount(analysis.filesWithMostIssues, 10)),
      commonReferenceTypes: Object.fromEntries(sortByCount(analysis.commonReferenceTypes)),
      errorDistribution: analysis.errorDistribution
    }
  };

  if (includeSuggestions) {
    reportData.suggestions = generateFixSuggestions(issues);
  }

  // Save as JSON for programmatic access
  const jsonFile = outputFile.endsWith('.txt') ? outputFile.replace('.txt', '.json') : outputFile + '.json';
  fs.writeFileSync(jsonFile, JSON.stringify(reportData, null, 2), 'utf8');

  // Save as readable markdown report
  const mdFile = outputFile.endsWith('.json') ? outputFile.replace('.json', '.md') : outputFile;
  let mdContent = `# Enhanced MyST Validation Report\n\n`;
  mdContent += `Generated: ${timestamp}\n\n`;

  // Summary
  const severity = analysis.severitySummary;
  mdContent += `## Executive Summary\n\n`;
  mdContent += `- 🔴 Critical errors: **${severity.critical}**\n`;
  mdContent += `- 🟡 Warnings: **${severity.warnings}**\n`;
  mdContent += `- 📊 Total issues: **${severity.total}**\n\n`;

  // Error distribution
  mdContent += `## Error Distribution\n\n`;
  for (const [errorType, count] of sortByCount(analysis.errorDistribution)) {
    const emoji = getErrorEmoji(errorType);
    const readableName = errorType.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());
    mdContent += `- ${emoji} ${readableName}: ${count}\n`;
  }

  // Detailed issues
  mdContent += `\n## Detailed Issues\n\n`;
  for (const [issueType, issueList] of Object.entries(issues)) {
    if (issueList.length > 0) {
      const emoji = getErrorEmoji(issueType);
      const readableName = issueType.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());
      mdContent += `### ${readableName} (${issueList.length})\n\n`;

      const byFile = {};
      for (const issue of issueList) {
        if (issue && typeof issue === 'object') {
          const fileName = issue.file || 'Unknown file';
          if (!byFile[fileName]) {
            byFile[fileName] = [];
          }
          byFile[fileName].push(issue);
        }
      }

      for (const fileName of Object.keys(byFile).sort()) {
        if (fileName && fileName !== 'Unknown file') {
          mdContent += `#### ${fileName}\n\n`;
        }
        const fileIssues = byFile[fileName];
        for (const issue of fileIssues) {
          if (issue && typeof issue === 'object') {
            mdContent += `- ${issue.message || JSON.stringify(issue)}\n`;
          } else {
            mdContent += `- ${issue}\n`;
          }
        }
        mdContent += '\n';
      }
    }
  }

  fs.writeFileSync(mdFile, mdContent, 'utf8');

  return { mdFile, jsonFile };
}

/**
 * Main function to run validation.
 * @returns {number} Exit code (0 for success, 1 for failure)
 */
function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const options = {
    outputFile: 'validation_report',
    fixSuggestions: false,
    contentDir: 'content',
    strict: false,
    quiet: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--output-file' && i + 1 < args.length) {
      options.outputFile = args[++i];
    } else if (args[i] === '--fix-suggestions') {
      options.fixSuggestions = true;
    } else if (args[i] === '--content-dir' && i + 1 < args.length) {
      options.contentDir = args[++i];
    } else if (args[i] === '--strict') {
      options.strict = true;
    } else if (args[i] === '--quiet') {
      options.quiet = true;
    }
  }

  if (!fs.existsSync(options.contentDir)) {
    console.log(`❌ Error: Content directory '${options.contentDir}' not found!`);
    return 1;
  }

  console.log("=== Enhanced MyST Validation Tool ===");

  // Run validation
  const validationResults = runEnhancedMystValidation();

  // Parse results
  const issues = parseEnhancedMystOutput(validationResults);

  // Analyze patterns
  const analysis = analyzePatterns(issues);

  // Print report
  if (!options.quiet) {
    printEnhancedReport(issues, analysis, options.fixSuggestions);
  } else {
    const severity = analysis.severitySummary;
    console.log(`Validation complete: ${severity.total} issues (${severity.critical} critical, ${severity.warnings} warnings)`);
  }

  // Save detailed report
  const { mdFile, jsonFile } = saveEnhancedReport(issues, analysis, options.outputFile, options.fixSuggestions);
  console.log("\n📄 Detailed reports saved:");
  console.log(`  - Markdown: ${mdFile}`);
  console.log(`  - JSON: ${jsonFile}`);

  // Return appropriate exit code
  const severity = analysis.severitySummary;
  if (severity.critical > 0) {
    return 1;
  } else if (options.strict && severity.warnings > 0) {
    return 1;
  } else {
    if (severity.total === 0) {
      console.log("\n✅ All validation checks passed!");
    }
    return 0;
  }
}

// Run if called directly
if (require.main === module) {
  process.exit(main());
}

module.exports = {
  runEnhancedMystValidation,
  parseEnhancedMystOutput,
  extractFigureError,
  extractCrossRefError,
  extractLinkError,
  extractEquationError,
  extractCitationError,
  extractSyntaxError,
  generateFixSuggestions,
  analyzePatterns,
  printEnhancedReport,
  saveEnhancedReport
};
