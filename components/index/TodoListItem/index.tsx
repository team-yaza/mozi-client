import React, { useState, useCallback } from 'react';

import { Container, DeleteButton, Title } from './styles';
import { Todo } from '@/shared/types/todo';

interface TodoListItemProps {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: ({ id, title }: { id: string; title: string }) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onDeleteTodo, onUpdateTodo }) => {
  const [focused, setFocused] = useState(false);

  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateTodo({ id: todo._id, title: e.target.value });
  }, []);

  const onPressEnterHandler = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key != 'Enter') return;
    onChangeHandler(e);
    setFocused(false);
  }, []);

  return (
    <Container>
      {focused ? (
        <input
          type="text"
          defaultValue={todo.title}
          onChange={onChangeHandler}
          onBlur={() => setFocused(false)}
          onKeyDown={onPressEnterHandler}
          autoFocus
        />
      ) : (
        <Title onClick={() => setFocused(true)}>{todo.title}</Title>
      )}
      <DeleteButton onClick={() => onDeleteTodo(todo._id)}>삭제</DeleteButton>
    </Container>
  );
};

export default React.memo(TodoListItem);
