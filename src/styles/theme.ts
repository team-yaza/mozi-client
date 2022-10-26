import { DefaultTheme } from 'styled-components';

export const theme = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    black1: '#2C2B31',
    black2: '#1E1C24',
    purple: '#735AFF',
    lightPurple: '#f4f2ff',
    main: '#775EFF',
    grey: '#E9E9E9',
    grey1: '#1f1f1f',
    grey2: '#272727',
    grey3: '#3b3a43',
    grey4: '#7f7f7f',
    grey5: '#a6a6a6',
    grey6: '#bfbfbf',
    grey7: '#585858',
    grey8: '#2C2B30',
    grey9: '#2a2a2a',
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
  boxSahdow: {
    light: '0.1rem 0.1rem 0.5rem 0.1rem #bdbdbd',
    dark: '0rem 1.2rem 1.7rem 0.2rem hsla(0, 0%, 0%, 0.14),0rem 0.5rem 2.2rem 0.4rem hsla(0, 0%, 0%, 0.12), 0rem 0.7rem 0.8rem -0.4rem hsla(0, 0%, 0%, 0.2)',
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
    sidebar_text_focused: theme.colors.purple,
    sidebar_right_border: theme.colors.grey,
    sidebar_line: '#eeeeee',
    sidebar_arrow_icon: theme.colors.grey9,
    sidebar_menu_background: theme.colors.lightPurple,
    logbook_background: theme.colors.white,
    todo_background: theme.colors.white,
    todo_checkbox: '#AEAEAE',
    todolistitem_box_shadow: theme.boxSahdow.light,
    background: theme.colors.white,
    purple: theme.colors.purple,
    header: theme.colors.white,
    footer: theme.colors.white,
    footer_stroke: theme.colors.black1,
    footer_border_top: theme.colors.grey,
    grey: '#eeeeee',
    light_grey: theme.colors.lightGrey,
  },
};

export const darkTheme: DefaultTheme = {
  color: {
    text: theme.colors.white,
    black: theme.colors.black,
    light_black: '#25232C',
    white: theme.colors.white,
    sidebar: '#2C2B30',
    sidebar_text: theme.colors.darkGrey,
    sidebar_text_focused: theme.colors.purple,
    sidebar_right_border: theme.colors.grey8,
    sidebar_line: '#434248',
    sidebar_arrow_icon: theme.colors.white,
    sidebar_menu_background: theme.colors.grey3,
    logbook_background: theme.colors.grey3,
    todo_background: '#25232C',
    todo_checkbox: '#797687',
    todolistitem_box_shadow: theme.boxSahdow.dark,
    background: theme.colors.black2,
    purple: theme.colors.purple,
    header: theme.colors.black2,
    footer: theme.colors.grey8,
    footer_stroke: theme.colors.darkGrey,
    footer_border_top: theme.colors.grey8,
    grey: '#eeeeee',
    light_grey: theme.colors.lightGrey,
  },
};
