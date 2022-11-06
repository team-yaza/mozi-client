import { v4 as uuidv4 } from 'uuid';
import * as Sentry from '@sentry/nextjs';

import fetcher from '@/shared/utils/fetcher';
import { syncTodos } from '@/shared/utils/sync';
import { toastError, toastIcon } from '@/shared/utils/toast';
import { TODO_UPDATE_FAILED, TODO_DELETE_FAILED, IS_OFFLINE } from '@/shared/constants/dialog';
import { Todo, TodoCreateRequest, TodoStatistics, TodoUpdateRequest } from '@/shared/types/todo';
import { todoStore, findMaximumIndexAtTodoStore, getTodosFromIndexedDB } from '@/store/localForage';

const todoService = {
  getTodosFromIndexedDB: async (): Promise<Todo[]> => {
    try {
      const todos = await fetcher('get', '/todos');
      await todoStore.clear();
      return await Promise.all(todos.map((todo: Todo) => todoStore.setItem(todo.id, todo)));
    } catch (error) {
      toastIcon(IS_OFFLINE, '🦖');
    }

    const keys = await todoStore.keys();
    if (keys.length === 0) return [];
    return (await Promise.all(keys.map((key) => todoStore.getItem(key)))) as Todo[];
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
  createTodoAtIndexedDB: async ({ locationName, longitude, latitude, dueDate, title }: TodoCreateRequest) => {
    const todoId = uuidv4();
    const maximumIndexAtTodoStore = await findMaximumIndexAtTodoStore();

    return await todoStore.setItem<Todo>(todoId, {
      id: todoId,
      locationName,
      title,
      longitude,
      latitude,
      dueDate,
      done: false,
      alarmed: false,
      createdAt: new Date(),
      index: maximumIndexAtTodoStore + 1,
      offline: 'created',
    });
  },
  updateTodoAtIndexedDB: async ({ id, ...rest }: TodoUpdateRequest) => {
    try {
      // const todo = (await todoStore.getItem(id)) as Todo;
      // console.log(todo, 'from indexedDB');
      return await todoStore.setItem(id, {
        ...rest,
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
    const keys = await todoStore.keys();
    const todos = (await Promise.all(keys.map((key) => todoStore.getItem(key)))) as Todo[];

    return await Promise.all(
      todos.map((todo: Todo) => {
        if (todo.deletedAt) {
          return todoStore.setItem(todo.id, { ...todo, offlineForceDeleted: true });
        }
      })
    );
  },
  calculateStatisticsFromIndexedDB: async () => {
    const todos = await getTodosFromIndexedDB();
    // const statistics = queryClient.getQueryData<TodoStatistics>([queryKeys.GET_TODOLIST_STATISTICS]);
    const statistics: TodoStatistics = { inbox: 0, map: 0, upcoming: 0, logbook: 0, trash: 0 };
    if (statistics) {
      return todos.reduce((acc, todo) => {
        if (todo.deletedAt) {
          acc.trash += 1;
        } else if (todo.done) {
          acc.logbook += 1;
        } else if (todo.latitude && todo.longitude) {
          acc.map += 1;
        } else if (todo.dueDate) {
          acc.upcoming += 1;
        } else {
          acc.inbox += 1;
        }
        return acc;
      }, statistics);
    }

    return statistics;
  },
};

export default todoService;
