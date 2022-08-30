import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const CALENDAR: React.FC<FigureProps> = () => {
  return (
    <SvgWrap>
      <svg viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17 5H6C4.89543 5 4 5.89543 4 7V17C4 18.1046 4.89543 19 6 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5Z"
          stroke="#585858"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M7 9.34912H16" stroke="#585858" strokeLinecap="round" />
        <path d="M14 15.3491H16" stroke="#585858" strokeLinecap="round" />
        <path d="M7 4V6" stroke="#585858" strokeLinecap="round" />
        <path d="M16 4V6" stroke="#585858" strokeLinecap="round" />
      </svg>
    </SvgWrap>
  );
};

export default CALENDAR;
