import * as Sentry from '@sentry/nextjs';
import { v4 as uuidv4 } from 'uuid';

import fetcher from '@/shared/utils/fetcher';
import { syncTodos } from '@/shared/utils/sync';
import { toastError } from '@/shared/utils/toast';
import { TODO_CREATE_FAILED, TODO_UPDATE_FAILED, TODO_DELETE_FAILED } from '@/shared/constants/dialog';
import { Todo, TodoCreateRequest, TodoUpdateRequest } from '@/shared/types/todo';
import { todoStore, findMaximumIndexAtTodoStore } from '@/store/localForage';

const todoService = {
  createTodo: async ({ title, locationName, longitude, latitude, dueDate }: TodoCreateRequest) =>
    await fetcher('post', '/todos', {
      title,
      locationName,
      longitude,
      latitude,
      dueDate,
    }),
  getTodos: async (): Promise<Todo[]> => await fetcher('get', '/todos'),
  updateTodo: async ({
    id,
    title,
    longitude,
    latitude,
    description,
    done,
    alarmDate,
    dueDate,
    locationName,
  }: TodoUpdateRequest) => {
    try {
      const updatedTodo = await fetcher('patch', `/todos/${id}`, {
        title,
        longitude,
        latitude,
        locationName,
        description,
        done,
        alarmDate,
        dueDate,
      });
      if ((locationName && longitude && latitude) || alarmDate)
        await todoStore.setItem(id, { ...updatedTodo, alarmed: false });
      else await todoStore.setItem(id, updatedTodo);

      return updatedTodo;
    } catch (error) {
      console.error(error);

      await syncTodos();
    }
    // 네트워크 요청이 실패하면 로컬에 todo를 적는다.
    await todoStore.setItem(id, {
      id,
      title,
      longitude,
      latitude,
      locationName,
      description,
      done,
      updated: true,
      alarmDate,
      dueDate,
    });
  },
  deleteTodo: async (id: string) => {
    try {
      await fetcher('delete', `/todos/${id}`);
    } catch (error) {
      console.error(error); // network error

      await syncTodos();
    }
    try {
      const todo = (await todoStore.getItem(id)) as Todo;
      await todoStore.setItem(id, { ...todo, deleted: true, id });
    } catch (error) {
      console.log(error);
    }
  },
  forceDeleteTodo: async (id: string) => {
    try {
      await fetcher('delete', `/todos/force/${id}`);
    } catch (error) {
      console.error(error); // network error
    }
  },
  deleteAllTodos: async () => {
    try {
      await fetcher('delete', '/todos/all');
    } catch (error) {
      console.log(error);
      await syncTodos();
    }
  },
  getTodosFromIndexedDB: async () => {
    const todos = await fetcher('get', '/todos');

    try {
      await todoStore.clear();
      return await Promise.all(todos.map((todo: any) => todoStore.setItem(todo.id, todo)));
    } catch (error) {
      console.log('데이터를 불러오는데 실패했습니다. 새로고침을 해주세요.');
    }

    const keys = await todoStore.keys();

    if (keys.length === 0) return [];
    return await Promise.all(keys.map((key) => todoStore.getItem(key)));
  },
  createTodoAtIndexedDB: async ({ locationName, longitude, latitude, dueDate }: TodoCreateRequest) => {
    try {
      const todoId = uuidv4();
      const maximumIndexAtTodoStore = await findMaximumIndexAtTodoStore();

      return await todoStore.setItem(todoId, {
        id: todoId,
        locationName,
        longitude,
        latitude,
        dueDate,
        index: maximumIndexAtTodoStore + 1,
        offline: true,
      });
    } catch (error) {
      Sentry.captureException(error);
      toastError(TODO_CREATE_FAILED);
    }
  },
  updateTodoAtIndexedDB: async ({
    id,
    title,
    index,
    longitude,
    latitude,
    description,
    done,
    alarmDate,
    dueDate,
    locationName,
  }: TodoUpdateRequest) => {
    try {
      // const todo = (await todoStore.getItem(id)) as Todo;
      // console.log(todo, 'from indexedDB');
      return await todoStore.setItem(id, {
        id,
        title,
        index,
        longitude,
        latitude,
        description,
        done,
        alarmDate,
        dueDate,
        locationName,
        offline: true,
      });
    } catch (error) {
      Sentry.captureException(error);
      console.log(TODO_UPDATE_FAILED);
    }
  },
  deleteTodoAtIndexedDB: async (id: string) => {
    try {
      const todo = (await todoStore.getItem(id)) as Todo;

      return await todoStore.setItem(id, { ...todo, deletedAt: Date.now(), offlineDeleted: true });
    } catch (error) {
      toastError(TODO_DELETE_FAILED);
      Sentry.captureException(error);
    }
  },
  forceDeleteTodoAtIndexedDB: async () => {
    try {
      const keys = await todoStore.keys();
      const todos = await Promise.all(keys.map((key) => todoStore.getItem(key)));

      return await Promise.all(
        todos.map((todo: any) => todoStore.setItem(todo.id, { ...todo, offlineForceDeleted: true }))
      );
    } catch (error) {
      Sentry.captureException(error);
    }
  },
  forceDeleteAllTodosAtTrash: async () => {
    try {
      const keys = await todoStore.keys();
      const todos = (await Promise.all(keys.map((key) => todoStore.getItem(key)))) as Todo[];

      return await Promise.all(
        todos.map((todo: Todo) => {
          if (todo.deletedAt) {
            todoStore.setItem(todo.id, { ...todo, offlineForceDeleted: true });
          }
        })
      );
    } catch (error) {
      Sentry.captureException(error);
    }
  },
};

export default todoService;
