import { Todo } from '@/shared/types/todo';

interface TodoListProps {
  todoList: Todo[];
  onDeleteTodo: (todoId: string) => Promise<void>;
}

const TodoList: React.FC<TodoListProps> = ({ todoList, onDeleteTodo }) => {
  return (
    <>
      {todoList?.map((todo: Todo) => (
        <div key={todo._id}>
          <p>{todo.title}</p>
          <button onClick={() => onDeleteTodo(todo._id)}>삭제</button>
        </div>
      ))}
    </>
  );
};

export default TodoList;
