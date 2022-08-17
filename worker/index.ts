/// <reference lib="webworker" />
import axios from 'axios';
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { NetworkOnly, NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute, setDefaultHandler, setCatchHandler } from 'workbox-routing';
import { matchPrecache, precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

// import fetcher from '../shared/utils/fetcher';
import { todoStore } from '../store/forage';
import { Todo } from '../shared/types/todo';
import { SYNC_TODOS } from '../shared/constants/sync';

declare const self: ServiceWorkerGlobalScope;

self.skipWaiting();
clientsClaim();

self.__WB_DISABLE_DEV_LOGS = true;

self.addEventListener('install', (event) => {
  console.log('service worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('service worker activated');
});

cleanupOutdatedCaches();

registerRoute(
  '/',
  new NetworkFirst({
    cacheName: 'start-url',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);

registerRoute(
  /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 4,
        maxAgeSeconds: 31536e3,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);

registerRoute(
  /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
  new StaleWhileRevalidate({
    cacheName: 'static-font-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 4,
        maxAgeSeconds: 604800,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);

registerRoute(
  /\/api\/.*$/i,
  new NetworkFirst({
    cacheName: 'apis',
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 16,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);

// registerRoute(
//   /\/_next\/static\/.*/i,
//   new CacheFirst({
//     cacheName: 'next-static',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 32,
//         maxAgeSeconds: 86400,
//         purgeOnQuotaError: !0,
//       }),
//     ],
//   }),
//   'GET'
// );

// registerRoute(
//   /\.(?:js)$/i,
//   new CacheFirst({
//     cacheName: 'static-js-assets',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 32,
//         maxAgeSeconds: 86400,
//         purgeOnQuotaError: !0,
//       }),
//     ],
//   }),
//   'GET'
// );

registerRoute(
  /.*/i,
  new NetworkFirst({
    cacheName: 'others',
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0,
      }),
    ],
  }),
  'GET'
);

self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'https://tistory2.daumcdn.net/tistory/2794117/attach/aa31f12030a2404cafc028e2c8e2b1af',
  });
});

self.addEventListener('sync', async (event: SyncEvent) => {
  console.log('sync 이벤트 발생');
  if (event.tag === SYNC_TODOS) {
    console.log('service worker sync-todo event');
    event.waitUntil(
      (async () => {
        const localTodos: Todo[] = [];

        await todoStore.iterate((value: Todo) => {
          localTodos.push(value);
        });

        localTodos.map(async (todo: Todo) => {
          // console.log(todo, key, iterationNumber);
          if (todo.created) {
            await fetch('https://mozi-server.com/api/v1/todos', {
              method: 'POST',
              body: JSON.stringify({
                _id: todo.id,
                ...todo,
              }),
            });
          } else if (todo.updated) {
            await fetch(`https://mozi-server.com/api/v1/todos/${todo.id}`, {
              method: 'PATCH',
              body: JSON.stringify({
                title: todo.title,
                description: todo.description,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
          } else if (todo.deleted) {
            await fetch(`https://mozi-server.com/api/v1/todos/${todo.id}`, {
              method: 'DELETE',
            });
          }
        });

        //     console.log(todo.id, 'updatedtododi');
        //     // axios.patch(`https://mozi-server.com/api/v1/todos/${todo.id}`, {
        //     //   ...todo,
        //     // });
        //     // a();

        //     console.log('업데이트');
        //     // await fetcher('patch', `/todos/${todo.id}`, {
        //     //   title: todo.title,
        //     //   longitude: todo.location?.coordinates[0],
        //     //   latitude: todo.location?.coordinates[1],
        //     //   description: todo.description,
        //     // });
        //   }
        //     // await fetcher('delete', `/todos/${todo.id}`);
        //   }
        // });
      })()
    );

    console.log('sync 완료');
  }
});

self.addEventListener('fetch', (event) => {
  // console.log(event.request.url);
});

// console.log(SYNC_TODOS);
