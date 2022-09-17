import { useEffect, useState } from 'react';
import TodoListItem from '@/components/trash/TodoListItem';
import { Todo } from '@/shared/types/todo';
import { Container } from './styles';

interface TodoListProps {
  todos?: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos = [] }) => {
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
      {todos?.map((todo, index) => (
        <TodoListItem
          key={todo.id}
          title={todo.title}
          description={todo.description}
          done={todo.done}
          isFocused={isFocused === index}
          setIsFocused={setIsFocused}
          index={index}
        />
      ))}
    </Container>
  );
};

export default TodoList;
