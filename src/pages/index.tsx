import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { NextPageWithLayout } from '@/pages/_app';
import Header from '@/components/common/Header';
import Title from '@/components/index/Title';
import TodoList from '@/components/common/TodoList/DraggableTodoList';
import Footer from '@/components/common/Footer';
import AppLayout from '@/components/common/AppLayout';
import { useTodoListQuery } from '@/hooks/apis/todo/useTodoListQuery';
import { useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';
import { queryClient } from '@/shared/utils/queryClient';
import { flexCenter } from '@/styles/utils';

const Home: NextPageWithLayout = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { data: todos } = useTodoListQuery();
  const { mutate: createTodo } = useCreateTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragEnd = (result: DropResult) => {
    if (todos && result.destination?.droppableId === 'todos') {
      const items = Array.from(todos);
      const [reorderedItem] = items.splice(result.source.index, 1);

      items.splice(result.destination.index, 0, reorderedItem);

      queryClient.setQueriesData(['todos'], items);
    } else if (todos && result.destination?.droppableId === 'trash') {
      const items = Array.from(todos);

      items.splice(result.source.index, 1);

      queryClient.setQueriesData(['todos'], items);
    }

    setIsDragging(false);
  };

  return (
    <Container>
      <Header />
      <Title onCreate={createTodo} />

      {/* DND features */}
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable droppableId="todos">
          {(provided) => (
            <TodoListContainer ref={provided.innerRef} {...provided.droppableProps}>
              <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
              {provided.placeholder}
            </TodoListContainer>
          )}
        </Droppable>

        <Droppable droppableId="trash">
          {(provided, snapshot) => (
            <TrashContainer>
              <Trash
                isDragging={isDragging}
                active={snapshot.isDraggingOver}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                삭제
              </Trash>
              <DNDPlaceHolderContainer>{provided.placeholder}</DNDPlaceHolderContainer>
            </TrashContainer>
          )}
        </Droppable>
      </DragDropContext>

      {/* 드래그 안할 때는 Footer를 보여줌 */}
      {!isDragging && <Footer />}
    </Container>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;

  margin: 0 auto;

  transition: 0.3s;
  background-color: ${({ theme }) => theme.color.background};
`;

const TodoListContainer = styled.div`
  overflow-y: scroll;
  flex: 1;
`;

const TrashContainer = styled.div`
  position: relative;
  ${flexCenter}
  width: 100%;
  height: 6.8rem;

  padding: 0.5rem;

  background-color: white;
`;

const Trash = styled.div<{ active: boolean; isDragging: boolean }>`
  ${flexCenter};
  width: 100%;

  height: 100%;
  border: ${({ isDragging }) => isDragging && '0.1rem solid red'};
  border-style: dashed;
  background-color: ${({ active }) => active && 'red'};
`;

const DNDPlaceHolderContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${flexCenter};
`;

export default Home;
