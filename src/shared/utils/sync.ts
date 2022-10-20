import { SYNC_TODOS } from '@/shared/constants/sync';
import { getCookie } from './cookie';

export const syncTodos = async () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      // 권한을 확인하는 코드 -> 설치된 PWA에서만 sync 권한이 부여된다.
      // navigator.permissions.query({ name: 'periodic-background-sync' }).then((status) => {
      //   console.log(status);
      // });

      const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;

      // registration.pushManager.subscribe

      // navigator.serviceWorker.controller.postMessage({
      //   type: 'SET_INTERVAL',
      //   latitude: myLocationRef.current.latitude,
      //   longitude: myLocationRef.current.longitude,
      // });

      navigator.serviceWorker.controller?.postMessage({
        type: 'TOKEN',
        token: getCookie('token'),
      });

      await registration.sync.register(SYNC_TODOS);
      const tags = await registration.sync.getTags();
      console.log(tags);
    } catch (e) {
      console.log(e);
      console.log('싱크이벤트 등록 에러');
    }
  }
};
