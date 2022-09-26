import { atom } from 'recoil';

export const sideBarStateAtom = atom({
  key: 'sideBarState',
  default: true,
});

export const searchSideBarAtom = atom({
  key: 'searchSideBarState',
  default: true,
});
