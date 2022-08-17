import { SYNC_TODOS } from '@/shared/constants/sync';

export const syncTodos = async () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      // 권한을 확인하는 코드 -> 설치된 PWA에서만 sync 권한이 부여된다.
      // navigator.permissions.query({ name: 'periodic-background-sync' }).then((status) => {
      //   console.log(status);
      // });

      const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;
      await registration.sync.register(SYNC_TODOS);

      const tags = await registration.sync.getTags();
      console.log(tags);

      // syncManager 확인하는 코드
      // registration.sync
      //   .register('hello-sync')
      //   .then(() => {
      //     return registration.sync.getTags();
      //   })
      //   .then((tags) => {
      //     console.log(tags);
      //   });
    } catch (e) {
      console.log(e);
    }
  }
};
