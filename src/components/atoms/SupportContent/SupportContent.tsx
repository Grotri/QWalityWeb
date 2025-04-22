import { FC } from "react";
import styles from "./SupportContent.module.scss";
import { ISupportContent } from "./types";

const SupportContent: FC<ISupportContent> = ({ type = "info", message }) => {
  return (
    <div className={styles.wrapper}>
      {message && <span className={styles[`${type}`]}>{message}</span>}
    </div>
  );
};

export default SupportContent;
