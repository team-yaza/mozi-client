import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';

import AppLayout from '@/components/common/AppLayout';
import styled from 'styled-components';
import Title from '@/components/upcoming/Title';
import Calendar from '@/components/upcoming/Calendar/index';
import TodoList from '@/components/common/TodoList';
import { useUpcommingTodoList } from '@/hooks/apis/todo/useTodoListQuery';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';
import { dateToFormatString, dateDiff } from '@/shared/utils/date';

const Upcoming: NextPageWithLayout = () => {
  const [nowDate, setNowDate] = useState(new Date());
  const { data: todos } = useUpcommingTodoList();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  return (
    <Container>
      <Title />
      <Calendar todos={todos ? todos : []} nowDate={nowDate} setNowDate={setNowDate} />
      <TodoWrapper>
        <span>{dateToFormatString(nowDate)}</span>
        <TodoList
          todos={todos?.filter((todo) => dateDiff(todo.dueDate, nowDate) || dateDiff(todo.alarmDate, nowDate))}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      </TodoWrapper>
    </Container>
  );
};

Upcoming.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;

  overflow: scroll;
`;

const TodoWrapper = styled.div`
  height: auto;

  span {
    font-size: 1.5rem;
    color: #2a2a2a;
    font-weight: bold;

    padding-inline: 3rem;
  }
`;

export default Upcoming;
