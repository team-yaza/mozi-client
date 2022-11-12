/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches } from 'workbox-precaching';

import './cache';
import { getTodosFromIndexedDB, todoStore } from '../store/localForage/index';
import { Todo } from '../shared/types/todo';
import { TOKEN } from '../shared/constants/serviceWorker';
import { getDistance } from '../shared/utils/location';
import { urlBase64ToUint8Array } from '../shared/utils/encryption';
import { checkAlarm } from '../shared/utils/date';
import { CHECK_ALARM } from '../shared/constants/serviceWorker';

declare const self: ServiceWorkerGlobalScope;

self.__WB_DISABLE_DEV_LOGS = true;
self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

const ALARM_DISTANCE_STANDARD = 1000; //1 km
const publicVapidKey = 'BHCoqzR03UrjuAFGPoTDB5t6o05z5K3EYJ1cuZVj9sPF6FxNsS-b7y4ClNaS11L9EUpmT-wUyeZAivwGbkwMAjY';
// const PRODUCTION_SERVER = 'http://localhost:3001/api/v1';
const PRODUCTION_SERVER = 'https://mozi-server.com/api/v1';

let token = '';

const FLAGIGNORE = 0;
const FLAGSATIFIED = 1;
const FLAGUNSATIFIED = -1;

self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'https://avatars.githubusercontent.com/u/104609929?s=200&v=4',
  });
});

self.addEventListener('sync', async (event: SyncEvent) => {
  event.waitUntil(
    (async () => {
      try {
        const todos = await getTodosFromIndexedDB();

        await Promise.all(
          todos
            .filter((todo) => todo.offline)
            .map((todo) => {
              switch (todo.offline) {
                case 'created':
                  return fetch(`${PRODUCTION_SERVER}/todos`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(todo),
                  });
                case 'updated':
                  return fetch(`${PRODUCTION_SERVER}/todos/${todo.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(todo),
                  });
                case 'deleted':
                  return fetch(`${PRODUCTION_SERVER}/todos/${todo.id}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                  });
              }
            })
        );

        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    })()
  );
});

let sub: PushSubscription | null = null;

const getSub = async () => {
  if (sub) return sub;
  sub = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
  return sub;
};

const checkTodoHandler = async (event: ExtendableMessageEvent) => {
  const localAlarm: Todo[] = [];
  await todoStore.iterate((todo: Todo) => {
    localAlarm.push(todo);
  });

  const subscription = await getSub();

  localAlarm.map(async (todo: Todo) => {
    if (todo.alarmed || todo.deletedAt) return;

    let locationFlag = FLAGIGNORE;
    let timeFlag = FLAGIGNORE;
    if (todo.locationName && todo.latitude && todo.longitude) {
      const distance = getDistance(todo.latitude, todo.longitude, event.data.latitude, event.data.longitude);
      if (distance < ALARM_DISTANCE_STANDARD) locationFlag = FLAGSATIFIED;
      else locationFlag = FLAGUNSATIFIED;
    }

    if (todo.alarmDate) {
      if (checkAlarm(todo.alarmDate)) timeFlag = FLAGSATIFIED;
      else timeFlag = timeFlag = FLAGUNSATIFIED;
    }

    console.log(todo.title, locationFlag, timeFlag);

    if ((locationFlag | timeFlag) == FLAGSATIFIED) {
      await fetch(`${PRODUCTION_SERVER}/webpush/${todo.id}`, {
        method: 'POST',
        body: JSON.stringify({
          subscription: JSON.stringify(subscription),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await todoStore.setItem(todo.id, { ...todo, alarmed: true });
    }
  });
};

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data.type === TOKEN) {
    token = event.data.token;
    return;
  }

  if (event.data && event.data.type === CHECK_ALARM) {
    console.log('check notification');
    event.waitUntil(checkTodoHandler(event));
  }
});
