import { Container, SideBarContents, SideBarMenuContainer, SideBarResizer } from './styles';
import { Menu } from '@/shared/types/menu';
import SideBarMenu from '@/components/common/Sidebar/SideBarMenu';
import { useCallback, useEffect, useRef, useState } from 'react';

const menuList = [
  {
    title: 'Inbox',
    iconUrl: 'https://user-images.githubusercontent.com/51700274/178726362-ece91e50-ab92-48ca-aec0-54b92c021997.png',
    link: '/',
  },
  {
    title: 'today',
    iconUrl: 'https://user-images.githubusercontent.com/51700274/178726362-ece91e50-ab92-48ca-aec0-54b92c021997.png',
    link: '/today',
  },
  {
    title: 'map',
    iconUrl: 'https://user-images.githubusercontent.com/51700274/178726362-ece91e50-ab92-48ca-aec0-54b92c021997.png',
    link: '/map',
  },
];

const SideBar: React.FC = () => {
  const sideBarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sideBarWidth, setSideBarWidth] = useState<number>(190);

  const resize = useCallback(
    (mouseEvent: MouseEvent) => {
      mouseEvent.stopPropagation();
      if (isResizing && sideBarRef.current) {
        setSideBarWidth(mouseEvent.clientX - sideBarRef.current.getBoundingClientRect().left);
      }
    },
    [isResizing]
  );

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <Container width={sideBarWidth}>
      <SideBarContents ref={sideBarRef} onMouseDown={(e) => e.preventDefault()}>
        <SideBarMenuContainer>
          {menuList.map((menu: Menu, index: number) => (
            // TODO index는 키이면 안되므로 다음에 수정 필요
            <SideBarMenu key={index} title={menu.title} iconUrl={menu.iconUrl} link={menu.link} />
          ))}
        </SideBarMenuContainer>
        <SideBarResizer onMouseDown={startResizing} />
      </SideBarContents>
    </Container>
  );
};

export default SideBar;
