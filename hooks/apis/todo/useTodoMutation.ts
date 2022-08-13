import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { TodoSuccessResponse, TodoUpdateRequest } from '@/shared/types/todo';
import { queryClient } from '@/shared/utils/queryClient';
import todoService from '@/services/apis/todo';

export const useCreateTodoMutation = () =>
  useMutation<TodoSuccessResponse, AxiosError>(() => todoService.createTodo(), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todoList']);
    },
    onError: (error) => {
      // TODO 콘솔에 에러 없애기
      console.log(error);
    },
  });

export const useUpdateTodoMutation = () =>
  useMutation(
    ({ id, title, latitude, longitude, description }: TodoUpdateRequest) =>
      todoService.updateTodo({ id, title, latitude, longitude, description }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todoList']);
      },
    }
  );

export const useDeleteTodoMutation = () =>
  useMutation((id: string) => todoService.deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todoList']);
    },
  });
