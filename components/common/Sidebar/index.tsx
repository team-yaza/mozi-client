import React, { useState } from 'react';
import Image from 'next/image';

import { Container, LogoContainer, SideBarContents, SideBarMenuContainer, SideBarResizer } from './styles';
import { Menu } from '@/shared/types/menu';
import SideBarMenu from '@/components/common/Sidebar/SideBarMenu';
import { useDrag } from '@/hooks/useDrag';

const menuList = [
  {
    title: 'Inbox',
    link: '/',
  },
  {
    title: 'Today',
    link: '/today',
  },
  {
    title: 'Map',
    link: '/map',
  },
];

interface SideBarProps {
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onClose }) => {
  const [width, setWidth] = useState(300);
  const { isDragging, startDrag } = useDrag((movement) => {
    const nextWidth = width + movement.x;
    if (nextWidth <= 90) {
      // ! 상위 컴포넌트에서 onClose 메서드는 구현되지 않았습니다.
      onClose();

      // ! onClose는 구현되지 않았기 때문에 setWidth로 넓이 이동만 합니다.
      setWidth(nextWidth);

      return;
    }

    setWidth(nextWidth);
  });

  return (
    <Container tabIndex={0} style={{ width }}>
      <LogoContainer>
        <Image src="/assets/svgs/mozi.svg" layout="fill" />
      </LogoContainer>
      <SideBarContents>
        <SideBarMenuContainer>
          {menuList.map((menu: Menu) => (
            <SideBarMenu key={menu.title} title={menu.title} link={menu.link} />
          ))}
        </SideBarMenuContainer>
      </SideBarContents>
      <SideBarResizer onMouseDown={startDrag} isVisible={isDragging} />
    </Container>
  );
};

export default React.memo(SideBar);

// ! SideBar의 두번째 구현입니다. 위 방법과 다른 방법으로 구현했고 추후 사용할 가능성이 존재해서 코드베이스로 남겨두었습니다.

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
