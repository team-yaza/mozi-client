export {};

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'mozi-v1';
// const CACHED_URLS = ['/_next/static/'];

self.__WB_DISABLE_DEV_LOGS = true;

self.addEventListener('install', (event) => {
  console.log('service worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('service worker activated');
});

self.addEventListener('fetch', async (event) => {
  if (event) {
    try {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);

      if (cachedResponse) return cachedResponse;

      const fetchedResponse = await fetch(event.request);
      cache.put(event.request, fetchedResponse.clone());

      return fetchedResponse;
    } catch (error) {
      console.error(error);
    }
  }
});

self.addEventListener('push', (event) => {
  const data = event?.data.json();
  console.log('push 받음');
  self.registration.showNotification(data.title, {
    body: 'Notified by Noel',
    icon: 'https://tistory2.daumcdn.net/tistory/2794117/attach/aa31f12030a2404cafc028e2c8e2b1af',
  });
});

// event?.waitUntil(
//   caches.open(CACHE_NAME).then((cache) => {
//     return cache.addAll(CACHED_URLS);
//   })
// );

// caches.open(CACHE_NAME).then((cache) => {
//   return cache.match(event.request.url).then((cachedResponse) => {
//     if (cachedResponse) return cachedResponse;
//     return fetch(event.request).then((fetchedResponse) => {
//       cache.put(event.request, fetchedResponse.clone());
//       return fetchedResponse;
//     });
//   });
// });
// self.addEventListener('fetch', (event) => {
//   if (event?.request)
//     caches.match(event.request).then((res) => {
//       // return res as Response;
//       if (res) {
//         return res;
//       } else {
//         return fetch(event.request);
//       }
//     });
// 내가 보낸 요청이 cache (MOZI -v 1 )에 있으면
// 그거 가져옴.
// 없으면 fetch 네트워크
// caches.match();
// window. workbox 왜 필요?? -> 이걸로 뭐할거임?? 이게 우리가 쓰는게 아니면

// 얘는
// 타입을 넣을 필요도 없지않음??
// 필요한거임?? 워크박스?? 나도 쓰기 싫어 근데 next-pwa 알아서 우리의 서비스 워커 코드를 워크박스로 바꿔버림
// 근데 next-pwa 안쓰면 서비스워커를 등록을 못하겠음
// 근데우리가 workbox에 접근할 일 있음???
// window.Workbox ??

// 상관없는거아님?? 오류를 보여줘
// event?.respondWith(
//   fetch(event.request)
//     .catch(() => {
//       //오프라인이면 캐시에서 데이터 가져옴
//       return caches.match(event.request).then((response: any) => {
//         //있으면 그거 가져옴
//         if (response) return response;
//         //없으면 ...
//         else {
//           console.log(1);
//         }
//       });
//     })
//     .then(async (reponse: any) => {
//       const cacheResponse = await caches.match(event.request);
//       //있으면 이전 캐시 지우고 최신걸로 업데이트
//       if (cacheResponse) {
//         console.log('있어요.', reponse);
//         return reponse;
//       }
//       //없으면 새로운 캐시 등록
//       else {
//         console.log('없어요', reponse);
//         const cache = await caches.open(CACHE_NAME);
//         cache.add(event.request);
//         return reponse;
//       }
//     })
// );
// });

// // Listen for requests

// self.addEventListener('fetch', (event) => {
// console.log(event?.request.url);
// event?.respondWith(
//   fetch(event.request)
//     .catch(() => {
//       //오프라인이면 캐시에서 데이터 가져옴
//       return caches.match(event.request).then((response: any) => {
//         //있으면 그거 가져옴
//         if (response) return response;
//         //없으면 ...
//         else {
//           console.log(1);
//         }
//       });
//     })
//     .then(async (reponse: any) => {
//       const cacheResponse = await caches.match(event.request);
//       //있으면 이전 캐시 지우고 최신걸로 업데이트
//       if (cacheResponse) {
//         console.log('있어요.', reponse);
//         return reponse;
//       }
//       //없으면 새로운 캐시 등록
//       else {
//         console.log('없어요', reponse);
//         const cache = await caches.open(CACHE_NAME);
//         cache.add(event.request);
//         return reponse;
//       }
//     })
// );
// });

// self.addEventListener('fetch', (event) => {
//   // event: FetchEvent | undefined;
//   // respondWith(response: Response | Promise<Response>): Promise<Response>
//   if (event) {
//     console.log(event.request.url);

//     event.respondWith(

//     );
//     // caches
//     //   .open('version-1')
//     //   .then((cache) => {
//     //     // console.log(event.request.url);
//     //     cache.match(event.request);
//     //   })
//     //   .then((response) => console.log(response));

//     // caches.open('start-url').then((cache) => {
//     //   cache.match(event.request).then((response) => {
//     //     if (response) {
//     //       console.log(response, '캐시 response');
//     //       event.respondWith(response);
//     //     }
//     //   });
//     // });

//     // self.addEventListener('fetch', function(event) {
//     //   event.respondWith(
//     //     caches.open('mysite-dynamic').then(function(cache) {
//     //       return cache.match(event.request).then(function (response) {
//     //         return response || fetch(event.request).then(function(response) {
//     //           cache.put(event.request, response.clone());
//     //           return response;
//     //         });
//     //       });
//     //     })
//     //   );
//     // });
//   }
// });
