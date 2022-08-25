const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [new TsconfigPathsPlugin({})],
        alias: {
          ...config.resolve.alias,
        },
      },
    };
  },
};
