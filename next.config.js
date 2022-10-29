const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = withPlugins([
  withPWA({
    pwa: {
      dest: 'public',
      register: true,
    },
  }),
  nextConfig,
]);
