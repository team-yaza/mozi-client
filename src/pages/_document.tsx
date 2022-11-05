import React from 'react';
import Script from 'next/script';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { APP_AUTHOR, APP_DESCRIPTION, APP_KEYWORDS, APP_NAME } from '@/shared/constants/application';
import { theme } from '@/styles/theme';

// import { SEO } from '@/components/common/index';

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
        <Head>
          <meta charSet="utf-8" />
          <meta property="keywords" content={APP_KEYWORDS} />
          <meta name="author" content={APP_AUTHOR} />
          <meta name="theme-color" content={theme.colors.purple} />
          <meta name="description" content={APP_DESCRIPTION} />
          {/* 주소줄 없애기(안드로이드) */}
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="application-name" content={APP_NAME} />
          {/* Apple */}
          {/* 주소창 등의 웹 브라우저 UI를 표시하지 않음 */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          {/* 상태바의 스타일 지정 */}
          <meta name="apple-mobile-web-app-status-bar-style" content={theme.colors.purple} />
          {/* 홈화면에서 표시되는 앱 이름을 지정 */}
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          {/* 홈화면에 표시되는 앱 아이콘 지정 */}
          <link rel="apple-touch-icon" sizes="192x192" href="/apple-icon-192x192.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />

          <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
          <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />

          <link
            rel="apple-touch-startup-image"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
            href="/apple-launch-828x1792.png"
          />

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
