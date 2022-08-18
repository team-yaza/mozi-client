import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useState, useCallback, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import styled, { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '@/styles/globalStyle';
import { queryClient } from '@/shared/utils/queryClient';
import { darkTheme, lightTheme } from '@/styles/theme';
import AppLayout from '@/components/common/AppLayout';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('light');

  const handleTheme = useCallback(() => {
    if (theme === 'dark') setTheme('light');
    else setTheme('dark');
  }, [theme]);

  return (
    <>
      <Head>
        <title>MOZI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
      </Head>
      <Script
        defer
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
      ></Script>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <AppLayout>
              <Suspense fallback={<div>Loading</div>}>
                <Component {...pageProps} />
              </Suspense>
            </AppLayout>
            <ModeButton onClick={handleTheme} />
          </ThemeProvider>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

const ModeButton = styled.div`
  position: absolute;
  width: 5rem;
  height: 5rem;

  bottom: 2rem;
  left: 2rem;

  background-color: blue;
  border-radius: 50%;

  cursor: pointer;
`;

export default MyApp;
