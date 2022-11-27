import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
  margin: 0;
  padding: 0;
  font: inherit;
  color: inherit;
  }

  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  html,
  body {
    position: relative;
    height: 100%;
    font-size: 62.5%;
    font-family:  -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI',
      'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', Oxygen-Sans, Ubuntu, Cantarell, sans-serif;
    letter-spacing: -0.01rem;
  }

  #__next {
    width: 100vw;
    height: 100vh;
  }

  a {
  text-decoration: none;
  }

  table {
  border-collapse: collapse;
  border-spacing: 0;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  .marker {
    white-space: nowrap;
    position: relative;
    display: flex;
    padding: 1.1rem 1.6rem 1.2rem;
    background-color: white;
    border-radius: 0.99rem;
    border: 0.12rem solid ${theme.colors.purple};
    font-weight: 600;
    font-size: 1.5rem;
    height: 4rem;
    transform: translateX(-50%) translateY(-50%);
  }

  .marker::before {
    position: absolute;
    bottom: -6px;
    content: '';
    width: 8px;
    height: 8px;
    border-top-right-radius: 2px;

    border-top: 0.12rem solid ${theme.colors.purple};
    border-right: 0.12rem solid ${theme.colors.purple};
    background-color: white;
    left: 50%;
    transform: translateX(-50%) rotate(135deg);
  }

  .marker:hover {
    color: ${theme.colors.purple};
    z-index: 1;
  }

  .marker.active {
    background-color:  ${theme.colors.purple};
    color: white;
    z-index: 1;
  }
`;
