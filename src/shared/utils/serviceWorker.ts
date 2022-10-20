/* eslint-disable @typescript-eslint/no-explicit-any */
export const getServiceWorkerRegistration = async () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    return await navigator.serviceWorker.ready;
  }

  return null;
};

export const isBackgroundSyncAvailable = async () => {
  const status = await navigator.permissions.query({
    name: <any>'periodic-background-sync',
  });

  if (status.state === 'granted') {
    return true;
  } else {
    return false;
  }
};

//   try {
//     // 권한을 확인하는 코드 -> 설치된 PWA에서만 sync 권한이 부여된다.
//     // navigator.permissions.query({ name: 'periodic-background-sync' }).then((status) => {
//     //   console.log(status);
//     // });

//     // registration.pushManager.subscribe
//     // navigator.serviceWorker.controller.postMessage({
//     //   type: 'SET_INTERVAL',
//     //   latitude: myLocationRef.current.latitude,
//     //   longitude: myLocationRef.current.longitude,
//     // });
//     navigator.serviceWorker.controller?.postMessage({
//       type: 'TOKEN',
//       token: getCookie('token'),
//     });
//     await registration.sync.register(SYNC_TODOS);
//     const tags = await registration.sync.getTags();
//     console.log(tags);
//   } catch (e) {
//     console.log(e);
//     console.log('싱크이벤트 등록 에러');
//   }
// }
