import styled, { css } from 'styled-components';

import { theme } from '@/styles/theme';
import { TextInputProps } from '.';

export const Container = styled.div<Pick<TextInputProps, 'supportsMaxLength' | 'height'>>`
  height: 4rem;
  width: 100%;
  display: flex;

  ${({ supportsMaxLength }) =>
    supportsMaxLength
      ? css`
          flex-direction: column;
        `
      : css`
          align-items: center;
        `}

  flex: 0 1 auto;
`;

export const Input = styled.input<Pick<TextInputProps, 'borderRadius' | 'height'>>`
  width: 100%;
  height: ${({ height }) => height || '4rem'};

  padding: 0.6rem 4rem 0.6rem 1.4rem;
  border-radius: ${({ borderRadius }) => borderRadius || '1rem'};

  outline: none;

  ${theme.fonts.body};
  cursor: text;

  border: 0.1rem solid ${theme.colors.grey6};
  :focus {
    border: 0.1rem solid ${theme.colors.purple};
    caret-color: ${theme.colors.purple};
  }
`;

export const Caption = styled.p`
  margin: 0.4rem 0 0 auto;
  ${theme.fonts.caption1};
  color: ${theme.colors.grey4};
`;
