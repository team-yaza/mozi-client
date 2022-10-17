import { Container } from './styles';
import Sidebar from '@/components/common/Sidebar';
import { useTodoListStatistics } from '@/hooks/apis/todo/useTodoListQuery';
import { useSideBar } from '@/hooks/useSideBar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { data: statistics } = useTodoListStatistics();
  const [isSideBarOpened, setIsSideBarOpened] = useSideBar();
  return (
    <Container>
      <Sidebar statistics={statistics} isSideBarOpened={isSideBarOpened} setIsSideBarOpened={setIsSideBarOpened} />
      {children}
    </Container>
  );
};

export default AppLayout;
