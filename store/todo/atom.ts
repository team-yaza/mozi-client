import { atom, selector } from 'recoil';
import { Todo } from '@/shared/types/todo';

export const todosState = atom<Todo[]>({
  key: 'todosState',
  default: [],
});

export const todosCountState = selector({
  key: 'todosCountState',
  get: ({ get }) => {
    console.log(get(todosState).length);

    return get(todosState).length;
  },
});
