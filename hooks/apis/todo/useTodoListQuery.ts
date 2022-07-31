import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { Todo } from '@/shared/types/todo';
import todoService from '@/services/apis/todo';
import { ServerResponse } from '@/shared/types/common';

export const useTodoListQuery = (): UseQueryResult<Todo[], AxiosError<ServerResponse>> => {
  return useQuery('todoList', todoService.getTodos);
};
