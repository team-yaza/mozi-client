import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 5.4rem;
  background-color: ${({ theme }) => theme.color.header};

  display: flex;
  align-self: flex-end;
  align-items: center;

  padding-right: 3.2rem;

  transition: 0.3s background-color;
`;

export const SettingContainer = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;

  cursor: pointer;
`;
