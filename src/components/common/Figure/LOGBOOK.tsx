import styled from 'styled-components';
import { FigureProps } from '@/shared/types/figure';
import { SvgWrap } from './styles';

const LOGBOOK: React.FC<FigureProps> = ({ focused }) => {
  return (
    <SvgWrap>
      <Container focused={focused}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 3H5C3.34315 3 2 4.34315 2 6V16C2 17.6569 3.34315 19 5 19H13C14.6569 19 16 17.6569 16 16V6C16 4.34315 14.6569 3 13 3Z" />
          <path d="M13 3.5H5C3.61929 3.5 2.5 4.61929 2.5 6V16C2.5 17.3807 3.61929 18.5 5 18.5H13C14.3807 18.5 15.5 17.3807 15.5 16V6C15.5 4.61929 14.3807 3.5 13 3.5Z" />
          <path d="M16 0H8C6.34315 0 5 1.34315 5 3V13C5 14.6569 6.34315 16 8 16H16C17.6569 16 19 14.6569 19 13V3C19 1.34315 17.6569 0 16 0Z" />
          <path d="M16 0.5H8C6.61929 0.5 5.5 1.61929 5.5 3V13C5.5 14.3807 6.61929 15.5 8 15.5H16C17.3807 15.5 18.5 14.3807 18.5 13V3C18.5 1.61929 17.3807 0.5 16 0.5Z" />
          <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" />
          <path d="M12 11.5C13.933 11.5 15.5 9.933 15.5 8C15.5 6.067 13.933 4.5 12 4.5C10.067 4.5 8.5 6.067 8.5 8C8.5 9.933 10.067 11.5 12 11.5Z" />
          <path d="M10.8008 7.65413L12.1248 8.97813L16.0248 5.07812" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Container>
    </SvgWrap>
  );
};

const Container = styled.div<{ focused?: boolean }>`
  svg {
    fill: ${({ theme }) => theme.color.logbook_background};
    transition: fill 0.3s;
  }
`;

export default LOGBOOK;
