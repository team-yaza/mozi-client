import Color from '../Color/index';
import { ColorContainer, Container, ThemeHeader } from './styles';

const Theme: React.FC = () => {
  return (
    <Container>
      <ThemeHeader>테마 변경</ThemeHeader>
      <ColorContainer>
        <Color color="#ffffff" colorName="White" />
        <Color color="#000000" colorName="Black" />
      </ColorContainer>
    </Container>
  );
};

export default Theme;
