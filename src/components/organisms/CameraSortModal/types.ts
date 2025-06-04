import { ESortOptions } from "./enums";

export interface ICameraSortModal {
  initialOption?: keyof typeof ESortOptions;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onApply: (option: keyof typeof ESortOptions | undefined) => void;
}
