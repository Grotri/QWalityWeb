import { FC, PropsWithChildren } from "react";
import styles from "./PageTemplate.module.scss";
import { BackIcon } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";

const PageTemplate: FC<
  PropsWithChildren & { backPath?: string; headerTitle?: string }
> = ({ backPath, headerTitle, children }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      {(backPath || headerTitle) && (
        <div className={styles.header}>
          {backPath && (
            <div
              className={styles.backIcon}
              onClick={() => {
                if (backPath) {
                  navigate(backPath);
                }
              }}
            >
              <BackIcon />
            </div>
          )}
          {headerTitle && (
            <div className={styles.titleWrapper}>
              <span className={styles.title}>{headerTitle}</span>
            </div>
          )}
        </div>
      )}
      <main className={styles["main-wrapper"]}>{children}</main>
    </div>
  );
};

export default PageTemplate;
