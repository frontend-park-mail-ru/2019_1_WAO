/* eslint-disable no-restricted-globals */
import { GlobalBus } from './modules/eventbus';

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
          GlobalBus.trigger('to_offline');
          return cachedResponse;
        }

        // if (navigator.onLine) {

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
