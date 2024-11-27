import { atom } from 'recoil';

export const pwChkState = atom<boolean>({
  key: 'pwChkState',
  default: false,
});
