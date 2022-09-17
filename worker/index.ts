/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { NetworkOnly, NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { cleanupOutdatedCaches } from 'workbox-precaching';

// import fetcher from '../shared/utils/fetcher';
import { todoStore } from '../store/forage';
import { Todo } from '../shared/types/todo';
import { SYNC_TODOS } from '../shared/constants/sync';
import { getDistance } from '../shared/utils/getDistance';
import { urlBase64ToUint8Array } from '../shared/utils/encryption';

declare const self: ServiceWorkerGlobalScope;

self.skipWaiting();
clientsClaim();

self.__WB_DISABLE_DEV_LOGS = true;

const ALARM_DISTANCE_STANDARD = 1000; //10 km
const publicVapidKey = 'BHCoqzR03UrjuAFGPoTDB5t6o05z5K3EYJ1cuZVj9sPF6FxNsS-b7y4ClNaS11L9EUpmT-wUyeZAivwGbkwMAjY';

const PRODUCTION_SERVER = 'https://mozi-server.com/api/v1';
// const DEVELOPMENT_SERVER = 'http://localhost:3001/api/v1';

self.addEventListener('install', (event) => {
  console.log('service worker installed');
  event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', (event) => {
  console.log('service worker activated');
  event.waitUntil(self.clients.claim()); // Become available to all pages
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

registerRoute(/^https:\/\/openapi.map.naver.com\/openapi\/v3\/.*/i, new NetworkOnly());
registerRoute(/^https:\/\/developers.kakao.com\/sdk\/js\/.*/i, new NetworkOnly());
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
            await fetch(`${PRODUCTION_SERVER}/todos`, {
              method: 'POST',
              body: JSON.stringify({
                _id: todo.id,
                ...todo,
              }),
            });
          } else if (todo.updated) {
            await fetch(`${PRODUCTION_SERVER}/todos/${todo.id}`, {
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
            await fetch(`${PRODUCTION_SERVER}/todos/${todo.id}`, {
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

// self.addEventListener('fetch', (event) => {
//   // console.log(event.request.url);
//   event;
// });

let sub: PushSubscription | null = null;

(async () => {
  sub = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
})();

self.addEventListener('message', (event) => {
  const checkTodoHandler = async () => {
    const localAlarm: Todo[] = [];
    await todoStore.iterate((todo: Todo) => {
      localAlarm.push(todo);
    });

    localAlarm.map(async (todo: Todo) => {
      if (!todo.location || !todo.location.name) return;
      const distance = getDistance(
        todo.location.coordinates[1],
        todo.location.coordinates[0],
        event.data.latitude,
        event.data.longitude
      );
      console.log(todo.title, distance);

      if (distance < ALARM_DISTANCE_STANDARD && !todo.alarmed) {
        await fetch(`${PRODUCTION_SERVER}/webpush/${todo.id}`, {
          method: 'POST',
          body: JSON.stringify({
            subscription: JSON.stringify(sub),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await todoStore.setItem(todo.id, { ...todo, alarmed: true });
      } else if (distance > ALARM_DISTANCE_STANDARD && todo.alarmed) {
        await fetch(`${PRODUCTION_SERVER}/webpush/${todo.id}`, {
          method: 'PATCH',
        });
        await todoStore.setItem(todo.id, { ...todo, alarmed: false });
      }
    });
  };
  if (event.data && event.data.type === 'SET_INTERVAL') {
    console.log('get message !');
    event.waitUntil(checkTodoHandler());
  }
});
