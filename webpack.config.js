const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  // src/index.tsx 파일을 진입점으로 설정
  // entry: path.resolve(__dirname, 'src/index.tsx'),
  entry: './src/index.tsx',
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ],
        exclude: /node_modules/,
      },
      // {
      //   // .ts, .tsx 파일들을 ts-loader를 이용해 컴파일하여 번들링
      //   test: /\.(ts|tsx)$/,
      //   exclude: /node_modules/,
      //   resolve: {
      //     extensions: ['.ts', '.tsx', '.js', '.json'],
      //   },
      //   use: 'ts-loader',
      // },
    ],
  },
  devServer: {
    historyApiFallback: true, // SPA를 위한 설정
    host: 'localhost',
    port: 3000,
    hot: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    // index.html에 번들링된 스크립트 파일과 스타일이 자동으로 연결
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
