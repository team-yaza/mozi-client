import { Container } from './styles';
import { Todo, TodoUpdateRequest } from '@/shared/types/todo';
import TodoListItem from '@/components/index/TodoListItem';
import { serializeGeoJson } from '@/shared/utils/serialize';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: ({ id, title }: TodoUpdateRequest) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo, onUpdateTodo }) => {
  return (
    <Container>
      {todos?.map((todo: Todo) => (
        <TodoListItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          location={
            todo.location?.name
              ? serializeGeoJson(todo.location.coordinates[0], todo.location.coordinates[1], todo.location.name)
              : undefined
          }
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </Container>
  );
};

export default TodoList;
