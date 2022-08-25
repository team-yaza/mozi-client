import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const BOXPLUS: React.FC<FigureProps> = () => {
  return (
    <SvgWrap>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 4H13C8.02944 4 4 8.02944 4 13V21C4 25.9706 8.02944 30 13 30H21C25.9706 30 30 25.9706 30 21V13C30 8.02944 25.9706 4 21 4Z"
          fill="white"
          stroke="#2C2B31"
          strokeWidth="2"
        />
        <path d="M12.334 17H21.667" stroke="#2C2B31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 21.667V12.333" stroke="#2C2B31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </SvgWrap>
  );
};

export default BOXPLUS;
