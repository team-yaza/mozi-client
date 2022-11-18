import styled from 'styled-components';

export const Container = styled.div`
  height: 2.4rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin: 0.5rem;
  border-radius: 2.2rem;

  padding-inline: 1rem;

  background-color: ${({ theme }) => theme.color.chip_background};

  svg {
    stroke: ${({ theme }) => theme.color.chip_color};
  }

  transition: background-color 0.3s, stroke 0.3s;
  cursor: default;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const Content = styled.div`
  font-size: 1.2rem;

  color: ${({ theme }) => theme.color.chip_color};
`;

export const IconContainer = styled.div`
  position: relative;

  width: 1.6rem;
  height: 1.6rem;

  margin-right: 0.4rem;
`;

export const DeleteButton = styled.div`
  position: relative;

  width: 1.2rem;
  height: 1.2rem;
  margin-left: 0.5rem;
`;
