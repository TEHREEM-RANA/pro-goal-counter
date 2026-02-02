self.addEventListener('fetch', (event) => {
  // This allows the app to work offline once loaded
  event.respondWith(fetch(event.request));
});