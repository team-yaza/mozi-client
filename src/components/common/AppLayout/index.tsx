import Sidebar from '@/components/common/Sidebar';
import { useTodoListStatistics } from '@/hooks/apis/todo/useTodoListQuery';
import { PropsWithChildren } from 'react';
import { Container } from './styles';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: statistics } = useTodoListStatistics();
  console.log(statistics, '?');

  return (
    <Container>
      <Sidebar statistics={statistics} />
      {children}
    </Container>
  );
};

export default AppLayout;
