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
  border: ${({ borderColor }) => `0.3rem solid ${borderColor}`};
  border-radius: 1rem;
  border-style: dashed;
  background-color: ${({ backgroundColor }) => `${backgroundColor}`};

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }

  z-index: 1;
  visibility: ${({ isDragging }) => (isDragging ? 'visible' : 'hidden')};
  /* background-color: transparent; */
`;

export const ActionDialog = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActionIconContainer = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
`;

export const ActionText = styled.span`
  font-size: 1.6rem;
`;

export const DNDPlaceHolderContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${flexCenter};
`;
