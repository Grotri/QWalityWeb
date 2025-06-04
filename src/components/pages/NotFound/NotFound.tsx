import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";
import Button from "../../atoms/Button";
import { ERoutes } from "../../../router/routes";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <span className={styles.error}>404</span>
      <span className={styles.title}>{t("pageNotFound")}</span>
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

export default NotFound;
