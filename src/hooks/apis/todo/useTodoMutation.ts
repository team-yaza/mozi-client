// import { AxiosError } from 'axios';
// import { v4 as uuid } from 'uuid';
import { useMutation } from '@tanstack/react-query';
import * as Sentry from '@sentry/nextjs';

import todoService from '@/services/apis/todo';
import { syncTodos } from '@/shared/utils/sync';
import { queryClient } from '@/shared/utils/queryClient';
import {
  Todo,
  // TodoSuccessResponse,
  TodoUpdateRequest,
  TodoCreateRequest,
} from '@/shared/types/todo';
import { queryKeys } from '@/shared/constants/queryKey';
import { toastError } from '@/shared/utils/toast';
import { TODO_CREATE_FAILED, TODO_UPDATE_FAILED } from '@/shared/constants/dialog';

export const useCreateTodoMutation = () =>
  useMutation(
    ({ locationName, longitude, latitude, dueDate, title }: TodoCreateRequest) =>
      todoService.createTodoAtIndexedDB({
        title,
        locationName,
        longitude,
        latitude,
        dueDate,
      }),
    {
      onSuccess: async (data) => {
        queryClient.setQueriesData([queryKeys.TODOS], (oldData: any) => {
          if (oldData) return [data, ...oldData];

          return [data];
        });

        await syncTodos();
      },
      onError: (error) => {
        toastError(TODO_CREATE_FAILED);
        Sentry.captureException(error);
      },
    }
  );

export const useUpdateTodoMutation = () =>
  useMutation(
    ({ ...rest }: TodoUpdateRequest) =>
      todoService.updateTodoAtIndexedDB({
        ...rest,
      }),
    {
      onSuccess: async (_, variables) => {
        queryClient.setQueriesData([queryKeys.TODOS], (data: any) => {
          return data.map((todo: Todo) => {
            if (todo.id === variables.id) {
              return { ...todo, ...variables };
            }

            return todo;
          });
        });

        await syncTodos();
      },
      onError: (error) => {
        console.log(TODO_UPDATE_FAILED);
        Sentry.captureException(error);
      },
    }
  );

export const useDeleteTodoMutation = () =>
  useMutation((id: string) => todoService.deleteTodoAtIndexedDB(id), {
    onSuccess: async (_, id) => {
      queryClient.setQueriesData([queryKeys.TODOS], (data: any) => {
        console.log(id, '여기서의 id를 확인해보자');
        return data.filter((todo: Todo) => todo.id !== id);
      });

      await syncTodos();
    },
  });

export const useForceDeleteTodoMutation = () =>
  useMutation((id: string) => todoService.forceDeleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.TODOS]);
      queryClient.invalidateQueries(['statistics']);
    },
    onError: (error) => {
      console.log(error);
    },
  });

export const useDeleteAllTodosMutation = () =>
  useMutation(() => todoService.forceDeleteAllTodosAtTrash(), {
    onSuccess: async () => {
      queryClient.setQueriesData([queryKeys.TODOS, 'deleted'], []);

      await syncTodos();
    },
  });
