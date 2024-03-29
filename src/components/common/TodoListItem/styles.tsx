import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { flexCenter } from '@/styles/utils';

export const Container = styled.div<{ isFocused?: boolean; isDoubleClicked: boolean }>`
  position: relative;

  width: 100%;
  max-width: 100%;
  min-width: 100%;
  height: auto;

  padding: 1rem;
  margin-block: 1rem;
  border: ${({ isFocused }) => (isFocused ? '0.2rem #735AFF solid' : '0.2rem transparent solid')};
  border-radius: 1rem;
  box-shadow: ${({ isDoubleClicked, theme }) => isDoubleClicked && theme.color.todolistitem_box_shadow};

  outline: none;
  // 컴포넌트의 크기가 명확하다면 transition을 적용할 수 있을 것 같다.

  /* max-height: ${({ isDoubleClicked }) => (isDoubleClicked ? '30rem' : '4.197rem')}; */
  /* max-height: ${({ isDoubleClicked }) => !isDoubleClicked && '4.197rem'}; */
  /* min-height: ${({ isDoubleClicked }) => (isDoubleClicked ? '30rem' : '4.197rem')}; */
  /* min-height: ${({ isDoubleClicked }) => (isDoubleClicked ? '30rem' : '4.197rem')}; */
  /* min-height: ${({ isDoubleClicked }) => !isDoubleClicked && '4.197rem'}; */

  /* max-width: calc(100% - 6rem); */

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
  position: relative;
  width: 1.8rem;
  height: 1.8rem;

  ${flexCenter};

  flex-shrink: 0;

  border: ${({ checked, theme }) => !checked && `0.1rem solid ${theme.color.todo_checkbox}`};
  border-radius: 0.5rem;

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

  stroke: ${theme.colors.grey7};
  cursor: pointer;
`;

export const Icons = styled.div`
  ${flexCenter};
`;
