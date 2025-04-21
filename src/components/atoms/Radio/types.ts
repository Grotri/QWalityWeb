export interface IRadio {
  label: string;
  isChecked: boolean;
  setIsChecked?: () => void;
  style?: string;
  labelStyle?: string;
  radioWrapperStyle?: string;
}
