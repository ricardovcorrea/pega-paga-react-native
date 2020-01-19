import {useState, useEffect} from 'react';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [delay, value]);

  return debouncedValue;
};
