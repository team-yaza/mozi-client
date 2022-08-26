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
      background: string;
      purple: string;
      header: string;
      grey: string;
      light_grey: string;
    };
  }
}
