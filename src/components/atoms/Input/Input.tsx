import { FC } from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";
import { IInput } from "./types";

const Input: FC<IInput> = ({
  className,
  labelClassName,
  inputClassName,
  inputFieldClassName,
  label,
  placeholder,
  errorText,
  onChangeText,
  onClick,
  value,
  iconRight,
  type = "text",
  maxLength,
}) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && (
        <span className={clsx(styles.label, labelClassName)}>{label}</span>
      )}
      <div
        className={clsx(
          styles["input-wrapper"],
          errorText && styles.error,
          inputClassName
        )}
        onClick={onClick}
      >
        <input
          className={clsx(styles.input, inputFieldClassName)}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChangeText(e.target.value)}
          type={type}
          maxLength={maxLength}
        />
        {iconRight && <span className={styles["icon-right"]}>{iconRight}</span>}
      </div>
      {errorText && (
        <span className={styles["error-message"]}>{errorText}</span>
      )}
    </div>
  );
};

export default Input;
