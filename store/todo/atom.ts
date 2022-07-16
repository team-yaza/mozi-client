import { atom } from 'recoil';
import { Todo } from '@/shared/types/todo';

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});
