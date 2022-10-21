import { ReactElement } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { NextPageWithLayout } from '@/pages/_app';
import { AppLayout } from '@/components/common';
import Title from '@/components/setting/Title';
import Theme from '@/components/setting/Theme';
import { LogoutButton } from '@/components/setting/LogoutButton';
import { deleteCookie } from '@/shared/utils/cookie';

const Setting: NextPageWithLayout<{ setTheme: () => void }> = ({ setTheme }) => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('token');
    router.push('/login');
  };

  return (
    <Container>
      <Title />
      <Theme setTheme={setTheme} />
      <LogoutButton color="alert" size="medium" onClick={handleLogout}>
        로그아웃
      </LogoutButton>
    </Container>
  );
};

Setting.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

export default Setting;
