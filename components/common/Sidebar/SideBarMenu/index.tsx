// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useCallback, useEffect, useState } from 'react';

import { Container, Count, IconContainer, MenuName, SideBarMenuItem, SideBarMenuList } from './styles';
// import TODAY from '@/components/common/Figure/TODAY';
// import INBOX from '@/components/common/Figure/INBOX';
// import MAP from '@/components/common/Figure/MAP';
// import { UPCOMING } from '../../Figure';

import { INBOX, TODAY, MAP, UPCOMING, TRASH } from '@/components/common/Figure';

// interface SideBarMenuProps {
//   // title: string;
//   // link: string;
// }

const SideBarMenu: React.FC = () => {
  return (
    <Container>
      <SideBarMenuList>
        <SideBarMenuItem>
          <IconContainer>
            <INBOX />
          </IconContainer>
          <MenuName>Inbox</MenuName>
          <Count>2</Count>
        </SideBarMenuItem>
        <SideBarMenuItem>
          <IconContainer>
            <TODAY />
          </IconContainer>
          <MenuName>Today</MenuName>
          <Count>1</Count>
        </SideBarMenuItem>
        <SideBarMenuItem>
          <IconContainer>
            <MAP />
          </IconContainer>
          <MenuName>Map</MenuName>
          <Count>5</Count>
        </SideBarMenuItem>
        <SideBarMenuItem>
          <IconContainer>
            <UPCOMING />
          </IconContainer>
          <MenuName>Upcoming</MenuName>
          <Count>12</Count>
        </SideBarMenuItem>
        <SideBarMenuItem>
          <IconContainer>
            <TRASH />
          </IconContainer>
          <MenuName>Trash</MenuName>
          <Count>32</Count>
        </SideBarMenuItem>
      </SideBarMenuList>
    </Container>
  );
};

export default SideBarMenu;

// const [focused, setFocused] = useState(false);
// const router = useRouter();
// useEffect(() => {
//   if (router.pathname === link) setFocused(true);
// }, []);
// const renderCategory = useCallback((categoryName: string) => {
//   switch (categoryName) {
//     case 'Inbox':
//       return <INBOX stroke={focused ? '#735AFF' : '#585858'} />;
//     case 'Today':
//       return <TODAY stroke={focused ? '#735AFF' : '#585858'} />;
//     case 'Map':
//       return <MAP stroke={focused ? '#735AFF' : '#585858'} />;
//     default:
//       return null;
//   }
// }, []);
// return (
//   <Container focused={focused}>
//     <IconContainer>{renderCategory(title)}</IconContainer>
//     <Link href={link}>
//       <a>{title}</a>
//     </Link>
//   </Container>
// );
