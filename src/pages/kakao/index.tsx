import Head from 'next/head';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as Sentry from '@sentry/nextjs';

import { sendAccessTokenToServerAndGetJWT } from '@/shared/utils/kakao';
import { toastError, toastSuccess } from '@/shared/utils/toast';
import { LOGIN_FAIL, LOGIN_SUCCESS } from '@/shared/constants/dialog';
import { Spinner } from '@/components/common';

const Kakao: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const data = {
      code,
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY,
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
    };

    const queryString = Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    (async () => {
      try {
        const response = await axios.post('https://kauth.kakao.com/oauth/token', queryString, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        });

        const jwtToken = await sendAccessTokenToServerAndGetJWT(response.data.access_token);
        document.cookie = 'token=' + jwtToken;

        if (jwtToken) {
          router.push('/inbox');
          toastSuccess(LOGIN_SUCCESS);
        }
      } catch (e) {
        router.push('/login');
        toastError(LOGIN_FAIL);

        Sentry.captureException(e);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>MOZI | 카카오 로그인</title>
      </Head>
      <Container>
        <Spinner />
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default Kakao;
