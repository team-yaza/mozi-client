const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    },
  }),
  nextConfig,
]);
