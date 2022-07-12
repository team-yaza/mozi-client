import { apiClient } from './apiClient';

interface Todo {
  title: string;
}

export const findAllTodo = async () => {
  const { data: todoList } = await apiClient.get<Todo[]>('/todo/all');
  return todoList;
};
