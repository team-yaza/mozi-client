import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import Script from 'next/script';

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
          <React.Fragment key={'key'}>
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
        <Head>
          <meta charSet="utf-8" />
          {/* <link rel="shortcut icon" href="/favicon.svg" type="image/svg" /> */}
          {/* <link rel="manifest" href="/manifest.json" /> */}
          {/* <link rel="apple-touch-icon" href="/icon.png" />
          <meta name="theme-color" content="#fff" /> */}
          <meta property="og:title" content="" />
          <meta property="og:image" content="" />
          <meta property="og:description" content="" />
          <meta property="og:url" content="/" />
          <meta name="description" content="" />
          <meta name="keywords" content="" />
          <Script strategy="beforeInteractive" src="https://developers.kakao.com/sdk/js/kakao.min.js" />
          <Script
            strategy="beforeInteractive"
            src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
