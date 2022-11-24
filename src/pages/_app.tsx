/* eslint-disable @typescript-eslint/ban-types */
import Head from 'next/head';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { ReactElement, ReactNode, useEffect, useState, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  // styled,
  ThemeProvider,
} from 'styled-components';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { GlobalStyle } from '@/styles/globalStyle';
import { queryClient } from '@/shared/utils/queryClient';
import { darkTheme, lightTheme } from '@/styles/theme';
import { getCookie } from '@/shared/utils/cookie';
import {
  APP_NAME,
  APP_DESCRIPTION,
  OG_IMAGE,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  OG_LOCALE,
} from '@/shared/constants/application';
import { trackCurrentPosition } from '@/shared/utils/location';
import { sendMessageToServiceWorker } from '@/shared/utils/serviceWorker';
import { Location } from '@/shared/types/location';
import { UPDATE_LOCATION } from '@/shared/constants/serviceWorker';

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
  const [userPosition, setUserPosition] = useState<Location>();

  const router = useRouter();

  const updateLocation = () => {
    sendMessageToServiceWorker({
      type: UPDATE_LOCATION,
      latitude: userPosition?.latitude,
      longitude: userPosition?.longitude,
    });
  };

  useEffect(() => {
    const getLocationSuccessCallback = (position: GeolocationPosition) => {
      setUserPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    };
    const getLocationErrorCallback = (positionError: GeolocationPositionError) => {
      if (positionError.PERMISSION_DENIED) {
        return;
      }

      // Sentry.captureException(positionError);
      trackCurrentPosition(getLocationSuccessCallback, getLocationErrorCallback);
    };

    trackCurrentPosition(getLocationSuccessCallback, getLocationErrorCallback);
  }, [userPosition, setUserPosition, trackCurrentPosition]);

  useEffect(() => {
    if (!userPosition || !navigator.serviceWorker.controller) return;
    updateLocation();
  }, [userPosition]);

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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <title>{APP_NAME}</title>
        <meta property="og:description" content={APP_DESCRIPTION} />
        <meta property="og:locale" content={OG_LOCALE} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:alt" content={APP_NAME} />
        <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
        <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      </Head>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
          {getLayout(<Component {...pageProps} setTheme={setTheme} />)}
        </ThemeProvider>
        {/* <ToggleButton
          onClick={() => {
            if (theme === 'light') {
              setTheme('dark');
            } else {
              setTheme('light');
            }
          }}
        /> */}

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

// const ToggleButton = styled.div`
//   position: absolute;

//   left: 2rem;
//   bottom: 2rem;

//   width: 5rem;
//   height: 5rem;

//   border-radius: 50%;

//   background-color: purple;
// `;
