import { AxiosError } from 'axios';
import { ServerResponse } from 'http';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { queryClient } from '@/shared/utils/queryClient';
import { Todo, TodoStatistics } from '@/shared/types/todo';
import todoService from '@/services/apis/todo';
import { ROUTES } from '@/shared/constants/routes';
import { QUERY_TYPE_ERROR } from '@/shared/constants/dialog';
import { queryKeys } from '@/shared/constants/queryKey';

export const useTodoListQuery = (page: string): UseQueryResult<Todo[], AxiosError<ServerResponse>> => {
  switch (page) {
    case ROUTES.HOME:
      return useQuery([queryKeys.GET_TODOLIST], todoService.getTodosFromIndexedDB, {
        select: (todos: Todo[]) =>
          todos.filter((todo) => !todo.done && !todo.deletedAt).sort((todoA, todoB) => todoA.index - todoB.index),
      });
    case ROUTES.UPCOMING:
      return useQuery([queryKeys.GET_TODOLIST], todoService.getTodosFromIndexedDB, {
        select: (todos: Todo[]) => todos.filter((todo) => (todo.dueDate || todo.alarmDate) && !todo.deletedAt),
      });
    case ROUTES.LOGBOOK:
      return useQuery([queryKeys.GET_TODOLIST], todoService.getTodosFromIndexedDB, {
        select: (todos: Todo[]) => todos.filter((todo) => todo.done && !todo.deletedAt),
      });
    case ROUTES.TRASH:
      return useQuery([queryKeys.GET_TODOLIST], todoService.getTodosFromIndexedDB, {
        select: (todos: Todo[]) => todos.filter((todo) => todo.deletedAt && todo.offline !== 'forceDeleted'),
      });
    case ROUTES.MAP:
      return useQuery([queryKeys.GET_TODOLIST], todoService.getTodosFromIndexedDB, {
        select: (todos: Todo[]) => todos.filter((todo) => todo.latitude && todo.longitude && !todo.deletedAt),
      });
    default:
      throw new Error(QUERY_TYPE_ERROR);
  }
};

export const useTodoListStatistics = () => {
  return useQuery<any>(['statistics'], todoService.getTodos, {
    select: () => {
      const todos: Todo[] = queryClient.getQueryData(['todos']) as Todo[];

      if (todos) {
        return todos.reduce(
          (acc: TodoStatistics, todo: Todo) => {
            if (todo.deletedAt) {
              acc.trash += 1;
            } else if (todo.done) {
              acc.logbook += 1;
            } else if (todo.latitude && todo.longitude) {
              acc.map += 1;
            } else {
              acc.inbox += 1;
            }
            return acc;
          },
          { inbox: 0, logbook: 0, trash: 0, map: 0 }
        );
      } else {
        return { inbox: 0, logbook: 0, trash: 0, map: 0 };
      }
    },
    initialData: { logbook: 0, trash: 0, inbox: 0, map: 0 },
  });
};
