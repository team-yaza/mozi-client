import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const MARKER: React.FC<FigureProps> = () => {
  return (
    <SvgWrap>
      <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_676_3)">
          <path
            d="M20 43.1C18.6432 43.1 16.9679 42.2357 15.0208 40.5312C13.2556 38.9859 11.4087 36.8659 9.67963 34.4003C7.9072 31.8728 6.40046 29.1784 5.3223 26.6083C4.11311 23.7258 3.5 21.166 3.5 19C3.5 14.5926 5.21627 10.449 8.33265 7.33265C11.449 4.21627 15.5926 2.5 20 2.5C24.4074 2.5 28.551 4.21627 31.6674 7.33265C34.7837 10.449 36.5 14.5926 36.5 19C36.5 21.166 35.8869 23.7258 34.6777 26.6083C33.5995 29.1784 32.0928 31.8728 30.3204 34.4003C28.5914 36.8659 26.7444 38.9859 24.9792 40.5312C23.0321 42.2357 21.3568 43.1 20 43.1ZM20 12.8104C17.1878 12.8104 14.9 15.0983 14.9 17.9104C14.9 20.7226 17.1878 23.0104 20 23.0104C22.8121 23.0104 25.1 20.7226 25.1 17.9104C25.1 15.0983 22.8121 12.8104 20 12.8104Z"
            fill="#735AFF"
          />
          <path
            d="M20 3C11.1632 3 4 10.1632 4 19C4 27.8352 14.904 42.6 20 42.6C25.096 42.6 36 27.8352 36 19C36 10.1632 28.8368 3 20 3ZM20 23.5104C16.9072 23.5104 14.4 21.0032 14.4 17.9104C14.4 14.8176 16.9072 12.3104 20 12.3104C23.0928 12.3104 25.6 14.8176 25.6 17.9104C25.6 21.0032 23.0928 23.5104 20 23.5104ZM20 2C22.2946 2 24.5211 2.4496 26.6176 3.33632C28.6421 4.19258 30.46 5.41818 32.0209 6.97909C33.5818 8.54 34.8074 10.358 35.6637 12.3824C36.5504 14.4789 37 16.7054 37 19C37 21.2328 36.3738 23.8577 35.1388 26.8017C34.047 29.4043 32.5224 32.1311 30.7297 34.6874C27.7082 38.996 23.3028 43.6 20 43.6C16.6972 43.6 12.2918 38.996 9.27026 34.6874C7.47762 32.1311 5.953 29.4043 4.86123 26.8017C3.62621 23.8577 3 21.2328 3 19C3 16.7054 3.4496 14.4789 4.33632 12.3824C5.19258 10.358 6.41818 8.54 7.97909 6.97909C9.54 5.41818 11.358 4.19258 13.3824 3.33632C15.4789 2.4496 17.7054 2 20 2ZM20 22.5104C22.5365 22.5104 24.6 20.4469 24.6 17.9104C24.6 15.374 22.5365 13.3104 20 13.3104C17.4636 13.3104 15.4 15.374 15.4 17.9104C15.4 20.4469 17.4636 22.5104 20 22.5104Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_676_3"
            x="0"
            y="0"
            width="40"
            height="47.5996"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1.5" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_676_3" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_676_3" result="shape" />
          </filter>
        </defs>
      </svg>
    </SvgWrap>
  );
};

export default MARKER;
