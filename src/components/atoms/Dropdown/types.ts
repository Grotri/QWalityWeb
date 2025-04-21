export interface IDropdown {
  data: IDropdownData[];
  setValue: (value: string) => void;
  value: string;
  label?: string;
  wrapperStyle?: string;
  labelStyle?: string;
  iconScale?: number;
  controlBackgroundColor?: string;
  controlHeight?: string;
  fontSize?: string;
  valueMargin?: string;
  borderRadius?: string;
}

export interface IDropdownData {
  label: string;
  value: string;
}
