import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.div`
  position: absolute;
  width: 31.3rem;
  height: 10rem;
  background-color: #ffffff;

  overflow: hidden;
  position: relative;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  height: 40%;
  background-color: #775eff;

  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: 20rem;

  ${theme.fonts.h4};

  margin-block: 1.5rem;

  align-self: center;
  text-align: center;
`;
