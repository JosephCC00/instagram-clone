import { atom } from "recoil";

export const modalState = atom({
  key: "modalState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value), we don't want modal to be open by default
});
