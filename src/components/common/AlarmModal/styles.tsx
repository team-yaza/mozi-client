import { theme } from '@/styles/theme';
import { flexCenter } from '@/styles/utils';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-inline: 1rem;

  /* justify-content: center; */
`;

export const Title = styled.h2`
  ${theme.fonts.h2};
  margin-block: 2rem;
`;

export const Place = styled.h3`
  align-self: flex-start;
  /* margin-left: 1rem; */
  ${theme.fonts.h3};
  font-weight: 500;

  margin-bottom: 1rem;
`;

export const Time = styled.h3`
  align-self: flex-start;
  /* margin-left: 1rem; */
  ${theme.fonts.h3};
  font-weight: 500;
`;

export const Option = styled.h3`
  align-self: flex-start;
  /* margin-left: 1rem; */
  ${theme.fonts.h3};
  font-weight: 500;

  margin-bottom: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;

  margin-bottom: 1rem;
`;

export const Select = styled.select`
  width: 100%;
  outline: none;

  margin-inline: 2rem;
  margin-bottom: 1rem;
  padding-block: 1rem;

  font-size: 1.6rem;
`;

export const Button = styled.button<{ selected: boolean }>`
  ${flexCenter};
  width: 8rem;
  padding: 1.5rem;
  font-size: 1.6rem;
  border-radius: 1rem;

  outline: none;
  border: none;

  color: black;
  background-color: ${({ selected }) => (selected ? `${theme.colors.purple1}` : `${theme.colors.lightPurple}`)};
  cursor: pointer;
`;
