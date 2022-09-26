import { Container } from './styles';
import Sidebar from '@/components/common/Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Container>
      <Sidebar />
      {children}
    </Container>
  );
};

export default AppLayout;
