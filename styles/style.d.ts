import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      black: string;
      white: string;
      sidebar: string;
      background: string;
    };
  }
}
