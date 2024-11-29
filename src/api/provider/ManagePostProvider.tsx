import { createContext, FC, useState } from "react";

interface Context {
  searchKeyWord: object;
  setSearchKeyWord: (keyWord: object) => void;
}

const defaultValue: Context = {
  searchKeyWord: {},
  setSearchKeyWord: () => {},
};

export const ManagePostContext = createContext(defaultValue);

export const ManagePostProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [searchKeyWord, setSearchKeyWord] = useState({});
  return (
    <ManagePostContext.Provider value={{ searchKeyWord, setSearchKeyWord }}>
      {children}
    </ManagePostContext.Provider>
  );
};
