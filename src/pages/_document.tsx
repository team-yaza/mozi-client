import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import Script from 'next/script';

import { APP_DESCRIPTION, APP_NAME } from '@/shared/constants/application';
import { theme } from '@/styles/theme';
import { SEO } from '@/components/common/index';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="key">
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <SEO
          title={APP_NAME}
          description={APP_DESCRIPTION}
          customMetaTags={[
            {
              'application-name': APP_NAME,
            },
            {
              description: APP_DESCRIPTION,
            },
            {
              'theme-color': theme.colors.purple,
            },
            {
              'apple-mobile-web-app-title': APP_NAME,
            },
          ]}
          og={{
            title: APP_NAME,
            description: APP_DESCRIPTION,
          }}
        />
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* <link rel="shortcut icon" href="/favicon.svg" type="image/svg" /> */}
          {/* <link rel="manifest" href="/manifest.json" /> */}
          {/* <link rel="apple-touch-icon" href="/icon.png" />
          {/* <link rel="apple-touch-icon" href="/icon.png"></link> */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="mobile-web-app-capable" content="yes" />

          <meta property="og:image" content="" />
          <meta property="og:url" content="/" />
          <meta name="keywords" content="" />
          <link rel="manifest" href="/manifest.json" />
          <Script strategy="beforeInteractive" src="https://developers.kakao.com/sdk/js/kakao.min.js" />
          <Script
            strategy="beforeInteractive"
            src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
          />
        </Head>
        <body>
          <Main />
          <div id="modal-root" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
