import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, SetValue<T>] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
