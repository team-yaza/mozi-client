import styled from 'styled-components';

export const Container = styled.div`
  height: 5.4rem;
  background-color: ${({ theme }) => theme.color.header};

  transition: 0.3s background-color;
`;
