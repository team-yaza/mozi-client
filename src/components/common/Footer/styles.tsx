import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { flexCenter } from '@/styles/utils';

export const Container = styled.footer`
  position: relative;
  left: 0;
  bottom: 0;
  ${flexCenter};

  height: 6.8rem;
  width: 100%;

  background: ${theme.colors.white};
`;

export const OptionsContainer = styled.div`
  display: flex;
`;

export const IconContainer = styled.div`
  position: relative;

  width: 3.4rem;
  height: 3.4rem;

  margin-right: 4.8rem;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  stroke: #2c2b31;

  &:hover {
    stroke: ${theme.colors.purple};
  }
`;
