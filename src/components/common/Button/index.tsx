import { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

export type Size = 'small' | 'medium' | 'large';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: Size;
  color: 'primary' | 'secondary' | 'alert';
  hasBorderRadius?: boolean;
  hasShadow?: boolean;
  isFullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = 'medium',
  color,
  hasShadow = false,
  hasBorderRadius = true,
  ...rest
}) => {
  return (
    <Container size={size} color={color} hasShadow={hasShadow} hasBorderRadius={hasBorderRadius} {...rest}>
      {children}
    </Container>
  );
};

export default Button;
