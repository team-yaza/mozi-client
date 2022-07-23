import { Form, SubmitButton, TodoInput } from './styles';

interface TodoSubmitFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeInput: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  inputValue: string;
}

const TodoSubmitForm: React.FC<TodoSubmitFormProps> = ({ onSubmit, onChangeInput, inputValue }) => {
  return (
    <Form onSubmit={onSubmit}>
      <TodoInput onChange={onChangeInput} value={inputValue} />
      <SubmitButton type="submit">Add</SubmitButton>
    </Form>
  );
};

export default TodoSubmitForm;
