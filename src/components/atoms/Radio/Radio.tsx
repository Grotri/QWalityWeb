import { FC } from "react";
import { IRadio } from "./types";
import styles from "./Radio.module.scss";
import clsx from "clsx";

const Radio: FC<IRadio> = ({
  label,
  isChecked = false,
  setIsChecked,
  style,
  labelStyle,
  radioWrapperStyle,
}) => (
  <div onClick={setIsChecked} className={clsx(styles.wrapper, style)}>
    <div className={clsx(styles.radioWrapper, radioWrapperStyle)}>
      <div className={styles.radio}>
        {isChecked && <div className={styles.radioChecked} />}
      </div>
      <span className={clsx(styles.radioText, labelStyle)}>{label}</span>
    </div>
  </div>
);

export default Radio;
