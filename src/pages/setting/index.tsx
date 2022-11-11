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
import GOOGLE from '@/components/common/Figure/GOOGLE';
import { flexCenter } from '@/styles/utils';

const Setting: NextPageWithLayout<{ setTheme: () => void }> = ({ setTheme }) => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('token');
    router.push('/login');
  };

  const onClickGoogleCalendar = () => {
    router.push(process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL as string);
  };

  return (
    <>
      <Head>
        <title>MOZI | Setting</title>
      </Head>
      <Container>
        <Title title="Setting" icon={<SETTING />} />
        <Theme setTheme={setTheme} />

        <GoogleCalendarButton onClick={onClickGoogleCalendar}>
          <LogoContainer>
            <GOOGLE />
          </LogoContainer>
          <span>구글 캘린더 연동하기</span>
        </GoogleCalendarButton>

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

  display: flex;
  flex-direction: column;

  padding-top: 5.4rem;

  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.text};
  transition: background-color 0.3s, color 0.3s;
`;

const GoogleCalendarButton = styled.button`
  ${flexCenter};

  width: 20rem;
  height: 5rem;

  margin-inline: 4rem;
  margin-top: 2rem;
  padding-block: 1rem;

  background-color: white;
  border: 0.1rem solid ${({ theme }) => theme.color.grey};
  border-radius: 0.5rem;
  color: black;

  font-size: 1.6rem;

  cursor: pointer;
`;

const LogoContainer = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;

  margin-right: 1rem;
`;

export default Setting;
