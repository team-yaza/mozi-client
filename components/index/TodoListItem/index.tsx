import { useMutation, useQueryClient } from 'react-query';

import { Container, DeleteButton, Title } from './styles';
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
      <Title>{todo.title}</Title>
      <DeleteButton onClick={() => deleteTodoMutation.mutate(todo._id)}>삭제</DeleteButton>
    </Container>
  );
};

export default TodoListItem;
