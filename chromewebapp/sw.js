const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  // Agrega aquí todos los archivos que deseas almacenar en caché
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caché abierta');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la solicitud está en caché, la devuelve
        if (response) {
          return response;
        }
        // Si la solicitud no está en caché, la solicita a la red
        return fetch(event.request);
      })
  );
});