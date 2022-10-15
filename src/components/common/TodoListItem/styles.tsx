import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.div<{ isFocused?: boolean; isDoubleClicked: boolean }>`
  position: relative;

  width: 100%;
  height: auto;

  // 컴포넌트의 크기가 명확하다면 transition을 적용할 수 있을 것 같다.

  /* max-height: ${({ isDoubleClicked }) => (isDoubleClicked ? '30rem' : '4.197rem')}; */
  /* max-height: ${({ isDoubleClicked }) => !isDoubleClicked && '4.197rem'}; */
  /* min-height: ${({ isDoubleClicked }) => (isDoubleClicked ? '30rem' : '4.197rem')}; */
  /* min-height: ${({ isDoubleClicked }) => (isDoubleClicked ? '30rem' : '4.197rem')}; */
  /* min-height: ${({ isDoubleClicked }) => !isDoubleClicked && '4.197rem'}; */

  /* max-width: calc(100% - 6rem); */

  padding: 1rem;
  margin-block: 1rem;
  border: ${({ isFocused }) => (isFocused ? '0.2rem #735AFF solid' : '0.2rem transparent solid')};
  border-radius: 1rem;
  box-shadow: ${({ isDoubleClicked }) => isDoubleClicked && '0.1rem 0.1rem 0.5rem 0.1rem #bdbdbd'};

  outline: none;
  /* transition: max-height 3s, min-height 3s, box-shadow 0.3s; */
  /* transition: all 3s; */
  /* transition: max-height 1s; */
  /* transition: height 1s; */

  /* transition: max-height 2s ease-in-out, min-height 2s ease-in-out;ㅈ */
  /* transition: transform 1s; */
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckBox = styled.div<{ checked: boolean }>`
  width: 1.8rem;
  height: 1.8rem;

  flex-shrink: 0;

  border: ${({ checked, theme }) => !checked && `0.1rem solid ${theme.color.todo_checkbox}`};
  border-radius: 0.5rem;

  background-image: ${({ checked }) => checked && 'url("/assets/svgs/check.svg")'};
  background-color: ${({ checked }) => checked && theme.colors.purple};
  background-size: 1.5rem 1.5rem;
  background-repeat: no-repeat;
  background-position: center center;

  cursor: pointer;
`;

export const DescriptionContainer = styled.div`
  max-height: 5rem;
  overflow-y: scroll;
`;

export const IconContainer = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;
`;
