import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      black: string;
      light_black: string;
      white: string;
      text: string;
      sidebar: string;
      sidebar_text: string;
      sidebar_text_focused: string;
      sidebar_line: string;
      todo_background: string;
      todo_checkbox: string;
      background: string;
      purple: string;
      header: string;
      grey: string;
      light_grey: string;
    };
    fonts: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      h6: string;
      body: string;
      subtitle1: string;
      caption1: string;
      caption2: string;
      btn1: string;
      btn2: string;
    };
  }
}
