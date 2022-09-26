import { TODAY } from '@/components/common/Figure';
import { Container, Header, LogoContainer } from './styles';

const Title: React.FC = () => {
  return (
    <Container>
      <LogoContainer>
        <TODAY focused />
      </LogoContainer>
      <Header>Today</Header>
    </Container>
  );
};

export default Title;
