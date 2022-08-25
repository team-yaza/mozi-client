import { useState, useEffect, useRef, useCallback } from 'react';

export const useContentEditable = (initialContent: string | undefined = '') => {
  const $contentEditable = useRef<HTMLDivElement>(null);
  const [content, _setContent] = useState(initialContent);

  const onInput = useCallback((event: React.ChangeEvent<HTMLDivElement>) => {
    _setContent(event.target.innerText);
  }, []);

  const setContent = useCallback((newContent: string) => {
    if ($contentEditable.current) {
      $contentEditable.current.innerText = newContent;
      _setContent(newContent);
    }
  }, []);

  useEffect(() => {
    setContent(initialContent);
  }, []);

  return [content, setContent, $contentEditable, onInput] as [
    string,
    typeof setContent,
    typeof $contentEditable,
    typeof onInput
  ];
};
