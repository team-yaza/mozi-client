import { useState, useCallback, ChangeEvent } from 'react';

type onChangeType = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;

export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const handler: onChangeType = useCallback(({ target }) => {
    const max = Number(target.getAttribute('maxlength'));

    if (max && target.value.length > max) {
      target.value = target.value.slice(0, max);
    }

    setValue(target.value);
  }, []);

  return [value, handler, setValue] as [string, onChangeType, typeof setValue];
};
