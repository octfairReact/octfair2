import { atom } from 'recoil';

export const pwChkState = atom<boolean>({
  key: 'pwChkState',
  default: false,
});

export const requestQnaType = atom<string>({
  key: 'requestType',
  default: 'all',
});
