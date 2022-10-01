import styled from 'styled-components';
import { flexCenter } from '@/styles/utils';

export const Container = styled.div`
  position: relative;

  height: 30rem;
  width: 100%;

  border-radius: 1rem;
  overflow: hidden;
`;

export const SpinnerContainer = styled.div`
  ${flexCenter};
  height: 100%;
`;

export const ConfirmContainer = styled.div`
  position: absolute;

  width: 5rem;
  height: 5rem;

  bottom: 0rem;
  right: 0rem;
  z-index: 100;

  cursor: pointer;
`;
