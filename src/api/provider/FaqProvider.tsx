import { createContext, FC, useState } from 'react';

interface Context {
  searchKeyWord: object;
  setSearchKeyWord: (keyWord: object) => void;
}

const defaultValue: Context = {
  searchKeyWord: {},
  setSearchKeyWord: () => {},
};

export const FaqContext = createContext(defaultValue);

export const FaqProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [searchKeyWord, setSearchKeyWord] = useState({});
  return <FaqContext.Provider value={{ searchKeyWord, setSearchKeyWord }}>{children}</FaqContext.Provider>;
};
