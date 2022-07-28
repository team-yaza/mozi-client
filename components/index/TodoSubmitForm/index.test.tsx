import React, { Dispatch } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TodoSubmitForm from '@/components/index/TodoSubmitForm';

describe('<TodoSubmitForm />', () => {
  const onSubmit = jest.fn();
  const onChangeInput = jest.fn();

  it('Add 라는 텍스트를 포함해서 렌더링된다.', () => {
    render(<TodoSubmitForm onSubmit={onSubmit} onChangeInput={onChangeInput} inputValue="" />);

    const addText = screen.getByText('Add');
    expect(addText).toBeInTheDocument();
  });

  it('input에 입력하면 onChangeInput 함수가 실행된다.', () => {
    const { container } = render(<TodoSubmitForm onSubmit={onSubmit} onChangeInput={onChangeInput} inputValue="" />);

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Changed Value' } });

    expect(onChangeInput).toHaveBeenCalled();
  });

  it('onSubmit 이벤트를 발생시키면 onSubmit 함수가 실행된다.', () => {
    render(<TodoSubmitForm onSubmit={onSubmit} onChangeInput={onChangeInput} inputValue="" />);

    const submitButton = screen.getByRole('button');
    fireEvent.submit(submitButton);

    expect(onSubmit).toHaveBeenCalled();
  });
});
