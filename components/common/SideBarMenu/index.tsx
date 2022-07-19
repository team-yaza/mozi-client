import Link from 'next/link';

import { Container, Icon } from './styles';

interface SideBarMenuProps {
  title: string;
  iconUrl: string;
  link: string;
}

const SideBarMenu: React.FC<SideBarMenuProps> = ({ title, iconUrl, link }) => {
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
