import { createContext, FC, useState } from "react";

interface Context {
  searchKeyWord: object;
  setSearchKeyWord: (keyWord: object) => void;
}

const defaultValue: Context = {
  searchKeyWord: {},
  setSearchKeyWord: () => {},
};

export const ApplyContext = createContext(defaultValue);

export const ApplyProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [searchKeyWord, setSearchKeyWord] = useState({});
  return (
    <ApplyContext.Provider value={{ searchKeyWord, setSearchKeyWord }}>
      {children}
    </ApplyContext.Provider>
  );
};