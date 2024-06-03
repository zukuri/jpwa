var cacheName = 'app-gallery';

var filesToCache = [
    '/',
    '/index.html',
    '/gallery.html',
    '/about.html',
    '/css/style.css',
    '/css/bootstrap.css',
    '/js/main.js'
  ];

  self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(filesToCache);
      })
    );
    self.skipWaiting();
  });

  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });