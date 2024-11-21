import { createContext, FC, useState } from "react";

interface Context {
  searchKeyWord: object;
  setSearchKeyWord: (keyWord: object) => void;
}

const defaultValue: Context = {
  searchKeyWord: {},
  setSearchKeyWord: () => {},
};

export const HireApplicantContext = createContext(defaultValue);

export const HireApplicantProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [searchKeyWord, setSearchKeyWord] = useState({});
  return (
    <HireApplicantContext.Provider value={{ searchKeyWord, setSearchKeyWord }}>
      {children}
    </HireApplicantContext.Provider>
  );
};