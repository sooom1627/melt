import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }
      
      // Parse JSON and convert string dates to Date objects
      const parsedItem = JSON.parse(item);
      if (Array.isArray(parsedItem)) {
        return parsedItem.map(task => ({
          ...task,
          created: new Date(task.created),
          start:task.start? new Date(task.start):undefined,
          end: task.end ? new Date(task.end) : undefined,
        }));
      }
  
      return parsedItem;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
