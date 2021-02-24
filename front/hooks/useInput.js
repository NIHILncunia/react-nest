import { useCallback, useState } from 'react';

const useInput = (initialData) => {
  const [ value, setValue, ] = useState(initialData);
  
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [ value, handler, ];
};

export default useInput;