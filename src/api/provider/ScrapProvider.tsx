import React, { createContext, FC, useState } from "react";

interface Context {
  searchKeyWord: object;
  setSearchKeyWord: (keyWord: object) => void;
  selectedScrapIdx: number | null;
  setSelectedScrapIdx: (indx: number) => void;
}

const defaultValue: Context = {
  searchKeyWord: {},
  setSearchKeyWord: () => {},
  selectedScrapIdx: null,
  setSelectedScrapIdx: () => {},
};

export const ScrapContext = createContext(defaultValue);

export const ScrapProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [searchKeyWord, setSearchKeyWord] = useState({});
  const [selectedScrapIdx, setSelectedScrapIdx] = useState<number | null>(null);

  return (
    <ScrapContext.Provider
      value={{
        searchKeyWord,
        setSearchKeyWord,
        selectedScrapIdx,
        setSelectedScrapIdx,
      }}
    >
      {children}
    </ScrapContext.Provider>
  );
};
