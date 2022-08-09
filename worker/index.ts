export {};

declare const self: ServiceWorkerGlobalScope;

// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging

self.__WB_DISABLE_DEV_LOGS = true;

// const WB_MANIFEST = self.__WB_MANIFEST;

const CACHE_NAME = 'mozi-v1';

self.addEventListener('fetch', (event) => {
  event?.respondWith(
    fetch(event.request)
      .catch(() => {
        //오프라인이면 캐시에서 데이터 가져옴
        return caches.match(event.request).then((response: any) => {
          //있으면 그거 가져옴
          if (response) return response;
          //없으면 ...
          else {
            console.log(1);
          }
        });
      })
      .then(async (reponse: any) => {
        const cacheResponse = await caches.match(event.request);
        //있으면 이전 캐시 지우고 최신걸로 업데이트
        if (cacheResponse) {
          console.log('있어요.', reponse);
          return reponse;
        }
        //없으면 새로운 캐시 등록
        else {
          console.log('없어요', reponse);
          const cache = await caches.open(CACHE_NAME);
          cache.add(event.request);
          return reponse;
        }
      })
  );
});

self.addEventListener('push', (event) => {
  const data = event?.data.json();
  console.log('push 받음');
  self.registration.showNotification(data.title, {
    body: 'Notified by Noel',
    icon: 'https://tistory2.daumcdn.net/tistory/2794117/attach/aa31f12030a2404cafc028e2c8e2b1af',
  });
});
