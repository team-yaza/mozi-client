import React, { useState } from 'react';

import { Container, SearchContainer, SearchInput, SideBarToggleButton, IconContainer } from './styles';
import RecentSearch from './RecentSearch';
import SIDEBARARROWLEFT from '@/components/common/Figure/SIDEBARARROWLEFT';

const SearchSideBar: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
  };

  // const changeAddressToCoordinate = (address: string) => {
  //   naver.maps.Service.geocode(
  //     {
  //       query: address,
  //     },
  //     (status, response) => {
  //       if (status === naver.maps.Service.Status.ERROR) {
  //         // TODO alert 제거
  //         return alert('네이버 지도에서 문제가 발생했습니다.');
  //       } else if (response.v2.meta.totalCount === 0) {
  //         // TODO alert 제거
  //         return alert('올바른 주소를 입력해주세요.');
  //       }

  //       // const htmlAddress = [];
  //       const item = response.v2.addresses[0];
  //       // const point = new naver.maps.Point(Number(item.x), Number(item.y));

  //       // if (item.roadAddress) {
  //       //   htmlAddress.push('[도로명 주소] ' + item.roadAddress);
  //       // }
  //       // if (item.jibunAddress) {
  //       //   htmlAddress.push('[지번 주소] ' + item.jibunAddress);
  //       // }
  //       // if (item.englishAddress) {
  //       //   htmlAddress.push('[영문명 주소] ' + item.englishAddress);
  //       // }

  //       const map = new naver.maps.Map('map', {
  //         center: new naver.maps.LatLng(Number(item.y), Number(item.x)),
  //         zoom: 14,
  //       });

  //       new naver.maps.Marker({
  //         map: map,
  //         position: new naver.maps.LatLng(Number(item.y), Number(item.x)),
  //       });
  //     }
  //   );
  // };

  const searchAddressList = (address: string) => {
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
          // return alert('올바른 주소를 입력해주세요.');
        }

        // const htmlAddress = [];

        console.log(response);
        alert(Object.entries(response.v2));
        console.log(response.v2.addresses);
        // const item = response.v2.addresses[0];
      }
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    searchAddressList(e.target.value);
  };

  return (
    <Container isSearchBarOpen={isSearchBarOpen}>
      <SearchContainer>
        {/* <form onSubmit={onSubmit}> */}
        {/* <Input value={keyword} onChange={onChange} onKeyDown={onKeyDown} placeholder="검색어를 입력하세요." /> */}
        {/* </form> */}

        {/* 제출하는 것이 아닌, onChange에 debouncing을 걸어야한다. */}
        <SearchInput value={keyword} onChange={onChange} onKeyDown={onKeyDown} placeholder="검색어를 입력하세요." />
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
