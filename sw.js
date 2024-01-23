// sw.js

// Service Worker Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('your-cache-name').then((cache) => {
      return cache.addAll([
        // Add your assets (e.g., HTML, CSS, JS, images) to be cached here
        '/',
        '/index.html',
        '/styles/main.css',
        '/scripts/main.js',
        '/images/logo.png',
        // Add more resources as needed
      ]);
    })
  );
});

// Service Worker Activation
self.addEventListener('activate', (event) => {
  // Remove old caches if any
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'your-cache-name') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Service Worker Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
