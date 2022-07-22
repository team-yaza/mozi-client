import { useMutation, useQueryClient } from 'react-query';
import { useState, useRef, useCallback } from 'react';

import { Container, DeleteButton, Title } from './styles';
import { Todo } from '@/shared/types/todo';
import { deleteTodo, updateTodo } from '@/shared/api/todoApi';

interface TodoListItemProps {
  todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todoList');
    },
    onError: () => {
      alert('todo 삭제 실패');
    },
  });

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todoList');
    },
    onError: () => {
      alert('todo 업데이트 실패');
    },
  });

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = inputRef.current?.value;
    if (!title) return;

    updateTodoMutation.mutate({ id: todo._id, title });
    setFocused(false);
  }, []);

  return (
    <Container>
      {focused ? (
        <form onSubmit={onSubmit} onBlur={onSubmit}>
          <input type="text" defaultValue={todo.title} ref={inputRef} />
        </form>
      ) : (
        <Title onClick={() => setFocused(true)}>{todo.title}</Title>
      )}
      <DeleteButton onClick={() => deleteTodoMutation.mutate(todo._id)}>삭제</DeleteButton>
    </Container>
  );
};

export default TodoListItem;
