import localForage from 'localforage';

export const todoStore = localForage.createInstance({
  name: 'todo-store',
});

export const findMaximumIndexAtTodoStore = async () => {
  const keys = await todoStore.keys();

  if (keys.length === 0) {
    return 0;
  }

  const todos = await Promise.all(keys.map((key) => todoStore.getItem(key)));

  return Math.max(...todos.map((todo: any) => todo.index));
};
