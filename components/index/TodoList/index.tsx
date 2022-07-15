import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { Todo } from '@/shared/types/todo';
import { todoListState } from '@/store/todo/atom';
import { deleteTodo, findAllTodo } from '@/shared/api/todoAPI';

const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  useEffect(() => {
    getAllTodo();
  }, []);

  const getAllTodo = useCallback(async () => {
    try {
      const todos = await findAllTodo();
      setTodoList(todos);
    } catch (error) {
      // !TODO 토스트 팝업
      alert('투두를 가져오지 못했습니다.');
    }
  }, []);

  const onDeleteTodo = useCallback(async (todoId: string) => {
    try {
      await deleteTodo(todoId);
    } catch (error) {
      alert('todo 삭제 실패');
    }

    getAllTodo();
  }, []);

  return (
    <>
      {todoList?.map((todo: Todo) => (
        <div key={todo._id}>
          <p>{todo.title}</p>
          <button onClick={() => onDeleteTodo(todo._id)}>삭제</button>
        </div>
      ))}
    </>
  );
};

export default TodoList;
