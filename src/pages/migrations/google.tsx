import { Spinner } from '@/components/common/index';
import { getCookie } from '@/shared/utils/cookie';
import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

const Google: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const serverUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://mozi-server.com';

    (async () => {
      await axios.get(`${serverUrl}/api/v1/migrations/google?code=${code}`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });

      router.push('/setting');
    })();
  }, []);

  return (
    <>
      <Head>
        <title>MOZI | 구글 캘린더</title>
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

export default Google;
