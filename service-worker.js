// Service Worker for Optics Textbook PWA
// Version: 1.0.2

const CACHE_NAME = 'optics-textbook-v3';
const RUNTIME_CACHE = 'optics-runtime-v3';

// Core assets to cache immediately on installation
const CORE_ASSETS = [
  '/opticsTextbook/',
  '/opticsTextbook/index.html',
  '/opticsTextbook/manifest.json',
  '/opticsTextbook/myst-theme.css',
  '/opticsTextbook/offline.html',
  '/opticsTextbook/searchandnavigation',
  '/opticsTextbook/basics',
  '/opticsTextbook/geometricaloptics',
  '/opticsTextbook/opticalinstruments',
  '/opticsTextbook/polarization',
  '/opticsTextbook/wave',
  '/opticsTextbook/interferencecoherence',
  '/opticsTextbook/diffractiveoptics',
  '/opticsTextbook/lasers',
  '/opticsTextbook/advancedinstruments',
  '/opticsTextbook/fiberoptics',
  '/opticsTextbook/raymatrix'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching core assets');
        // Cache core assets one by one to avoid failing if one fails
        return Promise.allSettled(
          CORE_ASSETS.map(url =>
            cache.add(url).catch(err => {
              console.warn(`[Service Worker] Failed to cache ${url}:`, err);
            })
          )
        );
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
              // Delete old versions of caches
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

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests and non-GET requests
  if (url.origin !== location.origin || request.method !== 'GET') {
    return;
  }

  // Skip chrome extensions and other special URLs
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version and update cache in background
          updateCache(request);
          return cachedResponse;
        }

        // Not in cache, fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Only cache successful responses (not 404s or other errors)
            if (networkResponse && networkResponse.status === 200 && networkResponse.type !== 'error') {
              const responseToCache = networkResponse.clone();

              caches.open(RUNTIME_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache);
                })
                .catch(err => {
                  console.warn('[Service Worker] Failed to cache response:', err);
                });
            } else if (networkResponse && networkResponse.status === 404) {
              // Don't cache 404 responses - let them retry on next visit
              console.log('[Service Worker] Not caching 404 for:', request.url);
            }

            return networkResponse;
          })
          .catch((err) => {
            console.warn('[Service Worker] Fetch failed:', err);

            // Return offline page or fallback content if available
            return caches.match('/opticsTextbook/offline.html')
              .then(offlineResponse => {
                if (offlineResponse) {
                  return offlineResponse;
                }

                // Return a basic offline response
                return new Response(
                  '<html><body><h1>Offline</h1><p>This content is not available offline. Please check your connection.</p></body></html>',
                  {
                    headers: { 'Content-Type': 'text/html' }
                  }
                );
              });
          });
      })
  );
});

// Helper function to update cache in background
function updateCache(request) {
  return fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        return caches.open(RUNTIME_CACHE)
          .then((cache) => {
            cache.put(request, response);
          });
      }
    })
    .catch((err) => {
      console.warn('[Service Worker] Background update failed:', err);
    });
}

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    const urlsToCache = event.data.urls || [];

    caches.open(RUNTIME_CACHE)
      .then((cache) => {
        return Promise.all(
          urlsToCache.map(url =>
            cache.add(url).catch(err => {
              console.warn(`[Service Worker] Failed to cache ${url}:`, err);
            })
          )
        );
      });
  }
});

// Periodic background sync (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'update-cache') {
    event.waitUntil(updateAllCaches());
  }
});

// Helper function to update all caches
function updateAllCaches() {
  return caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.keys()
        .then((requests) => {
          return Promise.all(
            requests.map((request) => updateCache(request))
          );
        });
    });
}
