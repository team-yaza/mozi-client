import React, { useCallback, useLayoutEffect, useState } from 'react';
import Image from 'next/image';

import { useDrag } from '@/hooks/useDrag';
import { useSideBar } from '@/hooks/useSideBar';
import SideBarMenu from '@/components/common/Sidebar/SideBarMenu';
import { ARROWLEFT, ARROWRIGHT, HAMBURGER } from '@/components/common/Figure';
import { Container, ArrowLeftContainer, ControlContainer, LogoContainer, Logo, SideBarResizer } from './styles';
import { getSideBarStateFromLocalStorage } from '@/store/localStorage/sidebar';
import { useTodoListStatistics } from '@/hooks/apis/todo/useTodoListQuery';

const SideBar: React.FC = () => {
  const { data: statistics } = useTodoListStatistics();
  const [isSideBarOpened, setIsSideBarOpened] = useSideBar();
  const [controlIconHovered, setControlIconHovered] = useState(false);
  const [width, setWidth] = useState(300);

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
  }, []);

  const onCloseSideBar = useCallback(() => {
    setIsSideBarOpened(false);
    setWidth(0);
  }, []);

  const onOpenSideBar = useCallback(() => {
    setIsSideBarOpened(true);
    setWidth(300);
  }, []);

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
      // exit={{ width: isSideBarOpened ? width : 0 }}
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
      <SideBarMenu statistics={statistics} />

      {/* 사이드바 크기 조절하는 부분 */}
      <SideBarResizer onMouseDown={startDrag} isVisible={isDragging} />
    </Container>
  );
};

export default SideBar;
