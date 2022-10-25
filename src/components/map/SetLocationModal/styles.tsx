import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.4rem 1.6rem 1.6rem;

  div:last-child {
    margin-top: 1.5rem;
  }
`;

export const Title = styled.label`
  ${theme.fonts.h4};
  margin-bottom: 2rem;
`;

export const LocationInput = styled.input`
  height: 4rem;
  width: 100%;

  padding: 0.6rem 4rem 0.6rem 1.4rem;
  border-radius: 0.4rem;
  border: none;

  ${theme.fonts.body};
  caret-color: ${theme.colors.purple};
  outline: none;

  border: 0.1rem solid ${theme.colors.grey6};

  :focus {
    border: 0.1rem solid ${theme.colors.purple};
  }
`;
