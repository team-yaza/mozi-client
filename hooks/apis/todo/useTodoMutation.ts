import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { TodoSuccessResponse, TodoUpdateRequest } from '@/shared/types/todo';
import todoService from '@/services/apis/todo';
import { queryClient } from '@/shared/utils/queryClient';

export const useCreateTodoMutation = () =>
  useMutation<TodoSuccessResponse, AxiosError>(() => todoService.createTodo(), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
    onError: (error) => {
      console.log(error);
    },
  });

export const useUpdateTodoMutation = () =>
  useMutation(
    ({ id, title, done, latitude, longitude, description }: TodoUpdateRequest) =>
      todoService.updateTodo({ id, title, done, latitude, longitude, description }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
      },
    }
  );

export const useDeleteTodoMutation = () =>
  useMutation((id: string) => todoService.deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

export const useDeleteAllTodosMutation = () =>
  useMutation(() => todoService.deleteAllTodos(), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
