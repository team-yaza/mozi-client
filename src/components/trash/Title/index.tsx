import { TRASH } from '@/components/common/Figure';
import { Container, EmptyButton, Header, LogoContainer } from './styles';

interface TitleProps {
  onEmptyButtonClick: () => void;
}

const Title: React.FC<TitleProps> = ({ onEmptyButtonClick }) => {
  return (
    <Container>
      <LogoContainer>
        <TRASH focused />
      </LogoContainer>
      <Header>Trash</Header>
      <EmptyButton onClick={onEmptyButtonClick}>Empty</EmptyButton>
    </Container>
  );
};

export default Title;
