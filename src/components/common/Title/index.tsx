import { Container, Header, LogoContainer } from './styles';

export interface TitleProps {
  icon: React.ReactNode;
  title: string;
}

const Title: React.FC<TitleProps> = ({ icon, title }) => {
  return (
    <Container>
      <LogoContainer>{icon}</LogoContainer>
      <Header>{title}</Header>
    </Container>
  );
};

export default Title;
