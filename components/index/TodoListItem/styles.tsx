import styled from 'styled-components';
import { flexCenter } from '@/styles/utils';

export const Container = styled.div<{ isDoubleClicked: boolean }>`
  padding: 1rem;
  margin: ${({ isDoubleClicked }) => (isDoubleClicked ? '1rem 3rem' : '0rem 3rem')};
  border: ${({ isDoubleClicked }) => (isDoubleClicked ? '2px black solid' : 'none')};
  border-radius: 1rem;

  position: relative;
`;

export const CheckBox = styled.div`
  ${flexCenter}
  position: relative;

  margin-right: 1.5rem; // 오른쪽 인풋과의 거리

  width: 1.6rem;
  height: 1.6rem;

  border: 1px solid #c3c6c9;
  border-radius: 0.25rem;

  cursor: pointer;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1.6rem;
  line-height: 1.92rem;
  padding-left: 2rem;

  text-decoration: none solid rgb(85, 85, 85);
  /* color: #555555; */
`;

export const DeleteButton = styled.button`
  font-size: 1.6rem;
`;

export const Content = styled.input`
  width: 90%;
  border: none;
`;

export const Description = styled.div`
  display: flex;
  width: 100%;

  justify-content: center;
`;

export const Footer = styled.div`
  width: 80%;
  height: 2.5rem;

  margin-top: 2rem;
`;
