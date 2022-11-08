import { SvgWrap } from './styles';

const PREVARROW: React.FC = () => {
  return (
    <SvgWrap>
      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 3L3 6L6 9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </SvgWrap>
  );
};

export default PREVARROW;
