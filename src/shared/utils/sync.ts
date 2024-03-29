import { isBackgroundSyncAvailable, sendAuthTokenToServiceWorker } from './serviceWorker';
import { SYNC_TODOS } from '@/shared/constants/serviceWorker';
import { toastError } from './toast';

export const syncTodos = async () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    sendAuthTokenToServiceWorker();

    const registration = await navigator.serviceWorker.ready;
    const isSyncAvailable = await isBackgroundSyncAvailable();

    if (isSyncAvailable) {
      await registration.sync.register(SYNC_TODOS);
    } else {
      toastError('데이터베이스 동기화 요청에 실패했습니다');
    }
  }
};
