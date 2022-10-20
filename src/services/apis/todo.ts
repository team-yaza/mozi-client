import { v4 as uuidv4 } from 'uuid';

import { Todo } from '@/shared/types/todo';
import fetcher from '@/shared/utils/fetcher';
import { syncTodos } from '@/shared/utils/sync';
import { TodoCreateRequest, TodoUpdateRequest } from '@/shared/types/todo';
import { todoStore } from '@/store/forage';

const todoService = {
  createTodo: async ({ locationName, longitude, latitude, dueDate }: TodoCreateRequest) => {
    const createdTodo = await fetcher('post', '/todos', {
      locationName,
      longitude,
      latitude,
      dueDate,
    });
    return createdTodo;
  },
  getTodos: async (): Promise<Todo[]> => await fetcher('get', '/todos'),
  updateTodo: async ({
    id,
    title,
    longitude,
    latitude,
    description,
    done,
    alarmDate,
    dueDate,
    locationName,
  }: TodoUpdateRequest) => {
    try {
      const updatedTodo = await fetcher('patch', `/todos/${id}`, {
        title,
        longitude,
        latitude,
        locationName,
        description,
        done,
        alarmDate,
        dueDate,
      });
      if ((locationName && longitude && latitude) || alarmDate)
        await todoStore.setItem(id, { ...updatedTodo, alarmed: false });
      else await todoStore.setItem(id, updatedTodo);

      return updatedTodo;
    } catch (error) {
      console.error(error);

      await syncTodos();
    }
    // 네트워크 요청이 실패하면 로컬에 todo를 적는다.
    await todoStore.setItem(id, {
      id,
      title,
      longitude,
      latitude,
      locationName,
      description,
      done,
      updated: true,
      alarmDate,
      dueDate,
    });
  },
  deleteTodo: async (id: string) => {
    try {
      await fetcher('delete', `/todos/${id}`);
    } catch (error) {
      console.error(error); // network error

      await syncTodos();
    }
    try {
      const todo = (await todoStore.getItem(id)) as Todo;
      await todoStore.setItem(id, { ...todo, deleted: true, id });
    } catch (error) {
      console.log(error);
    }
  },
  forceDeleteTodo: async (id: string) => {
    try {
      await fetcher('delete', `/todos/force/${id}`);
    } catch (error) {
      console.error(error); // network error
    }
  },
  deleteAllTodos: async () => {
    try {
      await fetcher('delete', '/todos/all');
    } catch (error) {
      console.log(error);
      await syncTodos();
    }

    // ! 여기에 네트워크 실패했을 때 일단 다 삭제하는 로직 (로컬에서)
  },

  createTodoAtIndexedDB: async ({ locationName, longitude, latitude, dueDate }: TodoCreateRequest) => {
    try {
      const todoId = uuidv4();

      const aaa = await todoStore.setItem(todoId, {
        id: todoId,
        locationName,
        longitude,
        latitude,
        dueDate,
        offline: true,
      });

      console.log(aaa, '?????');

      return aaa;
    } catch (error) {
      console.log(error);

      console.log('할 일을 만드는데 실패했습니다.');
    }
  },
};

export default todoService;
