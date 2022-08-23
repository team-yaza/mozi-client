import styled from 'styled-components';

export const Container = styled.nav`
  width: 100%;

  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.sidebar_text};
`;

export const SideBarMenuList = styled.ul`
  /* width: 100%; */
  margin-left: 3rem;
  margin-right: 3rem;

  display: flex;
  flex-direction: column;

  border-bottom: 0.1rem solid ${({ theme }) => theme.color.sidebar_line};
`;

export const SideBarMenuItem = styled.li<{ focused?: boolean }>`
  height: 4.2rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  pointer-events: all;
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
  /* flex: 1; */
`;

export const Count = styled.div``;

// export const Container = styled.div<{ focused: boolean }>`
//   width: 100%;
//   height: 4.2rem;

//   display: flex;
//   align-items: center;

//   font-size: 2rem;
//   margin: 1rem 0rem;
//   padding-left: 1.7rem;
//   border-radius: 1.3rem;

//   color: ${({ theme, focused }) => {
//     switch (theme) {
//       case darkTheme:
//         return focused ? '#ffffff' : '#92909F';
//       case lightTheme:
//         return focused ? '#735AFF' : '#585858';
//     }
//   }};
//   background-color: ${({ focused, theme }) => {
//     switch (theme) {
//       case darkTheme:
//         return focused ? '#3B3A43' : '#2C2B30';
//       case lightTheme:
//         return focused ? '#F4F2FF' : '#ffffff';
//     }
//   }};
//   transition: 0.3s background-color;

//   a {
//     color: inherit;
//   }
// `;

// export const IconContainer = styled.div`
//   position: relative;
//   width: 2rem;
//   height: 2rem;

//   margin-right: 0.3rem;
// `;
