import { LOGBOOK } from '@/components/common/Figure';
import { Container, Header, LogoContainer } from './styles';

const Title: React.FC = () => {
  return (
    <Container>
      <LogoContainer>
        <LOGBOOK focused />
      </LogoContainer>
      <Header>Logbook</Header>
    </Container>
  );
};

export default Title;
