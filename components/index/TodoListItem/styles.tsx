import styled from 'styled-components';
import { flexCenter } from '@/styles/utils';

export const Container = styled.div<{ isDoubleClicked: boolean; focused: boolean }>`
  position: relative;

  padding: 1rem;
  margin: 1rem 3rem;
  border: ${({ isDoubleClicked, focused }) =>
    focused && !isDoubleClicked ? '0.2rem #735AFF solid' : '0.2rem #FFFFFF solid'};
  border-radius: 1rem;

  background-color: #ffff;
  outline: none;

  box-shadow: ${({ isDoubleClicked }) => (isDoubleClicked ? '0.1rem 0.1rem 0.5rem 0.1rem #bdbdbd' : 'none')};
`;

export const CheckBox = styled.div`
  ${flexCenter}
  position: relative;

  margin-right: 1.5rem; // 오른쪽 인풋과의 거리

  width: 1.6rem;
  height: 1.6rem;

  border: 1px solid #c3c6c9;
  border-radius: 3rem;

  cursor: pointer;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  font-size: 1.6rem;
  line-height: 1.92rem;
  padding-left: 2rem;

  text-decoration: none solid rgb(85, 85, 85);
  /* color: #555555; */
`;

export const Title = styled.div`
  width: 90%;
  border: none;

  font-size: 1.5rem;

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

  width: 100%;
`;

export const Description = styled.div`
  width: 100%;

  margin-top: 1rem;
  padding: 1.6rem 2.4rem;

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

export const SubTaskContainer = styled.div``;

export const OptionsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 2.5rem;

  display: flex;
  flex-direction: row;
  justify-content: end;
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
