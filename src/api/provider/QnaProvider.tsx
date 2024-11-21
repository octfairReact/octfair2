import { createContext, FC, useState } from 'react';

interface Context {
  searchKeyWord: object;
  setSearchKeyWord: (keyWord: object) => void;
}

const defaultValue: Context = {
  searchKeyWord: {},
  setSearchKeyWord: () => {},
};

export const QnaContext = createContext(defaultValue);

export const QnaProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [searchKeyWord, setSearchKeyWord] = useState({});
  return <QnaContext.Provider value={{ searchKeyWord, setSearchKeyWord }}>{children}</QnaContext.Provider>;
};
