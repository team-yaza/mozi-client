import Head from 'next/head';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import * as Sentry from '@sentry/nextjs';

import { NextPageWithLayout } from '@/pages/_app';
import { AppLayout, Title } from '@/components/common';
import Theme from '@/components/setting/Theme';
import { SETTING, GOOGLE } from '@/components/common/Figure';
import { LogoutButton } from '@/components/setting/LogoutButton';
import { deleteCookie, getCookie } from '@/shared/utils/cookie';
import { flexCenter } from '@/styles/utils';
import { toastError } from '@/shared/utils/toast';
import { GOOGLE_CALENDAR_SYNC_ERROR } from '@/shared/constants/dialog';

const Setting: NextPageWithLayout<{ setTheme: () => void }> = ({ setTheme }) => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('token');
    router.push('/login');
  };

  const onClickGoogleCalendar = async () => {
    const serverUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://mozi-server.com';

    try {
      const response = await axios.get(`${serverUrl}/api/v1/migrations/google/url`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });

      const { data: authUrl } = response;
      router.push(authUrl);
    } catch (error) {
      Sentry.captureException(error);
      toastError(GOOGLE_CALENDAR_SYNC_ERROR);
    }
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

  border: 0.1rem solid ${({ theme }) => theme.color.grey};
  border-radius: 0.5rem;

  color: black;
  background-color: white;

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
