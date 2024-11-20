import { atom } from "recoil";

export const lodingState = atom<boolean>({
    key: "lodingState",
    default: false,
  });