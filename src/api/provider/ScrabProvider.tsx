import React, { createContext, FC, useState } from "react";

interface Context {
  searchKeyWord: object;
  setSearchKeyWord: (keyWord: object) => void;
}

const defaultValue: Context = {
  searchKeyWord: {},
  setSearchKeyWord: () => {},
};

export const ScrabContext = createContext(defaultValue);

export const ScrabProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [searchKeyWord, setSearchKeyWord] = useState({});
  return (
    <ScrabContext.Provider value={{ searchKeyWord, setSearchKeyWord }}>
      {children}
    </ScrabContext.Provider>
  );
};
