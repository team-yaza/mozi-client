import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const CALENDAR: React.FC<FigureProps> = () => {
  return (
    <SvgWrap>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24 6H10C7.23858 6 5 8.23858 5 11V25C5 27.7614 7.23858 30 10 30H24C26.7614 30 29 27.7614 29 25V11C29 8.23858 26.7614 6 24 6Z"
          strokeWidth="2"
        />
        <path d="M10.2002 14.2715H24.2002" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 23H23.467" strokeWidth="2" strokeLinecap="round" />
        <path d="M10.2002 5V8.467" strokeWidth="2" strokeLinecap="round" />
        <path d="M23.7998 5V8.467" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </SvgWrap>
  );
};

export default CALENDAR;
