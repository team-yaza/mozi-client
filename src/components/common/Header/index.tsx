import SETTING from '../Figure/SETTING';
import { Container, SettingContainer } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <SettingContainer>
        <SETTING />
      </SettingContainer>
    </Container>
  );
};

export default Header;
