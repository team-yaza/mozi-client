import { Todo } from '@/shared/types/todo';
import { todoStore } from '@/store/forage';

export const getItemFromLocalForage = async (store: LocalForage, key: string) => {
  try {
    return await store.getItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const getTodosFromLocalForage = async () => {
  const localTodos: Todo[] = [];
  await todoStore.iterate((value) => {
    localTodos.push(value as Todo);
  });
  return localTodos;
};

export const getChangedTodosFromLocalForage = async () => {
  const localTodos: Todo[] = [];
  await todoStore.iterate((value) => {
    const todo: Todo = value as Todo;
    // todo.isChanged ==
  });
  return localTodos;
};

export const setItemToLocalForage = async (store: LocalForage, key: string, value: any) => {
  try {
    await store.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};
