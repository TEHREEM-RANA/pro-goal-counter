// sw.js
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
});

self.addEventListener('fetch', (e) => {
  // This empty fetch handler is REQUIRED for mobile installability
  e.respondWith(fetch(e.request));
});
