import Color from '../Color/index';
import { ColorContainer, Container, ThemeHeader } from './styles';

interface ThemeProps {
  setTheme: () => void;
}

const Theme: React.FC<ThemeProps> = ({ setTheme }) => {
  return (
    <Container>
      <ThemeHeader>테마 변경</ThemeHeader>
      <ColorContainer>
        <Color color="#ffffff" colorName="White" setTheme={setTheme} />
        <Color color="#000000" colorName="Black" setTheme={setTheme} />
      </ColorContainer>
    </Container>
  );
};

export default Theme;
