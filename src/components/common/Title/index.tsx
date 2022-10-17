import { ActionButton, Container, Header, LogoContainer } from './styles';

export interface TitleProps {
  icon: React.ReactNode;
  title: string;
  actionText?: string;
}

const Title: React.FC<TitleProps> = ({ icon, title, actionText }) => (
  <Container>
    <LogoContainer>{icon}</LogoContainer>
    <Header>{title}</Header>
    {actionText && (
      <ActionButton size="medium" color="primary">
        {actionText}
      </ActionButton>
    )}
  </Container>
);

export default Title;
