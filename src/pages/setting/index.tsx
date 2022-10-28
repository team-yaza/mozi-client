import { ReactElement } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { NextPageWithLayout } from '@/pages/_app';
import { AppLayout, Title } from '@/components/common';
import Theme from '@/components/setting/Theme';
import { SETTING } from '@/components/common/Figure';
import { LogoutButton } from '@/components/setting/LogoutButton';
import { deleteCookie } from '@/shared/utils/cookie';

const Setting: NextPageWithLayout<{ setTheme: () => void }> = ({ setTheme }) => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('token');
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>MOZI | Setting</title>
      </Head>
      <Container>
        <Title title="Setting" icon={<SETTING />} />
        <Theme setTheme={setTheme} />
        <LogoutButton color="alert" size="medium" onClick={handleLogout}>
          로그아웃
        </LogoutButton>
      </Container>
    </>
  );
};

Setting.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;

  padding-top: 5.4rem;

  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text};
  transition: background-color 0.3s, color 0.3s;
`;

export default Setting;
