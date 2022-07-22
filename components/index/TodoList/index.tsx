import { Container } from './styles';
import { Todo } from '@/shared/types/todo';
import TodoListItem from '@/components/index/TodoListItem';

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos = [] }) => {
  return (
    <Container>
      {todos?.map((todo: Todo) => (
        <TodoListItem key={todo._id} todo={todo} />
      ))}
    </Container>
  );
};

export default TodoList;
