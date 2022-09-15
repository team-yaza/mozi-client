import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

import { sendAccessTokenToServerAndGetJWT } from '@/shared/utils/kakao';
import Spinner from '@/components/common/Spinner';

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

        if (jwtToken) router.push('/');
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

const Container = styled.div``;

export default Kakao;
