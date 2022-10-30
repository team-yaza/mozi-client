import React, { useState, useCallback, Dispatch, SetStateAction, useRef, useEffect, useLayoutEffect } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import RecentSearch from './RecentSearch';
import MapTodoList from './MapTodoList';
import { getLocationSearchResult } from '@/shared/utils/map';
import { getCurrentPosition } from '@/shared/utils/location';
import { Location, LocationSearchResult } from '@/shared/types/location';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import {
  Todo,
  // TodoUpdateRequest
} from '@/shared/types/todo';
import { getItem, setItem } from '@/store/localStorage';
import { getSearchSideBarStateFromLocalStorage } from '@/store/localStorage/sidebar';
import { SEARCHPLACE, SIDEBARARROWLEFT } from '@/components/common/Figure';
import {
  Container,
  SearchContainer,
  SearchInput,
  SideBarToggleButton,
  IconContainer,
  SearchPlaceResultContainer,
  SearchPlaceResultList,
  SearchPlaceResultItem,
  PlaceIcon,
  SearchPlaceResultHeading,
  SearchResultContainer,
  PlaceName,
  SearchTodoContainer,
} from './styles';

interface SearchSideBarProps {
  setCoords: Dispatch<SetStateAction<Location | undefined>>;
  todos?: Todo[];
  updateTodo: UseMutateFunction<any, any, any, any>;
  deleteTodo: UseMutateFunction<unknown, unknown, string, unknown>;
}

const SearchSideBar: React.FC<SearchSideBarProps> = ({ setCoords, todos, updateTodo, deleteTodo }) => {
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(true);
  const [searchResult, setSearchResult] = useState<LocationSearchResult[]>([]);
  const [recentSearch, setRecentSearch] = useState<LocationSearchResult[]>([]);

  const searchResultContainerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(searchResultContainerRef, () => {
    clearSearch();
  });

  useEffect(() => {
    const recentSearchFromLocalStorage = getItem('RECENT_SEARCH');

    if (recentSearchFromLocalStorage) {
      setRecentSearch(JSON.parse(recentSearchFromLocalStorage));
    }
  }, []);

  useLayoutEffect(() => {
    setIsSearchBarOpen(getSearchSideBarStateFromLocalStorage());
  }, []);

  const clearSearch = useCallback(() => {
    setIsSearching(false);
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    e.stopPropagation();
  }, []);

  const onChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);

    if (e.target.value === '') {
      setSearchResult([]);
      return;
    }

    const { coords } = await getCurrentPosition();

    const result = await getLocationSearchResult({
      keyword: e.target.value,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    if (e.target.value.length > 0) {
      setIsSearching(true);
      setSearchResult(result.slice(0, 5));
    }
  }, []);

  const onChangePosition = useCallback(
    ({ latitude, longitude }: { latitude: number; longitude: number }) => {
      setCoords({ latitude, longitude });
    },
    [setCoords]
  );

  const onChangeRecentSearchResult = (result: LocationSearchResult) => {
    const hasSameRecentSearch = recentSearch.some((recentSearchItem) => recentSearchItem.name === result.name);

    if (hasSameRecentSearch) return;

    setRecentSearch([result, ...recentSearch].slice(0, 5));
    setItem('RECENT_SEARCH', JSON.stringify([result, ...recentSearch].slice(0, 5)));
  };

  const clickSearchBarHandler = useCallback(() => {
    setIsSearching(!isSearching);
  }, [isSearching]);

  return (
    <Container isSearchBarOpen={isSearchBarOpen}>
      <SearchContainer isSeraching={isSearching}>
        <SearchInput
          value={keyword}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onClick={clickSearchBarHandler}
          placeholder="검색어를 입력하세요."
        />
        {isSearching && (
          <SearchResultContainer>
            {searchResult.length === 0 && (
              <RecentSearch
                recentSearch={recentSearch}
                setRecentSearch={setRecentSearch}
                setCoords={setCoords}
                clearSearch={clearSearch}
              />
            )}
            {searchResult.length > 0 && (
              <SearchPlaceResultContainer ref={searchResultContainerRef} isSeraching={isSearching}>
                <SearchPlaceResultHeading>장소</SearchPlaceResultHeading>
                <SearchPlaceResultList>
                  {searchResult.map((result, index) => (
                    <SearchPlaceResultItem
                      key={index}
                      onClick={() => {
                        onChangePosition({ longitude: result.location[0], latitude: result.location[1] });
                        onChangeRecentSearchResult(result);
                      }}
                    >
                      <PlaceIcon>
                        <SEARCHPLACE />
                      </PlaceIcon>
                      <PlaceName>{result.name}</PlaceName>
                    </SearchPlaceResultItem>
                  ))}
                </SearchPlaceResultList>
              </SearchPlaceResultContainer>
            )}

            <SearchTodoContainer />
          </SearchResultContainer>
        )}
      </SearchContainer>
      <MapTodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      <SideBarToggleButton type="button" onClick={() => setIsSearchBarOpen((prev) => !prev)}>
        {isSearchBarOpen ? '닫기' : '열기'}
        <IconContainer isSearchBarOpen={isSearchBarOpen}>
          <SIDEBARARROWLEFT />
        </IconContainer>
      </SideBarToggleButton>
    </Container>
  );
};

export default SearchSideBar;
