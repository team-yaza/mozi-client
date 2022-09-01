import { Container } from './styles';
import Chip, { ChipProps } from './Chip';

interface ChipListProps {
  ChipChildren: Array<ChipProps>;
  align: 'column' | 'row';
}

const ChipList: React.FC<ChipListProps> = ({ ChipChildren, align }) => {
  return (
    <Container align={align}>
      {ChipChildren.map(({ type, backgroundColor, fontColor, children, content, onFocused }) => (
        <Chip
          type={type}
          backgroundColor={backgroundColor}
          fontColor={fontColor}
          children={children}
          content={content}
          onFocused={onFocused}
        />
      ))}
    </Container>
  );
};

export default ChipList;
