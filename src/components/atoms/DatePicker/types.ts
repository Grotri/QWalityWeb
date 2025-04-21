export interface IDatePicker {
  date: Date | null;
  setDate: (date: Date) => void;
  bgColor?: string;
}
