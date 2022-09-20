import styled from 'styled-components';
import { flexCenter } from '@/styles/utils';

export const SvgWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  ${flexCenter};

  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
`;
