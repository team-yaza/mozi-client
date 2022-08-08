export {};

declare const self: ServiceWorkerGlobalScope;

// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging

self.__WB_DISABLE_DEV_LOGS = true;

// const WB_MANIFEST = self.__WB_MANIFEST;

self.addEventListener('fetch', (event) => {
  // console.log(event?.request.url);
});

self.addEventListener('push', (event) => {
  const data = event?.data.json();
  console.log('push 받음');
  self.registration.showNotification(data.title, {
    body: 'Notified by Noel',
    icon: 'https://tistory2.daumcdn.net/tistory/2794117/attach/aa31f12030a2404cafc028e2c8e2b1af',
  });
});
