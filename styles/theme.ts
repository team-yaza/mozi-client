import { DefaultTheme } from 'styled-components';

export const theme = {
  colors: {
    white: '#ffffff',
    purple: '#735AFF',
    main: '#775EFF',
    black: '#000000',
    grey: '#E9E9E9',
    darkGrey: '#92909F',
    lightGrey: '#FEFEFE',
    kakao: '#FEE502',
  },
};

export const lightTheme: DefaultTheme = {
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

export const darkTheme: DefaultTheme = {
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
