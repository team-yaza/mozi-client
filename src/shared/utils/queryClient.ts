import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
      retry: 0,
      cacheTime: 0,
      // suspense: true,
      networkMode: 'always',
    },
    mutations: {
      retry: 0,
      networkMode: 'always',
    },
  },
});
