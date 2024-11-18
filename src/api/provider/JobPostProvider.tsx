import { createContext, FC, useState } from "react";

interface Context {
  searchKeyWord: object;
  setSearchKeyWord: (keyWord: object) => void;
}

const defaultValue: Context = {
  searchKeyWord: {},
  setSearchKeyWord: () => {},
};

export const JobPostContext = createContext(defaultValue);

export const JobPostProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [searchKeyWord, setSearchKeyWord] = useState({});
  return (
    <JobPostContext.Provider value={{ searchKeyWord, setSearchKeyWord }}>
      {children}
    </JobPostContext.Provider>
  );
};
