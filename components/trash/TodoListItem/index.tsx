import { useInputRef } from '@/hooks/useInputRef';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useCallback, useRef, useState } from 'react';
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
  const [isFocused, setIsFoucsed] = useState(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { titleRef, descriptionRef } = useInputRef(title, description, [isDoubleClicked]);

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
    <Container
      ref={containerRef}
      isFocused={isFocused}
      onClick={onClickHandler}
      isDoubleClicked={isDoubleClicked}
      onDoubleClick={onDoubleClickHandler}
    >
      <MainContainer>
        <CheckBox checked={done} />
        <Title placeholder="New Todo" ref={titleRef} contentEditable suppressContentEditableWarning />
      </MainContainer>

      {/* 더블 클릭시 생기는 부분 */}

      {isDoubleClicked && (
        <DescriptionContainer>
          <Description
            placeholder="Notes"
            ref={descriptionRef}
            isDoubleClicked={isDoubleClicked}
            contentEditable
            suppressContentEditableWarning
          />
          <OptionsContainer></OptionsContainer>
        </DescriptionContainer>
      )}
    </Container>
  );
};

export default TodoListItem;
