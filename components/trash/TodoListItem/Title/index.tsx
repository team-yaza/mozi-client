import { useEffect, useRef } from 'react';
import { Container } from './styles';

interface TitleProps {
  title?: string;
}

const Title: React.FC<TitleProps> = ({ title = '' }) => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && title) {
      titleRef.current.innerText = title;
    }
  }, []);

  return <Container placeholder="New Todo" ref={titleRef} contentEditable suppressContentEditableWarning></Container>;
};

export default Title;
