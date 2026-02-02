// This tells the browser the app can work offline
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});