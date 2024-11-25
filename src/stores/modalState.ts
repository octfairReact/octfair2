import { atom } from "recoil";

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});

export const modalState2 = atom<boolean>({
    key: "modalState2",
    default: false,
});