import Head from 'next/head';
import type { ReactElement } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { NextPageWithLayout } from '@/pages/_app';
import { queryClient } from '@/shared/utils/queryClient';
import { useTodoListQuery } from '@/hooks/apis/todo/useTodoListQuery';
import { Header, Spinner, Title, AppLayout, Footer, DropPlaceholder } from '@/components/common';
import TodoList from '@/components/common/TodoList/DraggableTodoList';
import { theme } from '@/styles/theme';
import { TRASH } from '@/components/common/Figure';
import {
  useDeleteAllTodosMutation,
  useForceDeleteTodoMutation,
  useCreateTodoMutation,
  useUpdateTodoMutation,
} from '@/hooks/apis/todo/useTodoMutation';
import { ROUTES } from '@/shared/constants/routes';

const Trash: NextPageWithLayout = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { data: todos, isLoading } = useTodoListQuery(ROUTES.TRASH);
  const { mutate: createTodo } = useCreateTodoMutation();
  const { mutate: forceDeleteTodo } = useForceDeleteTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteAllTodos } = useDeleteAllTodosMutation();

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    if (todos && result.destination.droppableId === 'restore') {
      const items = Array.from(todos);

      const [restoredItem] = items.splice(result.source.index, 1);

      queryClient.setQueriesData(['todos'], items);
      console.log(restoredItem.id);
      updateTodo({ ...restoredItem, deletedAt: undefined });
    }

    setIsDragging(false);
  };
  return (
    <>
      <Head>
        <title>MOZI | Trash</title>
      </Head>

      <Container>
        <Header />
        <Title icon={<TRASH />} title="Trash" actionText="비우기" onClick={deleteAllTodos} />

        {isLoading && (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        )}

        <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setIsDragging(true)}>
          <Droppable droppableId="todos">
            {(provided) => (
              <TodoListContainer ref={provided.innerRef} {...provided.droppableProps}>
                <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={forceDeleteTodo} />
                {provided.placeholder}
              </TodoListContainer>
            )}
          </Droppable>

          <Droppable droppableId="restore">
            {(provided, snapshot) => (
              <DropPlaceholder
                ref={provided.innerRef}
                isDragging={isDragging}
                active={snapshot.isDraggingOver}
                borderColor={theme.colors.purple}
                backgroundColor="#f3d9fa"
                hoverColor="#cc5de8"
                text="복원"
                icon={<TRASH />}
                {...provided.droppableProps}
              >
                {provided.placeholder}
              </DropPlaceholder>
            )}
          </Droppable>
        </DragDropContext>

        {!isDragging && <Footer createTodo={createTodo} />}
      </Container>
    </>
  );
};

Trash.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.color.background};
  transition: background-color 0.3s;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;
`;

const TodoListContainer = styled.div`
  overflow-y: scroll;
  flex: 1;
`;

export default Trash;
