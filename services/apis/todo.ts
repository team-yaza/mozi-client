import { Todo } from '@/shared/types/todo';
import fetcher from '@/shared/utils/fetcher';

interface updateTodoProps {
  id: string;
  title?: string;
  longitude?: number;
  latitude?: number;
}

const todoService = {
  createTodo: async (title: string) => await fetcher('post', '/todos', { title }),
  getTodos: async (): Promise<Todo[]> => await fetcher('get', '/todos'),
  updateTodo: async ({ id, title, longitude, latitude }: updateTodoProps) =>
    await fetcher('patch', `/todos/${id}`, { title, longitude, latitude }),
  deleteTodo: async (id: string) => await fetcher('delete', `/todos/${id}`),
};

export default todoService;
