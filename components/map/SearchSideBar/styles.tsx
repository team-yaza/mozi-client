import styled from 'styled-components';

import { flexCenter } from '@/styles/utils';
import { theme } from '@/styles/theme';

export const Container = styled.div<{ isSearchBarOpen?: boolean }>`
  position: absolute;
  left: 0;

  width: 36rem;
  height: 100vh;
  background-color: white;
  z-index: 1;

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

export const SearchResultContainer = styled.div<{ isSeraching?: boolean }>`
  position: absolute;
  width: 30rem;
  top: 3.6rem;

  display: ${({ isSeraching }) => (isSeraching ? 'block' : 'none')};

  padding-inline: 1.6rem;
  padding-bottom: 1.6rem;

  border: 0.1rem solid ${theme.colors.grey};
  border-bottom-right-radius: 0.7rem;
  border-bottom-left-radius: 0.7rem;
  background: white;

  &:first-child {
    border-bottom: ${({ isSeraching }) => isSeraching && 'none'};
  }
`;

export const SearchResultHeading = styled.h3`
  margin-top: 2.1rem;
  margin-bottom: 1.1rem;

  color: ${theme.colors.darkGrey};
`;

export const SearchResultList = styled.ul`
  margin: 0;
  padding: 0;
`;

export const SearchResultItem = styled.li`
  cursor: pointer;
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
