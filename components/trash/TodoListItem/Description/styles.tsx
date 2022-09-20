import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  padding-top: 1rem;
  padding-left: 3.1rem;

  margin-bottom: 10rem;

  font-size: 1.4rem;

  &:empty:before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  }

  &:focus {
    outline: none;
  }
`;
