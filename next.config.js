const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: true,
  // ! next에서 캐싱하는 다른 방법 HTTP Cache
  // async headers() {
  //   return [
  //     {
  //       source: '/:all*(svg|jpg|png)',
  //       locale: false,
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=9999999999, must-revalidate',
  //         },
  //       ],
  //     },
  //   ];
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/openapi/:path*',
  //       destination: 'https://openapi.map.naver.com/:path*',
  //     },
  //   ];
  // },
  // pageExtensions: ['page.tsx', 'page.tx'],
};

module.exports = withPlugins([
  withPWA({
    pwa: {
      dest: 'public',
      register: true,
      fallbacks: {
        document: '/_offline',
      },
    },
  }),
  nextConfig,
]);
