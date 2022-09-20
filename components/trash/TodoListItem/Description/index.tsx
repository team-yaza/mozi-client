import { useEffect, useRef } from 'react';
import { Container } from './styles';

interface DescriptionProps {
  description?: string;
}

const Description: React.FC<DescriptionProps> = ({ description = '' }) => {
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current && description) {
      descriptionRef.current.innerText = description;
    }
  }, []);

  return (
    <Container
      placeholder="Notes"
      ref={descriptionRef}
      // isDoubleClicked={isDoubleClicked}
      contentEditable
      suppressContentEditableWarning
    ></Container>
  );
};

export default Description;
