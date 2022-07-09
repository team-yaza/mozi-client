import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});
