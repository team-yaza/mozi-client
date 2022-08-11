import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  font-size: 3rem;
  color: ${({ theme }) => theme.color.white};

  margin: 3rem 3rem;

  justify-content: space-between;
`;
