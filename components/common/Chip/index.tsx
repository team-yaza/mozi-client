import { Container, Content, Icon, DeleteBtn } from './styles';
import DELETE from '@/components/common/Figure/DELETE';

interface ChipProps {
  backgroundColor: string;
  fontColor: string;
  children: React.ReactNode;
  content: string;
  onFocused: boolean;
}

const Chip: React.FC<ChipProps> = ({ backgroundColor, fontColor, children, content, onFocused }) => {
  return (
    <Container backgroundColor={backgroundColor}>
      <Icon>{children}</Icon>
      <Content fontColor={fontColor}>{content}</Content>
      {onFocused ? (
        <DeleteBtn>
          <DELETE />
        </DeleteBtn>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Chip;
