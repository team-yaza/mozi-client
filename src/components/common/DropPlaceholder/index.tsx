import React from 'react';
import { ActionDialog, ActionIconContainer, ActionText, Container, DNDPlaceHolderContainer, Drop } from './styles';

export interface DropPlaceholderProps {
  children: React.ReactNode;
  isDragging: boolean;
  active: boolean;
  borderColor: string;
  backgroundColor: string;
  hoverColor: string;
  text: string;
  icon: React.ReactNode;
}

const DropPlaceholder = React.forwardRef<HTMLDivElement, DropPlaceholderProps>(
  ({ children, isDragging, active, borderColor, backgroundColor, hoverColor, text, icon }, ref) => {
    return (
      <Container>
        <Drop
          ref={ref}
          isDragging={isDragging}
          active={active}
          borderColor={borderColor}
          backgroundColor={backgroundColor}
          hoverColor={hoverColor}
        >
          <ActionDialog>
            <ActionIconContainer>{icon}</ActionIconContainer>
            <ActionText>{text}</ActionText>
          </ActionDialog>
        </Drop>
        <DNDPlaceHolderContainer>{children}</DNDPlaceHolderContainer>
      </Container>
    );
  }
);

export default DropPlaceholder;
