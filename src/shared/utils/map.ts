import locationService, { GetSearchResultParams } from '@/services/apis/location';

export const getLocationSearchResult = async ({ longitude, latitude, keyword }: GetSearchResultParams) => {
  const searchResult = await locationService.getsearchResult({ longitude, latitude, keyword });
  return searchResult;
};

export const initMap = (search: string, pos?: number[]) => {
  if (pos) {
    const mapOptions = {
      center: new naver.maps.LatLng(pos[0], pos[1]),
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.RIGHT_BOTTOM,
      },
      logoControlOptions: {
        position: naver.maps.Position.RIGHT_BOTTOM,
      },
      scaleControl: false,
      scaleControlOptions: {
        position: naver.maps.Position.RIGHT_CENTER,
      },
      mapDataControl: false,
    };
    const map = new naver.maps.Map('map', mapOptions);
    return map;
  }

  const mapOptions = {
    zoomControl: true,
    zoomControlOptions: {
      style: naver.maps.ZoomControlStyle.SMALL,
      position: naver.maps.Position.RIGHT_BOTTOM,
    },
    logoControlOptions: {
      position: naver.maps.Position.RIGHT_BOTTOM,
    },
    scaleControl: false,
    scaleControlOptions: {
      position: naver.maps.Position.RIGHT_CENTER,
    },
    mapDataControl: false,
  };
  const map = new naver.maps.Map('map', mapOptions);

  if (!search) return map;

  // getMapCenterByInputs(map, search)
  //   .then((result: boolean) => {
  //     console.log('wow', result);
  //   })
  //   .catch((err: boolean) => {
  //     console.error('wow', err);
  //   });
  return map;
};
