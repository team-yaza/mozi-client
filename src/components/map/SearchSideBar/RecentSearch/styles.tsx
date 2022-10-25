import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.div`
  width: 30rem;
  margin: 0 auto;

  margin-top: 2.2rem;
  padding-inline: 2rem;
`;

export const RecentSearchHeading = styled.h2`
  color: ${theme.colors.darkGrey};
  font-weight: bold;

  margin-left: 0.4rem;
`;

export const RecentSearchList = styled.ul`
  width: 100%;

  margin-top: 1.5rem;
`;

export const RecentSearchItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 0.1rem solid ${theme.colors.grey};
`;

export const RecentSearchKeyword = styled.div`
  width: 100%;
  height: 2rem;

  display: flex;
  align-items: center;

  padding-left: 2rem;

  font-size: 1.2rem;
  background-image: url('/assets/svgs/search.svg');
  background-repeat: no-repeat;
  background-position: 0.2rem center;
  background-size: 1.6rem 1.6rem;

  cursor: pointer;
`;

export const DeleteContainer = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;

  cursor: pointer;
`;
