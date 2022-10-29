const { withSentryConfig } = require('@sentry/nextjs');
const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

const moduleExports = {
  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(
  withPlugins([
    withPWA({
      pwa: {
        dest: 'public',
        register: true,
      },
    }),
    nextConfig,
  ]),
  moduleExports,
  sentryWebpackPluginOptions
);
