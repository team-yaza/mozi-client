const fetchURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/v1' : 'https://mozi-server.com/api/v1';

const webPushService = {
  notification: async (subscription: string) => {
    await fetch(`${fetchURL}/webpush/`, {
      method: 'POST',
      body: subscription,
      headers: {
        'content-type': 'application/json',
      },
    });
  },
};

export default webPushService;
