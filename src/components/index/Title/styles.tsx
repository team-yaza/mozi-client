import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { flexCenter } from '@/styles/utils';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  font-size: 3rem;
  color: ${({ theme }) => theme.color.white};

  margin: 3rem 3rem;

  justify-content: space-between;
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  span {
    font-size: 2.2rem;
    font-weight: bold;
  }
`;

export const LogoContainer = styled.div`
  position: relative;
  width: 3.6rem;
  height: 3.6rem;

  border-radius: 50%;
  margin-right: 0.95rem;

  background-color: white;

  div {
    ${flexCenter};
  }
`;

export const AddTodoButton = styled.button`
  width: 8.8rem;
  height: 2.8rem;
  font-size: 1.2rem;

  background-color: ${({ theme }) => theme.color.light_black};
  color: ${theme.colors.purple};

  border: none;
  border-radius: 2rem;
  outline: none;
  cursor: pointer;

  transition: 0.3s background-color;
`;
