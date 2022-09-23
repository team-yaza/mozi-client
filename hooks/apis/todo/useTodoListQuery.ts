import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Todo } from '@/shared/types/todo';
import todoService from '@/services/apis/todo';
import { ServerResponse } from '@/shared/types/common';

export const useTodoListQuery = (): UseQueryResult<Todo[], AxiosError<ServerResponse>> => {
  return useQuery(['todos'], todoService.getTodos);
};

export const useSoftDeletedTodoList = () => {
  return useQuery(['todos'], todoService.getTodos, {
    select: useCallback((todos: Todo[]) => todos.filter((todo) => todo.deletedAt), []),
  });
};
