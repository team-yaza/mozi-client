import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import RecentSearch from './RecentSearch';
import { sideBarStateAtom } from '@/store/sidebar/atom';
import { getSearchResult } from '@/shared/utils/map';
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

const SearchSideBar: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [addresses, setAddresses] = useState<naver.maps.Service.AddressItemV2[]>([]);
  const [isSearchBarOpen, setIsSearchBarOpen] = useRecoilState(sideBarStateAtom);

  const onKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);

    const result = await getSearchResult(e.target.value);

    if (result.length > 0) {
      setIsSearching(true);
      setAddresses(result);
    }
  };

  return (
    <Container isSearchBarOpen={isSearchBarOpen}>
      <SearchContainer isSeraching={isSearching}>
        <SearchInput value={keyword} onChange={onChange} onKeyDown={onKeyDown} placeholder="검색어를 입력하세요." />
        <SearchResultContainer isSeraching={isSearching}>
          <SearchResultHeading>장소</SearchResultHeading>
          <SearchResultList>
            {addresses.map((address, index) => (
              <SearchResultItem key={index}>{address.roadAddress}</SearchResultItem>
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
