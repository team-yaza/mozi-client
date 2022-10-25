import {
  ARROWLEFT,
  ARROWRIGHT,
  BOXARROWRIGHT,
  BOXPLUS,
  CONFIRMBUTTON,
  DEADLINE,
  DELETE,
  FOOTERCALENDAR,
  HAMBURGER,
  INBOX,
  LOGBOOK,
  LOGO,
  MAP,
  MARKER,
  NEXTARROW,
  PLACE,
  PREVARROW,
  SEARCH,
  SEARCHPLACE,
  SETTING,
  SIDEBARARROWLEFT,
  TAG,
  TODAY,
  UPCOMING,
} from '@/components/common/Figure';
import { useCallback } from 'react';
import { Container } from './styles';

interface IconProps {
  name: string;
  width: string;
  height: string;
  stroke?: string;
}

const Icon: React.FC<IconProps> = ({ name, width, height, stroke }) => {
  const renderIconByName = useCallback((name: string) => {
    switch (name) {
      case 'ARROWLEFT':
        return <ARROWLEFT />;

      case 'ARROWRIGHT':
        return <ARROWRIGHT />;

      case 'BOXARROWRIGHT':
        return <BOXARROWRIGHT />;

      case 'BOXPLUS':
        return <BOXPLUS />;

      case 'CONFIRMBUTTON':
        return <CONFIRMBUTTON />;

      case 'DEADLINE':
        return <DEADLINE />;

      case 'DELETE':
        return <DELETE />;

      case 'FOOTERCALENDAR':
        return <FOOTERCALENDAR />;

      case 'HAMBURGER':
        return <HAMBURGER />;

      case 'INBOX':
        return <INBOX />;

      case 'LOGBOOK':
        return <LOGBOOK />;

      case 'LOGO':
        return <LOGO />;

      case 'MAP':
        return <MAP />;

      case 'MARKER':
        return <MARKER />;

      case 'NEXTARROW':
        return <NEXTARROW />;

      case 'PLACE':
        return <PLACE />;

      case 'PREVARROW':
        return <PREVARROW />;

      case 'SEARCH':
        return <SEARCH />;

      case 'SEARCHPLACE':
        return <SEARCHPLACE />;

      case 'SETTING':
        return <SETTING />;

      case 'SIDEBARARROWLEFT':
        return <SIDEBARARROWLEFT />;

      case 'TAG':
        return <TAG />;

      case 'TODAY':
        return <TODAY />;

      case 'UPCOMING':
        return <UPCOMING />;

      default:
        return <></>;
    }
  }, []);

  return (
    <Container width={width} height={height} stroke={stroke}>
      {renderIconByName(name)}
    </Container>
  );
};

export default Icon;
