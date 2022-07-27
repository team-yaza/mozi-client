import { useState } from 'react';

import { Container, SideBarContents, SideBarMenuContainer, SideBarResizer } from './styles';
import { Menu } from '@/shared/types/menu';
import SideBarMenu from '@/components/common/Sidebar/SideBarMenu';
import { useDrag } from '@/hooks/useDrag';

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

interface SideBarProps {
  // label: string;
  // content: ReactNode;
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onClose }) => {
  const [width, setWidth] = useState(100);
  const { isDragging, startDrag } = useDrag((movement) => {
    const nextWidth = width + movement.x;
    if (nextWidth <= 90) {
      onClose();
      setWidth(300);
      return;
    }

    setWidth(nextWidth);
  });

  return (
    <Container tabIndex={0} width={width}>
      <SideBarContents>
        <SideBarMenuContainer>
          {menuList.map((menu: Menu, index: number) => (
            // TODO index는 키이면 안되므로 다음에 수정 필요
            <SideBarMenu key={index} title={menu.title} iconUrl={menu.iconUrl} link={menu.link} />
          ))}
        </SideBarMenuContainer>
        <SideBarResizer onMouseDown={startDrag} isVisible={isDragging} />
      </SideBarContents>
    </Container>
  );
};

export default SideBar;
