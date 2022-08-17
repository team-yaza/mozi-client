import { SYNC_TODOS } from '@/shared/constants/sync';

export const syncTodos = async () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;
    registration.sync.register(SYNC_TODOS);
    // syncManager 확인하는 코드
    // registration.sync
    //   .register('hello-sync')
    //   .then(() => {
    //     return registration.sync.getTags();
    //   })
    //   .then((tags) => {
    //     console.log(tags);
    //   });
  }
};
