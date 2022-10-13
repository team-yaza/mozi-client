import { UPCOMING } from '@/components/common/Figure';
import { Container, Header, LogoContainer } from './styles';

const Title: React.FC = () => {
  return (
    <Container>
      <LogoContainer>
        <UPCOMING focused />
      </LogoContainer>
      <Header>Upcoming</Header>
    </Container>
  );
};

export default Title;
