import { Todo } from '@/shared/types/todo';
import fetcher from '@/shared/utils/fetcher';

const todoService = {
  createTodo: async (title: string) => await fetcher('post', '/todos', { title }),
  getTodos: async (): Promise<Todo[]> => await fetcher('get', '/todos'),
  updateTodo: async ({ id, title, description }: { id: string; title?: string; description?: string }) =>
    await fetcher('patch', `/todos/${id}`, { title }),
  deleteTodo: async (id: string) => await fetcher('delete', `/todos/${id}`),
};

export default todoService;
