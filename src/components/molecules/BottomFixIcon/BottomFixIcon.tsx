import { FC } from "react";
import { IBottomFixIcon } from "./types";
import styles from "./BottomFixIcon.module.scss";
import { BlackGradient } from "../../../assets/icons";
import clsx from "clsx";

const BottomFixIcon: FC<IBottomFixIcon> = ({
  icon,
  text,
  onPress,
  customBtn,
}) => (
  <div className={clsx(styles.btn, customBtn)} onClick={onPress}>
    <BlackGradient style={styles.gradient} />
    <div className={styles.circle}>{icon}</div>
    <span className={styles.btnText}>{text}</span>
  </div>
);

export default BottomFixIcon;
