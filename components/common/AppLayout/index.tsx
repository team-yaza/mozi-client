import { useSetRecoilState } from 'recoil';

import { Container } from './styles';
import Sidebar from '@/components/common/Sidebar';
import { sideBarStateAtom } from '@/store/sidebar/atom';

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
