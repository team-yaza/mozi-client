import styled from 'styled-components';

export const Container = styled.section<{ width: number }>`
  position: relative;
  height: 100vh;
  background-color: #f7f6f3;

  flex-grow: 0;
  flex-shrink: 0;

  pointer-events: none;
  user-select: none;

  /* min-width: 19rem; */
  width: ${({ width }) => width / 10}rem;
  max-width: 48rem;

  padding-top: 1.5rem;
  padding-left: 1.5rem;
  /* display: flex; */
  /* flex-direction: row; */
  /* font-size: 5rem; */
  /* max-width: 30rem; */
  /* padding: 1.5rem; */
`;

export const SideBarContents = styled.div`
  display: flex;

  pointer-events: auto;
  /* flex-direction: row; */

  /* height: 100vh; */

  /* flex-grow: 0; */
  /* flex-shrink: 0; */
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

  /* background-color: ${({ isVisible }) => (isVisible ? '#c1c3c5b4' : 'transparent')}; */
  /* background-color: red; */

  /* flex-basis: 1.2rem; */
  /* flex-shrink: 0; */
  /* flex-grow: 0; */
  /* height: 100%; */
  /* width: 100px; */
  /* width: 100px; */
  /* width: 5rem;
  background-color: red;
  border-right: red 1px solid;
  height: 100%; */
  /* 
  justify-self: flex-end;
  resize: horizontal;
  border-right: 5px solid black; */
`;
