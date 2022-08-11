import styled from 'styled-components';

export const Container = styled.div<{ foucsed: boolean }>`
  width: 25rem;
  height: 4.2rem;

  display: flex;
  align-items: center;

  font-size: 2rem;

  color: ${({ foucsed }) => (foucsed ? '#735AFF' : '#585858')};
  background-color: ${({ foucsed }) => (foucsed ? '#F4F2FF' : '#ffffff')};

  margin: 1rem 0rem;
  padding-left: 1.7rem;
  border-radius: 1.3rem;

  a {
    color: inherit;
  }
`;

export const IconContainer = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;

  margin-right: 0.3rem;
`;
