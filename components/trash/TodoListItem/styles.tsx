import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.div<{ isFocused: boolean }>`
  position: relative;

  padding: 1rem;
  margin: 1rem 3rem;

  width: 100%;
  max-width: calc(100% - 6rem);

  border: ${({ isFocused }) => (isFocused ? '0.2rem #735AFF solid' : '0.2rem #ffffff solid')};
  border-radius: 1rem;
  box-sizing: border-box;
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckBox = styled.div<{ checked: boolean }>`
  width: 1.8rem;
  height: 1.8rem;

  flex-shrink: 0;
  border-radius: 0.5rem;

  background-color: ${({ checked }) => checked && theme.colors.purple};
  background-image: ${({ checked }) => checked && 'url("/assets/svgs/check.svg")'};
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
export const Description = styled.div``;
export const OptionsContainer = styled.div``;
