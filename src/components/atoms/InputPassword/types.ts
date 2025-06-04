import { JSX, MouseEventHandler } from "react";

export interface IInputPassword {
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputFieldClassName?: string;
  errorClassName?: string;
  placeholder?: string;
  label?: string | JSX.Element;
  errorText?: string;
  onChangeText: (text: string) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
  value: string;
  maxLength?: number;
  iconColor?: string;
  iconSize?: number;
}
