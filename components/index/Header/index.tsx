import { Container } from './styles';

interface TodoSubmitFormProps {
  onSubmit: () => void;
}

const Header: React.FC<TodoSubmitFormProps> = ({ onSubmit }) => {
  return (
    <Container>
      Inbox
      <button onClick={onSubmit}>메모 추가</button>
    </Container>
  );
};

export default Header;
