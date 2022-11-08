import { ActionButton, Container, Header, LogoContainer } from './styles';

export interface TitleProps {
  icon: React.ReactNode;
  title: string;
  actionText?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ icon, title, actionText, onClick, children }) => (
  <Container>
    <LogoContainer>{icon}</LogoContainer>
    <Header>{title}</Header>
    {actionText && (
      <ActionButton size="medium" color="primary" onClick={onClick}>
        {actionText}
      </ActionButton>
    )}
    {children}
  </Container>
);

export default Title;
