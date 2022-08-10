import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: center;

  overflow: hidden;

  pointer-events: none;
  user-select: none;

  background-color: #ffffff;
  // ! 최대 너비를 제한하는 코드
  /* max-width: 48rem; */
  /* min-width: 19rem; */
  // ! css 추후 사용
  /* padding-top: 1.5rem;
  padding-left: 1.5rem; */
  /* 
  flex-grow: 0;
  flex-shrink: 0; */
  /* display: flex; */
  /* flex-direction: row; */
  /* font-size: 5rem; */
  /* padding: 1.5rem; */
`;

export const SideBarContents = styled.div`
  display: flex;

  pointer-events: auto;

  /* flex-grow: 0;
  flex-shrink: 0; */

  // ! css 추후 사용
  /* flex-direction: row; */
  /* height: 100vh; */
  /* flex-direction: column; */
`;

export const SideBarMenuContainer = styled.div`
  flex: 1;
`;

export const SideBarResizer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1.2rem;
  margin-left: -0.6rem;

  cursor: col-resize;

  &:hover {
    width: 3px;
    background-color: #c1c3c5b4;
  }

  // ! css 추후 사용
  /* background-color: ${({ isVisible }) => (isVisible ? '#c1c3c5b4' : 'transparent')}; */
  /* background-color: red; */

  /* flex-basis: 1.2rem; */
  /* flex-shrink: 0; */
  /* flex-grow: 0; */
  /* height: 100%; */
  /* width: 100px; */
  /* width: 100px; */
  /* width: 5rem;
  border-right: red 1px solid;
  height: 100%; */
  /* 
  justify-self: flex-end;
  resize: horizontal;
  border-right: 5px solid black; */
`;
