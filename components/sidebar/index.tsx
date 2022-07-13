import { Container } from '@/components/sidebar/styled';
import { Menu } from '@/components/sidebar/menu';
import { MenuProps } from '@/shared/types/menu';

const MenuList: MenuProps[] = [
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
      {MenuList.map((menu: MenuProps) => (
        <Menu title={menu.title} iconUrl={menu.iconUrl} link={menu.link} />
      ))}
    </Container>
  );
};

export default SideBar;
