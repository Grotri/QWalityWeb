import { useTranslation } from "react-i18next";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{t("error")}</span>
      <span className={styles.description}>{t("somethingWentWrong")}</span>
    </div>
  );
};

export default ErrorPage;
