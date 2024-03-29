import { SyncManager } from './sync';

declare global {
  interface Window {
    workbox: any;
    Kakao: any;
    toggleDevtools: () => void;
  }
  interface ServiceWorkerRegistration {
    readonly sync: SyncManager;
  }

  interface SyncEvent extends ExtendableEvent {
    readonly lastChance: boolean;
    readonly tag: string;
  }

  interface ServiceWorkerGlobalScopeEventMap {
    sync: SyncEvent;
  }
}
