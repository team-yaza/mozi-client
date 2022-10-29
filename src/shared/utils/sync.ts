import { isBackgroundSyncAvailable, sendAuthTokenToServiceWorker } from './serviceWorker';
import { SYNC_TODOS } from '@/shared/constants/serviceWorker';

export const syncTodos = async () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    sendAuthTokenToServiceWorker();

    const registration = await navigator.serviceWorker.ready;
    const isSyncAvailable = await isBackgroundSyncAvailable();

    if (isSyncAvailable) {
      await registration.sync.register(SYNC_TODOS);
      // const tags = await registration.sync.getTags();
      // console.log(tags, '태그요 ㅎㅎ');
    } else {
      console.log('데이터베이스 동기화 요청에 실패했습니다.');
    }
  }
};
