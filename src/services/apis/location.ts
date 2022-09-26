import fetcher from '@/shared/utils/fetcher';

export interface GetSearchResultParams {
  keyword: string;
  latitude: number;
  longitude: number;
}

const locationService = {
  getsearchResult: async ({ keyword, latitude, longitude }: GetSearchResultParams) =>
    await fetcher('post', '/location/nearby', { keyword, latitude, longitude }),
};

export default locationService;
