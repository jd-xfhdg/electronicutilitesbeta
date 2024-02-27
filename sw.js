// Escucha el evento 'install' para almacenar en caché los recursos necesarios
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-pwa-cache')
        .then(function(cache) {
          return cache.addAll([
            '/',
            '/index.html',
            '/styles.css',
            '/main.js'
            // Agrega aquí los recursos adicionales que tu aplicación necesita
          ]);
        })
    );
  });
  
  // Intercepta las solicitudes de red y busca en la caché primero
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          return response || fetch(event.request);
        })
    );
  });