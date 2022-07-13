import { Container, Icon } from '@/components/sidebar/menu/style';
import { MenuProps } from '@/shared/types/menu';
import Link from 'next/link';

export const Menu = ({ title, iconUrl, link }: MenuProps) => {
  return (
    <Container>
      <Icon src={iconUrl} />
      <Link href={link}>
        <a>{title}</a>
      </Link>
    </Container>
  );
};
