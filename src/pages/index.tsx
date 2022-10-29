import { ReactElement } from 'react';
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

const Home: NextPageWithLayout = () => {
  const { data: todos } = useTodoListQuery();
  const { mutate: createTodo } = useCreateTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const onDragEnd = (result: DropResult) => {
    if (todos && result.destination) {
      const items = Array.from(todos);
      const [reorderedItem] = items.splice(result.source.index, 1);

      items.splice(result.destination.index, 0, reorderedItem);

      queryClient.setQueriesData(['todos'], items);
    }
  };

  return (
    <Container>
      <Header />
      <Title onCreate={createTodo} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Footer />
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
  flex: 1;
  flex-direction: column;

  margin: 0 auto;

  transition: 0.3s;
  background-color: ${({ theme }) => theme.color.background};
`;

export default Home;
