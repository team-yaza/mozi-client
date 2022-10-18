import React, { useCallback, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useDrag } from '@/hooks/useDrag';
import { ARROWLEFT, ARROWRIGHT, HAMBURGER, INBOX, LOGBOOK, MAP, TRASH, UPCOMING } from '@/components/common/Figure';
import { getSideBarStateFromLocalStorage } from '@/store/localStorage/sidebar';
import SideBarMenu from './SideBarMenu/index';
import {
  Container,
  ArrowLeftContainer,
  ControlContainer,
  LogoContainer,
  Logo,
  SideBarResizer,
  SideBarMenuList,
  SideBarMenuContainer,
} from './styles';

export interface SideBarProps {
  statistics: any;
}

const SideBar: React.FC<SideBarProps> = ({ statistics }) => {
  statistics; // 임시
  const [isSideBarOpened, setIsSideBarOpened] = useState(true);
  const [controlIconHovered, setControlIconHovered] = useState(false);
  const [width, setWidth] = useState(300);

  const router = useRouter();

  const { isDragging, startDrag } = useDrag((movement) => {
    const nextWidth = width + movement.x;

    // 드래그 할 수 있다는 것 자체를 사이드바가 열려있다는 것으로 간주
    if (isSideBarOpened === false) {
      setIsSideBarOpened(true);
    }

    if (nextWidth <= width / 3) {
      onCloseSideBar();
      return;
    }

    setWidth(nextWidth);
  });

  useLayoutEffect(() => {
    setIsSideBarOpened(getSideBarStateFromLocalStorage());
  }, [setIsSideBarOpened]);

  const onCloseSideBar = useCallback(() => {
    setIsSideBarOpened(false);
    setWidth(0);
  }, [setIsSideBarOpened, setWidth]);

  const onOpenSideBar = useCallback(() => {
    setIsSideBarOpened(true);
    setWidth(300);
  }, [setIsSideBarOpened, setWidth]);

  const onToggleSideBar = useCallback(() => {
    if (isSideBarOpened) {
      onCloseSideBar();
    } else {
      onOpenSideBar();
    }
  }, [isSideBarOpened]);

  return (
    <Container
      tabIndex={0}
      style={{ width: isSideBarOpened ? width : 0 }}
      initial={{ width: isSideBarOpened ? width : 0 }}
      animate={{ width: isSideBarOpened ? width : 0 }}
    >
      {/* 최상단 사이드바 제어하는 부분 */}
      <ControlContainer>
        <ArrowLeftContainer
          onClick={onToggleSideBar}
          whileHover={{ scale: 1.1 }}
          isSideBarOpened={isSideBarOpened}
          onHoverStart={() => setControlIconHovered(true)}
          onHoverEnd={() => setControlIconHovered(false)}
        >
          {isSideBarOpened ? <ARROWLEFT /> : controlIconHovered ? <ARROWRIGHT /> : <HAMBURGER />}
        </ArrowLeftContainer>
      </ControlContainer>
      {/* MOZI 로고 (임시) 부분 */}
      <LogoContainer>
        <Logo>
          <Image src="/assets/svgs/mozi.svg" layout="fill" />
        </Logo>
      </LogoContainer>

      {/* 사이드바 내용이 들어가는 부분 */}
      {/* <SideBarMenu statistics={statistics} /> */}

      <SideBarMenuContainer>
        <SideBarMenuList>
          <Link href="/">
            <a>
              <SideBarMenu
                icon={<INBOX focused={router.pathname === '/'} />}
                count={0}
                name="Inbox"
                focused={router.pathname === '/inbox'}
              />
            </a>
          </Link>

          <Link href="/map">
            <a>
              <SideBarMenu
                icon={<MAP focused={router.pathname === '/map'} />}
                count={0}
                name="Map"
                focused={router.pathname === '/map'}
              />
            </a>
          </Link>

          <Link href="/upcoming">
            <a>
              <SideBarMenu
                icon={<UPCOMING focused={router.pathname === '/upcoming'} />}
                count={0}
                name="Upcoming"
                focused={router.pathname === '/upcoming'}
              />
            </a>
          </Link>

          <Link href="/logbook">
            <a>
              <SideBarMenu
                icon={<LOGBOOK focused={router.pathname === '/logbook'} />}
                count={0}
                name="Logbook"
                focused={router.pathname === '/logbook'}
              />
            </a>
          </Link>

          <Link href="/trash">
            <a>
              <SideBarMenu
                icon={<TRASH focused={router.pathname === '/trash'} />}
                count={0}
                name={'Trash'}
                focused={router.pathname === '/trash'}
              />
            </a>
          </Link>
        </SideBarMenuList>
      </SideBarMenuContainer>

      {/* 사이드바 크기 조절하는 부분 */}
      <SideBarResizer onMouseDown={startDrag} isVisible={isDragging} />
    </Container>
  );
};

export default SideBar;
