import React from 'react';
import styled from 'styled-components';

// ! 반응형에서 메뉴가 찌그러지는것 막기

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

// export const IconContainer = styled.div`

//   flex-shrink: 0; // 사이드바 늘리고 줄일 때 아이콘의 크기가 줄어들지 않게함.
// `;

export const Container = styled.li<{ focused?: boolean }>`
  height: 4.2rem;
  width: 100%;

  display: flex;
  align-items: center;

  font-size: 1.4rem;
  padding-inline: 1.7rem;
  border-radius: 1.3rem;
  background-color: ${({ focused }) => focused && '#F4F2FF'};
  color: ${({ theme, focused }) => (focused ? theme.color.sidebar_text_focused : theme.color.sidebar_text)};
  outline: none;

  cursor: pointer;

  &:hover {
    background-color: #f4f2ff;
    color: #735aff;
  }
`;

export const IconContainer = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;
`;

export const MenuName = styled.div`
  margin-left: 1.4rem;
`;

export const Count = styled.div`
  margin-left: auto;
`;

// export const SideBarMenuItem = styled.li<{ focused?: boolean }>`
//   height: 4.2rem;
//   width: 100%;

//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   padding-left: 1.7rem;
//   padding-right: 1.7rem;

//   color: ${({ theme, focused }) => (focused ? theme.color.sidebar_text_focused : theme.color.sidebar_text)};
//   background-color: ${({ focused }) => focused && '#F4F2FF'};
//   border-radius: 1.3rem;

//   outline: none;
//   cursor: pointer;
// `;

// export const MenuName = styled.div`
//   width: 100%;
//   min-width: 8rem;
//   /* flex: 1; */
// `;
