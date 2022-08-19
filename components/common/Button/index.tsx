import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { Container } from './styles';

export interface ButtonProps
  extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'type'> {
  size?: 'small' | 'medium' | 'large';
  hasBorderRadius: boolean;
}

// ! 기본 세팅 -> 추후 props 추가시 세팅 추가

const Button: React.FC<ButtonProps> = ({ children, size = 'medium', hasBorderRadius = true, ...rest }) => {
  return <Container>{children}</Container>;
};

export default Button;
