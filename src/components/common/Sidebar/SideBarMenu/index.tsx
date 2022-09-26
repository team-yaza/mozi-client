import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { Container, Count, IconContainer, MenuName, SideBarMenuItem, SideBarMenuList } from './styles';
import { INBOX, TODAY, MAP, UPCOMING, TRASH } from '@/components/common/Figure';
import { useRecoilValue } from 'recoil';
import { todosCountState } from '@/store/todo/atom';

const SideBarMenu: React.FC = () => {
  const todosCount = useRecoilValue(todosCountState);

  const router = useRouter();

  const renderMenuItem = useCallback(() => {
    return (
      <>
        <Link href="/">
          <a>
            <SideBarMenuItem focused={router.pathname === '/'}>
              <IconContainer>
                <INBOX focused={router.pathname === '/'} />
              </IconContainer>
              <MenuName>Inbox</MenuName>
              <Count>{todosCount}</Count>
            </SideBarMenuItem>
          </a>
        </Link>
        <Link href="/today">
          <a>
            <SideBarMenuItem focused={router.pathname === '/today'}>
              <IconContainer>
                <TODAY focused={router.pathname === '/today'} />
              </IconContainer>
              <MenuName>Today</MenuName>
              <Count>1</Count>
            </SideBarMenuItem>
          </a>
        </Link>
        <Link href="/map">
          <a>
            <SideBarMenuItem focused={router.pathname === '/map'}>
              <IconContainer>
                <MAP focused={router.pathname === '/map'} />
              </IconContainer>
              <MenuName>Map</MenuName>
              <Count>5</Count>
            </SideBarMenuItem>
          </a>
        </Link>
        <Link href="/upcoming">
          <a>
            <SideBarMenuItem focused={router.pathname === '/upcoming'}>
              <IconContainer>
                <UPCOMING focused={router.pathname === '/upcoming'} />
              </IconContainer>
              <MenuName>Upcoming</MenuName>
              <Count>12</Count>
            </SideBarMenuItem>
          </a>
        </Link>
        <Link href="/trash">
          <a>
            <SideBarMenuItem focused={router.pathname === '/trash'}>
              <IconContainer>
                <TRASH focused={router.pathname === '/trash'} />
              </IconContainer>
              <MenuName>Trash</MenuName>
              <Count>32</Count>
            </SideBarMenuItem>
          </a>
        </Link>
      </>
    );
  }, [router.pathname, todosCount]);

  return (
    <Container>
      <SideBarMenuList>{renderMenuItem()}</SideBarMenuList>
    </Container>
  );
};

export default SideBarMenu;
