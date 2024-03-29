import styled from 'styled-components';

export const Container = styled.li<{ focused?: boolean }>`
  height: 4.2rem;
  width: 100%;
  min-width: 15.5rem;

  display: flex;
  align-items: center;

  font-size: 1.4rem;
  padding-inline: 1.7rem;
  border-radius: 1.3rem;
  background-color: ${({ focused, theme }) => focused && theme.color.sidebar_menu_background};
  color: ${({ theme, focused }) => (focused ? theme.color.sidebar_text_focused : theme.color.sidebar_text)};
  outline: none;
  cursor: pointer;

  transition: background-color 0.3s;

  svg {
    stroke: ${({ focused }) => (focused ? '#735aff' : '#585858;')};
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.sidebar_menu_background};
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
