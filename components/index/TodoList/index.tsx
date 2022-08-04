import { Container } from './styles';
import { Todo } from '@/shared/types/todo';
import TodoListItem from '@/components/index/TodoListItem';

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: ({ id, title, description }: { id: string; title?: string; description?: string }) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo, onUpdateTodo }) => {
  return (
    <Container>
      {todos?.map((todo: Todo) => (
        <TodoListItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} />
      ))}
    </Container>
  );
};

export default TodoList;
