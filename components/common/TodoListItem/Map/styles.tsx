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
  ${flexCenter}
  height: 100%;
`;
