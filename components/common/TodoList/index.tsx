import { useEffect, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { Todo, TodoUpdateRequest } from '@/shared/types/todo';
import TodoListItem from '@/components/common/TodoListItem';
import { Container } from './styles';

interface TodoListProps {
  todos?: Todo[];
  updateTodo: UseMutateFunction<any, unknown, TodoUpdateRequest, unknown>;
  deleteTodo: UseMutateFunction<void, unknown, string, unknown>;
}

const TodoList: React.FC<TodoListProps> = ({ todos = [], updateTodo, deleteTodo }) => {
  const [isFocused, setIsFocused] = useState(-1);

  useEffect(() => {
    const handleArrowKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        if (isFocused === -1 || isFocused === 0) {
          setIsFocused(todos.length - 1);
        } else {
          setIsFocused((prev) => prev - 1);
        }
      } else if (e.key === 'ArrowDown') {
        if (isFocused === -1 || isFocused === todos.length - 1) {
          setIsFocused(0);
        } else {
          setIsFocused((prev) => prev + 1);
        }
      } else if (e.key === 'Escape') {
        setIsFocused(-1);
      }
    };

    window.addEventListener('keydown', handleArrowKeyDown);

    return () => {
      window.removeEventListener('keydown', handleArrowKeyDown);
    };
  }, [isFocused]);

  return (
    <Container>
      {todos.map((todo, index) => (
        <TodoListItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          done={todo.done}
          index={index}
          isFocused={isFocused === index}
          setIsFocused={setIsFocused}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </Container>
  );
};

export default TodoList;
