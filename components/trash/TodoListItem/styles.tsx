import styled, { keyframes } from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.div<{ isFocused: boolean; isDoubleClicked: boolean }>`
  position: relative;

  width: 100%;

  /* max-height: ${({ isDoubleClicked }) => (isDoubleClicked ? '300rem' : 0)}; */
  /* min-height: ${({ isDoubleClicked }) => (isDoubleClicked ? '30rem' : 'calc("100%")')}; */
  /* min-height: calc(100%);
  max-height: 100rem; */

  max-width: calc(100% - 6rem);

  padding: 1rem;
  margin: 1rem 3rem;

  border: ${({ isFocused }) => (isFocused ? '0.2rem #735AFF solid' : '0.2rem #ffffff solid')};
  border-radius: 1rem;
  box-shadow: ${({ isDoubleClicked }) => isDoubleClicked && '0.1rem 0.1rem 0.5rem 0.1rem #bdbdbd'};

  /* transition: border 1s ease-in-out; */
  /* transition: box-shadow 0.2s ease-in-out; */
  /* transition: max-height 1s; */

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

  border: ${({ checked, theme }) => !checked && `1px solid ${theme.color.todo_checkbox}`};
  border-radius: 0.5rem;

  background-image: ${({ checked }) => checked && 'url("/assets/svgs/check.svg")'};
  background-color: ${({ checked }) => checked && theme.colors.purple};
  background-size: 1.5rem 1.5rem;
  background-repeat: no-repeat;
  background-position: center center;

  cursor: pointer;
`;

export const Title = styled.div`
  padding-left: 1.3rem;
  flex: 1;
  flex-grow: 0;

  outline: none;

  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.text};

  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 1;

  &:empty:before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  }
  &:focus {
    outline: none;
  }
`;

export const DescriptionContainer = styled.div``;

export const Description = styled.div<{ isDoubleClicked: boolean }>`
  width: 100%;

  padding-top: 1rem;
  padding-left: 3.1rem;

  margin-bottom: 10rem;

  font-size: 1.4rem;

  &:empty:before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  }

  &:focus {
    outline: none;
  }

  /* animation: ${({ isDoubleClicked }) => !isDoubleClicked && fadeOut} 2s ease-in-out; */
  /* height: ${({ isDoubleClicked }) => !isDoubleClicked && 0};
  transition: height 1s ease-in-out; */
`;
export const OptionsContainer = styled.div``;

const fadeOut = keyframes`
0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
