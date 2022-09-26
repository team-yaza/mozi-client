import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuid } from 'uuid';

import { Todo, TodoSuccessResponse, TodoUpdateRequest } from '@/shared/types/todo';
import todoService from '@/services/apis/todo';
import { queryClient } from '@/shared/utils/queryClient';
import { syncTodos } from '@/shared/utils/sync';
import { todoStore } from '@/store/forage';

export const useCreateTodoMutation = () =>
  useMutation<TodoSuccessResponse, AxiosError>(() => todoService.createTodo(), {
    onSuccess: async (data: any) => {
      queryClient.setQueriesData(['todos'], (oldData: any) => {
        return [data, ...oldData];
      });
      await todoStore.setItem(data.id, data);
    },
    onError: async (error) => {
      // 네트워크 에러 부분
      console.log(error);
      console.log('오프라인 투두생성');

      const tempTodoId = uuid();
      const localTodo = { created: true, id: tempTodoId, alarmed: false, done: false };
      console.log(localTodo, '?');
      try {
        await todoStore.setItem(tempTodoId, {
          id: tempTodoId,
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
    ({ id, title, done, latitude, longitude, description }: TodoUpdateRequest) =>
      todoService.updateTodo({ id, title, done, latitude, longitude, description }),
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
