import styled from 'styled-components';

import { theme } from '@/styles/theme';
import { flexCenter } from '@/styles/utils';

export const Container = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  margin-top: 5rem;
  margin-inline: 4rem;
`;

export const LogoContainer = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;

  border-radius: 50%;

  margin-right: 1rem;

  div {
    ${flexCenter};
  }

  svg {
    stroke: ${theme.colors.purple};
  }
`;

export const Header = styled.h2`
  flex: 1;

  font-size: 2.2rem;
  font-weight: bold;
`;

export const EmptyButton = styled.button`
  width: 6rem;

  padding: 1rem;

  background-color: ${theme.colors.purple};
  color: ${theme.colors.white};

  outline: none;
  border: none;
  border-radius: 1rem;
  font-weight: bold;

  cursor: pointer;

  &:hover {
    scale: 1.05;
  }

  transition: 0.3s all;
`;
