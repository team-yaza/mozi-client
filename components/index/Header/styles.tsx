import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  font-size: 3rem;
  color: ${({ theme }) => theme.color.white};

  margin: 3rem 3rem;

  justify-content: space-between;
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
