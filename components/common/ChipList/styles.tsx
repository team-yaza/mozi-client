import styled from 'styled-components';

export const Container = styled.div<{ align: string }>`
  display: flex;
  flex-direction: ${({ align }) => align};

  & > div {
    margin: ${({ align }) => (align === 'column' ? '0 0 1rem 0' : '0 1rem 0 0')};
  }
`;
