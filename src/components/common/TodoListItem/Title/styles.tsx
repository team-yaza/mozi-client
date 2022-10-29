import styled from 'styled-components';

export const Container = styled.div`
  padding-left: 1.3rem;
  flex: 1;
  flex-grow: 0;

  outline: none;

  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.text};

  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 1;

  &:empty:before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  }
  &:focus {
    outline: none;
  }
`;
