import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.div`
  width: 30rem;
  margin: 0 auto;

  margin-top: 2.2rem;
`;

export const RecentSearchHeading = styled.h2`
  color: ${theme.colors.darkGrey};
  font-weight: bold;
`;

export const RecentSearchList = styled.ul`
  width: 100%;

  margin-top: 1.5rem;
`;

export const RecentSearchKeyword = styled.li`
  width: 100%;
  height: 2rem;

  display: flex;
  align-items: center;

  padding-left: 2rem;
  margin-bottom: 0.3rem;

  font-size: 1.2rem;
  background-image: url('/assets/svgs/search.svg');
  background-repeat: no-repeat;
  background-position: 0.2rem center;
  background-size: 1.6rem 1.6rem;

  cursor: pointer;
`;
