import { useState, useCallback, Dispatch, SetStateAction, useRef } from 'react';
import { useRecoilState } from 'recoil';

import RecentSearch from './RecentSearch';
import { searchSideBarAtom } from '@/store/sidebar/atom';
import { getLocationSearchResult } from '@/shared/utils/map';
import { getCurrentPosition } from '@/shared/utils/location';
import { SIDEBARARROWLEFT } from '@/components/common/Figure';
import {
  Container,
  SearchContainer,
  SearchInput,
  SideBarToggleButton,
  IconContainer,
  SearchResultContainer,
  SearchResultList,
  SearchResultItem,
  SearchResultHeading,
} from './styles';
import { Location } from '@/shared/types/location';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

interface SearchResult {
  name: string;
  location: [latitude: number, longitude: number];
}

interface SearchSideBarProps {
  // naverMap: naver.maps.Map | undefined;
  setCoords: Dispatch<SetStateAction<Location | undefined>>;
  // createMarker: (options: naver.maps.MarkerOptions) => naver.maps.Marker;
  // createPosition: (latitude: number, longitude: number) => naver.maps.LatLng;
}

const SearchSideBar: React.FC<SearchSideBarProps> = ({ setCoords }) => {
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [isSearchBarOpen, setIsSearchBarOpen] = useRecoilState(searchSideBarAtom);

  const searchResultContainerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(searchResultContainerRef, () => {
    clearSearch();
  });

  const clearSearch = useCallback(() => {
    setIsSearching(false);
    setSearchResult([]);
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    e.stopPropagation();
  }, []);

  const onChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);

    if (e.target.value === '') {
      clearSearch();
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
      setSearchResult(result);
    }
  }, []);

  const onChangePosition = useCallback(
    ({ latitude, longitude }: { latitude: number; longitude: number }) => {
      setCoords({ latitude, longitude });
    },
    [setCoords]
  );

  return (
    <Container isSearchBarOpen={isSearchBarOpen}>
      <SearchContainer isSeraching={isSearching}>
        <SearchInput value={keyword} onChange={onChange} onKeyDown={onKeyDown} placeholder="검색어를 입력하세요." />
        <SearchResultContainer ref={searchResultContainerRef} isSeraching={isSearching}>
          <SearchResultHeading>장소</SearchResultHeading>
          {isSearching && (
            <SearchResultList>
              {searchResult.map((result, index) => (
                <SearchResultItem
                  key={index}
                  onClick={() => onChangePosition({ longitude: result.location[0], latitude: result.location[1] })}
                >
                  {result.name}
                </SearchResultItem>
              ))}
            </SearchResultList>
          )}
        </SearchResultContainer>
      </SearchContainer>

      <RecentSearch />

      <SideBarToggleButton type="button" onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}>
        {isSearchBarOpen ? '닫기' : '열기'}
        <IconContainer isSearchBarOpen={isSearchBarOpen}>
          <SIDEBARARROWLEFT />
        </IconContainer>
      </SideBarToggleButton>
    </Container>
  );
};

export default SearchSideBar;
