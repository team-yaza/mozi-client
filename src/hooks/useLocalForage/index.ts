import { useState, useRef, useEffect, useCallback } from 'react';
import localForage from 'localforage';

type ErrorHandler = (error?: Error) => void;

const defaultErrorHandler: ErrorHandler = (error?: Error) => {
  console.error(error);
};

export const useLocalForage = <T>(key: string, initialValue: T, errorHandler?: ErrorHandler) => {
  const [storedValue, setStoredValue] = useState<T | null>(initialValue);
  const _errorHandler = useRef<ErrorHandler>(
    typeof errorHandler == undefined || errorHandler == null ? defaultErrorHandler : errorHandler
  );

  const error = (error?: Error) => {
    _errorHandler.current(error);
  };

  useEffect(() => {
    (async () => {
      try {
        const value: T | null = await localForage.getItem(key);
        setStoredValue(value == null ? initialValue : value);
      } catch (e) {
        error(e as Error);
      }
    })();
  }, []);

  const setValue = useCallback(
    (value: any) => {
      const set = async (value: any) => {
        try {
          setStoredValue(value);
        } catch (e) {
          error(e as Error);
        }
      };

      return set(value);
    },
    [key]
  );

  const removeValue = useCallback(() => {
    const remove = async () => {
      try {
        setStoredValue(null);
        await localForage.removeItem(key);
      } catch (e) {
        error(e as Error);
      }
    };

    return remove();
  }, [key]);

  return [storedValue, setValue, removeValue] as const;
};
