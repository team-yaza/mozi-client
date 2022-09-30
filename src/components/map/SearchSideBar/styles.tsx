import styled from 'styled-components';

import { flexCenter } from '@/styles/utils';
import { theme } from '@/styles/theme';

export const Container = styled.div<{ isSearchBarOpen?: boolean }>`
  position: absolute;
  left: 0;

  width: 36rem;
  height: 100vh;
  background-color: white;
  z-index: 99999;

  transform: ${({ isSearchBarOpen }) => !isSearchBarOpen && 'translateX(-36rem)'};
  transition: transform 250ms ease-in-out;
`;

export const SearchContainer = styled.div<{ isSeraching?: boolean }>`
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 5rem;

  input {
    border-bottom: ${({ isSeraching }) => isSeraching && 'none'};
    border-bottom-right-radius: ${({ isSeraching }) => isSeraching && '0'};
    border-bottom-left-radius: ${({ isSeraching }) => isSeraching && '0'};
  }
`;

export const SearchInput = styled.input`
  width: 30rem;
  height: 3.6rem;

  padding-left: 3.5rem;

  border: 0.1rem solid ${theme.colors.grey};
  border-radius: 0.8rem;

  background-image: url('/assets/svgs/search.svg');
  background-repeat: no-repeat;
  background-position: 1rem center;
  background-size: 2rem 2rem;
  outline: none;

  ::placeholder {
    color: #aeaeae;
  }
`;

export const SearchPlaceResultContainer = styled.div<{ isSeraching?: boolean }>`
  display: ${({ isSeraching }) => (isSeraching ? 'block' : 'none')};

  margin-inline: 2rem;
  padding-bottom: 1rem;

  background: white;

  border-bottom: 0.1rem solid ${theme.colors.grey};
`;

export const SearchPlaceResultHeading = styled.h3`
  margin-top: 2.1rem;
  margin-bottom: 1.1rem;

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

  background-color: white;
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

  border: 0.1rem solid ${theme.colors.grey};
  border-bottom-right-radius: 0.7rem;
  border-bottom-left-radius: 0.7rem;
  background: white;
`;

export const SearchTodoContainer = styled.div`
  padding-inline: 1.6rem;
  padding-bottom: 1.6rem;
  background: white;

  border-bottom-right-radius: 0.7rem;
  border-bottom-left-radius: 0.7rem;

  height: 30px;
`;
