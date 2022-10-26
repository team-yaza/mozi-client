import { FigureProps } from '@/shared/types/figure';
import { SvgWrap } from './styles';

const ARROWRIGHT: React.FC<FigureProps> = ({ stroke }) => {
  return (
    <SvgWrap>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 8L10 15L3 22" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.61914 8L16.6191 15L9.61914 22" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </SvgWrap>
  );
};

export default ARROWRIGHT;
