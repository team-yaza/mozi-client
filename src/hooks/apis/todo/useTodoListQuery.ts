import { queryClient } from '@/shared/utils/queryClient';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { todoStore } from '@/store/forage';
import { Todo, TodoStatistics } from '@/shared/types/todo';
import { ServerResponse } from '@/shared/types/common';
import todoService from '@/services/apis/todo';

export const useTodoListQuery = (): UseQueryResult<Todo[], AxiosError<ServerResponse>> => {
  return useQuery(['todos'], todoService.getTodos, {
    select: useCallback((todos: Todo[]) => todos.filter((todo) => !todo.deletedAt && !todo.done), []),
    onSuccess: async (data: any) => {
      console.log(data);

      // 전체를 초기화 시켜줄 필요가 있는지는 생각해볼 필요가 있음
      await todoStore.clear();
      await data.forEach(async (todo: Todo) => {
        await todoStore.setItem(todo.id, todo);
      });
    },
  });
};

export const useSoftDeletedTodoList = () => {
  return useQuery(['todos'], todoService.getTodos, {
    select: useCallback((todos: Todo[]) => todos.filter((todo) => todo.deletedAt), []),
  });
};

export const useLogbookTodoList = () => {
  return useQuery(['todos'], todoService.getTodos, {
    select: useCallback((todos: Todo[]) => todos.filter((todo) => todo.done && !todo.deletedAt), []),
    onSuccess: (data: any) => {
      console.log(data, ' 먼데');
    },
  });
};

export const useMapTodoList = () => {
  return useQuery(['todos'], todoService.getTodos, {
    select: useCallback(
      (todos: Todo[]) => todos.filter((todo) => todo.latitude && todo.longitude && !todo.deletedAt),
      []
    ),
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
    select: useCallback((todos: Todo[]) => todos.filter((todo) => todo.dueDate || todo.alarmDate), []),
  });
};
