import { useState } from "react";

// 🦁 Remplacer ceci avec les types corrects
type UseLocalStorageOutput<T> = [T, (value: T) => void];

// 🦁 Mettre les bons types en paramètres de la fonction
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageOutput<T> {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
