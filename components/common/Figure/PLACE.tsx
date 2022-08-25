import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const PLACE: React.FC<FigureProps> = ({ stroke = '#585858' }) => {
  return (
    <SvgWrap>
      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.5 3.56104C9.69184 3.5613 7.95781 4.27971 6.67925 5.55827C5.40068 6.83684 4.68227 8.57087 4.68201 10.379C4.68201 14.145 9.32801 19.437 11.5 19.437C13.672 19.437 18.318 14.145 18.318 10.379C18.3177 8.57087 17.5993 6.83684 16.3208 5.55827C15.0422 4.27971 13.3082 3.5613 11.5 3.56104V3.56104ZM11.5 13.505C10.7902 13.505 10.0963 13.2945 9.50607 12.9002C8.91586 12.5058 8.45585 11.9453 8.1842 11.2895C7.91256 10.6337 7.84149 9.91205 7.97997 9.21586C8.11845 8.51966 8.46027 7.88016 8.9622 7.37823C9.46413 6.8763 10.1036 6.53448 10.7998 6.396C11.496 6.25751 12.2177 6.32859 12.8735 6.60023C13.5293 6.87187 14.0898 7.33189 14.4842 7.92209C14.8785 8.5123 15.089 9.2062 15.089 9.91604C15.0891 10.3874 14.9964 10.8541 14.8161 11.2896C14.6358 11.7251 14.3714 12.1208 14.0381 12.4541C13.7048 12.7874 13.3091 13.0518 12.8736 13.2321C12.4381 13.4124 11.9714 13.5052 11.5 13.505V13.505Z"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgWrap>
  );
};

export default PLACE;
