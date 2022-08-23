import { SvgWrap } from './styles';
import { FigureProps } from '@/shared/types/figure';

const INBOX: React.FC<FigureProps> = ({ focused }) => {
  return (
    <SvgWrap>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.715 10.7617C13.4465 10.7694 13.187 10.86 12.9721 11.0212C12.7572 11.1823 12.5975 11.4061 12.515 11.6617C12.3295 12.1792 11.9887 12.6268 11.5391 12.9432C11.0896 13.2596 10.5532 13.4294 10.0035 13.4294C9.45376 13.4294 8.91745 13.2596 8.4679 12.9432C8.01835 12.6268 7.67751 12.1792 7.492 11.6617C7.40946 11.4061 7.24978 11.1823 7.0349 11.0212C6.82002 10.86 6.56049 10.7694 6.292 10.7617H2V16.7617C2 16.9369 2.03451 17.1103 2.10156 17.2721C2.16862 17.4339 2.26689 17.5809 2.39078 17.7046C2.51467 17.8284 2.66173 17.9266 2.82358 17.9935C2.98542 18.0605 3.15886 18.0949 3.334 18.0947H16.667C16.8421 18.0947 17.0154 18.0602 17.1771 17.9932C17.3388 17.9263 17.4858 17.8281 17.6096 17.7043C17.7334 17.5805 17.8315 17.4336 17.8985 17.2718C17.9655 17.1101 18 16.9368 18 16.7617V10.7617H13.715Z"
          stroke={focused ? '#735AFF' : '#585858'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6 5.0957H14" stroke={focused ? '#735AFF' : '#585858'} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 7.76172H14" stroke={focused ? '#735AFF' : '#585858'} strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M2 10.5718L3.219 3.02579C3.26938 2.71304 3.42949 2.42845 3.67064 2.22303C3.9118 2.01762 4.21822 1.90479 4.535 1.90479H15.4C15.7148 1.90484 16.0195 2.01632 16.26 2.21949C16.5005 2.42265 16.6613 2.70439 16.714 3.01479L18 10.5718"
          stroke={focused ? '#735AFF' : '#585858'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgWrap>
  );
};

export default INBOX;
