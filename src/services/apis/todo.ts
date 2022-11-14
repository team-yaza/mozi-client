import { v4 as uuidv4 } from 'uuid';
import * as Sentry from '@sentry/nextjs';

import fetcher from '@/shared/utils/fetcher';
import { Todo, TodoCreateRequest, TodoStatistics, TodoUpdateRequest } from '@/shared/types/todo';
import { todoStore, findMaximumIndexAtTodoStore, getTodosFromIndexedDB } from '@/store/localForage';

const todoService = {
  getTodosFromIndexedDB: async (): Promise<Todo[]> => {
    try {
      const todos = await fetcher('get', '/todos');
      await todoStore.clear();
      return await Promise.all(todos.map((todo: Todo) => todoStore.setItem(todo.id, todo)));
    } catch (error) {
      Sentry.captureException(error);
    }

    const keys = await todoStore.keys();
    if (keys.length === 0) return [];
    return (await Promise.all(keys.map((key) => todoStore.getItem(key)))) as Todo[];
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
  updateTodoAtIndexedDB: async ({ id, ...rest }: TodoUpdateRequest): Promise<Partial<Todo>> => {
    return await todoStore.setItem<Partial<Todo>>(id, {
      id,
      ...rest,
      offline: 'updated',
    });
  },
  deleteTodoAtIndexedDB: async (id: string): Promise<Partial<Todo>> => {
    const todo = await todoStore.getItem<Todo>(id);
    return await todoStore.setItem(id, { ...todo, offline: 'deleted' });
  },
  deleteAllTodosAtTrash: async () => {
    const todos = await getTodosFromIndexedDB();

    return await Promise.all(
      todos.map((todo: Todo) => {
        if (todo.deletedAt) {
          return todoStore.setItem(todo.id, { ...todo, offline: 'deleted' });
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
