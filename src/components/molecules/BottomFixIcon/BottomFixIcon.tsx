import { FC } from "react";
import { IBottomFixIcon } from "./types";
import styles from "./BottomFixIcon.module.scss";

const BottomFixIcon: FC<IBottomFixIcon> = ({ icon, text, onPress }) => (
  <div className={styles.btn} onClick={onPress}>
    <div className={styles.circle}>{icon}</div>
    <span className={styles.btnText}>{text}</span>
  </div>
);

export default BottomFixIcon;
