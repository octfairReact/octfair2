import { createContext, FC, useState } from "react";

interface Context {
  bizImagePath: string;
  setBizImagePath: (keyWord: string) => void;
  postImagePath: string;
  setPostImagePath: (keyWord: string) => void;
}

const defaultValue: Context = {
  bizImagePath: "",
  setBizImagePath: () => {},
  postImagePath: "",
  setPostImagePath: () => {},
};

export const PostDetailContext = createContext(defaultValue);

export const PostDetailProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [bizImagePath, setBizImagePath] = useState<string>("");
  const [postImagePath, setPostImagePath] = useState<string>("");

  return (
    <PostDetailContext.Provider
      value={{ bizImagePath, setBizImagePath, postImagePath, setPostImagePath }}
    >
      {children}
    </PostDetailContext.Provider>
  );
};
