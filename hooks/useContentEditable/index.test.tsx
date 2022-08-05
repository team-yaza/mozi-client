import { renderHook, act } from '@testing-library/react';

import { useContentEditable } from '.';

describe('useContentEditable', () => {
  it('type check', () => {
    const { result } = renderHook(() => useContentEditable(''));
    const { content, setContent, onInput, $contentEditable } = result.current;

    expect(typeof content).toBe('string');
    expect(typeof setContent).toBe('function');
    expect(typeof onInput).toBe('function');
    expect(typeof $contentEditable).toBe('object');
  });

  it('초기값이 설정되어야 한다', () => {
    const { result } = renderHook(() => useContentEditable('INITIAL_CONTENT'));
    const { content } = result.current;

    expect(content).toBe('INITIAL_CONTENT');
  });

  it('초기값이 주어지지 않으면 빈 문자열이 설정되어야 한다.', () => {
    const { result } = renderHook(() => useContentEditable());
    const { content } = result.current;

    expect(content).toBe('');
  });

  it('HTMLDivElement에 contentEditable 속성을 적용하여 수정할 수 있다.', () => {
    // Arrange
    const { result } = renderHook(() => useContentEditable('INITIAL_CONTENT'));
    const { setContent, $contentEditable } = result.current;

    const $divElement = document.createElement('div');
    $contentEditable.current = $divElement;
    // Act
    act(() => {
      setContent('NEW_CONTENT');
    });
    // Assert
    expect(result.current.content).toBe('NEW_CONTENT');
  });
});
