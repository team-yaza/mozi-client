import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom: persistSideBarAtom } = recoilPersist({
  key: 'SideBarState',
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
});

const { persistAtom: persistSearchSideBarAtom } = recoilPersist({
  key: 'SearchSideBarState',
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
});

export const sideBarStateAtom = atom<boolean>({
  key: 'SideBarState',
  default: true,
  effects: [persistSideBarAtom],
});

export const searchSideBarAtom = atom<boolean>({
  key: 'SearchSideBarState',
  default: true,
  effects: [persistSearchSideBarAtom],
});
