import SideBarMenu from './menu';
import { Container } from './styles';
import { Menu } from '@/shared/types/menu';

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
];

const SideBar = () => {
  return (
    <Container>
      {menuList.map((menu: Menu, index: number) => (
        // !TODO index는 키이면 안되므로 다음에 수정 필요
        <SideBarMenu key={index} title={menu.title} iconUrl={menu.iconUrl} link={menu.link} />
      ))}
    </Container>
  );
};

export default SideBar;
