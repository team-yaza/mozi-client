import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const DELETE: React.FC<FigureProps> = ({ stroke = 'white', fill = 'none' }) => {
  return (
    <SvgWrap>
      <svg viewBox="0 0 12 12" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
          fill="#CBCBCB"
        />
        <path d="M4 4L8 8" stroke={stroke} />
        <path d="M8 4L4 8" stroke={stroke} />
      </svg>
    </SvgWrap>
  );
};

export default DELETE;
