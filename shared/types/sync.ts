export interface SyncManager {
  getTags(): Promise<string[]>;
  register(tag: string): Promise<void>;
}
