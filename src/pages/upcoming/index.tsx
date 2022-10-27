import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import { NextPageWithLayout } from '@/pages/_app';
import { AppLayout, Header, Title, TodoList } from '@/components/common';
import { UPCOMING } from '@/components/common/Figure';
import Calendar from '@/components/upcoming/Calendar';
import { useUpcommingTodoList } from '@/hooks/apis/todo/useTodoListQuery';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';
import { dateToFormatString, dateDiff } from '@/shared/utils/date';

const Upcoming: NextPageWithLayout = () => {
  const [nowDate, setNowDate] = useState(new Date());
  const { data: todos } = useUpcommingTodoList();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  return (
    <>
      <Head>
        <title>MOZI | Upcoming</title>
      </Head>
      <Container>
        <Header />
        <Title icon={<UPCOMING focused />} title="Upcoming" />
        <Calendar todos={todos ? todos : []} nowDate={nowDate} setNowDate={setNowDate} />
        <TodoContainer>
          <span>{dateToFormatString(nowDate)}</span>
          <TodoList
            todos={todos?.filter((todo) => dateDiff(todo.dueDate, nowDate) || dateDiff(todo.alarmDate, nowDate))}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        </TodoContainer>
      </Container>
    </>
  );
};

Upcoming.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div`
  position: relative;
  height: (100vh - 5.4rem);
  width: 100%;

  overflow: scroll;
`;

const TodoContainer = styled.div`
  height: auto;

  span {
    font-size: 1.5rem;
    color: #2a2a2a;
    font-weight: bold;

    padding-inline: 3rem;
  }
`;

export default Upcoming;
