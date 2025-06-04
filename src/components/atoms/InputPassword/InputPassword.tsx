import { FC, useState } from "react";
import { IInputPassword } from "./types";
import Input from "../Input/Input";
import { EyeIcon } from "../../../assets/icons";

const InputPassword: FC<IInputPassword> = ({
  className,
  labelClassName,
  inputClassName,
  inputFieldClassName,
  errorClassName,
  label,
  placeholder,
  errorText,
  onChangeText,
  onClick,
  value,
  maxLength,
  iconColor,
  iconSize,
}) => {
  const [isSecured, setIsSecured] = useState<boolean>(true);

  return (
    <Input
      className={className}
      labelClassName={labelClassName}
      inputClassName={inputClassName}
      inputFieldClassName={inputFieldClassName}
      errorClassName={errorClassName}
      label={label}
      placeholder={placeholder}
      errorText={errorText}
      onChangeText={onChangeText}
      onClick={onClick}
      value={value}
      iconRight={
        <EyeIcon
          color={iconColor}
          width={iconSize}
          height={iconSize}
          isActive={!isSecured}
          onClick={() => setIsSecured(!isSecured)}
        />
      }
      type={isSecured ? "password" : "text"}
      maxLength={maxLength}
    />
  );
};

export default InputPassword;
