import { Container } from './styles';
import { Todo, TodoUpdateRequest } from '@/shared/types/todo';
import { UpdateAlarmProps } from '@/shared/types/alarm';
import TodoListItem from '@/components/index/TodoListItem';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: ({ id, title }: TodoUpdateRequest) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateAlarm: ({ todoId }: UpdateAlarmProps) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo, onUpdateTodo, onUpdateAlarm }) => {
  return (
    <Container>
      {todos?.map((todo: Todo) => (
        <TodoListItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          longitude={todo.location?.coordinates[0]}
          latitude={todo.location?.coordinates[1]}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo}
          onUpdateAlarm={onUpdateAlarm}
        />
      ))}
    </Container>
  );
};

export default TodoList;
