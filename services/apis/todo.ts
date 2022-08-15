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
    await todoStore.setItem(id, { title, longitude, latitude, description, changed: true });

    try {
      const updatedTodo = await fetcher('patch', `/todos/${id}`, { title, longitude, latitude, description });
      todoStore.setItem(id, { ...updatedTodo, changed: false });
    } catch (error) {
      console.error(error); // network error
    }
  },
  deleteTodo: async (id: string) => await fetcher('delete', `/todos/${id}`),
};

export default todoService;
