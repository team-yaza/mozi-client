import React, { useState } from 'react';
import { Container, Content, IconContainer, DeleteButton, Wrapper } from './styles';
import { DELETE } from '@/components/common/Figure';

export interface ChipProps {
  type: 'location' | 'date' | 'deadline' | 'tag';
  icon: React.ReactNode;
  Modal?: React.ReactNode;
  isModalOpen?: boolean;
  content: string;
  onClickHandler?: () => void;
  onDeleteHander?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Chip: React.FC<ChipProps> = ({ icon, Modal, content, onClickHandler, onDeleteHander }) => {
  const [focused, setFocused] = useState<boolean>(false);

  const onChipClicked = () => {
    setFocused((oldState) => !oldState);
    if (onClickHandler != undefined) onClickHandler();
  };

  return (
    <Wrapper>
      <Container onClick={onChipClicked}>
        <IconContainer>{icon}</IconContainer>
        <Content>{content}</Content>
        {focused && (
          <DeleteButton onClick={onDeleteHander}>
            <DELETE />
          </DeleteButton>
        )}
      </Container>
      {Modal}
    </Wrapper>
  );
};

export default Chip;
