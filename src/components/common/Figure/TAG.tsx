import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const TAG: React.FC<FigureProps> = ({ fill = 'none' }) => {
  return (
    <SvgWrap>
      <svg viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.28011 12.325C6.05688 12.3257 5.83577 12.2818 5.62971 12.196C5.42366 12.1101 5.2368 11.984 5.08009 11.825L1.49208 8.23798C1.33433 8.08062 1.20937 7.89354 1.1244 7.68756C1.03944 7.48158 0.996154 7.26084 0.997085 7.03802C0.996862 6.5883 1.17485 6.15673 1.49208 5.83795L6.40205 0.92804C6.70522 0.621526 7.11419 0.442629 7.54506 0.42804L11.2511 0.310974H11.3031C11.5165 0.311116 11.7279 0.351834 11.9261 0.430969C12.1414 0.51567 12.3368 0.644106 12.5001 0.808044C12.6637 0.971542 12.7921 1.16689 12.8771 1.38202C12.9627 1.59714 13.0028 1.82763 12.9951 2.05902L12.8771 5.76398C12.8641 6.19422 12.687 6.60325 12.3821 6.90704L7.4731 11.816C7.31783 11.9756 7.13242 12.1027 6.92763 12.1901C6.72284 12.2775 6.50275 12.3234 6.28011 12.325V12.325ZM9.12709 2.914C8.79061 2.91427 8.46798 3.04802 8.23006 3.28595C7.99213 3.52388 7.85831 3.84657 7.85805 4.18304C7.85858 4.51935 7.99252 4.8417 8.23042 5.07941C8.46832 5.31712 8.79078 5.45072 9.12709 5.45099C9.46339 5.45072 9.78586 5.31712 10.0238 5.07941C10.2617 4.8417 10.3955 4.51935 10.3961 4.18304C10.3958 3.84639 10.2619 3.52354 10.0238 3.28558C9.78561 3.04763 9.4627 2.914 9.12605 2.914H9.12709Z"
          fill={fill}
        />
      </svg>
    </SvgWrap>
  );
};

export default TAG;