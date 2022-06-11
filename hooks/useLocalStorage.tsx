import { useState, useEffect } from "react";

const useLocalStorage = (name: string) => {
  const [value, setValue] = useState<string | null>("");

  useEffect(() => {
    setValue(localStorage.getItem(name));
  }, [name]);

  const setLocalValue = (value: string) => {
    localStorage.setItem(name, value);
    setValue(value);
  };

  return {
    value,
    setLocalValue,
  };
};

export default useLocalStorage;
