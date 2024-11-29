import { atom } from "recoil";

export const idChkState = atom<boolean>({
    key: "idChkState",
    default: false,
});
