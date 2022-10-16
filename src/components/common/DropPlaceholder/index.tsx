import { ActionDialog, ActionIconContainer, ActionText, Container, Drop } from './styles';

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

const DropPlaceholder: React.FC<DropPlaceholderProps> = ({
  children,
  isDragging,
  active,
  borderColor,
  backgroundColor,
  hoverColor,
  text,
  icon,
}) => {
  return (
    <Container>
      <Drop
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
      {children}
    </Container>
  );
};

export default DropPlaceholder;
