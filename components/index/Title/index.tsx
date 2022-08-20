import React from 'react';
import { Container, AddTodoButton } from './styles';

interface HeaderProps {
  onCreate: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreate }) => {
  return (
    <Container>
      Inbox
      <AddTodoButton onClick={onCreate}>메모 추가</AddTodoButton>
    </Container>
  );
};

export default React.memo(Header);
