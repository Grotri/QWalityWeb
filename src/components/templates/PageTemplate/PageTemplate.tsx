import { FC, PropsWithChildren } from "react";
import styles from "./PageTemplate.module.scss";
import { BackIcon } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { IPageTemplate } from "./types";
import clsx from "clsx";

const PageTemplate: FC<PropsWithChildren & IPageTemplate> = ({
  backPath,
  headerTitle,
  canScroll = false,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <div className={clsx(styles.wrapper, canScroll && styles.scrollWrapper)}>
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
      <main
        className={clsx(
          styles["main-wrapper"],
          canScroll && styles.mainWrapperScroll
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default PageTemplate;
