import { SvgWrap } from './styles';

const ARROWLEFT: React.FC = () => {
  return (
    <SvgWrap>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27 8L20 15L27 22" stroke="#2A2A2A" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M20.3809 8L13.3809 15L20.3809 22" stroke="#2A2A2A" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </SvgWrap>
  );
};

export default ARROWLEFT;
