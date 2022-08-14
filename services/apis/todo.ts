import { Todo } from '@/shared/types/todo';
import fetcher from '@/shared/utils/fetcher';
import { TodoUpdateRequest } from '@/shared/types/todo';
import { todoStore } from '@/store/forage';
import { setItemToLocalForage } from '@/shared/utils/localForage';

const todoService = {
  createTodo: async () => await fetcher('post', '/todos'),
  getTodos: async (): Promise<Todo[]> => {
    try {
      const todos = await fetcher('get', '/todos');
      await todoStore.clear();
      await todos.map(async(todo: Todo) => {
        await todoStore.setItem(todo.id, todo);
        await setItemToLocalForage(todoStore, todo.id, todo);
      });
    } catch (error) {
      // Network 실패
      console.error(error);
    }

    const localTodos: Todo[] = [];
    await todoStore.iterate((value) => {
      localTodos.push(value as Todo);
    });
    console.log(localTodos);
    return localTodos;
  },
  updateTodo: async ({ id, title, longitude, latitude, description }: TodoUpdateRequest) =>
    await fetcher('patch', `/todos/${id}`, { title, longitude, latitude, description }),
  deleteTodo: async (id: string) => await fetcher('delete', `/todos/${id}`),
};

export default todoService;
