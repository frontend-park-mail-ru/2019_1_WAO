/* eslint-disable no-restricted-globals */
const KEY = 'wao2019';

const { assets } = global.serviceWorkerOption;
let assetsToCache = [...assets, './'];
assetsToCache = assetsToCache.map(path => new URL(path, global.location).toString());

self.addEventListener('install', (event) => {
  console.log('Установлен');
  event.waitUntil(
    caches.open(KEY)
      .then(cache => cache.addAll(assetsToCache))
      .catch((err) => {
        console.log(err);
      }),
  );
});

self.addEventListener('fetch', (event) => {
  // console.log('Происходит запрос на сервер');
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (!navigator.onLine && cachedResponse) {
          console.log('OFFLINE MODE');
          // const elements = document.getElementsByClassName('offline-notice');
          // if (elements.length > 0) {
          //   const [el] = elements;
          //   el.style.setProperty('display', 'none', 'important');
          // }
          return cachedResponse;
        }

        // if (navigator.onLine) {
        //   console.log('ONLINE MODE');
        //   const elements = document.getElementsByClassName('offline-notice');
        //   if (elements.length > 0) {
        //     const [el] = elements;
        //     el.style.display = null;
        //   }
        // }

        return fetch(event.request)
          .then(res => caches
            .open(KEY)
            .then((cache) => {
              if (event.request.method === 'GET') {
                cache.put(event.request, res.clone());
              }
              return res;
            }));
      })
      .catch((err) => {
        console.log(err);
      }),
  );
});
