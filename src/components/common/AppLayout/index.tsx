import { Container } from './styles';
import Sidebar from '@/components/common/Sidebar';
import { useTodoListStatistics } from '@/hooks/apis/todo/useTodoListQuery';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { data: statistics } = useTodoListStatistics();

  return (
    <Container>
      <Sidebar statistics={statistics} />
      {children}
    </Container>
  );
};

export default AppLayout;
