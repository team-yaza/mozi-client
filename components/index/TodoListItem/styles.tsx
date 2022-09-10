import styled from 'styled-components';
import { flexCenter } from '@/styles/utils';
import { theme } from '@/styles/theme';

export const Container = styled.div<{ isDoubleClicked: boolean; focused: boolean }>`
  position: relative;

  padding: 1rem;
  margin: 1rem 3rem;
  border: ${({ isDoubleClicked, focused }) => focused && !isDoubleClicked && '0.2rem #735AFF solid'};
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.color.todo_background};
  outline: none;

  box-shadow: ${({ isDoubleClicked }) => isDoubleClicked && '0.1rem 0.1rem 0.5rem 0.1rem #bdbdbd'};
`;

export const CheckBox = styled.div<{ checked: boolean }>`
  ${flexCenter}
  position: relative;
  flex-shrink: 0;

  margin-right: 1.5rem; // 오른쪽 인풋과의 거리

  width: 1.8rem;
  height: 1.8rem;

  /* border: 1px solid ${({ theme }) => theme.color.todo_checkbox}; */
  border: ${({ checked, theme }) => !checked && `1px solid ${theme.color.todo_checkbox}`};

  background-color: ${({ checked }) => checked && theme.colors.purple};

  cursor: pointer;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  font-size: 1.6rem;
  line-height: 1.92rem;
  padding-left: 2rem;
`;

export const Title = styled.div`
  width: 90%;
  border: none;

  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.text};

  &:empty:before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  }
  &:focus {
    outline: none;
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;

  padding-left: 2.7rem;
  width: 100%;
`;

export const Description = styled.div`
  width: 100%;

  margin-block: 1rem;
  padding-block: 1.6rem;
  padding-inline: 2.4rem;

  font-size: 1.4rem;

  &:empty:before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  }
  &:focus {
    outline: none;
  }
`;

export const OptionWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const ChipContainer = styled.div`
  flex-grow: 3;
`;

export const OptionsContainer = styled.div`
  position: relative;
  height: 2.5rem;

  display: flex;
  flex-direction: row;
  justify-content: end;
  flex-grow: 1;
  align-self: end;
`;

export const OptionContainer = styled.div`
  position: relative;

  width: 2.5rem;
  height: 2.5rem;
`;

export const ChipListContainer = styled.div`
  width: 100%;
  margin-left: 4rem;
  margin-top: 0.5rem;
`;
