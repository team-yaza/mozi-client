import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 4rem;

  overflow: hidden;
`;

export const ColorBox = styled.div<{ color: string }>`
  width: 4rem;
  height: 4rem;

  border-radius: 1rem;
  border: 0.1rem solid ${({ theme }) => theme.color.grey};

  background-color: ${({ color }) => color};
  cursor: pointer;
`;

export const ColorName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 1rem;
  color: ${theme.colors.darkGrey};
`;
