import styled from 'styled-components';

import { fadeIn, fadeOut } from '@/styles/animation';
import { theme } from '@/styles/theme';
import { flexCenter } from '@/styles/utils';

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

export const ModalInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 1.4rem;
  background-color: ${theme.colors.white};
  z-index: 999999;
  overflow: hidden;
`;

export const ModalContent = styled.div`
  width: 31.3rem;
`;

export const ModalActionContainer = styled.div`
  display: flex;
  border-top: 0.1rem solid ${theme.colors.grey6};
  ${theme.fonts.h4};
`;

export const CancelButton = styled.div`
  ${flexCenter};
  width: 50%;
  height: 5.92rem;

  border-right: 0.1rem solid ${theme.colors.grey6};
  cursor: pointer;
`;

export const ConfirmButton = styled.div`
  ${flexCenter};
  width: 50%;
  height: 5.92rem;

  cursor: pointer;
`;
