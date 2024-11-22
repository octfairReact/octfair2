import { createContext, FC, useState } from "react";

interface Context {
    searchKeyWord: object;
    setSearchKeyWord: (keyWord: object) => void;
}

const defaultValue: Context = {
    searchKeyWord: {},
    setSearchKeyWord: () => {},
};

export const UserContext = createContext(defaultValue);

export const UserProvider: FC<{
    children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
    const [searchKeyWord, setSearchKeyWord] = useState({});
    return <UserContext.Provider value={{ searchKeyWord, setSearchKeyWord }}>{children}</UserContext.Provider>;
};
