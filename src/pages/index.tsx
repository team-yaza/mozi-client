import { ReactElement, useCallback, useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { NextPageWithLayout } from '@/pages/_app';
import TodoList from '@/components/common/TodoList/DraggableTodoList';
import { AppLayout, Title, Footer, Header, DropPlaceholder } from '@/components/common';
import { INBOX, TRASH } from '@/components/common/Figure';
import { useTodoListQuery } from '@/hooks/apis/todo/useTodoListQuery';
import {
  use_unsafe_createTodoMutation,
  use_unsafe_deleteTodoMutation,
  use_unsafe_updateTodoMutation,
} from '@/hooks/apis/todo/useTodoMutation';
import { queryClient } from '@/shared/utils/queryClient';
import { theme } from '@/styles/theme';
import { Todo } from '@/shared/types/todo';
import { ROUTES } from '@/shared/constants/routes';

const Home: NextPageWithLayout = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { data: todos } = useTodoListQuery(ROUTES.HOME);
  const { mutate: createTodo } = use_unsafe_createTodoMutation();
  const { mutate: updateTodo } = use_unsafe_updateTodoMutation();
  const { mutate: deleteTodo } = use_unsafe_deleteTodoMutation();

  const onDragStart = () => setIsDragging(true);

  const onClickHandler = useCallback(() => {
    createTodo({});
  }, [createTodo]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    if (todos && result.destination.droppableId === 'todos') {
      const items = Array.from(todos);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      items.forEach((item: Todo, index) => (item.index = index));

      queryClient.setQueriesData(['todos'], items);

      items.map((item: any, index) => updateTodo({ ...item, index }));

      // await Promise.all(items.map((item: Todo, index) => todoService.updateTodoAtIndexedDB({ id: item.id, index })));
    } else if (todos && result.destination.droppableId === 'trash') {
      const items = Array.from(todos);

      const [deletedItem] = items.splice(result.source.index, 1);

      queryClient.setQueriesData(['todos'], items);
      deleteTodo(deletedItem.id);
    }

    setIsDragging(false);
  };

  return (
    <Container>
      <Header />
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
      {!isDragging && <Footer createTodo={createTodo} />}
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
