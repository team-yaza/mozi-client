import { atom, selector } from 'recoil';
import { Todo } from '@/shared/types/todo';

export const todosState = atom<Todo[]>({
  key: 'todosState',
  default: [],
});

export const todosCountState = selector({
  key: 'todosCountState',
  get: ({ get }) => {
    return get(todosState).length;
  },
});

export const todosLocationState = selector({
  key: 'todosLocationState',
  get: ({ get }) => {
    return get(todosState).map((todo) => todo.location);
  },
});
