import { EDefectFilterOptions } from "./enums";

export interface ICameraFilter {
  isDateFilter: boolean;
  startDate: Date | null;
  endDate: Date | null;
  option: keyof typeof EDefectFilterOptions;
}

export interface ICameraFilterModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  initialFilter: ICameraFilter;
  onApply: (filter: ICameraFilter) => void;
}

export const initialCameraFilter: ICameraFilter = {
  isDateFilter: true,
  startDate: null,
  endDate: null,
  option: "missingElement",
};
