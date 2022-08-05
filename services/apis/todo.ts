import { Todo } from '@/shared/types/todo';
import fetcher from '@/shared/utils/fetcher';
import { TodoUpdateRequest } from '@/shared/types/todo';

const todoService = {
  createTodo: async () => await fetcher('post', '/todos', {}),
  getTodos: async (): Promise<Todo[]> => await fetcher('get', '/todos'),
  updateTodo: async ({ id, title, longitude, latitude, description }: TodoUpdateRequest) =>
    await fetcher('patch', `/todos/${id}`, { title, longitude, latitude, description }),
  deleteTodo: async (id: string) => await fetcher('delete', `/todos/${id}`),
};

export default todoService;
