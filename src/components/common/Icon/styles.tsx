import { theme } from '@/styles/theme';
import { flexCenter } from '@/styles/utils';
import styled from 'styled-components';

export const Container = styled.div<{ width: string; height: string; stroke?: string }>`
  position: relative;
  ${flexCenter};

  width: ${({ width }) => width};
  height: ${({ height }) => height};
  stroke: ${({ stroke }) => (stroke ? stroke : theme.colors.grey7)};
`;
