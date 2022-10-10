import { SETTING } from '@/components/common/Figure';
import { theme } from '@/styles/theme';
import { Container, Header, LogoContainer } from './styles';

const Title: React.FC = () => {
  return (
    <Container>
      <LogoContainer>
        <SETTING width="30" height="30" stroke={theme.colors.purple} />
      </LogoContainer>
      <Header>Setting</Header>
    </Container>
  );
};

export default Title;
