import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Todo } from '@/shared/types/todo';
import todoService from '@/services/apis/todo';
import { ServerResponse } from '@/shared/types/common';
import { todoStore } from '@/store/forage';

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
    select: useCallback((todos: Todo[]) => todos.filter((todo) => todo.done), []),
    onSuccess: (data: any) => {
      console.log(data, ' 먼데');
    },
  });
};
