import Link from 'next/link';

import { Container, Icon } from '@/components/sidebar/menu/style';

interface MenuProps {
  title: string;
  iconUrl: string;
  link: string;
}

const SideBarMenu: React.FC<MenuProps> = ({ title, iconUrl, link }) => {
  return (
    <Container>
      <Icon src={iconUrl} />
      <Link href={link}>
        <a>{title}</a>
      </Link>
    </Container>
  );
};

export default SideBarMenu;
