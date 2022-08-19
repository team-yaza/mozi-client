import localForage from 'localforage';

export const todoStore = localForage.createInstance({
  name: 'todo-store',
});

export const alarmStore = localForage.createInstance({
  name: 'alarm-store',
});
