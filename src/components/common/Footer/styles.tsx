import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { flexCenter } from '@/styles/utils';

export const Container = styled.footer`
  position: relative;
  ${flexCenter};

  height: 6.8rem;
  width: 100%;

  flex-shrink: 0;
  flex-grow: 0;
  background: ${({ theme }) => theme.color.footer};
  border-top: 0.1rem solid ${({ theme }) => theme.color.footer_border_top};

  transition: background-color 0.3s, border-top 0.3s;
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

  stroke: ${({ theme }) => theme.color.footer_stroke};

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    stroke: ${theme.colors.purple};
  }
`;
