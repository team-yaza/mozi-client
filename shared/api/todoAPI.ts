import { apiClient } from './apiClient';

interface Todo {
  title: string;
}

export const findAllTodo = async () => {
  const { data } = await apiClient.get<Todo[]>('/todo/all');
  return data;
};

export const createTodo = async (title: string) => {
  const response = await apiClient.post('http://localhost:3001/api/v1/todo/create', { title });
  if (response.status == 200) return true;
  else throw new Error('can not create todo');
};
