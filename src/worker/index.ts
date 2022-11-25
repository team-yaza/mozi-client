/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches } from 'workbox-precaching';

import './cache';
import { getTodosFromIndexedDB, todoStore } from '../store/localForage/index';
import { Todo } from '../shared/types/todo';
import { TOKEN, UPDATE_LOCATION } from '../shared/constants/serviceWorker';
import { Location } from '../shared/types/location';
import { getDistance } from '../shared/utils/location';

declare const self: ServiceWorkerGlobalScope;

self.__WB_DISABLE_DEV_LOGS = true;
self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

// const PRODUCTION_SERVER = 'http://localhost:3001/api/v1';
const PRODUCTION_SERVER = 'https://mozi-server.com/api/v1';

let token = '';

const location: Location = {
  longitude: 0,
  latitude: 0,
};

const standard = {
  short: 200,
  medium: 400,
  long: 600,
};

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

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  const {
    data: { type },
  } = event;

  if (type === TOKEN) {
    token = event.data.token;
    return;
  }

  if (type === UPDATE_LOCATION) {
    const {
      data: { longitude, latitude },
    } = event;

    location.longitude = longitude;
    location.latitude = latitude;
    return;
  }
});

const getDescription = (todo: Todo) => {
  return (
    todo.description ||
    (todo.alarmDate && `${todo.alarmDate?.getHours()}시 ${todo.alarmDate?.getMinutes()}분`) ||
    todo.locationName
  );
};

const alarm = async (todo: Todo) => {
  console.log('알람 울림', todo);

  self.registration.showNotification(todo.title ?? 'MOZI 알림', {
    body: getDescription(todo),
    icon: 'https://avatars.githubusercontent.com/u/104609929?s=200&v=4',
  });
};

const checkAlarm = async () => {
  const todos = await getTodosFromIndexedDB();

  await Promise.all(
    todos.map((todo) => {
      if (todo.alarmed || todo.deletedAt || !todo.alarmType) return false;

      if (todo.alarmType === 'time' && todo.alarmDate) {
        const diff = (todo.alarmDate.getTime() - new Date().getTime()) / 1000;

        if (0 <= diff && diff <= 60) {
          alarm(todo);
          return todoStore.setItem(todo.id, { ...todo, alarmed: true });
        }
      }

      if (todo.alarmType === 'place' && todo.locationName && todo.distanceType && todo.latitude && todo.longitude) {
        const { longitude, latitude } = location;
        const distance = getDistance(todo.latitude, todo.longitude, latitude, longitude);

        if (distance <= standard[todo.distanceType]) {
          alarm(todo);
          return todoStore.setItem(todo.id, { ...todo, alarmed: true });
        }
      }

      if (todo.alarmType === 'both' && todo.latitude && todo.longitude && todo.distanceType) {
        const diff = (todo.alarmDate.getTime() - new Date().getTime()) / 1000;
        const { longitude, latitude } = location;
        const distance = getDistance(todo.latitude, todo.longitude, latitude, longitude);

        if (0 <= diff && diff <= 60 && distance <= standard[todo.distanceType]) {
          alarm(todo);
          return todoStore.setItem(todo.id, { ...todo, alarmed: true });
        }
      }
    })
  );
};

(async () => {
  let intervalId;
  try {
    intervalId = setInterval(async () => await checkAlarm(), 10000);
  } catch (error) {
    clearInterval(intervalId);
  }
})();
