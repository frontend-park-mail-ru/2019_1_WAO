const CACHE_NAME = 'wao2019';

// const {assets} = global.serviceWorkerOption;

const cacheUrls = [
  '/',
  '/signin',
  '/signup',
  '/users',
  '/rules',
  // assets.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(cacheUrls))
      .catch((err) => {
        console.log(err);
      }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (!navigator.onLine && cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request);
      })
      .catch((err) => {
        console.log(err);
      }),
  );
});
