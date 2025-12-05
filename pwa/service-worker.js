// Service Worker for MyST Project PWA
// Version: 2.1.0 - Content-agnostic implementation with keyboard navigation

// =============================================================================
// KEYBOARD NAVIGATION INJECTION
// =============================================================================
// Purpose: Enable arrow key navigation between chapters/pages
//
// Why this workaround exists:
// MyST MD does not currently support adding custom client-side JavaScript to
// sites. While custom CSS is supported via `site.options.style`, there is no
// equivalent `site.options.scripts` configuration. This is tracked in:
// https://github.com/jupyter-book/myst-theme/issues/437
//
// This service worker injects keyboard navigation functionality by modifying
// HTML responses before they reach the browser. When official MyST support for
// custom scripts is added, this workaround should be replaced.
//
// Functionality:
// - Left Arrow: Navigate to previous page (triggers prev pagination link)
// - Right Arrow: Navigate to next page (triggers next pagination link)
// - Navigation is disabled when focus is in input/textarea fields
// =============================================================================

const KEYBOARD_NAV_SCRIPT = `
<script>
/* Keyboard Navigation for MyST Site
 * Injected by service worker as a workaround for lack of native script support
 * See: https://github.com/jupyter-book/myst-theme/issues/437
 */
(function() {
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
})();
</script>
</body>`;

// Auto-detect cache prefix from the current URL path
// This makes the service worker work for any MyST project
const CACHE_PREFIX = (() => {
  const path = self.location.pathname;
  const match = path.match(/^\/([^\/]+)\//);
  return match ? match[1] : 'myst';
})();

const CACHE_VERSION = 'v6';
const CACHE_NAME = `${CACHE_PREFIX}-cache-${CACHE_VERSION}`;
const RUNTIME_CACHE = `${CACHE_PREFIX}-runtime-${CACHE_VERSION}`;

// Static assets to cache (CSS, JS, images, fonts)
// These use cache-first strategy
const STATIC_ASSET_PATTERNS = [
  /\.css$/,
  /\.js$/,
  /\.woff2?$/,
  /\.ttf$/,
  /\.eot$/,
  /\.ico$/,
  /\.png$/,
  /\.jpg$/,
  /\.jpeg$/,
  /\.gif$/,
  /\.svg$/,
  /\.webp$/,
  /\/build\//,  // MyST build assets
];

// Auto-detect base path from service worker location
const BASE_PATH = (() => {
  const path = self.location.pathname.replace('/service-worker.js', '');
  return path || '/';
})();

// Core pages to pre-cache - only cache the homepage and offline page
// Project-specific pages will be cached as they are visited
const CORE_PAGES = [
  `${BASE_PATH}/`
];

// Core static assets to pre-cache
const CORE_ASSETS = [
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/offline.html`
];

// Check if a request is for a static asset
function isStaticAsset(url) {
  return STATIC_ASSET_PATTERNS.some(pattern => pattern.test(url.pathname));
}

// Check if a request is a navigation request (HTML page)
function isNavigationRequest(request) {
  return request.mode === 'navigate' ||
         (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

// Normalize URL by ensuring trailing slash for pages
function normalizeUrl(url) {
  const urlObj = new URL(url);
  // Add trailing slash to page URLs (not to files with extensions)
  if (!urlObj.pathname.includes('.') && !urlObj.pathname.endsWith('/')) {
    urlObj.pathname += '/';
  }
  return urlObj.href;
}

// Inject keyboard navigation script into HTML responses
// This is a workaround for MyST MD's lack of native custom script support
// See header comments for full explanation
async function injectKeyboardNavigation(response) {
  const contentType = response.headers.get('content-type') || '';

  // Only inject into HTML responses
  if (!contentType.includes('text/html')) {
    return response;
  }

  try {
    const html = await response.text();

    // Check if the page has a </body> tag to inject before
    if (html.includes('</body>')) {
      const modifiedHtml = html.replace('</body>', KEYBOARD_NAV_SCRIPT);

      // Create new response with modified HTML
      return new Response(modifiedHtml, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
    }

    // If no </body> tag found, return original response
    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  } catch (error) {
    console.warn('[Service Worker] Failed to inject keyboard navigation:', error);
    // Return a new response since we consumed the original
    return response;
  }
}

// Install event - cache core assets
self.addEventListener('install', (event) => {
  console.log(`[Service Worker] Installing v2.1.0 for ${CACHE_PREFIX}...`);

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching core assets');

        // Cache static assets
        const staticPromises = CORE_ASSETS.map(url =>
          cache.add(url).catch(err => {
            console.warn(`[Service Worker] Failed to cache ${url}:`, err);
          })
        );

        // Cache pages (these might redirect, so fetch them properly)
        const pagePromises = CORE_PAGES.map(url =>
          fetch(url, { redirect: 'follow' })
            .then(response => {
              if (response.ok) {
                return cache.put(url, response);
              }
            })
            .catch(err => {
              console.warn(`[Service Worker] Failed to cache page ${url}:`, err);
            })
        );

        return Promise.allSettled([...staticPromises, ...pagePromises]);
      })
      .then(() => {
        console.log('[Service Worker] Core assets cached');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              // Delete old versions of our caches
              return cacheName.startsWith(`${CACHE_PREFIX}-`) &&
                     cacheName !== CACHE_NAME &&
                     cacheName !== RUNTIME_CACHE;
            })
            .map(cacheName => {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - different strategies for different content types
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome extensions and other special URLs
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  // Strategy 1: Static assets - Cache first, then network
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Strategy 2: Navigation requests (HTML pages) - Network first, then cache
  // This ensures fresh content for page navigation
  if (isNavigationRequest(request)) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Strategy 3: Everything else - Stale while revalidate
  event.respondWith(staleWhileRevalidate(request));
});

// Cache-first strategy for static assets
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('[Service Worker] Cache-first fetch failed:', error);
    return new Response('Asset not available offline', { status: 503 });
  }
}

// Network-first strategy for HTML pages
async function networkFirstStrategy(request) {
  const normalizedUrl = normalizeUrl(request.url);
  const requestUrl = request.url;

  try {
    // Try network first with normalized URL (with trailing slash)
    // This ensures GitHub Pages serves the correct page
    const networkResponse = await fetch(normalizedUrl, { redirect: 'follow' });

    if (networkResponse.ok) {
      // Inject keyboard navigation script into HTML responses
      const modifiedResponse = await injectKeyboardNavigation(networkResponse);

      // Cache the modified response using normalized URL
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(normalizedUrl, modifiedResponse.clone());
      // Also cache with original URL for direct access
      if (requestUrl !== normalizedUrl) {
        cache.put(requestUrl, modifiedResponse.clone());
      }
      return modifiedResponse;
    } else if (networkResponse.status === 404) {
      // Don't cache 404s, return as-is
      console.log('[Service Worker] Page not found:', normalizedUrl);
      return networkResponse;
    }

    // For other errors, try cache
    throw new Error(`Network response not ok: ${networkResponse.status}`);
  } catch (error) {
    console.warn('[Service Worker] Network-first failed, trying cache:', error);

    // Try cache with normalized URL
    let cachedResponse = await caches.match(normalizedUrl);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Try cache with original URL
    cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page
    const offlineResponse = await caches.match(`${BASE_PATH}/offline.html`);
    if (offlineResponse) {
      return offlineResponse;
    }

    return new Response(
      '<html><body><h1>Offline</h1><p>This page is not available offline. Please check your connection.</p></body></html>',
      { headers: { 'Content-Type': 'text/html' }, status: 503 }
    );
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);

  // Start network fetch in background
  const networkPromise = fetch(request)
    .then(async (networkResponse) => {
      if (networkResponse.ok) {
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(err => {
      console.warn('[Service Worker] Background fetch failed:', err);
      return null;
    });

  // Return cached response immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }

  // Otherwise wait for network
  const networkResponse = await networkPromise;
  if (networkResponse) {
    return networkResponse;
  }

  return new Response('Content not available', { status: 503 });
}

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  // Allow clients to request cache clearing
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        if (cacheName.startsWith(`${CACHE_PREFIX}-`)) {
          caches.delete(cacheName);
        }
      });
    });
  }
});
