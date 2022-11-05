import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import Script from 'next/script';

import { APP_DESCRIPTION, APP_NAME, APP_TYPE, APP_URL, OG_IMAGE } from '@/shared/constants/application';
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
      <Html lang="ko">
        <SEO
          title={APP_NAME}
          description={APP_DESCRIPTION}
          customMetaTags={[
            {
              charset: 'utf-8',
            },
            {
              viewport: 'width=device-width, initial-scale=1',
            },
            {
              'application-name': APP_NAME,
            },
            {
              description: APP_DESCRIPTION,
            },
            {
              keywords: 'MOZI, 소프트웨어 마에스트로, 소마, 야자',
            },
            {
              'theme-color': theme.colors.purple,
            },
            {
              'apple-mobile-web-app-title': APP_NAME,
            },
            {
              'apple-mobile-web-app-capable': 'yes',
            },
            {
              'mobile-web-app-capable': 'yes',
            },
            {
              'apple-mobile-web-app-status-bar-style': theme.colors.purple,
            },
          ]}
          og={{
            title: APP_NAME,
            description: APP_DESCRIPTION,
            type: APP_TYPE,
            url: APP_URL,
            siteName: APP_NAME,
            image: OG_IMAGE,
          }}
        />
        {/* <link rel="shortcut icon" href="/favicon.svg" type="image/svg" /> */}
        {/* <link rel="manifest" href="/manifest.json" /> */}
        {/* <link rel="apple-touch-icon" href="/icon.png" />
          {/* <link rel="apple-touch-icon" href="/icon.png"></link> */}

        <link rel="manifest" href="/manifest.json" />

        <link
          rel="apple-touch-startup-image"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          href="/apple-launch-828x1792.png"
        />
        <Head>
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
