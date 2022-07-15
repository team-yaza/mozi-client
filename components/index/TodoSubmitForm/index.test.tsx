import { render, screen } from '@testing-library/react';

import TodoSubmitForm from '.';

describe('<TodoSubmitForm />', () => {
  it('렌더링', () => {
    render(<TodoSubmitForm />);

    const addText = screen.getByText('Add');
    expect(addText).toBeInTheDocument();
  });
});
