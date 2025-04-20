import {
  HTMLInputTypeAttribute,
  JSX,
  MouseEventHandler,
  ReactNode,
} from "react";

export interface IInput {
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputFieldClassName?: string;
  placeholder?: string;
  label?: string | JSX.Element;
  errorText?: string;
  onChangeText: (text: string) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
  value: string;
  iconRight?: ReactNode;
  type?: HTMLInputTypeAttribute;
  maxLength?: number;
}
