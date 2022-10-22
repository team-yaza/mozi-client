import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const BOXARROWRIGHT: React.FC<FigureProps> = () => {
  return (
    <SvgWrap>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 4H13C8.02944 4 4 8.02944 4 13V21C4 25.9706 8.02944 30 13 30H21C25.9706 30 30 25.9706 30 21V13C30 8.02944 25.9706 4 21 4Z"
          fill="white"
          strokeWidth="2"
        />
        <path d="M18.5 13L22.5 17L18.5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 17H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </SvgWrap>
  );
};

export default BOXARROWRIGHT;
