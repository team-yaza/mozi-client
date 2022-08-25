import { renderHook, act } from '@testing-library/react';

import { triggerRef } from '@/shared/utils/testUtils';
import { useOnClickOutside } from '.';

describe('useOnClickOutside', () => {
  it('ref가 있다면 document에 이벤트 리스너를 달아야한다.', () => {
    const ref = triggerRef(true);
    const handler = jest.fn();

    renderHook(() => useOnClickOutside(ref, handler));

    act(() => {
      document.dispatchEvent(new Event('mousedown'));
      document.dispatchEvent(new Event('touchstart'));
    });

    expect(handler).toHaveBeenCalledTimes(2); // mousedown, touchstart
  });

  it('ref가 없다면 document에 이벤트 리스너를 달지 않아야한다.', () => {
    const ref = triggerRef(false);
    const handler = jest.fn();

    renderHook(() => useOnClickOutside(ref, handler));

    act(() => {
      document.dispatchEvent(new Event('mousedown'));
      document.dispatchEvent(new Event('touchstart'));
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it('ref 바깥을 클릭했을 때 handler가 호출되어야 한다.', () => {
    const handler = jest.fn();
    const ref = triggerRef(true);

    renderHook(() => useOnClickOutside(ref, handler));

    act(() => {
      document.dispatchEvent(new Event('mousedown'));
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('ref 바깥을 터치했을 때 handler가 호출되어야 한다.', () => {
    const handler = jest.fn();
    const ref = triggerRef(true);

    renderHook(() => useOnClickOutside(ref, handler));

    act(() => {
      document.dispatchEvent(new Event('touchstart'));
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
