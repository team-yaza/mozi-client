import { SvgWrap } from './styles';

const CONFIRMBUTTON: React.FC = () => {
  return (
    <SvgWrap>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="18" fill="#735AFF" />
        <path d="M13 18.5L16 21.5L23.5 14" stroke="white" stroke-width="2" />
      </svg>
    </SvgWrap>
  );
};

export default CONFIRMBUTTON;
