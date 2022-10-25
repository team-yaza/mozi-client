import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.div<{ backgroundColor: string }>`
  height: 2.4rem;

  border-radius: 2.4rem;

  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding-inline: 1rem;

  margin: 0.5rem;

  cursor: default;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const Content = styled.div<{ fontColor: string }>`
  font-size: 1.2rem;

  color: ${({ fontColor }) => fontColor};
`;

export const IconContainer = styled.div`
  position: relative;

  width: 1.6rem;
  height: 1.6rem;

  margin-right: 0.4rem;

  stroke: ${theme.colors.grey7};
`;

export const DeleteBtn = styled.div`
  position: relative;

  width: 1.2rem;
  height: 1.2rem;
  margin-left: 0.5rem;
`;
