import styled from 'styled-components';

export const Container = styled.div<{ backgroundColor: string }>`
  height: 2.4rem;

  border-radius: 2.4rem;

  background-color: ${({ backgroundColor }) => backgroundColor};
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;

  padding: 0 0.7rem;
`;

export const Content = styled.div<{ fontColor: string }>`
  font-size: 1.2rem;

  color: ${({ fontColor }) => fontColor};
`;

export const Icon = styled.div`
  position: relative;

  width: 1.6rem;
  height: 1.6rem;

  margin-right: 0.4rem;
`;

export const DeleteBtn = styled.div`
  position: relative;

  width: 1.2rem;
  height: 1.2rem;
  margin-left: 0.5rem;
`;
