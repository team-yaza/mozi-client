import { useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { queryClient } from '@/shared/utils/queryClient';
import { todoStore } from '@/store/forage';
import { Todo, TodoStatistics } from '@/shared/types/todo';
import { ServerResponse } from '@/shared/types/common';
import todoService from '@/services/apis/todo';

export const use_unsafe_todoListQuery = () => {
  return useQuery(['unsafe_todos'], todoService.getTodos, {
    onSuccess: () => console.log('success'),
    onError: () => console.log('error'),
    onSettled: async (todoListFromServer, error) => {
      if (!axios.isAxiosError(error)) {
        console.log('알 수 없는 오류가 발생했습니다.');
        return;
      } else if (!todoListFromServer) {
        console.log('서버에서 데이터를 가져오지 못했습니다. 새로고침을 해주세요');
        return;
      }

      try {
        return await Promise.all(todoListFromServer.map((todo) => todoStore.setItem(todo.id, todo)));
      } catch (error) {
        console.log('데이터를 불러오는데 실패했습니다. 새로고침을 해주세요.');
      }
    },
  });
};

export const useTodoListQuery = (): UseQueryResult<Todo[], AxiosError<ServerResponse>> => {
  return useQuery(['todos'], todoService.getTodos, {
    select: useCallback((todos: Todo[]) => todos.filter((todo) => !todo.deletedAt && !todo.done), []),
    onSuccess: async (data: any) => {
      data;
      // console.log(data);
      // 전체를 초기화 시켜줄 필요가 있는지는 생각해볼 필요가 있음
      // await todoStore.clear();
      // await data.forEach(async (todo: Todo) => {
      //   await todoStore.setItem(todo.id, todo);
      // });
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
      // console.log(data, ' 먼데');
      data;
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
    select: useCallback(
      (todos: Todo[]) => todos.filter((todo) => (todo.dueDate || todo.alarmDate) && !todo.deletedAt),
      []
    ),
  });
};
