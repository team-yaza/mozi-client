import { SvgWrap } from './styles';

const CROSSHAIRS: React.FC = () => {
  return (
    <SvgWrap>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5 4H12.5V8L12 10L11.5 8V4Z" fillOpacity="0.6" />
        <path d="M12.5 20H11.5V16L12 14L12.5 16V20Z" fillOpacity="0.6" />
        <path d="M20 11.5V12.5H16L14 12L16 11.5H20Z" fillOpacity="0.6" />
        <path d="M4 12.5V11.5H8L10 12L8 12.5H4Z" fillOpacity="0.6" />
        <path
          d="M12 6.5C15.038 6.5 17.5 8.962 17.5 12C17.5 15.038 15.038 17.5 12 17.5C8.962 17.5 6.5 15.038 6.5 12C6.506 8.965 8.965 6.506 11.999 6.5H12ZM12 5C8.134 5 5 8.134 5 12C5 15.866 8.134 19 12 19C15.866 19 19 15.866 19 12C19 8.134 15.866 5 12 5Z"
          fillOpacity="0.6"
        />
      </svg>
    </SvgWrap>
  );
};

export default CROSSHAIRS;
