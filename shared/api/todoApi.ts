import { Todo } from '@/shared/types/todo';
import { apiClient } from '@/shared/api/apiClient';

export const findAllTodos = async () => {
  const response = await apiClient.get<Todo[]>('/todo/all');

  if (response.status === 200) return response.data;
  else throw new Error('Error fetching todos');
};

export const createTodo = async (title: string) => {
  const response = await apiClient.post('http://localhost:3001/api/v1/todo/create', { title });

  if (response.status === 200) return true;
  else throw new Error('can not create todo');
};

export const deleteTodo = async (todoId: string) => {
  const response = await apiClient.delete(`http://localhost:3001/api/v1/todo?todoId=${todoId}`);

  if (response.status === 200) return true;
  else throw new Error('delete failed');
};

export const updateTodo = async ({ todoId, newTitle }: { todoId: string; newTitle: string }) => {
  const response = await apiClient.patch('http://localhost:3001/api/v1/todo', { todoId, newTitle });
  if (response.status == 200) return true;
  else throw new Error('update failed');
};
