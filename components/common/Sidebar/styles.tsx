import styled from 'styled-components';
import { motion } from 'framer-motion';
import { media } from '@/styles/media';

export const Container = styled(motion.aside)<{ isSideBarOpened?: boolean }>`
  position: relative;
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  pointer-events: none;
  user-select: none;

  transition: 0.3s background-color;
  background-color: ${({ theme }) => theme.color.sidebar};

  // ! 최대 너비를 제한하는 코드
  /* max-width: 48rem; */
  /* min-width: 19rem; */

  ${media.phone} {
    position: absolute;
    z-index: 1;
  }
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

export const ArrowLeftContainer = styled(motion.div)<{ isSideBarOpened?: boolean }>`
  position: absolute;
  width: 3rem;
  height: 3rem;
  right: ${({ isSideBarOpened }) => !isSideBarOpened && '-6rem'};

  z-index: 10;

  pointer-events: all;
  cursor: pointer;
`;

export const LogoContainer = styled.div`
  position: relative;
  width: 4.4rem;
  height: 4.4rem;

  margin-left: 3rem; // 로고와 왼쪽 벽과의 간격
  margin-bottom: 3.1rem; // 모지 로고와 아래 사이드바 메뉴와의 간격

  align-self: flex-start;
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
  justify-self: flex-end;
  resize: horizontal;
  border-right: 5px solid black; */
`;
