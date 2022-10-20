/* eslint-disable @typescript-eslint/no-explicit-any */
export const getServiceWorkerRegistration = async () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      return await navigator.serviceWorker.ready;
    } catch (error) {
      console.log(error);
      console.log('웹 사이트를 로드하는데 실패했습니다. 새로고침을 해주세요.');
    }
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

export const registerBackgroundSync = async (tag: string) => {
  const registration = await getServiceWorkerRegistration();

  if (registration) {
    return await registration.sync.register(tag);
  }

  return null;
};

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
