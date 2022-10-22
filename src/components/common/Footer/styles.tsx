import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { flexCenter } from '@/styles/utils';

export const Container = styled.footer`
  position: relative;
  left: 0;
  bottom: 0;

  height: 6.8rem;
  width: 100%;

  ${flexCenter};

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

  &:last-child {
    margin-right: 0;
  }
`;
