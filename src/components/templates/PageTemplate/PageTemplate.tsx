import { FC, PropsWithChildren } from "react";
import styles from "./PageTemplate.module.scss";

const PageTemplate: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <main className={styles["main-wrapper"]}>{children}</main>
    </div>
  );
};

export default PageTemplate;
