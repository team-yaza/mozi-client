import { Container } from './styles';
import { Todo } from '@/shared/types/todo';
import TodoListItem from '@/components/index/TodoListItem';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: ({ id, title }: { id: string; title: string }) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo, onUpdateTodo }) => {
  return (
    <Container>
      {todos?.map((todo: Todo) => (
        <TodoListItem key={todo._id} todo={todo} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} />
      ))}
    </Container>
  );
};

export default TodoList;
