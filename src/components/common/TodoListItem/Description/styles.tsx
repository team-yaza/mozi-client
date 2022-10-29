import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  padding-top: 1rem;
  padding-left: 3.1rem;

  margin-bottom: 2rem; // 밑애 option과의 거리

  font-size: 1.4rem;
  cursor: text;
  color: ${({ theme }) => theme.color.white};
  transition: color 0.3s;

  &:empty:before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  }

  &:focus {
    outline: none;
  }
`;
