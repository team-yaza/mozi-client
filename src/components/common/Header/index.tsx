import { useRouter } from 'next/router';

import { SETTING } from '@/components/common/Figure';
import { Container, SettingContainer } from './styles';

const Header: React.FC = () => {
  const router = useRouter();

  const onClickSettingHandler = () => {
    router.push('/setting');
  };

  return (
    <Container>
      <SettingContainer onClick={onClickSettingHandler}>
        <SETTING />
      </SettingContainer>
    </Container>
  );
};

export default Header;
