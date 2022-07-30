import styled from 'styled-components';
import { flexCenter } from '@/styles/utils';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1.6rem;
  line-height: 1.92rem;
  padding-left: 2rem;
  border-bottom: 1px solid #e6e6e6;

  text-decoration: none solid rgb(85, 85, 85);
  /* color: #555555; */

  input {
    border: none;
    width: 100%;
    /* outline: none; */
  }
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
  font-size: 1.6rem;
`;

export const DeleteButton = styled.button`
  font-size: 1.6rem;
`;
