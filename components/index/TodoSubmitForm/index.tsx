import { useCallback, useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { createTodo } from '@/shared/api/todoApi';

const TodoSubmitForm: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const addTodoMutation = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todoList');
    },
    onError: () => {
      alert('todo 생성 실패');
    },
  });

  useEffect(() => inputRef.current?.focus(), []);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = inputRef.current?.value;
    if (!title) return;

    addTodoMutation.mutate(title);
    inputRef.current.value = '';
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <input ref={inputRef} />
      <button>Add</button>
    </form>
  );
};

export default TodoSubmitForm;
