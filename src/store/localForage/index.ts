import localForage from 'localforage';
import { Todo } from '@/shared/types/todo';

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

export const getTodosFromIndexedDB = async (): Promise<Todo[]> => {
  const keys = await todoStore.keys();
  return (await Promise.all(keys.map((key) => todoStore.getItem(key)))) as Todo[];
};
