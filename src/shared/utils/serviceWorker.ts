/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from '@sentry/nextjs';
import { TOKEN } from '@/shared/constants/serviceWorker';
import { SERVICE_WORKER_REGISTRATION_ERROR } from '@/shared/constants/dialog';
import { getCookie } from './cookie';
import { toastError } from './toast';

export const getServiceWorkerRegistration = async () => {
  try {
    return await navigator.serviceWorker.ready;
  } catch (error) {
    toastError(SERVICE_WORKER_REGISTRATION_ERROR);
    Sentry.captureException(error);
  }

  return null;
};

export const isBackgroundSyncAvailable = async () => {
  try {
    const status = await navigator.permissions.query({
      name: <any>'periodic-background-sync',
    });

    if (status.state === 'granted') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
};

export const registerBackgroundSync = async (tag: string) => {
  const registration = await getServiceWorkerRegistration();

  if (registration) {
    return await registration.sync.register(tag);
  }

  return null;
};

export const sendAuthTokenToServiceWorker = () => {
  navigator.serviceWorker.controller?.postMessage({
    type: TOKEN,
    token: getCookie('token'),
  });
};

export const sendMessageToServiceWorker = (message: any) => {
  navigator.serviceWorker.controller?.postMessage(message);
};
