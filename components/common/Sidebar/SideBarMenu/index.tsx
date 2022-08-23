import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

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
  const router = useRouter();

  console.log(router.pathname);

  const renderMenuItem = useCallback(() => {
    return (
      <>
        <Link href="/">
          <a>
            <SideBarMenuItem focused={router.pathname === '/'}>
              <IconContainer>
                <INBOX focused={router.pathname === '/'} />
              </IconContainer>
              <MenuName>Inbox</MenuName>
              <Count>2</Count>
            </SideBarMenuItem>
          </a>
        </Link>
        <Link href="/today">
          <a>
            <SideBarMenuItem focused={router.pathname === '/today'}>
              <IconContainer>
                <TODAY focused={router.pathname === '/today'} />
              </IconContainer>
              <MenuName>Today</MenuName>
              <Count>1</Count>
            </SideBarMenuItem>
          </a>
        </Link>
        <Link href="/map">
          <a>
            <SideBarMenuItem focused={router.pathname === '/map'}>
              <IconContainer>
                <MAP focused={router.pathname === '/map'} />
              </IconContainer>
              <MenuName>Map</MenuName>
              <Count>5</Count>
            </SideBarMenuItem>
          </a>
        </Link>
        <Link href="/upcoming">
          <a>
            <SideBarMenuItem focused={router.pathname === '/upcoming'}>
              <IconContainer>
                <UPCOMING focused={router.pathname === '/upcoming'} />
              </IconContainer>
              <MenuName>Upcoming</MenuName>
              <Count>12</Count>
            </SideBarMenuItem>
          </a>
        </Link>
        <Link href="/trash">
          <a>
            <SideBarMenuItem focused={router.pathname === '/trash'}>
              <IconContainer>
                <TRASH focused={router.pathname === '/trash'} />
              </IconContainer>
              <MenuName>Trash</MenuName>
              <Count>32</Count>
            </SideBarMenuItem>
          </a>
        </Link>
      </>
    );
  }, [router.pathname]);

  return (
    <Container>
      <SideBarMenuList>{renderMenuItem()}</SideBarMenuList>
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
