import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const TRASH: React.FC<FigureProps> = () => {
  return (
    <SvgWrap>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.5 4H16.5V15C16.5 15.7956 16.1839 16.5587 15.6213 17.1213C15.0587 17.6839 14.2956 18 13.5 18H7.5C6.70435 18 5.94129 17.6839 5.37868 17.1213C4.81607 16.5587 4.5 15.7956 4.5 15V4Z"
          fill="white"
          stroke="#585858"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M3 3.99805H18" stroke="#585858" strokeLinecap="round" />
        <path d="M8 2H13" stroke="#585858" strokeLinecap="round" />
        <path d="M10.5 8.5V13.5" stroke="#585858" strokeLinecap="round" />
        <path d="M13.5 8.5V13.5" stroke="#585858" strokeLinecap="round" />
        <path d="M7.5 8.5V13.5" stroke="#585858" strokeLinecap="round" />
      </svg>
    </SvgWrap>
  );
};

export default TRASH;
