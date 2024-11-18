import { createContext } from 'react';

interface Context {
  searchKeyWord: object;
  setSearchKeyWord: (keyWord: object) => void;
}

const defaultValue: Context = {
  searchKeyWord: {},
  setSearchKeyWord: () => {},
};

export const FaqContext = createContext(defaultValue);

//  const FaqProvider: FC<{
//      children:React.ReactNode}
//  }
