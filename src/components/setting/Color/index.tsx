import { Container, ColorBox, ColorName } from './styles';

interface ColorProps {
  color: string;
  colorName: string;
  setTheme: (color: string) => void;
}

const Color: React.FC<ColorProps> = ({ color, colorName, setTheme }) => {
  const onClickColorHandler = () => {
    if (colorName === 'White') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <Container onClick={onClickColorHandler}>
      <ColorBox color={color} />
      <ColorName>{colorName}</ColorName>
    </Container>
  );
};

export default Color;
