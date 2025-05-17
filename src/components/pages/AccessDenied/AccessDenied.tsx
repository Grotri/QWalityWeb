import { useNavigate } from "react-router-dom";
import styles from "./AccessDenied.module.scss";
import { LockIcon } from "../../../assets/icons";
import Button from "../../atoms/Button";
import { ERoutes } from "../../../router/routes";
import { useTranslation } from "react-i18next";

const AccessDenied = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.lockIcon}>
        <LockIcon />
      </div>
      <span className={styles.title}>{t("accessDenied")}</span>
      <span className={styles.description}>{t("noPermissionPage")}</span>
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

export default AccessDenied;
