import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput, { TextInputProps } from '.';

describe('<TextInput/>', () => {
  const value = 'initialValue';

  it('초기 렌더링 시 input 요소가 렌더링 돼야 한다.', () => {
    const { $input } = renderTextInput({ value });

    expect($input).toBeInTheDocument();
  });

  it('value 값을 받을 수 있다.', async () => {
    const { $input } = renderTextInput({ value });

    expect($input).toHaveValue(value);
  });

  it('input에 글자를 입력하면 props로 받은 핸들러가 호출돼야 한다.', async () => {
    const { onChangeHandler, typeTextOnInput } = renderTextInput({ value });
    const text = '테스트 입력';

    await typeTextOnInput(text);

    expect(onChangeHandler).toHaveBeenCalledTimes(text.length);
  });

  it('input을 클릭하면 focuse 된다.', async () => {
    const { $input, clickInputElement } = renderTextInput({ value });

    expect($input).not.toHaveFocus();

    await clickInputElement();

    expect($input).toHaveFocus();
  });

  it('focus된 상태에서 다른 부분으로 넘어가면 input의 focuse가 풀려야 한다.', async () => {
    const { $input, clickInputElement, leaveInputElementUsingTab } = renderTextInput({ value });

    await clickInputElement();
    expect($input).toHaveFocus();

    await leaveInputElementUsingTab();
    expect($input).not.toHaveFocus();
  });
});

const renderTextInput = (props: TextInputProps) => {
  const { value } = props;

  const onChangeHandler = jest.fn();
  const user = userEvent.setup();

  const result = render(<TextInput value={value} onChange={onChangeHandler} />);

  const $input = result.getByRole('textbox');

  const typeTextOnInput = async (text: string) => {
    await user.type($input, text);
  };

  const clickInputElement = async () => {
    await user.click($input);
  };

  const leaveInputElementUsingTab = async () => {
    await user.tab();
  };

  return {
    result,
    onChangeHandler,
    $input,
    typeTextOnInput,
    clickInputElement,
    leaveInputElementUsingTab,
  };
};
