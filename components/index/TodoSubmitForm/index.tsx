import { useCallback, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

import { createTodo, findAllTodo } from '@/shared/api/todoAPI';
import { Todo } from '@/shared/types/todo';
import { todoListState } from '@/store/todo/atom';

const TodoSubmitForm: React.FC = () => {
  const setTodoList = useSetRecoilState(todoListState);
  const todoInputRef = useRef<HTMLInputElement>(null);

  const getAllTodo = useCallback(async () => {
    const todos = await findAllTodo();
    setTodoList(todos as Todo[]);
  }, []);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = todoInputRef.current?.value;
    if (!title) return;

    const response = await createTodo(title);

    if (response) {
      todoInputRef.current.value = '';
      getAllTodo();
    } else alert('todo 생성 실패');
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <input ref={todoInputRef} />
      <button>Add</button>
    </form>
  );
};

export default TodoSubmitForm;
