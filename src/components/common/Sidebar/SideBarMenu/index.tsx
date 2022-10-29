import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { TodoStatistics } from '@/shared/types/todo';
import { INBOX, TODAY, MAP, UPCOMING, TRASH, LOGBOOK } from '@/components/common/Figure';
import { Container, Count, IconContainer, MenuName, SideBarMenuItem, SideBarMenuList } from './styles';

interface SideBarMenuProps {
  statistics: TodoStatistics;
}

const SideBarMenu: React.FC<SideBarMenuProps> = ({ statistics }) => {
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
              <Count>{statistics.inbox}</Count>
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
              <Count>{statistics.map}</Count>
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
        <Link href="/logbook">
          <a>
            <SideBarMenuItem focused={router.pathname === '/logbook'}>
              <IconContainer>
                <LOGBOOK focused={router.pathname === '/logbook'} />
              </IconContainer>
              <MenuName>Logbook</MenuName>
              <Count>{statistics.logbook}</Count>
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
              <Count>{statistics.trash}</Count>
            </SideBarMenuItem>
          </a>
        </Link>
      </>
    );
  }, [router.pathname, statistics]);

  return (
    <Container>
      <SideBarMenuList>{renderMenuItem()}</SideBarMenuList>
    </Container>
  );
};

export default SideBarMenu;
