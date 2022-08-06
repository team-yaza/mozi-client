import React from 'react';
import { Container } from './styles';

interface HeaderProps {
  onCreate: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreate }) => {
  return (
    <Container>
      Inbox
      <button onClick={onCreate}>메모 추가</button>
    </Container>
  );
};

export default React.memo(Header);
