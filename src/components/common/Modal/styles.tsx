import { fadeIn, fadeOut } from '@/styles/animation';
import styled from 'styled-components';

export const Container = styled.div<{ isOpened: boolean }>`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  visibility: ${({ isOpened }) => (isOpened ? 'visible' : 'hidden')};
  animation: ${({ isOpened }) => (isOpened ? fadeIn : fadeOut)} 0.15s ease-out;

  transition: visibility 0.15s;

  z-index: 99999;
`;

export const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;
