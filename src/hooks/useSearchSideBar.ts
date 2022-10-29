import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { searchSideBarAtom } from '@/store/sidebar/atom';

export const useSearchSideBar = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [isSearchSideBarOpened, setIsSearchSideBarOpened] = useRecoilState(searchSideBarAtom);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? true : isSearchSideBarOpened, setIsSearchSideBarOpened] as const;
};
