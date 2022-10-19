import { ReactElement, useCallback, useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { NextPageWithLayout } from '@/pages/_app';
import Title from '@/components/common/Title';
import TodoList from '@/components/common/TodoList/DraggableTodoList';
import Footer from '@/components/common/Footer';
import AppLayout from '@/components/common/AppLayout';
import DropPlaceholder from '@/components/common/DropPlaceholder';
import { useTodoListQuery, use_unsafe_todoListQuery } from '@/hooks/apis/todo/useTodoListQuery';
import { useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';
import { queryClient } from '@/shared/utils/queryClient';
import { INBOX, TRASH } from '@/components/common/Figure';
import { theme } from '@/styles/theme';

const Home: NextPageWithLayout = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { data: todos } = useTodoListQuery();
  const { mutate: createTodo } = useCreateTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const { data } = use_unsafe_todoListQuery();
  console.log(data, 'unsafe todolist query');

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onClickHandler = useCallback(() => {
    createTodo({});
  }, []);

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
      {/* <Header /> */}
      <Title onClick={onClickHandler} icon={<INBOX focused />} title="Inbox" actionText="할 일 추가" />

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
            <DropPlaceholder
              ref={provided.innerRef}
              isDragging={isDragging}
              active={snapshot.isDraggingOver}
              borderColor={theme.colors.purple}
              backgroundColor="#f3d9fa"
              hoverColor="#cc5de8"
              text="삭제"
              icon={<TRASH />}
              {...provided.droppableProps}
            >
              {provided.placeholder}
            </DropPlaceholder>
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

export default Home;
