import localForage from 'localforage';

export const todoStore = localForage.createInstance({
  name: 'todo-store',
});
