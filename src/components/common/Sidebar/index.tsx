import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import { useDrag } from '@/hooks/useDrag';
import { useSideBar } from '@/hooks/useSideBar';
import SideBarMenu from '@/components/common/Sidebar/SideBarMenu';
import { ARROWLEFT, ARROWRIGHT, HAMBURGER } from '@/components/common/Figure';
import { Container, ArrowLeftContainer, ControlContainer, LogoContainer, Logo, SideBarResizer } from './styles';
import { getSideBarStateFromLocalStorage } from '@/store/localStorage/sidebar';

const SideBar: React.FC = () => {
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

  useEffect(() => {
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
      <SideBarMenu />

      {/* 사이드바 크기 조절하는 부분 */}
      <SideBarResizer onMouseDown={startDrag} isVisible={isDragging} />
    </Container>
  );
};

export default SideBar;

// ! SideBar의 두번째 구현입니다. 위 방법과 다른 방법으로 구현했고 추후 사용할 가능성이 존재해서 코드베이스로 남겨두었습니다.
//
// const SideBar: React.FC = () => {
//   const sideBarRef = useRef<HTMLDivElement>(null);
//   const [isResizing, setIsResizing] = useState(false);
//   const [sideBarWidth, setSideBarWidth] = useState<number>(190);

//   const resize = useCallback(
//     (mouseEvent: MouseEvent) => {
//       mouseEvent.stopPropagation();
//       if (isResizing && sideBarRef.current) {
//         setSideBarWidth(mouseEvent.clientX - sideBarRef.current.getBoundingClientRect().left);
//       }
//     },
//     [isResizing]
//   );

//   const startResizing = useCallback(() => {
//     setIsResizing(true);
//   }, []);

//   const stopResizing = useCallback(() => {
//     setIsResizing(false);
//   }, []);

//   useEffect(() => {
//     window.addEventListener('mousemove', resize);
//     window.addEventListener('mouseup', stopResizing);
//     return () => {
//       window.removeEventListener('mousemove', resize);
//       window.removeEventListener('mouseup', stopResizing);
//     };
//   }, [resize, stopResizing]);

//   return (
//     <Container width={sideBarWidth}>
//       <SideBarContents ref={sideBarRef} onMouseDown={(e) => e.preventDefault()}>
//         <SideBarMenuContainer>
//           {menuList.map((menu: Menu, index: number) => (
//             // TODO index는 키이면 안되므로 다음에 수정 필요
//             <SideBarMenu key={index} title={menu.title} iconUrl={menu.iconUrl} link={menu.link} />
//           ))}
//         </SideBarMenuContainer>
//         <SideBarResizer onMouseDown={startResizing} />
//       </SideBarContents>
//     </Container>
//   );
// };

// export default SideBar;
