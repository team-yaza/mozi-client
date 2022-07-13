import { render, screen } from '@testing-library/react';

import TodoSubmitForm from '.';

describe('<TodoSubmitForm />', () => {
  it('렌더링', () => {
    const setTodoList = jest.fn();

    render(<TodoSubmitForm setTodoList={setTodoList} />);

    const addText = screen.getByText('Add');
    expect(addText).toBeInTheDocument();
  });
});
