import { Container } from './styles';

interface TodoListItemProps {
  title?: string;
  description?: string;
  done: boolean;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ title, description, done }) => {
  return (
    <Container>
      <div>{title}</div>
      <div>{description}</div>
      <div>{done}</div>
    </Container>
  );
};

export default TodoListItem;
