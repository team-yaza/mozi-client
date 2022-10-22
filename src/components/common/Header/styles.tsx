import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.div`
  position: relative;
  height: 5.4rem;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding-right: 3.2rem;

  background-color: ${({ theme }) => theme.color.header};
  transition: 0.3s background-color;
`;

export const SettingContainer = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;

  cursor: pointer;

  stroke: ${theme.colors.grey7};

  &:hover {
    stroke: ${theme.colors.purple};
  }
`;
