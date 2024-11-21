import React, { createContext, FC, useState } from "react";

interface Context {
  searchKeyWord: object;
  setSearchKeyWord: (keyWord: object) => void;
}

const defaultValue: Context = {
  searchKeyWord: {},
  setSearchKeyWord: () => {},
};

export const ScrapContext = createContext(defaultValue);

export const ScrapProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [searchKeyWord, setSearchKeyWord] = useState({});
  return (
    <ScrapContext.Provider value={{ searchKeyWord, setSearchKeyWord }}>
      {children}
    </ScrapContext.Provider>
  );
};
