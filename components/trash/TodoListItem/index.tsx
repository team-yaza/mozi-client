import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Container, CheckBox, Description, DescriptionContainer, MainContainer, OptionsContainer } from './styles';
import Title from './Title';

interface TodoListItemProps {
  title: string;
  description?: string;
  done: boolean;
  isFocused?: boolean;
  setIsFocused: (index: number) => void;
  index: number;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ title, description, done, isFocused, setIsFocused, index }) => {
  // const [isFocused, setIsFoucsed] = useState(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current && description) {
      descriptionRef.current;
    }
  }, [isDoubleClicked]);

  const onClickOutsideHandler = useCallback(() => {
    // setIsFoucsed(false);
    setIsDoubleClicked(false);
  }, []);

  useOnClickOutside(containerRef, onClickOutsideHandler);

  const onClickHandler = useCallback(() => {
    setIsFocused(index); // 이제 인덱스를 todo의 index로 바꾸는 작업 필요
  }, []);

  const onDoubleClickHandler = useCallback(() => {
    setIsFocused(-1);
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
        <Title title={title} />
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
