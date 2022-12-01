import { useRouter } from 'next/router';

import { SETTING } from '@/components/common/Figure';
import { Container, SettingContainer } from './styles';

const Header: React.FC = () => {
  const router = useRouter();

  const onClick = () => {
    router.push('/setting');
  };

  return (
    <Container>
      <SettingContainer onClick={onClick}>
        <SETTING width="20" height="20" />
      </SettingContainer>
    </Container>
  );
};

export default Header;
