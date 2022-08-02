import { renderHook, act, waitFor } from '@testing-library/react';

import { useLocalForage } from '.';

describe('useLocalForage', () => {
  interface User {
    name: string;
    lastname: string;
    age: number;
  }

  const user = {
    name: 'INITIAL_NAME',
    lastname: '현진',
    age: 24,
  };

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
  });

  it('type check', () => {
    const { result } = renderHook(() => useLocalForage<User>('user', user));
    const [value, set, remove] = result.current;

    expect(typeof value?.name).toBe('string');
    expect(typeof set).toBe('function');
    expect(typeof remove).toBe('function');
  });

  it('IndexedDB에 원하는 키로 값을 쓸 수 있다.', () => {
    // Arrange
    const { result } = renderHook(() => useLocalForage<User>('user', user));
    // Act
    act(() => {
      result.current[1]({
        name: 'Name 2',
        lastname: 'Lastname 2',
        age: 240,
      });
    });
    // Assert
    expect(result.current[0]?.age).toBe(240);
  });

  it('IndexedDB에서 키에 해당하는 값을 삭제할 수 있다.', () => {
    const { result } = renderHook(() => useLocalForage<User>('user', user));

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe(null);
  });
});
