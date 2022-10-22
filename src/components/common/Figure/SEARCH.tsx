import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const SEARCH: React.FC<FigureProps> = () => {
  return (
    <SvgWrap>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M26.28 15.4828C26.28 17.5377 25.6706 19.5465 24.529 21.2551C23.3873 22.9638 21.7646 24.2955 19.8661 25.0819C17.9676 25.8683 15.8785 26.074 13.863 25.6731C11.8476 25.2722 9.99623 24.2827 8.54317 22.8296C7.0901 21.3765 6.10055 19.5252 5.69965 17.5098C5.29875 15.4943 5.5045 13.4052 6.2909 11.5067C7.07729 9.60817 8.409 7.98547 10.1176 6.8438C11.8263 5.70214 13.8351 5.09277 15.89 5.09277C18.6456 5.09277 21.2883 6.18743 23.2368 8.13593C25.1853 10.0844 26.28 12.7272 26.28 15.4828Z"
          strokeWidth="2"
        />
        <path d="M23.2119 23.6182L28.4999 28.9062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </SvgWrap>
  );
};

export default SEARCH;
