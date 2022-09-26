import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { flexCenter } from '@/styles/utils';

export const Container = styled.footer`
  height: 7.8rem;
  ${flexCenter};

  background: ${theme.colors.white};
`;

export const OptionsContainer = styled.div`
  /* display: flex;
  justify-content: space-between;
  align-items: center; */

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
