import { flexCenter } from '@/styles/utils';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.div`
  position: absolute;
  left: 0;

  width: 36rem;
  height: 100vh;
  background-color: white;
  z-index: 1;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  /* height: 3.6rem; */

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 5rem;
`;

export const Input = styled.input`
  width: 30rem;
  height: 3.6rem;

  padding-left: 3.5rem;

  border: 0.2rem solid ${theme.colors.grey};
  border-radius: 0.8rem;

  background-image: url('/assets/svgs/search.svg');
  background-repeat: no-repeat;
  background-position: 1rem center;
  background-size: 2rem 2rem;
  outline: none;

  ::placeholder {
    color: #aeaeae;
  }
`;

export const SideBarToggleButton = styled.button`
  position: absolute;
  right: -2rem;
  width: 2.2rem;
  height: 5rem;

  ${flexCenter};

  top: 50%;
  transform: translateY(-50%);

  font-size: 0;

  outline: none;
  border: none;
  border-top-right-radius: 0.7rem;
  border-bottom-right-radius: 0.7rem;

  background-color: white;
`;

export const IconContainer = styled.div`
  position: relative;
  width: 0.7rem;
  height: 1rem;
`;
