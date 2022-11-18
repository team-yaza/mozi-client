import { useQuery } from '@tanstack/react-query';

import locationService, { GetSearchResultParams } from '@/services/apis/location';
import { queryKeys } from '@/shared/constants/queryKey';

export const useLocationQuery = (latitude?: number, longitude?: number) => {
  return useQuery<any, GetSearchResultParams, any, any>([queryKeys.RECOMMENED_LOCATION, { latitude, longitude }], () =>
    locationService.getRecommendationResult({ latitude, longitude })
  );
};
