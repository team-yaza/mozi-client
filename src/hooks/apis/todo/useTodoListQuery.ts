import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { ServerResponse } from 'http';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { queryClient } from '@/shared/utils/queryClient';
import { Todo, TodoStatistics } from '@/shared/types/todo';
import todoService from '@/services/apis/todo';
import { ROUTES } from '@/shared/constants/routes';
import { QUERY_TYPE_ERROR } from '@/shared/constants/dialog';

export const useTodoListQuery = (page: string): UseQueryResult<Todo[], AxiosError<ServerResponse>> => {
  switch (page) {
    case ROUTES.HOME:
      return useQuery(['todos'], todoService.getTodosFromIndexedDB, {
        select: (todos: Todo[]) =>
          todos.filter((todo) => !todo.done && !todo.deletedAt).sort((todoA, todoB) => todoA.index - todoB.index),
      });
    case ROUTES.UPCOMING:
      return useQuery(['todos'], todoService.getTodosFromIndexedDB, {
        select: (todos: Todo[]) => todos.filter((todo) => (todo.dueDate || todo.alarmDate) && !todo.deletedAt),
      });
    case ROUTES.LOGBOOK:
      return useQuery(['todos'], todoService.getTodosFromIndexedDB, {
        select: (todos: Todo[]) => todos.filter((todo) => todo.done && !todo.deletedAt),
      });
    case ROUTES.TRASH:
      return useQuery(['todos'], todoService.getTodosFromIndexedDB, {
        select: (todos: Todo[]) => todos.filter((todo) => todo.deletedAt),
      });
    case ROUTES.MAP:
      return useQuery(['todos'], todoService.getTodosFromIndexedDB, {
        select: (todos: Todo[]) => todos.filter((todo) => todo.latitude && todo.longitude && !todo.deletedAt),
      });
    default:
      throw new Error(QUERY_TYPE_ERROR);
  }
};

export const useSoftDeletedTodoList = () => {
  return useQuery(['todos', 'deleted'], todoService.getTodosFromIndexedDB, {
    select: useCallback((todos: Todo[]) => todos.filter((todo) => todo.deletedAt && !todo.offlineForceDeleted), []),
  });
};

export const use_unsafe_todoListQuery = (): UseQueryResult<Todo[], AxiosError<ServerResponse>> =>
  useQuery(['todos'], todoService.getTodosFromIndexedDB, {
    select: useCallback(
      (todos: Todo[]) =>
        todos.filter((todo) => !todo.deletedAt && !todo.done).sort((a: any, b: any) => a.index - b.index),
      []
    ),
  });

export const useLogbookTodoList = () => {
  return useQuery(['todos'], todoService.getTodos, {
    select: (todos: Todo[]) => todos.filter((todo) => todo.done && !todo.deletedAt),
    onSuccess: (data: any) => {
      data;
    },
  });
};

export const useMapTodoList = () => {
  return useQuery(['todos'], todoService.getTodos, {
    select: (todos: Todo[]) => todos.filter((todo) => todo.latitude && todo.longitude && !todo.deletedAt),
  });
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

export const useUpcommingTodoList = () => {
  return useQuery(['todos'], todoService.getTodos, {
    select: (todos: Todo[]) => todos.filter((todo) => (todo.dueDate || todo.alarmDate) && !todo.deletedAt),
  });
};
