import { RefObject, useEffect } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: Handler) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) return;

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
