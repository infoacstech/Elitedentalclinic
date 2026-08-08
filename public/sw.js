const CACHE_NAME = 'elite-dental-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.svg',
  '/icon-192.svg',
  '/icon-512.svg'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event (Stale-While-Revalidate strategy for static resources, Network First for API)
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Don't intercept non-GET or chrome-extension/data requests
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // API endpoints or dynamic routes: Network First
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .catch(() => caches.match(request))
    );
    return;
  }

  // Assets and HTML: Cache First / Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch((err) => {
        // Return cached page or index offline fallback
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
