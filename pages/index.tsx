import { NextPage } from 'next';
import styled from 'styled-components';

import { useInput } from '@/hooks/useInput';
import Header from '@/components/index/Header';
import SideBar from '@/components/common/Sidebar';
import TodoList from '@/components/index/TodoList';
import TodoSubmitForm from '@/components/index/TodoSubmitForm';
import { useTodoListQuery } from '@/hooks/apis/todo/useTodoListQuery';
import { useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';
import { TodoUpdateRequest } from '@/shared/types/todo';

const Home: NextPage = () => {
  const [inputValue, onChangeInput, setInputValue] = useInput('');
  const { data: todoList, isLoading } = useTodoListQuery();
  const createTodoMutation = useCreateTodoMutation();
  const updateTodoMutation = useUpdateTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();

  const onSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTodoMutation.mutate(inputValue, {
      onSuccess: () => {
        setInputValue('');
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const onUpdateTodo = ({ id, title, longitude, latitude, description }: TodoUpdateRequest) => {
    updateTodoMutation.mutate({ id, title, latitude, longitude, description });
  };

  const onDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  const onSideBarClose = () => {
    console.log('SideBar가 닫힙니다.');
  };

  if (isLoading) return <div>로딩중</div>;

  return (
    <Container>
      <SideBar onClose={onSideBarClose} />
      <Content>
        <Header />
        <TodoList todos={todoList || []} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} />
        <TodoSubmitForm inputValue={inputValue} onSubmit={onSubmitTodo} onChangeInput={onChangeInput} />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0 auto;
`;

export default Home;
