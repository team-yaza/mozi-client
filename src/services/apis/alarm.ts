import fetcher from '@/shared/utils/fetcher';

const alarmService = {
  getAlarms: async () => await fetcher('get', '/alarm'),
};

export default alarmService;
