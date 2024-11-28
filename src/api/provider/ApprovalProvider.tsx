import { createContext, FC, useState } from "react";

interface Context {
  searchKeyWord: object;
  setSearchKeyWord: (keyWord: object) => void;
}

const defaultValue: Context = {
  searchKeyWord: {},
  setSearchKeyWord: () => {},
};

export const ApprovalContext = createContext(defaultValue);

export const ApprovalProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [searchKeyWord, setSearchKeyWord] = useState({});
  return (
    <ApprovalContext.Provider value={{ searchKeyWord, setSearchKeyWord }}>
      {children}
    </ApprovalContext.Provider>
  );
};