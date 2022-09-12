import styled, { keyframes } from 'styled-components';
import { flexCenter } from '@/styles/utils';

const spin = keyframes`
  0% {transform: rotate(0deg)}
  100% {transform: rotate(360deg)}
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  ${flexCenter};
`;

export const SpinnerContainer = styled.div`
  position: relative;

  width: 6.96rem;
  height: 6.94rem;

  animation: ${spin} 1.1s linear infinite;
  -webkit-animation: ${spin} 1.1s linear infinite;
`;
