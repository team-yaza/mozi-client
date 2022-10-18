import styled from 'styled-components';
import { motion } from 'framer-motion';
import { media } from '@/styles/media';

export const Container = styled(motion.aside)`
  position: relative;
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;

  pointer-events: none;
  user-select: none;

  transition: 0.3s background-color;
  background-color: ${({ theme }) => theme.color.sidebar};

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
  width: 100%;

  margin-left: 3.5rem; // 로고와 왼쪽 벽과의 간격
  margin-bottom: 2.5rem; // 모지 로고와 아래 사이드바 메뉴와의 간격

  align-self: flex-start;
  overflow: hidden;
`;

export const Logo = styled.div`
  position: relative;
  width: 4.4rem;
  height: 4.4rem;
`;

export const SideBarMenuContainer = styled.nav`
  position: relative;
  width: 100%;

  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.sidebar_text};

  overflow: hidden;
`;

export const SideBarMenuList = styled.ul`
  margin-inline: 2.5rem;

  display: flex;
  flex-direction: column;

  padding-bottom: 0.8rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.color.sidebar_line};

  pointer-events: all;
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
    width: 0.3rem;
    background-color: #c1c3c5b4;
  }
`;
