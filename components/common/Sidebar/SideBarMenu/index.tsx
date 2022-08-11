import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { Container, IconContainer } from './styles';
import TODAY from '@/components/common/Figure/TODAY';
import INBOX from '@/components/common/Figure/INBOX';
import MAP from '@/components/common/Figure/MAP';

interface SideBarMenuProps {
  title: string;
  link: string;
}

const SideBarMenu: React.FC<SideBarMenuProps> = ({ title, link }) => {
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === link) setFocused(true);
  }, []);

  const renderCategory = useCallback((categoryName: string) => {
    switch (categoryName) {
      case 'Inbox':
        return <INBOX stroke={focused ? '#735AFF' : '#585858'} />;
      case 'Today':
        return <TODAY stroke={focused ? '#735AFF' : '#585858'} />;
      case 'Map':
        return <MAP stroke={focused ? '#735AFF' : '#585858'} />;
      default:
        return null;
    }
  }, []);

  return (
    <Container focused={focused}>
      <IconContainer>{renderCategory(title)}</IconContainer>
      <Link href={link}>
        <a>{title}</a>
      </Link>
    </Container>
  );
};

export default SideBarMenu;
