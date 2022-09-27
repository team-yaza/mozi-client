import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { sideBarStateAtom } from '@/store/sidebar/atom';

export const useSideBar = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [isSideBarOpened, setIsSideBarOpened] = useRecoilState(sideBarStateAtom);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? true : isSideBarOpened, setIsSideBarOpened] as const;
};
