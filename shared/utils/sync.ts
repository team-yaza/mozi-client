import { SYNC_TODOS } from '@/shared/constants/sync';

export const syncTodos = async () => {
  const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;
  registration.sync.register(SYNC_TODOS);
};
