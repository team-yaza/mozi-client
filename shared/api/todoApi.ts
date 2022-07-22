import { Todo } from '@/shared/types/todo';
import { apiClient } from '@/shared/api/apiClient';

export const findAllTodos = async () => {
  const response = await apiClient.get<Todo[]>('/todos');

  if (response.status === 200) return response.data;
  else throw new Error('Error fetching todos');
};

export const createTodo = async (title: string) => {
  const response = await apiClient.post('/todos', { title });

  if (response.status === 201) return true;
  else throw new Error('can not create todo');
};

export const deleteTodo = async (id: string) => {
  const response = await apiClient.delete(`/todos/${id}`);

  if (response.status === 200) return true;
  else throw new Error('delete failed');
};

export const updateTodo = async ({ id, title }: { id: string; title: string }) => {
  const response = await apiClient.patch('/todos', { id, title });
  if (response.status == 201) return true;
  else throw new Error('update failed');
};
