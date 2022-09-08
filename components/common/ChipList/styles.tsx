import styled from 'styled-components';

export const Container = styled.div<{ align: string }>`
  display: flex;
  flex-direction: ${({ align }) => align};

  flex-wrap: wrap;
`;
