import { useTranslation } from "react-i18next";
import styles from "./ErrorPage.module.scss";
import Button from "../../atoms/Button";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../../../router/routes";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{t("error")}</span>
      <span className={styles.description}>{t("somethingWentWrong")}</span>
      <Button
        color="blue"
        style={styles.btn}
        onPress={() => navigate(ERoutes.main)}
      >
        {t("goHome")}
      </Button>
    </div>
  );
};

export default ErrorPage;
