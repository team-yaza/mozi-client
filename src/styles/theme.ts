import { DefaultTheme } from 'styled-components';

export const theme = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    purple: '#735AFF',
    main: '#775EFF',
    grey: '#E9E9E9',
    grey1: '#1f1f1f',
    grey2: '#272727',
    grey3: '#3a3a3b',
    grey4: '#7f7f7f',
    grey5: '#a6a6a6',
    grey6: '#bfbfbf',
    grey7: '#585858',
    grey8: '#2C2B30',
    darkGrey: '#92909F',
    lightGrey: '#FEFEFE',
    kakao: '#FEE502',
  },
  fonts: {
    h1: `
    font-size: 2.4rem;
    font-weight: bold;
  `,
    h2: `
    font-size: 2rem;
    font-weight: bold;
  `,
    h3: `
    font-size: 1.8rem;
    font-weight: bold;
  `,
    h4: `
    font-size: 1.6rem;
    font-weight: 500;
  `,
    h5: `
    font-size: 1.4rem;
    font-weight: bold;
  `,
    h6: `
    font-size: 1.4rem;
    font-weight: 500;
  `,
    subtitle1: `
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 144%;
  `,
    body: `
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 170%;
  `,
    caption1: `
    font-size: 1.2rem;
    font-weight: 500;
  `,
    caption2: `
    font-size: 1.2rem;
    font-weight: bold;
  `,
    btn1: `
    font-size: 1.6rem;
    font-weight: bold;
    line-height: 1.8rem;
  `,
    btn2: `
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.6rem;
  `,
  },
};

export const lightTheme: DefaultTheme = {
  color: {
    text: theme.colors.black,
    black: theme.colors.white,
    light_black: theme.colors.black,
    white: theme.colors.black,
    sidebar: theme.colors.white,
    sidebar_text: theme.colors.grey7,
    sidebar_text_focused: '#735AFF',
    sidebar_line: '#eeeeee',
    todo_background: theme.colors.white,
    todo_checkbox: '#AEAEAE',
    background: theme.colors.white,
    purple: '#735AFF',
    header: theme.colors.white,
    footer: theme.colors.white,
    grey: '#eeeeee',
    light_grey: '#fefefe',
  },
};

export const darkTheme: DefaultTheme = {
  color: {
    text: theme.colors.white,
    black: theme.colors.black,
    light_black: '#25232C',
    white: theme.colors.white,
    sidebar: '#2C2B30',
    sidebar_text: theme.colors.white,
    sidebar_text_focused: '#735AFF',
    sidebar_line: '#434248',
    todo_background: '#25232C',
    todo_checkbox: '#797687',
    background: '#1E1C24',
    purple: '#735AFF',
    header: theme.colors.grey8,
    footer: theme.colors.grey8,
    grey: '#eeeeee',
    light_grey: '#fefefe',
  },
};
