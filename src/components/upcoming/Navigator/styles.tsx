import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  font-size: 2rem;
  font-weight: bold;
  margin-left: auto;
  margin-right: -1.5rem;

  cursor: default;

  color: ${({ theme }) => theme.color.white};
  transition: color 0.3s;
`;

export const ArrowContainer = styled.div`
  position: relative;
  width: 2rem;

  margin-inline: 2rem;

  cursor: pointer;

  stroke: ${({ theme }) => theme.color.icon};
  transition: stroke 0.3s;
`;
