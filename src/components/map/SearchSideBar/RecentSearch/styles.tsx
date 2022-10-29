import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.div`
  width: 30rem;
  margin: 0 auto;

  padding-top: 2.2rem;
  padding-inline: 2rem;
  background-color: ${({ theme }) => theme.color.recent_search_background};
  color: ${({ theme }) => theme.color.white};
  transition: background-color 0.3s, color 0.3s;
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

  border-bottom: 0.1rem solid ${({ theme }) => theme.color.sidebar_right_border};
  transition: border-bottom 0.3s;
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

  svg {
    stroke: ${({ theme }) => theme.color.recent_search_button};
    transition: stroke 0.3s;
  }
`;
