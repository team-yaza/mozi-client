/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement, ReactNode, useEffect, useState, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';
import styled, { ThemeProvider } from 'styled-components';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import * as Sentry from '@sentry/nextjs';

import { GlobalStyle } from '@/styles/globalStyle';
import { queryClient } from '@/shared/utils/queryClient';
import { darkTheme, lightTheme } from '@/styles/theme';
import { getCookie } from '@/shared/utils/cookie';
// import { Location } from '@/shared/types/location';
// import { trackCurrentPosition } from '@/shared/utils/location';
// import { CHECK_ALARM } from '@/shared/constants/serviceWorker';
// import { sendMessageToServiceWorker } from '@/shared/utils/serviceWorker';
// import { CHECK_ALARM_INTERVAL } from '@/shared/constants/delay';
// import { GET_LOCATION_ERROR } from '@/shared/constants/dialog';

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
  // const [userPosition, setUserPosition] = useState<Location>();

  const router = useRouter();

  // const checkAlarm = () => {
  //   sendMessageToServiceWorker({
  //     type: CHECK_ALARM,
  //     latitude: userPosition.latitude,
  //     longitude: userPosition.longitude,
  //   });
  // };

  // const setIntervalMinute = (interval: number) => {
  //   // if (!userPositionRef.current) return;
  //   const now = new Date();
  //   const delay = interval - (now.getTime() % interval);

  //   const start = () => {
  //     console.log('interval start');
  //     checkAlarm();
  //     setInterval(checkAlarm, interval);
  //   };

  //   setTimeout(start, delay);
  // };

  // useEffect(() => {
  //   const getLocationSuccessCallback = (position: GeolocationPosition) => {
  //     setUserPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
  //   };
  //   const getLocationErrorCallback = (positionError: GeolocationPositionError) => {
  //     if (positionError.PERMISSION_DENIED) {
  //       // 나중에 여기서 브라우저ㅓ권한달라고 요청
  //       return;
  //     }

  //     Sentry.captureException(positionError);
  //     // trackCurrentPosition(getLocationSuccessCallback, getLocationErrorCallback);
  //   };

  //   trackCurrentPosition(getLocationSuccessCallback, getLocationErrorCallback);
  // }, [setUserPosition, trackCurrentPosition]);

  // useEffect(() => {
  //   if (!userPosition || !navigator.serviceWorker.controller) return;
  //   console.log('location check');
  //   checkAlarm();
  //   userPositionRef.current.longitude = userPosition.longitude;
  //   userPositionRef.current.latitude = userPosition.latitude;
  // }, [userPosition]);

  // useEffect(() => {
  //   setIntervalMinute(CHECK_ALARM_INTERVAL);
  // }, []);

  useEffect(() => {
    const token = getCookie('token');
    if (!token) router.push('/');
  }, []);

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

        <ToggleButton
          onClick={() => {
            if (theme === 'light') {
              setTheme('dark');
            } else {
              setTheme('light');
            }
          }}
        />

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

const ToggleButton = styled.div`
  position: absolute;

  left: 2rem;
  bottom: 2rem;

  width: 5rem;
  height: 5rem;

  border-radius: 50%;

  background-color: purple;
`;
