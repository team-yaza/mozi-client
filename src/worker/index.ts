/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches } from 'workbox-precaching';

import './cache';
import { getTodosFromIndexedDB, todoStore } from '../store/localForage/index';
import { Todo } from '../shared/types/todo';
import { TOKEN } from '../shared/constants/serviceWorker';
import { getDistance } from '../shared/utils/location';
import { checkMinutes } from '../shared/utils/date';

declare const self: ServiceWorkerGlobalScope;

self.__WB_DISABLE_DEV_LOGS = true;
self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

const ALARM_DISTANCE_STANDARD = 1000; //1 km
// const PRODUCTION_SERVER = 'http://localhost:3001/api/v1';
const PRODUCTION_SERVER = 'https://mozi-server.com/api/v1';

let token = '';

const FLAGIGNORE = 0;
const FLAGSATIFIED = 1;
const FLAGUNSATIFIED = -1;

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

const checkTodoTemp = async (event: ExtendableMessageEvent) => {
  const localAlarm: Todo[] = [];
  await todoStore.iterate((todo: Todo) => {
    localAlarm.push(todo);
  });

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
      if (checkMinutes(todo.alarmDate)) timeFlag = FLAGSATIFIED;
      else timeFlag = timeFlag = FLAGUNSATIFIED;
    }

    console.log(todo.title, locationFlag, timeFlag);

    if ((locationFlag | timeFlag) == FLAGSATIFIED) {
      // 알람주는 로직 넣음
      self.registration.showNotification(todo.title as string, {
        body: todo.description,
        icon: 'https://avatars.githubusercontent.com/u/104609929?s=200&v=4',
      });

      await todoStore.setItem(todo.id, { ...todo, alarmed: true });
    }
  });
};

checkTodoTemp; // ! remove

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data.type === TOKEN) {
    token = event.data.token;
    return;
  }
});

const checkAlarm = async () => {
  const todos = await getTodosFromIndexedDB();

  await Promise.all(
    todos.map((todo) => {
      if (todo.alarmed || todo.deletedAt) return;

      if (todo.alarmDate && checkMinutes(todo.alarmDate)) {
        todoStore.setItem(todo.id, { ...todo, alarmed: true });

        return self.registration.showNotification(todo.title ?? 'MOZI 알림', {
          body: todo.description ?? `${todo.alarmDate.getHours()}시 ${todo.alarmDate.getMinutes()}분`,
          icon: 'https://avatars.githubusercontent.com/u/104609929?s=200&v=4',
        });
      }
    })
  );
};

(async () => {
  let intervalId;
  try {
    intervalId = setInterval(async () => await checkAlarm(), 60000);
  } catch (error) {
    clearInterval(intervalId);
  }
})();
