import { syncTodos } from './../../shared/utils/sync';
import mongoose from 'mongoose';

import { Todo } from '@/shared/types/todo';
import fetcher from '@/shared/utils/fetcher';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { todoStore } from '@/store/forage';

const todoService = {
  createTodo: async (): Promise<Todo> => {
    try {
      const createdTodo = await fetcher('post', '/todos');
      await todoStore.setItem(createdTodo.id, createdTodo);

      return createdTodo;
    } catch (error) {
      console.log(error); // network error

      await syncTodos();
    }

    // 네트워크 에러가 나면 일단 넘어가고 Todo를 임의로 만든다.
    const tempTodoId = new mongoose.Types.ObjectId().toString();
    const localTodo = { created: true, id: tempTodoId, alarmed: false, done: false };

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

    return localTodo;
  },
  getTodos: async (): Promise<Todo[]> => {
    try {
      const todos = await fetcher('get', '/todos');

      await todoStore.clear();

      if (todos) {
        await todos.map(async (todo: Todo) => {
          await todoStore.setItem(todo.id, { ...todo });
        });
      }
    } catch (error) {
      console.log(error); // network error

      // sync 이벤트
      await syncTodos();
    }

    const localTodos: Todo[] = [];

    await todoStore.iterate((value: Todo) => {
      localTodos.push(value);
    });

    return localTodos;
  },
  updateTodo: async ({ id, title, longitude, latitude, description, done }: TodoUpdateRequest) => {
    try {
      const updatedTodo = await fetcher('patch', `/todos/${id}`, { title, longitude, latitude, description, done });
      await todoStore.setItem(id, updatedTodo);

      return updatedTodo;
    } catch (error) {
      console.error(error); // network error

      await syncTodos();
    }
    // 네트워크 요청이 실패하면 로컬에 todo를 적는다.
    await todoStore.setItem(id, { id, title, longitude, latitude, description, done, updated: true });
    return;
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
};

export default todoService;
