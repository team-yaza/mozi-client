import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';

import RecentSearch from './RecentSearch';
import { sideBarStateAtom } from '@/store/sidebar/atom';
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

interface SearchResult {
  name: string;
  location: [latitude: number, longitude: number];
}

interface SearchSideBarProps {
  setCoords: Dispatch<SetStateAction<Location | undefined>>;
}

const SearchSideBar: React.FC<SearchSideBarProps> = ({ setCoords }) => {
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<Array<SearchResult>>([]);
  const [isSearchBarOpen, setIsSearchBarOpen] = useRecoilState(sideBarStateAtom);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    e.stopPropagation();
  }, []);

  const onChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);

    const { coords } = await getCurrentPosition();

    const result = await getLocationSearchResult({
      keyword: e.target.value,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    if (result.length > 0) {
      setIsSearching(true);
      setSearchResult(result);

      console.log(result);
    }
  }, []);

  const onChangePosition = useCallback(({ latitude, longitude }: { latitude: number; longitude: number }) => {
    setCoords({ latitude, longitude });
  }, []);

  return (
    <Container isSearchBarOpen={isSearchBarOpen}>
      <SearchContainer isSeraching={isSearching}>
        <SearchInput value={keyword} onChange={onChange} onKeyDown={onKeyDown} placeholder="검색어를 입력하세요." />
        <SearchResultContainer isSeraching={isSearching}>
          <SearchResultHeading>장소</SearchResultHeading>
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
