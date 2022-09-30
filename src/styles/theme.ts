import { DefaultTheme } from 'styled-components';

export const theme = {
  colors: {
    white: '#ffffff',
    purple: '#735AFF',
    main: '#775EFF',
    black: '#000000',
    grey: '#E9E9E9',
    grey1: '#1f1f1f',
    grey2: '#272727',
    grey3: '#3a3a3b',
    grey4: '#7f7f7f',
    grey5: '#a6a6a6',
    grey6: '#bfbfbf',
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

export const lightTheme: Omit<DefaultTheme, 'fonts'> = {
  color: {
    text: theme.colors.black,
    black: '#ffffff',
    light_black: '#ffffff',
    white: '#000000',
    sidebar: '#ffffff',
    sidebar_text: '#585858',
    sidebar_text_focused: '#735AFF',
    sidebar_line: '#eeeeee',
    todo_background: theme.colors.white,
    todo_checkbox: '#AEAEAE',
    background: '#ffffff',
    purple: '#735AFF',
    header: '#ffffff',
    grey: '#eeeeee',
    light_grey: '#fefefe',
  },
};

export const darkTheme: Omit<DefaultTheme, 'fonts'> = {
  color: {
    text: theme.colors.white,
    black: '#000000',
    light_black: '#25232C',
    white: '#ffffff',
    sidebar: '#2C2B30',
    sidebar_text: '#ffffff',
    sidebar_text_focused: '#735AFF',
    sidebar_line: '#434248',
    todo_background: '#25232C',
    todo_checkbox: '#797687',
    background: '#1E1C24',
    purple: '#735AFF',
    header: '#2C2B30',
    grey: '#eeeeee',
    light_grey: '#fefefe',
  },
};
