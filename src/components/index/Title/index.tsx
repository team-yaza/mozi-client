import React from 'react';
import { INBOX } from '@/components/common/Figure';
import { Container, AddTodoButton, Header, LogoContainer } from './styles';

interface TitleProps {
  onCreate: () => void;
}

const Title: React.FC<TitleProps> = ({ onCreate }) => {
  return (
    <Container>
      <Header>
        <LogoContainer>
          <INBOX focused />
        </LogoContainer>
        <span>Inbox</span>
      </Header>
      <AddTodoButton onClick={onCreate}>할 일 추가</AddTodoButton>
    </Container>
  );
};

export default React.memo(Title);
