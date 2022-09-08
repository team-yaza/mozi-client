import { TRASH } from '@/components/common/Figure';
import { Container, Header, LogoContainer } from './styles';

const Title: React.FC = () => {
  return (
    <Container>
      <LogoContainer>
        <TRASH focused />
      </LogoContainer>
      <Header>Trash</Header>
    </Container>
  );
};

export default Title;
