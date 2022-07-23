import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    font-size: 62.5%;
  }

  #__next {
    width: 100vw;
    height: 100vh;
  }
`;
