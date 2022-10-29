import { debounce } from '.';

jest.useFakeTimers();

describe('debounce', () => {
  let func: jest.Mock;
  let debouncedFunc: () => void;

  beforeEach(() => {
    func = jest.fn();
    debouncedFunc = debounce(func, 1000);
  });

  it('타임아웃 시간이 지난 후에 함수가 호출되어야 한다.', () => {
    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }

    jest.runAllTimers();

    expect(func).toHaveBeenCalledTimes(1);
  });
});
