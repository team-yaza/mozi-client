// import { AxiosError } from 'axios';
import { v4 as uuid } from 'uuid';
import { useMutation } from '@tanstack/react-query';

import todoService from '@/services/apis/todo';
import { todoStore } from '@/store/localForage';
import { syncTodos } from '@/shared/utils/sync';
import { queryClient } from '@/shared/utils/queryClient';
import {
  Todo,
  // TodoSuccessResponse,
  TodoUpdateRequest,
  TodoCreateRequest,
} from '@/shared/types/todo';

export const use_unsafe_createTodoMutation = () =>
  useMutation(
    ({ locationName, longitude, latitude, dueDate }: TodoCreateRequest) =>
      todoService.createTodoAtIndexedDB({
        locationName,
        longitude,
        latitude,
        dueDate,
      }),
    {
      onSuccess: async (data) => {
        queryClient.setQueriesData(['todos'], (oldData: any) => {
          if (oldData) {
            return [data, ...oldData];
          }

          return [data];
        });

        await syncTodos();
      },
    }
  );

export const use_unsafe_updateTodoMutation = () =>
  useMutation(
    ({
      id,
      title,
      index,
      longitude,
      latitude,
      description,
      done,
      alarmDate,
      dueDate,
      locationName,
    }: TodoUpdateRequest) =>
      todoService.updateTodoAtIndexedDB({
        id,
        title,
        index,
        longitude,
        latitude,
        description,
        done,
        alarmDate,
        dueDate,
        locationName,
      }),
    {
      onSuccess: async (_, variables) => {
        queryClient.setQueriesData(['todos'], (data: any) => {
          return data.map((todo: Todo) => {
            if (todo.id === variables.id) {
              return { ...todo, ...variables };
            }

            return todo;
          });
        });

        await syncTodos();
      },
    }
  );

export const use_unsafe_deleteTodoMutation = () =>
  useMutation((id: string) => todoService.deleteTodoAtIndexedDB(id), {
    onSuccess: async (_, id) => {
      queryClient.setQueriesData(['todos'], (data: any) => {
        console.log(id, '여기서의 id를 확인해보자');
        return data.filter((todo: Todo) => todo.id !== id);
      });

      await syncTodos();
    },
  });

export const useCreateTodoMutation = () =>
  useMutation(
    ({ title, locationName, longitude, latitude, dueDate }: TodoCreateRequest) =>
      todoService.createTodo({ title, locationName, longitude, latitude, dueDate }),
    {
      onSuccess: async (data) => {
        queryClient.setQueriesData(['todos'], (oldData: any) => {
          if (oldData) {
            return [data, ...oldData];
          }

          return [data];
        });
        queryClient.invalidateQueries(['statistics']);

        await todoStore.setItem(data.id, data);
      },
      onError: async (error: any) => {
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
    }
  );

export const useUpdateTodoMutation = () =>
  useMutation(
    ({ id, title, done, latitude, longitude, description, locationName, alarmDate, dueDate }: TodoUpdateRequest) =>
      todoService.updateTodo({ id, title, done, latitude, longitude, description, locationName, alarmDate, dueDate }),
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

        queryClient.invalidateQueries(['statistics']);
      },
    }
  );

export const useDeleteTodoMutation = () =>
  useMutation((id: string) => todoService.deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      queryClient.invalidateQueries(['statistics']);
    },
    onError: (error) => {
      console.log(error);
    },
  });

export const useForceDeleteTodoMutation = () =>
  useMutation((id: string) => todoService.forceDeleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      queryClient.invalidateQueries(['statistics']);
    },
    onError: (error) => {
      console.log(error);
    },
  });

export const useDeleteAllTodosMutation = () =>
  useMutation(() => todoService.forceDeleteAllTodosAtTrash(), {
    onSuccess: async () => {
      queryClient.setQueriesData(['todos', 'deleted'], []);

      await syncTodos();
    },
  });
