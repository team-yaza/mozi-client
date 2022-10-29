import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const SIDEBARARROWLEFT: React.FC<FigureProps> = () => {
  return (
    <SvgWrap>
      <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.49902 10.834L0.499023 5.83398L7.49902 0.833984V10.834Z" fill="#735AFF" />
      </svg>
    </SvgWrap>
  );
};

export default SIDEBARARROWLEFT;
