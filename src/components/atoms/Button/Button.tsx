import { FC } from "react";
import { IButton } from "./types";
import styles from "./Button.module.scss";
import clsx from "clsx";

const Button: FC<IButton> = ({
  children,
  onPress,
  style,
  color,
  customColor,
  disabled,
}) => {
  const buttonColorStyle = styles[`btn_${color}` as keyof typeof styles];

  return (
    <button
      onClick={onPress}
      disabled={disabled}
      className={clsx(
        styles.btn,
        buttonColorStyle,
        customColor && { backgroundColor: customColor },
        style
      )}
    >
      {children}
    </button>
  );
};

export default Button;
