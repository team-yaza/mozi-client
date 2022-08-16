import mongoose from 'mongoose';

import { Todo } from '@/shared/types/todo';
import fetcher from '@/shared/utils/fetcher';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { todoStore } from '@/store/forage';

const todoService = {
  createTodo: async () => {
    const tempTodoId = new mongoose.Types.ObjectId().toString();
    const localTodo = { created: true, tempTodoId };

    await todoStore.setItem(tempTodoId, localTodo);

    try {
      const createdTodo = await fetcher('post', '/todos', { _id: tempTodoId });
      await todoStore.setItem(createdTodo.id, createdTodo);
    } catch (error) {
      console.log(error); // network error
    }

    return localTodo;
  },
  getTodos: async (): Promise<Todo[]> => {
    try {
      const todos = await fetcher('get', '/todos');

      await todoStore.clear();
      await todos.map(async (todo: Todo) => {
        await todoStore.setItem(todo.id, todo);
      });
    } catch (error) {
      console.log(error); // network error
    }

    const localTodos: Todo[] = [];

    await todoStore.iterate((value: Todo) => {
      localTodos.push(value);
    });

    return localTodos;
  },
  updateTodo: async ({ id, title, longitude, latitude, description }: TodoUpdateRequest) => {
    try {
      // 네트워크 요청을 보낸다.
      const updatedTodo = await fetcher('patch', `/todos/${id}`, { title, longitude, latitude, description });
      // 네트워크 요청이 성공하면 서버에서 업데이트된 todo를 로컬에 적는다.
      await todoStore.setItem(id, { ...updatedTodo, changed: false });

      return updatedTodo;
    } catch (error) {
      console.error(error); // network error
    }
    // 네트워크 요청이 실패하면 로컬에 todo를 적는다.
    await todoStore.setItem(id, { title, longitude, latitude, description, changed: true });

    return;
  },
  deleteTodo: async (id: string) => {
    try {
      await fetcher('delete', `/todos/${id}`);
    } catch (error) {
      console.error(error); // network error
    }
    const todo = (await todoStore.getItem(id)) as Todo;
    await todoStore.setItem(id, { ...todo, deleted: true });
  },
};

export default todoService;
