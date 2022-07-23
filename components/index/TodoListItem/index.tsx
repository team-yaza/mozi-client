import React, { useState } from 'react';

import { Container, DeleteButton, Title } from './styles';
import { Todo } from '@/shared/types/todo';

interface TodoListItemProps {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: ({ id, title }: { id: string; title: string }) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onDeleteTodo, onUpdateTodo }) => {
  const [focused, setFocused] = useState(false);

  return (
    <Container>
      {focused ? (
        <input
          type="text"
          value={todo.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateTodo({ id: todo._id, title: e.target.value })}
        />
      ) : (
        <Title onClick={() => setFocused(true)}>{todo.title}</Title>
      )}
      <DeleteButton onClick={() => onDeleteTodo(todo._id)}>삭제</DeleteButton>
    </Container>
  );
};

export default React.memo(TodoListItem);
