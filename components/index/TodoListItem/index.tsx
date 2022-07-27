import React, { useCallback, useRef } from 'react';

import { Container, DeleteButton } from './styles';
import { Todo } from '@/shared/types/todo';

interface TodoListItemProps {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: ({ id, title }: { id: string; title: string }) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onDeleteTodo, onUpdateTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onUpdateTodo({ id: todo._id, title: e.target.value });
  }, []);

  const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') inputRef.current?.blur();
  }, []);

  return (
    <Container>
      <input
        type="text"
        ref={inputRef}
        placeholder="New Todo"
        defaultValue={todo.title}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
      <DeleteButton onClick={() => onDeleteTodo(todo._id)}>삭제</DeleteButton>
    </Container>
  );
};

export default React.memo(TodoListItem);
