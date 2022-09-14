import { useEffect } from 'react';
import TodoListItem from '@/components/trash/TodoListItem';
import { Todo } from '@/shared/types/todo';
import { Container } from './styles';

interface TodoListProps {
  todos?: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  console.log('hi');

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <Container>
      {todos?.map((todo) => (
        <TodoListItem key={todo.id} title={todo.title} description={todo.description} done={todo.done} />
      ))}
    </Container>
  );
};

export default TodoList;
