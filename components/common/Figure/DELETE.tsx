import { SvgWrap } from './styles';

const DELETE: React.FC = () => {
  return (
    <SvgWrap>
      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
          fill="#CBCBCB"
        />
        <path d="M4 4L8 8" stroke="white" />
        <path d="M8 4L4 8" stroke="white" />
      </svg>
    </SvgWrap>
  );
};

export default DELETE;
