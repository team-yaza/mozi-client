import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '.';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('초기값 렌더링은 바로 이루어져야한다.', () => {
    const { result } = renderHook(() => useDebounce('이현진', 1000));
    expect(result.current).toEqual('이현진');
  });

  it('새로운 값은 곧바로 렌더링하지 않아야한다.', () => {
    let initialValue = '이현진';
    const { result, rerender } = renderHook(() => useDebounce(initialValue, 1000));
    expect(result.current).toEqual('이현진');

    initialValue = '유찬희';

    rerender();
    expect(result.current).toEqual('이현진');
  });

  it('새로운 값은 delay가 지난 후에 렌더링되어야 한다.', () => {
    let initialValue = '이현진';
    const { result, rerender } = renderHook(() => useDebounce(initialValue, 1000));
    expect(result.current).toEqual('이현진');

    initialValue = '유찬희';

    rerender();
    expect(result.current).toEqual('이현진');

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current).toEqual('유찬희');
  });
});
