/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render, renderHook } from '@testing-library/react';
import { useCallback } from 'react';
import { CallbackFunction, DoubleTapCallback, DoubleTapOptions, useDoubleTap } from '.';

describe('useDoubleTap', () => {
  let callback: DoubleTapCallback;
  beforeEach(() => {
    jest.useFakeTimers();
    callback = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('콜백을 넘기면 onDoubleClick 핸들러를 반환한다.', () => {
    const { result } = renderUseDoubleTap(() => {});

    expect(result.current).toEqual({
      onClick: expect.any(Function),
    });
  });

  it('한번 클릭시 콜백을 실행하지 않아야한다.', () => {
    const { getByText } = render(<TestComponent callback={callback} />);
    const component = getByText('test component');

    fireEvent.click(component);

    expect(callback).toBeCalledTimes(0);
  });

  it('두번 클릭시 콜백을 한번 실행해야한다.', () => {
    const { getByText } = render(<TestComponent callback={callback} />);
    const component = getByText('test component');
    fireEvent.click(component);
    fireEvent.click(component);

    expect(callback).toBeCalledTimes(1);
  });
});

function renderUseDoubleTap<Target = Element>(
  callback: CallbackFunction<Target>,
  threshold = 300,
  options: DoubleTapOptions<Target> = {}
) {
  return renderHook(({ callback, threshold, options }) => useDoubleTap(callback, threshold, options), {
    initialProps: { callback, threshold, options },
  });
}

interface TestComponentProps {
  callback?: DoubleTapCallback;
  threshold?: number;
  options?: DoubleTapOptions;
}

function TestComponent({ callback = () => {}, threshold, options }: TestComponentProps) {
  const handleDoubleTap = useCallback(
    (event: React.MouseEvent) => {
      callback && callback(event);
    },
    [callback]
  );

  const bind = useDoubleTap(callback === null ? callback : handleDoubleTap, threshold, options);

  return <button {...bind}>test component</button>;
}
