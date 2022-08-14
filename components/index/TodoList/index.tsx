import { Container } from './styles';
import { Todo, TodoUpdateRequest } from '@/shared/types/todo';
import TodoListItem from '@/components/index/TodoListItem';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: ({ id, title }: TodoUpdateRequest) => void;
  onDeleteTodo: (id: string) => void;
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
