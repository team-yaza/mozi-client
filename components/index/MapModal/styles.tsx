import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 20rem;

  position: relative;

  z-index: 10;

  background-color: gray;
`;

export const Map = styled.div`
  width: 100%;
  height: 100%;
`;

export const ConfirmDiv = styled.div`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 5rem;
  height: 2rem;

  font-size: 1.5rem;
  color: #7d7d7d;

  background-color: #ffffff;
  border-radius: 2rem;

  bottom: 0.5rem;
  right: 0.5rem;
  z-index: 100;
`;

export const ConfirmSpan = styled.span`
  cursor: pointer;
`;
