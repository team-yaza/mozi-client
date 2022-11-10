import Head from 'next/head';
import { ReactElement } from 'react';
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

  const onClick = () => {
    router.push(
      'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&response_type=code&client_id=778822349637-83fhpnla1flrp9ir7ampppu1br7a2o0p.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fmigrations%2Fgoogle'
    );
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

        <button onClick={onClick}>구글 캘린더 ㅋ</button>
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
