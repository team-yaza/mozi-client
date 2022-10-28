import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  padding-left: 2rem;
`;

export const DefinedContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const DefinedOption = styled.div`
  position: relative;
`;

export const UndefinedContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;

  stroke: ${theme.colors.grey7};
`;

export const UndefinedOption = styled.div`
  position: relative;

  width: 2.5rem;
  height: 2.5rem;

  stroke: ${theme.colors.grey3};
`;
