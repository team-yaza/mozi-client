import styled from 'styled-components';

import { theme } from '@/styles/theme';
import Button from '@/components/common/Button';

export const Container = styled.div`
  position: relative;
  height: 2.8rem;

  display: flex;
  align-items: center;
  margin-inline: 3rem;
`;

export const LogoContainer = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;

  margin-right: 1rem;

  svg {
    stroke: ${theme.colors.purple};
  }
`;

export const Header = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;

  color: ${({ theme }) => theme.color.white};
  transition: color 0.3s;
`;

export const ActionButton = styled(Button)`
  width: 8.8rem;
  height: 2.8rem;

  margin-left: auto;
  font-size: 1.2rem;
  /* background-color: ${({ theme }) => theme.color.light_black}; */
  /* color: ${theme.colors.purple}; */
  // border-radius: 2rem;
  // transition: 0.3s background-color;
`;
