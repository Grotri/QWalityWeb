import { useNavigate } from "react-router-dom";
import styles from "./AccessDenied.module.scss";
import { LockIcon } from "../../../assets/icons";
import Button from "../../atoms/Button";
import { ERoutes } from "../../../router/routes";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.lockIcon}>
        <LockIcon />
      </div>
      <span className={styles.title}>Доступ запрещён</span>
      <span className={styles.description}>
        У вас нет прав для просмотра этой страницы
      </span>
      <Button
        color="blue"
        style={styles.btn}
        onPress={() => navigate(ERoutes.main)}
      >
        Вернуться на главную страницу
      </Button>
    </div>
  );
};

export default AccessDenied;
