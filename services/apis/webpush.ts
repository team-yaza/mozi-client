import fetcher from '@/shared/utils/fetcher';

const webPushService = {
  notification: async (subscription: PushSubscription, id: string) =>
    await fetcher('post', `/webpush/${id}`, { subscription: JSON.stringify(subscription) }),
};

export default webPushService;
