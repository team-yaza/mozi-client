import styled from 'styled-components';

import { flexCenter } from '@/styles/utils';
import { theme } from '@/styles/theme';

export const Container = styled.div<{ isSearchBarOpen?: boolean }>`
  position: absolute;
  left: 0;

  width: 36rem;
  height: 100%;
  background-color: white;
  z-index: 99999;

  transform: ${({ isSearchBarOpen }) => !isSearchBarOpen && 'translateX(-36rem)'};

  background: ${({ theme }) => theme.color.sidebar};
  transition: background-color 0.3s, transform 250ms ease-in-out;
`;

export const SearchContainer = styled.div<{ isSeraching?: boolean }>`
  position: relative;
  width: 100%;

  ${flexCenter};

  margin-top: 5rem;

  input {
    border-bottom: ${({ isSeraching }) => isSeraching && 'none'};
    border-bottom-right-radius: ${({ isSeraching }) => isSeraching && '0'};
    border-bottom-left-radius: ${({ isSeraching }) => isSeraching && '0'};
  }

  z-index: 99999;
`;

export const SearchInput = styled.input`
  width: 30rem;
  height: 3.6rem;

  padding-left: 3.5rem;

  border: 0.1rem solid ${({ theme }) => theme.color.sidebar_right_border};
  border-radius: 0.8rem;

  background-image: url('/assets/svgs/search.svg');
  background-repeat: no-repeat;
  background-position: 1rem center;
  background-size: 2rem 2rem;
  background-color: ${({ theme }) => theme.color.recent_search_background};
  caret-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.white};
  transition: background-color 0.3s, caret-color 0.3s, color 0.3s, border 0.3s;
  outline: none;

  font-size: 1.6rem;

  ::placeholder {
    color: #aeaeae;
  }
`;

export const SearchPlaceResultContainer = styled.div<{ isSeraching?: boolean }>`
  display: ${({ isSeraching }) => (isSeraching ? 'block' : 'none')};

  padding-inline: 2rem;
  padding-bottom: 1rem;

  background: white;

  border-bottom: 0.1rem solid ${({ theme }) => theme.color.sidebar_right_border};

  background-color: ${({ theme }) => theme.color.recent_search_background};
`;

export const SearchPlaceResultHeading = styled.h3`
  padding-top: 2.1rem;
  padding-bottom: 1.1rem;

  color: ${theme.colors.darkGrey};
`;

export const SearchPlaceResultList = styled.ul`
  margin: 0;
  padding: 0;
`;

export const PlaceIcon = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;

  margin-bottom: 0.3rem;
`;

export const PlaceName = styled.span`
  font-size: 1.2rem;
  align-self: center;
`;

export const SearchPlaceResultItem = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.color.white};
  transition: color 0.3s;
`;

export const RecentSearchContainer = styled.div``;

export const SideBarToggleButton = styled.button`
  position: absolute;
  right: -2rem;
  width: 2.2rem;
  height: 5rem;

  ${flexCenter};

  top: 50%;
  transform: translateY(-50%);

  font-size: 0;

  outline: none;
  border: none;
  cursor: pointer;
  border-top-right-radius: 0.7rem;
  border-bottom-right-radius: 0.7rem;

  background-color: ${({ theme }) => theme.color.sidebar};
  transition: background-color 0.3s;
`;

export const IconContainer = styled.div<{ isSearchBarOpen?: boolean }>`
  position: relative;
  width: 0.7rem;
  height: 1rem;

  svg {
    transform: rotateY(${({ isSearchBarOpen }) => !isSearchBarOpen && '180deg'});
    transition: all 0.3s;
  }
`;

export const SearchResultContainer = styled.div`
  position: absolute;
  width: 30rem;
  top: 3.6rem;

  border: 0.1rem solid ${({ theme }) => theme.color.sidebar_right_border};
  border-bottom-right-radius: 0.7rem;
  border-bottom-left-radius: 0.7rem;
  background: white;

  transition: border 0.3s;
`;

export const SearchTodoContainer = styled.div`
  height: 3rem;
  padding-inline: 1.6rem;
  padding-bottom: 1.6rem;

  background-color: ${({ theme }) => theme.color.recent_search_background};
  transition: background-color 0.3s;
`;

export const MapTodoListContainer = styled.div`
  height: calc(100% - 9.5rem);
  overflow-y: scroll;
`;
