import Link from 'next/link';
import { Container, Icon } from '@/components/sidebar/menu/style';
import { MenuProps } from '@/shared/types/menu';

export const Menu = ({ title, iconUrl, link }) => {
  return (
    <Container>
      <Icon src={iconUrl} />
      <Link href={link}>
        <a>{title}</a>
      </Link>
    </Container>
  );
};
