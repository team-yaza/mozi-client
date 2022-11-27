import fetcher from '@/shared/utils/fetcher';

export interface GetSearchResultParams {
  longitude?: number;
  latitude?: number;
  keyword?: string;
}

const locationService = {
  getsearchResult: async ({ longitude, latitude, keyword }: GetSearchResultParams) =>
    await fetcher('get', `/location?keyword=${keyword}&longitude=${longitude}&latitude=${latitude}`, {
      longitude,
      latitude,
      keyword,
    }),
  getRecommendationResult: async ({ longitude, latitude }: GetSearchResultParams) =>
    await fetcher('get', `/location?longitude=${longitude}&latitude=${latitude}&recommended=true`, {
      longitude,
      latitude,
    }),
};

export default locationService;
