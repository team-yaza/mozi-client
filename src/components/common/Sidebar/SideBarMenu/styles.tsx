import styled from 'styled-components';

export const Container = styled.nav`
  position: relative;
  width: 100%;

  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.sidebar_text};

  overflow: hidden;
`;

export const SideBarMenuList = styled.ul`
  margin-left: 3rem;
  margin-right: 3rem;

  display: flex;
  flex-direction: column;

  border-bottom: 0.1rem solid ${({ theme }) => theme.color.sidebar_line};

  pointer-events: all;
`;

export const SideBarMenuItem = styled.li<{ focused?: boolean }>`
  height: 4.2rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-left: 1.7rem;
  padding-right: 1.7rem;

  color: ${({ theme, focused }) => (focused ? theme.color.sidebar_text_focused : theme.color.sidebar_text)};
  background-color: ${({ focused }) => focused && '#F4F2FF'};
  border-radius: 1.3rem;

  outline: none;
  cursor: pointer;
`;

export const IconContainer = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;

  margin-right: 1.4rem; // 아이콘과 글자 사이의 간격

  flex-shrink: 0; // 사이드바 늘리고 줄일 때 아이콘의 크기가 줄어들지 않게함.
`;

export const MenuName = styled.div`
  width: 100%;
  min-width: 8rem;
`;

export const Count = styled.div``;
