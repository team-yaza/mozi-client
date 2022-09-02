import { Container, Content, Icon, DeleteBtn, Wrapper } from './styles';
import DELETE from '@/components/common/Figure/DELETE';
import { useCallback, useState } from 'react';

export interface ChipProps {
  type: 'location' | 'date' | 'deadline' | 'tag';
  backgroundColor: string;
  fontColor: string;
  children: React.ReactNode;
  content: string;
  onClickHandler?: () => void;
  onDeleteHander?: () => void;
}

const Chip: React.FC<ChipProps> = ({
  backgroundColor,
  fontColor,
  children,
  content,
  onClickHandler,
  onDeleteHander,
}) => {
  const [focused, setFocused] = useState<boolean>(false);

  const onChipClicked = useCallback(() => {
    setFocused((oldState) => !oldState);
    if (onClickHandler != undefined) onClickHandler();
  }, [onClickHandler]);

  return (
    <Wrapper>
      <Container backgroundColor={backgroundColor} onClick={onChipClicked}>
        <Icon>{children}</Icon>
        <Content fontColor={fontColor}>{content}</Content>
        {focused && (
          <DeleteBtn onClick={onDeleteHander}>
            <DELETE />
          </DeleteBtn>
        )}
      </Container>
    </Wrapper>
  );
};

export default Chip;
