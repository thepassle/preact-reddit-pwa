const VERSION = 1;
const CACHENAME = `preact-reddit-pwa-v${VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHENAME).then((cache) => {
      return cache.addAll([
        '/',
        './app.js',
        './src/preact-pwa-comment.js',
        './src/preact-pwa-search.js',
        './src/preact-pwa-subreddit.js',
        './src/preact-pwa-thread.js',
        './src/utils.js',

        './web_modules/preact-async-route.js',
        './web_modules/preact-router.js',

        './web_modules/preact/hooks.js',
        './web_modules/htm/preact.js',
        './web_modules/common/preact.module-216c846d.js',

        './web_modules/kv-storage-polyfill.js',
        './web_modules/es-module-shims.js',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith('reddit-pwa-') && cacheName !== CACHENAME)
          .map(cacheName => caches.delete(cacheName))
      )
    })
  )
});

self.addEventListener('fetch', async (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(caches.match('/'));
    return;
  }

  event.respondWith(caches.match(event.request).then(res => res || fetch(event.request)))
});
