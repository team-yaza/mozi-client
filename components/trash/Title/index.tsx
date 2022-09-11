import { TRASH } from '@/components/common/Figure';
import { Container, EmptyButton, Header, LogoContainer } from './styles';

const Title: React.FC = () => {
  return (
    <Container>
      <LogoContainer>
        <TRASH focused />
      </LogoContainer>
      <Header>Trash</Header>
      <EmptyButton>Empty</EmptyButton>
    </Container>
  );
};

export default Title;
