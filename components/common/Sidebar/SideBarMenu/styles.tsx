import styled from 'styled-components';
import { darkTheme, lightTheme } from '@/styles/theme';

export const Container = styled.div<{ focused: boolean }>`
  width: 25rem;
  height: 4.2rem;

  display: flex;
  align-items: center;

  font-size: 2rem;
  margin: 1rem 0rem;
  padding-left: 1.7rem;
  border-radius: 1.3rem;

  color: ${({ theme, focused }) => {
    switch (theme) {
      case darkTheme:
        return focused ? '#ffffff' : '#92909F';
      case lightTheme:
        return focused ? '#735AFF' : '#585858';
    }
  }};
  background-color: ${({ focused, theme }) => {
    switch (theme) {
      case darkTheme:
        return focused ? '#3B3A43' : '#2C2B30';
      case lightTheme:
        return focused ? '#F4F2FF' : '#ffffff';
    }
  }};
  transition: 0.3s background-color;

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
