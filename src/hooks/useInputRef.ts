import { useEffect, useRef } from 'react';

export const useInputRef = (title?: string, description?: string, dependency?: any) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && title) {
      titleRef.current.innerText = title;
    }

    if (descriptionRef.current && description) {
      descriptionRef.current;
    }
  }, [...dependency]);

  return {
    titleRef,
    descriptionRef,
  };
};
