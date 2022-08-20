import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.aside`
  position: relative;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-left: 3rem;

  overflow: hidden;

  pointer-events: none;
  user-select: none;

  transition: 0.3s background-color;
  background-color: ${({ theme }) => theme.color.sidebar};
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

export const ControlContainer = styled.div`
  height: 5.4rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding-right: 1.65rem;

  margin-bottom: 0.4rem;
`;

export const ArrowLeftContainer = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;

  pointer-events: all;
  cursor: pointer;
`;

export const LogoContainer = styled.div`
  position: relative;
  width: 4.4rem;
  height: 4.4rem;

  align-self: flex-start;

  :hover {
    svg {
      transform: scale(1.1);
    }
  }
`;

export const SideBarContents = styled.div`
  position: relative;
  display: flex;
  align-self: flex-start;
  width: 100%;

  flex-grow: 0;
  flex-shrink: 0;
`;

export const SideBarMenuContainer = styled.div`
  width: 100%;
  margin-right: 2rem;
`;

export const SideBarResizer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1.2rem;
  margin-left: -0.6rem;

  pointer-events: auto;
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
  /* width: 5rem;
  border-right: red 1px solid;
  height: 100%; */
  /* 
  justify-self: flex-end;
  resize: horizontal;
  border-right: 5px solid black; */
`;
