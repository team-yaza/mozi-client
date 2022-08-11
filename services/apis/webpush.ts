import fetcher from '@/shared/utils/fetcher';

const webPushService = {
  notification: async (subscription: PushSubscription, id: string) =>
    await fetcher('post', '/webpush', { subscription: JSON.stringify(subscription), id }),
};

export default webPushService;
