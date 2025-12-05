/**
 * Custom JavaScript for MyST Site
 *
 * This file contains custom client-side functionality that is injected
 * into all pages after the MyST build process.
 *
 * Why this approach:
 * MyST MD does not currently support adding custom client-side JavaScript.
 * While custom CSS is supported via `site.options.style`, there is no
 * equivalent `site.options.scripts` configuration.
 * See: https://github.com/jupyter-book/myst-theme/issues/437
 */

(function() {
  'use strict';

  // ==========================================================================
  // KEYBOARD NAVIGATION
  // ==========================================================================
  // Enable arrow key navigation between chapters/pages
  //
  // - Left Arrow: Navigate to previous page
  // - Right Arrow: Navigate to next page
  // - Navigation is disabled in input/textarea fields
  // - Navigation is disabled when modifier keys are pressed
  // ==========================================================================

  document.addEventListener('keydown', function(e) {
    // Don't intercept when user is typing in form fields
    var tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) {
      return;
    }

    // Don't intercept if modifier keys are pressed (allow browser shortcuts)
    if (e.ctrlKey || e.metaKey || e.altKey) {
      return;
    }

    var link = null;

    if (e.key === 'ArrowRight') {
      // MyST book-theme uses .myst-footer-link-next for next page navigation
      link = document.querySelector('.myst-footer-link-next') ||
             document.querySelector('a[rel="next"]') ||
             document.querySelector('[aria-label="Next page"]');
    }

    if (e.key === 'ArrowLeft') {
      // MyST book-theme uses .myst-footer-link-prev for previous page navigation
      link = document.querySelector('.myst-footer-link-prev') ||
             document.querySelector('a[rel="prev"]') ||
             document.querySelector('[aria-label="Previous page"]');
    }

    if (link && link.href) {
      e.preventDefault(); // Prevent default horizontal scroll behavior
      link.click();
    }
  });

  // ==========================================================================
  // ADD MORE CUSTOM FUNCTIONALITY BELOW
  // ==========================================================================
  // You can add additional custom JavaScript features here.
  // Each feature should be wrapped in its own IIFE or clearly commented section.
  // ==========================================================================

})();
