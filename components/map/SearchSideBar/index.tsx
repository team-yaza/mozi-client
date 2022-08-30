import SIDEBARARROWLEFT from '@/components/common/Figure/SIDEBARARROWLEFT';
import React, { useState } from 'react';
import RecentSearch from '../RecentSearch';
import { Container, SearchContainer, Input, SideBarToggleButton, IconContainer } from './styles';

const SearchSideBar: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
  };

  const searchAddressToCoordinate = (address: string) => {
    naver.maps.Service.geocode(
      {
        query: address,
      },
      (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          // TODO alert 제거
          return alert('네이버 지도에서 문제가 발생했습니다.');
        } else if (response.v2.meta.totalCount === 0) {
          // TODO alert 제거
          return alert('올바른 주소를 입력해주세요.');
        }

        // const htmlAddress = [];
        const item = response.v2.addresses[0];
        // const point = new naver.maps.Point(Number(item.x), Number(item.y));

        // if (item.roadAddress) {
        //   htmlAddress.push('[도로명 주소] ' + item.roadAddress);
        // }
        // if (item.jibunAddress) {
        //   htmlAddress.push('[지번 주소] ' + item.jibunAddress);
        // }
        // if (item.englishAddress) {
        //   htmlAddress.push('[영문명 주소] ' + item.englishAddress);
        // }

        const map = new naver.maps.Map('map', {
          center: new naver.maps.LatLng(Number(item.y), Number(item.x)),
          zoom: 14,
        });
        new naver.maps.Marker({
          map: map,
          position: new naver.maps.LatLng(Number(item.y), Number(item.x)),
        });
      }
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    searchAddressToCoordinate(keyword);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <Container isSearchBarOpen={isSearchBarOpen}>
      <SearchContainer>
        <form onSubmit={onSubmit}>
          <Input value={keyword} onChange={onChange} onKeyDown={onKeyDown} placeholder="검색어를 입력하세요." />
        </form>
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
