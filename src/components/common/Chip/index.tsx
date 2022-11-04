import { Container, Content, IconContainer, DeleteBtn, Wrapper } from './styles';
import { DELETE } from '@/components/common/Figure';
import React, { useState } from 'react';

export interface ChipProps {
  type: 'location' | 'date' | 'deadline' | 'tag';
  backgroundColor: string;
  fontColor: string;
  icon: React.ReactNode;
  Modal?: React.ReactNode;
  isModalOpen?: boolean;
  content: string;
  onClickHandler?: () => void;
  onDeleteHander?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Chip: React.FC<ChipProps> = ({
  backgroundColor,
  fontColor,
  icon,
  Modal,
  content,
  onClickHandler,
  onDeleteHander,
}) => {
  const [focused, setFocused] = useState<boolean>(false);

  const onChipClicked = () => {
    setFocused((oldState) => !oldState);
    if (onClickHandler != undefined) onClickHandler();
  };

  return (
    <Wrapper>
      <Container backgroundColor={backgroundColor} onClick={onChipClicked}>
        <IconContainer>{icon}</IconContainer>
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
