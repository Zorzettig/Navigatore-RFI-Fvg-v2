const CACHE_NAME = 'nav-rfi-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  'https://unpkg.com/leaflet/dist/leaflet.css',
  'https://unpkg.com/leaflet.fullscreen@3.0.2/Control.FullScreen.css',
  'https://unpkg.com/leaflet/dist/leaflet.js',
  'https://unpkg.com/leaflet.fullscreen@3.0.2/Control.FullScreen.js'
];

// Installa il Service Worker e salva in cache i file strutturali
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercetta le richieste: usa la cache se non c'è rete
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});