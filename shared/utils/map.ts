export const getSearchResult = (address: string): Promise<naver.maps.Service.AddressItemV2[]> => {
  return new Promise((resolve, reject) => {
    naver.maps.Service.geocode(
      {
        query: address,
      },
      (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          return reject([]);
        }

        if (response.v2.meta.totalCount === 0) {
          return reject([]);
        }

        const results = response.v2.addresses;

        return resolve(results);
      }
    );
  });
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
