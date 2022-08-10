const webPushService = {
  notification: async (subscription: string) => {
    await fetch('http://localhost:3001/api/v1/webpush/', {
      method: 'POST',
      body: subscription,
      headers: {
        'content-type': 'application/json',
      },
    });
  },
};

export default webPushService;
