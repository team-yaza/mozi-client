import { Container } from './styles';
import Chip, { ChipProps } from '@/components/common/Chip';

interface ChipListProps {
  ChipChildren: Array<ChipProps>;
  align: 'column' | 'row';
}

const ChipList: React.FC<ChipListProps> = ({ ChipChildren, align }) => {
  return (
    <Container align={align}>
      {ChipChildren.map(({ type, backgroundColor, fontColor, Icon, content, onClickHandler, onDeleteHander }) => (
        <Chip
          key={`${type}${content}`}
          type={type}
          backgroundColor={backgroundColor}
          fontColor={fontColor}
          Icon={Icon}
          content={content}
          onClickHandler={onClickHandler}
          onDeleteHander={onDeleteHander}
        />
      ))}
    </Container>
  );
};

export default ChipList;
