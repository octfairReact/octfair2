import { atom } from "recoil";

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});


export const hModalState = atom<boolean>({
  key: "hModalState",
  default: false,
});