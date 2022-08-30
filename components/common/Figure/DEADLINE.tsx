import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const DEADLINE: React.FC<FigureProps> = ({ stroke = '#585858' }) => {
  return (
    <SvgWrap>
      <svg viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.89697 3.81689V18.8169" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M16.824 13.6768H5.89697V4.67676H16.824C17.0147 4.67684 17.202 4.72788 17.3665 4.8246C17.5309 4.92132 17.6665 5.06021 17.7593 5.22691C17.8521 5.3936 17.8987 5.58206 17.8942 5.77278C17.8898 5.9635 17.8344 6.14958 17.734 6.31176L16.311 8.61676C16.206 8.78597 16.1504 8.98113 16.1504 9.18026C16.1504 9.37938 16.206 9.57455 16.311 9.74376L17.734 12.0438C17.8339 12.2059 17.8888 12.3918 17.893 12.5822C17.8972 12.7726 17.8505 12.9607 17.7578 13.1271C17.6651 13.2935 17.5297 13.4321 17.3655 13.5287C17.2014 13.6254 17.0144 13.6765 16.824 13.6768V13.6768Z"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgWrap>
  );
};

export default DEADLINE;
