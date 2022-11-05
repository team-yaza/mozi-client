import React, { useMemo } from 'react';
import { CheckBox, CheckBoxContainer, Container, Description, Title, TodoContent } from './styles';

const Skeleton: React.FC = () => {
  const memoizedSkeleton = useMemo(() => {
    return (
      <Container>
        <CheckBoxContainer>
          <CheckBox />
        </CheckBoxContainer>
        <TodoContent>
          <Title />
          <Description />
        </TodoContent>
      </Container>
    );
  }, []);

  return (
    <>
      {Array.from({ length: 15 }, () => memoizedSkeleton).map((_, index) => {
        return <div key={index}>{memoizedSkeleton}</div>;
      })}
    </>
  );
};

export default React.memo(Skeleton);
