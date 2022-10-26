import { FigureProps } from '@/shared/types/figure';
import { SvgWrap } from './styles';

const HAMBURGER: React.FC<FigureProps> = ({ fill = '#2A2A2A' }) => {
  return (
    <SvgWrap>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.5 8H2.5C2.22386 8 2 8.22386 2 8.5C2 8.77614 2.22386 9 2.5 9H17.5C17.7761 9 18 8.77614 18 8.5C18 8.22386 17.7761 8 17.5 8Z"
          fill={fill}
        />
        <path
          d="M12.5 14H2.5C2.22386 14 2 14.2239 2 14.5C2 14.7761 2.22386 15 2.5 15H12.5C12.7761 15 13 14.7761 13 14.5C13 14.2239 12.7761 14 12.5 14Z"
          fill={fill}
        />
        <path
          d="M19.5 20H2.5C2.22386 20 2 20.2239 2 20.5C2 20.7761 2.22386 21 2.5 21H19.5C19.7761 21 20 20.7761 20 20.5C20 20.2239 19.7761 20 19.5 20Z"
          fill={fill}
        />
      </svg>
    </SvgWrap>
  );
};

export default HAMBURGER;
