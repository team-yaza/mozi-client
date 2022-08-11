import { urlBase64ToUint8Array } from '@/shared/utils/encryption';
import webPushService from '@/services/apis/webpush';

const createWebpushInstance = () => {
  const publicVapidKey = 'BHCoqzR03UrjuAFGPoTDB5t6o05z5K3EYJ1cuZVj9sPF6FxNsS-b7y4ClNaS11L9EUpmT-wUyeZAivwGbkwMAjY';
  let sub: PushSubscription | null = null;

  const getServiceWorkerRegister = async () => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      const serviceWorker = await navigator.serviceWorker.ready;
      return serviceWorker;
    }
    return null;
  };

  const subscribe = async () => {
    const serviceWorker = await getServiceWorkerRegister();
    if (!serviceWorker) return null;
    sub = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    return sub;
  };

  return async (id: string) => {
    if (!sub) sub = await subscribe(); //만약 처음이면 등록함
    if (!sub) return; //그래도 없다는건 서비스워커를 지원 안한다는 뜻
    await webPushService.notification(sub, id);
  };
};

const webpush = createWebpushInstance();

export default webpush;
