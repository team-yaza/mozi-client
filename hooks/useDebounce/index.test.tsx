import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '.';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('초기값 렌더링은 바로 이루어져야한다.', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'INITIAL_VALUE' },
    });
    expect(result.current).toEqual('INITIAL_VALUE');
  });

  it('새로운 값은 지정한 딜레이 전에 렌더링하지 않아야한다.', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'INITIAL_VALUE' },
    });

    rerender({ value: 'NEW_VALUE' });
    expect(result.current).toEqual('INITIAL_VALUE');
  });

  it('새로운 값은 지정한 딜레이 이후 렌더링되어야 한다.', () => {
    const delay = 1000;
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, delay), {
      initialProps: { value: 'INITIAL_VALUE' },
    });

    rerender({ value: 'NEW_VALUE' });
    act(() => {
      jest.advanceTimersByTime(delay + 100);
    });
    expect(result.current).toEqual('NEW_VALUE');
  });
});
