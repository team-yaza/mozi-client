import { BOXARROWRIGHT, BOXPLUS, FOOTERCALENDAR, SEARCH } from '@/components/common/Figure';
import { Container, IconContainer, OptionsContainer } from './styles';

const Footer: React.FC = () => {
  return (
    <Container>
      <OptionsContainer>
        <IconContainer>
          <BOXPLUS />
        </IconContainer>
        <IconContainer>
          <FOOTERCALENDAR />
        </IconContainer>
        <IconContainer>
          <BOXARROWRIGHT />
        </IconContainer>
        <IconContainer>
          <SEARCH />
        </IconContainer>
      </OptionsContainer>
    </Container>
  );
};

export default Footer;
