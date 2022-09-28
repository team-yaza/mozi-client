import { Container, Content, IconContainer, DeleteBtn, Wrapper } from './styles';
import { DELETE } from '@/components/common/Figure';
import { useCallback, useState } from 'react';

export interface ChipProps {
  type: 'location' | 'date' | 'deadline' | 'tag';
  backgroundColor: string;
  fontColor: string;
  Icon: React.ReactNode;
  Modal?: React.ReactNode;
  isModalOpen?: boolean;
  content: string;
  onClickHandler?: () => void;
  onDeleteHander?: () => void;
}

const Chip: React.FC<ChipProps> = ({
  backgroundColor,
  fontColor,
  Icon,
  Modal,
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
        <IconContainer>{Icon}</IconContainer>
        <Content fontColor={fontColor}>{content}</Content>
        {focused && (
          <DeleteBtn onClick={onDeleteHander}>
            <DELETE />
          </DeleteBtn>
        )}
      </Container>
      {Modal}
    </Wrapper>
  );
};

export default Chip;
