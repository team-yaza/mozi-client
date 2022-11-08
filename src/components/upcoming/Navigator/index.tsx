import { NEXTARROW, PREVARROW } from '@/components/common/Figure';
import { getYearAndMonth } from '@/shared/utils/date';
import { ArrowContainer, Container } from './styles';

interface NavigatorProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Navigator: React.FC<NavigatorProps> = ({ currentDate, setCurrentDate }) => {
  return (
    <Container>
      <ArrowContainer onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
        <PREVARROW />
      </ArrowContainer>
      {getYearAndMonth(currentDate)}
      <ArrowContainer onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
        <NEXTARROW />
      </ArrowContainer>
    </Container>
  );
};

export default Navigator;
