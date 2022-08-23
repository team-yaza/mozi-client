import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const TODAY: React.FC<FigureProps> = ({ focused }) => {
  return (
    <SvgWrap>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 3.19189H4C2.89543 3.19189 2 4.08732 2 5.19189V15.1919C2 16.2965 2.89543 17.1919 4 17.1919H16C17.1046 17.1919 18 16.2965 18 15.1919V5.19189C18 4.08732 17.1046 3.19189 16 3.19189Z"
          stroke={focused ? '#735AFF' : '#585858'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M14 2.29102V4.09302" stroke={focused ? '#735AFF' : '#585858'} />
        <path
          d="M14 2.29102V4.09302"
          stroke={focused ? '#735AFF' : '#585858'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6 2.29102V4.09302" stroke={focused ? '#735AFF' : '#585858'} />
        <path
          d="M6 2.29102V4.09302"
          stroke={focused ? '#735AFF' : '#585858'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M2 6.54102H18" stroke={focused ? '#735AFF' : '#585858'} />
        <path d="M2 6.54102H18" stroke={focused ? '#735AFF' : '#585858'} strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M8.23486 11.9742L9.56086 13.3002L12.3069 10.5542"
          stroke={focused ? '#735AFF' : '#585858'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgWrap>
  );
};

export default TODAY;
