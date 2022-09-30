import { AxiosError } from 'axios';
import { v4 as uuid } from 'uuid';
import { useMutation } from '@tanstack/react-query';

import todoService from '@/services/apis/todo';
import { todoStore } from '@/store/forage';
import { syncTodos } from '@/shared/utils/sync';

import { queryClient } from '@/shared/utils/queryClient';
import { Todo, TodoSuccessResponse, TodoUpdateRequest } from '@/shared/types/todo';

export const useCreateTodoMutation = () =>
  useMutation<TodoSuccessResponse, AxiosError>(() => todoService.createTodo(), {
    onSuccess: async (data) => {
      queryClient.setQueriesData(['todos'], (oldData: any) => {
        if (oldData) {
          return [data, ...oldData];
        }

        return [data];
      });
      await todoStore.setItem(data.id, data);
    },
    onError: async (error) => {
      // 네트워크 에러 부분
      console.log(error.message, '에러메시지');
      console.log('오프라인에서 투두생성');

      const offlineTodoId = uuid();
      const localTodo = { created: true, id: offlineTodoId, alarmed: false, done: false };

      try {
        await todoStore.setItem(offlineTodoId, {
          id: offlineTodoId,
          title: '',
          description: '',
          done: false,
          alarmed: false,
          created: true,
        });
      } catch (error) {
        console.log(error);
      }

      queryClient.setQueriesData(['todos'], (data: any) => [localTodo, ...data]);

      await syncTodos();
    },
  });

export const useUpdateTodoMutation = () =>
  useMutation(
    ({ id, title, done, latitude, longitude, description, locationName }: TodoUpdateRequest) =>
      todoService.updateTodo({ id, title, done, latitude, longitude, description, locationName }),
    {
      onSuccess: (_, variables) => {
        queryClient.setQueriesData(['todos'], (data: any) => {
          return data.map((todo: Todo) => {
            if (todo.id === variables.id) {
              return { ...todo, ...variables };
            }

            return todo;
          });
        });
      },
    }
  );

export const useDeleteTodoMutation = () =>
  useMutation((id: string) => todoService.deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
    onError: (error) => {
      console.log(error);
    },
  });

export const useDeleteAllTodosMutation = () =>
  useMutation(() => todoService.deleteAllTodos(), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
