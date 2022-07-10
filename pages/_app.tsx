import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyle } from 'styles/globalStyle';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { queryClient } from '@/shared/utils/queryClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MOZI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
