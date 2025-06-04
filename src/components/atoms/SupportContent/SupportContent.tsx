import { FC } from "react";
import styles from "./SupportContent.module.scss";
import { ISupportContent } from "./types";
import CircularProgress from "@mui/material/CircularProgress";

const SupportContent: FC<ISupportContent> = ({
  type = "info",
  message,
  isLoading,
}) => {
  return (
    <div className={styles.wrapper}>
      {isLoading && <CircularProgress size="60px" />}
      {message && <span className={styles[`${type}`]}>{message}</span>}
    </div>
  );
};

export default SupportContent;
