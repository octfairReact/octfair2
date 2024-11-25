import React, { createContext, FC, useState } from "react";

interface Context {
  searchKeyWord: object;
  setSearchKeyWord: (keyWord: object) => void;
  // selectedScrapIdx: number | null;
  // setSelectedScrapIdx: (indx: number) => void;
  selectedScrapIdxList: number[];
  setSelectedScrapIdxList: React.Dispatch<React.SetStateAction<number[]>>; // number[] => number[]
}

const defaultValue: Context = {
  searchKeyWord: {},
  setSearchKeyWord: () => {},
  // selectedScrapIdx: null,
  // setSelectedScrapIdx: () => {},
  selectedScrapIdxList: [],
  setSelectedScrapIdxList: () => {},
};

export const ScrapContext = createContext(defaultValue);

export const ScrapProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [searchKeyWord, setSearchKeyWord] = useState({});
  // const [selectedScrapIdx, setSelectedScrapIdx] = useState<number | null>(null);
  const [selectedScrapIdxList, setSelectedScrapIdxList] = useState<number[]>(
    []
  );

  return (
    <ScrapContext.Provider
      value={{
        searchKeyWord,
        setSearchKeyWord,
        // selectedScrapIdx,
        // setSelectedScrapIdx,
        selectedScrapIdxList,
        setSelectedScrapIdxList,
      }}
    >
      {children}
    </ScrapContext.Provider>
  );
};
