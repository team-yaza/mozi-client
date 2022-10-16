import styled from 'styled-components';
import { flexCenter } from '@/styles/utils';

export const Container = styled.div`
  position: relative;
  ${flexCenter}
  width: 100%;
  height: 6.8rem;

  padding: 0.5rem;

  background-color: white;
`;

export const Drop = styled.div<{
  active: boolean;
  isDragging: boolean;
  borderColor: string;
  backgroundColor: string;
  hoverColor: string;
}>`
  ${flexCenter};
  width: 100%;

  height: 100%;
  border: ${({ isDragging, borderColor }) => isDragging && `0.1rem solid ${borderColor}`};
  border-radius: 1rem;
  border-style: dashed;
  background-color: ${({ active, backgroundColor }) => active && `${backgroundColor}`};

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
`;

export const ActionDialog = styled.div``;

export const ActionIconContainer = styled.div``;

export const ActionText = styled.span``;
