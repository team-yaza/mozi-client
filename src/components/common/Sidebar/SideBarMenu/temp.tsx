import React from 'react';
import styled from 'styled-components';
export interface TempProps {
  icon: React.ReactNode;
  count: number;
  name: string;
  focused: boolean;
}

const Temp: React.FC<TempProps> = ({ name, icon, count = 0, focused }) => {
  return (
    <Container focused={focused}>
      <IconContainer>{icon}</IconContainer>
      <MenuName>{name}</MenuName>
      <Count>{count}</Count>
    </Container>
  );
};

export default Temp;

export const Container = styled.li<{ focused?: boolean }>`
  height: 4.2rem;
  width: 100%;
  min-width: 15.5rem;

  display: flex;
  align-items: center;

  font-size: 1.4rem;
  padding-inline: 1.7rem;
  border-radius: 1.3rem;
  background-color: ${({ focused }) => focused && '#F4F2FF'};
  color: ${({ theme, focused }) => (focused ? theme.color.sidebar_text_focused : theme.color.sidebar_text)};
  outline: none;

  cursor: pointer;

  svg {
    stroke: ${({ focused }) => (focused ? '#735aff' : '#585858;')};
  }

  &:hover {
    background-color: #f4f2ff;
    color: #735aff;

    svg {
      stroke: #735aff;
    }
  }
`;

export const IconContainer = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;

  flex-shrink: 0;
  stroke: inherit;
`;

export const MenuName = styled.div`
  margin-left: 1.4rem;
  min-width: 8rem;
`;

export const Count = styled.div`
  margin-left: auto;
`;
