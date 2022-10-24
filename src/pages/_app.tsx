/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { ReactElement, ReactNode, useEffect, useState, useCallback, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { GlobalStyle } from '@/styles/globalStyle';
import { queryClient } from '@/shared/utils/queryClient';
import { darkTheme, lightTheme } from '@/styles/theme';
import { useRouter } from 'next/router';
import { getCookie } from '@/shared/utils/cookie';
import { useLocationRef } from '@/hooks/location/useLocationRef';
import { SENDLOCATION_INTERVAL } from '@/shared/constants/delay';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

function MyApp({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) {
  const [theme, setTheme] = useState('light');
  const [showDevtools, setShowDevtools] = useState(false);

  const router = useRouter();

  const { myLocationRef, updateCurrentPosition } = useLocationRef();

  useEffect(() => {
    const sendLocationInterval = setInterval(sendLocation, SENDLOCATION_INTERVAL);

    return () => {
      clearInterval(sendLocationInterval);
    };
  }, [myLocationRef]);

  const sendLocation = useCallback(() => {
    if (!navigator.serviceWorker.controller || !myLocationRef.current) return;

    updateCurrentPosition();

    navigator.serviceWorker.controller.postMessage({
      type: 'SET_INTERVAL',
      latitude: myLocationRef.current.latitude,
      longitude: myLocationRef.current.longitude,
    });
  }, [myLocationRef]);

  useEffect(() => {
    const token = getCookie('token');
    if (!token) router.push('/login');
  }, [getCookie, router]);

  useEffect(() => {
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>MOZI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            {getLayout(<Component {...pageProps} setTheme={setTheme} />)}
          </ThemeProvider>
        </RecoilRoot>

        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        {showDevtools && (
          <Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </Suspense>
        )}
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
