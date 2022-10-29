import styled from 'styled-components';

export const Container = styled.div`
  height: 1.9rem;
  width: 100%;
  max-width: 100%;

  display: flex;
  align-items: center;
  flex: 1;
  flex-shrink: 0;
  flex-grow: 1;

  margin-left: 1.3rem;
  margin-right: 0.5rem;

  font-size: 1.6rem;
  color: ${({ theme }) => theme.color.text};

  overflow: hidden;
  outline: none;
  cursor: text;

  &:empty:before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  }
  &:focus {
    outline: none;
  }
`;
