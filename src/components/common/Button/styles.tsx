import { theme } from '@/styles/theme';
import styled, { css } from 'styled-components';

import { ButtonProps, Size } from '.';

export const Container = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.4rem;
  padding-inline: 1.6rem;
  font-weight: 600;
  font-family: inherit;
  ${({ size }) => buttonSizeStyle(size)}
  ${({ color }) => buttonColorStyle(color)}
  ${({ isFullWidth }) => isFullWidth && takeFullWidth()}


  border: none;
  outline: none;

  cursor: pointer;
`;

const buttonSizeStyle = (size: Size) => {
  switch (size) {
    case 'large':
      return css`
        height: 4.8rem;
        font-size: 1.8rem;
      `;
    case 'medium':
      return css`
        height: 4rem;
        font-size: 1.6rem;
      `;
    case 'small':
      return css`
        height: 3.2rem;
        font-size: 1.4rem; ;
      `;
  }
};

const buttonColorStyle = (color: string) => {
  switch (color) {
    case 'primary':
      return css`
        color: white;
        background-color: ${theme.colors.purple};
      `;
    case 'secondary':
      return css`
        color: ${theme.colors.purple};
        background-color: white;
      `;
  }
};

const takeFullWidth = () => css`
  width: 100%;
`;
