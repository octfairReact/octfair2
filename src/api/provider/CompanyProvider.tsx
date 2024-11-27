import { createContext, FC, useState } from "react";

interface Context {
  searchKeyWord: object;
  setSearchKeyWord: (keyWord: object) => void;
}

const defaultValue: Context = {
  searchKeyWord: {},
  setSearchKeyWord: () => {},
};

export const CompanyContext = createContext(defaultValue);

export const CompanyProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [searchKeyWord, setSearchKeyWord] = useState({});
  return (
    <CompanyContext.Provider value={{ searchKeyWord, setSearchKeyWord }}>
      {children}
    </CompanyContext.Provider>
  );
};
