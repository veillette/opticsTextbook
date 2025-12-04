// Service Worker for Optics Textbook PWA
// Version: 1.2.0 - Fixed trailing slash navigation issues

const CACHE_NAME = 'optics-textbook-v5';
const RUNTIME_CACHE = 'optics-runtime-v5';

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

// Core pages to pre-cache (with trailing slashes for GitHub Pages)
const CORE_PAGES = [
  '/opticsTextbook/',
  '/opticsTextbook/searchandnavigation/',
  '/opticsTextbook/basics/',
  '/opticsTextbook/geometricaloptics/',
  '/opticsTextbook/opticalinstruments/',
  '/opticsTextbook/polarization/',
  '/opticsTextbook/wave/',
  '/opticsTextbook/interferencecoherence/',
  '/opticsTextbook/diffractiveoptics/',
  '/opticsTextbook/lasers/',
  '/opticsTextbook/advancedinstruments/',
  '/opticsTextbook/fiberoptics/',
  '/opticsTextbook/raymatrix/'
];

// Core static assets to pre-cache
const CORE_ASSETS = [
  '/opticsTextbook/manifest.json',
  '/opticsTextbook/offline.html'
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

// Install event - cache core assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing v1.2.0...');

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
              return cacheName.startsWith('optics-') &&
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
      // Cache the successful response using normalized URL
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(normalizedUrl, networkResponse.clone());
      // Also cache with original URL for direct access
      if (requestUrl !== normalizedUrl) {
        cache.put(requestUrl, networkResponse.clone());
      }
      return networkResponse;
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
    const offlineResponse = await caches.match('/opticsTextbook/offline.html');
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
        if (cacheName.startsWith('optics-')) {
          caches.delete(cacheName);
        }
      });
    });
  }
});
