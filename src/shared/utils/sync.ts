import { isBackgroundSyncAvailable, sendAuthTokenToServiceWorker } from './serviceWorker';
import { SYNC_TODOS } from '@/shared/constants/serviceWorker';

export const syncTodos = async () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    sendAuthTokenToServiceWorker(); // 서비스워커에서 요청을 보내려면 토큰이 필요

    const registration = await navigator.serviceWorker.ready;
    const isSyncAvailable = await isBackgroundSyncAvailable();

    if (isSyncAvailable) {
      await registration.sync.register(SYNC_TODOS);
    } else {
      console.log('데이터베이스 동기화 요청에 실패했습니다.');
    }
    // try {
    //   const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;

    //   // registration.pushManager.subscribe

    //   // navigator.serviceWorker.controller.postMessage({
    //   //   type: 'SET_INTERVAL',
    //   //   latitude: myLocationRef.current.latitude,
    //   //   longitude: myLocationRef.current.longitude,
    //   // });

    //   await registration.sync.register(SYNC_TODOS);
    //   const tags = await registration.sync.getTags();
    //   console.log(tags);
    // } catch (e) {
    //   console.log(e);
    //   console.log('싱크이벤트 등록 에러');
    // }
  }
};
