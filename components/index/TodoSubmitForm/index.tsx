import { useCallback, useRef } from 'react';

import { createTodo, findAllTodo } from '@/shared/api/todoAPI';
import { Todo } from '@/shared/types/todo';

interface TodoSubmitFormProps {
  setTodoList: (todoList: Todo[]) => void;
}

const TodoSubmitForm: React.FC<TodoSubmitFormProps> = ({ setTodoList }) => {
  const todoInputRef = useRef<HTMLInputElement>(null);

  const getAllTodo = useCallback(async () => {
    const response = await findAllTodo();
    setTodoList(response as Todo[]);
    return response;
  }, []);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = todoInputRef.current?.value;
    console.log(title, '?');
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
