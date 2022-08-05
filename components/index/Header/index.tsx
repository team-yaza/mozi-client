import { Container } from './styles';

interface TodoSubmitFormProps {
  onCreate: () => void;
}

const Header: React.FC<TodoSubmitFormProps> = ({ onCreate }) => {
  return (
    <Container>
      Inbox
      <button onClick={onCreate}>메모 추가</button>
    </Container>
  );
};

export default Header;
