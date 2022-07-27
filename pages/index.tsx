import { NextPage } from 'next';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { useInput } from '@/hooks/useInput';
import todoService from '@/services/apis/todo';
import Header from '@/components/index/Header';
import SideBar from '@/components/common/Sidebar2';
import TodoList from '@/components/index/TodoList';
import TodoSubmitForm from '@/components/index/TodoSubmitForm';
import { useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '@/hooks/apis/todo/useTodoMutation';

const Home: NextPage = () => {
  const [inputValue, onChangeInput, setInputValue] = useInput('');
  const { data: todoList, isLoading } = useQuery('todoList', todoService.getTodos);
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

  const onUpdateTodo = ({ id, title }: { id: string; title: string }) => {
    updateTodoMutation.mutate({ id, title });
  };

  const onDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  const onSideBarClose = () => {
    console.log('temp');
  };

  if (isLoading) return <div>로딩중</div>;

  return (
    <Container>
      <SideBar onClose={onSideBarClose} />
      <Content>
        <Header />
        <TodoList todos={todoList || []} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} />
        <TodoSubmitForm onSubmit={onSubmitTodo} inputValue={inputValue} onChangeInput={onChangeInput} />
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
