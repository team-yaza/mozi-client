import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const ADD_TAG: React.FC<FigureProps> = ({ stroke = '#585858' }) => {
  return (
    <SvgWrap>
      <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_297_175)">
          <path
            d="M19.0089 12.219L13.0769 18.15C12.6934 18.5335 12.1733 18.749 11.6309 18.749C11.0886 18.749 10.5684 18.5335 10.1849 18.15L5.84991 13.815C5.46642 13.4315 5.25098 12.9114 5.25098 12.369C5.25098 11.8267 5.46642 11.3065 5.84991 10.923L11.7819 4.99103C12.1491 4.62258 12.643 4.40801 13.1629 4.39103L17.6409 4.25003C17.9203 4.24128 18.1986 4.28988 18.4585 4.39283C18.7184 4.49579 18.9544 4.65091 19.152 4.84863C19.3496 5.04634 19.5047 5.28246 19.6075 5.54241C19.7103 5.80236 19.7588 6.08062 19.7499 6.36003L19.6079 10.838C19.5912 11.3578 19.377 11.8517 19.0089 12.219Z"
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.0711 10.443C15.9177 10.443 16.6041 9.75661 16.6041 8.90995C16.6041 8.0633 15.9177 7.37695 15.0711 7.37695C14.2244 7.37695 13.5381 8.0633 13.5381 8.90995C13.5381 9.75661 14.2244 10.443 15.0711 10.443Z"
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_297_175"
            x="0.750977"
            y="3.74902"
            width="23.5"
            height="23.5"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_297_175" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_297_175" result="shape" />
          </filter>
        </defs>
      </svg>
    </SvgWrap>
  );
};

export default ADD_TAG;
