import React, { useState } from 'react';
import { Container, Input } from './styles';

const SearchInput: React.FC = () => {
  const [keyword, setKeyword] = useState('');

  const onKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    console.log(e.key);
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
        const marker = new naver.maps.Marker({
          map: map,
          position: new naver.maps.LatLng(Number(item.y), Number(item.x)),
        });
        naver.maps.Event.addListener(map, 'click', function (e) {
          marker.setPosition(e.coord);
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
    <Container>
      <form onSubmit={onSubmit}>
        <Input value={keyword} onChange={onChange} onKeyDown={onKeyDown} />
      </form>
    </Container>
  );
};

export default SearchInput;
