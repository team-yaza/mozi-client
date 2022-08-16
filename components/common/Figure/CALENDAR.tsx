import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const CALENDAR: React.FC<FigureProps> = ({ stroke = '#585858' }) => {
  return (
    <SvgWrap>
      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17 5H6C4.89543 5 4 5.89543 4 7V17C4 18.1046 4.89543 19 6 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5Z"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M7 9.34912H16" stroke={stroke} strokeLinecap="round" />
        <path d="M14 15.3491H16" stroke={stroke} strokeLinecap="round" />
        <path d="M7 4V6" stroke={stroke} strokeLinecap="round" />
        <path d="M16 4V6" stroke={stroke} strokeLinecap="round" />
      </svg>
    </SvgWrap>
  );
};

export default CALENDAR;
