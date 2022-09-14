import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CheckBox,
  Container,
  Description,
  DescriptionContainer,
  MainContainer,
  OptionsContainer,
  Title,
} from './styles';

interface TodoListItemProps {
  title?: string;
  description?: string;
  done: boolean;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ title, description, done }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  // const descriptionRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFoucsed] = useState(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  useEffect(() => {
    if (titleRef && titleRef.current && title) {
      titleRef.current.innerText = title;
    }

    description;
  }, []);

  const onClickOutsideHandler = useCallback(() => {
    setIsFoucsed(false);
    setIsDoubleClicked(false);
  }, []);

  useOnClickOutside(containerRef, onClickOutsideHandler);

  const onClickHandler = useCallback(() => {
    setIsFoucsed((prev) => !prev);
  }, []);

  const onDoubleClickHandler = useCallback(() => {
    setIsFoucsed(false);
    setIsDoubleClicked((prev) => !prev);
  }, []);

  return (
    <Container ref={containerRef} isFocused={isFocused} onClick={onClickHandler} onDoubleClick={onDoubleClickHandler}>
      <MainContainer>
        <CheckBox checked={done} />
        <Title ref={titleRef} contentEditable suppressContentEditableWarning />
      </MainContainer>

      {/* 더블 클릭시 생기는 부분 */}

      {isDoubleClicked && (
        <DescriptionContainer>
          <Description />
          <OptionsContainer>하위</OptionsContainer>
        </DescriptionContainer>
      )}
    </Container>
  );
};

export default TodoListItem;
