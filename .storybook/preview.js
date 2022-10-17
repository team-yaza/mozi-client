import { ThemeProvider } from 'styled-components';
// import { addDecorator } from '@storybook/react';
// import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { useDarkMode } from 'storybook-dark-mode';

import { darkTheme, lightTheme } from '../src/styles/theme';
import { GlobalStyle } from '../src/styles/globalStyle';

export const decorators = [
  (story) => (
    <ThemeProvider theme={useDarkMode() ? darkTheme : lightTheme}>
      <GlobalStyle />
      {story()}
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

  nextRouter: {
    Provider: RouterContext.Provider,
    path: '/', // defaults to `/`
    asPath: '/', // defaults to `/`
    query: {}, // defaults to `{}`
    push() {}, // defaults to using addon actions integration,
  },

  darkMode: {
    current: 'light',
  },
};
