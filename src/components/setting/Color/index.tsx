import { Container, ColorBox, ColorName } from './styles';

interface ColorProps {
  color: string;
  colorName: string;
}

const Color: React.FC<ColorProps> = ({ color, colorName }) => {
  return (
    <Container>
      <ColorBox color={color} />
      <ColorName>{colorName}</ColorName>
    </Container>
  );
};

export default Color;
