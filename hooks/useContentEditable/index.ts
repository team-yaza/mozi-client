import { useState, useEffect, useRef } from 'react';

export const useContentEditable = (initialContent = '') => {
  const $contentEditable = useRef<HTMLElement | null>(null);
  const [content, _setContent] = useState(initialContent);

  const onInput = (event: React.ChangeEvent<HTMLElement>) => {
    _setContent(event.target.innerText);
  };

  const setContent = (newContent: string) => {
    if ($contentEditable.current) {
      $contentEditable.current.innerText = newContent;
      _setContent(newContent);
    }
  };

  useEffect(() => {
    setContent(initialContent);
  }, []);

  return { content, setContent, onInput, $contentEditable };
};
