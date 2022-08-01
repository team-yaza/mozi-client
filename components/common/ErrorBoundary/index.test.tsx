import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';

import ErrorBoundary from '.';

const ComponentThatThrowsError = () => {
  throw new Error('Bomb');
};

describe('<ErrorBoundary/>', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
  });

  it('하위 컴포넌트에서 발생한 에러를 캐치 할 수 있다.', () => {
    render(
      <ErrorBoundary fallback={<div>에러</div>}>
        <ComponentThatThrowsError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/에러/i)).toBeVisible();
  });
});
