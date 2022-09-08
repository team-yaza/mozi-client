import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

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
    font-family: Inter, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI',
      'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    letter-spacing: -0.01rem;
  }

  /* 스크롤바의 색깔을 컨트롤 */
  /* body::-webkit-scrollbar {
    width: 0.25rem;
  }

  body::-webkit-scrollbar-track {
    background-color: #1e1e24;
  }

  body::-webkit-scrollbar-thumb {
    background-color: #6649b8;
  } */

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

  }

  .marker :hover{ 
    transform:scale(1.3);
    transition: transform .5s;
  }

`;
