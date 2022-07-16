import { useMutation, useQueryClient } from 'react-query';

import { Container } from './styles';
import { Todo } from '@/shared/types/todo';
import { deleteTodo } from '@/shared/api/todoApi';

interface TodoListItemProps {
  todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  const queryClient = useQueryClient();
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todoList');
    },
    onError: () => {
      alert('todo 삭제 실패');
    },
  });

  return (
    <Container>
      <p>{todo.title}</p>
      <button onClick={() => deleteTodoMutation.mutate(todo._id)}>삭제</button>
    </Container>
  );
};

export default TodoListItem;
