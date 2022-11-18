import { useQuery } from '@tanstack/react-query';

import locationService from '@/services/apis/location';
import { queryKeys } from '@/shared/constants/queryKey';

export const useLocationQuery = () => {
  return useQuery<any, any, any, any>([queryKeys.RECOMMENED_LOCATION], locationService.getRecommendationResult);
};
